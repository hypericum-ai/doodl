export async function venn(
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

  // Remove existing SVG if present
  d3.select(div).select("svg").remove();

  // Create SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${svgWidth / 2}, ${svgHeight / 2})`);

    hamburgerMenu(div, data);

  // Define a pack layout to determine circle positions
  const pack = d3.pack<DataNode>().size([width, height]).padding(10);

  // Convert data to a hierarchy structure
  const root = d3.hierarchy<DataNode>(data).sum((d: any) => d.size);

  // Apply pack layout to get node positions
  const nodes = pack(root).leaves();

  const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "6px")
    .style("background", "#333")
    .style("color", "#fff")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("display", "none");

  // Draw circles
  svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x - width / 2) // Center circles
    .attr("cy", (d) => d.y - height / 2)
    .attr("r", (d) => d.r)
    .style("fill", (d, i) => colors[i % colors.length])
    .style("opacity", 0.7)
    .style("stroke", colors[0])
    .style("stroke-width", 1.5)
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 1);
      d3.select(this).transition().duration(200).attr("r", (d:any) => d.r * 1.05);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(d.data.name);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      d3.select(this).transition().duration(200).attr("r", (d:any) => d.r);
      tooltip.style("display", "none");
    });

  // Add text labels
  svg
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("x", (d) => d.x - width / 2)
    .attr("y", (d) => d.y - height / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("fill", colors[0])
    .style("font-size", "14px")
    .text((d:any) => d.data.name);
}