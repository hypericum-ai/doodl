export async function stacked_areachart(
   div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  horizontal = 0
) {
  const { width, height } = size;
  const margin = { top: 40, right: 20, bottom: 40, left: 60 };
  const svgWidth = width;
  const svgHeight = height;
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // Clear existing content
  d3.select(div).selectAll("*").remove();

  // Create SVG
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const chartArea = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // ---- Data preparation ----
  // Expect data in format: [{ year: 2000, industry1: value, industry2: value, ...}, ...]
  const keys = Object.keys(data[0]).filter((k) => k !== "year");

  // X and Y scales
  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d: any) => +d.year) as [number, number])
    .range([0, chartWidth]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => d3.sum(keys, (k) => +d[k]))!])
    .nice()
    .range([chartHeight, 0]);

  const color = d3.scaleOrdinal<string>().domain(keys).range(colors);

  // Stack generator
  const stackGen = d3.stack().keys(keys);
  const stackedData = stackGen(data);

  // Area generator
  const area = d3
    .area<any>()
    .x((d: any) => x(d.data.year))
    .y0((d: any) => y(d[0]))
    .y1((d: any) => y(d[1]));

  // ---- Draw layers ----
  chartArea
    .selectAll(".layer")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", "layer")
    .attr("fill", (d: any) => color(d.key)!)
    .attr("d", area)
    .attr("stroke", "none")
    .attr("opacity", 0.9);

  // ---- Axes ----
  chartArea
    .append("g")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format("d")));

  chartArea.append("g").call(d3.axisLeft(y));

  // ---- Legend ----
  const legend = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 10)`)
    .attr("font-size", 12)
    .attr("text-anchor", "start");

  const legendItems = legend
    .selectAll("g")
    .data(keys)
    .enter()
    .append("g")
    .attr("transform", (_, i) => `translate(${i * 130}, 0)`);

  legendItems
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", (d: any) => color(d)!);

  legendItems
    .append("text")
    .attr("x", 16)
    .attr("y", 10)
    .text((d: any) => d);
}