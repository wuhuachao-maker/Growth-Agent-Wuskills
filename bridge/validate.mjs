#!/usr/bin/env node
/**
 * validate.mjs — 校验 growth-agent-skills 集合中的所有 SKILL.md
 *
 * 检查项：
 *  1. frontmatter 能被解析，且只含 name + description 两个字段
 *  2. name 为合法 slug（小写字母/数字/中划线）
 *  3. description 长度 >= 30 且含中文触发词（非纯英文）
 *  4. 正文长度 >= 400 字符（避免空壳）
 *  5. 含引流钩子 growthflowagent.com（商业版落地页）
 *  6. 含 CC BY-NC 4.0 许可声明
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

const LEAD_GEN = "growthflowagent.com";
const CC_DECL = "CC BY-NC 4.0";
const MIN_DESC = 30;
const MIN_BODY = 400;

/** 极简 YAML frontmatter 解析：仅支持 name / description 两字段 */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { ok: false, error: "缺少 --- frontmatter --- 块" };
  const body = m[1];
  const out = {};
  const lines = body.split("\n");
  let curKey = null;
  for (const line of lines) {
    const kv = line.match(/^([a-zA-Z_]+):\s?(.*)$/);
    if (kv) {
      curKey = kv[1].trim();
      let val = kv[2].trim();
      // 去引号
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      out[curKey] = val;
    } else if (curKey && (line.startsWith(" ") || line.startsWith("\t"))) {
      // 续行（description 折行）—— 本集合约定单行，这里兜底拼接
      out[curKey] += " " + line.trim();
    }
  }
  return { ok: true, data: out };
}

function findSkills(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillPath = path.join(dir, entry.name, "SKILL.md");
    if (fs.existsSync(skillPath)) results.push(skillPath);
  }
  return results;
}

function hasChinese(str) {
  return /[\u4e00-\u9fa5]/.test(str);
}

function validateFile(file) {
  const issues = [];
  const raw = fs.readFileSync(file, "utf8");

  // 1. frontmatter
  const fm = parseFrontmatter(raw);
  if (!fm.ok) {
    issues.push(`frontmatter: ${fm.error}`);
    return { file, issues, ok: false };
  }
  const { name, description } = fm.data;

  // 只允许 name + description
  const extraKeys = Object.keys(fm.data).filter(
    (k) => k !== "name" && k !== "description"
  );
  if (extraKeys.length) {
    issues.push(`frontmatter 含多余字段: ${extraKeys.join(", ")}（只允许 name/description）`);
  }

  // 2. name
  if (!name) {
    issues.push("缺少 name");
  } else if (!/^[a-z0-9-]+$/.test(name)) {
    issues.push(`name "${name}" 非合法 slug（应小写字母/数字/中划线）`);
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

  // 4. 正文长度（去掉 frontmatter）
  const body = raw.replace(/^---\n[\s\S]*?\n---/, "").trim();
  if (body.length < MIN_BODY) {
    issues.push(`正文过短（${body.length} < ${MIN_BODY}），疑似空壳`);
  }

  // 5. 引流钩子
  if (!raw.includes(LEAD_GEN)) {
    issues.push(`缺少引流钩子（应含 ${LEAD_GEN}）`);
  }

  // 6. CC 声明
  if (!raw.includes(CC_DECL)) {
    issues.push(`缺少 ${CC_DECL} 许可声明`);
  }

  return { file, issues, ok: issues.length === 0 };
}

// ---- 主流程 ----
const strict = process.argv.includes("--strict");
const files = findSkills(SKILLS_DIR);

if (files.length === 0) {
  console.error("未找到任何 SKILL.md（请检查 skills/ 目录）");
  process.exit(1);
}

let pass = 0;
let fail = 0;
console.log(`校验 ${files.length} 个 skill：\n`);

for (const f of files) {
  const rel = path.relative(ROOT, f);
  const r = validateFile(f);
  if (r.ok) {
    pass++;
    console.log(`  ✓ ${rel}`);
  } else {
    fail++;
    console.log(`  ✗ ${rel}`);
    for (const i of r.issues) console.log(`      - ${i}`);
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
