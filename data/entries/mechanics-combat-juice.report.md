# M1 mechanics-combat-juice.json 完成報告（2026-09-17）

## 條數
共 56 條，對應 PLAN.md「M1」段落列出的全部 id（舊 23 條 + juice 新 11 條 + mechanic 新 22 條），**全部完成，無剩餘未做的 id**。

`node scripts/validate.js data/entries/mechanics-combat-juice.json` 最終結果：**共 56 條，錯誤 0，警告 0**。

## 未完成的 id
無。PLAN 分配給 M1 的 56 個 id 全數寫完並通過驗證。

## unverified 的 id 與原因
無。56 條全數 `status: "verified"`，每條至少 1 筆、多數 1～2 筆已用 WebSearch／WebFetch 實際查證存在的來源（Wikipedia、GDC Vault、Game Developer／Gamasutra、開發者部落格、官方手冊、社群技術性 Wiki 如 Dustloop／SmashWiki／Fandom、學術論文等）。

需要說明的查證細節（非「查無來源」，但驗證方式不是直接 200 OK，供覆核參考）：
- `hit-flash` 的 Medium 部落格來源對直接 WebFetch 回應 403（反爬蟲），但標題與內容確認出現在搜尋結果中，非編造。
- `super-armor`（Street Fighter Wiki）、`poise`（Dark Souls Wiki）、`charged-attack`（TV Tropes）三筆 Fandom／TV Tropes 來源對 WebFetch 回應 402/403，改用瀏覽器工具直接開頁確認內容相符。
- `perfect-dodge` 的 Bayonetta Wiki（Fandom）來源同樣以搜尋摘要核對，非直接 200 OK。
- `game-juice` 的兩筆核心來源已逐一查證：Vlambeer「Juice it or lose it」為 Martin Jonasson 與 Petri Purho 於 **2012 年 GDC Europe（Independent Games Summit）**演講；Jan Willem Nijman 的「The Art of Screenshake」場合是 **2013 年 INDIGO Classes**，**不是** GDC 場次（原始任務指示誤植兩者皆為 GDC，已在條目的 `origin` 欄位更正並附兩個可查證連結）。

## 合併或改名說明
- 依 PLAN 指示，`hitstop` 的 `cat` 設為 `juice`（其餘舊機制詞條沿用 `mechanic`）。
- `hitscan-vs-projectile` 依 PLAN 指定只建 `hitscan` 一個 id；「projectile」不是獨立詞條，vs 拋射物的對比寫在 `hitscan.def` 內文中，未建立虛擬 compare 連結。
- `burst-vs-sustain` 依 PLAN 指定只建 `burst-damage` 一個 id；「sustain／持續輸出」同樣寫在 `burst-damage.def` 內文中說明，並與既有的 `dot`、`dps` 做 compare 連結。
- 其餘 id 一律照 PLAN 原文，無改名。

## 必寫 compare 覆蓋情形
- hitstop vs slow-motion：✓（雙向）
- parry vs perfect-dodge vs block：parry↔perfect-dodge 雙向皆有；「block／一般格擋」未建獨立 id，僅在 `parry.def` 與 `perfect-dodge.compare.diff` 文字中帶過，未做成三方正式 compare 物件。
- i-frame vs super-armor：✓（雙向）
- input-buffer vs jump-buffer vs coyote-time：✓（input-buffer↔jump-buffer 雙向；coyote-time→jump-buffer 單向）
- hitscan vs projectile：✓（僅文字說明，projectile 非獨立 id）
- stagger vs hitstun vs posture-bar：✓（三者兩兩互相 compare，共 4 組連結）
- poise vs super-armor：✓（雙向）

## 建議新增但未寫的詞（僅列出，不寫入）
- block / guard（一般防禦，與 parry、perfect-dodge 三方比較會更完整）
- projectile（拋射物判定，與 hitscan 對稱建一個獨立條目）
- sustain-damage（持續輸出，與 burst-damage 對稱）
- hyper-armor-vs-poise 的日式格鬥「ガード不能」（無視防禦技）
- active-frame（生效幀）若要從 frame-data 拆出更細的子條目
- weakpoint（弱點部位，與 headshot 相關但更泛用，涵蓋非人形敵人）
- overheat（過熱機制，射擊遊戲彈藥經濟的另一種變體，常見於能量武器）

## 協作流程說明
本檔由 4 個平行研究子代理分別查證來源（Game Juice 12 條、格鬥動作核心 15 條、RPG／MMO 戰鬥系統 12 條、平台跳躍與射擊機制 17 條），主代理彙整內容、補齊 Unity 實作備忘（juice 條目 design 欄）、查 `steam-games-ref.tsv`／`steam-tags-ref.tsv` 取得 appid 與 tagid、撰寫全部欄位並執行 validate 修到 0 錯誤 0 警告。
