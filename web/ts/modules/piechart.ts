export async function piechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  donut?: 0,
  continuous_rotation?: 0
) {
  const { width, height } = size;
  const radius = Math.min(width, height) / 2;

  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }
  const processed_data: DataLabeled[] = data as DataLabeled[];

  if (colors.length < 10) {
    colors.push(...defaultArgumentObject.colors);
  }

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  hamburgerMenu(div, data);

  const container = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(0)`);

  const color = d3
    .scaleOrdinal<string>()
    .domain(processed_data.map((d: any) => d.label))
    .range(colors);

  const pie = d3.pie<DataLabeled>().value((d) => d.value);

  const arc: any = d3
    .arc<d3.PieArcDatum<DataLabeled>>()
    .innerRadius(donut ? radius * 0.5 : 0)
    .outerRadius(radius);

  const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "6px")
    .style("background", "#333")
    .style("color", "#fff")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("display", "none");

  const arcs = container
    .selectAll("arc")
    .data(pie(processed_data))
    .enter()
    .append("g")
    .attr("class", "arc")
    .on("mouseover", function (event, d: any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);

      tooltip
        .style("display", "block")
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY}px`)
        .text(d.data.label);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      tooltip.style("display", "none");
    });

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d: any) => color(d.data.label));

  arcs
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "#FFFFFF")
    .text((d: any) => d.data.label);

  if (continuous_rotation) {
    // Start continuous rotation after 2 second delay
    setTimeout(() => {
      let angle = 0;
      d3.timer((elapsed) => {
        angle = (elapsed / 50) % 360;
        container.attr(
          "transform",
          `translate(${width / 2}, ${height / 2}) rotate(${angle})`
        );
      });
    }, 2000);
  } else {
    setTimeout(() => {
      container
        .transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attrTween("transform", () =>
          d3.interpolateString(
            `translate(${width / 2}, ${height / 2}) rotate(0)`,
            `translate(${width / 2}, ${height / 2}) rotate(360)`
          )
        );
    }, 100);
  }
}
