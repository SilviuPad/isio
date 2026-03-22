---
phase: 01-foundation
plan: 03
subsystem: ui
tags: [astro, tailwind, tailwindcss-v4, i18n, seo, hreflang, astro-seo, layout, components, robots-txt]

# Dependency graph
requires:
  - 01-01 (Astro project scaffold, i18n utils, slugMap, astro-seo installed)
  - 01-02 (Sanity schemas and src/lib/sanity.ts with LocaleString/localize helpers)
provides:
  - Base.astro: HTML shell with astro-seo, hreflang (ro + en + x-default), canonical URL, OG tags, Twitter cards
  - Page.astro: page chrome wrapping Header + main slot + Footer inside Base
  - Header.astro: bilingual navigation with localePath() links and LanguageSwitcher
  - Footer.astro: bilingual copyright with correct Romanian comma-below diacritics
  - LanguageSwitcher.astro: links to equivalent page in other locale via roSlug/enSlug props
  - src/styles/global.css: Tailwind v4 via @import "tailwindcss"
  - public/robots.txt: blocks /studio/ from indexing, declares sitemap URL
affects:
  - All subsequent page components (all wrap content in Page.astro)
  - Phase 2 (service pages, portfolio, pricing — all use Page.astro layout)
  - Phase 3 (admin pages — will bypass Page.astro, use different layout)
  - SEO tooling (robots.txt and sitemap URL are live from first deploy)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Layout nesting: Base.astro (HTML shell) -> Page.astro (chrome) -> page content"
    - "SEO via astro-seo SEO component: languageAlternates array with ro, en, x-default entries"
    - "x-default hreflang always points to RO (root) variant — international users default to Romanian agency"
    - "LanguageSwitcher receives full roSlug/enSlug paths as props — NOT getRelativeLocaleUrl() which misses translated slugs"
    - "Nav labels defined as local Record<Locale, ...> object matching i18n JSON values — avoids hardcoded divergence"
    - "Unicode escapes \\u021B and \\u00A9 used in TypeScript string literals — resolve correctly at runtime"

key-files:
  created:
    - src/layouts/Base.astro
    - src/layouts/Page.astro
    - src/components/layout/Header.astro
    - src/components/layout/Footer.astro
    - src/components/layout/LanguageSwitcher.astro
    - src/styles/global.css
    - public/robots.txt
  modified: []

key-decisions:
  - "x-default hreflang points to RO variant — solo agency primarily serves Romanian market"
  - "LanguageSwitcher uses roSlug/enSlug props not getRelativeLocaleUrl() — preserves translated slugs (D-05)"
  - "Nav labels match i18n JSON catalog values — no divergence possible, Paraglide swap is trivial later"
  - "Unicode escapes \\u021B for comma-below t in TypeScript literals — JS resolves correctly at runtime"

patterns-established:
  - "All pages wrap content in <Page locale={locale} roSlug={roSlug} enSlug={enSlug} title={...} description={...}>"
  - "Page-level components call getAlternateLocaleSlug(Astro.url) to get roSlug/enSlug for props"
  - "Header/Footer nav labels use local Record<Locale, string> object — matches i18n JSON, ready for Paraglide swap"

requirements-completed: [I18N-02, I18N-04, SEO-03, SEO-04, SEO-05]

# Metrics
duration: 5min
completed: 2026-03-21
---

# Phase 1 Plan 03: Layout System + SEO + Navigation Summary

**Base.astro + Page.astro layout stack with astro-seo hreflang (ro/en/x-default), bilingual Header/Footer/LanguageSwitcher, Tailwind v4 global CSS, and robots.txt blocking /studio/**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-21T11:45:44Z
- **Completed:** 2026-03-21T11:50:58Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Base.astro provides every page with hreflang (ro + en + x-default), canonical URL, OG tags, and Twitter card meta via astro-seo component
- Page.astro composes Header + main + Footer inside Base — pages simply wrap content in `<Page>` with locale/slug props
- LanguageSwitcher links to the equivalent page in the other locale using full path props — no homepage redirect pitfall
- Header navigation uses localePath() for locale-aware route slugs, labels match i18n message catalog exactly
- robots.txt blocks /studio/ from indexing and declares sitemap URL — build completes with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Base.astro and Page.astro layouts with SEO meta tags and hreflang** — `d9f3574` (feat)
2. **Task 2: Create Header, Footer, and LanguageSwitcher components** — `063ee10` (feat)

## Files Created/Modified

- `src/layouts/Base.astro` — HTML shell: astro-seo with languageAlternates (ro, en, x-default), canonical, OG tags, Twitter cards; html lang set per locale
- `src/layouts/Page.astro` — Page chrome: Header + main slot + Footer inside Base, passes locale/slug props through
- `src/components/layout/Header.astro` — Site nav: localePath() hrefs, bilingual labels matching i18n JSON, aria-label, LanguageSwitcher integration
- `src/components/layout/Footer.astro` — Bilingual footer: copyright with U+021B comma-below Romanian diacritics, privacy policy link
- `src/components/layout/LanguageSwitcher.astro` — Language toggle: roSlug/enSlug prop-driven links, aria-current, aria-label, hreflang on anchor tags
- `src/styles/global.css` — Tailwind v4: @import "tailwindcss" (not v3 directives), scroll-behavior, font stack
- `public/robots.txt` — Crawler directives: Allow: /, Disallow: /studio/ and /studio, Sitemap: URL

## Decisions Made

- `x-default` hreflang points to RO variant — Romanian is the primary audience for this solo agency
- LanguageSwitcher receives full `roSlug`/`enSlug` paths as props instead of using `getRelativeLocaleUrl()` — the Astro helper only adds a locale prefix and would miss translated slug differences (D-05 constraint)
- Nav labels are local Record objects matching i18n JSON catalog values — no hardcoded divergence, trivial to swap to Paraglide `m.nav_services()` calls when compiler output is wired
- Unicode escape sequences (`\u021B`, `\u00A9`) used in TypeScript string literals for Romanian diacritics — these are valid ECMAScript escapes that resolve to the correct codepoints at runtime

## Deviations from Plan

None — plan executed exactly as written. Build passes with zero errors on all 7 created files.

## Issues Encountered

None. The `\u021B` (comma-below t) check during verification initially appeared to fail because the static analysis was searching for the literal character in the source file, while the file correctly uses the TypeScript Unicode escape `\u021B`. Node.js confirmed the escape resolves to codepoint 0x021B (U+021B LATIN SMALL LETTER T WITH COMMA BELOW) at runtime — functionally identical.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All pages can now wrap content in `<Page locale={locale} roSlug={roSlug} enSlug={enSlug} title={...} description={...}>` to get the full layout stack with SEO
- Phase 2 pages should call `getAlternateLocaleSlug(Astro.url)` to populate `roSlug`/`enSlug` props from the slugMap
- robots.txt is live on first deploy — crawler directives and sitemap URL are set correctly
- Phase 1 Foundation is complete: project scaffold (01-01) + CMS schemas (01-02) + layout system (01-03)

---
*Phase: 01-foundation*
*Completed: 2026-03-21*

## Self-Check: PASSED

All files found on disk. Both commits verified in git history.

| Check | Result |
|-------|--------|
| src/layouts/Base.astro | FOUND |
| src/layouts/Page.astro | FOUND |
| src/components/layout/Header.astro | FOUND |
| src/components/layout/Footer.astro | FOUND |
| src/components/layout/LanguageSwitcher.astro | FOUND |
| src/styles/global.css | FOUND |
| public/robots.txt | FOUND |
| .planning/phases/01-foundation/01-03-SUMMARY.md | FOUND |
| commit d9f3574 | FOUND |
| commit 063ee10 | FOUND |
