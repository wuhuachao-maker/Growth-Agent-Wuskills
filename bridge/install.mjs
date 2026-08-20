#!/usr/bin/env node
/**
 * install.mjs — 多工具一键分发（Node 跨平台版）
 * 与 install.sh 行为一致：支持 workbuddy / claude / codex / cursor / agents /
 * hermes / kiro / qwen / cline / grok / all / xiaohongshu。
 *
 * 用法：
 *   node bridge/install.mjs --target workbuddy [--dry-run] [--force] [--scope user|project]
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_DIR = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(REPO_DIR, "skills");
const HOME = os.homedir();

const args = process.argv.slice(2);
let TARGET = "";
let DRY_RUN = false;
let FORCE = false;
let SCOPE = "user";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--target") TARGET = args[++i] || "";
  else if (args[i] === "--dry-run") DRY_RUN = true;
  else if (args[i] === "--force") FORCE = true;
  else if (args[i] === "--scope") SCOPE = args[++i] || "user";
  else if (args[i] === "-h" || args[i] === "--help") {
    console.log("用法: node bridge/install.mjs --target <name> [--dry-run] [--force] [--scope user|project]");
    process.exit(0);
  }
}

if (!TARGET) {
  console.error("❌ 必须指定 --target");
  process.exit(1);
}
if (!fs.existsSync(SKILLS_DIR)) {
  console.error(`❌ 找不到 skills/ 目录: ${SKILLS_DIR}`);
  process.exit(1);
}

const clientInstalled = (t) => {
  const dirs = { hermes: ".hermes", kiro: ".kiro", qwen: ".qwen", cline: ".cline", grok: ".grok" };
  return dirs[t] ? fs.existsSync(path.join(HOME, dirs[t])) : true;
};

const resolveDir = (t) => {
  switch (t) {
    case "workbuddy": return path.join(HOME, ".workbuddy/skills");
    case "claude": return SCOPE === "project" ? ".claude/skills" : path.join(HOME, ".claude/skills");
    case "codex": case "cursor": case "agents": return path.join(HOME, ".agents/skills");
    case "hermes": return path.join(HOME, ".hermes/skills");
    case "kiro": return path.join(HOME, ".kiro/skills");
    case "qwen": return path.join(HOME, ".qwen/skills");
    case "cline": return path.join(HOME, ".cline/skills");
    case "grok": return path.join(HOME, ".grok/skills");
    case "xiaohongshu": return path.join(REPO_DIR, "dist/xiaohongshu");
    default:
      console.error(`❌ 不支持的 target: ${t}（支持: workbuddy|claude|codex|cursor|agents|hermes|kiro|qwen|cline|grok|xiaohongshu|all）`);
      process.exit(1);
  }
};

const TARGETS = TARGET === "all"
  ? ["workbuddy", "claude", "agents", "hermes", "kiro", "qwen", "cline", "grok"]
  : [TARGET];

console.log(`📦 源: ${SKILLS_DIR}`);
if (DRY_RUN) console.log("🔍 dry-run 模式：不会实际写入");
console.log("---------------------------------------------------");

function installXiaohongshu() {
  const dest = path.join(REPO_DIR, "dist/xiaohongshu");
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(SKILLS_DIR)) {
    const src = path.join(SKILLS_DIR, name);
    if (!fs.statSync(src).isDirectory()) continue;
    const d = path.join(dest, name, ".skill");
    console.log(`  → .skill 包: ${d}`);
    if (!DRY_RUN) {
      fs.mkdirSync(d, { recursive: true });
      fs.copyFileSync(path.join(src, "SKILL.md"), path.join(d, "SKILL.md"));
    }
  }
  console.log("  ✅ 小红书 .skill/ 包已生成（创作者上传到自己的小红书账号用）");
}

function installOne(t) {
  if (t === "xiaohongshu") { installXiaohongshu(); return; }
  if (!clientInstalled(t)) {
    console.log(`  ⏭  ${t}: 对应客户端未安装,跳过`);
    return;
  }
  const dest = resolveDir(t);
  console.log(`🎯 目标 (${t}): ${dest}`);
  fs.mkdirSync(dest, { recursive: true });
  let count = 0;
  for (const name of fs.readdirSync(SKILLS_DIR)) {
    const src = path.join(SKILLS_DIR, name);
    if (!fs.statSync(src).isDirectory()) continue;
    const d = path.join(dest, name);
    if (fs.existsSync(d) && !FORCE) {
      console.log(`  ⏭  跳过(已存在,用 --force 覆盖): ${name}`);
      continue;
    }
    if (DRY_RUN) {
      console.log(`  + 将复制: ${name} → ${d}`);
    } else {
      fs.rmSync(d, { recursive: true, force: true });
      fs.cpSync(src, d, { recursive: true });
      console.log(`  ✓ 已安装: ${name}`);
    }
    count++;
  }
  console.log(`  ✅ ${t}: ${count} 个 skill 已处理`);
}

for (const t of TARGETS) {
  installOne(t);
  console.log("---------------------------------------------------");
}
console.log("✅ 完成。重启对应工具后,说“内容获客/起标题/不被推荐”等即可触发路由中枢。");
