# Phase 11: Content Expansion - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped)

<domain>
## Phase Boundary

Expand thin content pages to meet minimum word count thresholds for competitive SEO. Service pages need 800+ words, about page needs 500+ words. All content bilingual (RO + EN).

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion.

Key constraints:
- Service pages currently ~150-200 words each (5 services x 2 locales = 10 pages)
- About page currently ~200 words (2 locales)
- Content is stored in src/content/services/*.json (5 JSON files with description fields)
- About page content is in src/pages/despre.astro and src/pages/en/about.astro
- Content must be substantive — methodology, process details, deliverables, use cases
- Avoid generic marketing fluff; use specific technical details and Isio's real differentiators
- Include service-specific FAQ sections to boost word count meaningfully
- Maintain consistent tone with existing site copy

Services to expand:
1. Web Development (website) — custom websites, Astro/TypeScript, responsive, SEO-optimized
2. Web Applications (aplicatii-web/web-apps) — custom web apps, dashboards, SaaS
3. SEO — technical SEO, content optimization, Core Web Vitals, local SEO
4. Accessibility (accesibilitate/accessibility) — WCAG 2.1 audits, remediation, testing
5. AI Agents (implementare-agenti/ai-agents) — autonomous AI agents for business automation

About page expansion:
- Career timeline for Silviu Paduraru (7+ years full-stack)
- Methodology and approach
- Tools and technologies
- Why solo developer model

</decisions>

<code_context>
## Existing Code Insights

### Key Files
- `src/content/services/web-development.json` — Website service content
- `src/content/services/web-apps.json` — Web apps service content  
- `src/content/services/seo.json` — SEO service content
- `src/content/services/accessibility.json` — Accessibility service content
- `src/content/services/ai-agents.json` — AI agents service content
- `src/pages/despre.astro` — Romanian about page
- `src/pages/en/about.astro` — English about page

### Patterns
- Service JSON has: title, description, metaDescription, features[], pricing{} fields
- Service pages render description as main body text
- About page has inline content in the .astro template

</code_context>

<specifics>
## Specific Ideas

No specific requirements beyond audit items.

</specifics>

<deferred>
## Deferred Ideas

- Individual portfolio project pages (audit #30) — separate milestone
- Case studies and testimonials (audit #19) — need real client data

</deferred>
