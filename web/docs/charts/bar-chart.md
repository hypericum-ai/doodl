## Bar chart

Bar charts are drawn using the `barchart` tag, like this:

```html
<barchart
    data='[
        { "label": "Apples", "value": 10 },
        { "label": "Bananas", "value": 20 },
        { "label": "Cherries", "value": 15 },
        { "label": "Grapes", "value": 25 }
    ]'
    size='{"width":500,"height":350}'
    colors='["DarkOrange"]'
>
</barchart>
```

or this in Python:
```python
import doodl

doodl.barchart(
    data=[
        { "label": "Apples", "value": 10 },
        { "label": "Bananas", "value": 20 },
        { "label": "Cherries", "value": 15 },
        { "label": "Grapes", "value": 25 }
    ],
    size={"width":500,"height":350}
    colors=["DarkOrange"]
)
```

which is rendered like this:

<span class="chart-container" id='barchart_0'></span>

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
