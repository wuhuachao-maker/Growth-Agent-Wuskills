#!/usr/bin/env bash
#
# growth-agent-skills · 多工具一键分发脚本
#
# 用法:
#   bash bridge/install.sh --target workbuddy          # 装到 ~/.workbuddy/skills/
#   bash bridge/install.sh --target claude [--scope user|project]
#   bash bridge/install.sh --target codex              # 装到 ~/.codex/skills/ 并注入 codex.md 适配层
#   bash bridge/install.sh --target xiaohongshu        # 产出 .skill/ 合规包到 dist/xiaohongshu/
#   bash bridge/install.sh --target workbuddy --dry-run   # 只显示会装到哪，不改动
#   bash bridge/install.sh --target workbuddy --force     # 覆盖已存在的同名 skill
#
set -euo pipefail

# ---- 路径 ----
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SKILLS_DIR="$REPO_DIR/skills"

# ---- 参数 ----
TARGET=""
DRY_RUN=false
FORCE=false
SCOPE="user"

usage() {
  sed -n '2,14p' "$0" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target) TARGET="${2:-}"; shift 2;;
    --dry-run) DRY_RUN=true; shift;;
    --force) FORCE=true; shift;;
    --scope) SCOPE="${2:-user}"; shift 2;;
    -h|--help) usage 0;;
    *) echo "未知参数: $1" >&2; usage 1;;
  esac
done

[[ -z "$TARGET" ]] && { echo "❌ 必须指定 --target" >&2; usage 1; }
[[ ! -d "$SKILLS_DIR" ]] && { echo "❌ 找不到 skills/ 目录: $SKILLS_DIR" >&2; exit 1; }

# ---- 目标目录解析 ----
case "$TARGET" in
  workbuddy) TARGET_DIR="$HOME/.workbuddy/skills" ;;
  claude)
    if [[ "$SCOPE" == "project" ]]; then TARGET_DIR=".claude/skills";
    else TARGET_DIR="$HOME/.claude/skills"; fi ;;
  codex) TARGET_DIR="$HOME/.codex/skills" ;;
  xiaohongshu) TARGET_DIR="$REPO_DIR/dist/xiaohongshu" ;;
  *) echo "❌ 不支持的 target: $TARGET（支持: workbuddy|claude|codex|xiaohongshu）" >&2; exit 1 ;;
esac

echo "📦 源: $SKILLS_DIR"
echo "🎯 目标 ($TARGET): $TARGET_DIR"
$DRY_RUN && echo "🔍 dry-run 模式：不会实际写入"
echo "---------------------------------------------------"

# ---- 小红书特殊处理：产出 .skill/ 合规包 ----
if [[ "$TARGET" == "xiaohongshu" ]]; then
  mkdir -p "$TARGET_DIR"
  for skill_path in "$SKILLS_DIR"/*/; do
    name="$(basename "$skill_path")"
    dest="$TARGET_DIR/$name/.skill"
    echo "  → .skill 包: $dest"
    $DRY_RUN || { mkdir -p "$dest"; cp "$skill_path/SKILL.md" "$dest/SKILL.md"; }
  done
  echo "---------------------------------------------------"
  echo "✅ 小红书 .skill/ 包已生成于: $TARGET_DIR"
  echo "   下一步：用小红书 minitool-zip-builder 校验并打包（见 README / 步骤 6）。"
  exit 0
fi

# ---- 常规分发（workbuddy / claude / codex） ----
mkdir -p "$TARGET_DIR"

count=0
for skill_path in "$SKILLS_DIR"/*/; do
  name="$(basename "$skill_path")"
  dest="$TARGET_DIR/$name"
  if [[ -d "$dest" && "$FORCE" != true ]]; then
    echo "  ⏭  跳过（已存在，用 --force 覆盖）: $name"
    continue
  fi
  if $DRY_RUN; then
    echo "  + 将复制: $name → $dest"
  else
    rm -rf "$dest"
    cp -R "$skill_path" "$dest"
    echo "  ✓ 已安装: $name"
  fi
  count=$((count+1))
done

# ---- codex 适配层（注入 codex.md，让其弱 skill 支持能发现本集合） ----
if [[ "$TARGET" == "codex" && "$DRY_RUN" != true ]]; then
  CODEX_MD="$HOME/.codex/codex.md"
  {
    echo ""
    echo "## Growth Flow Agent 内容获客技能集合（CC BY-NC 4.0 免费版）"
    echo "以下 skill 位于 ~/.codex/skills/，按需加载对应目录的 SKILL.md："
    for skill_path in "$SKILLS_DIR"/*/; do
      n="$(basename "$skill_path")"
      echo "- $n → 读取 ~/.codex/skills/$n/SKILL.md"
    done
    echo "路由中枢：先读 growth-content-hub 的 SKILL.md 判断意图，再加载对应领域 skill。"
  } >> "$CODEX_MD"
  echo "  ✓ 已向 $CODEX_MD 注入技能索引（如已存在则追加）"
fi

echo "---------------------------------------------------"
echo "✅ 完成：$count 个 skill 已处理 → $TARGET_DIR"
echo "   重启对应工具后，说'内容获客/起标题/不被推荐'等即可触发路由中枢。"
