export const prerender = false;

import type { APIContext } from 'astro';
import { Resend } from 'resend';

export async function POST({ request, locals }: APIContext) {
  let body: { to?: string; filename?: string; pdfBase64?: string; subject?: string };
  try {
    body = await request.json() as { to?: string; filename?: string; pdfBase64?: string; subject?: string };
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { to, filename, pdfBase64, subject } = body;

  if (!to || !filename || !pdfBase64) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields: to, filename, pdfBase64' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const resend = new Resend(locals.runtime.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: 'Isio <onboarding@resend.dev>',
      to,
      subject: subject || `Document from Isio: ${filename}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Document from Isio</h2>
          <p style="color: #475569;">Please find the attached document: <strong>${filename}</strong></p>
          <p style="color: #475569;">If you have any questions, please contact us at <a href="mailto:contact@isio.ro" style="color: #3b82f6;">contact@isio.ro</a>.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 12px;">Isio — Web Agency | <a href="https://isio.ro" style="color: #3b82f6;">isio.ro</a></p>
        </div>
      `,
      attachments: [
        {
          filename,
          content: pdfBase64,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Email exception:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
