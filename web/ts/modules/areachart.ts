export async function areachart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  curved = 0
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }
  
  d3.select(div).selectAll("*").remove();

  const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  const width = size.width - margin.left - margin.right;
  const height = size.height - margin.top - margin.bottom;

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  hamburgerMenu(div, data);
  trackChart("areachart");

  const xValues = data.map((d: any) => d.x);
  const firstX = xValues[0];

  // Type guards
  const isDateArray = firstX instanceof Date;
  const isNumberArray = typeof firstX === "number";
  const isStringArray = typeof firstX === "string";

  // Declare generic scale variable
  let xScale:
    | d3.ScaleTime<number, number>
    | d3.ScaleLinear<number, number>
    | d3.ScalePoint<string>;

  if (isDateArray) {
    const domain = d3.extent(xValues as Date[]).filter(
      (d): d is Date => d instanceof Date
    );
    xScale = d3
      .scaleTime()
      .domain(domain.length === 2 ? domain : [new Date(), new Date()])
      .range([0, width]);
  } else if (isNumberArray) {
    const domain = d3.extent(xValues as number[]).filter(
      (d): d is number => typeof d === "number"
    );
    xScale = d3
      .scaleLinear()
      .domain(domain.length === 2 ? domain : [0, 1])
      .range([0, width]);
  } else if (isStringArray) {
    xScale = d3
      .scalePoint()
      .domain(xValues as string[])
      .range([0, width])
      .padding(0.5);
  } else {
    throw new Error("Unsupported x value type");
  }

  // Y scale (always numeric)
  const yMax = d3.max(data, (d: any) => +d.y) ?? 0;
  const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

  // Area generator
  const area = d3
    .area<any>()
    .x((d) => {
      if (xScale instanceof d3.scalePoint) {
        return xScale(d.x)!;
      }
      return (xScale as any)(d.x) ?? 0;
    })
    .y0(height)
    .y1((d) => yScale(d.y))
    .curve(curved ? d3.curveMonotoneX : d3.curveLinear);

  // Draw area
  svg
    .append("path")
    .datum(data)
    .attr("fill", colors[0] || "steelblue")
    .attr("d", area);

  // X axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale as any));

  // Y axis
  svg.append("g").call(d3.axisLeft(yScale));

}
