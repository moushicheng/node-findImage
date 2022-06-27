# node-findImage

search template image (smaller) in a main image (bigger)
从大图中搜寻小图的坐标位置信息

# Usage

```javascript 
const { findImage } = require("index.js"); //NPM will be introduced later
```

```javascript
findImage("./1.png", "./3.png", {
  startPoint: [1, 1],
  endPoint: [1000, 1000],
  describe:0.9
});
// return { x: 898, y: 406 }
```

- main image path  
  file path

- template image path  
  file path

- options
  - startPoint & endPoint   
    describe the matrix region of the main image for searching 
     
  - precision [default 0.9]  
    describe similarity  
    if The similarity of the graphs found > precision ,return {x,y};
