# node-findImage

search template image (smaller) in a main image (bigger)

# Usage

```javascript
findImage("./1.png", "./3.png", {
  startPoint: [1, 1],
  endPoint: [899, 407],
  output: "./output.png",
});
// return { x: 898, y: 406 }
```

- main image path  
  main image (bigger) file path

- template image path  
  template image (smaller) file path

- options
  - startPoint & endPoint 【optional】  
    describe the area of the search.  
    The first one is the starting point,The second is the end point.
  - output 【optional】
    allow imageFinder to output the smaller picture that was found.
