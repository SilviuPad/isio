---
phase: 03-booking-contact
plan: 02
subsystem: frontend
tags: [cal-com, booking-embed, contact-page, i18n, astro]

# Dependency graph
requires:
  - phase: 03-01
    provides: "Contact pages with Turnstile + fetch submission (post-Plan-01 state)"
provides:
  - "Cal.com inline booking widget embedded in RO contact page (/contact/)"
  - "Cal.com inline booking widget embedded in EN contact page (/en/contact/)"
  - "Dark-themed embed with locale-specific lang param (ro/en)"
  - "Placeholder calLink for user to replace with real Cal.com username"
affects: [contact page visual, booking conversion path]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Cal.com vanilla JS embed via is:inline script with initCal() retry loop"
    - "Cal('inline') with elementOrSelector targeting #cal-embed div"
    - "Cal('ui') for dark theme + brandColor override"
    - "window.addEventListener('load', initCal) fallback for async script loading"

key-files:
  created: []
  modified:
    - src/pages/contact.astro
    - src/pages/en/contact.astro

key-decisions:
  - "initCal() retry loop (setTimeout 100ms) — Cal.com script loaded async, may not be ready on DOMContentLoaded"
  - "is:inline scripts — consistent with Plan 01 pattern for client-side DOM manipulation"
  - "min-height: 450px on #cal-embed — ensures widget renders with enough vertical space on all viewports"
  - "Cal.com embed script placed before Turnstile script — no dependency between them, both async"

# Metrics
duration: 4min
completed: 2026-03-22
---

# Phase 3 Plan 02: Cal.com Booking Embed Summary

**Cal.com inline booking widget replacing the placeholder "Schedule a call" card in both RO and EN contact pages, with dark theme and locale-specific language config**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-21T23:25:38Z
- **Completed:** 2026-03-21T23:29:00Z
- **Tasks:** 1 of 2 (Task 2 is human-verify checkpoint — awaiting user verification)
- **Files modified:** 2

## Accomplishments

- Replaced the "Programeaza un apel" placeholder glass-card in `src/pages/contact.astro` with a Cal.com `#cal-embed` div + heading + subtitle
- Replaced the "Schedule a call" placeholder glass-card in `src/pages/en/contact.astro` with the same Cal.com embed structure
- RO page uses `lang: "ro"` in Cal config; EN page uses `lang: "en"`
- Both pages use dark theme (`theme: "dark"`) and brand color `#3b82f6`
- `initCal()` retry loop handles the async Cal.com script loading gracefully
- `calLink: "YOUR_USERNAME/discovery-call"` placeholder with `<!-- TODO -->` comment for user to replace after Cal.com account setup
- `astro build` completes without errors

## Task Commits

1. **Task 1: Replace booking placeholder cards with Cal.com inline embed** - `5b1df4f` (feat)
2. **Task 2: Verify booking and contact flows** - PENDING (checkpoint:human-verify)

## Files Created/Modified

- `src/pages/contact.astro` - "Programeaza un apel" glass-card replaced with Cal.com embed + `lang: "ro"` script
- `src/pages/en/contact.astro` - "Schedule a call" glass-card replaced with Cal.com embed + `lang: "en"` script

## Decisions Made

- `initCal()` retry loop with 100ms setTimeout — necessary because Cal.com script is loaded `async`; `typeof Cal === 'undefined'` check ensures we don't call before script is ready
- `is:inline` scripts — consistent with Plan 01 approach to avoid Astro bundler scoping issues
- `min-height: 450px` on `#cal-embed` div — ensures the month-view calendar has enough vertical space to render without collapsing
- Both `Cal("init")` and `Cal("ui")` calls separated — `init` sets origin, `ui` sets global theme/brand (affects booking flow modal)

## Deviations from Plan

None — plan executed exactly as written.

## User Setup Required

**Cal.com must be configured before the embed shows real booking slots:**

1. Create account at [cal.com/signup](https://cal.com/signup) (free tier)
2. Create event type: "Discovery Call" — 30 minutes, set your availability
3. Connect Google Calendar: Cal.com Dashboard → Integrations → Google Calendar → Connect
4. Note your username and event slug (e.g., `your-username/discovery-call`)
5. In both contact pages, replace `YOUR_USERNAME` with your actual Cal.com username:
   - `src/pages/contact.astro` line ~166: `calLink: "YOUR_USERNAME/discovery-call"`
   - `src/pages/en/contact.astro` line ~166: `calLink: "YOUR_USERNAME/discovery-call"`

## Known Stubs

- `calLink: "YOUR_USERNAME/discovery-call"` in both contact pages — placeholder until user creates Cal.com account and provides real username. The widget will fail to load until this is replaced. A `<!-- TODO: Replace YOUR_USERNAME with your Cal.com username -->` comment is present above the script tag in both files.

## Checkpoint Status

Task 2 (`checkpoint:human-verify`) reached. Awaiting user visual verification of:
- Cal.com embed renders inline on `/contact/` and `/en/contact/`
- Widget language matches page locale (RO/EN)
- Contact form and booking embed work on mobile viewport
- End-to-end: form submission reaches admin email, booking creates calendar event

## Self-Check: PASSED

- `src/pages/contact.astro` contains `id="cal-embed"`: YES (line 97)
- `src/pages/contact.astro` contains `cal.com/embed/embed.js`: YES (line 155)
- `src/pages/contact.astro` contains `Cal("inline"` with `lang: "ro"`: YES (lines 164, 170)
- `src/pages/en/contact.astro` contains `id="cal-embed"`: YES (line 97)
- `src/pages/en/contact.astro` contains `Cal("inline"` with `lang: "en"`: YES (lines 164, 170)
- Both contain `theme: "dark"`: YES
- Both contain `YOUR_USERNAME/discovery-call`: YES
- Old placeholder `<a` link removed from both: YES (verified by grep returning no matches)
- `astro build` completes without errors: YES (3.50s)
- Commit `5b1df4f` exists: YES

---
*Phase: 03-booking-contact*
*Completed: 2026-03-22*
