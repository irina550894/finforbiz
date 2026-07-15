# Stage 9 log: local media and server-ready assets

Date: 2026-07-15
Branch: `dev`

## Scope

Stage 9 covers replacing external media with local files, checking media references, and preparing the asset inventory for deployment to the owner's server.

## Actions completed

- Verified that current page media is served from local project paths.
- Confirmed external Yapx and Kinescope media are no longer referenced by the active site.
- Created optimized portrait file:
  - from `assets/images/irina-biryukova.png` at about 2.15 MB;
  - to `assets/images/irina-biryukova.jpg` at about 202 KB.
- Updated `index.html` to use the optimized local JPEG portrait.
- Added width, height, decoding, fetch priority, and lazy-loading attributes for portrait images.
- Kept the video as local MP4 under `assets/video/sistema-otchetov-biznesa.mp4`.
- Added `playsinline` to the HTML5 video player.
- Kept `preload="metadata"` for the video to reduce initial page weight.
- Did not add a video poster because the latest requirement was to keep only video in the video section.
- Added `docs/media-inventory.md`.
- Updated `docs/external-dependencies.md`.

## Checks

- Main portrait path: `./assets/images/irina-biryukova.jpg`.
- Video path: `./assets/video/sistema-otchetov-biznesa.mp4`.
- Portfolio image paths are local under `./assets/images/portfolio/`.
- Active video file size is about 11.79 MB.
- `ffprobe` is not installed in the local environment, so exact video codec and duration were not checked here.

## Open questions

- If mobile loading is slow on the production server, prepare a lighter MP4 version before or after deployment.
- During deployment, verify that the entire `assets` folder is uploaded to the server.
