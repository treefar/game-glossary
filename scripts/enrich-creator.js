// 將已逐筆查證的十組範例與教學整理寫入既有詞條。
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const rows=[
['platformer',[[504230,'Celeste','以跳躍、空中衝刺與攀爬穿越精準平台挑戰。'],[40800,'Super Meat Boy','透過跳牆、避開鋸片與快速重試練習移動控制。']],['難度曲線應逐步教會玩家。','短重生把失敗變成下一次嘗試。','輸入緩衝、土狼時間與可調跳高。','碰撞箱與畫面輪廓不符會造成不公平。']],
['metroidvania',[[367520,'Hollow Knight','探索互連地下王國，取得能力後回訪並打開新路。'],[1057090,'Ori and the Will of the Wisps','以移動能力與平台挑戰逐步拓展探索範圍。']],['關鍵路標要可記憶、可辨識。','新能力讓舊地圖出現新的可能。','能力鎖、捷徑、地圖迷霧與回訪提示。','回頭路過長且缺少發現會變成跑腿。']],
['roguelike',[[333640,'Caves of Qud','Classic 模式結合回合制、程序世界與永久死亡；其他模式另有不同死亡規則。'],[333300,'ADOM (Ancient Domains Of Mystery)','傳統 Roguelike，以回合決策、探索與永久死亡形成局內風險。']],['隨機性應改變局勢，但仍讓玩家能推理。','以有限資訊做高風險選擇。','隨機種子、回合結算、視野與永久死亡狀態。','無預警的隨機秒殺破壞策略信任。']],
['roguelite',[[1145360,'Hades','每次逃離冥界形成一局，失敗後仍保留部分成長並推進人物故事。'],[588650,'Dead Cells','反覆闖關、路線變動與死亡重來，保留部分解鎖內容。']],['永久成長需增加選擇，避免只堆數值。','失敗後仍帶回可感知的進展。','分開管理局內掉落與跨局資源。','永久升級過強會削弱挑戰。']],
['soulslike',[[374320,'DARK SOULS III','以敵人招式學習、動作承諾與探索風險建立高張力戰鬥。'],[1627720,'Lies of P','官方定位為 soulslike，要求調整武器與戰法應對敵人。']],['敵人前搖必須可讀，讓失敗能回溯到決策。','靠學習克服首領帶來成就感。','耐力、鎖定、無敵幀與死亡資源回收規則。','只增加血量與傷害會拖長戰鬥。']],
['turn-based-tactics',[[268500,'XCOM 2','以小隊行動、掩體與戰場位置安排回合戰術。'],[590380,'Into the Breach','先顯示敵方攻擊意圖，再安排機甲反制並保護城市。']],['敵方意圖可視化讓策略有根據。','在位置與資源風險中尋找解法。','行動點、範圍預覽、狀態效果與回合排序。','資訊不足或等待動畫過長會拖慢節奏。']],
['rts',[[813780,'Age of Empires II: Definitive Edition','同時管理文明經濟、基地、軍隊與持續流動的戰場。'],[1017900,'Age of Empires: Definitive Edition','以資源採集、基地建設與單位指揮形成即時戰略。']],['經濟發展與軍事壓力需形成不同可選節奏。','多線操作带來緊迫感與掌控感。'.replace('带','帶'),'單位命令佇列、尋路、視野與資源流。','操作負荷過高會讓讀圖與戰術退居次要。']],
['tower-defense',[[246420,'Kingdom Rush','配置塔與升級專精，防守沿路推進的敵群。'],[960090,'Bloons TD 6','組合猴子塔、英雄與升級路線，對付不同波次氣球。']],['路徑與塔位共同決定策略。','波次前規劃、波次中觀察與補救。','波次排程、射程、目標排序與升級分支。','抗性或速度突然跳升容易迫使單一解法。']],
['sandbox',[[null,'Minecraft','以創造或生存模式採集、建造並塑造自己的世界。','https://www.minecraft.net/en-us/about-minecraft'],[105600,'Terraria','挖掘、建造、製作與戰鬥，讓玩家自行安排探索與創作目標。']],['自由需由可組合的規則支撐。','作品與目標由玩家自己定義。','可破壞與放置資料、配方、存檔與創作分享。','缺少起點與回饋會讓自由變成無所適從。']],
['branching-narrative',[[1222140,'Detroit: Become Human','選擇會改變三位主角的命運與故事結局。'],[207610,'The Walking Dead','決策與人物關係產生後續故事反應；分支規模與永久後果需依實際章節判斷。']],['選擇後果需可感知，也能延後回收。','讓玩家承擔角色命運與關係選擇。','狀態變數、分支條件、會合節點與旗標測試。','選項不同卻沒有可辨識後果會削弱信任。']]
];
const keys=['design','experience','implementation','pitfall'];
for(const file of fs.readdirSync(path.join(root,'data/entries')).filter(f=>f.endsWith('.json'))){
 const p=path.join(root,'data/entries',file), entries=JSON.parse(fs.readFileSync(p,'utf8'));let changed=false;
 for(const e of entries){const row=rows.find(r=>r[0]===e.id);if(!row)continue;changed=true;
  e.creator=Object.fromEntries(keys.map((k,i)=>[k,row[2][i]]));e.creator.note='教學整理與設計推論；不是開發者訪談或製作團隊的直接說法。';
  e.examples=row[1].map(([appid,name,why,url])=>({title:name,en:name,appid,why,sourceUrl:url||`https://store.steampowered.com/app/${appid}/`,accessed:'2026-10-02'}));
  for(const x of e.examples) if(!e.sources.some(s=>s.url===x.sourceUrl))e.sources.push({title:x.title+' 官方遊戲介紹與畫面',url:x.sourceUrl,accessed:x.accessed,note:'範例玩法與畫面來源'});
 }
 if(changed)fs.writeFileSync(p,JSON.stringify(entries,null,2)+'\n');
}
console.log('已整理十個詞條。');
