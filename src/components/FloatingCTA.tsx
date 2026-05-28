'use client';

import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { TELEGRAM_URL } from '@/lib/constants';

export function FloatingCTA() {
  const t = useTranslations('common');
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={t('openTelegram')}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow animate-pulse-ring"
    >
      <Send className="h-4 w-4" />
      <span className="hidden sm:inline">{t('openTelegram')}</span>
    </a>
  );
}
