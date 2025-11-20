import { AfterViewInit, Component, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ColorService } from './color.service';

declare var Doodl: any;

@Component({
  selector: 'doodl-chart',
  standalone: true,
  templateUrl: './doodl-chart.component.html',
  styleUrl: './doodl-chart.component.css',
  host: { ngSkipHydration: '' },
})
export class DoodlChartComponent implements AfterViewInit {
  @Input() chartType: string = '';
  @Input() size: { width: number; height: number } = { width: 500, height: 500 };
  @Input() data: any = [];
  @Input() options: any = {};
  @Input() colors: string[] = [];
  @Input() palette = {
    colors: '',
    n_colors: 10,
    desat: 1,
  };

  spanId: string = 'doodl-chart-span';
  readonly fileObj = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private colorService: ColorService
  ) {}

  ngAfterViewInit() {
    // Only run in browser, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      if (this.colors.length === 0 && this.palette.colors !== '') {
        this.colorService
          .getColors(this.palette.colors, this.palette.n_colors, this.palette.desat)
          .subscribe({
            next: (res: any) => {
              console.log('Palette response:', res);
              this.colors = res.colors;
            },
            error: (err) => console.error('Error fetching palette:', err),
          });
      }

      Doodl[this.chartType](
        `#${this.spanId}`,
        this.data,
        this.size,
        this.fileObj,
        this.colors,
        ...Object.values(this.options)
      );
    }
  }
}
