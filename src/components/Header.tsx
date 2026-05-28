'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Send } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { TELEGRAM_URL } from '@/lib/constants';
import clsx from 'clsx';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/features', label: t('nav.features') },
    { href: '/games', label: t('nav.games') },
    { href: '/guide', label: t('nav.guide') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/faq', label: t('nav.faq') }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-app glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg brand-gradient text-white shadow-glow">
            <span className="text-xs font-black">MY</span>
          </span>
          <span className="text-lg tracking-tight text-fg">
            {t('brand.name')}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  'rounded-full px-4 py-2 text-sm transition',
                  active
                    ? 'bg-brand-500/10 text-brand-500'
                    : 'text-muted hover:text-fg'
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-1.5 rounded-full brand-gradient px-4 text-sm font-medium text-white shadow-glow transition hover:brightness-110 md:inline-flex"
          >
            <Send className="h-4 w-4" />
            {t('common.openTelegram')}
          </a>
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-app bg-elev text-fg lg:hidden"
            aria-label="menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-app bg-elev lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-fg transition hover:bg-brand-500/10"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full brand-gradient px-4 py-2.5 text-sm font-medium text-white"
            >
              <Send className="h-4 w-4" />
              {t('common.openTelegram')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
