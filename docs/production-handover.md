# Production handover

Date: 2026-07-17
Branch: `dev`

## Public URLs

- Site: `https://finforbiz.pro/`
- Privacy policy: `https://finforbiz.pro/privacy.html`

## Server

- IP: `83.222.26.253`
- OS: Ubuntu
- Public web server: Caddy
- Application service: `finforbiz`
- Application path: `/var/www/finforbiz/current`
- Backend bind address: `127.0.0.1:3000`
- Environment file: `/etc/finforbiz.env`

Do not store passwords, bot tokens, SMTP app passwords, or SSH secrets in the repository.

## Current status

- HTTPS site is available.
- Static files, local images, local video, portfolio data, and privacy page are served from the server.
- Contact form validation works.
- Telegram lead delivery works through `@saitffb_bot`.
- Gmail SMTP delivery works through `irina550894@gmail.com`.

## Contact form delivery

The backend sends a lead to every fully configured channel:

- Telegram is enabled when `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are present.
- Email is enabled when SMTP settings are complete and `SMTP_PASS` is present for Gmail.

If Gmail is not configured, the backend skips email and still sends the lead to Telegram.

## Gmail SMTP maintenance

Gmail SMTP is already enabled. If the app password is revoked or replaced later, update `SMTP_PASS` in `/etc/finforbiz.env` on the server.

Current required values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=irina550894@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD
SMTP_FROM=irina550894@gmail.com
CONTACT_RECIPIENT_EMAIL=irina550894@gmail.com
```

After editing the environment file, restart the service:

```bash
systemctl restart finforbiz
systemctl status finforbiz --no-pager
```

## Basic checks

Run these on the server:

```bash
systemctl status caddy --no-pager
systemctl status finforbiz --no-pager
curl -I https://finforbiz.pro/
curl -I https://finforbiz.pro/privacy.html
```

Check recent backend logs:

```bash
journalctl -u finforbiz -n 80 --no-pager
```

## Editable content

Editable site content is stored in JSON files:

- `data/services.json` - services;
- `data/cases.json` - cases;
- `data/reviews.json` - reviews;
- `data/portfolio.json` - portfolio cards and gallery images.

Media files are stored locally:

- `assets/images/`
- `assets/images/portfolio/`
- `assets/video/`

## Maintenance note

There are no deferred infrastructure items from the original delivery plan. If the Gmail app password is revoked or rotated later, update `SMTP_PASS` in `/etc/finforbiz.env` and restart `finforbiz.service`.
