# 累積經驗

本檔為執行工作時特有之累積經驗,留給後續之嘗試、執行與判斷,由agent自行編列、擴充與維護.過長時抽出舊者為`experience_<年月日>.md`,並於本檔註明何時抽出.

## 建置與測試執行

- 於 Windows 以 `quiet-run` 跑發布列中的 `./node_modules/.bin/jsdoc -c .jsdoc` 會失敗(`'.' 不是內部或外部命令`,quiet-run 經 cmd 執行),改用 `node node_modules/jsdoc/jsdoc.js -c .jsdoc`,結果相同.
- 以副本測試 toolg 腳本時,副本須放在套件內(`test/_tmp/<名>/`),腳本與 rollup 才解析得到套件根的 `node_modules`(`w-package-tools`、`wsemi`、`html-minifier`);`rollupFile` 以 cwd 的 `package.json` 取版本,副本須含 `package.json`.
- jsdoc 重產 `docs/` 後,`docs/*.html` 的差異只有末行產生時間戳記;`dist/` 在相同原始碼與依賴下可位元組重現.
