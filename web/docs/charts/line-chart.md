## Line chart

Along with bar graphs and pie charts, line charts are one of the most
ubiquitous chart types.

<Parameters>

In addition to all of the
[standard parameters](/charts/#standard-parameters)
the following apply to line charts.

  <Parameter name="data" type="JSON/Python dict/various">
<div>

Line charts take their data from a variety of formats, including:

- A list of dictionaries, each of which has an `x` and a `y`
  element.
- A file containing a JSON representation of such a list.
- A file containing CSV with two numerical columns.
- A Pandas, Fireducks, pyarrow or polars DataFrame, with two
  columns holding the `x` and `y` values.

</div>
  </Parameter>
  <Parameter name="curve" type="Boolean">

If true, a cubic spline is plotted to give a smooth(ed) version
of the curve connecting the given points. `curved` defaults to `false`.

  </Parameter>
</Parameters>

### Examples

This:

::: tabs
== markdown
~~~html
<linechart
  data='[
    { "x": 1, "y": 10 }, 
    { "x": 2, "y": 20 },
    { "x": 3, "y": 15 },
    { "x": 4, "y": 25 },
    { "x": 5, "y": 30 },
    { "x": 6, "y": 35 }
  ]'
  width=600
  height=600
>
</linechart>
~~~
== python
~~~python
import doodl

doodl.linechart(
  data=[
    { "x": 1, "y": 10 }, 
    { "x": 2, "y": 20 },
    { "x": 3, "y": 15 },
    { "x": 4, "y": 25 },
    { "x": 5, "y": 30 },
    { "x": 6, "y": 35 }
  ],
  width=600,
  height=600
)
~~~
== javascript
~~~html
<span class="doodl-chart" id="linechart_0"></span>

<script>
  Doodl.linechart('#linechart_0',
    [
      { "x": 1, "y": 10 }, 
      { "x": 2, "y": 20 },
      { "x": 3, "y": 15 },
      { "x": 4, "y": 25 },
      { "x": 5, "y": 30 },
      { "x": 6, "y": 35 }
    ],
    {"width":600,"height":600},
    {},
    [
      '#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3',
      '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'
    ],
    false
  );
</script>
~~~
:::

produces this:

<span class="doodl-chart" id="linechart_0"></span>

As shown above, the data provided to the line chart is a list of
dictionaries, each of which has a "x" and a "y" entry, with the X and
Y values for a point, respectively. The line can also be rendered as a
cubic spline (i.e. a curve) by adding the optional `curve` parameter:

::: tabs
== markdown
~~~html
<linechart
data='[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
  ]'
  width=600
  height=600
  curved=true
>
</linechart>
~~~
== python
~~~python
import doodl

doodl.linechart(
  data=[
    { "x": 1, "y": 10 }, 
    { "x": 2, "y": 20 },
    { "x": 3, "y": 15 },
    { "x": 4, "y": 25 },
    { "x": 5, "y": 30 },
    { "x": 6, "y": 35 }
  ],
  width=600,
  height=600,
  curved=true
)
~~~
== javascript
```html
<span class="doodl-chart" id="linechart_1"></span>

<script>
  Doodl.linechart('#linechart_1',
    [
      { "x": 1, "y": 10 }, 
      { "x": 2, "y": 20 },
      { "x": 3, "y": 15 },
      { "x": 4, "y": 25 },
      { "x": 5, "y": 30 },
      { "x": 6, "y": 35 }
    ],
    {"width":600,"height":600},
    {},
    [
      '#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3',
      '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'
    ],
    true
  );
```
:::

produces this:

<span class="doodl-chart" id="linechart_1"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.linechart('#linechart_0',
[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
],
   {"width":600,"height":600},
    {},
    ['#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3', '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'],
    false
  );
    Doodl.linechart('#linechart_1',
[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
],
   {"width":600,"height":600},
    {},
    ['#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3', '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'],
    true
  );
  }
)
}, 1000);

</script>
