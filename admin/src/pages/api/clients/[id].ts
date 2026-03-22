export const prerender = false;

import type { APIContext } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/db';
import { clients } from '../../../lib/schema';

export async function GET({ params, locals }: APIContext) {
  const db = getDb(locals.runtime.env.DB);
  const client = await db.select().from(clients).where(eq(clients.id, params.id!)).get();

  if (!client) {
    return new Response(JSON.stringify({ error: 'Client not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(client), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT({ params, request, locals }: APIContext) {
  const db = getDb(locals.runtime.env.DB);

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const updated = await db.update(clients)
    .set({
      ...body,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(clients.id, params.id!))
    .returning();

  if (updated.length === 0) {
    return new Response(JSON.stringify({ error: 'Client not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(updated[0]), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE({ params, locals }: APIContext) {
  const db = getDb(locals.runtime.env.DB);
  const deleted = await db.delete(clients)
    .where(eq(clients.id, params.id!))
    .returning();

  if (deleted.length === 0) {
    return new Response(JSON.stringify({ error: 'Client not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
