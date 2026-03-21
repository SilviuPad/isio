---
phase: 02-public-site
plan: 01
subsystem: design-system + content-data
tags: [design-system, tailwind, css-custom-properties, content-collections, pricing, portfolio, i18n]
dependency_graph:
  requires: []
  provides:
    - design-system-tokens (navy/electric color palette, Space Grotesk/Inter fonts as Tailwind classes)
    - pricing-data (15 tiers: 3 each for web-development/web-apps/seo/accessibility/ai-agents)
    - portfolio-data (4 items: StoryPic, Vpatify, IsioPilot, StartupJunior)
    - service-data (5 services: web-development, web-apps, seo, accessibility, ai-agents)
    - i18n-messages (32 new keys covering hero, services, portfolio, pricing, stats, service pages)
  affects:
    - all Phase 2 page components (consume design tokens via Tailwind classes)
    - src/lib/content.ts (getPricingTiers, getPortfolioItems now returns all data)
tech_stack:
  added: []
  patterns:
    - Tailwind v4 @theme directive for CSS custom properties (no tailwind.config.js needed)
    - Google Fonts imported via @import URL in global.css
    - Astro content collections JSON files validated at build time by Zod schemas
key_files:
  created:
    - src/content/services/ai-agents.json
    - src/content/pricing/web-apps-basic.json
    - src/content/pricing/web-apps-standard.json
    - src/content/pricing/web-apps-premium.json
    - src/content/pricing/seo-basic.json
    - src/content/pricing/seo-standard.json
    - src/content/pricing/seo-premium.json
    - src/content/pricing/accessibility-basic.json
    - src/content/pricing/accessibility-standard.json
    - src/content/pricing/accessibility-premium.json
    - src/content/pricing/ai-agents-basic.json
    - src/content/pricing/ai-agents-standard.json
    - src/content/pricing/ai-agents-premium.json
    - src/content/portfolio/vpatify.json
    - src/content/portfolio/isiopilot.json
    - src/content/portfolio/startupjunior.json
  modified:
    - src/styles/global.css (complete design system rewrite)
    - src/i18n/messages/ro.json (32 new keys added)
    - src/i18n/messages/en.json (32 new keys added)
  deleted:
    - src/content/services/consulting.json (renamed to ai-agents.json)
decisions:
  - "Service key renamed from consulting to ai-agents per SITE-05 requirement — consulting had no pricing data and was a placeholder"
  - "All Standard tiers set as isRecommended=true per PRIC-06 — Standard represents best value at mid-range price"
  - "revisions: -1 used to represent unlimited revisions for Premium tier (content.config.ts schema allows any number, -1 is convention matching existing web-development-premium.json)"
  - "Portfolio order: StoryPic=1, Vpatify=2, IsioPilot=3, StartupJunior=4 — chronological-ish ordering"
metrics:
  duration: 4 min
  completed: 2026-03-21
  tasks_completed: 2
  files_created: 16
  files_modified: 3
  files_deleted: 1
---

# Phase 2 Plan 01: Design System Foundation and Content Data Summary

**One-liner:** Tailwind v4 @theme design system with Space Grotesk/Inter/navy-electric palette plus 12 pricing tiers, 3 portfolio items, consulting-to-ai-agents rename, and 32 i18n keys — all content data needed by Phase 2 pages.

## What Was Built

### Task 1: Design System (src/styles/global.css)

Replaced the generic system-ui font stack with a full design system using Tailwind v4's `@theme` directive:

- **Fonts:** Space Grotesk (headings, 400/500/600/700 weights) + Inter (body, 400/500/600) imported from Google Fonts
- **Navy scale:** 11 stops from `--color-navy-50` (#f4f5f9) to `--color-navy-950` (#0a0e27)
- **Electric scale:** 5 stops from `--color-electric-300` (#93bbfd) to `--color-electric-700` (#1d4ed8)
- **Cyan accent:** `--color-cyan-400` and `--color-cyan-500` for highlights
- **Font variables:** `--font-heading` and `--font-body` applied to h1-h6 and body respectively

All tokens are immediately available as Tailwind utility classes: `text-navy-950`, `bg-electric-500`, `font-heading`, etc.

### Task 2: Content Data

**Service rename:** `consulting.json` deleted, `ai-agents.json` created with serviceKey `ai-agents`, slug `implementare-agenti`/`ai-agents`, order 5.

**12 new pricing tiers (4 services × 3 tiers):**
| Service | Basic | Standard (Recommended) | Premium |
|---------|-------|----------------------|---------|
| web-apps | €1,500 / 30d / 2rev | €3,500 / 45d / 5rev | €7,000 / 60d / unlimited |
| seo | €300 / 14d / 1rev | €600 / 30d / 3rev | €1,200 / 30d / unlimited |
| accessibility | €400 / 10d / 1rev | €800 / 14d / 2rev | €1,500 / 21d / unlimited |
| ai-agents | €2,000 / 21d / 2rev | €5,000 / 45d / 5rev | €10,000 / 60d / unlimited |

**3 new portfolio items:**
- `vpatify.json` — React/TS/Node.js/PostgreSQL/Stripe, order 2
- `isiopilot.json` — Node.js/TS/Drizzle ORM/Neon/Gemini AI, order 3
- `startupjunior.json` — Astro/TS/Tailwind/Sanity CMS, order 4

**32 new i18n keys** in both `ro.json` and `en.json` covering: hero section, services section, portfolio section, pricing section, stats section, service page CTAs.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all content is real data, no placeholders. Portfolio screenshot paths (`/images/portfolio/*.png`) reference actual image assets that need to be provided; these are path references not stub values and are expected to be populated as actual image files are added.

## Self-Check: PASSED

All files verified present:
- src/styles/global.css — FOUND
- src/content/services/ai-agents.json — FOUND
- src/content/services/consulting.json — CONFIRMED DELETED
- src/content/pricing/seo-basic.json — FOUND
- src/content/pricing/web-apps-standard.json — FOUND
- src/content/portfolio/vpatify.json — FOUND
- src/content/portfolio/isiopilot.json — FOUND
- src/content/portfolio/startupjunior.json — FOUND

All commits verified:
- b9d5035 (Task 1: design system) — FOUND
- c732aa3 (Task 2: content data) — FOUND
