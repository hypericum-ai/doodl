## Bar chart

In addition to all of the [standard parameters](/charts/intro#standard-parameters)
the following apply to bar charts.

<Parameters>
    <Parameter
        name="data"
        type="List[dict], DataFrame, Series"
    >
<div>

Contains inline data to use for the chart. In Markdown,
the value must be a JSON string representing a list of
dictionaries, as shown in the example below.  Each
dictionary must contain a `label` element, with the
label for the respective bar, and a `value` element,
representing the height of the bar (which will be
scaled appropriately).

In Python, `data` may be any of:

- A Python list of dictionaries, as above
- A Pandas, FireDucks, Polars or pyarrow DataFrame with
    a `label` and `value` column.
- A Series whose index supplies the labels and entries supply the value.

</div>
  </Parameter>
  <Parameter name="horizontal" type="Boolean">

If true, the bars are drawn horizontally instead of vertically.
Defaults to False.

  </Parameter>
  <Parameter name="moving_average" type="Boolean">

If true, a moving average curve is added to the graph. Default is False.

  </Parameter>
  <Parameter name="x_label_angle" type="Number (degrees)">

Specifies the number of degrees clockwise that the X axis
labels should be turned. This is to handle long labels.
The default value is 0 (no rotation).

  </Parameter>
</Parameters>

### Examples

Bar charts are drawn using the `barchart` tag, like this:

:::tabs
== markdown
```html
<barchart
  data='[
        { "label": "Apples", "value": 10 },
        { "label": "Bananas", "value": 20 },
        { "label": "Cherries", "value": 15 },
        { "label": "Grapes", "value": 25 }
    ]'
  width="500"
  height="350"
  colors='["DarkOrange"]'
>
</barchart>
```
== python
```python
import doodl

doodl.barchart(
    data=[
        { "label": "Apples", "value": 10 },
        { "label": "Bananas", "value": 20 },
        { "label": "Cherries", "value": 15 },
        { "label": "Grapes", "value": 25 }
    ],
    width=500
    height=350
    colors=["DarkOrange"]
)
```
== javascript
```html
<span class="doodl-chart" id='barchart_0'></span>

<script>
  Doodl.barchart(
    '#barchart_0',
    [
      {'label': 'Apples', 'value': 10},
      {'label': 'Bananas', 'value': 20},
      {'label': 'Cherries', 'value': 15},
      {'label': 'Grapes', 'value': 25}
    ], {
      'width': 500,
      'height': 350
    },{},["DarkOrange"]
  )
</script>
```
:::

which is rendered like this:

<span class="doodl-chart" id='barchart_0'></span>

The data is provided as a JSON string containing a list of
dictionaries, each of which has a `label` and `value` entry.
The label value is used for a label for the bar, and is also
the content of the tooltip that pops up when you hover over
the bar.

<script>
 setTimeout(() => {
  Promise.resolve().then(() => 
  Doodl.barchart(
    '#barchart_0',
    [
      {'label': 'Apples', 'value': 10},
      {'label': 'Bananas', 'value': 20},
      {'label': 'Cherries', 'value': 15},
      {'label': 'Grapes', 'value': 25}
    ], {
      'width': 500,
      'height': 350
    },{},["DarkOrange"]
  ));
}, 1000);
</script>
