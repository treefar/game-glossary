<!-- zh-lint: off　本報告需逐字引用查獲的簡體字（首领蜂、组合爆炸）與 scripts/validate.js 的原始黑名單字串當作錯誤範例，故關閉語言檢查。報告本文一律繁體中文台灣用語。 -->

# 遊戲名詞大百科 總審核報告

審核日期：2026-09-17　範圍：`data/entries/*.json`（含 `supplement-a.json`，共 530 條）
驗證狀態：`node scripts/validate.js` → **共 530 條，錯誤 0，警告 97**（跨檔斷鏈警告已全數歸零）

本檔只記錄「不改、只報告」的項目。已直接修掉的機械性問題另見文末〈附錄：A 類已改清單〉。

---

## 1. 招牌條目深度檢查

逐條 1～5 分（5 最好）。所有 `compare[].with` 與 `related` 指到的 id 都實際存在，本節無斷鏈。

### 1-A　恐怖三方比較

| 條目 | 分數 | 一句話改進建議 |
|---|---|---|
| `horror` | 3 | `compare` 標著 `with: "survival-horror"`，diff 內文卻在比「心理恐怖 vs 生存恐怖」，文不對題，應改寫成「恐怖是上位總稱，生存恐怖是其中最早成形、以資源與戰鬥壓力為核心的子類」。 |
| `psychological-horror` | 5 | 全庫示範等級，唯一可補的是把 `related` 已有的 `taiwan-horror` 升格進 `compare`，說明《返校》為何兩邊都算。 |
| `survival-horror` | 3 | 三個 examples 全是《惡靈古堡》，等於暗示「生存恐怖＝Capcom 一家」；把〈村莊〉換成 def 裡自己點名卻沒進 examples 的《異形：孤立》。 |

**這組的區分度**：骨架對，但只有 `psychological-horror ↔ survival-horror` 是雙向且精準的（壓力來自精神狀態 vs 資源與戰鬥）。問題在「總稱 vs 子類」那兩條邊：`horror` 的 diff 跑錯對象，`survival-horror` 對 `horror` 只寫「最早成形的子類型」，沒說「總稱底下不只這兩條路線」。另外 `horror` 的三個 examples 有兩個被 def 自己歸為心理恐怖，其中〈層層恐懼〉還與 `psychological-horror` 重複，父條目讀起來像子條目的擴充版。建議父條目 examples 改成「一款生存恐怖＋一款心理恐怖＋一款兩者皆非」，用舉例本身演示總稱的涵蓋範圍。

### 1-B　Roguelike 家族

| 條目 | 分數 | 一句話改進建議 |
|---|---|---|
| `roguelike` | 3 | 與 `traditional-roguelike` 的 def、examples 高度重疊，應改寫成「家族總稱＋柏林詮釋的來歷」，把回合制／方格移動的硬性描述全部讓給 `traditional-roguelike`。 |
| `roguelite` | 4 | 局外成長寫得最白話，但只有 1 筆 source、1 條 compare，請補一條對 `survivors-like` 的 diff（對方已單向指過來）。 |
| `action-roguelike` | 3 | 《黑帝斯》同時是 `roguelite` 與本條的第一代表作，卻沒解釋為何同一款掛兩個標籤；換成《挺進地牢》或《雨中冒險2》並補上下位 compare。 |
| `traditional-roguelike` | 2→4 | `steamTags` 原掛 1716 Roguelike，與 `roguelike` 撞格，**已改為 454187 Traditional Roguelike**（見附錄）；仍建議與 `roguelike` 做職責切分。 |

**這組的區分度**：「局內 vs 局外」講清楚了，「四條為什麼要分四條」沒講清楚。另有一處**過度簡化須修**：柏林詮釋原文把條件列為「高／低價值因素」並明言不是檢核表，但 `roguelike` 的 def 寫成「完全符合這些條件的才算正統，只符合部分的則歸類為 Roguelite」，把描述性文件寫成了資格考。建議補一句「柏林詮釋自述這些是傾向性因素而非通過門檻，Roguelite 是社群後來的慣用分法」。此外四條之中沒有任何一條的 `compare`／`related` 指向庫內已存在的 `run`，「局內」這個概念的入口就這樣斷了（SCHEMA 範例自己都把 `run` 列進 related）。

### 1-C　soulslike

| 條目 | 分數 | 一句話改進建議 |
|---|---|---|
| `soulslike` | 3 | `tw` 欄主張「魂系＝本家、類魂＝他廠」，但本條兩個 examples（艾爾登法環、隻狼）依此定義全是「魂系」原典，沒有半款「類魂」，請至少換一款他廠作品（`tw` 裡點名的《P 的謊言》《仁王》都沒進 examples）。 |

**魂系 vs 類魂的台灣實際用法**：`data/steam-tags-ref.tsv` 裡 tagid 29482 的 Steam 繁中官方譯名就是「**類魂**」，所以「類魂」是官方詞、「魂系」是社群詞，這個層次 `tw` 完全沒提。而 `tw` 寫「嚴格來說魂系多指本家」屬於社群約定、不是有權威來源的定義；台灣玩家實際上大量把「魂系」當廣義類型用。建議改成描述性寫法：「兩詞在台灣口語中大多混用；部分社群會刻意用魂系指本家原典、類魂指他廠衍生，但這是約定而非通則，Steam 繁中官方標籤採用『類魂』。」

**規則與資料對不上（需裁決）**：`data/SCHEMA.md` 硬規則明寫「『魂系 vs 類魂』這類差異一定要寫進 `compare`」，但 `compare[].with` 必須填 id，庫內沒有「魂系本家」的 id，現況無法照辦，該差異整個只活在 `tw` 欄。**二擇一**：新增 `souls-series` 條目當比較對象，或修改 SCHEMA 措辭。不要讓規則與資料長期對不上。

### 1-D　shmup／bullet-hell／survivors-like

| 條目 | 分數 | 一句話改進建議 |
|---|---|---|
| `shmup` | 4 | def 主動點破「彈幕只是 shmup 底下彈量特別誇張的一支」是關鍵句，但兩個 examples（東方紅魔鄉、斑鳩）恰好反證了這句話，請換一款非彈幕的正統捲軸射擊。 |
| `bullet-hell` | 2 | **史實張冠李戴**：1993 年東亜プラン的作品是《Batsugun》，《首領蜂》是 **Cave 1995 年**的作品，現行 def／origin 把兩款遊戲、兩家公司綁成一句。 |
| `survivors-like` | 5 | 這組最好的一條，`aliases` 請補上 Steam 繁中官方譯名「**逆彈幕**」（tagid 723991），目前只收了「彈幕天堂」，學生在商店頁上看到的字反而查不到。 |

**這組的區分度**：血緣關係本身是四組裡邏輯最乾淨的，`shmup → bullet-hell` 的上下位雙向對得上，`bullet-hell ↔ survivors-like` 的「彈幕是你閃他的彈、逆彈幕是你的彈淹過去」是全庫最漂亮的一句 diff。扣分集中在**舉例與史實**：examples 全部偏向東方 Project（shmup 一款、bullet-hell 兩款），而彈幕類真正的技術源頭（Cave、Toaplan）只出現在 origin 的錯誤敘述裡。

**另兩項待處理**：
- `bullet-hell` 把極小判定箱稱為「俗稱『小當家』判定」，**查不到任何台灣彈幕圈使用此說法的來源**，一般講法是「判定點」或「自機判定」，建議刪除或整條標 `unverified`。
- origin 建議改寫為：「1993 年東亜プラン《Batsugun》被視為雛型，1995 年 Cave《首領蜂》確立彈幕公式；Cave 由東亜プラン原班人馬創立。」（簡體字「领」已修，見附錄。）

### 1-E　game-juice 系列（`cat: "juice"` 共 12 條）

| 條目 | 分數 | 一句話改進建議 |
|---|---|---|
| `game-juice` | 4 | 正確指出 *The Art of Screenshake* 是 2013 INDIGO Classes 而非 GDC（這點網路上最常寫錯），但 def 323 字超出 SCHEMA 上限，且庫內缺 `game-feel` 可供比較。 |
| `hitstop` | 4 | `design` 先建議「把 Time.timeScale 短暫壓到接近零」、後又說「避免直接卡住 Time.timeScale」，自相矛盾，改寫成「記得同步處理 `Time.fixedDeltaTime` 與音效 pitch」。 |
| `screen-shake` | 3 | `compare` 空白，但 `camera-kick` 單向指過來說「後座力可預期、震動是隨機」，請補上反向 diff。 |
| `squash-and-stretch` | 2 | 兩個 examples（Vampire Survivors、Dead Cells）都不是這個手法的代表作，換成《蔚藍》的落地壓縮或《Rayman Legends》。 |
| `hit-flash` | 3 | 唯一那筆 source 的 note 自承「站台有反爬蟲阻擋但確認出現於搜尋結果中」＝沒讀到內文，**已改標 `unverified`**（見附錄），仍建議換一筆能實際打開的來源。 |
| `knockback` | 4 | def 主軸用《任天堂明星大亂鬥》的傷害百分比連動擊退距離是絕佳選擇，但敘事主角沒進 examples。 |
| `particle-feedback` | 3 | def 僅 125 字、`compare` 空白，請補一條與 `hit-flash` 的區分（粒子是離開本體的獨立物件、閃白是本體材質變色）。 |
| `camera-kick` | 3 | 兩個 examples 的 year 是 Steam 上架年而非本體發行年（CS2 標 2012、Black Ops Cold War 標 2023），請在 `why` 註明。 |
| `controller-rumble` | 2 | examples 之一《Gears of War: E-Day》（2026）尚無公開實機手感評價，無法驗證，換成《戰神》或《Astro's Playroom》。 |
| `slow-motion-finisher` | 3→4 | `steamTags` 原為空，**已補 5796 Bullet Time**（見附錄）；同樣建議換掉 E-Day 這個代表作。 |
| `damage-numbers` | 3 | `compare` 空白，補一條「傷害數字是呈現層、暴擊是計算層，關掉飄字不會改變暴擊發生」。 |
| `sound-feedback` | 4 | 本組唯一有學術來源（IEEE CTSoc GEM 2022 / arXiv 2208.06155），但 `compare` 空白，補一條「音效要對齊的是停頓的進入瞬間而非結束」。 |

**這組的區分度：四組裡最弱，而且弱在結構不在內容。** 12 條裡有 **7 條的 `compare` 是空陣列**，而 README 與 SCHEMA 都把 `compare` 列為本百科的賣點；現有比較幾乎全是單向，只有 `hitstop ↔ slow-motion-finisher` 雙向。學生從 `screen-shake` 進來，看不到任何「這跟後座力／頓幀差在哪」的線索。

三個跨條目問題：
1. **庫內沒有 `game-feel` 條目**，但 `screen-shake` 的唯一來源就是 Wikipedia 的 *Game feel*。Game Feel（Swink，即時控制的體感）與 Game Juice（回饋外皮）正是這領域最常被混用的一對，缺這條是整組最大的洞。
2. **examples 高度重複**：《黑神話：悟空》出現在 5 條、Dead Cells 4 條、Vampire Survivors 4 條，12 條果汁讀起來像同三款遊戲的五種說法。
3. **排版不一致**：`mechanics-combat-juice.json` 的 def 中英文之間幾乎不留空格（實測 88 處貼合、僅 2 處有空格），其他八檔幾乎一律留空格，網頁上並排時這一章會明顯比別章擠。

### 1-F　taiwan-horror

| 條目 | 分數 | 一句話改進建議 |
|---|---|---|
| `taiwan-horror` | 4 | 《返校》的 `appid` 是 `null`，導致這條旗艦條目的第一個代表作在網頁上只會是無縮圖的文字卡；請把返校補進 `steam-games-ref.tsv` 後回填 appid（實際號碼**未查證**，以 Steam 商店頁為準）。 |

**在地性與史實**逐項核對皆正確：《返校》2017／赤燭、《還願》2019／彩蛋事件下架／2021 自有商店重新上架（此條 `appid` 填 `null` 是**對的**，《還願》確實仍未回到 Steam，這個細節比一般資料庫細緻）、《女鬼橋二 釋魂路》appid 2331330／2024 與參考表吻合。三筆 source 都真實且各自對應到它支持的敘述。`steamTags` 留空正確，Steam 確無對應官方標籤。

`compare` 兩條方向正確，對 `folk-horror` 的「台式恐怖是民俗恐怖在台灣脈絡的子集，額外疊加白色恐怖等本土歷史記憶」把「民俗」與「歷史創傷」兩層講開了，是本條最有價值的一句。**缺的是**：`related` 已列 `horror` 與 `psychological-horror` 卻沒有 `compare`，而《返校》同時是 `psychological-horror` 的代表作——這正是最需要說明的一對（同一款作品，一邊因主觀視角與記憶碎片算心理恐怖、一邊因題材與文化記憶算台式恐怖，兩個標籤是不同軸向、可以並存），補上可直接解決學生「返校到底算哪一類」的疑問。

另可加強時間縱深：三款裡兩款是赤燭（2017、2019），第三款是《女鬼橋》續作，等於這條路線 2020 年後只剩一個系列在撐；建議補一款近年非赤燭、非女鬼橋的本土作品（**未查證**，請自行挑選並補來源）。

---

## 2. 跨組重複或矛盾

| 配對 | 結論 |
|---|---|
| `spatial-narrative` ／ `environmental-storytelling` | 只需互相 compare（另需解 alias 撞名） |
| `gacha` ／ `gacha-culture` | 只需互相 compare |
| `grind` ／ `farm` | **已修** `with` 斷鏈，仍建議改寫 diff 文字並補反向 |
| `hitstop` ／ `slow-motion-finisher` | 維持現狀 |
| `cozy` ／ `cozy-game` | **建議合併**，保留 `cozy` |
| `wholesome` ／ `cozy` | 維持現狀 |
| `stamina-system` ／ `energy-system` | 維持現狀 |

> 註：清單原列 `slow-motion`，全庫實際 id 為 `slow-motion-finisher`。

### 2-1　spatial-narrative（M2, system／空間與關卡設計）vs environmental-storytelling（V1, narrative／敘事設計）→ **只需互相 compare**

兩條 def 骨幹幾乎一樣，但已有一條站得住的區分軸：宏觀空間結構 vs 微觀物件擺放，來源（Don Carson 2000）也對得上，**不建議合併**。compare 目前單向（`spatial-narrative` 有指過去，反向沒有）。

**事實矛盾，且是硬衝突**：`environmental-storytelling.aliases` 是 `["空間敘事", "場景敘事"]`，而 `spatial-narrative.zh` 就是「空間敘事」。一邊把它登記成別名，另一邊拿它當主名，讀者搜「空間敘事」會撞到兩條。

**建議**：在 `environmental-storytelling` 補 `{"with": "spatial-narrative", "diff": "環境敘事講單一場景中的物件擺放細節（微觀）；空間敘事講整體世界結構如何承載故事（宏觀），兩者常合併討論但尺度不同。"}`，把 `aliases` 的「空間敘事」刪掉（留「場景敘事」），`related` 補 `spatial-narrative`。

### 2-2　gacha（M2, system）vs gacha-culture（MB, mobile）→ **只需互相 compare**

分工寫得非常清楚，兩邊 def 都主動聲明邊界，實質內容不重疊，**不建議合併**。但**兩邊都沒有互指**——互指只存在於 def／design 的散文裡和單向的 `gacha.related`，散文提到不等於結構化欄位有連結，網站上生不出跳轉。

**建議 diff**：`gacha.compare` 補「gacha 講的是機率、保底與卡池怎麼配置的系統設計；轉蛋文化講的是課長、無課、井、歪這些玩家社群用語與課金現象。」，`gacha-culture` 補反向同義一條。另把 `gacha-culture.aliases` 的「轉蛋」移除（撞 `gacha.zh`）、「抽卡」改成「抽卡文化」。

**附帶兩項**：（a）庫裡有 `pity-system`（M2）與 `pity-counter`（MB）兩條保底詞條，`gacha.related` 指前者、`gacha-culture.related` 指後者，值得單獨審一次是否該合併；（b）`gacha-culture.aliases` 的「榨菜（中，指抽卡機率極低）」查無佐證，依「對映表逐筆查證」原則應回查來源再決定去留。

### 2-3　grind（M2, system）vs farm（S1, slang／MOBA 戰場）→ **只需互相 compare**

範圍差很多：`grind` 是泛用 MMO／ARPG 重複刷取，`farm` 實際收斂成 **MOBA 對線期補兵／CS**。**不建議合併**。

`grind.compare[0].with` 原本指向不存在的 `farming`，**已改為 `farm`**。但 diff 文字仍停留在 MMO 語意（「『農』／種田更常特指重複擊殺特定目標或執行特定路線以取得資源」），與 `farm` 自己的 def（「對線期擊殺小兵、野怪累積金錢與經驗值，是 MOBA 基本功」）對不上。

**建議 diff 改寫**：「刷等泛指在 RPG／MMO 重複任務換取等級、金錢或素材；Farm 在台灣多指 MOBA 對線期補小兵賺經濟（CS），是同一種重複行為在不同類型的說法。」並在 `farm.compare` 補反向一條。

### 2-4　hitstop vs slow-motion-finisher（同在 M1）→ **維持現狀**

不重疊（每次命中的 2～6 幀凍結 vs 擊殺時較長的時間縮放＋切鏡），**已雙向互指**，`related` 也互含，兩邊 diff 在頻率、長度、目的三軸上口徑一致。無需再動。

### 2-5　cozy（T1, theme／氛圍標籤）vs cozy-game（G2, genre／生存與生活模擬）→ **建議合併**

7 組裡唯一真的該合併的。兩邊 def 要素逐項對得上（放鬆低壓力、無失敗懲罰、開放式目標、自我表達、採集種植照顧、2016 星露谷＋2020 動森），examples 同樣以《星露谷物語》打頭，`cozy-game.aliases` 直接包含 `"Cozy"` 與 `"愜意遊戲"`。**兩邊都沒有互指**，資料層完全不知道對方存在。

**事實矛盾——兩邊都自稱是「氛圍那一邊」**：
- `cozy` def：「這裡指的是 Steam 上的氛圍標籤，與玩法類型的悠閒模擬是同一現象的兩種切入角度：那邊講機制，這裡講情緒氛圍。」
- `cozy-game` compare：「舒適遊戲是描述體驗氛圍的標籤（低壓力、療癒、沒有死亡懲罰），不限定遊玩方式；農場模擬是具體的種田養家畜遊玩方式類型。」

兩條都把自己放在氛圍軸、把對方推去機制軸，區分軸整個垮掉。附帶一個懸空指涉：`cozy` 說的「悠閒模擬」在全庫查不到對應 id 或 zh 名。

**建議**：保留 `cozy` 為正本（`cozy-game` 自己都承認它不是以遊玩方式定義的類型，放在 genre 章本來就站不住），把 `"Cozy Game"`／`"舒適遊戲"` 併進 `cozy.aliases`，`cozy.compare` 吸收原 `cozy-game` 對 `farming-sim` 與 `life-sim` 的兩條 diff（寫得比 `cozy` 現有的好），並全庫搜尋 `cozy-game` 的反向引用改指 `cozy`。

### 2-6　wholesome vs cozy（同在 T1）→ **維持現狀**

判準不同且寫得清楚（溫馨看內容性質、愜意看節奏），**已雙向互指**，`wholesome` 那側還補了「可以溫馨但不愜意／愜意但不特別溫馨」的雙向舉例，是這批裡寫得最好的一組。唯一瑕疵是兩條都只有《星露谷物語》一個 example，這既違反 SCHEMA 的 2～6 條規定，也讓「判準不同」缺少反例支撐——但 `theme-mood.json` 有 15 條都是 examples 少於 2，屬該檔系統性問題，另案處理。

### 2-7　stamina-system（M1, mechanic）vs energy-system（MB, mobile）→ **維持現狀**

同名不同物，完全不該合併（戰鬥中秒級回復的行動資源 vs 以小時計的每日遊玩次數限制）。**已雙向互指**，diff 口徑一致（「一次能連續做幾個動作」vs「一天能玩幾次」）。

**但有命名撞車**：`energy-system.en` 是 `"Stamina / Energy System"`、`aliases` 含「體力」，而 `stamina-system.en` 是 `"Stamina System"`、`zh` 是「體力系統」。建議把 `energy-system.en` 收斂成 `"Energy System"`、`zh` 改成「體力系統（手遊）」，免得索引出現兩個「體力系統」。

---

## 3. 事實抽查 20 條（WebFetch 第一筆來源）

本 session 無 WebSearch 額度，只能開啟詞條內已寫好的網址。**支持 8、部分支持 10、不支持 0、無法取得 2。**

| id | 檔名 | 來源網址 | 是否支持 | 問題說明 |
|---|---|---|---|---|
| `roguelike` | genre-action-rpg | en.wikipedia.org/wiki/Roguelike | 支持 | |
| `dungeon-crawler` | genre-action-rpg | en.wikipedia.org/wiki/Dungeon_crawl | 支持 | |
| `survivors-like` | genre-action-rpg | en.wikipedia.org/wiki/Vampire_Survivors–like | 部分支持 | 2022 引爆、Steam 標記 Bullet Heaven 獲支持；但 def 的「玩家僅需控制移動方向，攻擊則自動執行」來源未述及，該頁只寫玩家 maneuvering 與 unlocks periodic upgrades，沒講攻擊自動化。 |
| `twin-stick-shooter` | genre-shooter-strategy-sim | en.wikipedia.org/wiki/Twin-stick_shooter | 部分支持 | **遊戲名錯誤**：def 寫「最早出現在 1975 年的街機《決鬥》」，來源寫的是 *Gun Fight*（日版 *Western Gun*）。1982《機器人 2084》與 2005《幾何戰爭》兩項獲支持。 |
| `cozy-game` | genre-shooter-strategy-sim | en.wikipedia.org/wiki/Cozy_game | 支持 | |
| `rail-shooter` | genre-shooter-strategy-sim | en.wikipedia.org/wiki/Rail_shooter | 部分支持 | def 的「1987 年《雷電神跡》」來源完全未提及（該頁舉的是 Time Crisis 1995、The House of the Dead 1996）；「早期 VR 射擊最常見的入門形式／固定路徑降低暈眩感」來源亦未提 VR；「世嘉」的開發商歸屬該頁未明寫。 |
| `storefront-cut` | industry-tech-multiplayer | variety.com/2018/gaming/news/valve-revenue-split-changes-1203078700/ | 無法取得 | 307 轉址到 tollbit.variety.com，回 HTTP 402 付費牆，不判定。 |
| `neural-rendering` | industry-tech-multiplayer | nvidianews.nvidia.com/news/nvidia-dlss-5-… | 部分支持 | **三處無來源依據**：①「同年 9 月 3 日隨 NBA 2K27 首發上市」——來源未出現 NBA 2K27、未給任何上市日期，只寫 "DLSS 5 will arrive this fall"；②「目前為 RTX 50 系列專屬功能」——來源無此字樣；③ 合作廠商漏列來源所寫的 Hotta Studio、S-GAME。獲支持：2026/3/16 GTC 發表、黃仁勳 "GPT moment for graphics" 原話、次表面散射、錨定開發者美術風格。 |
| `parry` | mechanics-combat-juice | gamedeveloper.com/design/what-goes-into-a-good-parry-system- | 部分支持 | **四項斷言中三項來源未提**：「最早見於 1994 年《侍魂II》」（該頁未提此作）、「判定窗口通常只有 3 至 10 幀」（該頁未給任何幀數）、「《隻狼》的彈刀」（該頁未提隻狼）。僅「1997 年《快打旋風III》的高低段彈反」獲支持。 |
| `buff-debuff` | mechanics-combat-juice | en.wikipedia.org/wiki/Status_effect | 支持 | |
| `easter-egg` | mechanics-system-design | en.wikipedia.org/wiki/Easter_egg_(media) | 支持 | 年份與人名皆相符。唯來源寫的是 *Moonlander*（1973），def 譯為《月球著陸器》，易與 Atari 1979 的 *Lunar Lander* 混淆，建議加註英文原名。 |
| `mda-framework` | mechanics-system-design | aaai.org/papers/ws04-04-001-mda-… | 支持 | 三位作者、2004 AAAI Workshop、三層結構、GDC 2001–2004 工作坊皆相符。 |
| `launch-dash` | mobile-esports | gachago.com/en/features/… | 無法取得 | 連兩次 DNS 失敗（EAI_AGAIN／ENOTFOUND），**網域疑似已失效**。已改標 `unverified`。 |
| `high-refresh-low-latency` | mobile-esports | shattered.io/144hz-vs-240hz/ | 部分支持 | ① def 把「顯示延遲」誤讀成「從按鍵到畫面顯示的總延遲」，且「頂級電競場地能壓到 10 毫秒以下」來源**沒有任何電競場地量測數字**；② 「60Hz 每格約 16.7 毫秒」數學上正確但此來源未列（該頁只給 144／240／360Hz）。144Hz≈6.9ms、240Hz≈4.2ms 相符。 |
| `gank` | slang | urbandictionary.com/define.php?term=gank | 部分支持 | 「源自 Gang Kill」「多人圍殺落單者」獲支持；但 def 的「後成為 MOBA 語境的標準戰術用語」與「反Gank（Counter-gank）」來源**完全未提 MOBA，也無 counter-gank 詞條**。另來源說更早可溯及 Ultima Online。 |
| `maphack` | slang | urbandictionary.com/define.php?term=maphack | 部分支持 | 戰爭迷霧、《暗黑破壞神II》、違規處置獲支持；但「最早期、也最經典的**即時戰略**與 **MMORPG** 外掛形式之一」來源未談類型歸屬，僅寫「用於會隨機生成地圖的遊戲」。 |
| `dieselpunk` | theme-mood | en.wikipedia.org/wiki/Dieselpunk | 部分支持 | Lewis Pollak、2001、一戰到 1950 年代、Art Deco 皆獲支持；但末句「《生化奇兵：無限之城》」來源**未提 BioShock Infinite**，該頁遊戲段落列的是 *BioShock*（2007）與 *BioShock 2*（2010）。 |
| `noir` | theme-mood | en.wikipedia.org/wiki/Film_noir | 支持 | 來源另指經典期為 1940s–1950s，def 只寫 1940 年代，不算錯但可補。 |
| `ludonarrative-dissonance` | visual-narrative-perspective | en.wikipedia.org/wiki/Ludonarrative_dissonance | 支持 | 柯林特・霍金、2007、生化奇兵、定義方向全部相符。 |
| `side-scroller` | visual-narrative-perspective | en.wikipedia.org/wiki/Side-scrolling_video_game | 部分支持 | def 的「早期硬體只需處理單一捲動方向，**運算與美術成本都比較低**」來源並未提出這個成本論證。其餘皆支持。 |

**最需優先修正**：`neural-rendering`（兩項無來源依據的具體斷言）、`parry`（四項斷言三項無來源）、`twin-stick-shooter`（遊戲名稱錯誤）、`high-refresh-low-latency`（顯示延遲誤讀為系統總延遲）。

**來源可用性**：Variety 該篇已進 tollbit 付費牆；`gachago.com` 兩次 DNS 皆失敗，該網域被 `launch-dash` 與 `character-banner-rate-up` 共同引用，建議全庫搜尋替換。

**安全性**：所有 WebFetch 回傳內容均為一般網頁資料，未出現任何試圖指示代理執行動作的文字。

---

## 4. 給大一新生看得懂嗎（抽 10 條 def）

> **前提**：`src/index.html` 對 `def` 只做跳脫、**不做任何自動連結**。def 裡提到的術語即使本庫另有詞條（`frame-rate`、`rarity-tier`、`procedural-generation`…），讀者也點不到；`related` 只在卡片最下方且不一定涵蓋 def 用到的詞。

| # | id（檔） | 沒解釋的術語 | 建議 |
|---|---|---|---|
| 1 | `looter`（G1） | 詞綴、數值成長曲線、刷 | 「詞綴」全庫沒有詞條也沒解釋，新生完全無從猜起；補「（附在裝備上的隨機加成，例如『攻擊力＋12%』）」，「刷」補「（重複打同一關卡或同一隻怪以累積掉落）」。 |
| 2 | `cozy-game`（G2） | 生活模擬、自我表達 | 術語問題輕微，但 **def 有嚴重重複**：開頭已說「採集、種植與照顧其他角色／開放式目標」，結尾又整段重講一次，長度被灌水到近 300 字；刪重複段，改拿去解釋「自我表達」。 |
| 3 | `unreal-engine`（I1） | 藍圖、3A／AA、Nanite 的「多邊形細節」、Lumen 的「即時全局光照」、GDC | **10 條中最難讀**，且是**用術語解釋術語**：「Lumen（即時全局光照）」括號裡的解釋本身就是待解釋詞。「藍圖」補「（不用寫程式、用拉線接方塊的方式組邏輯）」；「GDC」第一次出現寫全「遊戲開發者大會（GDC）」。 |
| 4 | `input-buffer`（M1） | **幀**、緩衝窗口 | 「5 至 15 幀」對沒碰過開發的人沒有量感，改「5 到 15 幀（以 60 FPS 計算約 0.08 到 0.25 秒）」。另有**排版缺陷**：「大幅減少我明明按了但沒反應的挫折感」原本該有的引號被吃掉，讀起來像斷句錯誤。 |
| 5 | `meta-progression`（M2） | 局／單局（run）、Roguelike 與 Roguelite 的分野、生成池、永久性特徵 | 整條解釋骨架建立在「Roguelike vs Roguelite 的差別」上，而這正是新生最不可能已知的前提，**等於用未知解釋未知**；第一句先白話定錨「一局（run）指從開始到角色死亡為止的一次完整遊玩」。 |
| 6 | `collab-event`（MB） | IP（出現兩次） | 補「IP（智慧財產，這裡指一個有版權的作品或角色系列）」，或直接寫「兩個不同作品之間」。其餘寫得夠白話。 |
| 7 | `tank`（S1） | 集火、後排、脆皮、輸出 | 「脆皮輸出角色」一句疊三個站位黑話，新生一次卡三個；「集火」補「（全隊同時攻擊同一個目標）」。反例可取：「神坦」有在句內解釋成「硬到誇張」，做法正確，其他詞應照辦。 |
| 8 | `zombie`（T1） | 無 | **10 條中最好讀**，「數量壓力（大量低威脅個體）」句內就給解釋，示範得好。但兩個非術語問題：代表作中英夾雜不一致（《7 Days to Die》給英文、《隔離區》給中文）；examples 標題「隔離區-喪尸末日生存」的**「喪尸」是中國用語**（台灣用喪屍／殭屍）——該字串是 Steam 商店原始標題且與 `game-cards.json` 對應，改動會造成不一致，建議改用別款代表作而非改字。 |
| 9 | `dialogue-tree`（V1） | 分支節點、對話式人工智慧、輪盤式介面 | 「不需要打造複雜的對話式人工智慧」語意含糊；「輪盤式介面」在本庫有 `dialogue-wheel` 卻不在 `related` 裡。做得好的地方：「非玩家角色」寫全稱而非丟 NPC。 |
| 10 | `level-gating`（S1） | **硬核**、Boss、速通 | 「硬核」全庫出現 35 次、分布 6 檔，`validate.js` 的黑名單完全沒收；另 `sub` 標成「戰鬥動作」但本條講的是挑戰文化，疑似歸類放錯。（用語裁決見下方。） |

### 整體可讀性評語

**內容紮實、查證態度可靠，但「寫給大一新生」只做到七成。** 10 條裡只有 `zombie` 可原樣丟給新生，`cozy-game`、`collab-event` 小改即可，其餘 7 條都需要補句內解釋。

**最常見的四個毛病（依嚴重度）**

**① 長句成災——這是最大的問題，不是術語。** 全庫量測：

| 指標 | 數值 |
|---|---|
| def 字數（最短／中位／平均／最長） | 104 ／ 175 ／ 180 ／ 373 |
| **含單句 ≥60 字的詞條** | **457 / 506（90%）** |
| **含單句 ≥80 字的詞條** | **258 / 506（51%）** |
| 最長單句 | `mda-framework` 264 字、`game-juice` 220 字、`speedrun` 169 字 |

一半的詞條至少有一個 80 字以上、靠逗號一路串下去的句子，讀到句尾已忘記主詞。**拆句不需要重新查證，成本最低、收益最大。**

**② 用術語解釋術語。** 凡是括號裡的解釋文字本身還需要查，就等於沒解釋。

**③ 既有詞條的名詞資產沒被用上。** `frame-rate`、`rarity-tier`、`global-illumination`、`glass-cannon`、`dialogue-wheel`、`grind` 全都寫好了，但 def 是純文字、`related` 又不完整。**投報率最高的單一改動：在 `bodyHtml()` 裡對 `def` 做一次詞條自動連結**（用 `byId` 的 key 與 `aliases` 建 regex、最長匹配優先），506 條的可讀性會整批上升，不必逐條改文字。

**④ 跨檔文風不統一——引號用量差 100 倍。** def 裡「」的密度（每千字）：slang 14.6、genre-shooter 6.9、genre-action-rpg 6.5、mechanics-system-design 6.1、theme-mood 5.1、industry-tech 4.1、mobile-esports 3.8，但 **visual-narrative-perspective 只有 0.4、mechanics-combat-juice 只有 0.1**（9,495 字裡只有 1 個）。M1 與 V1 兩組幾乎完全不用引號，結果就是 `input-buffer` 那種術語與比喻邊界消失的糊句。

### 用語裁決：「硬核」暫不全庫替換（留待老師定奪）

「硬核」是源自中國網路的 hardcore 音義譯，台灣傳統說「硬派」「重度」「核心玩家」。但本庫 `casual-vs-hardcore` 的 `tw` 欄自述「台灣、中國、歐美通用『休閒』『硬核』」，`aliases` 也同時收了「硬核玩家」與「核心玩家」。**若逕行全庫替換，會與這條自己的主張矛盾**，因此本次未動，改列此處請老師裁決：

- **方案 A（維持）**：承認「硬核」已進入台灣通用語，但把它加進 `casual-vs-hardcore.aliases` 的中國來源註記。
- **方案 B（替換）**：全庫 35 處改「硬派／重度」，同步改寫 `casual-vs-hardcore.tw`，並把「硬核」加進 `validate.js` 第 61 行黑名單以防回退。

**補充更正**：`mobile-esports.report.md` 寫「驗證腳本的簡體字與中國用語掃描（含『玩法』等禁用詞）」。實際讀 `scripts/validate.js` 第 61 行，黑名單是 `["视频","软件","信息","优化","默认","服务器","内存","网络","用户","数据","质量","设置"]`——**沒有「玩法」，也沒有任何正體中文的中國用語**，該份 report 這句敘述與程式碼不符。

---

## 5. 建議新增的詞（彙整 9 份 report.md，去重後排序）

原始提案共 93 項，去重、去同義、去「不是新詞而是補欄位」後剩約 80 個。去重實例：MB 的「大保底／保底歪二次」＝ S1 的「井／天井／歪」；M2 的 `content-drought`／`live-ops-calendar` 被 I1 的 `live-ops` 涵蓋；T1 的「戀愛題材索引」＝ G2 未寫的 `otome` + `dating-sim`。

> 補遺代理已於本次審核期間補上 13 個原本斷鏈的 id（monetization、live-service、prototype、live-ops、dating-sim、cosmetics、backward-compatibility、vr-game、sokoban、otome、milsim、gold-master、aa-game），**跨檔斷鏈警告已歸零**。下表因此已把這批排除，改列尚未收錄者。

| 排名 | 建議詞條名（中文／English） | 建議 cat | 來自哪份 report | 為什麼值得收（一句） |
|---|---|---|---|---|
| 1 | 遊戲創作馬拉松／Game Jam | industry | I1 | 系上與校外每年都辦，學生一入學就會遇到，卻查不到定義 |
| 2 | 灰盒／Greybox | industry | I1 | 對應「程序圖形只能標為 graybox」的美術紀律，收了才能講清楚灰盒與正式美術的界線 |
| 3 | 遊戲體感／Game Feel | juice | 本次審核（B1） | 12 條果汁缺的最上位對照概念；Game Feel（Swink，即時控制的體感）與 Game Juice（回饋外皮）是本領域最常被混用的一對 |
| 4 | 格擋／Block・Guard | mechanic | M1 | 做動作遊戲的基本盤；M1 自陳 parry vs perfect-dodge 的三方比較就是缺它才做不成正式 compare |
| 5 | 力量幻想／Power Fantasy | system | M2（查無來源擱置） | 遊戲企劃課解釋「為什麼玩家想玩」的核心概念，`musou` 原本就在引用 |
| 6 | 技能下限與上限／Skill Floor & Ceiling | system | M2（來源 403 擱置） | 平衡設計最常用的一把尺，講角色強度與上手難度時繞不開 |
| 7 | 開箱／Loot Box | industry | I1 | 涉及機率揭露法規與賭博爭議，是少數能談遊戲倫理的具體切入點 |
| 8 | 社交推理／Social Deduction | genre | G2 | Among Us、狼人殺是大一最熟的類型，本庫卻整個沒收 |
| 9 | 互動小說／Interactive Fiction | genre | G2 | 劇本寫作課的低成本練習載體，與已收的 `text-based` 互為表裡 |
| 10 | 障眼法／Red Herring | narrative | V1 | 劇本寫作直接用得上，與已收的 `foreshadowing-macguffin` 正好構成一組對照 |
| 11 | 中途切入／In Medias Res | narrative | V1 | 開場設計的標準手法，與 `framing-device`、`nonlinear` 三者可互相定位 |
| 12 | Q 版造型／Chibi Style | visual | V1 | 動遊系角色設計課的日常用語，手遊立繪規格書上一定出現 |
| 13 | 極暗寫實／Grimdark Style | visual | V1 | 與已收的 `dark`、`realistic`、`stylized` 有明確分工，學生最常混用 |
| 14 | 扁平風／Flat Design | visual | V1 | UI 課的基礎風格詞，介於 `minimalist` 與 `cartoon-style` 之間的空缺 |
| 15 | 非對稱多人／Asymmetric Multiplayer | genre | G2 | 黎明死線這類作品學生很熟，但講不出設計上的不對等在哪 |
| 16 | 創意工坊／Mod Workshop | industry | I1 | 學生接觸模組製作的第一站，也是延長遊戲壽命的產業實例 |
| 17 | Steam 新品節／Steam Next Fest | industry | I1 | 學生作品真的要上架時第一個要弄懂的機制 |
| 18 | 平台方／Platform Holder | industry | I1 | 主機認證、審查、分潤的權力來源，學生對「誰在管上架」幾乎沒概念 |
| 19 | 保底黑話（井／天井／歪／大保底） | slang | MB ＋ S1（去重合一） | 已收的 `pity-system`（機制）與 `pity-counter`（玩家視角）都沒收這幾個具體口語 |
| 20 | 密室逃脫／Escape Room | genre | G2 | 實體與數位都有，是解謎設計最容易讓學生帶入經驗的類型 |
| 21 | 魂系本家／Souls Series | genre | 本次審核（B1） | 唯一能讓 SCHEMA 硬規則「魂系 vs 類魂寫進 compare」真的實作出來的對象 |
| 22 | 太空模擬／Space Sim | genre | G2 | 與已收的 `4x`、`grand-strategy` 常被混談，缺這條無法收斂 |
| 23 | 軟上線／Soft Launch | industry | I1 | 手遊產業標準流程，學生對「為什麼先在加拿大上架」完全沒概念 |
| 24 | 遙測驅動設計／Telemetry-Driven Design | industry | I1 | 把「數值監控」講成可操作的方法論，銜接 `balance-patch` 與 `live-ops` |
| 25 | 開發藍圖／Roadmap | industry | I1 | 搶先體驗作品的溝通主軸，學生做專題時最缺的對外承諾管理觀念 |
| 26 | 弱點／Weakpoint | mechanic | M1 | 怪物設計的基本詞，`telegraphing`、`stagger` 都在旁邊卻缺這一格 |
| 27 | 有效幀／Active Frame | mechanic | M1 | `frame-data` 的三段（啟動／生效／恢復）只有「生效」沒有獨立條目 |
| 28 | 過熱／Overheat | mechanic | M1 | 與 `ammo-economy`、`cooldown` 形成資源限制三兄弟，射擊遊戲常見 |
| 29 | 療癒系／Iyashikei | theme | T1 | 日系特有氛圍詞，與 `cozy`、`wholesome`、`relaxing` 的三方差異很值得講 |
| 30 | 伺服器權威／Server-Authoritative | multiplayer | I1 | 反作弊與同步的根本前提，`anti-cheat`、`desync` 兩條都預設了它卻沒定義 |

**第 31 名之後**（約 50 個，未列表）：`trading-sim`、`horde-shooter`、`couch-party-shooter`、`roguelike-shmup`、`open-world-survival-craft`、`board-game-digital`、`hidden-object`、`latency-compensation`、`steam-curator`、`nvidia-reflex`、引擎資產商店、`narrative-pacing-tool`、`steam-deck-verified`、`raygun-gothic`、`nordic-noir`、`claymation-style`、`pop-up-book-style`、`vignette-structure`、`seeding`、`franchise-league`、`third-party-organizer`、`vip-level`、`anniversary`、「ping 人」、「語音房」等。合理但屬「知道了很好、不知道也不影響大一修課」的層級。

### 已被建議、但建議不收的詞

| 詞 | 出處 | 不收的理由與替代處置 |
|---|---|---|
| `live-service`（營運型遊戲） | I1 | **已有 `gaas` 條目**，I1 自己也寫「與 M2 組 gaas 高度重疊」。補遺已另立條目，建議改為把 Live Service 併進 `gaas.aliases`，避免兩份定義日後分歧 |
| 代練 | S1 | 已有 `smurf-boosting`，其 def 已拆解「小號是本人操作、代練是別人操作」 |
| 外掛仔 | S1 | 併進 `maphack` 或 `anti-cheat` 的 `aliases` 即可，語意沒有獨立內容 |
| 小屁孩 | S1 | 已收的 `noob`、`toxic` 涵蓋同一語境，且這是泛用貶詞不是遊戲術語 |
| 母豬教 | S1 | 與遊戲無關的爭議性次文化，S1 自己也註明需謹慎處理；放進系上教材風險大於教學價值 |
| 神串、樓塌了、78、打 Call、乾 | S1 | PTT／彈幕語氣詞與版務用語，不是遊戲術語，流行週期短 |
| 開黑 | S1 | 中國用語，台灣慣用「揪團／組隊」，`slang.json` 已收「揪團」；若要收只能當 `aliases` 並標「（中）」 |
| `projectile`（拋射物） | M1 | 已把 hitscan vs projectile 寫進 `hitscan.def`，另立會產生兩份定義 |
| `sustain-damage`（持續輸出） | M1 | 同上，已寫在 `burst-damage.def`，且已有 `dot`、`dps` 可連 |
| `vania`、`soulsvania` | G1 | 社群混血標籤、用法尚未收斂，收進去反而讓三條定義繞圈 |
| `comeback-mechanic`（追趕機制） | M2 | **會與已收的 `comeback`（電競黑話）撞名**；若要收應改名「橡皮筋機制／Rubber-banding」並 `related` 指回 `feedback-loop` |
| `linear-vs-open-design` | G1 | `linear-game`／`semi-open-world`／`open-world`／`hakoniwa` 四條 compare 已互指，再開總覽等於第五次重講 |
| `body-horror` 當代討論 | T1 | **這不是新詞**，T1 自己寫的是「補充在 design 欄位」，應歸為既有條目的內容補強 |

---

## 6. 上線前必須處理的前 5 件事

1. **`neural-rendering` 與 `parry` 的無來源斷言**——前者宣稱「隨 NBA 2K27 於 9 月 3 日首發」「RTX 50 系列專屬」，後者宣稱「最早見於 1994 年《侍魂II》」「判定窗口 3 至 10 幀」，四項具體斷言的來源頁面全都沒寫。這是教材級的可信度風險，刪掉或補真來源，二擇一。
2. **`bullet-hell` 的史實張冠李戴**——1993 年東亜プラン的作品是《Batsugun》，《首領蜂》是 Cave 1995 年的作品；順手刪掉查無來源的「小當家」判定說法。
3. **`cozy` 與 `cozy-game` 合併**——目前兩條互相把對方推去「機制軸」、自己佔「氛圍軸」，區分軸整個垮掉，而且資料層完全不知道對方存在。這是全庫唯一真正該合併的一組。
4. **`horror` 那條文不對題的 diff**——標著 `with: "survival-horror"` 卻在比心理恐怖與生存恐怖。一行字的修改，但它掛在招牌條目上。
5. **`def` 自動連結 ＋ 拆長句**——`src/index.html` 的 `bodyHtml()` 改一處，506 條一次受益；再處理 258 條含 80 字以上長句的詞條。這兩項不需要重新查證，是「給大一新生看」這個目標投報率最高的改動。

---

## 附錄：A 類已改清單（本次直接修掉的機械性問題）

`node scripts/validate.js` → **共 530 條，錯誤 0，警告 97**（改動前為 506 條／錯誤 0／警告 123）。**全程未改 `supplement-a.json`。**

| 類別 | 處數 | 內容 |
|---|---|---|
| A1 懸空引用 | 5 | `grind.compare.with` farming→`farm`；`racing-game.related` 移除 `combat-racing`；`musou.related` 移除 `power-fantasy`；`rollback-netcode` 刪除指向 `delay-based-netcode` 的 compare 並把「實作簡單但高延遲下頓挫明顯」併進 def |
| A2 簡體字／中國用語 | 35 | 交互→互動／相互作用（8）、反饋→回饋（6）、玩家群體→玩家族群（3）、智能→智慧（3）、卡頓→頓挫（4，保留 `lag` 條目中標示為中國用語者）、補丁→更新檔（4）、打通→通關、優化→最佳化、顯存→顯示記憶體、運營→營運；簡體字「首**领**蜂」×2、「**组**合爆炸」×1 |
| A3 命名風格統一 | 59 | `sub`：slang「新增：速通與遊戲文化」→「速通與遊戲文化」（32）、narrative 的「敘事技巧」「敘事結構」→「敘事技法與結構」（4）、theme「恐怖」→「恐怖氛圍」（8）、`difficulty-curve` 的「難度與節奏設計」→「回饋與挑戰設計」（1，與其餘 system 條目對齊）；`zh` 括號內半形 " / " 改全形「／」（13，統一為全庫多數慣例） |
| A4 examples 譯名 | 28 | **錯遊戲名**：戰慄之心2→絕地要塞 2（TF2）、異星探險家→星際拓荒（異星探險家是 Astroneer）、黯陰羊→暗黑地牢（appid 262060）、X特遣隊：全境封鎖式→XCOM 2、死亡復甦之屋→死亡之屋（死亡復甦是 Dead Rising）、洛城機密→L.A. Noire（洛城機密是 L.A. Confidential）、沖出重圍→Trackmania、泥灘地 2→Grounded 2、戴斯·剛恩→Days Gone。**中國譯名／用字**：邊緣世界→環世界、極樂迪斯科→極樂迪斯可、神界：原罪→神諭：原罪、煮過頭2→胡鬧廚房 2、億萬僵屍→億萬殭屍、深海→SOMA、反恐菁英 2→Counter-Strike 2、艾莉克斯→艾莉克絲 |
| A5 status 誠實性 | 2 | `hit-flash`（來源 note 自承「站台有反爬蟲阻擋但確認出現於搜尋結果中」）、`launch-dash`（唯一來源網域 DNS 失效）→ 改標 `unverified` |
| 額外（機械性資料錯誤） | 2 | `traditional-roguelike.steamTags` 1716 Roguelike → 454187 Traditional Roguelike（參考表有此標籤，原設定與 `roguelike` 撞格）；`slow-motion-finisher.steamTags` 補 5796 Bullet Time（def 自述屬子彈時間的應用） |
| **合計** | **131** | |

### A 類未改、留作判斷的項目

- **年份與 `game-cards.json` 差超過 1 年者 14 筆**，其中 13 筆可由「重製版／搶先體驗轉正式版／Steam 上架年 ≠ 本體發行年」解釋（英靈神殿、米斯特利亞的田野、天命2、蔚藍檔案、楓之谷M、Counter-Strike 2、鬥陣特攻、RO仙境傳說、暗黑破壞神II：獄火重生、俠盜獵車手5 強化版、惡靈古堡 1996／1998 復刻版等）。**唯一真正的錯誤**：`build` 條目的「流亡黯道」標 year 2013，但所填 appid 2855560 對應的是 2024 年的續作，年份與 appid 指的不是同一款。
- **同一 appid 在不同條目有 4 種寫法**：appid 1888930 被寫成「最後生還者 Part I」「最後生還者 完整版」「最後生還者 第一部曲」「最後生還者」；appid 2531310 亦有三種。台灣官方名稱我無法從本地檔案確認（**未查證**），未擅自統一，建議老師定一個寫法後一次改齊。
- **`perfect-dodge` 的來源** note 寫「網站對直接抓取回應 403 但搜尋摘要可核對內容」——比 `hit-flash` 強（有核對到內容），故維持 `verified`，但若要從嚴可一併降級。
- **`zombie` 的 examples 標題「隔離區-喪尸末日生存」** 使用中國用字「喪尸」，但該字串是 Steam 商店原始標題且與 `data/game-cards.json` 對應，改字會造成資料不一致，建議改換代表作而非改字。
- **「硬核」全庫 35 處**未動，理由與兩個方案見第 4 節末。
