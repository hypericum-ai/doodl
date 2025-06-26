## Bollinger bands

[Wikipedia](https://en.wikipedia.org/wiki/Bollinger_Bands)
describes Bollinger bands as "a type of statistical chart characterizing the prices and volatility over time of a financial instrument or commodity, using a formulaic method propounded by John Bollinger in the 1980s."

The data for a Bollinger band diagram is unique, given its special purpose. The data is given in a (JSON) list of dictionaries that include the following entries:

Entry | Description
-|-
date | Date of the trade
close | Closing price
upper | Upper bound of moving average
lower | Lower bound of moving average
movingAvg | Actual moving average

Here's an example:

```html
<bollinger
data='[
  { "date": "2024-03-01", "close": 100, "upper": 105, "lower": 95, "movingAvg": 100 },
  { "date": "2024-03-02", "close": 102, "upper": 107, "lower": 97, "movingAvg": 101 },
  { "date": "2024-03-03", "close": 104, "upper": 109, "lower": 99, "movingAvg": 102 },
  { "date": "2024-03-04", "close": 101, "upper": 106, "lower": 96, "movingAvg": 100.5 },
  { "date": "2024-03-05", "close": 98, "upper": 103, "lower": 93, "movingAvg": 98.5 },
  { "date": "2024-03-06", "close": 96, "upper": 101, "lower": 91, "movingAvg": 96.5 },
  { "date": "2024-03-07", "close": 99, "upper": 104, "lower": 94, "movingAvg": 98 },
  { "date": "2024-03-08", "close": 103, "upper": 108, "lower": 98, "movingAvg": 101 }
]'
  size='{"width":500,"height":350}'
  colors='deep'
>
</bollinger>
```

which looks like this:

<span id='bollinger_0'></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => 
  Doodl.bollinger(
    '#bollinger_0',
[
  { "date": "2024-03-01", "close": 100, "upper": 105, "lower": 95, "movingAvg": 100 },
  { "date": "2024-03-02", "close": 102, "upper": 107, "lower": 97, "movingAvg": 101 },
  { "date": "2024-03-03", "close": 104, "upper": 109, "lower": 99, "movingAvg": 102 },
  { "date": "2024-03-04", "close": 101, "upper": 106, "lower": 96, "movingAvg": 100.5 },
  { "date": "2024-03-05", "close": 98, "upper": 103, "lower": 93, "movingAvg": 98.5 },
  { "date": "2024-03-06", "close": 96, "upper": 101, "lower": 91, "movingAvg": 96.5 },
  { "date": "2024-03-07", "close": 99, "upper": 104, "lower": 94, "movingAvg": 98 },
  { "date": "2024-03-08", "close": 103, "upper": 108, "lower": 98, "movingAvg": 101 }
],
    {
      'width': 500,
      'height': 350
    },{},[
        '#A1C9F4', '#FFB482', '#8DE5A1', '#FF9F9B', '#D0BBFF',
        '#DEBB9B', '#FAB0E4', '#CFCFCF', '#FFFEA3', '#B9F2F0'
    ],0
  ));
}, 1000);
</script>
