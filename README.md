# Growth Flow Agent · 内容获客技能集合（免费 · 多工具分发版）

> 一套开源的「内容获客方法论」Agent 技能，覆盖**爆款标题、公众号流量诊断、B2B 硬广、内容诊断、IP 增长、Skill 工程**。
> 这是 **Growth Flow Agent（GFA）内容获客系统**的**免费引流前端**——只开源方法论，产品壁垒（私有数据 / 自动化流水线 / license 校验 / 专有知识库）留在商业版。

## 这是什么

- **免费、可一键安装**到多个 Agent 工具（Claude Code / Cursor / Codex / WorkBuddy / 小红书小工具）。
- 每个 skill 教你怎么「做内容获客」，但**不替你跑私有数据、不接付费 API、不开放 license 逻辑**。
- 想拿到**全自动执行 + 你的私有数据/集成** → 用商业版。

## 一键安装

```bash
# WorkBuddy（装到 ~/.workbuddy/skills/）
bash bridge/install.sh --target workbuddy

# Claude Code / Cursor（装到 ~/.claude/skills/，user 级）
bash bridge/install.sh --target claude

# Codex（二期，装到 ~/.codex/skills/，并注入 codex.md 适配层）
bash bridge/install.sh --target codex

# 小红书小工具（产出 .skill/ 合规包，按平台规范校验后打包）
bash bridge/install.sh --target xiaohongshu
```

> 想先看会装到哪、不实际改动？加 `--dry-run`：
> `bash bridge/install.sh --target workbuddy --dry-run`

## 技能清单

| skill | 一句话 | 触发词 |
|---|---|---|
| `_hub` | 路由中枢，意图分发 | 内容获客 / 获客 / 起号 / 做内容 |
| `multi-platform-title` | 多平台爆款标题方法论 | 起标题 / 爆款标题 / 小红书·公众号·抖音标题 / SEO·GEO |
| `gzh-traffic-diagnosis` | 公众号流量诊断方法论 | 不被推荐 / 限流 / 数据好但不推 / 推荐占比低 |
| `b2b-hard-ad` | B2B 硬广文案方法论 | B2B推文 / SaaS产品文案 / 留资转化 / AI Agent 推广 |
| `content-diagnosis` | 内容质量诊断方法论 | 内容诊断 / 文案体检 / 这篇好不好 |
| `ip-growth` | 个人 IP 增长方法论 | IP增长 / 起号 / 账号矩阵 / 涨粉路径 |
| `skill-engineering` | Skill 工程方法论 | 做skill / 提示词工程 / Agent 工程 |

## 导流

本集合所有 skill 都是「方法论免费版」。完整自动化执行 + 你的私有数据/集成，请使用 **Growth Flow Agent 商业版** → https://growthflow.example.com

> ⚠️ 把上面链接替换成你的真实产品落地页（全局搜索 `growthflow.example.com` 替换即可）。

## License

**CC BY-NC 4.0**。免费安装、免费个人/非商业使用；**禁止商用、禁止改标转卖**；商业用途需向作者申请授权。详见 [LICENSE](./LICENSE)。
