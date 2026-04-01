---
phase: 07-content-cleanup-trust
plan: 02
subsystem: trust-signals
tags: [seo, trust, social-links, og-image, footer, entity-name]
dependency_graph:
  requires: []
  provides: [real-social-links, og-image, footer-legal-info, consistent-entity-name]
  affects: [ContactInline, Hero, MobileMenu, Footer, public/og.png]
tech_stack:
  added: []
  patterns: [raw-png-generation]
key_files:
  created:
    - public/og.png
    - scripts/generate-og.mjs
  modified:
    - src/components/home/ContactInline.astro
    - src/components/home/Hero.astro
    - src/components/layout/MobileMenu.astro
    - src/components/layout/Footer.astro
decisions:
  - Generated minimal solid-color PNG for OG image rather than placeholder SVG; user can replace with branded version
metrics:
  duration: 2m 21s
  completed: 2026-04-01
---

# Phase 7 Plan 2: Fix Social Links, Entity Name, OG Image, Footer Legal Info Summary

Real social links pointing to GitHub and LinkedIn profiles, entity name standardized to "Isio" across all components, 1200x630 OG image generated at public/og.png, and footer updated with Iasi city and correct founding year 2025.

## Tasks Completed

### Task 1: Fix social links and standardize entity name
**Commit:** 542690e

- Replaced `href="#"` on GitHub link with `https://github.com/SilviuPad` + `target="_blank" rel="noopener noreferrer"`
- Replaced `href="#"` on LinkedIn link with `https://www.linkedin.com/in/silviupaduraru/` + `target="_blank" rel="noopener noreferrer"`
- Changed `alt="ISIO"` to `alt="Isio"` in Hero.astro (line 132)
- Changed `alt="ISIO"` to `alt="Isio"` in MobileMenu.astro (line 30)

### Task 2: Create OG image and add legal info to footer
**Commit:** a3bc3c2

- Created `scripts/generate-og.mjs` that generates a valid 1200x630 PNG using raw buffer manipulation (no external deps)
- Generated `public/og.png` (3631 bytes) with solid dark background (#0a0a0f)
- Updated footer copyright from "Est. 2020" to "Iasi, Romania. Est. 2025" in both RO and EN locales

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

**OG Image:** `public/og.png` is a minimal solid-color placeholder (dark #0a0a0f). It is a valid 1200x630 PNG and will not 404, but it has no text or branding. The user should replace it with a properly branded image featuring the Isio logo and tagline. The `scripts/generate-og.mjs` script can be extended or replaced when a proper image is ready.

## Verification Results

| Check | Result |
|-------|--------|
| No `href="#"` in ContactInline.astro | PASS |
| No `alt="ISIO"` in Hero/MobileMenu | PASS |
| public/og.png exists (valid PNG) | PASS |
| Footer contains "Est. 2025" | PASS |
| Footer contains city (Iasi) | PASS |
| LinkedIn URL correct | PASS |
| GitHub URL correct | PASS |

## Self-Check: PASSED

All 7 files verified present. Both commit hashes (542690e, a3bc3c2) confirmed in git log.
