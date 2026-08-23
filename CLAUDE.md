# thynguyenxo.github.io

Design portfolio built with Astro, deployed to Cloudflare Pages from `main`
of the public `thynguyenxo.github.io` repository.

**Read [NOTES.md](./NOTES.md) before changing anything.** It carries the
standing conventions for this repo: design tokens, rem-over-px, Font Awesome
Free icons, the performance budget, and the security rules. They are
requirements, not suggestions.

The short version:

- Use tokens from `src/styles/tokens.css` — never hardcode colors, sizes, or
  spacing.
- Use `rem`; `px` only for hairline borders and media query breakpoints.
- Icons come from `src/components/Icon.astro` (Font Awesome Free, inlined at
  build time). Never hand-draw SVG paths.
- Extract reusable components rather than repeating markup.
- Keep the site JS-free apart from the inline theme script.
- `npm run check` must stay at 0 errors.
