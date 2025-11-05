import { AfterViewInit, Component, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var Doodl: any;

@Component({
  selector: 'doodl-chart',
  standalone: true,
  templateUrl: './doodl-chart.html',
  styleUrl: './doodl-chart.css',
  host: { ngSkipHydration: '' }
})
export class DoodlChart implements AfterViewInit {
  @Input() chartId: string = '';
  @Input() size: { width: number; height: number } = { width: 500, height: 500 };
  @Input() data: any = [];
  @Input() options: any = {};
  @Input() colors: string[] = [];

  spanId: string = 'doodl-chart-span';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Only run in browser, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      Doodl[this.chartId](
        `#${this.spanId}`,
        this.data,
        this.size,
        {},
        this.colors,
        ...Object.values(this.options)
      );
    }
  }
}