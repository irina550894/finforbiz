# Mobile media loading check

Date: 2026-07-16
Branch: `dev`

## Scope

Check why images and video may not load in mobile view.

## Findings

- Local project asset paths are valid.
- All referenced `./assets/...` files found in `index.html`, `assets/js/main.js`, and `data/portfolio.json` exist.
- `finforbiz.pro` currently resolves to two A records:
  - `83.222.26.253`
  - `95.163.244.138`
- `http://finforbiz.pro/` responds with Caddy and redirects to HTTPS.
- `https://finforbiz.pro/` and direct HTTPS asset URLs currently fail during TLS handshake from this environment.
- If the site is opened on mobile as a standalone file or Telegram `content://...` document, relative `assets/...` files will not load unless the whole folder is served by an HTTP server.

## Code fix

- Updated `server/contact-server.js` static file serving:
  - added `Accept-Ranges: bytes`;
  - added MP4 byte-range responses with status `206`;
  - added proper `HEAD` handling without streaming the response body;
  - added cache headers for static assets.

## Remaining server actions

- Deploy the latest project files, including the whole `assets` folder.
- Fix DNS so the domain points only to the intended server.
- Fix HTTPS/TLS on the server before testing from mobile by domain.
- After deployment, test:
  - `https://finforbiz.pro/assets/images/irina-biryukova.jpg`
  - `https://finforbiz.pro/assets/video/sistema-otchetov-biznesa.mp4`
