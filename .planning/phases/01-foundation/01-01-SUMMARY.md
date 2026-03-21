---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [astro, astro6, tailwind, tailwindcss-v4, sanity, cloudflare, paraglide-js, i18n, typescript]

# Dependency graph
requires: []
provides:
  - Astro 6 project skeleton with output: server + Cloudflare Workers adapter
  - i18n routing: RO at root (no prefix), EN under /en/ with prefixDefaultLocale: false
  - Tailwind CSS v4 via @tailwindcss/vite Vite plugin
  - Paraglide JS v2 message compilation with project.inlang/settings.json
  - Bilingual UI chrome message catalogs (25 keys each: nav, pricing, CTA, errors)
  - Locale utility module with getLocaleFromUrl, localePath, getAlternateLocaleSlug, slugMap
  - Sanity Studio stub config (sanity.config.ts) for @sanity/astro integration
  - All 11 translated URL slug mappings (home, services, website, webApps, seo, accessibility, aiAgents, portfolio, pricing, about, contact)
affects:
  - All subsequent plans (every plan depends on build working)
  - 01-02 (layout/components — imports locale utils)
  - 01-03 (Sanity schema — extends sanity.config.ts)
  - All i18n-related plans (URL slugs locked in slugMap)

# Tech tracking
tech-stack:
  added:
    - astro@^6.0
    - "@astrojs/cloudflare@latest (prerenderEnvironment: node for win32 arm64 compat)"
    - "@astrojs/sitemap@latest"
    - "@inlang/paraglide-js@^2.15.0"
    - "@sanity/astro@^3 (v4 does not exist — ^3 is latest)"
    - "@sanity/client@^7 (required by @sanity/astro@3)"
    - "@tailwindcss/vite@^4.2"
    - "astro-seo@^1.1.0"
    - "sanity@^3"
    - "tailwindcss@^4.2"
    - "typescript@^5"
    - "@cloudflare/workerd-windows-64 (forced install for win32 arm64 x64 emulation)"
  patterns:
    - "Hybrid SSR: output: server + export const prerender = true on static pages"
    - "Tailwind v4 via Vite plugin (not @astrojs/tailwind which is deprecated)"
    - "Paraglide via Vite plugin (not @inlang/paraglide-astro adapter)"
    - "i18n: defaultLocale ro with no URL prefix; EN under /en/"
    - "Locale utils import from src/i18n/utils.ts (not auto-generated Paraglide functions)"

key-files:
  created:
    - package.json
    - astro.config.mjs
    - tsconfig.json
    - src/env.d.ts
    - src/pages/index.astro
    - .env.example
    - project.inlang/settings.json
    - src/i18n/messages/ro.json
    - src/i18n/messages/en.json
    - src/i18n/utils.ts
    - sanity.config.ts
    - scripts/patch-workerd.cjs
  modified:
    - .gitignore

key-decisions:
  - "Used @sanity/astro@^3 not @^4 — v4 does not exist (latest is 3.3.1)"
  - "Used @sanity/client@^7 not @^6 — required by @sanity/astro@3"
  - "Added prerenderEnvironment: node to cloudflare() adapter — required on win32 arm64 where workerd has no binary"
  - "Forced @cloudflare/workerd-windows-64 install for win32 arm64 x64 emulation support"
  - "Added scripts/patch-workerd.cjs postinstall to survive npm install on win32 arm64"
  - "Fallback projectId is 'placeholder' not '' — empty string fails @sanity/client validation"
  - "sanity.config.ts stub created in project root — required by @sanity/astro integration"
  - "Locale utils use hand-maintained slugMap not Paraglide auto-generated routing — enables translated slugs per D-05"

patterns-established:
  - "Astro hybrid: output: server + prerender = true on all marketing pages"
  - "Import locale utils from src/i18n/utils.ts for routing and locale detection"
  - "Message keys use underscore notation (nav_services) not dot notation (nav.services)"
  - "Romanian uses comma-below diacritics: ș (U+0219) ț (U+021B), never cedilla variants"

requirements-completed: [I18N-01, I18N-03, SEO-06]

# Metrics
duration: 33min
completed: 2026-03-21
---

# Phase 1 Plan 01: Project Foundation Summary

**Astro 6 + Tailwind CSS v4 + Sanity + Cloudflare Workers adapter initialized with bilingual i18n routing (RO root / EN /en/) and Paraglide JS v2 message compilation**

## Performance

- **Duration:** 33 min
- **Started:** 2026-03-21T10:57:45Z
- **Completed:** 2026-03-21T11:31:30Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments

- Astro 6 project builds successfully with zero errors via `npm run build`
- i18n routing configured: RO at root (no prefix), EN under /en/ with `prefixDefaultLocale: false`
- Paraglide JS v2 compiles message catalogs during build (3x "Compilation complete" log confirmed)
- Tailwind CSS v4 active via @tailwindcss/vite Vite plugin
- Cloudflare Workers adapter configured for hybrid server/static output
- 25-key bilingual UI chrome catalogs (RO + EN) with identical key sets, using comma-below Romanian diacritics
- Locale utility module with slugMap covering all 11 translated URL routes per D-04/D-05

## Task Commits

Each task was committed atomically:

1. **Task 1: Initialize Astro project with all dependencies and core configuration** — `1ab7366` (feat)
2. **Task 2: Set up Paraglide JS i18n messages and locale utility functions** — `c29533b` (feat)
3. **Deviation auto-fixes: workerd win32 arm64 + Sanity config** — `802a009` (fix)
4. **Chore: .claude/ gitignore** — `cd159fc` (chore)

## Files Created/Modified

- `package.json` — Project manifest with all dependencies and postinstall patch script
- `astro.config.mjs` — Full Astro config: Cloudflare adapter, i18n routing, Tailwind v4, Sanity, sitemap, Paraglide
- `tsconfig.json` — Extends astro/tsconfigs/strict
- `src/env.d.ts` — Astro client type reference
- `src/pages/index.astro` — Placeholder page with prerender = true
- `.env.example` — Documents SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_READ_TOKEN
- `project.inlang/settings.json` — Paraglide project config: sourceLanguageTag ro, pathPattern for messages
- `src/i18n/messages/ro.json` — 25 Romanian UI chrome strings (nav, pricing, CTA, errors, footer)
- `src/i18n/messages/en.json` — 25 English UI chrome strings (identical key set)
- `src/i18n/utils.ts` — Locale utilities: getLocaleFromUrl, localePath, getAlternateLocaleSlug, slugMap
- `sanity.config.ts` — Stub Sanity Studio config (required by @sanity/astro integration at build time)
- `scripts/patch-workerd.cjs` — Postinstall patch for win32 arm64 workerd platform detection
- `.gitignore` — Added .astro/, src/paraglide/, .sanity/, .wrangler/, .history/, .claude/
- `package-lock.json` — Lockfile for reproducible installs

## Decisions Made

- Used `@sanity/astro@^3` not `@^4` — v4 does not exist (latest published is 3.3.1)
- Used `@sanity/client@^7` not `@^6` — required peer dep for @sanity/astro@3.x
- Added `prerenderEnvironment: 'node'` to cloudflare() adapter — required on win32 arm64 where workerd has no native binary
- Fallback Sanity projectId is `'placeholder'` not `''` — empty string fails @sanity/client validation at prerender time

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] @sanity/astro@^4 version does not exist**
- **Found during:** Task 1 (npm install)
- **Issue:** npm ETARGET — no matching version for @sanity/astro@^4; latest published is 3.3.1
- **Fix:** Changed to @sanity/astro@^3
- **Files modified:** package.json
- **Verification:** npm install succeeded
- **Committed in:** 802a009

**2. [Rule 1 - Bug] @sanity/client@^6 incompatible with @sanity/astro@3**
- **Found during:** Task 1 (npm install)
- **Issue:** ERESOLVE — @sanity/astro@3.3.1 requires peer @sanity/client@^7
- **Fix:** Changed to @sanity/client@^7
- **Files modified:** package.json
- **Verification:** npm install succeeded
- **Committed in:** 802a009

**3. [Rule 1 - Bug] workerd has no win32 arm64 binary — blocks build on this machine**
- **Found during:** Task 1 (npm run build)
- **Issue:** workerd/lib/main.js throws "Unsupported platform: win32 arm64 LE" at module load time, blocking astro build/check from even starting
- **Fix:** (a) Patched workerd/lib/main.js to add win32 arm64 as alias for win32 x64; (b) Force-installed @cloudflare/workerd-windows-64 binary for x64 emulation; (c) Added prerenderEnvironment: 'node' to cloudflare() adapter to reduce workerd dependency; (d) Created scripts/patch-workerd.cjs postinstall to survive npm install
- **Files modified:** astro.config.mjs, package.json, scripts/patch-workerd.cjs
- **Verification:** npm run build completes with "Complete!" — zero errors
- **Committed in:** 802a009

**4. [Rule 2 - Missing Critical] sanity.config.ts stub required by @sanity/astro**
- **Found during:** Task 1 (first successful build attempt)
- **Issue:** @sanity/astro throws "Sanity Studio requires a sanity.config.ts|js file in your project root" at build time
- **Fix:** Created minimal sanity.config.ts stub in project root
- **Files modified:** sanity.config.ts
- **Verification:** Build succeeds with config file present
- **Committed in:** 802a009

**5. [Rule 1 - Bug] Empty projectId string fails @sanity/client validation at prerender**
- **Found during:** Task 1 (build attempt with empty string fallback)
- **Issue:** @sanity/client throws "Configuration must contain projectId" when projectId is empty string during SSG prerender of index.astro
- **Fix:** Changed fallback from '' to 'placeholder' (any non-empty string satisfies validation)
- **Files modified:** astro.config.mjs
- **Verification:** Build completes prerendering /index.html without error
- **Committed in:** 802a009

---

**Total deviations:** 5 auto-fixed (3 Rule 1 bugs, 1 Rule 2 missing critical, 1 Rule 1 bug)
**Impact on plan:** All auto-fixes were necessary for build to succeed on win32 arm64. No scope creep. Production Cloudflare CI/CD (Linux x64) will not need the workerd patch.

## Issues Encountered

- Windows ARM64 development environment requires workerd platform patch and x64 binary emulation. This is a local dev constraint only — Cloudflare Pages CI runs on Linux x64 where workerd is natively supported. The `scripts/patch-workerd.cjs` postinstall handles this automatically on `npm install`.

## User Setup Required

Before the build will fetch live Sanity content, set these environment variables:
- `SANITY_PROJECT_ID` — your Sanity project ID (from sanity.io/manage)
- `SANITY_DATASET` — typically `production`
- `SANITY_API_READ_TOKEN` — optional for public datasets; required for private

See `.env.example` for the template.

## Next Phase Readiness

- Project builds successfully and is ready for layout/component work (Plan 02)
- Sanity schema definitions can be added to sanity.config.ts (Plan 03)
- All 11 URL slug mappings are locked in slugMap and should not change once pages are indexed
- Paraglide message keys use underscore notation — all future keys must follow this pattern

---
*Phase: 01-foundation*
*Completed: 2026-03-21*
