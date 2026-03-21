# Roadmap: Isio

## Overview

Four phases take Isio from nothing to a fully operational solo-developer agency platform. Phase 1 establishes the bilingual foundation — routing, CMS, deployment pipeline, and authentication — the things that cannot be retrofitted after launch without destroying SEO and breaking existing URLs. Phase 2 builds every public-facing page on top of that foundation, delivering the complete marketing site with tiered pricing and portfolio. Phase 3 adds the conversion endpoints that turn visitors into booked discovery calls. Phase 4 builds the internal document generation workflow that makes the agency operationally professional. Each phase delivers a coherent capability that can be independently verified.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Bilingual routing, Sanity CMS, Cloudflare deployment, admin auth — the infrastructure every other phase depends on
- [ ] **Phase 2: Public Site** - All public-facing pages, tiered pricing, portfolio, SEO markup, and mobile-responsive design built on Phase 1 foundations
- [ ] **Phase 3: Booking + Contact** - Discovery call booking synced to Google Calendar and contact form with email notification
- [ ] **Phase 4: Document Generation** - Bilingual PDF output for proposals, contracts, invoices, and reports with Romanian diacritic support

## Phase Details

### Phase 1: Foundation
**Goal**: The infrastructure exists for bilingual static pages to be built, CMS content to be queried, and the site to be deployed continuously — all before any public content is added
**Depends on**: Nothing (first phase)
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, SEO-03, SEO-04, SEO-05, SEO-06, CMS-01, CMS-03, CMS-04, PRIC-07, AUTH-01
**Success Criteria** (what must be TRUE):
  1. Visiting `/ro/` and `/en/` renders distinct bilingual pages with correct hreflang tags in the HTML head
  2. Publishing a change in Sanity Studio triggers an automatic site rebuild and the live site reflects the change within 60 seconds
  3. Sanity Studio is accessible at its deployed URL and requires authentication to access
  4. The Astro project builds with zero client-side JavaScript on static pages and deploys successfully to Cloudflare Pages
  5. Pricing data is stored in Sanity CMS and can be edited without requiring a code change or redeploy
**Plans:** 4 plans

Plans:
- [ ] 01-01-PLAN.md — Astro 6 project init with i18n routing, Tailwind v4, Cloudflare adapter, Paraglide i18n messages
- [ ] 01-02-PLAN.md — Sanity CMS schemas (service, portfolio, pricing, settings) and typed GROQ client library
- [ ] 01-03-PLAN.md — Layout system (Base + Page), Header/Footer/LanguageSwitcher components, SEO meta tags, robots.txt
- [ ] 01-04-PLAN.md — Bilingual demo pages, Cloudflare Workers config, end-to-end verification

### Phase 2: Public Site
**Goal**: A prospective client visiting the site in either Romanian or English can read about all services, compare pricing tiers, view the portfolio, and understand who they are hiring — fully SEO-optimized and mobile-responsive
**Depends on**: Phase 1
**Requirements**: SITE-01, SITE-02, SITE-03, SITE-04, SITE-05, SITE-06, SITE-07, SITE-08, PRIC-01, PRIC-02, PRIC-03, PRIC-04, PRIC-05, PRIC-06, SEO-01, SEO-02, INTR-03
**Success Criteria** (what must be TRUE):
  1. All five service pages exist in both RO and EN, each displaying scope, deliverables, turnaround, and a three-tier pricing comparison table with one tier highlighted as recommended
  2. The portfolio grid shows Vpatify, IsioPilot, and StartupJunior.ro with screenshots, technologies used, and links, in both locales
  3. Lighthouse audit on the Cloudflare preview URL returns 100 (Performance), 100 (SEO), 100 (Accessibility), and 100 (Best Practices)
  4. JSON-LD schema markup for LocalBusiness, Service, and WebSite is present and validates without errors in Google's Rich Results Test
  5. The language switcher component is visible on every page and correctly navigates to the equivalent page in the other locale without redirecting to the homepage
**Plans**: TBD

### Phase 3: Booking + Contact
**Goal**: A prospective client can book a discovery call that appears on the admin's Google Calendar, and can send a message via contact form that triggers an email notification — without any OAuth token management burden
**Depends on**: Phase 2
**Requirements**: INTR-01, INTR-02
**Success Criteria** (what must be TRUE):
  1. A visitor can complete a discovery call booking in either locale and the event appears on the admin's Google Calendar with the visitor's details
  2. A visitor can submit the contact form and the admin receives an email notification with the message content
  3. Both the booking flow and contact form work correctly on mobile viewport sizes
**Plans**: TBD

### Phase 4: Document Generation
**Goal**: The admin can generate a bilingual PDF proposal, contract, invoice, or report for any client directly from Sanity Studio, with Romanian diacritics rendering correctly
**Depends on**: Phase 1
**Requirements**: DOCS-01, DOCS-02, DOCS-03, DOCS-04, DOCS-05, CMS-02
**Success Criteria** (what must be TRUE):
  1. Generating a proposal, contract, invoice, or report from Sanity Studio produces a downloadable PDF in both Romanian and English variants
  2. All Romanian diacritics (a with breve, a with circumflex, i with circumflex, s with comma-below, t with comma-below) render correctly in generated PDFs — no question marks or empty boxes
  3. The client deadline tracker in Sanity Studio displays client name, project, milestones, due dates, and status for each active client
  4. The PDF generation endpoint returns 401 Unauthorized for any request without a valid admin token
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/4 | Planning complete | - |
| 2. Public Site | 0/TBD | Not started | - |
| 3. Booking + Contact | 0/TBD | Not started | - |
| 4. Document Generation | 0/TBD | Not started | - |
