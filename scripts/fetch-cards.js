// 補抓不在 steam-tag-prompter 索引裡的代表作卡片資料（縮圖、繁中名、年份、簡介）。
// 用法：node scripts/fetch-cards.js 555220 2124490 ...   或   node scripts/fetch-cards.js --missing
//   --missing：掃描 data/entries/*.json 裡所有 appid，凡 data/game-cards.json 沒有的都抓。
// 來源：Steam 商店 appdetails API（l=tchinese），每次一個 appid、間隔 1.6 秒以免被限速。
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const CARDS = path.join(ROOT, "data", "game-cards.json");
const cards = fs.existsSync(CARDS) ? JSON.parse(fs.readFileSync(CARDS, "utf8")) : {};
let ids = process.argv.slice(2).filter(a => /^\d+$/.test(a)).map(Number);
if (process.argv.includes("--missing")) {
  const dir = path.join(ROOT, "data", "entries");
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".json"))) {
    for (const e of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
      for (const x of e.examples || []) if (x.appid && !cards[x.appid]) ids.push(Number(x.appid));
  }
}
ids = [...new Set(ids)].filter(a => !cards[a] || process.argv.includes("--force"));
if (!ids.length) { console.log("沒有要抓的 appid。"); process.exit(0); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  let ok = 0, fail = [];
  for (const a of ids) {
    try {
      const r = await fetch(`https://store.steampowered.com/api/appdetails?appids=${a}&l=tchinese&cc=tw`, { headers: { "Accept-Language": "zh-TW" } });
      const j = await r.json();
      const d = j && j[a] && j[a].success ? j[a].data : null;
      if (!d || d.type !== "game") { fail.push(`${a}（${d ? d.type : "no data"}）`); }
      else {
        const year = (d.release_date && d.release_date.date && (d.release_date.date.match(/\d{4}/) || [])[0]) || null;
        cards[a] = { name: d.name, desc: String(d.short_description || "").replace(/\s+/g, " ").slice(0, 160), img: d.header_image, year: year ? Number(year) : null, fetched: new Date().toISOString().slice(0, 10) };
        ok++; console.log(`✓ ${a} ${d.name} ${year || ""}`);
      }
    } catch (e) { fail.push(`${a}（${e.message}`); }
    await sleep(1600);
  }
  fs.writeFileSync(CARDS, JSON.stringify(cards, null, 1) + "\n");
  console.log(`抓到 ${ok}，失敗 ${fail.length}${fail.length ? "：" + fail.join("、") : ""}`);
})();
