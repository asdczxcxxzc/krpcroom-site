import { TELEGRAM_URL } from '@/lib/constants';

function Script({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type BaseProps = {
  siteName: string;
  url: string;
  description: string;
  locale: string;
};

export function OrganizationJsonLd({ siteName, url, description }: BaseProps) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url,
        description,
        sameAs: [TELEGRAM_URL],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          availableLanguage: ['ko', 'en', 'zh'],
          url: TELEGRAM_URL
        }
      }}
    />
  );
}

export function WebSiteJsonLd({ siteName, url, locale }: BaseProps) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url,
        inLanguage: locale,
        publisher: { '@type': 'Organization', name: siteName, url }
      }}
    />
  );
}

export function SoftwareApplicationJsonLd({
  siteName,
  url,
  description
}: Omit<BaseProps, 'locale'>) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: siteName,
        operatingSystem: 'Windows 10, Windows 11',
        applicationCategory: 'GameApplication',
        applicationSubCategory: 'PC-bang client',
        description,
        url,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'KRW',
          lowPrice: 10000,
          highPrice: 6000000,
          offerCount: 9
        }
      }}
    />
  );
}

export function FAQPageJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((it) => ({
          '@type': 'Question',
          name: it.question,
          acceptedAnswer: { '@type': 'Answer', text: it.answer }
        }))
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          item: it.url
        }))
      }}
    />
  );
}

export function HowToJsonLd({
  name,
  description,
  steps
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text
        }))
      }}
    />
  );
}

export function ServiceJsonLd({
  siteName,
  url,
  description,
  offers
}: Omit<BaseProps, 'locale'> & {
  offers: { name: string; price: number; description?: string }[];
}) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: siteName,
        url,
        description,
        provider: { '@type': 'Organization', name: siteName, url },
        offers: offers.map((o) => ({
          '@type': 'Offer',
          name: o.name,
          price: o.price,
          priceCurrency: 'KRW',
          description: o.description,
          availability: 'https://schema.org/InStock',
          url: TELEGRAM_URL
        }))
      }}
    />
  );
}

export function ItemListJsonLd({
  name,
  items
}: {
  name: string;
  items: { name: string; position: number }[];
}) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name,
        numberOfItems: items.length,
        itemListElement: items.map((it) => ({
          '@type': 'ListItem',
          position: it.position,
          name: it.name
        }))
      }}
    />
  );
}
