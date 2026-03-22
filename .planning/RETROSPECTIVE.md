# Retrospective: Isio

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-22
**Phases:** 4 | **Plans:** 15

### What Was Built
- Bilingual Astro 6 public site with 5 service pages, Fiverr-style pricing, portfolio, about
- Contact form (Resend + Turnstile) and Cal.com booking embed
- Admin dashboard with D1 database, client CRUD, deadline tracker
- PDF document generation with Romanian diacritic support (proposal, contract, invoice, report)

### What Worked
- Astro 6 content collections eliminated external CMS dependency — fast iteration
- Cal.com embed was a massive simplification over custom Google Calendar integration
- jsPDF with Noto Sans font solved the Romanian diacritics problem cleanly
- Phase-by-phase execution kept scope focused and prevented drift
- 2-day timeline from zero to shipped MVP

### What Was Inefficient
- Requirements checkboxes not updated during execution — bookkeeping fell behind
- ARM64 Windows workerd compatibility required manual patching (scripts/patch-workerd.cjs)
- Noto Sans font initially fetched from wrong source (Google Fonts ZIP vs GitHub raw TTF)

### Patterns Established
- `is:inline` scripts for Astro form fetch submission (avoids bundler scope issues)
- `new URL('/api/...', Astro.url)` for server-side fetch in both dev and prod
- Module-level font cache for expensive resources (font TTF binary)
- `data-section` containers with display toggle for multi-form pages (no framework needed)

### Key Lessons
- Content collections + Astro i18n routing must be Phase 1 — retrofitting would break all URLs
- Browser-side PDF generation is sufficient when server rendering isn't needed
- Placeholder database_id in wrangler.toml should be resolved before shipping (deferred)

### Cost Observations
- Sessions: ~4 sessions across 2 days
- Notable: Phase 4 plans averaged ~8 min each — fastest phase due to established patterns

---

## Cross-Milestone Trends

| Milestone | Phases | Plans | Days | LOC |
|-----------|--------|-------|------|-----|
| v1.0 MVP | 4 | 15 | 2 | 31,595 |
