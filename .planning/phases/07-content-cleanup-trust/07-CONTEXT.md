# Phase 7: Content Cleanup & Trust Signals - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped)

<domain>
## Phase Boundary

Remove fake/misleading content and fix trust-damaging elements that hurt E-E-A-T scores. All requirements sourced from SEO-AUDIT.md.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion.

Key tasks from audit:
- Remove BlogPreview component from homepage (3 fake posts linking to "#")
- Fix stats counters: render real values in HTML (crawlers see "0+"), animate visually only with JS
- Replace "50+ projects" with actual portfolio count or remove
- Rename "Partners & Technologies" to "Technologies We Use" or "Tehnologii" (RO)
- Fix placeholder social links href="#" in footer — remove icons or link to real profiles (LinkedIn exists for founder)
- Standardize entity name to "Isio" everywhere (currently "ISIO" in some places)
- Create OG image at public/og.png (simple branded image for social sharing)
- Add legal info to footer: Iasi city, founding year 2025

</decisions>

<code_context>
## Existing Code Insights

### Key Files
- `src/components/home/BlogPreview.astro` — Fake blog posts to remove
- `src/components/home/Stats.astro` — Counters show "0+" to crawlers
- `src/components/home/Partners.astro` — Misleading "partners" label
- `src/components/home/ContactInline.astro` — Placeholder social links
- `src/components/layout/Footer.astro` — Missing legal info
- `src/components/seo/JsonLd.astro` — Entity name in schema

</code_context>

<specifics>
## Specific Ideas

- For OG image: simple 1200x630 PNG with Isio logo + tagline on dark background
- LinkedIn profile URL for founder: https://www.linkedin.com/in/silviupaduraru/

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
