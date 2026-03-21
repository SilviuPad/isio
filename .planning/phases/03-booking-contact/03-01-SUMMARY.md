---
phase: 03-booking-contact
plan: 01
subsystem: api
tags: [resend, cloudflare-turnstile, astro-api-route, contact-form, cloudflare-workers]

# Dependency graph
requires:
  - phase: 02-public-site
    provides: "Contact page HTML structure (both locales), ContactInline component, glassmorphism design system"
  - phase: 01-foundation
    provides: "Cloudflare Workers adapter, wrangler.toml config, i18n utils, Astro server output mode"
provides:
  - "POST /api/contact SSR endpoint on Cloudflare Workers with field validation, Turnstile verification, and Resend email delivery"
  - "RO contact page with wired fetch submission, Turnstile invisible widget, and success/error UI states"
  - "EN contact page with wired fetch submission, Turnstile invisible widget, and success/error UI states"
  - "Homepage ContactInline.astro wired to same /api/contact endpoint"
affects: [03-02-booking, any-phase-touching-contact-forms]

# Tech tracking
tech-stack:
  added: [resend@^4.x]
  patterns:
    - "Astro SSR API route with export const prerender = false alongside static pages"
    - "Cloudflare Turnstile invisible mode — server-side siteverify POST"
    - "is:inline client script for zero-bundle fetch form submission"
    - "import.meta.env for Wrangler secrets in Cloudflare Workers runtime"
    - "PUBLIC_ prefix for client-exposed env vars (PUBLIC_TURNSTILE_SITE_KEY)"

key-files:
  created:
    - src/pages/api/contact.ts
  modified:
    - src/pages/contact.astro
    - src/pages/en/contact.astro
    - src/components/home/ContactInline.astro
    - wrangler.toml
    - package.json

key-decisions:
  - "Resend SDK replyTo field (not reply_to) — corrected from API docs assumption"
  - "is:inline scripts used for form submission — avoids Astro bundler scope issues with DOM manipulation"
  - "PUBLIC_TURNSTILE_SITE_KEY via import.meta.env at build time — Astro exposes PUBLIC_ prefix vars to client"
  - "npm install --force used to bypass @cloudflare/workerd-windows-64 ARM64 platform mismatch (dev machine is ARM64, deploy target is x64)"

patterns-established:
  - "SSR API route pattern: export const prerender = false + async function POST({ request })"
  - "Form fetch pattern: is:inline script, data-locale attribute, status div with hidden class toggled"
  - "Turnstile pattern: cf-turnstile div + api.js script tag, token read from [name=cf-turnstile-response]"

requirements-completed: [INTR-02]

# Metrics
duration: 7min
completed: 2026-03-22
---

# Phase 3 Plan 01: Contact Form Backend Summary

**Cloudflare Workers SSR API route with Resend email notifications, Turnstile spam protection, and wired fetch submission on all three contact form instances**

## Performance

- **Duration:** ~7 min
- **Started:** 2026-03-21T23:14:35Z
- **Completed:** 2026-03-21T23:21:15Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- `POST /api/contact` endpoint validates fields, verifies Turnstile token against Cloudflare siteverify, and sends formatted HTML email via Resend with replyTo set to visitor email
- Both RO and EN contact pages now have Turnstile invisible widget, fetch submission, and inline success/error UI states — no page reload
- Homepage `ContactInline.astro` wired to the same endpoint with name attributes, subject field removed, and same Turnstile + fetch pattern
- wrangler.toml documents all four required secrets for deployment

## Task Commits

1. **Task 1: Create /api/contact SSR endpoint with Resend + Turnstile** - `1fd2464` (feat)
2. **Task 2: Wire contact forms with fetch, Turnstile, and success/error states** - `4dc51f8` (feat)

**Plan metadata:** [pending docs commit]

## Files Created/Modified
- `src/pages/api/contact.ts` - POST endpoint: field validation, Turnstile siteverify, Resend email delivery
- `src/pages/contact.astro` - RO contact page: Turnstile widget + fetch submission script + status div
- `src/pages/en/contact.astro` - EN contact page: Turnstile widget + fetch submission script + status div
- `src/components/home/ContactInline.astro` - Homepage form: name attrs, subject removed, Turnstile + fetch
- `wrangler.toml` - Documents RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_EMAIL, PUBLIC_TURNSTILE_SITE_KEY
- `package.json` / `package-lock.json` - Added resend dependency

## Decisions Made
- Used `replyTo` (not `reply_to`) — Resend SDK uses camelCase for this field; auto-fixed during Task 1
- `is:inline` scripts chosen for form handling to avoid Astro bundler scoping issues with direct DOM manipulation
- `PUBLIC_TURNSTILE_SITE_KEY` env var exposed via `import.meta.env` — Astro's PUBLIC_ convention for client-safe vars
- `npm install --force` used to bypass platform mismatch: dev machine is ARM64 Windows, workerd package is x64-only
- `from: 'Isio Contact <onboarding@resend.dev>'` used as default sender — switch to `contact@isio.ro` after domain DNS verification in Resend dashboard

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed reply_to to replyTo in Resend email send call**
- **Found during:** Task 1 (Create /api/contact endpoint)
- **Issue:** Plan spec used `reply_to` but Resend SDK TypeScript types require camelCase `replyTo`; build would fail with ts(2561)
- **Fix:** Changed `reply_to: email` to `replyTo: email` in resend.emails.send() call
- **Files modified:** src/pages/api/contact.ts
- **Verification:** `astro check` showed no errors in contact.ts after fix
- **Committed in:** 1fd2464 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 Rule 1 bug)
**Impact on plan:** Necessary for TypeScript correctness. No scope creep.

## Issues Encountered
- `npm install resend` fails with EBADPLATFORM on ARM64 Windows due to `@cloudflare/workerd-windows-64` being x64-only — resolved with `npm install resend --force` which installs resend correctly while skipping the platform-incompatible transitive package

## User Setup Required

**External services require manual configuration before contact form works in production:**

### Resend
1. Create API key at resend.io → API Keys
2. Verify domain `isio.ro` under Resend Dashboard → Domains (or use `onboarding@resend.dev` for testing)
3. Run: `wrangler secret put RESEND_API_KEY`
4. Run: `wrangler secret put CONTACT_EMAIL` (value: `contact@isio.ro`)
5. After domain verification, update `from` in `src/pages/api/contact.ts` to `contact@isio.ro`

### Cloudflare Turnstile
1. Cloudflare Dashboard → Turnstile → Add Widget for `isio.ro` domain (Invisible mode)
2. Copy Site Key (public) and Secret Key (private)
3. Run: `wrangler secret put TURNSTILE_SECRET_KEY`
4. Add to `.env` for local dev: `PUBLIC_TURNSTILE_SITE_KEY=your_site_key`
5. For production: `wrangler secret put PUBLIC_TURNSTILE_SITE_KEY` (or set as env var in Cloudflare Pages/Workers dashboard)

## Known Stubs
- `from: 'Isio Contact <onboarding@resend.dev>'` in `src/pages/api/contact.ts` line ~99 — placeholder sender domain; must be changed to `contact@isio.ro` once Resend domain verification is complete
- `PUBLIC_TURNSTILE_SITE_KEY` data-sitekey in contact forms will be empty string until the env var is set — Turnstile widget will not render without a valid site key (form will still submit but without spam protection)

## Next Phase Readiness
- Contact form backend complete — ready for Phase 3 Plan 02 (Cal.com booking embed)
- Both locale contact pages and homepage form are all wired and functional
- Secrets must be configured in Wrangler/Cloudflare before deployment for live email delivery

---
*Phase: 03-booking-contact*
*Completed: 2026-03-22*
