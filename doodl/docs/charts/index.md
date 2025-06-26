# Charts

All Doodl charts are inserted into a document using an HTML-style
tag, as you've already seen:

```html
<piechart
    data='[
      {"label": "Apples", "value": 10},
      {"label": "Bananas", "value": 20},
      {"label": "Cherries", "value": 15},
      {"label": "Grapes", "value": 25}
    ]'
>
</piechart>
```

Some things are common to all chart types. Every chart *must* have a
source of data, for example. In this section, we discuss all of these
common features.

## Data

Data can be provided either *inline* as shown above, or from a file.
If you provide the data inline, you must use valid JSON, as shown
above. In the example above, for pie charts, the data is in the
form of a (JSON) list of dictionaries, which have two required
elements. The `label` argument gives the label on a slice of
the pie chart, and the value argument the size of the slice.

Data may always be provided from a file. The file may be in JSON,
comma or tab (or other separator) separated value. To supply data
in a file, there are two steps:

1. Place the file in a location that the output HTML file can find.
2. Supply the name and (optionally) format of the file as arguments.

So the previous example could have been given as follows:

```html
<piechart
    path='data/piechart1.json'
</piechart>
```

where `data/piechart1.json` contains:

```json
[
    {"label": "Apples", "value": 10},
    {"label": "Bananas", "value": 20},
    {"label": "Cherries", "value": 15},
    {"label": "Grapes", "value": 25}
]
```

and the output of `doodl`
<span class="marginnote">
That is the value provided to the `-o` argument on the command line.
</span>
is in the same directory that contains the `data` directory.

Doodl infers the type of the file from the filename, which
must be one of `json`, `csv` or `tsv`. If your data file
uses a different naming convention, you may add a `format`
argument, like this:

```html
<linechart
    path='data/transactions.dat'
    format='csv'
</linechart>
```

## Colors

Doodl uses the [color palettes](https://seaborn.pydata.org/tutorial/color_palettes.html)
in [seaborn](https://seaborn.pydata.org/index.html).
The paletted is set using the `colors` argument to a chart.
Any valid (string) argument to the [`color_palette`](https://seaborn.pydata.org/generated/seaborn.color_palette.html)
function is accepted. The default palette is "pastel".
Two addition (optional) color-related arguments are accepted
by all chart types:

- The `n_colors` argument sets the number of colors in the palette.
- The `desat` argument sets the level of saturation. A value of 0
  fully desaturates the color palette, returning grayscale. A value
  of 1 returns a fully saturated palette.

If you would like to supply your own palette, you can do so by
simply giving the list of colors (in JSON) directly to the `colors`
argument, like this:

```html
<linechart
    path='data/linechart1.json'
    colors='["#FF6700","#004E98"]'
</linechart>
```

## Size

Finally, if you'd like to specify the size of the chart, in
pixels, you can do so with the `size` argument. The value to
`size` must be a JSON dictionary like this:

```html
<linechart
  path='data/linechart1.json'
  size='{"width":600,"height":600}'>
</linechart>

```

In the following pages, you can explore the chart types that are
included in doodl, including the data formats that they accept,
an animations that they provide, and any optional arguments
particular to the chart.
