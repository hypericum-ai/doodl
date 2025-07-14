Building blocks:


<bubblechart
 file='{"path": "data/bubbles.json", "format": "json"}'
size='{"width":500,"height":500}'
colors='deep'
ease_in = 1
> </bubblechart>



<bubblechart
 file='{"path": "data/flare.json", "format": "json"}'
size='{"width":900,"height":900}'
colors='deep'
ease_in = 1
drag_animations=1
> </bubblechart>


<voronoi
data='[
  { "x": 100, "y": 200, "name": "A" },
  { "x": 150, "y": 80, "name": "B" },
  { "x": 300, "y": 150, "name": "C" },
  { "x": 400, "y": 300, "name": "D" },
  { "x": 250, "y": 400, "name": "E" },
  { "x": 500, "y": 200, "name": "F" },
  { "x": 350, "y": 100, "name": "G" },
  { "x": 180, "y": 320, "name": "H" },
  { "x": 90, "y": 450, "name": "I" },
  { "x": 600, "y": 350, "name": "J" }
]'
  size='{"width":850,"height":500}'
  colors='flare'
>
</voronoi>


<areachart
data='[
  { "date": "2024-01-01", "catA": 10, "catB": 20, "catC": 30 },
  { "date": "2024-01-02", "catA": 15, "catB": 25, "catC": 35 },
  { "date": "2024-01-03", "catA": 20, "catB": 22, "catC": 28 },
  { "date": "2024-01-04", "catA": 18, "catB": 30, "catC": 25 },
  { "date": "2024-01-05", "catA": 22, "catB": 28, "catC": 32 },
  { "date": "2024-01-06", "catA": 19, "catB": 26, "catC": 29 },
  { "date": "2024-01-07", "catA": 24, "catB": 30, "catC": 35 },
  { "date": "2024-01-08", "catA": 28, "catB": 33, "catC": 40 }
]'
  size='{"width":500,"height":500}'
  colors='flare'
>
</areachart>


<contour
data='[
  [0, 10, 20, 30, 20],
  [10, 20, 30, 40, 30],
  [20, 30, 40, 50, 40],
  [10, 20, 30, 40, 30],
  [0, 10, 20, 30, 20]
]'
  size='{"width":500,"height":500}'
  colors='flare'
>
</contour>

<dendrogram
  file='{"path": "data/dendro.json", "format": "json"}'
  size='{"width":1000,"height":500}'
  colors='pastel'
>
</dendrogram>

<dendrogram
  file='{"path": "data/hcl.json", "format": "json"}'
  size='{"width":1500,"height":1500}'
  colors='flare'
  view_scale_factor = '0.9'
>
</dendrogram>

<skey
  size='{"width":600,"height":225}'
  file='{"path": "data/energy.json", "format": "json"}'
  n_colors=10
  colors='pastel'
  link_color='"source-target"'
  node_align='"right"'
>
</skey>

```{.matplotlib}
import pandas as pd
from scipy.stats import truncnorm
import seaborn as sns

n_companies = 500

data = {
    'margin': truncnorm.rvs(-3, 3, scale=0.05, size=n_companies),
    'growth': truncnorm.rvs(-3, 3, scale=1.0/3.0, size=n_companies),
    'volatility': truncnorm.rvs(-3, 3, loc=0.5, scale=0.5/3.0, size=n_companies),
}

df = pd.DataFrame(data)

df['accept'] = (df.margin / 0.15 + df.growth + (1.0 - df.volatility)) > 1

sns.pairplot(df, hue='accept')
```

<force
  file='{"path":"data/miserables.json","format":"json"}'
  size='{"width":1500,"height":1300}'
  colors='pastel'
>
</force>

<disjoint
    file='{"path":"data/graph.json","format":"json"}'
    size='{"width":1000,"height":1000}'
    colors='pastel'>
</disjoint>

```{.matplotlib}
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap
import numpy as np
import pandas as pd
from scipy.stats import truncnorm
import seaborn as sns

with open('data/factors.txt') as ifp:
    factors = ifp.readlines()

Z = pd.DataFrame(truncnorm.rvs(-3, 3, scale=1.0 / 3.0, size=(len(factors), len(factors))))

Z = pd.DataFrame(np.triu(Z.values) + np.triu(Z.values, 1).T,
    index=factors,
    columns=factors
)

x = range(Z.shape[0])

np.fill_diagonal(Z.values, 1.0)

fig, ax = plt.subplots(figsize=(8, 8))
pastel_cmap = ListedColormap(sns.color_palette("coolwarm").as_hex())
im = ax.imshow(Z, cmap=pastel_cmap)

ax.set_xticks(x, labels=Z.index,
              rotation=45, ha="right", rotation_mode="anchor")
ax.set_yticks(x, labels=Z.index)
fig.tight_layout()
```

<skey
  file='{"path": "data/features.json", "format": "json" }'
  size='{"width": 1000, "height": 1000 }'
  node_align="'right'"
  n_colors=20
  colors='husl'
></skey>
