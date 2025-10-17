## Chord diagrams

> A chord diagram is a graphical method of displaying the
> inter-relationships between data in a matrix. The data are arranged
> radially around a circle with the relationships between the data
> points typically drawn as arcs connecting the data.
> [Wikipedia](https://en.wikipedia.org/wiki/Chord_diagram_(information_visualization))

Chord diagrams accept the [standard parameter](/charts/#standard-parameters) plus
an optional `labels` argument as described below.

### Data

Data is provided as follows:

- The links ("chords") between groups
- Optionally, the labels of each group
  (If the labels are omitted, the nodes are labeled "Group 1",
  "Group 2" and so on.)

[D3’s chord](https://d3js.org/d3-chord) layout represents flow using a square matrix of size
<i>n</i>×<i>n</i>,
where *n* is the number of nodes in the graph. Each value
matrix<sub>i,j</sub> represents the flow from the i<sup>th</sup> node to the j<sup>th</sup>
node. (Each number matrix<sub>i,j</sub> must be nonnegative, though it can
be zero if there is no flow from node i to node
j.)

Data can be provided either in-line, as per
all other charts, or from a file.


### Examples

The following are all valid and all produce the following chart,
the data for which was derived from a demo dataset on
[Circos](https://circos.ca/guide/tables/):

<span class="doodl-chart" id="chord_0"></span>

- Separate chords and labels, inline:

::: tabs
== Markdown
```html
<chord
  data='[
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ]'
  labels='["black", "blond", "brunette", "redhead"]'
  colors='["black", "#ffdd89", "#957244", "#f26223"]'>
</chord>
```
== Python
```python
import doodl

doodl.chord(
  data=[
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ],
  labels=["black", "blond", "brunette", "redhead"],
  colors=["black", "#ffdd89", "#957244", "#f26223"]
)
</chord>
```
== Javascript
```javascript
<span class='doodl-chart' id='chord_0'></span>
<script>
  Doodl.chord(
    '#chord_0',
    [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
    ], {
      'width': 350,
      'height': 350
    },{},["black", "#ffdd89", "#957244", "#f26223"],
    ["black", "blond", "brunette", "redhead"]
  )
</script>
```
:::

- Or from a file (e.g. `example.json`) that contains:

```json
[
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
]
```

::: tabs
== Markdown
```html
<chord
  path='example.json'
  labels='["black", "blond", "brunette", "redhead"]'
  colors='["black", "#ffdd89", "#957244", "#f26223"]'>
</chord>
```
== Python
```python
import doodl

doodl.chord(
  path='example.json',
  labels=["black", "blond", "brunette", "redhead"],
  colors=["black", "#ffdd89", "#957244", "#f26223"]
)
</chord>
```
== Javascript
```javascript
<span class='doodl-chart' id='chord_0'></span>
<script>
  Doodl.chord(
    '#chord_0', [], {
      'width': 350,
      'height': 350
    },{
      'path': 'example.json',
      'format': 'json'
    },["black", "#ffdd89", "#957244", "#f26223"],
    ["black", "blond", "brunette", "redhead"]
  )
</script>
```
:::

- Single dictionary argument with both chords and labels:

::: tabs
== Markdown
```html
<chord
  data='{
    "chords": [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
    ],
    "labels": [
      "black", "blond", "brunette", "redhead"
    ]
  }'
  colors='["black", "#ffdd89", "#957244", "#f26223"]'>
</chord>
```
== Python
```python
import doodl

doodl.chord(
  data={
    "chords": [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
    ],
    "labels": [
      "black", "blond", "brunette", "redhead"
    ]
  },
  colors=["black", "#ffdd89", "#957244", "#f26223"]
)
== Javascript
```javascript
<span class='doodl-chart' id='chord_0'></span>
<script>
  Doodl.chord(
    '#chord_0',
{
    "chords": [
        [11975,  5871, 8916, 2868],
        [ 1951, 10048, 2060, 6171],
        [ 8010, 16145, 8090, 8045],
        [ 1013,   990,  940, 6907]
      ],
      "labels": [
        "black", "blond", "brunette", "redhead"
      ]
    }, {
      'width': 350,
      'height': 350
    },{},[],
    ["black", "blond", "brunette", "redhead"]
  )
</script>
```
:::

- Single dictionary argument with chords only and labels included separately

::: tabs
== Markdown
```html
<chord
  data='{
    "chords": [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
    ]
  }'
  colors='["black", "#ffdd89", "#957244", "#f26223"]'
  labels='["black", "blond", "brunette", "redhead"]'>
</chord>
```
== Python
```python
import doodl

doodl.chord(
  data={
    "chords": [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
    ]
  },
  labels=["black", "blond", "brunette", "redhead"],
  colors=["black", "#ffdd89", "#957244", "#f26223"]
)
```
== Javascript
```javascript
<span class='doodl-chart' id='chord_0'></span>
<script>
  Doodl.chord(
    '#chord_0',
{
    "chords": [
        [11975,  5871, 8916, 2868],
        [ 1951, 10048, 2060, 6171],
        [ 8010, 16145, 8090, 8045],
        [ 1013,   990,  940, 6907]
      ]
    }, {
      'width': 350,
      'height': 350
    },{},
    ["black", "#ffdd89", "#957244", "#f26223"],
    ["black", "blond", "brunette", "redhead"]
  )
</script>
```
:::

- Data and labels from a DataFrame (Python only)

```python
import doodl
import pandas as pd

df = pd.DataFrame(
  [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
  ],
  columns=[
    "black", "blond", "brunette", "redhead"
  ]
)

doodl.chord(
  data=df,
  colors=["black", "#ffdd89", "#957244", "#f26223"]
)
```

<script>
 setTimeout(() => {
  Promise.resolve().then(() => 
  Doodl.chord(
    '#chord_0',
    [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
    ], {
      'width': 350,
      'height': 350
    },{},["black", "#ffdd89", "#957244", "#f26223"],
    ["black", "blond", "brunette", "redhead"]
  ));
}, 1000);
</script>
