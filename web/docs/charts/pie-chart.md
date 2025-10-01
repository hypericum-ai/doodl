## Pie chart

The venerable pie chart uses slices of a circle (the "pie") to
indicate how much of the whole each of a set of values represents.

<Parameters>

In addition to all of the [standard parameters](/charts/#standard-parameters)
the following apply to pie charts.

    <Parameter
        name="data"
        type="List[dict], DataFrame, Series"
    >
<div>

Contains inline data to use for the chart. In Markdown,
the value must be a JSON string representing a list of
dictionaries, as shown in the example below.  Each
dictionary must contain a `label` element, with the
label for the respective slice, and a `value` element,
representing the extent of the slice (which will be
scaled appropriately).

In Python, `data` may be any of:

- A Python list of dictionaries, as above
- A Pandas, FireDucks, Polars or pyarrow DataFrame with
    a `label` and `value` column.
- A Series whose index supplies the labels and entries supply the value.

</div>
  </Parameter>
  <Parameter name="donut" type="Boolean">

If `true`, the center of the pie chart will be removed, causing the
chart to resemble a donut.

  </Parameter>
  <Parameter name="continuous_rotation" type="Boolean">

If `true`, the chart will be continuously rotated around its center.

  </Parameter>
  <Parameter name="show_percentages" type="Boolean">

If true, the percentage of the total occupied by each slice will
be added to the label inside the slice.

  </Parameter>
</Parameters>

### Examples

Here is a simple example in HTML/Markdown:

~~~html
<piechart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
  width=500
  height=500
  colors='deep'
>
~~~

which renders like this:

<span class="chart-container" id="piechart_0"></span>

Here is an example with `donut` and `continuous_rotation`
set to `true`:

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
