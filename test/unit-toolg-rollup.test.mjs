import fs from 'fs'
import path from 'path'
import assert from 'assert'
import { createRequire } from 'module'
import { mkCopy, rmCopy, runNode } from './tools/runInCopy.mjs'


//規格來源: C:/opensrcOper/dspec/自有套件之發布與建置腳本.md 規則4(gDistRollup.mjs: fdSrc='./src', fdTar='./dist', 相對cwd, 選項寫於本檔), 規則3(A型建置dist之最後一支為toolg/gDistRollup.mjs)
//套件側要求: package.json main為dist/w-data-html-minify.umd.js; src/_importHtmlminifierNode.mjs說明node端引用官方html-minifier, 故編譯產物不得內含之而須維持external(前端另以b64注入版本)
//測試方式: 規則4, 把所需檔複製到test/_tmp/<名>/並以cwd=副本執行toolg腳本
describe('toolg/gDistRollup.mjs', function() {

    let name = 'toolg-rollup'
    let fdCopy = ''
    let rr = null
    let fpJs = ''

    before(async function() {
        this.timeout(180000)
        fdCopy = mkCopy(name, ['src', 'toolg/gDistRollup.mjs', 'package.json'])
        fpJs = path.join(fdCopy, 'dist', 'w-data-html-minify.umd.js')
        rr = await runNode(fdCopy, 'toolg/gDistRollup.mjs', 170000)
    })

    after(function() {
        rmCopy(name)
    })

    it('以副本根為cwd執行, 離開碼0(規則4: 失敗須以非0結束使發布流程得知)', function() {
        assert.strict.equal(rr.code, 0, `stderr: ${rr.stderr} stdout: ${rr.stdout}`)
    })

    it('產出<cwd>/dist/w-data-html-minify.umd.js與.map(規則4: fdTar為./dist, nameDistType為kebabCase, package.json main所指)', function() {
        assert.strict.equal(fs.existsSync(fpJs), true)
        assert.strict.equal(fs.existsSync(`${fpJs}.map`), true)
    })

    it('UMD外部模組僅html-minifier, 且三種載入方式(CJS/AMD/全域)皆引用外部之html-minifier而非內含', function() {
        let c = fs.readFileSync(fpJs, 'utf8')
        assert.strict.equal(c.includes('require("html-minifier")'), true)
        assert.strict.equal(c.includes('define(["html-minifier"]'), true)
        assert.strict.equal(c.includes('["html-minifier"]'), true)
        //gDistRollup.mjs所列之node內建模組(os,http,https,url,path,fs)為external, 產物不應在載入時require它們
        assert.strict.equal(/require\((["'])(?:os|http|https|url|path|fs)\1\)/.test(c), false)
    })

    it('產物版本banner為副本package.json之name與version', function() {
        let c = fs.readFileSync(fpJs, 'utf8')
        let pkg = JSON.parse(fs.readFileSync(path.join(fdCopy, 'package.json'), 'utf8'))
        assert.strict.equal(c.startsWith(`/*!\n * ${pkg.name} v${pkg.version}\n`), true)
    })

    it('以node載入產物, 匯出為函數並壓縮HTML(同test/minify.test.mjs之輸入輸出)', function() {
        let hin = `
        <html>
            <head></head>
            <body>abc</body>
        </html>
        `
        let hout = '<html><head></head><body>abc</body></html>'
        let require = createRequire(import.meta.url)
        let wdhm = require(fpJs)
        assert.strict.equal(typeof wdhm, 'function')
        assert.strict.equal(wdhm(hin), hout)
    })

})
