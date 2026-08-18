# Project conventions

Read this before making changes. These are standing rules for this repo, not
one-off preferences.

## Non-negotiables

1. **Use the design tokens.** Never hardcode a color, font size, spacing value,
   or line height. Everything lives in `src/styles/tokens.css`. Reuse an
   existing token before adding one — see "Reuse tokens" below.
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
Light = node `1147:4018`, dark = node `1159:8485`. Both publish their own
values, so tokens can be read straight from the API.

Colors are a **50–950 grey ramp** of primitives, with semantic tokens pointing
at steps: `--color-text-main: var(--grey-950)`. Change a step and every use
follows. Pure white and black sit outside the ramp as `--white` / `--black`.

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

### Reuse tokens; don't add new ones

**Before adding a token, check whether an existing one already carries that
value.** The set is deliberately small, and every near-duplicate is a chance
for two things that should match to drift apart.

- Search `tokens.css` for the value first — `0.5rem` is `--sm`, not a new
  `--gap-small`.
- If a design hands you a value with no token, prefer the nearest existing
  step over a new entry. Raise it rather than quietly widening the scale.
- A genuinely new token needs a distinct *role*, not just a distinct number.
  `--color-text-error` earns its place because it is deliberately outside the
  grey ramp; `--item-spacing-xxs` did not, because it duplicated the spacing
  scale it sat beside.
- Semantic tokens should reference primitives (`--color-text-main:
  var(--grey-950)`), so a change to a step flows everywhere it is used.

Removed for this reason, in case a design references them: `--reset` (unused),
`--item-spacing-xxs` (one use, folded into `--sm`), and `--item-spacing-8`
(a duplicate of `--sm`).

### Check for dangling references

CSS fails silently: `var(--does-not-exist)` renders as though the property
were never set, with no error and nothing in the console. After removing or
renaming a token, confirm nothing still points at it:

```sh
grep -rhoE '\-\-[a-z0-9-]+' src/components src/pages src/layouts | sort -u |
  while read t; do grep -q -- "$t:" src/styles/tokens.css || echo "UNDEFINED: $t"; done
```

This has already caught two live bugs — a navbar gap and a card colour, both
silently falling back to browser defaults.

### Layout width and gutter

`--page-max-width` is **1440px**, which puts 1280px of content between the
gutters. Wider screens gain side padding rather than a wider layout.

`--page-gutter` is the shared left/right page inset — **80px at desktop**,
stepping down at 1100px and 640px. Change it in one place, not per component.

`--navbar-height` is an estimate for the first paint only: a script in
`BaseLayout.astro` measures the real navbar and overwrites it, because heroes
subtract it from the viewport and a stale guess left them short twice.

### Surfaces per theme

The footer is **black in both themes**, so text on it does not follow the
theme: it uses `--white` and `--color-text-caption`, which is `grey-400`
either way. The contact form's card pins `--grey-900` directly rather than
using `--color-background-secondary`, which is theme-aware for the case study
surfaces.

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

Known issue, accepted by design decision:

- `--color-text-caption` (`grey-400`, `#a5a5a5`) on white at 12px is
  **2.35:1**; AA requires 4.5:1. It carries the eyebrow labels and captions.
  `grey-500` (`#767676`, 4.54:1) would fix it. The Figma values were
  implemented as specified — raise it with the designer rather than changing
  it silently.

Recheck contrast whenever a grey step moves; several sit close to their
threshold. Note `--color-border-bold` is `grey-300` in dark rather than a
darker step, because on black anything below roughly `#5c5c5c` drops under
the 3:1 that WCAG 1.4.11 expects of a meaningful boundary.

Also required: visible `:focus-visible` rings, a real `<button>` for the theme
toggle, `prefers-reduced-motion` honored, and one link per card (the title link
uses an `::after` overlay to make the whole card clickable without adding a
second tab stop).

## Performance budget

The whole point of Astro here is shipping almost nothing:

- **No JS framework.** No React, no client-side router. Astro components are
  compiled away.
- **Minimal JS.** A handful of small inline scripts: the theme toggle, the
  navbar measurement, the hero scroll sweep, the accordion, and the back to
  top control. No framework and no client-side router.
- **Fonts self-hosted** as WOFF2 in `public/fonts/` (~70KB), not the Google
  CDN — it removes a third-party connection from the critical path. DM Sans is
  preloaded.
- **Images through `astro:assets`** (`<Image />`), always `format="webp"` with
  responsive `widths`. The Tenmin cover goes 140KB PNG → 12/31/39KB WebP.
- **Icons inlined at build time.** `@fortawesome/fontawesome-free` is a
  **devDependency**; `Icon.astro` reads the SVG off disk during the build, so
  no icon font and no Font Awesome JS ever reach the browser.

Media is placeholder-first: `MediaBlock` holds each frame's aspect ratio from
the design, so the page keeps its shape before artwork exists and dropping a
file in causes no layout shift.

## Security

The site is static and collects no user input, which removes most of the attack
surface. What's in place:

- **Content-Security-Policy** via `<meta http-equiv>` in `BaseLayout.astro`
  (GitHub Pages cannot send custom headers). Everything is `'self'` apart from
  `api.web3forms.com`, which the contact form posts to and which must appear in
  **both** `connect-src` and `form-action`. `frame-ancestors 'none'` blocks
  clickjacking and `object-src 'none'` blocks plugin embedding.
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
