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
| **Quick run command** | `tsc --noEmit` |
| **Full suite command** | `tsc --noEmit && npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `tsc --noEmit`
- **After every plan wave:** Run `tsc --noEmit && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD | TBD | TBD | DOCS-01 | manual | PDF download + visual check | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | DOCS-02 | manual | PDF download + visual check | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | DOCS-03 | manual | PDF download + visual check | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | DOCS-04 | manual | PDF download + visual check | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | DOCS-05 | manual | Diacritic render check in PDF | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | CMS-02 | manual | Dashboard UI check | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] D1 database creation — `wrangler d1 create isio-admin`
- [ ] Noto Sans TTF font file — download and place in project assets
- [ ] jsPDF + jspdf-autotable installed as dependencies

*Note: PDF generation is client-side (jsPDF in browser) — no server-side test framework needed for PDF output. Verification is visual.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| PDF renders Romanian diacritics correctly | DOCS-05 | Visual font rendering check | Generate a PDF with ș, ț, ă, â, î — verify comma-below variants, no boxes/? |
| Proposal PDF contains all fields | DOCS-01 | Document layout verification | Generate proposal with test client data, verify all sections present |
| Contract PDF bilingual output | DOCS-02 | Document content check | Generate contract in RO and EN, compare sections |
| Invoice with IBAN/bank details | DOCS-03 | Financial document accuracy | Generate invoice, verify line items + IBAN + totals |
| Report template structure | DOCS-04 | Layout design verification | Generate report, verify sections render sensibly |
| Deadline tracker displays data | CMS-02 | UI interaction check | Add client + deadline, verify dashboard display |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
