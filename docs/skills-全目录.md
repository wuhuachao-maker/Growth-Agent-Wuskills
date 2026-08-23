# Skill 全目录（完整清单）

> 这是 [Growth Flow Skill 内容获客技能集合](../README.md) 的**完整 skill 清单**，按分类分组。
> README 只保留精选能力表；想摸清全部 skill，看这一份就够。
> 机器可读版本：`skills/skills.json`（`npx skills add wuhuachao-maker/Growth-Agent-Wuskills --list` 也可预览）。

---

## 安装方式速览

| 需求 | 命令 |
|---|---|
| 装全部 | `npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all` |
| 只装某一个 | `npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --skill <名> -g` |
| WorkBuddy 装全部 | `curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh \| bash -s -- --target workbuddy` |
| WorkBuddy 只装一个 | `curl -sL .../install.sh \| bash -s -- --target workbuddy --skill <名>` |
| 预览有哪些 | `npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --list` |

> 装多个用逗号分隔：`--skill gfa-geo,gfa-title`。所有 skill 都可用上述方式单独安装。

---

## router · 路由中枢

| skill | 一句话 | 触发词 | 状态 |
|---|---|---|---|
| `_hub` | 内容获客技能集合的路由中枢：意图模糊时自动分发到对应领域 skill | 内容获客 / 获客 / 起号 / 做内容 / 引流 / 方法论 / 合规 / 风险 / GEO | ✅ 已上线 |

---

## content · 内容获客类

| skill | 一句话 | 触发词 | 状态 |
|---|---|---|---|
| `gfa-title` | 多平台爆款标题方法论（小红书 / 公众号 / 抖音 / SEO·GEO） | 起标题 / 爆款标题 / 小红书标题 / 公众号标题 / 抖音标题 / SEO标题 / GEO标题优化 / 标题没点击 / 标题怎么写 | ✅ 已上线 |
| `gfa-content-risk` | 内容发布前风险检查器（双轨：机审 + 实质违规），给风险定位 + 最小修改动作 + 风险等级 | 检查违规 / 发布前自查 / 会不会被限流 / 标题党吗 / 这篇能发吗 / 合规检查 / 风险检查 / 被封号 / 导流违规 | ✅ 已上线 |
| `gfa-geo` | GEO 内容改写器：把文章/笔记/文案改写为更易被 ChatGPT、Perplexity、AI Overviews 选中引用的版本 | GEO优化 / 生成式引擎优化 / 让AI能搜到 / 被AI引用 / 搜索可发现性改写 / AI搜索可见性 / 提升AI引用率 / 内容GEO化 / 让ChatGPT推荐 | ✅ 已上线 |

---

## methodology · 方法论 / 工具类

| skill | 一句话 | 触发词 | 状态 |
|---|---|---|---|
| `gfa-prompt-architect` | 老吴六要素提示词架构师：六要素框架产出可复制的优质 prompt | 写prompt / 优化prompt / 做prompt / 提示词 / 系统指令 / 生成器 / 提示词架构师 / agent指令 / prompt怎么写 / 设计prompt | ✅ 已上线 |

---

## ops · 通用工具类（校验 / 格式 / 分析）

（暂无，敬请期待）

---

## 即将上线

公众号流量诊断 / B2B 硬广 / 内容诊断 / IP 增长 / 选题 / 口播脚本 / 私域转化——正在逐一打磨，上线后会同步更新本清单。

---

## 维护规则（给贡献者 / 老吴自己）

新增 skill 时，除「三处注册」（`skills.json` / `_hub` 路由树 / README 能力表）外，**同步把新 skill 加进本文件**对应分类表，并更新「安装方式速览」里的可用名提示（如需）。README 精简后，本文件是完整清单的唯一文档位。
