import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1ea6ff 0%, #ff5a14 100%)',
          color: 'white',
          fontSize: '76px',
          fontWeight: 900,
          letterSpacing: '-4px',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        MY
      </div>
    ),
    size
  );
}
