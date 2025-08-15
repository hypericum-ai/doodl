## Pie chart

The venerable pie chart uses slices of a circle (the "pie") to
indicate how much of the whole each of a set of values represents.
Here is a simple example in HTML/Markdown:

~~~html
<piechart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
  size='{"width":500,"height":500}'
  colors='deep'
>
~~~

which renders like this:

<span class="chart-container" id="piechart_0"></span>

The piechart has two optional parameters which modify the chart:

- `donut=true` produces a chart with an empty circle in the middle
- `continuous_rotation=true` does as describes and continally rotates
  the pie chart after drawing it.
  
Both parameters default to `false`. Here is an example with both set
to `true`:

<span class="chart-container" id="piechart_1"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.piechart(
      '#piechart_0',
      [
        { "label": "Apples", "value": 10 },
        { "label": "Bananas", "value": 20 },
        { "label": "Cherries", "value": 15 },
        { "label": "Grapes", "value": 25 }
      ],
      {"width":500,"height":500},
      {},[
          '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF',
          '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'
      ]
    );
    Doodl.piechart(
      '#piechart_1',
      [
        { "label": "Apples", "value": 10 },
        { "label": "Bananas", "value": 20 },
        { "label": "Cherries", "value": 15 },
        { "label": "Grapes", "value": 25 }
      ],
      {"width":500,"height":500},
      {},[
          '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF',
          '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'
      ], true, true
    )
  });
}, 1000);
</script>
