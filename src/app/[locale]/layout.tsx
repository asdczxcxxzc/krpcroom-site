import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLd';
import {
  SITE_URL,
  VERIFICATION,
  localePath,
  absoluteUrl,
  localeToLang,
  localeToOg
} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#080b14' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) return {};
  const m = await getTranslations({ locale, namespace: 'meta' });

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[localeToLang(l)] = localePath(l, '');
  languages['x-default'] = localePath(routing.defaultLocale, '');

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: m('defaultTitle'), template: m('titleTemplate') },
    description: m('description'),
    keywords: m('keywords').split(',').map((s) => s.trim()),
    applicationName: m('siteName'),
    authors: [{ name: m('siteName') }],
    creator: m('siteName'),
    publisher: m('siteName'),
    formatDetection: { email: false, address: false, telephone: false },
    alternates: { canonical: localePath(locale, ''), languages },
    openGraph: {
      type: 'website',
      url: absoluteUrl(locale, ''),
      siteName: m('siteName'),
      title: m('defaultTitle'),
      description: m('description'),
      locale: localeToOg(locale),
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map(localeToOg)
    },
    twitter: {
      card: 'summary_large_image',
      title: m('defaultTitle'),
      description: m('description')
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    },
    verification: {
      google: VERIFICATION.google,
      yandex: VERIFICATION.yandex,
      other: {
        ...(VERIFICATION.bing ? { 'msvalidate.01': VERIFICATION.bing } : {}),
        ...(VERIFICATION.baidu ? { 'baidu-site-verification': VERIFICATION.baidu } : {})
      }
    },
    referrer: 'origin-when-cross-origin',
    other: {
      'baidu-site-verification': VERIFICATION.baidu || '',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'mobile-web-app-capable': 'yes'
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'meta' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const siteName = t('siteName');
  const description = t('description');
  const url = absoluteUrl(locale, '');
  const skipLabel = locale === 'ko' ? '본문 바로가기' : locale === 'zh' ? '跳到主要内容' : 'Skip to main content';

  return (
    <html lang={localeToLang(locale)} suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://t.me" />
        <link rel="dns-prefetch" href="https://t.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-app font-sans text-fg antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          {skipLabel}
        </a>
        <OrganizationJsonLd siteName={siteName} description={description} url={url} locale={locale} />
        <WebSiteJsonLd siteName={siteName} description={description} url={url} locale={locale} />
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <FloatingCTA />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
