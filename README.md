# thynguyenxo.github.io

Design portfolio of Thy Nguyen, built with [Astro](https://astro.build) and
deployed to GitHub Pages.

## Development

```sh
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. No manual deploy step is needed.

## Structure

```
src/
  layouts/   shared page shells
  pages/     routes — each .astro file becomes a page
public/      static assets served verbatim from the site root
```

## History

Version 1 of this site (a React + Vite landing page) is archived at
[thynguyenxo-portfolio-v1-archive](https://github.com/thynguyenxo/thynguyenxo-portfolio-v1-archive).
