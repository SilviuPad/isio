---
phase: 01-foundation
plan: 02
subsystem: cms
tags: [sanity, sanity-v3, cms, groq, typescript, i18n, bilingual, pricing]

# Dependency graph
requires:
  - 01-01 (Astro project scaffold, @sanity/client@^7 installed)
provides:
  - Sanity schema types: service, portfolioItem, pricingTier, siteSettings
  - Per-field bilingual strategy ({ en, ro }) on all user-facing text fields
  - Sanity Studio config at sanity/sanity.config.ts with structureTool
  - Sanity CLI config at project root (sanity.cli.ts)
  - Typed GROQ query helpers: getServices, getServiceByKey, getPortfolioItems, getPricingTiers, getAllPricingTiers, getSiteSettings
  - localize() helper for extracting locale-specific values from bilingual fields
  - TypeScript interfaces for all four content types
affects:
  - All page components that fetch CMS content (Plans 03+)
  - Pricing pages (consume pricingTier GROQ queries)
  - Portfolio section (consume portfolioItem GROQ queries)
  - Service pages (consume service GROQ queries)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Per-field bilingual: { ro: string, en: string } objects on every user-facing text field (D-01)"
    - "sanityClient with useCdn: false for SSG build-time fetching — always fresh content"
    - "apiVersion: '2025-02-19' ensures published perspective (drafts excluded automatically)"
    - "localize(field, locale, fallbackLocale) helper pattern for locale extraction"
    - "pricingTier orderings: [{ by: service asc, order asc }] for Studio display ordering"

key-files:
  created:
    - sanity/schemaTypes/service.ts
    - sanity/schemaTypes/portfolioItem.ts
    - sanity/schemaTypes/pricingTier.ts
    - sanity/schemaTypes/siteSettings.ts
    - sanity/schemaTypes/index.ts
    - sanity/sanity.config.ts
    - sanity.cli.ts
    - src/lib/sanity.ts
  modified: []

key-decisions:
  - "Per-field bilingual on ALL user-facing text fields — one document per entity with { en, ro } subfields (D-01)"
  - "EUR-only pricing — priceEur is the single price field, no currency variants (D-09)"
  - "Portfolio schema: essential fields only (title, description, screenshot, techStack, liveUrl, order) — no case studies (D-02)"
  - "features array uses bilingual strings + included boolean — enables checked/unchecked feature lists per Fiverr style (D-10)"
  - "revisions field uses -1 convention for unlimited revisions"
  - "pricePrefix bilingual field added for 'Starting from' or 'De la' text patterns"
  - "sanity/sanity.config.ts is the REAL Studio config (with schemas); sanity.config.ts at root remains a stub for @sanity/astro integration"

# Metrics
duration: 7min
completed: 2026-03-21
---

# Phase 1 Plan 02: Sanity CMS Schemas + Client Library Summary

**Four Sanity CMS schemas with per-field bilingual strategy ({ en, ro }) plus typed GROQ query helpers and a localize() utility for all Phase 1 content types**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-21T11:37:20Z
- **Completed:** 2026-03-21T11:44:30Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Four Sanity schema types created with per-field bilingual strategy as required by D-01
- pricingTier schema implements Fiverr-style tiers with EUR-only pricing (D-09), service dropdown (5 services), deliveryDays, revisions (-1 = unlimited), isRecommended highlight flag, and bilingual features array with included boolean
- portfolioItem schema uses essential fields only per D-02: no case studies
- siteSettings singleton schema for global site metadata and social links
- sanity/sanity.config.ts is the full Studio config with structureTool and all schemas registered
- sanity.cli.ts at project root enables `sanity` CLI commands for dataset management
- src/lib/sanity.ts exports sanityClient (useCdn: false, apiVersion 2025-02-19), six typed GROQ helpers, complete TypeScript interfaces, and localize() helper

## Task Commits

Each task was committed atomically:

1. **Task 1: Sanity CMS schemas for all Phase 1 content types** — `d074b49` (feat)
2. **Task 2: Sanity client library with typed GROQ query helpers** — `8c42a62` (feat)

## Files Created/Modified

- `sanity/schemaTypes/service.ts` — Service content type: serviceKey, slug (bilingual), title (bilingual), description (bilingual), metaTitle (bilingual), metaDescription (bilingual), order
- `sanity/schemaTypes/portfolioItem.ts` — Portfolio item: title (bilingual), description (bilingual), screenshot (image+hotspot), techStack (tags array), liveUrl (url), order
- `sanity/schemaTypes/pricingTier.ts` — Pricing tier: service (dropdown), order, name (bilingual), priceEur, pricePrefix (bilingual), deliveryDays, revisions, isRecommended, description (bilingual), features (bilingual+included array)
- `sanity/schemaTypes/siteSettings.ts` — Site settings singleton: siteTitle (bilingual), siteDescription (bilingual), contactEmail, socialLinks (linkedin/github/twitter)
- `sanity/schemaTypes/index.ts` — Schema registry exporting all four types
- `sanity/sanity.config.ts` — Sanity Studio configuration with structureTool and schema registry
- `sanity.cli.ts` — CLI config at project root for sanity CLI commands
- `src/lib/sanity.ts` — Sanity client + TypeScript interfaces + 6 GROQ query helpers + localize() utility

## Decisions Made

- Used `priceEur` as the single price field — EUR only across both locales per D-09
- Added `pricePrefix` bilingual field to support "Starting from" / "De la" patterns for min-price tiers
- Used `-1` convention for `revisions` to represent unlimited (can be rendered as "Unlimited" in UI)
- The `features` array stores `{ ro, en, included }` objects enabling Fiverr-style checkmark lists with locale-aware text
- `sanity/sanity.config.ts` is the full Studio config — kept separate from root `sanity.config.ts` which remains a stub for @sanity/astro
- `apiVersion: '2025-02-19'` ensures the published perspective is default, so all fetches automatically exclude drafts

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all schemas are fully defined. src/lib/sanity.ts is ready for immediate use by Astro page components. Content will be populated once Sanity project credentials are set in `.env`.

## Next Phase Readiness

- Astro pages can now import from `src/lib/sanity.ts` and fetch typed content
- Set `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_READ_TOKEN` in `.env` to connect to live Sanity project
- Run `sanity init` or use existing project by setting projectId in environment
- Studio can be accessed at `/studio` route once @sanity/astro integration is wired with the full schema config

---
*Phase: 01-foundation*
*Completed: 2026-03-21*

## Self-Check: PASSED

All files found on disk. Both commits verified in git history.

| Check | Result |
|-------|--------|
| sanity/schemaTypes/service.ts | FOUND |
| sanity/schemaTypes/portfolioItem.ts | FOUND |
| sanity/schemaTypes/pricingTier.ts | FOUND |
| sanity/schemaTypes/siteSettings.ts | FOUND |
| sanity/schemaTypes/index.ts | FOUND |
| sanity/sanity.config.ts | FOUND |
| sanity.cli.ts | FOUND |
| src/lib/sanity.ts | FOUND |
| .planning/phases/01-foundation/01-02-SUMMARY.md | FOUND |
| commit d074b49 | FOUND |
| commit 8c42a62 | FOUND |
