# V1 `visual-narrative-perspective.json` 完成報告

日期：2026-09-17　條數：**46 條**　`node scripts/validate.js data/entries/visual-narrative-perspective.json` 結果：**共 46 條，錯誤 0，警告 2**

## 條目清單與狀態

### 敘事結構「舊」（cat=narrative，difficulty-curve 例外為 system），第二版第七章改寫，共 11 條，全部 `verified`
heros-journey, three-act-structure, kishotenketsu, multiple-endings, branching-narrative, dialogue-tree, foreshadowing-macguffin, ludonarrative-dissonance, player-agency, difficulty-curve, environmental-storytelling

### 視角與美術風格「新」（cat=visual），共 20 條，19 條 `verified`，1 條 `unverified`
first-person, third-person, top-down, isometric, side-scroller, 2-5d, fixed-camera, pixel-art, low-poly, **ps1-style（unverified）**, hand-drawn, cel-shaded, cartoon-style, anime-style, voxel, realistic, stylized, minimalist, abstract, fmv

### 敘事技巧「新」（cat=narrative），共 15 條，全部 `verified`
story-rich, choices-matter, nonlinear, lore-rich, emergent-narrative, silent-protagonist, unreliable-narrator, fourth-wall, storylet, dialogue-wheel, cutscene, text-based, framing-device, character-arc, worldbuilding

## unverified 條目與原因

- **ps1-style**：唯一來源是 Wikipedia「Resident Evil (1996 video game)」，只證實了 PS1 硬體限制造成預渲染背景、低解析度貼圖與頂點抖動的歷史事實，但沒有直接來源證實「近年獨立恐怖／探索遊戲刻意重現這種瑕疵作為懷舊美學」這個現在普遍存在、但沒查到單一可引用來源的說法（Steam 上確實有大量以此為賣點的作品，如 `Selaco`、`Paratopic`、`Iron Lung` 等，但沒能找到一篇明確定義「PS1-style」一詞的權威文章）。定義本身合理、Steam 上也確實有大量此類作品與相關社群討論，但未達本專案「至少一筆真實來源直接支持定義」的驗證標準，故標記為 `unverified`，供之後補查（建議來源方向：Rock Paper Shotgun／PC Gamer 對「PS1-style horror」次類型的專文報導，或 Steam Curator「Haunted PS1」相關頁面）。

其餘 45 條 `status` 皆為 `verified`，每條至少 1 筆、多數 2～3 筆真實查證來源（Wikipedia 中／英版為主，Steam 官方標籤頁次之），`accessed` 一律為 `2026-09-17`。

## appid／tagid 查證情況

- 全部 `examples` 的 `appid` 與 `steamTags` 的 `tagid`／`en` 都已用 Grep 對照 `data/steam-games-ref.tsv`（2709 列）與 `data/steam-tags-ref.tsv`（430 列）逐筆核對，**全部通過 validate.js 檢查，0 個 appid／tagid 錯誤**。
- 有 `appid` 填 `null` 的情況（遊戲確實存在但不在 Steam 參考表，多為主機獨佔或未上 Steam 的作品）：大神（Okami）、超級瑪利歐系列（3D World／Galaxy）、薩爾達傳說、底特律：變人、秘境探險、最後生還者（初代舊版本）、荒野大鏢客2、聖佩特懺悔錄、八十天環遊世界、天命2、矮人要塞、魔域（Zork）、AI 地下城、一間黑暗小屋、心跳文學社、惡靈勢力：直線、往日之影：利維坦、質量效應、異塵餘生4、闇龍紀元：異端審判、墮落倫敦、深淵之海、異端模擬器、公路奇談、戰神（God of War 2018）、湯瑪士孤身一人、她的故事、The Bunker。這些均已確認遊戲本身真實存在（多數為知名作品或有 Wikipedia 條目佐證），僅 Steam 參考表未收錄或非 PC／Steam 平台作品。
- 合併過程中發現 `choices-matter` 條目的《巫師3：狂獵》範例原本漏填 appid（該遊戲其實在參考表中查得到 292030，其他條目如 branching-narrative、player-agency 都已正確使用），合併時已補上一致的 appid。

## 合併或改名說明

- `multiple-endings` 依 PLAN 指示，把「多重結局」與「真結局」兩個概念合併寫進同一條（zh 欄位寫成「多重結局／真結局」），未拆成兩條。
- `difficulty-curve` 依 PLAN 指示由 narrative 改為 `cat: "system"`，sub 改為「難度與節奏設計」，其餘沿用原詞條位置（仍在本檔案內，未搬到 M2 系統設計組的檔案）。
- 三個必寫比較群組（PLAN 要求）均已完成：`first-person` vs `third-person`；`top-down` vs `isometric`；`pixel-art` vs `low-poly` vs `ps1-style`（三條互相 compare）；`cel-shaded` vs `anime-style`；`choices-matter` 同時比較 `branching-narrative` 與 `multiple-endings`；`story-rich` vs `lore-rich`；`nonlinear` vs `open-world`（跨檔引用，`open-world` 屬於尚未建立的 `genre-action-rpg.json`，故 validate 出現 2 筆警告，屬預期中的跨檔警告，非錯誤）。

## 建議新增但未寫的詞（只列不寫）

- `claymation-style`（定格黏土動畫風，如《武裝人形》類美術）
- `chibi-style`（Q版／SD 造型，常見於手遊立繪）
- `flat-design`（扁平風 UI／美術，介於極簡與卡通之間）
- `grimdark-style`（極致陰暗寫實美術基調，常見於戰鎚題材）
- `in-medias-res`（中途切入敘事手法，與 framing-device、nonlinear 相關）
- `red-herring`（敘事障眼法，與 foreshadowing 相對）
- `vignette-structure`（短篇集敘事結構，如《艾迪芬奇的記憶》可再拉出一條獨立於 framing-device 之外討論的手法詞）
- `pop-up-book-style`（立體書風，近年獨立遊戲偶見的美術方向）

## 未完成事項

無。原分配的 46 條（11 舊敘事結構＋20 新視角美術＋15 新敘事技巧）已全數寫完，達成 PLAN 目標約 45 條的要求。
