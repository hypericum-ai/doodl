# Heatmap

A heatmap is a data visualization technique that uses color to
represent the magnitude of values in a matrix or spatial area. It
helps people quickly understand patterns, trends, and outliers in
complex data sets.

<Parameters>

In addition to the [standard parameters](/charts/#standard-parameters)
heatmaps take the following parameters:

<Parameter name="data" type="list of dicts">
<div>

A heatmap takes data in the form of a list of dictionaries,
each of which has an `x`, `y`, and `value` element, like the
following example:

~~~python
[
  { "x": "A", "y": "1", "value": 5 },
  { "x": "A", "y": "2", "value": 10 },
  { "x": "B", "y": "1", "value": 15 },
  { "x": "B", "y": "2", "value": 20 }
]
~~~

We plan to enable the use of CSV files and various data frames
in the near future.

</div>
</Parameter>
<Parameter name="show_legend" type="Boolean">

The `show_legend` parameter, if set to `true`, will render a legend
explaining the color palette.

</Parameter>

### Color parameters

<Parameter name="interp" type="String">

One of the interpolators [as listed](/color#color-maps). Defaults to
`"rgb"`. This parameter sets the mapping between values and colors.

</Parameter>
  <Parameter name="gamma" type="Number (0.0 to 1.0)">

Controls how fast the interpolator transitions between colors.

  </Parameter>
</Parameters>

## Example

Here's an example of a heatmap:


```html
<heatmap
data='[
  { "x": "A", "y": "1", "value": 5 },
  { "x": "A", "y": "2", "value": 10 },
  { "x": "B", "y": "1", "value": 15 },
  { "x": "B", "y": "2", "value": 20 }
]'
  width=500
  height=500
  colors='["purple", "orange"]'
  interp="rgb">
>
</heatmap>
```

or, in Python:

```python
import doodl

doodl.heatmap(
    data=[
        { 'x': 'A', 'y': '1', 'value': 5 },
        { 'x': 'A', 'y': '2', 'value': 10 },
        { 'x': 'B', 'y': '1', 'value': 15 },
        { 'x': 'B', 'y': '2', 'value': 20 }
    ],
    width=500
    height=500
    colors=['purple', 'orange'],
    interp='rgb'
)
```

both of which are rendered like this:

<span class="chart-container" id='heatmap_0'></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.heatmap('#heatmap_0',[
        { "x": "A", "y": "1", "value": 5 },
        { "x": "A", "y": "2", "value": 10 },
        { "x": "B", "y": "1", "value": 15 },
        { "x": "B", "y": "2", "value": 20 }
    ],{"width":500,"height":500},{},['purple', 'orange'], 0, "rgb",0);
})}, 1000)
</script>
