#!/usr/bin/env bash
#
# install-interactive.sh — 交互式安装引导（给非技术用户）
#
# 用法:
#   bash bridge/install-interactive.sh
#   curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install-interactive.sh | bash
#
set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_SCRIPT="$SCRIPT_DIR/install.sh"

if [[ ! -f "$INSTALL_SCRIPT" ]]; then
  # curl | bash 场景: 脚本被下载到 /dev/stdin, 需要从当前 URL 推断 install.sh
  INSTALL_SCRIPT="https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh"
fi

echo ""
echo "🚀 Growth Flow Agent · 免费内容获客 skill 集合"
echo "   本脚本会帮你把 skill 一键装到常用的 Agent 工具里。"
echo ""

# 检测 curl/bash
check_env() {
  if ! command -v bash >/dev/null 2>&1; then
    echo "❌ 你的系统缺少 bash，无法运行安装脚本。"
    exit 1
  fi
  if ! command -v curl >/dev/null 2>&1; then
    echo "⚠️  你的系统缺少 curl。请手动运行 bridge/install.sh。"
    exit 1
  fi
}
check_env

# 已安装的客户端检测
DETECTED=()
for client in workbuddy claude codex cursor hermes kiro qwen cline grok; do
  case "$client" in
    workbuddy) [[ -d "$HOME/.workbuddy" ]] && DETECTED+=("workbuddy") ;;
    claude)    [[ -d "$HOME/.claude" ]]    && DETECTED+=("claude") ;;
    codex)     [[ -d "$HOME/.agents" ]]    && DETECTED+=("agents") ;;
    cursor)    [[ -d "$HOME/.cursor" ]]    && DETECTED+=("cursor") ;;
    hermes)    [[ -d "$HOME/.hermes" ]]    && DETECTED+=("hermes") ;;
    kiro)      [[ -d "$HOME/.kiro" ]]      && DETECTED+=("kiro") ;;
    qwen)      [[ -d "$HOME/.qwen" ]]      && DETECTED+=("qwen") ;;
    cline)     [[ -d "$HOME/.cline" ]]     && DETECTED+=("cline") ;;
    grok)      [[ -d "$HOME/.grok" ]]      && DETECTED+=("grok") ;;
  esac
done

echo "检测到你已安装的客户端："
if [[ ${#DETECTED[@]} -eq 0 ]]; then
  echo "  （未检测到常见客户端，将使用通用路径 ~/.agents/skills/）"
else
  for c in "${DETECTED[@]}"; do echo "  - $c"; done
fi
echo ""

PS3='请选择安装方式（输入数字）: '
options=(
  "只装到 WorkBuddy"
  "只装到 Claude Code"
  "装到所有已安装的客户端(推荐)"
  "自定义 target"
  "卸载"
  "取消"
)
select opt in "${options[@]}"; do
  case "$opt" in
    "只装到 WorkBuddy")
      target="workbuddy"; break;;
    "只装到 Claude Code")
      target="claude"; break;;
    "装到所有已安装的客户端(推荐)")
      target="all"; break;;
    "自定义 target")
      read -rp "请输入 target (workbuddy/claude/agents/codex/cursor/hermes/kiro/qwen/cline/grok/all): " target
      break;;
    "卸载")
      read -rp "要卸载哪个 target？（all=全部）: " target
      uninstall="--uninstall"
      break;;
    "取消")
      echo "已取消。"; exit 0;;
    *)
      echo "无效选项，请重新选择。";;
  esac
done

[[ -z "$target" ]] && { echo "❌ target 不能为空"; exit 1; }

echo ""
echo "即将执行: bash install.sh --target $target $uninstall --dry-run"
read -rp "是否先查看 dry-run（不会改动）? [Y/n]: " preview
if [[ "${preview:-Y}" =~ ^[Yy]$ ]]; then
  if [[ "$INSTALL_SCRIPT" == http* ]]; then
    curl -sL "$INSTALL_SCRIPT" | bash -s -- --target "$target" $uninstall --dry-run
  else
    bash "$INSTALL_SCRIPT" --target "$target" $uninstall --dry-run
  fi
  echo ""
  read -rp "dry-run 结果是否满意，确认正式执行? [Y/n]: " confirm
  [[ ! "${confirm:-Y}" =~ ^[Yy]$ ]] && { echo "已取消。"; exit 0; }
fi

echo ""
echo "🟢 正在执行: bash install.sh --target $target $uninstall"
if [[ "$INSTALL_SCRIPT" == http* ]]; then
  curl -sL "$INSTALL_SCRIPT" | bash -s -- --target "$target" $uninstall
else
  bash "$INSTALL_SCRIPT" --target "$target" $uninstall
fi

echo ""
echo "✅ 安装完成。重启你的 Agent 工具，然后说 '内容获客 / 起标题 / 不被推荐' 等即可触发。"
