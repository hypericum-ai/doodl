# Doodl AI Angular Wrapper

Use [doodl.ai](https://doodl.ai/) charts inside an Angular application.

## Setup

Load the doodl runtime in `index.html` (or another global entry point):

```html
<link rel="stylesheet" href="https://doodl.ai/assets/doodl/css/doodl.css" />
<script src="https://doodl.ai/assets/doodl/js/doodlchart.min.js"></script>
```

Then import the standalone component:

```ts
import { Component } from '@angular/core';
import { DoodlChart } from 'doodl-ai-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DoodlChart],
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
  ];
}
```

```html
<div class="app-container">
  @for (chart of demoCharts; track $index) {
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

`options` values are passed to the doodl chart function in object-key order, matching the extra arguments documented for each chart type.

If you omit `colors` and set `palette.colors` to a seaborn palette name (for example `'pastel'`), the wrapper will fetch that palette before rendering.
