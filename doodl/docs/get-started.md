# Getting Started with doodl
## Prerequisites
- **Python**: Python must be installed. Python 3.7 or later is
  recommended. Check the Python version by running:
    
~~~bash
python --version
# Or for specific versions:
python3 --version
~~~

- **pip**: pip is the package installer for Python. It is typically
  included with Python installations. To verify if pip is installed,
  run:

~~~bash
python -m pip --version
# Or:
pip --version
~~~

    If pip is not installed, install it using `python -m ensurepip
    --default-pip`.

- **pandoc**: doodl uses `pandoc` to perform document formatting.
  Install it using the
  [instructions for your computer's operating system](
  https://pandoc.org/installing.html).

## Installation

Install doodl using pip from the Python Package Index (PyPI). 
Installing from PyPI:

~~~bash
pip install doodl
~~~

Installing from Source (for development or specific versions): Install
directly from the source code, often from platforms like GitHub, for
the latest development version or to contribute.

~~~bash
git clone https://github.com/hypercum-ai/doodl
cd doodl
pip install .
~~~

This will install the package in "editable" or "development"
mode. This allows changes directly to the source code to be reflected
when the program runs.

## Basic Usage

As described [elsewhere](/invoking), doodl can be used either from a
command line prompt, as a standalone formatter, or as a Python
package, e.g. from a Jupyter or Google Colab notebook.
(Note that you may have to install doodl from within the notebook
platform if it is using a different Python kernel.)

Here's an example of using doodl from the command line, to view a
formatted document in your Web browser, with doodl acting as a Web
server.

~~~bash
doodl --server myfile.md
~~~

You can also use doodl from within Python code running in a notebook.

~~~python
import doodl

doodl.chord(
  data=[
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ]
  size={"width": 350, "height": 350},
  colors=["black", "#ffdd89", "#957244", "#f26223"]
)
~~~

## Updating doodl

Use the pip install --upgrade command to upgrade to the latest version. 

~~~bash
pip install --upgrade doodl
~~~

This will fetch the latest version of the package and its
dependencies, if any.

## Uninstalling doodl

If the package needs to be removed, use the pip uninstall command. 

~~~bash
pip uninstall [your-program-name]
~~~

Note: pip uninstall only removes the package itself, not its
dependencies. If you wish to remove dependencies as well, you would
need to identify them (using `pip show doodl` ) and uninstall
each manually.
