## Implementing custom charts

Behind the scenes, doodl implements a very lightweight
(TypeScript) API that each chart type must implement. The function
that implements this API has a signature similar to this:

```ts
export async function boxplot(
  div: string,
  data: any,
  size: Size = { width: 300, height: 300 },
  file?: DataFile,
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
        "vertical": 0
    },
    "tag": "special",
    "function": "special_chart",
    "module_name": "MyChartModule",
    "module_source": "https://somesite.org/some_profect/chart.js"
}
~~~

The only required entries are the tag, module name and module source.
If the function is not provided, it is assumed to have the same name
as the `tag`. Optional arguments are provided as shown above, with the
name of the argument, and the default value to be provided if none is
given.

Using your visualization is as simple as registering it, like this:<sup>1</sup>
<span class="marginnote">1. See [Invoking doodl](/invoking)</span>

~~~bash
% doodl -c special.json myfile.md
~~~

(`--chart` can be used instead of `-c`) and referencing it in Markdown:

~~~html
<special
    size="{'width': 300, 'height': 600}"
    path="data/special_data.json"
    colors="deep">
</special>
~~~
