import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KR PC ROOM',
  description: 'Real PC-bang benefits, right at home.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
