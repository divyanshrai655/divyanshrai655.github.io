'use client';

import { useEffect, useMemo, useState } from 'react';
import type { TocItem } from '@/lib/toc';
import { TableOfContents } from '@/components/TableOfContents';

export function TableOfContentsPanel({
  items,
  showMobileTrigger = true,
  showDesktopSidebar = true,
}: {
  items: TocItem[];
  showMobileTrigger?: boolean;
  showDesktopSidebar?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const desktopWidth = useMemo(() => (collapsed ? 'lg:w-12' : 'lg:w-[260px]'), [collapsed]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile trigger */}
      {showMobileTrigger && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground hover:border-accent/60 transition-colors"
          aria-label="Open table of contents"
        >
          Contents
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close table of contents"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[min(84vw,320px)] bg-background border-r border-border p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold">Contents</div>
              <button
                type="button"
                className="rounded-md p-2 text-muted hover:text-foreground hover:bg-border/40 transition-colors"
                aria-label="Close"
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <TableOfContents
              items={items}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      {showDesktopSidebar && (
        <aside className={`hidden lg:block ${desktopWidth}`}>
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-3">
              {!collapsed && (
                <div className="text-xs font-medium uppercase tracking-wide text-muted">
                  On this page
                </div>
              )}
              <button
                type="button"
                onClick={() => setCollapsed((v) => !v)}
                className="rounded-md p-2 text-muted hover:text-foreground hover:bg-border/40 transition-colors"
                aria-label={
                  collapsed ? 'Expand table of contents' : 'Collapse table of contents'
                }
              >
                {collapsed ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                )}
              </button>
            </div>

            {!collapsed && <TableOfContents items={items} />}
          </div>
        </aside>
      )}
    </>
  );
}


