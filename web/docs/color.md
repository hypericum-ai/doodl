## Color palettes

Color palettes are part of the core arguments to each chart type.
Doodl uses [Seaborn](https://seaborn.pydata.org/tutorial/color_palettes.html)
to specify how to color your charts. Consider, for example, the following
Sankey diagram:

```html
<skey
  size='{"width":600,"height":225}'
  file='{"path":"data/energy.json", "format":"json"}'
>
</skey>
```

which looks like this:

<span  class="chart-container" id="skey_0"></span>

### Seaborn

The default color palette, as above, is the Seaborn `pastel` palette.
This palette has 10 colors, which are used in rotation to color the 16
nodes and links in the chart, e.g. the light blue used for both the
"Solar" and "Residential" nodes. Here are all of the colors in this
palette:

<svg width="550" height="55">
    <rect x="0" y="0" width="55" height="55" style="fill:#a1c9f4;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="55" y="0" width="55" height="55" style="fill:#ffb482;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="110" y="0" width="55" height="55" style="fill:#8de5a1;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="165" y="0" width="55" height="55" style="fill:#ff9f9b;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="220" y="0" width="55" height="55" style="fill:#d0bbff;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="275" y="0" width="55" height="55" style="fill:#debb9b;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="330" y="0" width="55" height="55" style="fill:#fab0e4;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="385" y="0" width="55" height="55" style="fill:#cfcfcf;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="440" y="0" width="55" height="55" style="fill:#fffea3;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="495" y="0" width="55" height="55" style="fill:#b9f2f0;stroke-width:2;stroke:rgb(255,255,255)"></rect>
</svg>

You may use any of the Seaborn discrete palettes in your charts.
Each chart makes use of its color palette in a manner particular
to the chart. It is well worth studying [`color_palette` API documentation](https://seaborn.pydata.org/generated/seaborn.color_palette.html).
One palette of particular interest is `husl`, which returns "a specified number of evenly spaced hues in the *HUSL* system"
like the following palette of nine colors:

<svg width="495" height="55">
    <rect x="0" y="0" width="55" height="55" style="fill:#f77189;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="55" y="0" width="55" height="55" style="fill:#d58c32;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="110" y="0" width="55" height="55" style="fill:#a4a031;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="165" y="0" width="55" height="55" style="fill:#50b131;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="220" y="0" width="55" height="55" style="fill:#34ae91;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="275" y="0" width="55" height="55" style="fill:#37abb5;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="330" y="0" width="55" height="55" style="fill:#3ba3ec;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="385" y="0" width="55" height="55" style="fill:#bb83f4;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="440" y="0" width="55" height="55" style="fill:#f564d4;stroke-width:2;stroke:rgb(255,255,255)"></rect>
</svg>

### Colorcet

From the documentation:

> <p><a class="reference external" href="https://github.com/holoviz/colorcet">Colorcet</a> is a collection of
> perceptually accurate 256-color colormaps for use with Python plotting programs like
> <a class="reference external" href="https://docs.bokeh.org">Bokeh</a>,
> <a class="reference external" href="https://matplotlib.org">Matplotlib</a>,
> <a class="reference external" href="https://holoviews.org">HoloViews</a>, and
> <a class="reference external" href="https://datashader.org">Datashader</a>.</p>

You can use any Colorcet palette using the palette name prefixed by
"`cc.`" in your chart, like this:

```html
<skey ...
  colors="cc.glasbey"
></skey>
```

to use the `glasbey` color palette. Here is the same Sankey diagram as
above, using `"cc.glasbey"` as the `colors` argument:

<span  class="chart-container" id="skey_1"></span>

### Color Brewer

You can also [use categorical Color Brewer palettes](https://seaborn.pydata.org/tutorial/color_palettes.html#using-categorical-color-brewer-palettes),
designed using the [Color Brewer tool](https://colorbrewer2.org/),
in your charts. Here is the Color Brewer `Set2` palette:

<svg width="440" height="55">
    <rect x="0" y="0" width="55" height="55" style="fill:#66c2a5;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="55" y="0" width="55" height="55" style="fill:#fc8d62;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="110" y="0" width="55" height="55" style="fill:#8da0cb;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="165" y="0" width="55" height="55" style="fill:#e78ac3;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="220" y="0" width="55" height="55" style="fill:#a6d854;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="275" y="0" width="55" height="55" style="fill:#ffd92f;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="330" y="0" width="55" height="55" style="fill:#e5c494;stroke-width:2;stroke:rgb(255,255,255)"></rect>
    <rect x="385" y="0" width="55" height="55" style="fill:#b3b3b3;stroke-width:2;stroke:rgb(255,255,255)"></rect>
</svg>

### Manual color palettes

Finally, you can define the color palette yourself and provide it as a list of colors,
using either standard color names (`["DarkOrange"]`) or standard hexadecimal
color notation (`['#A1C9F4', '#FFB482', '#8DE5A1']`) or both.

You can use such a technique with any of a large number of Web
tools to generate a palette from an image, like this palette:

    ["#A82D42", "#66894D", "#B0A669", "#D5C4B4", "#C4B1A3"]

<svg width="275" height="55">
   <rect x="0" y="0" width="55" height="55" style="fill:#A82D42;stroke-width:2;stroke:rgb(255,255,255)"></rect>
   <rect x="55" y="0" width="55" height="55" style="fill:#66894D;stroke-width:2;stroke:rgb(255,255,255)"></rect>
   <rect x="110" y="0" width="55" height="55" style="fill:#B0A669;stroke-width:2;stroke:rgb(255,255,255)"></rect>
   <rect x="165" y="0" width="55" height="55" style="fill:#D5C4B4;stroke-width:2;stroke:rgb(255,255,255)"></rect>
   <rect x="220" y="0" width="55" height="55" style="fill:#C4B1A3;stroke-width:2;stroke:rgb(255,255,255)"></rect>
</svg>

generated from this picture:

![Farming a field](images/100_6253.jpg){width=320}

using the [Coolors app](https://coolors.co/), just to pick an example utility.

## Color maps

While most charts are rendered by *categorical* color maps - i.e. lists
of colors that are used to render particular graphical elements - some
(notably the [`heatmap`](/charts/heatmap)) map a *range* of values to a *range* of colors.
This is called [color interpolation](https://d3js.org/d3-interpolate/color)
and is described in the documentation for the [d3-interpolate](https://d3js.org/d3-interpolate)
module.
The syntax for specifying color maps has a few extra parameters,
compared to color palettes.

| Parameter | Default | Description |
|-|-|-|
| `colors` | None | A list of two colors, for the simplest case |
| `interp` | None | The interpolation method |
| `gamma` | 1.0 |  Governs the transition speed |
| `intensity` | 0.5 | How bright the colors appear |

The following:

```html
<heatmap
  colors='["purple", "orange"]'
  interp="rgb">
  ...
```

produces this color map:

![RGB color map](images/rgb-bar.png)

The set of color interpolators includes:

| Name | Description |
| - | - |
| `rgb` | Transitions between two colors |
| `rgb-basis` | Transitions between any number of colors |
| `rgb-closed` | Transitions between any number of colors, ending at the beginning |
| `hsl` | Two color interpolation in the HSL color space |
| `hsl-long` | Like `hsl` but does not use the shortest path between colors |
| `lab` | [CIELAB color space](https://en.wikipedia.org/wiki/Lab_color_space#CIELAB) interpolator between the two colors |
| `hcl` | [CIELCh<sub>ab</sub> color space](https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh_or_CIEHLC) interpolator between the two colors |
| `hcl-long` | Like `hcl` but does not use the shortest path between colors |
| `cube-helix` | [Cubehelix](https://jiffyclub.github.io/palettable/cubehelix/) color space interpolator between the two colors |
| `cube-helix-long` | Like `cube-helix` but does not use the shortest path between colors |


Given the wealth of possibilities for specifying color maps in
d3, doodl does not extend support to Python-based color maps
like those in Seaborn and matplotlib. We do, however, support
interpolation of *categorical* color maps from Seaborn or elsewhere,
as follows:

```html
<heatmap
  colors="flare"
  interp="rgb-basis"
  ...
```

This is equivalent to giving the list of colors in the `flare`
color palette to the interpolator:


```html
<heatmap
  colors="[
    '#EA9972', '#E88265', '#E36C5D', '#DA555C', '#CB4563',
    '#B73D6A', '#A1376F', '#8B3170', '#752C6E', '#5F2868'
  ]"
  interp="rgb-basis"
  ...
```

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
  Doodl.skey(
    '#skey_0',
    {
        "nodes": [
            { "name": "Solar", "width": 100, "index": 0 },
            { "name": "Wind", "width": 120, "index": 1 },
            { "name": "Hydro", "width": 80, "index": 2 },
            { "name": "Nuclear", "width": 90, "index": 3 },
            { "name": "Coal", "width": 200, "index": 4 },
            { "name": "Natural gas", "width": 210, "index": 5 },
            { "name": "Oil", "width": 250, "index": 6 },
            { "name": "Electricity", "width": 720, "index": 7 },
            { "name": "Heat", "width": 80, "index": 8 },
            { "name": "Fuel", "width": 250, "index": 9 },
            { "name": "Residential", "width": 210, "index": 10 },
            { "name": "Commercial", "width": 180, "index": 11 },
            { "name": "Industrial", "width": 280, "index": 12 },
            { "name": "Transportation", "width": 200, "index": 13 },
            { "name": "Energy services", "width": 710, "index": 14 },
            { "name": "Losses", "width": 160, "index": 15 }
        ],
        "links": [
            { "source": "Solar", "target": "Electricity", "value": 100 },
            { "source": "Wind", "target": "Electricity", "value": 120 },
            { "source": "Hydro", "target": "Electricity", "value": 80 },
            { "source": "Nuclear", "target": "Electricity", "value": 90 },
            { "source": "Coal", "target": "Electricity", "value": 200 },
            { "source": "Natural gas", "target": "Electricity", "value": 130 },
            { "source": "Natural gas", "target": "Heat", "value": 80 },
            { "source": "Oil", "target": "Fuel", "value": 250 },
            { "source": "Electricity", "target": "Residential", "value": 170 },
            { "source": "Electricity", "target": "Commercial", "value": 160 },
            { "source": "Electricity", "target": "Industrial", "value": 230 },
            { "source": "Heat", "target": "Residential", "value": 40 },
            { "source": "Heat", "target": "Commercial", "value": 20 },
            { "source": "Heat", "target": "Industrial", "value": 20 },
            { "source": "Fuel", "target": "Industrial", "value": 50 },
            { "source": "Fuel", "target": "Transportation", "value": 200 },
            { "source": "Residential", "target": "Energy services", "value": 180 },
            { "source": "Residential", "target": "Losses", "value": 30 },
            { "source": "Residential", "target": "Energy services", "value": 150 },
            { "source": "Commercial", "target": "Losses", "value": 30 },
            { "source": "Industrial", "target": "Energy services", "value": 230 },
            { "source": "Industrial", "target": "Losses", "value": 50 },
            { "source": "Transportation", "target": "Energy services", "value": 150 },
            { "source": "Transportation", "target": "Losses", "value": 50 }
        ]
    },
    {
      'width': 600,
      'height': 225
    },{},
    ['#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF', '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0', '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF', '#DEBB9B'],
    "target","right");
  Doodl.skey(
    '#skey_1',
    {
        "nodes": [
            { "name": "Solar", "width": 100, "index": 0 },
            { "name": "Wind", "width": 120, "index": 1 },
            { "name": "Hydro", "width": 80, "index": 2 },
            { "name": "Nuclear", "width": 90, "index": 3 },
            { "name": "Coal", "width": 200, "index": 4 },
            { "name": "Natural gas", "width": 210, "index": 5 },
            { "name": "Oil", "width": 250, "index": 6 },
            { "name": "Electricity", "width": 720, "index": 7 },
            { "name": "Heat", "width": 80, "index": 8 },
            { "name": "Fuel", "width": 250, "index": 9 },
            { "name": "Residential", "width": 210, "index": 10 },
            { "name": "Commercial", "width": 180, "index": 11 },
            { "name": "Industrial", "width": 280, "index": 12 },
            { "name": "Transportation", "width": 200, "index": 13 },
            { "name": "Energy services", "width": 710, "index": 14 },
            { "name": "Losses", "width": 160, "index": 15 }
        ],
        "links": [
            { "source": "Solar", "target": "Electricity", "value": 100 },
            { "source": "Wind", "target": "Electricity", "value": 120 },
            { "source": "Hydro", "target": "Electricity", "value": 80 },
            { "source": "Nuclear", "target": "Electricity", "value": 90 },
            { "source": "Coal", "target": "Electricity", "value": 200 },
            { "source": "Natural gas", "target": "Electricity", "value": 130 },
            { "source": "Natural gas", "target": "Heat", "value": 80 },
            { "source": "Oil", "target": "Fuel", "value": 250 },
            { "source": "Electricity", "target": "Residential", "value": 170 },
            { "source": "Electricity", "target": "Commercial", "value": 160 },
            { "source": "Electricity", "target": "Industrial", "value": 230 },
            { "source": "Heat", "target": "Residential", "value": 40 },
            { "source": "Heat", "target": "Commercial", "value": 20 },
            { "source": "Heat", "target": "Industrial", "value": 20 },
            { "source": "Fuel", "target": "Industrial", "value": 50 },
            { "source": "Fuel", "target": "Transportation", "value": 200 },
            { "source": "Residential", "target": "Energy services", "value": 180 },
            { "source": "Residential", "target": "Losses", "value": 30 },
            { "source": "Residential", "target": "Energy services", "value": 150 },
            { "source": "Commercial", "target": "Losses", "value": 30 },
            { "source": "Industrial", "target": "Energy services", "value": 230 },
            { "source": "Industrial", "target": "Losses", "value": 50 },
            { "source": "Transportation", "target": "Energy services", "value": 150 },
            { "source": "Transportation", "target": "Losses", "value": 50 }
        ]
    },
    {
      'width': 600,
      'height': 225
    },{},
    ['#F67088', '#F77732', '#CE8F31', '#B29B31', '#96A331', '#6BAC31', '#32B165', '#34AE8D', '#35ACA4', '#37AAB7', '#38A7D0', '#5A9EF4', '#A38CF4', '#D673F4', '#F461DD', '#F56AB4'],
    "target","right");
  });
 }, 1000)
</script>
