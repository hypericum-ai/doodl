export async function areachart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const margin = defaultMargin;
  const width = size.width - margin.left - margin.right;
  const height = size.height - margin.top - margin.bottom;

  const parseDate = d3.timeParse("%Y-%m-%d");
  data.forEach((d: any) => {
    d.date = parseDate(d.date);
  });

  const keys = Object.keys(data[0]).filter((k) => k !== "date");
  const stackedData = d3.stack().keys(keys)(data);

  const dateExtent = d3.extent(data, (d: any) => d.date) as [
    Date | undefined,
    Date | undefined
  ];
  const validDateExtent: [Date, Date] =
    dateExtent[0] && dateExtent[1]
      ? [dateExtent[0], dateExtent[1]]
      : [new Date(), new Date()];

  const x = d3
    .scaleTime()
    .domain(validDateExtent)
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(stackedData[stackedData.length - 1], (d) => d[1])!])
    .nice()
    .range([height, 0]);

  const color = d3.scaleOrdinal<string>().domain(keys).range(colors);

  const area = d3
    .area<[number, number]>()
    .x((d, i) => x(data[i].date)!)
    .y0((d) => y(d[0]))
    .y1((d) => y(d[1]));

  d3.select(div).selectAll("*").remove();

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    hamburgerMenu(div, data);

  // Add areas
  svg
    .selectAll("path")
    .data(stackedData)
    .join("path")
    .attr("fill", ({ key }) => color(key)!)
    .attr("d", (d: d3.Series<any, string>) => area(d as [number, number][])!)
    .on("mousemove", function (event, layer) {
      const [xPos] = d3.pointer(event);
      const xDate = x.invert(xPos);
      const i = d3.bisector((d: any) => d.date).center(data, xDate);
      const d = data[i];
      const tooltipHtml = keys
        .map(
          (k) =>
            `<div><span style="color:${color(k)};">●</span> ${k}: ${d[k]}</div>`
        )
        .join("");
      tooltip
        .html(
          `<strong>${d3.timeFormat("%Y-%m-%d")(d.date)}</strong>${tooltipHtml}`
        )
        .style("left", `${event.pageX + 15}px`)
        .style("top", `${event.pageY - 28}px`)
        .style("opacity", 1);
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

  // Axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(6));

  svg.append("g").call(d3.axisLeft(y));

  // Tooltip div
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("border", "1px solid #ccc")
    .style("border-radius", "4px")
    .style("padding", "8px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  // Legend
  const legend = svg
    .append("g")
    .attr("transform", `translate(${width + 20}, 0)`);

  keys.forEach((key, i) => {
    const g = legend.append("g").attr("transform", `translate(0, ${i * 20})`);

    g.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", color(key)!);

    g.append("text")
      .attr("x", 18)
      .attr("y", 10)
      .text(key)
      .style("font-size", "12px")
      .style("alignment-baseline", "middle");
  });
}
