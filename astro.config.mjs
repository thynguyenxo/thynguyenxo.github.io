import { defineConfig } from 'astro/config';

// Served from the domain root, so no `base` path is needed. Update `site` to
// the custom domain if one is added — it feeds canonical URLs, so a stale
// value points search engines at the wrong host.
export default defineConfig({
  site: 'https://design-portfolio.pages.dev',
});
