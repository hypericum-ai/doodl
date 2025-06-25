interface PointData {
  x: number;
  y: number;
  name?: string;
}

export async function voronoi(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const points: PointData[] = data;

  d3.select(div).selectAll("*").remove();

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .style("font-family", "sans-serif");

  hamburgerMenu(div, data);

  const delaunay = d3.Delaunay.from(
    points,
    (d) => d.x,
    (d) => d.y
  );

  const voronoi = delaunay.voronoi([0, 0, size.width, size.height]);

  const color = d3
    .scaleOrdinal<string>()
    .domain(points.map((_, i) => i.toString()))
    .range(colors);

  // Draw Voronoi cells
  const cellGroup = svg.append("g").attr("class", "cells");
  const cellPaths = cellGroup
    .selectAll("path")
    .data(points)
    .join("path")
    .attr("d", (_, i) => voronoi.renderCell(i))
    .attr("fill", (_, i) => color(i.toString()))
    .attr("stroke", "#333")
    .attr("stroke-width", 1);

  // Draw circles
  const circleGroup = svg.append("g").attr("class", "points");
  const circles = circleGroup
    .selectAll("circle")
    .data(points)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 3)
    .attr("fill", "#000");

  // Draw text
  const textGroup = svg.append("g").attr("class", "labels");
  const labels = textGroup
    .selectAll("text")
    .data(points)
    .join("text")
    .attr("x", (d) => d.x + 5)
    .attr("y", (d) => d.y - 5)
    .text(
      (d) => `${d.name ?? "Point"} (${Math.round(d.x)}, ${Math.round(d.y)})`
    )
    .style("font-size", "10px")
    .style("fill", "#000");

  // Interactivity
  svg
    .selectAll("g")
    .selectAll<SVGPathElement | SVGCircleElement | SVGTextElement, PointData>(
      "path,circle,text"
    )
    .on("mouseover", function (_, d) {
      const index = points.indexOf(d);

      cellPaths
        .attr("stroke-width", (d2, i) => (i === index ? 2.5 : 1))
        .attr("stroke", (d2, i) => (i === index ? "#000" : "#333"));

      circles
        .attr("r", (d2, i) => (i === index ? 6 : 3))
        .attr("fill", (d2, i) => (i === index ? "#f00" : "#000"));

      labels
        .style("font-weight", (d2, i) => (i === index ? "bold" : "normal"))
        .style("fill", (d2, i) => (i === index ? "#d00" : "#000"));
    })
    .on("mouseout", () => {
      cellPaths.attr("stroke-width", 1).attr("stroke", "#333");
      circles.attr("r", 3).attr("fill", "#000");
      labels.style("font-weight", "normal").style("fill", "#000");
    });
}
