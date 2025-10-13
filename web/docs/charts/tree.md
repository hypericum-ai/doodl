## Tree diagram

A tree diagram (or dendrogram) takes the same data format as the [treemap diagram](/charts/treemap),
like this:

::: tabs
== markdown
```html
<tree
    data='{
    "name": "root",
    "children": [
            { "name": "A", "value": 10 },
            { "name": "B", "value": 20 },
            { "name": "C", "children": [
                { "name": "C1", "value": 10 },
                { "name": "C2", "value": 5 },
                { "name": "C3", "value": 15 }
            ]},
            { "name": "D", "value": 40 }
        ]
    }
    '>
</tree>
```
== python
```python
import doodl

doodl.tree(
    data={
        "name": "root",
        "children": [
            { "name": "A", "value": 10 },
            { "name": "B", "value": 20 },
            { "name": "C", "children": [
                { "name": "C1", "value": 10 },
                { "name": "C2", "value": 5 },
                { "name": "C3", "value": 15 }
            ]},
            { "name": "D", "value": 40 }
        ]
    }
)
```
== javascript
```html
<span class="doodl-chart" id="tree_0"></span>

<script>
    Doodl.tree('#tree_0',
        {
            "name": "root",
            "children": [
                { "name": "A", "value": 10 },
                { "name": "B", "value": 20 },
                { "name": "C", "children": [
                    { "name": "C1", "value": 10 },
                    { "name": "C2", "value": 5 },
                    { "name": "C3", "value": 15 }
                ]},
                { "name": "D", "value": 40 }
            ]
        },
        {"width":500,"height":500},
        {},
        [
            '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF',
            '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'
        ],
        false
  );

```
:::

but is rendered differently:

<span class="doodl-chart" id="tree_0"></span>

The tree diagram can be drawn horizontally, as above, or vertically
by setting the optional `vertical` parameter to `true` or `false`.
The default value is `false`. Setting `vertical` to `true` creates
a vertical tree diagram:

<span class="doodl-chart" id="tree_1"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.tree('#tree_0',
    {
        "name": "root",
        "children": [
            { "name": "A", "value": 10 },
            { "name": "B", "value": 20 },
            { "name": "C", "children": [
                { "name": "C1", "value": 10 },
                { "name": "C2", "value": 5 },
                { "name": "C3", "value": 15 }
            ]},
            { "name": "D", "value": 40 }
        ]
    },
    {"width":500,"height":500},
    {},
    [
        '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF',
        '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'
    ],
    false
  );
    Doodl.tree('#tree_1',
    {
        "name": "root",
        "children": [
            { "name": "A", "value": 10 },
            { "name": "B", "value": 20 },
            { "name": "C", "children": [
                { "name": "C1", "value": 10 },
                { "name": "C2", "value": 5 },
                { "name": "C3", "value": 15 }
            ]},
            { "name": "D", "value": 40 }
        ]
    },
    {"width":500,"height":500},
    {},
    [
        '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF',
        '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'
    ],
    true
  );
  }
)
}, 1000);

</script>
