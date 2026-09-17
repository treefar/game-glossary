# 遊戲名詞大百科 改進規畫（v3.1 → v4）

規畫日期 2026-09-17｜規畫者 Claude Code（Fable 5.1）｜狀態：**只規畫，尚未實作**。
本檔是給接手實作的 AI 或人的工單集，每一項可獨立派工。實作者先讀第 0 節再動手。

---

## 0. 範圍鎖（每個工單都適用，放最前面不是附註）

| 項目 | 規定 |
|---|---|
| 可改的目錄 | `src/`、`data/entries/`、`data/paths.json`（新）、`scripts/`、`tests/`、`docs/`、`README.md` |
| **不可手改** | `index.html`、`data/glossary.json`、`data/game-cards.json`（前兩個是建置產物，CI 會比對；卡片檔只由 `scripts/fetch-cards.js`／`find-appids.js` 寫） |
| 不可做 | 引入外部 JS 函式庫或 CDN（單檔離線是硬約束，Google Fonts 是唯一例外）；改 `paper-journal` 色值與字型；用表情符號當圖示（用 `src/index.html` 開頭的 SVG sprite，新圖示照同風格加 `<symbol>`）；用 Steam 官方以外的標籤；編造來源網址；簡體字與中國用語 |
| 管線 | 改資料或模板後一律 `npm run validate` → `npm run build` → `npm test`，三個都綠才能 commit；`index.html` 與 `data/glossary.json` 要一起提交 |
| 分支 | 每個工單一個分支一個 PR，不直接推 main；同一個檔同一時間只交給一個代理 |
| 資料格式 | `data/SCHEMA.md`。新增欄位要同步改：`SCHEMA.md`、`scripts/validate.js`、`src/index.html` 的 `bodyHtml()`、`tests/build.test.js` |
| 語言 | 繁體中文台灣用語；遊戲名用台灣官方或通稱 |
| 驗收 | 每項的驗收條件都要能回答 yes／no，做不到就交部分成果並寫明卡在哪一條 |

---

## 1. 現況與缺口（2026-09-17 實測數字）

| 指標 | 數字 | 意義 |
|---|---|---|
| 詞條 | 529（14 類） | 廣度夠，深度不均 |
| 代表作少於 2 個 | 96 條 | 製作者看不到「近作」與「經典」對照 |
| 沒有任何比較（compare） | 96 條 | 「跟誰容易搞混」是本站賣點，五分之一的條目沒有 |
| 設計要點少於 80 字 | 313 條 | 只講「注意什麼」，沒講「要決定什麼參數」 |
| def 含超過 80 字的長句 | 263 條 | 大一新生讀起來吃力 |
| 未查證 | 58 條（多為黑話） | 教材可信度 |
| 代表作全部沒有 Steam appid | 29 條 | 沒有縮圖卡片 |
| 沒有 Steam 標籤 | 225 條 | 多為機制與黑話，屬正常；但類型與題材類仍有漏 |
| 沒有詞源（origin） | 490 條 | 類型與機制類值得補，黑話不必 |

功能面現況：搜尋（子字串）、分類篩選、比較速查表、Steam 標籤索引、隨機一條、def 自動連結、固定連結、明暗主題、與標籤定位器雙向連結。**缺的是「查到之後怎麼用在自己的遊戲上」這一層。**

---

## 2. 目標

讓製作者走完這條路：**查到 → 看懂 → 知道自己的遊戲能怎麼用 → 知道要決定哪些參數與取捨 → 找到延伸閱讀與參考作**。
現在只做到前兩步。以下工單依「對製作者的直接幫助 ÷ 工程量」排序。

---

## 3. 工單

### P0（最先做：幫助最直接、工程最小）

#### P0-1　企劃文字分析器：「貼上你的企劃，標出裡面的術語」

- **為什麼**：學生寫企劃時最需要的是「我用的詞對不對、還漏了什麼」。這是把百科從查詢工具變成寫作工具的一步。
- **做法**：
  1. 新分頁「分析企劃」（tab，圖示用既有 `i-file-text`）。一個 `<textarea>`（上限 5,000 字）＋「分析」按鈕。
  2. 用既有 `LINK_NAMES` 與 `linkify()` 的比對邏輯掃全文（不要重寫比對規則，抽成共用函式 `findTerms(text)` 回傳 `[{id,start,end}]`）。
  3. 輸出三區：**你用到的詞**（每個一張卡：zh／short／點開展開）、**這些詞旁邊常一起出現的概念**（把命中詞條的 `related` 與 `compare.with` 展開、去掉已命中的、依出現次數排序，取前 10）、**容易搞混的地方**（命中詞條的 `compare` 全列，讓學生確認自己指的是 A 還是 B）。
  4. 全部在瀏覽器本機做，不上傳；文字不存 localStorage。
- **驗收**：貼一段含「魂系、彈幕、肉鴿、Roguelite、心理恐怖」的 300 字企劃 → 五個詞全部命中（yes/no）；「常一起出現」區出現 `permadeath`、`survival-horror` 之一（yes/no）；貼 5,000 字在 500 ms 內出結果（yes/no）；貼含 `<script>` 的文字不會執行（yes/no，用既有 `esc()`）。
- **規模**：模板約 120 行 JS＋40 行 CSS；不動資料。

#### P0-2　學習路徑：「做 X 類遊戲該懂的 12 個詞」

- **為什麼**：529 條沒有順序。製作者要的是「我要做 Roguelite，先讀哪 12 條」。
- **做法**：
  1. 新資料檔 `data/paths.json`，格式：
     ```json
     [{"id":"roguelite","title":"做一款 Roguelite","for":"企劃／程式","intro":"一句話說這條路徑解決什麼",
       "steps":[{"id":"roguelike","why":"先分清楚你要做哪一種"},{"id":"roguelite","why":"…"},{"id":"permadeath","why":"…"},{"id":"meta-progression","why":"…"},{"id":"procedural-generation","why":"…"},{"id":"synergy","why":"…"},{"id":"run","why":"…"},{"id":"seed","why":"…"},{"id":"action-roguelike","why":"…"},{"id":"roguelike-deckbuilder","why":"…"},{"id":"difficulty-curve","why":"…"},{"id":"game-juice","why":"…"}],
       "compareFirst":[["roguelike","roguelite"],["action-roguelike","traditional-roguelike"]],
       "tags":[1716,3959,42804]}]
     ```
     每條 8～14 步，`id` 必須存在（validate 要檢查），`why` 一句話講「為什麼這一步在這裡」。
  2. 先做 10 條：Roguelite、恐怖遊戲（含台式恐怖）、視覺小說與敘事、動作手感與果汁、平台跳躍、多人與網路、模擬經營與策略、手遊抽卡與營運、Steam 上架與產業實務、看懂玩家在說什麼（黑話速成）。
  3. 新分頁「學習路徑」：路徑卡 → 路徑頁（步驟列表、每步可展開詞條本體、勾選已讀存 localStorage `glossary.path.<id>`、進度條、「先讀這幾組比較」區、底部「加進標籤定位器」帶 `tags`）。網址 `#path-<id>` 可分享。
  4. 每條詞條底部加「出現在哪些路徑」。
  5. `scripts/build.js` 把 `paths.json` 併進 `DATA.paths`；`validate.js` 檢查 id 存在與步數範圍。
- **驗收**：10 條路徑全部 id 有效（validate 0 錯）；`#path-roguelite` 開啟後勾選第 3 步、重整仍勾著（yes/no）；每條路徑「加進標籤定位器」按了在定位器看到對應核心標籤（yes/no）。
- **規模**：資料 10 條（內容工作，需要懂遊戲設計的模型寫 `why`）；模板約 150 行。

#### P0-3　資料補洞（內容工單，可拆給多個代理平行）

拆成四張獨立小工單，每張都只改 `data/entries/*.json`，完成後 validate 0 錯：

| 工單 | 對象 | 要求 | 驗收 |
|---|---|---|---|
| P0-3a 代表作 | 96 條 examples < 2 | 補到至少 2 個：一個近三年（2023 起）、一個經典；優先 Steam 上有的，用 `scripts/find-appids.js` 補 appid 與卡片；黑話類可用「常出現在哪個遊戲社群」 | `node -e` 統計 examples<2 為 0；新 appid 全在 `game-cards.json` |
| P0-3b 比較 | 96 條沒有 compare | 每條至少 1 組，對象必須是既有 id；`diff` 講「後果」不講詞義 | 沒有 compare 的條目數為 0；validate 無懸空 |
| P0-3c 設計要點 | 313 條 design < 80 字 | 擴到 80～150 字，結構固定：「要決定的參數」＋「常見失敗」＋「一個可行的預設值」 | design < 80 字為 0；抽 20 條人工讀，每條都能找到「參數」與「失敗」兩個元素 |
| P0-3d 可讀性 | 263 條 def 含 > 80 字句 | 拆成兩句以上，一句一件事；不改事實、不加新斷言 | 含 > 80 字句的條目為 0；validate 0 錯 |

`data/REVIEW.md` 第 4 節有可讀性評語與範例，先讀。

### P1（讓「看懂」變「會用」：新增結構化欄位）

#### P1-1　新欄位 `decide`：做這個東西要決定的參數

- **格式**：`"decide":[{"q":"擊中時要停幾幀？","hint":"輕攻擊 2～3 幀、重攻擊 6～10 幀；雙方都停還是只停被打的一方","default":"3 幀，雙方都停"}]`，每條 3～5 項。
- **對象**：cat 為 `genre`、`mechanic`、`juice`、`system` 的 220 條；其他類不填。
- **呈現**：詞條展開區「設計要點」下方新增「你要決定的事」清單，`default` 用 `--accent2` 標示。
- **驗收**：220 條全填、每條 3～5 項（validate 檢查）；抽 hitstop、roguelite、pity-system、coyote-time 四條，`default` 是具體數值或明確選項而不是「視情況」（yes/no）。

#### P1-2　新欄位 `pitfalls`：常見誤用

- **格式**：`"pitfalls":["把 Roguelike 做成有存檔的關卡制，失去每局重來的意義","…"]`，2～3 條。
- **對象**：全部非黑話類。呈現在「跟誰容易搞混」之後，eyebrow「常見誤用」。
- **驗收**：非 slang 條目全填；每條至少 2 項；不與 compare 內容重複（人工抽 20 條）。

#### P1-3　新欄位 `scope`：對小團隊的可行性

- **格式**：`"scope":{"level":"solo|small|studio","note":"一句話說為什麼"}`。`solo`＝1 人一學期可做出可玩雛型，`small`＝3～5 人一年，`studio`＝團隊級。
- **對象**：cat 為 `genre` 的 99 條＋標籤定位器 `HEAVY` 表裡對應得到的標籤（去 `C:\projects\steam-tag-prompter\core.js` 查 `HEAVY`，兩邊要一致，不一致以定位器為準並在 note 說明）。
- **呈現**：詞條標題列加一顆小徽章（三色用既有 `--ok`／`--warn`／`--danger`，加 title 說明）；分類篩選加「只看 1 人可做」開關。
- **驗收**：99 條全填；`mmorpg`、`battle-royale`、`moba` 是 `studio`（yes/no）；`walking-sim`、`idle-incremental`、`visual-novel` 是 `solo`（yes/no）。

#### P1-4　新欄位 `impl`：Unity 實作提示（果汁與機制）

- **格式**：`"impl":{"api":["Time.timeScale","Cinemachine Impulse"],"pseudo":"5 行內虛擬碼","note":"一句地雷"}`。
- **對象**：`juice` 12 條、`mechanic` 44 條、`system` 內與程式直接相關的（save-point-checkpoint、seed、input-buffer 等，自行判斷約 15 條）。M1 組已把部分內容寫在 `design` 裡，抽出來，不要重複。
- **限制**：API 名稱要查 Unity 6 官方文件確認存在（`docs.unity3d.com`），查不到的寫概念不寫 API 名；不假設版本相依行為。
- **呈現**：`<details>` 收合，eyebrow「在 Unity 裡怎麼做」，虛擬碼用 `--mono`。
- **驗收**：約 70 條全填；每個 `api` 名稱在 Unity 文件可搜到（抽 10 個）；validate 檢查 `pseudo` 不超過 8 行。

#### P1-5　把標籤定位器的短碼貼進百科

- **做法**：搜尋框偵測輸入以 `S2` 開頭且長度為 2＋6n 的字串 → 解碼（規則見附錄 A）→ 顯示「這組標籤對應的詞條」（用 `steamTags.tagid` 反查）＋「這個組合先讀這幾組比較」（命中詞條之間互相的 compare）＋「沒有對應詞條的標籤」列出來（給 P2-5 補詞用）。
- **驗收**：貼定位器產生的任一 S2 碼，命中詞條數 ≥ 標籤數的一半（yes/no）；貼壞掉的碼顯示「無法解讀」而不是空白（yes/no）。
- **規模**：約 60 行 JS，解碼函式可直接從定位器 `core.js` 的 `decodeSel` 抄（MIT），但百科不需要 `idx`，只需 tagid。

#### P1-6　角色入口：我是企劃／程式／美術

- **做法**：首頁 lead 段下方三張入口卡。點了設定 `state.role`，影響：分類 chips 的排序（企劃：genre→theme→narrative→system；程式：mechanic→juice→system→tech→multiplayer；美術：visual→theme→juice→genre）、學習路徑分頁的排序、詞條展開區預設展開哪一段（程式先看 `impl`，美術先看代表作）。存 localStorage `glossary.role`。
- **驗收**：三種角色切換後分類順序不同（yes/no）；重整後角色保留（yes/no）；不選角色時行為與現在完全相同（yes/no）。

### P2（進階：課堂與延伸）

#### P2-1　閃卡與測驗模式
- 「這是哪個詞？」：顯示 `short`＋`features`，選項 4 個（1 正確＋3 個同 cat 的干擾項）；「差在哪？」：顯示 compare 的 `diff`，問是 A 還是 B。
- 網址 `#quiz=<id,id,…>` 可指定題目（老師出「本週 10 題」）；不指定就從當前篩選抽 10 題。成績只存 localStorage，不上傳。
- 驗收：`#quiz=roguelike,roguelite,soulslike` 出 3 題（yes/no）；答錯顯示正解與「去看詞條」連結（yes/no）。

#### P2-2　詞條關係圖
- 用 `related`＋`compare` 當邊，`build.js` 建置時用簡單力導向算好座標寫進 `DATA.graph`（不要在瀏覽器即時算，529 節點會卡）；前端用 `<svg>` 畫，點節點開詞條，滑過亮相鄰。分類上色用既有 15 個 cat 各配一色（要從 paper-journal 的 `--accent`／`--accent2`／`--info` 衍生，不可自創第四個重點色以外的色相；做不到就只用灰階＋粗細）。
- 驗收：全圖在 1,200 KB 單檔上限內再加不超過 150 KB（yes/no）；點「魂系」節點看得到 metroidvania、stamina-system、posture-bar 相鄰（yes/no）。

#### P2-3　匯出講義
- 勾選多條（或一條路徑）→「匯出」產生可列印頁（既有 print CSS 擴充）與 Markdown 下載（Blob，不連網）。
- 驗收：匯出 12 條路徑成 Markdown，每條含 zh／en／short／def／design／來源（yes/no）；列印預覽無截斷的卡片（yes/no）。

#### P2-4　搜尋強化
- 簡繁對照：使用者用簡體輸入「肉鴿」「視覺小說」時也要命中，做法是一張約 200 字的簡繁對照表（只收遊戲用語常見字，不引入函式庫；對照表本身放在 `src/core.js`，並在檔案加 `zh-lint: off` 註記，因為它必然含簡體字）；英文容錯 1 個字元（Levenshtein ≤ 1，只對長度 ≥ 5 的英文詞）；縮寫索引（`aliases` 已有，確保 `CC`、`CD`、`DPS`、`TTK` 等 2～3 字母縮寫要「整字相符」才命中，避免 `CC` 命中所有含 cc 的字）。
- 驗收：用簡體輸入「肉鴿」命中 roguelike（yes/no）；搜「soulslke」命中 soulslike（yes/no）；搜「CC」第一筆是 crowd-control 且不超過 5 筆（yes/no）。

#### P2-5　補詞與詞源
- `data/REVIEW.md` 第 5 節列了 30 個建議新詞，依該節排序補；`power-fantasy` 與 `skill-floor-ceiling` 上輪查無來源，找到再寫。
- `origin` 欄：只補 `genre` 與 `mechanic` 兩類（143 條），每條 1～3 句，要有來源。黑話不補。
- 驗收：validate 0 錯；新詞每條 status verified 或在 report 說明。

#### P2-6　技術債
- `src/index.html` 已 500 行以上，把 CSS 與 JS 拆成 `src/style.css`、`src/app.js`，由 `build.js` 內嵌回單檔（照標籤定位器 `build-tags.js` 內嵌 `core.js` 的做法）。純邏輯（`matches`、`rank`、`linkify`、`findTerms`、S2 解碼）移到 `src/core.js`，讓 `tests/` 能直接 `require`。
- 驗收：建置後 `index.html` 行為與拆分前完全相同（現有 7 項測試＋P0/P1 新測試全過）；`npm test` 不需要瀏覽器。

---

## 4. 建議的派工方式

| 批次 | 工單 | 可平行 | 適合誰 |
|---|---|---|---|
| 第一批 | P0-3a、P0-3b、P0-3c、P0-3d | 四個各自獨立，但**都改 `data/entries/*.json`**：要嘛依檔案切（每個代理負責不同的 json 檔，四種工作都做），要嘛序列做。建議依檔切 | 懂遊戲設計、會查證的模型 |
| 第二批 | P0-1、P0-2 | 可平行（P0-2 的 `paths.json` 內容另派） | 前端＋一位寫路徑內容的 |
| 第三批 | P1-1～P1-4（資料）與 P1-5、P1-6（功能） | 資料四項會改同一批 json，依檔切；功能兩項可平行 | 同上 |
| 第四批 | P2-6 先做（拆檔），再做 P2-1～P2-5 | | |

每一批結束都要：`npm run verify`（＝build＋test）綠、CI 綠、更新 `LATEST_HANDOFF.md`。

---

## 5. 失敗路徑

- 資料工單做不完：交已完成的檔，在 `data/entries/<檔>.report.md` 列出沒做的 id；不可為了湊數寫「視情況而定」這種空話。
- 來源找不到：status 標 `unverified`，不可編網址。
- 新欄位驗證擋住舊資料：在 `validate.js` 把新欄位設為「有就檢查、沒有不報錯」，直到該工單把對象條目全填完再改成必填。
- 單檔超過 1,500 KB：先做 P2-6 拆檔並把 `data/glossary.json` 的 `sources` 欄縮成只留 `url`＋`title`，再談其他。
- 與標籤定位器不一致（HEAVY、tagid、短碼規則）：以定位器 repo 的 `core.js` 與 `data/tags.json` 為準，百科跟著改。

---

## 附錄 A　標籤定位器短碼（S2）規則

`S2` 後每 6 個字元一組：前 5 字元是 Steam tagid 的 base36（大寫或小寫皆可，補零到 5 位），第 6 字元是角色（`c` 核心、`d` 差異化、`a` 待抉擇）。最多 40 組。範例：`S2` + `001BOc` → tagid `parseInt("001BO",36)` = 1716（Roguelike），角色核心（實測：`(1716).toString(36)` = `1bo`，補零成 5 位）。無法解讀（長度不對、不是 base36、tagid 不在表裡）就整串拒收，不回半組。完整實作在 `C:\projects\steam-tag-prompter\core.js` 的 `decodeSel`。

## 附錄 B　現有可重用的函式（`src/index.html`）

| 函式 | 用途 | 給哪個工單 |
|---|---|---|
| `LINK_NAMES`、`linkify(text,selfId)` | 詞條名稱比對與自動連結 | P0-1（抽成 `findTerms`） |
| `matches(e)`、`rank(e)` | 搜尋比對與排序 | P2-4 |
| `bodyHtml(e)` | 詞條展開區 | P1-1～P1-4 加區塊 |
| `setTag(id)` | Steam 標籤篩選視圖 | P1-5 |
| `ic(name)` | SVG 圖示 | 所有新 UI |
| `store.get/set` | localStorage 包 try/catch | P0-2、P1-6、P2-1 |
| `route()` | hash 路由 | P0-2（`#path-`）、P2-1（`#quiz=`） |

## 附錄 C　欄位現況（哪些欄位大多是空的）

`origin` 490 條空、`tw` 432 條空、`steamTags` 225 條空（機制與黑話正常）。新增 `decide`／`pitfalls`／`scope`／`impl` 時，validate 一開始設為選填。
