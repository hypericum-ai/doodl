import { Component } from '@angular/core';
import { DoodlChartComponent } from '../../projects/doodl-ai-angular/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DoodlChartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  size = { width: 500, height: 500 };
  colors = [
    '#A1C9F4',
    '#FFB482',
    '#8DE5A1',
    '#FF9F9B',
    '#D0BBFF',
    '#DEBB9B',
    '#FAB0E4',
    '#CFCFCF',
    '#FFFEA3',
    '#B9F2F0',
  ];

  demoCharts = [
    {
      chartType: 'piechart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        donut: false,
        continuous_rotation: true,
        show_percentages: true,
      },
    },
    {
      chartType: 'piechart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        donut: true,
        continuous_rotation: false,
        show_percentages: false,
      },
    },
    {
      chartType: 'piechart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        donut: false,
        continuous_rotation: true,
        show_percentages: false,
      },
    },
    {
      chartType: 'barchart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        horizontal: false,
        moving_average: true,
        x_label_angle: 90,
      },
    },
    {
      chartType: 'barchart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        horizontal: true,
        moving_average: false,
        x_label_angle: 90,
      },
    },
  ];
}
