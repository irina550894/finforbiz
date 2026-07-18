# Stage 12 log: final acceptance checks

Date: 2026-07-17
Branch: `dev`

## Scope

Stage 12 covers public acceptance checks after deployment.

## Checks passed

- Public homepage:
  - `https://finforbiz.pro/`
  - status: `200 OK`
- Privacy page:
  - `https://finforbiz.pro/privacy.html`
  - status: `200 OK`
- CSS:
  - `https://finforbiz.pro/assets/css/styles.css`
  - status: `200 OK`
- JavaScript:
  - `https://finforbiz.pro/assets/js/main.js`
  - status: `200 OK`
- Portfolio data:
  - `https://finforbiz.pro/data/portfolio.json`
  - status: `200 OK`
- Reports gallery image:
  - `https://finforbiz.pro/assets/images/portfolio/dashboard-report-11.jpg`
  - status: `200 OK`
- Video byte-range support:
  - `https://finforbiz.pro/assets/video/sistema-otchetov-biznesa.mp4`
  - status: `206 Partial Content`
- Empty contact form payload:
  - endpoint: `POST https://finforbiz.pro/api/contact`
  - status: `400`
  - validation fields: `name`, `phone`, `email`, `consent`
- Services:
  - `caddy`: active;
  - `finforbiz`: active.
- Ports:
  - Caddy listens on public `80` and `443`;
  - Node backend listens only on `127.0.0.1:3000`.

## Delivery checks

- Telegram delivery is complete:
  - bot username: `@saitffb_bot`;
  - target chat id: `1781603163`;
  - test contact form submission returned `200 OK`.
- Gmail SMTP delivery is complete:
  - `SMTP_PASS` was added to `/etc/finforbiz.env` from local `.env`;
  - backend service was restarted;
  - public test contact form submission returned `200 OK`.
- Backend skips incomplete delivery channels, but both Telegram and Gmail SMTP are now configured.

## Current production state

The site is deployed and publicly available over HTTPS. Static media, portfolio images, local video, privacy page, backend validation, Telegram lead delivery, and Gmail SMTP delivery are working.

## Delivery channel cleanup

Updated and deployed backend delivery logic:

- Telegram is used when `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are configured.
- SMTP email is used only when host/from/recipient are configured and either no SMTP username is required or `SMTP_PASS` is present.
- Public test `POST https://finforbiz.pro/api/contact` returned `200 OK`.
- New service logs after restart did not show SMTP authentication errors for Telegram-only delivery.

## Handover note

Added `docs/production-handover.md` with the current production state, server paths, contact delivery rules, Gmail SMTP maintenance notes, basic check commands, and editable data files.

## Temporary Telegram-only continuation

On 2026-07-18, the project owner confirmed that work can continue without `SMTP_PASS`.

Additional public checks:

- `https://finforbiz.pro/`: `200`
- `https://finforbiz.pro/privacy.html`: `200`
- `https://finforbiz.pro/assets/css/styles.css`: `200`
- `https://finforbiz.pro/assets/js/main.js`: `200`
- `https://finforbiz.pro/data/portfolio.json`: `200`
- `https://finforbiz.pro/assets/images/portfolio/dashboard-report-11.jpg`: `200`
- `https://finforbiz.pro/assets/video/sistema-otchetov-biznesa.mp4` byte range: `206`
- Empty `POST https://finforbiz.pro/api/contact`: `400`, expected validation error.

## Gmail SMTP completion

On 2026-07-18, the project owner added the Gmail app password to local `.env`.

Actions completed:

- Read `SMTP_PASS` from local `.env` without printing the secret.
- Updated `/etc/finforbiz.env` on the server.
- Created server backup: `/etc/finforbiz.env.bak-20260718223546`.
- Restarted `finforbiz.service`.
- Confirmed service status: `active`.
- Sent public test request to `POST https://finforbiz.pro/api/contact`.
- Test response: `200 OK`, `{"ok":true,"message":"Request sent"}`.
- Checked fresh `journalctl -u finforbiz` logs after the test; no SMTP errors were present.
