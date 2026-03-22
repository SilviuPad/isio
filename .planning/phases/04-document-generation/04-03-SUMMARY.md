---
phase: 04-document-generation
plan: 03
subsystem: admin/pdf
tags: [jspdf, pdf-generation, bilingual, romanian-diacritics, noto-sans, invoice, proposal, contract, report]
dependency_graph:
  requires: [04-01]
  provides: [pdf-engine, pdf-types, pdf-branding, proposal-template, contract-template, invoice-template, report-template]
  affects: [04-04]
tech_stack:
  added:
    - jsPDF Noto Sans VFS font loading pattern (fetch TTF, base64 encode, addFileToVFS)
    - jspdf-autotable for invoice line items table
  patterns:
    - Module-level font caching (fontLoaded / fontBinaryString) avoids redundant fetch on multiple PDF generations
    - Shared layout helpers (addHeader, addClientBlock, addFooter) used by all 4 templates
    - Bilingual label maps (labels.ro / labels.en) with locale-keyed string lookup
    - Severity color mapping for report findings (critical/warning/info/pass)
key_files:
  created:
    - admin/src/pdf/types.ts
    - admin/src/pdf/branding.ts
    - admin/src/pdf/generator.ts
    - admin/src/pdf/templates/proposal.ts
    - admin/src/pdf/templates/contract.ts
    - admin/src/pdf/templates/invoice.ts
    - admin/src/pdf/templates/report.ts
    - admin/public/fonts/NotoSans-Regular.ttf
  modified: []
decisions:
  - "Noto Sans fetched from GitHub raw (notofonts/latin-greek-cyrillic) — Google Fonts ZIP download requires extraction; direct GitHub TTF URL is simpler for CI"
  - "Module-level font cache (fontLoaded bool + fontBinaryString) — avoids re-fetching 298KB TTF on every generateX() call"
  - "EUR-only pricing (no RON) — per D-13, avoids currency conversion complexity for solo agency"
  - "Invoice comment documents no-VAT decision — D-09 constraint preserved in comment for future developers"
metrics:
  duration: 6 minutes
  completed: 2026-03-22
  tasks_completed: 3
  files_created: 8
---

# Phase 4 Plan 3: PDF Generation Engine Summary

**One-liner:** jsPDF PDF engine with Noto Sans font embedding for Romanian diacritics, shared layout helpers, and 4 bilingual document templates (proposal, contract, invoice, report).

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | PDF engine foundation — font loading, types, and branding | 14fd2cf |
| 2 | Proposal and contract PDF templates | effef17 |
| 3 | Invoice and report PDF templates | 9c7e18c |

## What Was Built

### PDF Engine Foundation (admin/src/pdf/)

**types.ts** — TypeScript interfaces for all 4 document data types: `Locale`, `DocumentClient`, `ProposalData`, `ContractData`, `InvoiceData` (with `InvoiceLineItem`), `ReportData` (with `ReportSection`).

**branding.ts** — `ISIO_BRAND` constants (name, email `contact@isio.ro`, website `isio.ro`, empty address/CUI/IBAN/bankName for admin to fill), `BRAND_COLORS` palette (primary blue-500, dark near-black, gray-500, lightGray-100, white, red-600, green-600, yellow-600).

**generator.ts** — Core jsPDF factory and shared helpers:
- `createDocWithFont()` — creates A4 portrait jsPDF, fetches NotoSans-Regular.ttf from `/fonts/`, base64-encodes and registers via `addFileToVFS`, caches binary string for subsequent calls
- `addHeader(doc, title, locale)` — Isio brand name + contact line + primary-color rule + document title; returns Y=50
- `addClientBlock(doc, client, locale, y)` — client section with company name, contact, email, address, CUI
- `addFooter(doc, locale)` — footer rule + centered contact string

### Noto Sans Font (admin/public/fonts/)

**NotoSans-Regular.ttf** — 298KB from `notofonts/latin-greek-cyrillic` GitHub repo. Contains all 5 Romanian comma-below diacritics: ș (U+0219), ț (U+021B), ă (U+0103), â (U+00E2), î (U+00EE).

### Document Templates (admin/src/pdf/templates/)

**proposal.ts** — `generateProposal(data: ProposalData, locale: Locale)`. Sections: date + validity, client block, project summary (wrapped text), scope of work (bulleted list), pricing breakdown (item/amount table + total line), timeline, payment terms.

**contract.ts** — `generateContract(data: ContractData, locale: Locale)`. Sections: date, parties (Isio as provider + client as beneficiary), scope of work, deliverables (bulleted), pricing + payment schedule, contract duration, 4 general terms clauses (confidentiality, intellectual property, termination, liability). Automatic page break when y > 260.

**invoice.ts** — `generateInvoice(data: InvoiceData, locale: Locale)`. Right-aligned invoice number/date/due-date metadata, client block, jspdf-autotable line items (description/qty/unit price/total with dark header, blue-primary footer total), bank details section (beneficiary/IBAN/bankName), optional notes. No VAT/TVA fields per D-09.

**report.ts** — `generateReport(data: ReportData, locale: Locale)`. Supports `seo_audit` and `accessibility_audit` report types. Sections: date, client block, large score display (green ≥80, yellow ≥50, red <50), executive summary, findings (sections with severity badges in color-coded brackets), numbered recommendations. Automatic page breaks throughout.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

## Known Stubs

- `ISIO_BRAND.address`, `ISIO_BRAND.cui`, `ISIO_BRAND.iban`, `ISIO_BRAND.bankName` in `admin/src/pdf/branding.ts` are empty strings. The bank details section in invoice.ts conditionally renders IBAN and bankName only when non-empty. These are intentional per the plan spec — the admin will fill them in. Plan 04-04 (document generation UI) or a settings page in a future plan will wire these values.

## Self-Check: PASSED

All 8 files exist:
- admin/src/pdf/types.ts (1386 bytes)
- admin/src/pdf/branding.ts (868 bytes)
- admin/src/pdf/generator.ts (3196 bytes)
- admin/src/pdf/templates/proposal.ts (2849 bytes)
- admin/src/pdf/templates/contract.ts (5065 bytes)
- admin/src/pdf/templates/invoice.ts (3976 bytes)
- admin/src/pdf/templates/report.ts (3927 bytes)
- admin/public/fonts/NotoSans-Regular.ttf (304941 bytes, 298K > 100K requirement)

All 3 commits found:
- 14fd2cf — Task 1: PDF engine foundation
- effef17 — Task 2: proposal and contract templates
- 9c7e18c — Task 3: invoice and report templates

TypeScript: `npx tsc --noEmit` completes with zero errors.
Romanian diacritics: Zero cedilla variants (ş/ţ) found across all templates; comma-below variants (ș/ț) confirmed present where applicable.
