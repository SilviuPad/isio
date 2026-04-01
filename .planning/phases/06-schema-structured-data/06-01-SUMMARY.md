---
phase: 06-schema-structured-data
plan: 01
subsystem: seo
tags: [structured-data, json-ld, schema-org, breadcrumbs, faq, professional-service]

requires:
  - phase: 05-performance-security
    provides: Base layout with SEO meta tags and JsonLd component
provides:
  - "Complete @graph-based structured data with @id entity linking"
  - "ProfessionalService, WebSite, Person, BreadcrumbList, FAQPage, Service schemas"
  - "Prop forwarding chain: Page.astro -> Base.astro -> JsonLd.astro"
affects: [06-02-PLAN, seo, schema-validation]

tech-stack:
  added: []
  patterns: ["@graph with @id entity linking for structured data", "breadcrumb generation from slug segments"]

key-files:
  created: []
  modified:
    - src/layouts/Page.astro
    - src/layouts/Base.astro
    - src/components/seo/JsonLd.astro

key-decisions:
  - "Used single @graph pattern instead of multiple separate @context blocks"
  - "Hardcoded FAQ text in JsonLd to match FAQ.astro with proper diacriticals"
  - "Used og.png raster image for logo instead of favicon.svg per schema best practices"

patterns-established:
  - "@graph pattern: all schema entities in a single script tag with @id cross-references"
  - "Breadcrumb generation: slug-based with label lookup map"

requirements-completed: [SCHEMA-01-prop-fix, SCHEMA-02-graph-rewrite, SCHEMA-03-breadcrumb, SCHEMA-04-faqpage, SCHEMA-05-person, SCHEMA-06-professional-service, SCHEMA-07-logo-fix]

duration: 2min
completed: 2026-04-01
---

# Phase 06 Plan 01: Schema & Structured Data Summary

**Unified @graph structured data with ProfessionalService, BreadcrumbList, FAQPage, Person, and Service schemas linked via @id references**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-01T19:09:47Z
- **Completed:** 2026-04-01T19:12:07Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Fixed Page.astro prop interface to forward pageType and serviceName to Base.astro
- Rewrote JsonLd.astro from 3 separate @context blocks to a single @graph with @id entity linking
- Added ProfessionalService with email, sameAs, founder ref, foundingDate, and raster logo
- Added BreadcrumbList generation for all non-homepage pages from slug segments
- Added FAQPage with 4 Q&A pairs (matching FAQ.astro with proper Romanian diacriticals) on homepage
- Added Person schema for founder, referenced by ProfessionalService via @id
- Service schema now renders correctly on service pages via fixed prop chain

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix Page.astro prop interface and Base.astro JsonLd prop forwarding** - `299a2ba` (feat)
2. **Task 2: Rewrite JsonLd.astro with @graph pattern and all schema types** - `678131d` (feat)

## Files Created/Modified
- `src/layouts/Page.astro` - Added pageType/serviceName props and forwarding to Base.astro
- `src/layouts/Base.astro` - Added title/roSlug/enSlug forwarding to JsonLd component
- `src/components/seo/JsonLd.astro` - Complete rewrite with @graph pattern and 6 schema types

## Decisions Made
- Used single @graph pattern instead of multiple separate @context blocks for proper entity linking
- Hardcoded FAQ text in JsonLd to match FAQ.astro with proper Romanian diacriticals
- Used og.png (1200x630 raster) for logo instead of favicon.svg per schema.org best practices for ImageObject
- Named org "Isio" (not "ISIO") to match canonical branding

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all schema types are fully wired with real data.

## Next Phase Readiness
- All schema types implemented and build-verified
- Ready for 06-02 (schema validation/testing if applicable)
- Service pages now correctly receive pageType/serviceName through the full prop chain

## Self-Check: PASSED

- All 3 modified files exist on disk
- Both task commits (299a2ba, 678131d) verified in git log
- Build completes without errors

---
*Phase: 06-schema-structured-data*
*Completed: 2026-04-01*
