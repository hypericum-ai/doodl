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
