import * as d3 from "d3";
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
import { areachart_impl } from "./areachart";
import { barchart_impl } from "./barchart";
import { bollinger_impl } from "./bollinger";
import { boxplot_impl } from "./boxplot";
import { bubblechart_impl } from "./bubblechart";
import { chord_impl } from "./chord";
import { contour_impl } from "./contour";
import { dendrogram_impl } from "./dendrogram";
import { disjoint_impl } from "./disjoint";
import { dotplot_impl } from "./dotplot";
import { force_impl } from "./force";
import { gantt_impl } from "./gantt";
import { grouped_barchart_impl } from "./grouped_barchart";
import { heatmap_impl } from "./heatmap";
import { linechart_impl } from "./linechart";
import { minard_impl } from "./minard";
import { multi_linechart_impl } from "./multi_linechart";
import { piechart_impl } from "./piechart";
import { piegrid_impl } from "./piegrid";
import { scatterplot_impl } from "./scatterplot";
import { skey_impl } from "./skey";
import { stacked_areachart_impl } from "./stacked_areachart";
import { stacked_barchart_impl } from "./stacked_barchart";
import { tree_impl } from "./tree";
import { treemap_impl } from "./treemap";
import { vennchart_impl } from "./vennchart";
import { voronoi_impl } from "./voronoi";

export class Doodl {
  private static cachedToken: Token | null = null;
  private tokenKey: string;

  constructor(tokenKey: string = "") {
    Doodl.cachedToken = null;
    this.tokenKey = tokenKey;
    if (this.tokenKey && Doodl.cachedToken == null) {
      void this.checkToken(this.tokenKey);
    }
  }

  async checkToken(tokenKey: string): Promise<Token | null> {
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
    const ct = await this.checkToken(this.tokenKey);
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

  async areachart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    curved = false
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Area Chart")
      : areachart_impl(div, data, size, file, colors, curved);
  }

  async barchart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    horizontal = 0,
    moving_average = 0,
    x_label_angle = 0
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Bar Chart")
      : barchart_impl(
          div,
          data,
          size,
          file,
          colors,
          horizontal,
          moving_average,
          x_label_angle
        );
  }

  async bollinger(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Bollinger Chart")
      : bollinger_impl(div, data, size, file, colors);
  }

  async boxplot(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Boxplot Chart")
      : boxplot_impl(div, data, size, file, colors);
  }

  async bubblechart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    ease_in = 0,
    drag_animations = 0
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Bubble Chart")
      : bubblechart_impl(
          div,
          data,
          size,
          file,
          colors,
          ease_in,
          drag_animations
        );
  }

  async chord(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    labels: string[] = []
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Chord Chart")
      : chord_impl(div, data, size, file, colors, labels);
  }

  async contour(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    labels: string[] = []
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Contour Chart")
      : contour_impl(div, data, size, file, colors);
  }

  async dendrogram(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    view_scale_factor = 1
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Dendrogram Chart")
      : dendrogram_impl(div, data, size, file, colors, view_scale_factor);
  }

  async disjoint(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Disjoint Chart")
      : disjoint_impl(div, data, size, file, colors);
  }

  async dotplot(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Dotplot Chart")
      : dotplot_impl(div, data, size, file, colors);
  }

  async force(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Force Chart")
      : force_impl(div, data, size, file, colors);
  }

  async gantt(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Gantt Chart")
      : gantt_impl(div, data, size, file, colors);
  }

  async grouped_barchart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    horizontal = 0,
    x_label_angle = 0,
    show_legend = 0
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Grouped Bar Chart")
      : grouped_barchart_impl(
          div,
          data,
          size,
          file,
          colors,
          horizontal,
          x_label_angle,
          show_legend
        );
  }

  async heatmap(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    show_legend = 0,
    interp = "rgb",
    gamma = 0,
    x_label_angle = 0
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Heatmap Chart")
      : heatmap_impl(
          div,
          data,
          size,
          file,
          colors,
          show_legend,
          interp,
          gamma,
          x_label_angle
        );
  }

  async linechart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    curved = 0
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Line Chart")
      : linechart_impl(div, data, size, file, colors, curved);
  }

  async minard(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Minard Chart")
      : minard_impl(div, data, size, file, colors);
  }

  async multi_linechart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    curved = 0,
    show_legend = 0
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Multi Line Chart")
      : multi_linechart_impl(
          div,
          data,
          size,
          file,
          colors,
          curved,
          show_legend
        );
  }

  async piechart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    donut?: 0,
    continuous_rotation?: 0,
    show_percentages?: 0
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, "Pie Chart")
      : piechart_impl(
          div,
          data,
          size,
          file,
          colors,
          donut,
          continuous_rotation,
          show_percentages
        );
  }

  async piegrid(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    show_percentages?: 0,
    columns?: 3,
    bg_arc_color = "#2b2b2f",
    text_color = "#aaa",
    percent_color = "#eb0707ff",
    total_color = "#777"
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, " Piegrid Chart")
      : piegrid_impl(
          div,
          data,
          size,
          file,
          colors,
          show_percentages,
          columns,
          bg_arc_color,
          text_color,
          percent_color,
          total_color
        );
  }

  async scatterplot(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    dotsize: number = 5
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, " Scatterplot Chart")
      : scatterplot_impl(div, data, size, file, colors, dotsize);
  }

  async skey(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    link_color = "source",
    node_align = "right"
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, " Sankey Chart")
      : skey_impl(div, data, size, file, colors, link_color, node_align);
  }

  async stacked_areachart(
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
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, " Stacked Area Chart")
      : stacked_areachart_impl(
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

  async stacked_barchart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    horizontal = 0,
    moving_average = 0,
    x_label_angle = 0,
    show_legend = 0
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, " Stacked Bar Chart")
      : stacked_barchart_impl(
          div,
          data,
          size,
          file,
          colors,
          horizontal,
          moving_average,
          x_label_angle,
          show_legend
        );
  }

  async tree(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors,
    vertical = false
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, " Tree Chart")
      : tree_impl(div, data, size, file, colors, vertical);
  }

  async treemap(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, " Treemap Chart")
      : treemap_impl(div, data, size, file, colors);
  }

  async vennchart(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, " Venn Chart")
      : vennchart_impl(div, data, size, file, colors);
  }

  async voronoi_impl(
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file?: DataFile,
    colors: string[] = defaultArgumentObject.colors
  ) {
    const ct = await this.checkToken(this.tokenKey);
    return ct
      ? this.placeholder(div, size, colors, " Voronoi Chart")
      : voronoi_impl(div, data, size, file, colors);
  }
}
