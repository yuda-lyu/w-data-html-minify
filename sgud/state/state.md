# 現況(state)

本檔記載當前已開發功能之最新狀態:各功能做到哪裡、對應之規則帳本條目與測試檔、已知缺口與待辦、最近一次驗證或發布之版本.規則帳本為藍圖(`sgud/rule/rulebook.md`),狀態為現況,兩者比對即知尚未做到者.只記現況,不寫過程(過程寫入經驗`sgud/exp/experience.md`).

## 功能

| 功能 | 狀態 | 規則帳本 | 測試 |
|---|---|---|---|
| HTML 壓縮 `WDataHtmlMinify(h, opt)`(前後端皆可用:node 端用 `html-minifier`,瀏覽器端用官方已打包 js 之 base64 於執行期注入 head) | 已完成 | R-TEST T1 | `test/minify.test.mjs` |
| 前端用 htmlminifier 之 base64 模組產製 `toolg/convertHtmlminifierCode.mjs` → `src/_htmlminifierCoreBrowser.mjs` | 已完成;**手動執行,不在 `script.txt` 發布列** | R-BUILD | `test/unit-toolg-convert.test.mjs` |
| 發布與建置(`toolg/`,A 型) | 已依 dspec〈自有套件之發布與建置腳本〉 | R-BUILD | `test/unit-toolg-rollup.test.mjs` |

## 建置方式

- 於套件根(cwd)依 `script.txt` 列序執行(`script.txt` 由使用者維護):`modifyReadme` → `cleanFolder`(清 `dist`、`docs`)→ `jsdoc -c .jsdoc`(產 `docs/`)→ `gDocsExams` → `gDistRollup`(產 `dist/w-data-html-minify.umd.js` 與 `.map`)→ git → deploy.
- `src/htmlminifier.min.js` 更新後須手動執行 `node toolg/convertHtmlminifierCode.mjs` 重產 `src/_htmlminifierCoreBrowser.mjs`.
- 細節與盤點見規則帳本 R-BUILD,規格為 dspec〈自有套件之發布與建置腳本〉.

## 已知缺口與待辦

- `convertHtmlminifierCode` 是否列入發布列(排在 `gDistRollup` 之前),待使用者決定並自行改 `script.txt`.
- `toolg/gDocsExams.mjs` 為主控之未提交批次改動,呼叫 w-package-tools 之 `genDocsExams`;目前安裝之 w-package-tools 1.1.21 無此檔(`node toolg/gDocsExams.mjs` 會 `ERR_MODULE_NOT_FOUND`),待升版 w-package-tools 後才能照發布列執行.
- 測試檔 `test/minify.test.mjs` 為舊有檔名,未帶層級前綴(未改名).

## 最近驗證

- 2026-11-02(`package.json` 版本 1.0.32,未發布):建置腳本實跑,`dist/` 兩檔(`w-data-html-minify.umd.js` 772,400 B、`.map` 22,448 B)與改前位元組相同;`npm test` 10 案全過.
