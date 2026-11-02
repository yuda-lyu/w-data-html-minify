import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'


//套件根, 本檔位於<套件根>/test/tools/
let fdRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
let fdTmp = path.join(fdRoot, 'test', '_tmp')


//測試專用副本資料夾: 放於<套件根>/test/_tmp/<name>/, 位於套件內才解析得到套件根之node_modules
function getCopyDir(name) {
    let fd = path.resolve(fdTmp, name)
    if (path.dirname(fd) !== fdTmp) {
        throw new Error(`invalid copy name: ${name}`)
    }
    return fd
}


//把套件根內之檔案或資料夾複製為副本, entries為相對套件根之路徑陣列, 副本內維持同相對路徑
function mkCopy(name, entries) {
    let fd = getCopyDir(name)
    fs.rmSync(fd, { recursive: true, force: true })
    fs.mkdirSync(fd, { recursive: true })
    for (let entry of entries) {
        let fpSrc = path.join(fdRoot, entry)
        let fpTar = path.join(fd, entry)
        fs.mkdirSync(path.dirname(fpTar), { recursive: true })
        fs.cpSync(fpSrc, fpTar, { recursive: true })
    }
    return fd
}


//刪除副本資料夾, 只刪mkCopy建立者
function rmCopy(name) {
    fs.rmSync(getCopyDir(name), { recursive: true, force: true })
}


//於副本內以cwd=副本執行node腳本(同發布列於套件根執行之方式), 回傳{ code, stdout, stderr }
function runNode(cwd, script, timeout = 150000) {
    return new Promise((resolve, reject) => {
        let p = spawn(process.execPath, [script], { cwd, windowsHide: true })
        let stdout = ''
        let stderr = ''
        p.stdout.on('data', (d) => {
            stdout += d
        })
        p.stderr.on('data', (d) => {
            stderr += d
        })
        let timer = setTimeout(() => {
            p.kill()
            reject(new Error(`timeout ${timeout}ms: node ${script}`))
        }, timeout)
        p.on('error', (err) => {
            clearTimeout(timer)
            reject(err)
        })
        p.on('close', (code) => {
            clearTimeout(timer)
            resolve({ code, stdout, stderr })
        })
    })
}


export { fdRoot, mkCopy, rmCopy, runNode }
