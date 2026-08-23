# Growth Flow Skill Getting Started

> Complete manual for the [Growth Flow Skill content acquisition skill collection](../README.en.md).

---

## Table of contents

- [One-line intro](#one-line-intro)
- [Install](#install)
- [How to use](#how-to-use)
- [Skill directory](#skill-directory)
- [Common scenarios](#common-scenarios)
- [Update and uninstall](#update-and-uninstall)
- [FAQ](#faq)

---

## One-line intro

Describe your real content / traffic / conversion problem to your Agent. It will call the matching skill and give you an actionable methodology plus the next step.

All skills are **methodology free editions**: they teach you how, give you templates, and diagnose for you; but they will not process your private data, connect to your paid APIs, or expose license logic.

---

## Install

### Option 1: one-line install to all clients (recommended)

```bash
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

Restart your Agent tool after installation.

### Option 2: install to a specific client

**WorkBuddy**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy
```

**Claude Code**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target claude
```

**Codex / Cursor / other Agents**

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target agents
```

### Option 3: install only one skill (on demand, not the whole set)

If you only need one capability (e.g., just GEO rewriting), you don't have to install the whole collection:

**Via npx (Claude / Codex / Cursor etc., `--skill` to pick a name):**

```bash
# Install only gfa-geo (GEO rewriting)
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --skill gfa-geo -g

# Install several at once (repeat --skill)
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --skill gfa-geo --skill gfa-title -g

# Preview available skills in this repo first
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills --list
```

**WorkBuddy / a specific client (via curl, `--skill` to pick a name):**

```bash
# Install only gfa-geo into WorkBuddy
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy --skill gfa-geo

# Install only into Claude Code
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target claude --skill gfa-geo
```

> Available skill names: `_hub` (router), `gfa-title` (viral titles), `gfa-prompt-architect` (prompt architecture), `gfa-content-risk` (content risk check), `gfa-geo` (GEO rewriting). Install multiple with comma separation: `--skill gfa-geo,gfa-title`.

### Option 4: interactive install### Option 3: interactive install

If you are not sure which Agent client is installed:

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install-interactive.sh | bash
```

---

## How to use

After installation, describe your problem in chat. The Agent will match the trigger words automatically.

### Direct hit

| You say | Skill triggered |
|---|---|
| "Give me 10 Xiaohongshu titles" | `gfa-title` |

### Route via _hub

If you are unsure which skill to use, just say:

- "I want to do content acquisition"
- "Help me grow this account"
- "My article traffic is bad, diagnose it"

`_hub` will clarify your goal first, then route you to the best skill.

---

## Skill directory

The full skill catalog (grouped by category + trigger words + install methods) lives in **[skills-全目录.md](./skills-全目录.md)** (Chinese). Currently live:

| skill | One-liner | Trigger words |
|---|---|---|
| `_hub` | Routing core, intent dispatch | content acquisition / acquisition / grow account / create content |
| `gfa-title` | Viral title methodology | titles / viral titles / Xiaohongshu·WeChat·Douyin titles / SEO·GEO |
| `gfa-prompt-architect` | Six-element prompt architecture | write prompt / optimize prompt / prompt architect / system instruction / generator |
| `gfa-content-risk` | Pre-publish content risk checker | check violation / pre-publish self-check / will it be throttled / clickbait |
| `gfa-geo` | GEO rewriter (make AI engines cite you) | GEO optimization / cited by AI / raise AI citation / GEO-ify content |

> More skills (WeChat diagnosis / B2B hard-sell / content diagnosis / IP growth / topic / script / private-domain) are being polished one by one — stay tuned.

---

## Common scenarios

### Scenario 1: preparing a Xiaohongshu post

```
You: Give me 10 Xiaohongshu titles about "sourcing from 1688 for Taiwan e-commerce"
Agent (gfa-title): 10 titles + SEO/GEO keyword layering for each
```

### More scenarios coming

WeChat traffic diagnosis / B2B hard-sell / content diagnosis / IP growth / topic generation / script polishing / private-domain conversion are being polished one by one. Until each goes live, `_hub` will point you to it.

---

## Update and uninstall

### Update

Re-run the install command to update incrementally:

```bash
npx -y skills add wuhuachao-maker/Growth-Agent-Wuskills -g --all
```

Or tell your Agent:

```
Update Growth Flow Skill skill collection
```

### Uninstall

If you installed via `bridge/install.sh`:

```bash
curl -sL https://raw.githubusercontent.com/wuhuachao-maker/Growth-Agent-Wuskills/main/bridge/install.sh | bash -s -- --target workbuddy --uninstall
```

If you installed via `npx skills add`, delete the `Growth-Agent-Wuskills` symlink in the corresponding client skills directory.

---

## FAQ

**Q: My Agent doesn't respond after install.**

1. Restart your Agent tool.
2. Confirm the skill appears in the client's skills directory.
3. Say a trigger phrase directly, e.g. "Give me 10 Xiaohongshu titles".

**Q: Can I modify these skills for personal use?**

Yes, but only for personal / non-commercial use, and you must keep the CC BY-NC 4.0 declaration. Commercial use requires author authorization.
