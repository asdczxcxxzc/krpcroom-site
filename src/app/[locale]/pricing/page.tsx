import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { PricingTabs } from '@/components/sections/PricingTabs';
import { Gamepad2, ShieldCheck, Calendar, Headset } from 'lucide-react';
import { buildPageMetadata, absoluteUrl } from '@/lib/seo';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, pageKey: 'pricing', path: '/pricing' });
}

const HOURLY = [
  { minutes: 600, price: 10000 },
  { minutes: 1200, price: 20000 },
  { minutes: 3000, price: 48000 },
  { minutes: 4800, price: 75000 },
  { minutes: 6000, price: 90000 }
];
const SUBS = [
  { key: 'week', price: 170000 },
  { key: 'month', price: 600000 },
  { key: 'sixMonths', price: 3400000 },
  { key: 'year', price: 6000000 }
] as const;

export default async function PricingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const crumbs = await buildBreadcrumbs(locale, 'pricing');

  const included = [
    { Icon: Gamepad2, key: 'allGames' as const },
    { Icon: ShieldCheck, key: 'fullBenefit' as const },
    { Icon: Calendar, key: 'validity' as const },
    { Icon: Headset, key: 'support' as const }
  ];

  const offers = [
    ...HOURLY.map((p) => ({
      name: `${p.minutes.toLocaleString('en-US')} ${t('minutesUnit')}`,
      price: p.price,
      description: t('hoursHint', { hours: Math.round(p.minutes / 60) })
    })),
    ...SUBS.map((p) => ({
      name: t(`sub.${p.key}.name`),
      price: p.price,
      description: t(`sub.${p.key}.subtext`)
    }))
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ServiceJsonLd
        siteName={meta('siteName')}
        url={absoluteUrl(locale, '/pricing')}
        description={meta('pages.pricing.description')}
        offers={offers}
      />
      <Breadcrumbs items={crumbs} />
      <div className="pt-10">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-black tracking-tight text-fg sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-3 text-muted">{t('subtitle')}</p>
          </div>

          <div className="mt-12">
            <PricingTabs />
          </div>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-app bg-elev p-8 sm:p-10">
            <h3 className="text-center text-lg font-bold text-fg sm:text-xl">
              {t('includedTitle')}
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {included.map(({ Icon, key }) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-app bg-app p-5 text-center"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl brand-gradient text-white shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold leading-snug text-fg">
                    {t(`included.${key}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA />
      </div>
    </>
  );
}
