interface LinePoint {
  label: string;
  x: number;
  y: number;
}

export async function multi_linechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file: DataFile | null = null,
  colors: string[],
  curved = 0,
  show_legend = 0
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  data = data as LinePoint[];

  data = data.map((d: any) => ({
    label: String(d.label),
    x: +d.x,
    y: +d.y,
  })) as LinePoint[];

  const { width, height } = size;
  const margin: Margin = defaultMargin;

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  hamburgerMenu(div, data);
  trackChart("multi_linechart");

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // ---- Data Processing: group by label ----------------------------

  const groups = d3.group(data, (d: LinePoint) => d.label) as Map<string, LinePoint[]>;
  const labels = Array.from(groups.keys());

  // ---- Scales ------------------------------------------------------

  const xExtent = d3.extent<LinePoint, number>(data, (d) => d.x) as [number, number];
  const yExtent = d3.extent<LinePoint, number>(data, (d) => d.y) as [number, number];

  const x = d3.scaleLinear().domain(xExtent).range([0, innerWidth]);
  const y = d3.scaleLinear().domain(yExtent).range([innerHeight, 0]);

  const colorScale = d3.scaleOrdinal<string>()
    .domain(labels as string[])
    .range(colors);

  // ---- Axes --------------------------------------------------------

  chart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(x));

  chart.append("g").call(d3.axisLeft(y));

  // ---- Line Generator ----------------------------------------------

  const lineGen = d3
    .line<any>()
    .x((d) => x(d.x))
    .y((d) => y(d.y));

  if (curved) {
    lineGen.curve(d3.curveCatmullRom.alpha(0.5));
  }

  // ---- Draw lines ---------------------------------------------------

  chart
    .selectAll(".line-group")
    .data(labels)
    .enter()
    .append("path")
    .attr("class", "line-group")
    .attr("fill", "none")
    .attr("stroke", (label: string) => colorScale(label)!)
    .attr("stroke-width", 2)
    .attr("d", (label: string) => lineGen(groups.get(label)!)!);

  // ---- Points -------------------------------------------------------

  labels.forEach((label) => {
    chart
      .selectAll(`.point-${label}`)
      .data(groups.get(label as string)!)
      .enter()
      .append("circle")
      .attr("class", `point-${label}`)
      .attr("cx", (d) => x((d as LinePoint).x))
      .attr("cy", (d) => y((d as LinePoint).y))
      .attr("r", 3)
      .attr("fill", colorScale(label as string)!);
  });

  // ---- Legend -------------------------------------------------------

  if (show_legend) {
    const legend = chart
      .append("g")
      .attr("class", "legend")
      .attr("transform", "translate(10, 10)");

    labels.forEach((label, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 20})`);

      legendRow
        .append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", colorScale(label)!);

      legendRow
        .append("text")
        .attr("x", 18)
        .attr("y", 10)
        .attr("font-size", 12)
        .attr("fill", "#333")
        .text(label);
    });
  }
}
