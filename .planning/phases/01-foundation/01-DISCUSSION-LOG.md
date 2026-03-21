# Phase 1: Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-21
**Phase:** 01-foundation
**Areas discussed:** CMS content model, URL structure, Deployment pipeline, Pricing data model

---

## CMS Content Model

### Q1: Bilingual content storage strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Per-field (Recommended) | One document per service, each text field has { en, ro }. Easier to keep in sync. | ✓ |
| Per-document | Separate RO and EN documents linked together. More flexible but harder to sync. | |
| You decide | Claude picks the best approach | |

**User's choice:** Per-field (Recommended)
**Notes:** None

### Q2: CMS-managed vs hardcoded content

| Option | Description | Selected |
|--------|-------------|----------|
| Everything in CMS | Services, pricing, portfolio, about, nav, footer, SEO meta — all editable | |
| Content only | Services, pricing, portfolio in CMS — nav, footer, layout in code | |
| You decide | Claude picks what belongs in CMS vs code | ✓ |

**User's choice:** You decide
**Notes:** Claude has discretion on CMS vs code boundary

### Q3: Portfolio project detail level

| Option | Description | Selected |
|--------|-------------|----------|
| Essentials | Title, description, screenshot, tech stack tags, live URL | ✓ |
| Detailed | Essentials + problem/solution, results/metrics, multiple screenshots, client name | |
| You decide | Claude determines the right level | |

**User's choice:** Essentials
**Notes:** None

---

## URL Structure

### Q1: Default language

| Option | Description | Selected |
|--------|-------------|----------|
| English default | isio.dev/services/seo (EN), isio.dev/ro/servicii/seo (RO) | |
| Romanian default | isio.ro/servicii/seo (RO), isio.ro/en/services/seo (EN) | ✓ |
| Both prefixed | /en/ and /ro/ both prefixed, root redirects | |

**User's choice:** Romanian default
**Notes:** Local market priority

### Q2: Translated slugs

| Option | Description | Selected |
|--------|-------------|----------|
| Translated slugs | /servicii/seo (RO) and /en/services/seo (EN) — better SEO per locale | ✓ |
| Same slugs | /services/seo both languages — simpler | |
| You decide | Claude picks best approach for SEO | |

**User's choice:** Translated slugs
**Notes:** Better SEO per locale, more work but worth it

### Q3: Domain

| Option | Description | Selected |
|--------|-------------|----------|
| isio.dev | Short, techy, modern — .dev signals developer credibility | |
| isio.ro | Romanian TLD — strong local SEO signal | ✓ |
| Other | Different domain | |

**User's choice:** isio.ro
**Notes:** None

---

## Deployment Pipeline

### Q1: Environments

| Option | Description | Selected |
|--------|-------------|----------|
| Prod only | Single environment, preview deploys on PRs via Cloudflare | ✓ |
| Staging + prod | Separate staging.isio.ro for testing | |
| You decide | Claude picks the right setup | |

**User's choice:** Prod only
**Notes:** PR preview deploys serve as staging

### Q2: CMS rebuild trigger

| Option | Description | Selected |
|--------|-------------|----------|
| Webhook auto-rebuild | Every Sanity publish triggers Cloudflare rebuild automatically | ✓ |
| Manual deploy | Click 'Deploy' in Cloudflare when ready | |
| You decide | Claude picks best approach | |

**User's choice:** Webhook auto-rebuild
**Notes:** None

---

## Pricing Data Model

### Q1: Tier fields

| Option | Description | Selected |
|--------|-------------|----------|
| Standard Fiverr | Tier name, price, delivery time, deliverables list, revision count | |
| Extended | Standard + short description, popular badge, CTA text | |
| You decide | Claude designs the tier structure | ✓ |

**User's choice:** You decide
**Notes:** Claude has discretion

### Q2: Currency

| Option | Description | Selected |
|--------|-------------|----------|
| EUR only | Euro — works for both Romanian and international | ✓ |
| RON + EUR | Locale-aware pricing | |
| USD + EUR | Dollar for international, Euro for European | |

**User's choice:** EUR only
**Notes:** None

---

## Claude's Discretion

- CMS schema design (what goes in CMS vs code)
- Pricing tier field structure
- Sanity Studio configuration and plugins
- Astro i18n approach
- SEO meta tag implementation
- Cloudflare Pages adapter config

## Deferred Ideas

None — discussion stayed within phase scope
