## Box plot

According to [Wikipedia](https://en.wikipedia.org/wiki/Box_plot), a box plot

> is a method for demonstrating graphically the locality, spread and
> skewness groups of numerical data through their quartiles. In
> addition to the box on a box plot, there can be lines (which are
> called whiskers) extending from the box indicating variability
> outside the upper and lower quartiles, thus, the plot is also called
> the box-and-whisker plot and the box-and-whisker diagram.

The following:

```html
<boxplot
  data='
  [
    {
      "category": "A",
      "values": [10, 15, 20]
    },
    {
      "category": "B",
      "values": [30, 35, 40]
    }
  ]'
  size='{"width":500,"height":350}'>
</boxplot>
```
would produce the following chart:

<span  class="chart-container" id="boxplot_0"></span>

The data for box plots is a (JSON) list of dictionaries, of the form:

```json
[
  {
    "category": "A",
    "values": [10, 15, 20]
  },
  {
    "category": "B",
    "values": [30, 35, 40]
  }
]
```

as shown above. An alternate form allows data to be provided in CSV:

```csv
category, value
A, 10
A, 15
A, 20
B, 30
B, 35
B, 40
```

or equivalently in JSON:

```json
[
  { "category": "A", "value": 10 },
  { "category": "A", "value": 15 },
  { "category": "A", "value": 20 },
  { "category": "B", "value": 30 },
  { "category": "B", "value": 35 },
  { "category": "B", "value": 40 }
]
```

<script>
 setTimeout(() => {
  Promise.resolve().then(() => 
  Doodl.boxplot(
    '#boxplot_0',
    [
      { "category": "A", "value": 10 },
      { "category": "A", "value": 15 },
      { "category": "A", "value": 20 },
      { "category": "B", "value": 30 },
      { "category": "B", "value": 35 },
      { "category": "B", "value": 40 }
    ], {
      'width': 500,
      'height': 350
    },{},["DarkOrange"]
  ));
}, 1000);
</script>
