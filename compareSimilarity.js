/*
 * @Author: moushicheng 1163675107@qq.com
 * @Date: 2022-05-22 23:29:17
 * @LastEditors: moushicheng 1163675107@qq.com
 * @LastEditTime: 2022-05-25 17:29:48
 * @FilePath: \findImage\compareSimilarity.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class comparer {
  constructor() {
  }
  setHash(node){
     const image=this.preProcess(node);
     const hash =this.createHash(image);
     node['hash']=hash;
     return hash;
  }
  preProcess(node) {
    const imageData=node.data;
    //缩小图片至8*8

    
    let totalGray = 0,total=0;
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
  
    console.log(totalGray,total);
    return {
      buffer: imageData,
      grayAverage: Math.floor(totalGray / total),
    };
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
  const length=fatherImage.buffer.length
  return (length - hamming(fatherHash, sonHash)) / length
};

function preProcess(imageData) {
  //缩小图片至8*8
  let totalGray = 0;
  let total=0;
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

module.exports={
  compareSimilarity,
  comparer
}