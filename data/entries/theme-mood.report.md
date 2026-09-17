# T1 theme-mood.json 交付報告（2026-09-17）

## 條數
共 50 條（超出目標約 45 條，PLAN.md T1 段落列出的「舊」1 條＋「新」49 條全數完成）。
`node scripts/validate.js data/entries/theme-mood.json` 結果：**共 50 條，錯誤 0，警告 25**。

## 未完成的 id
無。PLAN.md T1 段落列出的所有 id（horror 及 49 個新條目）均已完成並通過驗證。

## unverified 的 id 與原因
- `dreamlike`（夢境感）：找不到「dreamlike」作為獨立詞條的權威來源（Wikipedia 無此專門條目），只能引用相鄰的 Surrealism 條目作脈絡佐證，定義本身屬於整理歸納而非直接引用單一來源，因此標記 `unverified`。其餘 49 條 `status` 均為 `verified`。

## 警告說明（25 筆，均可接受，不影響交付）
- 15 筆為「examples 少於 2」：`steampunk`、`solarpunk`、`urban-legend`、`supernatural`、`cozy`、`wholesome`、`relaxing`、`dark`、`surreal`、`dreamlike`、`meme-game`、`satire`、`comedy`、`philosophical`、`isekai`。多數是因為 `data/steam-games-ref.tsv`（2709 筆）裡找不到第二個確實貼合該主題、且我有把握其內容的代表作，寧可只列 1 個確定的例子，不硬湊不熟悉的作品湊數。
- 10 筆為「related／compare.with 指向的 id 目前不存在」：`unreliable-narrator`、`survival`、`resource-management`、`pixel-art`、`environmental-storytelling`、`story-rich`、`choices-matter` 等，這些是其他組（V1、M1、M2、G2）負責的 id，屬跨檔引用，等其他組交付後即會消失。

## 合併或改名說明
- 未做合併；PLAN.md 分配的 id 全部維持原樣，未自創或撈用其他組的 id。
- `cozy` 與 `cozy-game`（G2 組類型條目）刻意區分：`cozy` 在本檔講 Steam 氛圍標籤與情緒感受，並在 def 與 compare 中明確加註兩者關係；`cozy-game` 留給 G2 組寫玩法機制。

## appid 找不到的代表作（status 仍為 verified，僅 appid=null）
以下遊戲確實存在，但不在 `data/steam-games-ref.tsv`（2709 筆）名單內，appid 已依規則填 `null`：
- 沉默之丘2 Silent Hill 2（psychological-horror）
- 返校 Detention（psychological-horror、taiwan-horror、school-life，2017，赤燭遊戲）
- 還願 Devotion（folk-horror、taiwan-horror，2019，赤燭遊戲）
- Pathologic 2（folk-horror，2019）
- Iron Harvest（dieselpunk，2020）
- Terra Nil（solarpunk，2023）
- Unpacking（relaxing，2021）
- OMORI（dreamlike，2020）
- Surgeon Simulator（meme-game，2013）
- Coffee Talk（slice-of-life，2020）
- Night in the Woods（slice-of-life，2017）

## 建議新增但未寫的詞（只列，未動筆）
- `iyashikei`（療癒系）：日系日常敘事的子類型，目前只在 slice-of-life 的 def 裡提及一句，值得獨立成條，並與 cozy／wholesome 做三方比較。
- `raygun-gothic`（雷射槍哥德／回顧未來主義）：介於 dieselpunk 與 sci-fi 之間的美術子類型，Fallout 系列的「50 年代未來想像」常被歸這類，容易與 dieselpunk 混淆，值得一條專門辨析。
- `visual-novel-otome` 邊界詞：本檔的 school-life／isekai／slice-of-life 常與戀愛模擬、Otome 重疊，但玩法歸類屬 G2，建議 G2 或未來補一條「戀愛題材與戀愛玩法」的跨檔 compare 索引。
- `body-horror` 與 `disability-representation`／醫療倫理相關的當代討論（如「後疫情身體恐怖」熱潮）可考慮補充在 design 欄位，但需要更多來源查證，本輪未展開。
- `nordic-noir`（北歐黑色）：黑色風格的地域子類型，遊戲界案例少（多為改編自北歐犯罪小說的作品），暫未查到夠份量的遊戲代表作，故未單獨成條。

## 招牌條目重點交代
`psychological-horror` vs `horror` vs `survival-horror` 三方比較已依需求寫在三條各自的 `compare` 欄位裡（互相指向），並在 def 中明確拆解「心理恐怖靠不安與心智崩壞」「生存恐怖靠資源匱乏與逃跑」「Jump Scare 只是手法」的差異，範例分別用《沉默之丘2》《層層恐懼》《返校》（心理恐怖）與《惡靈古堡2/7/村莊》（生存恐怖）。`taiwan-horror` 條目完整交代赤燭遊戲《返校》《還願》與《女鬼橋》系列，並在 `tw` 欄位補充《還願》下架與 2021 年重新上架的背景。
