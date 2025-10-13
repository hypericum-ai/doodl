## Chord diagrams

> A chord diagram is a graphical method of displaying the
> inter-relationships between data in a matrix. The data are arranged
> radially around a circle with the relationships between the data
> points typically drawn as arcs connecting the data.
> [Wikipedia](https://en.wikipedia.org/wiki/Chord_diagram_(information_visualization))

<Parameters>

Chord diagrams accept the [standard parameter](/charts/#standard-parameters)
with `data` defined as follows:

  <Parameter name='data' type='Matrix'>
<div>

[D3’s chord](https://d3js.org/d3-chord) layout represents flow using a square matrix of size n×n,
where n is the number of nodes in the graph. Each value
matrix<sub>i,j</sub> represents the flow from the i<sup>th</sup> node to the j<sup>th</sup>
node. (Each number matrix<sub>i,j</sub> must be nonnegative, though it can
be zero if there is no flow from node i to node
j.)

Data is provided to the chord diagram in the form of such a matrix,
like the example below, which shows the number of people in a survey of
each of four hair colors who dyed their hair to each of the colors.

</div>
</Parameter>
</Parameters>

### Example

Following is an example replicating the documented chord diagram in
D3.

::: tabs
== markdown
```html
<chord
  data='[
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ]'
  width=350
  height=350
  colors='["black", "#ffdd89", "#957244", "#f26223"]'>
</chord>
```
== python
```python
import doodl

doodl.chord(
  data=[
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ],
  width=350,
  height=350,
  colors=["black", "#ffdd89", "#957244", "#f26223"]
)
```
== javascript
```javascript
<span class="doodl-chart" id="chord_0"></span>

<script>
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
  )
</script>
```
:::

which produces this:

<span class="doodl-chart" id="chord_0"></span>

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
