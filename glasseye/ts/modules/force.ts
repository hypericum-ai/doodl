export async function force(
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
  const viewScaleFactor = 1.5;

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width/viewScaleFactor, height/viewScaleFactor])
    .attr("style", "max-width: 100%; height: auto;");

    hamburgerMenu(div, data);

  const simulation = d3
    .forceSimulation<Node>(data.nodes)
    .force("link", d3.forceLink<Node, Link>(data.links).id((d:any) => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6);

  const node = svg
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", (d:any, i) => colors[d.group % colors.length])
    .call(
      d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  simulation.on("tick", () => {
    link
      .attr("x1", (d:any) => (d.source as Node).x!)
      .attr("y1", (d:any) => (d.source as Node).y!)
      .attr("x2", (d:any) => (d.target as Node).x!)
      .attr("y2", (d:any) => (d.target as Node).y!);

    node.attr("cx", (d:any) => d.x!).attr("cy", (d:any) => d.y!);
  });
}