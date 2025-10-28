export async function stacked_areachart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  curved = false,
  x_label_angle = 0
) {

  if (file?.path) {
    data = await loadData(file.path, file.format);
  }

  const { width, height } = size;
  const margin = { top: 40, right: 20, bottom: 40, left: 60 };
  const svgWidth = width;
  const svgHeight = height;
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  d3.select(div).selectAll("*").remove();

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const chartArea = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  hamburgerMenu(div, data);

  // ---- Data preparation ----
  interface PivotedRow {
    label: string | number;
    [category: string]: number | string;
  }

  // Group data by label
  const grouped = d3.group(data, (d :any) => d.label);

  // Create pivoted data array
  const pivotedData: PivotedRow[] = Array.from(grouped, ([label, values]) => {
    const obj: PivotedRow = { label };
    values.forEach((d :any) => {
      obj[d.category] = +d.value;
    });
    return obj;
  });

  const keys: string[] = Array.from(new Set(data.map((d :any) => d.category)));

  const isNumeric = pivotedData.every((d :any) => !isNaN(Number(d.label)));

  const x = isNumeric
    ? d3
        .scaleLinear()
        .domain(
          d3.extent(pivotedData, (d :any) => +d.label) as [number, number]
        )
        .range([0, chartWidth])
    : d3
        .scalePoint<string>()
        .domain(pivotedData.map((d :any) => String(d.label)))
        .range([0, chartWidth])
        .padding(0.5);

  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(pivotedData, (d :any) => d3.sum(keys, (k :any) => +(d[k] ?? 0)))!,
    ])
    .nice()
    .range([chartHeight, 0]);

  const color = d3.scaleOrdinal<string>().domain(keys).range(colors);

  const stackGen = d3.stack<PivotedRow>().keys(keys);
  const stackedData = stackGen(pivotedData);

  const xAccessor = (d: d3.SeriesPoint<PivotedRow>): number =>
    isNumeric
      ? (x as d3.ScaleLinear<number, number>)(+d.data.label)
      : (x as d3.ScalePoint<string>)(String(d.data.label))!;

  const area = d3
    .area<d3.SeriesPoint<PivotedRow>>()
    .x(xAccessor)
    .y0((d :any) => y(d[0]))
    .y1((d :any) => y(d[1]))
    .curve(curved ? d3.curveMonotoneX : d3.curveLinear);

  chartArea
    .selectAll(".layer")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", "layer")
    .attr("fill", (d) => color(d.key)!)
    .attr("d", area)
    .attr("stroke", "none")
    .attr("opacity", 0.9);

  const xAxisG = chartArea
    .append("g")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(
      isNumeric
        ? d3.axisBottom(x as d3.ScaleLinear<number, number>)
            .ticks(10)
            .tickFormat(d3.format("d"))
        : d3.axisBottom(x as d3.ScalePoint<string>)
    );

  if (x_label_angle !== 0) {
    const texts = xAxisG.selectAll("text");
    texts
      .attr("transform", `rotate(${x_label_angle})`)
      .style(
        "text-anchor",
        x_label_angle === 90
          ? "start"
          : x_label_angle > 0
          ? "start"
          : "end"
      )
      .attr("dx", x_label_angle === 90 ? "0.8em" : "-0.5em")
      .attr("dy", x_label_angle === 90 ? "-0.1em" : "0.5em");
  }

  chartArea.append("g").call(d3.axisLeft(y));

  // ---- Legend ----
  const legend = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 10)`)
    .attr("font-size", 9)
    .attr("text-anchor", "start");

  const legendItems = legend
    .selectAll("g")
    .data(keys)
    .enter()
    .append("g");

  const legendSpacing = 200;
  const legendItemHeight = 16;
  const itemsPerRow = Math.floor(chartWidth / legendSpacing);

  legendItems
    .attr("transform", (_, i) => {
      const xPos = (i % itemsPerRow) * legendSpacing;
      const yPos = Math.floor(i / itemsPerRow) * legendItemHeight;
      return `translate(${xPos}, ${yPos})`;
    });

  legendItems
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", (d) => color(d)!);

  legendItems
    .append("text")
    .attr("x", 16)
    .attr("y", 10)
    .text((d :any) => d);
}