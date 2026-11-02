import fs from 'fs'
import path from 'path'
import assert from 'assert'
import b642str from 'wsemi/src/b642str.mjs'
import { fdRoot, mkCopy, rmCopy, runNode } from './tools/runInCopy.mjs'


//規格來源: C:/opensrcOper/dspec/自有套件之發布與建置腳本.md 規則5之3(注入已編譯之前端用程式碼: toolg/convertXXXCode.mjs, 讀已編譯之檔, 以str2b64轉base64, 寫src/_<名>CoreBrowser.mjs, 內容為`let b64='…'; export default b64`)
//測試方式: 規則4, 把所需檔複製到test/_tmp/<名>/並以cwd=副本執行toolg腳本(同發布列於套件根執行之方式)
describe('toolg/convertHtmlminifierCode.mjs', function() {

    let name = 'toolg-convert'
    let fdCopy = ''
    let rr = null
    let fpOut = ''

    before(async function() {
        fdCopy = mkCopy(name, ['src/htmlminifier.min.js', 'toolg/convertHtmlminifierCode.mjs'])
        fpOut = path.join(fdCopy, 'src', '_htmlminifierCoreBrowser.mjs')
        rr = await runNode(fdCopy, 'toolg/convertHtmlminifierCode.mjs')
    })

    after(function() {
        rmCopy(name)
    })

    it('以套件根為cwd執行, 離開碼0(規則5之3: 發布列於套件根執行)', function() {
        assert.strict.equal(rr.code, 0, `stderr: ${rr.stderr}`)
    })

    it('寫出src/_htmlminifierCoreBrowser.mjs, 內容為`let b64=\'…\'; export default b64`(規則5之3)', function() {
        assert.strict.equal(fs.existsSync(fpOut), true)
        let c = fs.readFileSync(fpOut, 'utf8')
        assert.strict.equal(/^let b64='[A-Za-z0-9+/=]+'; export default b64$/.test(c), true)
    })

    it('b64解碼為已編譯之htmlminifier全文, 後接window[\'html-minifier\']注入(供前端於執行期注入後取用)', function() {
        let c = fs.readFileSync(fpOut, 'utf8')
        let b64 = c.match(/^let b64='([^']+)'/)[1]
        let h = b642str(b64)
        let cmin = fs.readFileSync(path.join(fdRoot, 'src', 'htmlminifier.min.js'), 'utf8')
        assert.strict.equal(h.includes(cmin), true)
        assert.strict.equal(h.trimEnd().endsWith('window[\'html-minifier\']=htmlminifier'), true)
        assert.strict.equal(h.includes('let htmlminifier = require(\'html-minifier\').minify'), true)
    })

    it('產物與套件內現檔src/_htmlminifierCoreBrowser.mjs相同(現檔與來源同步)', function() {
        let c = fs.readFileSync(fpOut)
        let cNow = fs.readFileSync(path.join(fdRoot, 'src', '_htmlminifierCoreBrowser.mjs'))
        assert.strict.equal(c.equals(cNow), true)
    })

})
