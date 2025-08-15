export async function chord(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;

  const innerRadius = Math.min(width, height) * 0.4;
  const outerRadius = innerRadius + 20;

  const color = d3.scaleOrdinal(colors || d3.schemeCategory10);

  const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const ribbon = d3.ribbon().radius(innerRadius);

  const chords = chord(data);

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    hamburgerMenu(div, data);

    const container = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(0)`);

  // Draw arcs
  const group = container
    .append("g")
    .selectAll("g")
    .data(chords.groups)
    .enter()
    .append("g");

  group
    .append("path")
    .attr("d", arc as any)
    .style("fill", (_, i) => color(i.toString()))
    .style("stroke", "#000");

  group
    .append("text")
    .attr("dy", ".35em")
    .attr("x", (d) => (outerRadius + 5) * Math.cos((d.startAngle + d.endAngle) / 2 - Math.PI / 2))
    .attr("y", (d) => (outerRadius + 5) * Math.sin((d.startAngle + d.endAngle) / 2 - Math.PI / 2))
    .attr("text-anchor", (d) => ((d.startAngle + d.endAngle) / 2 > Math.PI ? "end" : "start"))
    .text((d, i) => `Group ${i}`)
    .style("font-size", "12px")
    .style("fill", "#000");

  group
    .append("title")
    .text((d, i) => `Group ${i}: ${d.value}`);

  // Draw ribbons
  container
    .append("g")
    .selectAll("path")
    .data(chords)
    .enter()
    .append("path")
    .attr("d", ribbon as any)
    .style("fill", (d) => color(d.source.index.toString()))
    .style("stroke", "#000");

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
