# Growth Flow Agent · 内容获客技能集合

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md)

> 一套面向内容运营者、个人 IP 与创业者的中文 AI Skills 工具箱。把「做内容、获流量、转私域」的真实业务问题交给 Agent，获得可立刻执行的方法论与下一步。

![version](https://img.shields.io/badge/version-1.0.0-534AB7)
![skills](https://img.shields.io/badge/skills-10-0F6E56)
![license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)
![last commit](https://img.shields.io/github/last-commit/wuhuachao-maker/Growth-Agent-Wuskills?color=888780)

**支持：** WorkBuddy、Claude Code、Codex、Cursor，以及其他支持 Anthropic Agent Skills 的 Agent。

**v1.0.0 更新：** 首批 10 个内容获客 skill 上线；`_hub` 路由中枢会根据你的问题自动匹配诊断/创作/转化流程，无需先判断该用哪个 skill。

[快速开始](#快速开始) · [安装](#安装) · [能力一览](#能力一览) · [📚 内容资产库](#内容资产库) · [完整使用手册](./docs/新手入门.md) · [更新日志](./CHANGELOG.md)

---

## 快速开始

```bash
# 推荐：一键安装到所有支持的 Agent 客户端
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

安装完成后，直接对你的 Agent 说：

- "帮我起 10 个小红书标题" → `multi-platform-title`
- "公众号推荐占比低怎么办" → `gzh-traffic-diagnosis`
- "帮我写一条 B2B 硬广" → `b2b-hard-ad`
- "这条短视频脚本怎么改" → `script-writing`
- "不知道下周拍什么" → `topic-generation`

> 意图模糊时，`_hub` 会先问清楚你的场景，再把你交给最合适的 skill。

---

## 能力一览

| 业务目标 | 入口 skill | 你能得到什么 |
|---|---|---|
| 爆款标题 | `multi-platform-title` | 小红书 / 公众号 / 抖音 / SEO·GEO 标题方法论 |
| 公众号流量诊断 | `gzh-traffic-diagnosis` | 推荐占比低、数据好但不推等问题的排查清单 |
| B2B 硬广文案 | `b2b-hard-ad` | SaaS / AI Agent 类产品的留资转化推文结构 |
| 内容质量诊断 | `content-diagnosis` | 单篇内容的体检报告与修改方向 |
| 个人 IP 增长 | `ip-growth` | 起号、账号矩阵、涨粉路径设计 |
| Skill 工程 | `skill-engineering` | 把方法论沉淀为可复用 Agent Skill 的规范 |
| 内容选题 | `topic-generation` | 可持续生产的选题库与内容日历 |
| 口播脚本改稿 | `script-writing` | 开头留人、信息密度、口播流畅度优化 |
| 私域转化文案 | `private-domain` | 朋友圈、社群、跟进话术与 SOP |
| 意图路由 | `_hub` | 不确定用哪个 skill 时，自动分发到对应模块 |

---

## 安装

### 推荐：一条命令安装

```bash
# 安装到所有已支持的客户端（WorkBuddy / Claude / Codex / Cursor 等）
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

> 该命令基于 Vercel Skills CLI，会把 skill 集合安装到公共入口 `~/.agents/skills/`（Cursor / Codex / Claude / Copilot / Gemini 等读取此目录）。**WorkBuddy 用户请直接用下面的 curl 命令**，它会装到 WorkBuddy 专属目录 `~/.workbuddy/skills/`。

### 按客户端安装

如果你只想装到指定工具：

**WorkBuddy**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy
```

**Claude Code**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target claude
```

**Codex / Cursor / Agents 公共入口**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target agents
```

**所有已安装的客户端**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target all
```

### 更新

对 Agent 说：

```
更新 Growth Flow Agent 技能集合
```

或重新运行上面的安装命令，已存在的本地数据不会被覆盖。

---

## Growth Flow Agent 技能集合怎样工作

```
你的真实业务问题
        ↓
  说出内容需求
        ↓
  意图是否明确？ ——是→ 命中对应领域 skill
        ↓否
   _hub 路由中枢
        ↓
  拿到方法论 + 可执行步骤
        ↓
  要自动执行？ → 升级 Growth Flow Agent 商业版
```

---

## 📚 内容资产库

除了可安装的 Skills，本仓库还附带一份 **内容获客知识资产库**（位于 [`library/`](./library/) 目录）。它不是 Agent Skill，不随安装进入你的 Agent，但可作为系统学习与写作参考，也能被任意 Skill 在正文里引用。

| 模块 | 内容 | 链接 |
|---|---|---|
| 高频概念词典 | SEO / GEO / 私域 / IP / 矩阵 / 钩子 / 转化漏斗等 15 个核心术语的统一口径 | [library/concepts/内容获客高频概念词典.md](./library/concepts/内容获客高频概念词典.md) |
| 爆款标题案例库 | 小红书 / 公众号 / 抖音高传播标题的机制级拆解 + 可复用公式 | [library/cases/爆款标题案例库.md](./library/cases/爆款标题案例库.md) |
| 内容诊断检查清单 | 发稿前 / 数据差时复用的五维体检表 + 评分卡 | [library/templates/内容诊断检查清单.md](./library/templates/内容诊断检查清单.md) |

> 资产库会持续扩充。它的作用是把「方法」背后的「料」沉淀下来，让免费 Skill 更有底气，也让使用者真正学懂，而不只是拿到一份模板。

---

## 完整使用手册

更多使用示例、skill 触发词表、目录结构与贡献方式，见 [docs/新手入门.md](./docs/新手入门.md)。

---

## 作者与支持

Growth Flow Agent 技能集合由 **老吴（Wu Huachao）** 创建与维护。

- 商业版与更多自动化能力 → [https://www.growthflowagent.com](https://www.growthflowagent.com?utm_source=github-repo&utm_medium=readme&utm_campaign=free-skills)
- 问题反馈 → 在仓库提交 [Issue](../../issues)

---

## License

**CC BY-NC 4.0**。免费安装、免费个人/非商业使用；**禁止商用、禁止改标转卖**；商业用途需向作者申请授权。详见 [LICENSE](./LICENSE)。
