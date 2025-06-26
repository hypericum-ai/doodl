# Pandoc-plot

Because doodl is based on Pandoc, other tools in the Pandoc
ecosystem are also available, in particular
[Laurent P. René de Cotret](https://laurentrdc.xyz/)'s
[Pandoc-Plot](https://github.com/LaurentRDC/pandoc-plot) package.
Pandoc-Plot allows you to insert, among other things, Python
scripts that use [matplotlib](https://matplotlib.org/)
to insert visualizations right into our Markdown documents.
It works like this.

Once you've got a Python script that generates a (single)
visualization that you like, you insert the script right
into your document, offset as a code block, like this:

    ```{.matplotlib}
    import seaborn as sns
    df = sns.load_dataset("penguins")
    sns.pairplot(df, hue="species")
    ```

To tell doodl to include the Pandoc-Plot when it calls pandoc,
use the `-p` (or `--plot`) flag, like this:

```bash
% doodl --plot file.md
```

Here is the output:

![Matplotlib output](images/pandocplot16408727240621322356.png)

Some things to note:

- The pandoc-plot Pandoc filter must be installed on your computer.
- Any data that you load must be loaded for each `matplotlib` code block.
- The code block must produce a single plot object.
- You must not call `plot.show()`.

The output plots will be generated in PNG, and placed in a
`plots` folder for you, in the same folder that holds the output file,
if `doodl` is run in formatter mode.

Note that Pandoc-Plot has more tricks than matplotlib up its sleeve.
Here's a list, from
[the README in Pandoc-Plot's Github repository](https://github.com/LaurentRDC/pandoc-plot?tab=readme-ov-file):

  - `plotly_python` : plots using the
    [plotly](https://plotly.com/python/) Python library
  - `plotly_r`: plots using the [plotly](https://plotly.com/r/) R
    library
  - `matlabplot`: plots using [MATLAB](https://www.mathworks.com/)
  - `mathplot` : plots using
    [Mathematica](https://www.wolfram.com/mathematica/)
  - `octaveplot`: plots using [GNU
    Octave](https://www.gnu.org/software/octave/)
  - `ggplot2`: plots using [ggplot2](https://ggplot2.tidyverse.org/)
  - `gnuplot`: plots using [gnuplot](http://www.gnuplot.info/)
  - `graphviz`: graphs using [Graphviz](http://graphviz.org/)
  - `bokeh`: plots using the [Bokeh](https://bokeh.org/) visualization library
  - `plotsjl`: plots using the [Julia `Plots.jl`](https://docs.juliaplots.org/latest/) package
  - `plantuml`: diagrams using the [PlantUML](https://plantuml.com/) software suite
  - `sageplot`: plots using the [Sage](https://www.sagemath.org/) software system
  - `d2`: plots using [D2](https://d2lang.com/)
  - `asymptote`: plots using [Asymptote](https://asymptote.sourceforge.io/)

For example, this GNU Octave script:

    ~~~{,octaveplot}
    rand ("state", 2);
    x = 0:0.1:10;
    y = sin (x);
    lerr = 0.1 .* rand (size (x));
    uerr = 0.1 .* rand (size (x));
    errorbar (x, y, lerr, uerr);
    axis ([0, 10, -1.1, 1.1]);
    xlabel ("x");
    ylabel ("sin (x)");
    title ("Errorbar plot of sin (x)");
    ~~~

would produce this:

![Error bars](images/errorbar.png)
