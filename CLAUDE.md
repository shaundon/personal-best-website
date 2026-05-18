# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run the site locally with livereload:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Run Playwright tests:

```sh
npx playwright test                  # all browsers (chromium, firefox, webkit)
npx playwright test tests/example.spec.ts          # single file
npx playwright test -g "has title"                 # single test by name
npx playwright show-report           # open the last HTML report
```

Playwright has no `webServer` configured, so the dev server must be running separately (or tests must target an absolute URL). The current `tests/example.spec.ts` is the Playwright scaffold pointing at `playwright.dev` — real tests have not been written yet.

## Architecture

Jekyll 3.9 static site deployed to GitHub Pages (`CNAME` → `getpersonalbest.com`). Output is built to `_site/` and committed; `_site/` is also gitignored at the top level — Pages builds from source on push.

Page model:
- `_layouts/default.html` wraps every page (head + header + main + footer). `_layouts/page.html` extends `default` and wraps content in `<article class="page">`. Most markdown pages use `layout: page`; `index.markdown` uses `layout: default` so the hero can render edge-to-edge.
- `_includes/head.html` is the single source for `<head>`. It uses the `{% seo %}` tag from `jekyll-seo-tag` (a github-pages plugin) — page metadata comes from front matter, and the default social image is set via the `defaults` block in `_config.yml`.
- The `app_banner` front matter key (e.g. `app_banner: id1510256676`) emits the iOS Smart App Banner meta tag. `app_clip` pairs with it for App Clip bundles.
- The header in `_includes/header.html` carries `data-sticky-header`; `assets/main.js` toggles `is-scrolled` on it based on `window.scrollY`. That's the only JS on the site.

Styling:
- `assets/main.scss` is the single stylesheet (front matter dashes opt it into Sass processing → `assets/main.css`). Design tokens live in `:root` at the top of the file, with a `prefers-color-scheme: dark` block overriding them. Components use BEM-ish class names (`hero__phone--left`, `site-header__cta`).
- `light-mode-only` / `dark-mode-only` classes (used in the hero for the two phone trios) gate visibility by colour scheme.
- Inter is self-hosted from `assets/fonts/` and preloaded in `head.html`.

Content pages live at the repo root as `.markdown` files with explicit `permalink:` front matter (`/press`, `/redeem`, `/privacy-policy`). New top-level pages should follow the same pattern rather than relying on filename-based URLs.

## Gotchas

- `_config.yml` is not reloaded by `jekyll serve` — restart the server after editing it.
- Pin to `github-pages` gem versions (currently `~> 228`); arbitrary Jekyll plugins won't work on GitHub Pages.
- The `.well-known/` directory is explicitly included via `include:` in `_config.yml` (Jekyll excludes dotfiles by default).
