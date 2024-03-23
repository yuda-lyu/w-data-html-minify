import wdhm from './src/WDataHtmlMinify.mjs'
// import wdhm from './dist/w-data-html-minify.umd.js'


let hin = `
<html>
    <head></head>
    <body>abc</body>
</html>
`
let hout = wdhm(hin)
console.log(hout)
// => <html><head></head><body>abc</body></html>

//node --experimental-modules --es-module-specifier-resolution=node g.test.minify.mjs
