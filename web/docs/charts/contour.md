## Contour plots

Contour plots have several uses:

- *Visualizing 3D data*: A contour plot projects the "height" (z-value) of a 3D surface onto the x-y plane.
- *Constant value lines*: Each line on the plot represents all the points (x, y) that produce the same output value (z).
- *Slope and steepness*: The distance between the contour lines shows how fast the function's value is changing. Lines that are close together represent a steep slope, while lines that are far apart represent a more gradual slope.
- *Color and height*: Colors can be used to indicate different height ranges, with different colors representing higher or lower values, providing another visual cue to the function's behavior. 


<Parameters>

In addition to all of the [standard parameters](/charts/#standard-parameters)
the following apply to contour plots.

<Parameter
    name="data"
    type="List[List[number]], DataFrame, Series"
>

</Parameter>
</Parameters>

### Data

Data is provided to a contour plot as an array of numbers in one
of several formats. In Python, or inline in Markdown, the base format
is a list of lists of numbers, as follows:

::: tabs
== Markdown
~~~html
<contour
    data='[
        [0, 10, 20, 30, 20],
        [10, 20, 30, 40, 30],
        [20, 30, 40, 50, 40],
        [10, 20, 30, 40, 30],
        [0, 10, 20, 30, 20]
    ]'
    width=500
    height=500
    colors='flare'
>
</contour>
~~~
== Python
~~~python
import doodl

data = [
  [0, 10, 20, 30, 20],
  [10, 20, 30, 40, 30],
  [20, 30, 40, 50, 40],
  [10, 20, 30, 40, 30],
  [0, 10, 20, 30, 20]
]

doodl.contour(
    data=data,
    width=500,
    height=500,
    colors='flare'
)
~~~
== Javascript
```html
<span class="doodl-chart" id='contour_0'></span>

<script>
  Doodl.contour(
    '#contour_0',
    [
        [0, 10, 20, 30, 20],
        [10, 20, 30, 40, 30],
        [20, 30, 40, 50, 40],
        [10, 20, 30, 40, 30],
        [0, 10, 20, 30, 20]
    ], {
      'width': 500,
      'height': 500
    },{},
    [
        "#EA9972", "#E88265", "#E36C5D", "#DA555C", "#CB4563",
        "#B73D6A", "#A1376F", "#8B3170", "#752C6E", "#5F2868"
    ]
  )
</script>
```
:::

all of which produce the following:

<span class='doodl-chart' id='contour_0'></span>

In Python any of the following is also accepted, as well as the
equivalents in FireDucks or Polars:

::: tabs
== Numpy array
```python
import doodl
import numpy as np

a = np.array([
    [0, 10, 20, 30, 20],
    [10, 20, 30, 40, 30],
    [20, 30, 40, 50, 40],
    [10, 20, 30, 40, 30],
    [0, 10, 20, 30, 20]
])

doodl.contour(data=a)
```
== Pandas Series
```python
import doodl
import numpy as np
import pandas as pd

s = pd.Series([
    np.array([0, 10, 20, 30, 20]),
    np.array([10, 20, 30, 40, 30]),
    np.array([20, 30, 40, 50, 40]),
    np.array([10, 20, 30, 40, 30]),
    np.array([0, 10, 20, 30, 20])
])

doodl.contour(data=s)
```
== Pandas DataFrame
```python
import doodl
import pandas as pd

df = pd.DataFrame([
    [0, 10, 20, 30, 20],
    [10, 20, 30, 40, 30],
    [20, 30, 40, 50, 40],
    [10, 20, 30, 40, 30],
    [0, 10, 20, 30, 20]
])

doodl.contour(data=df)
```
:::

<script>
 setTimeout(() => {
  Promise.resolve().then(() => 
    Doodl.contour(
        '#contour_0',
        [
            [0, 10, 20, 30, 20],
            [10, 20, 30, 40, 30],
            [20, 30, 40, 50, 40],
            [10, 20, 30, 40, 30],
            [0, 10, 20, 30, 20]
        ], {
        'width': 500,
        'height': 500
        },{},
        [
            "#EA9972", "#E88265", "#E36C5D", "#DA555C", "#CB4563",
            "#B73D6A", "#A1376F", "#8B3170", "#752C6E", "#5F2868"
        ]
    ));
}, 1000);
</script>
