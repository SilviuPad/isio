# Phase 10: AI Search Readiness & Crawlers - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped)

<domain>
## Phase Boundary

Optimize for AI search engines (GEO) and implement IndexNow for faster indexing. Create privacy policy page (GDPR requirement).

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion.

Key tasks:
- Create public/llms.txt with: agency name, services offered (5), pricing tiers, contact info, founder info
- Implement IndexNow: generate API key, create key file in public/, add directive to robots.txt
- Block training-only crawlers in robots.txt: CCBot, anthropic-ai (keep search crawlers allowed)
- Create privacy policy pages: /politica-confidentialitate/ (RO) and /en/privacy-policy/ (EN)
  - Must cover: data collection (contact form), cookies (Cloudflare), third-party services (Cal.com, Resend, Turnstile), data retention, user rights under GDPR
  - Business info: Isio, Iasi Romania, contact@isio.ro

</decisions>

<code_context>
## Existing Code Insights

### Key Files
- `public/robots.txt` — Currently allows all crawlers
- `src/pages/` — Page templates for new privacy pages
- `src/layouts/Page.astro` — Layout component with pageType prop

</code_context>

<specifics>
## Specific Ideas

No specific requirements beyond audit items.

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
