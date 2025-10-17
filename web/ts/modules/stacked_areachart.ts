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
  // Expect data in format: [{ label: label1, value1: value, value2: value, ...}, ...]
  const keys = Object.keys(data[0]).filter((k) => k !== "label");

  // Detect if labels are numeric
  const isNumeric = data.every((d: any) => !isNaN(+d.label));

  // Define x-scale accordingly
  const x = isNumeric
    ? d3.scaleLinear()
        .domain(d3.extent(data, (d: any) => +d.label) as [number, number])
        .range([0, chartWidth])
    : d3.scalePoint()
        .domain(data.map((d: any) => d.label))
        .range([0, chartWidth])
        .padding(0.5);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => d3.sum(keys, (k) => +d[k]))!])
    .nice()
    .range([chartHeight, 0]);

  const color = d3.scaleOrdinal<string>().domain(keys).range(colors);

  // Stack generator
  const stackGen = d3.stack().keys(keys);
  const stackedData = stackGen(data);

  // Define a strongly typed x-accessor to satisfy TypeScript
  const xAccessor = (d: any): number => {
    if (isNumeric) {
      return (x as d3.ScaleLinear<number, number>)(+d.data.label);
    } else {
      // scalePoint always returns a number or undefined, but we can assert non-null since domain is full
      return (x as d3.ScalePoint<string>)(d.data.label)!;
    }
  };

  const area = d3
    .area<any>()
    .x(xAccessor)
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
    .call(
      isNumeric
        ? d3.axisBottom(x as d3.ScaleLinear<number, number>)
            .ticks(10)
            .tickFormat(d3.format("d"))
        : d3.axisBottom(x as d3.ScalePoint<string>)
    );

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