# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-21)

**Core value:** Clients can discover services, understand pricing, and book a discovery call — all self-service — while the solo developer manages everything from a single CMS-powered admin panel.
**Current focus:** Phase 3 — Booking + Contact

## Current Position

Phase: 3 of 4 (Booking + Contact) — IN PROGRESS
Plan: 1 of 2 in current phase
Status: Plan 03-01 complete — contact form backend + Turnstile + Resend
Last activity: 2026-03-22 — Plan 03-01 complete

Progress: [█████░░░░░] 50% Phase 3

## Performance Metrics

**Velocity:**
- Total plans completed: 9
- Average duration: ~15 min/plan
- Total execution time: ~2.5 hours (Phase 1 + Phase 2)

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 4/4 | ~1h | ~15 min |
| 2. Public Site | 5/5 | ~1.5h | ~18 min |

**Recent Trend:**
- Last 5 plans: 02-01, 02-02, 02-03, 02-04, 02-05
- Trend: Steady execution, cross-cutting concerns (02-05) pre-implemented during earlier plans

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Pre-phase]: Astro 6 + Tailwind CSS v4 + Astro content collections + Cloudflare Pages confirmed as stack
- [Pre-phase]: Cal.com embed strongly preferred over custom Google Calendar API (eliminates OAuth complexity)
- [Pre-phase]: i18n routing must be Phase 1 — cannot be retrofitted without breaking all URLs and SEO
- [Pre-phase]: Use `@tailwindcss/vite` plugin — `@astrojs/tailwind` is deprecated since Astro 5.2
- [Pre-phase]: Content collections own page content; i18n JSON files own UI chrome only (button labels, nav, errors)
- [01-04]: Pricing pages use try/catch with console.warn fallback — content collections may be empty at first build
- [01-04]: wrangler.toml uses [assets] block not Pages format — Workers static asset binding for Astro dist output
- [01-04]: 404 page defaults to RO locale at build time — Cloudflare Workers serves single file; links to /en/ provided
- [01-04]: Content collection JSON files provide data at build time — no external CMS dependency
- [03-01]: Resend SDK uses camelCase replyTo not reply_to — corrected during execution
- [03-01]: is:inline scripts for form fetch submission — avoids Astro bundler scope issues with DOM manipulation
- [03-01]: PUBLIC_TURNSTILE_SITE_KEY via import.meta.env at build time — Astro PUBLIC_ convention for client-safe vars
- [03-01]: npm install --force needed on ARM64 Windows dev machine — workerd package is x64-only (deploy target is x64)

### Pending Todos

None yet.

### Blockers/Concerns

- [Research flag] Phase 3: If custom Google Calendar API is used instead of Cal.com, OAuth service account vs. user OAuth flow needs research before implementation
- [Research flag] Phase 4: `@react-pdf/renderer` Noto Sans font embedding API needs verification; admin dashboard UI approach needs deciding
- [Risk] Phase 4: Romanian diacritic variants — ensure all templates use comma-below (ș/ț) not cedilla (ş/ţ) Unicode code points

## Session Continuity

Last session: 2026-03-22
Stopped at: Phase 3 Plan 01 complete — contact form backend, Turnstile, Resend wired
Resume signal: Continue Phase 3 with Plan 02 (Cal.com booking embed)
Resume file: .planning/phases/03-booking-contact/03-01-SUMMARY.md
