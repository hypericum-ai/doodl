## Stacked area chart

As the name implies, a stacked area chart layers several areacharts on
top of one another, like this:

<span class="doodl-chart" id="chart_0"></span>

<Parameters>

In addition to the [standard parameters](/charts/intro#standard-parameters),
`stacked_areachart` takes the following arguments:

  <Parameter name="curve" type="Boolean">

As with [area charts](/charts/area-chart),
if true, a cubic spline is plotted to give a smooth(ed) version
of the curve connecting the given points. `curved` defaults to `false`.

  </Parameter>
  <Parameter name="x_label_angle" type="Number (degrees)">

Specifies the number of degrees clockwise that the X axis
labels should be turned. This is to handle long labels.
The default value is 0 (no rotation).

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


<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.stacked_areachart('#chart_0', [
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
        { "label": "June",     "Cherries": 20 }
    ],
    {"width":500,"height":500},
    {},
    [
        '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF',
        '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'
    ],
    false,
    0
  );
  }
)
}, 1000);

</script>
