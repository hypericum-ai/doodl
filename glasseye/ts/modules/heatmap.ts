export async function heatmap(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  show_legend = 0,
  interp = "rgb",
  gamma = 0
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

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    hamburgerMenu(div, data);

  const zoomGroup = svg
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

  // Extract unique X and Y categories
  const xCategories = Array.from(
    new Set(data.map((d: any) => d.x))
  ) as string[];
  const yCategories = Array.from(
    new Set(data.map((d: any) => d.y))
  ) as string[];

  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(xCategories)
    .range([0, width])
    .padding(0.05);
  const yScale = d3
    .scaleBand()
    .domain(yCategories)
    .range([height, 0])
    .padding(0.05);
  // const colorScale = d3.scaleLinear().range(colors) .domain([d3.min(data, (d: any) => +d.value) as number, d3.max(data, (d: any) => +d.value) as number])
  const colorScale = d3
    .scaleSequential(
      color_interp({
        colors: colors,
        interp: interp,
        gamma: gamma,
      })
    )
    .domain([
      d3.min(data, (d: any) => +d.value) as number,
      d3.max(data, (d: any) => +d.value) as number,
    ]);

  // Add X Axis
  zoomGroup
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickSize(0))
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)")
    .select(".domain")
    .remove();

  // Add Y Axis
  zoomGroup
    .append("g")
    .call(d3.axisLeft(yScale).tickSize(0))
    .select(".domain")
    .remove();

  // Add heatmap squares
  zoomGroup
    .selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => xScale(d.x)!)
    .attr("y", (d: any) => yScale(d.y)!)
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", (d: any) => colorScale(d.value));

  if (show_legend > 0) {
    // Add color legend
    const legendWidth = 200,
      legendHeight = 10;
    const legendSvg = svg
      .append("g")
      .attr("transform", `translate(${width - legendWidth}, -30)`);

    legendSvg
      .append("text")
      .attr("x", legendWidth / 2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("color", "#000")
      .text("Legend");

    const legendScale = d3
      .scaleLinear()
      .domain(colorScale.domain())
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale).ticks(5);

    const legendGradient = legendSvg
      .append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    legendGradient
      .selectAll("stop")
      .data([
        { offset: "0%", color: colors[0] },
        { offset: "100%", color: colors[1] },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    legendSvg
      .append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight * 2.5)
      .style("fill", "url(#legend-gradient)");

    legendSvg
      .append("g")
      .attr("transform", `translate(0, ${legendHeight})`)
      .call(legendAxis);
  }

  const zoom = d3
    .zoom()
    .scaleExtent([1, 5]) // Min and max zoom levels
    .translateExtent([
      [0, 0],
      [svgWidth, svgHeight],
    ]) // Restrict panning
    .on("zoom", (event) => {
      zoomGroup.attr("transform", event.transform);
    });

  svg.call(
    zoom as unknown as (
      selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
    ) => void
  );
}
