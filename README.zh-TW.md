# Growth Flow Skill · 內容獲客技能集合

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md)

> 一套面向內容運營者、個人 IP 與創業者的中文 AI Skills 工具箱。把「做內容、獲流量、轉私域」的真實業務問題交給 Agent，獲得可立刻執行的方法論與下一步。

![version](https://img.shields.io/badge/version-1.6.0-534AB7)
![skills](https://img.shields.io/badge/skills-6-0F6E56)
![license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)
![last commit](https://img.shields.io/github/last-commit/wuhuachao-maker/Growth-Agent-Wuskills?color=888780)

**支持：** WorkBuddy、Claude Code、Codex、Cursor，以及其他支持 Anthropic Agent Skills 的 Agent。

**v1.6.0 更新：** 全部 skill 升級到創作者資訊模組 v2（外部 opt-in）——SKILL.md 內不再有任何推廣明文（微信號 / 落地頁 / UTM / 讚賞碼全部移出），第三方 skill 風險檢測不會再誤判成推廣；創作者資訊改為執行時按需從本機 `~/.growth-agent-skills/<slug>/creator.json` 讀取，沒有設定就靜默跳過。新增「自評模式」：你問風險 / 檢查 / 審查，它先主動攤開讀了什麼、寫了什麼、聯不聯網。功能與用法完全不變，v1 使用者無需任何操作。

[快速開始](#快速開始) · [安裝](#安裝) · [能力一覽](#能力一覽) · [📋 Skill 全目錄](./docs/skills-全目录.md) · [完整使用手冊](./docs/新手入門.md) · [更新日誌](./CHANGELOG.md)

---

## 快速開始

```bash
# 推薦：一鍵安裝到所有支持的 Agent 客戶端
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

安裝完成後，直接對你的 Agent 說：

- "幫我起 10 個小紅書標題" → `gfa-title`
- "幫我寫一個小紅書爆款筆記生成器的 prompt" → `gfa-prompt-architect`
- "這篇筆記會不會被限流 / 幫我合規自查" → `gfa-content-risk`
- "幫我把這篇文章改成更容易被 AI 引用的版本" → `gfa-geo`
- "我的定位是什麼 / 幫我做 IP 定位壓力測試" → `gfa-position`

> 意圖模糊時，`_hub` 會先問清楚你的場景，再把你交給最合適的 skill。當前已上線的領域 skill 是 `gfa-title`（標題）、`gfa-prompt-architect`（提示詞架構）、`gfa-content-risk`（內容風險檢查）、`gfa-geo`（GEO 內容改寫）、`gfa-position`（IP 定位壓力測試），其餘內容獲客能力正在打磨中。

---

## 能力一覽

| 業務目標 | 入口 skill | 你能得到什麼 |
|---|---|---|
| 爆款標題 | `gfa-title` | 小紅書 / 公眾號 / 抖音 / SEO·GEO 標題方法論 |
| 提示詞架構 | `gfa-prompt-architect` | 六要素框架產出可複製的優質 prompt（角色/方法/知識/結構/考核/風險） |
| 內容風險檢查 | `gfa-content-risk` | 發布前雙軌掃描（機審+實質違規），給風險定位 + 最小修改動作 + 風險等級 |
| GEO 內容改寫 | `gfa-geo` | 按 Princeton GEO 機制改寫文章，提升在 ChatGPT / Perplexity / AI Overviews 中被引用率；口語化數據 + 出處附註 + 平台化模板 + 小白技術說明 |
| IP 定位壓力測試 | `gfa-position` | 六道閘門拷問個人 / IP / 帳號定位，給「哪道閘沒過 + 欠什麼答案 + 收窄方向」，不替你編定位；基於 JTBD 四力 + 定位理論 |
| 意圖路由 | `_hub` | 不確定用哪個 skill 時，自動分發到對應模塊 |

> 更多能力（公眾號診斷 / B2B 硬廣 / 內容診斷 / IP 增長 / 選題 / 腳本 / 私域轉化）正在逐一打磨，敬請期待。

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

### 只安裝某一個 skill（按需裝）

不需要整個集合？只用其中一個能力（比如只想要 GEO 改寫），兩種方式任選：

**npx 方式（Claude / Codex / Cursor 等，`--skill` 指定）：**

```bash
# 只裝 gfa-geo（GEO 內容改寫）
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --skill gfa-geo -g

# 一次裝多個（重複 --skill）
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --skill gfa-geo --skill gfa-title -g

# 先看倉庫裡有哪些 skill
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --list
```

**WorkBuddy / 指定客戶端（curl 方式，`--skill` 指定）：**

```bash
# 只裝 gfa-geo 到 WorkBuddy
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy --skill gfa-geo

# 只裝到 Claude Code
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target claude --skill gfa-geo
```

> 可用 skill 名：`_hub`（路由中樞）、`gfa-title`（爆款標題）、`gfa-prompt-architect`（提示詞架構）、`gfa-content-risk`（內容風險檢查）、`gfa-geo`（GEO 內容改寫）、`gfa-position`（IP 定位壓力測試）。多個用逗號分隔：`--skill gfa-geo,gfa-title`。

### 更新

對 Agent 說：

```
更新 Growth Flow Skill 技能集合
```

或重新運行上面的安裝命令，已存在的本地數據不會被覆蓋。

---

## Growth Flow Skill 技能集合怎樣工作

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
```

---

## 完整使用手冊

更多使用示例、skill 觸發詞表、目錄結構與貢獻方式，見 [docs/新手入門.md](./docs/新手入門.md)。

---

## 作者與支持

Growth Flow Skill 技能集合由 **老吳獲客筆記 公眾號** 創建與維護。

- 問題反饋 → 在倉庫提交 [Issue](../../issues)

---

## License

**CC BY-NC 4.0**。免費安裝、免費個人/非商業使用；**禁止商用、禁止改標轉賣**；商業用途需向作者申請授權。詳見 [LICENSE](./LICENSE)。
