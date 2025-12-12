export async function grouped_barchart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  horizontal = 0, // 0 = Vertical, 1 = Horizontal
  x_label_angle = 0,
  show_legend = 0
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  d3.select(div).selectAll("*").remove();

  const width = size?.width ?? 700;
  const height = size?.height ?? 400;
  const axisPadding = 40;

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  hamburgerMenu(div, data);
  trackChart("grouped_barchart");

  const groups = d3.group(data, (d: any) => d.group);

  let x0, x1, y;

  if (horizontal) {
    y = d3.scaleBand()
      .domain(Array.from(groups.keys()))
      .range([0, height])
      .paddingInner(0.1);

    x1 = d3.scaleBand()
      .domain(data.map((d: any) => String(d.label)))
      .range([0, y.bandwidth()])
      .padding(0.05);

    x0 = d3.scaleLinear()
      .domain([0, (d3.max(data, (d: any) => Number(d.value)) ?? 0)])
      .nice()
      .range([0, width]);
  } else {
    x0 = d3.scaleBand()
      .domain(Array.from(groups.keys()))
      .range([0, width])
      .paddingInner(0.1);

    x1 = d3.scaleBand()
      .domain(data.map((d: any) => String(d.label)))
      .range([0, x0.bandwidth()])
      .padding(0.05);

    y = d3.scaleLinear()
      .domain([0, (d3.max(data, (d: any) => Number(d.value)) ?? 0)])
      .nice()
      .range([height, 0]);
  }

  svg.append("g")
    .selectAll("g")
    .data(Array.from(groups))
    .enter().append("g")
    .attr("transform", (d: any) => `translate(${x0(d[0])},0)`)
    .selectAll("rect")
    .data((d: any) => d[1])
    .enter().append("rect")
    .attr("x", (d: any) =>
      horizontal ? 0 : (x1(String(d.label)) ?? 0)
    )
    .attr("y", (d: any) =>
      horizontal ? (((y as any)(String(d.group)) ?? 0) + (x1(String(d.label)) ?? 0)) : ((y as any)(Number(d.value)) ?? 0)
    )
    .attr("width", (d: any) =>
      horizontal ? ((x0 as any)(Number(d.value)) ?? 0) : x1.bandwidth()
    )
    .attr("height", (d: any) =>
      horizontal ? x1.bandwidth() : (height - ((y as any)(Number(d.value)) ?? height))
    )
    .attr("fill", (d: any, i: number) => colors[i % colors.length]);

  // X and Y axes
  let xAxis, yAxis;

  if (horizontal) {
    xAxis = d3.axisBottom(x0 as any);
    yAxis = d3.axisLeft(y as any);
  } else {
    xAxis = d3.axisBottom(x0 as any);
    yAxis = d3.axisLeft(y as any);
  }

  // Append x-axis
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", `rotate(${x_label_angle})`)
    .style("text-anchor", x_label_angle !== 0 ? "end" : "middle");

  // Append y-axis
  svg.append("g")
    .attr("transform", `translate(0,0)`)
    .call(yAxis);

  // X-axis label
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + axisPadding)
    .attr("text-anchor", "middle")
    .text(horizontal ? "Value" : "Groups");

  // Y-axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -axisPadding)
    .attr("text-anchor", "middle")
    .text(horizontal ? "Groups" : "Value");

  if (show_legend) {
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 100}, 20)`);

    legend.selectAll("rect")
      .data(colors)
      .enter().append("rect")
      .attr("x", 0)
      .attr("y", (d: any, i: number) => i * 20)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d: any, i: number) => colors[i % colors.length]);

    legend.selectAll("text")
      .data(colors)
      .enter().append("text")
      .attr("x", 25)
      .attr("y", (d: any, i: number) => i * 20 + 9)
      .attr("dy", "0.35em")
      .text((d: any, i: number) => data[i].label);
  }
}
