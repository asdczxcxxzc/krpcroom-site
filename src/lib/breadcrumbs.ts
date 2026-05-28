import { getTranslations } from 'next-intl/server';
import { absoluteUrl } from './seo';

export type Crumb = { name: string; url: string };

export async function buildBreadcrumbs(
  locale: string,
  pageKey: 'home' | 'features' | 'games' | 'guide' | 'pricing' | 'faq'
): Promise<Crumb[]> {
  const t = await getTranslations({ locale, namespace: 'nav' });
  const meta = await getTranslations({ locale, namespace: 'meta' });

  const home: Crumb = { name: t('home'), url: absoluteUrl(locale, '') };
  if (pageKey === 'home') return [home];

  const pathMap: Record<typeof pageKey, string> = {
    home: '',
    features: '/features',
    games: '/games',
    guide: '/guide',
    pricing: '/pricing',
    faq: '/faq'
  };
  const labelMap: Record<typeof pageKey, string> = {
    home: t('home'),
    features: t('features'),
    games: t('games'),
    guide: t('guide'),
    pricing: t('pricing'),
    faq: t('faq')
  };

  return [
    home,
    { name: labelMap[pageKey], url: absoluteUrl(locale, pathMap[pageKey]) }
  ];
}
