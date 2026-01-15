'use client';

import Script from 'next/script';
import { useEffect, useId, useMemo } from 'react';
import type { CSSProperties } from 'react';

type PlotlyData = Record<string, unknown>;
type PlotlyLayout = Record<string, unknown>;
type PlotlyConfig = Record<string, unknown>;

declare global {
  interface Window {
    Plotly?: {
      newPlot: (root: HTMLElement, data: PlotlyData[], layout?: PlotlyLayout, config?: PlotlyConfig) => void;
      purge?: (root: HTMLElement) => void;
    };
  }
}

export function Plotly({
  data,
  layout,
  config,
  className,
  style,
}: {
  data: PlotlyData[];
  layout?: PlotlyLayout;
  config?: PlotlyConfig;
  className?: string;
  style?: CSSProperties;
}) {
  const reactId = useId();
  const rootId = useMemo(() => `plotly-${reactId.replace(/:/g, '')}`, [reactId]);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    if (!window.Plotly?.newPlot) return;

    try {
      window.Plotly.newPlot(
        root,
        data,
        {
          margin: { l: 40, r: 20, t: 20, b: 40 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          ...layout,
        },
        {
          responsive: true,
          displayModeBar: false,
          ...config,
        }
      );
    } catch {
      // ignore
    }

    return () => {
      try {
        window.Plotly?.purge?.(root);
      } catch {
        // ignore
      }
    };
  }, [config, data, layout, rootId]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/plotly.js-dist-min@2.33.0/plotly.min.js"
        strategy="afterInteractive"
      />
      <div
        id={rootId}
        className={className}
        style={{
          width: '100%',
          height: 360,
          ...style,
        }}
      />
    </>
  );
}


