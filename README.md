# Growth Flow Skill · 内容获客技能集合

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md)

> 一套面向内容运营者、个人 IP 与创业者的中文 AI Skills 工具箱。把「做内容、获流量、转私域」的真实业务问题交给 Agent，获得可立刻执行的方法论与下一步。

![version](https://img.shields.io/badge/version-1.7.0-534AB7)
![skills](https://img.shields.io/badge/skills-6-0F6E56)
![license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)
![last commit](https://img.shields.io/github/last-commit/wuhuachao-maker/Growth-Agent-Wuskills?color=888780)

**支持：** WorkBuddy、Claude Code、Codex、Cursor，以及其他支持 Anthropic Agent Skills 的 Agent。

**v1.7.0 更新：** `gfa-title` 加上了封面能力——现在一轮里同时产出小红书 / 公众号 / 抖音三套标题，以及**人物主导 / 文字主导 / 场景主导三个强调版本**的视频封面提示词（9:16 与 16:9 各一套，含平台安全区与出图后逐字校验）。同时取消了默认的负面词输出：现在的生图模型足够稳，负面词多数是噪音，原来靠它兜的约束改成写进正向描述，只在出图真翻车时按症状对症追加。

[快速开始](#快速开始) · [安装](#安装) · [能力一览](#能力一览) · [技能分类](#技能分类) · [触发词速查](#触发词速查) · [📚 内容资产库](#内容资产库) · [完整使用手册](./docs/新手入门.md) · [📋 Skill 全目录](./docs/skills-全目录.md) · [更新日志](./CHANGELOG.md)

---

## 快速开始

```bash
# 推荐：一键安装到所有支持的 Agent 客户端
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

安装完成后，直接对你的 Agent 说：

- "帮我起 10 个小红书标题" → `gfa-title`
- "帮我写一个小红书爆款笔记生成器的 prompt" → `gfa-prompt-architect`
- "这篇笔记会不会被限流 / 帮我合规自查" → `gfa-content-risk`
- "帮我把这篇文章改成更容易被 AI 引用的版本" → `gfa-geo`
- "我的定位是什么 / 帮我做 IP 定位压力测试" → `gfa-position`

> 意图模糊时，`_hub` 会先问清楚你的场景，再把你交给最合适的 skill。当前已上线的领域 skill 是 `gfa-title`（标题）、`gfa-prompt-architect`（提示词架构）、`gfa-content-risk`（内容风险检查）、`gfa-geo`（GEO 内容改写）、`gfa-position`（IP 定位压力测试），其余内容获客能力正在打磨中。

---

## 能力一览

| 业务目标 | 入口 skill | 你能得到什么 |
|---|---|---|
| 爆款标题 + 封面 | `gfa-title` | 小红书 / 公众号 / 抖音 / SEO·GEO 标题方法论 + **人物 / 文字 / 场景三个强调版本**的 9:16·16:9 封面提示词（含平台安全区与出图后逐字校验） |
| 提示词架构 | `gfa-prompt-architect` | 六要素框架产出可复制的优质 prompt（角色/方法/知识/结构/考核/风险） |
| 内容风险检查 | `gfa-content-risk` | 发布前双轨扫描（机审+实质违规），给风险定位 + 最小修改动作 + 风险等级 |
| GEO 内容改写 | `gfa-geo` | 按 Princeton GEO 机制改写文章，提升在 ChatGPT / Perplexity / AI Overviews 中被引用率；口语化数据 + 出处附注 + 平台化模板 + 小白技术说明 |
| IP 定位压力测试 | `gfa-position` | 六道闸门拷问个人 / IP / 账号定位，给"哪道闸没过 + 欠什么答案 + 收窄方向"，不替你编定位；基于 JTBD 四力 + 定位理论 |
| 意图路由 | `_hub` | 不确定用哪个 skill 时，自动分发到对应模块 |

> 更多能力（公众号诊断 / B2B 硬广 / 内容诊断 / IP 增长 / 选题 / 口播脚本 / 私域转化）正在逐一打磨，敬请期待。

---

## 技能分类

本仓库采用 **物理扁平 + 逻辑三层分类**，兼顾所有 Agent 的加载兼容性与未来扩展性：

- **物理结构**：所有 skill 都放在 `skills/<slug>/` 扁平目录下，Agent 扫描此目录即可加载，**零兼容风险**（不嵌套子目录，避免部分客户端找不到 `SKILL.md`）。
- **逻辑分类**：靠三层组织，新增 skill 只需在**三处注册**，无需改动物理结构：
  1. `skills/skills.json` 的 `category` 字段
  2. 本 README 的「能力一览」+「技能分类」表
  3. `skills/_hub/SKILL.md` 的路由决策树

### 当前分类

| 分类 (category) | 说明 | 包含 skill |
|---|---|---|
| `content` | 内容获客类 | `gfa-title`、`gfa-content-risk`、`gfa-geo` |
| `methodology` | 方法论 / 工具类 | `gfa-prompt-architect`、`gfa-position` |
| `ops` | 通用工具类（校验 / 格式 / 分析） | （暂无） |
| `router` | 路由中枢 | `_hub` |

> 新增 skill 的标准动作（建目录 + 三处注册）见 [docs/如何增删skill.md](./docs/如何增删skill.md)。

---

## 触发词速查

| 你说 | 触发的 skill |
|---|---|
| "帮我起 10 个小红书标题" / "爆款标题" / "公众号标题怎么写" / "SEO 标题" / "帮我做张封面" / "封面提示词" | `gfa-title` |
| "帮我写一个 XX 生成器的 prompt" / "优化这个 prompt" / "提示词架构师" / "系统指令怎么写" | `gfa-prompt-architect` |
| "检查这篇会不会违规" / "发布前合规自查" / "标题党吗" / "会不会被限流" | `gfa-content-risk` |
| "GEO 优化" / "让 AI 能搜到我" / "提升 AI 引用率" / "帮我把文章改成 AI 爱引用的版本" | `gfa-geo` |
| "我的定位是什么" / "我该定位成什么" / "帮谁解决什么" / "凭什么找我" / "定位说不清" | `gfa-position` |
| "我想做内容获客" / "帮我看看账号怎么涨粉"（意图模糊） | `_hub` 路由分发 |

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

### 只安装某一个 skill（按需装）

不需要整个集合？只用其中一个能力（比如只想要 GEO 改写），两种方式任选：

**npx 方式（Claude / Codex / Cursor 等，`--skill` 指定）：**

```bash
# 只装 gfa-geo（GEO 内容改写）
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --skill gfa-geo -g

# 一次装多个（重复 --skill）
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --skill gfa-geo --skill gfa-title -g

# 先看仓库里有哪些 skill
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --list
```

**WorkBuddy / 指定客户端（curl 方式，`--skill` 指定）：**

```bash
# 只装 gfa-geo 到 WorkBuddy
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy --skill gfa-geo

# 只装到 Claude Code
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target claude --skill gfa-geo
```

> 可用 skill 名：`_hub`（路由中枢）、`gfa-title`（爆款标题）、`gfa-prompt-architect`（提示词架构）、`gfa-content-risk`（内容风险检查）、`gfa-geo`（GEO 内容改写）、`gfa-position`（IP 定位压力测试）。多个用逗号分隔：`--skill gfa-geo,gfa-title`。

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
| 资产索引（INDEX） | 全库目录 + SOT 权威口径 + 健康巡检规则 | [library/INDEX.md](./library/INDEX.md) |

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
