# SEO Audit Report: isio.ro

**Date:** 2026-04-01
**Industry:** Web Development Agency (Bilingual RO/EN)
**Stack:** Astro 6 + Cloudflare Workers (SSR/SSG)
**Pages Indexed:** 22 URLs across 2 locales (11 RO + 11 EN)

---

## SEO Health Score: 53/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 68/100 | 15.0 |
| Content Quality | 23% | 47/100 | 10.8 |
| On-Page SEO | 20% | 55/100 | 11.0 |
| Schema / Structured Data | 10% | 30/100 | 3.0 |
| Performance (CWV) | 10% | 68/100 | 6.8 |
| AI Search Readiness (GEO) | 10% | 45/100 | 4.5 |
| Images | 5% | 40/100 | 2.0 |
| **TOTAL** | **100%** | | **53.1** |

---

## Action Plan

### Quick Wins (highest impact, lowest effort)

1. **Remove/shorten preloader** -- LCP drops by 1.5-2s (1 hour)
2. **Fix font loading** -- `@import` to `<link preconnect>` (30 min)
3. **Add FAQPage schema** to homepage (1 hour)
4. **Fix Page.astro prop-passing** so Service schema renders (30 min)
5. **Remove fake blog posts** from homepage (15 min)
6. **Create llms.txt** (30 min)
7. **Add security headers** via `_headers` file or Workers middleware (1 hour)
8. **Fix stats counters** -- render real values in HTML, animate visually only (30 min)

These 8 changes alone would push the score from ~53 to an estimated **70-75**.

### Critical (fix immediately)

| # | Issue | File(s) | Est. Effort |
|---|-------|---------|-------------|
| 1 | No security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options) | `wrangler.toml` or `public/_headers` | 1 hour |
| 2 | Fake blog posts -- 3 placeholder entries linking to "#" with fabricated dates | `src/components/home/BlogPreview.astro` | 15 min |
| 3 | No Privacy Policy page -- footer references it but page doesn't exist (GDPR requirement) | Create `src/pages/politica-confidentialitate.astro` + `src/pages/en/privacy-policy.astro` | 2-4 hours |
| 4 | Schema prop-passing bug -- `Page.astro` drops `pageType`/`serviceName` so Service schema never renders | `src/layouts/Page.astro`, `src/components/seo/JsonLd.astro` | 30 min |

### High (fix this week)

| # | Issue | File(s) | Est. Effort |
|---|-------|---------|-------------|
| 5 | Preloader adds 1.6-3.5s to LCP | `src/layouts/Base.astro:64-84` | 1 hour |
| 6 | Render-blocking Google Fonts `@import` (3 families, 12 weights) | `src/styles/global.css:2` | 30 min |
| 7 | Missing BreadcrumbList schema | `src/components/seo/JsonLd.astro` | 1 hour |
| 8 | Missing FAQPage schema (4 Q&A pairs exist in HTML but no structured data) | `src/components/seo/JsonLd.astro` | 1 hour |
| 9 | Incomplete sitemap hreflang -- only 4/22 URLs have hreflang (9/11 route pairs missing) | `astro.config.mjs:20-25` | 2 hours |
| 10 | SVG logo in schema -- Google requires raster (PNG/JPG) | `src/components/seo/JsonLd.astro` | 30 min |
| 11 | Missing OG image -- `/og.png` referenced but doesn't exist | `public/og.png` | 30 min |
| 12 | Service pages critically thin (~150-200 words, should be 800+) | `src/content/services/*.json` + service page templates | 4-8 hours |
| 13 | "50+ projects" vs 6 in portfolio -- unsubstantiated stat | `src/components/home/Stats.astro` | 15 min |
| 14 | IndexNow not implemented | `public/{key}.txt`, `public/robots.txt` | 1 hour |
| 15 | No llms.txt | `public/llms.txt` | 30 min |

### Medium (fix this month)

| # | Issue | File(s) | Est. Effort |
|---|-------|---------|-------------|
| 16 | Homepage title too generic (`"Isio -- Agentie Web"`) | `src/pages/index.astro` | 15 min |
| 17 | Meta descriptions critically thin (34 chars) | `src/content/services/*.json` | 1 hour |
| 18 | About page ~200 words (should be 500+) | `src/pages/despre.astro`, `src/pages/en/about.astro` | 2 hours |
| 19 | No testimonials or case studies | New component/content | 4-8 hours |
| 20 | "Partners & Technologies" mislabels open-source tools as partners | `src/components/home/Partners.astro` | 15 min |
| 21 | Placeholder social links (`href="#"`) in footer | `src/components/home/ContactInline.astro:31-36` | 15 min |
| 22 | No `lastmod` in sitemap | `astro.config.mjs` sitemap config | 30 min |
| 23 | Stats counters render "0+" in HTML -- crawlers see zeros | `src/components/home/Stats.astro` | 30 min |
| 24 | No question-based headings anywhere | Homepage section headings | 1 hour |
| 25 | Hreflang subtag inconsistency (sitemap `ro-RO`/`en-US`, HTML `ro`/`en`) | `astro.config.mjs`, `src/layouts/Base.astro` | 30 min |
| 26 | Three perpetual `requestAnimationFrame` loops | `Marquee.astro`, `Partners.astro`, `Hero.astro` | 2 hours |
| 27 | Entity name inconsistent ("ISIO" vs "Isio") | Multiple files | 30 min |
| 28 | ProfessionalService schema missing email, sameAs, founder | `src/components/seo/JsonLd.astro` | 1 hour |
| 29 | No Person schema for founder | `src/components/seo/JsonLd.astro` | 1 hour |
| 30 | No individual portfolio project pages | Create `src/pages/portofoliu/[slug].astro` | 4-8 hours |
| 31 | Missing legal entity info (CUI, registered address) | `src/components/layout/Footer.astro` | 15 min |

### Low (backlog)

| # | Issue | File(s) | Est. Effort |
|---|-------|---------|-------------|
| 32 | 404 page hardcoded to Romanian | `src/pages/404.astro` | 1 hour |
| 33 | No `x-default` hreflang in sitemap | `astro.config.mjs` | 30 min |
| 34 | Consider self-hosting fonts | `src/styles/global.css`, `src/layouts/Base.astro` | 2 hours |
| 35 | AI training crawlers unblocked (CCBot, anthropic-ai) | `public/robots.txt` | 15 min |
| 36 | Font CLS risk from `display=swap` | Font loading strategy | 1 hour |
| 37 | Manrope font referenced in Header but never loaded | `src/components/layout/Header.astro:51` | 5 min |

---

## 1. Technical SEO Audit (68/100)

### 1.1 Crawlability (78/100)

**robots.txt -- PASS**
- File exists at `public/robots.txt`
- `User-agent: *` with `Allow: /`
- Admin routes blocked (`Disallow: /admin/` and `/admin`)
- Sitemap directive present: `Sitemap: https://isio.ro/sitemap-index.xml`

**Sitemap -- PASS (with issues)**
- Sitemap index at `/sitemap-index.xml` references `/sitemap-0.xml`
- 22 URLs present covering both RO and EN locales
- [MEDIUM] Only homepage and contact pages have `xhtml:link` hreflang in sitemap. The other 18 URLs are missing hreflang annotations. Root cause: `@astrojs/sitemap` auto-matching fails for translated slugs (e.g., `/despre/` vs `/en/about/`).
- [LOW] No `<lastmod>` on any URL.

**Meta Robots -- PASS**
No `noindex`, `nofollow`, or `meta name="robots"` directives. All pages indexable.

**Canonical Tags -- PASS**
Self-referencing canonicals properly set via `astro-seo` in `Base.astro`.

### 1.2 Indexability (82/100)

- All content pages use `export const prerender = true` (static HTML at build time).
- Bilingual structure uses distinct URL paths with cross-referencing hreflang. No duplicate content risk.
- [MEDIUM] Homepage title `"Isio -- Agentie Web"` is too generic -- missing keywords and value proposition.

### 1.3 Security (45/100)

**HTTPS -- PASS** via Cloudflare Workers automatic SSL/TLS.

**[CRITICAL] No security headers configured:**

| Header | Status |
|--------|--------|
| `Strict-Transport-Security` (HSTS) | MISSING |
| `X-Content-Type-Options` | MISSING |
| `X-Frame-Options` | MISSING |
| `Content-Security-Policy` | MISSING |
| `Referrer-Policy` | MISSING |
| `Permissions-Policy` | MISSING |

No `_headers` file, no Workers middleware, no `wrangler.toml` header configuration exists.

**[HIGH] Missing OG image (`/og.png`)** -- referenced in Base.astro but file doesn't exist. Social shares show no preview.

**[HIGH] Favicon** -- Base layout references `/favicon.svg` but only `public/images/logo.svg` exists. Verify mapping.

### 1.4 URL Structure (85/100)

- Clean, lowercase, localized slugs: `/servicii/website/` (RO), `/en/services/website/` (EN)
- Trailing slashes consistent everywhere
- Maximum depth 3 levels (within recommended 3-4)
- [LOW] 404 page hardcoded to `locale: 'ro'` -- English users see Romanian error page
- [LOW] Privacy policy referenced in footer but no page exists

### 1.5 Mobile Optimization (88/100)

- Viewport meta tag present
- Tailwind CSS responsive breakpoints used throughout
- Dedicated `MobileMenu.astro` with proper ARIA attributes and body scroll lock
- Touch targets meet 48x48px minimum
- Custom cursor hidden on touch devices
- [LOW] Three Google Fonts loaded via CSS `@import` -- blocks rendering on slow mobile connections

### 1.6 Core Web Vitals (58/100)

| Metric | Estimated (Mobile) | Threshold | Status |
|--------|-------------------|-----------|--------|
| LCP | 2.5-3.5s | <= 2.5s | NEEDS IMPROVEMENT |
| INP | < 150ms | <= 200ms | GOOD |
| CLS | < 0.05 | <= 0.1 | GOOD |
| TTFB | < 100ms | < 200ms | GOOD |

**LCP issues:**
- [HIGH] Preloader covers viewport for 1.6-3.5s after `window.load`
- [HIGH] Google Fonts `@import` creates render-blocking waterfall (HTML -> CSS -> Fonts CSS -> Font files)
- [MEDIUM] No `<link rel="preload">` for critical Sora font

**INP risks:**
- Three perpetual `requestAnimationFrame` loops (marquee, partners carousel, hero glow orb)
- ~130KB animation JS (GSAP 70KB + ScrollTrigger 43KB + Lenis 17KB) loaded on every page

### 1.7 Structured Data (72/100)

Three schemas implemented in `JsonLd.astro`:
1. **WebSite** -- present, missing `potentialAction` and `publisher`
2. **ProfessionalService** -- present but incomplete (SVG logo, no email/sameAs/founder)
3. **Service** -- exists in code but **never renders** due to prop-passing bug

Missing: BreadcrumbList, FAQPage, Person, WebPage subtypes, Offer.

### 1.8 JavaScript Rendering (90/100)

All pages prerendered to static HTML. JavaScript used only for animations, accordion, and form submission. No JS-dependent content rendering. Ideal for crawlers.

### 1.9 IndexNow Protocol (0/100)

Not implemented. No API key file, no integration in build/deploy pipeline.

---

## 2. Content Quality Audit (47/100)

### 2.1 E-E-A-T Assessment (34/100)

| Factor | Score | Weight | Weighted |
|--------|-------|--------|----------|
| Experience | 35/100 | 20% | 7.0 |
| Expertise | 40/100 | 25% | 10.0 |
| Authoritativeness | 25/100 | 25% | 6.25 |
| Trustworthiness | 38/100 | 30% | 11.4 |
| **Total** | | | **34.65** |

**Experience (35/100):**
- Founder named (Silviu Paduraru) with 7+ years experience claim
- 6 portfolio items with live URLs and tech stacks
- No case studies, no before/after results, no process documentation
- Blog section: 3 fake placeholder posts linking to "#" -- actively damaging
- "50+ projects" stat but portfolio shows only 6

**Expertise (40/100):**
- Technical specializations listed with concrete deliverables (140+ SEO checks, WCAG 2.1, Lighthouse 90+)
- LinkedIn profile linked for founder
- No certifications, articles, talks, or publications
- Service pages are feature lists with no methodology depth
- Meta descriptions critically thin ("Professional web development services." = 34 chars)

**Authoritativeness (25/100):**
- Professional domain, proper structured data basics
- Cal.com booking integration
- Zero external citations, testimonials, or industry affiliations
- Social links point to "#" (placeholder)
- "Partners & Technologies" mislabels open-source tools as business partners

**Trustworthiness (38/100):**
- Contact email, form with CAPTCHA, response time commitment
- Transparent pricing with EUR amounts
- Post-launch support terms specified
- No privacy policy page (GDPR requirement for EU business)
- No terms of service, refund policy, or legal entity info
- Blog posts are fabricated -- 3 entries with dates linking to "#"
- Unsubstantiated claims: "100% client satisfaction", "10x faster"

### 2.2 Readability

Content reads at 7th-8th grade level (appropriate for B2B). However, heavy use of vague superlatives: "maximum performance", "exceptional performance", "lightning execution", "zero overhead, maximum results". Generic and interchangeable with any agency.

### 2.3 Word Count Analysis

| Page | Est. Words | Minimum | Status |
|------|-----------|---------|--------|
| Homepage | ~550 | 500 | BORDERLINE PASS |
| About | ~200 | 500 | FAIL |
| Service pages (each) | ~150-200 | 800 | CRITICAL FAIL |
| Pricing | ~80 + data | 300 | MARGINAL |
| Portfolio | ~50 + data | 300 | FAIL |
| Contact | ~180 | N/A | OK |

### 2.4 Thin Content Pages

1. **About page (~200 words)** -- should be 500+ with career timeline, methodology, verifiable credentials
2. **Service pages (~150-200 words each)** -- identical template structure, no explanatory prose, no methodology, no examples, no service-specific FAQ
3. **Portfolio page** -- card grid with 1-sentence descriptions, no individual project pages
4. **Services index** -- heading + card grid, no introductory content
5. **Blog section** -- entirely fabricated placeholder content

### 2.5 Content Uniqueness

- Service pages template-identical across all 5 services
- Marketing language generic and interchangeable
- The solo-developer positioning is a genuine differentiator but underutilized
- AI Agent implementation offering is distinctive in the Romanian market

### 2.6 Trust Signals

| Signal | Status |
|--------|--------|
| Founder name | Present |
| Contact email | Present |
| Contact form + CAPTCHA | Present |
| Booking system (Cal.com) | Present |
| Physical address | City only (Iasi) |
| Phone number | Missing |
| Testimonials/reviews | Missing (critical) |
| Case studies | Missing (critical) |
| Privacy policy page | Missing (critical, GDPR) |
| Terms of service | Missing |
| Company registration (CUI) | Missing |
| Certifications | Missing |
| Client logos | Missing |
| Portfolio with outcomes | Names only |

---

## 3. Schema Markup Audit (30/100)

### 3.1 Existing Schemas

**Block 1: WebSite**
```json
{
  "@type": "WebSite",
  "name": "ISIO",
  "url": "https://isio.ro",
  "inLanguage": "ro-RO",
  "description": "..."
}
```
Issues: Missing `potentialAction` (SearchAction), `publisher`. `inLanguage` only reflects current locale instead of site-wide.

**Block 2: ProfessionalService**
```json
{
  "@type": "ProfessionalService",
  "name": "ISIO",
  "url": "https://isio.ro",
  "logo": "https://isio.ro/favicon.svg",
  "address": { "@type": "PostalAddress", "addressCountry": "RO" },
  "areaServed": [{ "name": "Romania" }, { "name": "Global" }]
}
```
Issues: SVG logo invalid for Google. Address incomplete (no city/street). `"Global"` not a valid Country name. Missing: email, sameAs, founder, foundingDate, image, @id.

**Block 3: Service (conditional)**
```json
{
  "@type": "Service",
  "name": "...",
  "provider": { "@type": "ProfessionalService", "name": "ISIO" }
}
```
Issues: Missing description, serviceType, offers. **NEVER RENDERS** due to prop-passing bug in `Page.astro`.

### 3.2 Critical Bug: Schema Not Rendering

`Page.astro` interface does not accept `pageType` or `serviceName` props. These props never reach `Base.astro` or `JsonLd.astro`. All pages render with `pageType = 'default'`, meaning:
- Service schema never renders on service pages
- Homepage-specific logic never triggers
- Only WebSite + ProfessionalService blocks output on every page

### 3.3 Missing Schemas

| Schema | Priority | Where | Why |
|--------|----------|-------|-----|
| BreadcrumbList | Critical | All inner pages | Google breadcrumb rich results |
| Organization with `@id` | Critical | Global | Knowledge Panel, entity linking |
| WebPage subtypes | High | Every page | AboutPage, ContactPage, CollectionPage |
| Person | High | About page | Founder E-E-A-T signal |
| FAQPage | High | Homepage | AI citation + limited rich results |
| Offer | Medium | Service + Pricing pages | Pricing visibility |
| ItemList | Low | Portfolio | List items for Google |

### 3.4 Recommended Fix

Replace the current `JsonLd.astro` with a `@graph`-based implementation that:
- Uses `@id` for entity deduplication across pages
- Groups all entities under a single `@context`
- Adds BreadcrumbList, WebPage subtypes, Person schema
- Fixes the logo to use a raster image (`/og.png`)
- Adds email, sameAs, founder, foundingDate to ProfessionalService

Fix `Page.astro` to accept and forward `pageType` and `serviceName` props to `Base.astro`.

---

## 4. Sitemap Audit (73/100)

### 4.1 Discovery

| Endpoint | Status |
|----------|--------|
| `/robots.txt` -> sitemap reference | PASS |
| `/sitemap-index.xml` | PASS |
| `/sitemap-0.xml` (22 URLs) | PASS |

### 4.2 Format Validation

| Check | Result |
|-------|--------|
| Valid XML | PASS |
| Correct namespace | PASS |
| xhtml namespace (hreflang) | PASS |
| URL count | PASS (22, well under 50k) |
| `priority`/`changefreq` absent | PASS (deprecated tags not used) |
| `lastmod` present | FAIL -- missing on all URLs |

### 4.3 Hreflang Coverage (Critical Gap)

| Route Pair | Hreflang in Sitemap? |
|------------|---------------------|
| `/` <-> `/en/` | PASS |
| `/contact/` <-> `/en/contact/` | PASS |
| `/despre/` <-> `/en/about/` | FAIL |
| `/portofoliu/` <-> `/en/portfolio/` | FAIL |
| `/pret/` <-> `/en/pricing/` | FAIL |
| `/servicii/` <-> `/en/services/` | FAIL |
| `/servicii/website/` <-> `/en/services/website/` | FAIL |
| `/servicii/aplicatii-web/` <-> `/en/services/web-apps/` | FAIL |
| `/servicii/seo/` <-> `/en/services/seo/` | FAIL |
| `/servicii/accesibilitate/` <-> `/en/services/accessibility/` | FAIL |
| `/servicii/implementare-agenti/` <-> `/en/services/ai-agents/` | FAIL |

**Root cause:** `@astrojs/sitemap` auto-matching fails for translated slugs where path segments differ.

**Mitigating factor:** HTML `<head>` on every page includes correct hreflang `<link>` tags via `astro-seo`. Google reads both sources.

### 4.4 Page Coverage

- Orphan pages: NONE
- Extra pages in sitemap: NONE
- Correctly excluded: `404.astro`, `api/contact.ts`
- 100% coverage of content pages

---

## 5. Performance Audit (68/100)

### 5.1 Core Web Vitals Estimates

| Metric | Mobile | Desktop | Threshold | Status |
|--------|--------|---------|-----------|--------|
| LCP | 2.5-3.5s | 1.5-2.5s | <= 2.5s | NEEDS IMPROVEMENT |
| INP | < 150ms | < 100ms | <= 200ms | GOOD |
| CLS | < 0.05 | < 0.03 | <= 0.1 | GOOD |
| TTFB | < 100ms | < 50ms | < 200ms | GOOD |

### 5.2 LCP Bottlenecks

**Preloader (1.6-3.5s delay):**
The preloader at `Base.astro:64-84` covers the viewport with `position: fixed; inset: 0; z-index: 99999` and hides only after `window.load + 1600ms` (hard fallback at 3500ms). This alone pushes LCP into "Needs Improvement".

Fix options:
- Remove entirely (site is static, loads fast)
- Reduce delay to 200-300ms
- Use CSS-only fade without JS timing

**Google Fonts @import waterfall:**
`global.css:2` uses `@import url('https://fonts.googleapis.com/css2?...')` loading 3 families (Sora, Space Grotesk, Inter) with 12 weights total. This creates: HTML -> CSS -> Google Fonts CSS -> Font files.

Fix: Replace with `<link rel="preconnect">` + `<link rel="preload">` in `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&display=swap" />
```

Also subset to only weights actually used (currently loading 12, likely need 6-8).

### 5.3 JavaScript Bundle

| File | Size | Purpose |
|------|------|---------|
| GSAP core | 70KB | Animation engine |
| ScrollTrigger | 43KB | Scroll-based animations |
| Lenis | 17KB | Smooth scroll |
| Component scripts | ~4KB | Hero, Stats, Base init |
| **Total** | **~134KB** | (~45KB after Brotli) |

Loaded on every page via dynamic import. Consider lazy-loading only on pages that use `[data-animate]`.

### 5.4 Image Loading

All images are SVGs (1.9-3.5KB each). No raster images above the fold. Hero SVG correctly uses `fetchpriority="high"`. Below-fold images use `loading="lazy"`. Well-optimized.

### 5.5 Caching

No `Cache-Control` headers configured. Recommended:
- Static assets (`/_astro/*`): `public, max-age=31536000, immutable`
- HTML pages: `public, max-age=3600, s-maxage=86400`

---

## 6. GEO / AI Search Readiness Audit (45/100)

### 6.1 AI Crawler Access

| Crawler | Status |
|---------|--------|
| GPTBot (ChatGPT) | ALLOWED |
| OAI-SearchBot | ALLOWED |
| ClaudeBot | ALLOWED |
| PerplexityBot | ALLOWED |
| Google-Extended (AI Overviews) | ALLOWED |
| Bingbot (Copilot) | ALLOWED |
| CCBot (training only) | ALLOWED (risk) |

All AI search crawlers allowed (good). Training-only crawlers also unblocked (consider blocking).

### 6.2 llms.txt

**Status: MISSING.** No `llms.txt` file exists. For an agency selling AI services, this is a notable absence.

### 6.3 Citability (8/25)

- FAQ answers are 15-35 words -- far below the 134-167 word optimal range for AI citation
- Answers lack entity self-reference (don't mention "Isio" or "web agency" in the answer text)
- No source-attributed statistics
- First 40-60 words per section are labels/tags, not information-rich content
- No quotable unique data, research, or frameworks

### 6.4 Structural Readability (10/20)

- Good semantic HTML (section, nav, header, footer, ARIA attributes)
- Zero question-based headings -- all marketing-oriented ("Specialized services for your business" instead of "What services does Isio offer?")
- Content structured for rendering, not AI extraction

### 6.5 Multi-Modal Content (3/15)

- All images are decorative SVG illustrations
- No photographs, screenshots, infographics, or diagrams
- No video content
- Empty/minimal alt text on all images

### 6.6 Authority Signals (8/20)

- Entity name inconsistent: "ISIO" (schema) vs "Isio" (titles/logo)
- No FAQPage schema despite FAQ content existing
- No external brand presence (YouTube, Wikipedia, Reddit)
- Broken social links (`href="#"`)
- No `datePublished` or `dateModified` anywhere

### 6.7 Platform-Specific Scores

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 25/100 | No FAQ schema, no question headings, thin content |
| ChatGPT Web Search | 20/100 | No llms.txt, no self-contained answer blocks |
| Perplexity | 22/100 | No verifiable data, unsubstantiated claims |
| Bing Copilot | 28/100 | Missing BreadcrumbList, no reviews |

### 6.8 Key GEO Fixes

1. **Add FAQPage schema** and expand each answer to 134-167 words with entity mentions
2. **Create llms.txt** with structured agency description, services, pricing
3. **Convert headings to question format** ("What services does Isio offer?")
4. **Fix stats counters** to show real values in HTML (crawlers see "0+")
5. **Block training-only crawlers** (CCBot, anthropic-ai, cohere-ai)
6. **Start publishing blog content** with question-based H2s and source-cited data

---

## Key Files Referenced

| File | Relevance |
|------|-----------|
| `src/layouts/Base.astro` | Head tags, SEO, preloader, font loading |
| `src/layouts/Page.astro` | Prop-passing bug (drops pageType/serviceName) |
| `src/components/seo/JsonLd.astro` | All structured data schemas |
| `src/styles/global.css` | Render-blocking font @import |
| `src/components/home/FAQ.astro` | FAQ without FAQPage schema |
| `src/components/home/Stats.astro` | Counter values invisible to crawlers |
| `src/components/home/BlogPreview.astro` | Fake blog posts |
| `src/components/home/ContactInline.astro` | Placeholder social links |
| `src/components/home/Partners.astro` | Misleading "partners" label |
| `src/components/layout/Footer.astro` | Missing privacy policy link target |
| `src/components/layout/Header.astro` | Unreferenced Manrope font |
| `astro.config.mjs` | Sitemap i18n config |
| `public/robots.txt` | No AI crawler directives |
| `wrangler.toml` | No security headers or caching config |
| `src/content/services/*.json` | Thin meta descriptions |
