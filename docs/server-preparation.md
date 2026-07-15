# Ubuntu server preparation

Target domain: `finforbiz.pro`
Target IP: `83.222.26.253`

## Current checks from local environment

- DNS currently returns two A records for `finforbiz.pro`:
  - `83.222.26.253`
  - `95.163.244.138`
- The acceptance criterion expects `finforbiz.pro` to point to `83.222.26.253`.
- Ports `80` and `443` are reachable on `83.222.26.253`.
- Current HTTP response redirects to HTTPS and reports `Server: Caddy`.
- Current HTTPS check fails during TLS handshake from the local environment.
- SSH port `22` did not respond from the current environment. Actual SSH access still needs to be checked with the correct SSH command and credentials.

Before SSL is issued, remove the extra A record `95.163.244.138` from DNS if it is not the intended server.

The server appears to already have Caddy. During SSH setup, first check:

```bash
sudo systemctl status caddy
sudo systemctl status nginx
```

Use either Caddy or Nginx for ports `80` and `443`, not both at the same time.

## Required access

Send one of these forms:

```bash
ssh root@83.222.26.253
```

or:

```bash
ssh username@83.222.26.253
```

If SSH uses a non-standard port:

```bash
ssh username@83.222.26.253 -p PORT
```

Do not send passwords or private keys in chat. If password login is used, enter the password only in the SSH prompt.

## Server packages

After SSH login:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y ufw git curl ca-certificates
sudo apt install -y nodejs npm
node -v
npm -v
```

The backend should run on Node.js 18 or newer.

If the server will use Nginx:

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

## Create application user and folders

```bash
sudo adduser --system --group --home /var/www/finforbiz finforbiz
sudo mkdir -p /var/www/finforbiz/current
sudo chown -R finforbiz:www-data /var/www/finforbiz
sudo chmod -R 750 /var/www/finforbiz
```

## Environment file

Create `/etc/finforbiz.env`:

```bash
sudo nano /etc/finforbiz.env
```

Required content:

```text
PORT=3000
HOST=127.0.0.1
SITE_ROOT=.

CONTACT_RECIPIENT_EMAIL=irina550894@gmail.com

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=irina550894@gmail.com
SMTP_PASS=
SMTP_FROM=irina550894@gmail.com
```

Set permissions:

```bash
sudo chown root:finforbiz /etc/finforbiz.env
sudo chmod 640 /etc/finforbiz.env
```

## Install systemd service

Copy `deploy/systemd/finforbiz.service` to:

```bash
sudo cp deploy/systemd/finforbiz.service /etc/systemd/system/finforbiz.service
sudo systemctl daemon-reload
sudo systemctl enable finforbiz
```

The service should be started after the project files are uploaded to `/var/www/finforbiz/current`.

## Install Nginx config

Use this path if the server will be migrated from Caddy to Nginx.

If Caddy is already active on the server, stop it before enabling Nginx:

```bash
sudo systemctl stop caddy
sudo systemctl disable caddy
```

Copy `deploy/nginx/finforbiz.pro.conf` to:

```bash
sudo cp deploy/nginx/finforbiz.pro.conf /etc/nginx/sites-available/finforbiz.pro
sudo ln -s /etc/nginx/sites-available/finforbiz.pro /etc/nginx/sites-enabled/finforbiz.pro
sudo nginx -t
sudo systemctl reload nginx
```

If the default site is enabled and conflicts with the domain:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## Alternative: keep Caddy

If the server should keep Caddy instead of switching to Nginx, copy `deploy/caddy/Caddyfile` to:

```bash
sudo cp deploy/caddy/Caddyfile /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy can issue and renew HTTPS certificates automatically after DNS points correctly to the server.

## Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

## SSL

For Nginx, run only after DNS points only to the target server and Nginx responds on port `80`:

```bash
sudo certbot --nginx -d finforbiz.pro -d www.finforbiz.pro
sudo certbot renew --dry-run
```

For Caddy, SSL is normally automatic after the Caddyfile is valid and DNS points to the server.

## Service checks

```bash
sudo systemctl status nginx
sudo systemctl status finforbiz
curl -I http://127.0.0.1:3000/
curl -I http://finforbiz.pro/
```

After HTTPS is issued:

```bash
curl -I https://finforbiz.pro/
```
