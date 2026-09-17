# genre-action-rpg.json 完成報告

負責範圍：G1，第二版指南第 21～50 行（基礎速查）與 191～440 行（第二章：遊戲類型與分類）。

## 條數

共 43 條，全部完成（PLAN 分配的「舊」18 條 + 「新」25 條），未完成 id：無。

舊條目（18）：rpg, arpg, jrpg, mmorpg, soulslike, metroidvania, survivors-like, musou, roguelike, roguelite, immersive-sim, stealth, walking-sim, open-world, sandbox, linear-game, semi-open-world, hakoniwa
（fps-tps 依 PLAN 指示交給 G2，未在本檔收錄）

新條目（25）：crpg, wrpg, srpg, tactical-rpg, action-game, hack-and-slash, character-action, action-roguelike, traditional-roguelike, roguelike-deckbuilder, dungeon-crawler, looter, looter-shooter, monster-tamer, platformer, precision-platformer, puzzle-platformer, 2d-platformer, 3d-platformer, beat-em-up, fighting-game, party-game, mmo, boss-rush, hero-collector

## validate.js 結果

`node scripts/validate.js data/entries/genre-action-rpg.json` → **共 43 條，錯誤 0，警告 14**。

14 筆警告全部是「跨檔 related／compare 目前找不到」，屬於預期內（那些 id 屬於其他組的檔，該檔完成後即可對上）：

- `tactical-rpg` related `turn-based-tactics` → 屬 G2
- `mmorpg` related `guild-war` → 屬 MB
- `survivors-like` compare.with `bullet-hell` → 屬 G2
- `musou` related `power-fantasy` → 屬 M2
- `roguelike` / `traditional-roguelike` related `permadeath` → 屬 M2
- `roguelite` related `meta-progression` → 屬 M2
- `roguelike-deckbuilder` compare.with `deckbuilder` → 屬 G2
- `looter` related `loot-table` → 屬 M2
- `looter-shooter` related `hero-shooter` → 屬 G2
- `hero-collector` related／compare.with `gacha` → 屬 M2（PLAN 指定 gacha id 由 M2 持有，MB 用 gacha-culture）
- `puzzle-platformer` related `puzzle-game` → 屬 G2
- `walking-sim` related `environmental-storytelling` → 屬 V1

無需修改，等其他組交檔後這些連結會自動對上。

## unverified 條目

無。43 條全數 `status: verified`，每條至少 1 筆已用 WebFetch 實際開啟確認存在的來源（Wikipedia 條目或 Steam 標籤頁），`accessed` 一律 `2026-09-17`。

其中 `action-game`（動作遊戲 ACT 總稱）雖標記 verified，但補充說明：其 Wikipedia 來源（en.wikipedia.org/wiki/Action_game）內容較單薄，主要作為「條目存在」的佐證，定義文字以指南原文與業界通用說法為主。

## appid 查證備註

多數代表作已對到 `data/steam-games-ref.tsv` 的 appid；下列因為該表未收錄而填 `null`（但都是真實存在的知名作品，未編造）：

- `srpg`：火焰之紋章 Engage、三角戰略（任天堂平台為主，未上 Steam 或不在參考表）
- `traditional-roguelike` / `roguelike`：NetHack（1987 年自由軟體，非 Steam 商品）
- `monster-tamer`：Cassette Beasts、Coromon（表中未收錄，但確實是 Steam 上架作品）
- `mmorpg` / `mmo`：魔獸世界、Final Fantasy XIV、EVE Online（表中未收錄）
- `walking-sim`：看火人（Firewatch）、回家（Gone Home）（表中未收錄）
- `beat-em-up`：怒之鐵拳4 Streets of Rage 4（表中未收錄）
- `semi-open-world`：戰神（2018）God of War（表中未收錄）
- `hakoniwa`：超級瑪利歐 奧德賽、薩爾達傳說 王國之淚（任天堂平台，非 Steam 商品）

## steamTags 空白說明

`hero-collector`、`semi-open-world`、`hakoniwa`、`wrpg` 四條的 `steamTags` 留空，因為 `data/steam-tags-ref.tsv` 中查無精準對應的標籤（例如沒有獨立的 Gacha、Hub-based、Hakoniwa 標籤）；`wrpg` 只留通用 RPG 標籤在別條用過，故此條不重複填入避免誤導。

## 合併或改名說明

- 依 PLAN 指示，`srpg`（戰略 RPG）與 `tactical-rpg`（戰術 RPG）拆成兩條獨立詞條，並在雙方 `compare` 互相說明「日本業界慣用 SRPG、歐美常用 Tactical RPG」的地域命名差異，這是 PLAN 要求的必寫比較。
- `hack-and-slash` 與 `character-action` 依 PLAN 拆成兩條，`compare` 互相說明「走量砍殺」vs「單一角色連段深度」的差異。
- `action-roguelike` 與 `traditional-roguelike` 依 PLAN 拆成兩條，`compare` 互相說明。
- `soulslike` 的 `tw` 欄依 PLAN 要求，說明台灣口語「魂系」（FromSoftware 本家）與「類魂／Soulslike」（其他工作室仿作）的差異，未混用成同一件事。
- `metroidvania` 的 `compare` 依 PLAN 要求，與 `platformer`（一般平台）做了差異說明。
- 未做任何條目合併；`fps-tps` 依 PLAN 指示完全未收錄於本檔（改由 G2 負責）。

## 建議新增但未寫的詞（只列，不寫）

- `soulsvania`（Soulslike 與 Metroidvania 混血，如《暗影火炬城》《死亡細胞》系）可考慮獨立成詞，目前僅在 soulslike／metroidvania 的 compare 中帶過
- `vania`（惡魔城單獨脈絡，不含銀河戰士的密室鑰匙設計）
- `roguelike-shmup`（彈幕射擊與 Roguelike 結合的細分，如《Enter the Gungeon》後續此類混血作品增加）
- `open-world-survival-craft`（生存建造與開放世界的混合標籤，Steam 上是獨立熱門標籤，目前散落在 sandbox／survival-craft 兩條間）
- `linear-vs-open-design`（若要更系統性比較「箱庭、半開放、開放、線性」四種世界結構的光譜，可考慮另開一條總覽詞條把四者放在同一張圖裡比較，目前四條各自的 compare 已互相連結但沒有總覽條目）
