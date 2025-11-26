interface BollingerRow {
  date: Date;
  close: number;
  upper: number;
  lower: number;
  movingAvg: number;
}

export async function bollinger(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const container = d3.select(div);
  container.selectAll("*").remove(); // clean previous chart

  const margin = { top: 30, right: 40, bottom: 30, left: 50 };
  const width = size.width - margin.left - margin.right;
  const height = size.height - margin.top - margin.bottom;

  const svg = container
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  hamburgerMenu(div, data);
  trackChart("barchart");

  // ---- PARSE DATA ----
  const parsed: BollingerRow[] = data.map((d: any): BollingerRow => ({
    date: new Date(d.date),
    close: Number(d.close),
    upper: Number(d.upper),
    lower: Number(d.lower),
    movingAvg: Number(d.movingAvg),
  }));

  // ---- SCALES ----

  // X domain with safe fallback
  const xExtent = d3.extent(parsed, (d: BollingerRow) => d.date) as [Date, Date];
  const xDomain: [Date, Date] = xExtent;

  const x = d3
    .scaleUtc()
    .domain(xDomain)
    .range([0, width]);

  // Y domain with number fallback
  const yMin = d3.min(parsed, (d: BollingerRow) => d.lower) as number;
  const yMax = d3.max(parsed, (d: BollingerRow) => d.upper) as number;

  const y = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .nice()
    .range([height, 0]);

  // ---- LINE GENERATORS ----
  const lineClose = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.close));

  const lineUpper = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.upper));

  const lineLower = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.lower));

  const lineMA = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.movingAvg));

  // ---- AREA FOR BANDS ----
  const areaBand = d3
    .area<any>()
    .x((d: any) => x(d.date))
    .y0((d: any) => y(d.lower))
    .y1((d: any) => y(d.upper));

  svg
    .append("path")
    .datum(parsed)
    .attr("fill", colors[1] || "#ddd")
    .attr("opacity", 0.4)
    .attr("d", areaBand);

  // ---- UPPER BAND ----
  svg
    .append("path")
    .datum(parsed)
    .attr("fill", "none")
    .attr("stroke", colors[1] || "#ccc")
    .attr("stroke-width", 1.4)
    .attr("d", lineUpper);

  // ---- LOWER BAND ----
  svg
    .append("path")
    .datum(parsed)
    .attr("fill", "none")
    .attr("stroke", colors[1] || "#ccc")
    .attr("stroke-width", 1.4)
    .attr("d", lineLower);

  // ---- MOVING AVERAGE ----
  svg
    .append("path")
    .datum(parsed)
    .attr("fill", "none")
    .attr("stroke", colors[2] || "red")
    .attr("stroke-width", 2)
    .attr("d", lineMA);

  // ---- CLOSE PRICE ----
  svg
    .append("path")
    .datum(parsed)
    .attr("fill", "none")
    .attr("stroke", colors[0] || "steelblue")
    .attr("stroke-width", 1.7)
    .attr("d", lineClose);

  // ---- AXES ----
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));
}
