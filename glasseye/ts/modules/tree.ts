export async function tree(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  vertical = 0
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
    .attr("transform", `translate(${margin?.left || 0}, ${margin?.top || 0})`);

    hamburgerMenu(div, data);

  // Create hierarchical data structure
  const root = d3.hierarchy(data);

  // Create a tree layout
  const layoutSize : [number, number] = vertical ? [width, height - 100] : [height,  width- 100] ;
  const treeLayout = d3.tree().size(layoutSize);
  treeLayout(root);

  // Define a link generator (curved lines)
  const linkGenerator = vertical
    ?
     d3
    .linkVertical()
    .x((d:any) => (d as d3.HierarchyPointNode<any>).x)
    .y((d:any) => (d as d3.HierarchyPointNode<any>).y)
    :
    d3
    .linkHorizontal()
    .x((d:any) => (d as d3.HierarchyPointNode<any>).y)
    .y((d:any) => (d as d3.HierarchyPointNode<any>).x)
    ;

  // Draw links (lines between nodes)
  svg
    .selectAll("path.link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", (d:any) => linkGenerator(d)!)
    .style("fill", "none")
    .style("stroke",colors[0])
    .style("stroke-width", 2)
    .on("mouseover", function (event, d) {
      
      d3.select(this).transition().duration(200).attr("stroke-width", 1).style("fill", colors[colors.length-1]);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("stroke-width", 2).style("fill", "none");
    })
    ;

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

  let children_store:any[] = [];
  const node_radius = 6;

  // Draw nodes (circles)
  const nodes = svg
    .selectAll("g.node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${vertical? d.x: d.y},${vertical ? d.y: d.x})`)
    .on("mouseover", function (event, d) {
      
      d3.select(this).select("circle").transition().duration(200).attr("r", node_radius * 2).style("fill", colors[colors.length-1]);

     
      tooltip
        .style("display", "block")
        .style("left", `${event.pageX + node_radius * 3}px`)
        .style("top", `${event.pageY - node_radius * 4}px`)
        .text(d.data.name);
    })
    .on("mouseout", function () {
      d3.select(this).select("circle").transition().duration(200).attr("r", node_radius).style("fill", (_, i) => colors[i % colors.length]);

      tooltip.style("display", "none");
    })
    .on("click", function (event, d) {
      console.log("Clicked node:", d.data);

      // 🌟 Expand/Collapse nodes on click
      if (d.children) {
        children_store = d.children;
        d.children = undefined;
      } else {
        d.children = children_store;
        children_store = [];
      }

      // Redraw tree with updated structure
      tree(div, data, size, file, colors, vertical);
    });

  nodes
    .append("circle")
    .attr("r", node_radius)
    .style("fill", (d, i) => colors[i % colors.length])
    .style("stroke", colors[0])
    .style("stroke-width", 1.5);

  // Add text labels
  nodes
    .append("text")
    .attr("dy", -10) // Position text slightly above nodes
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("fill", colors[0])
    .text((d) => d.data.name);
}