---
phase: 08-sitemap-i18n
plan: 01
subsystem: seo
tags: [sitemap, hreflang, i18n, astro, xml]

# Dependency graph
requires: []
provides:
  - "Full hreflang coverage for all 11 bilingual route pairs in sitemap XML"
  - "Consistent short-code lang attributes (ro/en) across sitemap, HTML head, and html tag"
affects: [seo-audit, deployment]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Explicit serialize function for sitemap hreflang instead of auto-matching"
    - "Route pairs defined inline in astro.config.mjs (not imported from runtime modules)"

key-files:
  created: []
  modified:
    - astro.config.mjs
    - src/layouts/Base.astro

key-decisions:
  - "Inline routePairs in astro.config.mjs rather than importing slugMap from src/i18n/utils.ts to avoid Vite config-context issues"
  - "Use short BCP 47 codes (ro/en) everywhere instead of regional subtags (ro-RO/en-US)"

patterns-established:
  - "Sitemap hreflang: serialize function with hreflangMap lookup pattern"

requirements-completed: [SITEMAP-01, SITEMAP-02, SITEMAP-03, SITEMAP-04]

# Metrics
duration: 2min
completed: 2026-04-01
---

# Phase 08 Plan 01: Sitemap Hreflang Summary

**Explicit hreflang serialize function covering all 11 route pairs with x-default and consistent ro/en short codes**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-01T19:41:45Z
- **Completed:** 2026-04-01T19:43:01Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- All 22 sitemap URLs now have bidirectional hreflang links (ro, en, x-default) via serialize function
- Translated slug pairs correctly linked (e.g., /despre/ <-> /en/about/, /pret/ <-> /en/pricing/)
- HTML lang attribute standardized from regional subtags (ro-RO/en-US) to short codes (ro/en)
- All sitemap URLs include lastmod dates

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace sitemap auto-matching with explicit hreflang via serialize** - `df69770` (feat)
2. **Task 2: Standardize HTML lang attribute to short codes** - `ba81544` (fix)

## Files Created/Modified
- `astro.config.mjs` - Added routePairs array, hreflangMap lookup, serialize function replacing i18n auto-matching
- `src/layouts/Base.astro` - Changed `<html lang>` from ternary ro-RO/en-US to direct `{locale}`

## Decisions Made
- Defined routePairs inline in astro.config.mjs rather than importing slugMap from src/i18n/utils.ts, because astro.config.mjs runs in Vite/Node config context where runtime module imports can cause issues
- Used short BCP 47 codes (ro/en) consistently across sitemap XML, HTML hreflang links, and html lang attribute, since no regional distinction is needed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None

## Next Phase Readiness
- Sitemap hreflang is complete and verified for all 11 route pairs
- Ready for any subsequent SEO or i18n work

## Self-Check: PASSED

- [x] astro.config.mjs exists
- [x] src/layouts/Base.astro exists
- [x] 08-01-SUMMARY.md exists
- [x] Commit df69770 exists
- [x] Commit ba81544 exists

---
*Phase: 08-sitemap-i18n*
*Completed: 2026-04-01*
