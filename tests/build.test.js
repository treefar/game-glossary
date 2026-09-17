// 建置產物與資料一致性測試：node --test
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");

const data = JSON.parse(read("data/glossary.json"));
const html = read("index.html");

test("glossary.json 有詞條且 id 唯一", () => {
  assert.ok(data.entries.length >= 150, `只有 ${data.entries.length} 條`);
  const ids = data.entries.map(e => e.id);
  assert.equal(new Set(ids).size, ids.length, "id 重複");
});

test("每條都有必要欄位與至少一筆來源", () => {
  for (const e of data.entries) {
    for (const k of ["id", "zh", "en", "cat", "sub", "short", "def", "design", "status"]) assert.ok(e[k], `${e.id} 缺 ${k}`);
    assert.ok(Array.isArray(e.sources) && e.sources.length >= 1, `${e.id} 沒有來源`);
    for (const s of e.sources) assert.match(s.url, /^https?:\/\//, `${e.id} 來源網址不合法`);
  }
});

test("related 與 compare.with 都指向存在的 id（允許少量尚未撰寫，但要低於 5%）", () => {
  const ids = new Set(data.entries.map(e => e.id));
  let refs = 0, dangling = [];
  for (const e of data.entries) {
    for (const r of e.related || []) { refs++; if (!ids.has(r)) dangling.push(`${e.id}→${r}`); }
    for (const c of e.compare || []) { refs++; if (!ids.has(c.with)) dangling.push(`${e.id}⇄${c.with}`); }
  }
  assert.ok(dangling.length / Math.max(refs, 1) < 0.05, `懸空引用 ${dangling.length}/${refs}：${dangling.slice(0, 15).join("、")}`);
});

test("steamTags 的 tagid 都在內嵌標籤表裡，appid 有卡片資料或為 null", () => {
  for (const e of data.entries) {
    for (const t of e.steamTags || []) assert.ok(data.tags[t.tagid], `${e.id} 的 tagid ${t.tagid} 不在 tags`);
  }
  const withApp = data.entries.flatMap(e => (e.examples || []).filter(x => x.appid));
  const noCard = withApp.filter(x => !data.cards[x.appid]);
  assert.ok(noCard.length / Math.max(withApp.length, 1) < 0.1, `缺卡片資料 ${noCard.length}/${withApp.length}`);
});

test("index.html 內嵌資料與 glossary.json 一致，且沒有裸露的 </script>", () => {
  const m = html.match(/const DATA=(\{.*?\});\n\(function/s);
  assert.ok(m, "找不到 DATA 注入");
  const embedded = JSON.parse(m[1]);
  assert.equal(embedded.entries.length, data.entries.length);
  assert.equal(embedded.meta.stats.total, data.meta.stats.total);
  const scripts = html.split("<script").length - 1, ends = html.split("</script>").length - 1;
  assert.equal(scripts, ends, "script 標籤不對稱，內嵌資料可能截斷了頁面");
  assert.ok(!html.includes("/*__GLOSSARY_DATA__*/"), "注入標記還在");
});

test("沒有簡體字與常見中國用語", () => {
  const bad = /[们这为国会时进过说没对么发经产业还]|视频|软件|信息|优化|默认|服务器|内存|网络|用户|数据/;
  for (const e of data.entries) {
    const txt = JSON.stringify([e.zh, e.short, e.def, e.design, e.features, e.compare, e.tw, e.origin]);
    const m = txt.match(bad);
    assert.ok(!m, `${e.id} 疑似簡體或中國用語「${m && m[0]}」`);
  }
});

test("招牌比較存在：心理恐怖 vs 恐怖、Roguelike vs Roguelite", () => {
  const byId = new Map(data.entries.map(e => [e.id, e]));
  const has = (a, b) => byId.has(a) && (byId.get(a).compare || []).some(c => c.with === b);
  assert.ok(has("psychological-horror", "horror") || has("horror", "psychological-horror"), "缺心理恐怖 vs 恐怖");
  assert.ok(has("roguelike", "roguelite") || has("roguelite", "roguelike"), "缺 Roguelike vs Roguelite");
});
