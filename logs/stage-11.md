# Stage 11 log: deploy and server checks

Date: 2026-07-17
Branch: `dev`

## Scope

Stage 11 covers deploying the frontend/backend to the Ubuntu server and checking public availability.

## Actions completed on server

- Connected to `83.222.26.253` as `root` over SSH.
- Confirmed server OS: Ubuntu 24.04.4 LTS.
- Confirmed Caddy is the active public web server on ports `80` and `443`.
- Installed Node.js and npm:
  - Node.js `v18.19.1`;
  - npm `9.2.0`.
- Created system user `finforbiz`.
- Created application directories under `/var/www/finforbiz`.
- Uploaded project release:
  - `/var/www/finforbiz/releases/20260717005017`;
  - symlinked as `/var/www/finforbiz/current`.
- Created `/etc/finforbiz.env` from local environment values without writing secrets into logs.
- Installed and enabled `/etc/systemd/system/finforbiz.service`.
- Started backend service.
- Added `finforbiz.pro` block to `/etc/caddy/Caddyfile`, preserving existing blocks:
  - `supabase.finforbiz.pro`;
  - `n8n.finforbiz.pro`;
  - `calendar.finforbiz.pro`.
- Validated and reloaded Caddy after correcting config issues.

## Checks passed

- `finforbiz.service` is active and running.
- Backend listens on `127.0.0.1:3000`.
- `node -c server/contact-server.js` passed on the server.
- Local backend checks on server:
  - `/` returns `200 OK`;
  - `/assets/images/irina-biryukova.jpg` returns `200 OK`;
  - `/assets/video/sistema-otchetov-biznesa.mp4` supports `206 Partial Content` for byte ranges.
- All 11 dashboard report images were uploaded.

## Blocker

Public HTTPS is not complete because DNS for `finforbiz.pro` has two A records:

- `83.222.26.253` - target server;
- `95.163.244.138` - extra server.

Caddy/Let's Encrypt validation failed with a timeout against `95.163.244.138`. The extra A record must be removed from DNS before HTTPS can be issued reliably.

## Notes

- Caddy was temporarily left with a valid `finforbiz.pro` HTTPS block. It will retry certificate issuance automatically after DNS is fixed.
- I did not switch the public site to HTTP-only because that would weaken security without explicit approval.
- SMTP email delivery still requires `SMTP_PASS` to be filled with a Gmail app password.
