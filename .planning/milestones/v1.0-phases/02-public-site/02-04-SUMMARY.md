---
phase: 02-public-site
plan: 04
subsystem: ui
tags: [astro, tailwind, pricing, portfolio, about, bilingual, i18n]

# Dependency graph
requires:
  - phase: 02-01
    provides: design system tokens (navy/electric palette), Page layout, content collections, content.ts utilities

provides:
  - Pricing page (RO: /pret/, EN: /en/pricing/) with all 5 services' tiers grouped by service
  - Portfolio page (RO: /portofoliu/, EN: /en/portfolio/) with all projects in a responsive grid
  - About page (RO: /despre/, EN: /en/about/) with bio, specializations, and values
  - PricingCard component with Fiverr-style tier cards and recommended badge
  - PricingServiceGroup component grouping 3 tiers per service
  - PortfolioCard component with screenshot, tech stack pills, live project link
  - PortfolioGrid component fetching and rendering all portfolio items

affects: [03-booking, 04-documents, homepage-02-05]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "PricingCard: recommended badge via absolute positioning + border-electric-500 for highlighted tier"
    - "Feature list: checkmark (emerald) for included, X-mark (navy-300) + line-through for excluded"
    - "Tier grouping: Map<serviceKey, tiers[]> built from getAllPricingTiers() then iterated with services order"
    - "Portfolio: PortfolioGrid fetches items internally, accepts locale prop for localization"
    - "About: hardcoded in Astro templates per D-10 decision, not CMS-managed"

key-files:
  created:
    - src/components/pricing/PricingCard.astro
    - src/components/pricing/PricingServiceGroup.astro
    - src/components/portfolio/PortfolioCard.astro
    - src/components/portfolio/PortfolioGrid.astro
    - src/pages/portofoliu/index.astro
    - src/pages/en/portfolio/index.astro
    - src/pages/despre.astro
    - src/pages/en/about.astro
  modified:
    - src/pages/pret.astro
    - src/pages/en/pricing.astro

key-decisions:
  - "Tier grouping uses Map<serviceKey, tiers[]> built in page frontmatter, preserving services order from getServices()"
  - "About page hardcoded in Astro templates per D-10 (rarely changes, reduces CMS schema overhead)"
  - "PortfolioCard image uses explicit width=640 height=224 to prevent CLS (per SEO-01 Lighthouse Performance 100)"
  - "Feature localization: localize(feature, locale) works because feature has {ro, en, included} shape matching LocaleString"

patterns-established:
  - "Pricing pages: getAllPricingTiers() + getServices() + Map grouping pattern"
  - "Recommended tier: border-2 border-electric-500 + absolute badge at -top-3 with -translate-x-1/2"
  - "CTA in recommended card: bg-electric-500, in non-recommended: bg-navy-100"
  - "Portfolio grid: 1-col mobile / 2-col tablet / 3-col desktop"

requirements-completed: [PRIC-01, PRIC-02, PRIC-03, PRIC-04, PRIC-05, PRIC-06, SITE-06, SITE-07]

# Metrics
duration: 7min
completed: 2026-03-21
---

# Phase 2 Plan 04: Pricing, Portfolio, and About Pages Summary

**Fiverr-style pricing page with 15 tier cards across 5 services, portfolio grid for 4 projects, and bilingual about page — all deployed as static pages in both RO and EN locales.**

## Performance

- **Duration:** ~7 min
- **Started:** 2026-03-21T16:05:31Z
- **Completed:** 2026-03-21T16:12:00Z
- **Tasks:** 2 completed
- **Files modified:** 10 (8 created, 2 replaced)

## Accomplishments

- Built PricingCard and PricingServiceGroup components implementing Fiverr-style tier comparison with recommended badge, feature checkmarks/X marks, and distinct CTA button styles
- Replaced pricing page stubs with full grouping of all 5 services' tiers in both RO (/pret/) and EN (/en/pricing/)
- Built PortfolioCard and PortfolioGrid components with screenshot areas, tech stack pills, and live project links; deployed in both RO (/portofoliu/) and EN (/en/portfolio/)
- Created hardcoded bilingual About pages (/despre/ + /en/about/) with hero, bio, specializations grid, values, and CTA — per D-10 decision (not CMS-managed)

## Task Commits

Each task was committed atomically:

1. **Task 1: Pricing components and pricing page (RO/EN)** - `dcd2d10` (feat)
2. **Task 2: Portfolio page (RO/EN) and About page (RO/EN)** - `11031fb` (feat)

**Plan metadata:** TBD after final commit

## Files Created/Modified

- `src/components/pricing/PricingCard.astro` - Individual tier card with recommended badge, feature list, CTA
- `src/components/pricing/PricingServiceGroup.astro` - Groups 3 tier cards per service in a grid
- `src/pages/pret.astro` - RO pricing page grouping all 5 services' tiers (replaced stub)
- `src/pages/en/pricing.astro` - EN pricing page equivalent (replaced stub)
- `src/components/portfolio/PortfolioCard.astro` - Project card with screenshot, tech pills, live link
- `src/components/portfolio/PortfolioGrid.astro` - 3-column responsive grid of all portfolio items
- `src/pages/portofoliu/index.astro` - RO portfolio page (new)
- `src/pages/en/portfolio/index.astro` - EN portfolio page (new)
- `src/pages/despre.astro` - RO about page with bio, specializations, values, CTA (new)
- `src/pages/en/about.astro` - EN about page with equivalent content (new)

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None. All portfolio items are wired to real content from `src/content/portfolio/`. Pricing tiers are wired to all 15 JSON files across 5 services. About page is intentionally hardcoded per D-10.

## Self-Check: PASSED
