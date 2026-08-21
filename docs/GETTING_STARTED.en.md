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
- [Commercial version](#commercial-version)
- [FAQ](#faq)

---

## One-line intro

Describe your real content / traffic / conversion problem to your Agent. It will call the matching skill and give you an actionable methodology plus the next step.

All skills are **methodology free editions**: they teach you how, give you templates, and diagnose for you; but they will not process your private data, connect to your paid APIs, or expose license logic.

For **full automation + private data integration + commercial licensing**, see [Growth Flow Agent Commercial](https://www.growthflowagent.com?utm_source=github-docs&utm_medium=manual&utm_campaign=free-skills).

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
| "My WeChat account recommendation ratio dropped" | `gzh-traffic-diagnosis` |
| "Write a B2B hard-sell post for me" | `b2b-hard-ad` |
| "Help me fix this short-video script" | `script-writing` |
| "I don't know what to shoot next week" | `topic-generation` |
| "I want private-domain conversion" | `private-domain` |

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
| `gzh-traffic-diagnosis` | WeChat traffic diagnosis | not recommended / shadow ban / good data but not pushed / low recommendation ratio |
| `b2b-hard-ad` | B2B hard-sell copy methodology | B2B post / SaaS product copy / lead conversion / AI Agent promotion |
| `content-diagnosis` | Content quality diagnosis | content diagnosis / copy check / is this good |
| `ip-growth` | Personal IP growth | IP growth / grow account / account matrix / follower path |
| `skill-engineering` | Skill engineering methodology | build skill / prompt engineering / Agent engineering |
| `topic-generation` | Content topic engine | no topics / topic library / what content / next week topics |
| `script-writing` | Short-video script polish | how to write script / spoken script / short-video copy / hook opening |
| `private-domain` | Private-domain conversion | private domain / Moments copy / community conversion / follow-up script |

---

## Common scenarios

### Scenario 1: preparing a Xiaohongshu post

```
You: Give me 10 Xiaohongshu titles about "sourcing from 1688 for Taiwan e-commerce"
Agent (multi-platform-title): 10 titles + SEO/GEO keyword layering for each
```

### Scenario 2: WeChat traffic suddenly drops

```
You: My WeChat recommendation ratio fell from 60% to 10%, diagnose it
Agent (gzh-traffic-diagnosis): Checklist (title, cover, open rate, engagement, account weight)
```

### Scenario 3: writing a SaaS product tweet

```
You: Write a B2B hard-sell post for an AI Agent product
Agent (b2b-hard-ad): Structure (pain point → solution → proof → CTA) + sample copy
```

### Scenario 4: don't know what to shoot next week

```
You: I don't know what to shoot next week
Agent (_hub or topic-generation): Ask about your niche, persona, monetization product, then give a 30-day topic library
```

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

## Commercial version

Free skills provide **methodology + diagnosis + steps**.

If you need:

- Real account data integration
- Automated publishing, collection, analysis
- Private knowledge base and license authorization
- Team collaboration and permission control

Use [Growth Flow Agent Commercial](https://www.growthflowagent.com?utm_source=github-docs&utm_medium=manual&utm_campaign=free-skills).

---

## FAQ

**Q: My Agent doesn't respond after install.**

1. Restart your Agent tool.
2. Confirm the skill appears in the client's skills directory.
3. Say a trigger phrase directly, e.g. "Give me 10 Xiaohongshu titles".

**Q: Can I modify these skills for personal use?**

Yes, but only for personal / non-commercial use, and you must keep the CC BY-NC 4.0 declaration. Commercial use requires author authorization.

**Q: What's the difference between free and commercial versions?**

Free = methodology + manual execution steps. Commercial = methodology + automation + private data + licensing.
