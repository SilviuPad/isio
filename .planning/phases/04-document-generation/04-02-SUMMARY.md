---
phase: 04-document-generation
plan: 02
subsystem: admin
tags: [astro, dashboard, crud, deadline-tracker, tailwind, ssr]
dependency_graph:
  requires: [04-01]
  provides: [admin-dashboard-ui, client-directory-pages, deadline-tracker]
  affects: [04-03, 04-04]
tech_stack:
  added: []
  patterns:
    - Astro SSR pages with server-side fetch to internal API routes
    - Shared Layout component wrapping all admin pages
    - is:inline scripts for client-side form interactions
    - Active nav link highlighting via Astro.url.pathname comparison
key_files:
  created:
    - admin/src/components/Layout.astro
    - admin/src/components/Nav.astro
    - admin/src/pages/dashboard.astro
    - admin/src/pages/clients/index.astro
    - admin/src/pages/clients/new.astro
    - admin/src/pages/clients/[id].astro
  modified: []
decisions:
  - "Server-side fetch uses new URL('/api/clients', Astro.url) pattern — works in both dev and prod without hardcoded host"
  - "is:inline scripts for form fetch — avoids Astro bundler scope issues (established pattern from 03-01)"
  - "Nulls sent as null (not empty string) on PUT so DB nullifies cleared fields — empty string vs null distinction matters for date fields"
metrics:
  duration: 8 minutes
  completed: 2026-03-22
  tasks_completed: 2
  files_created: 6
---

# Phase 4 Plan 2: Admin Dashboard UI Summary

**One-liner:** Shared admin Layout/Nav components plus full client directory CRUD and deadline tracker dashboard consuming the Plan 01 client CRUD API.

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Create shared Layout and Nav components | 156006a |
| 2 | Build dashboard, deadline tracker, and client CRUD pages | 4dfd4a4 |

## What Was Built

### Shared Components
- **`admin/src/components/Nav.astro`** — Top navigation bar with Dashboard/Clients/Generate Document links, active state highlighting via `Astro.url.pathname` comparison, and logout button that calls `POST /api/auth` with `{ action: 'logout' }` then redirects to `/`.
- **`admin/src/components/Layout.astro`** — Shared page wrapper with `<meta name="robots" content="noindex, nofollow">` to prevent search engine indexing, imports Nav, accepts `title` prop, wraps all admin pages.

### Dashboard (CMS-02)
`admin/src/pages/dashboard.astro` — Main admin hub:
- Quick stats row: total clients, active projects (status !== done), overdue count
- Deadline tracker table: filters to clients with `projectName`, sorts by `projectDueDate` ascending (nulls last), shows client name (links to edit page), project name, due date, and color-coded status badge
- Status badges: gray (not_started), blue (in_progress), yellow (review), red (blocked), green (done)
- Overdue dates rendered in `text-red-600 font-medium` with "(overdue)" annotation
- Empty state: "No active projects" with link to add client

### Client Directory
`admin/src/pages/clients/index.astro`:
- Lists all clients in a table with company name, contact, email, phone, project, status, and actions
- Edit link to `/clients/{id}`, delete button with `confirm('Delete this client?')` and `fetch DELETE /api/clients/{id}` + `window.location.reload()`
- Empty state with link to `/clients/new`

### Add Client Form
`admin/src/pages/clients/new.astro`:
- All D-14 fields: companyName (required), contactPerson, email (required), phone, cui, address (textarea), iban, notes (textarea)
- Project section: projectName, projectDueDate (date input), projectStatus (select with all 5 status values)
- Two-column grid layout on md+ screens
- `is:inline` script: collects FormData as JSON (omits empty strings), POSTs to `/api/clients`, redirects to `/clients` on 201, shows inline error otherwise

### Edit Client Form
`admin/src/pages/clients/[id].astro`:
- Server-side fetches client from `/api/clients/{id}` — shows "Client not found" state with back link if 404
- Same form layout as new.astro but all inputs pre-filled with existing client data
- "Save Changes" button: PUT to `/api/clients/{id}` (sends null for cleared optional fields)
- "Delete Client" button: confirm dialog, DELETE to `/api/clients/{id}`, redirects to `/clients` on success

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all pages are fully wired to the `/api/clients` endpoints from Plan 01. The generate document link in Nav points to `/generate` which is built in Plan 04 (not yet implemented).

## Self-Check: PASSED

All 6 files exist:
- FOUND: admin/src/components/Layout.astro
- FOUND: admin/src/components/Nav.astro
- FOUND: admin/src/pages/dashboard.astro
- FOUND: admin/src/pages/clients/index.astro
- FOUND: admin/src/pages/clients/new.astro
- FOUND: admin/src/pages/clients/[id].astro

Commits found in git log:
- 156006a — Task 1: Layout + Nav components
- 4dfd4a4 — Task 2: Dashboard + client CRUD pages

TypeScript: `npx tsc --noEmit` exits 0 (zero errors).
