# Stage 4 log: collaboration formats

Date: 2026-07-15
Branch: `dev`

## Scope

Stage 4 covers the collaboration format cards: prices, positioning, included items, and CTA links.

## Actions completed

- Checked the current `#formats` block in `index.html`.
- Confirmed the block contains four formats:
  - `Контроль`;
  - `Развитие`;
  - `Партнерство`;
  - `Проект`.
- Confirmed prices match the technical specification:
  - `Контроль`: `от 65 000 ₽ / мес`;
  - `Развитие`: `от 150 000 ₽ / мес`;
  - `Партнерство`: `по запросу`;
  - `Проект`: `по запросу`.
- Confirmed the project format includes `Индивидуальные сервисы под автоматизацию задач`.
- Confirmed each format has a CTA link to `#contacts`.
- Added `docs/collaboration-formats.md` to document the current content and acceptance status.

## Files changed or added

- `docs/collaboration-formats.md`
- `logs/stage-04.md`

## Checks

- Verified the repository was on branch `dev`.
- Verified no visual change was required because the format block already matched Stage 4 requirements.

## Open questions

- The exact service composition can be refined later after business review.
- In Stage 6, the formats may be moved into `data/services.json` to make them easier to update.

