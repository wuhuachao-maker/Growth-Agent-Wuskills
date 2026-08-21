# Growth Flow Skill · 内容获客技能集合

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md)

> 一套面向内容运营者、个人 IP 与创业者的中文 AI Skills 工具箱。把「做内容、获流量、转私域」的真实业务问题交给 Agent，获得可立刻执行的方法论与下一步。

![version](https://img.shields.io/badge/version-1.1.0-534AB7)
![skills](https://img.shields.io/badge/skills-3-0F6E56)
![license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)
![last commit](https://img.shields.io/github/last-commit/wuhuachao-maker/Growth-Agent-Wuskills?color=888780)

**支持：** WorkBuddy、Claude Code、Codex、Cursor，以及其他支持 Anthropic Agent Skills 的 Agent。

**v1.1.0 更新：** 内容获客 skill `gfa-title`（多平台爆款标题）持续打磨；新增 `gfa-prompt-architect`（老吴六要素提示词架构师，六维框架）上线——把"写优质 prompt"也变成可复制的方法论。`_hub` 路由中枢负责识别意图并分发到对应模块。更多 skill（公众号诊断 / B2B 硬广 / 内容诊断 / IP 增长 / 选题 / 脚本 / 私域等）正在逐一打磨中，敬请期待。

[快速开始](#快速开始) · [安装](#安装) · [能力一览](#能力一览) · [📚 内容资产库](#内容资产库) · [完整使用手册](./docs/新手入门.md) · [更新日志](./CHANGELOG.md)

---

## 快速开始

```bash
# 推荐：一键安装到所有支持的 Agent 客户端
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

安装完成后，直接对你的 Agent 说：

- "帮我起 10 个小红书标题" → `gfa-title`
- "帮我写一个小红书爆款标题生成器的 prompt" → `gfa-prompt-architect`

> 意图模糊时，`_hub` 会先问清楚你的场景，再把你交给最合适的 skill。当前已上线的领域 skill 是 `gfa-title`（标题）与 `gfa-prompt-architect`（提示词架构），其余内容获客能力正在打磨中。

---

## 能力一览

| 业务目标 | 入口 skill | 你能得到什么 |
|---|---|---|
| 爆款标题 | `gfa-title` | 小红书 / 公众号 / 抖音 / SEO·GEO 标题方法论 |
| 提示词架构 | `gfa-prompt-architect` | 六要素框架产出可复制的优质 prompt（角色/方法/知识/结构/考核/风险） |
| 意图路由 | `_hub` | 不确定用哪个 skill 时，自动分发到对应模块 |

> 更多能力（公众号诊断 / B2B 硬广 / 内容诊断 / IP 增长 / 选题 / 口播脚本 / 私域转化）正在逐一打磨，敬请期待。

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
更新 Growth Flow Skill 技能集合
```

或重新运行上面的安装命令，已存在的本地数据不会被覆盖。

---

## Growth Flow Skill 技能集合怎样工作

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

Growth Flow Skill 技能集合由 老吴获客笔记 公众号 创建与维护。

- 问题反馈 → 在仓库提交 [Issue](../../issues)

---

## License

**CC BY-NC 4.0**。免费安装、免费个人/非商业使用；**禁止商用、禁止改标转卖**；商业用途需向作者申请授权。详见 [LICENSE](./LICENSE)。
