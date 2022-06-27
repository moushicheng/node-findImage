/*
 * @Author: moushicheng 1163675107@qq.com
 * @Date: 2022-05-22 23:29:17
 * @LastEditors: moushicheng 1163675107@qq.com
 * @LastEditTime: 2022-05-25 17:29:48
 * @FilePath: \findImage\compareSimilarity.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class comparer {
  constructor() { }
  setHash(node) {
    const image = this.preProcess(node);
    const hash = this.createHash(image);
    node['hash'] = hash;
    return hash;
  }
  preProcess(node) {
    //缩小图片至8*8
    const imageData = this.reSize(node, 8, 8)
   //计算灰度值 
    let totalGray = 0, total = 0;
    for (let i = 0; i < imageData.length; i += 4) {
      const gray = Math.floor(
        (0.33 * imageData[i] + 0.33 * imageData[i + 1] + 0.33 * imageData[i + 2]) / 4
      );
      imageData[i] = gray;
      imageData[i + 1] = gray;
      imageData[i + 2] = gray;
      imageData[i + 3] = 255;
      totalGray += gray;
      total++;
    }
    return {
      buffer: imageData,
      grayAverage: Math.floor(totalGray / total),
    };
  }
  reSize(node, width, height) {
    const data=[];
    const widthRatio = Math.ceil(node.width / width /4)*4;
    const heightRatio = Math.ceil(node.height / height /4)*4;
    let k=0;
    for (let j = 0; j < node.height; j += heightRatio) {
      for (let i = 0; i < node.width; i += widthRatio) {
         data[k++]=node.data[i+j*node.width]
         data[k++]=node.data[i+j*node.width+1]
         data[k++]=node.data[i+j*node.width+2]
         data[k++]=node.data[i+j*node.width+3]
      }
    }


    return data;
  }
  createHash(image) {
    const hash = []
    for (let i = 0; i < image.buffer.length; i += 4) {
      hash.push(image.buffer[i] >= image.grayAverage ? 1 : 0);
    }
    return hash.join('');
  }
  hamming(h1, h2) {
    var diff = 0;
    for (var i = 0; i < h1.length; i++) {
      //位运算^异或都相同为0，不同为1
      diff += h1[i] ^ h2[i];
    }
    return diff;
  }
}

function compareSimilarity(fatherNode, sonNode) {
  const fatherImage = preProcess(fatherNode);
  const sonImage = preProcess(sonNode);
  const fatherHash = createHash(fatherImage);
  const sonHash = createHash(sonImage);
  const length = fatherImage.buffer.length
  return (length - hamming(fatherHash, sonHash)) / length
};

function preProcess(imageData) {
  //缩小图片至8*8
  let totalGray = 0;
  let total = 0;
  for (let i = 0; i < imageData.length; i += 4) {
    const gray = Math.floor(
      (0.33 * imageData[i] + 0.33 * imageData[i + 1] + 0. * imageData[i + 2]) / 4
    );
    imageData[i] = gray;
    imageData[i + 1] = gray;
    imageData[i + 2] = gray;
    imageData[i + 3] = 255;
    totalGray += gray;
    total++;
  }
  return {
    buffer: imageData,
    grayAverage: Math.floor(totalGray / total),
  };
}
function createHash(image) {
  const hash = []
  for (let i = 0; i < image.buffer.length; i += 4) {
    hash.push(image.buffer[i] >= image.grayAverage ? 1 : 0);
  }
  return hash.join('');
}
//计算汉明记录
function hamming(h1, h2) {
  var diff = 0;
  for (var i = 0; i < h1.length; i++) {
    //位运算^异或都相同为0，不同为1
    diff += h1[i] ^ h2[i];
  }
  return diff;
}

module.exports = {
  compareSimilarity,
  comparer
}