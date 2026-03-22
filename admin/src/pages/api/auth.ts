export const prerender = false;

import type { APIContext } from 'astro';
import { hashPassword } from '../../lib/auth';

export async function POST({ request, cookies, locals }: APIContext) {
  let body: { password?: string; action?: string };

  try {
    body = await request.json() as { password?: string; action?: string };
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { password, action } = body;

  // Logout
  if (action === 'logout') {
    cookies.delete('admin_session', { path: '/' });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Login
  if (!password) {
    return new Response(JSON.stringify({ error: 'Password required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const hash = await hashPassword(password);
  const expectedHash = await hashPassword(locals.runtime.env.ADMIN_PASSWORD);

  if (hash !== expectedHash) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  cookies.set('admin_session', hash, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
