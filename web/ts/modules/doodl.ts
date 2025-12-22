import {
  DataFile,
  defaultArgumentObject,
  isTokenExpired,
  isTokenValid,
  retrieveToken,
  Size,
  Token,
} from "./base";
import { radial_areachart_impl } from "./radial_areachart";
import * as d3 from "d3";

export class Doodl {
  private static cachedToken: Token | null = null;
  private tokenKey: string;

  constructor(tokenKey: string = "") {
    Doodl.cachedToken = null;
    this.tokenKey = tokenKey;
    if (this.tokenKey && Doodl.cachedToken == null) {
      this.checkToken(this.tokenKey);
    }
  }

  async checkToken(tokenKey: string) {
    if (!Doodl.cachedToken || isTokenExpired(Doodl.cachedToken)) {
      try {
        Doodl.cachedToken = await retrieveToken(tokenKey);
      } catch (error) {
        console.error(
          `Failed to retrieve token for ${String(tokenKey)}:`,
          error
        );
        Doodl.cachedToken = null;
      }
    }

    if (!Doodl.cachedToken || !isTokenValid(Doodl.cachedToken)) {
      Doodl.cachedToken = null;
    }

    console.log("Token Key:", tokenKey);
    console.log("Token :", Doodl.cachedToken);
    return Doodl.cachedToken;
  }

  async placeholder(
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
    svg
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 60)
      .attr("fill", colors?.[0] ?? "#999");

    // Left ear
    svg
      .append("polygon")
      .attr(
        "points",
        `${centerX - 40},${centerY - 40} ${centerX - 10},${centerY - 120} ${
          centerX - 80
        },${centerY - 80}`
      )
      .attr("fill", colors?.[1] ?? "#888");

    // Right ear
    svg
      .append("polygon")
      .attr(
        "points",
        `${centerX + 40},${centerY - 40} ${centerX + 10},${centerY - 120} ${
          centerX + 80
        },${centerY - 80}`
      )
      .attr("fill", colors?.[1] ?? "#888");

    // Eyes
    svg
      .append("circle")
      .attr("cx", centerX - 20)
      .attr("cy", centerY - 10)
      .attr("r", 10)
      .attr("fill", "#000");

    svg
      .append("circle")
      .attr("cx", centerX + 20)
      .attr("cy", centerY - 10)
      .attr("r", 10)
      .attr("fill", "#000");

    // Nose
    svg
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY + 10)
      .attr("r", 6)
      .attr("fill", "#000");

    // Body
    svg
      .append("ellipse")
      .attr("cx", centerX)
      .attr("cy", centerY + 120)
      .attr("rx", 80)
      .attr("ry", 100)
      .attr("fill", colors?.[2] ?? "#aaa");

    // Premium chart text
    svg
      .append("text")
      .attr("x", centerX)
      .attr("y", centerY + 260)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "#555")
      .text(`${chartName} is a premium chart, upgrade to use it`);
  }

  async radial_areachart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    curved = false,
    x_label_angle = 0,
    show_legend = 0,
    horizontal = 0
  ) {
    const ct =
      Doodl.cachedToken != null ||
      !isTokenExpired(Doodl.cachedToken) ||
      isTokenValid(Doodl.cachedToken);
    return ct
      ? this.placeholder(div, size, colors, "Radial Area Chart")
      : radial_areachart_impl(
          div,
          data,
          size,
          file,
          colors,
          curved,
          x_label_angle,
          show_legend,
          horizontal
        );
  }
}
