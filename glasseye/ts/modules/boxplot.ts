export async function boxplot(
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

  // Compute summary statistics (quartiles, median, min, max)
  const groupedData = d3.group(data, (d: any) => d.category);
  const summaryData = Array.from(groupedData, ([key, values]) => {
    const sorted = values.map((d: any) => +d.value).sort(d3.ascending);
    const q1 = d3.quantile(sorted, 0.25) as number;
    const median = d3.quantile(sorted, 0.5) as number;
    const q3 = d3.quantile(sorted, 0.75) as number;
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    return { category: key, min, q1, median, q3, max };
  });

  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(summaryData.map((d) => d.category))
    .range([0, width])
    .padding(0.5);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(summaryData, (d) => d.min) as number, d3.max(summaryData, (d) => d.max) as number])
    .nice()
    .range([height, 0]);

  // Draw box plot elements
  const boxWidth = xScale.bandwidth() * 0.6;


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

  const boxplotGroups = svg
    .selectAll(".boxplot")
    .data(summaryData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${xScale(d.category)!},0)`)
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(d.category);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      tooltip.style("display", "none");
    });

  // Draw vertical lines (min to max)
  boxplotGroups
    .append("line")
    .attr("y1", (d) => yScale(d.min))
    .attr("y2", (d) => yScale(d.max))
    .attr("x1", xScale.bandwidth() / 2)
    .attr("x2", xScale.bandwidth() / 2)
    .attr("stroke", "black")
    

  // Draw rectangles for the interquartile range (IQR)
  boxplotGroups
    .append("rect")
    .attr("y", (d) => yScale(d.q3))
    .attr("height", (d) => yScale(d.q1) - yScale(d.q3))
    .attr("width", boxWidth)
    .attr("x", (xScale.bandwidth() - boxWidth) / 2)
    .attr("stroke", "black")
    .attr("fill", (d, i) => colors[i % colors.length]);

  // Draw median lines
  boxplotGroups
    .append("line")
    .attr("y1", (d) => yScale(d.median))
    .attr("y2", (d) => yScale(d.median))
    .attr("x1", (xScale.bandwidth() - boxWidth) / 2)
    .attr("x2", (xScale.bandwidth() + boxWidth) / 2)
    .attr("stroke", "black");

  // Add X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add Y Axis
  svg.append("g").call(d3.axisLeft(yScale));
}