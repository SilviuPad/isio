# Phase 2: Public Site - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Build all public-facing pages on the Phase 1 foundation: 5 service detail pages (website builds, web apps, SEO, accessibility, AI agents), a services index page, portfolio grid (Vpatify, IsioPilot, StartupJunior), about section, enhanced homepage, a central pricing page with all 5 services' Fiverr-style tiers, JSON-LD schema markup, and mobile-responsive design with perfect Lighthouse scores. All pages bilingual (RO + EN).

</domain>

<decisions>
## Implementation Decisions

### Visual Design Direction
- **D-01:** Bold & modern aesthetic — strong colors, big typography, confident tech-forward feel. References: Stripe, Figma.
- **D-02:** Deep blue + electric accent color palette — navy/indigo base with bright blue or cyan highlights. Professional but energetic.
- **D-03:** Distinctive display font for headings (e.g., Space Grotesk, Cabinet Grotesk, Satoshi) paired with a clean body font. More personality than generic Inter/Geist.
- **D-04:** Visual approach: real project screenshots for portfolio + clean icons for services. No stock photos, no illustrations. Authenticity over decoration.

### Service Page Layout
- **D-05:** Shared template with per-service variations — same base structure for all 5 services, but allow customization per service (e.g., SEO page could have a checklist, AI agents could show a process diagram).
- **D-06:** Pricing lives on separate /pricing page only — service pages focus on value, scope, deliverables, and turnaround without embedding pricing tiers.
- **D-07:** Dual CTA at end of each service page: "View pricing" (links to /pricing) + "Book a call" (links to booking/contact — placeholder until Phase 3).

### Home Page
- **D-08:** Services index page exists at /servicii/ (and /en/services/) AND homepage links directly to individual service pages. Both paths available.
- **D-09:** Stats/numbers section for social proof instead of testimonials — quantifiable metrics like projects delivered, years of experience, technologies used. No client quotes needed.

### About Section
- **D-10:** About page content hardcoded in Astro templates — not CMS-managed. Rarely changes, reduces schema overhead.

### Claude's Discretion
- Service page structure and section flow (long-form, compact, etc.)
- Homepage hero design (tagline, CTA count, layout)
- Homepage section order below hero
- About page identity (personal brand, agency, or hybrid)
- About page content depth (bio, tech stack, values, timeline)
- Skill/specialization visual presentation (icons, text list, pills)
- Loading states and empty states
- Exact spacing, shadows, border radius
- JSON-LD schema markup implementation
- Lighthouse optimization approach
- Mobile breakpoint behavior

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Core value, constraints, plugin-first approach, solo developer context
- `.planning/REQUIREMENTS.md` — Phase 2 requirements: SITE-01–08, PRIC-01–06, SEO-01, SEO-02, INTR-03
- `.planning/ROADMAP.md` §Phase 2 — Success criteria, dependency on Phase 1

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Phase 1 decisions: bilingual per-field locale strategy, EUR-only pricing, translated URL slugs, Fiverr-style tiers, portfolio essential fields

### Research (from Phase 1)
- `.planning/research/STACK.md` — Astro 6, Tailwind v4, Sanity CMS technical details
- `.planning/research/ARCHITECTURE.md` — Component boundaries, data flow patterns
- `.planning/research/PITFALLS.md` — i18n SSG issues, plugin vetting

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/layouts/Base.astro` — Root HTML wrapper with SEO (astro-seo), hreflang, OG tags. Use for all new pages.
- `src/layouts/Page.astro` — Wraps Base + Header + Footer. Standard layout for all public pages.
- `src/components/layout/Header.astro` — Navigation with 5-item nav, language switcher, `localePath()` links
- `src/components/layout/Footer.astro` — Copyright + privacy link, bilingual
- `src/components/layout/LanguageSwitcher.astro` — RO|EN toggle with active state
- `src/lib/content.ts` — `getServices()`, `getServiceByKey()`, `getPortfolioItems()`, `getPricingTiers()`, `getAllPricingTiers()`, `getSiteSettings()`, `localize()` utilities
- `src/i18n/utils.ts` — `getLocaleFromUrl()`, `localePath()`, `getAlternateLocaleSlug()` with full slugMap for all routes

### Established Patterns
- Content Collections: Astro content collections with Zod schemas for services, portfolio, pricing, settings
- Bilingual content: `{ ro: '...', en: '...' }` per field, resolved via `localize(field, locale)`
- Page routing: RO default (no prefix), EN with `/en/` prefix. Translated slugs in `slugMap`.
- Styling: Tailwind v4 via `@tailwindcss/vite`, `max-w-7xl` container, `px-4 sm:px-6 lg:px-8` padding
- Static rendering: `export const prerender = true` on all pages

### Integration Points
- 5 service JSON files exist in `src/content/services/` — ready for service pages
- 3 pricing tiers exist for web-development — need 12 more for other 4 services
- 1 portfolio item (StoryPic) exists — need to add Vpatify, IsioPilot, StartupJunior
- Home page stub at `src/pages/index.astro` — needs full sections
- Pricing page stub at `src/pages/pret.astro` — needs full redesign with all services
- Paraglide i18n messages in `src/i18n/messages/{ro,en}.json` — add new keys as needed

</code_context>

<specifics>
## Specific Ideas

- Stripe and Figma as references for bold & modern aesthetic
- Fiverr as reference for pricing tier presentation (carried from Phase 1)
- Stats/numbers like "50+ projects delivered" for social proof without needing testimonials
- Portfolio showcases: Vpatify (accessibility marketplace), IsioPilot (related tool), StartupJunior.ro (financial education for children)
- isio.ro domain with Romanian default signals local market priority

</specifics>

<deferred>
## Deferred Ideas

- Testimonials/client quotes — v2 requirement (MKTG-02)
- Case study detail pages — v2 requirement (MKTG-03)
- Blog/content marketing — v2 requirement (MKTG-01)

</deferred>

---

*Phase: 02-public-site*
*Context gathered: 2026-03-21*
