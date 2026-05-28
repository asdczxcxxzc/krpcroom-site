import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { TELEGRAM_URL } from '@/lib/constants';
import { Send } from 'lucide-react';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-app bg-elev">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg brand-gradient text-white">
              <span className="text-xs font-black">MY</span>
            </span>
            <span className="text-lg text-fg">{t('brand.name')}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{t('brand.tagline')}</p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full brand-gradient px-4 py-2 text-sm font-medium text-white"
          >
            <Send className="h-4 w-4" />
            {t('common.telegramHandle')}
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-fg">{t('footer.service')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/features" className="hover:text-brand-500">{t('nav.features')}</Link></li>
            <li><Link href="/games" className="hover:text-brand-500">{t('nav.games')}</Link></li>
            <li><Link href="/guide" className="hover:text-brand-500">{t('nav.guide')}</Link></li>
            <li><Link href="/pricing" className="hover:text-brand-500">{t('nav.pricing')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-fg">{t('footer.support')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/faq" className="hover:text-brand-500">{t('nav.faq')}</Link></li>
            <li>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-brand-500">
                {t('common.openTelegram')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-fg">{t('footer.legal')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><a href="#" className="hover:text-brand-500">{t('footer.terms')}</a></li>
            <li><a href="#" className="hover:text-brand-500">{t('footer.privacy')}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-app">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-muted sm:px-6 lg:px-8">
          <span>© {year} {t('brand.name')}. {t('footer.rights')}</span>
          <span className="hidden sm:inline">{t('brand.tagline')}</span>
        </div>
      </div>
    </footer>
  );
}
