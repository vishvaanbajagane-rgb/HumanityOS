import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(en|hi|ta|te|es|fr|ar|zh|ja|de|it|pt|ru)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};