---
phase: 02-public-site
plan: 02
subsystem: public-site
tags: [homepage, components, services-index, i18n, design-system]
dependency_graph:
  requires: [02-01]
  provides: [homepage-ro, homepage-en, services-index-ro, services-index-en]
  affects: [02-03, 02-04, 02-05]
tech_stack:
  added: []
  patterns:
    - Inline Record<Locale, {...}> for bilingual labels in components
    - src/components/home/ directory for page section components
    - src/components/ui/ directory for reusable UI primitives
    - getServices() + localize() pattern for bilingual data rendering
    - serviceKeyToRoute mapping for slugMap key lookup
key_files:
  created:
    - src/components/home/Hero.astro
    - src/components/home/ServicesPreview.astro
    - src/components/home/Stats.astro
    - src/components/home/PortfolioPreview.astro
    - src/components/home/CallToAction.astro
    - src/components/ui/ServiceCard.astro
    - src/pages/servicii/index.astro
    - src/pages/en/services/index.astro
  modified:
    - src/pages/index.astro
    - src/pages/en/index.astro
decisions:
  - "Inline Record<Locale, labels> pattern chosen for all component text — avoids message file imports while maintaining type safety"
  - "ServicesPreview and services index pages share serviceKeyToRoute mapping — duplicated intentionally to keep pages independent"
  - "PortfolioPreview shows real screenshot images when available, falls back to placeholder div"
metrics:
  duration: "~6 minutes"
  completed: "2026-03-21"
  tasks: 2
  files: 10
---

# Phase 2 Plan 2: Homepage Sections and Services Index Summary

**One-liner:** Homepage with 5 sections (Hero, ServicesPreview, Stats, PortfolioPreview, CallToAction) and services index in both RO/EN locales using navy + electric design system.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Homepage section components + ServiceCard | 4ef9800 | 6 created |
| 2 | Homepage pages (RO/EN) + services index pages (RO/EN) | b6e8965 | 2 updated, 2 created |

## What Was Built

### Task 1: Homepage Section Components

**src/components/ui/ServiceCard.astro** — Reusable service card with navy-800 background, electric-400 accent on hover, title in font-heading, description in navy-300, arrow link. Used on homepage ServicesPreview and services index pages.

**src/components/home/Hero.astro** — Full-width bg-navy-950 section with bilingual headline (highlighted word in text-electric-400), subtitle in navy-300, dual CTAs (primary: bg-electric-500, secondary: border border-navy-600). Links to services and contact via localePath().

**src/components/home/ServicesPreview.astro** — bg-white section fetching getServices(), renders ServiceCard grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3). Includes "View all services" link.

**src/components/home/Stats.astro** — bg-navy-950 section with 4-stat grid: 50+ projects, 7+ years experience, 20+ technologies, 100% satisfaction. Numbers in text-electric-400 font-heading.

**src/components/home/PortfolioPreview.astro** — bg-white section fetching getPortfolioItems(), renders project cards with tech stack pills (bg-navy-50 text-navy-600), live URL links, and screenshot images (with placeholder fallback).

**src/components/home/CallToAction.astro** — bg-gradient-to-r from-electric-600 to-electric-500 section with centered heading and white CTA button linking to contact page.

### Task 2: Pages

**src/pages/index.astro** — RO homepage rebuilt with all 5 section components. Phase 1 stub text removed.

**src/pages/en/index.astro** — EN homepage rebuilt with all 5 section components. Phase 1 stub text removed.

**src/pages/servicii/index.astro** — RO services index at /servicii/ with hero section and ServiceCard grid populated from getServices(). Includes serviceKeyToRoute mapping for correct slugMap lookups.

**src/pages/en/services/index.astro** — EN services index at /en/services/ with same structure as RO page but locale='en'.

## Verification

Build output confirms:
- `/index.html` — RO homepage generated
- `/en/index.html` — EN homepage generated
- `/servicii/index.html` — RO services index generated
- `/en/services/index.html` — EN services index generated
- All 5 service detail routes still build correctly (unaffected)

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. All components render live data from content collections (getServices(), getPortfolioItems()). Portfolio items with no screenshot show a placeholder div — this is intentional and will be resolved when real screenshots are added in a future plan.

## Self-Check: PASSED

- src/components/home/Hero.astro: FOUND
- src/components/home/ServicesPreview.astro: FOUND
- src/components/home/Stats.astro: FOUND
- src/components/home/PortfolioPreview.astro: FOUND
- src/components/home/CallToAction.astro: FOUND
- src/components/ui/ServiceCard.astro: FOUND
- src/pages/index.astro: FOUND (updated)
- src/pages/en/index.astro: FOUND (updated)
- src/pages/servicii/index.astro: FOUND
- src/pages/en/services/index.astro: FOUND
- Commit 4ef9800: FOUND
- Commit b6e8965: FOUND
