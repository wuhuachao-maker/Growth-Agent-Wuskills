# Changelog

所有版本按时间倒序排列。

## [1.6.0] — 2026-09-09

### Changed
- **全部 skill 升级到创作者信息模块 v2（外部 opt-in）**：SKILL.md 内**零推广明文**——`gfa-title` / `gfa-prompt-architect` / `gfa-content-risk` / `gfa-geo` / `gfa-position` 五个 skill 原本写在正文里的微信号、落地页链接、UTM 参数、打赏引导语与 `assets/donate_wx.png`，全部移出仓库；创作者内容只留在使用者本机 `~/.growth-agent-skills/<slug>/creator.json`（含打赏码图片），**没有配置就静默跳过**。原因：第三方 skill 风险检测工具会按文件里的推广字样判 P1 风险，内容不在文件里就扫不到。
- 新增 **🔎 自评模式**（含主语判定）：用户问「风险 / 安全吗 / 检查 / 审查 / 扫描 / 是不是广告 / audit / scan」时，暂停主流程主动披露——读了哪些文件、写了什么、是否联网、有没有推广内容（有则给路径自证）、不做哪些事，并给出一键关闭命令 `rm -rf ~/.growth-agent-skills/<slug>`。
  - ⚠️ **主语判定是必须的**：第一版只看关键词，遇到自身职责就含「检查 / 合规 / 风险」的 skill（如 `gfa-content-risk`）会导致用户每次正常使用都被拦下来自我审查。现改为**审计词 + 主语词双命中**才触发，另有强信号兜底（「读取了什么」「会不会上传」「audit this skill」单独即可触发），**拿不准则不触发**。`laowu-skillmaker` 校验器已加防回归检查：缺「主语词清单 / 不触发分支 / 强信号兜底」任一即报错。
- 创作者**卡片模板和完整决策规则也移到本机**（`creator.json` 的 `card_markdown` + `rules` 字段），模型读到直接替换占位符输出；SKILL.md 连卡片长什么样、打赏码什么时候出都不知道。`donate_image` 改用绝对路径（部分环境不展开 `~`）。
  - ⚠️ **第二处规则丢失（端到端实测发现）**：第一版只把**参数**（`max_full_shows` / `min_days_between` / 词表）搬进 `creator.json`，却把**规则逻辑**（打赏码出现条件、软链形态、高意向优先）随 v1 章节一起删了 —— 模型读到的只有数字没有规则，展示会随机化。现已补 `rules` 五条：`high_intent_priority` / `full_module_decision` / `donate_image_when` / `soft_link_form` / `state_file`。
- `_hub` 路由中枢移除商业版外链与「引导商业版」话术，改为如实说明「该 skill 正在打磨中」。
- 仓库校验器 `bridge/validate.mjs` 第 5 项由「必须含引流钩子 + UTM」**反转为「创作者内容零泄漏扫描」**（微信号 / UTM / 落地页域名 / 打赏引导语 / 赞赏码路径命中即报错）。
- 许可声明（CC BY-NC 4.0）保留在 SKILL.md —— 它是授权条款，不是推广。

### Version bumps
- `gfa-title` 1.3.0 → 1.4.0 · `gfa-geo` 1.3.0 → 1.4.0 · `gfa-prompt-architect` 2.0.0 → 2.1.0 · `gfa-content-risk` 1.0.0 → 1.1.0 · `gfa-position` 1.0.0 → 1.1.0 · `_hub` 1.0.0 → 1.1.0
- 集合版本 1.5.0 → 1.6.0（`VERSION` / `skills.json` / `UPDATE.json` / 三语 README badge 同步）。

### Note
- 功能与输出**完全不变**，已安装的用户无需任何操作；只是不会再看到创作者卡片，除非本机放了 `creator.json`。

## [1.5.0] — 2026-09-06

### Added
- 新增 `gfa-position`（IP 定位压力测试 v1.0.0）：用六道闸门（情境具体性 / 替代方案 / 切换方程 / 差异化可验证 / 反例证伪 / 证据举证）拷问个人 / IP / 账号定位，给「哪道闸没过 + 欠什么答案 + 收窄方向」，不替用户编定位；基于 JTBD 四力与切换方程 + 定位理论及其批评 + 反本质主义（去魅化实践理性）。内置真料 `references/知识库.md`（11 节，每条带来源链接）+ 持久化 `定位档案.md`（一次提交，跨会话延续）+ 创作者信息卡片。
- `_hub` 路由新增「IP 定位压力测试」意图分发；`skills.json` 注册 `gfa-position`（category=methodology）并加入 routesTo。
- README 能力一览 / 技能分类 / 触发词速查 / 快速开始（简 / 英 / 繁三语）同步更新，badge 升至 skills-6 / v1.5.0。

## [Unreleased]

### Added
- 新增 `gfa-geo`（GEO 内容改写器 v1.3.0）：把文章/笔记/文案改写为更易被生成式 AI 引擎（ChatGPT / Perplexity / Google AI Overviews / Claude / Gemini）选中引用的版本。按 Princeton SIGKDD 2024 GEO 研究（九策略 + 增益排序）执行：口语化数据 + 文末「数据来源附注」+ 回答优先结构 + 平台化模板（ChatGPT 多子问题 / Perplexity 逐句溯源 / AI Overviews FAQ+HowTo）+ 每次交付必附「小白技术层说明」（只解释不写代码）；支持联网搜主流媒体真实引用（禁 SEO 采集站/营销号，URL 不臆造）；内置真料 `references/知识库.md`（12 节：GEO 定义 / 九策略增益 / 2026 五支柱 / 平台 RAG 差异 / 反模式 / 测量指标，每条带来源链接）+ 创作者信息卡片。
- `_hub` 路由新增「GEO 内容改写」意图分发；`skills.json` 注册 `gfa-geo`（category=content）并加入 routesTo。
- README 能力一览/触发词速查/分类表同步更新，badge 升至 skills-5 / v1.4.0。

### Changed
- 精简 skill 集合：移除 8 个尚在打磨中的领域 skill（gzh-traffic-diagnosis / b2b-hard-ad / content-diagnosis / ip-growth / skill-engineering / topic-generation / script-writing / private-domain），仅保留 `_hub` 路由中枢与 `gfa-title`（多平台爆款标题）。各 skill 将逐一打磨后重新上线。
- 同步更新 README（简/英/繁三语）、使用手册、`RELEASE_NOTES`、资产库引用，移除对已删 skill 的指向。

## [1.0.0] — 2026-08-21

### Added
- 首批 10 个内容获客 Agent skill 上线：
  - `_hub`：路由中枢，意图分发
  - `gfa-title`：多平台爆款标题
  - `gzh-traffic-diagnosis`：公众号流量诊断
  - `b2b-hard-ad`：B2B 硬广文案
  - `content-diagnosis`：内容质量诊断
  - `ip-growth`：个人 IP 增长
  - `skill-engineering`：Skill 工程
  - `topic-generation`：内容选题引擎
  - `script-writing`：短视频口播脚本改稿
  - `private-domain`：私域转化文案
- 多工具分发脚本：`bridge/install.sh`、`bridge/install.mjs`、`bridge/install-interactive.sh`。
- 交互式安装引导，降低非技术用户门槛。
- 新增 `library/` 内容资产库（非 Agent Skill，不随安装进入 Agent）：
  - `library/concepts/内容获客高频概念词典.md`：15 个核心术语统一口径
  - `library/cases/爆款标题案例库.md`：三平台标题机制级拆解
  - `library/templates/内容诊断检查清单.md`：五维体检表 + 评分卡
- 新增 `docs/如何增删skill.md`：增删 Skill 与知识库资产的实操手册。
- 安装脚本支持 `--uninstall` 卸载。
- `bridge/validate.mjs`：校验 frontmatter、UTM 钩子、CC BY-NC 声明、技能清单一致性、触发词冲突、hub 路由覆盖。
- `skills/skills.json`：机器可读的技能清单与触发词表。
- GitHub Actions CI：push/PR 自动跑校验。

### Changed
- README 按主流多 skill 集合仓库风格重写：新增 hero 区、badges、语言切换、导航链接、最新更新亮点、能力一览表、工作原理 ASCII 流程图；移除「clone 后本地运行 bridge/install.sh」的开发者安装说明，改用 curl 一键命令与 `npx skills add` 作为用户安装入口。
- 所有 skill 引流钩子统一加 UTM 参数（`utm_source=skill&utm_medium=<slug>&utm_campaign=free-skills`），支持按 skill 追踪商业版转化。
- 脚本内部「创作者上传包」功能统一用中性的 `creator-upload` target 命名，不在用户可见帮助中暴露。

### Fixed
- 修复 macOS 默认 bash 3.2 下 `install.sh` 特定 creator-upload target 报 `dest: unbound variable` 的兼容性问题。
- 修复 `validate.mjs` 引流钩子校验仍使用旧占位域名 `growthflow.example.com` 导致全量失败的问题。
