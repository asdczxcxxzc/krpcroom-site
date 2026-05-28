import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '14px',
          color: 'white',
          fontSize: '30px',
          fontWeight: 900,
          letterSpacing: '-2px',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        KR
      </div>
    ),
    size
  );
}
