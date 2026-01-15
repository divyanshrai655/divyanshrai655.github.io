'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId) return;
    if (typeof window.gtag !== 'function') return;

    // Avoid `useSearchParams()` to keep static export happy; this runs client-side only.
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const url = search ? `${pathname}${search}` : pathname;

    // Pageview
    window.gtag('event', 'page_view', {
      page_path: url,
    });
  }, [measurementId, pathname]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}


