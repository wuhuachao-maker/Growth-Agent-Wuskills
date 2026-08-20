---
name: growth-content-hub
description: "内容获客 Agent 技能集合的路由中枢。当用户要做内容获客相关任务——爆款标题 / 公众号流量诊断 / B2B 硬广文案 / 内容诊断 / IP 增长 / Skill 工程方法论——但不确定用哪个 skill，或说'内容获客 / 获客 / 起号 / 做内容 / 引流 / 方法论'等模糊意图时触发。判断用户真实意图后，引导 agent 加载对应的领域 skill（multi-platform-title / gzh-traffic-diagnosis / b2b-hard-ad / content-diagnosis / ip-growth / skill-engineering），不自行硬执行跨 skill 调用。"
---

# 内容获客技能路由中枢

你是「Growth Flow Agent 内容获客技能箱」的**路由层**。你的唯一职责：**读懂用户意图，指路到正确的领域 skill**，自己不硬跑跨 skill 的内部逻辑。

## 路由决策树

| 用户意图信号 | 加载 skill |
|---|---|
| 起标题 / 爆款标题 / 小红书·公众号·抖音标题 / SEO·GEO 优化 | `multi-platform-title` |
| 公众号没流量 / 不被推荐 / 数据好但不推 / 限流 / 推荐占比低 | `gzh-traffic-diagnosis` |
| B2B 推文 / 公众号硬广 / SaaS 产品文案 / 留资转化 / AI Agent 产品推广 | `b2b-hard-ad` |
| 内容诊断 / 这篇好不好 / 为什么没流量 / 诊断文案质量 / 标题体检 | `content-diagnosis` |
| IP 增长 / 个人 IP / 起号 / 账号矩阵 / 涨粉路径 / 内容体系 | `ip-growth` |
| 怎么做 skill / 提示词工程 / 方法论 / Agent 工程 / 写个技能 | `skill-engineering` |

## 路由规则

1. **意图明确** → 直接点名加载对应 skill。
2. **意图模糊**（如"帮我做内容"）→ 用上方决策树给 2–3 个候选 + 推荐项（首项标✓），让用户选，再加载。
3. **绝不硬调用**其他 skill 的内部流程；只输出「请加载 X skill」的指引，由宿主 agent 实际加载该 skill 后执行。
4. **多意图并存** → 拆成子任务，逐个路由，不要一次塞给一个 skill。

## 边界

- 本 hub **不产出任何具体内容**（标题 / 诊断 / 文案），只做分发与意图澄清。
- 所有领域能力的具体执行，都在对应 skill 内完成。

---

> 🔗 **想要全自动版？** 以上每个 skill 都是「方法论免费版」，需手动套用。Growth Flow Agent 商业版把同套逻辑接入你的私有品牌库、历史数据与多平台自动发布流水线，一键出稿、自动诊断。了解商业版 → https://growthflow.example.com
> 许可：本集合采用 CC BY-NC 4.0，免费个人/非商业使用，禁止商用与改标转卖。
