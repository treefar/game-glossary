// 保存官方 HTML 實際列出的圖片網址，待人工選擇；不推測 CDN 路徑。
const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'..');
let sources=[...JSON.parse(fs.readFileSync(path.join(root,'docs/nonsteam-media-research.json'),'utf8')).filter(x=>!x.imageUrl),
 {original:'Honkai: Star Rail (site)',sourceUrl:'https://hsr.hoyoverse.com/en-us/'},
 {original:'Genshin Impact (site)',sourceUrl:'https://genshin.hoyoverse.com/en/'},
 {original:'Fate/Grand Order (site)',sourceUrl:'https://fate-go.us/'},
 {original:'Fallen London (site)',sourceUrl:'https://www.failbettergames.com/games/fallen-london'}];
const extra=process.argv.includes('--extra');
if(extra)sources=[...JSON.parse(fs.readFileSync(path.join(root,'docs/nonsteam-extra.json'),'utf8')).filter(x=>!x.imageUrl),{original:'Devotion (shop)',sourceUrl:'https://shop.redcandlegames.com/app/devotion'}];
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"');
(async()=>{const out=[];for(let i=0;i<sources.length;i+=4)await Promise.all(sources.slice(i,i+4).map(async x=>{
 try{const r=await fetch(x.sourceUrl,{signal:AbortSignal.timeout(25000)}),html=await r.text();
  const metas=[...html.matchAll(/<meta\b[^>]*>/gi)].filter(m=>/og:image|twitter:image/.test(m[0])).map(m=>m[0]);
  const imgs=[...html.matchAll(/<img\b[^>]*>/gi)].map(m=>m[0]).filter(m=>!(/logo|icon|flag|esrb/i.test(m))).slice(0,35);
  out.push({...x,status:r.status,meta:metas.map(decode),images:imgs.map(decode)});console.log(x.original,r.status,metas.length,imgs.length);
 }catch(e){out.push({...x,error:e.message});}
 fs.writeFileSync(path.join(root,extra?'docs/extra-media-extracted.json':'docs/official-media-extracted.json'),JSON.stringify(out,null,2)+'\n');
 }));})();
