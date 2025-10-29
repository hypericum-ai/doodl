## Introduction to charts

In Markdown, all doodl charts are inserted into a document using an HTML-style
tag, as you've already seen:

```html
<piechart
    data='[
      {"label": "Apples", "value": 10},
      {"label": "Bananas", "value": 20},
      {"label": "Cherries", "value": 15},
      {"label": "Grapes", "value": 25}
    ]'
    width=500
    height=500
    colors='deep'
>
</piechart>
```

From a Jupyter notebook, it is similar:

```python
import doodl

doodl.piechart(data=[
    {"label": "Apples", "value": 10},
    {"label": "Bananas", "value": 20},
    {"label": "Cherries", "value": 15},
    {"label": "Grapes", "value": 25}
  ],
  width=500,
  height=500,
  colors='deep'
)
```

## Standard parameters

Some things are common to all chart types. These include data, size
and colors. In this section, we discuss all of these
common features.

### Parameters for providing data

<Parameters no_header=true>
    <Parameter
        name="data"
    >
<div>

Data can be provided either *inline* as shown above, or from a file.
The `data` parameter is used to provide data inline. For Markdown,
the data is provided as a *string* which must be valid JSON. If
you are using doodl from Python, the data argument should be valid
Python, as the example shows.

Nota bene: The data is defined *per chart*. Although some charts use
the same sort of data as others, you should check the description of
what is required in the documentation for the chart that you're using.

</div>
</Parameter>
<Parameter name="path" type="String">
<div>

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
</div>
</Parameter>
<Parameter name="format" type="`json`, `csv` or `tsv`">
<div>

Doodl infers the type of the file from the filename's suffix, which
must be one of `json`, `csv` or `tsv`. If your data file
uses a different naming convention, you may add a `format`
argument, like this:

```html
<linechart
    path='data/transactions.dat'
    format='csv'
</linechart>
```

to specify the format of the file indicated in the `path` argument.

</div>
</Parameter>
</Parameters>

### Colors

Color palettes in doodl are discussed in depth in
[their own section](/color). Here we'll discuss the
arguments that are used for specifying colors
in charts.

<Parameters no_header=true>
  <Parameter name="colors" type="String or List[String]">
<div>

The primary parameter for settings colors in a chart.
There are four main use cases (all discussed in more depth
[elsewhere](/color)).

1. The name of a Seaborn or Color Brewer color palette (`colors="deep"`).
2. The name of a Colorcet color palette (`colors="cc.glasbey"`).
3. A list of colors, either named or using HTML hex colors
    (`colors='["#A82D42", "#66894D", "#B0A669", "#D5C4B4", "#C4B1A3"]'`)
4. The name of a color map for continuous color palettes (like heatmap charts).

</div>
</Parameter>
</Parameters>

#### Parameters for discrete color palettes

<Parameters no_header=true>
  <Parameter name="n_colors" type="Integer">

The `n_colors` argument sets the number of colors in the palette.
If the palette itself contains fewer colors than requested, the
colors are repeated in order. By default, each chart chooses a
number of colors that suits the data.

  </Parameter>
  <Parameter name="desat" type="Number">

The `desat` argument sets the level of saturation. A value of 0
fully desaturates the color palette, returning grayscale. A value
of 1 (the default) returns a fully saturated palette.

  </Parameter>
</Parameters>

#### Parameters for continuous color palettes

The section on [color maps](/color#color-maps) contains detailed
documentation on how to specify colors palettes that map a range
of values to a range of colors.

<Parameters no_header=true>
  <Parameter name="interp" type="String">

One of the interpolation names described in the
[color maps documentation](/color#color-maps). Required.

  </Parameter>
  <Parameter name="gamma" type="Number (0.0 to 1.0)">

Controls how fast the interpolator transitions between colors.

  </Parameter>
  <Parameter name="intensity" type="Number (0.0 to 1.0)">

Controls how bright the colors appear. Defaults to 0.5.

  </Parameter>
</Parameters>

### Size

Finally, if you'd like to specify the size of the chart, in
pixels, you can do so with the `width` and `height` arguments.
Both default to 500 pixels.

```html
<linechart
  path='data/linechart1.json'
  width=600
  height=600
</linechart>

```

<Parameters no_header=true>
  <Parameter name="width" type="String or number">

Controls how wide the chart is. Default value is 500. Note that some
charts look better with non-symmetric width and height, depending on
the data.

  </Parameter>
  <Parameter name="height" type="String or number">

Controls the chart's height. Default value is 500.

  </Parameter>
</Parameters>

In the following pages, you can explore the chart types that are
included in doodl, including the data formats that they accept,
any animations that they provide, and any optional arguments
particular to the chart.
