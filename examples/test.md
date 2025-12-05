
### A HORIZONTAL grouped_barchart 


<grouped_barchart
  data='[
  { "group": "North", "label": "Q1", "value": 22 },
  { "group": "North", "label": "Q2", "value": 35 },
  { "group": "North", "label": "Q3", "value": 40 },
  { "group": "North", "label": "Q4", "value": 28 },
  { "group": "South", "label": "Q1", "value": 18 },
  { "group": "South", "label": "Q2", "value": 30 },
  { "group": "South", "label": "Q3", "value": 26 },
  { "group": "South", "label": "Q4", "value": 32 },
  { "group": "East", "label": "Q1", "value": 25 },
  { "group": "East", "label": "Q2", "value": 28 },
  { "group": "East", "label": "Q3", "value": 33 },
  { "group": "East", "label": "Q4", "value": 29 },
  { "group": "West", "label": "Q1", "value": 20 },
  { "group": "West", "label": "Q2", "value": 24 },
  { "group": "West", "label": "Q3", "value": 32 },
  { "group": "West", "label": "Q4", "value": 27 }
]'
  width=1200
  height=1000
  colors='deep'
  x_label_angle=90
  show_legend='true'
  horizontal='true'
>
</grouped_barchart>




### A VERTICAL grouped_barchart


<grouped_barchart
  data='[
  { "group": "North", "label": "Q1", "value": 22 },
  { "group": "North", "label": "Q2", "value": 35 },
  { "group": "North", "label": "Q3", "value": 40 },
  { "group": "North", "label": "Q4", "value": 28 },
  { "group": "South", "label": "Q1", "value": 18 },
  { "group": "South", "label": "Q2", "value": 30 },
  { "group": "South", "label": "Q3", "value": 26 },
  { "group": "South", "label": "Q4", "value": 32 },
  { "group": "East", "label": "Q1", "value": 25 },
  { "group": "East", "label": "Q2", "value": 28 },
  { "group": "East", "label": "Q3", "value": 33 },
  { "group": "East", "label": "Q4", "value": 29 },
  { "group": "West", "label": "Q1", "value": 20 },
  { "group": "West", "label": "Q2", "value": 24 },
  { "group": "West", "label": "Q3", "value": 32 },
  { "group": "West", "label": "Q4", "value": 27 }
]'
  width=1200
  height=1000
  colors='deep'
  x_label_angle=90
  show_legend='true'
>
</grouped_barchart>









### A Pie Grid from data file format


<piegrid
  path="data/pie.json"
  width=900
  height=300
  colors='deep'
  show_percentages='true'
  columns=4
  bg_arc_color='#aaa'
  text_color='#0000aa'
>
</piegrid>



### A HORIZONTAL stacked barchart 


<stacked_barchart
  path="data/label_category_value.json"
  width=1200
  height=1000
  colors='deep'
  x_label_angle=90
  show_legend='true'
  horizontal='true'
>
</stacked_barchart>




### A VERTICAL stacked barchart 


<stacked_barchart
  path="data/label_category_value.json"
  width=1200
  height=1000
  colors='deep'
  x_label_angle=90
  show_legend='true'
>
</stacked_barchart>





### A HORIZONTAL stacked areachart 


<stacked_areachart
  path= "data/label_category_value.json"
  width=1200
  height=1000
  colors='deep'
  x_label_angle=90
  show_legend='true'
  horizontal='true'
>
</stacked_areachart>






### A VERTICAL stacked areachart 


<stacked_areachart
  path= "data/label_category_value.json"
  width=1200
  height=1000
  colors='deep'
  x_label_angle=90
  show_legend='true'
>
</stacked_areachart>




### A bollinger band diagram 


<bollinger
path= "data/bollinger_50.json"
  size='{"width":1000,"height":1000}'
  colors='pastel'
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
  x_label_angle=90
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
  x_label_angle=90
>
</barchart>




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
