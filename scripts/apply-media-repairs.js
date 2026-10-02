// 明確列出原名與版本／替換理由；不使用近似名稱推斷 appid。
const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'..'),dir=path.join(root,'data/entries');
const candidates=JSON.parse(fs.readFileSync(path.join(root,'docs/repair-candidates.json'),'utf8'));
const mapping={
 'Reigns':{appid:474750},
 'Final Fantasy XIV':{appid:39210,en:'FINAL FANTASY XIV Online'},
 'God of War (2018)':{appid:1593500},
 'Talisman: Digital Edition':{appid:247000,en:'Talisman: Digital Classic Edition'},
 'Spec Ops: The Line':{appid:50300,title:'Spec Ops: The Line'},
 'Metal Gear Solid':{appid:2131630,title:'潛龍諜影（Master Collection 版）',en:'METAL GEAR SOLID - Master Collection Version',imageKind:'官方遊玩截圖（原作移植版）'},
 'The Elder Scrolls V: Skyrim':{appid:72850},
 'Control':{appid:870780,title:'Control Ultimate Edition',en:'CONTROL Ultimate Edition'},
 'Unreal Tournament':{appid:13240,title:'虛幻競技場：年度遊戲版',en:'Unreal Tournament: Game of the Year Edition'},
 'Mystery Case Files':{appid:50990,title:'Mystery Case Files: Ravenhearst',en:'Mystery Case Files: Ravenhearst',why:'從謎案調查系列選出 Ravenhearst，觀察清單找物、場景調查與日記線索的結合。'},
 'Evolve':{appid:550,title:'惡靈勢力 2（對抗模式）',en:'Left 4 Dead 2',year:2009,why:'對抗模式讓一隊扮演倖存者、一隊扮演特殊感染者；雙方能力、資訊與操作體驗不同，是非對稱對戰的代表案例。'},
 'Sonic the Hedgehog':{appid:584400,title:'Sonic Mania',en:'Sonic Mania',year:2017,why:'以經典 2D 音速小子玩法展示坡面加速、慣性與高速路線，適合觀察動量如何連結地形與操作。'},
 'Tetris':{appid:1003590,title:'俄羅斯方塊效應：連結',en:'Tetris Effect: Connected',year:2020}
};
const log=[];
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.json'))){const p=path.join(dir,f),a=JSON.parse(fs.readFileSync(p,'utf8'));let changed=false;
 for(const e of a)for(const x of e.examples||[]){const key=x.en||x.title,m=mapping[key];if(!m)continue;
  const c=candidates.find(c=>c.appid===m.appid);if(!c||c.error)throw Error(`未查證 ${key}`);
  const old={...x};Object.assign(x,m,{sourceUrl:c.sourceUrl,accessed:'2026-10-02'});
  if(c.reviews?.total_reviews){const q=c.reviews,pct=(100*q.total_positive/q.total_reviews).toFixed(1);x.selectionNote=`玩法代表性；Steam 全語言累積好評 ${pct}%（${q.total_reviews.toLocaleString('en-US')} 則，2026-10-02）。`;
   x.reviewSource=`https://store.steampowered.com/appreviews/${m.appid}?json=1&language=all&purchase_type=all&filter=summary`;
  }
  if(key==='Tetris')x.why=e.id==='flow-state'?'方塊下落速度與音畫節奏逐步提高，讓玩家在熟練操作與持續挑戰之間維持專注，可觀察心流條件。':'以俄羅斯方塊的旋轉、消行規則，分析玩家決策形成的動態與音畫回饋帶來的美感體驗。';
  if(!e.sources.some(s=>s.url===c.sourceUrl))e.sources.push({title:`Steam 官方：${c.name}`,url:c.sourceUrl,accessed:'2026-10-02',note:'範例版本、圖片與遊戲介紹'});
  log.push({entry:e.id,original:old,repaired:{...x},officialName:c.name});changed=true;
 }
 if(changed)fs.writeFileSync(p,JSON.stringify(a,null,2)+'\n');
}
fs.writeFileSync(path.join(root,'docs/media-replacements.json'),JSON.stringify(log,null,2)+'\n');
console.log('版本核對／範例修復',log.length);
