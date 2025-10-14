#!/usr/bin/env python3
import io

import colorcet as cc
import http.server
import json
import csv
import logging
import os
import panflute as pf
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
# from pprint import pformat
from tempfile import NamedTemporaryFile, TemporaryDirectory
from time import sleep
from IPython.display import display, HTML
from urllib.parse import urlparse


FONTS = [
    "http://fonts.googleapis.com/css?family=Raleway",
    "http://fonts.googleapis.com/css?family=Droid%20Sans",
    "http://fonts.googleapis.com/css?family=Lato",
]

BASE_STYLESHEETS = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
]

PROD_PYTHON_STYLESHEETS = [
    "https://doodl.ai/assets/doodl/css/doodl.css",
]

PROD_STYLESHEETS = [
    "https://doodl.ai/assets/doodl/css/tufte.css",
] + PROD_PYTHON_STYLESHEETS

DEV_STYLESHEETS = [
    "{dir}/css/tufte.css",
    "{dir}/css/doodl.css",
]

DEV_SCRIPTS = ["{dir}/ts/dist/doodlchart.min.js"]

PROD_SCRIPTS = [
    "https://doodl.ai/assets/doodl/js/doodlchart.min.js"
]

HTML_TPL = """<!DOCTYPE html>
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

PDF_ENGINES = ["xelatex", "lualatex", "pdflatex"]
# Standard charts

# Declaration of standard chart types. The layout out this table is:
# - chart type - the tag used in the HTML to refer to the chart
# - options - extra arguments to the chart function
# - data - specification of the data to be passed to the chart
#
# The data types are:
# - table - a table of data, passed as a list of dicts, a pandas 
#   (or other) DataFrame, with optional required columns

STANDARD_CHARTS = {
    "areachart": {
        "data": {
            "type": "table",
            "columns": ["label", "value"],
            "include_all": True
        }
    },
    "barchart": {
        "options": {
            "horizontal": False,
            "moving_average": False,
            "x_label_angle": 0
        },
        "data": {
            "type": "table",
            "columns": ["label", "value"]
        }
    },
    "bollinger": {
        "data": {
            "type": "table",
            "columns": [
                "date",
                "close",
                "upper",
                "lower",
                "movingAvg"
            ]
        }
    },
    "boxplot": {
        "data": {
            "type": "table",
            "columns": ["category", "value"]
        }
    },
    "bubblechart": {
        "options": {
            "ease_in": 0,
            "drag_animations": 0
        },
        "data": {
            "type": "hierarchy"
        }
    },
    "chord": {
        "options": {
            "labels": []
        },
        "data": {
            "type": "chords"
        }   
    },
    "contour": {
        "data": {
            "type": "matrix",
        }
    },
    "dendrogram": {
        "options": {
            "view_scale_factor": 1
        },
        "data": {
            "type": "hierarchy"
        }
    },
    "disjoint": {
        "data": {
            "type": "links"
        }
    },
    "dotplot": {
        "data": {
            "type": "table",
            "columns": ["category", "value"]
        }
    },
    "force": {
        "data": {
            "type": "links"
        }
    },
    "gantt": {
        "data": {
            "type": "table",
            "columns": ["start", "end", "task"]
        }
    },
    "heatmap": {
        "options": {
            "show_legend": False,
            "interp": "rgb", 
            "gamma": 0
        },
        "data": {
            "type": "table",
            "columns": ["x", "y", "value"]
        }
    },
    "linechart": {
        "options": {
            "curved": False
        },
        "data": {
            "type": "table",
            "columns": ["x", "y"]
        }
    },
    "piechart": {
        "options": {
            "donut": False,
            "continuous_rotation": False,
            "show_percentages": False
        },
        "data": {
            "type": "table",
            "columns": ["label", "value"]
        }
    },
    "scatterplot": {
        "options": {
            "dotsize": 5
        },
        "data": {
            "type": "table",
            "columns": ["x", "y"]
        }
    },
    "skey": {
        "options": {
            "link_color": "source-target",
            "node_align": "left"
        },
        "data": {
            "type": "links"
        }
    },
    "stacked_barchart": {
        "options": {
            "horizontal": False,
            "moving_average": False
        },
        "data": {
            "type": "table",
            "columns": ["label", "value"]
        }
    },
    "tree": {
        "options": {
            "vertical": False
        },
        "data": {
            "type": "hierarchy"
        }
    },
    "treemap": {
        "data": {
            "type": "hierarchy"
        }
    },
    "venn": {
        "data": {
            "type": "hierarchy"
        }
    },
    "voronoi": {
        "data": {
            "type": "table",
            "columns": ["x", "y", "name"]
        }
    },
}

CHART_TAGS = list(STANDARD_CHARTS.keys())

# Optional: restrict which RawInline.format values are eligible.
# None = accept all formats; otherwise a set like {"html", "latex"}

MATCH_FORMATS = {'html'}  # e.g., {"html"}

INLINE_CONTAINERS = (
    pf.Para, pf.Plain, pf.Header, pf.Span, pf.Emph, pf.Strong,
    pf.Quoted, pf.SmallCaps, pf.Superscript, pf.Subscript,
    pf.Cite, pf.Link  # (Images inside links are allowed in Pandoc)
)

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
convert_url = "https://svgtopng.doodl.ai/convert"
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
            CHART_TAGS.append(str(defn.tag))

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

    for s, args in STANDARD_CHARTS.items():
        options = None
        data_spec = None

        if args:
            options = args.get('options', None)
            data_spec = args.get('data', None)

        add_chart_to_html(s, options, data_spec, soup, code_parts)

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
    chart_type, fields, data_spec, soup, code_parts, module=module_name, function_name=None
):
    if not function_name:
        function_name = chart_type

    for num, elem in enumerate(soup.find_all(chart_type)):
        try:
            attrs = {str(key): json_loads_if_string(value) for key, value in elem.attrs.items()}
        except Exception as e:
            logger.error(f"Error decoding JSON for {chart_type}_{str(num)} element {elem.attrs}: {e}")
            continue

        chart_id = f"{chart_type}_{str(num)}"

        args = handle_chart_field_arguments(fields, data_spec, attrs, '#' + chart_id, True)

        code_parts.append(f"{module}.{function_name}({','.join(args)});")
        elem.name = "span"
        elem.contents = ""
        elem.attrs = {}
        elem["id"] = chart_id
        elem["class"] = "doodl-chart"
        tag = soup.new_tag("br")
        elem.insert_after(tag)
    return code_parts


def make_supporting(chart_defs):
    # Construct the mode-specificities
    scripts = []
    stylesheets = BASE_STYLESHEETS

    if mode == "dev":
        scripts = [f"ts/dist/{os.path.basename(path)}" for path in DEV_SCRIPTS]
        stylesheets = BASE_STYLESHEETS + [
            f"css/{os.path.basename(path)}" for path in DEV_STYLESHEETS
        ]
    else:
        scripts = scripts + PROD_SCRIPTS
        stylesheets = stylesheets + PROD_STYLESHEETS

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
            [f"<link href='{font}' rel='stylesheet' type='text/css'>" for font in FONTS]
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

    doc = HTML_TPL.format(**tpl_args)

    with open(output_file, "w") as ofp:
        ofp.write(doc)

    return doc


# Functions for other formats


def generate_json(input_file, output_dir, filters=[], extras=[]):
    
    os.makedirs(output_dir, exist_ok=True)
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

def _ok_html(elem: pf.RawInline) -> bool:
    if not isinstance(elem, pf.RawInline):
        return False
    if MATCH_FORMATS is None:
        return True
    return elem.format in MATCH_FORMATS


def is_doodl_start_block(elem) -> str | None:
    if not _ok_html(elem):
        return None

    m = re.match(r"^\s*<(?P<tag>[a-z][a-z0-9_]*)", elem.text, re.IGNORECASE)

    if m:
        tag = m.group("tag").lower()

        if tag in CHART_TAGS:
            return tag

    return None

def is_doodl_end_block(elem, tag) -> bool:
    if not _ok_html(elem):
        return False

    m = re.match(r"^\s*</(?P<tag>[a-z][a-z0-9_]*)", elem.text, re.IGNORECASE)

    if m:
        return m.group("tag").lower() == tag
    
    return False


def _make_image(alt_text: str, url: str) -> pf.Image:
    alt_inlines = [pf.Str(alt_text)] if alt_text else []
    # Use keyword for clarity; Pandoc expects URL as target
    return pf.Image(*alt_inlines, url=url)

def _rewrite_inlines(inlines, doc):
    """Return a new list of inlines with RawInline[ Space/SoftBreak RawInline ] collapsed to Image."""
    out = []
    i = 0
    n = len(inlines)

    while i < n:
        cur = inlines[i]
        tag = is_doodl_start_block(cur)

        # RawInline + (Space|SoftBreak)? + RawInline  -> Image(alt=first, url=second)
        if tag and (
            (
                i + 2 < n
                and isinstance(inlines[i+1], (pf.Space, pf.SoftBreak))
                and is_doodl_end_block(inlines[i+2], tag)
            ) or (
                i + 1 < n 
                and is_doodl_end_block(inlines[i+1], tag)
            )
        ):

            logger.info(f"Processing {tag} block")
            alt = cur.text
            tag_count = doc.image_count.get(tag, 0)
            doc.image_count[tag] = tag_count + 1
            image_path = os.path.join(doc.image_path_directory, f"{tag}_{tag_count}.png")
            out.append(_make_image(alt, image_path))

            if isinstance(inlines[i+1], (pf.Space, pf.SoftBreak)):
                i += 1  # Skip over Space/SoftBreak                

            i += 2 # Skip the two RawInlines

            continue

        # Default: keep as-is
        out.append(cur)
        i += 1

    return out

def action(elem, doc):
    # Only process inline containers (those that have a list of Inline children)
    if isinstance(elem, INLINE_CONTAINERS) and hasattr(elem, 'content'):
        # elem.content is a panflute.ListContainer
        new_seq = _rewrite_inlines(list(elem.content), doc)
        if new_seq != list(elem.content):
            elem.content = pf.ListContainer(*new_seq)


def replace_tags_with_images(json_doc, image_path_directory):
    doc = pf.load(io.StringIO(json.dumps(json_doc, ensure_ascii=False)))

    doc.image_path_directory = image_path_directory
    doc.image_count = {}

    doc = pf.run_filter(action, doc=doc)
 
    with io.StringIO() as f:
        pf.dump(doc, f)
        json_doc = json.loads(f.getvalue())

    return json_doc


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
    for engine in PDF_ENGINES:
        if hasattr(shutil, "which") and shutil.which(engine) is not None:
            return engine
    logger.error(
        "No valid PDF engine found. Please install xelatex, lualatex, or pdflatex. You can install TeX Live or MiKTeX to get these engines."
    )
    return None


def temp_file(suffix):
    """Create a temporary file with the given suffix."""
    return NamedTemporaryFile(suffix=f".{suffix}", delete=False).name


def main():
    global mode
    global logger
    global output_format
    global src_dir
    global input_file
    global input_file_dir

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
where args are one of:
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
            "filter=",
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
    input_file_dir = os.path.abspath(os.path.dirname(input_file))

    logger.info(f"input file directory is {input_file_dir}")

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

    html_file = temp_file("html")

    # No matter what, we need to generate the HTML file first.
    if not output_dir:
        output_dir = os.getcwd()

    server_dir_name = output_dir

    soup = parse_html(input_file, output_dir, filters, extras)
    soup = transform_html(soup)
    code_string = process_html_charts(soup, chart_defs)
    scripts, stylesheets = make_supporting(chart_defs)
    
    # Copy the generated HTML file and dependencies to a temporary directory,
    # and then handle the output based on the mode.

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
        
        plots_folder = os.path.join(os.getcwd(),'plots')
        if os.path.isdir(plots_folder):
            copy_data(plots_folder, os.path.join(dir_name,'plots'))
            

        if zip_mode:
            zip_base_name = os.path.join(dir_name,os.path.basename(output_file))
            shutil.copy2(html_file, zip_base_name)
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
    json_doc = replace_tags_with_images(json_doc, svg_dir)
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
    if not os.path.isdir(folder_path):
        raise ValueError(f"Source directory does not exist: {folder_path}")
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

    logger.info(f"Copying data from {output_dir} to {server_dir_path}")

    shutil.copytree(
        output_dir,
        server_dir_path,
        dirs_exist_ok=True,
        ignore=shutil.ignore_patterns(".?*"),
    )

    if mode == "dev":
        styles_and_scripts = DEV_SCRIPTS + DEV_STYLESHEETS
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

def json_loads_if_string(value):
    if isinstance(value, str):
        try:
            return json.loads(value)
        except json.JSONDecodeError:
            return value
        except Exception as e:
            logger.error(f"Error decoding JSON: {e}")

    return value

def handle_chart_field_arguments(
        chart_specific_fields,
        data_spec,
        supplied_attrs,
        div_id,
        preload_data_files
    ):
    from doodl.data import interpret_data

    args = [div_id]  # Insert the div ID
    
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

    if chart_specific_fields:
        all_fields |= chart_specific_fields
    
    # Figure out the colors

    for field, dv in palette_fields.items():
        if field in supplied_attrs:
            if field == "colors":
                value = json_loads_if_string(supplied_attrs[field])
                if (
                    isinstance(value, list)
                    and len(value) == 1
                    and isinstance(value[0], str)
                ):
                    value = value[0]
                palette_fields["colors"] = value
            elif type(dv) is str:
                try:
                    palette_fields[field] = json.loads(supplied_attrs[field])
                except json.JSONDecodeError as e:
                    logger.error(e,f'Error decoding JSON for field "{field}": {dv}' )
            else:
                palette_fields[field] = dv

    # Construct the palette

    all_fields["colors"] = resolve_color_palette(**palette_fields)

    # Grab any chart-specific fields

    if chart_specific_fields and supplied_attrs:
        for field in chart_specific_fields.keys():
            if field in supplied_attrs:
                value = supplied_attrs[field]

                if type(value) is type(chart_specific_fields[field]):
                    # Same type, so just use it
                    all_fields[field] = value
                else:
                    value = json_loads_if_string(value)
                    all_fields[field] = value

    # Resolve data

    all_fields["file"] = supplied_attrs.get("file", {})

    for field in ["path", "format"]:
        if field in supplied_attrs:
            all_fields["file"][field] = supplied_attrs[field]

    all_fields["data"] = supplied_attrs.get("data", {})

    # Convert supported dataframe types to list-of-dicts for JSON compatibility

    if preload_data_files and all_fields["file"] and not all_fields["data"]:
        logger.info(f"Loading data file {all_fields['file']['path']} for chart : {div_id}")

        path = os.path.join(input_file_dir, all_fields["file"]["path"])

        all_fields["data"] = load_file_data(
            path,
            all_fields["file"].get("format", ""))
        all_fields["file"] = {}

    # Convert column names to parameters if needed

    if data_spec is None:
        logger.error(f"data_spec is None for chart : {div_id}")
        return []

    if all_fields["data"] is not None:
        column_mapping = {}

        if data_spec.get("type", "") == "table":
            columns = data_spec.get("columns", [])
            column_mapping = {
                col: supplied_attrs[col] for col in columns
                if col in supplied_attrs
            }

        all_fields.update(
            interpret_data(
                all_fields["data"],
                data_spec,
                column_mapping
            )
        )

    # Handle size
    all_fields["size"] = supplied_attrs.get("size", { "width": 300, "height": 300 })
    for field in ["width", "height"]:
        if field in supplied_attrs:
            all_fields["size"][field] = supplied_attrs[field]

    # Construct the args

    args += list(all_fields.values())

    return [ json.dumps(a) for a in args ]


def chart(func_name, fields=None, data=None):
    def wrapper(
         **kwargs
    ):
        global chart_count
        global input_file_dir

        input_file_dir = os.getcwd()

        chart_id = f"{func_name}_{chart_count}"
        chart_count += 1
        
        stylesheets = "\n".join([f'<link rel="stylesheet" href="{sheet}" />' for sheet in PROD_PYTHON_STYLESHEETS])

        args = handle_chart_field_arguments(
                fields,
                data,
                kwargs,
                '#' + chart_id,
                True
            )

        script = f'''
<p><span class="doodl-chart" id="{chart_id}"></span></p>
<script src="{PROD_SCRIPTS[0]}"></script>
{stylesheets}
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



def load_file_data(path: str, file_format: str = ""):
    

    if is_url(path):
        resp = requests.get(path)
        resp.raise_for_status()
        fmt = file_format.lower()

        if fmt == "csv":
            return list(csv.DictReader(resp.text.splitlines()))
        elif fmt == "tsv":
            return list(csv.DictReader(resp.text.splitlines(), delimiter="\t"))
        elif fmt == "hsv":
            return list(csv.DictReader(resp.text.splitlines(), delimiter="#"))
        elif fmt == "json":
            return resp.json()
        else:
            raise ValueError(f"Unsupported remote file format: {fmt or 'unknown'}")
                
    if not file_format:
        file_format = path.split(".")[-1].lower()

    if file_format == "csv":
        with open(path, newline="", encoding="utf-8") as f:
            return list(csv.DictReader(f))

    elif file_format == "tsv":
        with open(path, newline="", encoding="utf-8") as f:
            return list(csv.DictReader(f, delimiter="\t"))

    elif file_format == "hsv":
        with open(path, newline="", encoding="utf-8") as f:
            return list(csv.DictReader(f, delimiter="#"))

    elif file_format == "json":
        with open(path, encoding="utf-8") as f:
            return json.load(f)

    elif file_format == "txt":
        with open(path, encoding="utf-8") as f:
            return f.read()

    else:
        raise ValueError(f"Unsupported file format: {file_format}")



def is_url(s: str) -> bool:
    try:
        result = urlparse(s)
        # valid if it has a scheme (http, ftp, file, etc.) and at least something after it
        return bool(result.scheme and (result.netloc or result.path))
    except Exception:
        return False
    
    
for tag, spec in STANDARD_CHARTS.items():
    if not spec:
        spec = {}

    globals()[tag] = chart(
        tag,
        spec.get('options', {}),
        spec.get('data', {})
    )


if __name__ == "__main__":
    main()

