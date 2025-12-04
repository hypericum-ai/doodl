## Pie grid

As the name suggests, a pie grid is a grid of small single-value
pie charts. Here is a simple example:

<span class="doodl-chart" id="piegrid_0"></span>

<Parameters>

In addition to all of the [standard parameters](/charts/intro#standard-parameters)
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
<Parameter
    name="label"
    type="string"
>
</Parameter>
<Parameter
    name="value"
    type="string"
>
<div>

If you would like to use different columns instead of the standard
"label" and "value" columns, you may specify one or both using the
`label` and/or `value` parameters like this:

::: tabs
== markdown
~~~html
<piegrid
data='[
  { "category": "Apples", "value": 10 },
  { "category": "Bananas", "value": 20 },
  { "category": "Cherries", "value": 15 },
  { "category": "Grapes", "value": 25 }
]'
  width=500
  height=150
  colors='deep'
  label='category'
>
</piegrid>
~~~
== python
~~~python
import doodl

doodl.piegrid(
  data=[
    { "category": "Apples", "value": 10 },
    { "category": "Bananas", "value": 20 },
    { "category": "Cherries", "value": 15 },
    { "category": "Grapes", "value": 25 }
  ],
  width=500,
  height=150,
  colors='deep',
  label='category'
)
~~~
:::

</div>
</Parameter>
  <Parameter name="columns" type="integer">

Specifies the number of pie charts per row. The default is 3.

  </Parameter>
  <Parameter name="show_percentages" type="Boolean" default_value="false">

If true, the percentage that the value is of the sum of the values
is added to the chart.

  </Parameter>
  <Parameter name="bg_arc_color" type="string" default_value="#2b2b2f">
  </Parameter>
  <Parameter name="text_color" type="string" default_value="#aaa">
  </Parameter>
  <Parameter name="percent_color" type="string" default_value="#eb0707ff">
  </Parameter>
  <Parameter name="total_color" type="string" default_value="#aaa">
<div>

The colors of the chart elements may be specified using these four
optional parameters. The meanings of each parameter are as follows:

| Param | Default | Component |
| - | - | - |
| `bg_arc_color` | #2b2b2f | The portion of the circle *not* representing the value |
| `text_color` | #aaa | The color of the label text |
| `percent_color` | #eb0707 | If `show_percent` is `true`, the color of its text |
| `total_color` | #aaa | The color of the value text |

</div> 
  </Parameter>

</Parameters>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.piegrid(
      '#piegrid_0',
      [
        { "label": "Apples", "value": 10 },
        { "label": "Bananas", "value": 20 },
        { "label": "Cherries", "value": 15 },
        { "label": "Grapes", "value": 25 }
      ],
      {"width":500,"height":150},
      {},[
          '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF',
          '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'
      ], true, 4
    );
    Doodl.piegrid(
      '#piegrid_1',
      [
        { "label": "Apples", "value": 10 },
        { "label": "Bananas", "value": 20 },
        { "label": "Cherries", "value": 15 },
        { "label": "Grapes", "value": 25 }
      ],
      {"width":500,"height":150},
      {},[
          '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF',
          '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'
      ], true, true
    )
  });
}, 1000);
</script>

