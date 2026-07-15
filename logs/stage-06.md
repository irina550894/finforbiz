# Stage 6 log: editable content data

Date: 2026-07-15
Branch: `dev`

## Scope

Stage 6 covers structured editable content for services, cases, reviews, and portfolio.

## Actions completed

- Populated `data/services.json` with the current collaboration format cards.
- Populated `data/cases.json` with the current case carousel content.
- Populated `data/reviews.json` with the current review carousel content.
- Populated `data/portfolio.json` with the current portfolio cards and gallery image mapping.
- Added data markers to `index.html`:
  - `data-services-grid`;
  - `data-portfolio-grid`;
  - `data-cases-track`;
  - `data-reviews-track`.
- Refactored `assets/js/main.js` so JSON content can render into the existing interface.
- Preserved the existing static HTML as fallback when JSON cannot be loaded.
- Kept carousel dots and swipe behavior working after dynamic case/review rendering.
- Kept portfolio modal galleries working after dynamic portfolio rendering.
- Added `docs/content-data.md` with editing rules and data schema notes.

## Files changed or added

- `index.html`
- `assets/js/main.js`
- `data/services.json`
- `data/cases.json`
- `data/reviews.json`
- `data/portfolio.json`
- `docs/content-data.md`
- `logs/stage-06.md`

## Checks

- JSON files should parse as valid JSON.
- The page should still show fallback content if JSON loading is unavailable.
- On a web server, updates to the JSON files should update the relevant sections without editing HTML.

## Open questions

- A future mini-admin panel may be added later if file editing is not convenient.
- Stage 6 does not yet add persistence, authentication, or a CMS.

