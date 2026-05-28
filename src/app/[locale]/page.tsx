import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Games } from '@/components/sections/Games';
import { Steps } from '@/components/sections/Steps';
import { ContactCTA } from '@/components/sections/ContactCTA';
import {
  SoftwareApplicationJsonLd,
  BreadcrumbJsonLd
} from '@/components/JsonLd';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, pageKey: 'home', path: '' });
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const crumbs = await buildBreadcrumbs(locale, 'home');

  return (
    <>
      <SoftwareApplicationJsonLd
        siteName={meta('siteName')}
        url={absoluteUrl(locale, '')}
        description={meta('description')}
      />
      <BreadcrumbJsonLd items={crumbs} />
      <Hero />
      <Features />
      <Games limit={8} showViewAll />
      <Steps />
      <ContactCTA />
    </>
  );
}
