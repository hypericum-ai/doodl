import type { ChartOptions, ChartSize } from './types';

export interface DoodlChartApi {
  [chartType: string]: ((...args: unknown[]) => void) | unknown;
}

interface DoodlNamespace {
  Doodl: new (token: string) => DoodlChartApi;
}

function getDoodlNamespace(): DoodlNamespace | undefined {
  return (globalThis as unknown as { Doodl?: DoodlNamespace }).Doodl;
}

export function createDoodlInstance(): DoodlChartApi {
  const namespace = getDoodlNamespace();
  if (!namespace?.Doodl) {
    throw new Error(
      'Doodl is not loaded. Include https://doodl.ai/assets/doodl/js/doodlchart.min.js before using <doodl-chart>.',
    );
  }
  return new namespace.Doodl('');
}

export function renderDoodlChart(
  elementId: string,
  chartType: string,
  data: unknown,
  size: ChartSize,
  colors: string[],
  options: ChartOptions,
  fileObj: Record<string, unknown> = {},
): void {
  if (!chartType) {
    throw new Error('doodl-chart: chartType is required.');
  }

  const doodl = createDoodlInstance();
  const chartFn = doodl[chartType];
  if (typeof chartFn !== 'function') {
    throw new Error(`Unknown doodl chart type: "${chartType}".`);
  }

  const host = document.getElementById(elementId);
  host?.replaceChildren();

  chartFn.call(doodl, `#${elementId}`, data, size, fileObj, colors, ...Object.values(options));
}
