import fs from 'fs'
import w from 'wsemi'


//提取htmlminifier前端js轉base64
let c = fs.readFileSync('./src/htmlminifier.min.js', 'utf8')
c = `

${c}

let htmlminifier = require('html-minifier').minify

window['html-minifier']=htmlminifier

`
let b64 = w.str2b64(c)


//輸出json
let j = `let b64='${b64}'; export default b64`
fs.writeFileSync('./src/_htmlminifierCoreBrowser.mjs', j, 'utf8')


//node --experimental-modules --es-module-specifier-resolution=node src/_convertHtmlminifierCode.mjs
