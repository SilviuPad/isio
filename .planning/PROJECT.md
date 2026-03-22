# Isio

## What This Is

Isio is a bilingual (Romanian + English) web services agency platform for a solo developer. It combines a public marketing site (services, pricing, portfolio, booking, contact) with an admin dashboard for client management, deadline tracking, and bilingual PDF document generation. Built on Astro 6, deployed on Cloudflare Workers.

## Core Value

Clients can discover services, understand pricing, and book a discovery call — all self-service — while the solo developer manages everything from a single admin panel.

## Requirements

### Validated

- ✓ Bilingual public website (RO + EN) with language switcher — v1.0
- ✓ SEO-optimized static pages with JSON-LD schema markup — v1.0
- ✓ Fiverr-style tiered pricing (Basic/Standard/Premium) for all 5 services — v1.0
- ✓ Service pages: website builds, web apps, SEO packages, accessibility audits, agentic implementation — v1.0
- ✓ Portfolio grid (Vpatify, IsioPilot, StartupJunior, QRtist) — v1.0
- ✓ Contact form with Resend email + Turnstile spam protection — v1.0
- ✓ Discovery call booking via Cal.com embed — v1.0
- ✓ Admin dashboard with D1 database, client CRUD, deadline tracker — v1.0
- ✓ Bilingual PDF generation: proposals, contracts, invoices, reports — v1.0
- ✓ Romanian diacritics in PDFs via Noto Sans embedding — v1.0
- ✓ Shared-secret admin authentication — v1.0

### Active

(None — next milestone requirements TBD via `/gsd:new-milestone`)

### Out of Scope

- Client login portal — solo admin only, clients don't need accounts
- Real-time chat — contact form and booking are sufficient
- Payment processing — invoices generated manually, no online payments for v1
- Mobile app — web-only
- Blog/content marketing — can be added later as a CMS content type
- AI chatbot on agency site — hallucination risk damages brand trust
- Multi-language beyond RO/EN — two markets sufficient

## Context

Shipped v1.0 with 31,595 LOC across 195 files in 2 days.

**Tech stack:**
- Public site: Astro 6, Tailwind CSS v4, Paraglide i18n, Cloudflare Workers
- Admin: Astro 6, Cloudflare D1 + Drizzle ORM, jsPDF, Resend
- Content: Astro content collections (JSON), no external CMS

**Known issues:**
- admin/wrangler.toml has placeholder database_id — needs `wrangler d1 create isio-admin` before production
- ARM64 Windows `npm run build` has pre-existing Vite SSR deps issue (doesn't affect wrangler dev or deployment)

## Constraints

- **Architecture**: Static-first/SSG via Astro on Cloudflare Workers
- **Complexity**: Maintainable by a solo developer — no overengineering
- **i18n**: Full bilingual support (RO + EN) across all public pages
- **Design**: Mobile-first responsive
- **Plugins**: Use existing ecosystem solutions over custom code

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro 6 + Tailwind CSS v4 | Static-first for SEO; agency must practice what it preaches | ✓ Good |
| Astro content collections (JSON) over external CMS | Solo dev needs version-controlled content without dependency | ✓ Good |
| Cal.com embed over custom Google Calendar API | Eliminates OAuth complexity entirely | ✓ Good |
| Cloudflare D1 + Drizzle ORM for admin | Serverless DB with type-safe queries, zero infrastructure cost | ✓ Good |
| jsPDF + Noto Sans for PDF generation | Browser-side rendering, proper Romanian diacritics | ✓ Good |
| EUR-only pricing in documents | No RON conversion complexity for solo agency | ✓ Good |
| Single clients table (no separate projects) | One-to-one constraint; keeps schema simple | ✓ Good |
| Resend + Turnstile for contact form | Free tier covers needs; Turnstile is frictionless CAPTCHA | ✓ Good |
| Paraglide JS v2 for i18n messages | Compiled messages, no runtime overhead, type-safe | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-22 after v1.0 milestone*
