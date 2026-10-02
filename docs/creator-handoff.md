# 遊戲名詞大百科：10 詞條範例與創作解析

日期：2026-10-02；source_agent: codex；TF-GO。

範圍：10 個既有詞條，每詞條2款，共20款；19款Steam官方截圖遠端嵌入，Minecraft官方頁連結。大圖只放原圖網址，不下載或重製素材。未擴充其餘519詞條。

新增平台、Metroidvania、Roguelike、Roguelite、類魂、回合制戰術、RTS、塔防、沙盒、分支敘事之解析。回合制範例對應既有 turn-based-tactics，未新增或改名識別字。

Luna（派工指定 gpt-6-luna/medium）唯讀查來源；主代理整合。創作重點為教學整理與推論，非開發者自述。Steam API逐筆取得真實截圖網址。

驗證：npm run verify，8/8通過、建置成功；529詞條，0錯誤、96警告，修改前亦為96警告。新增測試曾對舊資料失敗（0/10），整合後通過。手機窄版修正比較表換行與grid最小寬度。

狀態儀表板：dashboard/out/index.html；來源data/glossary.json，數字由scripts/creator-dashboard.js計算。使用者尚未確認呈現。

發布：功能提交 d769f42，已推送 treefar/game-glossary main，Pages built。公開頁下載1257526 bytes，與本機index.html逐字相同。公開網址 https://treefar.link/game-glossary/ 。

瀏覽器驗證：十詞條逐一展開，各2張卡片且有創作者筆記；docs/creator-browser-check.json保存結果。平台遊戲兩張Steam截圖實際載入成功。320px及桌面檢查無橫向溢出；窄版比較表已換行。creator-preview.png為公開版完整畫面。未逐一人工檢視19張截圖內容，不宣稱圖片品質全部通過。

重跑：node scripts/enrich-creator.js；node scripts/fetch-creator-media.js（需網路）；npm run verify。不要批次重抓其餘詞條。

## 下一輪第一個具體任務

2026-10-02 缺圖修復：Minecraft文字卡換成WorldBox - God Simulator，Steam官方頁查證沙盒關聯，官方API取得遊玩截圖。新增scripts/audit-creator-media.js逐張HTTP與圖片magic驗證，修復前19/20，修復後20/20；creator.test.js新增每範例必有截圖，修復前Minecraft使測試失敗，修復後8/8。舊百科另153筆文字代表作無圖，尚未納入這批10詞條範圍；已向使用者提出範圍選項。

使用者檢視10詞條呈現並確認後，再決定下一批詞條。不可自行擴充全部529條。
