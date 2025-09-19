
export async function stacked_barchart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  horizontal = 0, // 0 = Vertical, 1 = Horizontal
  moving_average = 0
) {
  const { width, height } = size;
  const margin: Margin = defaultMargin;

  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  // Extract keys for stacking
  const keys = Object.keys(data[0]).filter((k: string) => k !== "label");

  // Setup SVG
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Stack data
  const stackGen = d3.stack<any>().keys(keys);
  const stackedData = stackGen(data);

  if (!horizontal) {
    // ----- VERTICAL -----
    const x = d3
      .scaleBand()
      .domain(data.map((d: any) => d.label))
      .range([0, chartWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(stackedData, (layer: any[]) =>
          d3.max(layer, (d: [number, number, any]) => d[1])
        ) as number,
      ])
      .nice()
      .range([chartHeight, 0]);

    const color = d3.scaleOrdinal<string>().domain(keys).range(colors);

    // Bars
    g.selectAll("g.layer")
      .data(stackedData)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (d: { key: string }) => color(d.key)!)
      .selectAll("rect")
      .data((d: any) => d)
      .join("rect")
      .attr("x", (d: any) => x(d.data.label)!)
      .attr("y", (d: any) => y(d[1]))
      .attr("height", (d: any) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    g.append("g").call(d3.axisLeft(y));

    // Moving average (on stacked totals)
    if (moving_average) {
      const totals = data.map((d: any) =>
        keys.reduce((sum: number, k: string) => sum + d[k], 0)
      );

      const movingAvg = totals.map((_: number, i: number, arr: number[]) => {
        const window = 3; // adjustable
        const start = Math.max(0, i - window + 1);
        const subset = arr.slice(start, i + 1);
        return d3.mean(subset) as number;
      });

      const line = d3.line<number>()
        .x((_: number, i: number) => x(data[i].label)! + x.bandwidth() / 2)
        .y((d: number) => y(d))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(movingAvg)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line);
    }
  } else {
    // ----- HORIZONTAL -----
    const y = d3
      .scaleBand()
      .domain(data.map((d: any) => d.label))
      .range([0, chartHeight])
      .padding(0.1);

    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(stackedData, (layer: any[]) =>
          d3.max(layer, (d: [number, number, any]) => d[1])
        ) as number,
      ])
      .nice()
      .range([0, chartWidth]);

    const color = d3.scaleOrdinal<string>().domain(keys).range(colors);

    // Bars
    g.selectAll("g.layer")
      .data(stackedData)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (d: { key: string }) => color(d.key)!)
      .selectAll("rect")
      .data((d: any) => d)
      .join("rect")
      .attr("y", (d: any) => y(d.data.label)!)
      .attr("x", (d: any) => x(d[0]))
      .attr("width", (d: any) => x(d[1]) - x(d[0]))
      .attr("height", y.bandwidth());

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    g.append("g").call(d3.axisLeft(y));

    // Moving average (on stacked totals)
    if (moving_average) {
      const totals = data.map((d: any) =>
        keys.reduce((sum: number, k: string) => sum + d[k], 0)
      );

      const movingAvg = totals.map((_: number, i: number, arr: number[]) => {
        const window = 3;
        const start = Math.max(0, i - window + 1);
        const subset = arr.slice(start, i + 1);
        return d3.mean(subset) as number;
      });

      const line = d3.line<number>()
        .y((_: number, i: number) => y(data[i].label)! + y.bandwidth() / 2)
        .x((d: number) => x(d))
        .curve(d3.curveMonotoneY);

      g.append("path")
        .datum(movingAvg)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line);
    }
  }
}