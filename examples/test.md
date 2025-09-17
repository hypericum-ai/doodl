<skey
  file='{
        "path": "std_focus.json",
        "format": "json"
    }'
    link_color='"target"'
    colors='cc.glasbey'
    size='{"width":1000,"height":500}'>
</skey>




<skey
  size='{"width":600,"height":225}'
  file='{"path": "data/energy.json", "format": "json"}'
  n_colors=10
  colors='pastel'
  link_color='"source-target"'
  node_align='"right"'
>
</skey>



### A Pie chart from data file format


<piechart
  file='{"path":"data/pie.json","format":"json"}'
  width=900
  height=900
  colors='deep'
>
</piechart>



### A Pie chart from data path format


<piechart
  file='{"path":"data/pie.json","format":"json"}'
  width="900"
  height="900"
  colors='deep'
>
</piechart>



### A Pie chart from data path with format


<piechart
  path="data/pie.json"
  format="json"
  size='{"width":500,"height":500}'
  colors='deep'
>
</piechart>






### A Donut chart


<piechart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
  size='{"width":500,"height":500}'
  colors='pastel'
  donut = true
>
</piechart>



### A vertical tree chart

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
    '
    size='{"width":1000,"height":500}'
    colors='deep'
    vertical=true>
</tree>





### A gantt chart


<gantt
  data='[
    { "task": "Planning", "start": "2024-03-01", "end": "2024-03-05" },
    { "task": "Design", "start": "2024-03-06", "end": "2024-03-12" },
    { "task": "Development", "start": "2024-03-13", "end": "2024-03-25" },
    { "task": "Testing", "start": "2024-03-26", "end": "2024-03-30" },
    { "task": "Deployment", "start": "2024-03-31", "end": "2024-04-02" }
  ]'
  size='{"width":1000,"height":500}'
  colors='deep'
>
</gantt>



### A chord diagram 


<chord
data='[
  [0, 5, 10, 2],
  [5, 0, 3, 7],
  [10, 3, 0, 6],
  [2, 7, 6, 0]
]
'
  size='{"width":500,"height":500}'
  colors='deep'
>
</chord>




### A Vertical Bar chart



<barchart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
  size='{"width":500,"height":500}'
  colors='["#FF6700","#008000"]'
  horizontal=true
>
</barchart>




### A Horizontal Bar chart



<barchart
data='[
  { "label": "Apples", "value": 100000000 },
  { "label": "Bananas", "value": 200000000 },
  { "label": "Cherries", "value": 150000000 },
  { "label": "Grapes", "value": 250000000 }
]'
  size='{"width":500,"height":500}'
  colors='["#FF6700","#008000"]'
  horizontal=false
>
</barchart>