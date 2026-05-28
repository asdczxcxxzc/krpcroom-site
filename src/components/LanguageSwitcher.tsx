'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { usePathname, useRouter, routing } from '@/i18n/routing';

const LABELS: Record<string, string> = {
  ko: '한국어',
  en: 'English',
  zh: '中文'
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('language');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function pick(next: string) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as never });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('label')}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-app bg-elev px-3 text-sm text-fg transition hover:border-brand-400 hover:text-brand-400"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{LABELS[locale]}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-app bg-elev shadow-xl">
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => pick(l)}
              className="flex w-full items-center justify-between px-3 py-2 text-sm text-fg transition hover:bg-brand-500/10"
            >
              <span>{LABELS[l]}</span>
              {l === locale && <Check className="h-4 w-4 text-brand-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
