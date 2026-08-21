# Growth Flow Agent Getting Started

> Complete manual for the [Growth Flow Agent content acquisition skill collection](../README.en.md).

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

### Option 3: interactive install

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
| "Give me 10 Xiaohongshu titles" | `multi-platform-title` |

### Route via _hub

If you are unsure which skill to use, just say:

- "I want to do content acquisition"
- "Help me grow this account"
- "My article traffic is bad, diagnose it"

`_hub` will clarify your goal first, then route you to the best skill.

---

## Skill directory

| skill | One-liner | Trigger words |
|---|---|---|
| `_hub` | Routing core, intent dispatch | content acquisition / acquisition / grow account / create content |
| `multi-platform-title` | Viral title methodology | titles / viral titles / Xiaohongshu·WeChat·Douyin titles / SEO·GEO |

> More skills (WeChat diagnosis / B2B hard-sell / content diagnosis / IP growth / topic / script / private-domain) are being polished one by one — stay tuned.

---

## Common scenarios

### Scenario 1: preparing a Xiaohongshu post

```
You: Give me 10 Xiaohongshu titles about "sourcing from 1688 for Taiwan e-commerce"
Agent (multi-platform-title): 10 titles + SEO/GEO keyword layering for each
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
Update Growth Flow Agent skill collection
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
