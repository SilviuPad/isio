# Phase 1: Foundation - Research

**Researched:** 2026-03-21
**Domain:** Astro 6 i18n routing, Sanity CMS v3, Cloudflare Workers deployment, SEO infrastructure
**Confidence:** HIGH (core stack verified via official docs), MEDIUM (Paraglide v2 integration pattern)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**CMS Content Model**
- D-01: Bilingual content uses per-field locale strategy — one Sanity document per entity, each text field stores `{ en: '...', ro: '...' }`. Keeps translations in sync.
- D-02: Portfolio projects use essential fields only: title, description, screenshot, tech stack tags, live URL. No detailed case studies for v1.

**URL Structure**
- D-04: Romanian is the default locale (no prefix). English uses `/en/` prefix. Example: `isio.ro/servicii/seo` (RO) and `isio.ro/en/services/seo` (EN).
- D-05: URL slugs are translated per locale — `/servicii/seo` (RO) vs `/en/services/seo` (EN). Better SEO per locale.
- D-06: Domain is `isio.ro` — Romanian TLD for strong local SEO signal.

**Deployment Pipeline**
- D-07: Production only — no staging environment. Cloudflare Pages preview deploys on PRs serve as staging.
- D-08: Webhook auto-rebuild — every Sanity publish triggers a Cloudflare Pages rebuild automatically.

**Pricing Data Model**
- D-09: Currency is EUR only across both locales.

### Claude's Discretion

- D-03: CMS vs code boundary — Claude decides what belongs in CMS (editable content) vs hardcoded (structural elements like nav, footer layout).
- D-10: Pricing tier field structure — Claude designs the optimal fields per tier (Fiverr-style with name, price, deliverables, etc.).
- Sanity Studio configuration and plugin choices
- Astro i18n plugin/approach selection
- SEO meta tag implementation approach
- Cloudflare Pages adapter configuration

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

Phase 1 maps to the following REQUIREMENTS.md entries:

| ID | Description | Research Support |
|----|-------------|------------------|
| I18N-01 | Full bilingual site with RO and EN versions of all pages | Astro built-in i18n with `prefixDefaultLocale: false` + locale folder structure |
| I18N-02 | Language switcher UI component accessible from all pages | Custom `localePath()` utility + base layout component |
| I18N-03 | Locale-based URL routing (/ro/ and /en/ prefixes) | Astro i18n `defaultLocale: 'ro'`, `locales: ['ro', 'en']` |
| I18N-04 | Hreflang tags on all pages for SEO | `astro-seo` component in base layout with alternate locale URLs |
| I18N-05 | CMS content stored per locale (RO and EN) | Sanity per-field locale strategy: `{ en: '...', ro: '...' }` on each field |
| SEO-03 | Auto-generated sitemap.xml | `@astrojs/sitemap` configured with `i18n` locales |
| SEO-04 | Configured robots.txt | Astro static `public/robots.txt` file |
| SEO-05 | Optimized meta tags per page and locale | `astro-seo` component with per-page props |
| SEO-06 | Static-first SSG architecture with zero unnecessary client-side JS | Astro `output: 'server'` + `prerender = true` on all static pages (hybrid pattern) |
| CMS-01 | Sanity Studio setup for managing all site content | `@sanity/astro` integration + `studioBasePath` at `/studio` |
| CMS-03 | Editable price sheet managed via CMS | `pricingTier` Sanity schema with `{ en, ro }` locale fields |
| CMS-04 | Content webhook triggering site rebuild on publish | Sanity GROQ webhook → Cloudflare Pages deploy hook |
| PRIC-07 | Pricing data managed via CMS (editable without redeploy) | Sanity `pricingTier` schema + build-time GROQ fetch |
| AUTH-01 | Single admin login (password-protected) for Sanity Studio access | Sanity Studio built-in auth (Google SSO or email/password) |
</phase_requirements>

---

## Summary

Phase 1 establishes the bilingual infrastructure that every subsequent phase depends on. The core deliverable is a working Astro 6 project with `/en/` prefix routing for English and no prefix for Romanian (the default locale), wired to a live Sanity CMS project, deployed to Cloudflare and auto-rebuilding on content publish. No content is added in this phase — only the plumbing that makes content possible.

The stack is confirmed as Astro 6 + Tailwind CSS v4 + Sanity CMS v3 + Cloudflare. One critical update from the discussion-phase research: the Astro Cloudflare adapter now explicitly recommends **Cloudflare Workers** (not Pages) for new projects with SSR/API routes. For a purely static build, Pages still works, but because Phase 3 (booking) will need SSR API routes, using Workers from Phase 1 avoids a migration later. The `@astrojs/cloudflare` adapter handles both static and server-side routes in a single Workers deployment — static pages are served as assets (free and unlimited), SSR routes run as Worker invocations.

Two other verified changes from earlier research: (1) Paraglide JS v2 no longer requires the `@inlang/paraglide-astro` adapter package — use `@inlang/paraglide-js` directly with its Vite plugin; (2) Sanity API version 2025-02-19 changed the default GROQ perspective to `published`, so draft documents are now filtered automatically when using a current API version. The `@sanity/astro` integration does not yet provide a native Content Layer loader — content is fetched via `sanityClient.fetch()` directly in `.astro` files using GROQ.

**Primary recommendation:** Initialize with `output: 'server'` + `@astrojs/cloudflare` adapter from day one. Mark all static pages with `export const prerender = true`. This is the Astro 6 hybrid pattern and avoids a forced architecture migration when SSR routes are needed in Phase 3.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `astro` | ^6.0 | Static site framework | Zero JS by default, built-in i18n, first-class Cloudflare Workers support in v6 |
| `@astrojs/cloudflare` | latest | Cloudflare Workers adapter | Required for SSR API routes (Phase 3+); static pages still prerendered as assets |
| `tailwindcss` | ^4.2 | Utility styling | v4 uses Vite plugin natively — no config file needed |
| `@tailwindcss/vite` | ^4.2 | Vite plugin for Tailwind v4 | Official integration path; `@astrojs/tailwind` is deprecated since Astro 5.2 |
| `@sanity/astro` | ^4.x | Sanity integration for Astro | Official plugin; enables `sanity:client` import and Studio embedding |
| `@sanity/client` | ^6.x | Sanity GROQ query client | Used directly in `.astro` files for build-time content fetching |
| `sanity` | ^3.x | Sanity Studio v3 core | Studio configuration, schema definitions |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `astro-seo` | ^1.1.0 | SEO meta tag component | Base layout — injects title, description, OG, Twitter, canonical, hreflang alternates |
| `@astrojs/sitemap` | latest | Auto-generated sitemap.xml | Configured with `i18n` locales so both `/` (RO) and `/en/` pages appear |
| `@inlang/paraglide-js` | ^2.15.0 | Type-safe i18n message catalog | UI chrome translations (nav labels, buttons, form errors) — NOT page content (that's in CMS) |
| `typescript` | ^5 | Type safety | Already standard in Astro projects; strongly typed CMS queries |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Cloudflare Workers | Cloudflare Pages (static only) | Pages works for fully static builds but requires migration when SSR routes are added in Phase 3; Workers from day one avoids that |
| `@inlang/paraglide-js` | Astro i18n JSON utilities | Paraglide provides TypeScript type-checking on translation keys — broken keys fail build instead of silently rendering empty strings |
| `astro-seo` | Manual `<head>` meta tags | astro-seo is 1.1.0 and actively maintained (March 2026); the component consolidates 15+ meta tags into one typed interface |
| `@sanity/astro` direct client | Astro Content Layer loader | Content Layer loader for Sanity does not yet exist (open GitHub issue as of March 2026); direct client is the current official pattern |

**Installation:**
```bash
# Create Astro project
npm create astro@latest isio

# Cloudflare adapter
npm install @astrojs/cloudflare

# Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite

# Sanity
npm install @sanity/astro @sanity/client sanity

# SEO and sitemap
npm install astro-seo @astrojs/sitemap

# i18n translations
npm install @inlang/paraglide-js

# Dev tools
npm install -D typescript @biomejs/biome
```

**Version verification:**

As of 2026-03-21:
- `astro` — v6.x (released early 2026, requires Node 22+)
- `@tailwindcss/vite` — v4.2.x
- `@sanity/astro` — v4.x
- `astro-seo` — v1.1.0 (published ~January 2026)
- `@inlang/paraglide-js` — v2.15.0

---

## Architecture Patterns

### Recommended Project Structure

```
isio/
├── src/
│   ├── pages/
│   │   ├── index.astro              # RO homepage (default locale, no prefix)
│   │   ├── servicii/                # RO service pages
│   │   │   ├── website.astro
│   │   │   ├── aplicatii-web.astro
│   │   │   ├── seo.astro
│   │   │   ├── accesibilitate.astro
│   │   │   └── implementare-agenti.astro
│   │   ├── portofoliu.astro         # RO portfolio
│   │   ├── pret.astro               # RO pricing
│   │   ├── despre.astro             # RO about
│   │   ├── contact.astro            # RO contact
│   │   ├── 404.astro                # Bilingual 404
│   │   ├── en/                      # EN pages (prefixed)
│   │   │   ├── index.astro
│   │   │   ├── services/
│   │   │   │   ├── website.astro
│   │   │   │   ├── web-apps.astro
│   │   │   │   ├── seo.astro
│   │   │   │   ├── accessibility.astro
│   │   │   │   └── ai-agents.astro
│   │   │   ├── portfolio.astro
│   │   │   ├── pricing.astro
│   │   │   ├── about.astro
│   │   │   └── contact.astro
│   │   └── api/                     # SSR API routes (Phase 3+)
│   │       ├── booking.ts
│   │       ├── contact.ts
│   │       └── generate-pdf.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── LanguageSwitcher.astro
│   │   └── ui/                      # Shared UI primitives
│   ├── i18n/
│   │   ├── messages/
│   │   │   ├── ro.json              # UI chrome: nav, buttons, errors (Paraglide)
│   │   │   └── en.json
│   │   └── utils.ts                 # localePath(), getCurrentLocale()
│   ├── lib/
│   │   └── sanity.ts                # Sanity client + GROQ queries
│   └── layouts/
│       ├── Base.astro               # HTML shell: <head>, meta, hreflang
│       └── Page.astro               # Page chrome: Header + Footer
├── sanity/
│   ├── schemaTypes/
│   │   ├── service.ts               # Public: service page content
│   │   ├── portfolioItem.ts         # Public: portfolio entries
│   │   ├── pricingTier.ts           # Public: pricing tiers (CMS-managed)
│   │   └── index.ts                 # Schema registry
│   └── sanity.config.ts
├── public/
│   └── robots.txt                   # Static; written once
├── astro.config.mjs
├── sanity.cli.ts
├── wrangler.toml                    # Cloudflare Workers config
└── package.json
```

### Pattern 1: Astro i18n — No-Prefix Default Locale

**What:** Romanian is the default locale and its pages live at the root (no `/ro/` prefix). English pages live under `/en/`. Astro's built-in i18n handles routing and hreflang generation.

**When to use:** Always — this is the locked URL structure decision.

**Example:**
```javascript
// astro.config.mjs
// Source: https://docs.astro.build/en/guides/internationalization/
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://isio.ro',
  output: 'server',                   // Hybrid: default server, static pages use prerender = true
  adapter: cloudflare(),
  i18n: {
    locales: ['ro', 'en'],
    defaultLocale: 'ro',
    routing: {
      prefixDefaultLocale: false,       // /about (RO), /en/about (EN)
    },
    fallback: { en: 'ro' },
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'ro', locales: { ro: 'ro-RO', en: 'en-US' } } })],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**IMPORTANT — Astro 6 removes `output: 'hybrid'`:** The `hybrid` output mode was removed. Use `output: 'server'` and add `export const prerender = true` to all static pages. Pages without this export become server-rendered on demand.

```astro
---
// src/pages/index.astro — static page
export const prerender = true;
import Base from '../layouts/Base.astro';
---
<Base title="Isio — Agenție Web" locale="ro">
  ...
</Base>
```

### Pattern 2: Sanity Content Fetching at Build Time

**What:** Use `sanityClient.fetch()` directly in Astro component frontmatter. Content is fetched during the build and baked into the static HTML. No runtime calls from the browser.

**When to use:** All public content — services, portfolio, pricing tiers.

**Example:**
```typescript
// src/lib/sanity.ts
// Source: https://www.sanity.io/plugins/sanity-astro
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2025-02-19',   // API version 2025-02-19+ defaults perspective to 'published'
  useCdn: false,              // MUST be false for build-time SSG fetching
});
```

```astro
---
// src/pages/pret.astro — pricing page (RO)
export const prerender = true;
import { sanityClient } from '../lib/sanity';

const locale = 'ro';
const tiers = await sanityClient.fetch(
  `*[_type == "pricingTier" && service == $service] | order(order asc)`,
  { service: 'website' }
);
---
```

**Key insight:** Using `apiVersion: '2025-02-19'` or later means the default GROQ perspective is `published`. Draft documents are filtered out automatically — no need to add `!(_id in path("drafts.**"))` to every query.

### Pattern 3: Sanity Studio Embedded at /studio

**What:** Sanity Studio v3 runs as an embedded route in the Astro project via `@sanity/astro`. The Studio is served at `/studio` and is protected by Sanity's own authentication. It renders as a CSR island — the public site remains fully static.

**When to use:** Admin access to all CMS content and schemas.

```javascript
// astro.config.mjs addition
import sanity from '@sanity/astro';

export default defineConfig({
  // ...
  integrations: [
    sanity({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: 'production',
      apiVersion: '2025-02-19',
      useCdn: false,
      studioBasePath: '/studio',     // Studio at isio.ro/studio
    }),
    // ...
  ],
});
```

**Auth-01 compliance:** The Studio requires authentication out of the box via Sanity's auth system (Google or email/password). No custom auth implementation needed for Phase 1.

### Pattern 4: Webhook → Cloudflare Deploy Hook Pipeline

**What:** Sanity's GROQ-powered webhooks POST to a Cloudflare Pages deploy hook URL on every document publish. This triggers a fresh Astro build and redeploy, updating the live site with new content within ~60 seconds.

**When to use:** Phase 1 setup — configure before any CMS-driven content goes live.

**Setup steps:**
1. In Cloudflare: go to project Settings → Builds & Deployments → Add deploy hook → copy the hook URL
2. In Sanity: Settings → API → Webhooks → Add webhook
   - URL: the Cloudflare deploy hook URL
   - Trigger on: `create`, `update`, `delete`
   - Dataset: `production`
   - HTTP method: `POST`
3. Test: publish a document in Studio, observe Cloudflare dashboard show a new build

### Pattern 5: hreflang via astro-seo in Base Layout

**What:** Every page that renders in both locales must declare `<link rel="alternate">` hreflang tags pointing to both locale variants. `astro-seo` handles this through the `languageAlternates` prop.

**When to use:** Every page — in the Base layout so it applies universally.

```astro
---
// src/layouts/Base.astro
import { SEO } from 'astro-seo';

interface Props {
  title: string;
  description?: string;
  locale: 'ro' | 'en';
  canonicalSlug: string;   // e.g. "/servicii/seo" (RO slug) or "/en/services/seo" (EN slug)
  roSlug: string;
  enSlug: string;
}
const { title, description, locale, roSlug, enSlug } = Astro.props;
const baseUrl = 'https://isio.ro';
---
<html lang={locale === 'ro' ? 'ro-RO' : 'en-US'}>
  <head>
    <SEO
      title={title}
      description={description}
      languageAlternates={[
        { href: `${baseUrl}${roSlug}`, hreflang: 'ro' },
        { href: `${baseUrl}${enSlug}`, hreflang: 'en' },
        { href: `${baseUrl}${roSlug}`, hreflang: 'x-default' },
      ]}
      openGraph={{ basic: { title, type: 'website', image: `${baseUrl}/og.png` } }}
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Pattern 6: Pricing Tier Schema (Sanity)

**What:** Pricing tiers are stored in Sanity as structured documents. Each tier has locale-aware `name` and `description` fields using the per-field strategy (D-01). The `features` array items also have `{ en, ro }` objects.

**Claude's Discretion** — recommended tier structure (D-10):

```typescript
// sanity/schemaTypes/pricingTier.ts
export default {
  name: 'pricingTier',
  type: 'document',
  fields: [
    { name: 'service', type: 'string', options: { list: ['website', 'webapp', 'seo', 'accessibility', 'ai-agents'] } },
    { name: 'order', type: 'number' },  // 1=Basic, 2=Standard, 3=Premium
    { name: 'name', type: 'object', fields: [
        { name: 'en', type: 'string' },
        { name: 'ro', type: 'string' },
    ]},
    { name: 'priceEur', type: 'number' },   // EUR only (D-09)
    { name: 'pricePrefix', type: 'string' }, // "Starting from" or empty
    { name: 'deliveryDays', type: 'number' },
    { name: 'revisions', type: 'number' },   // -1 = unlimited
    { name: 'isRecommended', type: 'boolean' },
    { name: 'description', type: 'object', fields: [
        { name: 'en', type: 'text' },
        { name: 'ro', type: 'text' },
    ]},
    { name: 'features', type: 'array', of: [{
        type: 'object',
        fields: [
          { name: 'en', type: 'string' },
          { name: 'ro', type: 'string' },
          { name: 'included', type: 'boolean' },
        ],
    }]},
  ],
};
```

### Anti-Patterns to Avoid

- **Setting `output: 'hybrid'`**: Removed in Astro 6. Use `output: 'server'` + `prerender = true` per static page.
- **`useCdn: true` in Sanity client**: Must be `false` for build-time fetching to always get fresh content.
- **Locale files in `src/pages/ro/`**: With `prefixDefaultLocale: false`, default locale pages go directly in `src/pages/` (no `/ro/` subfolder). Creating `src/pages/ro/` breaks the routing.
- **Hardcoding strings in .astro components**: Every user-visible string must either come from Sanity (content) or Paraglide (UI chrome). No hardcoded Romanian or English strings in components.
- **Duplicating CMS content in `i18n/*.json`**: Clear ownership line — CMS owns page copy, Paraglide JSON owns UI chrome (nav, buttons, labels, errors). Never cross this boundary.
- **Pushing sensitive env vars to git**: `SANITY_STUDIO_TOKEN`, `SANITY_PROJECT_ID` in `.env` file that must be in `.gitignore` from commit 1.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SEO meta tags per page | Custom `<head>` component | `astro-seo` | Handles hreflang alternates, OG tags, Twitter cards, canonical URLs in one typed component; getting all 15+ meta tags right manually is error-prone |
| Sitemap generation | Script that reads routes | `@astrojs/sitemap` | Auto-detects all Astro routes + i18n locales; updates on every build; handles trailing slashes, priority, lastmod |
| CMS content fetching layer | Abstract query wrapper | `@sanity/client` directly | GROQ is already a query language; wrapping it adds indirection without type safety benefits |
| Studio authentication | Custom admin login | Sanity Studio built-in auth | Sanity handles auth, session management, and permissions out of the box (AUTH-01 done for free) |
| Cloudflare deploy trigger | Polling script | Sanity webhook → Cloudflare deploy hook | Native integration; Sanity webhook delivers on every publish event; Cloudflare exposes POST-triggerable deploy hooks |
| Translation key type safety | Object with string index | `@inlang/paraglide-js` compiler | Paraglide generates TypeScript functions from JSON; broken or missing keys fail the build rather than silently rendering empty |

**Key insight:** Phase 1 is plumbing — the value comes from wiring established tools together correctly, not from building custom solutions. Every item in this table represents a solved problem with a maintained solution.

---

## Common Pitfalls

### Pitfall 1: RO pages in `src/pages/ro/` instead of root

**What goes wrong:** Developer creates `src/pages/ro/index.astro` instead of `src/pages/index.astro`. With `prefixDefaultLocale: false`, Astro routes the Romanian default locale to root-level files. A `/ro/` subfolder creates conflicting routes or generates incorrect `/ro/` URLs for the default locale.

**Why it happens:** The i18n pattern with two locale folders (`/ro/` and `/en/`) feels intuitive. The `prefixDefaultLocale: false` setting flips this — the default locale has no folder prefix.

**How to avoid:** Default locale files go directly in `src/pages/`. Only non-default locales get subfolders. So: `src/pages/index.astro` (RO), `src/pages/en/index.astro` (EN).

**Warning signs:** RO URLs showing `/ro/` prefix in browser. Build generating both `/` and `/ro/` routes for the same page.

### Pitfall 2: Language Switcher Sends Users to Homepage

**What goes wrong:** The language switcher redirects to `isio.ro/` (RO) or `isio.ro/en/` (EN) instead of the equivalent page in the target locale. A user on `/servicii/seo` switching to English lands on `/en/` instead of `/en/services/seo`.

**Why it happens:** Astro's `getRelativeLocaleUrl()` generates a locale-prefixed URL from an existing path, but it does not know the *translated slug* for the target locale. Since slugs are translated (D-05), mapping `/servicii/seo` → `/en/services/seo` requires a lookup, not a prefix transform.

**How to avoid:** Implement a `localePath(currentSlug, targetLocale)` utility that maps each RO slug to its EN equivalent and vice versa. Store the slug mappings in a static object or in the Sanity document (add `slugRo` and `slugEn` fields to service and page schemas).

**Warning signs:** Language switcher always landing on homepage regardless of current page. i18n audit showing no return hreflang tags.

### Pitfall 3: Stale Content from Webhook Failure (No Fallback)

**What goes wrong:** A Sanity webhook fails to deliver (network timeout, misconfiguration). The live site continues serving outdated pricing or portfolio data. There is no visual error — the site looks fine to the developer.

**Why it happens:** Webhooks deliver once with no automatic retry in Sanity's free tier. A single delivery failure means no rebuild occurs. The problem is invisible until a client or admin notices stale data.

**How to avoid:**
- Monitor Sanity webhook delivery logs (Sanity dashboard → API → Webhooks → delivery log)
- Set a scheduled daily Cloudflare Workers cron trigger as a fallback safety net
- Test the webhook pipeline end-to-end before any CMS-driven content goes live (Phase 1 success criterion)

**Warning signs:** Price changes in Sanity not appearing on live site after 15 minutes. No new Cloudflare deploy visible after a Sanity publish event.

### Pitfall 4: Sanity Draft Documents in Production Build

**What goes wrong:** GROQ queries without a `perspective: 'published'` filter return draft documents (those with `_id` beginning with `drafts.`). Unpublished content appears on the live site.

**Why it happens:** Old Sanity API versions defaulted to the `raw` perspective, which included drafts. It was a common manual filter requirement.

**How to avoid:** Use Sanity API version `2025-02-19` or later, which defaults to `published` perspective. This filter is now automatic. If using an older API version explicitly, add `!(_id in path("drafts.**"))` to all GROQ queries.

**Warning signs:** Draft service descriptions or unpublished pricing appearing on the built site.

### Pitfall 5: Missing hreflang Return Tags

**What goes wrong:** Page A declares a hreflang pointing to Page B, but Page B does not declare a reciprocal hreflang pointing back to Page A. Google treats this as an invalid hreflang pair and ignores both. This is worse for SEO than no hreflang at all.

**Why it happens:** The hreflang pattern requires each page variant to explicitly list ALL locale alternates, including itself. It is easy to generate hreflang on only one side (e.g., only adding it to EN pages).

**How to avoid:** The Base layout component injects hreflang for both locales on every page, regardless of the current page's locale. Use `astro-seo`'s `languageAlternates` prop with an array that always includes both `ro` and `en` alternates plus `x-default`.

**Warning signs:** Google Search Console reporting "Missing hreflang return tag" errors. Sitemap only listing one locale's URLs.

### Pitfall 6: Cloudflare Workers Static Assets Confusion

**What goes wrong:** Developer uses `output: 'static'` (no adapter) and tries to deploy to Cloudflare Workers, then discovers static-only builds don't support the API routes needed in Phase 3. Or uses Cloudflare Pages instead of Workers and hits the adapter incompatibility when adding SSR routes.

**Why it happens:** The prior research referenced Cloudflare Pages as the deployment target. As of Astro 6, the `@astrojs/cloudflare` adapter no longer supports Cloudflare Pages — Workers is the correct target for any project using the adapter.

**How to avoid:** Use `output: 'server'` + `@astrojs/cloudflare` adapter from Phase 1. All static pages use `export const prerender = true`. Deploy to Cloudflare Workers (not Pages). Static assets served from Workers are free and unlimited — no cost difference for static content.

**Warning signs:** Deployment errors when using `@astrojs/cloudflare` adapter pointed at a Pages project. Adapter documentation showing Pages is no longer supported.

---

## Code Examples

Verified patterns from official sources:

### Sanity Client Setup (Build-Time)

```typescript
// src/lib/sanity.ts
// Source: https://www.sanity.io/plugins/sanity-astro
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2025-02-19',   // Defaults perspective to 'published' — drafts filtered automatically
  useCdn: false,               // REQUIRED for build-time SSG — forces API call, not CDN cache
  token: import.meta.env.SANITY_API_READ_TOKEN,   // Read-only token for non-public datasets
});
```

### Sanity Service Schema (Bilingual Per-Field)

```typescript
// sanity/schemaTypes/service.ts
export default {
  name: 'service',
  type: 'document',
  fields: [
    { name: 'slug', type: 'object', fields: [
        { name: 'ro', type: 'string' },   // e.g. "servicii/seo"
        { name: 'en', type: 'string' },   // e.g. "services/seo"
    ]},
    { name: 'title', type: 'object', fields: [
        { name: 'ro', type: 'string' },
        { name: 'en', type: 'string' },
    ]},
    { name: 'description', type: 'object', fields: [
        { name: 'ro', type: 'text' },
        { name: 'en', type: 'text' },
    ]},
    { name: 'metaTitle', type: 'object', fields: [
        { name: 'ro', type: 'string' },
        { name: 'en', type: 'string' },
    ]},
    { name: 'metaDescription', type: 'object', fields: [
        { name: 'ro', type: 'string' },
        { name: 'en', type: 'string' },
    ]},
  ],
};
```

### Language Switcher with Slug Mapping

```astro
---
// src/components/layout/LanguageSwitcher.astro
interface Props {
  currentLocale: 'ro' | 'en';
  roSlug: string;
  enSlug: string;
}
const { currentLocale, roSlug, enSlug } = Astro.props;
---
<nav aria-label="Language switcher">
  <a
    href={roSlug}
    aria-current={currentLocale === 'ro' ? 'page' : undefined}
    lang="ro"
    hreflang="ro"
  >RO</a>
  <a
    href={`/en${enSlug}`}
    aria-current={currentLocale === 'en' ? 'page' : undefined}
    lang="en"
    hreflang="en"
  >EN</a>
</nav>
```

### Paraglide JS v2 Vite Plugin Setup

```javascript
// astro.config.mjs
import { paraglideVitePlugin } from '@inlang/paraglide-js';

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',    // Generated type-safe functions go here
      }),
    ],
  },
});
```

```json
// src/i18n/messages/ro.json
{
  "nav.services": "Servicii",
  "nav.portfolio": "Portofoliu",
  "nav.pricing": "Prețuri",
  "nav.about": "Despre",
  "nav.contact": "Contact",
  "nav.bookCall": "Programează un apel"
}
```

### robots.txt (Static File)

```
# public/robots.txt
User-agent: *
Allow: /

# Block Studio from indexing
Disallow: /studio/
Disallow: /studio

Sitemap: https://isio.ro/sitemap-index.xml
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `output: 'hybrid'` in Astro | `output: 'server'` + `prerender = true` per page | Astro v5 | The `hybrid` mode was removed; static/dynamic mixing is now via per-page opt-in |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` Vite plugin | Astro 5.2 (2024) | `@astrojs/tailwind` deprecated; v4 is Vite-native, no config file needed |
| Deploy to Cloudflare Pages (SSR) | Deploy to Cloudflare Workers | Astro 6 (2026) | `@astrojs/cloudflare` adapter dropped Pages support; Workers is recommended for new projects |
| `@inlang/paraglide-astro` adapter | `@inlang/paraglide-js` with Vite plugin | Paraglide JS v2 | Astro adapter package no longer needed; use core package directly |
| Sanity GROQ default perspective `raw` | Default perspective `published` | Sanity API 2025-02-19 | Draft documents automatically excluded; no need for manual `!(_id in path("drafts.**"))` filter when using current API version |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Deprecated since Astro 5.2 — do not install
- `@inlang/paraglide-astro`: Superseded by Paraglide JS v2 core package
- `astro-i18next`: Archived, unmaintained — do not install
- `output: 'hybrid'`: Removed from Astro — replaced by `output: 'server'` + `prerender = true`

---

## Open Questions

1. **Cloudflare Workers deploy hook URL format**
   - What we know: Cloudflare Pages deploy hooks exist and accept POST requests. Workers deploy hooks also exist via Wrangler CI/CD.
   - What's unclear: Whether "deploy hook" for Workers uses the same dashboard UI flow as Pages deploy hooks, or whether the CI/CD trigger is configured differently (e.g., via GitHub Actions + `wrangler deploy`).
   - Recommendation: Set up a GitHub Actions workflow with `wrangler deploy` triggered on push to `main`, and use Sanity webhook → GitHub Actions webhook as the rebuild trigger. This is well-documented and avoids Cloudflare-specific deploy hook nuances.

2. **`@sanity/astro` version compatibility with Astro 6**
   - What we know: `@sanity/astro` v4.x is the current major version. Astro 6 is new (early 2026).
   - What's unclear: Whether `@sanity/astro` v4 explicitly supports Astro 6's adapter architecture or if there are compatibility issues.
   - Recommendation: Check `@sanity/astro` changelog and peer dependencies at install time. If there are Astro 6 issues, the fallback is using `@sanity/client` directly without the `@sanity/astro` integration wrapper.

3. **Paraglide JS v2 project.inlang directory setup**
   - What we know: Paraglide v2 uses a `project.inlang` directory with a `settings.json` file for language configuration.
   - What's unclear: Exact setup steps for `project.inlang/settings.json` in a new Astro project.
   - Recommendation: Use the `npx @inlang/paraglide-js init` CLI to scaffold the project config, then add the Vite plugin manually.

---

## Validation Architecture

> `workflow.nyquist_validation` is `false` in `.planning/config.json`. This section is skipped per config.

---

## Sources

### Primary (HIGH confidence)

- [Astro i18n routing docs](https://docs.astro.build/en/guides/internationalization/) — `prefixDefaultLocale: false`, locale folder structure, fallback behavior in SSG
- [Astro Cloudflare integration docs](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) — Workers-only for adapter, Pages no longer supported; `output: 'server'` + `prerender = true` pattern
- [Astro deploy to Cloudflare guide](https://docs.astro.build/en/guides/deploy/cloudflare/) — Workers as recommended new-project deployment target
- [@sanity/astro plugin docs](https://www.sanity.io/plugins/sanity-astro) — direct `sanityClient.fetch()` as current integration pattern; no Content Layer loader yet
- [Sanity perspectives docs](https://www.sanity.io/docs/content-lake/perspectives) — API version 2025-02-19 changes default to `published`
- [Cloudflare Pages deploy hooks docs](https://developers.cloudflare.com/pages/configuration/deploy-hooks/) — POST URL trigger for Sanity webhook integration
- [astro-seo npm](https://www.npmjs.com/package/astro-seo) — v1.1.0, actively maintained (last published ~January 2026)
- [Astro Upgrade to v6 docs](https://docs.astro.build/en/guides/upgrade-to/v6/) — `redirectToDefaultLocale` behavior change, removal of `hybrid` output

### Secondary (MEDIUM confidence)

- [@inlang/paraglide-js npm](https://www.npmjs.com/package/@inlang/paraglide-js) — v2.15.0, `@inlang/paraglide-astro` adapter no longer needed in v2
- [Sanity GROQ-powered webhooks docs](https://www.sanity.io/docs/content-lake/webhooks) — webhook trigger events, dataset filtering
- [Cloudflare Workers static assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) — confirmed static asset requests are free and unlimited on Workers
- [InfoQ: Astro 6 Beta announcement](https://www.infoq.com/news/2026/02/astro-v6-beta-cloudflare/) — Workers first-class support, Cloudflare acquisition context

### Tertiary (LOW confidence)

- `@sanity/astro` Astro 6 compatibility: No explicit version compatibility table found; peer dependency check required at install time — flag for Wave 0 verification

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Core packages confirmed via official docs; versions verified
- Architecture: HIGH — i18n file structure and Astro config confirmed via official docs; Cloudflare adapter change confirmed
- Pitfalls: HIGH (i18n slug mapping, webhook failure, draft documents) / MEDIUM (Cloudflare Workers nuances)

**Research date:** 2026-03-21
**Valid until:** 2026-04-21 (30 days — stable stack; main risk is `@sanity/astro` Astro 6 compatibility status changing)
