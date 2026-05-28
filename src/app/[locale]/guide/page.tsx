import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Steps } from '@/components/sections/Steps';
import { ContactCTA } from '@/components/sections/ContactCTA';
import {
  MonitorCheck,
  MemoryStick,
  Wifi,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd, HowToJsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, pageKey: 'guide', path: '/guide' });
}

export default async function GuidePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'guide.requirements' });
  const guideT = await getTranslations({ locale, namespace: 'guide' });
  const crumbs = await buildBreadcrumbs(locale, 'guide');

  const reqs = [
    { Icon: MonitorCheck, label: t('os') },
    { Icon: MemoryStick, label: t('ram') },
    { Icon: Wifi, label: t('net') },
    { Icon: ShieldAlert, label: t('admin') }
  ];

  const howToSteps = (['step1', 'step2', 'step3'] as const).map((k) => ({
    name: guideT(`steps.${k}.title`),
    text: guideT(`steps.${k}.desc`)
  }));

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <HowToJsonLd
        name={guideT('title')}
        description={guideT('subtitle')}
        steps={howToSteps}
      />
      <Breadcrumbs items={crumbs} />
      <div className="pt-4">
        <Steps />

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-app bg-elev p-8 sm:p-10">
            <h3 className="text-2xl font-black tracking-tight text-fg">
              {t('title')}
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {reqs.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-app bg-app p-4"
                >
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg brand-gradient text-white">
                    <r.Icon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium text-fg">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <NoticeCard locale={locale} />

        <ContactCTA />
      </div>
    </>
  );
}

async function NoticeCard({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'guide.notice' });
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border-2 border-accent-500/50 bg-accent-500/[0.06] p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-500 text-white shadow-glow">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-black text-accent-500 sm:text-xl">
              {t('title')}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fg sm:text-base">
              {t.rich('lead', {
                strong: (chunks) => (
                  <strong className="font-bold text-accent-500">{chunks}</strong>
                )
              })}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fg sm:text-base">
              {t.rich('warn', {
                strong: (chunks) => (
                  <strong className="font-bold text-accent-500">{chunks}</strong>
                )
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
