/*
 * @Author: moushicheng 1163675107@qq.com
 * @Date: 2022-05-24 00:09:04
 * @LastEditors: moushicheng 1163675107@qq.com
 * @LastEditTime: 2022-05-25 16:57:51
 * @FilePath: \findImage\findImage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const images = require("images");
const compareSimilarity = require("./compareSimilarity");
class imageFinder {

  constructor(fatherImageSrc, sonImageSrc, options = {}) {
    this.fatherNode = {}
    this.sonNode = {}
    this.setFather(fatherImageSrc);
    this.setSon(sonImageSrc);
    this.options = options;
    this.startPoint = options.startPoint ? options.startPoint : [0, 0];
    this.endPoint = options.endPoint ? options.endPoint : [this.fatherNode.width, this.fatherNode.height]
  }
  find() {
    for (let i = this.startPoint[1]; i < this.endPoint[1]; i++) {
      for (let j = this.startPoint[0]; j < this.endPoint[0]; j++) {
        if (this.isSameCorner(j, i)) {
          const result = compareSimilarity(
            this.sonNode.image,
            images(this.fatherNode.image, j, i, this.sonNode.width, this.sonNode.height)
          )
          // console.log(result, ' x: ' + j, 'y: ' + i);

          if (result > 0.9) {
            if (this.options.output) {
              images(this.fatherNode.image, j, i, this.sonNode.width, this.sonNode.height).save(this.options.output);
            }
            return {
              x: j,
              y: i
            }
          }
        }
      }
    }
  }

  isSameCorner(x, y) {
    //超出边界则退出
    if (x >= this.fatherNode.width - this.sonNode.width || y >= this.fatherNode.height - this.sonNode.height) {
      return false;
    }

    const right = (this.sonNode.width - 1) * 4;
    const bottom = ((this.sonNode.height - 1) * this.fatherNode.width) * 4
    const middleBottom = Math.floor(this.sonNode.height / 2) * this.fatherNode.width * 4
    const offset = x * 4 + ((y - 1) * this.fatherNode.width) * 4; //offsetX+offsetY

    if (this.comparePoint(offset, 0)) return false;
    if (this.comparePoint(offset + right, 1)) return false;
    if (this.comparePoint(offset + right + bottom, 2)) return false;
    if (this.comparePoint(offset + bottom, 3)) return false;
    if (this.comparePoint(offset + middleBottom + Math.floor(this.sonNode.width / 2) * 4, 4)) return false;
    return true;
  }
  comparePoint(offset, i) {
    const fatherData = this.fatherNode.data;

    return fatherData[12 + offset] != this.sonNode.conner[i][0] ||
      fatherData[12 + offset + 1] != this.sonNode.conner[i][1] ||
      fatherData[12 + offset + 2] != this.sonNode.conner[i][2] ||
      fatherData[12 + offset + 3] != this.sonNode.conner[i][3]
  }
  setFather(src) {
    const fatherImage = images(src);
    this.fatherNode.image = fatherImage;
    this.fatherNode.width = fatherImage.width();
    this.fatherNode.height = fatherImage.height();
    this.fatherNode.data = fatherImage.encode("raw");
  }
  setSon(src) {
    const sonImage = images(src);
    const width = sonImage.width();
    const height = sonImage.height();
    if (width <= 8 || height <= 8) {
      throw new Error('image height or width must be over 8 ')
    }
    this.sonNode.image = sonImage
    this.sonNode.width = width
    this.sonNode.height = height;
    this.sonNode.data = sonImage.encode("raw");
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
      return [data[12 + offset], data[12 + offset + 1], data[12 + offset + 2], data[12 + offset + 3]]
    }
  }
}

module.exports = {
  findImage: function findImage(fatherImageSrc, sonImageSrc, options) {
    return new imageFinder(fatherImageSrc, sonImageSrc, options).find();
  },
  imageFinder: imageFinder
}