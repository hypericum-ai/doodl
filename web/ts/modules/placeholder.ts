export async function placeholder(
  div: string = defaultArgumentObject.div,
  size: Size = defaultArgumentObject.size,
  colors: string[],
  chartName: string = ""
) {
    const { width, height } = size;

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Draw simple cat
  const centerX = width / 2;
  const centerY = height / 2;

  // Head
  svg.append("circle")
    .attr("cx", centerX)
    .attr("cy", centerY)
    .attr("r", 60)
    .attr("fill", colors?.[0] ?? "#999");

  // Left ear
  svg.append("polygon")
    .attr("points", `${centerX - 40},${centerY - 40} ${centerX - 10},${centerY - 120} ${centerX - 80},${centerY - 80}`)
    .attr("fill", colors?.[1] ?? "#888");

  // Right ear
  svg.append("polygon")
    .attr("points", `${centerX + 40},${centerY - 40} ${centerX + 10},${centerY - 120} ${centerX + 80},${centerY - 80}`)
    .attr("fill", colors?.[1] ?? "#888");

  // Eyes
  svg.append("circle")
    .attr("cx", centerX - 20)
    .attr("cy", centerY - 10)
    .attr("r", 10)
    .attr("fill", "#000");

  svg.append("circle")
    .attr("cx", centerX + 20)
    .attr("cy", centerY - 10)
    .attr("r", 10)
    .attr("fill", "#000");

  // Nose
  svg.append("circle")
    .attr("cx", centerX)
    .attr("cy", centerY + 10)
    .attr("r", 6)
    .attr("fill", "#000");

  // Body
  svg.append("ellipse")
    .attr("cx", centerX)
    .attr("cy", centerY + 120)
    .attr("rx", 80)
    .attr("ry", 100)
    .attr("fill", colors?.[2] ?? "#aaa");

  // Premium chart text
  svg.append("text")
    .attr("x", centerX)
    .attr("y", centerY + 260)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("fill", "#555")
    .text(`${chartName} is a premium chart, upgrade to use it`);
}