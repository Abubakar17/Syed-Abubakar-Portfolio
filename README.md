# Syed Muhammad Abubakar Portfolio

Single-page portfolio (React + Vite), deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`.

https://abubakar17.github.io/Syed-Abubakar-Portfolio/

## Run locally

```bash
npm install
npm run dev      # development
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Where things live

- `src/data/content.js` — every fact on the site. Edit text here, not in components. `TODO("...")` values render as visible placeholders.
- `src/components/` — one file per home section; `Cases.jsx` holds the case-study pages (`#/deepdive`, `#/aal`, `#/lidar`), and `Pipeline.jsx` is the interactive DeepDive diagram.
- `src/index.css` — tokens and styles. Design rules and decision log: `DESIGN.md`.
- `public/` — CV PDF, favicon, Open Graph image, self-hosted Inter font.
