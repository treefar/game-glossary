# S1 slang.json 交付報告（2026-09-17）

## 總覽

- 條數：**91 條**（PLAN 目標約 60 條；因「每一節的詞都要收」為硬性要求，第十二章九節逐條展開後加上必寫的 41 個「新」id 與台灣 PTT／巴哈用語，實際規模超出原估，選擇完整覆蓋而非武斷砍量）
- `node scripts/validate.js data/entries/slang.json` 最終結果：**共 91 條，錯誤 0，警告 135**（警告全部是「examples 少於 2」與跨檔 related／compare 指向的 id 目前不存在，兩者皆非阻斷性問題，詳見下方說明）
- status：verified 44 條／unverified 47 條（約 52%），比例偏高，原因與因應方式見下方「查證情況」
- sub 分類：MOBA 戰場(11)、通用聊天(8)、角色定位(6)、戰鬥動作(9)、手遊抽卡(3)、版本平衡(4)、時間狀態(4)、操作設備(4)、廠商社群(10)、新增：速通與遊戲文化(32，含5條台灣PTT／巴哈補充詞)

## 查證情況（重要）

本次任務進行到約 15 次 WebFetch 後，**session 的 WebSearch 額度已用罄**（"this session has used its web search budget (200 of 200 WebSearch calls)"，非本任務單獨用完，應是同一 session 內其他並行工作已消耗），之後全程只能用 WebFetch 對「猜測的直接網址」查證，無法再用關鍵字搜尋找出處。因此：

- **44 條 verified**：多為英文圈國際通用黑話（gank、smurf、tilt、jank、glitch、softlock、hardlock、sequence break、git gud、skill issue、ragequit、one more turn、big brain、bot、tryhard、sweaty、toxic、OP、nerf/buff、speedrun、exploit、cheese、glass cannon、kill steal、farming、creep score、feeding、backdooring、snowballing、jungler、platinum、maphack、high ping、WASD、GG…），透過 Urban Dictionary、Wiktionary、Wikipedia（Glossary of video game terms、Speedrun、Video game exploit、Sequence breaking、WASD keys）等頁面直接 WebFetch 確認存在並引用其定義。
- **47 條 unverified**：幾乎全部是「台灣／中國特有的華語遊戲黑話」，例如抱大腿、剛正面、母湯、揪團、開荒、退坑／回坑／補坑、廠商黑幕、信仰充值、雷包、萌新、大佬、電子陽痿、佛系、雲玩家、手殘等。這類詞多半只存在於 PTT、巴哈姆特、Dcard 的即時討論串裡，沒有 Wikipedia／Wiktionary／Urban Dictionary 這類穩定條目可查，且本次已無 WebSearch 額度可用來搜尋具體討論串連結。為了不編造網址，這 47 條的 `sources` 一律改指向**真實存在、確實是該類黑話主要流通處的社群首頁**（PTT LoL 板、PTT 八卦板、PTT Steam 板、巴哈姆特哈啦板首頁等），並在 `note` 欄位誠實註明「未能找到該詞條的具體討論串，僅以看板首頁佐證社群確實存在」，status 一律標 `unverified`。這符合任務指示「查不到就 status 填 unverified，不可編造網址」的要求。
- 建議：若之後 WebSearch 額度恢復，可優先為這 47 條逐一搜尋 PTT／巴哈姆特／Dcard 的具體討論串或新聞報導，把 status 升級為 verified。

## 必寫 compare 完成情況

PLAN 要求的五組必寫 compare 全部完成：
- cheese vs exploit vs glitch（三條互相 compare.with）
- softlock vs hardlock
- noob vs casual-vs-hardcore（另外也補了 noob vs newbie-cute 這組延伸比較）
- toxic vs tryhard
- cloud-gamer vs 觀眾（compare.with 指向 `spectator-replay`，屬 I1 組的 id，尚未建檔，會顯示為 related／compare 警告，屬正常的跨檔待補情況）

## 合併與跨組邊界決策

1. **farm 併 CS**：Farm（種田）與 CS（補兵數）是同一行為的動作與量化指標，合併成一條 `farm`，aliases 收 CS／Creep Score／補兵／農兵。
2. **feed 併 Int（故意送）**：Intentional Feeding 是 Feeding 的故意版本，合併進 `feed` 的 aliases。
3. **git-gud 併 skill-issue**：兩者是近乎同義、常互換使用的迷因用語，合併成一條 `git-gud`。
4. **退坑／回坑／補坑** 合併成一條 `game-lifecycle-slang`：三者描述玩家與遊戲關係的不同階段而非嚴格同義詞，但作為一組「坑」文化詞彙集中講解更利於教學，於 def 中分別說明三者差異。
5. **課金／氪金／儲值** 合併成 `gaming-payment-slang`：三詞意義相同、僅文化來源不同（日源／中國網路諧音／官方中性用語），符合「同義詞可併成一條」原則。
6. **GLHF／BRB／WTF** 合併成 `chat-abbrev-misc`：三個都是歷史悠久但內容單薄的基礎聊天縮寫，單獨立條價值有限，採用「聊天室常用縮寫」集中呈現。
7. **666／777** 合併成 `number-slang`：同屬數字諧音讚嘆詞，僅文化來源（中國／台灣）不同。
8. 刻意**不重複**其他組已擁有的 id：改版／Patch（歸 I1 `patch-hotfix`）、保底機制／首抽 Reroll／Tier List（歸 M2 `pity-system`／MB `reroll`／MB `tier-list`）、Whale／鯨魚（歸 MB `whale`）、Elo／MMR（歸 MB `elo-mmr`）——這些詞在第十二章原文中出現，但因與其他組的分配範圍重疊，本檔僅在 `related`／`compare` 中以 id 引用，不另外建條，避免全庫 id 衝突或內容重複。

## 未寫 id（無，第十二章九節詞彙已全數收錄）

第十二章 1423～1598 行九節（MOBA、通用聊天、角色定位、戰鬥動作、手遊抽卡、版本平衡、時間狀態、操作設備、廠商社群）中出現的詞彙，逐一核對後**全部**已轉為詞條或以 aliases／合併方式收錄，沒有遺漏未寫的「舊」詞。PLAN 明列的 41 個「新」id 也**全數完成**，沒有遺漏。

## 建議新增但本次未寫的詞（只列不寫）

- 保底相關細分詞：井／天井／歪（可併入 MB 組 `pity-counter` 的 aliases，或另立 S1 條目，本次未寫）
- 遊戲圈其他 PTT／巴哈慣用語：樓塌了（討論串失控）、神串、爆氣、小屁孩、母豬教（特定社群次文化用語，涉及爭議需謹慎處理）、代練、外掛仔（可與 maphack 合併或另立）
- Discord 語境黑話：ping 人（@提及）、語音房、開黑（中國用語，需標「（中）」）
- 直播彈幕專屬：78（笑聲諧音）、打Call、乾（各種語氣詞）

## examples 少於 2 的說明（警告，非錯誤）

135 筆警告中，70 筆是「examples 少於 2」：黑話類詞條（尤其通用聊天、時間狀態、廠商社群、新增文化四個 sub）多半是「跨遊戲通用的玩家行為描述」，本質上不綁定特定代表作，勉強湊出不相關的第二個例子反而失真，因此多數只列 1 個最貼切的例子。已按 SCHEMA 要求每個 example 的 appid 都經過 `data/steam-games-ref.tsv` 查證（查到則填實際 appid，查不到填 null，如 League of Legends、Genshin Impact 等均不在該表內，appid 一律 null）。

其餘警告皆為 `related`／`compare.with` 指向其他組尚未建檔的 id（如 `grind`、`tier-list`、`patch-meta`、`gaas`、`anti-cheat`、`achievement` 等），屬正常的跨檔待補情況，待其他組完成對應檔案後會自動消解。
