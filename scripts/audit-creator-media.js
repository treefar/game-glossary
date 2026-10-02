// 驗證這批範例的遠端圖片是否回傳真實圖片內容，不將圖片下載至專案。
const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'..');
(async()=>{
 const d=JSON.parse(fs.readFileSync(path.join(root,'data/glossary.json'),'utf8'));
 const xs=d.entries.filter(e=>e.creator).flatMap(e=>e.examples.map(x=>({entry:e.id,title:x.title,url:d.cards[x.appid]?.screenshot||null})));
 const rows=[];
 for(let i=0;i<xs.length;i+=5)await Promise.all(xs.slice(i,i+5).map(async x=>{
  let result={...x,ok:false};
  try{if(!x.url)throw Error('沒有截圖網址');const r=await fetch(x.url,{signal:AbortSignal.timeout(25000)});const b=new Uint8Array(await r.arrayBuffer());const type=r.headers.get('content-type');const magic=(b[0]===255&&b[1]===216)||(b[0]===137&&b[1]===80)||(String.fromCharCode(...b.slice(0,4))==='RIFF');result={...result,status:r.status,type,bytes:b.length,ok:r.ok&&type?.startsWith('image/')&&magic&&b.length>1000};}
  catch(e){result.error=e.message;}
  rows.push(result);console.log(result.ok?'PASS':'FAIL',x.entry,x.title,result.error||result.status);
 }));
 rows.sort((a,b)=>a.entry.localeCompare(b.entry)||a.title.localeCompare(b.title));
 fs.writeFileSync(path.join(root,'docs/creator-media-audit.json'),JSON.stringify({date:'2026-10-02',rows},null,2)+'\n');
 console.log(`${rows.filter(r=>r.ok).length}/${rows.length}`);if(rows.some(r=>!r.ok))process.exitCode=1;
})();
