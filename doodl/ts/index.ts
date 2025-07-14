// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!
// Generated Mon Jul 14 18:30:31 CAT 2025


/// base.ts

import * as d3 from "d3";
import {
  sankey,
  sankeyLinkHorizontal,
  SankeyGraph,
  sankeyLeft,
  sankeyRight,
  sankeyCenter,
  sankeyJustify,
} from "d3-sankey";
import { SimulationNodeDatum } from "d3";
import { Contours } from "d3-contour";
import { HierarchyCircularNode } from "d3";

interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface DataPoint {
  x: number;
  y: number;
}

interface DataLabeled {
  label: string;
  value: number;
}

interface Size {
  width: number;
  height: number;
}

interface DataFile {
  path: string;
  format: string;
}

// DataNode is used for Venn diagrams

interface DataNode {
  name?: string;
  size?: number;
  children?: DataNode[];
}

interface ArgumentObject {
  data: any;
  div: string;
  size: Size;
  colors: string[];
  file?: DataFile;
}

interface Join extends Leaf {
  height?: number;
  children?: Join[];
}

interface Leaf {
  name?: string;
  id?: number;
  size?: number;
  score?: number;
}

const defaultMargin: Margin = { top: 20, bottom: 20, left: 20, right: 20 };
const defaultSize: Size = { width: 300, height: 300 };

const defaultArgumentObject: ArgumentObject = {
  data: [],
  div: "chart_",
  size: defaultSize,
  colors: ["#081F36", "#004E98", "#1D5E9F", "#C0C0C0", "#EBEBEB", "#FF6700"],
};

const formatters: { [key: string]: Function } = {
  csv: d3.csv,
  tsv: d3.tsv,
  json: d3.json,
  txt: d3.text,
  hsv: (path: string) => d3.dsv("#", path),
};

async function loadData(path: string, format: string = ""): Promise<any> {
  if (format == "") {
    format = path.split(".").slice(-1)[0];
  }
  if (!(format in formatters)) {
    console.log(`Invalid file format ${format}`);
    return [];
  }

  const data = await formatters[format](path);
  return data;
}

interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
}

type InterpGamma = typeof d3.interpolateRgb;
type InterpPair = typeof d3.interpolateHsl;
type InterpList = typeof d3.interpolateRgbBasis;

const interpolaters: Record<string, InterpList | InterpPair | InterpGamma> = {
  rgb: d3.interpolateRgb,
  hsl: d3.interpolateHsl,
  hslLong: d3.interpolateHslLong,
  lab: d3.interpolateLab,
  rgbBasis: d3.interpolateRgbBasis,
  rgbBasisClosed: d3.interpolateRgbBasisClosed,
};

function color_interp(args: any) {
  let interp_name: string = args["interp"] || "rgb";

  if (!interpolaters.hasOwnProperty(interp_name)) {
    console.log(`invalid interpreter ${interp_name}; using rgb`);
    interp_name = "rgb";
  }

  const colors: string[] = args["colors"] || [];

  switch (interp_name) {
    case "rgbBasis":
    case "rgbBasisClosed":
      const list_interp = interpolaters[interp_name] as InterpList;
      return list_interp(colors);
    case "rgb":
      let gamma_interp = interpolaters[interp_name] as InterpGamma;
      const gamma = args["gamma"] ?? 0;

      if (gamma > 0) {
        gamma_interp = gamma_interp.gamma(gamma);
      }

      return gamma_interp(colors[0], colors[1]);
    default:
      const pair_interp = interpolaters[interp_name] as InterpPair;
      return pair_interp(colors[0], colors[1]);
  }
}

function downloadSvgAsImage(
  svgElement: SVGSVGElement,
  filename: string = "image.png"
) {
  const extension = filename.slice(filename.lastIndexOf(".")).replace(".", "");
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);

  // Add XML namespace if missing
  const svgData = svgString.includes("xmlns")
    ? svgString
    : svgString.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');

  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  if (extension === "svg") {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    return;
  }

  const img = new Image();
  const width = svgElement.clientWidth;
  const height = svgElement.clientHeight;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas context is not available.");
      return;
    }

    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);

    canvas.toBlob((blob) => {
      if (blob) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }, `image/${extension}`);
  };

  img.src = url;
}

function downloadAsJson(data: object | any[], filename: string = "data.json") {
  const jsonStr = JSON.stringify(data, null, 2); // pretty print with 2-space indent
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

function hamburgerMenu(div: string = "", data: object | any[] = []) {
  if (div.length <= 0) {
    console.error("Error,No div element specified.");
    return;
  }

  const mnu = d3.select(div).append("div").attr("width", 50).attr("height", 50);

  const divDropdown = mnu.append("div").attr("class", "dropdown");

  const mnuBtn = divDropdown.append("button").attr("class", "dropdown-button");

  const hamburger = mnuBtn.append("span").attr("class", "hamburger");

  const dropdownContent = divDropdown
    .append("div")
    .attr("class", "dropdown-content");

  const links = [
    { label: "Download PNG", ext: "png" },
    { label: "Download JPEG", ext: "jpg" },
    { label: "Download SVG", ext: "svg" },
  ];

  for (const link of links) {
    dropdownContent
      .append("a")
      .text(link.label)
      .on("click", function (event) {
        const divIdWithoutHash = div.replace("#", "");
        const span = document.getElementById(divIdWithoutHash);
        const svg_td = span?.querySelector("svg");
        if (svg_td instanceof SVGSVGElement) {
          downloadSvgAsImage(svg_td, `${divIdWithoutHash}.${link.ext}`);
        }
      });
  }

  dropdownContent
    .append("a")
    .text("Download JSON data")
    .on("click", function (event) {
      const divIdWithoutHash = div.replace("#", "");
      downloadAsJson(data, `${divIdWithoutHash}.json`);
    });
}

/// barchart.ts

export async function barchart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  horizontal = 0 // 0 = Vertical, 1 = Horizontal
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

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xHorizontal = d3.scaleLinear().domain([0, d3.max(processed_data, (d) => d.value)!]).range([0, chartWidth]);

  const xVertical = d3.scaleBand().domain(processed_data.map((d) => d.label)).range([0, chartWidth]).padding(0.2);

  const yHorizontal =  d3.scaleBand().domain(processed_data.map((d) => d.label)).range([0, chartHeight]).padding(0.2);

  const yVertical = d3.scaleLinear().domain([0, d3.max(processed_data, (d) => d.value)!]).range([chartHeight, 0]);

  // Draw X axis
  svg.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(horizontal ? d3.axisBottom(xHorizontal) : d3.axisBottom(xVertical));

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
}
/// bollinger.ts

export function bollinger(
  div: string = "",
  data: any,
  size?: any,
  colors: string[] = []
) {
  const width = size.width,
    height = size.height;

  // Parse data
  const parsedData = data.map((d: any) => ({
    date: new Date(d.date),
    close: d.close,
    upper: d.upper,
    lower: d.lower,
    movingAvg: d.movingAvg,
  }));

  // Create scales
  const dateExtent = d3.extent(parsedData, (d: any) => d.date) as [
    Date | undefined,
    Date | undefined
  ];
  const validDateExtent: [Date, Date] =
    dateExtent[0] && dateExtent[1]
      ? [dateExtent[0], dateExtent[1]]
      : [new Date(), new Date()];

  const x = d3.scaleTime().domain(validDateExtent).range([0, width]);

  const yMin = d3.min(parsedData, (d: any) => Number(d.lower)) ?? 0;
  const yMax = d3.max(parsedData, (d: any) => Number(d.upper)) ?? 100;

  const y = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

  // Line generators
  const line = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.movingAvg));

  const upperBand = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.upper));

  const lowerBand = d3
    .line<any>()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.lower));

  // Create SVG
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

    hamburgerMenu(div, data);

  // Draw bands
  svg
    .append("path")
    .datum(parsedData)
    .attr("fill", "none")
    .attr("stroke", colors[0] || "#ff0000")
    .attr("stroke-width", 1.5)
    .attr("d", upperBand);

  svg
    .append("path")
    .datum(parsedData)
    .attr("fill", "none")
    .attr("stroke", colors[1] || "#0000ff")
    .attr("stroke-width", 1.5)
    .attr("d", lowerBand);

  svg
    .append("path")
    .datum(parsedData)
    .attr("fill", "none")
    .attr("stroke", colors[2] || "#00ff00")
    .attr("stroke-width", 2)
    .attr("d", line);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .append("text")
    .attr("x", width / 2)
    .attr("y", 50) // Increase y position for visibility
    .attr("fill", "black")
    .attr("font-size", "14px") // Ensure readable font size
    .attr("font-weight", "bold") // Make it more prominent
    .attr("text-anchor", "middle")
    .text("Date");

  svg.append("g")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -50) // Adjust position for visibility
    .attr("fill", "red")
    .attr("font-size", "14px") // Ensure readable font size
    .attr("font-weight", "bold") // Make it more prominent
    .attr("text-anchor", "middle")
    .text("Price");
}

/// boxplot.ts

export async function boxplot(
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
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove previous SVG if exists
  d3.select(div).select("svg").remove();

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

    hamburgerMenu(div, data);

  // Compute summary statistics (quartiles, median, min, max)
  const groupedData = d3.group(data, (d: any) => d.category);
  const summaryData = Array.from(groupedData, ([key, values]) => {
    const sorted = values.map((d: any) => +d.value).sort(d3.ascending);
    const q1 = d3.quantile(sorted, 0.25) as number;
    const median = d3.quantile(sorted, 0.5) as number;
    const q3 = d3.quantile(sorted, 0.75) as number;
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    return { category: key, min, q1, median, q3, max };
  });

  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(summaryData.map((d) => d.category))
    .range([0, width])
    .padding(0.5);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(summaryData, (d) => d.min) as number, d3.max(summaryData, (d) => d.max) as number])
    .nice()
    .range([height, 0]);

  // Draw box plot elements
  const boxWidth = xScale.bandwidth() * 0.6;


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

  const boxplotGroups = svg
    .selectAll(".boxplot")
    .data(summaryData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${xScale(d.category)!},0)`)
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(d.category);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      tooltip.style("display", "none");
    });

  // Draw vertical lines (min to max)
  boxplotGroups
    .append("line")
    .attr("y1", (d) => yScale(d.min))
    .attr("y2", (d) => yScale(d.max))
    .attr("x1", xScale.bandwidth() / 2)
    .attr("x2", xScale.bandwidth() / 2)
    .attr("stroke", "black")
    

  // Draw rectangles for the interquartile range (IQR)
  boxplotGroups
    .append("rect")
    .attr("y", (d) => yScale(d.q3))
    .attr("height", (d) => yScale(d.q1) - yScale(d.q3))
    .attr("width", boxWidth)
    .attr("x", (xScale.bandwidth() - boxWidth) / 2)
    .attr("stroke", "black")
    .attr("fill", (d, i) => colors[i % colors.length]);

  // Draw median lines
  boxplotGroups
    .append("line")
    .attr("y1", (d) => yScale(d.median))
    .attr("y2", (d) => yScale(d.median))
    .attr("x1", (xScale.bandwidth() - boxWidth) / 2)
    .attr("x2", (xScale.bandwidth() + boxWidth) / 2)
    .attr("stroke", "black");

  // Add X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add Y Axis
  svg.append("g").call(d3.axisLeft(yScale));
}
/// chord.ts

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

/// dotplot.ts

export async function dotplot(
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
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove previous SVG if exists
  d3.select(div).select("svg").remove();

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

    hamburgerMenu(div, data);

  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d: any) => d.category))
    .range([0, width])
    .padding(0.5);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => Number(d.value)) as number])
    .nice()
    .range([height, 0]);

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

  // Define dots
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => xScale(d.category)! + xScale.bandwidth() / 2)
    .attr("cy", (d: any) => yScale(d.value))
    .attr("r", 5)
    .attr("fill", (d, i) => colors[i % colors.length])
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      d3.select(this).transition().duration(200).attr("r", 7);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(`${d.category}-${d.value}`);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      d3.select(this).transition().duration(200).attr("r", 5);
      tooltip.style("display", "none");
    });

  // Add X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add Y Axis
  svg.append("g").call(d3.axisLeft(yScale));
}
/// force.ts

export async function force(
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
  const viewScaleFactor = 1.5;

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width/viewScaleFactor, height/viewScaleFactor])
    .attr("style", "max-width: 100%; height: auto;");

    hamburgerMenu(div, data);

  const simulation = d3
    .forceSimulation<Node>(data.nodes)
    .force("link", d3.forceLink<Node, Link>(data.links).id((d:any) => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6);

  const node = svg
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", (d:any, i) => colors[d.group % colors.length])
    .call(
      d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  simulation.on("tick", () => {
    link
      .attr("x1", (d:any) => (d.source as Node).x!)
      .attr("y1", (d:any) => (d.source as Node).y!)
      .attr("x2", (d:any) => (d.target as Node).x!)
      .attr("y2", (d:any) => (d.target as Node).y!);

    node.attr("cx", (d:any) => d.x!).attr("cy", (d:any) => d.y!);
  });
}
/// gantt.ts

export async function gantt(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[]= defaultArgumentObject.colors,
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height);

    hamburgerMenu(div, data);

  
  const margin = defaultMargin;
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
    .padding(0.2);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g").call(d3.axisLeft(y));

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  g.selectAll(".task")
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

/// heatmap.ts

export async function heatmap(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  show_legend = 0,
  interp = "rgb",
  gamma = 0
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove previous SVG if exists
  d3.select(div).select("svg").remove();

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    hamburgerMenu(div, data);

  const zoomGroup = svg
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

  // Extract unique X and Y categories
  const xCategories = Array.from(
    new Set(data.map((d: any) => d.x))
  ) as string[];
  const yCategories = Array.from(
    new Set(data.map((d: any) => d.y))
  ) as string[];

  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(xCategories)
    .range([0, width])
    .padding(0.05);
  const yScale = d3
    .scaleBand()
    .domain(yCategories)
    .range([height, 0])
    .padding(0.05);
  // const colorScale = d3.scaleLinear().range(colors) .domain([d3.min(data, (d: any) => +d.value) as number, d3.max(data, (d: any) => +d.value) as number])
  const colorScale = d3
    .scaleSequential(
      color_interp({
        colors: colors,
        interp: interp,
        gamma: gamma,
      })
    )
    .domain([
      d3.min(data, (d: any) => +d.value) as number,
      d3.max(data, (d: any) => +d.value) as number,
    ]);

  // Add X Axis
  zoomGroup
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickSize(0))
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)")
    .select(".domain")
    .remove();

  // Add Y Axis
  zoomGroup
    .append("g")
    .call(d3.axisLeft(yScale).tickSize(0))
    .select(".domain")
    .remove();

  // Add heatmap squares
  zoomGroup
    .selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => xScale(d.x)!)
    .attr("y", (d: any) => yScale(d.y)!)
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", (d: any) => colorScale(d.value));

  if (show_legend > 0) {
    // Add color legend
    const legendWidth = 200,
      legendHeight = 10;
    const legendSvg = svg
      .append("g")
      .attr("transform", `translate(${width - legendWidth}, -30)`);

    legendSvg
      .append("text")
      .attr("x", legendWidth / 2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("color", "#000")
      .text("Legend");

    const legendScale = d3
      .scaleLinear()
      .domain(colorScale.domain())
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale).ticks(5);

    const legendGradient = legendSvg
      .append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    legendGradient
      .selectAll("stop")
      .data([
        { offset: "0%", color: colors[0] },
        { offset: "100%", color: colors[1] },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    legendSvg
      .append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight * 2.5)
      .style("fill", "url(#legend-gradient)");

    legendSvg
      .append("g")
      .attr("transform", `translate(0, ${legendHeight})`)
      .call(legendAxis);
  }

  const zoom = d3
    .zoom()
    .scaleExtent([1, 5]) // Min and max zoom levels
    .translateExtent([
      [0, 0],
      [svgWidth, svgHeight],
    ]) // Restrict panning
    .on("zoom", (event) => {
      zoomGroup.attr("transform", event.transform);
    });

  svg.call(
    zoom as unknown as (
      selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
    ) => void
  );
}

/// linechart.ts



export async function linechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file: DataFile | null = null,
  colors: string[],
  curved = 0
) {
  const { width, height } = size;
  const margin:Margin = defaultMargin;

  if(file?.path)
  {
    data = await loadData(file?.path, file?.format);
  }
  const processed_data:DataPoint[] = data as DataPoint[];

  // Select the container div and clear any existing SVG
  const container = d3.select(div);
  container.selectAll("*").remove();

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    hamburgerMenu(div, data);

  // Define X and Y scales
  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(processed_data, (d: DataPoint) => d.x) ?? 0,
      d3.max(processed_data, (d: DataPoint) => d.x) ?? 0,
    ])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(processed_data, (d: DataPoint) => d.y) ?? 0])
    .range([height - margin.bottom, margin.top]);

  // Create the line generator
  const line = d3
    .line<DataPoint>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(curved ? d3.curveMonotoneX : d3.curveLinear);

  // Append the line path with animation
  const path = svg
    .append("path")
    .datum(processed_data)
    .attr("fill", "none")
    .attr("stroke", colors[0])
    .attr("stroke-width", 2)
    .attr("d", line);

  const totalLength = (path.node() as SVGPathElement).getTotalLength();

  path
    .attr("stroke-dasharray", totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);

  // Append X axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).ticks(6));

  // Append Y axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));
}
/// piechart.ts

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

/// scatterplot.ts

export async function scatterplot(
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
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove previous SVG if exists
  d3.select(div).select("svg").remove();

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

    hamburgerMenu(div, data);

  // Define scales
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => +d.x) || 0])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => +d.y) || 0])
    .range([height, 0]);


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

  // Add X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add Y Axis
  svg.append("g").call(d3.axisLeft(yScale));

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => xScale(+d.x))
    .attr("cy", (d: any) => yScale(+d.y))
    .attr("r", 5)
    .style("fill", (d, i) => colors[i % colors.length])
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      d3.select(this).transition().duration(200).attr("r", 7);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(`${d.x}-${d.y}`);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      d3.select(this).transition().duration(200).attr("r", 5);
      tooltip.style("display", "none");
    });
}
/// skey.ts

export  async function skey(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[]= defaultArgumentObject.colors,
  link_color = "source-target", //options are 0 or 1
  node_align = "right", //options are left,right,center,justify
) {

  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const nodeWidth = 20;
  const nodePadding = 10;

  // Set up SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

    hamburgerMenu(div, data);

  // Define Sankey generator
  const sankeyGenerator = sankey<any, any>()
    .nodeId(d => d.name)
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .extent([
      [0, 0],
      [width, height],
    ]);

  switch (node_align) {
    case "left":
      sankeyGenerator.nodeAlign(sankeyLeft);
      break;
    case "right":
        sankeyGenerator.nodeAlign(sankeyRight);
        break;
    case "center":
        sankeyGenerator.nodeAlign(sankeyCenter);
        break;
    case "justify":
        sankeyGenerator.nodeAlign(sankeyJustify);
        break;
    default:
      sankeyGenerator.nodeAlign(sankeyLeft);
      break;
  }

  // Process the data
  const graph: SankeyGraph<any, any> = sankeyGenerator(data);

  // Color scale
  const color = d3.scaleOrdinal(
    data.nodes.map((d: any) => d.name),
    colors
  )

  // Draw Links
  const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
    .selectAll()
    .data(graph.links)
    .join("g")
      .style("mix-blend-mode", "multiply");

    let counter = 0;
    function generateUid(prefix = "id") {
        return `${prefix}-${++counter}`;
    }

    // console.log(graph.links)

    if (link_color == "source-target") {
      const gradient = link.append("linearGradient")
      .attr("id", (d: any) => (d.uid = generateUid()))
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", (d: any) => d.source.x1)
          .attr("x2", (d: any) => d.target.x0);
      gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", (d: any) => color(d.source.name));
      gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", (d: any) => color(d.target.name));
    }


    link.append("path")
    .attr("d", sankeyLinkHorizontal())
    .attr("stroke", link_color == "source-target"? (d: any) => `url(#${d.uid})` : (d: any) => color(d.source.name) || "#999")
    .attr("stroke-width", (d: any) => Math.max(1, d.width));

  // Draw Nodes
  const node = svg
    .append("g")
    .selectAll("rect")
    .data(graph.nodes)
    .enter()
    .append("rect")
    .attr("x", (d: any) => d.x0)
    .attr("y", (d: any) => d.y0)
    .attr("height", (d: any) => d.y1 - d.y0)
    .attr("width", sankeyGenerator.nodeWidth())
    .attr("fill", (d: any) => color(d.name))
    .attr("stroke", "#666A6D")
    .attr("stroke-width", 1);

  // Add Node Labels
  node
    .append("title")
    .text((d: any) => `${d.name}\n${d.value}`);

  svg
    .append("g")
    .selectAll("text")
    .data(graph.nodes)
    .enter()
    .append("text")
    .attr("x", (d: any) => d.x0 == 0 ? nodeWidth + 6 : d.x0 - 6)
    .attr("y", (d: any) => (d.y0 + d.y1) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", (d: any) => d.x0 == 0 ? "start" : "end")
    .attr("font-size", "smaller")
    .text((d: any) => d.name)
    .attr("fill", "#000");

  return svg.node();
}
/// tree.ts

export async function tree(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  vertical = 0
) {
  
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove existing SVG if present
  d3.select(div).select("svg").remove();

  // Create SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0}, ${margin?.top || 0})`);

    hamburgerMenu(div, data);

  // Create hierarchical data structure
  const root = d3.hierarchy(data);

  // Create a tree layout
  const layoutSize : [number, number] = vertical ? [width, height - 100] : [height,  width- 100] ;
  const treeLayout = d3.tree().size(layoutSize);
  treeLayout(root);

  // Define a link generator (curved lines)
  const linkGenerator = vertical
    ?
     d3
    .linkVertical()
    .x((d:any) => (d as d3.HierarchyPointNode<any>).x)
    .y((d:any) => (d as d3.HierarchyPointNode<any>).y)
    :
    d3
    .linkHorizontal()
    .x((d:any) => (d as d3.HierarchyPointNode<any>).y)
    .y((d:any) => (d as d3.HierarchyPointNode<any>).x)
    ;

  // Draw links (lines between nodes)
  svg
    .selectAll("path.link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", (d:any) => linkGenerator(d)!)
    .style("fill", "none")
    .style("stroke",colors[0])
    .style("stroke-width", 2)
    .on("mouseover", function (event, d) {
      
      d3.select(this).transition().duration(200).attr("stroke-width", 1).style("fill", colors[colors.length-1]);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("stroke-width", 2).style("fill", "none");
    })
    ;

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

  let children_store:any[] = [];
  const node_radius = 6;

  // Draw nodes (circles)
  const nodes = svg
    .selectAll("g.node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${vertical? d.x: d.y},${vertical ? d.y: d.x})`)
    .on("mouseover", function (event, d) {
      
      d3.select(this).select("circle").transition().duration(200).attr("r", node_radius * 2).style("fill", colors[colors.length-1]);

     
      tooltip
        .style("display", "block")
        .style("left", `${event.pageX + node_radius * 3}px`)
        .style("top", `${event.pageY - node_radius * 4}px`)
        .text(d.data.name);
    })
    .on("mouseout", function () {
      d3.select(this).select("circle").transition().duration(200).attr("r", node_radius).style("fill", (_, i) => colors[i % colors.length]);

      tooltip.style("display", "none");
    })
    .on("click", function (event, d) {
      console.log("Clicked node:", d.data);

      // 🌟 Expand/Collapse nodes on click
      if (d.children) {
        children_store = d.children;
        d.children = undefined;
      } else {
        d.children = children_store;
        children_store = [];
      }

      // Redraw tree with updated structure
      tree(div, data, size, file, colors, vertical);
    });

  nodes
    .append("circle")
    .attr("r", node_radius)
    .style("fill", (d, i) => colors[i % colors.length])
    .style("stroke", colors[0])
    .style("stroke-width", 1.5);

  // Add text labels
  nodes
    .append("text")
    .attr("dy", -10) // Position text slightly above nodes
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("fill", colors[0])
    .text((d) => d.data.name);
}
/// treemap.ts

export async function treemap(
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
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);
 // Remove previous SVG if exists
 d3.select(div).select("svg").remove();

 // Create hierarchical data structure
 const root = d3.hierarchy(data).sum((d: any) => d.value);

 // Apply the treemap layout BEFORE accessing `leaves()`
 const treemapRoot = d3.treemap<any>().size([width, height]).padding(2)(root);

 // Now leaves() returns `HierarchyRectangularNode<T>`, which has `x0, y0, x1, y1`
 const leaves = treemapRoot.leaves();

 // Define color scale
 const colorScale = d3.scaleOrdinal<string>().domain(leaves.map(d => d.data.name)).range(colors);

 // Create SVG
 const svg = d3
   .select(div)
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight)
   .append("g")
   .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

   hamburgerMenu(div, data);

 // Add rectangles
 svg
   .selectAll("rect")
   .data(leaves)
   .enter()
   .append("rect")
   .attr("x", (d) => d.x0)
   .attr("y", (d) => d.y0)
   .attr("width", (d) => d.x1 - d.x0)
   .attr("height", (d) => d.y1 - d.y0)
   .style("fill", (d) => colorScale(d.data.name))
   .style("stroke", "#FFFFFF")
   .on("mouseover", function (event, d:any) {
    d3.select(this).transition().duration(200).style("opacity", 0.7);
  })
  .on("mouseout", function () {
    d3.select(this).transition().duration(200).style("opacity", 1);
  });

 // Add labels
 svg
   .selectAll("text")
   .data(leaves)
   .enter()
   .append("text")
   .attr("x", (d) => d.x0 + (d.x1 - d.x0) / 2) // Center horizontally
   .attr("y", (d) => d.y0 + (d.y1 - d.y0) / 2) // Center vertically
   .attr("text-anchor", "middle") // Align text in the center
   .attr("dominant-baseline", "middle") // Align text vertically
   .attr("font-size", "16px")
   .attr("fill", "#FFFFFF")
   .text((d) => d.data.name);
}

/// venn.ts

export async function venn(
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
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove existing SVG if present
  d3.select(div).select("svg").remove();

  // Create SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${svgWidth / 2}, ${svgHeight / 2})`);

    hamburgerMenu(div, data);

  // Define a pack layout to determine circle positions
  const pack = d3.pack<DataNode>().size([width, height]).padding(10);

  // Convert data to a hierarchy structure
  const root = d3.hierarchy<DataNode>(data).sum((d: any) => d.size);

  // Apply pack layout to get node positions
  const nodes = pack(root).leaves();

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

  // Draw circles
  svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x - width / 2) // Center circles
    .attr("cy", (d) => d.y - height / 2)
    .attr("r", (d) => d.r)
    .style("fill", (d, i) => colors[i % colors.length])
    .style("opacity", 0.7)
    .style("stroke", colors[0])
    .style("stroke-width", 1.5)
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 1);
      d3.select(this).transition().duration(200).attr("r", (d:any) => d.r * 1.05);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(d.data.name);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      d3.select(this).transition().duration(200).attr("r", (d:any) => d.r);
      tooltip.style("display", "none");
    });

  // Add text labels
  svg
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("x", (d) => d.x - width / 2)
    .attr("y", (d) => d.y - height / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("fill", colors[0])
    .style("font-size", "14px")
    .text((d:any) => d.data.name);
}
/// disjoint.ts

// Adapted from https://observablehq.com/@d3/disjoint-force-directed-graph/2

export async function disjoint(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
    if (file?.path) {
        data = await loadData(file?.path, file?.format);
    }

    // Specify the dimensions of the chart.
    const { width, height } = size;
    const viewScaleFactor = 1.5;

    // Specify the color scale.
    const color = d3.scaleOrdinal(colors);

    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink<Node, Link>(data.links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    // Create the SVG container.
    const svg = d3
        .select(div)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / viewScaleFactor, -height / viewScaleFactor, width, height])
        .attr("style", "max-width: 100%; height: auto;");

        hamburgerMenu(div, data);

    // Add a line for each link, and a circle for each node.
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(data.links)
        .join("line")
        .attr("stroke-width", (d: any) => Math.sqrt(d.value));

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(data.nodes)
        .join("circle")
        .attr("r", 5)
        .attr("fill", (d: any) => color(d.group));

    node.append("title")
        .text((d: any) => d.id);

    // Add a drag behavior.
    node.call(d3.drag<any,any>()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));
    
    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
        link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);

        node
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y);
    });

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event:any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event:any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event:any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    simulation.on("tick", () => {
        link
            .attr("x1", (d:any) => (d.source as Node).x!)
            .attr("y1", (d:any) => (d.source as Node).y!)
            .attr("x2", (d:any) => (d.target as Node).x!)
            .attr("y2", (d:any) => (d.target as Node).y!);

        node.attr("cx", (d:any) => d.x!).attr("cy", (d:any) => d.y!);
    });
}

/// dendrogram.ts

export async function dendrogram(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  view_scale_factor = 1
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }
  const margin = defaultMargin;
  const width = size.width - margin.left - margin.right;
  const height = size.height - margin.top - margin.bottom;

  d3.select(div).select("svg").remove(); // Clear previous
  
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .attr("viewBox", [0, 0, width/view_scale_factor, height/view_scale_factor])
    .attr("style", "max-width: 100%; height: auto;")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    hamburgerMenu(div, data);

  const root = d3.hierarchy(data);
  const treeLayout = d3.tree().size([height, width]);
  treeLayout(root);
  const sizeRatio = height/(2 * root.data.size)

  // Links
  svg
    .selectAll("path.link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", (d, i) => colors[i % colors.length])
    .attr("stroke-width", (d) => d.target.data.size * sizeRatio)
    .attr(
      "d",
      d3
        .linkHorizontal<any, any>()
        .x((d: any) => d.y)
        .y((d: any) => d.x)
    );

  // Nodes
  const node = svg
    .selectAll("g.node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

  node
    .append("text")
    .attr("dy", 3)
    .attr("x", (d) => (d.children ? -8 : 8))
    .style("text-anchor", (d) => (d.children ? "end" : "start"))
    .text((d) => d.data.name);
}

/// contour.ts

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
/// area.ts

export async function areachart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const margin = defaultMargin;
  const width = size.width - margin.left - margin.right;
  const height = size.height - margin.top - margin.bottom;

  const parseDate = d3.timeParse("%Y-%m-%d");
  data.forEach((d: any) => {
    d.date = parseDate(d.date);
  });

  const keys = Object.keys(data[0]).filter((k) => k !== "date");
  const stackedData = d3.stack().keys(keys)(data);

  const dateExtent = d3.extent(data, (d: any) => d.date) as [
    Date | undefined,
    Date | undefined
  ];
  const validDateExtent: [Date, Date] =
    dateExtent[0] && dateExtent[1]
      ? [dateExtent[0], dateExtent[1]]
      : [new Date(), new Date()];

  const x = d3
    .scaleTime()
    .domain(validDateExtent)
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(stackedData[stackedData.length - 1], (d) => d[1])!])
    .nice()
    .range([height, 0]);

  const color = d3.scaleOrdinal<string>().domain(keys).range(colors);

  const area = d3
    .area<[number, number]>()
    .x((d, i) => x(data[i].date)!)
    .y0((d) => y(d[0]))
    .y1((d) => y(d[1]));

  d3.select(div).selectAll("*").remove();

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    hamburgerMenu(div, data);

  // Add areas
  svg
    .selectAll("path")
    .data(stackedData)
    .join("path")
    .attr("fill", ({ key }) => color(key)!)
    .attr("d", (d: d3.Series<any, string>) => area(d as [number, number][])!)
    .on("mousemove", function (event, layer) {
      const [xPos] = d3.pointer(event);
      const xDate = x.invert(xPos);
      const i = d3.bisector((d: any) => d.date).center(data, xDate);
      const d = data[i];
      const tooltipHtml = keys
        .map(
          (k) =>
            `<div><span style="color:${color(k)};">●</span> ${k}: ${d[k]}</div>`
        )
        .join("");
      tooltip
        .html(
          `<strong>${d3.timeFormat("%Y-%m-%d")(d.date)}</strong>${tooltipHtml}`
        )
        .style("left", `${event.pageX + 15}px`)
        .style("top", `${event.pageY - 28}px`)
        .style("opacity", 1);
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

  // Axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(6));

  svg.append("g").call(d3.axisLeft(y));

  // Tooltip div
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("border", "1px solid #ccc")
    .style("border-radius", "4px")
    .style("padding", "8px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  // Legend
  const legend = svg
    .append("g")
    .attr("transform", `translate(${width + 20}, 0)`);

  keys.forEach((key, i) => {
    const g = legend.append("g").attr("transform", `translate(0, ${i * 20})`);

    g.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", color(key)!);

    g.append("text")
      .attr("x", 18)
      .attr("y", 10)
      .text(key)
      .style("font-size", "12px")
      .style("alignment-baseline", "middle");
  });
}

/// bubblechart.ts

interface BubbleNode {
  name?: string;
  value?: number;
  children?: BubbleNode[];
}

export async function bubblechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  ease_in = 0,
  drag_animations = 0
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  // Clear existing content
  d3.select(div).selectAll("*").remove();

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .attr("viewBox", `0 0 ${size.width} ${size.height}`)
    .style("font-family", "sans-serif");

    hamburgerMenu(div, data);

  const colorScale = d3.scaleOrdinal<string>().range(colors);

  const format = d3.format(",d");

  const pack = d3.pack<BubbleNode>().size([size.width, size.height]).padding(5);

  let nodes: HierarchyCircularNode<BubbleNode>[] = [];
  const isNested = !Array.isArray(data);

  if (isNested) {
    const root = d3
      .hierarchy<BubbleNode>(data)
      .sum((d) => d.value || 0)
      .sort((a, b) => b.value! - a.value!);

    nodes = pack(root).descendants();

    const node = svg
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);



    if (ease_in > 0) {
      node
      .append("circle")
      .attr("fill", (d, i) => colorScale(i.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
        .attr("r", 0)
        .transition()
        .duration(800)
        .ease(d3.easeBounceOut)
        .attr("r", (d) => d.r);
    } else {
      node
      .append("circle")
      .attr("fill", (d, i) => colorScale(i.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1).attr("r", (d) => d.r);
    }


    if (ease_in > 0) {
      node
      .append("text")
      .text((d) => d.data.name || "")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#fff")
      .style(
        "font-size",
        (d) => `${Math.min((2 * d.r) / (d.data.name?.length || 1), 12)}px`
      ).style("opacity", 0).transition().delay(4000).style("opacity", 1);
    } else {
      node
      .append("text")
      .text((d) => d.data.name || "")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#fff")
      .style(
        "font-size",
        (d) => `${Math.min((2 * d.r) / (d.data.name?.length || 1), 12)}px`
      ).style("opacity", 1);
    }
  } else {
    const root = pack(
      d3.hierarchy<BubbleNode>({ children: data }).sum((d) => d.value || 0)
    );

    const node = svg
      .append("g")
      .selectAll()
      .data(root.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    const simulation = d3
      .forceSimulation(root.leaves())
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(size.width / 2, size.height / 2))
      .force(
        "collision",
        d3.forceCollide((d: any) => d.r + 2)
      )
      .on("tick", () => {
        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
      });

    node.append("title").text((d) => `${d.data.name}\n${format(d.value || 0)}`);

    // Add a filled circle.
    

    if (ease_in > 0) {
      node
      .append("circle")
      .attr("fill", (d) =>
        colorScale(d.parent?.data.name || d.data.name?.split(".")[1] || "")
      )
        .attr("fill-opacity", 0)
        .attr("r", 0)
        .transition()
        .duration(4000)
        .ease(d3.easeBounceOut)
        .attr("fill-opacity", 0.7)
        .attr("r", (d) => d.r);
    } else {
      node
      .append("circle")
      .attr("fill", (d) =>
        colorScale(d.parent?.data.name || d.data.name?.split(".")[1] || "")
      )
      .attr("fill-opacity", 0.7).attr("r", (d) => d.r);
    }


    if (ease_in > 0) {
      node
      .append("text")
      .text((d) => d.data.name || "")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#fff")
      .style(
        "font-size",
        (d) => `${Math.min((2 * d.r) / (d.data.name?.length || 1), 12)}px`
      ).style("opacity", 0).transition().delay(4000).style("opacity", 1);
    } else {
      node
      .append("text")
      .text((d) => d.data.name || "")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("fill", "#fff")
      .style(
        "font-size",
        (d) => `${Math.min((2 * d.r) / (d.data.name?.length || 1), 12)}px`
      ).style("opacity", 1);
    }

    const drag = d3
      .drag<any, any>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        console.log("start drag", d);
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
        console.log("drag", d, event);
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        console.log("end drag", d);
      });
    if (drag_animations > 0) {
      node.call(drag);
    }
  }
}

/// voronoi.ts

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
