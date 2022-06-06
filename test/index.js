/*
 * @Author: moushicheng 1163675107@qq.com
 * @Date: 2022-05-25 17:27:05
 * @LastEditors: moushicheng 1163675107@qq.com
 * @LastEditTime: 2022-05-25 17:37:46
 * @FilePath: \findImage\test\test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { findImage, imageFinder } = require("../index");
const path = require('path');
console.log(
    findImage(path.join(__dirname, "./image/1.png"), path.join(__dirname, "./image/3.png"))
);