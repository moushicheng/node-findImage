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
// const images = require('images')
console.log(
    findImage(path.join(__dirname, "./image/3.png"), path.join(__dirname, "./image/3.png"))
);



// let raw = images(200, 200).encode('raw');
// let q = 1, p = 0;
// for (let i = 12; i < raw.length; i += 4) {
//     raw[i] = q
//     raw[i + 1] = p
//     raw[i + 2] = 0
//     raw[i + 3] = 255

//     if (q >= 200) {
//         q = 0;
//         p++;
//     }
//     q++;
// }
// images(raw).save('./test.png')
// images(raw).size(8,8).save('./test_small.png')


// const buf = images(10, 10).size(10, 10).encode('raw');
// for (let i = 0; i < 1000; i++) {
//   buf[12 + i * 4] = i % 255
//   buf[12 + i * 4 + 1] = i % 255
//   if (i % 255 + Math.floor(i / 255) <= 255) {
//     buf[12 + i * 4 + 2] = i % 255 + Math.floor(i / 255)
//   } else {
//     buf[12 + i * 4 + 2] = i % 255
//   }
//   buf[12 + i * 4 + 3] = 255
// }
// images(buf).save('./1.png')
