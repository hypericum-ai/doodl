import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ColorService } from './color.service';
import { renderDoodlChart } from './doodl-runtime';
import { DEFAULT_CHART_SIZE, DEFAULT_PALETTE } from './types';
import type { ChartOptions, ChartSize, PaletteConfig } from './types';

let nextChartId = 0;

@Component({
  selector: 'doodl-chart',
  standalone: true,
  templateUrl: './doodl-chart.component.html',
  styleUrl: './doodl-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: '' },
})
export class DoodlChartComponent implements AfterViewInit {
  readonly chartType = input('');
  readonly size = input<ChartSize>(DEFAULT_CHART_SIZE);
  readonly data = input<unknown>([]);
  readonly options = input<ChartOptions>({});
  readonly colors = input<string[]>([]);
  readonly palette = input<PaletteConfig>(DEFAULT_PALETTE);

  protected readonly spanId = `doodl-chart-${++nextChartId}`;
  private readonly fileObj: Record<string, unknown> = {};

  private readonly platformId = inject(PLATFORM_ID);
  private readonly colorService = inject(ColorService);
  private readonly destroyRef = inject(DestroyRef);

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const abortController = new AbortController();
    this.destroyRef.onDestroy(() => abortController.abort());

    try {
      const colors = await this.resolveColors();
      if (abortController.signal.aborted) {
        return;
      }
      renderDoodlChart(
        this.spanId,
        this.chartType(),
        this.data(),
        this.size(),
        colors,
        this.options(),
        this.fileObj,
      );
    } catch (error) {
      if (abortController.signal.aborted) {
        return;
      }
      console.error('Failed to render doodl chart:', error);
    }
  }

  private async resolveColors(): Promise<string[]> {
    const colors = this.colors();
    const palette = this.palette();

    if (colors.length > 0 || !palette.colors) {
      return colors;
    }

    try {
      return await this.colorService.getColors(palette.colors, palette.n_colors, palette.desat);
    } catch (error) {
      console.error('Error fetching palette:', error);
      return colors;
    }
  }
}

export { DoodlChartComponent as DoodlChart };
