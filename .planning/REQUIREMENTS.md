# Requirements: Isio

**Defined:** 2026-03-21
**Core Value:** Clients can discover services, understand pricing, and book a discovery call — all self-service — while the solo developer manages everything from a single CMS-powered admin panel.

## v1 Requirements

### Public Site

- [ ] **SITE-01**: Service page for website builds with scope, deliverables, and turnaround
- [ ] **SITE-02**: Service page for web apps with scope, deliverables, and turnaround
- [ ] **SITE-03**: Service page for SEO packages with scope, deliverables, and turnaround
- [ ] **SITE-04**: Service page for accessibility audits with scope, deliverables, and turnaround
- [ ] **SITE-05**: Service page for agentic implementation with scope, deliverables, and turnaround
- [ ] **SITE-06**: Portfolio grid showcasing Vpatify, IsioPilot, and StartupJunior with screenshots, tech used, and links
- [ ] **SITE-07**: About section with bio, specializations, and agency identity
- [ ] **SITE-08**: Clear navigation structure (Services, Portfolio, Pricing, About, Contact)

### Pricing

- [ ] **PRIC-01**: Fiverr-style tiered pricing (Basic/Standard/Premium) for website builds
- [ ] **PRIC-02**: Fiverr-style tiered pricing (Basic/Standard/Premium) for web apps
- [ ] **PRIC-03**: Fiverr-style tiered pricing (Basic/Standard/Premium) for SEO packages
- [ ] **PRIC-04**: Fiverr-style tiered pricing (Basic/Standard/Premium) for accessibility audits
- [ ] **PRIC-05**: Fiverr-style tiered pricing (Basic/Standard/Premium) for agentic implementation
- [ ] **PRIC-06**: Highlighted "recommended" tier per service for conversion optimization
- [ ] **PRIC-07**: Pricing data managed via CMS (editable without redeploy)

### Internationalization

- [ ] **I18N-01**: Full bilingual site with RO and EN versions of all pages
- [ ] **I18N-02**: Language switcher UI component accessible from all pages
- [ ] **I18N-03**: Locale-based URL routing (/ro/ and /en/ prefixes)
- [ ] **I18N-04**: Hreflang tags on all pages for SEO
- [ ] **I18N-05**: CMS content stored per locale (RO and EN)

### SEO & Performance

- [ ] **SEO-01**: Perfect Lighthouse scores (Performance, SEO, Accessibility, Best Practices)
- [ ] **SEO-02**: JSON-LD schema markup (LocalBusiness, Service, WebSite) on relevant pages
- [ ] **SEO-03**: Auto-generated sitemap.xml
- [ ] **SEO-04**: Configured robots.txt
- [ ] **SEO-05**: Optimized meta tags (title, description, OG tags) per page and locale
- [ ] **SEO-06**: Static-first SSG architecture with zero unnecessary client-side JS

### Interaction

- [ ] **INTR-01**: Custom booking form for discovery calls synced with Google Calendar
- [ ] **INTR-02**: Contact form with email notification to admin
- [ ] **INTR-03**: Mobile-first responsive design across all pages and components

### CMS & Admin

- [ ] **CMS-01**: Sanity Studio setup for managing all site content (services, portfolio, about, pricing)
- [ ] **CMS-02**: Client deadline tracker in Sanity Studio (client name, project, milestones, due dates, status)
- [ ] **CMS-03**: Editable price sheet managed via CMS
- [ ] **CMS-04**: Content webhook triggering site rebuild on publish

### Documents

- [ ] **DOCS-01**: Bilingual proposal generation (RO and EN) from CMS client/project data
- [ ] **DOCS-02**: Bilingual contract generation (RO and EN) from CMS templates
- [ ] **DOCS-03**: Bilingual invoice generation (RO and EN) with line items and due dates
- [ ] **DOCS-04**: Bilingual report generation (RO and EN) for SEO audits and accessibility reports
- [ ] **DOCS-05**: PDF output with proper Romanian diacritics (Noto Sans font embedding)

### Authentication

- [ ] **AUTH-01**: Single admin login (password-protected) for Sanity Studio access

## v2 Requirements

### Marketing

- **MKTG-01**: Blog/content marketing section managed via CMS
- **MKTG-02**: Testimonials/social proof section with client quotes
- **MKTG-03**: Case study detail pages (problem, solution, results) linked from portfolio grid

### Payments

- **PAY-01**: Online invoice payment via Stripe integration
- **PAY-02**: Payment status tracking in CMS

### Notifications

- **NOTF-01**: Email notifications for new bookings
- **NOTF-02**: Email reminders for upcoming client deadlines

### Multi-User

- **MULT-01**: Role-based access for future team members in Sanity Studio

## Out of Scope

| Feature | Reason |
|---------|--------|
| Client login portal | Solo admin only — complexity not justified at current scale |
| Real-time chat widget | Solo dev can't staff it; offline chat creates negative impression |
| AI chatbot on agency site | Hallucination risk damages brand trust; FAQ section is sufficient |
| Mobile app | Web-first; no client-facing native app needed |
| Real-time project collaboration | Direct link sharing (Figma, Google Docs) handles this without custom code |
| Multi-language beyond RO/EN | Two markets are sufficient for v1 |
| E-commerce / shopping cart | Agency sells services, not products |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SITE-01 | Pending | Pending |
| SITE-02 | Pending | Pending |
| SITE-03 | Pending | Pending |
| SITE-04 | Pending | Pending |
| SITE-05 | Pending | Pending |
| SITE-06 | Pending | Pending |
| SITE-07 | Pending | Pending |
| SITE-08 | Pending | Pending |
| PRIC-01 | Pending | Pending |
| PRIC-02 | Pending | Pending |
| PRIC-03 | Pending | Pending |
| PRIC-04 | Pending | Pending |
| PRIC-05 | Pending | Pending |
| PRIC-06 | Pending | Pending |
| PRIC-07 | Pending | Pending |
| I18N-01 | Pending | Pending |
| I18N-02 | Pending | Pending |
| I18N-03 | Pending | Pending |
| I18N-04 | Pending | Pending |
| I18N-05 | Pending | Pending |
| SEO-01 | Pending | Pending |
| SEO-02 | Pending | Pending |
| SEO-03 | Pending | Pending |
| SEO-04 | Pending | Pending |
| SEO-05 | Pending | Pending |
| SEO-06 | Pending | Pending |
| INTR-01 | Pending | Pending |
| INTR-02 | Pending | Pending |
| INTR-03 | Pending | Pending |
| CMS-01 | Pending | Pending |
| CMS-02 | Pending | Pending |
| CMS-03 | Pending | Pending |
| CMS-04 | Pending | Pending |
| DOCS-01 | Pending | Pending |
| DOCS-02 | Pending | Pending |
| DOCS-03 | Pending | Pending |
| DOCS-04 | Pending | Pending |
| DOCS-05 | Pending | Pending |
| AUTH-01 | Pending | Pending |

**Coverage:**
- v1 requirements: 39 total
- Mapped to phases: 0
- Unmapped: 39 ⚠️

---
*Requirements defined: 2026-03-21*
*Last updated: 2026-03-21 after initial definition*
