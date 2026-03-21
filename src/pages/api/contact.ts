export const prerender = false;

import { Resend } from 'resend';

interface ContactPayload {
  name: string;
  email: string;
  service?: string;
  message: string;
  turnstileToken: string;
  locale: string;
}

export async function POST({ request }: { request: Request }): Promise<Response> {
  let body: ContactPayload;

  try {
    body = await request.json() as ContactPayload;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, service, message, turnstileToken } = body;

  // Validate required fields
  if (!name || !email || !message || !turnstileToken) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify Cloudflare Turnstile token
  const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY;
  const turnstileVerifyResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: turnstileToken,
      }),
    }
  );

  const turnstileResult = await turnstileVerifyResponse.json() as { success: boolean };

  if (!turnstileResult.success) {
    return new Response(JSON.stringify({ error: 'Spam check failed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Send email via Resend
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const contactEmail = import.meta.env.CONTACT_EMAIL || 'contact@isio.ro';
  const subject = service
    ? `New contact: ${name} — ${service}`
    : `New contact: ${name}`;

  const serviceRow = service
    ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 14px; width: 120px;">Service</td><td style="padding: 8px 0; color: #f1f5f9; font-size: 14px;">${service}</td></tr>`
    : '';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #f1f5f9; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155;">
    <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 32px;">
      <h1 style="margin: 0; color: #fff; font-size: 24px; font-weight: 700;">New Contact Message</h1>
      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Received via isio.ro contact form</p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 14px; width: 120px;">Name</td><td style="padding: 8px 0; color: #f1f5f9; font-size: 14px;">${name}</td></tr>
        <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Email</td><td style="padding: 8px 0; color: #f1f5f9; font-size: 14px;"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></td></tr>
        ${serviceRow}
      </table>
      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #334155;">
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 12px;">Message</p>
        <div style="background: #0f172a; border-radius: 8px; padding: 16px; color: #e2e8f0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
      </div>
      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #334155;">
        <a href="mailto:${email}" style="display: inline-block; background: #3b82f6; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">Reply to ${name}</a>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: 'Isio Contact <onboarding@resend.dev>',
      to: contactEmail,
      replyTo: email,
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Resend exception:', err);
    return new Response(JSON.stringify({ error: 'Failed to send message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
