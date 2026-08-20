#!/usr/bin/env node
/**
 * validate.mjs — 校验 growth-agent-skills 集合中的所有 SKILL.md
 *
 * 检查项：
 *  1. frontmatter 能被解析，且含 name / description / version
 *  2. name 为合法 slug（小写字母/数字/中划线）
 *  3. description 长度 >= 30 且含中文触发词（非纯英文）
 *  4. 正文长度 >= 400 字符（避免空壳）
 *  5. 含引流钩子 growthflowagent.com，且带 UTM 参数
 *  6. 含 CC BY-NC 4.0 许可声明
 *  7. skills/skills.json 清单与目录一致
 *  8. 非 hub skill 之间触发词不冲突
 *  9. hub 路由表覆盖所有领域 skill
 *
 * 用法：
 *   node bridge/validate.mjs
 *   node bridge/validate.mjs --strict   （任一失败即 exit 1）
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const MANIFEST_PATH = path.join(SKILLS_DIR, "skills.json");

const LEAD_GEN_HOST = "growthflowagent.com";
const CC_DECL = "CC BY-NC 4.0";
const MIN_DESC = 30;
const MIN_BODY = 400;

/** 极简 YAML frontmatter 解析：支持 name / description / version 等单行字段 */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { ok: false, error: "缺少 --- frontmatter --- 块" };
  const body = m[1];
  const out = {};
  const lines = body.split("\n");
  let curKey = null;
  for (const line of lines) {
    const kv = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s?(.*)$/);
    if (kv) {
      curKey = kv[1].trim();
      let val = kv[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      out[curKey] = val;
    } else if (curKey && (line.startsWith(" ") || line.startsWith("\t"))) {
      // 续行兜底拼接
      out[curKey] += " " + line.trim();
    }
  }
  return { ok: true, data: out };
}

function findSkillSlugs(dir) {
  const slugs = [];
  if (!fs.existsSync(dir)) return slugs;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillPath = path.join(dir, entry.name, "SKILL.md");
    if (fs.existsSync(skillPath)) slugs.push(entry.name);
  }
  return slugs.sort();
}

function hasChinese(str) {
  return /[\u4e00-\u9fa5]/.test(str);
}

function validateFile(file, manifestMap) {
  const issues = [];
  const raw = fs.readFileSync(file, "utf8");
  const slug = path.basename(path.dirname(file));

  // 1. frontmatter
  const fm = parseFrontmatter(raw);
  if (!fm.ok) {
    issues.push(`frontmatter: ${fm.error}`);
    return { file, issues, ok: false };
  }
  const { name, description, version } = fm.data;

  const allowedKeys = new Set(["name", "description", "version"]);
  const extraKeys = Object.keys(fm.data).filter((k) => !allowedKeys.has(k));
  if (extraKeys.length) {
    issues.push(`frontmatter 含未知字段: ${extraKeys.join(", ")}`);
  }

  // 2. name
  if (!name) {
    issues.push("缺少 name");
  } else if (!/^[a-z0-9-]+$/.test(name)) {
    issues.push(`name "${name}" 非合法 slug（应小写字母/数字/中划线）`);
  } else if (manifestMap.has(slug) && manifestMap.get(slug).name !== name) {
    issues.push(`name "${name}" 与 skills.json 中 "${manifestMap.get(slug).name}" 不一致`);
  }

  // 3. description
  if (!description) {
    issues.push("缺少 description");
  } else {
    if (description.length < MIN_DESC) {
      issues.push(`description 过短（${description.length} < ${MIN_DESC}）`);
    }
    if (!hasChinese(description)) {
      issues.push("description 缺中文触发词（不利路由）");
    }
  }

  // 4. version
  if (!version) {
    issues.push("缺少 version（建议 1.0.0）");
  } else if (!/^\d+\.\d+\.\d+/.test(version)) {
    issues.push(`version "${version}" 格式不规范（建议语义化版本 1.0.0）`);
  }

  // 5. 正文长度（去掉 frontmatter）
  const body = raw.replace(/^---\n[\s\S]*?\n---/, "").trim();
  if (body.length < MIN_BODY) {
    issues.push(`正文过短（${body.length} < ${MIN_BODY}），疑似空壳`);
  }

  // 6. 引流钩子 + UTM
  if (!raw.includes(LEAD_GEN_HOST)) {
    issues.push(`缺少引流钩子（应含 ${LEAD_GEN_HOST}）`);
  } else {
    const expectedMedium = `utm_medium=${slug}`;
    if (!raw.includes("utm_source=skill")) {
      issues.push("引流钩子缺少 utm_source=skill");
    }
    if (!raw.includes(expectedMedium)) {
      issues.push(`引流钩子 utm_medium 应为 ${slug}`);
    }
    if (!raw.includes("utm_campaign=free-skills")) {
      issues.push("引流钩子缺少 utm_campaign=free-skills");
    }
  }

  // 7. CC 声明
  if (!raw.includes(CC_DECL)) {
    issues.push(`缺少 ${CC_DECL} 许可声明`);
  }

  return { file, issues, ok: issues.length === 0 };
}

function validateManifest(slugs) {
  const issues = [];
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch (e) {
    issues.push(`skills.json 解析失败: ${e.message}`);
    return { ok: false, issues, manifest: null, map: new Map() };
  }

  if (!manifest.skills || !Array.isArray(manifest.skills)) {
    issues.push("skills.json 缺少 skills 数组");
    return { ok: false, issues, manifest, map: new Map() };
  }

  const map = new Map();
  const manifestSlugs = [];
  for (const s of manifest.skills) {
    if (!s.slug) {
      issues.push("manifest 中存在缺少 slug 的条目");
      continue;
    }
    manifestSlugs.push(s.slug);
    map.set(s.slug, s);
  }

  const dirOnly = slugs.filter((s) => !manifestSlugs.includes(s));
  const manifestOnly = manifestSlugs.filter((s) => !slugs.includes(s));
  if (dirOnly.length) {
    issues.push(`skills/ 目录存在但未在 manifest 登记: ${dirOnly.join(", ")}`);
  }
  if (manifestOnly.length) {
    issues.push(`manifest 登记但 skills/ 目录不存在: ${manifestOnly.join(", ")}`);
  }

  // 触发词冲突检查（排除 _hub）
  const triggerToSkill = new Map();
  for (const s of manifest.skills) {
    if (s.slug === "_hub") continue;
    for (const t of s.triggers || []) {
      const normalized = t.trim().toLowerCase();
      if (triggerToSkill.has(normalized)) {
        issues.push(`触发词冲突: "${t}" 同时属于 ${triggerToSkill.get(normalized)} 和 ${s.slug}`);
      } else {
        triggerToSkill.set(normalized, s.slug);
      }
    }
  }

  // hub 覆盖检查
  const hub = manifest.skills.find((s) => s.slug === "_hub");
  if (!hub) {
    issues.push("manifest 缺少 _hub 路由中枢");
  } else {
    const domainSlugs = manifest.skills.filter((s) => s.slug !== "_hub").map((s) => s.slug);
    const missingRoutes = domainSlugs.filter((s) => !(hub.routesTo || []).includes(s));
    if (missingRoutes.length) {
      issues.push(`_hub routesTo 未覆盖: ${missingRoutes.join(", ")}`);
    }
  }

  return { ok: issues.length === 0, issues, manifest, map };
}

// ---- 主流程 ----
const strict = process.argv.includes("--strict");
const slugs = findSkillSlugs(SKILLS_DIR);

if (slugs.length === 0) {
  console.error("未找到任何 SKILL.md（请检查 skills/ 目录）");
  process.exit(1);
}

const { ok: manifestOk, issues: manifestIssues, map: manifestMap } = validateManifest(slugs);

let pass = 0;
let fail = 0;
console.log(`校验 ${slugs.length} 个 skill：\n`);

for (const slug of slugs) {
  const file = path.join(SKILLS_DIR, slug, "SKILL.md");
  const rel = path.relative(ROOT, file);
  const r = validateFile(file, manifestMap);
  if (r.ok) {
    pass++;
    console.log(`  ✓ ${rel}`);
  } else {
    fail++;
    console.log(`  ✗ ${rel}`);
    for (const i of r.issues) console.log(`      - ${i}`);
  }
}

if (manifestIssues.length) {
  fail += manifestIssues.length;
  console.log(`  ✗ skills/skills.json`);
  for (const i of manifestIssues) console.log(`      - ${i}`);
} else {
  console.log(`  ✓ skills/skills.json`);
  pass++;
}

// hub 路由表覆盖检查：hub SKILL.md 正文应出现所有领域 skill slug
const hubFile = path.join(SKILLS_DIR, "_hub", "SKILL.md");
if (fs.existsSync(hubFile) && manifestOk) {
  const hubRaw = fs.readFileSync(hubFile, "utf8");
  const domainSlugs = Array.from(manifestMap.values())
    .filter((s) => s.slug !== "_hub")
    .map((s) => s.slug);
  const missingInHub = domainSlugs.filter((s) => !hubRaw.includes(s));
  if (missingInHub.length) {
    fail++;
    console.log(`  ✗ skills/_hub/SKILL.md`);
    console.log(`      - 路由表未提及: ${missingInHub.join(", ")}`);
  } else {
    console.log(`  ✓ skills/_hub/SKILL.md 路由覆盖完整`);
    pass++;
  }
}

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);

// 同时校验 README 与 LICENSE 是否存在
const readme = path.join(ROOT, "README.md");
const license = path.join(ROOT, "LICENSE");
console.log(`\n仓库必备文件：`);
console.log(`  ${fs.existsSync(readme) ? "✓" : "✗"} README.md`);
console.log(`  ${fs.existsSync(license) ? "✓" : "✗"} LICENSE`);

if (fail > 0 || !fs.existsSync(readme) || !fs.existsSync(license)) {
  if (strict) process.exit(1);
}
process.exit(0);
