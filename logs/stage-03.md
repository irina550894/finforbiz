# Stage 3 log: one-page content structure

Date: 2026-07-15
Branch: `dev`

## Scope

Stage 3 covers the content structure of the one-page website. The goal is to confirm that all required blocks are present, ordered correctly, and addressable through stable anchors where useful.

## Actions completed

- Checked the current `index.html` section order against the technical specification.
- Confirmed the page already includes the required blocks:
  - header with anchor navigation;
  - hero screen with offer, CTA, dashboard visual, and local photo;
  - problems section;
  - video section with local video;
  - about section;
  - collaboration formats;
  - portfolio;
  - cases and reviews;
  - FAQ;
  - contact block and form;
  - footer.
- Added missing stable anchors:
  - `#problems`
  - `#video`
  - `#workflow`
  - `#reviews`
  - `#faq`
- Added `docs/site-structure.md` with the current page order and anchor map.

## Files changed or added

- `index.html`
- `docs/site-structure.md`
- `logs/stage-03.md`

## Checks

- Verified the repository was on branch `dev`.
- Verified the page remains one-page.
- Verified the required Stage 3 blocks are present in `index.html`.

## Open questions

- Whether to add more header navigation items later, such as `Видео`, `FAQ`, or `Процесс`, depends on available header space after visual approval.
- `privacy.html` remains planned for the legal/privacy stage and is intentionally not implemented in this stage.

