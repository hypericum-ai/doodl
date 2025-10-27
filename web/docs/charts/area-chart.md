## Area chart

The area chart is similar to a [line chart](/charts/line-chart),
but in addition to a line connecting (*x*, *y*) values, the area
between the line and the *x* axis (beneath the line for non-negative
*y* and above the line for negative *y*) is colored. The area chart
does a good job of portraying the area covered by the data.

<span class="doodl-chart" id="areachart_1"></span>

<Parameters>

In addition to the [standard parameters](/charts/#standard-parameters)
the following apply to area charts.

<Parameter name="data" type="List[dict], DataFrame">

<div>
Area charts take their data from a variety of formats, including:

- A list of dictionaries, each of which has an `x` and a `y`
  element.
- A file containing a JSON representation of such a list.
- A file containing CSV with two numerical columns.
- A Pandas, Fireducks, pyarrow or polars DataFrame, with two
  columns holding the `x` and `y` values.

In addition, for data frames (or CSV files) of various types, you
may also specify which columns in your data hold the *x* and *y*
values:

~~~python
import doodl
import pandas as pd

df = pd.DataFrame({
    "score": [86, 74, 95, 62],
    "age": [14, 15, 17, 27]
})

doodl.area_chart(
    data=df,
    x=age,
    y=score
)
~~~

</div>

</Parameter>

</Parameters>

### Examples

This:

::: tabs
== markdown
~~~html
<areachart
  data='[
    { "x": 1, "y": 10 }, 
    { "x": 2, "y": 20 },
    { "x": 3, "y": 15 },
    { "x": 4, "y": 25 },
    { "x": 5, "y": 30 },
    { "x": 6, "y": 35 }
  ]'
  width=350
  height=350
>
</areachart>
~~~
== python
~~~python
import doodl

doodl.areachart(
  data=[
    { "x": 1, "y": 10 }, 
    { "x": 2, "y": 20 },
    { "x": 3, "y": 15 },
    { "x": 4, "y": 25 },
    { "x": 5, "y": 30 },
    { "x": 6, "y": 35 }
  ],
  width=350,
  height=350
)
~~~
== javascript
~~~html
<span class="doodl-chart" id="areachart_0"></span>

<script>
  Doodl.areachart('#areachart_0',
    [
      { "x": 1, "y": 10 }, 
      { "x": 2, "y": 20 },
      { "x": 3, "y": 15 },
      { "x": 4, "y": 25 },
      { "x": 5, "y": 30 },
      { "x": 6, "y": 35 }
    ],
    {"width":350,"height":350},
    {},
    [
      '#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3',
      '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'
    ]
  );
</script>
~~~
:::

produces this:

<span class="doodl-chart" id="areachart_0"></span>

as do the following:

::: tabs
== markdown
~~~html
<areachart
  data='[
    { "id": 1, "score": 10 }, 
    { "id": 2, "score": 20 },
    { "id": 3, "score": 15 },
    { "id": 4, "score": 25 },
    { "id": 5, "score": 30 },
    { "id": 6, "score": 35 }
  ]'
  width=350
  height=350
  x="id"
  y="score"
>
</areachart>
~~~
== python
~~~python
import doodl

doodl.areachart(
  data=[
    { "id": 1, "score": 10 }, 
    { "id": 2, "score": 20 },
    { "id": 3, "score": 15 },
    { "id": 4, "score": 25 },
    { "id": 5, "score": 30 },
    { "id": 6, "score": 35 }
  ],
  width=350,
  height=350,
  x="id",
  y="score"
)
~~~
:::

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.areachart('#areachart_0',
      [
        { "x": 1, "y": 10 }, 
        { "x": 2, "y": 20 },
        { "x": 3, "y": 15 },
        { "x": 4, "y": 25 },
        { "x": 5, "y": 30 },
        { "x": 6, "y": 35 }
      ],
      {"width":350,"height":350},
      {},
      [
        '#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3',
        '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'
      ]
    );

    Doodl.areachart('#areachart_1',
      [
        {'x': 1, 'y': 36},
        {'x': 2, 'y': 25},
        {'x': 3, 'y': 23},
        {'x': 4, 'y': 22},
        {'x': 5, 'y': 28},
        {'x': 6, 'y': 12},
        {'x': 7, 'y': 7},
        {'x': 8, 'y': 6},
        {'x': 9, 'y': 9},
        {'x': 10, 'y': 2},
        {'x': 11, 'y': 4},
        {'x': 12, 'y': 0},
        {'x': 13, 'y': 0},
        {'x': 14, 'y': 1},
        {'x': 15, 'y': 1},
        {'x': 16, 'y': 1},
        {'x': 17, 'y': 0},
        {'x': 18, 'y': 1},
        {'x': 19, 'y': 0},
        {'x': 20, 'y': 0},
        {'x': 21, 'y': 0},
        {'x': 22, 'y': 0},
        {'x': 23, 'y': 0},
        {'x': 24, 'y': 0},
        {'x': 25, 'y': 0},
        {'x': 26, 'y': 0},
        {'x': 27, 'y': 0},
        {'x': 28, 'y': 0},
        {'x': 29, 'y': 0},
        {'x': 30, 'y': 1},
        {'x': 31, 'y': 0},
        {'x': 32, 'y': 0},
        {'x': 33, 'y': 0},
        {'x': 34, 'y': 0},
        {'x': 35, 'y': 0},
        {'x': 36, 'y': 0},
        {'x': 37, 'y': 0},
        {'x': 38, 'y': 0},
        {'x': 39, 'y': 0},
        {'x': 40, 'y': 0}
      ],
      {"width":350,"height":350},
      {},
      [
        '#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3',
        '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'
      ]
    );
  })
}, 1000);
</script>