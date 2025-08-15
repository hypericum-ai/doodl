export async function barchart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  horizontal = 0 // 0 = Vertical, 1 = Horizontal
) {
  const { width, height } = size;
  const margin: Margin = defaultMargin;

  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }
  const processed_data: DataLabeled[] = data as DataLabeled[];

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    hamburgerMenu(div, data);

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xHorizontal = d3.scaleLinear().domain([0, d3.max(processed_data, (d) => d.value)!]).range([0, chartWidth]);

  const xVertical = d3.scaleBand().domain(processed_data.map((d) => d.label)).range([0, chartWidth]).padding(0.2);

  const yHorizontal =  d3.scaleBand().domain(processed_data.map((d) => d.label)).range([0, chartHeight]).padding(0.2);

  const yVertical = d3.scaleLinear().domain([0, d3.max(processed_data, (d) => d.value)!]).range([chartHeight, 0]);

  // Draw X axis
  svg.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(horizontal ? d3.axisBottom(xHorizontal) : d3.axisBottom(xVertical));

  // Draw Y axis
  svg.append("g").call(horizontal ? d3.axisLeft(yHorizontal) : d3.axisLeft(yVertical));

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

  // Draw bars
  svg.selectAll(".bar")
    .data(processed_data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => {
      if (horizontal) {
        return 0;
      } else {
        return xVertical(d.label)!;
      }
    })
    .attr("y", (d) => {
      if (horizontal) {
        return yHorizontal(d.label)!;
      } else {
        return yVertical(0); // Start at baseline
      }
    })
    .attr("width", (d) => {
      if (horizontal) {
        return 0; // Start with zero width
      } else {
        return xVertical.bandwidth();
      }
    })
    .attr("height", (d) => {
      if (horizontal) {
        return yHorizontal.bandwidth();
      } else {
        return 0; // Start with zero height
      }
    })
    .attr("fill", colors[0])
    .on("mouseover", function (event, d: any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      tooltip
        .style("display", "block")
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY}px`)
        .text(d.label);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      tooltip.style("display", "none");
    })
    .transition()
    .duration(800)
    .attr("width", (d) => {
      if (horizontal) {
        return xHorizontal(d.value);
      } else {
        return xVertical.bandwidth();
      }
    })
    .attr("height", (d) => {
      if (horizontal) {
        return yHorizontal.bandwidth();
      } else {
        return chartHeight - yVertical(d.value);
      }
    })
    .attr("y", (d) => {
      if (!horizontal) {
        return yVertical(d.value);
      } else {
        return yHorizontal(d.label)!;
      }
    });
}