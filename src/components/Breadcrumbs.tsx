import { ChevronRight, Home } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Crumb } from '@/lib/breadcrumbs';

function pathFromUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname || '/';
  } catch {
    return url;
  }
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length <= 1) return null;
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          const path = pathFromUrl(it.url);
          return (
            <li key={it.url} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
              {last ? (
                <span className="font-semibold text-fg" aria-current="page">
                  {it.name}
                </span>
              ) : (
                <Link
                  href={(path === '/' ? '/' : path) as never}
                  className="inline-flex items-center gap-1 transition hover:text-brand-500"
                >
                  {i === 0 && <Home className="h-3 w-3" />}
                  {it.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
