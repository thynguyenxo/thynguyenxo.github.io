# Protected artwork — wemolo-ds

Artwork for a password-gated case study belongs here, **not** in
`src/assets/<slug>/`.

Astro processes `src/assets/**` and emits it to a shared, flat `dist/_astro/`
directory. That directory holds every public page's images too, so it cannot
be gated per project — a protected page's artwork would end up publicly
fetchable at an `/_astro/…` URL while the page itself asked for a password.

Files in `public/` are copied verbatim, so these land at
`/protected/wemolo-ds/…` and are matched by `PROTECTED_PREFIXES` in
`functions/_middleware.ts`.

The trade: no `<Image>` optimisation here. Export the webp at the size it will
be displayed (2x for retina) and reference it with a plain `<img>`.

Adding another protected project means creating a sibling directory and adding
both its prefixes to `PROTECTED_PREFIXES`.
