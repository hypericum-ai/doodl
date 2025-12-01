export async function piegrid(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  show_percentages?: 0,
  columns?: 3,
) {
    if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }
  d3.select(div).selectAll("*").remove();

  
  const width = size?.width ?? 700;
  const height = size?.height ?? 400;
  const cols = columns ?? 3;
  const cellW = width / cols;
  const cellH = 200;

  
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)

   hamburgerMenu(div, data);
  trackChart("piechart");

  const total = d3.sum(data, (d: any) => d.value);

 
  const radius = 55;
  const arc = d3
    .arc()
    .innerRadius(radius - 10)
    .outerRadius(radius);

  const backgroundArc = d3
    .arc()
    .innerRadius(radius - 10)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(2 * Math.PI);

  
  const colorScale = d3.scaleOrdinal(colors);

 
  data.forEach((d: any, i: number) => {
    const percent = d.value / total;
    const angle = percent * 2 * Math.PI;
    // Position in grid
    const col = i % cols;
    const row = Math.floor(i / cols);

    const cx = col * cellW + cellW / 2;
    const cy = row * cellH + 90;
    const cy = row * cellH + 90;

    const g = svg.append("g").attr("transform", `translate(${cx}, ${cy})`);

    
    g.append("path")
      .attr("d", backgroundArc as any)
      .attr("fill", "#2b2b2f");

    
    g.append("path")
      .attr(
        "d",
        arc.startAngle(0).endAngle(angle) as any
      )
      .attr("fill", colorScale(i.toString()));

    
    if (show_percentages) {
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-0.3em")
        .attr("font-size", "16px")
        .attr("fill", "#fff")
        .text(Math.round(percent * 100) + "%");
    }

   
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.2em")
      .attr("font-size", "12px")
      .attr("fill", "#aaa")
      .text(d.label);

    
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "2.6em")
      .attr("font-size", "12px")
      .attr("fill", "#777")
      .text(`Total: ${d.value.toLocaleString()}`);
  });
}