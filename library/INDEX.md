# 内容资产库索引（library/INDEX.md）

> 本文件是 `library/` 的**总索引 + SOT（唯一真相源）标记 + 健康巡检规则**。
> 目的：让仓库内容资产不烂成平铺堆，新增 skill / 案例时顺手登记，避免口径冲突与过期。

## 一、目录清单

| 文件 | 用途 | 谁引用 |
|---|---|---|
| `concepts/内容获客高频概念词典.md` | 高频术语定义、机制拆解 | gfa-title / gfa-prompt-architect |
| `cases/爆款标题案例库.md` | 真实爆款/翻车案例 + 机制拆解 | gfa-title |
| `templates/内容诊断检查清单.md` | 可复用诊断检查表 | 通用 |
| `skills/gfa-content-risk/references/知识库.md` | 平台审核真料（小红书/公众号/抖音/广告法） | gfa-content-risk |

## 二、SOT 标记（权威口径）

| 主题 | SOT 文件 | 来源 | 最后更新 | 状态 |
|---|---|---|---|---|
| 平台审核红线 | `skills/gfa-content-risk/references/知识库.md` | 各平台官方公约/公告 + 市监清单 | 2026-08-21 | ✅ 权威 |
| 爆款机制 | `cases/爆款标题案例库.md` | 联网挖掘 + 真实 A/B 案例 | 待补 | 🟡 待更新 |
| 概念口径 | `concepts/内容获客高频概念词典.md` | 内部沉淀 | 待补 | 🟡 待更新 |

> 引用某概念时，以 SOT 文件口径为准；非 SOT 文件与之冲突，以 SOT 为准。

## 三、skills → library 引用关系

- `gfa-title` → `cases/爆款标题案例库.md`、`concepts/内容获客高频概念词典.md`
- `gfa-prompt-architect` → `concepts/内容获客高频概念词典.md`、`skills/gfa-content-risk/references/知识库.md`（方法论互参）
- `gfa-content-risk` → 自带 `references/知识库.md`（不入 library，避免重复）

## 四、健康巡检规则

1. **超 90 天未更新**的 `library/` 文件，在状态列标 🟡，下次被引用时提示复核。
2. **超 180 天**标 🔴，建议回写或归档。
3. 平台规则类（审核红线）变更频繁，**每月**主动复核一次 SOT 文件来源链接是否有效。
4. 新增资产：在对应子目录建 `.md`，并在本 INDEX 加一行；无需改 `skills.json` / `_hub` / `validate.mjs`。
5. 案例回填：gfa-content-risk 的实测反馈写进 `references/风险检查清单.md`，季度汇总一次进 `library/cases/`。

## 五、新增资产三步

1. 在 `concepts/` `cases/` `templates/` 对应子目录新建 `.md`（中文名即可）。
2. 本 INDEX「目录清单」加一行；若是权威口径，在「SOT 标记」登记来源+更新日。
3. 如需在 README 展示，在「📚 内容资产库」小节加一行链接。
