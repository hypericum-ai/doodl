import type { PaletteResponse } from './types';

const PALETTE_URL = 'https://svgtopng.doodl.ai/colors';
const cache = new Map<string, Promise<string[]>>();

export function fetchPalette(colors = 'pastel', nColors = 10, desat = 1): Promise<string[]> {
  const cacheKey = `${colors}|${nColors}|${desat}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const request = requestPalette(colors, nColors, desat).catch((error: unknown) => {
    cache.delete(cacheKey);
    throw error;
  });

  cache.set(cacheKey, request);
  return request;
}

async function requestPalette(colors: string, nColors: number, desat: number): Promise<string[]> {
  const body = new URLSearchParams({
    colors,
    n_colors: String(nColors),
    desat: String(desat),
  });

  const response = await fetch(PALETTE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    throw new Error(`Palette request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as PaletteResponse;
  if (!Array.isArray(payload.colors)) {
    throw new Error('Palette response did not include a colors array.');
  }

  return payload.colors;
}
