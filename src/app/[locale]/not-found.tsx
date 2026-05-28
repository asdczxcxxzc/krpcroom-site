import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Home, Send, Search } from 'lucide-react';
import { TELEGRAM_URL } from '@/lib/constants';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'notFound' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-grid-light dark:bg-grid-dark [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute -top-20 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="text-8xl font-black tracking-tighter text-brand-gradient sm:text-9xl">
        404
      </div>
      <h1 className="mt-6 text-3xl font-black tracking-tight text-fg sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-md text-base text-muted">{t('desc')}</p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:brightness-110"
        >
          <Home className="h-4 w-4" />
          {nav('home')}
        </Link>
        <Link
          href="/games"
          className="inline-flex items-center gap-2 rounded-full border border-app bg-elev px-6 py-3 text-sm font-semibold text-fg transition hover:border-brand-400"
        >
          <Search className="h-4 w-4" />
          {nav('games')}
        </Link>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-app bg-elev px-6 py-3 text-sm font-semibold text-fg transition hover:border-brand-400"
        >
          <Send className="h-4 w-4" />
          {common('openTelegram')}
        </a>
      </div>
    </section>
  );
}
