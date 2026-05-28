import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://krpcroom.com';

export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  baidu: process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION,
  yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION
};

export function localeToLang(locale: string): string {
  if (locale === 'zh') return 'zh-CN';
  if (locale === 'ko') return 'ko-KR';
  if (locale === 'en') return 'en-US';
  return locale;
}

export function localeToOg(locale: string): string {
  if (locale === 'zh') return 'zh_CN';
  if (locale === 'ko') return 'ko_KR';
  if (locale === 'en') return 'en_US';
  return locale.replace('-', '_');
}

export function localePath(locale: string, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const normalized = clean === '/' ? '' : clean;
  if (locale === routing.defaultLocale) return normalized || '/';
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: string, path: string): string {
  const p = localePath(locale, path);
  return `${SITE_URL}${p === '/' ? '' : p}`;
}

type PageKey = 'home' | 'features' | 'games' | 'guide' | 'pricing' | 'faq';

export async function buildPageMetadata({
  locale,
  pageKey,
  path
}: {
  locale: string;
  pageKey: PageKey;
  path: string;
}): Promise<Metadata> {
  const m = await getTranslations({ locale, namespace: 'meta' });
  const title = m(`pages.${pageKey}.title`);
  const description = m(`pages.${pageKey}.description`);
  const canonical = localePath(locale, path);
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[localeToLang(l)] = localePath(l, path);
  }
  languages['x-default'] = localePath(routing.defaultLocale, path);

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      url: absoluteUrl(locale, path),
      siteName: m('siteName'),
      title: `${title} | ${m('siteName')}`,
      description,
      locale: localeToOg(locale)
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${m('siteName')}`,
      description
    }
  };
}
