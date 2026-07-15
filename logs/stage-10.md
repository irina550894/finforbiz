# Stage 10 log: Ubuntu server preparation

Date: 2026-07-15
Branch: `dev`

## Scope

Stage 10 covers Ubuntu server preparation for Nginx, the Node.js backend service, firewall, DNS, and Let's Encrypt SSL.

## Actions completed locally

- Read Stage 10 acceptance criteria from `ТЗ_по_этапам.md`.
- Checked DNS for `finforbiz.pro`.
- Added Nginx config template:
  - `deploy/nginx/finforbiz.pro.conf`
- Added Caddy config template because the current server reports `Server: Caddy`:
  - `deploy/caddy/Caddyfile`
- Added systemd service template:
  - `deploy/systemd/finforbiz.service`
- Added server preparation guide:
  - `docs/server-preparation.md`
- Updated backend host binding:
  - `HOST=127.0.0.1`
  - Node.js backend listens only on localhost behind Nginx.
- Updated `.env.example` with `HOST=127.0.0.1`.

## Checks

- DNS currently returns two A records:
  - `83.222.26.253`
  - `95.163.244.138`
- Stage 10 requires `finforbiz.pro` to point to `83.222.26.253`; the extra A record should be removed if it is not intended.
- Ports `80` and `443` are reachable on `83.222.26.253`.
- HTTP currently redirects to HTTPS and reports `Server: Caddy`.
- HTTPS currently fails during TLS handshake from the local environment.
- SSH port `22` check timed out from the current environment.
- Node.js is not installed in the local Windows environment, so backend syntax/runtime checks must be performed on the Ubuntu server after Node.js installation.
- Rechecked SSH with external network access for `irina@83.222.26.253` using key-only mode:
  - server is reachable on port `22`;
  - authentication failed with `Permission denied (publickey)`;
  - the available local SSH key is not accepted for user `irina`.
- Rechecked again with verbose SSH output:
  - local client offered `C:\Users\User\.ssh\id_ed25519`;
  - offered public key fingerprint: `SHA256:HhWqbS7XgujZgw0pihmzvyR4gQjuzZm6cg3zFaG+Fy0`;
  - server rejected that key for user `irina`.

## Blockers for actual server changes

- SSH login command is needed, for example `ssh root@83.222.26.253` or `ssh username@83.222.26.253`.
- A valid SSH key must be added to `/home/irina/.ssh/authorized_keys`, or the correct private key must be made available locally.
- If SSH uses a non-standard port, that port is needed.
- Server-side changes were not applied yet because SSH access was not established.

## Next action

After SSH access is available:

1. Connect to the Ubuntu server.
2. Check Ubuntu version.
3. Install packages.
4. Create `/var/www/finforbiz/current`.
5. Create `/etc/finforbiz.env`.
6. Install the systemd and Nginx configs.
7. Fix DNS if needed.
8. Issue Let's Encrypt SSL.
