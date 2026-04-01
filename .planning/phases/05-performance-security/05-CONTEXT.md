# Phase 5: Performance & Security - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Mode:** Auto-generated (infrastructure phase — discuss skipped)

<domain>
## Phase Boundary

Fix LCP bottlenecks and add missing security headers to push CWV into "Good" range and close critical security gaps. All requirements sourced from SEO-AUDIT.md.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion — infrastructure/technical phase with clear requirements from SEO audit. Use ROADMAP phase goal, success criteria, and codebase conventions to guide decisions.

Key constraints from audit:
- Preloader at Base.astro:64-84 covers viewport for 1.6-3.5s — remove or reduce to under 300ms
- Google Fonts @import in global.css:2 creates render-blocking waterfall — switch to preconnect + stylesheet links
- Manrope font referenced in Header.astro:51 but never loaded — remove reference
- Security headers via public/_headers file (Cloudflare Pages/Workers format)
- Cache-Control: /_astro/* gets immutable, HTML gets s-maxage=86400

</decisions>

<code_context>
## Existing Code Insights

### Key Files
- `src/layouts/Base.astro` — Head tags, SEO, preloader (lines 64-84), font loading
- `src/styles/global.css` — Line 2 has @import for Google Fonts
- `src/components/layout/Header.astro` — Line 51 references Manrope font
- `wrangler.toml` — Cloudflare Workers config (no headers currently)

### Integration Points
- _headers file at public/_headers for Cloudflare Workers static headers
- Base.astro <head> for font preconnect links

</code_context>

<specifics>
## Specific Ideas

No specific requirements beyond SEO audit items. Follow audit recommendations directly.

</specifics>

<deferred>
## Deferred Ideas

None — infrastructure phase.

</deferred>
