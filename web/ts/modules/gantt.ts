export async function gantt(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[]= defaultArgumentObject.colors,
) {

  const margin: Margin = defaultMargin;
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);;

    hamburgerMenu(div, data);

  const width = size.width - margin.left - margin.right;
  const height = size.height - margin.top - margin.bottom;

  const x = d3
    .scaleTime()
    .domain([
      d3.min(data, (d: any) => new Date(d.start)) as Date,
      d3.max(data, (d: any) => new Date(d.end)) as Date,
    ])
    .range([0, width]);

  const y = d3
    .scaleBand()
    .domain(data.map((d: any) => d.task))
    .range([0, height])
    

  svg.append("g").call(d3.axisLeft(y));

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.selectAll(".task")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "task")
    .attr("x", (d: any) => x(new Date(d.start)))
    .attr("y", (d: any) => y(d.task) as number)
    .attr("width", (d: any) => x(new Date(d.end)) - x(new Date(d.start)))
    .attr("height", y.bandwidth())
    .attr("fill", (d, i) => colors[i % colors.length]);
}
