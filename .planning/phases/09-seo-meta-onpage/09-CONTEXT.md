# Phase 9: SEO Meta & On-Page Optimization - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped)

<domain>
## Phase Boundary

Improve on-page SEO signals: titles, meta descriptions, heading structure, and homepage optimization.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion.

Key tasks from audit:
- Homepage title too generic "Isio -- Agentie Web" — needs keyword-rich title with value proposition
- Service page meta descriptions only ~34 chars — expand to 120-160 chars each
- No question-based headings anywhere — add H2s like "What services does Isio offer?"
- FAQ answers are 15-35 words — expand to 100+ words each with entity self-references ("Isio")
- Content is in both RO and EN — titles, descriptions, headings need bilingual treatment

Service pages to update (5 services x 2 locales = 10 JSON files):
- website, aplicatii-web/web-apps, seo, accesibilitate/accessibility, implementare-agenti/ai-agents

</decisions>

<code_context>
## Existing Code Insights

### Key Files
- `src/pages/index.astro` — Homepage with generic title
- `src/pages/en/index.astro` — English homepage
- `src/content/services/*.json` — Service content with thin meta descriptions
- `src/components/home/FAQ.astro` — FAQ with short answers

### Patterns
- Service content stored in JSON files in src/content/services/
- Page titles set via frontmatter in page files
- FAQ data is inline in FAQ.astro component

</code_context>

<specifics>
## Specific Ideas

No specific requirements beyond audit items.

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
