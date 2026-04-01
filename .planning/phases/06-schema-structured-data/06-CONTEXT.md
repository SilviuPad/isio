# Phase 6: Schema & Structured Data Overhaul - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Mode:** Auto-generated (infrastructure phase — discuss skipped)

<domain>
## Phase Boundary

Fix the schema prop-passing bug and rewrite JsonLd.astro with @graph pattern to enable all structured data types. All requirements sourced from SEO-AUDIT.md sections 3.1-3.4.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion — infrastructure/technical phase with clear requirements from SEO audit.

Key constraints from audit:
- Page.astro does NOT accept pageType or serviceName props — they never reach Base.astro/JsonLd.astro
- Current schemas: WebSite (incomplete), ProfessionalService (incomplete), Service (never renders)
- Need @graph pattern with @id entity linking for deduplication
- BreadcrumbList needed on all inner pages
- FAQPage schema from existing FAQ.astro content (4 Q&A pairs)
- Person schema for founder (Silviu Paduraru) on about page
- ProfessionalService needs: email (contact@isio.ro), sameAs (LinkedIn), founder ref, foundingDate (2025)
- Logo must reference raster /og.png not SVG
- WebSite needs potentialAction (SearchAction) and publisher

</decisions>

<code_context>
## Existing Code Insights

### Key Files
- `src/layouts/Page.astro` — Missing pageType/serviceName in interface
- `src/layouts/Base.astro` — Passes props to JsonLd.astro
- `src/components/seo/JsonLd.astro` — All structured data (needs rewrite)
- `src/components/home/FAQ.astro` — Contains 4 Q&A pairs for FAQPage schema
- `src/pages/despre.astro` / `src/pages/en/about.astro` — About pages for Person schema

### Integration Points
- Page.astro interface needs pageType + serviceName added
- Service pages pass serviceName to Page.astro
- FAQ data needs to be extractable for schema generation

</code_context>

<specifics>
## Specific Ideas

No specific requirements beyond SEO audit items. Follow Google's structured data guidelines.

</specifics>

<deferred>
## Deferred Ideas

- Offer schema on pricing pages (medium priority per audit)
- ItemList for portfolio (low priority per audit)

</deferred>
