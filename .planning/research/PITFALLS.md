# Pitfalls Research

**Domain:** Bilingual SSG agency platform (solo developer) with CMS admin, tiered pricing, document generation, and calendar booking
**Researched:** 2026-03-21
**Confidence:** HIGH (critical pitfalls); MEDIUM (integration specifics)

---

## Critical Pitfalls

### Pitfall 1: i18n Routing Breaks Silently in SSG Mode

**What goes wrong:**
Astro's i18n fallback mechanism does not auto-generate fallback pages in SSG (static output) mode. If a page exists in English but is missing its Romanian equivalent, the build succeeds without errors — but the live site returns a 404 for Romanian visitors. This also affects hreflang tags: if pages are missing per-locale, hreflang declarations become incorrect, which is worse for SEO than having none at all (Google can penalize for conflicting signals).

**Why it happens:**
Developers configure i18n fallback assuming it works the same in SSG as in SSR. The Astro docs note the difference, but it's easy to miss. The build never fails — it simply skips. This means QA only catches it if someone manually checks every locale for every page.

**How to avoid:**
- Generate all locale variants of every page from the start, even if the content is identical initially.
- Use `getStaticPaths` with all locale variants explicitly enumerated.
- Add hreflang tags via a layout component that reads all locales automatically — never hardcode them.
- Integrate `@astrojs/sitemap` with `i18n` config so the sitemap reflects all locale URLs.
- Add a post-build audit script that checks for missing locale pages before deployment.

**Warning signs:**
- Romanian URLs returning 404 that don't trigger build failures
- Sitemap only listing English URLs
- Google Search Console showing "Missing hreflang return tag" errors
- Language switcher redirecting to homepage instead of the equivalent page

**Phase to address:** Phase 1 (Foundation / Site Architecture) — establish the bilingual routing pattern before any content is added.

---

### Pitfall 2: Stale CMS Content on Static Site (Webhook Failure)

**What goes wrong:**
Astro + Sanity (or any headless CMS) in SSG mode fetches content at build time. After deploy, the live site is frozen. If a CMS webhook fails to trigger a rebuild — due to network error, misconfiguration, or CMS downtime — the public site shows outdated pricing, old portfolio items, or incorrect service descriptions indefinitely. There is no visual error; the site simply serves stale data.

**Why it happens:**
Webhook-based rebuild pipelines have no built-in retry or failure alerting. A single webhook delivery failure means the CI/CD pipeline never runs. Solo developers rarely monitor webhook logs proactively. Additionally, Sanity's `useCdn: true` (the default) must be changed to `false` for static builds — if left at default, API responses may be cached differently, adding another layer of staleness.

**How to avoid:**
- Set `useCdn: false` in the Sanity client config for build-time fetching.
- Configure webhooks in Sanity Studio to trigger Netlify/Vercel deploy hooks on content publish.
- Set up webhook delivery monitoring (Sanity shows delivery logs in the dashboard — check them).
- For pricing and availability data specifically, consider Astro's on-demand rendering (SSR islands) as a fallback so critical data is always fresh.
- Set a scheduled daily rebuild as a safety net (cron-based deploy hook) to cap maximum staleness at 24 hours.

**Warning signs:**
- Price changes in Sanity not reflected on the live site after 10+ minutes
- Portfolio grid not updating after adding a new project
- Build pipeline logs showing no runs despite CMS edits

**Phase to address:** Phase 1 (Infrastructure Setup) — webhook pipeline must be set up before any CMS-driven content is live.

---

### Pitfall 3: Google Calendar OAuth Refresh Token Expiry in Production

**What goes wrong:**
The booking form submits to a serverless function that creates Google Calendar events via the Calendar API. In testing, this works fine. In production, the OAuth refresh token silently expires — causing all booking submissions to fail with a 401 error. The client sees a form submission "success" screen (if error handling is poor) or a generic error. No calendar events are created, and no notifications are sent.

**Why it happens:**
Two compounding issues: (1) OAuth consent screens left in "Testing" mode cause refresh tokens to expire every 7 days. (2) Refresh tokens not used for 6 months expire permanently. (3) Google imposes a per-client-user limit on refresh tokens; exceeding it revokes older tokens. Solo developers often set this up once and forget it, only discovering the breakage when a client reports their booking was never acknowledged.

**How to avoid:**
- Publish the OAuth consent screen to "In production" status in Google Cloud Console before launch — this is a non-optional step.
- Store the refresh token in a secure, persistent secret (Netlify environment variables, Vercel secrets) — never in session or local storage.
- Implement Google Calendar API error handling that sends an email alert to the admin on any 401/403 response.
- Add a health-check endpoint or scheduled function that pings the Calendar API daily to verify token validity.
- As a simpler alternative, use Calendly's free tier with an embed — it handles all OAuth complexity internally and requires zero maintenance.

**Warning signs:**
- Booking form submissions not appearing in Google Calendar
- Error logs showing `invalid_grant` or `Token has been expired` from Google API
- OAuth consent screen still showing "Testing" label
- No calendar events for a period despite form submissions

**Phase to address:** Phase with booking form implementation — treat token persistence and error alerting as launch-blockers, not nice-to-haves.

---

### Pitfall 4: Bilingual Document Generation Font/Encoding Failures

**What goes wrong:**
PDF proposals, contracts, and invoices are generated server-side. Romanian uses diacritics (ă, â, î, ș, ț). If the PDF generation library is initialized with a standard Latin font (most defaults), these characters render as question marks, empty boxes, or are silently dropped. The document looks correct in HTML preview but is broken in PDF output. Sending a client a contract with garbled characters is a serious trust failure for an agency that sells professional services.

**Why it happens:**
Most PDF libraries (jsPDF, pdfmake, Puppeteer with system fonts) default to fonts that cover only basic Latin (ISO-8859-1) or ASCII. Developers test in English, forget to test Romanian locale output, and the bug ships to production. Romanian diacritics are distinct from general Latin-extended — ș (with comma below) is different from ş (cedilla) and may render inconsistently across libraries.

**How to avoid:**
- Use Puppeteer/headless Chrome for PDF generation — it renders HTML/CSS with full system font support and handles Unicode natively. The output is pixel-perfect and requires no font embedding configuration.
- If using a library like PDFKit or pdfmake, explicitly embed a Noto Sans font family (covers all Romanian diacritics and extended Latin).
- Generate a test PDF for both locales during CI — assert that diacritic characters are present in the output text.
- Enforce UTF-8 throughout the document generation pipeline (template → renderer → output).
- Test both ș/ț (comma-below variants) and ş/ţ (cedilla variants) — they are visually similar but technically different characters.

**Warning signs:**
- Romanian PDF output containing `?`, `□`, or ASCII substitutions for ă/â/î/ș/ț
- PDF renders correctly in browser but incorrectly when downloaded
- Testing only English documents during development
- Library documentation listing only "Latin" font support

**Phase to address:** Document Generation phase — validate bilingual PDF output as a hard acceptance criterion before considering the feature complete.

---

### Pitfall 5: Plugin-First Approach Locking the Platform to Unmaintained Dependencies

**What goes wrong:**
The plugin-first philosophy is correct for a solo developer, but choosing the wrong plugins creates a different problem: a dependency on a library that stops being maintained, introduces breaking API changes, or conflicts with Astro version upgrades. This is particularly acute for niche integrations: Astro i18n plugins, headless CMS adapters, and calendar sync libraries all move fast. A major version upgrade of Astro (e.g., v4 to v5) broke many third-party integrations.

**Why it happens:**
Solo developers evaluate plugins at build time, not over a 2-year maintenance horizon. Small ecosystem plugins (e.g., `astro-i18next`) may have one maintainer and no organizational backing. The more third-party plugins in the dependency tree, the higher the probability of a breaking upgrade cascading across the site.

**How to avoid:**
- Prefer official integrations from framework teams (Astro's own `@astrojs/*` packages, Sanity's official `sanity-astro`) over community-maintained alternatives.
- For i18n, use Astro's built-in i18n routing (added in Astro 3.x) rather than third-party plugins — it is now stable and maintained by the core team.
- Cap dependencies: each external plugin is a liability. Prefer "fewer, well-supported" over "many, convenient."
- Check npm download trends and GitHub last-commit dates before adopting a plugin.
- Pin major versions in `package.json` and upgrade deliberately.

**Warning signs:**
- Plugin last commit is more than 6 months ago
- Plugin has open issues mentioning the Astro version you're using
- Plugin README references Astro v1 or v2 patterns while you're on v4+
- Plugin has fewer than 5k weekly npm downloads (low community backing)

**Phase to address:** Phase 1 (Foundation) and any phase adding new integrations — vet every plugin before adoption.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding strings in components instead of i18n translation keys | Faster to write | Every string must be hunted down and replaced when Romanian translation is added; often some are missed | Never — i18n scaffold must be in from day 1 |
| Using a single Markdown/MDX file with mixed RO/EN content | Simpler file structure | Cannot independently translate, SEO hreflang breaks, content editors confused | Never for public content |
| Skipping webhook error monitoring | Saves setup time | CMS content silently goes stale; no awareness until a client notices | Never for a business site |
| Generating PDFs client-side (browser Print dialog) | Zero backend needed | No control over fonts, layout breaks on mobile, can't automate sending | MVP prototype only — replace before launch |
| Embedding Google Calendar iframe instead of API integration | Zero code, works immediately | No control over timezone UX, no form validation, no booking data captured in CMS | Acceptable for v1 if Calendly integration is used instead |
| Using Sanity free tier without GROQ projections | Easier queries | Over-fetches data, increases bandwidth, can hit API rate limits | Acceptable in dev, must optimize before launch |
| Storing OAuth tokens in environment variables without rotation plan | Simple | Token expiry causes silent failures; no recovery path | Acceptable only with health-check monitoring in place |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google Calendar API | Leaving OAuth consent screen in "Testing" mode — tokens expire every 7 days | Publish to "In production" before any real booking goes live |
| Google Calendar API | Not storing the refresh token persistently | Store in server-side secrets (Netlify env vars, Vercel env secrets); never client-side |
| Sanity CMS | `useCdn: true` in static build config | Set `useCdn: false` for all build-time queries in Astro SSG context |
| Sanity webhooks | Webhook delivers once with no retry | Enable webhook delivery logs in Sanity dashboard; add backup scheduled rebuild |
| Astro i18n | Using `getRelativeLocaleUrl` for language switcher — redirects to root on the same page | Build a custom `localePath()` utility that maps current slug to the target locale slug |
| PDF generation | System font fallback for Romanian diacritics | Embed Noto Sans explicitly or use Puppeteer (renders with full OS font stack) |
| Astro + Sanity | Querying without `perspective: 'published'` in GROQ | Draft documents leak into the build — always filter by published status |
| Google Calendar API | Rate limit (10 requests/second per user) not handled | Implement exponential backoff; for bulk operations, batch API calls |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Fetching all Sanity content at build time without field projection | Build gets slower as portfolio and service count grows | Use GROQ field projections to fetch only the fields each page needs | At ~50+ documents, build time noticeably degrades |
| Unoptimized portfolio images served from CMS CDN | Good Lighthouse score locally, poor on mobile networks | Use Astro's built-in `<Image>` component with `@astrojs/image`; serve WebP with size constraints | Immediately for mobile users on slow connections |
| Rebuilding entire static site on every CMS change | Acceptable for small sites; becomes a CI/CD bottleneck | Use Netlify/Vercel's on-demand ISR or targeted page invalidation for CMS-driven pages | When rebuild exceeds 3-4 minutes — blocks content updates |
| Inline SVG icons duplicated per component | Invisible in dev; bloats HTML | Use a sprite sheet or icon component library | At 20+ icon usages, HTML payload grows significantly |
| Document template rendering all locales in one serverless function call | Single call works; under load, times out | Cache rendered document templates; separate RO/EN rendering paths | At concurrent document generation requests (low threshold for a serverless function) |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing Sanity write token in client-side code or `.env` committed to version control | Attacker can write/delete all CMS content | Use read-only tokens for public API calls; keep write tokens in server-side secrets only; add `.env` to `.gitignore` immediately |
| Admin panel accessible without rate limiting on login attempts | Brute-force attack on the single admin account compromises the entire business | Use CMS-provided auth (Sanity Studio has its own auth); for custom admin routes, add rate limiting middleware |
| Booking form with no server-side validation | Spam calendar entries; potential injection into document templates | Validate all booking fields server-side before creating Calendar events; use a CAPTCHA (Turnstile is free and Astro-compatible) |
| Google Calendar OAuth credentials stored in a `.env` file that's committed | Credentials exposed in version control | `.env` must be in `.gitignore` from day 1; use platform secret management for production |
| PDF document generation endpoint without authentication | Unauthenticated users can trigger server-side PDF rendering — denial of service | Protect the document generation API behind the admin auth token; never expose it publicly |
| Single shared admin password with no 2FA | One leaked credential = full platform compromise | Use Sanity Studio auth (supports SSO/Google login); enable 2FA on the Google account used for Calendar API |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Pricing tiers with more than 4-5 feature differentiators listed | Decision fatigue; visitors abandon without converting | Show only the 3-5 most meaningful differences between tiers; hide minor variations in an expandable "full comparison" |
| Language switcher that redirects to homepage instead of the equivalent page | Frustrating for bilingual users who switch mid-session | Map each page slug to its equivalent locale slug; preserve query params and scroll position on switch |
| Discovery call booking form that asks for budget/scope before showing availability | High abandonment rate; feels like a sales trap | Show calendar availability first; collect budget/scope as optional context after a slot is selected |
| Mobile navigation that hides the CTA ("Book a Call") behind a hamburger menu | Most clients discover the agency on mobile; hidden CTA means fewer bookings | Pin the primary CTA in the mobile header; do not hide it in the nav |
| Portfolio showcasing technology choices rather than client outcomes | Developers care about tech; clients care about results | Lead with the problem solved and business outcome; put the tech stack in a secondary detail section |
| Pricing that requires "Contact us for pricing" for any tier | 75% of B2B buyers self-serve and leave if pricing is hidden | Show all three tiers with real numbers; use "Starting from" if ranges are needed |
| Generic 404 page that provides no recovery path | Visitors reaching a broken link leave immediately | Bilingual 404 page with link back to services, language selector, and contact form |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Bilingual routing:** English pages live and styled — verify every page has a Romanian equivalent at `/ro/[slug]` with translated meta title and description
- [ ] **Hreflang tags:** Site is live — verify hreflang alternates appear in HTML `<head>` for every page, pointing to both `/en/` and `/ro/` variants
- [ ] **Sitemap:** Build output contains `sitemap.xml` — verify it lists both locale variants of every URL, not just the default locale
- [ ] **Booking form:** Form submits successfully in dev — verify Calendar event appears in the correct Google Calendar in production with the correct timezone
- [ ] **OAuth tokens:** Calendar integration works on first deploy — verify it still works 8 days later (tests the 7-day testing-mode token expiry)
- [ ] **PDF documents:** Invoice generates in English — verify the same template generates correctly in Romanian with diacritics intact (ă â î ș ț)
- [ ] **CMS webhook:** Content publishes in Sanity — verify the live site reflects the change within 5 minutes without a manual redeploy
- [ ] **Tiered pricing:** Prices display on the public site — verify they are editable from the CMS without a code change or redeploy
- [ ] **Mobile design:** Looks correct on desktop — verify the primary CTA and language switcher are accessible without scrolling on 375px viewport
- [ ] **Lighthouse scores:** Site passes Lighthouse in dev — verify scores are maintained with real CMS content (images from Sanity CDN, not local placeholders)
- [ ] **Admin auth:** Sanity Studio is accessible — verify it requires authentication and is not publicly indexable (add `noindex` to Studio routes)

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| i18n routing breaks with missing locale pages | MEDIUM | Audit all pages with a build-time script; generate stubs for missing locales; resubmit sitemap to Google Search Console |
| Stale CMS content on live site | LOW | Manually trigger a rebuild from Netlify/Vercel dashboard; investigate webhook logs to find the delivery failure; fix the webhook config |
| Google Calendar OAuth token expired | LOW-MEDIUM | Re-authorize via OAuth flow to get a new refresh token; store in secrets; publish OAuth consent screen to production immediately |
| PDF diacritic rendering failure | MEDIUM | Switch to Puppeteer-based PDF rendering; test all templates in both locales; resend corrected documents to affected clients |
| Unmaintained plugin blocks Astro upgrade | HIGH | Fork the plugin as an internal package; or reimplement the functionality using Astro's built-in APIs; or pin Astro version until a replacement is found |
| Admin authentication compromised | HIGH | Revoke all Sanity API tokens immediately from Sanity dashboard; rotate Google Calendar OAuth credentials; audit CMS content for unauthorized changes |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| i18n routing silently missing locale pages | Phase 1 — Foundation | Post-build check confirms all pages exist in both `/en/` and `/ro/` before deployment |
| Stale CMS content (webhook failure) | Phase 1 — Infrastructure | Webhook → deploy hook pipeline tested end-to-end; scheduled daily rebuild as fallback |
| Google Calendar OAuth token expiry | Booking phase | OAuth consent screen published to production; health-check function validates token weekly |
| Bilingual PDF diacritic rendering failure | Document generation phase | CI generates test PDFs for both locales; Romanian diacritics asserted in output |
| Plugin dependency becoming unmaintained | Phase 1 + every integration phase | Only official/well-supported plugins adopted; each plugin vetted for maintenance health |
| Pricing data stale or requiring code change | CMS/Pricing phase | Price edits in Sanity Studio propagate to live site within 5 minutes via webhook |
| UX: language switcher redirecting to homepage | Phase 1 — i18n routing | Manual QA: switch language from every page type; verify landing on equivalent page |
| Admin credentials exposed or compromised | Phase 1 — Infrastructure | `.env` in `.gitignore`; no write tokens in client-side code; 2FA on Google account |
| Portfolio images degrading Lighthouse scores | Design/Portfolio phase | Lighthouse CI run on production URL with real Sanity-hosted images; LCP < 2.5s |
| Document generation endpoint publicly accessible | Document generation phase | Endpoint returns 401 without admin token; not linked from any public page |

---

## Sources

- Astro i18n documentation and known SSG fallback limitation: https://docs.astro.build/en/guides/internationalization/
- Astro GitHub issue — i18n fallback in SSG mode: https://github.com/withastro/astro/issues/10957
- Astro i18n best practices and pitfalls: https://borjagomez.eus/blog/i18n-with-astro/
- Sanity + Astro integration guide (`useCdn: false` for static builds): https://docs.astro.build/en/guides/cms/sanity/
- Astro live content collections (Astro 5.10+): https://astro.build/blog/live-content-collections-deep-dive/
- Google Calendar API OAuth — testing mode token expiry (7 days): https://developers.google.com/identity/protocols/oauth2/web-server
- Google Calendar API error handling: https://developers.google.com/workspace/calendar/api/guides/errors
- Multi-language PDF generation — font and encoding pitfalls: https://reportgen.io/blog/multi-language-pdf-generation
- Bad pricing page UX and decision fatigue research: https://www.getmonetizely.com/articles/bad-pricing-page-ux-how-confusing-layouts-kill-conversions
- Headless CMS security best practices: https://strapi.io/blog/headless-cms-security
- Freelance developer common mistakes: https://londonwebnerd.co.uk/blog/5-mistakes-every-freelance-developer-should-avoid/
- Agency portfolio trust and conversion: https://fueler.io/blog/portfolio-mistakes-to-avoid

---
*Pitfalls research for: Isio — bilingual SSG agency platform (solo developer)*
*Researched: 2026-03-21*
