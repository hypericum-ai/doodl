# Doodl Ai Angular Wrapper

This project is an angular wrapper to use doodl-ai charts inside an angular project.
For detailed information and documentation check the official website [doodl.ai](https://doodl.ai/)



Example angular typescript component

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoodlChart } from 'doodl-ai-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DoodlChart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  size: { width: number; height: number } = { width: 500, height: 500 };
  colors: string[] = [
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

  demo_charts = [
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
    }
  ];
}
```


and the example template would look something like this 


```ts

<div class="app-container">
  @for (chart of demo_charts; track $index) {
    <doodl-chart
      [chartType]="chart.chartType"
      [size]="size"
      [data]="chart.data"
      [options]="chart.options"
      [colors]="colors"
    ></doodl-chart>
  }
</div>

```