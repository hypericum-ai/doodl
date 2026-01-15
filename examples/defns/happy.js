const defaultArgumentObject = {
  div: "body",
  data: [],
  size: { width: 400, height: 400 },
  colors: [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728",
    "#9467bd", "#8c564b", "#e377c2", "#7f7f7f",
    "#bcbd22", "#17becf"
  ]
};

async function loadData(path, format) {
  if (format === "json") {
    return d3.json(path);
  }
  if (format === "csv") {
    return d3.csv(path, d => ({
      label: d.label,
      value: +d.value
    }));
  }
  throw new Error("Unsupported data format");
}

function hamburgerMenu(div, data) {
  // no-op placeholder
}

function trackChart(name) {
  // no-op placeholder
}

/* -----------------------------
   Pie chart implementation
-------------------------------- */

async function happy(
  div = defaultArgumentObject.div,
  data = defaultArgumentObject.data,
  size = defaultArgumentObject.size,
  file,
  colors = defaultArgumentObject.colors.slice(),
  donut = 0,
  continuous_rotation = 0,
  show_percentages = 0
) {
  const { width, height } = size;
  const radius = Math.min(width, height) / 2;

  if (file && file.path) {
    data = await loadData(file.path, file.format);
  }

  const processed_data = data;

  if (colors.length < 10) {
    colors.push(...defaultArgumentObject.colors);
  }

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  hamburgerMenu(div, data);
  trackChart("piechart");

  const container = svg
    .append("g")
    .attr(
      "transform",
      `translate(${width / 2}, ${height / 2}) rotate(0)`
    );

  const color = d3
    .scaleOrdinal()
    .domain(processed_data.map(d => d.label))
    .range(colors);

  const pie = d3
    .pie()
    .value(d => d.value);

  const arc = d3
    .arc()
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
    .selectAll(".arc")
    .data(pie(processed_data))
    .enter()
    .append("g")
    .attr("class", "arc")
    .on("mouseover", function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 0.7);

      tooltip
        .style("display", "block")
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px")
        .text(d.data.label);
    })
    .on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1);

      tooltip.style("display", "none");
    });

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.label));

  arcs
    .append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "#FFFFFF")
    .text(d => {
      if (show_percentages) {
        const total = d3.sum(processed_data, d => d.value);
        const percentage = ((d.data.value / total) * 100).toFixed(1);
        return `${d.data.label} (${percentage}%)`;
      }
      return d.data.label;
    });

  if (continuous_rotation) {
    setTimeout(() => {
      d3.timer(elapsed => {
        const angle = (elapsed / 50) % 360;
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

/* expose globally */
window.happy = happy;