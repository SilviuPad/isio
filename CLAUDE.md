<!-- GSD:project-start source:PROJECT.md -->
## Project

**seo-pilot — Autonomous SEO & Marketing Agent**

An autonomous AI agent that acts as a dedicated SEO specialist and marketing manager for businesses. It runs on a cron schedule (locally or on a VPS), monitors site health, analyzes competitors, researches keywords, generates and optimizes blog content, A/B tests metadata, manages paid ad campaigns on Google and Facebook within strict budgets, tracks AI search visibility, builds backlinks, and surfaces actionable tasks — all without manual intervention. StoryPic (storypicbooks.com) is the first client; the system is designed for multi-tenant resale.

**Core Value:** Fully autonomous SEO and marketing execution that replaces $500-2000+/month specialists with a $0/month agent (excluding ad spend), while maintaining complete auditability and human oversight on content publishing and budget decisions.

### Constraints

- **Tech stack**: Node.js + TypeScript (matches StoryPic), Drizzle ORM, Neon PostgreSQL
- **Cost**: Zero paid tooling — all APIs must be free tier or open-source
- **Budget safety**: Hard spending caps enforced in code AND on ad platforms
- **Content safety**: Blog posts always draft, never auto-published
- **Scraping ethics**: Respect robots.txt, rate-limit to 1 req/sec, public pages only
- **Multi-tenant isolation**: Each business config has own credentials, no cross-tenant data access
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Context: What Already Exists in StoryPic
| Package | Version in Parent | Role |
|---------|------------------|------|
| `drizzle-orm` | ^0.45.1 | ORM for all DB access |
| `@neondatabase/serverless` | ^1.0.2 | Neon PostgreSQL driver |
| `drizzle-kit` | ^0.31.9 | Migrations (dev dep) |
| `genkit` | ^1.8.0 | AI orchestration framework |
| `@genkit-ai/googleai` | ^1.8.0 | Gemini Flash plugin for Genkit |
| `@runware/sdk-js` | ^1.0.1 | Image generation |
| `resend` | ^3.2.0 | Transactional email |
| `tsx` | ^4.16.2 | TypeScript runner |
| `zod` | ^3.25.76 | Schema validation |
| `dotenv` | ^16.6.1 | Environment config |
| `typescript` | ^5 | Language |
## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Node.js | >=20 LTS | Runtime | LTS, native `--experimental-strip-types` available, matches StoryPic constraint |
| TypeScript | ^5 (shared) | Language | Strict typing essential for multi-module agent; already in parent |
| `tsx` | ^4.16.2 (shared) | TS runner | Zero-config ESM+CJS, esbuild-based speed, no tsconfig complexity; already in parent |
| `croner` | ^10.0.0 | Cron scheduling | Zero dependencies, built-in TypeScript types (no `@types/` needed), supports pause/resume, used by pm2 and Uptime Kuma, OCPS 1.4 compliant; beats node-cron which has lagging external typings |
| `drizzle-orm` | ^0.45.1 (shared) | ORM | Already in stack; type-safe queries, Neon-compatible, zero overhead |
| `@neondatabase/serverless` | ^1.0.2 (shared) | DB driver | Already in stack; Neon-native WebSocket driver |
| `zod` | ^3.25.76 (shared) | Validation | v4 is 14x faster; already in stack; validates API responses, config files, env |
| `pino` | ^10.3.1 | Structured logging | 5x faster than Winston, built-in TypeScript types, JSON output ideal for agent audit trails; no @types/ needed |
### Google API Clients
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `googleapis` | ^171.4.0 | Search Console + PageSpeed | Official Google client, covers webmasters/v1 (Search Console) and PageSpeed REST API; single install vs multiple scoped packages |
| `@google-analytics/data` | ^5.2.1 | Google Analytics 4 | Recommended replacement for deprecated `@googleapis/analyticsdata`; uses `BetaAnalyticsDataClient` |
| `google-ads-api` | ^23.0.0 | Google Ads campaigns | Unofficial but widely used Opteo library; full TypeScript types; covers v23 (Jan 2026 release) |
### Meta Marketing API
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `facebook-nodejs-business-sdk` | ^22.0.0 | Facebook/Instagram ads | Official Meta SDK; v22 covers Marketing API v22; TypeScript types included |
### Web Scraping
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `cheerio` | ^1.2.0 | HTML parsing (static pages) | Fastest option for static HTML; fully TypeScript (no `@types/` needed); jQuery-like API; 500+ pages/min at low CPU |
| `robots-parser` | ^3.0.1 | robots.txt compliance | Draft-spec compliant; `isAllowed()`/`isDisallowed()` API; TypeScript definitions available; more widely maintained than `robots-txt-parser` |
### PDF Report Generation
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `puppeteer` | ^24.39.1 | Weekly/monthly PDF reports | Renders HTML+CSS to pixel-perfect PDFs; Handlebars templates give exec-ready formatting; only used on report schedule (not on every run) |
### AI & Image Generation
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `genkit` | ^1.8.0 (shared) | AI orchestration | Already in StoryPic stack; structured flows, prompt management, tracing |
| `@genkit-ai/googleai` | ^1.8.0 (shared) | Gemini Flash plugin | Already in stack; Gemini 1.5 Flash = cheapest quality model; free tier is generous |
| `@runware/sdk-js` | ^1.0.1 (shared) | Blog/social/ad image generation | Already in stack; sub-second inference, 150k+ models |
### Email
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `resend` | ^3.2.0 (shared) | Critical event notifications | Already in StoryPic stack; simple API; free tier 3,000/month |
### CLI Interface
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `commander` | ^13.0.0 | CLI argument parsing | Industry standard for Node.js CLIs; zero-dependency option parsing; TypeScript types built-in since v12 |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `handlebars` | ^4.7.8 | HTML templates for PDF reports | When generating weekly/monthly report HTML before Puppeteer renders |
| `date-fns` | ^3.6.0 (shared) | Date math for cron logic | Date range calculations for API queries (e.g., "last 28 days"); already in parent |
| `p-limit` | ^6.2.0 | Concurrency control | When making multiple API calls in a batch; limits to N concurrent requests |
| `p-retry` | ^6.2.1 | Retry with exponential backoff | When calling external APIs that have transient failures (Google, Meta) |
| `dotenv` | ^16.6.1 (shared) | Env config loading | Already in parent; loads per-tenant `.env` files or shared `.env` |
## Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| `tsx` | Run TypeScript directly | `tsx src/index.ts` — no compile step needed for dev/cron |
| `drizzle-kit` | DB schema migrations | `drizzle-kit generate && drizzle-kit migrate` |
| `typescript` | Type checking | `tsc --noEmit` in CI |
| `pino-pretty` | Human-readable dev logs | `tsx src/agent.ts | pino-pretty` in dev; raw JSON in prod |
## Installation
# New packages seo-pilot needs (not in parent)
# Dev
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| `croner` | `node-cron` | Never for this project — node-cron's TypeScript types are maintained separately and lag behind the library; croner has zero dependencies and built-in types |
| `croner` | `BullMQ` | If agent needs job persistence across restarts, Redis infrastructure, or distributed execution across multiple workers — out of scope here |
| `puppeteer` (PDF only) | `PDFKit` | If reports are simple text/table documents with no CSS styling requirements |
| `cheerio` | `Playwright` (scraping) | Only if target sites are SPAs that require JavaScript execution; adds 300MB+ binary |
| `googleapis` monolithic | `@googleapis/searchconsole` scoped | If you only need Search Console and want a smaller install; not worth the split when agent needs multiple Google APIs |
| `google-ads-api` (Opteo) | Official `google-ads-node` | Official library exists but has more complex setup; Opteo's version is widely used and provides a higher-level TypeScript API |
| `@google-analytics/data` | `@googleapis/analyticsdata` | @googleapis/analyticsdata is maintenance-mode deprecated; never use for new projects |
| `pino` | `winston` | Winston if you need multiple custom transport formats and don't care about performance; pino is 5x faster and sufficient for this use case |
| `commander` | `yargs` | yargs if building a heavily option-driven tool; commander is cleaner for subcommand trees |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `node-cron` | TypeScript types are in a separate `@types/node-cron` package that lags behind the library; past TypeScript issues documented in open GitHub issues | `croner` — zero deps, built-in types, same cron syntax |
| `@googleapis/analyticsdata` | Officially deprecated by Google; maintenance-mode only | `@google-analytics/data` |
| `Playwright` for scraping | Overkill for static HTML; 300MB+ Chromium binary per tenant; 2-5s startup; increases attack surface | `cheerio` for static HTML; add `puppeteer-core` only if JS rendering is genuinely needed |
| `BullMQ` / `Agenda` | Require Redis or MongoDB infrastructure; agent is in-process single-instance per tenant | `croner` in-process scheduler |
| `axios` | Redundant; Node.js 18+ has built-in `fetch` (stable in Node 21+); for simple HTTP calls `fetch` is sufficient | Built-in `fetch` or `node-fetch` for Node 18 compat |
| `ts-node` | Slower than `tsx` (tsc compiler vs esbuild); complex ESM configuration required | `tsx` — already in StoryPic, zero-config ESM |
| PDFKit / pdfmake | Require manually positioning every element; CSS-based reports are far faster to build and maintain | `puppeteer` + `handlebars` for HTML-to-PDF |
| Separate email provider | Additional cost and configuration complexity | `resend` — already integrated in StoryPic, free tier covers agent notifications |
## Stack Patterns by Variant
- Use `croner` in-process scheduler started by `tsx src/agent.ts`
- Process manager: `pm2` wrapping `tsx` for restart-on-crash, log rotation, and startup on boot
- One process per tenant OR one process with tenant loop inside cron handlers
- Declare `seo-pilot` as a `workspaces` entry in root `package.json`
- Share `node_modules` from parent; only declare delta packages in seo-pilot's `package.json`
- Scripts: `npm run agent:start` from root; `tsx packages/seo-pilot/src/agent.ts`
- One `croner` instance per tenant config object (not per process)
- Tenant context passed through every module call; no global state
- Row-level security in Drizzle queries using `tenantId` on all tables
## Version Compatibility
| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `drizzle-orm@^0.45.1` | `@neondatabase/serverless@^1.0.2` | Drizzle released neon-http update for serverless ^1.0 — no compatibility issue |
| `googleapis@^171.4.0` | `google-auth-library@^9.x` | `googleapis` bundles `google-auth-library`; do not install separately to avoid version conflicts |
| `google-ads-api@^23.0.0` | Node.js >=18 | Requires `google-gax` at matching version; installing `google-ads-api` will pull correct `google-gax` via npm |
| `genkit@^1.8.0` + `@genkit-ai/googleai@^1.8.0` | Must match minor versions | Pin both to same minor to avoid plugin incompatibilities |
| `croner@^10.0.0` | Node.js >=18 | Major v10 release; OCPS 1.4 compliant; not backward-compatible with croner v8 |
| `puppeteer@^24.39.1` | Node.js >=18 | Bundles Chromium; ~300MB download on install; skip `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` if using system Chrome |
| `facebook-nodejs-business-sdk@^22.0.0` | Graph API v22, Marketing API v22 | Released Jan 2026; prior v21 still works but misses v22 campaign features |
## Sources
- [croner GitHub (Hexagon/croner)](https://github.com/Hexagon/croner) — version 10.0.0, features, zero-dep, TypeScript native — HIGH confidence
- [googleapis GitHub (googleapis/google-api-nodejs-client)](https://github.com/googleapis/google-api-nodejs-client) — v171.4.0, official Google Node.js client — HIGH confidence
- [@google-analytics/data npm](https://www.npmjs.com/package/@google-analytics/data) — v5.2.1, deprecation of @googleapis/analyticsdata — HIGH confidence
- [google-ads-api npm (Opteo)](https://www.npmjs.com/package/google-ads-api) — v23.0.0, TypeScript support — MEDIUM confidence (unofficial, but widely adopted)
- [facebook-nodejs-business-sdk GitHub](https://github.com/facebook/facebook-nodejs-business-sdk) — v22.0.0, Graph API v22 support — HIGH confidence
- [cheerio npm](https://www.npmjs.com/package/cheerio) — v1.2.0, built-in TypeScript, no @types/ needed — HIGH confidence
- [robots-parser GitHub (samclarke)](https://github.com/samclarke/robots-parser) — draft-spec compliant, TypeScript definitions — MEDIUM confidence
- [puppeteer npm](https://www.npmjs.com/package/puppeteer) — v24.39.1, built-in TypeScript — HIGH confidence
- [pino npm](https://www.npmjs.com/package/pino) — v10.3.1, built-in TypeScript — HIGH confidence
- [drizzle-orm npm](https://www.npmjs.com/package/drizzle-orm) — v0.45.1, Neon compatibility — HIGH confidence (already in StoryPic)
- [zod npm](https://www.npmjs.com/package/zod) — v4.3.6 latest but parent uses ^3.25.76 — HIGH confidence
- [genkit npm](https://www.npmjs.com/package/genkit) — v1.8.0 in parent, v1.26.0 latest — HIGH confidence
- [tsx vs ts-node comparison (Better Stack)](https://betterstack.com/community/guides/scaling-nodejs/tsx-vs-ts-node/) — tsx superiority for ESM — HIGH confidence
- [StoryPic package.json] — Ground truth for shared packages and current versions — HIGH confidence
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
