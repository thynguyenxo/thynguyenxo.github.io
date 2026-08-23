# design-portfolio

Design portfolio of Thy Nguyen, built with [Astro](https://astro.build) and
deployed to [Cloudflare Pages](https://pages.cloudflare.com).

## Development

```sh
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Deployment

Pushing to `main` triggers a Cloudflare Pages build (`npm run build`, output
`dist/`). No manual deploy step is needed.

`.github/workflows/refresh.yml` calls a Cloudflare deploy hook on the 1st of
each month so the baked-in copyright year stays current. It needs the
`CLOUDFLARE_DEPLOY_HOOK` repository secret.

Some case studies are password-gated by `functions/_middleware.ts`, which runs
at the edge before any file is served. See the hosting section of
[NOTES.md](./NOTES.md).

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
