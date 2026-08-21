# Growth Flow Agent · 內容獲客技能集合

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md)

> 一套面向內容運營者、個人 IP 與創業者的中文 AI Skills 工具箱。把「做內容、獲流量、轉私域」的真實業務問題交給 Agent，獲得可立刻執行的方法論與下一步。

![version](https://img.shields.io/badge/version-1.0.0-534AB7)
![skills](https://img.shields.io/badge/skills-10-0F6E56)
![license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)
![last commit](https://img.shields.io/github/last-commit/wuhuachao-maker/Growth-Agent-Wuskills?color=888780)

**支持：** WorkBuddy、Claude Code、Codex、Cursor，以及其他支持 Anthropic Agent Skills 的 Agent。

**v1.0.0 更新：** 首批 10 個內容獲客 skill 上線；`_hub` 路由中枢會根據你的問題自動匹配診斷/創作/轉化流程，無需先判斷該用哪個 skill。

[快速開始](#快速開始) · [安裝](#安裝) · [能力一覽](#能力一覽) · [完整使用手冊](./docs/新手入門.md) · [更新日誌](./CHANGELOG.md)

---

## 快速開始

```bash
# 推薦：一鍵安裝到所有支持的 Agent 客戶端
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

安裝完成後，直接對你的 Agent 說：

- "幫我起 10 個小紅書標題" → `multi-platform-title`
- "公眾號推薦佔比低怎麼辦" → `gzh-traffic-diagnosis`
- "幫我寫一條 B2B 硬廣" → `b2b-hard-ad`
- "這條短視頻腳本怎麼改" → `script-writing`
- "不知道下週拍什麼" → `topic-generation`

> 意圖模糊時，`_hub` 會先問清楚你的場景，再把你交給最合適的 skill。

---

## 能力一覽

| 業務目標 | 入口 skill | 你能得到什麼 |
|---|---|---|
| 爆款標題 | `multi-platform-title` | 小紅書 / 公眾號 / 抖音 / SEO·GEO 標題方法論 |
| 公眾號流量診斷 | `gzh-traffic-diagnosis` | 推薦佔比低、數據好但不推等問題的排查清單 |
| B2B 硬廣文案 | `b2b-hard-ad` | SaaS / AI Agent 類產品的留資轉化推文結構 |
| 內容質量診斷 | `content-diagnosis` | 單篇內容的體檢報告與修改方向 |
| 個人 IP 增長 | `ip-growth` | 起號、賬號矩陣、漲粉路徑設計 |
| Skill 工程 | `skill-engineering` | 把方法論沉澱為可複用 Agent Skill 的規範 |
| 內容選題 | `topic-generation` | 可持續生產的選題庫與內容日曆 |
| 口播腳本改稿 | `script-writing` | 開頭留人、信息密度、口播流暢度優化 |
| 私域轉化文案 | `private-domain` | 朋友圈、社群、跟進話術與 SOP |
| 意圖路由 | `_hub` | 不確定用哪個 skill 時，自動分發到對應模塊 |

---

## 安裝

### 推薦：一條命令安裝

```bash
# 安裝到所有已支持的客戶端（WorkBuddy / Claude / Codex / Cursor 等）
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

> 該命令基於 Vercel Skills CLI，會把 skill 集合安裝到 `~/.agents/skills/`，並為已安裝的客戶端創建軟鏈。未安裝的客戶端會自動跳過。

### 按客戶端安裝

如果你只想裝到指定工具：

**WorkBuddy**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy
```

**Claude Code**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target claude
```

**Codex / Cursor / Agents 公共入口**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target agents
```

**所有已安裝的客戶端**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target all
```

### 更新

對 Agent 說：

```
更新 Growth Flow Agent 技能集合
```

或重新運行上面的安裝命令，已存在的本地數據不會被覆蓋。

---

## Growth Flow Agent 技能集合怎樣工作

```
你的真實業務問題
        ↓
  說出內容需求
        ↓
  意圖是否明確？ ——是→ 命中對應領域 skill
        ↓否
   _hub 路由中枢
        ↓
  拿到方法論 + 可執行步驟
        ↓
  要自動執行？ → 升級 Growth Flow Agent 商業版
```

---

## 完整使用手冊

更多使用示例、skill 觸發詞表、目錄結構與貢獻方式，見 [docs/新手入門.md](./docs/新手入門.md)。

---

## 作者與支持

Growth Flow Agent 技能集合由 **老吳（Wu Huachao）** 創建與維護。

- 商業版與更多自動化能力 → [https://www.growthflowagent.com](https://www.growthflowagent.com?utm_source=github-repo&utm_medium=readme&utm_campaign=free-skills)
- 問題反饋 → 在倉庫提交 [Issue](../../issues)

---

## License

**CC BY-NC 4.0**。免費安裝、免費個人/非商業使用；**禁止商用、禁止改標轉賣**；商業用途需向作者申請授權。詳見 [LICENSE](./LICENSE)。
