'use client';

import { useState, useMemo, useDeferredValue } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { GameCard } from '@/components/GameCard';
import type { Game } from '@/lib/constants';

function matches(game: Game, qLower: string, qRaw: string): boolean {
  if (!qLower) return true;
  return (
    game.name.toLowerCase().includes(qLower) ||
    game.id.toLowerCase().includes(qLower) ||
    game.short.toLowerCase().includes(qLower) ||
    game.ko.toLowerCase().includes(qLower) ||
    game.ko.includes(qRaw) ||
    game.cn.includes(qRaw)
  );
}

export function GamesSearchable({
  games,
  logos
}: {
  games: Game[];
  logos: Record<string, string | null>;
}) {
  const locale = useLocale();
  const t = useTranslations('games');
  const [q, setQ] = useState('');
  const deferred = useDeferredValue(q);

  const filtered = useMemo(() => {
    const raw = deferred.trim();
    if (!raw) return games;
    const lower = raw.toLowerCase();
    return games.filter((g) => matches(g, lower, raw));
  }, [deferred, games]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mt-10 max-w-xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('searchPlaceholder')}
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-full border border-app bg-elev py-3 pl-11 pr-11 text-sm text-fg outline-none transition placeholder:text-muted/70 focus:border-brand-400 focus:ring-brand"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              aria-label="clear"
              className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-app hover:text-fg"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="mt-3 text-center text-xs text-muted">
          {t('resultCount', { count: filtered.length, total: games.length })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((g) => (
            <GameCard key={g.id} game={g} logo={logos[g.id] ?? null} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-app bg-elev">
            <Search className="h-5 w-5 text-muted" />
          </div>
          <div className="text-sm font-medium text-fg">{t('noResults')}</div>
          <div className="text-xs text-muted">"{q}"</div>
        </div>
      )}
    </div>
  );
}
