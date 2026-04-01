---
phase: 08-sitemap-i18n
plan: 02
subsystem: i18n
tags: [astro, ssr, i18n, 404, cloudflare-workers, locale-detection]

requires:
  - phase: none
    provides: existing getLocaleFromUrl utility in src/i18n/utils.ts
provides:
  - Language-aware 404 page that detects locale from request URL
affects: []

tech-stack:
  added: []
  patterns: [SSR locale detection via Astro.url for dynamic pages]

key-files:
  created: []
  modified: [src/pages/404.astro]

key-decisions:
  - "Removed prerender=true to enable SSR locale detection via Cloudflare Workers"
  - "Used existing getLocaleFromUrl utility rather than adding new detection logic"
  - "Switched from light-theme gray colors to dark-theme base/accent tokens"

patterns-established:
  - "SSR locale detection: use getLocaleFromUrl(Astro.url) for pages that need runtime locale"

requirements-completed: [SITEMAP-05]

duration: 1min
completed: 2026-04-01
---

# Phase 8 Plan 2: Language-Aware 404 Page Summary

**SSR 404 page with getLocaleFromUrl detection so /en/* paths show English error page**

## Performance

- **Duration:** 1 min
- **Started:** 2026-04-01T19:41:42Z
- **Completed:** 2026-04-01T19:42:45Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Converted 404.astro from prerendered (static) to SSR (dynamic) by removing `export const prerender = true`
- Added `getLocaleFromUrl(Astro.url)` to detect locale from request URL pathname at runtime
- Updated page styling from light-theme gray colors to dark-theme base/accent color tokens

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert 404 page from prerendered to SSR with locale detection** - `e448080` (feat)

## Files Created/Modified
- `src/pages/404.astro` - Removed prerender, added SSR locale detection, updated dark theme colors

## Decisions Made
- Removed prerender=true to leverage Cloudflare Workers SSR for runtime locale detection
- Reused existing getLocaleFromUrl from src/i18n/utils.ts (no new code needed)
- Updated color classes from gray-* to base-*/accent-* to match site dark theme

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 404 page now correctly renders in both languages based on URL path
- All Phase 8 (Sitemap & i18n) plans ready for completion

## Self-Check: PASSED

- FOUND: src/pages/404.astro
- FOUND: .planning/phases/08-sitemap-i18n/08-02-SUMMARY.md
- FOUND: commit e448080

---
*Phase: 08-sitemap-i18n*
*Completed: 2026-04-01*
