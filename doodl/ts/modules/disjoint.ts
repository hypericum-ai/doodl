// Adapted from https://observablehq.com/@d3/disjoint-force-directed-graph/2

export async function disjoint(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
    if (file?.path) {
        data = await loadData(file?.path, file?.format);
    }

    // Specify the dimensions of the chart.
    const { width, height } = size;
    const viewScaleFactor = 1.5;

    // Specify the color scale.
    const color = d3.scaleOrdinal(colors);

    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink<Node, Link>(data.links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    // Create the SVG container.
    const svg = d3
        .select(div)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / viewScaleFactor, -height / viewScaleFactor, width, height])
        .attr("style", "max-width: 100%; height: auto;");

        hamburgerMenu(div, data);

    // Add a line for each link, and a circle for each node.
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(data.links)
        .join("line")
        .attr("stroke-width", (d: any) => Math.sqrt(d.value));

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(data.nodes)
        .join("circle")
        .attr("r", 5)
        .attr("fill", (d: any) => color(d.group));

    node.append("title")
        .text((d: any) => d.id);

    // Add a drag behavior.
    node.call(d3.drag<any,any>()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));
    
    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
        link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);

        node
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y);
    });

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event:any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event:any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event:any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    simulation.on("tick", () => {
        link
            .attr("x1", (d:any) => (d.source as Node).x!)
            .attr("y1", (d:any) => (d.source as Node).y!)
            .attr("x2", (d:any) => (d.target as Node).x!)
            .attr("y2", (d:any) => (d.target as Node).y!);

        node.attr("cx", (d:any) => d.x!).attr("cy", (d:any) => d.y!);
    });
}
