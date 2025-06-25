export async function minard(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    if (file?.path) {
      data = await loadData(file?.path, file?.format);
    }
    const margin = defaultMargin;
    const width = size.width - margin.left - margin.right;
    const height = size.height - margin.top - margin.bottom;
  
    d3.select(div).select("svg").remove(); // Clear previous
  
    const svg = d3
      .select(div)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

      hamburgerMenu(div, data);
  
    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([height, width]);
    treeLayout(root)
    .nodeSize(d)
    const sizeRatio = height/(2 * root.data.size)
  
    // Links
    svg
      .selectAll("path.link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", (d, i) => colors[i % colors.length])
      .attr("stroke-width", (d) => d.target.data.size * sizeRatio)
      .attr(
        "d",
        d3
          .linkHorizontal<any, any>()
          .x((d: any) => d.y)
          .y((d: any) => d.x)
      );
  
    // Nodes
    const node = svg
      .selectAll("g.node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`);
  
    node
      .append("text")
      .attr("dy", 3)
      .attr("x", (d) => (d.children ? -8 : 8))
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name);
  }
  