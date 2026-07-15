# Stage 2 log: dashboard visual redesign

Date: 2026-07-15
Branch: `dev`

## Scope

Stage 2 covers the first visual redesign pass. The goal is to make the site inspectable in a dashboard-inspired style before backend, deployment, and production form delivery are implemented.

## Actions completed

- Replaced the previous Tailwind-heavy page with a custom static HTML structure.
- Removed Tailwind CDN and Google Fonts references from the new page.
- Built the first screen around a finance dashboard metaphor:
  - dark sidebar;
  - metric cards;
  - payment calendar route;
  - reporting and decision cards.
- Applied the new visual direction:
  - warm light background;
  - deep purple navigation and accents;
  - lilac and peach supporting surfaces;
  - rounded financial dashboard cards;
  - denser business-focused layout.
- Added local image usage from `assets/images/irina-biryukova.png`.
- Added local video usage from `assets/video/sistema-otchetov-biznesa.mp4`.
- Added an open portfolio section as part of the visual prototype.
- Updated collaboration format prices:
  - Control: from 65,000 RUB/month.
  - Development: from 150,000 RUB/month.
- Updated the project format wording to include individual services for task automation.
- Added a visual-only contact form state. Real email and Telegram delivery remains planned for the backend stage.
- Added responsive CSS for desktop and mobile inspection.
- Verified that the active page no longer contains references to Tailwind CDN, Google Fonts, Yapx, or Kinescope.
- Verified that the active page references local media:
  - `assets/images/irina-biryukova.png`
  - `assets/video/sistema-otchetov-biznesa.mp4`
- Checked UTF-8 rendering for key Russian HTML content through PowerShell.

## Follow-up visual revisions

- Updated header logo text from `FB` to `FFB`.
- Increased the hero eyebrow "Финансовый директор на аутсорсе" by approximately 1.5x.
- Reduced the main hero headline "Порядок в деньгах без сотрудника в штате" by approximately 1.3x.
- Enlarged the expert photo inside the top dashboard card.
- Tightened section spacing and card heights so each main screen is closer to one visible viewport on desktop.
- Added the "Как выстраивается работа" section after the collaboration formats block.
- Rebuilt "Кейсы и отзывы" as two swipeable carousels with three slides each.
- Expanded FAQ from three items to five, matching the original content scope.
- Added carousel controls, dots, and pointer swipe support.
- Added mobile layout adjustments for the updated dashboard, workflow, carousels, and FAQ.
- Removed the photo poster from the video section so the block shows only the video player.
- Added a soft hover zoom for the expert photo in the first-screen dashboard card.
- Further tightened desktop spacing for 15-inch monitor visibility.
- Added the "Отрасль бизнеса" field to the contact form.
- Reworked mobile typography, dashboard layout, buttons, form fields, and card spacing for better readability.
- Added critical inline CSS to `index.html` so the mobile page remains readable even when opened as a single `content://` file from Telegram and the external CSS file is not loaded.
- Added image load fallbacks to hide broken local image placeholders when the HTML is opened without its `assets/` folder.
- Added portfolio gallery behavior for the existing portfolio section.
- Copied portfolio images to server-safe paths:
  - `assets/images/portfolio/financial-model-1.jpg`
  - `assets/images/portfolio/financial-model-2.jpg`
  - `assets/images/portfolio/financial-model-3.jpg`
  - `assets/images/portfolio/financial-model-4.jpg`
  - `assets/images/portfolio/calculator-kpi.jpg`
  - `assets/images/portfolio/calculator-taxes-1.jpg`
  - `assets/images/portfolio/calculator-taxes-2.jpg`
- Made only "Калькуляторы" and "Модели" interactive in the portfolio section.
- Kept "Отчеты" and "Автоматизация" as non-clickable placeholders until real materials are added.
- Added a fullscreen darkened modal gallery with close button, previous/next controls, counter, keyboard navigation, and pointer swipe support.
- Removed the three lower statistic cards from the first screen.
- Moved the first-screen CTA buttons lower to add more breathing room.
- Narrowed the "Платежный календарь" card by roughly one third on desktop, with full-width fallback on mobile.
- Updated the "Обо мне" text with the new 20+ years, education, financing, profit growth, and budgeting wording.

## Important notes

- This is a visual prototype stage, not the backend stage.
- The contact form does not send real requests yet.
- `privacy.html` is linked but will be implemented in the privacy stage.
- JSON-driven content is still planned for a later stage; the current visual prototype uses static content.
- `node --check` could not be completed in this environment because the command did not return before timeout. The JavaScript file is small and was reviewed directly.

## Files changed or added

- `index.html`
- `assets/css/styles.css`
- `assets/js/main.js`
- `docs/external-dependencies.md`
- `logs/stage-02.md`

## How to verify visually

- Open `index.html` locally in a browser.
- Check the first screen, dashboard metaphor, colors, typography, cards, portfolio block, pricing cards, contact form, and mobile layout.

## Open questions

- Should the dashboard visual be more corporate and restrained, or more warm and premium?
- Should the first screen include more of Irina's real photo or focus mostly on dashboard widgets?
- Should the portfolio section show screenshots/files from real reports in the next pass?
