import "venn.js";
declare const venn: any;

export async function vennchart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {

  console.log("Venn data:", data);
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
    .attr("transform", `translate(${margin.left || 0}, ${margin.top || 0})`);

  hamburgerMenu(div, data);

  // Convert your hierarchical data to venn.js set format
  // const sets = data.children.map((d: any) => ({
  //   sets: [d.name],
  //   size: d.size
  // }));

  // Create Venn layout
  const chart = venn.VennDiagram().width(width).height(height);
  svg.datum(data).call(chart);

  // Color circles
  svg
    .selectAll("path")
    .style("fill", (d, i) => colors[i % colors.length])
    .style("fill-opacity", 0.6)
    .style("stroke", colors[0])
    .style("stroke-width", 1.5);

  // Tooltip
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

  svg
    .selectAll("g")
    .on("mouseover", function (event, d: any) {
      venn.sortAreas(svg, d);
      d3.select(this).select("path").transition().duration(200).style("fill-opacity", 0.9);
      tooltip
        .style("display", "block")
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY}px`)
        .text(d.sets.join(" ∩ "));
    })
    .on("mouseout", function () {
      d3.select(this).select("path").transition().duration(200).style("fill-opacity", 0.6);
      tooltip.style("display", "none");
    });
}