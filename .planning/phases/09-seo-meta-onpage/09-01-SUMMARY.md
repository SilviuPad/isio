---
phase: 09-seo-meta-onpage
plan: 01
subsystem: ui
tags: [seo, on-page, titles, headings, faq, bilingual, astro]

# Dependency graph
requires:
  - phase: 07-content-cleanup-trust
    provides: Clean content foundation and entity name standardization
provides:
  - Keyword-rich homepage titles in both RO and EN
  - Question-based H2 headings on 4 homepage sections
  - Expanded FAQ answers (100+ words each) with Isio entity self-references
affects: [09-seo-meta-onpage, 11-content-expansion]

# Tech tracking
tech-stack:
  added: []
  patterns: [question-based-h2-headings, entity-self-reference-in-faq]

key-files:
  created: []
  modified:
    - src/pages/index.astro
    - src/pages/en/index.astro
    - src/components/home/ServicesPreview.astro
    - src/components/home/Features.astro
    - src/components/home/AboutPreview.astro
    - src/components/home/FAQ.astro

key-decisions:
  - "FAQ max-height increased from max-h-40 to max-h-96 to accommodate longer answers"

patterns-established:
  - "Question-based H2 headings pattern for AI search citation eligibility"
  - "Entity self-reference pattern in FAQ content for knowledge graph recognition"

requirements-completed: [AUDIT-16, AUDIT-24, AUDIT-6.3]

# Metrics
duration: 2min
completed: 2026-04-01
---

# Phase 9 Plan 1: Homepage Titles, Question H2s, FAQ Expansion Summary

**Keyword-rich homepage titles in both locales, 4 question-based H2 headings for AI citation, and 100+ word FAQ answers with Isio entity self-references**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-01T19:57:05Z
- **Completed:** 2026-04-01T19:59:04Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Homepage RO title changed from generic "Isio -- Agentie Web" to keyword-rich "Isio -- Dezvoltare Website-uri, Aplicatii Web, SEO si Agenti AI | Iasi"
- Homepage EN title changed from generic "Isio -- Web Agency" to keyword-rich "Isio -- Website Development, Web Apps, SEO & AI Agents | Romania"
- 4 section H2 headings (Services, Features, About, FAQ) converted to question-based format in both RO and EN for AI search citation
- All 4 FAQ answers expanded from 15-35 words to 100+ words each with multiple Isio entity mentions (36 total)

## Task Commits

Each task was committed atomically:

1. **Task 1: Update homepage titles and convert 3 section headings to question-based H2s** - `9c8d751` (feat)
2. **Task 2: Expand all 4 FAQ answers to 100+ words with Isio entity self-references** - `4ecaff2` (feat)

## Files Created/Modified
- `src/pages/index.astro` - Homepage RO title updated to keyword-rich version
- `src/pages/en/index.astro` - Homepage EN title updated to keyword-rich version
- `src/components/home/ServicesPreview.astro` - H2 changed to question format both locales
- `src/components/home/Features.astro` - H2 changed to question format both locales
- `src/components/home/AboutPreview.astro` - H2 changed to question format both locales
- `src/components/home/FAQ.astro` - All 4 answers expanded, heading to question format, max-height increased

## Decisions Made
- Increased FAQ first-item max-height from max-h-40 to max-h-96 to accommodate the longer expanded answer text without clipping

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Ready for 09-02-PLAN.md (service page meta description expansion)
- All homepage on-page SEO signals optimized

---
*Phase: 09-seo-meta-onpage*
*Completed: 2026-04-01*

## Self-Check: PASSED
