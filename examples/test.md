

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




<areachart
data='[
  { "date": "2024-01-01", "catA": 10, "catB": 20, "catC": 30 },
  { "date": "2024-01-02", "catA": 15, "catB": 25, "catC": 35 },
  { "date": "2024-01-03", "catA": 20, "catB": 22, "catC": 28 },
  { "date": "2024-01-04", "catA": 18, "catB": 30, "catC": 25 },
  { "date": "2024-01-05", "catA": 22, "catB": 28, "catC": 32 },
  { "date": "2024-01-06", "catA": 19, "catB": 26, "catC": 29 },
  { "date": "2024-01-07", "catA": 24, "catB": 30, "catC": 35 },
  { "date": "2024-01-08", "catA": 28, "catB": 33, "catC": 40 }
]'
  width=500
  height=500
  colors='flare'
>
</areachart>

<areachart
data='[
  { "date": 2018, "Technology": 30, "Finance": 20, "Healthcare": 15 },
  { "date": 2019, "Technology": 40, "Finance": 25, "Healthcare": 20 },
  { "date": 2020, "Technology": 35, "Finance": 30, "Healthcare": 25 },
  { "date": 2021, "Technology": 50, "Finance": 35, "Healthcare": 30 },
  { "date": 2022, "Technology": 60, "Finance": 40, "Healthcare": 35 },
  { "date": 2023, "Technology": 55, "Finance": 45, "Healthcare": 40 },
]'
  width=500
  height=500
  colors='deep'
>
</areachart>

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
