# mobile-esports.json 交付報告

- 條數：41 條（mobile 22 條、esports 19 條）
- `node scripts/validate.js data/entries/mobile-esports.json` 結果：**錯誤 0，警告 6**（全部是跨檔 `related`／`compare.with` 指向其他組尚未交檔的 id，見下方說明，不影響本檔本身）

## 條目清單

**mobile（22）**
舊：stamina-system, daily-weekly-quest, reroll, gacha-culture, collab-event, tier-list, sweep, limited-time-event, auto-battle, guild-war
新：whale, f2p-player, pity-counter, banner, ssr-tiers, dupes, launch-dash, endgame-content, idle-rewards, monthly-card, event-shop, roguelike-mode-in-gacha, character-banner-rate-up

**esports（19）**
舊：elo-mmr, ban-pick, balance-patch, spectator-replay, bo3-bo5, smurf-boosting, caster, high-refresh-low-latency
新：lan-vs-online, patch-meta, scrim, roster-lock, bracket, throw, comeback, mechanics-vs-macro, apm, clutch

## 未完成 id
無。PLAN 列出的舊詞、新詞全部完成，達成約 40 條的目標（實際 41 條）。

## 合併與改名說明
- **draft-phase 併入 ban-pick**：PLAN 註記「draft-phase（併入 ban-pick 或獨立）」，判斷 Draft Phase 在 LoL／Dota 等賽事語境下與 Ban/Pick 階段是同一件事（禁選+選角合稱 Draft），故未獨立成詞條，改列為 `ban-pick` 的 alias「Draft Phase」，並在 def 內說明。
- **smurf-boosting 維持 PLAN 指定的單一 id**：PLAN 必寫比較清單要求「smurf vs boosting」，但 PLAN 的 id 分配表本身把兩者合成一個 id（`smurf-boosting`，對應第二版指南同一節標題「小號／代練」）。由於兩者共用同一個 id，無法用 `compare` 欄位互相指向對方，因此改在 `def` 欄位裡用一段文字明確拆解兩者定義與差異（「差別在於：小號是本人操作但帳號等級失真，代練是帳號等級由別人操作出來的假象」），未使用 `compare` 陣列表達。若日後審核認為必須拆成兩個獨立 id 以符合「所有必寫比較都要進 compare 陣列」的硬規則，需要跟其他組協調 id 命名後再拆分。
- **elo-mmr 的三方比較**：PLAN 要求「elo vs mmr vs 段位」，但三者在第二版指南裡同屬一個章節小節、且 PLAN 分配的 id 只有一個 `elo-mmr`。三者差異已寫入 `def`；另外用 `compare` 欄位把 `elo-mmr` 對比到 `ranked`（電競 I1 組新詞清單裡的 id，指官方分級對戰模式本身，段位是其外顯呈現），部分滿足「段位」面向的差異化說明。`ranked` 目前尚未由 I1 組交檔，故 validate 顯示警告，屬預期中的跨檔警告。

## Unverified id 與原因
無。41 條全部 `status: verified`，每條至少 1 筆可查證來源（WebSearch／WebFetch 確認存在），`accessed` 皆為 2026-09-17。

補充說明幾條來源強度較弱（仍為真實存在的來源，非編造）：
- `launch-dash`、`character-banner-rate-up`：主要來源是玩家整理的黑話詞彙站（gachago.com），非官方或學術來源，但內容與其他來源（Wikipedia Gacha_game）交叉核對一致，判斷可標記 verified。
- `roguelike-mode-in-gacha`：來源為遊戲媒體報導（bitspindle.com、kotaku.com），非 Wikipedia／官方公告，但報導內容具體且可查證。

## 跨檔警告說明（共 6 筆，非本檔錯誤）
以下 id 目前只存在於其他組尚未產出的檔案，等對應組別交檔後即會自動消除警告：
- `elo-mmr` compare.with 「ranked」→ 屬 I1 組（`industry-tech-multiplayer.json`）新詞清單
- `pity-counter` compare.with 「rng」→ 屬 M2 組（`mechanics-system-design.json`）舊詞清單
- `ssr-tiers` compare.with 「rarity-tier」→ 屬 M2 組舊詞清單
- `roguelike-mode-in-gacha` related／compare.with 「roguelike」→ 屬 G1 組（`genre-action-rpg.json`）

## 建議新增但未寫的詞（供其他組或未來擴充參考）
- **gacha-culture 相關**：「保底歪二次」「大保底」可考慮獨立成詞條（目前併寫在 `character-banner-rate-up` 與 `pity-counter` 的 def 裡）
- **esports 相關**：「seeding（種子排位）」「third-party organizer（第三方賽事主辦）」「franchise league（特許經營聯賽，如 LCS／LPL 的簽約隊伍制）」，屬於電競產業面、與 I1 組的 industry 類別可能有重疊，建議跨組討論歸屬
- **mobile 相關**：「vip-level（VIP 等級／課金等級制）」「anniversary（週年慶）」可與 `limited-time-event` 區分獨立成詞，目前僅在 `limited-time-event` def 帶過

## 台灣與中國用語標註核對
逐條檢查課金相關用語，已標註：「課金」（台）vs「氪金（中）」；「主播／賽評」（台）vs「解說（中）」；「土豪（中）」用於 whale 別名。驗證腳本的簡體字與中國用語掃描（含「玩法」等禁用詞）已於交付前修正兩處違規（`guild-war`、`roguelike-mode-in-gacha`），目前掃描結果為 0 違規。
