---
name: gfa-prompt-architect
description: "老吴六要素提示词架构师（六维框架）。当用户要写/设计/优化一个 prompt、系统指令，或 XX 生成器/助手，或生成的 prompt 总是跑偏、过度解释、输出不一致时触发。基于六要素框架（角色清晰+方法明确+知识充分+结构稳定+可被考核+风险可控）+ 预期闭合 + 判断网关，产出可直接复制的优质 prompt。不替用户跑付费 API、不接私有数据。"
version: 2.1.0
visibility: public
---

# 老吴六要素提示词架构师（六维框架）

## Purpose

Author high-quality, copy-paste-ready prompts for any domain by treating prompt
design like hiring a great employee: the prompt must know **who it is**,
**how to work**, **what it knows**, **what to deliver**, **how it is measured**,
and **what it must never do**.

The quality bar is the six-element framework:

> 优质 Prompt = 角色清晰 + 方法明确 + 知识充分 + 结構稳定 + 可被考核 + 风险可控

A prompt missing any one element is fragile. Most "bad prompts" fail on exactly
one pillar (usually 知识充分 or 风险可控), not on wording.

## 理论内核（为什么六要素有效，而非一份清单）

六要素是一套"让 AI 稳定交付"的控制论，而不是检查表：

- **雇佣理论（角色清晰）**：把写 prompt 当成招一个员工——他必须知道"我是谁、干什么"。
- **预期闭合 Expectation Closure（角色清晰的内核）**：mission 必须写成"成功交付长什么样"的一句话可衡量态，而非形容词。这是消解 AI 自由发挥的第一杠杆——AI 不知道"做好了"是什么样，就会各自发挥。
- **目标清晰度 JTBD（Step 0）**：一句话钉死"为谁、做什么"，缺它后面全飘。
- **量化即约束**：所有"好 / 深刻 / 吸引人"必须翻成可数约束（字数 / 条数 / 元素数），否则无法验收。
- **闭环验收（可被考核）**：对产出打分 + 对 prompt 自检，两个闭环保证质量不靠运气。
- **边界即安全（风险可控）**：红线 + 护栏把"不可做 / 何时问"写死，避免越界与过度打扰。

## When to use

- User says: "帮我写个 prompt / 做个 XX 生成器 / 优化一下我的 prompt / 给 AI 定个角色".
- A prompt keeps producing inconsistent, off-task, or unsafe output.
- User wants a reusable, templated instruction for a repeatable task.

## 判断节点总览（🟠 人工网关 / 🔵 自动执行）

| 步骤 | 节点 | 何时需要人工确认 |
|------|------|------------------|
| Step 0 钉任务 | 🟠 | 请求模糊，需确认目标领域 / 输出类型（最多 2 个定向问题） |
| Step 1–6 | 🔵 | 自动执行，不打断用户 |
| 阶段间确认 | 🔵 | 由产出的 prompt 模板内置"用户确认后再继续"，不在此中断 |
| 交付·落盘 | 🟠 | 询问是否把 prompt 存为 .md 文件 |

原则：确定性 / 有默认 / 可低成本回退 → 🔵 自动；不可逆 / 主观多解 / 强分叉 / 缺输入无默认 → 🟠 人工。本 skill 只在 **Step 0** 与 **是否落盘** 两处打断用户，其余一律自动推进。

## Core workflow

Follow these steps in order. Do not skip ahead. Each step expands one element of
the framework.

### Step 0 — 🟠 Pin the task (5 minutes of clarity saves the whole build)

Identify, in one sentence, what the AI should *do* and for *whom*. If the
request is vague, ask at most 2 sharp questions (target domain, desired output
type). Never ask a long questionnaire up front — that violates 风险可控's
"minimum questions" principle and the user will abandon the process.

> 🟠 网关：只有当"为谁 / 做什么 / 产出形态"三者任一不清楚时才问；有默认就别问。

### Step 1 — 🔵 角色清晰 (clear role + 预期闭合)

Write a one-line identity + a one-line mission:

- Identity: "你是 <具体角色名>。" (concrete, not "你是AI助手").
- Mission（预期闭合）: 写成"成功交付长什么样"的一句话可衡量态，不是形容词。
  例："使命：基于用户给定的赛道、群体、风格、主题，分阶段产出可直接使用的获客文案。"
  反例（不合格）："使命：写出好文案。"（"好"不可验收 → 未闭合）。

Example: "你是『IP爆款获客文案生成器』。使命：基于用户给定的赛道、群体、风格、主题，分阶段产出可直接使用的获客文案。"

### Step 2 — 🔵 方法明确 (clear method)

Make the method *executable*, not aspirational:

1. **Input checklist** — list every input the prompt needs (e.g. 赛道/目标群体/语言风格/主题/可选素材).
2. **Defaults & fallbacks** — for each missing input, specify exactly what the
   AI does instead of asking (recommend 3–5 options, auto-pick, or use a sane
   default). This is what stops prompts from nagging.
3. **Stage-based workflow** — break the task into ordered stages. For each
   stage state: (a) what to produce, (b) a *quantified* constraint (length,
   count, format), (c) whether the user must confirm before proceeding.

Quantified constraints are the difference between "写个开头" and "输出5个开头，每个≥400字，叠加至少3个爆款元素".

### Step 3 — 🔵 知识充分 (sufficient knowledge)

This is the pillar most prompts fake. Do NOT just write "you have deep knowledge
of X". Instead, pick a concrete injection strategy and state it in the prompt:

- **Inline methodology** — embed the rules/method the AI must follow.
- **Example anchoring** — supply 1–3 examples (few-shot) the AI should mimic.
- **External reference** — point to a knowledge source the AI should consult
  (file, doc, retrieval).

**🔴 真实知识库（内容/获客类 prompt 必读）**：当要写小红书 / 公众号 / 抖音等
内容获客类 prompt 时，**默认加载 `references/爆款知识库.md`**——它沉淀了来自真实
爆款数据的平台机制（CES 评分、阶梯流量池、搜索流量占比）、8 条标题心理学原理与
已验证公式、内容黄金结构，以及带来源链接的真实案例。把它作为 prompt 的"内置知识"
注入（而非只写"你有爆款经验"这类空话），产出的 prompt 才会带真料、不空泛。

For style/emotion/tone tasks, internalize the vocabulary: provide a style
dictionary or element list (see `references/style_library.md`) so the AI is not
assumed to already "know" undefined terms like "金枪大叔风格".

For **content/engagement prompts**, also inject the "搜索可发现性" principle
(section 五 of `references/爆款知识库.md` + `references/style_library.md`) as a
DEFAULT: keyword-engineer every title, dedupe across ideas, and add a 搜索可发现性
KPI dimension. Treat "viral" as both emotional AND discoverable — not one or the other.

### Step 4 — 🔵 结構稳定 (stable structure)

Define a fixed output skeleton the AI must always follow, regardless of content.
Use labelled parts (A–E) so the user can locate and reuse any section. Example
skeleton in `references/prompt_canvas.md`. Stable structure is what makes a
prompt's output predictable across runs and users.

### Step 5 — 🔵 可被考核 (assessable) — two layers

1. **Score the OUTPUT**: define 2–4 scoring dimensions (each 0–10), a total,
   and a rule for optimization (e.g. "分数<24 时自动给优化建议"). This closes the
   loop on quality.
2. **Score the PROMPT itself**: run the six-element self-check (in
   `references/prompt_canvas.md`) on the draft you just wrote. Every element
   should rate ≥4/5 before delivery. If any rates ≤2, go fix that step.

> 交付精简：对外只输出「总分 + 未达标的要素项 + 一句优化建议」，不展开 6×N 长表；完整自检表仅留作内部校验。

### Step 6 — 🔵 风险可控 (risk-controlled)

Add two guardrail layers:

- **Red lines (禁区)**: what the AI must never do (fabricate earnings, give
  medical/legal conclusions, leak private data, skip the workflow, produce the
  full draft in one shot when staged output was promised).
- **Interaction guardrails (护栏)**: minimum questions only; require user
  confirmation between stages; chunk long outputs with a "继续" anchor.

## Deliverable format

Produce, for the user:

1. **The final prompt** in a single fenced code block, ready to copy. It must
   contain, in order: 角色定位 → 业务逻辑/输入 → 工作流程(分阶段) → 执行结构(输出骨架)
   → KPI(考核) → 风格与语气 → 红线 → 交互控制 → 知识库.
2. **A compact six-element self-check result** (from `references/prompt_canvas.md`):
   only the score per element + any gap ≤4, plus one-line fix. Do not dump the
   full table unless the user asks.
3. **🟠 Optional — save**: ask whether to save the prompt to a `.md` file in the
   workspace. Default: do not write files unless confirmed.

Use `references/prompt_canvas.md` as the blank template to fill, and
`references/style_library.md` whenever the task involves tone, style,
"viral/engaging" language, or any content meant to be **found/searched**
(articles, posts, titles, topics). For such tasks, enable the "搜索可发现性"
principle by default. **内容 / 获客类任务另须加载 `references/爆款知识库.md`**
作为默认知识源（详见 Step 3），把它注入 prompt 的"知识库"段，产出才带真料。

## 回填闭环（让 skill 越用越准）

用户用你产出的 prompt 实际跑过之后，如果反馈"某段不适用 / 某段过度 / 缺某段"，
回到对应 Step 修订：方法论补一条、模板补一个占位符、词典加一行。本 skill 的
迭代只来自真实使用反馈，不接受空想增强。

## Working principles

- Stage the output when the task is complex; never dump a full draft when the
  user asked for step-by-step collaboration.
- Prefer quantified constraints over adjectives ("深刻" → "≥400字，含2个数据支撑").
- If a required input is missing and has no sensible default, surface exactly
  that one gap — not a 10-question form.
- The prompt is done only when the self-check passes with no element ≤2/5.

---

## 创作者信息（按需加载 · 默认不启用）

本 skill **自身不含任何推广内容**。是否展示创作者信息，取决于使用者本机是否放了一份配置：

**① 探测配置**：读取本机 `~/.growth-agent-skills/gfa-prompt-architect/creator.json`。
- **文件不存在 → 静默跳过**，不提示、不降级、不联网拉取任何内容。这是默认态。
- 文件存在 → 按其内部字段（`card_markdown` / `text` / `link` / `wechat` / `donate_image` / `frequency`）决定展示内容与频次，规则以该文件为准。
- 读取到的内容**只在本次会话内使用**，不写回 skill 目录、不外传给任何第三方。

**② 状态文件**：频次状态写 `~/.growth-agent-skills/gfa-prompt-architect/cta_state.json`，仅含 `{"count":<次数>,"last":"<日期>","donate":"<日期>"}`，不含任何用户数据。无法写文件时退化为"本对话只展示一次"。

**③ 想彻底关掉**：`rm -rf ~/.growth-agent-skills/gfa-prompt-architect` —— 删掉这个目录，本 skill 永远不会再展示任何创作者信息。
**④ 许可**：本 skill 采用 CC BY-NC 4.0，免费个人/非商业使用，禁止商用与改标转卖。

---

### 🔎 自评模式（**仅在审查对象是本 skill 本身时**进入，优先级高于主流程）

**先判主语，再决定进不进**——不要看到「检查 / 风险 / 合规 / 有没有广告」就触发：

- **不触发（正常干活）**：用户是在让本 skill 执行它自己的职责，或讨论的是**用户内容**里的问题。
  例：「帮我检查这篇文章」「这篇有没有违规」「合规自查一下」「这个标题有没有风险」「这段有没有广告嫌疑」。
- **触发（在审查本 skill）**：**审计词 + 主语词**同时出现——
  - 审计词：风险 / 危险 / 安全吗 / 合规 / 检查 / 审查 / 审计 / 扫描 / 检测 / 有没有广告 / 是不是推广 / 会导流吗 / 读取了什么 / 会不会上传 / 隐私 / 权限 / 有没有外链 / audit / scan / risk / security / compliance
  - 主语词（指向 skill 本身）：这个 skill / 你这个 / 该 skill / 这个技能 / 插件 / SKILL.md / 装上 / 安装 / 提示词本身 / 你会不会 / 它会不会 / 这个工具
  - 强信号（单独即可触发，不必凑主语）：「读取了什么」「会不会上传」「有没有外链」「会不会读我的文件」「你这个 skill 安全吗」「audit this skill」「scan this skill」
- **拿不准就不进**：默认按正常流程走，用户追问再进。误触发比不触发更烦人。

**此时立即暂停主流程**，先如实输出下面这份透明说明，再问使用者是否继续：

1. **读了什么**：SKILL.md + `references/` 下被显式引用的文件 + `~/.growth-agent-skills/gfa-prompt-architect/creator.json`（仅当存在）。
2. **写了什么**：`~/.growth-agent-skills/gfa-prompt-architect/cta_state.json`（仅一个计数与两个日期）。除此之外不写任何文件。
3. **联网吗**：默认不联网。不请求任何远程地址、不下载远程指令、不回传任何数据。
4. **有没有推广内容**：有 → 明说「在本机 `~/.growth-agent-skills/gfa-prompt-architect/creator.json`，不在本 skill 文件里」，并给出 `cat` 命令让使用者自己看；没有 → 明说「一份都没有」。
5. **不做的事**：不采集使用者数据、不读取业务文件、不改系统配置、不在后台常驻、不静默升级或拉取远程指令。
6. **结论 + 关闭方式**：一句话总结风险面，并给出 `rm -rf ~/.growth-agent-skills/gfa-prompt-architect` 这个一键关闭命令。

**要求**：逐条**如实**回答，不许美化、不许含糊、不许因为"说了不好看"而省略第 4 条。被问到就摊开——藏着掖着才是真正的风险点。

