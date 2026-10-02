const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'..'),dir=path.join(root,'data/entries');
const research=JSON.parse(fs.readFileSync(path.join(root,'docs/nonsteam-media-research.json'),'utf8'));
research.push(...JSON.parse(fs.readFileSync(path.join(root,'docs/nonsteam-extra.json'),'utf8')));
const extracted=JSON.parse(fs.readFileSync(path.join(root,'docs/official-media-extracted.json'),'utf8'));
const extra=JSON.parse(fs.readFileSync(path.join(root,'docs/extra-media-extracted.json'),'utf8'));
const imageMeta=x=>(x?.meta||[]).map(t=>t.match(/content="([^\"]+)"/)?.[1]?.trim()).find(u=>u?.startsWith('https:')&&!u.includes('logo')&&!u.includes('.svg'));
const mapping=new Map(research.filter(x=>x.imageUrl).map(x=>[x.original,{imageUrl:x.imageUrl,sourceUrl:x.sourceUrl,imageKind:x.original==='Minecraft'?'官方遊玩截圖':'官方宣傳圖'}]));
for(const name of ['Super Mario 3D World','Super Mario Galaxy','The Legend of Zelda','World of Warcraft','Genshin Impact']){const r=extracted.find(x=>x.original===name),imageUrl=imageMeta(r);if(imageUrl)mapping.set(name,{imageUrl,sourceUrl:r.sourceUrl,imageKind:'官方宣傳圖'});}
for(const [name,key] of [['Honkai: Star Rail','Honkai: Star Rail (site)'],['Fate/Grand Order','Fate/Grand Order (site)'],['Fallen London','Fallen London (site)']]){const r=extracted.find(x=>x.original===key),imageUrl=imageMeta(r);if(imageUrl)mapping.set(name,{imageUrl,sourceUrl:r.sourceUrl,imageKind:'官方宣傳圖'});}
const pio=extracted.find(x=>x.original==='Piofiore: Fated Memories');
mapping.set('Piofiore: Fated Memories',{imageUrl:pio.meta.map(t=>t.match(/content="([^\"]+)"/)?.[1]).find(u=>u?.startsWith('https:')&&u.includes('CG_1106')),sourceUrl:pio.sourceUrl,title:'Piofiore: Fated Memories',imageKind:'官方劇情畫面'});
const collar=extracted.find(x=>x.original==='Collar x Malice');
mapping.set('Collar x Malice',{imageUrl:imageMeta(collar),sourceUrl:collar.sourceUrl,imageKind:'官方商品圖'});
const val=extracted.find(x=>x.original==='VALORANT');
mapping.set('VALORANT',{imageUrl:val.images.find(t=>t.includes('src="https:'))?.match(/src="([^\"]+)"/)?.[1],sourceUrl:val.sourceUrl,imageKind:'官方教學畫面'});
mapping.set('League of Legends',{imageUrl:'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/ffe8f50201af51a0956875d2aeeb9e662eb0b228-3840x2160.png?accountingTag=LoL&fit=fill&fm=png&q=80&w=2530',sourceUrl:'https://www.leagueoflegends.com/en-us/how-to-play/',imageKind:'官方教學示意圖'});
const ai=extracted.find(x=>x.original==='AI Dungeon');
mapping.set('AI Dungeon',{imageUrl:ai.images.find(t=>t.includes('TAT_1.gif'))?.match(/data-full-size="([^\"]+)"/)?.[1],sourceUrl:ai.sourceUrl,imageKind:'官方介面示範'});
const devotion=extra.find(x=>x.original==='Devotion');
mapping.set('Devotion',{imageUrl:new URL(devotion.images.find(t=>t.includes('Home3.png')).match(/src="([^\"]+)"/)[1],devotion.sourceUrl).href,sourceUrl:devotion.sourceUrl,imageKind:'官方遊玩截圖'});
const grand=extra.find(x=>x.original==='The Seven Deadly Sins: Grand Cross');
mapping.set(grand.original,{imageUrl:imageMeta(grand),sourceUrl:grand.sourceUrl,imageKind:'官方宣傳圖'});
const lang=extra.find(x=>x.original==='Langrisser Mobile');
mapping.set(lang.original,{imageUrl:lang.images.find(t=>t.includes('alt="Screenshot image"')).match(/src="([^\"]+)"/)[1],sourceUrl:lang.sourceUrl,imageKind:'官方商店遊玩畫面'});
mapping.set('Wii Backward Compatibility with GameCube',{...mapping.get('Super Mario Odyssey'),title:'超級瑪利歐 奧德賽（Switch → Switch 2）',en:'Super Mario Odyssey',year:2017,why:'原 Switch 遊戲可在 Switch 2 繼續遊玩；官方另提供免費更新改善新主機上的體驗，可區分回溯相容與獨立重製版。',sourceUrl:'https://en-americas-support.nintendo.com/app/answers/detail/a_id/27783'});
const log=[];
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.json'))){const p=path.join(dir,f),a=JSON.parse(fs.readFileSync(p,'utf8'));let changed=false;
 for(const e of a)for(const x of e.examples||[]){const key=x.en||x.title,m=mapping.get(key);if(!m?.imageUrl)continue;
  Object.assign(x,m,{accessed:'2026-10-02'});
  if(m.imageUrl.includes('assets.nintendo.com')&&['Super Mario Odyssey','The Legend of Zelda: Tears of the Kingdom','Super Smash Bros. Ultimate','The Legend of Zelda: Breath of the Wild','Mario Kart 8 Deluxe'].includes(key)){
   x.selectionNote='玩法代表性；列入任天堂官方 Switch 主要軟體累積銷量表（截至 2026-06-30）。';x.selectionSource='https://www.nintendo.co.jp/ir/en/finance/software/switch.html';
  }
  if(!e.sources.some(s=>s.url===m.sourceUrl))e.sources.push({title:`官方遊戲介紹：${x.en||x.title}`,url:m.sourceUrl,accessed:'2026-10-02',note:`範例圖片來源（${m.imageKind}）`});
  log.push({entry:e.id,game:key,...m});changed=true;
 }
 if(changed)fs.writeFileSync(p,JSON.stringify(a,null,2)+'\n');
}
fs.writeFileSync(path.join(root,'docs/nonsteam-media-applied.json'),JSON.stringify(log,null,2)+'\n');console.log('非Steam官方圖片',log.length);
