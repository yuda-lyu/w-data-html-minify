# w-data-html-minify
A tool for minify html.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![npm version](http://img.shields.io/npm/v/w-data-html-minify.svg?style=flat)](https://npmjs.org/package/w-data-html-minify) 
[![license](https://img.shields.io/npm/l/w-data-html-minify.svg?style=flat)](https://npmjs.org/package/w-data-html-minify) 
[![gzip file size](http://img.badgesize.io/yuda-lyu/w-data-html-minify/master/dist/w-data-html-minify.umd.js.svg?compression=gzip)](https://github.com/yuda-lyu/w-data-html-minify)
[![npm download](https://img.shields.io/npm/dt/w-data-html-minify.svg)](https://npmjs.org/package/w-data-html-minify) 
[![npm download](https://img.shields.io/npm/dm/w-data-html-minify.svg)](https://npmjs.org/package/w-data-html-minify) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-data-html-minify.svg)](https://www.jsdelivr.com/package/npm/w-data-html-minify)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-data-html-minify/global.html).

## Installation
### Using npm(ES6 module):
> **Note:** w-data-html-minify is mainly dependent on `html-minifier`.
```alias
npm i w-data-html-minify
```

#### Example:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-data-html-minify/blob/master/g.test.minify.mjs)]
```alias
import wdhm from './src/WDataHtmlMinify.mjs'
// import wdhm from './dist/w-data-html-minify.umd.js'
// import wdhm from 'w-data-html-minify'

let hin = `
<html>
    <head></head>
    <body>abc</body>
</html>
`
let hout = wdhm(hin)
console.log(hout)
// => <html><head></head><body>abc</body></html>
```

### In a browser(UMD module):
> **Note:** w-data-html-minify does not dependent on any package.

[Necessary] Add script for w-data-html-minify.
```alias
<script src="https://cdn.jsdelivr.net/npm/w-data-html-minify@1.0.6/dist/w-data-html-minify.umd.js"></script>
```

> **minify html:** [ex-html-minify.html](https://yuda-lyu.github.io/w-data-html-minify/examples/ex-html-minify.html) [[source code](https://github.com/yuda-lyu/w-data-html-minify/blob/master/docs/examples/ex-html-minify.html)]

```alias
let wdhm = window['w-data-html-minify']
// console.log(wdhm)

let hin = `
<html>
    <head></head>
    <body>abc</body>
</html>
`
let hout = wdhm(hin)
console.log(hout)
// => <html><head></head><body>abc</body></html>
```
