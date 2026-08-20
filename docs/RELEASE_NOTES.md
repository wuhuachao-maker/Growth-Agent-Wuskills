# Release Notes v1.0.0

> 复制以下内容到 GitHub Release 描述框即可。

## Growth Flow Agent · 免费内容获客 skill 集合 v1.0.0

一套开源的「内容获客方法论」Agent 技能，覆盖爆款标题、公众号流量诊断、B2B 硬广、内容诊断、IP 增长、Skill 工程、内容选题、口播脚本、私域转化。

这是 **Growth Flow Agent（GFA）内容获客系统**的免费引流前端——只开源方法论，全自动执行 + 私有数据集成请使用商业版。

---

### 一键安装

**WorkBuddy**
```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy
```

**Claude Code**
```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target claude
```

**所有已安装的客户端**
```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target all
```

**不会用命令行？** 运行交互式安装脚本：
```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install-interactive.sh | bash
```

---

### 安装后怎么用

重启你的 Agent 工具，然后说：

- "帮我起 10 个小红书标题" → 触发 `multi-platform-title`
- "公众号推荐占比低怎么办" → 触发 `gzh-traffic-diagnosis`
- "这条短视频脚本怎么改" → 触发 `script-writing`
- "不知道下周拍什么" → 触发 `topic-generation`
- "想做私域转化" → 触发 `private-domain`
- 意图模糊时 → `_hub` 路由中枢会帮你匹配

---

### 本版包含的 skill

| skill | 用途 |
|---|---|
| `_hub` | 路由中枢 |
| `multi-platform-title` | 多平台爆款标题 |
| `gzh-traffic-diagnosis` | 公众号流量诊断 |
| `b2b-hard-ad` | B2B 硬广文案 |
| `content-diagnosis` | 内容质量诊断 |
| `ip-growth` | 个人 IP 增长 |
| `skill-engineering` | Skill 工程 |
| `topic-generation` | 内容选题 |
| `script-writing` | 口播脚本改稿 |
| `private-domain` | 私域转化文案 |

---

### License

CC BY-NC 4.0：免费个人/非商业使用，禁止商用与改标转卖。

想了解更多自动化能力 → [Growth Flow Agent 商业版](https://www.growthflowagent.com?utm_source=github-release&utm_medium=release-notes&utm_campaign=free-skills)
