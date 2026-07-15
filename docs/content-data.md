# Editable content data

Stage 6 introduces JSON-based editable content for the site.

The current implementation keeps static HTML as a fallback and loads JSON on top of it when the page is served through a web server. If JSON loading fails, the existing fallback content remains visible.

## Files

### `data/services.json`

Controls the collaboration format cards in `#formats`.

Main fields:

- `tag`
- `title`
- `price`
- `period`
- `featured`
- `items`
- `ctaLabel`
- `ctaStyle`
- `ctaHref`

Adding a new object adds a new format card.

### `data/cases.json`

Controls the case carousel.

Main fields:

- `category`
- `title`
- `description`

Adding a new object adds a new case slide.

### `data/reviews.json`

Controls the review carousel.

Main fields:

- `label`
- `quote`
- `author`
- `role`

Adding a new object adds a new review slide.

### `data/portfolio.json`

Controls the portfolio cards and modal galleries.

Main fields:

- `id`
- `type`: `gallery` or `placeholder`
- `label`
- `title`
- `description`
- `wide`
- `theme`
- `actionLabel`
- `galleryTitle`
- `metrics`
- `images`

For gallery items, `images` contains:

- `src`
- `caption`

Adding a new gallery object creates a clickable portfolio card. Adding images to a gallery extends the modal gallery.

## Runtime behavior

`assets/js/main.js` loads the JSON files with `fetch()`.

If the page is opened directly as a local file or through a context where `fetch()` cannot load adjacent JSON files, the static HTML fallback remains visible. This is intentional.

## Editing rules

- Keep JSON valid: use double quotes around strings.
- Keep image paths relative to `index.html`.
- Use server-safe filenames for new assets.
- Add new portfolio images under `assets/images/portfolio/`.

