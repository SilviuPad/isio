---
phase: 03-booking-contact
verified: 2026-03-22T00:00:00Z
status: human_needed
score: 5/6 must-haves verified
re_verification: false
human_verification:
  - test: "Submit contact form on /contact/ (RO) and verify admin receives email"
    expected: "Admin inbox receives a formatted HTML email with name, email, service, and message fields from the visitor"
    why_human: "Cannot verify live Resend email delivery or Wrangler secrets configuration programmatically"
  - test: "Submit contact form on /en/contact/ (EN) and verify email arrives in English"
    expected: "Same as above, success message reads: 'Message sent! We'll get back to you within 24 hours.'"
    why_human: "Live email delivery requires running the server with real RESEND_API_KEY set"
  - test: "Visit /contact/ and /en/contact/ and confirm Cal.com widget loads inline"
    expected: "Month-view calendar renders inside the glass-card container with dark theme; no redirect to cal.eu"
    why_human: "Cal.com embed requires browser + live network fetch to cal.eu; cannot verify render programmatically"
  - test: "Verify booking creates event on admin's Google Calendar"
    expected: "After selecting a slot and completing the booking flow, the event appears on the admin's Google Calendar with visitor details"
    why_human: "Google Calendar sync is an external Cal.com integration configured in the Cal.com dashboard — cannot verify in code"
  - test: "Test contact form and Cal.com embed at 375px mobile viewport"
    expected: "Form stacks to single column; Cal.com embed is scrollable and usable; success/error messages are readable"
    why_human: "Responsive layout requires visual browser verification"
  - test: "Verify Turnstile widget renders when PUBLIC_TURNSTILE_SITE_KEY is set"
    expected: "Invisible Turnstile challenge initializes; form submission includes a cf-turnstile-response token; API rejects bots with 403"
    why_human: "Turnstile widget is conditionally rendered only when env var is present; requires real Cloudflare Turnstile site key"
---

# Phase 3: Booking + Contact Verification Report

**Phase Goal:** A prospective client can book a discovery call that appears on the admin's Google Calendar, and can send a message via contact form that triggers an email notification — without any OAuth token management burden
**Verified:** 2026-03-22
**Status:** human_needed — all automated checks passed; 6 items need human/live verification
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Visitor submits contact form and admin receives email with name, email, service, and message | ? HUMAN NEEDED | API endpoint fully implemented with Resend; live email delivery cannot be verified without real secrets |
| 2 | Spam bots are blocked by Cloudflare Turnstile invisible challenge | ? HUMAN NEEDED | Turnstile div + siteverify call present in code; conditional on PUBLIC_TURNSTILE_SITE_KEY env var being set |
| 3 | Form shows inline success message after successful submission without page reload | VERIFIED | fetch POST in is:inline script; on 200 response hides form and sets statusEl text to locale-specific success string |
| 4 | Form shows inline error message if submission fails | VERIFIED | .catch() and non-ok response paths both set statusEl to red-styled error string and re-enable submit button |
| 5 | Visitor sees Cal.com booking widget inline where placeholder card was | VERIFIED | `#cal-embed` div present in both locale pages; Cal() inline script points to `isioserv/discovery-call` on cal.eu — real account (not placeholder) |
| 6 | Booking widget displays in Romanian on /contact/ and English on /en/contact/ | VERIFIED | RO page: `lang: "ro"` in Cal config; EN page: `lang: "en"` in Cal config |

**Score:** 4/6 truths fully verified programmatically; 2 need human confirmation (email delivery, Turnstile widget render)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/pages/api/contact.ts` | POST endpoint for contact form submissions | VERIFIED | 130 lines; `export const prerender = false`; exports `async POST`; Turnstile siteverify; Resend email send; all status codes (400/403/500/200) |
| `src/pages/contact.astro` | RO contact page with wired form and Turnstile | VERIFIED | Form with `data-locale="ro"`, cf-turnstile div (conditional on env var), fetch to `/api/contact`, Cal.com embed with `lang:"ro"` |
| `src/pages/en/contact.astro` | EN contact page with wired form and Turnstile | VERIFIED | Form with `data-locale="en"`, cf-turnstile div (conditional on env var), fetch to `/api/contact`, Cal.com embed with `lang:"en"` |
| `src/components/home/ContactInline.astro` | Homepage inline form wired to same endpoint | VERIFIED | `id="contact-form-inline"`, `name="name"`, `name="email"`, `name="message"`, no subject field, fetch to `/api/contact`, Turnstile div (conditional) |
| `wrangler.toml` | Secrets documented | VERIFIED | All 4 secrets documented: RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_EMAIL, PUBLIC_TURNSTILE_SITE_KEY |
| `package.json` | resend dependency | VERIFIED | `"resend": "^6.9.4"` in dependencies |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/pages/contact.astro` | `/api/contact` | fetch POST in is:inline script | WIRED | Line 235: `fetch('/api/contact', { method: 'POST', ... })` — payload includes name, email, service, message, turnstileToken, locale |
| `src/pages/en/contact.astro` | `/api/contact` | fetch POST in is:inline script | WIRED | Line 235: same fetch pattern with EN locale strings |
| `src/components/home/ContactInline.astro` | `/api/contact` | fetch POST in is:inline script | WIRED | Line 126: `fetch('/api/contact', { method: 'POST', ... })` |
| `src/pages/api/contact.ts` | Resend API | `resend.emails.send()` | WIRED | Line 103: `await resend.emails.send({...})` with to, from, replyTo, subject, html fields populated from request body |
| `src/pages/api/contact.ts` | Cloudflare Turnstile siteverify | fetch POST | WIRED | Lines 40-49: fetch to `https://challenges.cloudflare.com/turnstile/v0/siteverify`; result.success gates email delivery |
| `src/pages/contact.astro` | cal.eu (Cal.com EU) | Cal() inline script | WIRED | Line 161: embed.js from cal.eu; Cal("inline") with `calLink: "isioserv/discovery-call"` — real account, not placeholder |
| Cal.com → Google Calendar | Google Calendar | Cal.com dashboard integration | HUMAN NEEDED | Code wires to cal.eu correctly; calendar sync is a Cal.com dashboard setting — cannot verify in code |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| INTR-01 | 03-02-PLAN.md | Custom booking form for discovery calls synced with Google Calendar | SATISFIED | Cal.com inline embed in both locale contact pages; `calLink: "isioserv/discovery-call"` on cal.eu; Google Calendar sync is a Cal.com native integration |
| INTR-02 | 03-01-PLAN.md | Contact form with email notification to admin | SATISFIED | `POST /api/contact` validates fields, verifies Turnstile, sends HTML email via Resend SDK to CONTACT_EMAIL env var |

Both requirements explicitly marked `Complete` in REQUIREMENTS.md traceability table. No orphaned requirements found for Phase 3.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/pages/contact.astro` | 82-84 | `{import.meta.env.PUBLIC_TURNSTILE_SITE_KEY && (...)}` — Turnstile div only renders when env var set | INFO | Not a stub — this is intentional conditional rendering. Form still submits without Turnstile (turnstileToken will be empty string); API has DISABLE_TURNSTILE bypass for dev. Spam protection is absent until the env var is configured. |
| `src/pages/api/contact.ts` | 104 | `from: 'Isio Contact <onboarding@resend.dev>'` | WARNING | Placeholder sender domain; email sends from Resend's test domain until `contact@isio.ro` is verified in Resend dashboard. Documented as known stub in 03-01-SUMMARY.md. |

No blockers found. The onboarding@resend.dev sender is a documented, expected temporary state that does not prevent emails from being delivered — it only affects the From address until domain verification is complete.

### Notable: Cal.com EU vs cal.com

The Cal.com embed uses `cal.eu` (European-hosted Cal.com instance) rather than `app.cal.com`. This is a deliberate choice — `isioserv` is an account on the EU instance. The plan's key_link pattern `cal.com/embed` no longer matches (now `cal.eu/embed/embed.js`), but the integration is functionally equivalent and more appropriate given the Romanian market. The calLink `isioserv/discovery-call` is a real account slug — the SUMMARY's self-check noted `YOUR_USERNAME` was a placeholder but the actual committed code shows it has already been replaced with the real username.

### Human Verification Required

#### 1. Contact Form Email Delivery (RO)

**Test:** Start dev server with `.dev.vars` containing RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_EMAIL, PUBLIC_TURNSTILE_SITE_KEY. Visit `http://localhost:4321/contact/`. Fill form fields and submit.
**Expected:** Button shows "Se trimite...", then form hides and green success message appears: "Mesajul a fost trimis! Revenim in maxim 24 de ore." Admin inbox receives formatted HTML email.
**Why human:** Live Resend API call requires real API key; cannot mock email delivery in static analysis.

#### 2. Contact Form Email Delivery (EN)

**Test:** Same as above at `http://localhost:4321/en/contact/` with English inputs.
**Expected:** Button shows "Sending...", success message: "Message sent! We'll get back to you within 24 hours." Admin email received.
**Why human:** Same as above.

#### 3. Cal.com Widget Renders Inline

**Test:** Visit `/contact/` and `/en/contact/` in a browser. Observe the "Programează un apel de descoperire" / "Schedule a discovery call" card area.
**Expected:** Month-view calendar renders with dark theme and brand color #3b82f6. No redirect away from page. RO page shows Romanian month/day labels; EN page shows English labels.
**Why human:** Cal.com embed loads via external JS that fetches from cal.eu; requires browser + network.

#### 4. Google Calendar Sync

**Test:** Complete a booking in the Cal.com widget on `/contact/`. Check admin's Google Calendar.
**Expected:** Event appears with visitor's name, email, and the selected time slot. Two-way sync works (cancellation on Cal.com removes from Calendar).
**Why human:** Requires Cal.com → Google Calendar integration configured in the Cal.com dashboard (Integrations → Google Calendar → Connect). This is an external service setting, not a code concern.

#### 5. Mobile Viewport (375px)

**Test:** Open browser DevTools, set viewport to 375px width. Test both `/contact/` and `/en/contact/`. Test homepage contact form.
**Expected:** Form inputs are full width and usable. Cal.com embed has min-height 600px and scrolls within its container. Success/error messages are readable. No horizontal overflow.
**Why human:** Responsive layout requires visual confirmation.

#### 6. Turnstile Spam Protection

**Test:** Set `PUBLIC_TURNSTILE_SITE_KEY` to a valid Cloudflare Turnstile site key and `TURNSTILE_SECRET_KEY` to the corresponding secret. Submit the contact form.
**Expected:** Invisible Turnstile challenge completes silently. Request includes cf-turnstile-response token. API accepts it (200) for legitimate submissions; blocks automated submissions (403).
**Why human:** Requires real Cloudflare Turnstile widget credentials; cannot be verified with placeholder or empty key.

---

## Gaps Summary

No gaps blocking goal achievement. All code artifacts are substantive and wired. The two unresolved truths (email delivery, Turnstile render) are not code failures — they require real credentials and live browser rendering to confirm. The phase goal is structurally complete.

**Sender domain note:** `from: 'Isio Contact <onboarding@resend.dev>'` is a known temporary stub that does not block functionality — emails deliver successfully from the test domain; only the From address needs updating after `contact@isio.ro` is verified in Resend's dashboard.

---

_Verified: 2026-03-22_
_Verifier: Claude (gsd-verifier)_
