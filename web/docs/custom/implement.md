## Implementing custom charts

Behind the scenes, doodl implements a very lightweight
(TypeScript) API that each chart type must implement. The function
that implements this API has a signature similar to this:

```ts
export async function boxplot(
  div: string,
  data: any,
  size: Size = { width: 300, height: 300 },
  file: DataFile = { path: "", format: "" },
  colors: string[] = ['pastel']
) {
...
}
```

Optional arguments are also provided for, provided that the
above five arguments are declared first.

The `Size` and `DataFile` types are defined as follows:

```ts
interface Size {
  width: number;
  height: number;
}

interface DataFile {
  path: string;
  format: string;
}
```

You can take a look at any of the chart type implementations
in the Github repository for inspiration and examples. The
result of your work should be a Javascript bundle containing
your visualization's implementation - likely a thin wrapper
around whatever function you already have. If you like, you
can call doodl with an implementation that is in a local
file, or, if your module is accessible as CDN, you can give
the URL of the implementation.

### Registering your visualization

The next step is to give provide basic information about
your implementation in a JSON file, like this:

~~~js
{
    "optional": {
        "vertical": false
    },
    "data": {
      "type": "table",
      "columns": [
        "label",
        "value"
      ]
    },
    "tag": "special",
    "function": "special_chart",
    "module_name": "MyChartModule",
    "module_source": "https://somesite.org/some_project/my_chart.js"
}
~~~

The required entries are the tag, data definition, module name and module source.
If the function is not provided, it is assumed to have the same name
as the `tag`. Optional arguments are provided as shown above, with the
name of the argument, and the default value to be provided if none is
given.

### Data

The `data` element is a dictionary (map) with `type` as a required
argument, including:

| Type | Example | Meaning |
| - | - | - |
| `table` | [area chart](/charts/areachart) | Columns in a CSV file, dictionary or Dataframe |
| `hierarchy` | [tree chart](/charts/tree) | Tree-like structure |
| `chords` | [chord chart](/charts/chord) | Nodes and links |
| `matrix` | [contour map](/charts/contour) | Array of numbers |
| `links` | [sankey diagram](/charts/sankey) | Special purpose structure for Sankey diagrams |
| `venn` | [venn diagram](/charts/venn) | Special purpose structure for Venn diagrams |

The `table` data type merits special mention, as it the most commonly
used. The declaration must give the names of the columns in the input
(e.g. `x`, `y`). We do not expect the data to use these columns, so
any chart invocation that takes a table will also take arguments specifying
which columns in the data hold the requested columns, like this:

::: tabs
== Markdown
~~~html
<areachart
  data='[
    { "serial": 1, "pct": 10 }, 
    { "serial": 2, "pct": 20 },
    { "serial": 3, "pct": 15 },
    { "serial": 4, "pct": 25 },
    { "serial": 5, "pct": 30 },
    { "serial": 6, "pct": 35 }
  ]'
  x='serial'
  y='pct'
  width=350
  height=350
>
</areachart>
~~~
== Python
~~~python
import doodl

doodl.areachart(
  data=[
    { "serial": 1, "pct": 10 }, 
    { "serial": 2, "pct": 20 },
    { "serial": 3, "pct": 15 },
    { "serial": 4, "pct": 25 },
    { "serial": 5, "pct": 30 },
    { "serial": 6, "pct": 35 }
  ],
  x='serial',
  y='pct'
  width=350,
  height=350
)
~~~
:::

### Invoking a custom chart

Using your visualization in Markdown is as simple as registering it, like this:

~~~bash
% doodl -c special.json myfile.md
~~~

(`--chart` can be used instead of `-c`) and referencing it:


~~~html
<special
    width=300
    height=600
    path="data/special_data.json"
    colors="deep">
</special>
~~~

See [Invoking doodl](/invoking) for details.

### Invoking from Python

In Python (in a notebook), the situation is comparable. Instead of
a command line argument, you call doodl's `register_chart` function
directly. This function returns a namespace object that you may use
to invoke it, as follows:

~~~python
import doodl

defn = {
    "optional": {
        "vertical": false
    },
    "data": {
      "type": "table",
      "columns": [
        "label",
        "value"
      ]
    },
    "tag": "special",
    "function": "special_chart",
    "module_name": "MyChartModule",
    "module_source": "https://somesite.org/some_project/my_chart.js"
}

data=[
  { "date": "2024-03-01", "close": 100, "upper": 105, "lower": 95, "movingAvg": 100 },
  { "date": "2024-03-02", "close": 102, "upper": 107, "lower": 97, "movingAvg": 101 },
  { "date": "2024-03-03", "close": 104, "upper": 109, "lower": 99, "movingAvg": 102 },
  { "date": "2024-03-04", "close": 101, "upper": 106, "lower": 96, "movingAvg": 100.5 },
  { "date": "2024-03-05", "close": 98, "upper": 103, "lower": 93, "movingAvg": 98.5 },
  { "date": "2024-03-06", "close": 96, "upper": 101, "lower": 91, "movingAvg": 96.5 },
  { "date": "2024-03-07", "close": 99, "upper": 104, "lower": 94, "movingAvg": 98 },
  { "date": "2024-03-08", "close": 103, "upper": 108, "lower": 98, "movingAvg": 101 }
]

ns = doodl.register_chart(source=defn)
ns.special(
  data=data,
  width=500,
  height=500,
  colors='deep'
)
~~~
