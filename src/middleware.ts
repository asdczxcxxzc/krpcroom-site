import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { detectCountry, localeForCountry } from './lib/geo';

const intlMiddleware = createIntlMiddleware(routing);
const COOKIE = 'NEXT_LOCALE';
const ONE_YEAR = 60 * 60 * 24 * 365;

function hasLocalePrefix(pathname: string): boolean {
  return routing.locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieLocale = req.cookies.get(COOKIE)?.value;

  if (!cookieLocale && !hasLocalePrefix(pathname)) {
    const country = detectCountry(req);
    if (country) {
      const locale = localeForCountry(country);
      const url = req.nextUrl.clone();
      if (locale === routing.defaultLocale) {
        const res = intlMiddleware(req);
        res.cookies.set(COOKIE, locale, { path: '/', maxAge: ONE_YEAR });
        return res;
      }
      url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
      const res = NextResponse.redirect(url);
      res.cookies.set(COOKIE, locale, { path: '/', maxAge: ONE_YEAR });
      return res;
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
