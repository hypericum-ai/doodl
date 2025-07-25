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

### A Pie chart


<piechart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
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
  continuous_rotation=true
>
</piechart>



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