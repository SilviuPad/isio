# Phase 1: Foundation - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the bilingual infrastructure that every other phase depends on: Astro project with i18n routing (RO default, EN prefixed), Sanity CMS with content schemas and locale-aware fields, Cloudflare Pages deployment pipeline with webhook auto-rebuild, SEO infrastructure (sitemap, robots.txt, meta tags, zero client-side JS), CMS-managed pricing data model, and admin authentication for Sanity Studio.

</domain>

<decisions>
## Implementation Decisions

### CMS Content Model
- **D-01:** Bilingual content uses per-field locale strategy — one Sanity document per entity, each text field stores `{ en: '...', ro: '...' }`. Keeps translations in sync.
- **D-02:** Portfolio projects use essential fields only: title, description, screenshot, tech stack tags, live URL. No detailed case studies for v1.
- **D-03:** CMS vs code boundary — Claude decides what belongs in CMS (editable content) vs hardcoded (structural elements like nav, footer layout).

### URL Structure
- **D-04:** Romanian is the default locale (no prefix). English uses `/en/` prefix. Example: `isio.ro/servicii/seo` (RO) and `isio.ro/en/services/seo` (EN).
- **D-05:** URL slugs are translated per locale — `/servicii/seo` (RO) vs `/en/services/seo` (EN). Better SEO per locale.
- **D-06:** Domain is `isio.ro` — Romanian TLD for strong local SEO signal.

### Deployment Pipeline
- **D-07:** Production only — no staging environment. Cloudflare Pages preview deploys on PRs serve as staging.
- **D-08:** Webhook auto-rebuild — every Sanity publish triggers a Cloudflare Pages rebuild automatically.

### Pricing Data Model
- **D-09:** Currency is EUR only across both locales.
- **D-10:** Tier structure — Claude designs the optimal fields per tier (Fiverr-style with name, price, deliverables, etc.).

### Claude's Discretion
- CMS schema design: which content types go in CMS vs code
- Pricing tier field structure (beyond basic name/price/deliverables)
- Sanity Studio configuration and plugin choices
- Astro i18n plugin/approach selection
- SEO meta tag implementation approach
- Cloudflare Pages adapter configuration

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Core value, constraints, key decisions, plugin-first approach
- `.planning/REQUIREMENTS.md` — Phase 1 requirements: I18N-01–05, SEO-03/04/05/06, CMS-01/03/04, PRIC-07, AUTH-01
- `.planning/ROADMAP.md` §Phase 1 — Success criteria and dependency information

### Research
- `.planning/research/STACK.md` — Astro 6, Tailwind v4, Sanity CMS, Cloudflare Pages recommendations
- `.planning/research/ARCHITECTURE.md` — Component boundaries, data flow, build order
- `.planning/research/PITFALLS.md` — i18n SSG silent failures, webhook pipeline risks, plugin vetting

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project. Only `.gitignore` exists.

### Established Patterns
- None — patterns will be established in this phase.

### Integration Points
- Sanity Studio → Cloudflare Pages webhook (rebuild trigger)
- Sanity Content Lake → Astro build (data fetching at build time)
- Astro i18n → URL routing and hreflang generation

</code_context>

<specifics>
## Specific Ideas

- Fiverr-style pricing tiers as reference for how pricing should look/feel
- isio.ro domain with Romanian as default locale signals local market priority
- Plugin-first approach — use official `@astrojs/*` packages and vendor integrations, avoid single-maintainer community plugins

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-21*
