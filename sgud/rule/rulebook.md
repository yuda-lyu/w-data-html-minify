# 規則帳本

本檔為套件設計與開發階段之規則帳本(藍圖),為要求程式碼須長成什麼樣,或由規格產出之測試(項目/說明/流程)有哪些,包含軸、單一擁有者、已知限制、破壞性變更紀錄,以及對應是哪些測試檔案或指令等,由agent自行編列、擴充與維護.當前已做到哪些記於`sgud/state/state.md`.過長時依類型拆為`rulebook_<類型>.md`,本檔只留索引.

## R-BUILD 建置與發布腳本

**依 dspec〈自有套件之發布與建置腳本〉,本套件不另立規則.** 本節只記本套件對應該規格之站點與盤點方式.

| 項 | 本套件現況 | 依據 |
|---|---|---|
| 發布型態 | A 一般(`script.txt` 列序:modifyReadme → cleanFolder → jsdoc → gDocsExams → gDistRollup → git → deploy;`addVersion` 為註解列) | dspec 規則 3 |
| `toolg/addVersion.mjs`、`modifyReadme.mjs`、`cleanFolder.mjs` | 一行呼叫 w-package-tools 同名函數(`cleanFolder('dist')`、`cleanFolder('docs')`) | dspec 規則 4 |
| `toolg/gDocsExams.mjs` | 呼叫 `genDocsExams`(有 `examples/`,用預設);由主控批次改動,尚未入版控 | dspec 規則 4 |
| `toolg/gDistRollup.mjs` | `fdSrc='./src'`、`fdTar='./dist'`,呼叫 `rollupFiles`,選項(`globals`、`external`)寫於本檔;入口 `WDataHtmlMinify.mjs`,`nameDistType:'kebabCase'` | dspec 規則 4 |
| 注入已編譯之前端用程式碼 | `toolg/convertHtmlminifierCode.mjs`:讀 `./src/htmlminifier.min.js`(官方已打包之前端 js),以 wsemi `str2b64` 轉 base64,寫 `./src/_htmlminifierCoreBrowser.mjs`;以套件根為 cwd 執行(`node toolg/convertHtmlminifierCode.mjs`) | dspec 規則 5 之 3 |
| worker | 本套件無 worker | dspec 規則 5 |

- **發布列**:`script.txt` 由使用者維護,agent 不改.`convertHtmlminifierCode` 目前**不在發布列**(手動執行);是否列入由使用者決定.
- **盤點指令**(結果須為 0 筆,有命中即偏離):
  - `git grep --untracked -nE "distConfig|distRollupOpt|cleanFolderStrict|checkDist|getIndexNames|fileURLToPath|import\.meta\.url" -- toolg`
  - `git grep --untracked -n "_convertHtmlminifierCode" -- . ":!sgud"`(舊路徑 `src/_convertHtmlminifierCode.mjs` 已移為 `toolg/convertHtmlminifierCode.mjs`)
- **站點全集**:`toolg/` 內 6 檔(addVersion、modifyReadme、cleanFolder、gDocsExams、gDistRollup、convertHtmlminifierCode),全部符合上表.

## R-TEST 測試

| 項 | 說明 | 測試檔 / 指令 |
|---|---|---|
| T1 壓縮 | 輸入含縮排換行之 HTML,輸出為壓縮後單行 HTML | `test/minify.test.mjs`(單元,直接引用 `src`) |
| T2 convert 腳本 | 依 dspec 規則 4,把 `src/htmlminifier.min.js` 與 `toolg/convertHtmlminifierCode.mjs` 複製到 `test/_tmp/toolg-convert/`,以 `spawn` 指定 cwd 執行:離開碼 0、產出 `src/_htmlminifierCoreBrowser.mjs` 格式為 `let b64='…'; export default b64`、解碼為 min.js 全文加 `window['html-minifier']` 注入、與套件內現檔相同 | `test/unit-toolg-convert.test.mjs` |
| T3 gDistRollup 腳本 | 依 dspec 規則 4,把 `src`、`toolg/gDistRollup.mjs`、`package.json` 複製到 `test/_tmp/toolg-rollup/`,以 `spawn` 指定 cwd 執行:離開碼 0、產出 `dist/w-data-html-minify.umd.js` 與 `.map`、UMD 三種載入方式皆引用外部 `html-minifier`、不 require node 內建模組、banner 為 `package.json` 之名稱與版本、以 node 載入後匯出函數並壓縮 HTML | `test/unit-toolg-rollup.test.mjs` |

- 共用輔助 `test/tools/runInCopy.mjs`(複製到 `test/_tmp/<名>/`、指定 cwd 執行、清除副本)只定義一次;測試不改寫 toolg,不為測試另設共用設定檔.
- 測試指令:`npm test`(`mocha --parallel "test/*.test.mjs" --timeout 180000`).
