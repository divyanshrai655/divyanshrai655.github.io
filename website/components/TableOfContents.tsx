'use client';

import type { TocItem } from '@/lib/toc';

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-3">
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? 'ml-4' : undefined}>
            <a
              href={`#${item.id}`}
              className="text-muted hover:text-foreground transition-colors"
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


