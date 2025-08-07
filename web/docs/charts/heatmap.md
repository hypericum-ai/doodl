# Heatmap

A heatmap is a data visualization technique that uses color to
represent the magnitude of values in a matrix or spatial area. It
helps people quickly understand patterns, trends, and outliers in
complex data sets.

Here's an example of a heatmap:


```html
<heatmap
data='[
  { "x": "A", "y": "1", "value": 5 },
  { "x": "A", "y": "2", "value": 10 },
  { "x": "B", "y": "1", "value": 15 },
  { "x": "B", "y": "2", "value": 20 }
]'
  size='{"width"=500,"height"=500}'
  colors='["purple", "orange"]'
  interp="rgb">
>
</heatmap>
~~~

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
    size={'width': 500, 'height': 500},
    colors=['purple', 'orange'],
    interp='rgb'
)
```

both of which are rendered like this:

<span id='heatmap_0'></span>

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
