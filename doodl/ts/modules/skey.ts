export  async function skey(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[]= defaultArgumentObject.colors,
  link_color = "source-target", //options are 0 or 1
  node_align = "right", //options are left,right,center,justify
) {

  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const nodeWidth = 20;
  const nodePadding = 10;

  // Set up SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

    hamburgerMenu(div, data);

  // Define Sankey generator
  const sankeyGenerator = sankey<any, any>()
    .nodeId(d => d.name)
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .extent([
      [0, 0],
      [width, height],
    ]);

  switch (node_align) {
    case "left":
      sankeyGenerator.nodeAlign(sankeyLeft);
      break;
    case "right":
        sankeyGenerator.nodeAlign(sankeyRight);
        break;
    case "center":
        sankeyGenerator.nodeAlign(sankeyCenter);
        break;
    case "justify":
        sankeyGenerator.nodeAlign(sankeyJustify);
        break;
    default:
      sankeyGenerator.nodeAlign(sankeyLeft);
      break;
  }

  // Process the data
  const graph: SankeyGraph<any, any> = sankeyGenerator(data);

  // Color scale
  const color = d3.scaleOrdinal(
    data.nodes.map((d: any) => d.name),
    colors
  )

  // Draw Links
  const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
    .selectAll()
    .data(graph.links)
    .join("g")
      .style("mix-blend-mode", "multiply");

    let counter = 0;
    function generateUid(prefix = "id") {
        return `${prefix}-${++counter}`;
    }

    // console.log(graph.links)

    if (link_color == "source-target") {
      const gradient = link.append("linearGradient")
      .attr("id", (d: any) => (d.uid = generateUid()))
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", (d: any) => d.source.x1)
          .attr("x2", (d: any) => d.target.x0);
      gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", (d: any) => color(d.source.name));
      gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", (d: any) => color(d.target.name));
    }


    link.append("path")
    .attr("d", sankeyLinkHorizontal())
    .attr("stroke", link_color == "source-target"? (d: any) => `url(#${d.uid})` : (d: any) => color(d.source.name) || "#999")
    .attr("stroke-width", (d: any) => Math.max(1, d.width));

  // Draw Nodes
  const node = svg
    .append("g")
    .selectAll("rect")
    .data(graph.nodes)
    .enter()
    .append("rect")
    .attr("x", (d: any) => d.x0)
    .attr("y", (d: any) => d.y0)
    .attr("height", (d: any) => d.y1 - d.y0)
    .attr("width", sankeyGenerator.nodeWidth())
    .attr("fill", (d: any) => color(d.name))
    .attr("stroke", "#666A6D")
    .attr("stroke-width", 1);

  // Add Node Labels
  node
    .append("title")
    .text((d: any) => `${d.name}\n${d.value}`);

  svg
    .append("g")
    .selectAll("text")
    .data(graph.nodes)
    .enter()
    .append("text")
    .attr("x", (d: any) => d.x0 == 0 ? nodeWidth + 6 : d.x0 - 6)
    .attr("y", (d: any) => (d.y0 + d.y1) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", (d: any) => d.x0 == 0 ? "start" : "end")
    .attr("font-size", "smaller")
    .text((d: any) => d.name)
    .attr("fill", "#000");

  return svg.node();
}