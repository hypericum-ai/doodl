export async function treemap(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);
 // Remove previous SVG if exists
 d3.select(div).select("svg").remove();

 // Create hierarchical data structure
 const root = d3.hierarchy(data).sum((d: any) => d.value);

 // Apply the treemap layout BEFORE accessing `leaves()`
 const treemapRoot = d3.treemap<any>().size([width, height]).padding(2)(root);

 // Now leaves() returns `HierarchyRectangularNode<T>`, which has `x0, y0, x1, y1`
 const leaves = treemapRoot.leaves();

 // Define color scale
 const colorScale = d3.scaleOrdinal<string>().domain(leaves.map(d => d.data.name)).range(colors);

 // Create SVG
 const svg = d3
   .select(div)
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight)
   .append("g")
   .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

   hamburgerMenu(div, data);

 // Add rectangles
 svg
   .selectAll("rect")
   .data(leaves)
   .enter()
   .append("rect")
   .attr("x", (d) => d.x0)
   .attr("y", (d) => d.y0)
   .attr("width", (d) => d.x1 - d.x0)
   .attr("height", (d) => d.y1 - d.y0)
   .style("fill", (d) => colorScale(d.data.name))
   .style("stroke", "#FFFFFF")
   .on("mouseover", function (event, d:any) {
    d3.select(this).transition().duration(200).style("opacity", 0.7);
  })
  .on("mouseout", function () {
    d3.select(this).transition().duration(200).style("opacity", 1);
  });

 // Add labels
 svg
   .selectAll("text")
   .data(leaves)
   .enter()
   .append("text")
   .attr("x", (d) => d.x0 + (d.x1 - d.x0) / 2) // Center horizontally
   .attr("y", (d) => d.y0 + (d.y1 - d.y0) / 2) // Center vertically
   .attr("text-anchor", "middle") // Align text in the center
   .attr("dominant-baseline", "middle") // Align text vertically
   .attr("font-size", "16px")
   .attr("fill", "#FFFFFF")
   .text((d) => d.data.name);
}
