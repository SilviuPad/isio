# Roadmap: Isio

## Milestones

- ✅ **v1.0 MVP** — Phases 1-4 (shipped 2026-03-22)
- 🔄 **v1.1 SEO Fixes** — Phases 5-11

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-4) — SHIPPED 2026-03-22</summary>

- [x] Phase 1: Foundation (4/4 plans) — completed 2026-03-21
- [x] Phase 2: Public Site (5/5 plans) — completed 2026-03-22
- [x] Phase 3: Booking + Contact (2/2 plans) — completed 2026-03-22
- [x] Phase 4: Document Generation (4/4 plans) — completed 2026-03-22

</details>

### v1.1 SEO Fixes

#### Phase 5: Performance & Security
**Goal:** Fix LCP bottlenecks and add missing security headers to push CWV into "Good" range and close critical security gaps.
**Requirements:**
- Remove or shorten preloader to under 300ms (audit #5)
- Replace Google Fonts @import with preconnect + stylesheet links (audit #6)
- Remove unreferenced Manrope font from Header (audit #37)
- Add security headers via public/_headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (audit #1)
- Add Cache-Control headers for static assets and HTML pages (audit #5.5)
**Success Criteria:**
- [ ] No @import in global.css for fonts
- [ ] Preloader delay under 300ms or removed entirely
- [ ] _headers file exists with all 6 security headers
- [ ] Cache-Control headers configured for /_astro/* and HTML
**Plans:** 1 plan
Plans:
- [x] 05-01-PLAN.md — Fix font loading, remove preloader, add security/cache headers

#### Phase 6: Schema & Structured Data Overhaul
**Goal:** Fix the schema prop-passing bug and rewrite JsonLd.astro with @graph pattern to enable all structured data types.
**Requirements:**
- Fix Page.astro to accept and forward pageType/serviceName props to Base.astro (audit #4)
- Rewrite JsonLd.astro using @graph with @id-based entity linking (audit #3.4)
- Add BreadcrumbList schema on all inner pages (audit #7)
- Add FAQPage schema on homepage from existing FAQ content (audit #8)
- Add Person schema for founder on about page (audit #29)
- Complete ProfessionalService schema: email, sameAs, founder, foundingDate (audit #28)
- Fix logo from SVG to raster PNG reference (audit #10)
**Success Criteria:**
- [ ] Page.astro accepts pageType and serviceName props
- [ ] Service pages render Service schema in HTML output
- [ ] BreadcrumbList present on all inner pages
- [ ] FAQPage schema present on homepage
- [ ] Person schema present on about page
- [ ] ProfessionalService has email, sameAs, founder fields
- [ ] Logo references /og.png (raster)
**Plans:** 2 plans
Plans:
- [x] 06-01-PLAN.md — Fix prop-passing bug and rewrite JsonLd.astro with @graph pattern
- [x] 06-02-PLAN.md — Update all page files with pageType/serviceName and verify build output

#### Phase 7: Content Cleanup & Trust Signals
**Goal:** Remove fake/misleading content and fix trust-damaging elements that hurt E-E-A-T scores.
**Requirements:**
- Remove fake blog posts section from homepage (audit #2)
- Fix stats counters to render real values in HTML, animate visually only (audit #23)
- Fix "50+ projects" to match actual portfolio count (audit #13)
- Rename "Partners & Technologies" to "Technologies We Use" or similar (audit #20)
- Fix placeholder social links in footer (remove or link to real profiles) (audit #21)
- Fix entity name inconsistency — standardize to "Isio" everywhere (audit #27)
- Create OG image at public/og.png for social sharing (audit #11)
- Add legal entity info to footer: city, founding year (audit #31)
**Success Criteria:**
- [ ] No BlogPreview component rendered on homepage
- [ ] Stats counters show real numbers in HTML source
- [ ] "50+ projects" claim removed or corrected
- [ ] Partners section renamed accurately
- [ ] No href="#" social links in footer
- [ ] Entity name consistent as "Isio" across all files
- [ ] /og.png exists and is referenced in meta tags
- [ ] Footer shows city and founding year

#### Phase 8: Sitemap & Internationalization
**Goal:** Fix sitemap hreflang coverage and resolve i18n inconsistencies for proper multi-language indexing.
**Requirements:**
- Configure @astrojs/sitemap with explicit i18n route pair mappings for all 11 pairs (audit #9)
- Add lastmod dates to sitemap URLs (audit #22)
- Fix hreflang subtag inconsistency: use consistent codes across sitemap and HTML (audit #25)
- Add x-default hreflang pointing to Romanian version (audit #33)
- Make 404 page language-aware (detect locale from URL) (audit #32)
**Success Criteria:**
- [ ] All 11 route pairs have hreflang in sitemap
- [ ] lastmod present on all sitemap URLs
- [ ] Consistent hreflang subtags between sitemap and HTML head
- [ ] x-default hreflang present in sitemap
- [ ] 404 page renders in correct language based on URL path

#### Phase 9: SEO Meta & On-Page Optimization
**Goal:** Improve on-page SEO signals: titles, meta descriptions, heading structure, and homepage optimization.
**Requirements:**
- Improve homepage title from generic "Isio -- Agentie Web" to keyword-rich title (audit #16)
- Expand all service page meta descriptions from ~34 chars to 120-160 chars (audit #17)
- Add question-based H2 headings to homepage sections for AI citation (audit #24)
- Expand FAQ answers to 134-167 words each with entity self-references (audit #6.3)
**Success Criteria:**
- [ ] Homepage title contains primary keyword and value proposition
- [ ] All service meta descriptions are 120-160 characters
- [ ] At least 3 question-based H2 headings on homepage
- [ ] FAQ answers are 100+ words each with "Isio" mentioned

#### Phase 10: AI Search Readiness & Crawlers
**Goal:** Optimize for AI search engines (GEO) and implement IndexNow for faster indexing.
**Requirements:**
- Create public/llms.txt with structured agency description, services, pricing (audit #15)
- Implement IndexNow: API key file, robots.txt directive, build hook (audit #14)
- Block AI training-only crawlers in robots.txt: CCBot, anthropic-ai (audit #35)
- Create privacy policy page in both locales (audit #3) — GDPR requirement
**Success Criteria:**
- [ ] /llms.txt accessible and contains service descriptions
- [ ] IndexNow key file exists and robots.txt references it
- [ ] CCBot and anthropic-ai blocked in robots.txt
- [ ] Privacy policy pages exist at /politica-confidentialitate/ and /en/privacy-policy/

#### Phase 11: Content Expansion
**Goal:** Expand thin content pages to meet minimum word count thresholds for competitive SEO.
**Requirements:**
- Expand each of the 5 service pages from ~150-200 words to 800+ words with methodology, process details, and service-specific FAQ (audit #12)
- Expand about page from ~200 words to 500+ words with career timeline, methodology, credentials (audit #18)
- Expand service page content in both RO and EN locales
**Success Criteria:**
- [ ] Each service page has 800+ words of substantive content
- [ ] About page has 500+ words
- [ ] Content expanded in both Romanian and English versions

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 4/4 | Complete | 2026-03-21 |
| 2. Public Site | v1.0 | 5/5 | Complete | 2026-03-22 |
| 3. Booking + Contact | v1.0 | 2/2 | Complete | 2026-03-22 |
| 4. Document Generation | v1.0 | 4/4 | Complete | 2026-03-22 |
| 5. Performance & Security | v1.1 | 0/1 | Planned | |
| 6. Schema & Structured Data | v1.1 | 0/2 | Planned | |
| 7. Content Cleanup & Trust | v1.1 | 0/? | Not Started | |
| 8. Sitemap & i18n | v1.1 | 0/? | Not Started | |
| 9. SEO Meta & On-Page | v1.1 | 0/? | Not Started | |
| 10. AI Search Readiness | v1.1 | 0/? | Not Started | |
| 11. Content Expansion | v1.1 | 0/? | Not Started | |
