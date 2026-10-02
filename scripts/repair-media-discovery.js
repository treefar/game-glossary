// 僅接受 Steam 官方搜尋名稱完全相符的遊戲，保留逐筆來源證據。
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),dir=path.join(root,'data/entries');
const cards=JSON.parse(fs.readFileSync(path.join(root,'data/game-cards.json'),'utf8'));
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.json'));
const norm=s=>s.toLowerCase().replace(/[®™©:：\-–—'’!！.,，\s]/g,'');
const get=async url=>{const r=await fetch(url,{signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error(r.status);return r.json();};
(async()=>{
 const names=[...new Set(files.flatMap(f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')).flatMap(e=>(e.examples||[]).filter(x=>!x.appid).map(x=>x.en||x.title))))];
 const report=[];
 for(const name of names){try{
  const j=await get(`https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(name)}&l=english&cc=TW`);
  const exact=j.items?.find(x=>norm(x.name)===norm(name));
  if(!exact){report.push({name,candidates:j.items?.slice(0,4)});continue;}
  const a=await get(`https://store.steampowered.com/api/appdetails?appids=${exact.id}&l=english&cc=tw`),d=a[exact.id]?.data;
  if(!a[exact.id]?.success||d.type!=='game'||!d.header_image)throw Error('無遊戲圖片');
  cards[exact.id]={...cards[exact.id],name:d.name,img:d.header_image,screenshot:d.screenshots?.[0]?.path_thumbnail,fullScreenshot:d.screenshots?.[0]?.path_full,mediaSource:`https://store.steampowered.com/app/${exact.id}/`,fetched:'2026-10-02'};
  report.push({name,appid:exact.id,officialName:d.name,sourceUrl:cards[exact.id].mediaSource});console.log(name,exact.id);
 }catch(e){report.push({name,error:e.message});}
 fs.writeFileSync(path.join(root,'docs/steam-media-discovery.json'),JSON.stringify(report,null,2)+'\n');
 fs.writeFileSync(path.join(root,'data/game-cards.json'),JSON.stringify(cards,null,1)+'\n');
 }
 for(const f of files){const p=path.join(dir,f),a=JSON.parse(fs.readFileSync(p,'utf8'));let changed=false;
  for(const e of a)for(const x of e.examples||[]){const hit=report.find(r=>r.name===(x.en||x.title)&&r.appid);if(!x.appid&&hit){x.appid=hit.appid;changed=true;}}
  if(changed)fs.writeFileSync(p,JSON.stringify(a,null,2)+'\n');
 }
})();
