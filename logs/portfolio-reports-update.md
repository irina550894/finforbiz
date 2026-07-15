# Portfolio reports update

Date: 2026-07-15
Branch: `dev`

## Scope

Add 11 dashboard screenshots to the `Отчеты` portfolio card and make it work like the existing `Калькуляторы` and `Модели` galleries.

## Actions completed

- Copied dashboard screenshots from the project root to `assets/images/portfolio/`.
- Renamed them to stable ASCII deployment names:
  - `dashboard-report-01.jpg`
  - `dashboard-report-02.jpg`
  - `dashboard-report-03.jpg`
  - `dashboard-report-04.jpg`
  - `dashboard-report-05.jpg`
  - `dashboard-report-06.jpg`
  - `dashboard-report-07.jpg`
  - `dashboard-report-08.jpg`
  - `dashboard-report-09.jpg`
  - `dashboard-report-10.jpg`
  - `dashboard-report-11.jpg`
- Treated source file `Дашюлод10.jpg` as report 10 based on sequence.
- Changed portfolio item `reports` from placeholder to gallery in `data/portfolio.json`.
- Added `reports` to fallback gallery data in `assets/js/main.js`.
- Updated portfolio rendering so gallery cards can also keep the `wide` layout.
- Added `Даш*.jpg` to `.gitignore` to avoid committing root-level source duplicates.
- Updated `docs/media-inventory.md`.

## Checks

- All 11 copied report images are present under `assets/images/portfolio/`.
- Image sizes are about 93-180 KB each.
- The root source dashboard files are ignored by git and are not intended for deployment.
