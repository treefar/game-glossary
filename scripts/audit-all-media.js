// 全站每個範例都要有圖片；相同網址只請求一次，不保存遠端圖片檔。
const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'..');
(async()=>{
 const d=JSON.parse(fs.readFileSync(path.join(root,'data/glossary.json'),'utf8'));
 const examples=d.entries.flatMap(e=>(e.examples||[]).map(x=>({entry:e.id,title:x.title,url:x.imageUrl||d.cards[x.appid]?.screenshot||d.cards[x.appid]?.img||null})));
 const checks=new Map();
 if(process.argv.includes('--reuse')){const prior=JSON.parse(fs.readFileSync(path.join(root,'docs/all-media-audit.json'),'utf8'));if(prior.date!=='2026-10-02')throw Error('僅可沿用本次查證');for(const x of prior.rows)if(x.ok)checks.set(x.url,x);}
 const urls=[...new Set(examples.map(x=>x.url).filter(Boolean))].filter(url=>!checks.has(url));
 for(let i=0;i<urls.length;i+=8){await Promise.all(urls.slice(i,i+8).map(async url=>{
  let result={url,ok:false};
  for(let attempt=0;attempt<2;attempt++){try{
   const r=await fetch(url,{signal:AbortSignal.timeout(25000)}),b=new Uint8Array(await r.arrayBuffer()),type=r.headers.get('content-type');
   const magic=(b[0]===255&&b[1]===216)||(b[0]===137&&b[1]===80)||(String.fromCharCode(...b.slice(0,4))==='RIFF')||(String.fromCharCode(...b.slice(0,3))==='GIF');
   result={url,status:r.status,type,bytes:b.length,ok:r.ok&&type?.startsWith('image/')&&magic&&b.length>1000};if(result.ok)break;
  }catch(e){result.error=e.message;}}
  checks.set(url,result);if(!result.ok)console.log('FAIL',url,result.error||result.status);
 }));console.log('圖片檢查',Math.min(i+8,urls.length),'/',urls.length);}
 const rows=examples.map(x=>({...checks.get(x.url),...x,ok:checks.get(x.url)?.ok||false}));
 const report={date:'2026-10-02',examples:rows.length,uniqueImages:new Set(examples.map(x=>x.url)).size,passed:rows.filter(x=>x.ok).length,failed:rows.filter(x=>!x.ok).length,rows};
 fs.writeFileSync(path.join(root,'docs/all-media-audit.json'),JSON.stringify(report,null,2)+'\n');
 console.log('全站',report.passed,'/',report.examples);if(report.failed)process.exitCode=1;
})();
