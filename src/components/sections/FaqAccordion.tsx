'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export function FaqAccordion() {
  const t = useTranslations('faq.items');
  const [openKey, setOpenKey] = useState<string | null>('q1');

  return (
    <div className="mt-12 space-y-3">
      {KEYS.map((k) => {
        const open = openKey === k;
        return (
          <div
            key={k}
            className={clsx(
              'rounded-2xl border bg-elev transition',
              open ? 'border-brand-400/60' : 'border-app'
            )}
          >
            <button
              type="button"
              onClick={() => setOpenKey(open ? null : k)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold text-fg">
                {t(`${k}.q`)}
              </span>
              <ChevronDown
                className={clsx(
                  'h-5 w-5 shrink-0 text-muted transition',
                  open && 'rotate-180 text-brand-500'
                )}
              />
            </button>
            {open && (
              <div className="border-t border-app px-6 pb-5 pt-4 text-sm leading-relaxed text-muted">
                {t(`${k}.a`)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
