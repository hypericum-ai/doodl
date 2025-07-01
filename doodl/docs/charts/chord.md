## Chord diagrams

> A chord diagram is a graphical method of displaying the
> inter-relationships between data in a matrix. The data are arranged
> radially around a circle with the relationships between the data
> points typically drawn as arcs connecting the data.
> [Wikipedia](https://en.wikipedia.org/wiki/Chord_diagram_(information_visualization))

D3’s chord layout represents flow using a square matrix of size n×n,
where n is the number of nodes in the graph. Each value
matrix\[i\]\[j\] represents the flow from the ith node to the jth
node. (Each number matrix\[i\]\[j\] must be nonnegative, though it can
be zero if there is no flow from node i to node
j.)[d3-chord](https://d3js.org/d3-chord)

Data is provided to the chord diagra in the form of such a matrix,
like this diagram, which shows the number of people in a survey of
each of four hair colors who dyed their hair to each of the colors.

```html
<chord
  data='[
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ]
  size='{"width": 350, "height": 350}'
    colors='["black", "#ffdd89", "#957244", "#f26223"]'>
</chord>
```

which produces this:

<span  class="chart-container" id="chord_0"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => 
  Doodl.chord(
    '#chord_0',
  [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ], {
      'width': 350,
      'height': 350
    },{},["black", "#ffdd89", "#957244", "#f26223"]
  ));
}, 1000);
</script>
