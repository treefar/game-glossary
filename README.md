# 遊戲名詞大百科（Game Glossary）

結合 Steam 官方標籤的遊戲術語教學查詢系統。單檔離線網頁，每條詞目都有白話定義、特色、代表作卡片、易混淆詞比較、設計要點與來源。給遊戲企劃課學生、獨立開發者與自學者用。

**線上版**：https://treefar.link/game-glossary/

前身是《現世代遊戲專有名詞指南》第一、二版（2026 年，文件版，155 條）。第三版改成資料庫：每條一筆結構化資料，並對應 Steam 官方標籤，與 [Steam 標籤定位器](https://github.com/treefar/steam-tag-prompter) 互相連結。

## 使用方式

打開 `index.html`（任何瀏覽器、離線可用），或直接用線上版。

| 想做什麼 | 怎麼做 |
|---|---|
| 查一個詞 | 搜尋框打中文、英文或別名（「肉鴿」「彈幕」「soulslike」都行），按 `/` 可直接聚焦 |
| 看兩個詞差在哪 | 「⚖️ 比較速查」分頁，或每條詞目裡的「跟誰容易搞混」 |
| 從 Steam 標籤反查 | 「🏷️ Steam 標籤索引」分頁，或網址 `#tag-<tagid>` |
| 分享某一條 | 網址 `#<id>`，例如 `#psychological-horror` |
| 自學 | 🎲 隨機一條 |
| 把標籤帶去做定位 | 每條的「到標籤定位器」會把該 Steam 標籤帶進定位工具設為核心 |

## 資料格式

詞條在 `data/entries/*.json`，格式見 [`data/SCHEMA.md`](data/SCHEMA.md)。重點欄位：

- `steamTags`：只能用 Steam 官方標籤（tagid 與英文名以 `data/steam-tags-ref.tsv` 為準）
- `examples[].appid`：Steam appid，建置時會從遊戲索引補縮圖、年份與簡介進 `data/game-cards.json`
- `compare`：易混淆詞比較，是本百科的重點
- `sources`：至少一筆真實來源與查閱日期；找不到可靠來源的條目標 `unverified`，網頁上會顯示「未查證」

## 建置與測試

```bash
npm run validate   # 驗證詞條資料：欄位、id 唯一、tagid／appid 對得上、簡體字、來源日期
npm run build      # 合併 → data/glossary.json → 注入 src/index.html → index.html
npm test           # 建置產物與資料一致性測試
```

`index.html` 是建置產物，不要手改；改 `src/index.html` 或資料檔後重新 `npm run build`。CI 會檢查產物是否為最新。

遊戲卡片資料來自同層的 `../steam-tag-prompter/data/game-index.json`（建置時若存在會自動補缺）；沒有那個 repo 也能建置，只是新引用的 appid 會先顯示文字卡片。

## 授權

程式與資料 MIT。遊戲縮圖來自 Steam 商店，版權屬各發行商。
