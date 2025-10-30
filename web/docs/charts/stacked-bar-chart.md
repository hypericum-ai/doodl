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
        { "label": "January",  "category": "Apples", "value": 30 },
        { "label": "January",  "category": "Bananas", "value": 20 },
        { "label": "January",  "category": "Cherries", "value": 10 },
        { "label": "February", "category": "Apples", "value": 20 },
        { "label": "February", "category": "Bananas", "value": 25 },
        { "label": "February", "category": "Cherries", "value": 15 },
        { "label": "March",    "category": "Apples", "value": 25 },
        { "label": "March",    "category": "Bananas", "value": 30 },
        { "label": "March",    "category": "Cherries", "value": 20 },
        { "label": "April",    "category": "Apples", "value": 35 },
        { "label": "April",    "category": "Bananas", "value": 20 },
        { "label": "April",    "category": "Cherries", "value": 25 },
        { "label": "May",      "category": "Apples", "value": 40 },
        { "label": "May",      "category": "Bananas", "value": 35 },
        { "label": "May",      "category": "Cherries", "value": 30 },
        { "label": "June",     "category": "Apples", "value": 30 },
        { "label": "June",     "category": "Bananas", "value": 40 },
        { "label": "June",     "category": "Cherries", "value": 20 }
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
        { "label": "January",  "category": "Apples", "value": 30 },
        { "label": "January",  "category": "Bananas", "value": 20 },
        { "label": "January",  "category": "Cherries", "value": 10 },
        { "label": "February", "category": "Apples", "value": 20 },
        { "label": "February", "category": "Bananas", "value": 25 },
        { "label": "February", "category": "Cherries", "value": 15 },
        { "label": "March",    "category": "Apples", "value": 25 },
        { "label": "March",    "category": "Bananas", "value": 30 },
        { "label": "March",    "category": "Cherries", "value": 20 },
        { "label": "April",    "category": "Apples", "value": 35 },
        { "label": "April",    "category": "Bananas", "value": 20 },
        { "label": "April",    "category": "Cherries", "value": 25 },
        { "label": "May",      "category": "Apples", "value": 40 },
        { "label": "May",      "category": "Bananas", "value": 35 },
        { "label": "May",      "category": "Cherries", "value": 30 },
        { "label": "June",     "category": "Apples", "value": 30 },
        { "label": "June",     "category": "Bananas", "value": 40 },
        { "label": "June",     "category": "Cherries", "value": 20 }
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
    { "label": "January",  "category": "Apples", "value": 30 },
    { "label": "January",  "category": "Bananas", "value": 20 },
    { "label": "January",  "category": "Cherries", "value": 10 },
    { "label": "February", "category": "Apples", "value": 20 },
    { "label": "February", "category": "Bananas", "value": 25 },
    { "label": "February", "category": "Cherries", "value": 15 },
    { "label": "March",    "category": "Apples", "value": 25 },
    { "label": "March",    "category": "Bananas", "value": 30 },
    { "label": "March",    "category": "Cherries", "value": 20 },
    { "label": "April",    "category": "Apples", "value": 35 },
    { "label": "April",    "category": "Bananas", "value": 20 },
    { "label": "April",    "category": "Cherries", "value": 25 },
    { "label": "May",      "category": "Apples", "value": 40 },
    { "label": "May",      "category": "Bananas", "value": 35 },
    { "label": "May",      "category": "Cherries", "value": 30 },
    { "label": "June",     "category": "Apples", "value": 30 },
    { "label": "June",     "category": "Bananas", "value": 40 },
    { "label": "June",     "category": "Cherries", "value": 20 }
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
        { "label": "January",  "category": "Apples", "value": 30 },
        { "label": "January",  "category": "Bananas", "value": 20 },
        { "label": "January",  "category": "Cherries", "value": 10 },
        { "label": "February", "category": "Apples", "value": 20 },
        { "label": "February", "category": "Bananas", "value": 25 },
        { "label": "February", "category": "Cherries", "value": 15 },
        { "label": "March",    "category": "Apples", "value": 25 },
        { "label": "March",    "category": "Bananas", "value": 30 },
        { "label": "March",    "category": "Cherries", "value": 20 },
        { "label": "April",    "category": "Apples", "value": 35 },
        { "label": "April",    "category": "Bananas", "value": 20 },
        { "label": "April",    "category": "Cherries", "value": 25 },
        { "label": "May",      "category": "Apples", "value": 40 },
        { "label": "May",      "category": "Bananas", "value": 35 },
        { "label": "May",      "category": "Cherries", "value": 30 },
        { "label": "June",     "category": "Apples", "value": 30 },
        { "label": "June",     "category": "Bananas", "value": 40 },
        { "label": "June",     "category": "Cherries", "value": 20 }
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
        { "month": "January",  "product": "Apples", "value": 30 },
        { "month": "January",  "product": "Bananas", "value": 20 },
        { "month": "January",  "product": "Cherries", "value": 10 },
        { "month": "February", "product": "Apples", "value": 20 },
        { "month": "February", "product": "Bananas", "value": 25 },
        { "month": "February", "product": "Cherries", "value": 15 },
        { "month": "March",    "product": "Apples", "value": 25 },
        { "month": "March",    "product": "Bananas", "value": 30 },
        { "month": "March",    "product": "Cherries", "value": 20 },
        { "month": "April",    "product": "Apples", "value": 35 },
        { "month": "April",    "product": "Bananas", "value": 20 },
        { "month": "April",    "product": "Cherries", "value": 25 },
        { "month": "May",      "product": "Apples", "value": 40 },
        { "month": "May",      "product": "Bananas", "value": 35 },
        { "month": "May",      "product": "Cherries", "value": 30 },
        { "month": "June",     "product": "Apples", "value": 30 },
        { "month": "June",     "product": "Bananas", "value": 40 },
        { "month": "June",     "product": "Cherries", "value": 20 },
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
        { "month": "January",  "category": "Apples", "value": 30 },
        { "month": "January",  "category": "Bananas", "value": 20 },
        { "month": "January",  "category": "Cherries", "value": 10 },
        { "month": "February", "category": "Apples", "value": 20 },
        { "month": "February", "category": "Bananas", "value": 25 },
        { "month": "February", "category": "Cherries", "value": 15 },
        { "month": "March",    "category": "Apples", "value": 25 },
        { "month": "March",    "category": "Bananas", "value": 30 },
        { "month": "March",    "category": "Cherries", "value": 20 },
        { "month": "April",    "category": "Apples", "value": 35 },
        { "month": "April",    "category": "Bananas", "value": 20 },
        { "month": "April",    "category": "Cherries", "value": 25 },
        { "month": "May",      "category": "Apples", "value": 40 },
        { "month": "May",      "category": "Bananas", "value": 35 },
        { "month": "May",      "category": "Cherries", "value": 30 },
        { "month": "June",     "category": "Apples", "value": 30 },
        { "month": "June",     "category": "Bananas", "value": 40 },
        { "month": "June",     "category": "Cherries", "value": 20 },
    ],
    width=500,
    height=500,
    colors='deep',
    label='month',
    category='product'
)
```
== Python data frame
In Python (in Jupyter and other notebooks) data may be provided via a DataFrame.

```python
import pandas as pd
import doodl

data =  [
    { "month": "January",  "category": "Apples", "value": 30 },
    { "month": "January",  "category": "Bananas", "value": 20 },
    { "month": "January",  "category": "Cherries", "value": 10 },
    { "month": "February", "category": "Apples", "value": 20 },
    { "month": "February", "category": "Bananas", "value": 25 },
    { "month": "February", "category": "Cherries", "value": 15 },
    { "month": "March",    "category": "Apples", "value": 25 },
    { "month": "March",    "category": "Bananas", "value": 30 },
    { "month": "March",    "category": "Cherries", "value": 20 },
    { "month": "April",    "category": "Apples", "value": 35 },
    { "month": "April",    "category": "Bananas", "value": 20 },
    { "month": "April",    "category": "Cherries", "value": 25 },
    { "month": "May",      "category": "Apples", "value": 40 },
    { "month": "May",      "category": "Bananas", "value": 35 },
    { "month": "May",      "category": "Cherries", "value": 30 },
    { "month": "June",     "category": "Apples", "value": 30 },
    { "month": "June",     "category": "Bananas", "value": 40 },
    { "month": "June",     "category": "Cherries", "value": 20 }
]
df = pd.DataFrame(data)

doodl.stacked_barchart(
    data=df,
    labels='month'
    category='product'
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
        { "label": "January",  "category": "Apples", "value": 30 },
        { "label": "January",  "category": "Bananas", "value": 20 },
        { "label": "January",  "category": "Cherries", "value": 10 },
        { "label": "February", "category": "Apples", "value": 20 },
        { "label": "February", "category": "Bananas", "value": 25 },
        { "label": "February", "category": "Cherries", "value": 15 },
        { "label": "March",    "category": "Apples", "value": 25 },
        { "label": "March",    "category": "Bananas", "value": 30 },
        { "label": "March",    "category": "Cherries", "value": 20 },
        { "label": "April",    "category": "Apples", "value": 35 },
        { "label": "April",    "category": "Bananas", "value": 20 },
        { "label": "April",    "category": "Cherries", "value": 25 },
        { "label": "May",      "category": "Apples", "value": 40 },
        { "label": "May",      "category": "Bananas", "value": 35 },
        { "label": "May",      "category": "Cherries", "value": 30 },
        { "label": "June",     "category": "Apples", "value": 30 },
        { "label": "June",     "category": "Bananas", "value": 40 },
        { "label": "June",     "category": "Cherries", "value": 20 },
    ], {
        'width': 350,
        'height': 350
    },{},[
        '#4C72B0', '#DD8452', '#55A868'
    ], false, false
  ));
}, 1000);
</script>
