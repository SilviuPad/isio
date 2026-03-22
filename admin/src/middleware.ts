import { defineMiddleware } from 'astro:middleware';
import { hashPassword } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Public routes: login page, auth API, static assets
  if (pathname === '/' || pathname === '/api/auth' || pathname.startsWith('/_')) {
    return next();
  }

  const sessionCookie = context.cookies.get('admin_session');
  if (!sessionCookie) {
    return context.redirect('/');
  }

  const expectedHash = await hashPassword(
    context.locals.runtime.env.ADMIN_PASSWORD
  );

  if (sessionCookie.value !== expectedHash) {
    return context.redirect('/');
  }

  return next();
});
