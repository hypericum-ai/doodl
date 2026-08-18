export interface ChartSize {
  width: number;
  height: number;
}

export interface PaletteConfig {
  colors: string;
  n_colors: number;
  desat: number;
}

export const DEFAULT_CHART_SIZE: ChartSize = { width: 500, height: 500 };

export const DEFAULT_PALETTE: PaletteConfig = {
  colors: '',
  n_colors: 10,
  desat: 1,
};

export interface PaletteResponse {
  colors: string[];
}

export type ChartOptions = Record<string, unknown>;
