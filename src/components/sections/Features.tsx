import { useTranslations } from 'next-intl';
import {
  ShieldCheck,
  Monitor,
  Download,
  Lock,
  Gamepad2,
  Headset,
  type LucideIcon
} from 'lucide-react';

const KEYS = ['fullBenefit', 'onMyPc', 'easyInstall', 'secure', 'manyGames', 'support'] as const;

const ICONS: Record<(typeof KEYS)[number], LucideIcon> = {
  fullBenefit: ShieldCheck,
  onMyPc: Monitor,
  easyInstall: Download,
  secure: Lock,
  manyGames: Gamepad2,
  support: Headset
};

export function Features() {
  const t = useTranslations('features');

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-black tracking-tight text-fg sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-3 text-muted">{t('subtitle')}</p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KEYS.map((key) => {
          const Icon = ICONS[key];
          return (
            <div
              key={key}
              className="group relative rounded-2xl border border-app bg-elev p-6 transition hover:border-brand-400"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl brand-gradient text-white shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-fg">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`items.${key}.desc`)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
