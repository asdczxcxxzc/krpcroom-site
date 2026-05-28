import fs from 'node:fs';
import path from 'node:path';
import { SUPPORTED_GAMES, LOGO_EXTS } from './constants';

const LOGO_DIR = path.join(process.cwd(), 'public', 'games');

function findLogo(id: string): string | null {
  for (const ext of LOGO_EXTS) {
    const file = path.join(LOGO_DIR, `${id}.${ext}`);
    if (fs.existsSync(file)) return `/games/${id}.${ext}`;
  }
  return null;
}

export function resolveLogos(): Record<string, string | null> {
  const out: Record<string, string | null> = {};
  for (const g of SUPPORTED_GAMES) out[g.id] = findLogo(g.id);
  return out;
}
