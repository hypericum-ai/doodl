#!/usr/bin/env python3
import colorcet as cc
import http.server
import json
import logging
import os
import pypandoc as py
import re
import requests
import seaborn as sns
import shutil
import socketserver
import sys
import threading
import webbrowser
import xml.etree.ElementTree as ET
import zipfile

from bs4 import BeautifulSoup
from getopt import getopt
from playwright.sync_api import sync_playwright
from tempfile import NamedTemporaryFile, TemporaryDirectory
from time import sleep
from IPython.display import display, HTML


fonts = [
    "http://fonts.googleapis.com/css?family=Raleway",
    "http://fonts.googleapis.com/css?family=Droid%20Sans",
    "http://fonts.googleapis.com/css?family=Lato",
]

base_stylesheets = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
]

prod_stylesheets = [
    "https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/css/tufte.css",
    "https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/css/menu.css",
    "https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/css/doodlCharts.css",
]

dev_stylesheets = [
    "{dir}/css/tufte.css",
    "{dir}/css/menu.css",
    "{dir}/css/doodlCharts.css",
]

dev_scripts = ["{dir}/ts/dist/doodlchart.min.js"]

prod_scripts = [
    "https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/ts/dist/doodlchart.min.js"
]

html_tpl = """<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>{title}</title>
        {fonts}
        {stylesheets}
        {scripts}
    </head>

    <body>
        <div id = "tufte_container">
            {soup}
        </div>
        <script type="text/javascript">
            {code}
        </script>
    </body>
</html>
"""

pdf_engines = ["xelatex", "lualatex", "pdflatex"]
# Standard charts

standard_charts = {
    "linechart": {"curved": 0},
    "piechart": {"donut": 0, "continuous_rotation": 0},
    "skey": {"link_color": "source-target", "node_align": "left"},
    "barchart": {"horizontal": 0},
    "tree": {"vertical": 0},
    "venn": None,
    "gantt": None,
    "treemap": None,
    "heatmap": {"show_legend": 0, "interp": "rgb", "gamma": 0},
    "dotplot": None,
    "scatterplot": None,
    "boxplot": None,
    "force": None,
    "chord": None,
    "disjoint": None,
    "bollinger": None,
    "dendrogram": {"view_scale_factor": 1},
    "contour": None,
    "areachart": None,
    "bubblechart": {"ease_in": 0, "drag_animations": 0},
    "voronoi": None,
}

if hasattr(py, "convert"):
    convert = py.convert  # type: ignore
else:
    convert = py.convert_file


# Mode is 'dev' for development mode (with the '-D' flag), and 'prod'
# for production mode.

mode = "prod"
module_name = "Doodl"
src_dir = "."
logger = logging.getLogger(module_name)
convert_url = "https://svgtopng-latest.onrender.com/convert"
default_port = 7300


# Function to wrap with tags
def wrap(to_wrap, wrap_in):
    contents = to_wrap.replace_with(wrap_in)
    wrap_in.append(contents)


def resolve_color_palette(colors, n_colors, desat):
    cc_palette = ""

    if type(colors) is str and colors.startswith("cc."):
        try:
            cc_palette = colors.split(".")[1]
        except Exception as exc:
            logger.fatal(f'invalid colorcet palette "{colors}": {exc}')

        colors = getattr(cc, cc_palette)
        logger.info(f"using colorcet {cc_palette} palette")

    palette = sns.color_palette(palette=colors, desat=desat, n_colors=n_colors)

    if palette:
        palette = [
            "#%02X%02X%02X" % tuple(map(lambda x: int(255 * x), hue))
            for hue in [c for c in palette]
        ]

    return palette


class ChartDefinition:
    def __init__(self, *args, **kwargs):
        self.tag = None
        self.module_name = None
        self.module_source = None
        self.function = None
        self.optional = {}

        for k, v in kwargs.items():
            setattr(self, k, v)

        for attr in ["tag", "module_name", "module_source"]:
            if not hasattr(self, attr):
                raise Exception("invalid function definition")

        if not self.function:
            self.function = self.tag


# Register a custom chart
def register_chart(filename, defs):
    with open(filename) as ifp:
        # Parse the file, and add it to a list of function
        # definitions.
        defn_list = json.loads(ifp.read())
        if type(defn_list) is dict:
            defn_list = [defn_list]
        for defn_dict in defn_list:
            defn = ChartDefinition(**defn_dict)
            defs.append(defn)

    return defs


# Functions related to HTML


def parse_html(input_file, output_dir, filters=[], extras=[]):
    # Call pandoc and parse the HTML with BeautifulSoup
    with NamedTemporaryFile(
        suffix="html", delete_on_close=False, dir=output_dir
    ) as pfp:
        pfp.close()

        try:
            convert(
                input_file,
                "html",
                outputfile=pfp.name,
                extra_args=extras,
                filters=filters,
            )
        except Exception as e:
            logger.fatal(f"Error converting {input_file} to HTML: {e}")

        with open(pfp.name, "r") as rfp:
            pdoc = rfp.read()
            soup = BeautifulSoup(pdoc, "html.parser")

    return soup


def transform_html(soup):
    # Process the generated HTML to match the Tufte format

    for a in soup.find_all("marginnote"):
        p = soup.new_tag("p")
        a.replace_with(p)
        p.insert(0, a)
        a.name = "span"
        a["class"] = "marginnote"

    for a in enumerate(soup.find_all("sidenote")):
        a[1].name = "span"
        a[1]["class"] = "marginnote"
        a[1].insert(0, str(a[0] + 1) + ". ")
        tag = soup.new_tag("sup")
        tag["class"] = "sidenote-number"
        tag.string = str(a[0] + 1)
        a[1].insert_before(tag)

    for a in soup.find_all("checklist"):
        ul = a.parent.findNext("ul")
        ul["class"] = "checklist"
        a.extract()

    if soup.ol is not None:
        for ol in soup.find_all("ol"):
            if ol.parent.name != "li":
                wrap(ol, soup.new_tag("div", **{"class": "list-container"}))

    if soup.ul is not None:
        for ul in soup.find_all("ul"):
            if ul.parent.name != "li":
                wrap(ul, soup.new_tag("div", **{"class": "list-container"}))

    return soup


def process_html_charts(soup, chart_defs):
    # Process the charts.

    code_parts = []
    code_string = ""

    for s, args in standard_charts.items():
        add_chart_to_html(s, args, soup, code_parts)

    # Add any custom chart defs

    for defn in chart_defs:
        add_chart_to_html(
            defn.tag, defn.optional, soup, code_parts, defn.module_name, defn.function
        )
        logger.info(f"Added custom chart {defn.tag}")

    # We use the same indentation as the template for the script

    code_string = """
            """.join(code_parts)

    # Account for Apple's tendency to be a nanny

    code_string = re.sub("[“”]", '"', code_string)
    code_string = re.sub("[“’‘”]", "'", code_string)

    return code_string


# Function to add charts
def add_chart_to_html(
    chart_id, fields, soup, code_parts, module=module_name, function_name=None
):
    all_fields = {
        "data": [],
        "size": {},
        "file": {},
        "colors": "pastel",
    }

    palette_fields = {
        "colors": "pastel",
        "n_colors": 10,
        "desat": 1,
    }

    if fields:
        all_fields |= fields

    if not function_name:
        function_name = chart_id

    for d in enumerate(soup.find_all(chart_id)):
        attrs = d[1].attrs
        args = [f"'#{chart_id}_{str(d[0])}'"]  # Insert the div ID

        # Figure out the colors

        for field, dv in palette_fields.items():
            if field in attrs:
                if field == "colors":
                    try:
                        value = json.loads(attrs[field])
                    except Exception:
                        value = attrs[field]
                        if type(value) is not str:
                            raise

                    if (
                        type(value) is list
                        and len(value) == 1
                        and type(value[0] is str)
                    ):
                        value = value[0]

                    palette_fields["colors"] = value
                else:
                    try:
                        palette_fields[field] = json.loads(attrs[field])
                    except Exception as e:
                        logger.error(e)
            elif field in ["path", "format"]:
                try:
                    value = json.loads(attrs[field])
                except Exception:
                    raise

                all_fields["file"][field] = value[field]

        # Compute the palette
        all_fields["colors"] = resolve_color_palette(**palette_fields)

        # Resolve everything but color.

        for field, dv in all_fields.items():
            try:
                if field == "colors":
                    value = str(all_fields["colors"])
                elif field in palette_fields:
                    continue
                elif field in attrs:
                    value = attrs[field]
                else:
                    value = json.dumps(dv)

                args.append(value)
            except:
                logger.error(f"Error on chart : {chart_id}")
                raise

        code_parts.append(f"{module}.{function_name}({','.join(args)});")
        d[1].name = "span"
        d[1].contents = ""
        d[1].attrs = {}
        d[1]["id"] = chart_id + "_" + str(d[0])
        d[1]["class"] = "chart-container"
        tag = soup.new_tag("br")
        d[1].insert_after(tag)

    return code_parts


def make_supporting(chart_defs, server_mode=False):
    # Construct the mode-specificities
    scripts = []
    stylesheets = base_stylesheets

    if mode == "dev":
        scripts = [f"ts/dist/{os.path.basename(path)}" for path in dev_scripts]
        stylesheets = base_stylesheets + [
            f"css/{os.path.basename(path)}" for path in dev_stylesheets
        ]
    else:
        scripts = scripts + prod_scripts
        stylesheets = stylesheets + prod_stylesheets

    for src in set([defn.module_source for defn in chart_defs]):
        scripts.append(src)

    return scripts, stylesheets


def write_html(
    scripts,
    stylesheets,
    soup,
    code_string,
    title,
    output_file,
):
    # Put it all together into a set of arguments for turning the template
    # into the finished document.

    indent_sep = "\n        "
    tpl_args = {
        "title": title,
        "fonts": indent_sep.join(
            [f"<link href='{font}' rel='stylesheet' type='text/css'>" for font in fonts]
        ),
        "scripts": indent_sep.join(
            [f'<script src="{script}"></script>' for script in scripts]
        ),
        "stylesheets": indent_sep.join(
            f'<link rel="stylesheet" href="{sheet}" />' for sheet in stylesheets
        ),
        "soup": str(soup),
        "code": code_string,
    }

    doc = html_tpl.format(**tpl_args)

    with open(output_file, "w") as ofp:
        ofp.write(doc)

    return doc


# Functions for other formats


def generate_json(input_file, output_dir, filters=[], extras=[]):
    raw_json = None

    # Call pandoc and parse the JSON with BeautifulSoup
    with NamedTemporaryFile(
        suffix="json", delete_on_close=False, dir=output_dir
    ) as pfp:
        pfp.close()

        convert(
            input_file, "json", outputfile=pfp.name, extra_args=extras, filters=filters
        )

        with open(pfp.name, "r") as rfp:
            raw_json = json.load(rfp)

    return raw_json


def convert_images(httpd, page_url, output_path=""):
    soup = None

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(page_url, wait_until="load")
            soup = BeautifulSoup(page.content(), "html.parser")
            browser.close()
    except Exception as e:
        logger.error(f"Error opening document to convert SVGs: {e}")

    httpd.shutdown()

    if soup is None:
        return soup

    os.makedirs(output_path, exist_ok=True)

    for svg in soup.find_all("svg"):
        if svg.parent is None:
            continue

        svg_name = svg.parent.get("id", "unnamed_svg")
        svg_path = os.path.join(output_path, f"{svg_name}.svg")

        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(str(svg))

        convert_svg_to_png(svg_name, output_path)  # type: ignore


def convert_svg_to_png(svg_name: str, output_path: str):
    url = convert_url
    svg_path = os.path.join(output_path, f"{svg_name}.svg")
    png_path = os.path.join(output_path, f"{svg_name}.png")
    width, height = get_svg_dimensions(svg_path)

    with open(svg_path, "r", encoding="utf-8") as svg_file:
        svg_content = svg_file.read()

    data = {"name": svg_content, "width": str(width), "height": str(height)}

    response = requests.post(url, data=data)

    if response.status_code == 200:
        with open(png_path, "wb") as out_file:
            out_file.write(response.content)
        logger.info(f"SVG To PNG Image saved to {output_path}")
    else:
        logger.info(f"SVG To PNG Error: {response.status_code}")
        logger.info(response.text)


def parse_length(value: str | None) -> float | None:
    """Strip units like 'px' and convert to float."""
    if value is None:
        return None
    match = re.match(r"([0-9.]+)", value)
    return float(match.group(1)) if match else None


def get_svg_dimensions(svg_path: str):
    tree = ET.parse(svg_path)
    root = tree.getroot()

    width = parse_length(root.attrib.get("width"))
    height = parse_length(root.attrib.get("height"))

    # Fallback to viewBox if width/height not specified
    if width is None or height is None:
        viewbox = root.attrib.get("viewBox")
        if viewbox:
            parts = viewbox.strip().split()
            if len(parts) == 4:
                width = width or float(parts[2])
                height = height or float(parts[3])

    return width, height


def replace_doodl_tags_with_images(doc, directory: str):
    for filename in os.listdir(directory):
        if filename.endswith(".svg"):
            chart_parts = filename.replace(".svg", "").split("_")
            tag = chart_parts[0]
            tag_count = chart_parts[1]
            doc = replace_raw_json_tags(doc, tag, tag_count, directory)

    return doc


def replace_raw_json_tags(doc, tag, tag_count, directory):
    result_json = doc.copy()
    result_json["blocks"] = []

    for block in doc["blocks"]:
        replace_this_block = False
        if "t" in block and "c" in block:
            block_t = block["t"]
            block_c = block["c"]
            if block_t.upper() == "PARA":
                if isinstance(block_c, list):
                    for cblock in block_c:
                        if "t" in cblock and "c" in cblock:
                            cblock_t = cblock["t"]
                            cblock_c = cblock["c"]
                            if cblock_t.upper() == "RAWINLINE" and obj_has_tag(
                                cblock_c, tag
                            ):
                                image_name = f"{tag}_{tag_count}.png"
                                image_path = os.path.join(directory, image_name)
                                new_block = {
                                    "t": "Figure",
                                    "c": [
                                        ["", [], []],
                                        [None, []],
                                        [
                                            {
                                                "t": "Plain",
                                                "c": [
                                                    {
                                                        "t": "Image",
                                                        "c": [
                                                            ["", [], []],
                                                            [],
                                                            [image_path, ""],
                                                        ],
                                                    }
                                                ],
                                            }
                                        ],
                                    ],
                                }
                                result_json["blocks"].append(new_block)
                                replace_this_block = True
                                break
        if not replace_this_block:
            result_json["blocks"].append(block)

    return result_json


def convert_to_format(doc, output_format, output_file_path):
    with NamedTemporaryFile(mode="w+", suffix=".json", delete=False) as f:
        json.dump(doc, f, indent=2)
        f.close()
        json_file_path = f.name

    extras = []

    if output_format.upper() == "PDF":
        pdf_engine = get_pdf_engine()
        if pdf_engine is not None:
            extras.append(f"--pdf-engine={pdf_engine}")

    try:
        logger.info(
            f"Convert args: source_file={json_file_path}, to={output_format}, outputfile={output_file_path}, extra_args={extras}"
        )
        convert(
            source_file=json_file_path,
            to=output_format,
            outputfile=output_file_path,
            extra_args=extras,
        )
    except Exception as e:
        logger.error(f"Error converting {output_file_path} to {output_format}: {e}")
        sys.exit(1)

    logger.info(f"Generated File: {output_file_path}")


def get_pdf_engine():
    for engine in pdf_engines:
        if hasattr(shutil, "which") and shutil.which(engine) is not None:
            return engine
    logger.error(
        "No valid PDF engine found. Please install xelatex, lualatex, or pdflatex. You can install TeX Live or MiKTeX to get these engines."
    )
    return None


def temp_file(suffix):
    """Create a temporary file with the given suffix."""
    return NamedTemporaryFile(suffix=f".{suffix}", delete=False).name


def obj_has_tag(obj, tag):
    if isinstance(obj, list):
        for phrase in obj:
            if tag.upper() in phrase.upper():
                return True
    return False


def main():
    global mode
    global logger
    global output_format
    global src_dir

    filters = []
    chart_defs = []
    extras = ["--mathjax"]
    title = None
    input_file = None
    output_file = None
    server_mode = False
    zip_mode = False
    output_format = "html"  # Default output format
    output_file_path = ""
    port = default_port
    verbosity = logging.WARNING
    zipped_filename = ""
    errors = 0
    usage = """Usage: doodl args input_file
where args arg one of:
-c|--chart  file   # Add a custom chart to doodl
-D|--dev           # Run this script in development mode
-f|--filter filter # Add a filter to be passed to pandoc
-h|--help          # Print this message
-o|--output file   # File to which to store HTML document
-p|--plot          # Short cut for adding the pandoc-plot filter
-s|--server        # Run doodl in server mode
-t|--title         # Title for generated HTML document
-v|--verbose       # Increase debugging output. May be repeated
-z|--zip  file     # zip the output directory to file
--port             # the port to use in the url. defaults to 7300
--format           # generate a file in this format 

In dev mode, the script must be run in the same folder as the script.
"""

    opts, args = getopt(
        sys.argv[1:],
        "c:D:f:o:pst:vz:",
        (
            "chart",
            "dir",
            "filter",
            "output",
            "plot",
            "server",
            "title:",
            "verbose",
            "zip=",
            "port=",
            "format=",
        ),
    )

    for k, v in opts:
        if k in ["-c", "--chart"]:
            chart_defs = register_chart(v, chart_defs)
        elif k in ["-D", "--dir"]:
            mode = "dev"
            src_dir = os.path.abspath(v)
        elif k in ["-f", "--filter"]:
            filters.append(v)
        elif k in ["-o", "--output"]:
            output_file = v
        elif k in ["-p", "--plot"]:
            filters.append("pandoc-plot")
        elif k in ["-s", "--server"]:
            server_mode = True
        elif k in ["-t", "--title"]:
            title = v
        elif k in ["-v", "--verbose"]:
            verbosity -= 10
        elif k in ["-z", "--zip"]:
            zipped_filename = v
            zip_mode = True
        elif k in ["--port"]:
            port = int(v)
        elif k in ["--format"]:
            output_format = v
        elif k in ["-?", "-h", "--help"]:
            errors += 1
        else:
            sys.stderr.write(f"invalid option {k}\n")
            errors += 1

    logging.basicConfig(level=verbosity)

    logger = logging.getLogger()

    logger.info(f"running in {mode} mode")

    if len(args) != 1:
        errors += 1

    if errors:
        sys.stderr.write(usage)
        sys.exit(0)

    input_file = args[0]
    input_file_dir = os.path.dirname(input_file)
    if not os.path.isdir(input_file_dir) or os.path.exists(input_file_dir):
        input_file_dir = os.getcwd()

    if output_file is None:
        base, ext = os.path.splitext(input_file)

        if ext != ".md":
            logger.error('file must have ".md" extension')
            errors += 1
            sys.exit(0)

        output_file = f"{base}.{output_format}"
        output_file_path = os.path.join(input_file_dir, output_file)
    else:
        output_file_path = os.path.abspath(output_file)

    if os.path.exists(output_file_path):
        os.rename(output_file_path, output_file_path + "~")

    if os.path.exists(output_file):
        os.rename(output_file, output_file + "~")

    _, output_ext = os.path.splitext(output_file)

    if title is None:
        title, _ = os.path.splitext(os.path.basename(output_file))

        logger.info(f"derived title {title} from file {output_file}")

    logger.info(f"creating {output_file}")

    output_dir = os.path.dirname(output_file)

    if output_format == "":
        output_format = output_ext[1:].lower()

    if (server_mode or zip_mode) and output_format != "html":
        logger.error(
            "Cannot run in server or zip mode when generating a file in a format other than HTML."
        )
        sys.exit(1)

    html_file = (
        output_file
        if not server_mode and output_format == "html"
        else temp_file("html")
    )
    # No matter what, we need to generate the HTML file first.

    soup = parse_html(input_file, output_dir, filters, extras)
    soup = transform_html(soup)
    code_string = process_html_charts(soup, chart_defs)
    scripts, stylesheets = make_supporting(chart_defs, server_mode)

    # First, handle HTML output

    server_dir_name = ""

    if not output_dir:
        output_dir = os.getcwd()

    # Copy the generated HTML file and dependencies to a temporary directory,
    # and then handle the output based on the mode.

    if server_mode or zip_mode or output_format != "html":
        with TemporaryDirectory(prefix="doodl", delete=zip_mode) as dir_name:
            server_dir_name = dir_name
            copy_data(output_dir, dir_name)
            if os.path.isfile(html_file):
                shutil.copy2(html_file, dir_name)
                old_html_file_name = os.path.basename(html_file)
                if old_html_file_name != "index.html":
                    os.rename(
                        os.path.join(dir_name, old_html_file_name),
                        os.path.join(dir_name, "index.html"),
                    )
                html_file = os.path.join(dir_name, "index.html")

    write_html(scripts, stylesheets, soup, code_string, title, html_file)

    if zip_mode:
        zip_directory(server_dir_name, zipped_filename)
        return

    # All other cases require an HTTP server to serve the finished HTML file

    httpd, url = run_http_server(server_dir_name, port)

    if server_mode:
        browse_html(httpd, url)
        return

    # Now handle other formats

    json_doc = generate_json(
        os.path.basename(input_file),
        server_dir_name,
        filters,
        extras,
    )

    svg_dir = os.path.join(server_dir_name, "svg")
    convert_images(httpd, url, svg_dir)
    json_doc = replace_doodl_tags_with_images(json_doc, svg_dir)
    convert_to_format(
        json_doc,
        output_format=output_format,
        output_file_path=output_file_path,
    )


def run_http_server(directory, port=default_port):
    if not os.path.isdir(directory):
        raise ValueError(f"Invalid directory: {directory}")

    def _run():
        os.chdir(directory)
        httpd.serve_forever()

    handler = http.server.SimpleHTTPRequestHandler
    url = f"http://localhost:{port}"

    httpd = socketserver.TCPServer(("", port), handler)

    # Start the server in a separate thread

    threading.Thread(target=_run, daemon=True).start()

    return httpd, url


# Output-related functions


def browse_html(httpd, url):
    logger.info(f"Serving on {url}")
    webbrowser.open(url)

    try:
        sleep(3600 * 24 * 365)  # Keep the server running for a long time
    except KeyboardInterrupt:
        logger.info("Shutting down server")

    httpd.shutdown()


def zip_directory(folder_path, output_zip):
    with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, start=folder_path)
                zipf.write(file_path, arcname)
    logger.info(f"Zipped '{folder_path}' to '{output_zip}'")


def copy_data(output_dir, server_dir_path):
    if not os.path.isdir(output_dir):
        raise ValueError(f"Source directory does not exist: {output_dir}")

    shutil.copytree(
        output_dir,
        server_dir_path,
        dirs_exist_ok=True,
        ignore=shutil.ignore_patterns(".?*"),
    )

    if mode == "dev":
        styles_and_scripts = dev_scripts + dev_stylesheets
        styles_and_scripts = [path.format(dir=src_dir) for path in styles_and_scripts]
        for sas in styles_and_scripts:
            if os.path.isfile(sas):
                filename = os.path.basename(sas)
                file_extension = os.path.splitext(filename)[-1]
                dest_dict = os.path.join(
                    server_dir_path, "css" if file_extension == ".css" else "ts/dist"
                )
                if not os.path.isdir(dest_dict):
                    os.makedirs(dest_dict, exist_ok=True)
                shutil.copy2(sas, dest_dict)
                logger.info(f"Copied : {sas} to {dest_dict}")


chart_count = 0


def chart(func_name, fields=None):
    def wrapper(
        data=[], size={}, file={}, colors="pastel", n_colors=10, desat=1, **kwargs
    ):
        global chart_count

        chart_id = f"{func_name}_{chart_count}"
        chart_count += 1

        colors = resolve_color_palette(colors, n_colors, desat)

        args = [
            json.dumps(f"#{chart_id}"),
            json.dumps(data),
            json.dumps(size),
            json.dumps(file),
            json.dumps(colors),
        ]

        if fields:
            for field in fields:
                if field in kwargs:
                    args.append(json.dumps(kwargs[field]))
                else:
                    args.append(json.dumps(fields[field]))

        script = f'''
<p><span class="chart-container" id="{chart_id}"></span></p>
<script src="{prod_scripts[0]}"></script>
<link rel="stylesheet" href="{prod_stylesheets[1]}" />
<link rel="stylesheet" href="{prod_stylesheets[2]}" />
<script type="text/javascript">
            Doodl.{func_name}({
            """,
                """.join(args)
        }
            );
</script>
'''

        display(HTML(script))

    return wrapper


for k, v in standard_charts.items():
    globals()[k] = chart(k, v)


if __name__ == "__main__":
    main()
