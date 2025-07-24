## Dot plot

[Investopedia](https://www.investopedia.com/dot-plot-4581755) says

> A dot plot is a simple form of data visualization that consists of
> data points plotted as dots on a graph with an x- and y-axis. These
> types of charts are used to graphically depict certain data trends
> or groupings.

The data required for a dot plot consists of a (JSON) list of
dictionaries, each one of which includes a `category` and a `value`.
Here is an example of a dot plot in HTML/Markdown:

~~~html
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
  size='{"width":1000,"height":500}'
  colors='deep'
  ncolors=3
>
</dotplot>
~~~

which produces this:

<span  class="chart-container" id="dotplot_0"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
   Doodl.dotplot('#dotplot_0',[
    { "category": "A", "value": 10 },
    { "category": "A", "value": 12 },
    { "category": "A", "value": 16 },
    { "category": "B", "value": 20 },
    { "category": "B", "value": 24 },
    { "category": "B", "value": 28 },
    { "category": "C", "value": 12 },
    { "category": "C", "value": 15 },
    { "category": "C", "value": 21 }
],{"width":1000,"height":500},{},['#4C72B0', '#DD8452', '#55A868']
   )
  });
}, 1000);
</script>
