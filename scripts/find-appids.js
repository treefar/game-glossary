// 幫 appid 為 null 的代表作找 Steam appid：用商店搜尋 API，只接受「名稱完全相同」的結果（忽略大小寫與 ®™），
// 找到的寫進 data/appid-suggestions.json（不直接改詞條檔），並順手抓卡片資料進 data/game-cards.json。
// 用法：node scripts/find-appids.js [--apply]   --apply 會把建議直接套進詞條檔
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "data", "entries");
const CARDS = path.join(ROOT, "data", "game-cards.json");
const SUG = path.join(ROOT, "data", "appid-suggestions.json");
const cards = fs.existsSync(CARDS) ? JSON.parse(fs.readFileSync(CARDS, "utf8")) : {};
const sug = fs.existsSync(SUG) ? JSON.parse(fs.readFileSync(SUG, "utf8")) : {};
const norm = s => String(s || "").toLowerCase().replace(/[®™©:：\-–—'’!！.,，\s]/g, "");
const sleep = ms => new Promise(r => setTimeout(r, ms));
const files = fs.readdirSync(DIR).filter(f => f.endsWith(".json"));

if (process.argv.includes("--apply")) {
  let n = 0;
  for (const f of files) {
    const p = path.join(DIR, f); const arr = JSON.parse(fs.readFileSync(p, "utf8")); let changed = false;
    for (const e of arr) for (const x of e.examples || []) {
      if (x.appid) continue;
      const key = x.en || x.title; const s = sug[key];
      if (s && s.appid && cards[s.appid]) { x.appid = s.appid; changed = true; n++; }
    }
    if (changed) fs.writeFileSync(p, JSON.stringify(arr, null, 2) + "\n");
  }
  console.log(`套用 ${n} 個 appid`); process.exit(0);
}

(async () => {
  const wanted = new Map();
  for (const f of files) for (const e of JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
    for (const x of e.examples || []) if (!x.appid) { const key = x.en || x.title; if (!sug[key]) wanted.set(key, x.en || x.title); }
  console.log(`要查 ${wanted.size} 個名稱`);
  let hit = 0;
  for (const [key, term] of wanted) {
    try {
      const r = await fetch(`https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(term)}&l=tchinese&cc=TW`);
      const j = await r.json();
      const items = (j && j.items) || [];
      const exact = items.find(i => norm(i.name) === norm(term));
      if (!exact) { sug[key] = { appid: null, tried: term, top: items.slice(0, 3).map(i => `${i.id}:${i.name}`) }; }
      else {
        sug[key] = { appid: exact.id, name: exact.name };
        await sleep(1600);
        const d = await fetch(`https://store.steampowered.com/api/appdetails?appids=${exact.id}&l=tchinese&cc=tw`).then(x => x.json());
        const g = d && d[exact.id] && d[exact.id].success ? d[exact.id].data : null;
        if (g && g.type === "game") {
          const year = (g.release_date && g.release_date.date && (g.release_date.date.match(/\d{4}/) || [])[0]) || null;
          cards[exact.id] = { name: g.name, desc: String(g.short_description || "").replace(/\s+/g, " ").slice(0, 160), img: g.header_image, year: year ? Number(year) : null, fetched: new Date().toISOString().slice(0, 10) };
          hit++; console.log(`✓ ${term} → ${exact.id} ${g.name} ${year || ""}`);
        } else { sug[key].appid = null; sug[key].note = "appdetails 非 game 或失敗"; }
      }
    } catch (e) { sug[key] = { appid: null, error: e.message }; }
    fs.writeFileSync(SUG, JSON.stringify(sug, null, 1) + "\n");
    fs.writeFileSync(CARDS, JSON.stringify(cards, null, 1) + "\n");
    await sleep(1600);
  }
  console.log(`完成：找到 ${hit} 個，建議寫在 data/appid-suggestions.json；確認後跑 --apply`);
})();
