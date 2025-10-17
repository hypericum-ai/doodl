## Stacked bar chart

A stacked bar chart is, as the name suggests, a variant of
a standard bar chart, where the bars for each series are
stacked on top of each other, like this:

<span class="doodl-chart" id="stacked_barchart_0"></span>

<Parameters>

In addition to the [standard parameters](/charts/#standard-parameters),
`stacked_barchart` takes the following arguments:

  <Parameter name="horizontal" type="Boolean">

  By default, the bars are rendered vertically (from bottom to top).
  If `horizontal` is true, the bars are rendered from left to right.

  </Parameter>
  <Parameter name="moving_average" type="Boolean">
  
  As with the [bar chart](/charts/barchart), if `moving_average` is
  true (default false) then a (smoothed) curve is added to the graph
  to indicate the series' moving average.

  </Parameter>

</Parameters>

### Data

Data is provided to the chart using either a list of dictionaries,
in JSON or Python, or a DataFrame. Here is an example of using a native
list of dicts.

::: tabs
== Markdown
```javascript
<stacked_barchart
    data='[
        { "label": "January",  "Apples": 30, "Bananas": 20, "Cherries": 10 },
        { "label": "February", "Apples": 20, "Bananas": 25, "Cherries": 15 },
        { "label": "March",    "Apples": 25, "Bananas": 30, "Cherries": 20 },
        { "label": "April",    "Apples": 35, "Bananas": 20, "Cherries": 25 },
        { "label": "May",      "Apples": 40, "Bananas": 35, "Cherries": 30 },
        { "label": "June",     "Apples": 30, "Bananas": 40, "Cherries": 20 },
    ]'
    width=500
    height=500
    colors='deep'
>
</stacked_barchart>
```
== Python
```python
import doodl

doodl.stacked_barchart(
    data=[
        { "label": "January",  "Apples": 30, "Bananas": 20, "Cherries": 10 },
        { "label": "February", "Apples": 20, "Bananas": 25, "Cherries": 15 },
        { "label": "March",    "Apples": 25, "Bananas": 30, "Cherries": 20 },
        { "label": "April",    "Apples": 35, "Bananas": 20, "Cherries": 25 },
        { "label": "May",      "Apples": 40, "Bananas": 35, "Cherries": 30 },
        { "label": "June",     "Apples": 30, "Bananas": 40, "Cherries": 20 },
    ],
    width=500,
    height=500,
    colors='deep'
)
```
== Javascript
```javascript
<span class="doodl-chart" id="stacked_barchart_0"></span>

<script>
  Doodl.stacked_barchart(
    '#stacked_barchart_0',
    [
        { "label": "January",  "Apples": 30, "Bananas": 20, "Cherries": 10 },
        { "label": "February", "Apples": 20, "Bananas": 25, "Cherries": 15 },
        { "label": "March",    "Apples": 25, "Bananas": 30, "Cherries": 20 },
        { "label": "April",    "Apples": 35, "Bananas": 20, "Cherries": 25 },
        { "label": "May",      "Apples": 40, "Bananas": 35, "Cherries": 30 },
        { "label": "June",     "Apples": 30, "Bananas": 40, "Cherries": 20 },
    ], {
        'width': 350,
        'height': 350
    },{},[
        '#4C72B0', '#DD8452', '#55A868'
    ], false, false
  )
</script>
```
:::

In Python (in Jupyter and other notebooks) data may be provided via a DataFrame.

```python
import pandas as pd
import doodl

data =  [
    { "label": "January",  "Apples": 30, "Bananas": 20, "Cherries": 10 },
    { "label": "February", "Apples": 20, "Bananas": 25, "Cherries": 15 },
    { "label": "March",    "Apples": 25, "Bananas": 30, "Cherries": 20 },
    { "label": "April",    "Apples": 35, "Bananas": 20, "Cherries": 25 },
    { "label": "May",      "Apples": 40, "Bananas": 35, "Cherries": 30 },
    { "label": "June",     "Apples": 30, "Bananas": 40, "Cherries": 20 },
]
df = pd.DataFrame(data)

doodl.stacked_barchart(
    data=df,
    width=350,
    height=350,
    colors='deep'
)
```

In this case, the DataFrame must contain a "label" column, and the
names of the rest of the series are taken from the column names of all
remaining columns.

<script>
 setTimeout(() => {
  Promise.resolve().then(() => 
  Doodl.stacked_barchart(
    '#stacked_barchart_0',
    [
        { "label": "January",  "Apples": 30, "Bananas": 20, "Cherries": 10 },
        { "label": "February", "Apples": 20, "Bananas": 25, "Cherries": 15 },
        { "label": "March",    "Apples": 25, "Bananas": 30, "Cherries": 20 },
        { "label": "April",    "Apples": 35, "Bananas": 20, "Cherries": 25 },
        { "label": "May",      "Apples": 40, "Bananas": 35, "Cherries": 30 },
        { "label": "June",     "Apples": 30, "Bananas": 40, "Cherries": 20 },
    ], {
        'width': 350,
        'height': 350
    },{},[
        '#4C72B0', '#DD8452', '#55A868'
    ], false, false
  ));
}, 1000);
</script>