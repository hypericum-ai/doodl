<!-- 
### A Polar chart from data file format


<polar
  path="xy.csv"
  width=900
  height=900
  colors='deep'
>
</polar>
 -->


### A curved area radial_areachart 


<radial_areachart
  data='[
  { "x": 0, "y": 101 },
  { "x": 1.5, "y": 201 },
  { "x": 2.4, "y": 151 },
  { "x": 3.6, "y": 251 },
  { "x": 4, "y": 301 },
  { "x": 5, "y": 351 },
  { "x": 6, "y": 275 },
  { "x": 7.2, "y": 180 },
  { "x": 8, "y": 220 },
  { "x": 9, "y": 260 },
  { "x": 10, "y": 300 },
  { "x": 11, "y": 210 },
  { "x": 12, "y": 223 },
  { "x": 13, "y": 110 },
  { "x": 14, "y": 195 },
  { "x": 15, "y": 20 },
  { "x": 16, "y": 0 },
  { "x": 17, "y": -30 }
]'
  width=500
  height=400
  colors='deep'
  curved='true'
  donut='true'
>
</radial_areachart>




### A NON-curved area radial_areachart 


<radial_areachart
  data='[
  { "x": 0, "y": 101 },
  { "x": 1, "y": 201 },
  { "x": 2, "y": 151 },
  { "x": 3, "y": 251 },
  { "x": 4, "y": 301 },
  { "x": 5, "y": 351 },
  { "x": 6, "y": 275 },
  { "x": 7, "y": 180 },
  { "x": 8, "y": 220 },
  { "x": 9, "y": 260 },
  { "x": 10, "y": 300 },
  { "x": 11, "y": 210 }
]'
  width=500
  height=400
  colors='deep'
>
</radial_areachart>