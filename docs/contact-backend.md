# Contact form backend

Stage 7 adds a small Node.js backend for the contact form.

## Files

- `server/contact-server.js` - HTTP server, static file serving, `/api/contact` endpoint.
- `.env.example` - required environment variables.
- `package.json` - start script.

## Endpoint

`POST /api/contact`

Expected JSON:

```json
{
  "name": "Ирина",
  "phone": "+7...",
  "email": "client@example.com",
  "industry": "строительство",
  "revenue": "10-50 млн ₽",
  "consent": true
}
```

Required fields:

- `name`
- `phone`
- `email`
- `consent`

Optional fields:

- `industry`
- `revenue`

## Delivery

The backend sends each valid request to:

- Telegram via Bot API;
- email via SMTP.

Both delivery channels must be configured for production.

## Environment variables

Copy `.env.example` to `.env` on the server and fill:

```text
PORT=3000
SITE_ROOT=.

CONTACT_RECIPIENT_EMAIL=irina550894@mail.com

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

## Telegram setup

1. Create a bot through `@BotFather`.
2. Save the bot token as `TELEGRAM_BOT_TOKEN`.
3. Send any message to the bot from Irina's Telegram account.
4. Get the chat id through:
   `https://api.telegram.org/bot<token>/getUpdates`
5. Save the id as `TELEGRAM_CHAT_ID`.

The site cannot send messages directly to a personal `@username`; Telegram requires a bot and chat id.

## SMTP setup

SMTP access for `irina550894@mail.com` still needs to be checked with the mailbox password or app password.

Official mail.com server settings:

- SMTP server: `smtp.mail.com`
- port `587` with STARTTLS;
- or port `465` with SSL/TLS.

The project `.env` is prepared with port `587` and STARTTLS:

```text
SMTP_HOST=smtp.mail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=irina550894@mail.com
SMTP_FROM=irina550894@mail.com
SMTP_PASS=
```

Needed values:

- SMTP host;
- SMTP port;
- secure mode: `true` for port 465, `false` for port 587 with STARTTLS;
- SMTP username;
- SMTP password or app password;
- sender email.

If mail.com SMTP is not available or unreliable, use another SMTP mailbox or a transactional mail service.

### How to check SMTP as a beginner

#### Option A. Check from Ubuntu server

1. Connect to the server via SSH.
2. Install OpenSSL if needed:

```bash
sudo apt update
sudo apt install -y openssl
```

3. Check port `587`:

```bash
openssl s_client -starttls smtp -connect smtp.mail.com:587 -crlf
```

If the connection works, you should see certificate text and a line similar to `250` after typing:

```text
EHLO finforbiz.pro
```

4. Check port `465`:

```bash
openssl s_client -connect smtp.mail.com:465 -crlf
```

5. If both commands hang or fail, the server or provider may block outbound SMTP ports.

#### Option B. Check through an email app

1. Open Thunderbird, Outlook, Apple Mail, or another email app.
2. Add the mailbox `irina550894@mail.com`.
3. Use manual outgoing server settings:
   - server: `smtp.mail.com`;
   - port: `587`;
   - encryption: `STARTTLS`;
   - username: `irina550894@mail.com`;
   - password: mailbox password or app password.
4. Try sending a test email to yourself.
5. If login fails, check whether mail.com requires Premium/IMAP-SMTP access or a special app password.

#### Option C. Check after `.env` is filled

1. Fill `SMTP_PASS` in `.env`.
2. Start the site backend:

```bash
npm start
```

3. Open the site through the backend and send a test form.
4. Check:
   - whether the email arrives at `irina550894@mail.com`;
   - whether server logs show SMTP authentication or connection errors.

## Local run

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Production notes

- Run the Node server as a systemd service.
- Put Nginx in front of it.
- Proxy `/api/contact` to the Node process.
- Serve HTTPS through Nginx and Let's Encrypt.

## Protections

Current backend includes:

- required field validation;
- email format validation;
- request body size limit;
- simple in-memory rate limit;
- no secrets in frontend code;
- static path traversal protection.
