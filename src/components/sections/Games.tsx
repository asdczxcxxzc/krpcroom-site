import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { SUPPORTED_GAMES } from '@/lib/constants';
import { resolveLogos } from '@/lib/game-logos';
import { Link } from '@/i18n/routing';
import { GameCard } from '@/components/GameCard';

type Props = {
  limit?: number;
  showViewAll?: boolean;
  compact?: boolean;
};

export async function Games({ limit, showViewAll = false, compact = false }: Props = {}) {
  const t = await getTranslations('games');
  const locale = await getLocale();
  const logos = resolveLogos();
  const list = typeof limit === 'number' ? SUPPORTED_GAMES.slice(0, limit) : SUPPORTED_GAMES;

  return (
    <section className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', compact ? 'py-12' : 'py-20')}>
      {!compact && (
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-fg sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-muted">{t('subtitle')}</p>
        </div>
      )}

      <div className={clsx('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4', !compact && 'mt-12')}>
        {list.map((g) => (
          <GameCard key={g.id} game={g} logo={logos[g.id]} locale={locale} />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 rounded-full border border-app bg-elev px-6 py-3 text-sm font-semibold text-fg transition hover:border-brand-400 hover:text-brand-400"
          >
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
