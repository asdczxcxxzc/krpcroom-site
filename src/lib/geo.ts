import type { NextRequest } from 'next/server';
import { routing, type Locale } from '@/i18n/routing';

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  KR: 'ko',
  KP: 'ko',
  CN: 'zh',
  HK: 'zh',
  MO: 'zh',
  TW: 'zh',
  SG: 'zh'
};

export function detectCountry(req: NextRequest): string | null {
  const headers = req.headers;
  return (
    headers.get('cf-ipcountry') ||
    headers.get('x-vercel-ip-country') ||
    headers.get('x-country-code') ||
    headers.get('x-appengine-country') ||
    null
  );
}

export function localeForCountry(country: string | null): Locale {
  if (!country) return routing.defaultLocale;
  const mapped = COUNTRY_TO_LOCALE[country.toUpperCase()];
  if (mapped) return mapped;
  return 'en';
}
