# G2 `genre-shooter-strategy-sim.json` 調研報告

- 完成條數：**45 條**
- `node scripts/validate.js data/entries/genre-shooter-strategy-sim.json` 結果：**錯誤 0，警告 13**（全部為跨檔 `related`／`compare` 指向的 id，見下方「跨檔待補」）

## 完成的 45 個 id

射擊類型（13）：shooter, fps, tps, hero-shooter, tactical-shooter, arena-shooter, shmup, bullet-hell, twin-stick-shooter, rail-shooter, boomer-shooter, extraction-shooter, battle-royale
策略與戰棋（7）：rts, turn-based-strategy, turn-based-tactics, wargame, 4x, grand-strategy, tower-defense
經營與建造模擬（6）：tycoon, city-builder, colony-sim, base-building, god-game, factory-builder
生存與生活模擬（5）：survival-craft, survival, farming-sim, life-sim, cozy-game
牌卡與棋盤（3）：deckbuilder, auto-battler, card-game
解謎與休閒（6）：puzzle-game, match-3, point-and-click, idle-incremental, clicker, physics-sandbox
競速與運動（2）：racing-game, sports-game
音樂與敘事（2）：rhythm-game, visual-novel
團隊競技（1）：moba

## 未完成的 id（PLAN 分配但本輪沒做，依優先序排列）

PLAN 的「新」清單原本有 36 個 id，加上「舊」20 個（farm-life-sim 拆成 farming-sim／life-sim 兩條）共 56 個候選，目標約 45 條，故依「必寫 compare 需要的詞優先」原則取捨，以下 11 個未完成：

- `milsim`（軍事模擬射擊）
- `otome`（乙女遊戲）
- `dating-sim`（戀愛模擬）
- `interactive-fiction`（互動小說）
- `sokoban`（倉庫番）
- `hidden-object`（隱藏物件）
- `escape-room`（密室逃脫）
- `board-game-digital`（數位桌遊）
- `social-deduction`（社交推理）
- `asymmetric-multiplayer`（非對稱多人）
- `vr-game`（VR 遊戲總論，`rail-shooter` 已提及 VR 但未單獨立條）

## unverified 的 id 與原因

無。45 條全部標記 `verified`：每條至少有 1 筆可查證來源（Wikipedia 條目逐一用 WebFetch 確認開頭定義句存在，或 Steam 標籤頁用 `data/steam-tags-ref.tsv` 確認 tagid／en 對得上）。`boomer-shooter` 因為 Wikipedia 的 `Boomer_shooter` 頁面實際上會導回通用的「Shooter video games」定義（沒有獨立完整條目），因此改引用 Inverse 的專題報導 `boomer-shooter-definition-origin` 作為主要來源。`colony-sim`、`base-building`、`card-game`、`factory-builder` 沒有找到夠格的獨立 Wikipedia 條目，僅以 Steam 標籤頁作為來源（標籤存在已透過 `steam-tags-ref.tsv` 核對）。

## 合併或改名說明

- `farm-life-sim`（PLAN 原始 id）依 PLAN 指示拆成 `farming-sim`（農場模擬，對應「Farm Life Sim」Wikipedia 條目）與 `life-sim`（生活模擬，對應「Life simulation game」條目），兩者互為 `compare` 與 `related`。
- 其餘 id 均照 PLAN 原文，未自行合併或改名。

## examples 補充說明

`auto-battler`、`point-and-click`、`card-game` 三條原本只找到 1 個可查 appid 的代表作，已各補第 2 個真實存在但不在 `steam-games-ref.tsv`（appid 填 `null`）的知名作品（Dota Underlords／重返猴島／Marvel Snap），確保每條至少 2 個例子。

## appid／steamTags 查詢備註

- `steam-games-ref.tsv` 裡查不到的知名作品（如 League of Legends、StarCraft II、Quake III Arena、Unreal Tournament、Into the Breach、Oxygen Not Included、Nuclear Throne、DUSK、Populous、AdVenture Capitalist、NGU Idle、Sam & Max 系列、Monkey Island 系列、Teamfight Tactics）一律 `appid: null`，但確認遊戲本身真實存在才列入 examples。
- `steam-tags-ref.tsv` 沒有「Clicker」這個獨立 tagid，故 `clicker` 條目 `steamTags` 留空，僅以 Wikipedia「Incremental game」條目（文中明確定義 Clicker 與 Idle 的差異）作為來源。
- `tactical-shooter` 沒有對應到單一精確的 Steam 標籤（Steam 上戰術射擊多半用 Tactical／Military／FPS 等標籤組合呈現），`steamTags` 留空，改用 Wikipedia 專屬條目作為來源。

## 建議新增但未寫的詞（只列，不寫詞條）

- `horde-shooter`（波次殭屍／喪屍生存射擊，如惡靈勢力、殺戮空間系列，與 base-building／tower-defense 有交集但玩法核心不同）
- `space-sim`（太空模擬，Steam 已有獨立 tagid 16598「Space Sim」，與 4X／RTS 常見混淆）
- `trading-sim`（貿易經濟模擬，如 EVE Online、X4 系列，經營與策略交界的次類型）
- `couch-party-shooter`（本機多人派對向射擊，如胡鬧廚房式的射擊變體，與 party-game 有交集但值得獨立說明）

## 品質重點落實情況

- PLAN 要求必寫的 compare 全數完成：shmup vs bullet-hell、bullet-hell vs survivors-like（跨檔 id，已用 compare 註記）、rts vs turn-based-strategy、4x vs grand-strategy、city-builder vs colony-sim、cozy-game vs farming-sim、deckbuilder vs roguelike-deckbuilder（跨檔 id）、battle-royale vs extraction-shooter、hero-shooter vs arena-shooter、idle-incremental vs clicker。
- 每條 `def` 都以「白話講給大一新生聽」的語氣撰寫，`design` 欄都聚焦在「做這個類型要注意什麼」而非重複定義。
