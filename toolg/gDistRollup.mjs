// import path from 'path'
import rollupFiles from 'w-package-tools/src/rollupFiles.mjs'


let fdSrc = './src'
let fdTar = './dist'


async function rp() {

    await rollupFiles({ //rollupFiles預設會clean folder
        fns: 'WDataHtmlMinify.mjs',
        fdSrc,
        fdTar,
        nameDistType: 'kebabCase',
        // bNodePolyfill: true,
        // bMinify: false,
        globals: {
            'html-minifier': 'html-minifier', //編譯給前端用的html-minifier為官方打包後js檔(轉b64再於前端載入), 不使用node版故需剔除
            'os': 'os',
            'http': 'http',
            'https': 'https',
            'url': 'url',
            'path': 'path',
            'fs': 'fs',
        },
        external: [
            'html-minifier',
            'os',
            'http',
            'https',
            'url',
            'path',
            'fs',
        ],
    })
        .catch((err) => {
            console.log(err)
        })

}
rp()
    .catch((err) => {
        console.log(err)
    })

