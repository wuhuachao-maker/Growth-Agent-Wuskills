#!/usr/bin/env node
/**
 * growth-agent-skills · 多工具一键分发脚本（Node 版，跨平台）
 *
 * 用法:
 *   node bridge/install.mjs --target workbuddy
 *   node bridge/install.mjs --target claude [--scope user|project]
 *   node bridge/install.mjs --target codex
 *   node bridge/install.mjs --target xiaohongshu
 *   node bridge/install.mjs --target workbuddy --dry-run
 *   node bridge/install.mjs --target workbuddy --force
 */
import { existsSync, mkdirSync, readdirSync, cpSync, rmSync, appendFileSync, writeFileSync, readFileSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_DIR = resolve(__dirname, '..');
const SKILLS_DIR = join(REPO_DIR, 'skills');

function parseArgs(argv) {
  const o = { target: '', dryRun: false, force: false, scope: 'user' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--target') o.target = argv[++i] || '';
    else if (a === '--dry-run') o.dryRun = true;
    else if (a === '--force') o.force = true;
    else if (a === '--scope') o.scope = argv[++i] || 'user';
    else if (a === '-h' || a === '--help') { console.log('用法见 install.sh 头部注释'); process.exit(0); }
    else { console.error('未知参数: ' + a); process.exit(1); }
  }
  return o;
}

const o = parseArgs(process.argv.slice(2));
if (!o.target) { console.error('❌ 必须指定 --target'); process.exit(1); }
if (!existsSync(SKILLS_DIR)) { console.error('❌ 找不到 skills/ 目录: ' + SKILLS_DIR); process.exit(1); }

function resolveTargetDir(t, scope) {
  switch (t) {
    case 'workbuddy': return join(homedir(), '.workbuddy', 'skills');
    case 'claude': return scope === 'project' ? join('.claude', 'skills') : join(homedir(), '.claude', 'skills');
    case 'codex': return join(homedir(), '.codex', 'skills');
    case 'xiaohongshu': return join(REPO_DIR, 'dist', 'xiaohongshu');
    default: console.error('❌ 不支持的 target: ' + t); process.exit(1);
  }
}

const TARGET_DIR = resolveTargetDir(o.target, o.scope);
console.log('📦 源: ' + SKILLS_DIR);
console.log('🎯 目标 (' + o.target + '): ' + TARGET_DIR);
if (o.dryRun) console.log('🔍 dry-run 模式：不会实际写入');
console.log('---------------------------------------------------');

// 列出 skills/*/ 目录
const skillNames = readdirSync(SKILLS_DIR).filter((n) => {
  const p = join(SKILLS_DIR, n);
  return statSync(p).isDirectory() && existsSync(join(p, 'SKILL.md'));
});

if (o.target === 'xiaohongshu') {
  mkdirSync(TARGET_DIR, { recursive: true });
  for (const name of skillNames) {
    const dest = join(TARGET_DIR, name, '.skill');
    console.log('  → .skill 包: ' + dest);
    if (!o.dryRun) { mkdirSync(dest, { recursive: true }); cpSync(join(SKILLS_DIR, name, 'SKILL.md'), join(dest, 'SKILL.md')); }
  }
  console.log('---------------------------------------------------');
  console.log('✅ 小红书 .skill/ 包已生成于: ' + TARGET_DIR);
  console.log('   下一步：用小红书 minitool-zip-builder 校验并打包。');
  process.exit(0);
}

mkdirSync(TARGET_DIR, { recursive: true });
let count = 0;
for (const name of skillNames) {
  const dest = join(TARGET_DIR, name);
  if (existsSync(dest) && !o.force) { console.log('  ⏭  跳过（已存在，用 --force 覆盖）: ' + name); continue; }
  if (o.dryRun) { console.log('  + 将复制: ' + name + ' → ' + dest); }
  else { rmSync(dest, { recursive: true, force: true }); cpSync(join(SKILLS_DIR, name), dest, { recursive: true }); console.log('  ✓ 已安装: ' + name); }
  count++;
}

if (o.target === 'codex' && !o.dryRun) {
  const codexMd = join(homedir(), '.codex', 'codex.md');
  let idx = '\n## Growth Flow Agent 内容获客技能集合（CC BY-NC 4.0 免费版）\n以下 skill 位于 ~/.codex/skills/，按需加载对应目录的 SKILL.md：\n';
  for (const n of skillNames) idx += `- ${n} → 读取 ~/.codex/skills/${n}/SKILL.md\n`;
  idx += '路由中枢：先读 growth-content-hub 的 SKILL.md 判断意图，再加载对应领域 skill。\n';
  appendFileSync(codexMd, idx);
  console.log('  ✓ 已向 ' + codexMd + ' 注入技能索引（如已存在则追加）');
}

console.log('---------------------------------------------------');
console.log(`✅ 完成：${count} 个 skill 已处理 → ${TARGET_DIR}`);
console.log('   重启对应工具后，说“内容获客/起标题/不被推荐”等即可触发路由中枢。');
