const test=require('node:test'),assert=require('node:assert/strict');
const d=require('../data/glossary.json');
test('每個代表作都有官方圖片與可追溯來源',()=>{
 const missing=d.entries.flatMap(e=>(e.examples||[]).filter(x=>!(x.imageUrl||d.cards[x.appid]?.screenshot||d.cards[x.appid]?.img)).map(x=>`${e.id}: ${x.title}`));
 assert.deepEqual(missing,[]);
 for(const e of d.entries)for(const x of e.examples||[])if(x.imageUrl){assert.match(x.imageUrl,/^https:\/\//);assert.match(x.sourceUrl,/^https:\/\//);}
});
