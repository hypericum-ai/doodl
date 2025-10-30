export async function barchart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  horizontal = 0, // 0 = Vertical, 1 = Horizontal,
  moving_average = 0,
  x_label_angle = 0,
) {
  const { width, height } = size;
  const margin: Margin = defaultMargin;

  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }
  const processed_data: DataLabeled[] = data as DataLabeled[];

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    hamburgerMenu(div, data);
    trackChart("barchart");

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xHorizontal = d3.scaleLinear().domain([0, d3.max(processed_data, (d) => d.value)!]).range([0, chartWidth]);

  const xVertical = d3.scaleBand().domain(processed_data.map((d) => d.label)).range([0, chartWidth]).padding(0.2);

  const yHorizontal =  d3.scaleBand().domain(processed_data.map((d) => d.label)).range([0, chartHeight]).padding(0.2);

  const yVertical = d3.scaleLinear().domain([0, d3.max(processed_data, (d) => d.value)!]).range([chartHeight, 0]);

  // Draw X axis
  const xAxis = svg.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(horizontal ? d3.axisBottom(xHorizontal) : d3.axisBottom(xVertical));

  if (x_label_angle !== 0) {
  xAxis.selectAll("text")
    .attr("transform", `rotate(${x_label_angle})`)
    .style("text-anchor", x_label_angle > 0 ? "start" : "end")
    .attr("dx", x_label_angle === 90 ? "0.8em" : "0")   // push horizontally if vertical
    .attr("dy", x_label_angle === 90 ? "0" : "1.5em");  // only apply dy if not 90
}

  // Draw Y axis
  svg.append("g").call(horizontal ? d3.axisLeft(yHorizontal) : d3.axisLeft(yVertical));

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

  // Draw bars
  svg.selectAll(".bar")
    .data(processed_data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => {
      if (horizontal) {
        return 0;
      } else {
        return xVertical(d.label)!;
      }
    })
    .attr("y", (d) => {
      if (horizontal) {
        return yHorizontal(d.label)!;
      } else {
        return yVertical(0); // Start at baseline
      }
    })
    .attr("width", (d) => {
      if (horizontal) {
        return 0; // Start with zero width
      } else {
        return xVertical.bandwidth();
      }
    })
    .attr("height", (d) => {
      if (horizontal) {
        return yHorizontal.bandwidth();
      } else {
        return 0; // Start with zero height
      }
    })
    .attr("fill", colors[0])
    .on("mouseover", function (event, d: any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      tooltip
        .style("display", "block")
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY}px`)
        .text(d.label);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      tooltip.style("display", "none");
    })
    .transition()
    .duration(800)
    .attr("width", (d) => {
      if (horizontal) {
        return xHorizontal(d.value);
      } else {
        return xVertical.bandwidth();
      }
    })
    .attr("height", (d) => {
      if (horizontal) {
        return yHorizontal.bandwidth();
      } else {
        return chartHeight - yVertical(d.value);
      }
    })
    .attr("y", (d) => {
      if (!horizontal) {
        return yVertical(d.value);
      } else {
        return yHorizontal(d.label)!;
      }
    });

  // Draw moving average line if requested
  if (moving_average > 0) {
    const values = processed_data.map(d => d.value);
    const avgValues = values.map((_, i, arr) => {
      const start = Math.max(0, i - moving_average + 1);
      const subset = arr.slice(start, i + 1);
      return d3.mean(subset)!;
    });

    if (!horizontal) {
      const line = d3.line<number>()
        .x((_, i) => xVertical(processed_data[i].label)! + xVertical.bandwidth() / 2)
        .y((d) => yVertical(d))
        .curve(d3.curveMonotoneX);

      svg.append("path")
        .datum(avgValues)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", line);
    } else {
      const line = d3.line<number>()
        .x((d) => xHorizontal(d))
        .y((_, i) => yHorizontal(processed_data[i].label)! + yHorizontal.bandwidth() / 2)
        .curve(d3.curveMonotoneY);

      svg.append("path")
        .datum(avgValues)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", line);
    }
  }
}