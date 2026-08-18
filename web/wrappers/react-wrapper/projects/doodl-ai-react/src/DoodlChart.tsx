import { useEffect, useId } from 'react';
import { fetchPalette } from './color';
import { renderDoodlChart } from './doodl-runtime';
import {
  DEFAULT_CHART_SIZE,
  DEFAULT_PALETTE,
  type ChartOptions,
  type ChartSize,
  type PaletteConfig,
} from './types';

export interface DoodlChartProps {
  chartType: string;
  size?: ChartSize;
  data?: unknown;
  options?: ChartOptions;
  colors?: string[];
  palette?: PaletteConfig;
  className?: string;
}

const EMPTY_DATA: unknown[] = [];
const EMPTY_OPTIONS: ChartOptions = {};
const EMPTY_COLORS: string[] = [];

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  width: 'fit-content',
} as const;

export function DoodlChart({
  chartType,
  size = DEFAULT_CHART_SIZE,
  data = EMPTY_DATA,
  options = EMPTY_OPTIONS,
  colors = EMPTY_COLORS,
  palette = DEFAULT_PALETTE,
  className,
}: DoodlChartProps) {
  const reactId = useId();
  const spanId = `doodl-chart-${reactId.replace(/:/g, '')}`;

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      let resolvedColors = colors;
      if (resolvedColors.length === 0 && palette.colors) {
        try {
          resolvedColors = await fetchPalette(palette.colors, palette.n_colors, palette.desat);
        } catch (error) {
          console.error('Error fetching palette:', error);
        }
      }

      if (cancelled) {
        return;
      }

      try {
        renderDoodlChart(spanId, chartType, data, size, resolvedColors, options);
      } catch (error) {
        console.error('Failed to render doodl chart:', error);
      }
    }

    void draw();
    return () => {
      cancelled = true;
    };
  }, [chartType, size, data, options, colors, palette, spanId]);

  return (
    <div className={className} style={wrapperStyle}>
      <span className="doodl-chart" id={spanId} />
    </div>
  );
}

DoodlChart.displayName = 'DoodlChart';
