# Release Notes v1.4.0

> 复制以下内容到 GitHub Release 描述框即可。

## Growth Flow Skill · 免费内容获客 skill 集合 v1.4.0

一套面向内容运营者、个人 IP 与创业者的中文 AI Skills 工具箱。本版新增 **`gfa-geo`（GEO 内容改写器）**，让内容在生成式 AI 引擎（ChatGPT / Perplexity / Google AI Overviews）的答案里更容易被选中、引用、复述。

本集合开源方法论，帮助内容运营者、个人 IP 与创业者直接上手；不接私有数据、不跑付费 API。

---

### 本版新增（v1.4.0）

**`gfa-geo` — GEO 内容改写器**

把"写给人看"的文章，改写成"写给人看、也被 AI 引擎引用"的版本：

- 按 Princeton SIGKDD 2024 GEO 研究（九策略 + 增益排序）执行改写
- 口语化数据 + 文末「数据来源附注」（不写论文腔、不编数字）
- 回答优先结构 + 平台化模板（ChatGPT 多子问题 / Perplexity 逐句溯源 / AI Overviews FAQ+HowTo）
- 每次交付必附「小白技术层说明」（人话版技术清单，只解释不写代码）
- 支持联网搜主流媒体 / 权威机构真实引用（禁 SEO 采集站 / 营销号，URL 不臆造）
- 内置真料知识库（GEO 定义 / 九策略增益 / 平台 RAG 差异 / 反模式 / 测量指标，每条带来源链接）

---

### 推荐安装

```bash
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

---

### 安装后怎么用

重启你的 Agent 工具，然后说：

- "帮我起 10 个小红书标题" → `gfa-title`
- "帮我写一个 XX 生成器的 prompt" → `gfa-prompt-architect`
- "这篇笔记会不会被限流 / 帮我合规自查" → `gfa-content-risk`
- "帮我把这篇文章改成更容易被 AI 引用的版本" → `gfa-geo`
- 意图模糊时 → `_hub` 路由中枢会帮你匹配

---

### 本版包含的 skill

| skill | 用途 |
|---|---|
| `_hub` | 路由中枢 |
| `gfa-title` | 多平台爆款标题 |
| `gfa-prompt-architect` | 老吴六要素提示词架构 |
| `gfa-content-risk` | 内容发布前风险检查 |
| `gfa-geo` | GEO 内容改写（生成式引擎优化） |

> 公众号诊断 / B2B 硬广 / 内容诊断 / IP 增长 / 选题 / 口播脚本 / 私域转化等能力正在逐一打磨，敬请期待。

---

### License

CC BY-NC 4.0：免费个人/非商业使用，禁止商用与改标转卖。
