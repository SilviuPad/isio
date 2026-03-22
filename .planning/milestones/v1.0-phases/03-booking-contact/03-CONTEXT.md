# Phase 3: Booking + Contact - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire the existing contact page into a functional conversion endpoint: embed a Cal.com booking widget for discovery call scheduling (synced to Google Calendar), connect the contact form to a server-side API route that sends email notifications via Resend, and add Cloudflare Turnstile spam protection. Both booking and contact must work in RO and EN on all viewport sizes.

</domain>

<decisions>
## Implementation Decisions

### Booking Integration
- **D-01:** Cal.com hosted (free tier) — not self-hosted, not custom Google Calendar API. Eliminates all OAuth complexity. 1 event type ("Discovery Call"), unlimited bookings, Google Calendar two-way sync configured in Cal.com dashboard.
- **D-02:** Inline embed widget via Cal.com vanilla JS snippet (`Cal("inline", ...)`) — not popup, not redirect. Keeps visitors on-site. Astro loads the embed script as a client-side island.
- **D-03:** Replace the existing "Schedule a call" placeholder card on the contact page with the actual Cal.com inline embed. Booking and contact form live on the same page — no separate booking page.
- **D-04:** Bilingual booking — pass `locale` param to Cal.com embed URL. Cal.com supports `?lang=ro` and `?lang=en` natively.

### Contact Form Backend
- **D-05:** Astro SSR API route at `/api/contact` — Cloudflare Workers handles the POST. Contact form fields: name, email, service (optional), message.
- **D-06:** Resend sends notification email to admin (contact@isio.ro) with all form fields formatted cleanly. No confirmation email to the visitor — keep it simple.
- **D-07:** Success/error states handled client-side with a small inline script — form submits via `fetch()`, shows success message or error inline. No page reload.

### Spam Protection
- **D-08:** Cloudflare Turnstile (invisible mode) on the contact form — free, zero-friction, native to the existing Cloudflare infrastructure. Server-side token verification in the API route.
- **D-09:** No Turnstile on the Cal.com embed — Cal.com handles its own spam protection internally.

### Claude's Discretion
- Cal.com embed styling and container sizing to match the existing design system
- Email notification template formatting (plain text vs HTML)
- Form validation UX (inline errors, disabled submit, loading spinner)
- Turnstile widget placement and fallback behavior
- Homepage inline contact form — wire it to the same API route or leave as a link to `/contact`

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Core value, constraints, plugin-first approach, solo developer context
- `.planning/REQUIREMENTS.md` — Phase 3 requirements: INTR-01, INTR-02
- `.planning/ROADMAP.md` §Phase 3 — Success criteria, dependency on Phase 2

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Bilingual per-field locale strategy, URL structure, deployment pipeline
- `.planning/phases/02-public-site/02-CONTEXT.md` — Visual design direction, page layout patterns, CTA structure

### Research
- `.planning/research/ARCHITECTURE.md` — Booking form data flow, API route pattern, Resend integration, calendar sync approach
- `.planning/research/FEATURES.md` — Booking feature rationale, Cal.com vs custom Calendar API trade-offs

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/pages/contact.astro` + `src/pages/en/contact.astro` — Full contact page layout in both locales, contact form HTML, info cards, process steps. Currently static — needs API wiring and Cal.com embed.
- `src/components/home/ContactInline.astro` — Homepage inline contact form. Candidate for wiring to same `/api/contact` endpoint.
- `src/components/services/ServiceCTA.astro` — "Book a call" CTA linking to contact page. Already correct — no changes needed.
- `src/layouts/Page.astro` + `src/layouts/Base.astro` — Page wrapper with SEO, hreflang. Cal.com embed script can be added via Astro head slot.
- `src/i18n/utils.ts` — `getLocaleFromUrl()`, `localePath()` — use for locale detection in API route and embed config.

### Established Patterns
- Static rendering: All pages use `export const prerender = true` — API route must NOT have this export (SSR on Cloudflare Workers).
- Bilingual content: Inline `locale === 'ro' ? ... : ...` pattern in components.
- Styling: `glass-card`, `btn-glow`, `btn-outline`, form input classes already established in contact page — reuse exactly.
- Section pattern: `section-tag` + heading + content with `data-animate` attributes.

### Integration Points
- Contact form `<form>` elements exist in both locale pages — need `fetch()` POST to `/api/contact` instead of default submit.
- "Schedule a call" card in contact pages (both locales) — replace with Cal.com embed container.
- `@astrojs/cloudflare` adapter — already configured, supports SSR API routes alongside static pages.
- Resend SDK — available in parent StoryPic stack via workspace sharing.

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for Cal.com embedding and Resend email formatting.

</specifics>

<deferred>
## Deferred Ideas

- Confirmation email to visitor after contact form submission — can add later if needed
- Custom availability display on the site — Cal.com handles this inside its embed
- Contact form data stored in database/CMS — currently email-only notification is sufficient

</deferred>

---

*Phase: 03-booking-contact*
*Context gathered: 2026-03-22*
