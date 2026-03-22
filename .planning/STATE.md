# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-21)

**Core value:** Clients can discover services, understand pricing, and book a discovery call — all self-service — while the solo developer manages everything from a single CMS-powered admin panel.
**Current focus:** Phase 4 — Document Generation — code complete, awaiting human verification

## Current Position

Phase: 4 of 4 (Document Generation) — AWAITING VERIFICATION
Plan: 4 of 4 in current phase (code tasks complete; Task 3 is human verification checkpoint)
Status: Phase 4 code complete — generate page + email API built; waiting on user verification
Last activity: 2026-03-22 — Plan 04-04 code tasks complete

Progress: [██████████] 100% Phase 4 code (pending human verification checkpoint)

## Performance Metrics

**Velocity:**
- Total plans completed: 13 (04-04 code tasks done; Task 3 human checkpoint pending)
- Average duration: ~13 min/plan
- Total execution time: ~3h 18m (Phase 1 + Phase 2 + Phase 3 + Phase 4)

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 4/4 | ~1h | ~15 min |
| 2. Public Site | 5/5 | ~1.5h | ~18 min |
| 3. Booking + Contact | 2/2 | ~30m | ~15 min |
| 4. Document Generation | 4/4 | ~31m | ~8 min |

**Recent Trend:**
- Last 5 plans: 03-01, 03-02, 04-01, 04-02, 04-03, 04-04
- Trend: Phase 4 plans averaging ~8 min each — rapid execution

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
- [04-03]: Noto Sans fetched from GitHub raw (notofonts/latin-greek-cyrillic) — Google Fonts ZIP requires extraction; direct TTF URL simpler
- [04-03]: Module-level font cache (fontLoaded + fontBinaryString) avoids re-fetching 298KB TTF on every PDF generation call
- [04-03]: EUR-only pricing in all templates — per D-13, no RON conversion complexity for solo agency
- [04-04]: Browser-side PDF generation — jsPDF template modules bundled by Astro for client; no server-side PDF rendering needed
- [04-04]: data-section containers for form switching — display:none toggle, no React/component complexity
- [04-04]: Nullable coalescing (?? '') at DocumentClient assembly — keeps PDF templates clean, handles null->string once
- [04-04]: patch-workerd.cjs extended to include lib/main.js — was missing from original patch; blocked astro build on ARM64 Windows

### Pending Todos

- Human verification: run `cd admin && wrangler d1 migrations apply isio-admin --local` + create `.dev.vars` + `wrangler dev`

### Blockers/Concerns

- [Resolved] Phase 4: Romanian diacritic variants — all 04-03 templates verified: zero cedilla (ş/ţ), only comma-below (ș/ț) present
- [Note] admin/wrangler.toml has placeholder database_id — requires `wrangler d1 create isio-admin` before deployment
- [Pre-existing] npm run build fails with `require_dist is not a function` in Vite SSR deps cache on ARM64 Windows — confirmed pre-existing (present before plan 04-04); does not affect wrangler dev or deployment; TypeScript check passes with zero errors

## Session Continuity

Last session: 2026-03-22
Stopped at: Plan 04-04 Task 2 complete — generate.astro + email-pdf API built; Task 3 is human verification checkpoint
Resume signal: Human verifies the admin dashboard end-to-end, then phase 4 is complete
Resume file: .planning/phases/04-document-generation/04-04-SUMMARY.md
