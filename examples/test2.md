# 🌟 Markdown Demo Document

This is a **demo document** that shows off different styles and elements available in Markdown.  
You can use it for **docs, notes, or projects**.

---

## 📷 Images

Here’s an inline image:

![Bacon](https://placebacon.net/300/200)

Here’s an image as a clickable link:

[![More bacon!](https://placebacon.com/200x200)](https://placebacon.com/)


---


## 🔤 Text Styles

- **Bold text**
- *Italic text*
- ***Bold & Italic***
- ~~Strikethrough~~

> 💡 “Blockquote style looks like this!”


---


### Generating graphics from Python

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

### A Donut chart

<piechart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
  width=500
  height=500
  colors='pastel'
  donut=true
>
</piechart>

## 📋 Lists

### Unordered list
- Apples
- Oranges
  - Blood Orange
  - Mandarin
- Bananas

### Ordered list
1. First step
2. Second step
3. Third step

## ✅ Task List

- [x] Write Markdown  
- [ ] Add images  
- [ ] Celebrate 🎉  

### A chord diagram 

<chord
data='[
  [0, 5, 10, 2],
  [5, 0, 3, 7],
  [10, 3, 0, 6],
  [2, 7, 6, 0]
]
'
  width=500
  height=500
  colors='deep'
>
</chord>


## 🧾 Code Blocks

Inline code: `console.log("Hello Markdown!")`

```javascript
// JavaScript Example
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("World"));