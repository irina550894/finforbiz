# Stage 1 log: project and materials preparation

Date: 2026-07-15
Branch: `dev`

## Scope

Stage 1 covers project structure preparation, current source preservation, local media placement, external dependency inventory, and execution logging.

## Actions completed

- Confirmed the working branch is `dev`.
- Confirmed there is no `.openai/hosting.json`; the project is prepared for a custom Ubuntu server rather than OpenAI Sites hosting.
- Copied the current landing page from `finforbiz_remote/index.html` to root `index.html`.
- Copied the current README from `finforbiz_remote/README.md` to root `README.md`.
- Created project folders:
  - `assets/images/`
  - `assets/video/`
  - `assets/css/`
  - `assets/js/`
  - `data/`
  - `server/`
  - `docs/`
  - `logs/`
- Extracted inline CSS from `index.html` to `assets/css/styles.css`.
- Extracted inline JavaScript from `index.html` to `assets/js/main.js`.
- Copied local photo to `assets/images/irina-biryukova.png`.
- Copied local video to `assets/video/sistema-otchetov-biznesa.mp4`.
- Added JSON placeholders for future editable content:
  - `data/services.json`
  - `data/cases.json`
  - `data/reviews.json`
  - `data/portfolio.json`
- Added `docs/external-dependencies.md` with the current external links inventory.
- Added `.gitignore` entry for `finforbiz_remote/` to avoid committing the analysis clone.

## Important notes

- The root `index.html` still contains the original external media references. Replacing them with local assets is planned for the media integration stage.
- The current code is still a static one-file landing page. Backend, form delivery, visual redesign, privacy page, and JSON-driven content are planned for later stages.
- `finforbiz_remote/` remains available locally as an analysis copy but is intentionally ignored by git.

## Files changed or added

- `.gitignore`
- `README.md`
- `index.html`
- `assets/css/styles.css`
- `assets/js/main.js`
- `assets/images/irina-biryukova.png`
- `assets/video/sistema-otchetov-biznesa.mp4`
- `data/services.json`
- `data/cases.json`
- `data/reviews.json`
- `data/portfolio.json`
- `server/.gitkeep`
- `docs/external-dependencies.md`
- `logs/stage-01.md`

## Open questions

- Should Google Fonts be self-hosted or replaced with system fonts?
- Should Tailwind be replaced by a local CSS build or by hand-written CSS during the visual redesign?
- Should the first production backend be Node.js, PHP, or another stack supported on the Ubuntu server?
