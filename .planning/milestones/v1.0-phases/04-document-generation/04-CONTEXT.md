# Phase 4: Document Generation - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a standalone admin dashboard application with client directory, deadline tracker, and bilingual PDF document generation (proposals, contracts, invoices, reports) with proper Romanian diacritic support. The admin authenticates with a shared secret, manages client records, and generates documents from templates pre-filled with client data — with preview before download and optional email delivery to clients.

</domain>

<decisions>
## Implementation Decisions

### Admin Dashboard Architecture
- **D-01:** Separate standalone app — NOT embedded in the Astro public site. Own deployment, own codebase/directory. Talks to API routes for data operations.
- **D-02:** Simple shared secret authentication — single password stored as env var. Admin enters it once, receives a session cookie. No user accounts, no OAuth.
- **D-03:** Light hub scope — document generation forms, client directory (CRUD), and project deadline tracker. No content management (services, pricing, portfolio stay as JSON files edited in code).
- **D-04:** Clean utilitarian UI — functional and minimal. Does not need to match the public site's dark/modern aesthetic. Only the admin uses it.

### Document Types & Content

#### Proposals
- **D-05:** Simple format — client info, project summary, scope of work, pricing breakdown, timeline, payment terms. No signature blocks or detailed assumptions.

#### Contracts
- **D-06:** Generic services agreement — system generates a standard contract template. No specific Romanian legal format required. Claude designs a sensible services agreement structure.

#### Invoices
- **D-07:** Standard invoice fields — line items, quantities, unit price, total, due date.
- **D-08:** Include IBAN/bank details (Isio's bank info) on every invoice for payment reference.
- **D-09:** No VAT information — invoices do not show VAT/TVA fields.

#### Reports
- **D-10:** Report template structure is Claude's discretion — design a sensible layout for SEO audit and accessibility report outputs. User has no specific format preference.

### All Documents
- **D-11:** Bilingual — every document type generates in both Romanian and English variants. Uses established `{ ro, en }` locale pattern.
- **D-12:** Romanian diacritics must use comma-below variants (ș/ț), never cedilla (ş/ţ). Font must embed correctly (Noto Sans or equivalent with full Romanian glyph coverage).
- **D-13:** EUR-only pricing across both locale variants (carried from Phase 1 decision D-09).

### Client Data Model
- **D-14:** Client record fields: company/person name, contact person, email, phone number, CUI (fiscal code), address, IBAN/bank details, notes/comments.
- **D-15:** One project per client — no multi-project support needed. Project is a property of the client record, not a separate entity.

### Deadline Tracker
- **D-16:** Simple deadline model — project name + single due date per client. No milestone breakdown.
- **D-17:** Status values: Not started, In progress, Review, Blocked, Done.

### Document Generation Workflow
- **D-18:** Template-first flow — admin starts from a document template, client data auto-fills, admin edits/tweaks fields as needed, then generates.
- **D-19:** Preview step before download — admin sees a rendered preview of the PDF before committing to download.
- **D-20:** Email delivery option — admin can email the generated PDF directly to the client from the dashboard (via Resend, already in stack).
- **D-21:** No document persistence — generate-and-download only. No document history or storage. Admin regenerates if needed.

### Isio Branding on Documents
- **D-22:** All generated documents carry Isio branding (logo, company info, contact details). Specific branding layout is Claude's discretion.

### Claude's Discretion
- Admin dashboard tech stack (framework, styling, deployment target)
- PDF generation library choice (must work within chosen runtime constraints)
- Dashboard page layout and navigation structure
- Document template visual design and section ordering
- Report template sections and structure
- Contract legal clause content
- Client form UX and validation
- Deadline tracker UI presentation
- Preview rendering approach
- Session cookie implementation details
- API route design between dashboard and backend

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Core value, constraints, plugin-first approach, solo developer context
- `.planning/REQUIREMENTS.md` — Phase 4 requirements: DOCS-01, DOCS-02, DOCS-03, DOCS-04, DOCS-05, CMS-02
- `.planning/ROADMAP.md` §Phase 4 — Success criteria, dependency on Phase 1

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Bilingual per-field locale strategy, EUR-only pricing, URL structure
- `.planning/phases/02-public-site/02-CONTEXT.md` — Isio visual branding (for document branding reference), design system
- `.planning/phases/03-booking-contact/03-CONTEXT.md` — API route pattern (contact.ts), Resend email integration, Cloudflare Workers SSR

### Research
- `.planning/research/ARCHITECTURE.md` — Component boundaries, data flow patterns
- `.planning/research/FEATURES.md` — Document generation feature rationale

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/pages/api/contact.ts` — SSR API route pattern on Cloudflare Workers. Shows `export const prerender = false`, request parsing, Resend email sending, error handling. Reuse this pattern for document generation and client CRUD API routes.
- `src/content.config.ts` — Zod schema definitions for content collections. Shows `localeString` pattern (`z.object({ ro: z.string(), en: z.string() })`). Client data model can follow similar validation patterns.
- `src/content/pricing/*.json` — Pricing data structure with bilingual fields. Useful reference for invoice line item structure.
- `src/content/settings/site.json` — Site settings including `contactEmail`. Isio company details for document headers could follow similar pattern.
- `resend` package already in `package.json` — reuse for emailing generated PDFs to clients.

### Established Patterns
- SSR API routes: `export const prerender = false` + async handler function on Cloudflare Workers
- Bilingual content: `{ ro: '...', en: '...' }` per field, resolved by locale
- Email sending: Resend SDK with HTML email templates (see contact.ts)
- Environment variables: `import.meta.env.VAR_NAME` pattern in Astro API routes

### Integration Points
- Resend SDK — already configured for contact form emails. Reuse for sending PDF attachments to clients.
- Cloudflare Workers runtime — API routes run here. PDF generation library must be compatible (no filesystem, no native binaries like Puppeteer).
- `@astrojs/cloudflare` adapter — supports SSR routes alongside static pages. Dashboard API routes would use same adapter if hosted in same Astro app, OR dashboard is fully separate.

</code_context>

<specifics>
## Specific Ideas

- Dashboard is a utility for one person — prioritize speed of use over visual polish
- Template-first with auto-fill means the admin shouldn't have to re-enter client data that's already in the client directory
- Preview should feel instant — no waiting for PDF render before seeing the document layout
- Romanian fiscal documents typically show CUI, company registration, and bank details in the header — follow this convention

</specifics>

<deferred>
## Deferred Ideas

- Document history/persistence — could add later if the admin needs to look up past documents
- Multi-project per client — current model is 1:1, can extend if business grows
- Content management from dashboard (editing services, pricing, portfolio) — stays as JSON file editing for now
- Client portal where clients can view their documents — out of scope (solo admin only)
- Invoice payment tracking / status — v2 requirement (PAY-02)
- Automated email reminders for deadlines — v2 requirement (NOTF-02)

</deferred>

---

*Phase: 04-document-generation*
*Context gathered: 2026-03-22*
