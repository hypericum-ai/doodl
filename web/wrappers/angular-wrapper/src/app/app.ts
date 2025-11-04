import { Component, signal, PLATFORM_ID, Inject, Input, OnInit } from '@angular/core';
import { DoodlChart } from './charts/doodl-chart/doodl-chart';

declare var Doodl: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DoodlChart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('doodl-angular');
  chartId: string = 'piechart';
  size: { width: number; height: number } = { width: 500, height: 500 };
  data: any = [];
  options: any = {};
  colors: string[] = []

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.chartId = 'piechart';
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
}