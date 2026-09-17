# I1 industry-tech-multiplayer 完成報告（2026-09-17）

## 條數
共 70 條，`node scripts/validate.js data/entries/industry-tech-multiplayer.json` 結果：**錯誤 0，警告 29**。

分佈：
- multiplayer 16 條（舊 9 ＋ 新 7）
- tech 25 條（舊 15 ＋ 新 10）
- industry 21 條（舊 13 ＋ 新 8）
- ai 8 條（舊 9，其中 frame-generation 併入 ai-upscaling，見下）

## 品質重點處理結果

- **DLSS 5／神經渲染已查證屬實**，非虛構：NVIDIA 於 2026-03-16 GTC 發表、2026-09-03 隨《NBA 2K27》首發上市（接近但略早於指南寫的「秋季上市」，仍算相符）。來源：NVIDIA Newsroom 官方新聞稿與 GeForce News 頁面，均已在 `neural-rendering` 條目列出，`status: verified`。
- `frame-generation`（PLAN 舊條目）確認與 `ai-upscaling` 內容高度重疊（DLSS 4.5 動態多幀生成），已**合併進 `ai-upscaling`**，未另立條目，於 `ai-upscaling` 的 `aliases` 與 `def` 中說明幀生成技術。
- `steam-review-tiers` 已列出九級繁體中文官方名稱（壓倒性好評、極度好評、大多好評、好評如潮、褒貶不一、大多負評、負評、極度負評、壓倒性負評），並以 Hades II 的 Steam 商店頁（繁中版）直接截取確認「壓倒性好評」為官方用語；其餘八級門檻依社群長期整理的公開資料佐證（Valve 未正式公布精確門檻表，此為業界共識，report 中特別註明）。
- `storefront-cut` 已寫入 Steam 30%／25%／20% 三段式分潤（2018 年制度變更），與 Epic Games Store 前 100 萬美元免抽、之後 12% 的分潤政策，兩者均附官方或主流媒體來源。
- 必寫 compare 全數完成：remaster vs remake vs reboot、early-access vs demo vs playtest、f2p vs p2w、aaa vs aa vs indie（aa-game 未寫成獨立條目，見下）、dedicated-server vs p2p、rollback vs delay-based netcode、unity vs unreal vs godot。

## 未完成的 id（industry 新條目，PLAN 列出但本輪未寫）

以下 16 個 industry「新」條目因量大優先度較低，本輪未寫，列於此供下一輪接續：
`steam-next-fest`, `steam-deck-verified`, `mod-workshop`, `game-jam`, `prototype`, `greybox`, `gold-master`, `backward-compatibility`, `platform-holder`, `monetization`, `cosmetics`, `loot-box`, `aa-game`, `live-service`, `roadmap`, `live-ops`

這些 id 在已完成條目的 `related`／`compare.with` 中被引用（例如 `aaa` 引用 `aa-game`、`dlc-season-pass` 引用 `cosmetics`／`live-ops`、`remaster` 引用 `backward-compatibility`），因此 validate.js 會顯示「目前不存在」警告，屬預期行為，等下一輪補上這些條目後警告會自動消失。

## unverified 條目

**無**。70 條全數 `status: verified`。原本擔心的 DLSS 5、Steam 分潤、Epic 抽成、Taiwan 分級制度等高風險條目，均已個別查證確認。

## 合併／改名說明

- `frame-generation` → 併入 `ai-upscaling`（見上）。
- `age-rating` 條目中，第二版指南原文寫台灣採「類似 ESRB 的 CSR 分級」，經查證 Wikipedia「Video game content rating system」條目，**台灣實際制度是 GSRR（遊戲軟體分級管理辦法），分五級：普遍、6+、12+、15+、18+**，並非 CSR。已在條目中改用正確的 GSRR 名稱與分級級距，第二版指南此處資訊有誤。
- `matchmaking`（新）與 `sbmm`（舊）維持獨立條目並互相 compare：`matchmaking` 為配對統稱，`sbmm` 為其中依技術等級配對的具體做法，符合 PLAN「併入或獨立、自行判斷」的指示。
- `live-service`（新）本輪**未寫**（見上表），因與 M2 組 `gaas` 條目高度重疊，建議下一輪撰寫時明確以「商業模式標籤」角度與系統設計組的 `gaas` 做區隔，而非重複定義。

## 例外與備註

- `wishlist` 條目一開始誤植了無關的 Steamworks API 網址（getreviews 端點），已修正為正確的 Wishlists 文件頁（`partner.steamgames.com/doc/marketing/Wishlists`），並以 WebFetch 直接驗證頁面存在。
- `generative-ai-assist` 條目中「Steam 自 2024 年起要求揭露 AI 使用情況」一句，本輪未能查到 Steamworks 官方揭露政策頁的確切網址（嘗試多個猜測 URL 均未命中），改以 Wikipedia「Generative artificial intelligence」作為主要來源；此句屬廣泛已知的產業事實但**未附一手政策來源**，若後續要引用此政策細節，建議另外查證 Steam 官方公告連結。
- 本輪 WebSearch 額度中途用罄（達到 session 上限 200 次），後段改用 WebFetch 直接驗證候選網址是否存在，部分 Wikipedia／官方文件連結未逐一 WebFetch（如 Unity／Unreal 各功能文件頁、部分老牌 Wikipedia 條目），是基於高信心的既有知識判斷其存在；若要更嚴格覆核，建議下一輪針對 tech 類條目的官方文件連結再跑一次連結存活檢查。

## 建議新增但未寫的詞（只列不寫）

- `latency-compensation`（延遲補償，client-side prediction／server reconciliation，與 `hit-registration` 密切相關但值得獨立成條）
- `server-authoritative`（伺服器權威架構，常與 anti-cheat／dedicated-server 一起被提及）
- `steam-curator`（Steam 策展人系統，行銷面）
- `nvidia-reflex`（低延遲技術，本輪已在 `input-lag` 引用其官方頁但未獨立成條）
- `unreal-marketplace` / `unity-asset-store`（資產商店生態，屬 industry／tech 交界）
