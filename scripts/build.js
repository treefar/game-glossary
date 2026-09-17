// 建置：合併 data/entries/*.json → data/glossary.json，補遊戲卡片資料，注入 src/index.html → index.html（單檔離線）。
// 用法：node scripts/build.js [--refresh-cards]
//   --refresh-cards：從同層的 ../steam-tag-prompter/data/game-index.json 重抓縮圖與簡介進 data/game-cards.json
const fs = require("fs"), path = require("path"), { spawnSync } = require("child_process");
const ROOT = path.join(__dirname, "..");
const ENTRIES_DIR = path.join(ROOT, "data", "entries");
const CARDS = path.join(ROOT, "data", "game-cards.json");
const TEMPLATE = path.join(ROOT, "src", "index.html");
const OUT = path.join(ROOT, "index.html");
const CAT_ORDER = ["basics","genre","theme","visual","narrative","mechanic","juice","system","multiplayer","tech","industry","mobile","esports","ai","slang"];
const CAT_LABEL = {
  basics: "基礎速查", genre: "遊戲類型", theme: "題材與氛圍", visual: "視角與美術", narrative: "敘事設計",
  mechanic: "戰鬥與動作機制", juice: "果汁：打擊感與回饋", system: "系統與設計理論", multiplayer: "多人與網路",
  tech: "技術與圖形", industry: "產業與開發實務", mobile: "手遊機制與文化", esports: "電子競技", ai: "AI 與新興技術", slang: "黑話與社群用語"
};

// 1. 先跑驗證，錯誤就不建置
const v = spawnSync(process.execPath, [path.join(__dirname, "validate.js")], { encoding: "utf8" });
process.stdout.write(v.stdout.split("\n").slice(-2).join("\n") + "\n");
if (v.status !== 0) { console.error(v.stdout); console.error("驗證未過，停止建置。"); process.exit(1); }

// 2. 合併
const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith(".json")).sort();
let entries = [];
for (const f of files) {
  const arr = JSON.parse(fs.readFileSync(path.join(ENTRIES_DIR, f), "utf8"));
  for (const e of arr) entries.push({ ...e, _file: f });
}
const catIdx = c => { const i = CAT_ORDER.indexOf(c); return i < 0 ? 99 : i; };
entries.sort((a, b) => catIdx(a.cat) - catIdx(b.cat) || a.sub.localeCompare(b.sub, "zh-Hant") || a.zh.localeCompare(b.zh, "zh-Hant"));

// 3. 標籤參考表
const tsv = f => fs.readFileSync(path.join(ROOT, "data", f), "utf8").split(/\r?\n/).slice(1).filter(Boolean).map(l => l.split("\t"));
const TAGS = {};
for (const [id, en, tw, dim] of tsv("steam-tags-ref.tsv")) TAGS[id] = { en, tw, dim: Number(dim.replace("dim", "")) };

// 4. 遊戲卡片快取
let cards = {};
if (fs.existsSync(CARDS)) cards = JSON.parse(fs.readFileSync(CARDS, "utf8"));
const wanted = new Set();
for (const e of entries) for (const x of e.examples || []) if (x.appid) wanted.add(Number(x.appid));
const missing = [...wanted].filter(a => !cards[a]);
if (missing.length || process.argv.includes("--refresh-cards")) {
  const gi = path.join(ROOT, "..", "steam-tag-prompter", "data", "game-index.json");
  if (fs.existsSync(gi)) {
    const g = JSON.parse(fs.readFileSync(gi, "utf8"));
    const prefix = g._meta.imgPrefix;
    const byId = new Map(g.games.map(r => [r[0], r]));
    for (const a of wanted) {
      const r = byId.get(a);
      if (!r) continue;
      cards[a] = { name: r[1], desc: (r[2] || "").slice(0, 160), img: r[3].startsWith("http") ? r[3] : prefix + r[3], year: r[5] };
    }
    const still = [...wanted].filter(a => !cards[a]);
    fs.writeFileSync(CARDS, JSON.stringify(cards, null, 1) + "\n");
    console.log(`遊戲卡片：需要 ${wanted.size}，快取已有 ${wanted.size - still.length}，索引裡找不到 ${still.length}${still.length ? "：" + still.join(",") : ""}`);
  } else {
    console.log(`△ 找不到 ${gi}，缺 ${missing.length} 張卡片資料，先用文字卡片。`);
  }
}

// 5. 統計與輸出資料
const stats = { total: entries.length, verified: entries.filter(e => e.status === "verified").length, cats: {} };
for (const e of entries) stats.cats[e.cat] = (stats.cats[e.cat] || 0) + 1;
const data = {
  meta: { built: new Date().toISOString().slice(0, 10), version: 3, catOrder: CAT_ORDER, catLabel: CAT_LABEL, stats,
    toolUrl: "https://treefar.link/steam-tag-prompter/", repo: "https://github.com/treefar/game-glossary" },
  entries: entries.map(({ _file, ...e }) => e),
  tags: Object.fromEntries(Object.entries(TAGS).filter(([id]) => entries.some(e => (e.steamTags || []).some(t => String(t.tagid) === id)))),
  cards: Object.fromEntries([...wanted].filter(a => cards[a]).map(a => [a, cards[a]]))
};
fs.writeFileSync(path.join(ROOT, "data", "glossary.json"), JSON.stringify(data, null, 1) + "\n");

// 6. 注入模板
let html = fs.readFileSync(TEMPLATE, "utf8");
const json = JSON.stringify(data).replace(/</g, "\\u003c").replace(new RegExp(String.fromCharCode(0x2028), "g"), "\\u2028").replace(new RegExp(String.fromCharCode(0x2029), "g"), "\\u2029");
const MARK = "/*__GLOSSARY_DATA__*/";
if (!html.includes(MARK)) { console.error("模板缺少注入標記"); process.exit(1); }
html = html.replace(MARK, () => "const DATA=" + json + ";");
html = html.replace(/\r\n/g, "\n");
fs.writeFileSync(OUT, html);
console.log(`建置完成：${stats.total} 條（verified ${stats.verified}），${files.length} 個檔，index.html ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
