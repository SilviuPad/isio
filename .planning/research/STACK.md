# Stack Research

**Domain:** Web Services Agency Platform (bilingual marketing site + headless CMS admin)
**Researched:** 2026-03-21
**Confidence:** HIGH (core framework/tooling), MEDIUM (document generation, booking)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | ^6.0 | Static site framework for public marketing pages | Zero-JS by default means perfect Lighthouse scores out of the box. First-class SEO. Built-in i18n routing as of v4. Official Vercel/Cloudflare integrations. 900k+ weekly downloads — ecosystem velocity is high. Requires Node 22+. |
| Tailwind CSS | ^4.2 | Utility-first styling | v4 ships with a Vite plugin that integrates natively with Astro 5.2+. No config file needed — zero-config auto-detection. Up to 5x faster full builds than v3. `@astrojs/tailwind` integration is now deprecated; use `@tailwindcss/vite` directly. |
| Sanity CMS | v3 (latest) | Headless CMS for content + admin panel | Official `@sanity/astro` plugin with Astro Content Layer support. Managed cloud (no DevOps burden for solo dev). Generous free tier (500k API calls/month, 20 seats). GROQ query language is precise and fast. Studio is the best-in-class editorial UI out of the box. Zero hosting/database management overhead — correct tradeoff for a solo developer who doesn't want DevOps. |
| Cloudflare Pages | — | Hosting and CDN | Unlimited bandwidth on free tier (Vercel caps at 100 GB/month). Global CDN, DDoS protection, SSL, and WAF included free. Astro 6 has first-class Cloudflare Workers support and runtime parity between dev and prod. Best cost profile for a public-facing agency site that may spike on traffic. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `astro-seo` | ^0.8 | SEO meta tag component | Use in the base layout to inject title, description, OG tags, Twitter cards, canonical URLs, and hreflang alternates for bilingual pages. Wraps dozens of meta tags into one typed component — do not hand-write meta tags. |
| `@astrojs/sitemap` | latest | Automatic sitemap generation | Required for Lighthouse SEO score and indexing. Plug-and-play with Astro; configure `i18n` locales so `/ro/` and `/en/` pages both appear. |
| `@astrojs/image` | built into Astro core | Image optimization | Astro's built-in `<Image />` component handles WebP conversion, lazy loading, and sizing. Do not install a separate image library. |
| `@astrojs/partytown` | latest | Third-party script isolation | If Google Analytics or Tag Manager is added later, Partytown offloads those scripts to a web worker so they do not block the main thread or hurt Lighthouse scores. |
| Paraglide JS | ^1.x | Type-safe i18n message catalog | Use alongside Astro's built-in i18n routing. Astro handles URL routing (`/ro/`, `/en/`); Paraglide handles typed translation strings in components. Converts i18n keys into TypeScript functions — broken keys fail the build rather than silently rendering wrong. |
| `@react-pdf/renderer` | ^4.3 | Bilingual PDF document generation | Generate proposals, contracts, invoices, and reports as downloadable PDFs directly in Node.js. React-component-based layout API is far easier than low-level pdfkit or pdf-lib for structured business documents. Supports custom fonts (required for Romanian diacritics). 1.4M weekly downloads, actively maintained. |
| Cal.com embed | cloud-hosted | Discovery call booking synced to Google Calendar | Cal.com is open-source, Google Calendar two-way sync is native, and the embed widget can be dropped into an Astro page as an island. Avoid building a custom booking form and Google Calendar API integration — Cal.com solves this completely. Use the hosted cloud plan (free for solo) to avoid self-hosting complexity. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Node.js 22 LTS | Runtime | Astro 6 dropped support for Node 18 and 20. Minimum: v22.12.0. Use nvm or Volta to pin the version. |
| TypeScript | Type safety | Astro ships with TypeScript support out of the box. Sanity and Payload both generate types from schema. Strongly prefer `.ts` and `.astro` files over plain JS throughout. |
| Biome | Linting + formatting | Replaces ESLint + Prettier in one faster tool. Zero config for most projects. Use instead of configuring two separate tools. |
| Vitest | Unit testing | Native to Vite-based projects (Astro uses Vite). Use for testing PDF generation logic, i18n utilities, and any data transformation functions. |
| Sanity CLI | Studio development | `@sanity/cli` for local Studio dev server and dataset management. The Studio is a React app deployed separately from the Astro site. |

---

## Installation

```bash
# Create Astro project
npm create astro@latest

# Core dependencies
npm install astro-seo @astrojs/sitemap @astrojs/partytown

# Tailwind CSS v4 (via Vite plugin — NOT @astrojs/tailwind)
npm install tailwindcss @tailwindcss/vite

# Paraglide JS (i18n)
npm install @inlang/paraglide-astro

# Sanity CMS
npm install @sanity/astro @sanity/client sanity

# PDF generation
npm install @react-pdf/renderer react react-dom

# Dev dependencies
npm install -D typescript @types/react @types/react-dom vitest @biomejs/biome
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro 6 | Next.js 15 | If you need a full React SPA with real-time data, client-side auth, or complex interactive dashboards. Overkill for a mostly-static marketing site and actively harmful to Lighthouse scores without careful configuration. |
| Astro 6 | SvelteKit | If the developer is already deeply invested in Svelte. Svelte's performance is comparable but its ecosystem (especially CMS integrations) is smaller. |
| Sanity CMS | Payload CMS 3 | If you have DevOps comfort, want zero ongoing SaaS cost, and need a deeply customized admin panel with code-first schema. Payload runs as a Next.js app with its own database — adds infrastructure complexity unsuitable for a solo-dev-managed agency site. |
| Sanity CMS | Strapi | Strapi v5 is self-hosted by default, adding server management overhead. Sanity's managed cloud is the correct tradeoff here. |
| Cloudflare Pages | Vercel | If Vercel's DX (preview deployments, built-in analytics) is prioritized over bandwidth cost. Vercel is excellent but caps free bandwidth at 100 GB/month — risky for a public agency site. |
| Tailwind CSS v4 | CSS Modules | CSS Modules are valid but require more boilerplate. Tailwind's mobile-first utilities align directly with the project's design-first constraint. |
| Cal.com (hosted) | Custom Google Calendar API form | A custom integration requires OAuth flow, token refresh, availability logic, timezone handling, and error handling. Cal.com eliminates all of that. Do not build this from scratch. |
| @react-pdf/renderer | Puppeteer HTML-to-PDF | Puppeteer spins up a headless Chromium instance — overkill for structured business documents and adds significant cold start time. Use Puppeteer only if pixel-perfect HTML rendering is required. For invoices and contracts, React PDF's layout model is sufficient and faster. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@astrojs/tailwind` (v6+ deprecation) | Officially deprecated as of Astro 5.2. Will not receive new features and is not recommended for new projects. | `@tailwindcss/vite` Vite plugin — the official v4 path |
| `astro-i18next` | Archived — no commits in 1+ year, many open issues. Community has moved on. | Astro built-in i18n routing + Paraglide JS |
| `jsPDF` | Browser-only, limited layout control, no RTL/diacritic support out of the box. | `@react-pdf/renderer` for server-side structured PDF generation |
| WordPress | Handles CMS + frontend as a monolith — incompatible with static-first architecture. No SSG output without plugins. | Astro + Sanity |
| Contentful | Free tier is much more restrictive than Sanity (5,000 records, 3 users). Sanity's GROQ is also a better DX than Contentful's REST/GraphQL. | Sanity CMS |
| Calendly | Paid SaaS with no self-host option. Cal.com provides identical functionality on free tier with Google Calendar sync. | Cal.com hosted (free) |
| Prisma / custom database | There is no relational data owned by this project — content lives in Sanity's Content Lake. Adding a database layer (even for bookings) adds infrastructure complexity with zero benefit over Cal.com + Sanity. | Sanity for content, Cal.com for bookings |
| Next.js App Router | Requires a Node.js server for SSR, complicating static deployment. For a marketing site that needs perfect Lighthouse scores, Astro's SSG is the correct tool — not Next.js with ISR tuning. | Astro 6 |

---

## Stack Patterns by Variant

**For the public marketing site (astro site):**
- Use Astro SSG (static output) for all pages — no server adapter needed on Cloudflare Pages for a fully static build
- Use Astro's built-in i18n routing: `/en/` and `/ro/` route prefixes
- Use Paraglide JS for typed translation strings in components
- Use Sanity Content Layer API to pull content at build time

**For the admin / CMS:**
- Use Sanity Studio deployed to `studio.isio.ro` (or a subdomain) — separate deployment from the Astro site
- Webhooks from Sanity trigger Cloudflare Pages rebuild on content publish

**For booking:**
- Embed Cal.com widget as an Astro island (client-side component) inside the contact/booking page
- Google Calendar two-way sync configured in Cal.com dashboard — no custom code

**For document generation:**
- Run `@react-pdf/renderer` in a Node.js Cloudflare Worker or local script
- Generate PDFs from a template component with locale prop (`ro` or `en`) — language drives which string set is used
- Export PDFs on demand, not at build time

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Astro ^6.0 | Node.js >=22.12.0 | Node 18/20 no longer supported |
| Tailwind CSS ^4.2 | Astro >=5.2 (Vite plugin path) | Use `@tailwindcss/vite`, not `@astrojs/tailwind` |
| @sanity/astro | Astro 5+ and 6 | Uses Astro Content Layer API; requires Astro 4.14+ |
| @react-pdf/renderer ^4.3 | React 18+ | Works in Node.js (Cloudflare Worker or local script); no browser dependency required for server-side generation |
| Paraglide JS | Astro 4+ | Works alongside Astro's built-in i18n routing, not instead of it |

---

## Sources

- [Astro 6.0 official release blog](https://astro.build/blog/astro-6/) — framework version and Node 22 requirement (HIGH confidence)
- [Tailwind CSS v4.0 release blog](https://tailwindcss.com/blog/tailwindcss-v4) — v4 Vite plugin as official integration path (HIGH confidence)
- [Astro 5.2 blog — Tailwind v4 support](https://astro.build/blog/astro-520/) — `@astrojs/tailwind` deprecation, `@tailwindcss/vite` as replacement (HIGH confidence)
- [Astro built-in i18n docs](https://docs.astro.build/en/guides/internationalization/) — routing strategy (HIGH confidence)
- [Astro + Sanity CMS docs](https://docs.astro.build/en/guides/cms/sanity/) — official integration guide (HIGH confidence)
- [Sanity pricing page](https://www.sanity.io/pricing) — free tier limits (MEDIUM confidence — pricing can change)
- [Sanity vs Payload hosted vs self-hosted guide](https://www.buildwithmatija.com/blog/sanity-vs-payload-hosted-vs-self-hosted-cms-decision-tree) — CMS selection rationale (MEDIUM confidence)
- [PayloadCMS + AstroJS 2025 analysis](https://makersden.io/blog/is-payloadcms-with-astros-the-killer-marketing-site-combo-of-2025) — Payload Astro integration patterns (MEDIUM confidence)
- [Cloudflare Pages vs Vercel free tier comparison](https://www.freetiers.com/blog/vercel-vs-cloudflare-pages-comparison) — bandwidth and hosting cost (MEDIUM confidence)
- [Astro on Vercel official docs](https://vercel.com/docs/frameworks/frontend/astro) — confirmed Vercel free tier limits (HIGH confidence)
- [Cal.com open-source scheduling](https://cal.com/) — Google Calendar sync, embed widget, free tier (HIGH confidence)
- [@react-pdf/renderer npm](https://www.npmjs.com/package/@react-pdf/renderer) — v4.3.2, 1.4M weekly downloads (HIGH confidence)
- [astro-seo GitHub](https://github.com/jonasmerlin/astro-seo) — 136k weekly downloads, last version June 2024 (MEDIUM confidence — verify active maintenance before using)
- [Paraglide JS vs astro-i18next comparison](https://phrase.com/blog/posts/astrojs-localization-multilingual-static-sites/) — type-safe i18n recommendation (MEDIUM confidence)

---

*Stack research for: Isio — Web Services Agency Platform*
*Researched: 2026-03-21*
