import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KR PC ROOM',
    short_name: 'KR PC ROOM',
    description: 'PC-bang benefits at home — 40+ Korean game titles supported',
    start_url: '/',
    display: 'standalone',
    background_color: '#080b14',
    theme_color: '#1ea6ff',
    orientation: 'portrait',
    icons: [
      { src: '/icon', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' }
    ]
  };
}
