## Venn diagrams

According to [Wikipedia](https://en.wikipedia.org/wiki/Venn_diagram)

> a Venn diagram, also called a set diagram or logic diagram, shows
> all possible logical relations between a finite collection of
> different sets.  These diagrams depict elements as points in the
> plane, and sets as regions inside closed curves. A Venn diagram
> consists of multiple overlapping closed curves, usually circles,
> each representing a set. The points inside a curve labelled S
> represent elements of the set S, while points outside the boundary
> represent elements not in the set S. This lends itself to intuitive
> visualizations; for example, the set of all elements that are
> members of both sets S and T, denoted S ∩ T and read "the
> intersection of S and T", is represented visually by the area of
> overlap of the regions S and T.

Venn diagrams take all of the [standard parameters](/charts/#standard-parameters).

### Data

The data format is unique to Venn diagrams, in provided as either
a DataFrame, or a native (Python/JSON) list
of dictionaries (maps in Python) with the following elements:

- Either `sets` or `name` to specify the sets
- `size` to specify the size of the set or intersection of sets

In more detail:

<Parameters no_header=true>

<Parameter name='sets' type='List[string]'>

The `sets` element lists the sets whose intersection is represented
by a particular area in the grep, for example `sets: ['A']` represents
the size of set "A" and `sets: ['A', 'B']` the size of the intersection
between sets "A" and "B".

</Parameter>
<Parameter name="name" type="string">

<div>

Alternatively, the sets may be provided as an ampersand-separated
string, like this: `name: 'A&B'`, which is in all ways equivalent to
`sets: ['A', 'B']`. Pandas or other data frames can be used with this
parameter like this:

```python
import doodl
import pandas as pd

df = pd.DataFrame([
    { "name": "A",     "size": 12 }, 
    { "name": "B",     "size": 12 },
    { "name": "C",     "size": 12 },
    { "name": "A&B",   "size":  2 },
    { "name": "A&C",   "size":  3 },
    { "name": "B&C",   "size":  4 },
    { "name": "A&B&C", "size":  1 }
])

doodl.vennchart(data=df)
```

or, if you want to use another column than the standard ones:

```python
import doodl
import pandas as pd

df = pd.DataFrame([
    { 'company': 'A',     'sales':   450_000, 'clients': 163 },
    { 'company': 'B',     'sales': 1_520_000, 'clients': 564 },
    { 'company': 'C',     'sales':   994_000, 'clients': 762 },
    { 'company': 'A&B',   'sales':   226_000, 'clients':  46 },
    { 'company': 'A&C',   'sales':    51_000, 'clients':  12 },
    { 'company': 'B&C',   'sales':    67_000, 'clients':   9 },
    { 'company': 'A&B&C', 'sales':     4_000, 'clients':   4 },
])

doodl.vennchart(
    data=df,
    name='company',
    size='clients'
)
```
</div>

</Parameter>
<Parameter name='size' type='positive number'>

The `size` parameter determines the area of the set or intersection
to which it refers. The numbers will be scaled appropriately and
automatically to be visually reasonable. The size much be greater
than zero.

</Parameter>

</Parameters>

Here's an example of valid data (in Python):

```python
[
    { 'sets': ['A'], 'size': 12 }, 
    { 'sets': ['B'], 'size': 12 },
    { 'sets': ['C'], 'size': 12 },
    { 'sets': ['A','B'], 'size': 2 },    # Intersection of sets A and B
    { 'sets': ['A','C'], 'size': 3 },    # Intersection of sets A and C
    { 'sets': ['B','C'], 'size': 4 },    # Intersection of sets B and C
    { 'sets': ['A','B','C'], 'size': 1 } # Intersection of sets A, B and C
]
```

### Examples

The following:

::: tabs
== Markdown
```html
<vennchart
    data="[
        { 'sets': ['A'], 'size': 12 }, 
        { 'sets': ['B'], 'size': 12 },
        { 'sets': ['C'], 'size': 12 },
        { 'sets': ['A','B'], 'size': 2 },
        { 'sets': ['A','C'], 'size': 3 },
        { 'sets': ['B','C'], 'size': 4 },
        { 'sets': ['A','B','C'], 'size': 1 }
    ]"
    width=500
    height=500
>
</vennchart>
```
== Python
```python
import doodl

doodl.vennchart(
    data=[
        { 'sets': ['A'], 'size': 12 }, 
        { 'sets': ['B'], 'size': 12 },
        { 'sets': ['C'], 'size': 12 },
        { 'sets': ['A','B'], 'size': 2 },    # Intersection of sets A and B
        { 'sets': ['A','C'], 'size': 3 },    # Intersection of sets A and C
        { 'sets': ['B','C'], 'size': 4 },    # Intersection of sets B and C
        { 'sets': ['A','B','C'], 'size': 1 } # Intersection of sets A, B and C
    ],
    width=500,
    height=500
)
```
== Javascript
```html
<span class="doodl-chart" id="vennchart_0"></span>

<script>
Doodl.vennchart(
    '#vennchart_0',
    [
        { 'sets': ['A'], 'size': 12 }, 
        { 'sets': ['B'], 'size': 12 },
        { 'sets': ['C'], 'size': 12 },
        { 'sets': ['A','B'], 'size': 2 },
        { 'sets': ['A','C'], 'size': 3 },
        { 'sets': ['B','C'], 'size': 4 },
        { 'sets': ['A','B','C'], 'size': 1 }
    ], {
        'width': 500,
        'height': 500
    },{},[
        '#4C72B0', '#DD8452', '#55A868'
    ]
)
</script>
```
:::

all produce the following diagram:

<span class="doodl-chart" id="venn_0"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => 
  Doodl.vennchart(
    '#vennchart_0',
    [
        { 'sets': ['A'], 'size': 12 }, 
        { 'sets': ['B'], 'size': 12 },
        { 'sets': ['C'], 'size': 12 },
        { 'sets': ['A','B'], 'size': 2 },
        { 'sets': ['A','C'], 'size': 3 },
        { 'sets': ['B','C'], 'size': 4 },
        { 'sets': ['A','B','C'], 'size': 1 }
    ], {
        'width': 500,
        'height': 500
    },{},[
        '#4C72B0', '#DD8452', '#55A868'
    ]
  ));
}, 1000);
</script>
