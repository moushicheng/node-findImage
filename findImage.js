/*
 * @Author: moushicheng 1163675107@qq.com
 * @Date: 2022-05-24 00:09:04
 * @LastEditors: moushicheng 1163675107@qq.com
 * @LastEditTime: 2022-05-25 16:57:51
 * @FilePath: \findImage\findImage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const images = require("images");
// const comparer = require("./compareSimilarity");
const {compareSimilarity,comparer} = require("./compareSimilarity");

class imageFinder {

  constructor(fatherNode, sonNode, options = {}) {
    this.comparer=new comparer()
    if(fatherNode){
      this.fatherNode = fatherNode
    }
    if(sonNode){
      this.setSon(sonNode)
    }

    this.options = options;
    this.startPoint = options.startPoint ? options.startPoint : [0, 0];
    this.endPoint = options.endPoint ? options.endPoint : [this.fatherNode.width, this.fatherNode.height]
  }
  find() {
    for (let i = this.startPoint[1]; i < this.endPoint[1]; i++) {
      for (let j = this.startPoint[0]; j < this.endPoint[0]; j++) {
        if (this.isSameCorner(j, i)) {
          // const result = compareSimilarity(
          //   this.getFatherBufferInSonSize(j, i),
          //   this.sonNode.data
          // )
          // console.log(result);
          const fatherHash=this.comparer.setHash({
            data:this.getFatherBufferInSonSize(j, i),
            width:this.sonNode.width,
            height:this.sonNode.height
          });
          const sonHash=this.sonNode['hash']
          const length=this.sonNode.data.length;
          const result=(length-this.comparer.hamming(fatherHash,sonHash))/ length
          if (result > 0.9) {
            return {
              x: j,
              y: i
            }
          }
        }
      }
    }
    return 'no find'
  }
  getFatherBufferInSonSize(x, y) {
    const data = this.fatherNode.data
    const fatherArea = []
    let z = 0;
    for (let i = y; i < y + this.sonNode.height; i++) {
      for (let j = x * 4; j < (x + this.sonNode.width) * 4; j++) {
        fatherArea[z++] = data[i * this.fatherNode.width * 4 + j]
      }
    }

    return fatherArea
  }

  isSameCorner(x, y) {
    //超出边界则退出
    if (x > this.fatherNode.width - this.sonNode.width || y > this.fatherNode.height - this.sonNode.height) {
      return false;
    }

    const right = (this.sonNode.width - 1) * 4;
    const bottom = ((this.sonNode.height - 1) * this.fatherNode.width) * 4
    const middleBottom = Math.floor(this.sonNode.height / 2) * this.fatherNode.width * 4
    const offset = x * 4 + (y * this.fatherNode.width) * 4; //offsetX+offsetY

    if (this.comparePoint(offset, 0)) return false;
    if (this.comparePoint(offset + right, 1)) return false;
    if (this.comparePoint(offset + right + bottom, 2)) return false;
    if (this.comparePoint(offset + bottom, 3)) return false;
    if (this.comparePoint(offset + middleBottom + Math.floor(this.sonNode.width / 2) * 4, 4)) return false;
    return true;
  }
  comparePoint(offset, i) {
    const fatherData = this.fatherNode.data;
    return fatherData[offset] != this.sonNode.conner[i][0] ||
      fatherData[offset + 1] != this.sonNode.conner[i][1] ||
      fatherData[offset + 2] != this.sonNode.conner[i][2] ||
      fatherData[offset + 3] != this.sonNode.conner[i][3]
  }
  setSon(node){
    this.sonNode = node;
    this.setSonConner();
    this.comparer.setHash(node);
  }
  setSonConner() {
    const width = this.sonNode.width;
    const height = this.sonNode.height;
    const data = this.sonNode.data;
    const right = (width - 1) * 4;
    const bottom = ((height - 1) * width) * 4;
    const middleBottom = Math.floor(height / 2) * width * 4
    this.sonNode.conner = [
      getPoints(0), //左上角
      getPoints(right), //右上角
      getPoints(bottom + right), //右下角
      getPoints(bottom), //左下角
      getPoints(middleBottom + Math.floor(width / 2) * 4)//中间点
    ]
    function getPoints(offset) {
      return [data[offset], data[offset + 1], data[offset + 2], data[offset + 3]]
    }
  }
  print(data,i,j){
    for(let k=i;k<j;k+=4){
      console.log(data[k],data[k+1],data[k+2],data[k+3]);
    }
  }
}

module.exports = {
  findImage: function findImage(fatherImageSrc, sonImageSrc, options) {
    const fatherImage = images(fatherImageSrc);
    const sonImage = images(sonImageSrc)
    const fatherData = fatherImage.encode("raw");
    const sonData = sonImage.encode("raw");

    return new imageFinder({
      data: fatherData.slice(12),
      width: fatherImage.width(),
      height: fatherImage.height(),
    }, {
      data: sonData.slice(12),
      width: sonImage.width(),
      height: sonImage.height(),
    }, options).find()
  },
  imageFinder: imageFinder
}