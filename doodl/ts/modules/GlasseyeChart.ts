//Doodl chart super class: sets up the svg and the chart area
var DoodlChart = function (div, size, margin, custom_height) {
  var self = this;

  self.div = div;
  self.size = size;
  self.margin = margin;
  self.custom_height = custom_height;

  //Set the size of the chart
  self.set_size();
};

DoodlChart.prototype.set_size = function () {
  var self = this;

  //Get dimension of the div
  var rect = d3.select(self.div).node().getBoundingClientRect();

  //Set chart dimensions according to whether the chart is placed in the margin or the main page

  if (self.margin === undefined) {
    self.margin = {
      top: 20,
      bottom: 20,
      right: 20,
      left: 20,
    };
  }

  var fullpage_width = 500;
  var margin_width_height = 300;
  var double_plot_width = 600;
  var min_height = 500;

  if (self.size === "full_page") {
    self.svg_width =
      (rect.width < fullpage_width) && (rect.width > 0)
        ? rect.width
        : fullpage_width;
    self.svg_height =
      self.custom_height === undefined ? min_height : self.custom_height;
  } else if (self.size === "margin") {
    self.svg_width = margin_width_height;
    self.svg_height =
      self.custom_height === undefined ? margin_width_height : self.custom_height;
  } else if (self.size === "double_plot_wide") {
    self.svg_width =
      rect.width < double_plot_width ? rect.width : double_plot_width;
    self.svg_height =
      self.custom_height === undefined ? min_height : self.custom_height;
  } else if (self.size === "double_plot_narrow") {
    self.svg_width = rect.width < margin_width_height ? rect.width : margin_width_height;
    self.svg_height =
      self.custom_height === undefined ? min_height : self.custom_height;
  } else {
    self.svg_width = margin_width_height;
    self.svg_height =
      self.custom_height === undefined ? min_height : self.custom_height;
  }

  //Work out the dimensions of the chart
  self.width = self.svg_width - self.margin.left - self.margin.right;
  self.height = self.svg_height - self.margin.top - self.margin.bottom;

  //Define color scales
  return self;
};

DoodlChart.prototype.add_svg = function (x=undefined, y=undefined) {
  var self = this;
  x = x == undefined ? self.margin.left : x; 
  y = y == undefined ? self.margin.top : y; 

  //Add the svg to the div
  self.svg = d3
    .select(self.div)
    .append("svg")
    .attr("class", "doodl_chart")
    .attr("width", self.svg_width)
    .attr("height", self.svg_height);

  //Add the chart area to the svg
  var scaleFactor = 0.9;
  self.chart_area = self.svg
    .append("g")
    .attr("class", "chart_area")
    .attr(
      "transform",
      "translate(" + x + "," + y + ") scale("+ scaleFactor +")"
    );

  return self;
};

/**
 * Adds a label to the TimeSeries object
 * @method
 * @param {string} title The title to be placed at the top of the chart
 * @returns {object} The modified TimeSeries object
 */

DoodlChart.prototype.add_title = function (title, subtitle) {
  var self = this;
  self.title = title;
  self.svg
    .append("text")
    .attr("class", "title")
    .text(title)
    .attr("transform", "translate(" + self.margin.left + ",20)");

  if (subtitle != undefined) {
    self.subtitle = subtitle;
    self.svg
      .append("text")
      .attr("class", "subtitle")
      .text(subtitle)
      .attr("transform", "translate(" + self.margin.left + ",35)");
  }

  return self;
};

DoodlChart.prototype.set_tooltip_text = function (
  commentary_strings,
  variable_names,
  formats
) {
  var self = this;

  self.tooltip_text = function (d) {
    var embedded_vars = variable_names.map(function (e) {
      return e === "filter" ? self.current_variable : d[e];
    });
    var text = create_commentary(commentary_strings, embedded_vars, formats);
    return text;
  };

  self.tip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(self.tooltip_text);

  return self;
};
