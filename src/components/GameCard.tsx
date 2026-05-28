import Image from 'next/image';
import { Gamepad2 } from 'lucide-react';
import clsx from 'clsx';
import type { Game } from '@/lib/constants';

export function GameCard({
  game,
  logo,
  locale
}: {
  game: Game;
  logo: string | null;
  locale: string;
}) {
  const localized = locale === 'ko' ? game.ko : locale === 'zh' ? game.cn : game.name;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-app bg-elev transition hover:border-brand-400">
      <div className="relative h-32 overflow-hidden">
        {logo ? (
          <>
            <Image
              src={logo}
              alt={`${game.name} logo`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
              className="object-cover transition duration-500 group-hover:scale-105"
              unoptimized={logo.endsWith('.svg')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        ) : (
          <div className={clsx('relative flex h-full items-center justify-center bg-gradient-to-br', game.gradient)}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="relative flex items-center gap-2">
              <Gamepad2
                className="h-7 w-7 text-white/80"
                style={{ filter: `drop-shadow(0 0 12px ${game.ring})` }}
              />
              <span className="text-2xl font-black tracking-tight text-white drop-shadow-lg">
                {game.short}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-sm font-bold text-fg">{localized}</div>
        <div className="mt-0.5 text-xs text-muted">{game.name}</div>
      </div>
    </div>
  );
}
