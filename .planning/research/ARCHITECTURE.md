# Architecture Research

**Domain:** Web Services Agency Platform (solo developer, bilingual, static-first)
**Researched:** 2026-03-21
**Confidence:** HIGH (Astro docs confirmed, CMS patterns confirmed via official sources)

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                     PUBLIC LAYER (CDN-served)                         │
│                                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │ /ro/*       │  │ /en/*       │  │ /ro/rezerva │  │ Portfolio  │  │
│  │ Marketing   │  │ Marketing   │  │ /en/booking │  │ Grid       │  │
│  │ Static SSG  │  │ Static SSG  │  │ (SSR route) │  │ Static SSG │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬──────┘  │
│         │                │                │               │          │
├─────────┴────────────────┴────────────────┴───────────────┴──────────┤
│                     ASTRO RUNTIME LAYER                               │
│                                                                       │
│  ┌────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │  Build-time Content    │  │  Server API Routes (SSR)            │  │
│  │  Collections           │  │  /api/booking  /api/generate-pdf   │  │
│  │  (Sanity → Astro)      │  │  /api/contact  /api/calendar       │  │
│  └────────────┬───────────┘  └──────────────────┬──────────────────┘  │
├───────────────┴──────────────────────────────────┴────────────────────┤
│                     CONTENT + ADMIN LAYER                             │
│                                                                       │
│  ┌───────────────────┐  ┌───────────────────┐  ┌──────────────────┐  │
│  │  Sanity Studio    │  │  Sanity Content   │  │ Admin-only Data  │  │
│  │  /studio route    │  │  Lake (Cloud)     │  │ (clients,        │  │
│  │  (hosted in Astro)│  │  GROQ API         │  │  deadlines,      │  │
│  └───────────────────┘  └─────────┬─────────┘  │  documents)      │  │
│                                   │            └──────────────────┘  │
├───────────────────────────────────┴────────────────────────────────────┤
│                     EXTERNAL INTEGRATIONS                              │
│                                                                        │
│  ┌─────────────────┐  ┌──────────────────┐  ┌───────────────────────┐ │
│  │ Google Calendar │  │ Email Provider   │  │ Hosting / CDN         │ │
│  │ API (OAuth2)    │  │ (Resend/SendGrid)│  │ (Netlify or Vercel)   │ │
│  └─────────────────┘  └──────────────────┘  └───────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Static Marketing Pages | Service pages, pricing, portfolio, homepage | Astro `.astro` files, SSG at build time |
| i18n Router | Language routing /ro/* and /en/*, hreflang tags | Astro built-in i18n (`locales`, `defaultLocale`) |
| Booking Form | Collect discovery call requests from visitors | Astro Island (React component) + /api/booking SSR route |
| Calendar Sync | Create events in Google Calendar on booking | Astro server API route with googleapis Node SDK |
| Sanity Studio | Admin UI for all content editing | Sanity Studio v3 embedded at `/studio` path |
| Content Collections | Build-time typed access to CMS data | Astro content layer + sanity-astro loader |
| Client Tracker | Store client info, deadlines, project state | Sanity collections (Clients, Projects, Deadlines) |
| Document Generator | Generate bilingual PDF proposals/contracts/invoices | Node-side @react-pdf/renderer in API route |
| Email Dispatch | Notify admin of bookings, send documents to clients | Resend SDK called from API routes |
| CDN/Hosting | Serve static assets, run SSR functions | Netlify or Vercel (with adapter) |

## Recommended Project Structure

```
isio/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Default locale redirect
│   │   ├── ro/                      # Romanian pages (default locale, no prefix)
│   │   │   ├── index.astro          # Homepage RO
│   │   │   ├── servicii/            # Services
│   │   │   ├── portofoliu.astro     # Portfolio
│   │   │   ├── pret.astro           # Pricing
│   │   │   └── rezervare.astro      # Booking page (SSR)
│   │   ├── en/                      # English pages
│   │   │   ├── index.astro          # Homepage EN
│   │   │   ├── services/
│   │   │   ├── portfolio.astro
│   │   │   ├── pricing.astro
│   │   │   └── booking.astro        # Booking page (SSR)
│   │   └── api/                     # Server API routes (all SSR)
│   │       ├── booking.ts           # POST: form → Calendar + email
│   │       ├── contact.ts           # POST: contact form → email
│   │       ├── generate-pdf.ts      # POST: document type + data → PDF
│   │       └── calendar-check.ts    # GET: available slots
│   ├── components/
│   │   ├── ui/                      # Shared UI primitives
│   │   ├── marketing/               # Page-specific sections
│   │   ├── booking/                 # Booking form Island (React)
│   │   └── layout/                  # Header, Footer, LanguageSwitcher
│   ├── i18n/
│   │   ├── ro.json                  # Romanian UI strings
│   │   ├── en.json                  # English UI strings
│   │   └── utils.ts                 # getTranslation(), locale helpers
│   ├── lib/
│   │   ├── google-calendar.ts       # Google Calendar API client
│   │   ├── pdf-generator.ts         # @react-pdf/renderer templates
│   │   ├── email.ts                 # Resend email helpers
│   │   └── sanity.ts                # Sanity client + GROQ queries
│   ├── content/
│   │   └── config.ts                # Astro content collections schema
│   └── layouts/
│       ├── Base.astro               # HTML shell, meta, hreflang
│       └── Page.astro               # Page chrome with nav/footer
├── sanity/
│   ├── schemaTypes/                 # Sanity schema definitions
│   │   ├── service.ts
│   │   ├── portfolioItem.ts
│   │   ├── pricingTier.ts
│   │   ├── client.ts                # Admin: client records
│   │   ├── project.ts               # Admin: project + deadlines
│   │   └── document.ts             # Admin: generated doc references
│   └── sanity.config.ts             # Studio configuration
├── astro.config.mjs                 # i18n, adapters, integrations
├── sanity.cli.ts
└── package.json
```

### Structure Rationale

- **src/pages/ro/ and src/pages/en/:** Astro's built-in i18n requires locale folders matching `locales` config — this avoids third-party routing libraries and gets hreflang for free.
- **src/pages/api/:** Server-only endpoints. These require an SSR adapter (Netlify/Vercel). They handle all side-effects: calendar writes, email sends, PDF generation. Public pages remain static.
- **src/lib/:** Third-party client wrappers isolated here. If Google Calendar SDK changes or you swap Resend for another provider, only one file changes.
- **sanity/schemaTypes/:** Separating admin schemas (client, project, document) from public schemas (service, portfolio, pricing) makes it clear what is visitor-facing vs. internal.
- **src/i18n/:** UI strings (button labels, form errors, nav items) stored separately from CMS content. CMS handles translated page content; these JSON files handle translated UI chrome.

## Architectural Patterns

### Pattern 1: Static-First with Selective SSR Islands

**What:** Default all pages to SSG (prerendered HTML at build time). Only routes that need server-side secrets or form handling get `export const prerender = false`.

**When to use:** Always. This is the correct default for Isio — the vast majority of the site is marketing content that never changes between builds.

**Trade-offs:** Build required for content changes (acceptable — Sanity webhook triggers Netlify rebuild in ~30s). API routes run as serverless functions per-request (minimal cold start on Netlify).

**Example:**
```typescript
// src/pages/api/booking.ts — only this file runs server-side
export const prerender = false;

export async function POST({ request }) {
  const data = await request.formData();
  // create Google Calendar event, send email
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
// All .astro pages without this export are static HTML at build time
```

### Pattern 2: CMS-Driven Content with Build-Time Typing

**What:** Sanity content is fetched at build time via the Astro content layer (sanity-astro loader). Types are inferred from Sanity schemas, giving full TypeScript safety in `.astro` files.

**When to use:** All public content — services, portfolio, pricing tiers, testimonials. Not for admin-only data (client records, deadlines) which stays in Sanity and is accessed only through the Studio UI.

**Trade-offs:** Content updates require a rebuild. Webhook from Sanity to Netlify/Vercel triggers automatic rebuild on publish. For a low-traffic agency site this latency is irrelevant.

**Example:**
```typescript
// src/content/config.ts
import { defineCollection } from 'astro:content';
import { sanityLoader } from 'sanity-astro/loaders';

export const collections = {
  services: defineCollection({
    loader: sanityLoader({ query: `*[_type == "service"]` }),
  }),
};
```

### Pattern 3: Bilingual via Astro Built-in i18n (Folder-based)

**What:** Two locale folders (`ro/` as default, `en/`) with Astro's built-in i18n routing. UI strings in JSON translation files. CMS content has RO and EN fields on each document.

**When to use:** Simpler than a translation library for a two-language static site. No runtime i18n overhead. Each locale gets its own pre-built HTML file.

**Trade-offs:** Each new page must be created in both locale folders. Manageable for a solo dev with this small page count. Ensures both locales are always deployed even if one translation is incomplete (fallback can redirect to RO).

**Configuration:**
```javascript
// astro.config.mjs
export default defineConfig({
  i18n: {
    locales: ['ro', 'en'],
    defaultLocale: 'ro',
    routing: { prefixDefaultLocale: false }, // /about = RO, /en/about = EN
    fallback: { en: 'ro' },
  },
});
```

### Pattern 4: PDF Generation in Server API Route

**What:** A POST endpoint receives document type and structured data, renders a React component tree with `@react-pdf/renderer`, and returns a binary PDF response.

**When to use:** Bilingual document generation (proposals, contracts, invoices). Triggered from Sanity Studio or admin UI — not from the public site.

**Trade-offs:** `@react-pdf/renderer` runs server-side only (correct — no browser needed). PDF templates are React components, so they can be parameterized by locale. Puppeteer is overkill and adds a headless Chrome dependency — avoid it.

**Example:**
```typescript
// src/pages/api/generate-pdf.ts
export const prerender = false;

export async function POST({ request }) {
  const { type, data, locale } = await request.json();
  const { renderToBuffer } = await import('@react-pdf/renderer');
  const template = locale === 'en' ? InvoiceEN : InvoiceRO;
  const pdf = await renderToBuffer(<template data={data} />);
  return new Response(pdf, {
    headers: { 'Content-Type': 'application/pdf' },
  });
}
```

## Data Flow

### Booking Form Flow

```
Visitor fills form (React Island)
    |
    v POST /api/booking
    |
    +--> Validate fields
    |
    +--> googleapis: create Calendar event (OAuth2 service account)
    |
    +--> Resend: email confirmation to visitor
    |
    +--> Resend: email notification to admin
    |
    v Return { success: true } → UI shows confirmation
```

### Content Update Flow (CMS to Site)

```
Admin edits in Sanity Studio (/studio)
    |
    v Publish document
    |
    v Sanity fires webhook → Netlify/Vercel build hook
    |
    v Astro build runs: fetches all Sanity content via GROQ
    |
    v Static HTML generated for /ro/* and /en/* pages
    |
    v CDN cache cleared → visitors get updated content (~30s total)
```

### Document Generation Flow

```
Admin in Sanity Studio opens client record
    |
    v Clicks "Generate Proposal" (custom Sanity Studio action)
    |
    v POST /api/generate-pdf { type: "proposal", clientId, locale }
    |
    v API route fetches client + project data from Sanity
    |
    v @react-pdf/renderer renders bilingual template
    |
    v Returns PDF binary → browser downloads file
    |
    (optional) Resend: email PDF to client
```

### i18n Content Flow

```
                    Sanity Content Lake
                          |
               ┌──────────┴──────────┐
               | GROQ at build time  |
               └──────────┬──────────┘
                          |
          ┌───────────────┴───────────────┐
          |                               |
    /ro/servicii/                    /en/services/
    (RO fields from CMS)             (EN fields from CMS)
    + ro.json UI strings             + en.json UI strings
          |                               |
    Pre-built HTML                  Pre-built HTML
    served from CDN                 served from CDN
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Sanity Content Lake | GROQ API at build time (content layer loader) + Studio at `/studio` | Free tier handles this site's volume; webhook triggers rebuild on publish |
| Google Calendar API | OAuth2 service account; googleapis SDK in Astro API route | Use service account (not user OAuth flow) for unattended server-side access; store credentials in env vars |
| Email (Resend) | REST SDK in Astro API routes; called after booking or doc send | Resend free tier: 3,000 emails/month — more than sufficient for a solo agency |
| Netlify / Vercel | SSG output + serverless functions for SSR routes; build hooks for CMS updates | Netlify preferred for commercial-friendly free tier; either works with Astro adapter |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Public pages → Sanity | Build-time GROQ fetch only; no runtime CMS calls from public pages | Prevents API key exposure; all data is baked into HTML at build |
| API routes → External services | Server-side only; secrets in environment variables | `GOOGLE_CALENDAR_CREDENTIALS`, `RESEND_API_KEY`, `SANITY_API_TOKEN` never touch the browser |
| Sanity Studio → Admin data | Studio directly reads/writes Sanity via its own authenticated session | Client records, deadlines, and document refs live in Sanity as admin-only collections with restricted access policies |
| Booking form Island → API | React Island POSTs to `/api/booking`; receives JSON response | The Island is the only interactive JavaScript on the public site; all other pages ship zero JS |

## Suggested Build Order

This order respects dependency relationships — each phase can be built and tested independently.

| Phase | Components | Rationale |
|-------|------------|-----------|
| 1. Foundation | Astro project setup, i18n config, base layouts, locale routing, deploy pipeline | Every other component depends on routing and deploy working. Sanity integration comes next. |
| 2. CMS + Content | Sanity Studio setup, public schemas (service, portfolio, pricing), Astro content collections, static pages | Establishes the content backbone. Bilingual static pages can be built end-to-end once this works. |
| 3. Public Site | Homepage, service pages, portfolio grid, pricing tiers — all bilingual | Pure SSG, no server dependencies. Can deploy and get real Lighthouse scores early. |
| 4. Booking + Calendar | Booking form Island, `/api/booking` route, Google Calendar integration, email notifications | First SSR component. Isolated — only one API route. Validate Calendar auth separately before wiring form. |
| 5. Document Generation | Admin schemas (client, project), `/api/generate-pdf` route, bilingual PDF templates | Depends on Sanity admin schemas and PDF library being wired. No public-facing dependencies. |
| 6. Admin Enhancements | Client deadline tracker in Sanity, Sanity Studio customization, document management workflow | Polish phase — Sanity Studio custom actions, dashboard views. No new integrations. |

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-50 clients (current) | Monorepo is fine. Sanity free tier + Netlify free tier. Single admin user. Zero ops overhead. |
| 50-500 clients | Sanity Growth plan for larger content quotas. Move to paid Netlify for more build minutes. Consider dedicated project management tool if Sanity admin collections feel cramped. |
| 500+ clients | At this point the business model has fundamentally changed — it's no longer "solo developer." Evaluate Payload CMS for a custom admin panel with richer workflow automation. |

For Isio v1, this site will never approach a scaling problem. The architecture is deliberately chosen to have near-zero operational overhead.

## Anti-Patterns

### Anti-Pattern 1: Server-Rendering All Pages for "Simplicity"

**What people do:** Set `output: 'server'` globally to avoid thinking about which pages need SSR.

**Why it's wrong:** Eliminates Astro's core advantage — pre-built static HTML served from CDN. Every page visit becomes a cold serverless function call. SEO performance suffers. Lighthouse scores drop.

**Do this instead:** Default output stays `'static'`. Only `/api/*` routes and the booking page have `prerender = false`. Everything else is HTML.

### Anti-Pattern 2: Storing Admin Data Outside the CMS

**What people do:** Build a separate database (Postgres, Supabase) for client records and deadlines because "CMS is for content, not data."

**Why it's wrong:** Doubles operational surface area. Now you have two systems to maintain. Sanity collections handle structured data perfectly — clients, projects, deadlines are just documents with fields.

**Do this instead:** Put all admin data in Sanity. Client records, project timelines, and document references are Sanity collections with restricted access. One system to maintain.

### Anti-Pattern 3: Puppeteer for PDF Generation

**What people do:** Spin up headless Chrome via Puppeteer to screenshot HTML pages and print to PDF.

**Why it's wrong:** Puppeteer adds ~150MB+ of Chrome dependency to serverless functions. Cold starts are brutal. Netlify/Vercel function size limits are tight. Templates are harder to maintain because they mix web CSS and print CSS.

**Do this instead:** Use `@react-pdf/renderer`. It generates PDFs directly using Node.js without a browser. Templates are React components. Runs in serverless functions comfortably under size limits.

### Anti-Pattern 4: Duplicating Translations in Both CMS and i18n Files

**What people do:** Put all bilingual content in translation JSON files (including page copy), then also have CMS content in RO/EN fields.

**Why it's wrong:** Ownership becomes ambiguous. Is "our services" section in the CMS or in `en.json`? Translation files balloon to hundreds of keys that are really content decisions, not UI decisions.

**Do this instead:** Hard line: CMS owns page content (headings, body copy, service descriptions, portfolio items). i18n JSON files own UI chrome only (nav labels, button text, form placeholders, error messages, aria labels).

## Sources

- Astro i18n routing: https://docs.astro.build/en/guides/internationalization/
- Astro on-demand rendering (hybrid SSG/SSR): https://docs.astro.build/en/guides/on-demand-rendering/
- Astro API route forms: https://docs.astro.build/en/recipes/build-forms-api/
- Sanity + Astro integration: https://docs.astro.build/en/guides/cms/sanity/
- Sanity CMS for Astro: https://www.sanity.io/astro-cms
- Headless CMS 2026 comparison (Sanity vs Payload): https://www.digitalapplied.com/blog/headless-cms-2026-sanity-contentful-payload-comparison
- @react-pdf/renderer: https://react-pdf.org/ and https://www.npmjs.com/package/@react-pdf/renderer
- Astro hybrid rendering guide: https://blog.logrocket.com/hybrid-rendering-astro-guide/
- Google Calendar API Node.js: https://developers.google.com/workspace/calendar/api/quickstart/nodejs
- Astro on Vercel: https://vercel.com/docs/frameworks/frontend/astro
- Netlify Astro adapter: https://docs.astro.build/en/guides/integrations-guide/netlify/

---
*Architecture research for: Web Services Agency Platform (Isio)*
*Researched: 2026-03-21*
