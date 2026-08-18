# Doodl AI React Wrapper

Use [doodl.ai](https://doodl.ai/) charts inside a React application.

## Setup

Load the doodl runtime in `index.html` (or another global entry point):

```html
<link rel="stylesheet" href="https://doodl.ai/assets/doodl/css/doodl.css" />
<script src="https://doodl.ai/assets/doodl/js/doodlchart.min.js"></script>
```

Then render the component:

```tsx
import { DoodlChart } from 'doodl-ai-react';

const size = { width: 500, height: 500 };
const colors = [
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

const demoCharts = [
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

export default function App() {
  return (
    <div className="app-container">
      {demoCharts.map((chart, index) => (
        <DoodlChart
          key={index}
          chartType={chart.chartType}
          size={size}
          data={chart.data}
          options={chart.options}
          colors={colors}
        />
      ))}
    </div>
  );
}
```

`options` values are passed to the doodl chart function in object-key order, matching the extra arguments documented for each chart type.

If you omit `colors` and set `palette.colors` to a seaborn palette name (for example `'pastel'`), the wrapper will fetch that palette before rendering.
