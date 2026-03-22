# Phase 4: Document Generation - Research

**Researched:** 2026-03-22
**Domain:** PDF generation (serverless-safe), admin dashboard (Astro + Cloudflare), client data persistence (Cloudflare D1), bilingual document templates (Romanian diacritics)
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Admin Dashboard Architecture**
- D-01: Separate standalone app — NOT embedded in the Astro public site. Own deployment, own codebase/directory. Talks to API routes for data operations.
- D-02: Simple shared secret authentication — single password stored as env var. Admin enters it once, receives a session cookie. No user accounts, no OAuth.
- D-03: Light hub scope — document generation forms, client directory (CRUD), and project deadline tracker. No content management.
- D-04: Clean utilitarian UI — functional and minimal. Does not need to match the public site's dark/modern aesthetic.

**Document Types & Content**
- D-05: Proposals — client info, project summary, scope of work, pricing breakdown, timeline, payment terms. No signature blocks.
- D-06: Contracts — generic services agreement. No specific Romanian legal format required.
- D-07/D-08/D-09: Invoices — line items, quantities, unit price, total, due date, IBAN/bank details. No VAT/TVA fields.
- D-10: Reports — Claude's discretion for SEO audit and accessibility report structure.

**All Documents**
- D-11: Bilingual — every document type generates in both Romanian and English variants.
- D-12: Romanian diacritics MUST use comma-below variants (ș/ț), NOT cedilla (ş/ţ). Font must embed with full Romanian glyph coverage (Noto Sans or equivalent).
- D-13: EUR-only pricing.

**Client Data Model**
- D-14: Client record fields: company/person name, contact person, email, phone number, CUI (fiscal code), address, IBAN/bank details, notes/comments.
- D-15: One project per client — no multi-project support.

**Deadline Tracker**
- D-16: Simple deadline model — project name + single due date per client. No milestone breakdown.
- D-17: Status values: Not started, In progress, Review, Blocked, Done.

**Document Generation Workflow**
- D-18: Template-first flow — admin starts from a template, client data auto-fills, admin edits, then generates.
- D-19: Preview step before download — admin sees rendered preview before committing to download.
- D-20: Email delivery option via Resend (already in stack).
- D-21: No document persistence — generate-and-download only.
- D-22: All documents carry Isio branding.

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

### Deferred Ideas (OUT OF SCOPE)
- Document history/persistence
- Multi-project per client
- Content management from dashboard (services, pricing, portfolio stay as JSON file edits)
- Client portal where clients view documents
- Invoice payment tracking/status (v2: PAY-02)
- Automated email reminders for deadlines (v2: NOTF-02)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DOCS-01 | Bilingual proposal generation (RO and EN) from client/project data | jsPDF with Noto Sans font, template pattern per locale |
| DOCS-02 | Bilingual contract generation (RO and EN) from templates | Same PDF stack; contract is a structured template with standard clauses |
| DOCS-03 | Bilingual invoice generation (RO and EN) with line items and due dates | jsPDF AutoTable for line item tables; locale-specific label text |
| DOCS-04 | Bilingual report generation (RO and EN) for SEO audits and accessibility reports | Same PDF stack; report template with sections for findings |
| DOCS-05 | PDF output with proper Romanian diacritics (Noto Sans font embedding) | jsPDF addFileToVFS + addFont pattern; Noto Sans TTF includes all Romanian glyphs |
| CMS-02 | Client deadline tracker in admin dashboard (client name, project, milestones, due dates, status) | Cloudflare D1 + Drizzle ORM for data persistence; Astro SSR API routes for CRUD |
</phase_requirements>

---

## Summary

Phase 4 builds a standalone admin dashboard application separate from the public Astro site. The two critical technical challenges are: (1) PDF generation that works within the Cloudflare Workers runtime (no native binaries, no filesystem), and (2) correct Romanian diacritic rendering by embedding a Unicode-complete font.

The recommended approach is **client-side PDF generation using jsPDF v4 running in the admin dashboard browser**. This completely sidesteps the Cloudflare Workers constraints — the PDF is generated in the admin's browser, not on the server. jsPDF supports TTF font embedding via `addFileToVFS` + `addFont`, and Noto Sans (available free from Google Fonts) includes all Romanian comma-below glyphs (U+015F ș, U+0163 ț). jsPDF-AutoTable handles invoice line item tables cleanly.

The standalone admin dashboard is built as an **Astro app** deployed to a separate Cloudflare Pages project. Client data (D-14 through D-17) requires persistence — **Cloudflare D1** (SQLite-backed, free tier: 5M reads/day, 100K writes/day, 5GB) is the right choice because it works natively with the Cloudflare/Astro stack already in use, requires no new infrastructure accounts, and Drizzle ORM (already in the project) supports it. Authentication is a simple shared-secret cookie implemented via Astro middleware.

**Primary recommendation:** Admin dashboard = Astro + Cloudflare D1 + Drizzle ORM, deployed to its own Cloudflare Pages project. PDF generation = jsPDF v4 client-side in the browser, Noto Sans TTF embedded via `addFileToVFS`. Session auth = shared secret + HttpOnly cookie via Astro middleware.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | ^6.0 (same as public site) | Admin dashboard framework | Already in use; SSR API routes + static pages; Cloudflare adapter works natively |
| `@astrojs/cloudflare` | latest (same as public site) | Deploy SSR API routes as Cloudflare Workers | Already proven in Phase 3; supports D1 bindings via `locals.runtime.env` |
| jsPDF | ^4.2.1 | Client-side PDF generation | Pure browser JS — no Cloudflare Workers compatibility issues; 30K+ stars; TypeScript types included; TTF font embedding via addFileToVFS |
| jspdf-autotable | ^5.0.7 | Invoice line item tables in PDF | Pairs with jsPDF; handles table layout, borders, column widths automatically |
| Drizzle ORM | ^0.45.1 (shared) | Client/deadline CRUD, D1 access | Already in stack; type-safe SQL; official D1 support |
| Drizzle Kit | ^0.31.10 (shared) | Schema migrations for D1 | Already in stack; `drizzle-kit generate && drizzle-kit migrate` workflow |
| Noto Sans TTF | Static asset (fetched from Google Fonts or bundled) | Font with full Romanian glyph coverage | Google-maintained; contains all 5 Romanian comma-below diacritics; OFL license; free |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Resend | ^6.9.4 (shared) | Email PDF attachments to clients | Already in stack; `attachments` array in `emails.send()` supports PDF buffer |
| Tailwind CSS | ^4.2 (shared) | Admin dashboard UI styling | Already in stack; `@tailwindcss/vite` plugin |
| `crypto` (Web Crypto API) | Built-in to Cloudflare Workers | SHA-256 hashing shared secret for cookie comparison | No install; `crypto.subtle.digest('SHA-256', ...)` available in Workers runtime |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| jsPDF (client-side) | `@react-pdf/renderer` (server-side) | react-pdf v4 has documented Cloudflare Workers WASM issue ("Wasm code generation disallowed by embedder" from yoga-layout); requires manual patching; jsPDF avoids runtime entirely by running in browser |
| jsPDF (client-side) | Cloudflare Browser Rendering API + Puppeteer | Browser Rendering now has paid pricing ($0.09/browser-hour after free tier); adds infrastructure dependency; jsPDF is simpler for this admin tool used occasionally |
| jsPDF (client-side) | pdf-lib + @pdf-lib/fontkit | pdf-lib v1.17 has documented `PDFDocument_default.registerFontkit is not a function` error in Cloudflare Workers (workers-sdk issue #8140); jsPDF equally capable for structured documents and avoids the issue entirely by running client-side |
| Cloudflare D1 | Cloudflare KV | KV is key-value only; D1 is relational SQL — necessary for client records with multiple fields, deadline queries, and CRUD operations |
| Cloudflare D1 | External Postgres (Neon) | D1 is already on the Cloudflare account; free tier is generous for a solo admin; avoids a second service account |
| Cloudflare D1 | localStorage in browser | Admin data must survive browser clears, support multiple devices, and be accessible from PDF generation form — server-side persistence is required |

**Installation (admin dashboard):**
```bash
# In admin/ directory
npm create astro@latest
npm install jspdf jspdf-autotable
# Drizzle, Resend, Tailwind, @astrojs/cloudflare shared from parent or reinstalled
```

**Version verification (confirmed 2026-03-22):**
- `jspdf`: 4.2.1 (latest)
- `jspdf-autotable`: 5.0.7 (latest)
- `drizzle-orm`: 0.45.1 (same as public site)
- `drizzle-kit`: 0.31.10 (current)
- `@pdf-lib/fontkit`: 1.1.1 (verified but NOT recommended — see Alternatives)

---

## Architecture Patterns

### Recommended Project Structure

```
isio/
├── src/                          # Public site (existing)
├── admin/                        # Standalone admin dashboard
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.astro       # Login page (unauthenticated redirect here)
│   │   │   ├── dashboard.astro   # Main hub (clients list, deadlines, generate doc)
│   │   │   ├── clients/
│   │   │   │   ├── index.astro   # Client list
│   │   │   │   ├── new.astro     # Add client form
│   │   │   │   └── [id].astro    # Edit client form
│   │   │   └── api/
│   │   │       ├── auth.ts       # POST login, POST logout
│   │   │       ├── clients.ts    # GET /clients, POST /clients
│   │   │       ├── clients/[id].ts  # GET, PUT, DELETE
│   │   │       └── generate-pdf.ts  # POST: receives doc type + data, returns nothing (PDF generated client-side)
│   │   ├── middleware.ts         # Auth cookie check on all /dashboard/* routes
│   │   ├── lib/
│   │   │   ├── db.ts             # Drizzle + D1 client setup
│   │   │   ├── schema.ts         # Drizzle table definitions (clients, projects)
│   │   │   └── auth.ts           # Cookie hash comparison helper
│   │   └── pdf/
│   │       ├── generator.ts      # jsPDF setup, font loading, shared helpers
│   │       ├── templates/
│   │       │   ├── proposal.ts   # Proposal template (locale param)
│   │       │   ├── contract.ts   # Contract template
│   │       │   ├── invoice.ts    # Invoice template with AutoTable
│   │       │   └── report.ts     # SEO/a11y report template
│   │       └── fonts/
│   │           └── NotoSans-Regular.ttf  # Bundled font asset
│   ├── astro.config.mjs          # output: 'server', cloudflare adapter, D1 binding
│   ├── wrangler.toml             # D1 binding, D1 database ID
│   └── package.json              # Admin-specific deps (jspdf, jspdf-autotable)
├── package.json                  # Root workspace (optional)
└── wrangler.toml                 # Public site wrangler config (existing)
```

### Pattern 1: Client-Side PDF Generation

**What:** The admin dashboard serves HTML form pages. When the admin clicks "Generate PDF", the form data is collected in the browser, and a TypeScript module (imported as a client-side script via `<script>`) generates the PDF using jsPDF. The PDF is downloaded directly via `doc.save('filename.pdf')`. No server round-trip for the PDF itself.

**When to use:** Always — this is the recommended approach for this project. Avoids all Cloudflare Workers PDF compatibility issues.

**Why it works for this use case:** Admin is the only user. The browser is a full JS runtime. jsPDF is 300KB gzipped — acceptable for an admin tool. Font loading is a one-time fetch.

**Font loading pattern:**
```typescript
// Source: jsPDF docs + npm page
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

async function loadNotoSans(doc: jsPDF) {
  // Fetch TTF from /fonts/NotoSans-Regular.ttf (bundled static asset)
  const fontResponse = await fetch('/fonts/NotoSans-Regular.ttf');
  const fontBuffer = await fontResponse.arrayBuffer();
  // Convert to binary string for jsPDF VFS
  const fontData = new Uint8Array(fontBuffer);
  const binaryString = Array.from(fontData)
    .map(byte => String.fromCharCode(byte))
    .join('');
  doc.addFileToVFS('NotoSans-Regular.ttf', btoa(binaryString));
  doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.setFont('NotoSans');
}
```

**Preview approach:**
```typescript
// Preview: render PDF in iframe using blob URL
async function previewPDF(doc: jsPDF) {
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const iframe = document.getElementById('pdf-preview') as HTMLIFrameElement;
  iframe.src = url;
  // Cleanup: URL.revokeObjectURL(url) when user navigates away
}

// Download: standard jsPDF download
function downloadPDF(doc: jsPDF, filename: string) {
  doc.save(filename);
}
```

### Pattern 2: Admin Authentication (Astro Middleware + Shared Secret)

**What:** All `/dashboard/*` routes are protected by Astro middleware. On first visit, admin is redirected to login. On POST /api/auth, the submitted password is SHA-256 hashed and compared to a hash of `ADMIN_PASSWORD` env var. On match, an HttpOnly session cookie is set (1-week TTL). Middleware reads and validates the cookie on every protected request.

**When to use:** All admin routes except `/` (login page).

**Middleware pattern:**
```typescript
// admin/src/middleware.ts
import { defineMiddleware } from 'astro:middleware';
import { hashPassword } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Public routes: login page and auth API
  if (pathname === '/' || pathname === '/api/auth') {
    return next();
  }

  // All other routes require auth cookie
  const sessionCookie = context.cookies.get('admin_session');
  const expectedHash = await hashPassword(
    context.locals.runtime.env.ADMIN_PASSWORD
  );

  if (!sessionCookie || sessionCookie.value !== expectedHash) {
    return context.redirect('/');
  }

  return next();
});
```

**Cookie set on login:**
```typescript
// admin/src/pages/api/auth.ts
export const prerender = false;

export async function POST({ request, cookies, locals }: APIContext) {
  const { password } = await request.json();
  const hash = await hashPassword(password);
  const expectedHash = await hashPassword(locals.runtime.env.ADMIN_PASSWORD);

  if (hash !== expectedHash) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401
    });
  }

  cookies.set('admin_session', hash, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
```

### Pattern 3: Cloudflare D1 + Drizzle ORM for Client Data

**What:** Client and project data stored in Cloudflare D1 (SQLite-backed). Drizzle schema defines tables. API routes access D1 via `locals.runtime.env.DB`. Local development uses `wrangler dev` which creates a local SQLite file.

**D1 binding in wrangler.toml:**
```toml
[[d1_databases]]
binding = "DB"
database_name = "isio-admin"
database_id = "your-database-id-here"
preview_database_id = "DB"
```

**Drizzle schema:**
```typescript
// admin/src/lib/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const clients = sqliteTable('clients', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyName: text('company_name').notNull(),
  contactPerson: text('contact_person'),
  email: text('email').notNull(),
  phone: text('phone'),
  cui: text('cui'),              // Romanian fiscal code
  address: text('address'),
  iban: text('iban'),            // Client's bank details for invoices
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()),
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  clientId: text('client_id').notNull().references(() => clients.id),
  name: text('name').notNull(),
  dueDate: integer('due_date', { mode: 'timestamp' }),
  status: text('status', {
    enum: ['not_started', 'in_progress', 'review', 'blocked', 'done']
  }).default('not_started'),
});
```

**Accessing D1 in API routes:**
```typescript
// admin/src/pages/api/clients.ts
export const prerender = false;
import { drizzle } from 'drizzle-orm/d1';
import { clients } from '../../lib/schema';

export async function GET({ locals }: APIContext) {
  const db = drizzle(locals.runtime.env.DB);
  const allClients = await db.select().from(clients).all();
  return new Response(JSON.stringify(allClients));
}
```

**Local dev access (wrangler dev, not astro dev):**
```bash
# Must use wrangler dev for D1 access — astro dev does NOT have D1 binding
wrangler dev  # serves admin at localhost:8788 with local D1
```

### Pattern 4: Document Template Structure (Bilingual)

**What:** Each document type has a TypeScript generator function that accepts `{ data, locale }` and returns a configured jsPDF instance ready for preview or download. Text labels are looked up from a locale map. Client data fills template fields.

**Template pattern:**
```typescript
// admin/src/pdf/templates/invoice.ts
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const labels = {
  ro: {
    title: 'FACTURĂ',
    invoiceNumber: 'Nr. Factură',
    date: 'Data',
    dueDate: 'Scadență',
    billTo: 'Facturăm către',
    description: 'Descriere',
    qty: 'Cant.',
    unitPrice: 'Preț Unitar',
    total: 'Total',
    bankDetails: 'Date Bancare',
    iban: 'IBAN',
  },
  en: {
    title: 'INVOICE',
    invoiceNumber: 'Invoice No.',
    date: 'Date',
    dueDate: 'Due Date',
    billTo: 'Bill To',
    description: 'Description',
    qty: 'Qty',
    unitPrice: 'Unit Price',
    total: 'Total',
    bankDetails: 'Bank Details',
    iban: 'IBAN',
  }
};

export async function generateInvoice(
  doc: jsPDF,
  data: InvoiceData,
  locale: 'ro' | 'en'
) {
  const t = labels[locale];
  // Header: Isio branding + invoice title
  // Client info block
  // Line items table via autoTable
  // Total
  // Isio IBAN / bank details
  // Footer
}
```

### Anti-Patterns to Avoid

- **Running @react-pdf/renderer on Cloudflare Workers:** yoga-layout (a dependency) triggers "Wasm code generation disallowed by embedder" in the Workers runtime. There is a manual patch workaround but it is fragile and version-dependent.
- **Using pdf-lib + fontkit on Cloudflare Workers:** workers-sdk issue #8140 documents `PDFDocument_default.registerFontkit is not a function` in the edge runtime. The issue was closed without a fix; the workaround redirects to Puppeteer.
- **Using cedilla diacritics (ş/ţ) instead of comma-below (ș/ț):** Unicode U+015F (ș) and U+0163 (ț) are correct Romanian. U+015F vs U+015E (Ş/ş cedilla) look similar in many fonts but are different Unicode code points. Always verify template source strings use comma-below.
- **Using Cloudflare Browser Rendering for an admin-only tool:** Browser Rendering now charges $0.09/browser-hour beyond free tier (billing started August 20, 2025). For an admin generating 5-20 PDFs/month, client-side jsPDF is zero-cost and simpler.
- **Storing client IBAN data in localStorage:** Client financial data (CUI, IBAN) should persist in D1, not browser storage. localStorage can be cleared, doesn't sync across devices, and is XSS-accessible.
- **Using `astro dev` for D1 development:** `astro dev` (Vite mode) does not have access to Cloudflare bindings like D1. Development with D1 requires `wrangler dev`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| PDF table layout (invoice line items) | Custom table drawing with jsPDF coordinates | `jspdf-autotable` | Manual coordinate-based table drawing is error-prone, doesn't handle overflow, has no column-width management |
| Cookie hashing | Custom crypto implementation | `crypto.subtle.digest` (Web Crypto API, built into Workers) | Web Crypto API is constant-time; ad-hoc implementations risk timing attacks |
| Font TTF conversion | Custom font converter or base64 script | `addFileToVFS` + fetch the TTF at runtime | Bundling font as a hand-crafted base64 JS file is fragile; dynamic fetch works in the browser and keeps the asset properly versioned |
| Session management library | Hand-rolled JWT or session tokens | Simple HttpOnly cookie with hashed shared secret | For a single-admin tool, full session libraries (Lucia, BetterAuth) are overengineering |
| D1 SQL queries | Raw SQL strings | Drizzle ORM (already in stack) | Type-safe; migration-managed; consistent with rest of project |
| PDF preview rendering | Custom HTML-to-PDF preview in iframe | `doc.output('blob')` + `URL.createObjectURL` → iframe | jsPDF renders the exact same object for preview and download; no divergence between what admin sees and what downloads |

**Key insight:** The entire PDF stack runs in the admin's browser. The server only stores client data and handles auth. This split keeps the server surface minimal and avoids all serverless-PDF-generation complexity.

---

## Common Pitfalls

### Pitfall 1: Wrong Romanian Diacritic Unicode Points
**What goes wrong:** Romanian text renders with missing glyphs (empty boxes) or wrong characters because the template strings use cedilla variants (U+0162/U+0163 ş/ţ cedilla) instead of the correct comma-below variants (U+015E/U+015F ș/ț and U+0218/U+0219 Ș/ș).
**Why it happens:** The two sets look nearly identical in most code editors. Copy-pasted text from Word or old documents often uses the wrong code points. Some fonts render them identically, hiding the bug until the font changes.
**How to avoid:** In all template strings, explicitly write ș (U+015F), ț (U+0163), ă (U+0103), â (U+00E2), î (U+00EE). Never copy Romanian text from external sources without verifying code points.
**Warning signs:** If a Romanian word like "și" looks correct in your editor but the PDF shows a question mark or box, the font may not have the exact code point being used.

### Pitfall 2: wrangler dev vs astro dev Confusion
**What goes wrong:** Developer runs `astro dev` (which uses Vite), makes API calls, and gets 500 errors from `locals.runtime.env.DB` being undefined.
**Why it happens:** `astro dev` uses Vite's dev server which does NOT simulate Cloudflare Workers bindings. D1, KV, and other bindings are only available when running `wrangler dev`.
**How to avoid:** In the admin directory, always use `wrangler dev` for development. Document this in the README. Add a `dev` script that uses `wrangler dev` not `astro dev`.
**Warning signs:** `TypeError: Cannot read properties of undefined (reading 'DB')` in API routes during local dev.

### Pitfall 3: jsPDF Font Not Applied to All Text Calls
**What goes wrong:** Most text renders with Noto Sans and Romanian diacritics work, but a few `doc.text()` or `autoTable` cells fall back to the default Helvetica font, showing boxes for Romanian characters.
**Why it happens:** jsPDF requires `doc.setFont('NotoSans')` to be called before each text block. autoTable has its own `styles.font` configuration. A missed call uses the built-in Latin-only font.
**How to avoid:** After registering Noto Sans, call `doc.setFont('NotoSans')` once at the start of each template function. In autoTable calls, set `styles: { font: 'NotoSans' }` in the configuration. Add a test that specifically checks comma-below characters render without fallback.
**Warning signs:** Mixed rendering — some text correct, some boxes — indicates font not set for a specific call.

### Pitfall 4: Cloudflare D1 Binding Name Mismatch
**What goes wrong:** `locals.runtime.env.DB` returns undefined at runtime despite wrangler.toml having the binding.
**Why it happens:** The binding name in wrangler.toml (`binding = "DB"`) must match exactly the name used in code. Deployment and preview environments can have different binding configurations.
**How to avoid:** Use a single consistent binding name (`DB`) throughout. Add TypeScript types via `wrangler types` command to get compile-time errors on wrong binding names.
**Warning signs:** Undefined in production only (not caught in local dev with wrangler dev).

### Pitfall 5: Resend `attachments` Format for PDF
**What goes wrong:** PDF email fails because `content` field expects base64 string but jsPDF outputs Buffer, Uint8Array, or blob depending on output format.
**Why it happens:** `doc.output('arraybuffer')` returns ArrayBuffer; Resend `attachments` expects `{ filename, content }` where `content` is a base64 string.
**How to avoid:** Convert jsPDF output explicitly: `const base64 = doc.output('datauristring').split(',')[1]` or use `Buffer.from(doc.output('arraybuffer')).toString('base64')` in the API route if sending server-side.
**Warning signs:** Resend API returns 400 on email with attachment; PDF attachment is 0 bytes or corrupted.

### Pitfall 6: D1 Migration Not Run Before Deploy
**What goes wrong:** Production D1 database has no tables; all API calls return 500.
**Why it happens:** Creating a D1 database with `wrangler d1 create` creates an empty database. Schema migrations must be applied separately.
**How to avoid:** Document the one-time setup command: `wrangler d1 migrations apply isio-admin --remote`. Add this to the deployment checklist.
**Warning signs:** `no such table: clients` errors in production Workers logs.

---

## Code Examples

Verified patterns from official sources and known-working implementations:

### Noto Sans Font Loading for jsPDF (Browser)
```typescript
// Source: jsPDF npm docs (font loading pattern)
import { jsPDF } from 'jspdf';

export async function createDocWithFont(): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Load font bundled as static asset in /public/fonts/
  const response = await fetch('/fonts/NotoSans-Regular.ttf');
  const buffer = await response.arrayBuffer();
  const uint8 = new Uint8Array(buffer);

  // Convert Uint8Array to binary string for jsPDF VFS
  let binaryStr = '';
  for (let i = 0; i < uint8.length; i++) {
    binaryStr += String.fromCharCode(uint8[i]);
  }

  doc.addFileToVFS('NotoSans-Regular.ttf', btoa(binaryStr));
  doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.setFont('NotoSans');

  return doc;
}
```

### Romanian Diacritic Verification Test Strings
```typescript
// Use these exact Unicode strings in template test coverage:
const RO_TEST = 'ăâîșț ĂÂÎȘȚ'; // comma-below ș (U+015F) ț (U+0163)
// NOT: ş ţ (cedilla — wrong for Romanian)

// Romanian invoice label example with correct diacritics:
const roLabels = {
  billTo: 'Facturăm către',     // ă U+0103, ă U+0103
  description: 'Descriere',
  dueDate: 'Scadență',          // ț U+0163
  invoiceTitle: 'FACTURĂ',      // Ă U+0102
};
```

### jsPDF AutoTable Invoice Pattern
```typescript
// Source: jspdf-autotable npm docs
import autoTable from 'jspdf-autotable';

export function addLineItems(
  doc: jsPDF,
  items: LineItem[],
  locale: 'ro' | 'en',
  yOffset: number
) {
  const t = locale === 'ro'
    ? { desc: 'Descriere', qty: 'Cant.', price: 'Preț', total: 'Total' }
    : { desc: 'Description', qty: 'Qty', price: 'Price', total: 'Total' };

  autoTable(doc, {
    startY: yOffset,
    head: [[t.desc, t.qty, t.price, t.total]],
    body: items.map(item => [
      item.description,
      item.quantity.toString(),
      `€${item.unitPrice.toFixed(2)}`,
      `€${(item.quantity * item.unitPrice).toFixed(2)}`
    ]),
    styles: {
      font: 'NotoSans',        // Critical: must specify NotoSans for Romanian
      fontSize: 10,
    },
    headStyles: { fillColor: [30, 30, 30], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' },
    },
  });
}
```

### Cloudflare D1 Local Dev Setup
```toml
# admin/wrangler.toml
name = "isio-admin"
compatibility_date = "2025-01-01"

[[d1_databases]]
binding = "DB"
database_name = "isio-admin"
database_id = "replace-with-real-id-after-wrangler-d1-create"
preview_database_id = "DB"
```

```bash
# One-time setup commands:
wrangler d1 create isio-admin           # Creates DB, outputs database_id
wrangler d1 migrations apply isio-admin # Applies Drizzle migrations locally
# For production:
wrangler d1 migrations apply isio-admin --remote
```

### Astro Config for Admin Dashboard
```typescript
// admin/astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',              // Full SSR — admin pages are dynamic
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      persist: true,             // Persist local D1 data between restarts
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Auth Helper (SHA-256 with Web Crypto API)
```typescript
// admin/src/lib/auth.ts
// Source: Web Crypto API (MDN) — available in Cloudflare Workers runtime
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
```

### PDF Preview in Iframe (D-19)
```typescript
// Called from admin dashboard client-side script
export async function previewDocument(doc: jsPDF): Promise<void> {
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const iframe = document.querySelector<HTMLIFrameElement>('#pdf-preview');
  if (iframe) {
    iframe.src = url;
    // Store URL for cleanup on navigation
    iframe.dataset.blobUrl = url;
  }
}

export function cleanupPreview(): void {
  const iframe = document.querySelector<HTMLIFrameElement>('#pdf-preview');
  if (iframe?.dataset.blobUrl) {
    URL.revokeObjectURL(iframe.dataset.blobUrl);
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Puppeteer for server-side PDF | jsPDF client-side OR Cloudflare Browser Rendering | 2024 | Puppeteer requires 200MB+ Chromium binary; incompatible with Cloudflare Workers bundle size limits |
| @react-pdf/renderer on Cloudflare Workers | @react-pdf/renderer on Node.js only OR jsPDF client-side | 2024 | yoga-layout WASM blocked in Workers isolate; client-side is the pragmatic workaround |
| pdf-lib + fontkit on Workers | pdf-lib client-side only | 2025 | ESM module resolution issue (registerFontkit error) in Workers runtime; closed without fix |
| Cloudflare Browser Rendering (free) | Cloudflare Browser Rendering (paid, $0.09/hr after free tier) | August 2025 | Billing introduced August 20, 2025; still has 10 min/day free on Workers Free plan |
| Sanity Studio as admin CRM (Phase 1 architecture) | Standalone Astro admin app + Cloudflare D1 | Phase 4 CONTEXT.md | Project pivoted away from Sanity; admin is now standalone with D1 for persistence |

**Deprecated/outdated:**
- Architecture Research ARCHITECTURE.md pattern recommending @react-pdf/renderer on the server and Sanity as admin CRM: superseded by Phase 4 CONTEXT.md decisions D-01 and the Cloudflare Workers incompatibility discovered for react-pdf.
- The architecture diagram in ARCHITECTURE.md showing Sanity Studio at `/studio` route: project uses Astro content collections (JSON files), not Sanity.

---

## Open Questions

1. **Noto Sans font weight variants for bold headers**
   - What we know: Noto Sans TTF supports Regular, Bold, Italic, BoldItalic. Bold requires a separate TTF file registered separately in jsPDF.
   - What's unclear: Whether the admin dashboard benefits from embedded Bold for document headings or if CSS-like visual hierarchy can be achieved with font size alone.
   - Recommendation: Start with Regular only. Add Bold TTF as a second registered font if visual hierarchy feels insufficient during template design.

2. **Admin dashboard deployment subdomain**
   - What we know: Cloudflare Pages assigns a `*.pages.dev` subdomain per project. A custom domain (e.g., `admin.isio.ro`) requires adding a CNAME in Cloudflare DNS.
   - What's unclear: Whether the admin should be at `admin.isio.ro`, `isio.ro/admin/` (same Pages project), or a `.pages.dev` URL.
   - Recommendation: Deploy as a separate Cloudflare Pages project with a custom subdomain `admin.isio.ro`. Keeps admin completely isolated from the public site build.

3. **Email attachment for jsPDF-generated PDF**
   - What we know: jsPDF generates PDFs client-side. Resend SDK is server-side. To email a PDF, the PDF bytes must somehow reach the server.
   - What's unclear: The cleanest way to send a browser-generated PDF via Resend — either: (a) client sends base64 PDF to `/api/email-pdf` which calls Resend, or (b) server regenerates the PDF using the same template data.
   - Recommendation: Client-side approach (a) — admin generates PDF in browser, clicks "Email to client", dashboard POSTs `{ to, filename, pdfBase64, clientId }` to `/api/email-pdf`, which calls Resend with `attachments: [{ filename, content: pdfBase64 }]`. Avoids duplicating template logic on the server.

4. **D1 database_id for wrangler.toml**
   - What we know: D1 database must be created with `wrangler d1 create isio-admin` before deploying; this generates a UUID database_id.
   - What's unclear: Whether an existing D1 database exists on this Cloudflare account already.
   - Recommendation: Wave 0 task to run `wrangler d1 create isio-admin` and record the database_id.

---

## Validation Architecture

> `workflow.nyquist_validation` is `false` in `.planning/config.json` — this section is skipped.

---

## Sources

### Primary (HIGH confidence)
- [jsPDF npm package](https://www.npmjs.com/package/jspdf) — version 4.2.1, TTF font embedding API, client-side generation
- [jspdf-autotable npm package](https://www.npmjs.com/package/jspdf-autotable) — version 5.0.7, table API, styles.font configuration
- [Cloudflare D1 Pricing](https://developers.cloudflare.com/d1/platform/pricing/) — free tier: 5M reads/day, 100K writes/day, 5GB storage
- [Cloudflare Browser Rendering Pricing](https://developers.cloudflare.com/browser-rendering/pricing/) — $0.09/browser-hour, billing started August 20, 2025
- [Astro Cloudflare Adapter docs](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) — platformProxy configuration for D1 local dev
- [Web Crypto API MDN / Cloudflare Workers](https://developers.cloudflare.com/workers/runtime-apis/web-standards/) — `crypto.subtle.digest` available in Workers
- [Noto Sans — Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans) — contains all Romanian comma-below glyphs; 3,741 glyphs covering 2,840 characters; OFL license
- [kevinkipp.com: Going full-stack on Astro with Cloudflare D1 and Drizzle](https://kevinkipp.com/blog/going-full-stack-on-astro-with-cloudflare-d1-and-drizzle/) — wrangler.toml pattern, `drizzle(locals.runtime.env.DB)` API route access

### Secondary (MEDIUM confidence)
- [Cloudflare workers-sdk issue #8140](https://github.com/cloudflare/workers-sdk/issues/8140) — PDFDocument_default.registerFontkit not a function — confirms pdf-lib + fontkit fails in Workers; closed without fix
- [react-pdf Cloudflare Worker compatibility issue #2757](https://github.com/diegomura/react-pdf/issues/2757) — yoga-layout WASM blocked in Workers isolate; manual patch required
- [Password Protection for Cloudflare Pages (DEV Community)](https://dev.to/charca/password-protection-for-cloudflare-pages-8ma) — shared-secret cookie pattern with SHA-256 hash
- [Noto Sans Romanian diacritics GitHub issue](https://github.com/notofonts/latin-greek-cyrillic/issues/214) — confirms comma-below diacritic stacking in Noto Sans Mono; relevant to main Noto Sans handling
- Astro middleware + cookies docs — `context.cookies.set()` with httpOnly, secure, sameSite options

### Tertiary (LOW confidence — flag for validation)
- jsPDF Uint8Array → binary string conversion pattern: documented in community examples; confirmed works conceptually but specific async loading should be tested in the target browser.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package versions verified via npm, D1 pricing confirmed from official Cloudflare docs, jsPDF TTF support confirmed from official npm page
- Architecture: HIGH — Astro + Cloudflare D1 + Drizzle is a documented and working combination; multiple blog posts confirm the pattern; admin-separate-from-public-site is a straightforward deployment decision
- PDF generation approach: HIGH — client-side jsPDF is unambiguously the right call given documented Workers incompatibilities with pdf-lib and react-pdf; Cloudflare Browser Rendering is now paid
- Pitfalls: HIGH — diacritic code points are factual Unicode; wrangler dev vs astro dev issue is documented; jsPDF font scoping is a known pattern
- Romanian diacritics: HIGH — Unicode code points are fixed; Noto Sans glyph coverage confirmed from official Noto docs

**Research date:** 2026-03-22
**Valid until:** 2026-09-22 (stable technologies; D1 pricing and Browser Rendering pricing may change; re-verify if deploying after this date)
