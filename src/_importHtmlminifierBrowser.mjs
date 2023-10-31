import b642str from 'wsemi/src/b642str.mjs'
import haskey from 'wsemi/src/haskey.mjs'
import isWindow from 'wsemi/src/isWindow.mjs'
import getGlobal from 'wsemi/src/getGlobal.mjs'
import b64 from './_htmlminifierCoreBrowser.mjs'


function init() {
    //HtmlMinify目前沒辦法由Nodejs端按需引入的方式直接打包成為前端使用umd程式碼, 故改直接引用HtmlMinify官方github上已編譯之min.js檔, 於前端直接插入head中, 直接使用window['htmlminifier']

    //check, 若要編譯成webworker, 得再確認
    if (!isWindow()) {
        return null
    }

    //g
    let g = getGlobal()

    //check
    if (haskey(g, 'html-minifier')) {
        return g['html-minifier']
    }

    //ele
    let ele = g.document.createElement('script')

    //innerHTML
    ele.innerHTML = b642str(b64)

    //head
    let head = g.document.getElementsByTagName('head')[0]

    //appendChild
    head.appendChild(ele)

    //get htmlminifier
    let htmlminifier = g['html-minifier']

    return htmlminifier
}


let turf = init()


export default turf
