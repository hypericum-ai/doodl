export function bollinger(
  div: string = "",
  data: any,
  size?: any,
  colors: string[] = []
) {
  const width = size.width,
    height = size.height;

  // Parse data
  const parsedData = data.map((d: any) => ({
    date: new Date(d.date),
    close: d.close,
    upper: d.upper,
    lower: d.lower,
    movingAvg: d.movingAvg,
  }));

  // Create scales
  const dateExtent = d3.extent(parsedData, (d: any) => d.date) as [
    Date | undefined,
    Date | undefined
  ];
  const validDateExtent: [Date, Date] =
    dateExtent[0] && dateExtent[1]
      ? [dateExtent[0], dateExtent[1]]
      : [new Date(), new Date()];

  const x = d3.scaleTime().domain(validDateExtent).range([0, width]);

  const yMin = d3.min(parsedData, (d: any) => Number(d.lower)) ?? 0;
  const yMax = d3.max(parsedData, (d: any) => Number(d.upper)) ?? 100;

  const y = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

  // Line generators
  const line = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.movingAvg));

  const upperBand = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.upper));

  const lowerBand = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.lower));

  // Create SVG
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

    hamburgerMenu(div, data);

  // Draw bands
  svg
    .append("path")
    .datum(parsedData)
    .attr("fill", "none")
    .attr("stroke", colors[0] || "#ff0000")
    .attr("stroke-width", 1.5)
    .attr("d", upperBand);

  svg
    .append("path")
    .datum(parsedData)
    .attr("fill", "none")
    .attr("stroke", colors[1] || "#0000ff")
    .attr("stroke-width", 1.5)
    .attr("d", lowerBand);

  svg
    .append("path")
    .datum(parsedData)
    .attr("fill", "none")
    .attr("stroke", colors[2] || "#00ff00")
    .attr("stroke-width", 2)
    .attr("d", line);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .append("text")
    .attr("x", width / 2)
    .attr("y", 50) // Increase y position for visibility
    .attr("fill", "black")
    .attr("font-size", "14px") // Ensure readable font size
    .attr("font-weight", "bold") // Make it more prominent
    .attr("text-anchor", "middle")
    .text("Date");

  svg.append("g")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -50) // Adjust position for visibility
    .attr("fill", "red")
    .attr("font-size", "14px") // Ensure readable font size
    .attr("font-weight", "bold") // Make it more prominent
    .attr("text-anchor", "middle")
    .text("Price");
}
