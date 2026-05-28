import { useTranslations } from 'next-intl';
import { Send, Clock } from 'lucide-react';
import { TELEGRAM_URL } from '@/lib/constants';

export function ContactCTA() {
  const t = useTranslations('contact');

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-app brand-gradient p-10 text-center text-white sm:p-16">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-10 -bottom-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

        <h2 className="relative text-3xl font-black tracking-tight sm:text-4xl">
          {t('title')}
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-white/85">
          {t('subtitle')}
        </p>

        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 transition hover:brightness-95"
          >
            <Send className="h-4 w-4" />
            {t('telegramCta')}
          </a>
          <span className="inline-flex items-center gap-1.5 text-sm text-white/85">
            <Clock className="h-4 w-4" />
            {t('responseTime')}
          </span>
        </div>
      </div>
    </section>
  );
}
