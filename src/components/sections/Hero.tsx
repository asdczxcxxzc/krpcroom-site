'use client';

import { useTranslations } from 'next-intl';
import { Send, Sparkles, ArrowRight } from 'lucide-react';
import { TELEGRAM_URL } from '@/lib/constants';
import { Link } from '@/i18n/routing';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl dark:bg-brand-500/15" />
      <div className="absolute right-0 top-32 -z-10 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500">
            <Sparkles className="h-3.5 w-3.5" />
            {t('badge')}
          </span>

          <h1 className="mt-6 whitespace-pre-line text-4xl font-black tracking-tight text-fg sm:text-5xl lg:text-6xl">
            {t('title').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-brand-gradient">{line}</span> : line}
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {t('subtitle')}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
            >
              <Send className="h-4 w-4" />
              {t('ctaPrimary')}
            </a>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-full border border-app bg-elev px-6 py-3 text-sm font-semibold text-fg transition hover:border-brand-400"
            >
              {t('ctaSecondary')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
          {[
            { label: t('stats.games'), value: '50+' },
            { label: t('stats.users'), value: '12,000+' },
            { label: t('stats.uptime'), value: '99.9%' }
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-app bg-elev p-5 text-center"
            >
              <div className="text-2xl font-black text-brand-gradient sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
