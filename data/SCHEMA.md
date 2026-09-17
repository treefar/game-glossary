# 遊戲名詞大百科 資料格式（v1，2026-09-17）

每個領域一個檔：`data/entries/<domain>.json`，內容是 JSON 陣列，每個元素一條詞條。
UTF-8、無 BOM、一律繁體中文台灣用語（禁止簡體字與中國用語：不寫「视频／软件／信息／优化／默认／服务器／内存」，要寫「影片／軟體／資訊／最佳化／預設／伺服器／記憶體」）。

```json
{
  "id": "roguelike",
  "zh": "Roguelike（肉鴿）",
  "en": "Roguelike",
  "aliases": ["肉鴿", "類 Rogue", "ローグライク"],
  "cat": "genre",
  "sub": "Roguelike 家族",
  "short": "每局隨機生成、死亡即重來、局內不留任何進度的類型。",
  "def": "150～300 字白話定義，講給台灣大一新生聽。第一句就講它是什麼，接著講怎麼玩、為什麼玩家喜歡。",
  "features": ["程序化生成關卡", "永久死亡", "回合制與格狀移動（傳統派）", "局內所有進度歸零"],
  "examples": [
    {"title": "黑帝斯", "en": "Hades", "appid": 1145360, "year": 2020, "why": "把 Roguelite 的局外成長與敘事結合的教科書"}
  ],
  "steamTags": [{"tagid": 1716, "en": "Roguelike"}, {"tagid": 42804, "en": "Action Roguelike"}],
  "compare": [{"with": "roguelite", "diff": "Roguelike 局內全重置；Roguelite 允許局外永久成長。"}],
  "related": ["permadeath", "procedural-generation", "run"],
  "design": "60～150 字，給企劃與學生的設計提醒：做這種東西要注意什麼、常見失敗。",
  "origin": "可選。詞源與歷史 1～3 句（1980 年 Rogue……）。",
  "tw": "可選。台灣用法、與中國／日本用語差異。",
  "sources": [
    {"title": "Steam 標籤頁：Roguelike", "url": "https://store.steampowered.com/tags/en/Roguelike/", "accessed": "2026-09-17", "note": "標籤存在與代表作"},
    {"title": "Wikipedia: Roguelike", "url": "https://en.wikipedia.org/wiki/Roguelike", "accessed": "2026-09-17", "note": "定義與柏林詮釋"}
  ],
  "status": "verified"
}
```

## 欄位規則

| 欄位 | 必填 | 規則 |
|---|---|---|
| id | 是 | 小寫英文與連字號，全庫唯一，照分配表給的 id 寫，不可自創別的 |
| zh | 是 | 主名，台灣慣用；英文詞為主名時括號附中文通稱 |
| en | 是 | 英文正式名 |
| aliases | 是（可空陣列） | 別名、縮寫、日文、中國用語（中國用語要標「中」，例：`"肉鸽（中）"`） |
| cat | 是 | `basics` `genre` `theme` `visual` `narrative` `mechanic` `juice` `system` `multiplayer` `tech` `industry` `mobile` `esports` `ai` `slang` |
| sub | 是 | 章內小節名稱，同領域內盡量一致 |
| short | 是 | 一句話，40 字內 |
| def | 是 | 150～300 字 |
| features | 是 | 3～6 條，每條 20 字內 |
| examples | 是 | 2～6 個。`appid` 一律查 `data/steam-games-ref.tsv`，查不到填 `null`（仍可列，但要確定遊戲真的存在）。`title` 用台灣通稱或官方繁中名 |
| steamTags | 是（可空） | 0～4 個，`tagid` 與 `en` 必須完全對得上 `data/steam-tags-ref.tsv`；黑話類多半為空 |
| compare | 是（可空） | 易混淆詞比較，`with` 填對方 id（可以是別的檔的 id），`diff` 一句話講差在哪 |
| related | 是（可空） | 相關 id |
| design | 是 | 60～150 字。黑話類可改寫成「使用場合與注意」 |
| origin / tw | 否 | |
| sources | 是 | 至少 1 筆，優先序：Steam 標籤頁／Steamworks 文件 → Wikipedia（英／中）→ 開發者官方部落格、GDC 演講、Game Developer 文章 → 其他。每筆要有 `accessed`（今天 2026-09-17） |
| status | 是 | 定義與代表作都有來源支持 → `verified`；憑記憶或查不到 → `unverified`，並在 report 說明 |

## 硬規則
- 不編造來源網址。搜不到就 `unverified`。
- 代表作年份、開發商如不確定不要寫，寧可省略。
- 「心理恐怖 vs 恐怖」「Roguelike vs Roguelite」「魂系 vs 類魂」這類差異一定要寫進 `compare`，那是本百科的賣點。
- 寫完執行 `node scripts/validate.js data/entries/<domain>.json`，全過才算完成。
