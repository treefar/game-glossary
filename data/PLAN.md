# 詞條分配表（2026-09-17，主編：Claude 主對話）

目標約 330 條。每位調研代理負責一個檔，id 照這裡寫，不可改名、不可撈別人的詞。
「舊」＝第二版指南已有條目，要改寫成新格式並補來源；「新」＝本輪新增。
第二版來源：`source/現世代遊戲專有名詞指南_第二版.md`（行號範圍見各組）。

優先順序：先做「舊」（快，補一筆來源即可），再依序做「新」。做不完就停，在 report 列出沒做的 id。

---

## G1 `genre-action-rpg.json`（cat=genre）　第二版第 191～440 行（第二章）與 21～50 行（基礎速查縮寫）

舊：rpg, arpg, jrpg（基礎速查有）, fps-tps → 交給 G2, mmorpg, soulslike, metroidvania, survivors-like, musou, roguelike, roguelite, immersive-sim, stealth, walking-sim, open-world, sandbox, linear-game, semi-open-world, hakoniwa（第一章 113～190 行）
新：crpg, wrpg, srpg（戰略 RPG／戰棋 SRPG）, tactical-rpg, action-game（ACT）, hack-and-slash, character-action（角色動作／DMC 系）, action-roguelike, traditional-roguelike, roguelike-deckbuilder, dungeon-crawler, looter（刷寶）, looter-shooter, monster-tamer（Creature Collector）, platformer, precision-platformer, puzzle-platformer, 2d-platformer, 3d-platformer, beat-em-up（清版動作）, fighting-game（格鬥）, party-game, mmo, boss-rush, hero-collector（角色收集）
必寫 compare：soulslike vs 「魂系（FromSoftware 本家）」的差別寫進 soulslike 的 tw 欄；roguelike vs roguelite；action-roguelike vs traditional-roguelike；metroidvania vs 一般平台；hack-and-slash vs character-action；srpg vs tactical-rpg（日／歐美用法）。

## G2 `genre-shooter-strategy-sim.json`（cat=genre）　第二版第 191～440 行

舊：fps, tps, hero-shooter, tactical-shooter, rhythm-game, visual-novel, horror-game → 交給 T1（改做 survival-horror 在 T1）, tower-defense, 4x, grand-strategy, tycoon, moba, extraction-shooter, battle-royale, boomer-shooter, deckbuilder, auto-battler, factory-builder, survival-craft, farm-life-sim（拆成 farming-sim 與 life-sim 兩條）
新：shooter（射擊總稱）, arena-shooter, milsim, shmup（捲軸射擊 STG）, bullet-hell（彈幕）, twin-stick-shooter, rail-shooter, rts, turn-based-strategy, turn-based-tactics, wargame, city-builder, colony-sim, base-building, god-game, survival, cozy-game, otome, dating-sim, point-and-click, interactive-fiction, puzzle-game, sokoban, match-3, hidden-object, escape-room, racing-sim-vs-arcade（id：racing-game，compare 內講 sim／arcade／kart）, sports-game, card-game（CCG／TCG）, board-game-digital, social-deduction, asymmetric-multiplayer, idle-incremental, clicker, physics-sandbox, vr-game
必寫 compare：shmup vs bullet-hell（彈幕是 shmup 的子類，日本「弾幕」＝東方系）；bullet-hell vs survivors-like（Bullet Heaven 是反過來的）；rts vs turn-based-strategy；4x vs grand-strategy；city-builder vs colony-sim；cozy-game vs farming-sim；roguelike-deckbuilder（G1）與 deckbuilder；battle-royale vs extraction-shooter；hero-shooter vs arena-shooter；idle vs clicker。

## T1 `theme-mood.json`（cat=theme）　第二版 267～274 行（恐怖遊戲）

舊：horror（改寫自「恐怖遊戲」）
新：psychological-horror, survival-horror, cosmic-horror（Lovecraftian）, jump-scare, folk-horror, body-horror, taiwan-horror（台式恐怖：返校、還願、女鬼橋）, gothic, dark-fantasy, high-fantasy, low-fantasy, sci-fi, space-opera, cyberpunk, steampunk, dieselpunk, solarpunk, post-apocalyptic, zombie, medieval, mythology, historical, urban-legend, noir, western, military-theme, supernatural, occult, dystopian, retro-theme, atmospheric, cozy（氛圍標籤，與 G2 cozy-game 區分：那條講類型，這條講 Steam 氛圍標籤 Cozy 與 Wholesome）, wholesome, relaxing, dark, surreal, dreamlike, meme-game, satire, comedy, cute, emotional, philosophical, mystery, detective, crime, school-life, slice-of-life, isekai
必寫 compare：psychological-horror vs horror vs survival-horror（三方比較，這是本百科招牌條目：心理恐怖靠不安、不確定與角色心智崩壞，不靠怪物與血量；生存恐怖靠資源匱乏與逃跑；jump scare 只是手法）；cosmic-horror vs supernatural；cyberpunk vs steampunk vs dieselpunk vs solarpunk；dark-fantasy vs high-fantasy；cozy vs wholesome vs relaxing；urban-legend vs folk-horror vs taiwan-horror；mystery vs detective。

## V1 `visual-narrative-perspective.json`（cat=visual 或 narrative）　第二版 1007～1086 行（第七章）與 753～760（環境敘事）

舊（narrative）：heros-journey, three-act-structure, kishotenketsu, multiple-endings（含真結局）, branching-narrative, dialogue-tree, foreshadowing-macguffin, ludonarrative-dissonance, player-agency, difficulty-curve（→ 改 cat=system，仍歸你）, environmental-storytelling
新（visual，Steam 視角與美術標籤）：first-person, third-person, top-down, isometric, side-scroller, 2-5d, fixed-camera, pixel-art, low-poly, ps1-style, hand-drawn, cel-shaded, cartoon-style, anime-style, voxel, realistic, stylized, minimalist, abstract, fmv
新（narrative）：story-rich, choices-matter, nonlinear, lore-rich, emergent-narrative, silent-protagonist, unreliable-narrator, fourth-wall（後設／打破第四面牆）, storylet, dialogue-wheel, cutscene（含 in-engine 與 pre-rendered）, text-based, framing-device, character-arc, worldbuilding
必寫 compare：first-person vs third-person（玩法後果）；top-down vs isometric；pixel-art vs low-poly vs ps1-style（三種「復古」）；cel-shaded vs anime-style；choices-matter vs branching-narrative vs multiple-endings；story-rich vs lore-rich；nonlinear vs open-world（G1）。

## M1 `mechanics-combat-juice.json`（cat=mechanic 或 juice）　第二版 441～628 行（第三章）

舊（mechanic）：frame-data, hitstun, i-frame, animation-cancel, parry, super-armor, poise, posture-bar, charged-attack, critical-hit, hitstop（cat=juice）, hitbox-hurtbox, input-buffer, tech-ukemi, combo, throw, cooldown, cast-time, aoe, aggro, buff-debuff, crowd-control, dot
新（juice，「果汁」＝Game Juice，打擊感與動態反饋）：game-juice（總條目，要講清楚定義與 Vlambeer「Juice it or lose it」出處）, screen-shake, squash-and-stretch, hit-flash, knockback, particle-feedback, camera-kick, controller-rumble, slow-motion-finisher, damage-numbers, sound-feedback（音效打擊感）
新（mechanic）：telegraphing（前搖／後搖，windup／recovery）, stagger, perfect-dodge（witch time／魔女時間）, coyote-time, jump-buffer, wall-jump, dash, air-control, momentum, lock-on, stamina-system, meter-gauge, ammo-economy, reload, recoil-spread, hitscan-vs-projectile（id：hitscan）, ttk（Time to Kill）, headshot, aim-assist, bullet-sponge, dps, burst-vs-sustain（id：burst-damage）
必寫 compare：hitstop vs slow-motion；parry vs perfect-dodge vs block；i-frame vs super-armor；input-buffer vs jump-buffer vs coyote-time；hitscan vs projectile；stagger vs hitstun vs posture-bar；poise vs super-armor。

## M2 `mechanics-system-design.json`（cat=system）　第二版 113～190 行（第一章）與 629～792 行（第四章）

舊：level-design, spatial-narrative, procedural-generation, emergent-gameplay, gaas, battle-pass, gacha（與手遊組共用：你寫「作為系統設計」，MB 組寫「文化與黑話」，id 你用 gacha、他用 gacha-culture）, meta, build, skill-tree, rarity-tier, crafting, inventory, save-point-checkpoint, fast-travel, new-game-plus, qte, achievement, easter-egg, game-loop, flow-state, dda, rng
新：permadeath, run（一局／一輪）, meta-progression（局外成長）, synergy, min-max, power-fantasy, skill-floor-ceiling, feedback-loop（正／負回饋）, risk-reward, push-your-luck, hidden-information, fog-of-war, tension-release（張弛節奏）, onboarding, tutorialization, affordance, signposting（含 breadcrumbing）, critical-path, ability-gating（含 backtracking）, difficulty-modes, accessibility, save-scumming, seed, loot-table（含 drop rate）, pity-system（保底）, grind, economy-sink-faucet, mda-framework, progression-system, unlockables, prestige-reset, encounter-design, boss-design, level-scaling, pacing, hub-world, quest-design（主線／支線／跑腿）, ubisoft-formula（開放世界清單式設計）, diegetic-ui, hud, minimap, resource-management, roster
必寫 compare：permadeath vs checkpoint；meta-progression vs skill-tree；grind vs farming（黑話組）；dda vs difficulty-modes；affordance vs signposting；game-loop vs core loop（同條講清楚）；flow vs difficulty-curve（V1）。

## I1 `industry-tech-multiplayer.json`（cat=multiplayer／tech／industry／ai）　第二版 793～1006 行（第五、六章）、1087～1194 行（第八章）、1347～1422 行（第十一章）

舊（multiplayer）：pvp-pve, coop-versus, sbmm, latency-ping, rollback-netcode, anti-cheat, lobby, cross-play, asynchronous-multiplayer
舊（tech）：game-engine, rasterization, shader, ray-tracing, path-tracing, global-illumination, ai-upscaling（DLSS／FSR／XeSS）, neural-rendering（DLSS 5，**年份與版本要查證**，查不到就 unverified）, frame-rate, hdr, lod, ragdoll, motion-capture, xr, haptics
舊（industry）：gdd, alpha-beta, aaa, indie, early-access, dlc-season-pass, day-one-patch, publisher-developer, vertical-slice, localization, age-rating, crowdfunding, crunch
舊（ai）：generative-ai-assist, ai-npc, pcgml, frame-generation（若與 ai-upscaling 重複就合併進去並在 report 說明）, behavior-tree-fsm, voice-ai, cloud-gaming, blockchain-game, metaverse
新（industry）：patch-hotfix, nerf-buff, balance-patch → 交給 E1（電競組），這裡不寫, wishlist, steam-next-fest, steam-deck-verified, steam-review-tiers（壓倒性好評等九級）, demo, playtest, roadmap, live-ops, remaster-remake-reboot（id：remaster，compare 內講 remaster／remake／reboot／port）, backward-compatibility, mod-workshop, game-jam, prototype, greybox, gold-master, platform-holder, storefront-cut（30% 分成）, f2p, p2w, monetization, cosmetics, loot-box, whale（→ 交給 MB 組，這裡不寫）, aa-game（雙 A）, live-service（併入 gaas 或獨立，自行判斷並在 report 說明）
新（multiplayer）：dedicated-server, p2p, tick-rate, hit-registration, desync, ranked, matchmaking（併入 sbmm 或獨立）
新（tech）：unity-engine, unreal-engine, godot-engine, draw-call, frame-time, vsync-tearing, input-lag, occlusion-culling, texture-streaming, physics-engine
必寫 compare：remaster vs remake vs reboot；early-access vs demo vs playtest；f2p vs p2w；aaa vs aa vs indie；dedicated-server vs p2p；rollback vs delay-based netcode；unity vs unreal vs godot（定位差異，不是優劣）。

## MB `mobile-esports.json`（cat=mobile／esports）　第二版 1195～1346 行（第九、十章）

舊（mobile）：stamina-system, daily-weekly-quest, reroll, gacha-culture（第二版「課金／抽卡」）, collab-event, tier-list, sweep, limited-time-event, auto-battle, guild-war
舊（esports）：elo-mmr, ban-pick, balance-patch（含 nerf／buff 用語）, spectator-replay, bo3-bo5, smurf-boosting, caster, high-refresh-low-latency
新（mobile）：whale（課長／鯨魚）, f2p-player（無課／微課／月卡黨）, pity-counter（保底／井／天井／歪，機制面請連到 M2 的 pity-system）, banner（卡池／復刻）, ssr-tiers, dupes（凸／命座／突破）, launch-dash（首抽／開服）, endgame-content（畢業／練度）, idle-rewards（掛機收益）, monthly-card（月卡／小月卡）, event-shop, roguelike-mode-in-gacha（深淵／爬塔）, character-banner-rate-up
新（esports）：lan-vs-online, patch-meta（版本答案）, scrim, roster-lock, draft-phase（併入 ban-pick 或獨立）, bracket（單敗／雙敗）, throw（送／投）, comeback（逆轉／翻盤）, mechanics-vs-macro（操作 vs 大局觀）, apm, clutch
必寫 compare：pity-counter vs 純機率；whale vs f2p-player；elo vs mmr vs 段位；smurf vs boosting；scrim vs ranked。

## S1 `slang.json`（cat=slang）　第二版 1423～1598 行（第十二章，共九節）

舊：把第十二章九節的詞逐條轉成詞條（每一節的詞都要收，同義詞可併成一條，用 aliases 收其餘）。id 用英文或拼音：carry, thicc-leg（抱大腿）, gank, farm, cs, ks, feed, snowball, ... 依內容自訂但要唯一。
新：speedrun（含 any%／100%／glitchless／TAS）, platinum（白金／全成就）, backlog（積庫存／買了不玩）, gaming-drought（遊戲荒）, gaming-impotence（電子陽痿）, hooked（上頭）, liver-grind（肝）, buddha-mode（佛系）, cloud-gamer（雲玩家）, fat-finger（手殘）, kaihuang（開荒）, work-shift（打工／搬磚／日常）, graduated（畢業）, drop（出貨）, luck-eu-fei（歐／非）, version-answer（版本答案，與 MB 的 patch-meta 互相 compare）, op（OP／超模）, meta-slave（跟風）, git-gud, skill-issue, ragequit, tilt, one-more-turn, jank, cheese（起司／取巧打法）, exploit, glitch, softlock, hardlock, sequence-break, nerf-bat（可併入 nerf）, big-brain, bot（人機）, noob, tryhard, sweaty, casual-vs-hardcore, toxic, gg, ez, afk, 老馬／賣血 等台灣 PTT／巴哈用語自行補 5～10 條
必寫 compare：cheese vs exploit vs glitch；softlock vs hardlock；noob vs casual；toxic vs tryhard；cloud-gamer vs 觀眾。
黑話類 steamTags 多為空，sources 可用 PTT／巴哈姆特／Dcard 討論串、Wiki、Urban Dictionary、媒體報導；來源仍要真的存在。

---

## 跨組共同規則（每組都要看）

1. 讀 `data/SCHEMA.md`，照格式寫。
2. `appid` 只能填 `data/steam-games-ref.tsv` 裡有的；用 grep 查標題（表內是繁中或英文原名）。查不到就 `null`。
3. `steamTags` 只能填 `data/steam-tags-ref.tsv` 裡有的 tagid 與 en。
4. 每條至少 1 筆真實來源，`accessed` 寫 `2026-09-17`。**不編造網址**。用 WebFetch 或 WebSearch 確認過才寫。
5. 遊戲名用台灣官方或通稱（《艾爾登法環》不是《老头环》；《隻狼》；《黑帝斯》；《空洞騎士》；《星露谷物語》；《返校》）。
6. 寫完跑 `node scripts/validate.js data/entries/<你的檔>.json`，錯誤 0 才算完成；警告可留但要在 report 說明。
7. 另寫 `data/entries/<你的檔>.report.md`：條數、未完成的 id、unverified 的 id 與原因、合併或改名的說明、你覺得該加但不在分配表的詞（只列不寫）。
