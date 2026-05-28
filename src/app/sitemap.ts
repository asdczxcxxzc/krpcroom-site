import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL, localePath, localeToLang } from '@/lib/seo';

const PATHS = ['', '/features', '/games', '/guide', '/pricing', '/faq'];

const PRIORITY: Record<string, number> = {
  '': 1.0,
  '/games': 0.9,
  '/pricing': 0.9,
  '/features': 0.8,
  '/guide': 0.8,
  '/faq': 0.7
};

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const path of PATHS) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[localeToLang(locale)] = `${SITE_URL}${localePath(locale, path)}`;
    }
    for (const locale of routing.locales) {
      out.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: PRIORITY[path] ?? 0.5,
        alternates: { languages }
      });
    }
  }

  return out;
}
