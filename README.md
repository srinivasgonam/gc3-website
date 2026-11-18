# GC³ — Global Cloud Capability Center

**Live site: https://srinivasgonam.github.io/gc3-website/**

Marketing site for GC³ by Quantocos: monthly pods of named specialists and AI agents,
priced in credits. Built with React 19, Vite and Tailwind CSS v4.

The visual design (dark palette, gold gradient, Instrument Sans / Source Serif 4 / IBM Plex Mono,
hub diagram hero) follows the [Quantocos GC³ reference site](https://srinivasgonam.github.io/Quantocos-GC3-site/).

## Getting started

```bash
pnpm install   # or: npm install
pnpm dev       # dev server at http://localhost:5173
pnpm build     # production build into dist/
pnpm preview   # preview the production build
```

## Project structure

- `src/App.tsx` — page content and components (hero hub diagram, swipe deck, sections)
- `src/index.css` — layout, responsive rules and design tokens
- `src/theme.css` — reference theme layer (colour, type, surfaces)
- `src/main.tsx` — React entry point
- `public/` — static assets (images, favicon)
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on every push to `main`

## Deployment

Pushing to `main` runs the workflow, which builds with `VITE_BASE=/gc3-website/` and publishes
`dist/` to GitHub Pages. Asset paths go through the `asset()` helper in `App.tsx`, so the site
works both at `/` locally and under `/gc3-website/` when deployed.
