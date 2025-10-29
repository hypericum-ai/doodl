## Stacked bar chart

A stacked bar chart is, as the name suggests, a variant of
a standard bar chart, where the bars for each series are
stacked on top of each other, like this:

<span class="doodl-chart" id="stacked_barchart_0"></span>

<Parameters>

In addition to the [standard parameters](/charts/intro#standard-parameters),
`stacked_barchart` takes the following arguments:

  <Parameter name="horizontal" type="Boolean">

  By default, the bars are rendered vertically (from bottom to top).
  If `horizontal` is true, the bars are rendered from left to right.

  </Parameter>
  <Parameter name="moving_average" type="Boolean">
  
  As with the [bar chart](/charts/bar-chart), if `moving_average` is
  true (default false) then a (smoothed) curve is added to the graph
  to indicate the series' moving average.

  </Parameter>

</Parameters>

### Data

Data is provided to the chart using either a list of dictionaries,
in JSON or Python, or a DataFrame. In any case, each data element
contains three items:

<Parameters no_header=true>

 <Parameter name="label" type="string">

 Specifies the X axis value for the data point. Used as a label
 on the X axis.

 </Parameter>

 <Parameter name="category" type="string">

 Identifies the "slice" of the bar represented by the value.

 </Parameter>

 <Parameter name="value" type="number">

 Identifies the thickness of the slice at this point.

 </Parameter>

</Parameters>

Here is an example:

::: tabs
== Markdown
```javascript
<stacked_barchart
    data='[
        { "label": "January",  "Apples": 30 },
        { "label": "January",  "Bananas": 20 },
        { "label": "January",  "Cherries": 10 },
        { "label": "February", "Apples": 20 },
        { "label": "February", "Bananas": 25 },
        { "label": "February", "Cherries": 15 },
        { "label": "March",    "Apples": 25 },
        { "label": "March",    "Bananas": 30 },
        { "label": "March",    "Cherries": 20 },
        { "label": "April",    "Apples": 35 },
        { "label": "April",    "Bananas": 20 },
        { "label": "April",    "Cherries": 25 },
        { "label": "May",      "Apples": 40 },
        { "label": "May",      "Bananas": 35 },
        { "label": "May",      "Cherries": 30 },
        { "label": "June",     "Apples": 30 },
        { "label": "June",     "Bananas": 40 },
        { "label": "June",     "Cherries": 20 },
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
        { "label": "January",  "Apples": 30 },
        { "label": "January",  "Bananas": 20 },
        { "label": "January",  "Cherries": 10 },
        { "label": "February", "Apples": 20 },
        { "label": "February", "Bananas": 25 },
        { "label": "February", "Cherries": 15 },
        { "label": "March",    "Apples": 25 },
        { "label": "March",    "Bananas": 30 },
        { "label": "March",    "Cherries": 20 },
        { "label": "April",    "Apples": 35 },
        { "label": "April",    "Bananas": 20 },
        { "label": "April",    "Cherries": 25 },
        { "label": "May",      "Apples": 40 },
        { "label": "May",      "Bananas": 35 },
        { "label": "May",      "Cherries": 30 },
        { "label": "June",     "Apples": 30 },
        { "label": "June",     "Bananas": 40 },
        { "label": "June",     "Cherries": 20 },
    ],
    width=500,
    height=500,
    colors='deep'
)
```
== Python data frame
In Python (in Jupyter and other notebooks) data may be provided via a DataFrame.

```python
import pandas as pd
import doodl

data =  [
    { "label": "January",  "Apples": 30 },
    { "label": "January",  "Bananas": 20 },
    { "label": "January",  "Cherries": 10 },
    { "label": "February", "Apples": 20 },
    { "label": "February", "Bananas": 25 },
    { "label": "February", "Cherries": 15 },
    { "label": "March",    "Apples": 25 },
    { "label": "March",    "Bananas": 30 },
    { "label": "March",    "Cherries": 20 },
    { "label": "April",    "Apples": 35 },
    { "label": "April",    "Bananas": 20 },
    { "label": "April",    "Cherries": 25 },
    { "label": "May",      "Apples": 40 },
    { "label": "May",      "Bananas": 35 },
    { "label": "May",      "Cherries": 30 },
    { "label": "June",     "Apples": 30 },
    { "label": "June",     "Bananas": 40 },
    { "label": "June",     "Cherries": 20 },
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
== Javascript
```javascript
<span class="doodl-chart" id="stacked_barchart_0"></span>

<script>
  Doodl.stacked_barchart(
    '#stacked_barchart_0',
    [
[
        { "label": "January",  "Apples": 30 },
        { "label": "January",  "Bananas": 20 },
        { "label": "January",  "Cherries": 10 },
        { "label": "February", "Apples": 20 },
        { "label": "February", "Bananas": 25 },
        { "label": "February", "Cherries": 15 },
        { "label": "March",    "Apples": 25 },
        { "label": "March",    "Bananas": 30 },
        { "label": "March",    "Cherries": 20 },
        { "label": "April",    "Apples": 35 },
        { "label": "April",    "Bananas": 20 },
        { "label": "April",    "Cherries": 25 },
        { "label": "May",      "Apples": 40 },
        { "label": "May",      "Bananas": 35 },
        { "label": "May",      "Cherries": 30 },
        { "label": "June",     "Apples": 30 },
        { "label": "June",     "Bananas": 40 },
        { "label": "June",     "Cherries": 20 },
    ]    ], {
        'width': 350,
        'height': 350
    },{},[
        '#4C72B0', '#DD8452', '#55A868'
    ], false, false
  )
</script>
```
:::

As with other table-like data formats, columns may be freely substituted:

::: tabs
== Markdown
```javascript
<stacked_barchart
    data='[
        { "month": "January",  "Apples": 30 },
        { "month": "January",  "Bananas": 20 },
        { "month": "January",  "Cherries": 10 },
        { "month": "February", "Apples": 20 },
        { "month": "February", "Bananas": 25 },
        { "month": "February", "Cherries": 15 },
        { "month": "March",    "Apples": 25 },
        { "month": "March",    "Bananas": 30 },
        { "month": "March",    "Cherries": 20 },
        { "month": "April",    "Apples": 35 },
        { "month": "April",    "Bananas": 20 },
        { "month": "April",    "Cherries": 25 },
        { "month": "May",      "Apples": 40 },
        { "month": "May",      "Bananas": 35 },
        { "month": "May",      "Cherries": 30 },
        { "month": "June",     "Apples": 30 },
        { "month": "June",     "Bananas": 40 },
        { "month": "June",     "Cherries": 20 },
    ]'
    width=500
    height=500
    colors='deep'
    labels='month'
>
</stacked_barchart>
```
== Python
```python
import doodl

doodl.stacked_barchart(
    data=[
        { "month": "January",  "Apples": 30 },
        { "month": "January",  "Bananas": 20 },
        { "month": "January",  "Cherries": 10 },
        { "month": "February", "Apples": 20 },
        { "month": "February", "Bananas": 25 },
        { "month": "February", "Cherries": 15 },
        { "month": "March",    "Apples": 25 },
        { "month": "March",    "Bananas": 30 },
        { "month": "March",    "Cherries": 20 },
        { "month": "April",    "Apples": 35 },
        { "month": "April",    "Bananas": 20 },
        { "month": "April",    "Cherries": 25 },
        { "month": "May",      "Apples": 40 },
        { "month": "May",      "Bananas": 35 },
        { "month": "May",      "Cherries": 30 },
        { "month": "June",     "Apples": 30 },
        { "month": "June",     "Bananas": 40 },
        { "month": "June",     "Cherries": 20 },
    ],
    width=500,
    height=500,
    colors='deep',
    labels='month'
)
```
== Python data frame
In Python (in Jupyter and other notebooks) data may be provided via a DataFrame.

```python
import pandas as pd
import doodl

data =  [
    { "month": "January",  "Apples": 30 },
    { "month": "January",  "Bananas": 20 },
    { "month": "January",  "Cherries": 10 },
    { "month": "February", "Apples": 20 },
    { "month": "February", "Bananas": 25 },
    { "month": "February", "Cherries": 15 },
    { "month": "March",    "Apples": 25 },
    { "month": "March",    "Bananas": 30 },
    { "month": "March",    "Cherries": 20 },
    { "month": "April",    "Apples": 35 },
    { "month": "April",    "Bananas": 20 },
    { "month": "April",    "Cherries": 25 },
    { "month": "May",      "Apples": 40 },
    { "month": "May",      "Bananas": 35 },
    { "month": "May",      "Cherries": 30 },
    { "month": "June",     "Apples": 30 },
    { "month": "June",     "Bananas": 40 },
    { "month": "June",     "Cherries": 20 },
]
df = pd.DataFrame(data)

doodl.stacked_barchart(
    data=df,
    labels='month'
    width=350,
    height=350,
    colors='deep'
)
```

<script>
 setTimeout(() => {
  Promise.resolve().then(() => 
  Doodl.stacked_barchart(
    '#stacked_barchart_0',
    [
        { "label": "January",  "Apples": 30 },
        { "label": "January",  "Bananas": 20 },
        { "label": "January",  "Cherries": 10 },
        { "label": "February", "Apples": 20 },
        { "label": "February", "Bananas": 25 },
        { "label": "February", "Cherries": 15 },
        { "label": "March",    "Apples": 25 },
        { "label": "March",    "Bananas": 30 },
        { "label": "March",    "Cherries": 20 },
        { "label": "April",    "Apples": 35 },
        { "label": "April",    "Bananas": 20 },
        { "label": "April",    "Cherries": 25 },
        { "label": "May",      "Apples": 40 },
        { "label": "May",      "Bananas": 35 },
        { "label": "May",      "Cherries": 30 },
        { "label": "June",     "Apples": 30 },
        { "label": "June",     "Bananas": 40 },
        { "label": "June",     "Cherries": 20 },
    ], {
        'width': 350,
        'height': 350
    },{},[
        '#4C72B0', '#DD8452', '#55A868'
    ], false, false
  ));
}, 1000);
</script>
