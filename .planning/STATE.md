# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-21)

**Core value:** Clients can discover services, understand pricing, and book a discovery call — all self-service — while the solo developer manages everything from a single CMS-powered admin panel.
**Current focus:** Phase 2 — Public Site

## Current Position

Phase: 2 of 4 (Public Site) — IN PROGRESS
Plan: 0 of 5 in current phase
Status: Executing Phase 2 — Wave 1 starting
Last activity: 2026-03-21 — Phase 2 execution started

Progress: [░░░░░░░░░░] 0% Phase 2

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: ~15 min/plan
- Total execution time: ~1 hour (Phase 1)

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 4/4 | ~1h | ~15 min |

**Recent Trend:**
- Last 5 plans: 01-01, 01-02, 01-03, 01-04
- Trend: Steady execution, one auto-fix deviation per plan on average

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Pre-phase]: Astro 6 + Tailwind CSS v4 + Sanity CMS v3 + Cloudflare Pages confirmed as stack
- [Pre-phase]: Cal.com embed strongly preferred over custom Google Calendar API (eliminates OAuth complexity)
- [Pre-phase]: i18n routing must be Phase 1 — cannot be retrofitted without breaking all URLs and SEO
- [Pre-phase]: Use `@tailwindcss/vite` plugin — `@astrojs/tailwind` is deprecated since Astro 5.2
- [Pre-phase]: CMS owns page content; i18n JSON files own UI chrome only (button labels, nav, errors)
- [01-04]: Pricing pages use try/catch with console.warn fallback — Sanity may not exist at first build
- [01-04]: wrangler.toml uses [assets] block not Pages format — Workers static asset binding for Astro dist output
- [01-04]: 404 page defaults to RO locale at build time — Cloudflare Workers serves single file; links to /en/ provided
- [01-04]: sanity.ts projectId fallback 'placeholder' prevents init crash before Sanity project is created

### Pending Todos

None yet.

### Blockers/Concerns

- [Research flag] Phase 3: If custom Google Calendar API is used instead of Cal.com, OAuth service account vs. user OAuth flow needs research before implementation
- [Research flag] Phase 4: `@react-pdf/renderer` Noto Sans font embedding API needs verification; Sanity Studio v3 custom actions API needs checking
- [Risk] Phase 4: Romanian diacritic variants — ensure all templates use comma-below (ș/ț) not cedilla (ş/ţ) Unicode code points

## Session Continuity

Last session: 2026-03-21
Stopped at: Phase 1 complete — 01-04 SUMMARY.md created, all 4 plans done
Resume signal: Start Phase 2 with `/gsd:execute-phase` or plan Phase 2 content pages
Resume file: .planning/phases/01-foundation/01-04-SUMMARY.md
