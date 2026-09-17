// 驗證詞條檔：欄位、id 唯一、tagid／appid 對得上參考表、簡體字、來源日期。
// 用法：node scripts/validate.js data/entries/<file>.json [...更多檔]  （不給參數就驗全部）
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const CATS = new Set(["basics","genre","theme","visual","narrative","mechanic","juice","system","multiplayer","tech","industry","mobile","esports","ai","slang"]);
const tsv = f => fs.readFileSync(path.join(ROOT, "data", f), "utf8").split(/\r?\n/).slice(1).filter(Boolean).map(l => l.split("\t"));
const TAGS = new Map(tsv("steam-tags-ref.tsv").map(r => [Number(r[0]), r[1]]));
const APPS = new Set(tsv("steam-games-ref.tsv").map(r => Number(r[0])));
// 不在工具索引、但已用 scripts/fetch-cards.js 抓過卡片資料的 appid 也算合法
try { for (const k of Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT, "data", "game-cards.json"), "utf8")))) APPS.add(Number(k)); } catch {}
// 常見簡體字（含中國慣用詞會用到的字）
const SIMP = /[们这个为于国会时进过说没对么发经产动业电见开关体后学问长实点现问间还样种设应当无与义]/;
const SIMP_ALLOW = /[个体动电见开关后学问长实点现间样种设应当无与义]/; // 這些字繁體也用，單獨不判定
const SIMP_STRICT = /[们这为国会时进过说没对么发经产业还]/;
let files = process.argv.slice(2);
if (!files.length) files = fs.readdirSync(path.join(ROOT, "data", "entries")).filter(f => f.endsWith(".json")).map(f => path.join("data", "entries", f));
let total = 0, errors = 0, warns = 0;
const allIds = new Map();
for (const f of files) {
  const abs = path.isAbsolute(f) ? f : path.join(ROOT, f);
  let buf = fs.readFileSync(abs);
  if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) { console.log(`✗ ${f}: 檔案有 BOM`); errors++; buf = buf.slice(3); }
  let arr;
  try { arr = JSON.parse(buf.toString("utf8")); } catch (e) { console.log(`✗ ${f}: JSON 解析失敗 ${e.message}`); errors++; continue; }
  if (!Array.isArray(arr)) { console.log(`✗ ${f}: 最外層必須是陣列`); errors++; continue; }
  const err = (id, m) => { console.log(`✗ ${f} [${id}] ${m}`); errors++; };
  const warn = (id, m) => { console.log(`△ ${f} [${id}] ${m}`); warns++; };
  for (const e of arr) {
    total++;
    const id = e.id || "(no id)";
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) err(id, "id 格式錯");
    if (allIds.has(id)) err(id, `id 重複（另見 ${allIds.get(id)}）`); else allIds.set(id, f);
    for (const k of ["zh","en","cat","sub","short","def","design","status"]) if (typeof e[k] !== "string" || !e[k].trim()) err(id, `缺 ${k}`);
    for (const k of ["aliases","features","examples","steamTags","compare","related","sources"]) if (!Array.isArray(e[k])) err(id, `${k} 必須是陣列`);
    if (!CATS.has(e.cat)) err(id, `cat 不合法：${e.cat}`);
    if (!["verified","unverified"].includes(e.status)) err(id, `status 不合法`);
    if (e.short && e.short.length > 60) warn(id, `short 太長（${e.short.length} 字）`);
    if (e.def && (e.def.length < 100 || e.def.length > 420)) warn(id, `def 長度 ${e.def.length}，建議 150～300`);
    if (Array.isArray(e.features) && (e.features.length < 3 || e.features.length > 6)) warn(id, `features ${e.features.length} 條`);
    if (Array.isArray(e.examples)) {
      if (e.examples.length < 2) warn(id, "examples 少於 2");
      for (const x of e.examples) {
        if (!x.title) err(id, "example 缺 title");
        if (x.appid !== null && x.appid !== undefined && !APPS.has(Number(x.appid))) err(id, `appid ${x.appid}（${x.title}）不在 steam-games-ref.tsv`);
      }
    }
    if (Array.isArray(e.steamTags)) for (const t of e.steamTags) {
      if (!TAGS.has(Number(t.tagid))) err(id, `tagid ${t.tagid} 不存在`);
      else if (TAGS.get(Number(t.tagid)) !== t.en) err(id, `tagid ${t.tagid} 的 en 應為「${TAGS.get(Number(t.tagid))}」，寫成「${t.en}」`);
    }
    if (Array.isArray(e.sources)) {
      if (!e.sources.length) err(id, "sources 為空");
      for (const s of e.sources) {
        if (!s.url || !/^https?:\/\//.test(s.url)) err(id, `source url 不合法：${s.url}`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(s.accessed || "")) err(id, `source accessed 日期格式錯：${s.accessed}`);
      }
    }
    const text = JSON.stringify(e);
    const m = text.match(SIMP_STRICT);
    if (m) err(id, `疑似簡體字「${m[0]}」`);
    for (const w of ["视频","软件","信息","优化","默认","服务器","内存","网络","用户","数据","质量","设置"]) if (text.includes(w)) err(id, `中國用語／簡體「${w}」`);
  }
}
// related / compare 指向的 id 是否存在（跨檔）
for (const f of files) {
  const abs = path.isAbsolute(f) ? f : path.join(ROOT, f);
  let arr; try { arr = JSON.parse(fs.readFileSync(abs, "utf8").replace(/^﻿/, "")); } catch { continue; }
  if (!Array.isArray(arr)) continue;
  for (const e of arr) {
    for (const r of (e.related || [])) if (!allIds.has(r)) { console.log(`△ ${f} [${e.id}] related「${r}」目前不存在（其他檔可能會補）`); warns++; }
    for (const c of (e.compare || [])) if (c.with && !allIds.has(c.with)) { console.log(`△ ${f} [${e.id}] compare.with「${c.with}」目前不存在`); warns++; }
  }
}
console.log(`\n共 ${total} 條，錯誤 ${errors}，警告 ${warns}`);
process.exit(errors ? 1 : 0);
