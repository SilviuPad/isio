export const prerender = false;

import type { APIContext } from 'astro';
import { getDb } from '../../lib/db';
import { clients } from '../../lib/schema';

export async function GET({ locals }: APIContext) {
  const db = getDb(locals.runtime.env.DB);
  const allClients = await db.select().from(clients).all();
  return new Response(JSON.stringify(allClients), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST({ request, locals }: APIContext) {
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

  // Validate required fields
  if (!body.companyName || !body.email) {
    return new Response(
      JSON.stringify({ error: 'companyName and email are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const newClient = await db.insert(clients).values({
    companyName: body.companyName as string,
    contactPerson: (body.contactPerson as string) || null,
    email: body.email as string,
    phone: (body.phone as string) || null,
    cui: (body.cui as string) || null,
    address: (body.address as string) || null,
    iban: (body.iban as string) || null,
    notes: (body.notes as string) || null,
    projectName: (body.projectName as string) || null,
    projectDueDate: (body.projectDueDate as string) || null,
    projectStatus: (body.projectStatus as 'not_started' | 'in_progress' | 'review' | 'blocked' | 'done') || 'not_started',
  }).returning();

  return new Response(JSON.stringify(newClient[0]), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
