# 遊戲名詞大百科：全站缺圖修復

更新：2026-10-02；source_agent: codex；TF-GO／treefarNB。

使用者已要求修復全站，找不到圖片時更換代表性、高評價或高銷量範例；此決定取代先前僅處理十詞條的範圍。公開網址：https://treefar.link/game-glossary/ 。

## 成果與驗證

- 529 詞條、1,085 個範例卡片。原 153 處文字無圖、另 4 處失效影片縮圖已修復。
- 全站 340 個不同圖片網址，HTTP、圖片 MIME、檔案特徵與內容大小查證成功；1,085/1,085，失敗 0。證據：docs/all-media-audit.json。
- Steam 優先實際遊玩截圖；非 Steam 使用官方截圖、官方教學圖或宣傳圖，依種類標示。大圖採遠端超連結，不保存遠端圖片素材。
- 名稱與版本逐筆核對，修正 Spec Ops、Metroid Dread、Piofiore 的錯誤中文對映；移植／合輯版本清楚標示。
- 以 Sonic Mania、Tetris Effect: Connected 等代表性高評價遊戲替換原泛稱；頁面附 Steam 累積好評比例、則數與查證日期。任天堂範例連至官方 Switch 累積銷量表，不宣稱全市場最高。
- 自動戰鬥與抽卡 Roguelike 模式改用有官方機制資料的範例。抽查官方乙女商品／劇情圖、MOBA 教學圖、原神與星穹鐵道宣傳圖，瀏覽器實際載入成功。
- npm run verify：建置成功，9/9 測試；資料 0 錯誤、96 既有警告（修復前亦 96）。新增全站圖片回歸測試先失敗、修復後通過。未另跑 Lint：此專案無 Lint 指令。
- 狀態儀表板 dashboard/out/index.html：529 詞條、1,085 範例、1,085 有效圖，數字由資料計算；儀表板驗證 17/17。使用者呈現確認仍為 0，不等同工具驗證。

## 重跑方式

一般更新：npm run verify；node scripts/audit-all-media.js（需網路）。node scripts/all-media-dashboard.js 後使用 project-dashboard 的 build-dashboard.js／verify-dashboard.js 重產儀表板。

修復來源與選例證據分別保存在 docs/steam-media-discovery.json、repair-candidates.json、media-replacements.json、nonsteam-media-research.json、nonsteam-extra.json、official-media-extracted.json、extra-media-extracted.json。

不要單獨重跑舊 enrich-creator.js 覆蓋最新內容；修復腳本是本輪資料處理紀錄，未來來源需重新查證。audit-all-media.js --reuse 僅用於本輪相同網址的卡片名稱／位置調整，正式重新查圖請不加此參數。

## 數位教材網刊登

使用者指定遊戲企畫第四週與專題企畫第五週。treefar/treefar.github.io 提交 7c75fe2 已推 main，Pages built；兩頁 HTTP 200，線上內容逐字比對本機成功。

- https://treefar.link/courses/game-planning/week04.html ：既有百科投影片與講義入口補充代表作、創作者筆記與競品比較任務。
- https://treefar.link/courses/project-planning/week05.html ：新增百科投影片與講義入口、範例比較與原型任務；原分支敘事入口保留。
- node courses/systems/verify.mjs 通過；兩頁各兩個百科入口，投影片／講義一致；新投影片內容無溢出。

百科功能提交 f65cda1 已推 main，Pages built。公開頁 HTTP 200、1,456,123 bytes，與本機 index.html 逐字相同。公開任天堂兩圖實際載入成功；docs/fullsite-media-published.png 留畫面，docs/course-week05-published.png 留教材發布畫面。此輪不擴充其他詞條的創作者筆記，也不宣稱已重新查核全部既有百科文案。
