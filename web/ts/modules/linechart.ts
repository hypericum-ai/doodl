

export async function linechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file: DataFile | null = null,
  colors: string[],
  curved = 0
) {
  const { width, height } = size;
  const margin:Margin = defaultMargin;

  if(file?.path)
  {
    data = await loadData(file?.path, file?.format);
  }
  const processed_data:DataPoint[] = data as DataPoint[];

  // Select the container div and clear any existing SVG
  const container = d3.select(div);
  container.selectAll("*").remove();

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    hamburgerMenu(div, data);

  // Define X and Y scales
  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(processed_data, (d: DataPoint) => d.x) ?? 0,
      d3.max(processed_data, (d: DataPoint) => d.x) ?? 0,
    ])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(processed_data, (d: DataPoint) => d.y) ?? 0])
    .range([height - margin.bottom, margin.top]);

  // Create the line generator
  const line = d3
    .line<DataPoint>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(curved ? d3.curveMonotoneX : d3.curveLinear);

  // Append the line path with animation
  const path = svg
    .append("path")
    .datum(processed_data)
    .attr("fill", "none")
    .attr("stroke", colors[0])
    .attr("stroke-width", 2)
    .attr("d", line);

  const totalLength = (path.node() as SVGPathElement).getTotalLength();

  path
    .attr("stroke-dasharray", totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);

  // Append X axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).ticks(6));

  // Append Y axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));
}