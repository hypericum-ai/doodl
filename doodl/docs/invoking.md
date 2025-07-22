# Invoking doodl

## From the command line

The doodl program, called from a command line interpreter like bash,
is what you would use for any of these use cases:

- Format and display a Markdown document, including interactive
  visualizations, in a Web browser.
  
- Format and save a copy of a formatted document in a form that can be
  transfered by email and displayed on another computer. The output
  format can include HTML, PDF, Microsoft Word, or any other format
  that Pandoc knows. [Here](https://pandoc.org/MANUAL.html#options)
  is a comprehensive list of output formats.

The command line arguments to doodl include:

| Short | Long | Value | Description |
| - | - | - | - |
| -c|--chart| *file* | Add a custom chart to doodl |
| -f|--filter | *filter* | Add a filter to be passed to pandoc |
| -h|--help | | Print this message |
| -o|--output | *file* | File to which to store HTML document |
| -p|--plot | | Short cut for adding the pandoc-plot filter |
| -s|--server | | Run doodl in server mode |
| -t|--title | *title* | Title for generated HTML document |
| -v|--verbose | | Increase debugging output. May be repeated |
| -z|--zip | *file* | zip the output directory to file |
| | --port | | the port to use in the url. defaults to 7300 |
| | --format | *format* | generate a file in this format |

## From a notebook

The first thing to note is that doodl must be installed in the same
Python instance that your notebook is using. This can be non-obvious
if you're running jupyter in its own virtual environment. Here's an
example of doing so:

~~~python
#! ~/myvenv/bin/pip install doodl
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

You should see the visualization that you have requested in the next
block.
