interface PivotedDatum {
  label: string | Date;
  [category: string]: number | string | Date;
}

export async function stacked_barchart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  horizontal = 0, // 0 = Vertical, 1 = Horizontal
  moving_average = 0,
  x_label_angle = 0,
  show_legend = 0
) {
  const { width, height } = size;
  const margin: Margin = defaultMargin;

  if (file?.path) {
    data = await loadData(file.path, file.format);
  }

  // Pivot long-form data into wide-form structure for stacking
  const nested = d3.rollups(
    data,
    (v: any[]) => {
      const obj: PivotedDatum = { label: v[0].label };
      v.forEach((d: any) => (obj[d.category] = Number(d.value)));
      return obj;
    },
    (d: any) => d.label
  );

  const pivotedData: PivotedDatum[] = nested.map(([_, values]) => values);
  const keys: string[] = Array.from(
    new Set(data.map((d: any) => String(d.category)))
  );

  // Setup SVG
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  hamburgerMenu(div, data);
  trackChart("stacked_barchart");

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top + 30})`);

  // Stack data
  const stackGen = d3.stack<PivotedDatum>().keys(keys);
  const stackedData = stackGen(pivotedData);

  if (!horizontal) {
    // ----- VERTICAL -----
    const x = d3
      .scaleBand()
      .domain(pivotedData.map((d) => String(d.label)))
      .range([0, chartWidth])
      .padding(0.1);

    const yMax = d3.max(stackedData, (layer) =>
      d3.max(layer, (d) => Number(d[1]))
    ) as number;

    const y = d3.scaleLinear().domain([0, yMax]).nice().range([chartHeight, 0]);

    const color = d3.scaleOrdinal<string>().domain(keys).range(colors);

    // Bars
    g.selectAll("g.layer")
      .data(stackedData)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (d: any) => color(d.key)!)
      .selectAll("rect")
      .data((d: any) => d)
      .join("rect")
      .attr("x", (d: any) => x(String(d.data.label))!)
      .attr("y", (d: any) => y(Number(d[1])))
      .attr("height", (d: any) => y(Number(d[0])) - y(Number(d[1])))
      .attr("width", x.bandwidth());

    // Axes
    const xAxis = g
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    if (x_label_angle !== 0) {
      xAxis
        .selectAll("text")
        .attr("transform", `rotate(${x_label_angle})`)
        .style("text-anchor", x_label_angle > 0 ? "start" : "end")
        .attr("dx", x_label_angle === 90 ? "0.8em" : "0")
        .attr("dy", x_label_angle === 90 ? "0" : "1.5em");
    }

    g.append("g").call(d3.axisLeft(y));

    // Moving average
    if (moving_average) {
      const totals = pivotedData.map((d) =>
        keys.reduce((sum, k) => sum + Number(d[k] ?? 0), 0)
      );

      const movingAvg = totals.map((_, i, arr) => {
        const window = 3;
        const start = Math.max(0, i - window + 1);
        const subset = arr.slice(start, i + 1);
        return d3.mean(subset) as number;
      });

      const line = d3
        .line<number>()
        .x((_, i) => x(String(pivotedData[i].label))! + x.bandwidth() / 2)
        .y((d) => y(d))
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
      .domain(pivotedData.map((d) => String(d.label)))
      .range([0, chartHeight])
      .padding(0.1);

    const xMax = d3.max(stackedData, (layer) =>
      d3.max(layer, (d) => Number(d[1]))
    ) as number;

    const x = d3.scaleLinear().domain([0, xMax]).nice().range([0, chartWidth]);

    const color = d3.scaleOrdinal<string>().domain(keys).range(colors);

    // Bars
    g.selectAll("g.layer")
      .data(stackedData)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (d: any) => color(d.key)!)
      .selectAll("rect")
      .data((d: any) => d)
      .join("rect")
      .attr("y", (d: any) => y(String(d.data.label))!)
      .attr("x", (d: any) => x(Number(d[0])))
      .attr("width", (d: any) => x(Number(d[1])) - x(Number(d[0])))
      .attr("height", y.bandwidth());

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    g.append("g").call(d3.axisLeft(y));

    // Moving average
    if (moving_average) {
      const totals = pivotedData.map((d) =>
        keys.reduce((sum, k) => sum + Number(d[k] ?? 0), 0)
      );

      const movingAvg = totals.map((_, i, arr) => {
        const window = 3;
        const start = Math.max(0, i - window + 1);
        const subset = arr.slice(start, i + 1);
        return d3.mean(subset) as number;
      });

      const line = d3
        .line<number>()
        .y((_, i) => y(String(pivotedData[i].label))! + y.bandwidth() / 2)
        .x((d) => x(d))
        .curve(d3.curveMonotoneY);

      g.append("path")
        .datum(movingAvg)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line);
    }
  }

  // ---- Legend ----
  if (show_legend) {
    const legend = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top / 2})`)
      .attr("font-size", 9)
      .attr("text-anchor", "start");

    const legendItems = legend.selectAll("g").data(keys).enter().append("g");

    const legendSpacing = 200;
    const legendItemHeight = 16;
    const itemsPerRow = Math.floor(chartWidth / legendSpacing);

    legendItems.attr("transform", (_, i) => {
      const xPos = (i % itemsPerRow) * legendSpacing;
      const yPos = Math.floor(i / itemsPerRow) * legendItemHeight;
      return `translate(${xPos}, ${yPos})`;
    });

    legendItems
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr(
        "fill",
        (d) => d3.scaleOrdinal<string>().domain(keys).range(colors)(d)!
      );

    legendItems
      .append("text")
      .attr("x", 16)
      .attr("y", 10)
      .text((d: any) => d);
  }
}
