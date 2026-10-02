const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'..');
// 每筆都透過官方 appdetails 核對實際名稱、類型與圖片，不套用近似搜尋結果。
const ids=[474750,39210,1593500,247000,50300,2131630,72850,870780,584400,1003590,13240,273350,550,50990,367500,1243830,282140];
(async()=>{
 const cards=JSON.parse(fs.readFileSync(path.join(root,'data/game-cards.json'),'utf8')),rows=[];
 for(const id of ids){try{
  const j=await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&l=english&cc=us`,{signal:AbortSignal.timeout(20000)}).then(r=>r.json()),d=j[id]?.data;
  if(!j[id]?.success||d.type!=='game'||!d.header_image)throw Error('官方無遊戲資料');
  const r=await fetch(`https://store.steampowered.com/appreviews/${id}?json=1&language=all&purchase_type=all&filter=summary`,{signal:AbortSignal.timeout(20000)}).then(r=>r.json());
  const q=r.query_summary;
  cards[id]={...cards[id],name:d.name,img:d.header_image,screenshot:d.screenshots?.[0]?.path_thumbnail,fullScreenshot:d.screenshots?.[0]?.path_full,mediaSource:`https://store.steampowered.com/app/${id}/`,fetched:'2026-10-02'};
  rows.push({appid:id,name:d.name,description:d.short_description,release:d.release_date,metacritic:d.metacritic,reviews:q,sourceUrl:cards[id].mediaSource});console.log(id,d.name,q?.total_positive,q?.total_reviews);
 }catch(e){rows.push({appid:id,error:e.message});console.log(id,e.message);}
 fs.writeFileSync(path.join(root,'data/game-cards.json'),JSON.stringify(cards,null,1)+'\n');
 fs.writeFileSync(path.join(root,'docs/repair-candidates.json'),JSON.stringify(rows,null,2)+'\n');
 }
})();
