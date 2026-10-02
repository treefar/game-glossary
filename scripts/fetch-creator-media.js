// 從 Steam 官方回傳取得實際遊玩截圖網址，僅保存網址與資料，不下載圖片。
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),file=path.join(root,'data/game-cards.json');
(async()=>{
 const cards=JSON.parse(fs.readFileSync(file,'utf8'));
 const entries=fs.readdirSync(path.join(root,'data/entries')).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(fs.readFileSync(path.join(root,'data/entries',f),'utf8')));
 const ids=[...new Set(entries.filter(e=>e.creator).flatMap(e=>e.examples.map(x=>x.appid).filter(Boolean)))];
 for(const id of ids){
  try{const r=await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&l=english&cc=tw`,{signal:AbortSignal.timeout(20000)});const j=await r.json(),d=j[id]?.data;
   if(!j[id]?.success||d.type!=='game')throw Error('官方資料未回傳遊戲');
   cards[id]={...cards[id],name:d.name,img:d.header_image,screenshot:d.screenshots?.[0]?.path_thumbnail||null,fullScreenshot:d.screenshots?.[0]?.path_full||null,mediaSource:`https://store.steampowered.com/app/${id}/`,fetched:'2026-10-02'};
   console.log(id,d.name,cards[id].screenshot?'截圖來源已取得':'無截圖');
  }catch(e){console.log(id,'未取得截圖：',e.message);}
  fs.writeFileSync(file,JSON.stringify(cards,null,1)+'\n');
  await new Promise(r=>setTimeout(r,400));
 }
})();
