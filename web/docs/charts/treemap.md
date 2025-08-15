## Tree map

A tree map displays nested hierarchical categories with their size
represented by the size of a rectangle. The data accepted by
`treemap` looks like this:

```html
<treemap
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
</treemap>
```

and looks like this:

<span class="chart-container" id="treemap_0"></span>

The treemap allows drilling down into deeper levels of a hierarchy
by clicking once to go down a level and once to return to the previous
level.

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.treemap('#treemap_0',
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
  }
)
}, 1000);

</script>
