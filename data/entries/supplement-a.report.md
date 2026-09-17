# supplement-a.json 補遺報告（2026-09-17）

## 條數與驗證結果

共 **24 條**（G2 遺留 11 條 + I1 遺留 13 條）。

`node scripts/validate.js data/entries/supplement-a.json`（單檔驗證）最後一行：

```
共 24 條，錯誤 0，警告 57
```

單檔驗證的 57 個警告全部是跨檔 `related`／`compare.with` 指向其他檔案（G1/G2/M2/I1 等）已存在的 id（如 `tactical-shooter`、`visual-novel`、`puzzle-game`、`gaas`、`aaa` 等），屬預期行為。

跑全庫驗證 `node scripts/validate.js`（530 條，涵蓋全部檔案）確認：**錯誤 0，且本檔 24 條在全庫比對下零警告**——所有 `related`／`compare.with` 指向的跨檔 id 都已能對應到既有詞條，無殘留警告。

## 完成的 24 個 id

**G2 遺留（cat=genre，11 條）**：milsim, otome, dating-sim, interactive-fiction, sokoban, hidden-object, escape-room, board-game-digital, social-deduction, asymmetric-multiplayer, vr-game

**I1 遺留（cat=industry，13 條）**：steam-next-fest, mod-workshop, prototype, greybox, gold-master, backward-compatibility, monetization, cosmetics, loot-box, aa-game, live-service, roadmap, live-ops

（原始工單另列 playtest、demo、wishlist 三個 id，已先用 `grep` 確認 `data/entries/industry-tech-multiplayer.json` 早已寫過，依指示跳過未重寫。）

## unverified 的 id 與原因

- **`greybox`**：查了 Wikipedia「Level design」條目（只泛談 placeholder／prototype，未使用 greybox／graybox／blockout 字眼）、Game Developer 網站、`worldofleveldesign.com` 的 greyboxing 教學頁（404）、Wikipedia 消歧義頁「Grey box」（與遊戲開發無關），都找不到明確以「greybox」為題的權威定義來源。本輪 WebSearch 額度已用盡，只能用 WebFetch 逐一嘗試猜測網址，多次落空。條目內容仍照業界通用理解撰寫（關卡量體、上美術前的驗證階段），但 `status` 誠實標為 `unverified`，`sources` 只掛了 Level design 條目作為間接佐證並在 `note` 裡註明未直接對應到詞彙本身。
- **`live-ops`**：Wikipedia「Games as a service／Live service game」條目雖廣泛討論持續更新與營運支援，但沒有使用「live ops」這個詞；嘗試 Unity（`unity.com/solutions/liveops`、`unity.com/products/gaming-services/live-ops`）與 Microsoft PlayFab（`learn.microsoft.com/.../liveops/`）等廠商文件頁面全部 404。`status` 標為 `unverified`，`sources` 掛 Live service game 條目作間接佐證並在 `note` 說明未直接命中詞彙。

其餘 22 條全部 `status: verified`，每條至少 1 筆（多數 2 筆）可查證來源，逐一以 WebFetch 直接讀取 Wikipedia 開頭定義句或 Steam 標籤頁確認存在。

## appid／steamTags 查詢備註

- `appid` 一律先查 `data/steam-games-ref.tsv`；查得到的包含：Hell Let Loose (686810)、Patrick's Parabox (1260520)、Among Us (945360)、Project Winter (774861)、Dead by Daylight (381210)、Half-Life: Alyx (546560)、Beat Saber (620980)、VRChat (438100)、潛水員戴夫 (1868140)、Balatro (2379780)、Garry's Mod (4000)、Stardew Valley (413150)、Baba Is You (736260)、Vampire Survivors (1794680)、Portal 2 (620)、Half-Life 2 (220)、Cyberpunk 2077 (1091500)、巫師3 (292030)、Apex Legends (1172470)、A Plague Tale: Requiem (1182900)、Destiny 2 (1085660)、Tabletop Simulator (286160)。其餘查不到（如 Arma 3、Squad、Otome 類作品、Dream Daddy、Doki Doki Literature Club!、Zork、80 Days、Reigns、Sokobond、Stephen's Sausage Roll、Mystery Case Files、June's Journey、Hidden Folks、The Room、Escape Simulator、Talisman: Digital Edition、Town of Salem、Evolve、Skyrim、Fortnite、Control、No Man's Sky、Overwatch、Star Wars Battlefront II、Xbox/Wii 回溯相容案例）一律 `appid: null`，均以 WebFetch 或既有知識確認遊戲本身真實存在才列入（多筆用 WebFetch 逐一核對 Wikipedia 詞條，如 Collar × Malice、Dream Daddy、Escape Simulator、Talisman、Baba Is You 的 Game Jam 起源、Vampire Survivors 的原型起源、Concord 關服時程）。
- `backward-compatibility` 因概念偏硬體／平台層級，兩個 example 改以「平台＋世代」組合（Wii 回溯相容 GameCube、Xbox Series X|S 回溯相容計畫）呈現而非單一遊戲片名，`appid` 均為 `null`，已在 `why` 註明依據來源。
- `steamTags`：`asymmetric-multiplayer` 刻意留空——Steam 官方只有「Asymmetric VR」(856791) 這個帶 VR 限定的 tag，沒有泛用的「Asymmetric Multiplayer」標籤，勉強套用會誤導；`monetization`、`cosmetics`、`loot-box`、`aa-game`、`prototype`、`greybox`、`gold-master`、`backward-compatibility`、`live-service`、`roadmap`、`live-ops`、`steam-next-fest` 等 industry 概念詞同樣無對應 Steam 標籤，依規則留空。有對應標籤的都逐一比對 `data/steam-tags-ref.tsv` 的 tagid／en 拼法（Military 4168、Tactical 1708、Otome 31579、Dating Sim 9551、Interactive Fiction 11014、Sokoban 1730、Hidden Object 1738、Escape Room 769306、Board Game 1770、Tabletop 17389、Social Deduction 745697、VR 21978、Moddable 1669）。

## 品質重點落實情況

- `social-deduction`：`def`／`origin` 已提及《Among Us》與台灣慣稱「狼人殺」的《Werewolf》桌遊起源。
- `asymmetric-multiplayer`：`def` 與 `examples` 已以《黎明死線》（Dead by Daylight）為主要代表案例。
- `loot-box`：已寫入比利時遊戲委員會 2018 年認定構成賭博、荷蘭博彩管理局法律意見兩段規管爭議，並附 Wikipedia Loot box 條目來源。
- `mod-workshop`：已寫入 Steam Workshop 2011 年隨《戰隊要塞2》起家、2012 年擴展支援其他遊戲的沿革。
- `gold-master`：已講清楚 GM／送廠（送 Cert）流程與詞源（唱片業金唱片母帶）。

## 合併／改名說明

`live-service` 與既有 M2 檔 `gaas` 條目（cat=system）刻意維持兩條獨立詞條，並互相 `compare`：`gaas` 側重系統設計脈絡的持續內容循環，`live-service` 側重產業／財報語境的投資組合策略與市場成敗風險（含《Concord》兩週關服案例），未合併，符合 PLAN 「自行判斷並在 report 說明」的指示。其餘 id 均照工單原文，未自行合併或改名。

## 建議新增但未寫的詞（只列，不寫詞條）

- `latency-compensation`（延遲補償，client-side prediction／server reconciliation）
- `steam-deck-verified`（Steam Deck 相容性認證分級，I1 原始清單未完成項之一，本輪工單未涵蓋）
- `game-jam`（遊戲創作松，`prototype` 條目已引用其起源案例但未獨立成條）
- `platform-holder`（平台方／主機廠商，I1 原始清單未完成項之一，本輪工單未涵蓋）
