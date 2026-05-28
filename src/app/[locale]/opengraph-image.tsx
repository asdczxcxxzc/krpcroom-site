import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const runtime = 'edge';
export const alt = 'MY PCBANG';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateImageMetadata() {
  return routing.locales.map((locale) => ({ id: locale }));
}

export default async function OG({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const brandT = await getTranslations({ locale, namespace: 'brand' });

  const siteName = t('siteName');
  const tagline = brandT('tagline');
  const heroPages = await getTranslations({ locale, namespace: 'meta.pages.home' });
  const heroTitle = heroPages('title');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, #080b14 0%, #054b7c 45%, #1ea6ff 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-150px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,90,20,0.55) 0%, rgba(255,90,20,0) 70%)',
            display: 'flex'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-200px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(30,166,255,0.7) 0%, rgba(30,166,255,0) 70%)',
            display: 'flex'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '22px',
              background:
                'linear-gradient(135deg, #1ea6ff 0%, #ff5a14 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 900,
              color: 'white',
              boxShadow: '0 20px 60px rgba(30,166,255,0.5)'
            }}
          >
            MY
          </div>
          <div
            style={{
              fontSize: '54px',
              fontWeight: 900,
              letterSpacing: '-2px',
              display: 'flex'
            }}
          >
            {siteName}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '78px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-2px',
              maxWidth: '1000px',
              display: 'flex'
            }}
          >
            {heroTitle}
          </div>
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 500,
              display: 'flex'
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '2px solid rgba(255,255,255,0.15)'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '14px',
              fontSize: '22px',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 600
            }}
          >
            <span style={{ display: 'flex' }}>LoL</span>
            <span style={{ display: 'flex', color: 'rgba(255,255,255,0.4)' }}>·</span>
            <span style={{ display: 'flex' }}>Valorant</span>
            <span style={{ display: 'flex', color: 'rgba(255,255,255,0.4)' }}>·</span>
            <span style={{ display: 'flex' }}>Lost Ark</span>
            <span style={{ display: 'flex', color: 'rgba(255,255,255,0.4)' }}>·</span>
            <span style={{ display: 'flex' }}>PUBG</span>
            <span style={{ display: 'flex', color: 'rgba(255,255,255,0.4)' }}>·</span>
            <span style={{ display: 'flex' }}>40+</span>
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #1ea6ff 0%, #ff5a14 100%)',
              fontSize: '22px',
              fontWeight: 700,
              display: 'flex'
            }}
          >
            @mypcbang
          </div>
        </div>
      </div>
    ),
    size
  );
}
