# Feature Research

**Domain:** Web Services Agency Platform (Solo Developer)
**Researched:** 2026-03-21
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features prospective clients assume exist. Missing these causes immediate loss of credibility or trust.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Service pages (one per offering) | Clients need to understand what they're buying before they contact anyone | LOW | Website builds, web apps, SEO packages, accessibility audits — each needs its own page with scope, deliverables, turnaround |
| Tiered pricing display (Basic/Standard/Premium) | Fiverr and Upwork have trained buyers to compare tiers; no pricing = friction | MEDIUM | Comparison table per service. Highlight the "recommended" tier (converts 22% better per 2025 UX data). Mobile-stacked layout essential |
| Portfolio / case studies grid | Proof of capability is the #1 trust signal for agency hire decisions | LOW | Vpatify.com, IsioPilot, StartupJunior.ro. Screenshots, tech stack, outcome summary per project |
| Contact / booking capability | No way to reach you = no conversion path | LOW | Minimum: contact form. Better: booking form synced to calendar for discovery calls |
| Mobile-first responsive design | 65%+ of web traffic is mobile; 40%+ of service page visits are mobile | LOW | Non-negotiable in 2026. Pricing tier columns must stack vertically on mobile |
| Fast page load / Core Web Vitals | Speed directly correlates with conversion rate (5.7s = 0.6% conversion vs 2.4s = 1.9%) | LOW | Astro SSG makes this achievable with near-zero effort |
| Professional domain + HTTPS | Custom domain is baseline signal of legitimacy | LOW | Already assumed |
| About / Who is Isio section | Clients hiring a solo dev want to know the person, not just the services | LOW | Brief bio, specializations, photo optional. Humanizes the agency |
| Testimonials / social proof | Clients trust peers more than marketing copy | LOW | Can be static initially. Even 2-3 quotes from past clients are table stakes |
| Clear navigation and structure | Users leave disorganized sites immediately | LOW | Services, Portfolio, Pricing, About, Contact — standard nav expected |
| SEO basics (title tags, meta descriptions, sitemap, robots.txt) | Expected of any professional site, especially one selling SEO services | LOW | An SEO agency with bad SEO is disqualifying |
| Language switcher (RO / EN) | Targeting two markets — a Romanian client landing on English-only will leave | MEDIUM | Must switch all content, meta tags, hreflang, OG tags, and URLs |

### Differentiators (Competitive Advantage)

Features that elevate Isio above generic freelancer portfolio sites and create a "this person runs a real operation" impression.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Bilingual CMS-managed content (RO + EN) | Most solo devs can't serve two language markets seamlessly — this signals professionalism and market reach | HIGH | Requires hreflang tags, locale-based URL routing (/ro/ vs /en/), and CMS content types per locale. Sanity handles this natively |
| Accessibility audit as a service offering | Very few solo dev agencies offer WCAG audits — positions Isio as a specialist, not a generalist | MEDIUM | Service page must itself score perfectly on accessibility (eating your own cooking). Links SEO + a11y together as a premium bundle pitch |
| Editable price sheet via CMS (no redeploy) | Solo dev can update pricing without a developer's intervention — rare for static sites | MEDIUM | Sanity-managed pricing data fetched at build time or via ISR. Clients always see current prices |
| Custom discovery call booking synced to Google Calendar | Most freelancers use email back-and-forth; a frictionless booking flow signals operational maturity | MEDIUM | Cal.com embed or custom form with Google Calendar API. Block off unavailable times automatically |
| Admin CMS dashboard (client deadline tracker) | Solo dev managing multiple clients needs a single source of truth — this prevents missed deadlines | HIGH | Sanity Studio used as lightweight CRM: clients, projects, deadlines, statuses. No off-the-shelf tool needed |
| Bilingual document generation (proposals, contracts, invoices, reports) | International clients expect documents in their language; Romanian clients need RO docs for legal/accounting | HIGH | PDF generation from CMS data. Template per doc type (RO + EN). This is a genuine operational differentiator — most freelancers use static Word templates |
| Portfolio with measurable outcomes | "I built X" is expected. "I built X and it achieved Y metric" is rare and memorable | MEDIUM | Add context to portfolio items: problem, solution, result (e.g. Lighthouse score achieved, traffic increase, compliance certification) |
| Perfect Lighthouse score on the agency site | An SEO/performance agency with a mediocre Lighthouse score loses credibility instantly | LOW | Astro SSG with no unnecessary JS makes this achievable. Treat the site as a living demo of the service offered |
| Schema markup (LocalBusiness, Service, WebSite) | Rich snippets from schema get 58% of user clicks vs 41% for non-rich results | LOW | JSON-LD in page head. Service schema per offering page. Especially high-value since SEO is a core service |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem like good ideas but create maintenance burden, scope creep, or complexity that outweighs their value for a solo operation.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Client login portal | "Clients want to see their project status" | Adds auth layer, database dependency, session management, and ongoing support burden. Clients can email or call — the complexity is not justified at solo scale | Use the admin CMS (Sanity) to track client status internally. Share status updates via email or a shared Google Doc link per client |
| Real-time chat widget | "Converts visitors into leads faster" | Live chat requires real-time presence — a solo dev cannot staff a chat widget. Offline chat creates frustration and negative impression | Contact form + "Usually responds within 24 hours" sets clear expectations. Booking link is faster for qualified leads |
| Payment processing / online checkout | "Let clients pay invoices online" | Stripe integration, payment reconciliation, failed payment handling, and VAT/tax compliance (especially for Romanian clients) is significant overhead | Generate PDF invoices via CMS; send bank transfer details. Add Stripe in v2 after validating client volume justifies it |
| Blog / content marketing section | "Helps SEO" | Content strategy requires ongoing commitment. An empty or stale blog hurts more than no blog. Maintenance burden for a solo dev is high | Defer to v2. CMS content type can be built in advance so enabling it later is trivial |
| Real-time project collaboration portal | "Clients want to comment on deliverables" | Full collaboration portals (like Notion or Figma sharing) require significant infra and are category-defining products in themselves | Direct link sharing (Figma, Google Docs, Loom videos) handles this without custom code |
| Multi-user admin | "What if you hire someone?" | Premature. Adding role-based access control before there's a second user is wasted effort | Sanity natively supports multi-user when needed — can be unlocked later without rearchitecting |
| Live availability calendar (real-time) | "Show clients when you're free" | If the booking form already syncs with Google Calendar, a separate public availability display is redundant and can confuse visitors | Booking form auto-blocks unavailable slots — this is sufficient |
| AI chatbot | "Modern, impressive" | Hallucinations and unpredictable responses damage brand trust. High integration cost. No competitive advantage for an agency site | FAQ section answers common questions. Contact form for everything else |

## Feature Dependencies

```
[Bilingual Public Site (RO + EN)]
    └──requires──> [i18n URL routing (/ro/ + /en/)]
                       └──requires──> [Hreflang tags per page]
                       └──requires──> [CMS content per locale]
                       └──requires──> [Language switcher UI]

[Tiered Pricing Display]
    └──requires──> [CMS-managed pricing data]
                       └──enhances──> [Editable price sheet (no redeploy)]

[Discovery Call Booking]
    └──requires──> [Booking form UI]
    └──requires──> [Google Calendar sync / Cal.com integration]

[Admin CMS Dashboard]
    └──requires──> [Headless CMS setup (Sanity)]
                       └──enables──> [Editable pricing]
                       └──enables──> [Bilingual content management]
                       └──enables──> [Client deadline tracker]
                       └──enables──> [Document generation data source]

[Bilingual Document Generation]
    └──requires──> [Admin CMS Dashboard (data source for client/project info)]
    └──requires──> [PDF generation library or service]
    └──requires──> [Document templates (RO + EN per type)]

[Portfolio Grid]
    └──enhances──> [Case study detail pages]
                       └──enhances──> [Schema markup (WebPage/CreativeWork)]

[Perfect Lighthouse Score]
    └──requires──> [Astro SSG architecture]
    └──requires──> [Optimized images (WebP, lazy load)]
    └──requires──> [Minimal client-side JS]

[Schema Markup]
    └──requires──> [Service pages (per offering)]
    └──requires──> [Static page structure (SSG)]

[Client Deadline Tracker] ──conflicts──> [Client Login Portal]
    (tracker is internal-only; adding client-facing view creates auth complexity)
```

### Dependency Notes

- **Bilingual site requires i18n routing:** URL structure (e.g. `/ro/servicii` vs `/en/services`) must be established at project start — retrofitting i18n routing after launch is painful and breaks existing URLs/SEO.
- **CMS is the single source of truth:** Pricing data, portfolio entries, service descriptions, and client records all flow from Sanity. The admin panel is not a separate build — it is Sanity Studio configured to fit Isio's data model.
- **Document generation requires CMS:** Proposals and invoices pull client name, service tier, price, and deliverables from the CMS. The document system cannot be built before the CMS data model is defined.
- **Booking requires calendar integration:** The form itself is simple; the value comes from real-time availability blocking via Google Calendar API or a Cal.com embed. Without the integration, it's just an email-delivery form.
- **Perfect Lighthouse score requires SSG architecture:** Dynamic server-rendered pages (SSR) can still score well, but SSG with Astro eliminates the performance debt entirely. Architecture decision must be made in Phase 1.

## MVP Definition

### Launch With (v1)

Minimum set needed for Isio to credibly present as a professional agency and capture leads.

- [ ] Bilingual public site (RO + EN) with language switcher — core to both markets
- [ ] Service pages for all four offerings with tiered pricing display — clients need to understand and compare before booking
- [ ] Portfolio grid (Vpatify, IsioPilot, StartupJunior.ro) — proof of capability, essential for trust
- [ ] Discovery call booking form synced to Google Calendar — the conversion endpoint
- [ ] About section — humanizes the agency, important for solo operator trust
- [ ] Basic schema markup (LocalBusiness, Service) — easy win for SEO credibility
- [ ] CMS admin (Sanity Studio) with pricing management and client tracker — operational backbone
- [ ] Perfect Lighthouse score / Core Web Vitals — the agency's own site is its best advertisement for the services it sells
- [ ] Hreflang + sitemap + robots.txt — SEO fundamentals, especially critical for a bilingual site

### Add After Validation (v1.x)

Features to add once core lead generation is working and client volume justifies them.

- [ ] Bilingual document generation (proposals, invoices, contracts) — trigger: first client needing a formal proposal or contract
- [ ] Testimonials section — trigger: 2-3 clients with positive outcomes willing to provide quotes
- [ ] Portfolio case study detail pages — trigger: portfolio needs more depth to convert higher-value clients
- [ ] Accessibility audit service page depth (WCAG levels, what's included per tier) — trigger: first accessibility audit inquiry

### Future Consideration (v2+)

Features to defer until product-market fit and client volume is established.

- [ ] Blog / content marketing — defer: requires sustained effort; empty blog is actively harmful
- [ ] Online payment processing (Stripe) — defer: invoice volume must justify the integration and compliance overhead
- [ ] Report generation automation — defer: depends on having repeatable audit/SEO report templates refined through real client work
- [ ] Multi-language document templates beyond RO/EN — defer: validate the two primary markets first

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Bilingual site (RO + EN) with i18n routing | HIGH | MEDIUM | P1 |
| Service pages with tiered pricing | HIGH | LOW | P1 |
| Portfolio grid | HIGH | LOW | P1 |
| Discovery call booking + Calendar sync | HIGH | MEDIUM | P1 |
| CMS admin (Sanity Studio) | HIGH | MEDIUM | P1 |
| Perfect Lighthouse / Core Web Vitals | HIGH | LOW | P1 |
| Schema markup (LocalBusiness, Service) | MEDIUM | LOW | P1 |
| About section + social proof | MEDIUM | LOW | P1 |
| Hreflang + sitemap + SEO fundamentals | HIGH | LOW | P1 |
| Editable price sheet via CMS | MEDIUM | LOW | P1 |
| Client deadline tracker in admin | MEDIUM | LOW | P2 |
| Bilingual document generation | MEDIUM | HIGH | P2 |
| Portfolio case study detail pages | MEDIUM | LOW | P2 |
| Testimonials section | MEDIUM | LOW | P2 |
| Accessibility service page depth | MEDIUM | LOW | P2 |
| Blog / content marketing | LOW | HIGH | P3 |
| Online payment processing | MEDIUM | HIGH | P3 |
| Report generation automation | MEDIUM | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

Comparing how typical solo dev agency sites handle the key features vs. the Isio approach.

| Feature | Typical Freelancer Site | Established Agency Site | Isio Approach |
|---------|------------------------|------------------------|---------------|
| Pricing | "Contact for quote" — high friction | Per-project estimates, often gated | Fiverr-style tiers publicly displayed — removes friction, signals transparency |
| Languages | Single language (EN or local) | EN only or separate sites | Full bilingual (RO + EN) with locale-aware URLs and CMS content per locale |
| Booking | Email-only or Calendly embed | Sales team contact form | Custom booking form + Google Calendar sync, framed as a "discovery call" |
| Portfolio | Screenshot gallery | Case studies with metrics | Outcome-focused case studies with tech stack and results |
| Documents | Word templates emailed manually | Proposal tools (PandaDoc, Ignition) | CMS-generated PDFs in both languages — no third-party SaaS dependency |
| Admin | Spreadsheets, email | Project management tools (Asana, ClickUp) | Sanity Studio as lightweight internal CRM — no additional subscription |
| SEO | Basic, often neglected | Managed by SEO team | Exemplary — the site is a proof-of-work for the SEO service being sold |
| Accessibility | Rarely considered | Checked by dedicated role | Perfect WCAG compliance — proof-of-work for the accessibility audit service |

## Sources

- Hosting.com: "Websites are no longer one-off projects: what agencies and developers must prepare for in 2026" — https://hosting.com/blog/websites-are-no-longer-one-off-projects-2026/
- Userpilot: "13 Pricing Page Best Practices to Boost Conversion Rates" — https://userpilot.com/blog/pricing-page-best-practices/
- PipelineRoad: "SaaS Pricing Page Best Practices: What Actually Converts in 2026" — https://pipelineroad.com/agency/blog/saas-pricing-page-best-practices
- Intlayer: "Per-component i18n for React, Next.js, Vue, Svelte — SEO and i18n" — https://intlayer.org/blog/SEO-and-i18n
- DEV Community: "i18n SEO checklist: 15 SEO optimization techniques" — https://dev.to/lingodotdev/the-i18n-seo-checklist-15-seo-optimization-techniques-to-reach-a-global-audience-59l0
- Strapi Blog: "Strapi 5 i18n Guide: Multilingual SEO & Internationalization" — https://strapi.io/blog/strapi-5-i18n-complete-guide
- Revolgy: "Best Google Calendar schedulers: Appointments vs Calendly vs Cal.com vs OnceHub" — https://www.revolgy.com/insights/blog/scheduling-tools-for-google-calendar-calendly-vs-google-appointments-vs-cal.com-vs-oncehub
- Teamwork: "The 12 biggest mistakes our web agency made and how we fixed them" — https://www.teamwork.com/blog/12-web-design-agency-mistakes/
- Sanity.io: "Enterprise Astro CMS" — https://www.sanity.io/astro-cms
- Brightlocal: "8 Schema Templates for Local SEO" — https://www.brightlocal.com/learn/local-seo-schema-templates/
- BuzzBoard: "Schema Markup for Local Website SEO" — https://www.buzzboard.ai/mastering-schema-markup-for-local-seo-a-complete-guide-to-structured-data/
- accessiBe: "The SEO Benefits of Web Accessibility" — https://accessibe.com/blog/knowledgebase/web-accessibility-and-seo

---
*Feature research for: Web Services Agency Platform (Isio)*
*Researched: 2026-03-21*
