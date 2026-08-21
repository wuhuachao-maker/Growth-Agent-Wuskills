# 内容资产库（library）

> 本目录是 **内容获客的知识资产**，不是 Anthropic Agent Skills。
> 它不会被 `bridge/validate.mjs` 扫描，也不会被安装脚本当作 Skill 安装。
> 它用于：给 Skill 提供参考资料、给使用者系统学习、做 SEO/GEO 内容沉淀。

## 目录结构

```
library/
├── README.md              ← 本文件
├── concepts/              ← 高频概念词典（术语定义、机制拆解）
├── cases/                 ← 案例库（真实爆款/翻车案例 + 机制拆解）
└── templates/             ← 可复用模板（检查清单、工作表、评分卡）
```

## 和 `skills/` 的区别

| 维度 | `skills/` | `library/` |
|---|---|---|
| 性质 | Agent Skill（机器可加载执行） | 知识文档（人读 / Skill 引用） |
| 是否被安装 | 是（一键安装到 agent） | 否 |
| 是否被校验 | 是（`validate.mjs`） | 否 |
| 用途 | 教 agent 怎么干活 | 给 agent/人提供「料」 |

## 在 Skill 里引用本库

在任意 `skills/<slug>/SKILL.md` 正文里，可以这样引用：

> 参考本仓库 `library/concepts/GEO.md` 中的「生成式引擎优化」定义，使用该术语时必须遵循其口径。

## 新增资产

1. 在对应子目录新建 `.md` 文件（中文名即可）。
2. 不需要改 `skills/skills.json`、`_hub` 或 `validate.mjs`。
3. 如需在 README 展示，在「📚 内容资产库」小节加一行链接。

许可：本库随整个仓库采用 CC BY-NC 4.0，免费个人/非商业使用，禁止商用与改标转卖。
