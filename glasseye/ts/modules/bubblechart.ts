interface BubbleNode {
  name?: string;
  value?: number;
  children?: BubbleNode[];
}

export async function bubblechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  ease_in = 0,
  drag_animations = 0
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  // Clear existing content
  d3.select(div).selectAll("*").remove();

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .attr("viewBox", `0 0 ${size.width} ${size.height}`)
    .style("font-family", "sans-serif");

    hamburgerMenu(div, data);

  const colorScale = d3.scaleOrdinal<string>().range(colors);

  const format = d3.format(",d");

  const pack = d3.pack<BubbleNode>().size([size.width, size.height]).padding(5);

  let nodes: HierarchyCircularNode<BubbleNode>[] = [];
  const isNested = !Array.isArray(data);

  if (isNested) {
    const root = d3
      .hierarchy<BubbleNode>(data)
      .sum((d) => d.value || 0)
      .sort((a, b) => b.value! - a.value!);

    nodes = pack(root).descendants();

    const node = svg
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);



    if (ease_in > 0) {
      node
      .append("circle")
      .attr("fill", (d, i) => colorScale(i.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
        .attr("r", 0)
        .transition()
        .duration(800)
        .ease(d3.easeBounceOut)
        .attr("r", (d) => d.r);
    } else {
      node
      .append("circle")
      .attr("fill", (d, i) => colorScale(i.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1).attr("r", (d) => d.r);
    }


    if (ease_in > 0) {
      node
      .append("text")
      .text((d) => d.data.name || "")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#fff")
      .style(
        "font-size",
        (d) => `${Math.min((2 * d.r) / (d.data.name?.length || 1), 12)}px`
      ).style("opacity", 0).transition().delay(4000).style("opacity", 1);
    } else {
      node
      .append("text")
      .text((d) => d.data.name || "")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#fff")
      .style(
        "font-size",
        (d) => `${Math.min((2 * d.r) / (d.data.name?.length || 1), 12)}px`
      ).style("opacity", 1);
    }
  } else {
    const root = pack(
      d3.hierarchy<BubbleNode>({ children: data }).sum((d) => d.value || 0)
    );

    const node = svg
      .append("g")
      .selectAll()
      .data(root.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    const simulation = d3
      .forceSimulation(root.leaves())
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(size.width / 2, size.height / 2))
      .force(
        "collision",
        d3.forceCollide((d: any) => d.r + 2)
      )
      .on("tick", () => {
        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
      });

    node.append("title").text((d) => `${d.data.name}\n${format(d.value || 0)}`);

    // Add a filled circle.
    

    if (ease_in > 0) {
      node
      .append("circle")
      .attr("fill", (d) =>
        colorScale(d.parent?.data.name || d.data.name?.split(".")[1] || "")
      )
        .attr("fill-opacity", 0)
        .attr("r", 0)
        .transition()
        .duration(4000)
        .ease(d3.easeBounceOut)
        .attr("fill-opacity", 0.7)
        .attr("r", (d) => d.r);
    } else {
      node
      .append("circle")
      .attr("fill", (d) =>
        colorScale(d.parent?.data.name || d.data.name?.split(".")[1] || "")
      )
      .attr("fill-opacity", 0.7).attr("r", (d) => d.r);
    }


    if (ease_in > 0) {
      node
      .append("text")
      .text((d) => d.data.name || "")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#fff")
      .style(
        "font-size",
        (d) => `${Math.min((2 * d.r) / (d.data.name?.length || 1), 12)}px`
      ).style("opacity", 0).transition().delay(4000).style("opacity", 1);
    } else {
      node
      .append("text")
      .text((d) => d.data.name || "")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#fff")
      .style(
        "font-size",
        (d) => `${Math.min((2 * d.r) / (d.data.name?.length || 1), 12)}px`
      ).style("opacity", 1);
    }

    const drag = d3
      .drag<any, any>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        console.log("start drag", d);
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
        console.log("drag", d, event);
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        console.log("end drag", d);
      });
    if (drag_animations > 0) {
      node.call(drag);
    }
  }
}
