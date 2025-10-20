function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Volcano contours</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Volcano contours

Showing the topography of [Maungawhau](https://en.wikipedia.org/wiki/Maungawhau) with [d3-contour](https://d3js.org/d3-contour).`
)}

function _chart(data,d3)
{
  const n = data.width;
  const m = data.height;
  const width = 928;
  const height = Math.round(m / n * width);
  const path = d3.geoPath().projection(d3.geoIdentity().scale(width / n));
  const contours = d3.contours().size([n, m]);
  const color = d3.scaleSequential(d3.interpolateTurbo).domain(d3.extent(data.values)).nice();

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
      .attr("stroke", "black")
    .selectAll()
    .data(color.ticks(20))
    .join("path")
      .attr("d", d => path(contours.contour(data.values, d)))
      .attr("fill", color);

  return svg.node();
}


function _data(FileAttachment){return(
FileAttachment("volcano.json").json()
)}

function _4(md){return(
md`Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a contour plot with the [contour mark](https://observablehq.com/plot/marks/contour), here using the **fill** channel to encode elevation as color.`
)}

function _5(Plot,data){return(
Plot.plot({
  color: {
    legend: true,
    label: "Elevation (m)"
  },
  marks: [
    Plot.contour(data.values, {
      width: data.width,
      height: data.height,
      fill: Plot.identity,
      stroke: "black"
    })
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["volcano.json", {url: new URL("./files/923ed37945bbd1d7d9a2be8ef0dd59238d6ea7fdff3bf8802007a8b705e38c38a09e6572a4bf546adbad6e69bfae180801cb9a2899b6c334b7f6de1baac533a3.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["data","d3"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Plot","data"], _5);
  return main;
}
