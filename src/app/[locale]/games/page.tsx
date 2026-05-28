import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GamesSearchable } from '@/components/sections/GamesSearchable';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { SUPPORTED_GAMES } from '@/lib/constants';
import { resolveLogos } from '@/lib/game-logos';
import { buildPageMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd, ItemListJsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, pageKey: 'games', path: '/games' });
}

export default async function GamesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'games' });
  const logos = resolveLogos();
  const crumbs = await buildBreadcrumbs(locale, 'games');

  const itemList = SUPPORTED_GAMES.map((g, i) => ({
    name: locale === 'ko' ? g.ko : locale === 'zh' ? g.cn : g.name,
    position: i + 1
  }));

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ItemListJsonLd name={t('title')} items={itemList} />
      <Breadcrumbs items={crumbs} />
      <div className="pt-10">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500">
              {SUPPORTED_GAMES.length}+
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-fg sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-3 text-muted">{t('subtitle')}</p>
          </div>
        </section>

        <GamesSearchable games={SUPPORTED_GAMES} logos={logos} />

        <ContactCTA />
      </div>
    </>
  );
}
