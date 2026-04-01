---
phase: 06-schema-structured-data
verified: 2026-04-01T22:20:00Z
status: passed
score: 7/7 must-haves verified
re_verification: false
---

# Phase 6: Schema & Structured Data Verification Report

**Phase Goal:** Fix the schema prop-passing bug and rewrite JsonLd.astro with @graph pattern to enable all structured data types.
**Verified:** 2026-04-01T22:20:00Z
**Status:** PASSED
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Page.astro accepts and forwards pageType and serviceName props to Base.astro | VERIFIED | Props in interface (line 14-15), destructured (line 18), forwarded to Base (line 20) |
| 2 | JsonLd.astro outputs a single script tag with @graph containing all schema entities | VERIFIED | Single `@context` (count=1), single `<script type="application/ld+json">` tag (count=1), `@graph` array assembles all entities (line 200) |
| 3 | ProfessionalService schema includes email, sameAs, founder, foundingDate, and raster logo | VERIFIED | Built HTML contains `"email":"contact@isio.ro"`, `"sameAs":["https://www.linkedin.com/in/silviu-paduraru/"]`, `"founder":{"@id":"https://isio.ro/#founder"}`, `"foundingDate":"2025"`, `"url":"https://isio.ro/og.png"` |
| 4 | BreadcrumbList schema generates on all inner pages | VERIFIED | Present in dist/client/despre/index.html, dist/client/servicii/website/index.html, dist/client/contact/index.html, dist/client/en/about/index.html. Absent on homepage (count=0) -- correct exclusion. |
| 5 | FAQPage schema renders on homepage with all 4 Q&A pairs | VERIFIED | Present in dist/client/index.html and dist/client/en/index.html. Contains 4 Question objects with acceptedAnswer. Not present on other pages. |
| 6 | Person schema renders on about pages with founder details | VERIFIED | `"Person"` found in dist/client/despre/index.html and dist/client/en/about/index.html with name "Silviu Paduraru" and jobTitle |
| 7 | Service schema renders on service pages with provider @id reference | VERIFIED | `"Service"` found in dist/client/servicii/website/index.html and dist/client/en/services/website/index.html with `"provider":{"@id":"https://isio.ro/#organization"}` |

**Score:** 7/7 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/layouts/Page.astro` | Prop forwarding for pageType, serviceName | VERIFIED | Interface has both props, destructured, forwarded to Base.astro |
| `src/components/seo/JsonLd.astro` | Complete @graph-based structured data | VERIFIED | 202 lines, @graph with 6 entity types, @id cross-references |
| `src/layouts/Base.astro` | Passes title, roSlug, enSlug to JsonLd | VERIFIED | Line 60: `<JsonLd locale={locale} pageType={pageType} serviceName={serviceName} title={title} roSlug={roSlug} enSlug={enSlug} />` |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| Page.astro | Base.astro | pageType and serviceName prop forwarding | WIRED | Line 20 forwards both props explicitly |
| Base.astro | JsonLd.astro | title, roSlug, enSlug, pageType, serviceName props | WIRED | Line 60 passes all 6 props |
| JsonLd.astro | schema @graph output | single script type=application/ld+json | WIRED | Line 202: single script tag with JSON.stringify(jsonLd) |
| Service pages (10) | Page.astro | pageType="service" serviceName={serviceLabel} | WIRED | All 10 RO+EN service pages pass both props |
| About pages (2) | Page.astro | pageType="about" | WIRED | despre.astro and en/about.astro both pass pageType="about" |
| All other pages | Page.astro | correct pageType | WIRED | Portfolio (portfolio), pricing (pricing), contact (contact), services-index (default) -- all 20 pages have pageType |

### Data-Flow Trace (Level 4)

Not applicable -- JsonLd.astro generates structured data from props and constants, not from external data sources. All data is static/build-time. The prop chain (Page -> Base -> JsonLd) is verified wired via key links above.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build completes without errors | `npm run build` | Exit code 0, "Complete!" | PASS |
| @graph on homepage HTML | `grep "@graph" dist/client/index.html` | 1 match | PASS |
| FAQPage on homepage HTML | `grep "FAQPage" dist/client/index.html` | 1 match | PASS |
| BreadcrumbList on inner page | `grep "BreadcrumbList" dist/client/despre/index.html` | 1 match | PASS |
| Service schema on service page | `grep "Service" dist/client/servicii/website/index.html` | 1 match | PASS |
| Person on about page | `grep "Person" dist/client/despre/index.html` | 1 match | PASS |
| email in ProfessionalService | `grep "contact@isio.ro" dist/client/index.html` | 1 match | PASS |
| Raster logo (og.png) | `grep "og.png" dist/client/index.html` | 4 matches (logo url, contentUrl, OG tags) | PASS |
| No SVG logo in schema | `grep "favicon.svg" src/components/seo/JsonLd.astro` | 0 matches | PASS |
| No BreadcrumbList on homepage | `grep -c "BreadcrumbList" dist/client/index.html` | 0 | PASS |
| FAQPage on EN homepage too | `grep -c "FAQPage" dist/client/en/index.html` | 1 | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| SCHEMA-01-prop-fix | 06-01, 06-02 | Page.astro accepts pageType and serviceName props | SATISFIED | Page.astro interface fixed, all 20 pages pass props |
| SCHEMA-02-graph-rewrite | 06-01 | Rewrite JsonLd.astro with @graph pattern | SATISFIED | Single @context, @graph with @id linking |
| SCHEMA-03-breadcrumb | 06-01, 06-02 | BreadcrumbList present on all inner pages | SATISFIED | Verified in built HTML for about, service, contact pages |
| SCHEMA-04-faqpage | 06-01 | FAQPage schema present on homepage | SATISFIED | 4 Q&A pairs in built HTML for RO and EN homepages |
| SCHEMA-05-person | 06-01 | Person schema present on about page | SATISFIED | Person with founder details in about page HTML |
| SCHEMA-06-professional-service | 06-01 | ProfessionalService has email, sameAs, founder, foundingDate | SATISFIED | All fields verified in built HTML output |
| SCHEMA-07-logo-fix | 06-01 | Logo references /og.png (raster) | SATISFIED | og.png in schema, no favicon.svg in JsonLd.astro |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| (none) | - | - | - | No anti-patterns detected |

No TODO, FIXME, PLACEHOLDER, or stub patterns found in any of the three core modified files.

### Human Verification Required

### 1. Schema Validation via Google Rich Results Test

**Test:** Paste https://isio.ro/ into Google Rich Results Test and validate structured data
**Expected:** All schema types recognized, no errors, FAQ rich results eligible
**Why human:** Requires running Google's external validator against the live site

### 2. Service Schema serviceName Values

**Test:** View page source on each service page and verify serviceName is a clean label (e.g., "Dezvoltare Web") not including " -- Isio" suffix
**Expected:** Service schema `name` field shows only the service name
**Why human:** Need to visually inspect the exact string value in context

### Gaps Summary

No gaps found. All 7 observable truths verified against actual codebase and built HTML output. The prop-passing chain is fully wired from page files through Page.astro -> Base.astro -> JsonLd.astro. All schema types render correctly in their expected contexts: ProfessionalService (all pages), WebSite (all pages), Person (all pages via @graph), BreadcrumbList (inner pages only), FAQPage (homepage only), Service (service pages only).

---

_Verified: 2026-04-01T22:20:00Z_
_Verifier: Claude (gsd-verifier)_
