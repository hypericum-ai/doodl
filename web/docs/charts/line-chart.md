## Line chart

Along with bar graphs and pie charts, line charts are one of the most
ubiquitous chart types. This:

~~~html
<linechart
data='[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
  ]'
  size='{"width":600,"height":600}'
>
</linechart>
~~~

produces this:

<span class="chart-container" id="linechart_0"></span>

As shown above, the data provided to the line chart is a list of
dictionaries, each of which has a "x" and a "y" entry, with the X and
Y values for a point, respectively. The line can also be rendered as a
cubic spline (i.e. a curve) by adding the optional `curve` parameter:

~~~html
<linechart
data='[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
  ]'
  size='{"width":600,"height":600}'
  curved=true
>
</linechart>
~~~

produces this:

<span class="chart-container" id="linechart_1"></span>

Data can also be provided in a CSV file that has an "x" and a "y"
column.

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.linechart('#linechart_0',
[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
],
   {"width":600,"height":600},
    {},
    ['#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3', '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'],
    false
  );
    Doodl.linechart('#linechart_1',
[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
],
   {"width":600,"height":600},
    {},
    ['#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3', '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD'],
    true
  );
  }
)
}, 1000);

</script>
