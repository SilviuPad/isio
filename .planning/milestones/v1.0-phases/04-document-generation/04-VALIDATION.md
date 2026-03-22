---
phase: 4
slug: document-generation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual + browser-based verification |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `cd admin && npx tsc --noEmit` |
| **Full suite command** | `cd admin && npx tsc --noEmit && npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd admin && npx tsc --noEmit`
- **After every plan wave:** Run `cd admin && npx tsc --noEmit && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-T1 | 04-01 | 1 | CMS-02, DOCS-05 | automated | `cd admin && npx tsc --noEmit` | N/A (scaffolding) | pending |
| 04-01-T2 | 04-01 | 1 | CMS-02 | automated | `cd admin && npx tsc --noEmit` | N/A | pending |
| 04-01-T3 | 04-01 | 1 | CMS-02 | automated | `cd admin && npx tsc --noEmit` | N/A | pending |
| 04-02-T1 | 04-02 | 2 | CMS-02 | automated | `cd admin && npx tsc --noEmit` | N/A | pending |
| 04-02-T2 | 04-02 | 2 | CMS-02 | manual + automated | `cd admin && npx tsc --noEmit` | N/A | pending |
| 04-03-T1 | 04-03 | 2 | DOCS-01..05 | automated | `cd admin && npx tsc --noEmit` | N/A | pending |
| 04-03-T2 | 04-03 | 2 | DOCS-01..04 | automated | `cd admin && npx tsc --noEmit` | N/A | pending |
| 04-04-T1 | 04-04 | 3 | DOCS-05 | automated | `cd admin && npx tsc --noEmit` | N/A | pending |
| 04-04-T2 | 04-04 | 3 | DOCS-01..05 | automated | `cd admin && npx tsc --noEmit` | N/A | pending |
| 04-04-T3 | 04-04 | 3 | DOCS-01..05 | manual | `cd admin && npm run build` | N/A | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] D1 database creation — `wrangler d1 create isio-admin`
- [ ] Noto Sans TTF font file — download and place in project assets
- [ ] jsPDF + jspdf-autotable installed as dependencies

*Note: PDF generation is client-side (jsPDF in browser) — no server-side test framework needed for PDF output. Verification is visual.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions | Task ID |
|----------|-------------|------------|-------------------|---------|
| PDF renders Romanian diacritics correctly | DOCS-05 | Visual font rendering check | Generate a PDF with s-comma, t-comma, a-breve, a-circumflex, i-circumflex — verify comma-below variants, no boxes/? | 04-04-T3 |
| Proposal PDF contains all fields | DOCS-01 | Document layout verification | Generate proposal with test client data, verify all sections present | 04-04-T3 |
| Contract PDF bilingual output | DOCS-02 | Document content check | Generate contract in RO and EN, compare sections | 04-04-T3 |
| Invoice with IBAN/bank details | DOCS-03 | Financial document accuracy | Generate invoice, verify line items + IBAN + totals | 04-04-T3 |
| Report template structure | DOCS-04 | Layout design verification | Generate report, verify sections render sensibly | 04-04-T3 |
| Deadline tracker displays data | CMS-02 | UI interaction check | Add client + deadline, verify dashboard display | 04-04-T3 |
| Document type switching shows correct sections | DOCS-01..04 | UI interaction check | Switch between all 4 doc types, verify correct fields appear/hide | 04-04-T3 |
| Client auto-fill shows no null values | DOCS-01..04 | UI interaction check | Select client with missing optional fields, verify no "null" text in form inputs | 04-04-T3 |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
