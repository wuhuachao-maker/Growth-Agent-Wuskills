# Changelog

所有版本按时间倒序排列。

## [Unreleased]

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
