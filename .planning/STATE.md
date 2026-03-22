# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-21)

**Core value:** Clients can discover services, understand pricing, and book a discovery call — all self-service — while the solo developer manages everything from a single CMS-powered admin panel.
**Current focus:** Phase 4 — Document Generation (admin dashboard + PDF templates + integration)

## Current Position

Phase: 4 of 4 (Document Generation) — IN PROGRESS
Plan: 2 of 4 in current phase
Status: Executing phase 4 — dashboard UI and client directory complete, next: PDF generation
Last activity: 2026-03-22 — Plan 04-02 complete

Progress: [████░░░░░░] 50% Phase 4

## Performance Metrics

**Velocity:**
- Total plans completed: 12
- Average duration: ~15 min/plan
- Total execution time: ~3h 10m (Phase 1 + Phase 2 + Phase 3 + Phase 4 so far)

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 4/4 | ~1h | ~15 min |
| 2. Public Site | 5/5 | ~1.5h | ~18 min |
| 3. Booking + Contact | 2/2 | ~30m | ~15 min |
| 4. Document Generation | 2/4 | ~17m | ~8 min |

**Recent Trend:**
- Last 5 plans: 02-05, 03-01, 03-02, 04-01
- Trend: Consistent execution speed, 04-01 fast (scaffold + codegen)

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
- [04-01]: Admin uses npm install --ignore-scripts + manual workerd patch (same ARM64 issue); added scripts/patch-workerd.cjs to admin as postinstall
- [04-01]: Single clients table with inline project fields — no separate projects table (D-15 one-to-one constraint)
- [04-01]: Text (ISO string) columns for dates in D1/SQLite — avoids integer epoch conversion complexity
- [04-02]: Server-side fetch uses new URL('/api/clients', Astro.url) — works in both dev and prod without hardcoded host
- [04-02]: PUT sends null for cleared optional fields (not empty string) — ensures DB nullifies cleared date/text fields

### Pending Todos

None yet.

### Blockers/Concerns

- [Risk] Phase 4: Romanian diacritic variants — ensure all templates use comma-below (ș/ț) not cedilla (ş/ţ) Unicode code points
- [Note] admin/wrangler.toml has placeholder database_id — requires `wrangler d1 create isio-admin` before deployment

## Session Continuity

Last session: 2026-03-22
Stopped at: Plan 04-02 complete — dashboard UI, client directory CRUD, deadline tracker done
Resume signal: Continue Phase 4 with `/gsd:execute-phase 04` (plan 03: PDF generation)
Resume file: .planning/phases/04-document-generation/04-02-SUMMARY.md
