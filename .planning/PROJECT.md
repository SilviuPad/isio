# Isio

## What This Is

Isio is a web services agency platform for a solo developer offering website builds, web apps, SEO packages, and accessibility audits. It combines a bilingual (Romanian + English) public-facing marketing site with a CMS-powered admin backend for managing clients, documents, scheduling, and pricing. The site is designed to make a solo operation look and feel like a professional agency.

## Core Value

Clients can discover services, understand pricing, and book a discovery call — all self-service — while the solo developer manages everything from a single CMS-powered admin panel.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Bilingual public website (RO + EN) with language switcher
- [ ] SEO-optimized, mostly static pages with perfect Lighthouse scores
- [ ] Fiverr-style tiered pricing (Basic/Standard/Premium) for each service category
- [ ] Service pages for: website builds, web apps, SEO packages, accessibility audits
- [ ] Portfolio grid showcasing past work (Vpatify, IsioPilot, StartupJunior.ro)
- [ ] Custom booking form for discovery calls, synced with Google Calendar
- [ ] CMS-powered admin panel (headless CMS) for content and business management
- [ ] Bilingual document generation: proposals, contracts, invoices, reports (RO + EN)
- [ ] Client deadline tracker/scheduler in admin
- [ ] Editable price sheet managed via CMS
- [ ] Single admin authentication (password-protected, solo user)
- [ ] Modern, professional UI design — mobile-first responsive
- [ ] Use existing plugins/integrations where possible over custom code

### Out of Scope

- Client login portal — solo admin only, clients don't need accounts
- Real-time chat — contact form and booking are sufficient
- Payment processing — invoices generated manually, no online payments for v1
- Mobile app — web-only
- Blog/content marketing — can be added later as a CMS content type

## Context

- Solo developer agency — everything must be manageable by one person
- Agency name: **Isio**
- Target market: Romanian and international clients (hence bilingual)
- Existing portfolio sites to showcase:
  - **Vpatify.com** — accessibility marketplace and accessibility audit platform
  - **IsioPilot** — (related product/tool)
  - **StartupJunior.ro** — financial education for children
- SEO is a core service offering, so the agency site itself must exemplify excellent SEO
- Documents must be generated in both Romanian and English for local and international clients
- Plugin-first approach: prefer established plugins, integrations, and libraries over custom-built solutions

## Constraints

- **Architecture**: Static-first/SSG for SEO performance — Astro is the natural fit
- **CMS**: Headless CMS (Sanity, Strapi, or similar) for content management and admin
- **Complexity**: Must be maintainable by a solo developer — no overengineering
- **i18n**: Full bilingual support (RO + EN) across all public pages
- **Plugins**: Use existing ecosystem plugins where possible (calendar sync, i18n, document generation, CMS integrations)
- **Design**: Mobile-first responsive design — most clients will discover the agency on mobile

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static-first architecture (Astro/SSG) | SEO is a core service — site must practice what it preaches | — Pending |
| Headless CMS for admin | Solo dev needs easy content management without custom admin UI | — Pending |
| Fiverr-style tiered pricing | Clear, comparable tiers reduce friction for client decision-making | — Pending |
| Plugin-first approach | Solo dev can't maintain custom solutions for everything | — Pending |
| Bilingual (RO + EN) | Targeting both Romanian and international markets | — Pending |

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
*Last updated: 2026-03-21 after initialization*
