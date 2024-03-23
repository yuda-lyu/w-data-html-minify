import get from 'lodash-es/get.js'
import htmlMinifier from 'html-minifier'

//同前端直接取用minify
let htmlminifier = get(htmlMinifier, 'minify', null)

export default htmlminifier
