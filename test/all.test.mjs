import assert from 'assert'
import wdhm from '../src/WDataHtmlMinify.mjs'


describe('all', function() {

    let hin = `
    <html>
        <head></head>
        <body>abc</body>
    </html>
    `
    let hout = `<html><head></head><body>abc</body></html>`

    it(`should return ${hout} when input ${hin}`, function() {
        let r = wdhm(hin)
        assert.strict.deepEqual(hout, r)
    })

})
