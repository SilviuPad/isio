---
phase: 02-public-site
plan: 03
subsystem: service-pages
tags: [astro, service-pages, i18n, components, bilingual]
dependency_graph:
  requires: ["02-01"]
  provides: ["service-detail-pages", "service-page-components"]
  affects: ["02-04", "02-05"]
tech_stack:
  added: []
  patterns:
    - "Shared ServicePageLayout template with per-service variations (D-05)"
    - "Extended service data module (service-data.ts) separate from CMS JSON files"
    - "Dual CTA pattern via ServiceCTA component (D-07)"
    - "ServiceFeatureList with inline SVG checkmark icons"
key_files:
  created:
    - src/lib/service-data.ts
    - src/components/services/ServicePageLayout.astro
    - src/components/services/ServiceFeatureList.astro
    - src/components/services/ServiceCTA.astro
    - src/pages/servicii/website.astro
    - src/pages/servicii/aplicatii-web.astro
    - src/pages/servicii/seo.astro
    - src/pages/servicii/accesibilitate.astro
    - src/pages/servicii/implementare-agenti.astro
    - src/pages/en/services/website.astro
    - src/pages/en/services/web-apps.astro
    - src/pages/en/services/seo.astro
    - src/pages/en/services/accessibility.astro
    - src/pages/en/services/ai-agents.astro
  modified: []
decisions:
  - "service-data.ts holds extended scope/deliverables/turnaround content separate from CMS JSON (which only has title, description, meta fields)"
  - "ServicePageLayout composed from ServiceFeatureList + ServiceCTA sub-components for maintainability"
  - "Turnaround block uses bg-navy-50 panel with electric-500 bold text for visual emphasis"
metrics:
  duration: "~5 min"
  completed: "2026-03-21"
  tasks_completed: 2
  files_created: 14
  files_modified: 0
---

# Phase 2 Plan 3: Service Detail Pages Summary

10 bilingual service detail pages (5 RO + 5 EN) built with a shared template component, extended service data module, and dual CTA pattern.

## What Was Built

### Task 1: Service data module and shared service page components

**src/lib/service-data.ts** — Extended service content module. Contains `ServiceDetail` interface and `serviceDetails` record with scope, deliverables, and turnaround data for all 5 services: `web-development`, `web-apps`, `seo`, `accessibility`, `ai-agents`. Exports `getServiceDetail()` function.

**src/components/services/ServicePageLayout.astro** — Shared template (D-05). Hero with `bg-navy-950`, service title and tagline. Content sections iterate over `detail.sections`. Turnaround block with `bg-navy-50 rounded-xl` and `text-electric-500 font-bold`. Ends with `ServiceCTA`.

**src/components/services/ServiceFeatureList.astro** — Reusable feature list with checkmark SVG icons (`text-electric-500 w-5 h-5`) and `text-navy-700` text. Accepts `items` and `locale` props.

**src/components/services/ServiceCTA.astro** — Dual CTA component (D-07) per service page. Uses `localePath('pricing', locale)` and `localePath('contact', locale)`. Primary button: `bg-electric-500` rounded-full. Secondary: border style with hover electric effect. Bilingual labels via inline Record.

Commit: `6b726dc`

### Task 2: Create all 10 service detail pages (5 RO + 5 EN)

All 10 pages follow identical pattern: `export const prerender = true`, import `ServicePageLayout`, pass `serviceKey` and `locale`. RO pages in `src/pages/servicii/`, EN pages in `src/pages/en/services/`. Import paths adjusted for directory depth (2 levels vs 3 levels from pages root).

Pages verified to build at:
- `/servicii/website/`, `/servicii/aplicatii-web/`, `/servicii/seo/`, `/servicii/accesibilitate/`, `/servicii/implementare-agenti/`
- `/en/services/website/`, `/en/services/web-apps/`, `/en/services/seo/`, `/en/services/accessibility/`, `/en/services/ai-agents/`

Commit: `7844827`

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. All service pages render real content from `service-data.ts` and CMS JSON files. Both CTAs link to real routes (`/pret/` and `/contact/`). ServiceCTA's contact link points to `/contact/` which is currently a stub page (will be implemented in Phase 3), but the link itself is correctly wired.

## Self-Check: PASSED

All 14 created files found on disk. Both commits (`6b726dc`, `7844827`) verified in git log.
