## Voronoi diagrams

> A Voronoi diagram is a partition of a plane into regions close to each of a given set of objects. It can be classified also as a tessellation.
> [Wikipedia](https://en.wikipedia.org/wiki/Voronoi_diagram)

As a visualization method, Voronoi diagrams serve a similar role as
[Kohonen maps](https://en.wikipedia.org/wiki/Self-organizing_map).
Both are used to visualize and partition data based on proximity
or similarity.

Following is an example of the data format required by Voronoi
diagrams:

```html
<voronoi
data='[
  { "x": 100, "y": 200, "name": "A" },
  { "x": 150, "y": 80, "name": "B" },
  { "x": 300, "y": 150, "name": "C" },
  { "x": 400, "y": 300, "name": "D" },
  { "x": 250, "y": 400, "name": "E" },
  { "x": 500, "y": 200, "name": "F" },
  { "x": 350, "y": 100, "name": "G" },
  { "x": 180, "y": 320, "name": "H" },
  { "x": 90, "y": 450, "name": "I" },
  { "x": 600, "y": 350, "name": "J" }
]'
  size='{"width":850,"height":500}'
  colors='flare'
>
</voronoi>
```

which is rendered as follows:

<span class="chart-container" id="voronoi_0"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.voronoi('#voronoi_0',[
  { "x": 100, "y": 200, "name": "A" },
  { "x": 150, "y": 80, "name": "B" },
  { "x": 300, "y": 150, "name": "C" },
  { "x": 400, "y": 300, "name": "D" },
  { "x": 250, "y": 400, "name": "E" },
  { "x": 500, "y": 200, "name": "F" },
  { "x": 350, "y": 100, "name": "G" },
  { "x": 180, "y": 320, "name": "H" },
  { "x": 90, "y": 450, "name": "I" },
  { "x": 600, "y": 350, "name": "J" }
],{"width":850,"height":500},{},['#EA9972', '#E88265', '#E36C5D', '#DA555C', '#CB4563', '#B73D6A', '#A1376F', '#8B3170', '#752C6E', '#5F2868']);
          }
)
}, 1000);

</script>
