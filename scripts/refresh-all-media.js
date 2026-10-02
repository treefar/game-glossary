// 優先以遊玩截圖取代舊宣傳縮圖；地域限制時讀取同一遊戲的美國商店資料。
const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'..');
(async()=>{
 const file=path.join(root,'data/game-cards.json'),cards=JSON.parse(fs.readFileSync(file,'utf8'));
 const entries=fs.readdirSync(path.join(root,'data/entries')).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(fs.readFileSync(path.join(root,'data/entries',f),'utf8')));
 const ids=[...new Set(entries.flatMap(e=>(e.examples||[]).map(x=>x.appid).filter(Boolean)))].filter(id=>!cards[id]?.screenshot);
 const report=[];
 for(let i=0;i<ids.length;i+=4){await Promise.all(ids.slice(i,i+4).map(async id=>{
  try{let d;for(const cc of ['tw','us']){const j=await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&l=english&cc=${cc}`,{signal:AbortSignal.timeout(20000)}).then(r=>r.json());if(j[id]?.success){d=j[id].data;break;}}
   if(d?.type!=='game'||!d.header_image)throw Error('未取得官方遊戲資料');
   cards[id]={...cards[id],name:d.name,img:d.header_image,screenshot:d.screenshots?.[0]?.path_thumbnail,fullScreenshot:d.screenshots?.[0]?.path_full,mediaSource:`https://store.steampowered.com/app/${id}/`,fetched:'2026-10-02'};
   report.push({appid:id,name:d.name,screenshot:!!cards[id].screenshot});
  }catch(e){report.push({appid:id,error:e.message});}
 }));fs.writeFileSync(file,JSON.stringify(cards,null,1)+'\n');fs.writeFileSync(path.join(root,'docs/all-steam-media-refresh.json'),JSON.stringify(report,null,2)+'\n');console.log('官方截圖更新',Math.min(i+4,ids.length),'/',ids.length);}
})();
