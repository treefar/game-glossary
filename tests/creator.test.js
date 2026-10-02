const test=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
test('十個創作解析詞條各有兩個來源與四項重點',()=>{
 const d=JSON.parse(fs.readFileSync(path.join(root,'data/glossary.json'),'utf8'));
 const selected=d.entries.filter(e=>e.creator);
 assert.equal(selected.length,10);
 for(const e of selected){
  for(const k of ['design','experience','implementation','pitfall']) assert.ok(e.creator[k]?.length>5,e.id+k);
  assert.equal(e.examples.length,2,e.id);
  for(const x of e.examples){assert.match(x.sourceUrl,/^https:\/\//);assert.ok(x.why);assert.equal(x.accessed,'2026-10-02');}
 }
 assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/創作者筆記/);
});
