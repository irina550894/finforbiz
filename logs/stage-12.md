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

## Remaining blockers

- Telegram delivery is complete:
  - bot username: `@saitffb_bot`;
  - target chat id: `1781603163`;
  - test contact form submission returned `200 OK`.
- Gmail SMTP delivery is not complete:
  - `SMTP_PASS` is empty;
  - Gmail requires an app password.
- Backend now skips incomplete delivery channels, so Telegram-only delivery works without repeated SMTP errors while `SMTP_PASS` is empty.

## Current production state

The site is deployed and publicly available over HTTPS. Static media, portfolio images, local video, privacy page, backend validation, and Telegram lead delivery are working. Email delivery still requires a Gmail SMTP app password.

## Delivery channel cleanup

Updated and deployed backend delivery logic:

- Telegram is used when `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are configured.
- SMTP email is used only when host/from/recipient are configured and either no SMTP username is required or `SMTP_PASS` is present.
- Public test `POST https://finforbiz.pro/api/contact` returned `200 OK`.
- New service logs after restart did not show SMTP authentication errors for Telegram-only delivery.

## Handover note

Added `docs/production-handover.md` with the current production state, server paths, contact delivery rules, Gmail SMTP setup notes, basic check commands, editable data files, and the remaining acceptance item.
