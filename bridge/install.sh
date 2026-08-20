#!/usr/bin/env bash
#
# growth-agent-skills · 多工具一键分发脚本
#
# 用法:
#   bash bridge/install.sh --target workbuddy          # 装到 ~/.workbuddy/skills/
#   bash bridge/install.sh --target claude [--scope user|project]
#   bash bridge/install.sh --target codex              # 公共入口 ~/.agents/skills/(Codex 读取)
#   bash bridge/install.sh --target cursor             # 公共入口 ~/.agents/skills/(Cursor 读取)
#   bash bridge/install.sh --target agents             # 公共入口,覆盖 Codex/Cursor/Copilot/Gemini/Augment/Roo/OpenCode/OpenHands
#   bash bridge/install.sh --target hermes|kiro|qwen|cline|grok
#   bash bridge/install.sh --target all                # 一键装到所有已安装的客户端
#   bash bridge/install.sh --target workbuddy --dry-run   # 只显示会装到哪,不改动
#   bash bridge/install.sh --target workbuddy --force     # 覆盖已存在的同名 skill
#   bash bridge/install.sh --target workbuddy --uninstall # 卸载已安装的同名 skill
#
# 交互式安装(对非技术用户更友好):
#   bash bridge/install-interactive.sh
#
set -eo pipefail
# 注: 未启用 set -u(nounset)。原因: 在 macOS 默认 bash 3.2 下,
# 嵌套函数内 `local var="$X"` 配合 nounset 会出现“循环内可用、循环外报 unbound”
# 的兼容性 bug。本地安装脚本用 set -e + pipefail 已足够安全, 故不强依赖 nounset。

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SKILLS_DIR="$REPO_DIR/skills"

TARGET=""
DRY_RUN=false
FORCE=false
UNINSTALL=false
SCOPE="user"

usage() {
  sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target) TARGET="${2:-}"; shift 2;;
    --dry-run) DRY_RUN=true; shift;;
    --force) FORCE=true; shift;;
    --uninstall) UNINSTALL=true; shift;;
    --scope) SCOPE="${2:-user}"; shift 2;;
    -h|--help) usage 0;;
    *) echo "未知参数: $1" >&2; usage 1;;
  esac
done

[[ -z "$TARGET" ]] && { echo "❌ 必须指定 --target" >&2; usage 1; }
[[ ! -d "$SKILLS_DIR" ]] && { echo "❌ 找不到 skills/ 目录: $SKILLS_DIR" >&2; exit 1; }

# 客户端专属主目录是否已存在(未安装则跳过,避免为不存在的客户端建目录)
client_installed() {
  case "$1" in
    hermes) [[ -d "$HOME/.hermes" ]];;
    kiro)   [[ -d "$HOME/.kiro" ]];;
    qwen)   [[ -d "$HOME/.qwen" ]];;
    cline)  [[ -d "$HOME/.cline" ]];;
    grok)   [[ -d "$HOME/.grok" ]];;
    *) return 0;;
  esac
}

resolve_dir() {
  case "$1" in
    workbuddy) echo "$HOME/.workbuddy/skills";;
    claude)    [[ "$SCOPE" == "project" ]] && echo ".claude/skills" || echo "$HOME/.claude/skills";;
    codex|cursor|agents) echo "$HOME/.agents/skills";;
    hermes) echo "$HOME/.hermes/skills";;
    kiro)   echo "$HOME/.kiro/skills";;
    qwen)   echo "$HOME/.qwen/skills";;
    cline)  echo "$HOME/.cline/skills";;
    grok)   echo "$HOME/.grok/skills";;
    creator-upload) echo "$REPO_DIR/dist/upload";;
    *) echo "❌ 不支持的 target: $1（支持: workbuddy|claude|codex|cursor|agents|hermes|kiro|qwen|cline|grok|all）" >&2; exit 1;;
  esac
}

TARGETS=()
if [[ "$TARGET" == "all" ]]; then
  TARGETS=(workbuddy claude agents hermes kiro qwen cline grok)
else
  TARGETS=("$TARGET")
fi

echo "📦 源: $SKILLS_DIR"
[[ "$DRY_RUN" == true ]] && echo "🔍 dry-run 模式：不会实际写入"
[[ "$UNINSTALL" == true ]] && echo "🗑 uninstall 模式：将删除已安装的同名 skill"
echo "---------------------------------------------------"

package_upload_bundle() {
  local upload_dest
  upload_dest="$REPO_DIR/dist/upload"
  mkdir -p "$upload_dest"
  for skill_path in "$SKILLS_DIR"/*/; do
    local name="$(basename "$skill_path")"
    local d="$upload_dest/$name/.skill"
    echo "  → .skill 包: $d"
    $DRY_RUN || { mkdir -p "$d"; cp "$skill_path/SKILL.md" "$d/SKILL.md"; }
  done
  echo "  ✅ 创作者上传包已生成于: $upload_dest"
}

uninstall_one() {
  local tgt="$1"
  if ! client_installed "$tgt"; then
    echo "  ⏭  $tgt: 对应客户端未安装,跳过"
    return
  fi
  local dest; dest="$(resolve_dir "$tgt")"
  echo "🎯 卸载目标 ($tgt): $dest"
  local count=0
  for skill_path in "$SKILLS_DIR"/*/; do
    local name="$(basename "$skill_path")"
    local d="$dest/$name"
    if [[ ! -d "$d" ]]; then
      echo "  ⏭  未安装: $name"
      continue
    fi
    if $DRY_RUN; then
      echo "  - 将删除: $d"
    else
      rm -rf "$d"
      echo "  ✓ 已卸载: $name"
    fi
    count=$((count+1))
  done
  echo "  ✅ $tgt: $count 个 skill 已卸载"
}

install_one() {
  local tgt="$1"
  if [[ "$tgt" == "creator-upload" ]]; then package_upload_bundle; return; fi
  if ! client_installed "$tgt"; then
    echo "  ⏭  $tgt: 对应客户端未安装,跳过"
    return
  fi
  local dest; dest="$(resolve_dir "$tgt")"
  echo "🎯 目标 ($tgt): $dest"
  mkdir -p "$dest"
  local count=0
  for skill_path in "$SKILLS_DIR"/*/; do
    local name="$(basename "$skill_path")"
    local d="$dest/$name"
    if [[ -d "$d" && "$FORCE" != true ]]; then
      echo "  ⏭  跳过(已存在,用 --force 覆盖): $name"
      continue
    fi
    if $DRY_RUN; then
      echo "  + 将复制: $name → $d"
    else
      rm -rf "$d"
      cp -R "$skill_path" "$d"
      echo "  ✓ 已安装: $name"
    fi
    count=$((count+1))
  done
  echo "  ✅ $tgt: $count 个 skill 已处理"
}

for t in "${TARGETS[@]}"; do
  if [[ "$UNINSTALL" == true ]]; then
    uninstall_one "$t"
  else
    install_one "$t"
  fi
  echo "---------------------------------------------------"
done

if [[ "$UNINSTALL" == true ]]; then
  echo "✅ 卸载完成。"
else
  echo "✅ 完成。重启对应工具后,说'内容获客/起标题/不被推荐'等即可触发路由中枢。"
fi
