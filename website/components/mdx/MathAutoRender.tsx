'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    // Provided by KaTeX auto-render bundle
    renderMathInElement?: (element: HTMLElement, options?: unknown) => void;
  }
}

export function MathAutoRender({ containerId }: { containerId: string }) {
  useEffect(() => {
    // KaTeX CSS from a CDN is render-blocking if included in the global <head>.
    // Load it on-demand so pages without math don't "hang" waiting on the network.
    const cssId = 'katex-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css';
      document.head.appendChild(link);
    }

    const el = document.getElementById(containerId);
    if (!el) return;

    // Run once KaTeX auto-render is available.
    // If it isn't yet, the Script onLoad will trigger a rerender via the same effect
    // because Next mounts scripts before effects run on first paint; still we guard here.
    if (typeof window.renderMathInElement === 'function') {
      try {
        window.renderMathInElement(el, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true },
          ],
          throwOnError: false,
          // Don't render math inside code blocks
          ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        });
      } catch {
        // ignore
      }
    }
  }, [containerId]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          const el = document.getElementById(containerId);
          if (!el) return;
          if (typeof window.renderMathInElement !== 'function') return;
          try {
            window.renderMathInElement(el, {
              delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true },
              ],
              throwOnError: false,
              ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            });
          } catch {
            // ignore
          }
        }}
      />
    </>
  );
}


