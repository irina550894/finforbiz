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

SMTP access for `irina550894@mail.com` still needs to be checked.

Needed values:

- SMTP host;
- SMTP port;
- secure mode: `true` for port 465, `false` for port 587 with STARTTLS;
- SMTP username;
- SMTP password or app password;
- sender email.

If mail.com SMTP is not available or unreliable, use another SMTP mailbox or a transactional mail service.

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

