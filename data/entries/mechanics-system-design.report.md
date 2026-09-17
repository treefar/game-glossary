# M2 mechanics-system-design.json 完成報告

日期：2026-09-17　調研代理：M2 組（cat=system）

## 條數

- 共完成 **64 條**，全部 `cat: "system"`。
- `node scripts/validate.js data/entries/mechanics-system-design.json` 結果：**錯誤 0，警告 24**（最後一行：`共 64 條，錯誤 0，警告 24`）。
- 24 筆警告全部是 `related` / `compare.with` 指向**其他組負責的 id**（例如 `roguelike`、`open-world`、`gacha-culture`、`balance-patch`、`environmental-storytelling`、`parry`、`metroidvania`、`farming`、`dialogue-tree`、`difficulty-curve`、`player-agency`、`cutscene`、`rts`、`4x`、`worldbuilding`、`patch-meta` 等），這些 id 屬於 G1／G2／V1／M1／I1／MB／S1 的分配範圍，待其他組檔案到齊後 validate 全庫即會消除，不是本檔案的錯誤。

## 未完成的 id（PLAN 分配但本輪未寫）

- `power-fantasy`（力量幻想）：多次 WebSearch／WebFetch 嘗試（Wikipedia「Power fantasy」「Power trip」「Superhero fiction」、Doom 2016 reception 段落、Eurogamer 專文）皆未能找到可直接引用、明確定義該詞的真實來源網址，為避免編造網址而擱置。
- `skill-floor-ceiling`（技能下限與上限）：嘗試 League of Legends 維基、Giant Bomb、dotesports.com、TVTropes 等頁面，前者未提及該詞、後兩者回傳 403 無法存取內容，同樣為避免編造網址而擱置。

以上兩條建議下一輪由其他代理或人工在瀏覽器可正常存取的環境下補查（例如直接查證 Riot Games 官方詞彙表、GDC 演講字幕等）。

## status 為 `unverified` 的 id 與原因

- `signposting`（路標引導）：找不到專門討論「遊戲路標引導」的獨立來源，改引用 Wikipedia「Traffic sign」（真實道路號誌條目）作為視覺引導邏輯的類比佐證，非直接的遊戲設計來源，故標 unverified。
- `critical-path`（主線流程）：來源為 Wikipedia「Linearity (video games)」，該條目確實討論必經序列與可選支線的對比，但全文未直接使用「critical path」這個詞彙，屬於間接佐證，故標 unverified。
- `roster`（角色名冊）：來源為 Wikipedia「Super Smash Bros. Ultimate」，該條目提及「74 位可用格鬥家」等具體名冊規模數據，但 WebFetch 未能在摘要中直接擷取到「roster」一詞的原文語句，故標 unverified，建議之後直接讀取原文確認用詞。
- `risk-reward`（風險與回報）：多次搜尋皆未找到專門論述「遊戲風險與回報設計原則」的獨立條目，最終引用 Wikipedia「Game balance」作為遊戲設計脈絡下的間接佐證（金融領域的「Risk–return spectrum」條目因主題非遊戲而捨棄不用），故標 unverified。

其餘 60 條 status 皆為 `verified`，每條至少 1 筆已用 WebSearch／WebFetch 確認網址存在且內容相關的來源（多數為 Wikipedia，其餘為 GDC／Game Developer 文章、Giant Bomb、TV Tropes、Apple 開發者文件、AAAI 官方論文頁等）。

## 合併／改寫說明

- `gaas`：第二版指南標題為「GaaS (Games as a Service)」，但目前 Wikipedia 該主題的正式條目標題已是「Live service game」（`Games_as_a_service` 為轉址），來源標題與 `en` 欄位保留原分配的 GaaS 命名，`sources` 引用的是 Live service game 條目。
- `spatial-narrative`（空間敘事，M2 負責）與 `environmental-storytelling`（環境敘事，V1 負責）：第二版指南第一章與第四章各有一段幾乎同主題的文字。本檔案將 `spatial-narrative` 定位為**宏觀**層次（整體世界／建築結構如何講故事），並在 `compare` 中與 `environmental-storytelling`（微觀，單一場景物件擺放）做出區隔說明，避免兩條內容重複。
- `gacha`：依 PLAN 指示，本條只寫系統設計面（保底、機率透明度、卡池設計），文化與黑話（課金、井、歪等台灣黑話）已在 `related` 連到 `gacha-culture`，留給 MB 組撰寫，未在本檔重複。
- `pity-system` 與 `gacha` 的 `pity-system` 段落，因 PLAN 同時把「pity-system」放在 M2（機制）與 MB 組「pity-counter」（黑話／玩家視角），已在 `pity-system` 的 `related` 加註區隔，MB 組的 `pity-counter` 屬於玩家用語視角，本條屬於系統設計視角。

## appid／steamTags 查證

- 全部 `examples` 的 `appid` 皆已用 grep 查過 `data/steam-games-ref.tsv`；查得到的填實際 appid（例如黑帝斯 1145360、艾爾登法環 1245620、隻狼 814380、流亡黯道 2855560 等），查不到的一律填 `null`（例如薩爾達傳說系列、戰神系列、要塞英雄、原神、英雄聯盟等任天堂／非 Steam 平台作品）。
- 全部 `steamTags` 的 `tagid` 與 `en` 皆已用 grep 查過 `data/steam-tags-ref.tsv` 並逐筆核對拼字（Perma Death 1759、Procedural Generation 5125、Resource Management 8945、Boss Rush 11095、Tutorial 12057、Difficult 4026 等），validate.js 未回報任何 tagid 不合法或拼字錯誤。

## 建議新增但本輪未寫的詞（只列不寫）

- `content-drought`／`live-ops-calendar`（GaaS 內容荒與營運行事曆，介於 `gaas` 與 slang 組「遊戲荒」之間）
- `narrative-pacing-tool`（敘事節奏工具，例如分支對話的張力曲線設計）
- `telemetry-driven-design`（數據驅動設計／遙測導向調校，現代 GaaS 常見但第二版指南未收錄）
- `soft-launch`（軟啟動／小範圍測試上線，與 `playtest`、`early-access` 相關但屬營運範疇，建議歸 I1 組）
- `comeback-mechanic`（追趕機制，與 `feedback-loop` 的負回饋相關但更偏電競賽制設計，建議歸 MB／E1 組）

## 執行的驗證

- `node scripts/validate.js data/entries/mechanics-system-design.json` → `共 64 條，錯誤 0，警告 24`（警告皆為跨檔 id 待補，見上）。
- 檔案已確認 UTF-8 無 BOM（`xxd` 檢查開頭位元組為 `5b 0a 7b`，非 `EF BB BF`）。
- validate.js 內建簡體字／中國用語掃描未回報任何字元。
