import isWindow from 'wsemi/src/isWindow.mjs'
import htmlminifierBrowser from './_importHtmlminifierBrowser.mjs'
import htmlminifierNode from './_importHtmlminifierNode.mjs'


/**
 * 取得引用htmlminifier物件
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-data-html-minify/blob/master/test/importHtmlminify.test.mjs Github}
 * @memberOf w-data-html-minify
 * @returns {Object} 回傳htmlminifier物件
 * @example
 *
 * let r = importHtmlminify
 * console.log(r)
 * // => [Function (anonymous)]
 *
 */
let htmlminifier = null
function protectShell() {

    if (isWindow()) {
        // console.log('use htmlminifierBrowser')
        htmlminifier = htmlminifierBrowser
    }
    else {
        // console.log('use htmlminifierNode')
        htmlminifier = htmlminifierNode
    }
    // console.log('htmlminifier', htmlminifier)

}
protectShell()

export default htmlminifier
