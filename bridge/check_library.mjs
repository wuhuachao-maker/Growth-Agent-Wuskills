#!/usr/bin/env node
/**
 * check_library.mjs — 内容资产健康巡检（P3）
 *
 * 规则（对齐 library/INDEX.md 第四节）：
 *   🔴 超 180 天未更新 → 建议回写或归档
 *   🟡 超 90 天未更新  → 下次引用时提示复核
 *   🟢 90 天内更新过
 *   ⚪ 未登记日期（提示补「最后更新：YYYY-MM-DD」或 frontmatter updated:）
 *
 * 扫描范围：library/ 下所有 .md（除 INDEX.md）+ skills/ 各 skill 的 references/ 目录下所有 .md
 * 日期来源：frontmatter `updated:` 或文件前 800 字符内 `最后更新：YYYY-MM-DD`
 *
 * 用法：
 *   node bridge/check_library.mjs          # 报告模式（exit 0，CI 安全）
 *   node bridge/check_library.mjs --strict # 有 🔴 时 exit 1（可选门禁）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");
const YELLOW_DAYS = 90;
const RED_DAYS = 180;
const RANK = { "🔴": 0, "🟡": 1, "⚪": 2, "🟢": 3 };

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, files);
    else if (ent.name.endsWith(".md")) files.push(p);
  }
  return files;
}

function parseDate(content) {
  const fm = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (fm) {
    const m = fm[1].match(/^updated:\s*(\d{4}-\d{2}-\d{2})/m);
    if (m) return new Date(m[1] + "T00:00:00Z");
  }
  const m = content.slice(0, 800).match(/最后更新[：:]\s*(\d{4}-\d{2}-\d{2})/);
  return m ? new Date(m[1] + "T00:00:00Z") : null;
}

const targets = [];
for (const f of walk(path.join(root, "library"))) {
  if (!f.endsWith("INDEX.md")) targets.push(f);
}
for (const ent of fs.readdirSync(path.join(root, "skills"), { withFileTypes: true })) {
  if (ent.isDirectory()) {
    targets.push(...walk(path.join(root, "skills", ent.name, "references")));
  }
}

const now = Date.now();
const rows = targets.map((f) => {
  const rel = path.relative(root, f);
  const d = parseDate(fs.readFileSync(f, "utf8"));
  if (!d) return { rel, status: "⚪", note: "未登记日期" };
  const days = Math.floor((now - d.getTime()) / 86400000);
  if (days > RED_DAYS) return { rel, status: "🔴", note: `已 ${days} 天未更新` };
  if (days > YELLOW_DAYS) return { rel, status: "🟡", note: `已 ${days} 天未更新` };
  return { rel, status: "🟢", note: d.toISOString().slice(0, 10) };
});

rows.sort((a, b) => (RANK[a.status] - RANK[b.status]) || a.rel.localeCompare(b.rel, "zh"));

console.log("内容资产健康巡检（90/180 天规则）\n");
for (const r of rows) console.log(`  ${r.status} ${r.rel.padEnd(52)} ${r.note}`);
const red = rows.filter((r) => r.status === "🔴").length;
const yellow = rows.filter((r) => r.status === "🟡").length;
const missing = rows.filter((r) => r.status === "⚪").length;
const green = rows.length - red - yellow - missing;
console.log(`\n共 ${rows.length} 个文件：🔴 ${red} · 🟡 ${yellow} · 🟢 ${green} · ⚪ ${missing}`);
if (red > 0) console.log("提示：🔴 文件建议尽快回写或归档（library/INDEX.md 第四节规则）");
if (missing > 0) console.log("提示：⚪ 文件请在开头补「最后更新：YYYY-MM-DD」（或 frontmatter updated:）");
if (strict && red > 0) process.exit(1);
