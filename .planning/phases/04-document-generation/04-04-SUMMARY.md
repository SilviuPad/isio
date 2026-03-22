---
phase: 04-document-generation
plan: 04
subsystem: admin
tags: [astro, pdf, jspdf, email, resend, bilingual, document-generation, ssr]
dependency_graph:
  requires: [04-01, 04-02, 04-03]
  provides: [generate-page, email-pdf-api, document-generation-ui]
  affects: []
tech_stack:
  added: []
  patterns:
    - Client-side PDF generation via browser <script> tag importing jsPDF template modules
    - data-section container switching for multi-type form (document type tabs without tabs)
    - Nullable coalescing (?? '') when mapping Client record (nullable fields) to DocumentClient (non-nullable)
    - base64 PDF encoding via doc.output('datauristring').split(',')[1] for Resend attachment
    - URL.createObjectURL(blob) for in-browser PDF preview in iframe
key_files:
  created:
    - admin/src/pages/generate.astro
    - admin/src/pages/api/email-pdf.ts
  modified:
    - admin/scripts/patch-workerd.cjs
decisions:
  - "Browser-side PDF generation only — no server-side PDF rendering needed; jsPDF + template modules bundled by Astro for client"
  - "data-section containers for form switching — simple display:none toggle avoids React/component complexity"
  - "Nullable coalescing at the DocumentClient assembly point — keeps PDF templates clean, handles null->string conversion once"
  - "POST /api/email-pdf receives base64 PDF string — avoids multipart/form-data complexity; Resend SDK handles base64 attachments directly"
  - "patch-workerd.cjs extended to include lib/main.js — lib/main.js was missing from original patch; blocks astro build on ARM64 Windows"
metrics:
  duration: 8 minutes
  completed: 2026-03-22
  tasks_completed: 2
  files_created: 2
  files_modified: 1
---

# Phase 4 Plan 4: Document Generation UI + Email API Summary

**One-liner:** Document generation page with template-first workflow (select type → select client → edit → preview in iframe → download or email via Resend).

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Create email-pdf API endpoint | 7ac6ae4 |
| 2 | Document generation page with form, preview, download, email | 5c52966 |

## What Was Built

### admin/src/pages/api/email-pdf.ts

POST endpoint that accepts `{ to, filename, pdfBase64, subject }` and sends the PDF as an email attachment via Resend:
- Validates required fields (`to`, `filename`, `pdfBase64`) — returns 400 on missing
- Creates `Resend` client from `locals.runtime.env.RESEND_API_KEY` (Cloudflare Workers binding)
- Calls `resend.emails.send()` with `attachments: [{ filename, content: pdfBase64 }]`
- Returns `{ success: true }` on success or `{ error: string }` with 500 on Resend failure
- Includes JSON parse error handling with 400 response

### admin/src/pages/generate.astro

Full document generation UI — capstone page for Phase 4:

**Left panel — Configuration form:**
- Step 1: Document type selector (4 radio buttons: Proposal / Contract / Invoice / Report)
- Step 2: Client dropdown populated server-side from `/api/clients`; on selection auto-fills project name, email recipient, and section-specific fields with nullable coalescing (`?? ''`)
- Step 3: Locale selector (Romanian / English)
- Document-type sections via `data-section` containers, JS `switchSection()` toggles `display:none`

**Form sections (all 4 document types):**
- Proposal: project name, summary, scope items (textarea), dynamic pricing breakdown rows, total price (auto-calculated), date/validUntil, timeline, payment terms
- Contract: project name, scope of work, deliverables (textarea), total price, payment schedule, start/end/contract dates
- Invoice: invoice number, date, due date, dynamic line item rows (description/qty/unit price), notes
- Report: report type (SEO/Accessibility), project name, date, overall score, executive summary, dynamic section rows (title/findings/severity), recommendations

**Right panel — Preview + actions:**
- `<iframe id="pdf-preview">` for in-browser PDF preview
- "Preview PDF" button — calls template generator, displays via `URL.createObjectURL(doc.output('blob'))`
- "Download PDF" button — `doc.save(filename)` with naming: `{docType}_{clientName}_{locale}_{date}.pdf`
- "Email PDF" button — converts to base64, POSTs to `/api/email-pdf`; email field pre-filled from selected client

**Client-side `<script>` (Astro-bundled for browser):**
- Imports all 4 template generators from `../pdf/templates/*`
- `switchSection()` with `querySelectorAll('[data-section]')` loop
- Client auto-fill with `?? ''` for all nullable fields (contactPerson, phone, cui, address, iban)
- Dynamic row management for pricing, line items, and report sections
- `generatePdf()` dispatches to correct template based on selected doc type
- All action buttons disabled until preview is generated

### admin/scripts/patch-workerd.cjs (extended)

Added `lib/main.js` to the files array — the compiled entry point for workerd was missing from the original patch list and caused `"Unsupported platform: win32 arm64 LE"` to still appear from `lib/main.js` even after install.js and bin/workerd were patched.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] workerd lib/main.js missing from patch**
- **Found during:** Task 2 verification (npm run build)
- **Issue:** `npm run build` failed with `Unsupported platform: win32 arm64 LE` from `node_modules/workerd/lib/main.js:59` — this compiled entry point was not included in the original `patch-workerd.cjs` file (only `install.js` and `bin/workerd` were patched in plan 04-01)
- **Fix:** Added `lib/main.js` to the `files` array in `admin/scripts/patch-workerd.cjs`
- **Files modified:** `admin/scripts/patch-workerd.cjs`
- **Commit:** 5c52966 (included in Task 2 commit)

**Note on build status:** After applying the lib/main.js patch, `npm run build` now encounters a `require_dist is not a function` error in Vite's SSR deps cache (`logging-D4Wp0u_I.js`). Investigation confirmed this error **existed before plan 04-04** (verified by running build on the stashed state). This is a pre-existing environment issue unrelated to the code written in this plan. TypeScript (`npx tsc --noEmit`) passes with zero errors.

## User Setup Required (Deployment Prerequisites)

Before testing with `wrangler dev` or deploying:

### Cloudflare D1
```bash
# Create D1 database (one time)
cd admin && wrangler d1 create isio-admin
# Copy the database_id from output and update admin/wrangler.toml

# Apply migrations to local D1
cd admin && wrangler d1 migrations apply isio-admin --local

# Apply migrations to remote D1 (before production deploy)
cd admin && wrangler d1 migrations apply isio-admin --remote
```

### Environment Variables
Create `admin/.dev.vars` for local development:
```
ADMIN_PASSWORD=your_strong_password_here
RESEND_API_KEY=re_xxxx_your_key_here
```

For production, set via Wrangler:
```bash
cd admin && wrangler secret put ADMIN_PASSWORD
cd admin && wrangler secret put RESEND_API_KEY
```

The `RESEND_API_KEY` can be the same key used in the public site (`src/pages/api/contact.ts`).

## Known Stubs

None — the generate.astro page is fully wired. All template generators, client API, and email API are connected. The only "stubs" are the `ISIO_BRAND` fields in `admin/src/pdf/branding.ts` (`address`, `cui`, `iban`, `bankName` are empty strings), documented in plan 04-03 as intentional pending a settings page.

## Self-Check: PASSED

Files exist:
- FOUND: admin/src/pages/generate.astro
- FOUND: admin/src/pages/api/email-pdf.ts
- FOUND: admin/scripts/patch-workerd.cjs (modified)

Commits found in git log:
- 7ac6ae4 — Task 1: email-pdf API endpoint
- 5c52966 — Task 2: generate.astro + patch-workerd fix

TypeScript: `npx tsc --noEmit` exits 0 (zero errors).

Acceptance criteria checklist:
- [x] admin/src/pages/api/email-pdf.ts contains "export const prerender = false" and "export async function POST"
- [x] admin/src/pages/api/email-pdf.ts contains "resend.emails.send" and "attachments" with "pdfBase64"
- [x] admin/src/pages/api/email-pdf.ts validates required fields "to" and "filename" and "pdfBase64"
- [x] admin/src/pages/api/email-pdf.ts returns 400 on missing fields and 500 on Resend error
- [x] admin/src/pages/generate.astro contains "export const prerender = false"
- [x] admin/src/pages/generate.astro contains document type selection with "proposal" and "contract" and "invoice" and "report"
- [x] admin/src/pages/generate.astro contains data-section="proposal" and data-section="contract" and data-section="invoice" and data-section="report" containers
- [x] admin/src/pages/generate.astro contains section switching logic with querySelectorAll('[data-section]')
- [x] admin/src/pages/generate.astro contains client dropdown populated from "/api/clients"
- [x] admin/src/pages/generate.astro contains nullable coalescing with ?? '' for contactPerson, phone, cui, address, iban
- [x] admin/src/pages/generate.astro contains locale selection with "ro" and "en"
- [x] admin/src/pages/generate.astro contains <iframe for PDF preview (per D-19)
- [x] admin/src/pages/generate.astro contains "URL.createObjectURL" for preview rendering
- [x] admin/src/pages/generate.astro contains ".save(" for PDF download
- [x] admin/src/pages/generate.astro contains "/api/email-pdf" fetch call for email delivery
- [x] admin/src/pages/generate.astro imports template generators: "generateProposal" and "generateContract" and "generateInvoice" and "generateReport"
- [x] admin/src/pages/generate.astro contains dynamic line item rows for invoice (Add Item button)
