export async function dotplot(
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

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

    hamburgerMenu(div, data);

  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d: any) => d.category))
    .range([0, width])
    .padding(0.5);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => Number(d.value)) as number])
    .nice()
    .range([height, 0]);

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

  // Define dots
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => xScale(d.category)! + xScale.bandwidth() / 2)
    .attr("cy", (d: any) => yScale(d.value))
    .attr("r", 5)
    .attr("fill", (d, i) => colors[i % colors.length])
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      d3.select(this).transition().duration(200).attr("r", 7);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(`${d.category}-${d.value}`);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      d3.select(this).transition().duration(200).attr("r", 5);
      tooltip.style("display", "none");
    });

  // Add X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add Y Axis
  svg.append("g").call(d3.axisLeft(yScale));
}