/*
 * @Author: moushicheng 1163675107@qq.com
 * @Date: 2022-05-22 21:33:57
 * @LastEditors: moushicheng 1163675107@qq.com
 * @LastEditTime: 2022-05-25 17:19:54
 * @FilePath: \findImage\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { findImage, imageFinder } = require("./findImage");
const compareSimilarity = require("./compareSimilarity");
console.log(
    findImage("./image/1.png", "./image/3.png", {
        startPoint: [1, 1],
        endPoint: [899, 407],
        output: './output.png'
    })
);

exports.module = {
    compareSimilarity,
    findImage,
    imageFinder
}
