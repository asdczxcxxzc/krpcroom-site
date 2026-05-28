import { setRequestLocale, getTranslations } from 'next-intl/server';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { buildPageMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, pageKey: 'faq', path: '/faq' });
}

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export default async function FaqPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'faq' });
  const crumbs = await buildBreadcrumbs(locale, 'faq');

  const faqItems = FAQ_KEYS.map((k) => ({
    question: t(`items.${k}.q`),
    answer: t(`items.${k}.a`)
  }));

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <FAQPageJsonLd items={faqItems} />
      <Breadcrumbs items={crumbs} />
      <div className="pt-10">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-black tracking-tight text-fg sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-3 text-muted">{t('subtitle')}</p>
          </div>
          <FaqAccordion />
        </section>
        <ContactCTA />
      </div>
    </>
  );
}
