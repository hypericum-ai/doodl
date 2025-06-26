# Custom charts

Doodl comes with most, if not all standard charts available
out of the box. It is not uncommon for a particular document to
require, in addition to these chart types, a bespoke special
purpose chart. Consider this gorgeous graphic produced by the
talented Nadieh Bremer for UNESCO.

![Intangible cultural heritage](/images/VisualCinnamon.png)

Such projects have a number of things in common with the chart
types in doodl.

- They're based on [d3](http://d3js.org), which ultimately means
  that there is a Javascript script that does drawing.

- They use a color palette for clarity and visual appeal.

- They are coupled with a file containing some sort of data.

To accommodate such cases, doodl allows custom visualizations
like these to be included in the documents it produces. In the
remainder of this section we show how custom chart types can be
provided to doodl, and how to invoke doodl to use them.
