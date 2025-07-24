## Bubble chart

The bubble chart is a means of representing hierarchically related
data, that is, it represents groups of items that themselves may have
other items grouped under them.

The data for a bubble chart is unique, with a single dictionary
representing the outermost circle, and a list of child nodes, like
this:

~~~json
{
  "name": "root",
  "children": [
    {
      "name": "Group A",
      "children": [
        { "name": "Alpha", "value": 50 },
        { "name": "Beta", "value": 30 },
        { "name": "Epsilon", "value": 35 },
        {
          "name": "Subgroup A1",
          "children": [
            { "name": "A1-Node1", "value": 15 },
            { "name": "A1-Node2", "value": 10 }
          ]
        }
      ]
    }
  ]
}
~~~

In addition the chart takes an `ease_in` parameter, with default of
`false` that produces an animation when the chart loads in the
browser, and a `drag_animations` parameter.

Following is a relatively complex bubble chart produced with:

~~~html
<bubblechart
  path="data/bubbles.json"
  format="json"
  size='{"width":500,"height":500}'
  colors='deep'
  ease_in = 1
> </bubblechart>
~~~

where `data/bubbles.json` contains a file similar to the JSON shown
above.

<span class="chart-container" id="bubbles_0"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.bubblechart('#bubbles_0',{
      "name": "root",
      "children": [
        {
          "name": "Group A",
          "children": [
            { "name": "Alpha", "value": 50 },
            { "name": "Beta", "value": 30 },
            { "name": "Gamma", "value": 20 },
            { "name": "Delta", "value": 25 },
            { "name": "Epsilon", "value": 35 },
            {
              "name": "Subgroup A1",
              "children": [
                { "name": "A1-Node1", "value": 15 },
                { "name": "A1-Node2", "value": 10 },
                { "name": "A1-Node3", "value": 12 },
                { "name": "A1-Node4", "value": 8 },
                { "name": "A1-Node5", "value": 14 }
              ]
            }
          ]
        },
        {
          "name": "Group B",
          "children": [
            { "name": "Zeta", "value": 22 },
            { "name": "Eta", "value": 18 },
            { "name": "Theta", "value": 16 },
            {
              "name": "Subgroup B1",
              "children": [
                { "name": "B1-Node1", "value": 11 },
                { "name": "B1-Node2", "value": 9 },
                { "name": "B1-Node3", "value": 7 },
                { "name": "B1-Node4", "value": 6 },
                { "name": "B1-Node5", "value": 13 }
              ]
            },
            {
              "name": "Subgroup B2",
              "children": [
                { "name": "B2-Node1", "value": 17 },
                { "name": "B2-Node2", "value": 12 },
                { "name": "B2-Node3", "value": 10 },
                { "name": "B2-Node4", "value": 5 },
                { "name": "B2-Node5", "value": 8 }
              ]
            }
          ]
        },
        {
          "name": "Group C",
          "children": [
            { "name": "Iota", "value": 14 },
            { "name": "Kappa", "value": 9 },
            {
              "name": "Subgroup C1",
              "children": [
                { "name": "C1-Node1", "value": 6 },
                { "name": "C1-Node2", "value": 4 },
                { "name": "C1-Node3", "value": 10 },
                { "name": "C1-Node4", "value": 5 },
                { "name": "C1-Node5", "value": 7 }
              ]
            },
            {
              "name": "Subgroup C2",
              "children": [
                { "name": "C2-Node1", "value": 8 },
                { "name": "C2-Node2", "value": 9 },
                { "name": "C2-Node3", "value": 6 },
                { "name": "C2-Node4", "value": 5 },
                { "name": "C2-Node5", "value": 4 }
              ]
            }
          ]
        },
        {
          "name": "Group D",
          "children": [
            {
              "name": "Subgroup D1",
              "children": [
                { "name": "D1-Node1", "value": 11 },
                { "name": "D1-Node2", "value": 13 },
                { "name": "D1-Node3", "value": 7 },
                { "name": "D1-Node4", "value": 6 },
                { "name": "D1-Node5", "value": 9 }
              ]
            },
            {
              "name": "Subgroup D2",
              "children": [
                { "name": "D2-Node1", "value": 12 },
                { "name": "D2-Node2", "value": 10 },
                { "name": "D2-Node3", "value": 11 },
                { "name": "D2-Node4", "value": 14 },
                { "name": "D2-Node5", "value": 13 }
              ]
            }
          ]
        }
      ]
    },
    {"width":1000,"height":500},
    {},
    ['#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3', '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'],
    true, true
    )
  }
)}, 1000);
  
</script>





