# Project Research Summary

**Project:** Isio — Web Services Agency Platform
**Domain:** Bilingual marketing site + headless CMS admin (solo developer)
**Researched:** 2026-03-21
**Confidence:** HIGH

## Executive Summary

Isio is a solo-developer web services agency platform built for two distinct markets — Romanian-speaking clients and English-speaking clients. The core architectural insight from research is that this is not a typical web app; it is a static marketing site with a handful of interactive islands (booking form, language switcher) and a serverless API layer for side effects (calendar events, email, PDF generation). The correct implementation approach is Astro 6 with static-site generation as the default, selective SSR only for API routes, and Sanity CMS as the single source of truth for all content and internal admin data. This combination delivers perfect Lighthouse scores without engineering effort, bilingual content management without a custom CMS, and internal client tracking without a separate database.

The recommended stack is deliberately conservative and low-overhead for a solo operator. Astro 6 + Tailwind CSS v4 + Sanity CMS + Cloudflare Pages eliminates all infrastructure management — no servers to maintain, no databases to administer, no DevOps burden. Bilingual support is handled natively by Astro's built-in i18n routing (folder-based, not a plugin) plus Sanity's per-locale content fields. PDF document generation runs in a serverless API route using `@react-pdf/renderer`. Discovery call booking is delegated entirely to Cal.com's hosted embed, which handles Google Calendar sync without requiring custom OAuth plumbing.

The key risks are all in the integration layer, not the core stack. The three highest-priority pitfalls — i18n routing silently missing locale pages, Sanity webhook failures causing stale CMS content, and Google Calendar OAuth token expiry in production — all manifest silently (no build errors, no visible errors to the developer) and only surface when a client notices something is wrong. Every one of these must be treated as a launch blocker, not a nice-to-have. Mitigations are well-understood: generate all locale pages from the start, set up webhook monitoring with a daily fallback rebuild, and either use Cal.com (which handles OAuth internally) or publish the Google OAuth consent screen to production before go-live.

## Key Findings

### Recommended Stack

The stack is organized around three constraints: static-first performance (Astro SSG), zero DevOps overhead (managed cloud services), and bilingual content management out of the box. Astro 6 is the correct framework choice over Next.js or SvelteKit for a mostly-static marketing site — it ships zero JS by default, has first-class i18n routing, and integrates directly with Sanity via the official `@sanity/astro` plugin. Tailwind CSS v4 is installed via the `@tailwindcss/vite` Vite plugin — the deprecated `@astrojs/tailwind` integration must not be used. Cloudflare Pages is preferred over Vercel due to unlimited bandwidth on the free tier (Vercel caps at 100 GB/month), which is a meaningful risk for a public-facing agency site.

**Core technologies:**
- **Astro 6** (requires Node 22+): Static site framework — zero JS by default, built-in i18n routing, official Sanity integration
- **Tailwind CSS v4**: Utility styling via `@tailwindcss/vite` Vite plugin — not `@astrojs/tailwind` (deprecated)
- **Sanity CMS v3**: Headless CMS + admin panel — managed cloud, generous free tier, GROQ queries, Sanity Studio editorial UI
- **Cloudflare Pages**: Hosting + CDN — unlimited bandwidth free tier, global CDN, DDoS protection, first-class Astro 6 support
- **Paraglide JS**: Type-safe i18n translation catalog — works alongside (not instead of) Astro's built-in URL routing
- **`@react-pdf/renderer` v4.3**: Server-side bilingual PDF generation — React component API, supports custom fonts for Romanian diacritics
- **Cal.com (hosted)**: Discovery call booking with Google Calendar two-way sync — eliminates OAuth complexity entirely

**What not to use:**
- `@astrojs/tailwind` — deprecated since Astro 5.2
- `astro-i18next` — archived, unmaintained
- `jsPDF` — browser-only, no diacritic support
- Calendly — paid SaaS with no self-host; Cal.com is functionally identical and free
- Custom Google Calendar API integration if using Cal.com — redundant complexity

### Expected Features

Research identifies a clear separation between features that establish credibility (must ship v1) and features that differentiate from generic freelancer sites (should ship v1 or v1.x). The anti-features list is equally important — client login portals, live chat, payment processing, and AI chatbots all seem compelling but create maintenance burden that exceeds their value for a solo operation.

**Must have (table stakes) — ship in v1:**
- Bilingual public site (RO + EN) with language switcher and locale-aware URLs
- Service pages for all four offerings with tiered pricing display (Basic/Standard/Premium comparison table)
- Portfolio grid with outcome-focused case studies (Vpatify, IsioPilot, StartupJunior.ro)
- Discovery call booking synced to Google Calendar
- About section and testimonials (even 2-3 quotes)
- SEO fundamentals: hreflang tags, sitemap, robots.txt, title/meta per locale
- CMS admin (Sanity Studio) with pricing management
- Perfect Lighthouse score — the site is proof-of-work for the services being sold

**Should have (differentiators) — ship in v1 or v1.x:**
- Bilingual CMS-managed content (RO + EN per locale in Sanity) — signals professional market reach
- Schema markup (LocalBusiness, Service, WebSite) — high-value for an agency selling SEO services
- Editable pricing via CMS without redeploy — operational maturity signal
- Admin client deadline tracker (Sanity Studio as lightweight CRM)
- Bilingual document generation (proposals, invoices, contracts) — trigger: first client needing a formal document
- Portfolio case study detail pages with measurable outcomes — trigger: converting higher-value clients

**Defer to v2+:**
- Blog / content marketing — empty blog hurts more than no blog; CMS type can be built in advance
- Online payment processing (Stripe) — add when invoice volume justifies compliance overhead
- Report generation automation — needs real client work to refine templates first
- Multi-language document templates beyond RO/EN

**Anti-features (do not build):**
- Client login portal — adds auth complexity not justified at solo scale
- Real-time chat — requires presence a solo dev cannot staff
- AI chatbot — hallucinations damage brand trust

### Architecture Approach

The architecture is a static-first monorepo with selective SSR: all public pages are prerendered HTML at build time (CDN-served, zero serverless overhead), and only `/api/*` routes run as serverless functions per-request. Sanity CMS is the single data store for both public content (services, portfolio, pricing) and admin-only data (clients, projects, deadlines, document references) — no separate database is needed. Sanity Studio is the admin UI, deployed alongside or embedded in the Astro project. The only interactive JavaScript on the public site is the booking form island (a React component) and the language switcher.

**Major components:**
1. **Static Marketing Pages** — Astro `.astro` files, SSG at build time, served from Cloudflare CDN; `/ro/*` and `/en/*` locale folders
2. **Astro i18n Router** — built-in folder-based routing with `locales: ['ro', 'en']`, `defaultLocale: 'ro'`, hreflang in base layout
3. **Sanity Content Layer** — GROQ queries at build time via `sanity-astro` loader; fully typed via Astro content collections
4. **Sanity Studio** — admin UI for all content + internal client/project records; restricted-access collections for admin data
5. **Booking Form Island** — React component with `client:load`; POSTs to `/api/booking` SSR route; Cal.com embed preferred over custom Calendar API
6. **API Routes (SSR)** — `/api/booking`, `/api/contact`, `/api/generate-pdf`, `/api/calendar-check`; secrets in env vars, never client-side
7. **PDF Generator** — `@react-pdf/renderer` in `/api/generate-pdf`; locale prop drives RO/EN template; custom font required for Romanian diacritics
8. **Webhook → Rebuild Pipeline** — Sanity publish event triggers Cloudflare Pages deploy hook; ~30s end-to-end for content updates

**Key architectural decisions (not negotiable):**
- Default `output: 'static'`; only API routes and booking page use `prerender = false` — never set global `output: 'server'`
- CMS owns page content (headings, body, service descriptions); `i18n/*.json` owns UI chrome only (button labels, nav items, errors)
- Admin data (clients, deadlines) lives in Sanity — no separate database
- `useCdn: false` in Sanity client config for all build-time fetching

### Critical Pitfalls

1. **i18n routing silently missing locale pages** — The Astro i18n fallback does not auto-generate missing locale pages in SSG mode; build succeeds but Romanian visitors get 404s, and hreflang becomes incorrect (worse than none). Avoid by generating all locale variants from day one, adding a post-build audit script, and configuring `@astrojs/sitemap` with i18n locales. Address in Phase 1 before any content is added.

2. **Stale CMS content from webhook failure** — Sanity webhooks deliver once with no retry; a failed webhook means the live site silently serves outdated pricing, portfolio, and service data indefinitely. Avoid by setting `useCdn: false` in the Sanity client, monitoring Sanity webhook delivery logs, and adding a daily scheduled rebuild as a fallback. Address in Phase 1 alongside infrastructure setup.

3. **Google Calendar OAuth refresh token expiry in production** — OAuth tokens from a consent screen left in "Testing" mode expire every 7 days; production token expiry causes all booking submissions to fail silently. Avoid by publishing the OAuth consent screen to "In production" before launch, storing the refresh token in platform secrets (not client-side), and implementing a health-check. Simplest mitigation: use Cal.com embed and skip custom Calendar API entirely.

4. **Bilingual PDF diacritic rendering failure** — Romanian characters (ă, â, î, ș, ț) render as question marks or empty boxes if the PDF library uses a default Latin font. Avoid by explicitly embedding a Noto Sans font family in `@react-pdf/renderer` (or switching to Puppeteer for full OS font stack). Validate with a CI test that generates a Romanian PDF and asserts diacritic presence. Address in the Document Generation phase as a hard acceptance criterion.

5. **Unmaintained plugin dependency blocking Astro upgrades** — Community plugins with one maintainer can stop working on Astro major version upgrades. Avoid by preferring official `@astrojs/*` packages, using Astro's built-in i18n routing instead of `astro-i18next`, and vetting every plugin for maintenance health (npm downloads, last commit date) before adoption.

## Implications for Roadmap

Research identifies six natural phases based on component dependencies. Each phase can be built and tested independently. Phases 1 and 2 are foundations that block all later phases and must include infrastructure/security setup that is easy to skip but hard to retrofit.

### Phase 1: Foundation + Infrastructure

**Rationale:** Astro project setup, i18n routing configuration, and the Sanity + Cloudflare webhook pipeline must be established before any content or features can be built. i18n routing is the hardest thing to retrofit after launch — broken URLs destroy SEO. The webhook pipeline must be proven before any CMS-driven content goes live. Two of the five critical pitfalls (i18n missing locale pages, stale CMS webhook) are addressed here.

**Delivers:** Working bilingual Astro project with `/ro/*` and `/en/*` routing, base layout with hreflang in `<head>`, Cloudflare Pages deployment, Sanity project initialized, webhook → rebuild pipeline tested end-to-end, `.env` in `.gitignore`, Node 22 pinned.

**Addresses:** All table-stakes navigation and structure, hreflang + sitemap + robots.txt, mobile-first responsive base.

**Avoids:** i18n routing silently missing locale pages (Pitfall 1), stale CMS content from webhook failure (Pitfall 2), admin credentials exposed (security pitfall), unmaintained plugin adoption (Pitfall 5).

**Research flag:** Standard patterns — Astro i18n docs are thorough and official. No additional research needed beyond verifying Node 22 environment.

### Phase 2: CMS Setup + Content Schemas

**Rationale:** Sanity Studio and public content schemas (service, portfolio, pricing tier) are the content backbone. Bilingual static pages cannot be built end-to-end until CMS data is queryable via Astro content collections. Admin schemas (client, project, deadline) are defined here too, even if the admin UI is polished later — defining them now allows document generation to be built without rework.

**Delivers:** Sanity Studio running locally and deployed, all public content schemas (services, portfolio, pricing, testimonials) with RO/EN locale fields, all admin schemas (clients, projects, documents), Astro content collections wired to Sanity via `sanity-astro` loader, GROQ queries typed.

**Addresses:** Editable pricing via CMS (no redeploy), bilingual CMS-managed content, client deadline tracker foundation.

**Avoids:** Duplicating translations in both CMS and i18n files (anti-pattern — hard line: CMS owns page content, JSON owns UI chrome), querying without `perspective: 'published'` (draft documents leaking into builds).

**Research flag:** Standard patterns — `@sanity/astro` integration is well-documented via official Astro CMS guide. Sanity schema design is project-specific; no additional research needed.

### Phase 3: Public Marketing Site

**Rationale:** With routing and CMS established, all public pages can be built as pure SSG — no server dependencies. This phase delivers the fully deployable agency site and enables real Lighthouse score validation against production-like content (Sanity-hosted images, not local placeholders).

**Delivers:** Bilingual homepage, service pages (all four offerings) with tiered pricing comparison table, portfolio grid, about section, contact page, language switcher component, schema markup (LocalBusiness, Service, WebSite), `@astrojs/sitemap` configured for both locales, perfect Lighthouse score validated.

**Addresses:** All P1 table-stakes features: service pages, pricing display, portfolio, testimonials, about section, SEO fundamentals, mobile-first responsive design, schema markup.

**Avoids:** Portfolio showcasing technology over outcomes (UX pitfall — lead with problem and result), pricing requiring "Contact us" for any tier (75% of B2B buyers self-serve), language switcher redirecting to homepage instead of equivalent page.

**Research flag:** Standard patterns — Astro SSG + Tailwind is well-documented. Image optimization via Astro's built-in `<Image>` component is straightforward. Lighthouse CI on Cloudflare preview URL is the validation mechanism.

### Phase 4: Booking + Calendar Integration

**Rationale:** The booking form is the primary conversion endpoint — the first SSR component in the project. Cal.com embed is strongly preferred over custom Google Calendar API integration; it eliminates OAuth token management entirely and provides a production-ready UI. If custom Calendar API is chosen instead, OAuth consent screen must be published to production before any real bookings are accepted.

**Delivers:** Booking page (SSR) in both locales (`/ro/rezervare`, `/en/booking`), Cal.com embed configured with Google Calendar two-way sync, or custom booking form React island with `/api/booking` route + Google Calendar API integration + email notification via Resend, server-side field validation, CAPTCHA (Cloudflare Turnstile — free).

**Addresses:** Discovery call booking synced to Google Calendar (P1 table stake), mobile CTA pinned in header (not hidden in hamburger menu).

**Avoids:** Google Calendar OAuth refresh token expiry in production (Pitfall 3 — use Cal.com to sidestep entirely, or publish OAuth consent screen to production), booking form with no server-side validation (security pitfall), showing scope/budget questions before availability.

**Research flag:** Needs research if using custom Google Calendar API — OAuth service account setup vs. user OAuth flow has nuances. Cal.com embed path is straightforward and well-documented; no additional research needed for that route.

### Phase 5: Document Generation

**Rationale:** Bilingual PDF generation (proposals, contracts, invoices) depends on Sanity admin schemas (clients, projects) being defined (done in Phase 2) and the PDF library being configured with correct fonts for Romanian diacritics. This is an internal-only workflow triggered from Sanity Studio — no public-facing dependencies. It is the highest-complexity integration and the last one to build.

**Delivers:** `/api/generate-pdf` SSR route protected behind admin auth token, React PDF templates for proposals, contracts, and invoices (RO + EN variants), Noto Sans font embedded for diacritic support, custom Sanity Studio action ("Generate Proposal") wired to the API route, CI test that generates PDFs for both locales and asserts Romanian diacritics are present in output.

**Addresses:** Bilingual document generation (P2 differentiator), eliminating dependence on Word templates or third-party SaaS (PandaDoc, Ignition), email delivery of generated PDFs via Resend.

**Avoids:** Romanian PDF diacritic rendering failure (Pitfall 4 — embed Noto Sans, test both locales in CI), document generation endpoint publicly accessible (security pitfall — 401 without admin token), client-side PDF generation via browser Print dialog.

**Research flag:** Needs research — `@react-pdf/renderer` font embedding API for Noto Sans needs verification. Sanity Studio custom actions API needs checking for current v3 patterns.

### Phase 6: Admin Polish + Operations

**Rationale:** With all integrations working, this phase focuses on Sanity Studio customization to make the admin experience ergonomic for daily solo operation: custom dashboard views, client deadline overview, document workflow management. No new integrations — pure polish on what's already built.

**Delivers:** Sanity Studio custom dashboard with client and deadline overview, document management workflow (track which documents have been generated and sent per client), Studio access configured (authentication required, not publicly indexable), scheduled daily rebuild cron for webhook fallback, health-check function for Calendar API token validity (if custom API used), Lighthouse CI integrated into Cloudflare Pages deployment checks.

**Addresses:** Admin CMS dashboard (client deadline tracker), operational maturity signals, "Looks Done But Isn't" checklist validation across all prior phases.

**Avoids:** Sanity Studio publicly accessible without auth, OAuth tokens without a rotation/monitoring plan.

**Research flag:** Standard patterns — Sanity Studio v3 customization is documented. No novel integrations.

### Phase Ordering Rationale

- **i18n routing must be Phase 1:** Retrofitting locale URL structure after launch breaks all existing URLs and SEO. There is no safe way to add bilingual routing as an afterthought.
- **CMS schemas must precede all content:** Both public pages and the document generation system depend on Sanity data being queryable. Defining admin schemas in Phase 2 (not Phase 5) prevents rework in the document generation phase.
- **Public site before integrations:** Building all SSG pages in Phase 3 before adding SSR complexity validates that the static foundation is correct. It also produces a deployable, reviewable site early.
- **Booking before document generation:** Booking is simpler (one API route, well-defined integration) and establishes the SSR + API route pattern that document generation builds on.
- **Document generation last:** It has the most dependencies (CMS admin schemas, PDF library, Sanity Studio actions) and is the highest-risk integration. Building it last means all foundations are proven before adding complexity.
- **Admin polish as a distinct phase:** Sanity Studio customization has no external dependencies and can be deferred without blocking any user-facing functionality.

### Research Flags

Phases needing deeper research during planning:
- **Phase 4 (Booking):** If using custom Google Calendar API — OAuth service account vs. user OAuth flow, token storage patterns, and the production vs. testing consent screen distinction need careful implementation research. Cal.com embed path avoids this entirely.
- **Phase 5 (Document Generation):** `@react-pdf/renderer` Noto Sans font embedding API and Sanity Studio v3 custom actions API both need current documentation verification before implementation.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Astro 6 i18n routing is officially documented and stable.
- **Phase 2 (CMS Setup):** `@sanity/astro` integration has an official Astro CMS guide.
- **Phase 3 (Public Site):** Astro SSG + Tailwind + Cloudflare is a well-traveled path.
- **Phase 6 (Admin Polish):** Sanity Studio v3 customization is documented with examples.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core choices (Astro 6, Tailwind v4, Sanity v3, Cloudflare Pages) verified via official release blogs and docs. Version compatibility table confirmed. Minor uncertainty on `astro-seo` maintenance status — verify before using. |
| Features | HIGH | Feature list grounded in 2025/2026 UX conversion research and domain-specific analysis. Anti-features rationale is well-reasoned for solo-operator context. MVP scope is opinionated and defensible. |
| Architecture | HIGH | All patterns confirmed via official Astro docs (i18n, hybrid SSR, content collections, API routes). Sanity integration via official guide. PDF generation and Calendar API patterns are standard serverless patterns. |
| Pitfalls | HIGH (critical), MEDIUM (integration specifics) | i18n SSG fallback limitation confirmed via Astro GitHub issue. Calendar OAuth expiry behavior confirmed via Google docs. PDF font issue confirmed via multi-language PDF generation sources. Integration-specific details (e.g., Sanity webhook retry behavior) are MEDIUM confidence. |

**Overall confidence:** HIGH

### Gaps to Address

- **`astro-seo` maintenance status:** Last npm version was June 2024. Verify the package is still actively maintained before committing to it, or consider using Astro's built-in Head component with manual meta tags. Low risk — easy to swap.
- **Sanity free tier limits:** Pricing can change. Verify current free tier API call limits (cited as 500k/month) before launch. Low risk for a low-traffic agency site.
- **Cal.com vs. custom Calendar API decision:** Research recommends Cal.com strongly, but if the project requires booking data to be captured in Sanity (for the admin dashboard), custom API integration may be necessary. Clarify this requirement during planning before Phase 4.
- **Cloudflare Pages + Astro hybrid SSR adapter:** Confirm the Cloudflare adapter handles both static output and SSR API routes in the same deployment. This is stated as supported in Astro 6 docs but should be verified in the project's actual Cloudflare Pages configuration.
- **Romanian diacritic variants:** ș/ț (comma-below) vs. ş/ţ (cedilla) — ensure all content and templates use the correct Unicode code points. This is a content governance decision, not a technical one, but affects PDF rendering tests.

## Sources

### Primary (HIGH confidence)
- Astro 6.0 official release blog — framework version, Node 22 requirement, Cloudflare Workers support
- Astro i18n routing docs — built-in i18n, locale folders, hreflang, fallback behavior
- Astro on-demand rendering docs — hybrid SSG/SSR, `prerender = false` pattern
- Tailwind CSS v4.0 release blog — Vite plugin as official integration path
- Astro 5.2 blog — `@astrojs/tailwind` deprecation, `@tailwindcss/vite` as replacement
- Astro + Sanity CMS official guide — `@sanity/astro` integration, Content Layer API
- Astro API route forms docs — SSR API route patterns, form handling
- Astro GitHub issue #10957 — i18n fallback limitation in SSG mode confirmed
- Google Calendar API OAuth docs — testing mode token expiry (7 days), production publishing requirement
- `@react-pdf/renderer` npm — v4.3.2, 1.4M weekly downloads, Node.js server-side rendering
- Cal.com — Google Calendar two-way sync, embed widget, free tier confirmed
- Vercel Astro docs — free tier bandwidth limit (100 GB/month) confirmed

### Secondary (MEDIUM confidence)
- Sanity pricing page — free tier limits (500k API calls/month, 20 seats)
- Cloudflare Pages vs. Vercel free tier comparison — bandwidth and hosting cost analysis
- Sanity vs. Payload hosted vs. self-hosted decision guide — CMS selection rationale
- Headless CMS 2026 comparison (Sanity vs. Payload) — architecture tradeoffs
- Paraglide JS vs. astro-i18next comparison — type-safe i18n recommendation
- Multi-language PDF generation pitfalls — font and encoding issues confirmed via independent source
- 2025/2026 pricing page UX research — "recommended tier" 22% conversion lift, hidden pricing abandonment rates
- Revolgy scheduling tools comparison — Cal.com vs. Calendly feature parity confirmed

### Tertiary (LOW confidence)
- `astro-seo` GitHub (136k weekly downloads, last version June 2024) — maintenance status uncertain; verify before adoption
- Agency portfolio conversion and trust research — general best practices, not Isio-specific

---
*Research completed: 2026-03-21*
*Ready for roadmap: yes*
