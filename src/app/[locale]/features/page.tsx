import { setRequestLocale } from 'next-intl/server';
import { Features } from '@/components/sections/Features';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, pageKey: 'features', path: '/features' });
}

export default async function FeaturesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const crumbs = await buildBreadcrumbs(locale, 'features');

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <div className="pt-4">
        <Features />
        <ContactCTA />
      </div>
    </>
  );
}
