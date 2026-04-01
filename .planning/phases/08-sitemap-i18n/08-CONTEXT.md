# Phase 8: Sitemap & Internationalization - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped)

<domain>
## Phase Boundary

Fix sitemap hreflang coverage and resolve i18n inconsistencies for proper multi-language indexing.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion.

Key constraints from audit:
- @astrojs/sitemap auto-matching fails for translated slugs (e.g. /despre/ vs /en/about/)
- Need explicit i18n route pair mappings for all 11 pairs in astro.config.mjs
- Currently only homepage and contact have hreflang in sitemap (2/11 pairs)
- Hreflang subtag inconsistency: sitemap uses "ro-RO"/"en-US" but HTML uses "ro"/"en" — standardize
- Need x-default hreflang pointing to Romanian version
- 404 page hardcoded to locale 'ro' — should detect from URL
- No lastmod on any sitemap URL — add static dates or build dates

Route pairs that need hreflang:
1. / <-> /en/
2. /contact/ <-> /en/contact/
3. /despre/ <-> /en/about/
4. /portofoliu/ <-> /en/portfolio/
5. /pret/ <-> /en/pricing/
6. /servicii/ <-> /en/services/
7. /servicii/website/ <-> /en/services/website/
8. /servicii/aplicatii-web/ <-> /en/services/web-apps/
9. /servicii/seo/ <-> /en/services/seo/
10. /servicii/accesibilitate/ <-> /en/services/accessibility/
11. /servicii/implementare-agenti/ <-> /en/services/ai-agents/

</decisions>

<code_context>
## Existing Code Insights

### Key Files
- `astro.config.mjs` — Sitemap i18n config (lines 20-25)
- `src/layouts/Base.astro` — HTML hreflang link tags
- `src/pages/404.astro` — Hardcoded to Romanian locale

</code_context>

<specifics>
## Specific Ideas

No specific requirements beyond audit items.

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
