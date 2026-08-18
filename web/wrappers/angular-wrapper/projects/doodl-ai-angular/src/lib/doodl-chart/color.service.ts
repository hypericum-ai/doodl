import { Injectable } from '@angular/core';
import type { PaletteResponse } from './types';

const PALETTE_URL = 'https://svgtopng.doodl.ai/colors';

@Injectable({ providedIn: 'root' })
export class ColorService {
  private readonly cache = new Map<string, Promise<string[]>>();

  getColors(colors = 'pastel', nColors = 10, desat = 1): Promise<string[]> {
    const cacheKey = `${colors}|${nColors}|${desat}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const request = this.fetchPalette(colors, nColors, desat).catch((error: unknown) => {
      this.cache.delete(cacheKey);
      throw error;
    });

    this.cache.set(cacheKey, request);
    return request;
  }

  private async fetchPalette(colors: string, nColors: number, desat: number): Promise<string[]> {
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
}
