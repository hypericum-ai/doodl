## Scatterplot

> A scatterplot is a graphical representation that displays the
> relationship between two quantitative variables. It uses dots to
> represent individual data points, where each dot's position is
> determined by the values of the two variables, one on the horizontal
> (x) axis and the other on the vertical (y) axis.
([Fiveable](https://library.fiveable.me/key-terms/ap-stats/scatterplot))

A scatterplot takes the same data as a line graph, like this:

```html
<scatterplot
  data='[
    { "x": 1, "y": 10 }, 
    { "x": 2, "y": 20 },
    { "x": 3, "y": 15 },
    { "x": 4, "y": 25 },
    { "x": 5, "y": 30 },
    { "x": 6, "y": 35 }
  ]'
  size='{"width":250,"height":250}'
  colors='["darkblue"]'
>
</scatterplot>
```

or, in Python:

```python
import doodl
data = [
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
]
doodl.scatterplot(
    data,
    size={'width': 250, 'height': 250},
    colors=['darkblue']
)
```

which produce this:

<span class="chart-container" id="scatterplot_0"></span>

The optional `dotsize` parameter, which defaults to 5, determines the
size of the dots, as this example with a dotsize of 3 shows.

<span class="chart-container" id="scatterplot_1"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.scatterplot('#scatterplot_0',
[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
],
   {"width":250,"height":250},
    {},
    ['darkblue'],
    false,
    5
  );
    Doodl.scatterplot('#scatterplot_1',
[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
],
   {"width":250,"height":250},
    {},
    ['darkblue'],
    false,
    3
  );
  }
)
}, 1000);

</script>

