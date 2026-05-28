import { useTranslations } from 'next-intl';
import { UserPlus, Gamepad2, Play } from 'lucide-react';

const STEPS = [
  { key: 'step1', Icon: UserPlus },
  { key: 'step2', Icon: Gamepad2 },
  { key: 'step3', Icon: Play }
];

export function Steps() {
  const t = useTranslations('guide');

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-black tracking-tight text-fg sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-3 text-muted">{t('subtitle')}</p>
      </div>

      <div className="relative mt-14 grid gap-6 lg:grid-cols-3">
        <div className="absolute inset-x-12 top-12 hidden h-px bg-gradient-to-r from-brand-500/0 via-brand-500/40 to-brand-500/0 lg:block" />
        {STEPS.map((s, i) => (
          <div
            key={s.key}
            className="relative rounded-3xl border border-app bg-elev p-8"
          >
            <div className="flex items-center gap-4">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient text-white shadow-glow">
                <s.Icon className="h-5 w-5" />
              </div>
              <span className="text-5xl font-black text-brand-500/15">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-fg">
              {t(`steps.${s.key}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t(`steps.${s.key}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
