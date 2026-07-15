const fs = require("fs");
const http = require("http");
const https = require("https");
const net = require("net");
const path = require("path");
const tls = require("tls");

const ROOT_DIR = path.resolve(__dirname, "..");

function loadEnv(filePath) {
    if (!fs.existsSync(filePath)) return;

    const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const separator = trimmed.indexOf("=");
        if (separator === -1) continue;

        const key = trimmed.slice(0, separator).trim();
        let value = trimmed.slice(separator + 1).trim();
        if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
    }
}

loadEnv(path.join(ROOT_DIR, ".env"));

const config = {
    port: Number(process.env.PORT || 3000),
    siteRoot: path.resolve(ROOT_DIR, process.env.SITE_ROOT || "."),
    recipientEmail: process.env.CONTACT_RECIPIENT_EMAIL || "irina550894@gmail.com",
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
    telegramChatId: process.env.TELEGRAM_CHAT_ID || "",
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: Number(process.env.SMTP_PORT || 587),
    smtpSecure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
    smtpUser: process.env.SMTP_USER || "",
    smtpPass: process.env.SMTP_PASS || "",
    smtpFrom: process.env.SMTP_FROM || process.env.SMTP_USER || ""
};

const rateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_BODY_BYTES = 20 * 1024;

const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".mp4": "video/mp4",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
};

function sendJson(res, statusCode, payload) {
    const body = JSON.stringify(payload);
    res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(body)
    });
    res.end(body);
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        let size = 0;

        req.on("data", (chunk) => {
            size += chunk.length;
            if (size > MAX_BODY_BYTES) {
                reject(Object.assign(new Error("Request body is too large"), { statusCode: 413 }));
                req.destroy();
                return;
            }
            body += chunk;
        });

        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(Object.assign(new Error("Invalid JSON"), { statusCode: 400 }));
            }
        });

        req.on("error", reject);
    });
}

function normalizeText(value, maxLength) {
    return String(value || "").trim().slice(0, maxLength);
}

function validateContactPayload(payload) {
    const contact = {
        name: normalizeText(payload.name, 120),
        phone: normalizeText(payload.phone, 80),
        email: normalizeText(payload.email, 160),
        industry: normalizeText(payload.industry, 160),
        revenue: normalizeText(payload.revenue, 120),
        consent: payload.consent === true
    };

    const errors = [];
    if (!contact.name) errors.push("name");
    if (!contact.phone) errors.push("phone");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errors.push("email");
    if (!contact.consent) errors.push("consent");

    return { contact, errors };
}

function checkRateLimit(req) {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const bucket = rateLimit.get(ip) || [];
    const fresh = bucket.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    fresh.push(now);
    rateLimit.set(ip, fresh);
    return fresh.length <= RATE_LIMIT_MAX;
}

function buildLeadText(contact) {
    return [
        "Новая заявка с сайта finforbiz.pro",
        "",
        `Имя: ${contact.name}`,
        `Телефон: ${contact.phone}`,
        `Email: ${contact.email}`,
        `Отрасль бизнеса: ${contact.industry || "не указана"}`,
        `Выручка бизнеса: ${contact.revenue || "не указана"}`,
        `Согласие: ${contact.consent ? "да" : "нет"}`,
        "",
        `Время: ${new Date().toISOString()}`
    ].join("\n");
}

function sendTelegramMessage(text) {
    if (!config.telegramBotToken || !config.telegramChatId) {
        return Promise.reject(new Error("Telegram delivery is not configured"));
    }

    const body = JSON.stringify({
        chat_id: config.telegramChatId,
        text,
        disable_web_page_preview: true
    });

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: "api.telegram.org",
            path: `/bot${config.telegramBotToken}/sendMessage`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(body)
            },
            timeout: 10000
        }, (res) => {
            let responseBody = "";
            res.setEncoding("utf8");
            res.on("data", (chunk) => { responseBody += chunk; });
            res.on("end", () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve();
                } else {
                    reject(new Error(`Telegram error ${res.statusCode}: ${responseBody}`));
                }
            });
        });

        req.on("timeout", () => req.destroy(new Error("Telegram request timeout")));
        req.on("error", reject);
        req.end(body);
    });
}

function encodeHeader(value) {
    return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function dotStuff(value) {
    return value.replace(/^\./gm, "..");
}

function createSmtpClient() {
    let socket;
    let buffer = "";

    function connectSocket() {
        const options = {
            host: config.smtpHost,
            port: config.smtpPort,
            servername: config.smtpHost,
            timeout: 10000
        };

        socket = config.smtpSecure ? tls.connect(options) : net.connect(options);
        socket.setEncoding("utf8");
        socket.on("data", (chunk) => { buffer += chunk; });

        return new Promise((resolve, reject) => {
            socket.once("connect", resolve);
            socket.once("secureConnect", resolve);
            socket.once("error", reject);
            socket.once("timeout", () => reject(new Error("SMTP connection timeout")));
        });
    }

    function readResponse() {
        return new Promise((resolve, reject) => {
            const startedAt = Date.now();

            const timer = setInterval(() => {
                const lines = buffer.split(/\r?\n/).filter(Boolean);
                const lastLine = lines[lines.length - 1];
                if (lastLine && /^\d{3} /.test(lastLine)) {
                    const response = buffer;
                    buffer = "";
                    clearInterval(timer);
                    resolve(response);
                    return;
                }
                if (Date.now() - startedAt > 10000) {
                    clearInterval(timer);
                    reject(new Error("SMTP response timeout"));
                }
            }, 20);
        });
    }

    async function command(value, expectedCodes) {
        socket.write(`${value}\r\n`);
        const response = await readResponse();
        const code = response.slice(0, 3);
        if (!expectedCodes.includes(code)) {
            throw new Error(`Unexpected SMTP response to ${value}: ${response.trim()}`);
        }
        return response;
    }

    async function upgradeToTls() {
        await command("STARTTLS", ["220"]);
        socket = tls.connect({
            socket,
            servername: config.smtpHost
        });
        socket.setEncoding("utf8");
        socket.on("data", (chunk) => { buffer += chunk; });
        await new Promise((resolve, reject) => {
            socket.once("secureConnect", resolve);
            socket.once("error", reject);
        });
    }

    return {
        async send(message) {
            await connectSocket();
            await readResponse();
            await command(`EHLO ${config.smtpHost}`, ["250"]);

            if (!config.smtpSecure && config.smtpPort === 587) {
                await upgradeToTls();
                await command(`EHLO ${config.smtpHost}`, ["250"]);
            }

            if (config.smtpUser && config.smtpPass) {
                const auth = Buffer.from(`\0${config.smtpUser}\0${config.smtpPass}`, "utf8").toString("base64");
                await command(`AUTH PLAIN ${auth}`, ["235"]);
            }

            await command(`MAIL FROM:<${config.smtpFrom}>`, ["250"]);
            await command(`RCPT TO:<${config.recipientEmail}>`, ["250", "251"]);
            await command("DATA", ["354"]);
            socket.write(`${dotStuff(message)}\r\n.\r\n`);
            const dataResponse = await readResponse();
            if (!["250"].includes(dataResponse.slice(0, 3))) {
                throw new Error(`Unexpected SMTP DATA response: ${dataResponse.trim()}`);
            }
            await command("QUIT", ["221"]);
        },
        close() {
            if (socket && !socket.destroyed) socket.end();
        }
    };
}

async function sendEmail(text, contact) {
    if (!config.smtpHost || !config.smtpFrom || !config.recipientEmail) {
        throw new Error("SMTP delivery is not configured");
    }

    const subject = "Новая заявка с сайта finforbiz.pro";
    const message = [
        `From: ${encodeHeader("finforbiz.pro")} <${config.smtpFrom}>`,
        `To: <${config.recipientEmail}>`,
        `Reply-To: ${contact.email}`,
        `Subject: ${encodeHeader(subject)}`,
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: 8bit",
        "",
        text
    ].join("\r\n");

    const client = createSmtpClient();
    try {
        await client.send(message);
    } finally {
        client.close();
    }
}

async function handleContact(req, res) {
    if (!checkRateLimit(req)) {
        sendJson(res, 429, { ok: false, message: "Too many requests" });
        return;
    }

    try {
        const payload = await parseBody(req);
        const { contact, errors } = validateContactPayload(payload);
        if (errors.length > 0) {
            sendJson(res, 400, { ok: false, message: "Validation error", fields: errors });
            return;
        }

        const text = buildLeadText(contact);
        const results = await Promise.allSettled([
            sendTelegramMessage(text),
            sendEmail(text, contact)
        ]);

        const failed = results.filter((result) => result.status === "rejected");
        if (failed.length > 0) {
            console.error("Contact delivery failed", failed.map((item) => item.reason?.message || item.reason));
            sendJson(res, 502, { ok: false, message: "Delivery failed" });
            return;
        }

        sendJson(res, 200, { ok: true, message: "Request sent" });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        console.error("Contact handler error", error);
        sendJson(res, statusCode, { ok: false, message: error.message || "Server error" });
    }
}

function serveStatic(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);
    const requestedPath = pathname === "/" ? "/index.html" : pathname;
    const filePath = path.resolve(config.siteRoot, `.${requestedPath}`);

    if (!filePath.startsWith(config.siteRoot)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.stat(filePath, (error, stats) => {
        if (error || !stats.isFile()) {
            res.writeHead(404);
            res.end("Not found");
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            "Content-Type": contentTypes[ext] || "application/octet-stream",
            "Content-Length": stats.size
        });
        fs.createReadStream(filePath).pipe(res);
    });
}

const server = http.createServer((req, res) => {
    if (req.method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": req.headers.origin || "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        });
        res.end();
        return;
    }

    if (req.url === "/api/contact" && req.method === "POST") {
        handleContact(req, res);
        return;
    }

    if (req.method === "GET" || req.method === "HEAD") {
        serveStatic(req, res);
        return;
    }

    res.writeHead(405);
    res.end("Method not allowed");
});

server.listen(config.port, () => {
    console.log(`finforbiz server listening on http://localhost:${config.port}`);
});
