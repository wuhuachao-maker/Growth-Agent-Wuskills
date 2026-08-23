# Growth Flow Skill · Content Acquisition Skill Collection

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md)

> A Chinese AI Skills toolbox for content operators, personal IP builders, and entrepreneurs. Hand real business problems like content creation, traffic acquisition, and private-domain conversion to your Agent, and get actionable methodology plus the next step.

![version](https://img.shields.io/badge/version-1.4.0-534AB7)
![skills](https://img.shields.io/badge/skills-5-0F6E56)
![license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)
![last commit](https://img.shields.io/github/last-commit/wuhuachao-maker/Growth-Agent-Wuskills?color=888780)

**Supported on:** WorkBuddy, Claude Code, Codex, Cursor, and any other Agent that supports Anthropic Agent Skills.

**v1.4.0 update:** `gfa-geo` (Generative Engine Optimization rewriter) is live — rewrites articles/notes/copy so ChatGPT, Perplexity, and Google AI Overviews are more likely to cite them. Based on the Princeton GEO study: conversational statistics + source footnotes + answer-first structure + platform templates (FAQ/HowTo), every delivery includes a plain-language "technical checklist". Supports web search for real mainstream-media citations (never fabricates). More skills (WeChat diagnosis / B2B hard-sell / content diagnosis / IP growth / topic / script / private-domain) are being polished one by one — stay tuned.

[Quick start](#quick-start) · [Install](#install) · [Capabilities](#capabilities) · [Full manual](./docs/GETTING_STARTED.en.md) · [Changelog](./CHANGELOG.md)

---

## Quick start

```bash
# Recommended: one-line install to all supported Agent clients
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

After installation, just tell your Agent:

- "Give me 10 Xiaohongshu titles" → `gfa-title`
- "Write me a prompt for a Xiaohongshu note generator" → `gfa-prompt-architect`
- "Will this note get flagged / help me self-check compliance" → `gfa-content-risk`
- "Rewrite this article so AI engines are more likely to cite it" → `gfa-geo`

> When your intent is vague, `_hub` will clarify the scenario first and then route you to the best skill. Currently live domain skills: `gfa-title` (titles), `gfa-prompt-architect` (prompt architecture), `gfa-content-risk` (content risk check), `gfa-geo` (GEO rewriting); other content-acquisition capabilities are being polished.

---

## Capabilities

| Goal | Entry skill | What you get |
|---|---|---|
| Viral titles | `gfa-title` | Title methodology for Xiaohongshu, WeChat Official Account, Douyin, SEO, GEO |
| Prompt architecture | `gfa-prompt-architect` | Six-element framework producing copyable high-quality prompts (role/method/knowledge/structure/assessment/risk) |
| Content risk check | `gfa-content-risk` | Pre-publish dual-track scan (machine-check + substantive violation), risk location + minimal fix + risk level |
| GEO rewriting | `gfa-geo` | Rewrite articles per the Princeton GEO mechanism to raise citation rates in ChatGPT / Perplexity / AI Overviews; conversational stats + source footnotes + platform templates + plain-language tech checklist |
| Intent routing | `_hub` | Auto-dispatch when you are unsure which skill to use |

> More capabilities (WeChat diagnosis / B2B hard-sell / content diagnosis / IP growth / topic / script / private-domain) are being polished one by one — stay tuned.

---

## Install

### Recommended: one-line install

```bash
# Install to all supported clients (WorkBuddy / Claude / Codex / Cursor, etc.)
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

> This command uses the Vercel Skills CLI. It installs the skill collection to `~/.agents/skills/` and creates symlinks for detected clients. Clients that are not installed are skipped automatically.

### Per-client install

If you only want to install to a specific tool:

**WorkBuddy**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy
```

**Claude Code**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target claude
```

**Codex / Cursor / generic Agents entry**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target agents
```

**All installed clients**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target all
```

### Update

Tell your Agent:

```
Update Growth Flow Skill skill collection
```

Or re-run the install command above. Existing local data will not be overwritten.

---

## How it works

```
Your real business problem
            ↓
    Describe your content need
            ↓
    Is the intent clear? ——Yes→ Hit the matching skill
            ↓No
      _hub routing core
            ↓
    Get methodology + executable steps
```

---

## Full manual

More examples, the full trigger-word table, directory structure, and contribution notes: see [docs/GETTING_STARTED.en.md](./docs/GETTING_STARTED.en.md).

---

## Author & support

Growth Flow Skill skill collection is created and maintained by **老吴获客笔记 公众号**.

- Feedback → open an [Issue](../../issues)

---

## License

**CC BY-NC 4.0**. Free to install and free for personal/non-commercial use; **commercial use and rebranding/reselling are prohibited**; commercial use requires the author's authorization. See [LICENSE](./LICENSE).
