# Media inventory

Current status after Stage 9: site media is served from local project files and should be deployed with the project to `finforbiz.pro`.

## Images

| File | Use | Size |
| --- | --- | ---: |
| `assets/images/irina-biryukova.jpg` | Main portrait in hero and about sections | 202 KB |
| `assets/images/irina-biryukova.png` | Source portrait, not referenced by the page | 2.15 MB |
| `assets/images/portfolio/calculator-kpi.jpg` | Portfolio gallery: calculators | 125.5 KB |
| `assets/images/portfolio/calculator-taxes-1.jpg` | Portfolio gallery: calculators | 131.8 KB |
| `assets/images/portfolio/calculator-taxes-2.jpg` | Portfolio gallery: calculators | 133.5 KB |
| `assets/images/portfolio/financial-model-1.jpg` | Portfolio gallery: models | 210.6 KB |
| `assets/images/portfolio/financial-model-2.jpg` | Portfolio gallery: models | 308.9 KB |
| `assets/images/portfolio/financial-model-3.jpg` | Portfolio gallery: models | 214.9 KB |
| `assets/images/portfolio/financial-model-4.jpg` | Portfolio gallery: models | 147.3 KB |

## Video

| File | Use | Size |
| --- | --- | ---: |
| `assets/video/sistema-otchetov-biznesa.mp4` | Video section, HTML5 player | 11.79 MB |

## Implementation notes

- The site does not use external Yapx or Kinescope media.
- The video uses an HTML5 `<video>` player with `preload="metadata"` and `playsinline`.
- A poster image is intentionally not used because the latest visual requirement was to keep only video in the video section.
- The first portrait image uses `fetchpriority="high"`; the about-section portrait uses `loading="lazy"`.
- If mobile loading feels slow after deployment, prepare an additional compressed video file and switch the source to that file.
