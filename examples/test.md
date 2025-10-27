### A bollinger band diagram 


<bollinger
data='[
  { "date": "2024-03-01", "close": 100, "upper": 105, "lower": 95, "movingAvg": 100 },
  { "date": "2024-03-02", "close": 102, "upper": 107, "lower": 97, "movingAvg": 101 },
  { "date": "2024-03-03", "close": 104, "upper": 109, "lower": 99, "movingAvg": 102 },
  { "date": "2024-03-04", "close": 101, "upper": 106, "lower": 96, "movingAvg": 100.5 },
  { "date": "2024-03-05", "close": 98, "upper": 103, "lower": 93, "movingAvg": 98.5 },
  { "date": "2024-03-06", "close": 96, "upper": 101, "lower": 91, "movingAvg": 96.5 },
  { "date": "2024-03-07", "close": 99, "upper": 104, "lower": 94, "movingAvg": 98 },
  { "date": "2024-03-08", "close": 103, "upper": 108, "lower": 98, "movingAvg": 101 }
]'
  size='{"width":500,"height":500}'
  colors='deep'
>
</bollinger>




### An curved areachart 


<areachart
data='[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
  ]'
  width=500
  height=500
  colors='deep'
  curved='true'
>
</areachart>




### An non-curved areachart 


<areachart
data='[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
  ]'
  width=500
  height=500
  colors='deep'
>
</areachart>

### A venn diagram 


<vennchart
data='
  [ 
  {"sets": ["A"], "size": 10}, 
    {"sets": ["B"], "size": 15},
    {"sets": ["C"], "size": 20},
    {"sets": ["A","B"], "size": 5}
    {"sets": ["A","C"], "size": 3}
    {"sets": ["B","C"], "size": 4}
    {"sets": ["A","B","C"], "size": 2}
  ]
'
  size='{"width":500,"height":500}'
  colors='deep'
>
</vennchart>




### A Vertical Bar chart



<barchart
  data='[
    { "label": "Apples", "value": 10 },
    { "label": "Bananas", "value": 20 },
    { "label": "Cherries", "value": 15 },
    { "label": "Grapes", "value": 25 }
  ]'
  width=500
  height=500
  colors='["#FF6700","#008000"]'
  horizontal='true'
  moving_average='true'
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
  width=500
  height=500
  colors='["#FF6700","#008000"]'
  horizontal='false'
  moving_average='true'
>
</barchart>




### A stacked barchart 


<stacked_barchart
data='[
  { "label": "January",  "Apples": 30, "Bananas": 20, "Cherries": 10 },
  { "label": "February", "Apples": 20, "Bananas": 25, "Cherries": 15 },
  { "label": "March",    "Apples": 25, "Bananas": 30, "Cherries": 20 },
  { "label": "April",    "Apples": 35, "Bananas": 20, "Cherries": 25 },
  { "label": "May",      "Apples": 40, "Bananas": 35, "Cherries": 30 },
  { "label": "June",     "Apples": 30, "Bananas": 40, "Cherries": 20 },
]'
  width=500
  height=500
  colors='deep'
>
</stacked_barchart>





### A stacked areachart 


<stacked_areachart
data='[
  { "label": 2018, "Technology": 30, "Finance": 20, "Healthcare": 15 },
  { "label": 2019, "Technology": 40, "Finance": 25, "Healthcare": 20 },
  { "label": 2020, "Technology": 35, "Finance": 30, "Healthcare": 25 },
  { "label": 2021, "Technology": 50, "Finance": 35, "Healthcare": 30 },
  { "label": 2022, "Technology": 60, "Finance": 40, "Healthcare": 35 },
  { "label": 2023, "Technology": 55, "Finance": 45, "Healthcare": 40 },
]'
  width=500
  height=500
  colors='deep'
>
</stacked_areachart>




### A dotplot chart 


<dotplot
data='[
    { "category": "A", "value": 10 },
    { "category": "A", "value": 12 },
    { "category": "A", "value": 16 },
    { "category": "B", "value": 20 },
    { "category": "B", "value": 24 },
    { "category": "B", "value": 28 },
    { "category": "C", "value": 12 },
    { "category": "C", "value": 15 },
    { "category": "C", "value": 21 }
]'
     width=500
  height=500
  colors='deep'
>
</dotplot>




### A scatterplot chart 


<scatterplot
data='[
     { "x": 10, "y": 20 },
  { "x": 30, "y": 40 },
  { "x": 50, "y": 60 }
]'
     width=500
  height=500
  dotsize=8
>
</scatterplot>

<scatterplot
data='[
     { "x": 10, "y": 20 },
  { "x": 30, "y": 40 },
  { "x": 50, "y": 60 }
]'
    width=500
  height=500
>
</scatterplot>



### A boxplot chart 


<boxplot
data='[
   { "category": "A", "value": 10 },
  { "category": "A", "value": 15 },
  { "category": "A", "value": 20 },
  { "category": "B", "value": 30 },
  { "category": "B", "value": 35 },
  { "category": "B", "value": 40 }
]'
     width=500
  height=500
  colors='deep'
>
</boxplot>



### A Contour diagramn


<contour
data='[
  [0, 10, 20, 30, 20],
  [10, 20, 30, 40, 30],
  [20, 30, 40, 50, 40],
  [10, 20, 30, 40, 30],
  [0, 10, 20, 30, 20]
]'
   width=500
  height=500
  colors='flare'
>
</contour>





<skey
 path= "data/std_focus.json"
    link_color='"target"'
    colors='cc.glasbey'
    width=1000
  height=500>
</skey>



<skey
  width=600
  height=225
  path= "data/energy.json"
  n_colors=10
  colors='pastel'
  link_color='"source-target"'
  node_align='"right"'
>
</skey>



### A Pie chart from data file format


<piechart
  path="data/pie.json"
  width=900
  height=900
  colors='deep'
>
</piechart>



### A Pie chart from data path format


<piechart
  path="data/pie.json"
  width="900"
  height="900"
  colors='deep'
>
</piechart>



### A Pie chart from data path with format


<piechart
  path="data/pie.json"
  format="json"
  width=500
  height=500
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
  width=500
  height=500
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
    width=1000
  height=500
    colors='deep'
    vertical=True>
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
  width=1000
  height=500
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
  width=500
  height=500
  colors='deep'
>
</chord>




<bubblechart
  path="data/flare.json"
  width=900
  height=900
  colors='deep'
  ease_in=1
  drag_animations=1
>
</bubblechart>
