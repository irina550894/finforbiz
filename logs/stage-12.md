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

- Telegram delivery is not complete:
  - bot username: `@saitffb_bot`;
  - target Telegram account must open the bot and send `/start`;
  - after that, `TELEGRAM_CHAT_ID` must be updated from `getUpdates`.
- Gmail SMTP delivery is not complete:
  - `SMTP_PASS` is empty;
  - Gmail requires an app password.

## Current production state

The site is deployed and publicly available over HTTPS. Static media, portfolio images, local video, privacy page, and backend validation are working. Lead delivery requires Telegram chat initialization and/or Gmail SMTP app password.
