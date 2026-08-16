# Project conventions

Read this before making changes. These are standing rules for this repo, not
one-off preferences.

## Non-negotiables

1. **Use the design tokens.** Never hardcode a color, font size, spacing value,
   or line height. Everything lives in `src/styles/tokens.css`. If a value you
   need is missing, add a token — don't inline a literal.
2. **Use `rem`, not `px`.** The only exceptions are hairline borders
   (`--stroke-weight-border`) and media query breakpoints, which stay in `px`
   deliberately. `rem` keeps the layout scaling with the visitor's browser
   font-size setting, which matters for accessibility.
3. **Icons come from Font Awesome Free**, via `src/components/Icon.astro`.
   Never hand-draw an SVG path and never add another icon library.
4. **Favor reusable components.** If markup appears twice, extract it. Speed
   and consistency both depend on this.
5. **Keep it fast.** See the performance budget below.

## Design tokens

Source: Figma `xT2es8olIUtCNago606WmE` — "Portfolio v.4".
Light = node `1147:4018`, dark = node `1147:733`.

⚠️ **The Figma API returns light values for _both_ nodes.** The dark palette
lives in a Figma variable mode that `get_variable_defs` resolves to its light
default. The dark values in `tokens.css` were read from the rendered design and
confirmed by the designer. If you re-sync tokens from Figma, you will silently
overwrite dark mode with light values — check the rendered output, not just the
API response.

### Naming

Tokens mirror the Figma variable names:

| Figma                      | CSS                           |
| -------------------------- | ----------------------------- |
| `color/text/main`          | `--color-text-main`           |
| `color/background/primary` | `--color-background-primary`  |
| `font size/64`             | `--font-size-64`              |
| `line height/76_8`         | `--line-height-76-8`          |
| `xxl`                      | `--xxl`                       |

Line heights are **unitless** (design value ÷ font size) so they scale
correctly. Letter spacing is in **em** for the same reason.

### Layout width and gutter

`--page-max-width` is **1800px**, and every full-width section uses it, so the
navbar, hero, cards and footer share one measure.

`--page-gutter` is the shared left/right page inset — **80px at desktop**,
stepping down at 1100px and 640px. Change it in one place, not per component.

### Surfaces per theme

The footer is **not** a fixed dark slab. It is `#262626` in light mode and
`#000000` in dark, matching the page background so the two read as one field.
`--color-text-on-footer` / `--color-text-on-footer-muted` are fixed white and
grey because the footer surface is dark in both themes — check both if you
change them.

## Theming

Light is the base. Dark applies when the OS asks for it **or** when the visitor
chooses it explicitly:

- OS preference → `@media (prefers-color-scheme: dark)`, scoped with
  `:root:not([data-theme='light'])` so an explicit light choice wins.
- Explicit choice → `:root[data-theme='dark']`, stamped on `<html>` and stored
  in `localStorage`.
- An inline script in `BaseLayout.astro` applies the stored choice **before
  first paint** to avoid a flash. Keep it inline and keep it first.

⚠️ Never nest the dark-mode blocks inside another media query. A formatter did
this once and silently limited dark mode to screens under 640px.

## Accessibility

Target: **WCAG 2.2 AA**.

Known issue, unresolved by design decision:

- `--color-text-tertiary` / `--color-text-caption` (`#8d8d8d`) on white at 14px
  is **3.32:1**; AA requires 4.5:1. Affects the project card's client label and
  captions in light mode. `#767676` (4.54:1) would fix it. The Figma value was
  implemented as specified — raise it with the designer rather than silently
  changing it.

Passing but tight — don't darken these without rechecking:

- Hero grey `#8d8d8d` at 64px on white: **3.32:1** (large text needs 3.0).
- Footer copyright `#8d8d8d` on the light-mode footer `#262626`: **4.56:1**.

Dark mode has plenty of headroom since the background went to pure black —
hero grey `#707070` is 4.24:1 and the caption grey is 6.33:1 there. Note that
`--color-border-bold` is `#6d6d6d` in dark rather than `#404040`: on black the
darker value fell to 2.03:1, under the 3:1 that WCAG 1.4.11 expects of a
meaningful boundary.

Also required: visible `:focus-visible` rings, a real `<button>` for the theme
toggle, `prefers-reduced-motion` honored, and one link per card (the title link
uses an `::after` overlay to make the whole card clickable without adding a
second tab stop).

## Performance budget

The whole point of Astro here is shipping almost nothing:

- **No JS framework.** No React, no client-side router. Astro components are
  compiled away.
- **No runtime JS bundle.** The only script is the inline theme toggle.
- **Fonts self-hosted** as WOFF2 in `public/fonts/` (~70KB), not the Google
  CDN — it removes a third-party connection from the critical path. DM Sans is
  preloaded.
- **Images through `astro:assets`** (`<Image />`), always `format="webp"` with
  responsive `widths`. The Tenmin cover goes 140KB PNG → 12/31/39KB WebP.
- **Icons inlined at build time.** `@fortawesome/fontawesome-free` is a
  **devDependency**; `Icon.astro` reads the SVG off disk during the build, so
  no icon font and no Font Awesome JS ever reach the browser.

Current output: ~200KB total, 2 pages, no JS bundle.

## Security

The site is static and collects no user input, which removes most of the attack
surface. What's in place:

- **Content-Security-Policy** via `<meta http-equiv>` in `BaseLayout.astro`
  (GitHub Pages cannot send custom headers). Everything is `'self'`;
  `frame-ancestors 'none'` blocks clickjacking, `form-action 'none'` blocks
  form-based exfiltration, `object-src 'none'` blocks plugin embedding.
- `referrer` set to `strict-origin-when-cross-origin`.
- External links carry `rel="noopener noreferrer"`.
- No inline event handlers, no `innerHTML` on user-controlled data.

Rules going forward:

- **Don't add third-party scripts** (analytics, embeds, chat widgets) without
  updating the CSP — they will be blocked, and each one is a supply-chain risk.
- **Don't introduce a form** that posts anywhere without revisiting
  `form-action`.
- `set:html` is used only on build-time-controlled SVG strings. Never pass
  user-supplied or fetched content to it.
- Keep dependencies minimal and prefer devDependencies, so little third-party
  code reaches visitors.

## Adding a project

One entry in `src/data/site.ts` and one image in `src/assets/`:

```ts
{
  slug: 'project-name',        // becomes /project-name
  client: 'Client',
  title: 'What you did',
  description: 'One paragraph.',
  cover: 'figma/project-name.png',
  coverAlt: 'Describe the image.',
}
```

The homepage card and the project page are both generated from this. No new
route file — `src/pages/[slug].astro` handles it.

## Structure

```
src/
  assets/       images + the composed logo.svg
  components/   Navbar, Hero, ProjectCard, Footer, Icon, ThemeToggle
  data/site.ts  site details + the project list (single source of truth)
  layouts/      BaseLayout — head, CSP, theme script
  pages/        index.astro, [slug].astro
  styles/       tokens.css (design tokens), global.css (reset, fonts, base)
public/fonts/   self-hosted WOFF2
```

## Commands

```sh
npm run dev      # localhost:4321, live reload
npm run build    # production build to dist/
npm run preview  # serve the built output
npm run check    # astro check — must stay at 0 errors
```

## Attribution

Icons are [Font Awesome Free](https://fontawesome.com/license/free) 7
(CC BY 4.0). Fonts are DM Sans and DM Mono (SIL OFL 1.1).
