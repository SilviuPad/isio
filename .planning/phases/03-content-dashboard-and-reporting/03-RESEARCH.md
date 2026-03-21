# Phase 3: Content, Dashboard, and Reporting - Research

**Researched:** 2026-03-21
**Domain:** Autonomous content generation pipeline (Genkit+Gemini), REST API server (Hono), Cloudflare R2 storage (S3-compatible), Unsplash API, Puppeteer PDF with Chart.js, Flesch readability, StoryPic admin dashboard integration, Resend email reporting
**Confidence:** HIGH — entire stack is verified against the shipped seo-pilot v1.0 codebase (2026-03-15) and official docs

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Select blog topic based on keyword gaps, search volume, competition, and relevance | Keyword gap data lives in `seoTasks` (category='content', module='keywords') from Phase 2 KW-06; content module queries highest-priority open content-gap task |
| CONT-02 | Generate full blog post via Genkit+Gemini with research, outline, draft, and optimize phases | `ai.defineFlow()` with four sequential `ai.generate()` steps; scraper fetches top-ranking pages for keyword research context before outline begins |
| CONT-03 | Enforce content quality gates: Flesch score >60, keyword in title/H1/first paragraph, 1200-2000 words | `text-readability` npm package (`rs.fleschReadingEase(text)`) for Flesch; retry-once with targeted feedback prompt; never discard content |
| CONT-04 | Generate featured image — Unsplash stock photo default, Runware AI upgrade option | Unsplash REST API (direct fetch — official SDK archived); upload to Cloudflare R2 via `@aws-sdk/client-s3`; Runware endpoint triggered from admin UI, not cron pipeline |
| CONT-05 | Save as draft blog post — never auto-publish (inviolable safety gate) | Two delivery paths: direct client DB via pending-changes table (awaits approval) or HTTP POST to StoryPic `/api/internal/blog-drafts`; status field always 'draft' |
| CONT-06 | Create review task and send email notification with preview link | `createTaskIfNew()` dedup helper; `createEmailService()` to send blog-review email with title, excerpt, Flesch score, word count, preview URL |
| DASH-01 | `/admin/seo-tasks` page showing all agent tasks with filtering by category, priority, status | Hono REST API `GET /api/tasks` with query params; StoryPic admin fetches and renders |
| DASH-02 | Task detail view with markdown description, evidence, suggested action, estimated impact | `GET /api/tasks/:id` — all fields already in `seoTasks` schema (description, evidence jsonb, suggestedAction, estimatedImpact) |
| DASH-03 | Status management — mark tasks as in_progress, completed, or dismissed | `PATCH /api/tasks/:id` with `{ status }` body — validated against taskStatusEnum |
| DASH-04 | Agent run history timeline showing past executions with summaries | `GET /api/runs` — queries `agentRuns` table ordered by `startedAt` desc; pagination supported |
| DASH-05 | SEO metrics overview with sparkline trends (organic clicks, impressions, avg position) | `GET /api/metrics` with metric name and date range; data in `seoMetrics` table from analytics module (Phase 2) |
| RPT-01 | Generate weekly email report with organic performance, top keywords, content performance, audit score, tasks summary | Report module queries `seoMetrics` + `seoTasks` + `agentRuns`; renders extended weekly-digest template; sends via `createEmailService()` |
| RPT-02 | Generate monthly PDF report via Puppeteer with trend analysis and exec-ready formatting | `puppeteer.launch()` → `page.setContent(html, {waitUntil:'networkidle0'})` → `page.pdf({format:'A4', printBackground:true})` → upload buffer to R2 |
| RPT-03 | Include three headline scores: Health Score, AI Visibility Score, Link Health Score | Phase 3: Health Score only (from `agentRuns.data`). AI Visibility and Link Health Score sections added in Phases 4-5 |
| RPT-04 | AI-generated narrative summary that is actionable, not generic | `createAiService().generateText()` with metrics-rich prompt; narrative included in both weekly email and monthly PDF |
| RPT-05 | Archive reports for download from admin panel | PDF/HTML buffers uploaded to R2 via `@aws-sdk/client-s3` PutObjectCommand; R2 URL stored in `reportArchives` table |
</phase_requirements>

---

## Summary

Phase 3 adds three new capabilities to seo-pilot: an autonomous content generation pipeline, a lightweight REST API that exposes seo-pilot data to the StoryPic admin dashboard, and a reporting module that delivers weekly email digests and monthly PDF reports. All three capabilities build directly on the factory pattern, DB schema, and shared services established in Phases 1 and 2.

The content pipeline is the most complex piece. It implements a four-stage model (research → outline → draft → optimize) as a Genkit flow using Gemini Flash. The pipeline enforces quality gates (Flesch >60, 1200-2000 words, keyword placement), applies one targeted retry before saving anyway, fetches a stock photo from Unsplash and uploads it to Cloudflare R2, then submits the draft to either a direct client DB path or the StoryPic HTTP API. The "never discard content" invariant means pipeline failures at the submission step are recovered by logging the full draft payload to `agentRuns.data` and creating a manual retry task.

The REST API is a Hono server running in the same Node.js process as the cron scheduler. It uses Hono's built-in JWT middleware for authentication, exposes eight core routes (tasks, runs, metrics, reports, health), and serves the admin UI as static files from `ui/dist`. The reporting module builds a weekly HTML email from `seoMetrics`, `seoTasks`, and `agentRuns` data, and generates a monthly PDF by feeding a Chart.js-powered HTML template through Puppeteer, then archives both to Cloudflare R2.

**Primary recommendation:** Use Hono for the REST API, `text-readability` for Flesch scoring, `@aws-sdk/client-s3` for R2 uploads, direct Unsplash REST API (no SDK — the official SDK is archived and unmaintained), Puppeteer for PDF generation with Chart.js loaded via CDN script tag, and `@runware/sdk-js` for the AI image generation endpoint (triggered by admin UI, not the cron pipeline). This is the exact stack shipped in seo-pilot v1.0.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `hono` | ^4.12.8 | REST API server (tasks, metrics, runs, reports) | Lightest option with built-in JWT middleware; runs on Node.js via `@hono/node-server`; TypeScript-first; no Express/Fastify overhead; verified in production |
| `@hono/node-server` | ^1.19.11 | Node.js HTTP adapter for Hono | Required to run Hono's `serve()` on standard Node.js HTTP; zero config |
| `puppeteer` | ^24.39.1 | Headless Chrome PDF generation | Only reliable way to render Chart.js charts to PDF; `page.setContent()` + `page.pdf()` pipeline; bundles Chromium |
| `@aws-sdk/client-s3` | ^3.1009.0 | Cloudflare R2 uploads (S3-compatible API) | Cloudflare officially documents this for R2; handles SigV4 request signing which R2 requires; v3 modular install |
| `text-readability` | ^1.1.1 | Flesch Reading Ease scoring | `rs.fleschReadingEase(text)` returns score; handles syllable counting edge cases (hyphenation, numerals, acronyms); established npm package |
| `@runware/sdk-js` | ^1.0.1 | AI image generation (admin-triggered endpoint) | Official Runware SDK; already in StoryPic stack; triggered by admin UI, not cron pipeline |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `chart.js` (CDN) | 4.x via CDN | Sparkline and trend charts in monthly PDF | Loaded via `<script>` tag in Puppeteer's `setContent` HTML; no npm install needed; avoids `canvas` native binding issues |
| `jsonwebtoken` | ^9.x | JWT sign/verify fallback | Only if Hono's built-in `hono/jwt` is insufficient for a specific use case; prefer Hono's built-in first |
| `marked` (CDN or inline) | 15.x | Markdown-to-HTML for PDF rendering | Include in Puppeteer HTML template to render markdown content in PDFs without a server-side conversion step |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hono | Fastify | Fastify is more feature-rich for large APIs; overkill for ~8 co-located endpoints |
| Hono | Express | Express has no built-in TypeScript types; heavier; Hono is the modern default for small TypeScript APIs |
| `text-readability` | Custom syllable counter + formula | Hand-rolling Flesch is ~30 lines but adds test burden for edge cases; `text-readability` is established and tested |
| Direct Unsplash REST fetch | `unsplash-js` SDK | Official SDK is archived (no updates since v7.0.20); direct fetch with `Authorization: Client-ID KEY` header is simpler |
| Puppeteer + Chart.js CDN | `chartjs-node-canvas` | `chartjs-node-canvas` requires canvas native C++ bindings; Puppeteer approach handles full CSS/branding naturally |
| `@aws-sdk/client-s3` | Raw fetch to R2 API | R2 requires SigV4 request signing; the SDK handles this automatically; manual signing is error-prone |

**Installation:**
```bash
npm install hono @hono/node-server puppeteer @aws-sdk/client-s3 text-readability
# @runware/sdk-js is already in StoryPic parent — declare as peer or reinstall if needed
```

Note: `puppeteer` installs a Chromium binary (~280MB on Linux/Windows). Ensure the Dockerfile/server has adequate disk space and `--no-sandbox` flag is set for containerized environments.

**Version notes (verified against seo-pilot package.json, shipped 2026-03-15):**
- `@aws-sdk/client-s3` resolved to `^3.1009.0` — must add `requestChecksumCalculation: 'WHEN_REQUIRED'` to S3Client config to avoid R2 compatibility break introduced in v3.729.0
- `hono` resolved to `^4.12.8` — JWT middleware is `hono/jwt`; Node.js adapter is `@hono/node-server@^1.19.11`
- `text-readability` resolved to `^1.1.1` — strip markdown syntax before scoring (see Pitfall 7)
- `genkit` parent version is `^1.8.0` but seo-pilot uses `^1.30.1` — match minor versions with `@genkit-ai/googleai`

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── api/                          # NEW: Hono REST API server
│   ├── index.ts                  # createApiServer() factory — Hono app + JWT middleware
│   ├── middleware/
│   │   └── auth.ts               # JWT bearer token validation middleware
│   └── routes/
│       ├── health.ts             # GET /health (no auth)
│       ├── auth.ts               # POST /auth/login (issues JWT)
│       ├── tasks.ts              # GET /api/tasks, GET /api/tasks/:id, PATCH /api/tasks/:id
│       ├── runs.ts               # GET /api/runs
│       ├── metrics.ts            # GET /api/metrics
│       └── reports.ts            # GET /api/reports (download links)
├── modules/
│   ├── content/
│   │   ├── index.ts              # run() entry point — orchestrates full pipeline
│   │   ├── research.ts           # scraper-based competitor research for keyword
│   │   ├── pipeline.ts           # Genkit flow: outline → draft → optimize steps
│   │   ├── quality-gate.ts       # Flesch check, word count, keyword placement
│   │   ├── image.ts              # Unsplash search → R2 upload → URL
│   │   └── storydraft.ts         # HTTP POST to StoryPic /api/internal/blog-drafts
│   ├── report/
│   │   ├── index.ts              # run() entry point — weekly + monthly branching
│   │   ├── weekly.ts             # Query metrics/tasks, render email, send
│   │   ├── monthly.ts            # Query metrics, render HTML, Puppeteer PDF, R2 upload
│   │   ├── narrative.ts          # AI-generated narrative via createAiService()
│   │   └── pdf-template.ts       # HTML template with Chart.js CDN for monthly PDF
│   └── helpers/
│       └── r2.ts                 # NEW: createR2Client() factory — wraps @aws-sdk/client-s3
└── db/
    └── schema/
        └── reports.ts            # NEW: reportArchives table schema
```

### Pattern 1: Hono API Server Co-Located with Cron Scheduler

**What:** A Hono HTTP server created inside the same `agent.ts` process as the cron scheduler. Both start on process boot.
**When to use:** Any time seo-pilot data needs to be read or mutated by an external consumer (StoryPic admin).

```typescript
// Source: https://hono.dev/docs/getting-started/nodejs
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import type { JwtVariables } from 'hono/jwt';

type Variables = JwtVariables;

export function createApiServer(db: DrizzleHttpClient, jwtSecret: string) {
  const app = new Hono<{ Variables: Variables }>();

  // JWT auth on all /api/* routes
  app.use('/api/*', jwt({ secret: jwtSecret, alg: 'HS256' }));

  app.get('/api/tasks', async (c) => {
    const { category, priority, status, limit = '50', offset = '0' } = c.req.query();
    // query seoTasks with forTenant() + optional filters
    return c.json({ tasks: [] });
  });

  app.patch('/api/tasks/:id', async (c) => {
    const { id } = c.req.param();
    const { status } = await c.req.json();
    // validate status against taskStatusEnum values, update seoTasks row
    return c.json({ success: true });
  });

  return app;
}

// In agent.ts, after startScheduler():
serve({ fetch: app.fetch, port: 3001 });
```

### Pattern 2: Genkit Multi-Step Content Flow

**What:** A `ai.defineFlow()` wrapping four sequential generation steps. Each step's output feeds the next.
**When to use:** Any multi-stage AI pipeline where intermediate results must be typed and validated.

```typescript
// Source: https://genkit.dev/docs/flows/
const blogPostFlow = ai.defineFlow(
  {
    name: 'blogPostFlow',
    inputSchema: z.object({ keyword: z.string(), researchContext: z.string() }),
    outputSchema: BlogPostOutputSchema,
  },
  async ({ keyword, researchContext }) => {
    // Step 1: Outline
    const { output: outline } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Create an SEO outline for "${keyword}" using this research:\n${researchContext}`,
      output: { schema: OutlineSchema },
    });

    // Step 2: Draft (1200-2000 words)
    const { text: draft } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Write a 1200-2000 word blog post from this outline:\n${JSON.stringify(outline)}`,
    });

    // Step 3: Optimize (readability, keyword density, internal links)
    const { text: optimized } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Optimize this draft for Flesch readability >60, add 2-3 internal links:\n${draft}`,
    });

    return { title: outline.title, content: optimized, outline };
  }
);
```

### Pattern 3: R2 Upload via S3-Compatible API

**What:** A factory function wrapping `@aws-sdk/client-s3` configured for Cloudflare R2.
**When to use:** Uploading images and PDF report archives to Cloudflare R2 from seo-pilot.

```typescript
// Source: https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export function createR2Client(accountId: string, accessKeyId: string, secretAccessKey: string) {
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
    // CRITICAL: Required for @aws-sdk/client-s3 >= 3.729.0 to maintain R2 compatibility
    requestChecksumCalculation: 'WHEN_REQUIRED',
  });

  return {
    async upload(bucket: string, key: string, body: Buffer, contentType: string): Promise<string> {
      await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }));
      return `https://${bucket}.${accountId}.r2.cloudflarestorage.com/${key}`;
    },
  };
}
```

### Pattern 4: Puppeteer PDF Generation

**What:** `page.setContent()` with Chart.js CDN HTML string, wait for JS execution, emit PDF buffer.
**When to use:** Monthly report PDF generation.

```typescript
// Source: https://pptr.dev/guides/pdf-generation
import puppeteer from 'puppeteer';

export async function renderHtmlToPdf(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // required in Docker
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  // Wait for Chart.js canvas renders to complete (see Pitfall 1)
  await page.waitForFunction('window.__chartsReady === true');
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
  });
  await browser.close();
  return Buffer.from(pdfBuffer);
}
```

### Pattern 5: Unsplash Photo Search (Direct REST — No SDK)

**What:** Direct fetch to Unsplash API. The official `unsplash-js` SDK is archived; do not use it.
**When to use:** Fetching a featured stock photo for each generated blog post.

```typescript
// Source: https://unsplash.com/documentation#search-photos
async function searchUnsplashPhoto(query: string, accessKey: string): Promise<string> {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });
  const data = await response.json() as { results: Array<{ urls: { regular: string } }> };
  if (!data.results.length) throw new Error(`No Unsplash photo found for "${query}"`);
  return data.results[0].urls.regular;
}
```

### Pattern 6: Quality Gate with Retry (CONT-03)

**What:** Flesch scoring on plain text (markdown stripped), retry only the optimize step with targeted feedback, save regardless.
**When to use:** After the Genkit flow returns a draft — always check before submission.

```typescript
// Quality gate check
import TextReadability from 'text-readability';
const rs = new TextReadability();

function checkQualityGate(markdownContent: string, keyword: string) {
  // Strip markdown before scoring (Pitfall 7)
  const plainText = markdownContent
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[_`]/g, '');

  const fleschScore = rs.fleschReadingEase(plainText);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const hasKeyword = markdownContent.toLowerCase().includes(keyword.toLowerCase());

  const issues: string[] = [];
  if (fleschScore < 60) issues.push(`Flesch score ${fleschScore.toFixed(1)} < 60`);
  if (wordCount < 1200) issues.push(`Word count ${wordCount} < 1200`);
  if (wordCount > 2000) issues.push(`Word count ${wordCount} > 2000`);
  if (!hasKeyword) issues.push(`Keyword "${keyword}" not found in content`);

  return { passed: issues.length === 0, fleschScore, wordCount, issues };
}
```

### Anti-Patterns to Avoid

- **Running Puppeteer without `--no-sandbox` in Docker:** Chrome sandboxing fails in containerized environments. Always pass `args: ['--no-sandbox', '--disable-setuid-sandbox']` in launch options.
- **Using `unsplash-js` npm package:** The official SDK is archived (last update v7.0.20). Use direct fetch with `Authorization: Client-ID KEY` header.
- **Emitting monthly PDF synchronously on the API server thread:** Puppeteer launches Chromium (~2-5 seconds). Always run in a cron module `run()`, never block an HTTP request handler.
- **Hard-coding JWT secret in source:** Must come from tenant config or environment variable. Never commit to source.
- **Calling Gemini 4 times sequentially without p-limit awareness:** The existing process-level `p-limit(3)` in `createAiService()` covers this. Four sequential calls are fine — they do not hit the limiter simultaneously.
- **Storing PDF reports only in `agentRuns.data`:** The JSONB column is not appropriate for large metadata or URLs to large files; use a dedicated `reportArchives` table with the R2 URL.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Flesch Reading Ease calculation | Custom syllable counter + formula | `text-readability` npm | Syllable counting has edge cases for hyphenation, acronyms, numerals — already handled |
| JWT validation middleware | Custom header parsing + verification | Hono's built-in `hono/jwt` | Handles expiry, algorithm checking, `401` error responses; tested and maintained |
| S3-compatible R2 upload | Raw fetch to R2 API | `@aws-sdk/client-s3` PutObjectCommand | R2 requires SigV4 request signing; SDK handles multipart, retries, signing automatically |
| HTML-to-PDF | PDFKit / jsPDF | Puppeteer | PDFKit cannot render HTML/CSS/Chart.js; Puppeteer uses real Chromium with full CSS support |
| Markdown rendering in PDF | Custom markdown parser | Include `marked.js` CDN in Puppeteer HTML template | PDF is already HTML-rendered; include `<script src="https://cdn.jsdelivr.net/npm/marked/...">` |
| Content deduplication | Custom "already drafted" query | `createTaskIfNew()` helper from `src/modules/helpers/tasks.ts` | Already implemented with tenant isolation; prevents duplicate review tasks for the same keyword |

**Key insight:** The content pipeline has four moving parts (Flesch gate, R2 upload, StoryPic API call, review email) — none should be custom-built. Each has a well-tested library or established HTTP API. The risk is in the orchestration: error handling at each step, retry logic, and the "never discard content" guarantee. Invest implementation effort in the pipeline wiring, not the individual components.

---

## Common Pitfalls

### Pitfall 1: Puppeteer Chart.js Rendering Race Condition
**What goes wrong:** Chart.js renders asynchronously via JavaScript. If only `waitUntil: 'networkidle0'` is used, charts may not be fully drawn when `page.pdf()` is called, producing blank white boxes in the PDF.
**Why it happens:** Chart.js canvas animation completes after `DOMContentLoaded` and after the CDN script loads. `networkidle0` waits for network activity but not for canvas draw completion.
**How to avoid:** Set `animation: { duration: 0 }` in Chart.js config. After all chart instances are created, set `window.__chartsReady = true` in a script tag. Use `page.waitForFunction('window.__chartsReady === true')` before calling `page.pdf()`.
**Warning signs:** PDF has blank white boxes where charts should appear.

### Pitfall 2: Quality Gate Retry — Retry Only the Optimize Step
**What goes wrong:** Retrying the full content pipeline (outline + draft + optimize) on quality failure doubles AI token cost and latency unnecessarily.
**Why it happens:** The quality gate fires post-generation; a naive retry reruns all steps.
**How to avoid:** Retry only the `optimize` step with specific targeted feedback ("Flesch score was 48 — use shorter sentences and simpler vocabulary"). This reduces cost without sacrificing quality improvement. Save regardless after the single retry — never discard content.
**Warning signs:** Two full Genkit flows logged in sequence for a single post run.

### Pitfall 3: Hono JWT Middleware Blocking API During Development
**What goes wrong:** StoryPic dev environment has no JWT token configured, causing all `/api/*` calls to return `401`.
**Why it happens:** JWT middleware is applied globally to `/api/*`.
**How to avoid:** Add a `SKIP_JWT_AUTH=true` env var that bypasses the middleware in development only. Log a warning at startup when this flag is set. Document the `POST /auth/login` endpoint for obtaining tokens.
**Warning signs:** StoryPic dashboard shows empty data despite seo-pilot running locally.

### Pitfall 4: R2 Upload — AWS SDK v3.729.0+ Checksum Compatibility Break
**What goes wrong:** AWS SDK v3.729.0 introduced automatic checksum calculation headers that Cloudflare R2 does not support, causing R2 to return `400` or `501` errors.
**Why it happens:** R2 uses S3-compatible API but does not implement all S3 protocol extensions.
**How to avoid:** Add `requestChecksumCalculation: 'WHEN_REQUIRED'` to the `S3Client` constructor config. This is required for any `@aws-sdk/client-s3` version >= 3.729.0.
**Warning signs:** R2 upload returns 400 or 501 errors after a dependency update; error message references checksum.

### Pitfall 5: Content Module Selecting Already-Drafted Keywords
**What goes wrong:** The content module selects a keyword gap that already has a pending draft, generating a duplicate blog post.
**Why it happens:** `seoTasks` content-gap records are not automatically closed when a draft is submitted.
**How to avoid:** (1) Before selecting a gap task, check for existing open review tasks with the same keyword title. (2) After successful draft submission, mark the originating content-gap task as `completed` via a DB update. Both checks are required — the dedup check is a safety net.
**Warning signs:** Duplicate blog drafts appear in StoryPic with the same target keyword.

### Pitfall 6: StoryPic API Failure After R2 Upload — Content Loss Risk
**What goes wrong:** The HTTP POST to StoryPic `/api/internal/blog-drafts` fails (StoryPic down, network error) after content was generated and image uploaded to R2, resulting in orphaned R2 files and lost content.
**Why it happens:** The pipeline has irreversible side effects (R2 upload) before the final API call.
**How to avoid:** On StoryPic API failure: log the full draft payload to `agentRuns.data` (content is preserved) and create a manual task "Retry blog draft submission for keyword X" via `createTaskIfNew()`. Do not re-generate content. The content is recoverable from `agentRuns.data`.
**Warning signs:** R2 has images with no corresponding blog draft in StoryPic; `agentRuns.data` contains `{ draftPayload: {...} }` entries.

### Pitfall 7: Flesch Score Inflated by Markdown Syntax Characters
**What goes wrong:** `text-readability` calculates Flesch on raw markdown content, treating `##`, `**`, `[text](url)` as word content, producing inflated syllable counts and distorted scores.
**Why it happens:** `text-readability` treats all text characters as content with no markdown awareness.
**How to avoid:** Strip markdown syntax before passing to `rs.fleschReadingEase()`. A regex pass removing headings, bold/italic markers, and link syntax suffices. Score on plain text; store and submit markdown content.
**Warning signs:** Flesch score is unexpectedly low for readable prose; manually counted score differs from library output.

### Pitfall 8: Genkit Version Mismatch — genkit and @genkit-ai/googleai Must Match Minor Versions
**What goes wrong:** Using `genkit@1.30.1` with `@genkit-ai/googleai@1.8.0` causes plugin registration failures or missing model availability errors at runtime.
**Why it happens:** Genkit uses a plugin interface that is not guaranteed to be backward-compatible across minor versions.
**How to avoid:** Always pin `genkit` and `@genkit-ai/googleai` to the same minor version. If upgrading, upgrade both together.
**Warning signs:** `ai.model('gemini-2.5-flash')` throws `PluginNotFound` or model not registered errors at startup.

---

## Code Examples

Verified patterns from the shipped seo-pilot v1.0 codebase:

### Hono JWT Route — Full Middleware Setup
```typescript
// Source: https://hono.dev/docs/middleware/builtin/jwt
import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import type { JwtVariables } from 'hono/jwt';

type Variables = JwtVariables;

export function createApiServer(db: DrizzleHttpClient, jwtSecret: string) {
  const app = new Hono<{ Variables: Variables }>();

  app.use('/api/*', jwt({ secret: jwtSecret, alg: 'HS256' }));

  app.get('/api/tasks', async (c) => {
    // c.get('jwtPayload') available after middleware
    const { category, priority, status, limit = '50', offset = '0' } = c.req.query();
    // query seoTasks with forTenant() + optional filters
    return c.json({ tasks: [] });
  });

  return app;
}
```

### R2 Client with Checksum Fix
```typescript
// Source: Cloudflare R2 docs — https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  requestChecksumCalculation: 'WHEN_REQUIRED', // REQUIRED for SDK >= 3.729.0
});
```

### Unsplash Direct REST Fetch
```typescript
// Source: https://unsplash.com/documentation#search-photos
const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=1&orientation=landscape`;
const resp = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } });
const { results } = await resp.json();
const imageUrl = results[0]?.urls?.regular ?? null;
```

### Puppeteer PDF with Chart.js Ready Signal
```typescript
// Source: https://pptr.dev/guides/pdf-generation
const html = `
  <html>
  <body>
    <canvas id="myChart"></canvas>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
    <script>
      new Chart(document.getElementById('myChart'), {
        type: 'line',
        data: ${JSON.stringify(chartData)},
        options: { animation: { duration: 0 } }  // disable animation
      });
      window.__chartsReady = true;  // signal for waitForFunction
    </script>
  </body>
  </html>`;

await page.setContent(html, { waitUntil: 'networkidle0' });
await page.waitForFunction('window.__chartsReady === true');
const pdf = await page.pdf({ format: 'A4', printBackground: true });
```

### Module Entrypoint Pattern (Content and Report)
```typescript
// All Phase 2+ modules follow this interface
import type { AgentRunContext, ModuleResult } from '../../types/context.js';

export async function run(ctx: AgentRunContext): Promise<ModuleResult> {
  const { tenantId, tenantConfig, db, logger } = ctx;
  // ... implementation
  return {
    success: true,
    tasksCreated: 0,
    summary: 'Module completed',
    data: { /* optional structured output */ },
  };
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `unsplash-js` SDK | Direct REST fetch with `Client-ID` header | SDK archived 2023 | Must not use npm package; direct fetch is simpler and more reliable |
| `@googleapis/analyticsdata` | `@google-analytics/data` | Deprecated by Google 2024 | Phase 2 already uses correct package; no action needed for Phase 3 |
| Express.js for small APIs | Hono with TypeScript generics | 2023-2024 ecosystem shift | Hono has built-in JWT, smaller footprint, Node.js adapter pattern |
| `chartjs-node-canvas` | Puppeteer + CDN Chart.js | Ongoing | `chartjs-node-canvas` requires C++ canvas bindings; Puppeteer approach renders full HTML+CSS |

**Deprecated/outdated:**
- `unsplash-js` (npm): Archived, unmaintained — use direct REST API
- `ts-node`: Slower than `tsx` (tsc vs esbuild); complex ESM configuration — use `tsx`
- `@googleapis/analyticsdata`: Deprecated by Google — use `@google-analytics/data`

---

## Open Questions

1. **Unsplash API rate limits on free tier**
   - What we know: Unsplash free tier allows 50 requests/hour
   - What's unclear: Whether 1 request/week (1 post/week cadence) is safe given all other seo-pilot API calls within the same hour
   - Recommendation: Wrap Unsplash call in try/catch with graceful fallback (continue without featured image); log warning but do not fail the pipeline

2. **reportArchives DB schema location**
   - What we know: The `reportArchives` table is referenced in the monthly report module and stores R2 URLs
   - What's unclear: Whether to place it in the existing `agent.ts` schema file or a separate `reports.ts`
   - Recommendation: Create `src/db/schema/reports.ts` to keep report-specific schema isolated; import in `drizzle.config.ts`

3. **Hono server port conflicts during dev**
   - What we know: The API server binds to port 3001 by default in the same process as the cron scheduler
   - What's unclear: Whether the port is configurable per-tenant in multi-tenant scenarios
   - Recommendation: Make port configurable via `tenantConfig.api.port` with fallback to `3001`; document in tenant config schema

---

## Sources

### Primary (HIGH confidence)
- seo-pilot v1.0 shipped codebase (`src/modules/content/index.ts`, `src/api/index.ts`, `src/modules/report/monthly.ts`, `package.json`) — ground truth for all pattern and version claims
- [Hono docs — Node.js getting started](https://hono.dev/docs/getting-started/nodejs) — `@hono/node-server` adapter pattern
- [Hono JWT middleware](https://hono.dev/docs/middleware/builtin/jwt) — `hono/jwt` usage and `JwtVariables` typing
- [Cloudflare R2 + AWS SDK v3 docs](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/) — S3Client config for R2, `requestChecksumCalculation` requirement
- [Puppeteer PDF generation guide](https://pptr.dev/guides/pdf-generation) — `page.setContent()` + `page.pdf()` pattern
- [Unsplash API documentation](https://unsplash.com/documentation#search-photos) — search endpoint, `Client-ID` header auth
- [Genkit flows documentation](https://genkit.dev/docs/flows/) — `ai.defineFlow()` multi-step pattern

### Secondary (MEDIUM confidence)
- [text-readability npm](https://www.npmjs.com/package/text-readability) — v1.1.1, `rs.fleschReadingEase()` API — confirmed against seo-pilot package.json
- [Chart.js CDN via jsDelivr](https://www.jsdelivr.com/package/npm/chart.js) — `animation: { duration: 0 }` config to prevent rendering race condition in Puppeteer

### Tertiary (LOW confidence)
- Chart.js `window.__chartsReady` pattern — community practice for signaling Puppeteer; not in official Chart.js docs but widely used to solve the canvas render race

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against seo-pilot v1.0 package.json (shipped production code)
- Architecture: HIGH — patterns taken directly from implemented and tested source files
- Pitfalls: HIGH — Pitfalls 1, 4, 7 are confirmed bugs that were encountered and fixed in seo-pilot v1.0; others are verified design decisions

**Research date:** 2026-03-21
**Valid until:** 2026-06-21 (stable libraries; Genkit minor version compatibility warrants re-check if upgrading past current minor)
