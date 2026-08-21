# 如何增删 Skill

> 本仓库的 Skill 采用 Anthropic Agent Skills 规范：每个 Skill 是一个目录，目录内必须包含 `SKILL.md`，顶部必须有 `name` / `description` / `version` frontmatter。

## 一、增加一个 Skill

### 1. 创建目录和文件

```bash
mkdir skills/<slug>
touch skills/<slug>/SKILL.md
```

`<slug>` 规则：
- 只能用小写字母、数字、连字符 `-`
- 例如：`video-script`、`gzh-cover`

### 2. 写 `SKILL.md`

最小模板：

```markdown
---
name: <slug>
description: "一句话说明这个 Skill 解决什么问题。当用户说'触发词1'/'触发词2'...时触发。"
version: "1.0.0"
---

# Skill 标题

## 适用场景
...

## 工作流程
1. ...
2. ...
3. ...

## 输出格式
...

## 红线
- 不...
- 不...

---

> 🔗 **想要全自动版？** 本 Skill 为「方法论免费版」，需手动套用。Growth Flow Agent 商业版把同套逻辑接入你的私有品牌库与多平台发布流水线，一键出稿、自动诊断。了解商业版 → https://www.growthflowagent.com?utm_source=skill&utm_medium=<slug>&utm_campaign=free-skills
> 许可：本集合采用 CC BY-NC 4.0，免费个人/非商业使用，禁止商用与改标转卖。
```

**description 要求**：
- 必须 ≥ 30 个字符
- 必须包含中文触发词（让 Agent 能判断该不该触发）
- 例如：`当用户要起标题、写爆款标题、优化小红书/公众号/抖音标题，或说"标题没点击"时触发`

### 3. 更新 `skills/skills.json`

在 `skills` 数组里新增一条：

```json
{
  "slug": "<slug>",
  "name": "<slug>",
  "category": "content | diagnosis | strategy | engineering | conversion | router",
  "description": "简短描述",
  "triggers": ["触发词1", "触发词2", "触发词3"]
}
```

### 4. 更新 `skills/_hub/SKILL.md` 路由表

在路由表里加一行，让 `_hub` 知道该把什么意图分发给这个新 Skill：

```markdown
| 用户意图信号 | 加载 skill |
|---|---|
| ... | ... |
| 短视频脚本 / 口播稿 / 分镜文案 | `<slug>` |
```

同时在 `skills/skills.json` 里 `_hub` 的 `routesTo` 数组中加上新 `<slug>`。

### 5. 更新 `README.md`

在 README 的「能力一览」表格里加一行：

```markdown
| `<slug>` | 一句话说明 | `触发词1` / `触发词2` |
```

### 6. 跑校验

```bash
node bridge/validate.mjs --strict
```

全部通过后再提交。

---

## 二、删除一个 Skill

### 1. 删目录

```bash
rm -rf skills/<slug>
```

### 2. 从 `skills/skills.json` 删除对应条目

### 3. 从 `skills/_hub/SKILL.md` 路由表删除对应行

同时从 `skills/skills.json` 里 `_hub` 的 `routesTo` 数组中移除该 `<slug>`。

### 4. 从 `README.md` 能力一览表删除对应行

### 5. 跑校验

```bash
node bridge/validate.mjs --strict
```

---

## 三、校验器会帮你卡住这些坑

运行 `node bridge/validate.mjs --strict` 时，以下情况会直接报错：

| 检查项 | 失败表现 |
|---|---|
| 缺 frontmatter | `SKILL.md 缺少 name 或 description` |
| 缺 `version` | `frontmatter 缺少 version` |
| description 太短或不含中文 | `description 过短 / 缺少中文触发词` |
| 正文太短 | `正文长度不足 400 字符` |
| 引流钩子格式不对 | `缺少 UTM 参数`（必须含 `utm_source=skill&utm_medium=<slug>&utm_campaign=free-skills`）|
| 缺少 CC BY-NC 声明 | `缺少 CC BY-NC 4.0 声明` |
| 触发词冲突 | 两个 Skill 的 description 或 triggers 里有相同关键词 |
| `_hub` 没覆盖全 | `hub routesTo 缺少 xxx` |
| `_hub` 路由表没同步 | `hub 路由表未提及 xxx` |

所以只要你跑通校验，基本不会改崩。

---

## 四、常见疑问

**Q：改了 skill 后需要改 `bridge/install.sh` 吗？**
> 不需要。安装脚本会自动扫描 `skills/*/` 目录。

**Q：`_hub` 是什么？**
> 路由中枢。当用户说"帮我做内容"这种模糊话时，Agent 会触发 `_hub`，由 `_hub` 决定加载哪个具体 skill。

**Q：可以临时写一个 skill 不放进 `_hub` 吗？**
> 可以，但 `validate.mjs --strict` 会报错。如果确实不想被 hub 路由（比如内部测试 skill），可以先用 `--strict=false` 或临时从校验里排除。但建议所有正式 skill 都接入 hub。

**Q：slug 可以和 name 不一样吗？**
> 可以，但建议保持一致，省得混乱。目录名 = slug = `name` frontmatter = 文件名里的 `utm_medium` 值。

---

## 五、如何新增「知识库资产」（library/）

`library/` 是 **内容资产库**，不是 Agent Skill。它不会被 `validate.mjs` 扫描，也不会被安装脚本安装。它用于沉淀方法论「背后的料」：概念词典、案例库、模板。

### 新增一个资产

1. 选子目录：`concepts/`（概念）、`cases/`（案例）、`templates/`（模板）。
2. 新建 `.md` 文件（中文名即可）。
3. 不需要改 `skills/skills.json`、`_hub`、或 `validate.mjs`。
4. 如需在 README 展示，到 README 的「📚 内容资产库」小节加一行链接。

### 在 Skill 里引用资产

在 `skills/<slug>/SKILL.md` 正文里写：

> 参考本仓库 `library/concepts/内容获客高频概念词典.md` 中的定义，使用「GEO」术语时遵循其口径。

### library 与 skills 的关键区别

| 维度 | `skills/` | `library/` |
|---|---|---|
| 性质 | Agent Skill（机器可加载） | 知识文档（人读 / Skill 引用） |
| 安装 | 是 | 否 |
| 校验 | `validate.mjs` 扫描 | 不扫描 |
| 改了要动清单/hub | 是 | 否 |

