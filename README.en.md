# Growth Flow Skill · Content Acquisition Skill Collection

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md)

> A Chinese AI Skills toolbox for content operators, personal IP builders, and entrepreneurs. Hand real business problems like content creation, traffic acquisition, and private-domain conversion to your Agent, and get actionable methodology plus the next step.

![version](https://img.shields.io/badge/version-1.7.0-534AB7)
![skills](https://img.shields.io/badge/skills-6-0F6E56)
![license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)
![last commit](https://img.shields.io/github/last-commit/wuhuachao-maker/Growth-Agent-Wuskills?color=888780)

**Supported on:** WorkBuddy, Claude Code, Codex, Cursor, and any other Agent that supports Anthropic Agent Skills.

**v1.7.0 update:** `gfa-title` now also produces covers — in one pass you get viral titles for Xiaohongshu / WeChat Official Account / Douyin, plus cover prompts in **three emphasis versions (person-led / text-led / scene-led)**, each in 9:16 and 16:9 with platform safe zones and post-generation text checks. Negative prompts are no longer emitted by default: modern image models are stable enough, so the constraints they used to carry now live in the positive description, and negatives are downgraded to an on-demand troubleshooting tool for the rare bad generation.

[Quick start](#quick-start) · [Install](#install) · [Capabilities](#capabilities) · [📋 Skill catalog](./docs/skills-全目录.md) · [Full manual](./docs/GETTING_STARTED.en.md) · [Changelog](./CHANGELOG.md)

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
- "What is my positioning / run an IP positioning stress-test on me" → `gfa-position`

> When your intent is vague, `_hub` will clarify the scenario first and then route you to the best skill. Currently live domain skills: `gfa-title` (titles), `gfa-prompt-architect` (prompt architecture), `gfa-content-risk` (content risk check), `gfa-geo` (GEO rewriting), `gfa-position` (IP positioning stress-test); other content-acquisition capabilities are being polished.

---

## Capabilities

| Goal | Entry skill | What you get |
|---|---|---|
| Viral titles + covers | `gfa-title` | Title methodology for Xiaohongshu, WeChat Official Account, Douyin, SEO, GEO + cover prompts in **three emphasis versions (person / text / scene)**, 9:16 and 16:9 (platform safe zones + post-generation checks) |
| Prompt architecture | `gfa-prompt-architect` | Six-element framework producing copyable high-quality prompts (role/method/knowledge/structure/assessment/risk) |
| Content risk check | `gfa-content-risk` | Pre-publish dual-track scan (machine-check + substantive violation), risk location + minimal fix + risk level |
| GEO rewriting | `gfa-geo` | Rewrite articles per the Princeton GEO mechanism to raise citation rates in ChatGPT / Perplexity / AI Overviews; conversational stats + source footnotes + platform templates + plain-language tech checklist |
| IP positioning stress-test | `gfa-position` | Six-gate pressure test on personal/IP/account positioning — which gate fails, what answer you owe, and a narrowing direction; built on JTBD four forces + positioning theory |
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

### Install only one skill (on demand)

Don't need the whole set? Install just one capability (e.g., only GEO rewriting) with either method:

**Via npx (Claude / Codex / Cursor etc., use `--skill`):**

```bash
# Install only gfa-geo (GEO rewriting)
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --skill gfa-geo -g

# Install several at once (repeat --skill)
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --skill gfa-geo --skill gfa-title -g

# Preview available skills in this repo first
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --list
```

**WorkBuddy / a specific client (via curl, use `--skill`):**

```bash
# Install only gfa-geo into WorkBuddy
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy --skill gfa-geo

# Install only into Claude Code
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target claude --skill gfa-geo
```

> Available skill names: `_hub` (router), `gfa-title` (viral titles), `gfa-prompt-architect` (prompt architecture), `gfa-content-risk` (content risk check), `gfa-geo` (GEO rewriting), `gfa-position` (IP positioning stress-test). Install multiple with comma separation: `--skill gfa-geo,gfa-title`.

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
