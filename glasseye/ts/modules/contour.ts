export async function contour(
  div: string = defaultArgumentObject.div,
  data: number[][] = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
    if (file?.path) {
        data = await loadData(file?.path, file?.format);
      }

  const width = size.width;
  const height = size.height;

  const n = data.length;
  const m = data[0].length;

  // Flatten 2D data
  const values = data.reduce((acc, row) => acc.concat(row), []);

  // Create scales
  const x = d3.scaleLinear().domain([0, m]).range([0, width]);
  const y = d3.scaleLinear().domain([0, n]).range([0, height]);

  // Create color scale
  const thresholds = d3.range(d3.min(values)!, d3.max(values)!, (d3.max(values)! - d3.min(values)!) / colors.length);
  const color = d3.scaleLinear<string>().domain(thresholds).range(colors).interpolate(d3.interpolateHcl);

  // Clear existing SVG if present
  d3.select(div).select("svg").remove();

  // Append new SVG
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Generate contours
  const contours = d3.contours()
    .size([m, n])
    .thresholds(thresholds)(values);

  // Render contours
  svg.selectAll("path")
    .data(contours)
    .enter()
    .append("path")
    .attr("d", d3.geoPath(d3.geoIdentity().scale(width / m)))
    .attr("fill", (d: any) => color(d.value))
    .attr("stroke", "#333")
    .attr("stroke-width", 0.3);
}