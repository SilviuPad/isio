# Phase 3: Booking + Contact — Research

**Researched:** 2026-03-21
**Domain:** Discovery call booking (Cal.com embed) + contact form with email notification (Resend via Cloudflare Workers)
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INTR-01 | Custom booking form for discovery calls synced with Google Calendar | Cal.com embed handles all scheduling logic, Google Calendar two-way sync native — no OAuth code required |
| INTR-02 | Contact form with email notification to admin | Resend SDK + Cloudflare Worker API endpoint — official pattern documented by Cloudflare |

</phase_requirements>

---

## Summary

Phase 3 delivers the two conversion endpoints that turn visitors into booked discovery calls and direct messages. Both requirements have battle-tested, zero-infrastructure solutions already identified in the Phase 1 stack research: Cal.com hosted embed for booking and Resend for contact form email.

The contact form UI already exists at `src/pages/contact.astro` and `src/pages/en/contact.astro` — it was built in Phase 2 as a visual shell. The form has no action wired to it yet: no `action` attribute, no script, no API endpoint. This phase wires the form up and embeds the Cal.com scheduling widget into both contact pages.

The Astro project already uses `output: 'server'` in `astro.config.mjs` — the Cloudflare adapter is in full SSR mode. Every page with `export const prerender = true` is statically generated. API route endpoints do NOT need `export const prerender = false` — they have no prerender directive and default to server-rendered. This means the contact API endpoint works out of the box as a Cloudflare Worker with no config changes.

**Primary recommendation:** Use Cal.com hosted free tier (inline embed script — no npm package needed) for INTR-01 and a `src/pages/api/contact.ts` Cloudflare Worker endpoint calling Resend SDK for INTR-02. Add Cloudflare Turnstile for spam protection on the contact form.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Cal.com hosted embed | n/a (external CDN script) | Discovery call booking | Official Cal.com cloud, Google Calendar two-way sync native in free tier, zero OAuth code to maintain, iframe-based embed works in any framework |
| `resend` | ^3.2.0 (or latest) | Send email notification on form submit | Already used in project stack; Cloudflare Workers native; 3,000 emails/month free |
| Cloudflare Turnstile | n/a (external CDN script) | Bot protection for contact form | Free, privacy-preserving CAPTCHA replacement by Cloudflare; invisible managed mode; native server-side verification on same Worker |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@calcom/embed-react` | ^1.5.3 | React wrapper for Cal.com embed | Only if using React island — for vanilla embed script the npm package is NOT needed |
| `resend` npm package | ^3.2.0 | Resend SDK | Use SDK (not raw fetch) for cleaner TypeScript types on the API response |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Cal.com hosted | Custom Google Calendar API | Custom API requires OAuth consent screen publishing, token refresh logic, availability queries, timezone handling — weeks of work vs. 30 minutes of embed config |
| Cal.com hosted | Calendly | Calendly is paid SaaS with no self-host option; Cal.com is open-source, free tier equivalent, no vendor lock-in |
| Resend | Nodemailer / SendGrid | Resend is already in the project stack; Cloudflare Workers does not support Nodemailer (requires `net` module); SendGrid adds a new API dependency |
| Turnstile | hCaptcha / reCAPTCHA | Turnstile is free, no data harvesting for ads, works natively on Cloudflare infrastructure |

**Installation (only new package needed):**

```bash
# resend may already be installed — verify first
npm install resend
```

**Version verification (run before writing PLAN.md):**

```bash
npm view resend version
# Expected: 3.x.x or higher
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── pages/
│   ├── contact.astro          # RO — wire form action to /api/contact
│   ├── en/
│   │   └── contact.astro      # EN — wire form action to /api/contact
│   └── api/
│       └── contact.ts         # POST endpoint — Resend email + Turnstile verify
├── components/
│   └── contact/
│       └── CalEmbed.astro     # Cal.com inline embed (script + container div)
└── lib/
    └── turnstile.ts           # Server-side Turnstile verification utility
```

### Pattern 1: Astro Server-Mode API Endpoint

The project uses `output: 'server'` globally. This means API route files under `src/pages/api/` are Cloudflare Workers endpoints by default — no extra configuration.

```typescript
// src/pages/api/contact.ts
// Source: https://developers.cloudflare.com/developer-spotlight/tutorials/handle-form-submission-with-astro-resend/
// NO prerender directive — server output mode means this runs as a Worker

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name')?.toString().trim() ?? '';
  const email = data.get('email')?.toString().trim() ?? '';
  const message = data.get('message')?.toString().trim() ?? '';
  const token = data.get('cf-turnstile-response')?.toString() ?? '';

  // Server-side validation
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Turnstile verification (if enabled)
  // const turnstileOk = await verifyTurnstile(token, import.meta.env.TURNSTILE_SECRET_KEY);
  // if (!turnstileOk) { return new Response(..., { status: 403 }) }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'Isio Contact <contact@isio.ro>',
    to: ['admin@isio.ro'],
    replyTo: email,
    subject: `Mesaj nou de la ${name}`,
    html: `<p><strong>Nume:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Mesaj:</strong><br>${message.replace(/\n/g, '<br>')}</p>`,
  });

  if (error) {
    return new Response(JSON.stringify({ error: 'Email send failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

### Pattern 2: Contact Form Client-Side Handler (inline script in .astro)

The contact pages are static (`export const prerender = true`). The form submits via `fetch` to the API endpoint. This is the Astro hybrid pattern: static page + dynamic API.

```astro
<!-- Inside contact.astro, at the bottom of the page -->
<script>
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data });
      const json = await res.json();

      if (res.ok && json.success) {
        form.style.display = 'none';
        successMsg?.classList.remove('hidden');
      } else {
        errorMsg?.classList.remove('hidden');
      }
    } catch {
      errorMsg?.classList.remove('hidden');
    }
  });
</script>
```

### Pattern 3: Cal.com Inline Embed (vanilla script — no npm)

Cal.com provides a CDN-hosted `embed.js` script. The inline embed pattern uses a `<div>` container and a `<script>` block — no React island needed. This is the preferred approach for Astro static pages.

```astro
<!-- src/components/contact/CalEmbed.astro -->
<!-- Source: https://cal.com/help/embedding/embed-instructions -->
---
interface Props {
  calLink: string; // e.g. "your-username/30min"
}
const { calLink } = Astro.props;
---
<div id="cal-booking" style="width:100%;min-height:600px;overflow:scroll"></div>
<script is:inline define:vars={{ calLink }}>
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", { origin: "https://app.cal.com" });
  Cal("inline", {
    elementOrSelector: "#cal-booking",
    calLink: calLink,
  });
  Cal("ui", {
    styles: { branding: { brandColor: "#3b82f6" } },
    hideEventTypeDetails: false,
  });
</script>
```

### Pattern 4: Cloudflare Turnstile Verification Utility

```typescript
// src/lib/turnstile.ts
// Source: https://developers.cloudflare.com/turnstile/

export async function verifyTurnstile(token: string, secretKey: string): Promise<boolean> {
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const body = new FormData();
  body.append('secret', secretKey);
  body.append('response', token);

  const res = await fetch(url, { method: 'POST', body });
  const data = await res.json() as { success: boolean };
  return data.success;
}
```

### Anti-Patterns to Avoid

- **Importing Resend in a statically prerendered page:** The `new Resend()` call must only happen inside an API endpoint (server context). Never import it at the top of an `.astro` page frontmatter that has `prerender = true`.
- **Using `export const prerender = false` on the API endpoint:** In `output: 'server'` mode this is a no-op at best and creates confusion. API routes do not need this directive.
- **Using `@calcom/embed-react` as an Astro island:** This adds React dependency, requires `client:load`, and the embed.js vanilla script approach achieves the same visual result with zero extra dependencies.
- **Hardcoding Resend API key:** Must live in `wrangler.toml` `[vars]` for non-secrets (or `wrangler secret put RESEND_API_KEY` for secrets) and accessed via `import.meta.env.RESEND_API_KEY`.
- **Submitting the form to a RO-only endpoint from the EN page:** Both locale contact pages (`/contact/` and `/en/contact/`) must point to the same `/api/contact` endpoint — the endpoint is locale-agnostic.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Booking calendar with Google Calendar sync | Custom OAuth flow, availability API, timezone logic, double-booking prevention | Cal.com hosted embed | Cal.com solves all of this: OAuth is pre-configured, availability is managed, Google Calendar sync is two-way, timezone conversion is handled |
| Calendar availability widget | Custom CSS calendar grid, slot selection UI | Cal.com inline embed | The embed provides real-time availability from the connected Google Calendar — impossible to replicate statically |
| Email delivery | SMTP server, Nodemailer, DNS SPF/DKIM config | Resend SDK | Cloudflare Workers cannot use Node.js `net` module — Nodemailer fails at runtime; Resend uses fetch-based HTTP API that works in Workers |
| CAPTCHA for form spam | Custom honeypot or rate limiter | Cloudflare Turnstile | Free, invisible, and native to Cloudflare infrastructure; takes 10 minutes to add vs. building rate limiting from scratch |

**Key insight:** The entire booking integration is a copy-paste embed with a 30-minute Cal.com dashboard configuration. The only code in this phase is the contact form endpoint and the Turnstile check.

---

## Common Pitfalls

### Pitfall 1: Cal.com embed script loaded more than once

**What goes wrong:** If the Cal.com snippet is placed in a shared layout component, it loads on every page — causing errors on pages that don't have the `#cal-booking` div.
**Why it happens:** Developers copy the snippet into the layout for convenience.
**How to avoid:** Place the Cal embed component only on the contact page(s), not in the layout. The embed script is scoped to the component.
**Warning signs:** Browser console errors like `"Cal is not defined"` or `"Cannot set properties of null (setting 'innerHTML')"` on non-contact pages.

### Pitfall 2: Contact form submits to wrong URL from EN page

**What goes wrong:** The EN contact page at `/en/contact/` submits to `/api/contact` — relative paths in `fetch` resolve correctly from any page. However, if the form uses `method="post" action="..."` without JavaScript, the native form POST will fail because there is no HTML form redirect target.
**Why it happens:** Using the native form `action` attribute instead of JavaScript `fetch`. The API endpoint returns JSON, not HTML.
**How to avoid:** Always intercept form submit with `e.preventDefault()` and use `fetch`. Both locale contact pages share the same inline `<script>` pattern — the endpoint path `/api/contact` is the same from both.
**Warning signs:** Form submission causes a blank page or JSON displayed as text in the browser.

### Pitfall 3: Resend `from` address not verified

**What goes wrong:** Resend requires the `from` domain to be verified in the Resend dashboard. If `contact@isio.ro` is used before the domain is verified, all emails fail silently (Resend returns a 403/422 error).
**Why it happens:** Developers copy example code using `onboarding@resend.dev` for testing, then swap to a custom domain for production without completing the domain verification DNS steps.
**How to avoid:** Verify `isio.ro` in Resend dashboard before any send attempts. Add SPF and DKIM records to DNS. During development, keep using `onboarding@resend.dev` as the `from` address while testing — it always works regardless of verification status.
**Warning signs:** `resend.emails.send()` returning `{ error: { name: 'validation_error', message: '...' } }` in the API response.

### Pitfall 4: Environment variables not available at Cloudflare Pages runtime

**What goes wrong:** `import.meta.env.RESEND_API_KEY` is `undefined` in production, causing every form submission to fail with a Resend auth error.
**Why it happens:** In Astro 6 with the Cloudflare adapter, environment variables for Workers must be defined in `wrangler.toml` under `[vars]` (for non-secret config) or added via `wrangler secret put` (for secrets). Variables defined only in `.env` are available at build time but NOT at Cloudflare Pages runtime.
**How to avoid:** Add `RESEND_API_KEY` as a secret via `wrangler secret put RESEND_API_KEY` or in the Cloudflare Pages dashboard under Settings > Environment Variables. The `import.meta.env.RESEND_API_KEY` accessor still works at runtime with this approach.
**Warning signs:** Form works locally (`npm run dev`) but fails in production with a 500 error. Checking Cloudflare Worker logs shows `Invalid API key`.

### Pitfall 5: Cal.com account not configured before embed is live

**What goes wrong:** The booking embed renders the Cal.com scheduler, but no event types are defined, Google Calendar is not connected, or availability is not set — resulting in "No available times" for all visitors.
**Why it happens:** The embed is wired up correctly but the Cal.com dashboard setup steps are skipped.
**How to avoid:** Cal.com setup checklist (done in dashboard, not in code):
  1. Create account at cal.com with the admin's Google account
  2. Connect Google Calendar integration (Settings > Integrations)
  3. Create a "30-minute discovery call" event type
  4. Set availability (e.g., Mon-Fri 9am-6pm EET)
  5. Set the buffer time between calls
  6. Copy the Cal Link (e.g., `username/30min`) for use in the embed
**Warning signs:** Embed shows "No available slots" on all dates.

### Pitfall 6: wrangler.toml compatibility_date too old for Workers features

**What goes wrong:** Some Cloudflare Workers features (including newer `fetch` behavior) require a recent `compatibility_date`. The current `wrangler.toml` has `compatibility_date = "2024-09-23"`.
**Why it happens:** The date was set at project initialization and not updated.
**How to avoid:** Verify the current `wrangler.toml` compatibility date works for the email endpoint. The Resend HTTP API is standard `fetch` — the current date should be sufficient. Update only if runtime errors appear. Do not change without testing.
**Warning signs:** Worker throws `TypeError: Failed to fetch` for outbound HTTP requests from the API endpoint.

---

## Code Examples

### API endpoint structure (Astro + Cloudflare + Resend)

```typescript
// src/pages/api/contact.ts
// Source: https://developers.cloudflare.com/developer-spotlight/tutorials/handle-form-submission-with-astro-resend/
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const service = formData.get('service')?.toString() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'required_fields_missing' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const serviceLabel = service ? `\n\nServiciu selectat: ${service}` : '';
  const { error } = await resend.emails.send({
    from: 'Isio Site <onboarding@resend.dev>',   // swap to contact@isio.ro after domain verify
    to: [import.meta.env.ADMIN_EMAIL ?? 'admin@isio.ro'],
    replyTo: email,
    subject: `Mesaj nou de la ${name}`,
    html: `
      <h2>Mesaj nou de pe isio.ro</h2>
      <p><strong>Nume:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${service ? `<p><strong>Serviciu:</strong> ${service}</p>` : ''}
      <p><strong>Mesaj:</strong></p>
      <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return new Response(JSON.stringify({ error: 'send_failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

### wrangler.toml secrets setup

```toml
# wrangler.toml — add vars for non-secret config
# For secrets (RESEND_API_KEY), use: wrangler secret put RESEND_API_KEY
name = "isio"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = "./dist/client"
binding = "ASSETS"

[vars]
ADMIN_EMAIL = "your@email.com"
```

### Cal.com embed (minimal vanilla script)

```html
<!-- In contact.astro, after the info sidebar section -->
<div id="cal-booking"></div>
<script>
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", { origin: "https://app.cal.com" });
  Cal("inline", {
    elementOrSelector: "#cal-booking",
    calLink: "YOUR_USERNAME/30min",
  });
  Cal("ui", {
    styles: { branding: { brandColor: "#3b82f6" } },
    hideEventTypeDetails: false,
  });
</script>
```

### Form success/error state pattern (contact.astro)

```astro
<!-- Add after the <form> closing tag -->
<div id="form-success" class="hidden mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
  Mesajul tău a fost trimis! Te vom contacta în maxim 24 de ore.
</div>
<div id="form-error" class="hidden mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
  A apărut o eroare. Încearcă din nou sau scrie-ne direct la contact@isio.ro.
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom Google Calendar OAuth form | Cal.com hosted embed | 2020–2021 | Eliminates 100+ lines of OAuth/token management; zero maintenance |
| `Astro.locals.runtime.env.SECRET` for Cloudflare env | `import.meta.env.SECRET` (Astro 6) | Astro 6 + adapter upgrade | Simpler syntax; same runtime behavior |
| `export const prerender = false` on API routes in hybrid mode | No prerender directive needed in `output: 'server'` mode | Astro 5+ | Server mode makes all pages/routes server-rendered by default; `prerender = true` opts into static |

**Deprecated/outdated:**
- `Astro.locals.runtime.env.*` for env access: still works but the Cloudflare adapter docs now recommend `import.meta.env.*` for the server output mode in Astro 6.
- `@astrojs/netlify` and email via Netlify Functions: not relevant here — project deploys to Cloudflare Pages exclusively.

---

## Open Questions

1. **Cal.com username/event slug**
   - What we know: The embed script requires a `calLink` value in format `username/event-type-slug`
   - What's unclear: The admin has not yet created their Cal.com account or event type
   - Recommendation: The plan should include a Step 0 / pre-task: "Create Cal.com account, connect Google Calendar, create 30min event type, note the username/slug." The planner should treat this as a human-required setup step before the code task.

2. **Resend domain verification for `isio.ro`**
   - What we know: Sending from `onboarding@resend.dev` always works; sending from a custom domain requires DNS verification
   - What's unclear: Whether DNS for `isio.ro` is managed by Cloudflare or another registrar
   - Recommendation: Plan should use `onboarding@resend.dev` as `from` address for Wave 1 (functional) and include an optional Wave 2 task for domain verification when DNS access is confirmed.

3. **Turnstile site key**
   - What we know: Turnstile requires a site key (public, embeds in HTML) and secret key (server-side verification)
   - What's unclear: Whether Turnstile is mandatory for launch or optional
   - Recommendation: Include Turnstile as a separate task with clear instructions for creating keys at https://dash.cloudflare.com — it takes 5 minutes to configure. Skip for MVP if preferred, add in Wave 2.

4. **Bilingual booking form wording**
   - What we know: The Cal.com embed renders in the browser language by default; the surrounding page text is already bilingual
   - What's unclear: Whether Cal.com's interface language follows the page locale or the browser locale
   - Recommendation: Cal.com embeds typically follow browser locale. For RO-first audience, the Cal.com event type should have Romanian as the primary language in the event settings. Document this in the pre-task setup checklist.

---

## Validation Architecture

> `workflow.nyquist_validation` is `false` in `.planning/config.json` — this section is skipped per config.

---

## Sources

### Primary (HIGH confidence)
- [Cloudflare Developer Spotlight: Send form submissions using Astro and Resend](https://developers.cloudflare.com/developer-spotlight/tutorials/handle-form-submission-with-astro-resend/) — Astro + Resend + Cloudflare endpoint pattern
- [Resend: Send with Cloudflare Workers](https://resend.com/docs/send-with-cloudflare-workers) — Resend SDK in Workers runtime, env key pattern
- [Astro Cloudflare Adapter docs](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) — output mode, hybrid rendering, env variable access
- `astro.config.mjs` (project file) — confirmed `output: 'server'` mode and Cloudflare adapter in use
- `src/pages/contact.astro` (project file) — confirmed form HTML exists, no submission handler wired

### Secondary (MEDIUM confidence)
- [Cal.com embed instructions](https://cal.com/help/embedding/embed-instructions) — `Cal("inline", ...)` pattern, calLink parameter syntax
- [Cal.com embed how-to blog](https://cal.com/blog/how-to-add-booking-pages-to-your-website) — four embed types confirmed; vanilla script approach confirmed
- [Cloudflare Turnstile: Bot Protection in Astro](https://www.launchfa.st/blog/astro-turnstile-bot-protection) — widget script, server verification pattern
- [Contact Forms in Astro with Server Actions and Resend](https://contentisland.net/en/blog/astro-contact-form-server-actions-resend/) — Resend SDK usage, defineAction pattern

### Tertiary (LOW confidence)
- Resend free tier limits (3,000 emails/month, 100/day) — from multiple secondary sources; verify current limits at https://resend.com/pricing before launch
- Cal.com free tier Google Calendar sync — confirmed available in free tier per multiple third-party sources; verify on cal.com/pricing

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Resend and Cloudflare Worker endpoint patterns are officially documented by Cloudflare; Cal.com embed is documented on cal.com/help
- Architecture: HIGH — `output: 'server'` in astro.config.mjs verified; API route pattern verified against official adapter docs
- Pitfalls: HIGH — env variable pitfall (wrangler vs .env) is the #1 documented issue in Cloudflare community; Cal.com setup pre-requisite is a documented common miss

**Research date:** 2026-03-21
**Valid until:** 2026-06-21 (90 days — Cal.com embed API is stable; Resend SDK versions move slowly)
