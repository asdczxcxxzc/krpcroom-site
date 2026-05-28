'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Send, Star, Clock, CalendarDays, Sparkles, Megaphone, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { TELEGRAM_URL } from '@/lib/constants';

const USD_RATE_KRW = 1500;
const CNY_RATE_KRW = 210;

function formatPrice(krw: number, locale: string): { amount: string; unit: string; prefix: boolean } {
  if (locale === 'ko') {
    return { amount: krw.toLocaleString('en-US'), unit: '원', prefix: false };
  }
  const rate = locale === 'zh' ? CNY_RATE_KRW : USD_RATE_KRW;
  const symbol = locale === 'zh' ? '¥' : '$';
  const converted = krw / rate;
  const floored = converted >= 100 ? Math.floor(converted / 100) * 100 : Math.floor(converted);
  return { amount: floored.toLocaleString('en-US'), unit: symbol, prefix: true };
}

type HourlyPlan = { minutes: number; price: number; popular?: boolean };
type SubPlan = { id: 'week' | 'month' | 'sixMonths' | 'year'; price: number; popular?: boolean; savings?: number };

const HOURLY_PLANS: HourlyPlan[] = [
  { minutes: 600, price: 10000 },
  { minutes: 1200, price: 20000 },
  { minutes: 3000, price: 48000, popular: true },
  { minutes: 4800, price: 75000 },
  { minutes: 6000, price: 90000 }
];

const SUB_PLANS: SubPlan[] = [
  { id: 'week', price: 170000 },
  { id: 'month', price: 600000, popular: true },
  { id: 'sixMonths', price: 3400000, savings: 6 },
  { id: 'year', price: 6000000, savings: 17 }
];

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function PricingTabs() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const [tab, setTab] = useState<'hourly' | 'sub'>('hourly');

  return (
    <>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-app bg-elev p-1">
          <button
            type="button"
            onClick={() => setTab('hourly')}
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition',
              tab === 'hourly'
                ? 'brand-gradient text-white shadow-glow'
                : 'text-muted hover:text-fg'
            )}
          >
            <Clock className="h-4 w-4" />
            {t('hourlyTab')}
          </button>
          <button
            type="button"
            onClick={() => setTab('sub')}
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition',
              tab === 'sub'
                ? 'brand-gradient text-white shadow-glow'
                : 'text-muted hover:text-fg'
            )}
          >
            <CalendarDays className="h-4 w-4" />
            {t('subscriptionTab')}
          </button>
        </div>
      </div>

      <div key={tab} className="animate-fade-in-up">
        {tab === 'hourly' ? (
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {HOURLY_PLANS.map((p, i) => (
              <HourlyCard
                key={p.minutes}
                plan={p}
                t={t}
                locale={locale}
                className={clsx(
                  'lg:col-span-4',
                  i === 3 && 'lg:col-start-3',
                  i === 4 && 'sm:col-span-2 lg:col-span-4'
                )}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SUB_PLANS.map((p) => (
                <SubCard key={p.id} plan={p} t={t} locale={locale} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-2.5 rounded-full border-2 border-brand-400/60 bg-brand-500/10 px-6 py-3 text-sm font-bold text-brand-500 shadow-glow transition hover:border-brand-400 hover:bg-brand-500/20"
              >
                <span className="absolute inset-0 -z-10 rounded-full bg-brand-500/20 blur-xl" />
                <Megaphone className="h-4 w-4" />
                {t('bulkNotice')}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}

type T = ReturnType<typeof useTranslations<'pricing'>>;

function HourlyCard({ plan, t, locale, className }: { plan: HourlyPlan; t: T; locale: string; className?: string }) {
  const price = formatPrice(plan.price, locale);
  return (
    <div
      className={clsx(
        'relative rounded-2xl border bg-elev p-7 text-center transition',
        plan.popular
          ? 'border-brand-400/60 shadow-glow'
          : 'border-app hover:border-brand-400/40',
        className
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full brand-gradient px-3 py-1 text-xs font-bold text-white">
          <Star className="h-3 w-3" />
          {t('popular')}
        </div>
      )}

      <div className="text-sm font-semibold text-muted">
        {formatNumber(plan.minutes)}
        {t('minutesUnit')}
      </div>

      <div className="mt-3 flex items-baseline justify-center gap-1">
        {price.prefix && <span className="text-base font-semibold text-muted">{price.unit}</span>}
        <span className="text-4xl font-black text-brand-gradient">{price.amount}</span>
        {!price.prefix && <span className="text-base font-semibold text-muted">{price.unit}</span>}
      </div>

      <div className="mt-2 text-xs text-muted">
        {t('hoursHint', { hours: Math.round(plan.minutes / 60) })}
      </div>

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className={clsx(
          'mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition',
          plan.popular
            ? 'brand-gradient text-white hover:brightness-110'
            : 'border border-app bg-app text-fg hover:border-brand-400'
        )}
      >
        <Send className="h-3.5 w-3.5" />
        {t('ctaSelect')}
      </a>
    </div>
  );
}

function SubCard({ plan, t, locale }: { plan: SubPlan; t: T; locale: string }) {
  const price = formatPrice(plan.price, locale);
  return (
    <div
      className={clsx(
        'relative rounded-2xl border bg-elev p-7 text-center transition',
        plan.popular
          ? 'border-brand-400/60 shadow-glow'
          : 'border-app hover:border-brand-400/40'
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full brand-gradient px-3 py-1 text-xs font-bold text-white">
          <Star className="h-3 w-3" />
          {t('popular')}
        </div>
      )}

      <div className="text-base font-bold text-fg">
        {t(`sub.${plan.id}.name`)}
      </div>

      <div className="mt-3 flex items-baseline justify-center gap-1">
        {price.prefix && <span className="text-base font-semibold text-muted">{price.unit}</span>}
        <span className="text-4xl font-black text-brand-gradient">{price.amount}</span>
        {!price.prefix && <span className="text-base font-semibold text-muted">{price.unit}</span>}
      </div>

      <div className="mt-2 text-xs text-muted">
        {t(`sub.${plan.id}.subtext`)}
      </div>

      {plan.savings ? (
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-bold text-accent-500">
          <Sparkles className="h-3 w-3" />
          {t('savings', { percent: plan.savings })}
        </div>
      ) : (
        <div className="mt-3 h-6" />
      )}

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className={clsx(
          'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition',
          plan.popular
            ? 'brand-gradient text-white hover:brightness-110'
            : 'border border-app bg-app text-fg hover:border-brand-400'
        )}
      >
        <Send className="h-3.5 w-3.5" />
        {t('ctaSelect')}
      </a>
    </div>
  );
}
