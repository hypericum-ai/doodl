import { AfterViewInit, Component, signal, PLATFORM_ID, Inject, Input, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var Doodl: any;

@Component({
  selector: 'doodl-chart',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('doodl-angular');
  @Input() chartId: string = 'piechart';
  @Input() spanId: string = 'doodl-chart-span';
  @Input() size: { width: number; height: number } = { width: 500, height: 500 };
  @Input() data: any = [];
  @Input() colors: string[] = []

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.chartId = 'piechart';
    this.spanId = 'doodl-chart-span';
    this.size = { width: 500, height: 500 };
    this.data = [
      { label: "Apples", value: 10 },
      { label: "Bananas", value: 20 },
      { label: "Cherries", value: 15 },
      { label: "Grapes", value: 25 }
    ];
    this.colors = [
      "#A1C9F4",
      "#FFB482",
      "#8DE5A1",
      "#FF9F9B",
      "#D0BBFF",
      "#DEBB9B",
      "#FAB0E4",
      "#CFCFCF",
      "#FFFEA3",
      "#B9F2F0"
    ];
  }

  ngAfterViewInit() {
    // Only run in browser, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      Doodl[this.chartId](
        `#${this.spanId}`,
        this.data,
        this.size,
        {},
        this.colors,
        true,
        false,
        true
      );
    }
  }
}