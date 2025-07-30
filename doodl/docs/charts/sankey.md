## Sankey

A Sankey diagram is a visualization used to represent the flow of
quantities between different sets of values. It's particularly useful
for showing how items are distributed or transferred across multiple
stages or categories. The diagram uses nodes to represent the
different categories and links (arrows) to represent the flow, with
the width of the links proportional to the quantity being transferred.

Here's an example of a Sankey diagram from HTML/Markdown:

```html
<skey
  size='{"width":600,"height":225}'
  path="data/energy.json"
  format="json"
  colors="cc.glasbey"
>
</skey>
```

which produces this:

<span  class="chart-container" id="skey_0"></span>

Several things are worth noting here:

- This example uses data from a file with the `path` and `format`
  arguments instead of a `data` argument, as described in the
  [chart overview](/charts/).
  
- As described in the [color palette](/color) section, we have used a
  color palette from [Colorcet](https://github.com/holoviz/colorcet).

This chart has two optional arguments:

- `link_color` determines whether the links are colored using a
  gradient or a solid color. A value of `target` (the default)
  uses a solid color and a value of `source-target` colors using a
  gradient between the colors of the source and target nodes.

- `node_align` determines how the nodes are placed. The default value
  is `"right"`. Other accepted values include `"left"`, `"center"` and
  `"justify"`.

Here is the same chart as above, but using `source-target` to color
the links:

<span  class="chart-container" id="skey_1"></span>

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
    ['#F67088', '#F77732', '#CE8F31', '#B29B31', '#96A331', '#6BAC31', '#32B165', '#34AE8D', '#35ACA4', '#37AAB7', '#38A7D0', '#5A9EF4', '#A38CF4', '#D673F4', '#F461DD', '#F56AB4'],
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
    "source-target","right");
})}, 1000);
</script>
