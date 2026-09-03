# Travel Reality Copilot

> A participatory, stateful AI travel-planning capability pack for Codex and other agent-capable models.

[Overview](#overview) · [How it works](#how-it-works) · [Installation](INSTALL.md) · [Examples](EXAMPLES.md) · [Architecture](ARCHITECTURE.md) · [中文简介](#中文简介)

## Overview

Travel Reality Copilot is not a one-click itinerary prompt. It decomposes travel planning into coordinated Skills so that the traveler participates in shaping the route, places, accommodation, dining and daily movement.

The Agent can structure information, identify gaps, compare options, estimate feasibility and surface risks. When a choice depends on personal preference or a meaningful trade-off, it must stop and return the decision to the traveler.

This repository is simultaneously:

- an installable Codex Plugin / Skills capability pack;
- a portable travel-planning method for other agent environments;
- an AI Native Design case study connecting semantic interaction, state design, Skill routing and a visual web prototype.

## The problem

Many travel Agents respond to incomplete intent by generating a long, polished itinerary in one pass. That output can be difficult to review and often hides the decisions that actually shape a trip.

Travel is highly personal. One traveler may accept an early start and late return; another may spend half a day in one museum. A hotel, restaurant, booked activity, seasonal event or special train may legitimately reshape the entire route. Even a well-planned itinerary from one traveler may not fit another traveler's tempo.

Travel Reality Copilot therefore treats itinerary planning as progressive decision-making rather than content generation.

## How it works

1. Establish travel boundaries and a route skeleton.
2. Explore places and experiences from the traveler's curiosity and saved ideas.
3. Treat lodging, dining and reservations as real route anchors.
4. Let the traveler choose Day by Day co-creation or a one-pass baseline.
5. Validate transport, opening, reservation and time risks.
6. Stop at meaningful decision boundaries before changing traveler-owned choices.
7. Generate a roadbook that remains editable and keeps unresolved facts visible.

## Design principles

- Participation over one-click generation.
- Traveler decisions over silent Agent optimization.
- Confirmed and locked content is never silently rewritten.
- Time-sensitive claims retain evidence and verification status.
- Missing live data degrades explicitly instead of producing false precision.
- A local change recalculates only affected dates.
- Itinerary intent remains separate from external booking state.
- Durable Trip State remains separate from temporary conversation state.
- Skills receive scoped Lite State views to reduce repeated context and Token use.

## Capability map

| Skill | Responsibility |
|---|---|
| `travel-copilot-orchestrator` | Understand the current phase, select the primary Skill, merge results and enforce confirmation boundaries |
| `travel-route-skeleton` | Entry/exit points, route order, stop roles and day/night allocation |
| `travel-place-discovery` | Attractions, food, shops, events, special transport and experience discovery |
| `travel-stay-strategy` | Lodging areas, hotel candidates, loyalty preferences, split stays and lodging anchors |
| `travel-dining-strategy` | Dietary constraints, food preferences, restaurants, reservations and experience coverage |
| `travel-itinerary-arranger` | Cross-day distribution, daily sequence, route legs, flexible windows and opt-in Plan B |
| `travel-route-validator` | Feasibility, opening, access, reservations, final services, backtracking and overload risk |

## Two generation modes

### Day by Day — recommended

The Agent works through one city block or day at a time. The traveler selects places, understands the route and confirms each meaningful step. Detailed Plan B behavior remains opt-in.

### One-pass baseline

The Agent produces a conservative overview after checking basic reasonableness. It is intentionally lighter than the final roadbook. The traveler can reopen any day and continue with the more participatory flow.

The Agent never infers the generation mode from a long message, voice input or “continue.” The traveler chooses it explicitly.

## State architecture

- `core/trip-state.schema.json` — canonical cross-Skill source of truth.
- `core/trip-state.example.json` — full example state.
- `core/trip-state-lite.example.json` — scoped Skill-call projection.
- `core/STATE.md` — ownership, patch and confirmation rules.

Skills do not need to reread the entire conversation on every turn. The Orchestrator projects the relevant part of the full state into a Lite State, the selected Skill returns a scoped patch, and the patch is merged only after any required traveler decision.

## Project status

Current release: `0.1.1-alpha`

- Codex Plugin manifest: passed the local official validator.
- Skills: 7/7 passed structural validation.
- Automated contract checks: 75 passed, 0 failed.
- Behavioral cases: cover the Orchestrator and all six business Skills.
- Conversation continuity: interrupted confirmations, partial answers and explicit next actions are covered by the Orchestrator protocol.
- Host compatibility: model-level testing is still required across Codex, Claude Code, Gemini and general web-based models.

This is a research and personal-evaluation Alpha, not a booking service. Weather, transport, tickets, visas, prices, opening information and inventory should be verified with authoritative sources.

## Quick start

Read [INSTALL.md](INSTALL.md), then begin with a request such as:

```text
I want to spend 10 days in Japan, entering through Osaka and leaving from Fukuoka. I want to visit Tottori, Izumo, Hiroshima and Miyajima, but I do not know the right order. Plan it with me step by step instead of generating the complete itinerary at once.
```

See [EXAMPLES.md](EXAMPLES.md) for more interaction patterns.

For non-plugin testing in Gemini, DeepSeek, Kimi or another general AI model, upload or paste [Travel-Reality-Copilot-Universal-Prompt-v0.1.1.md](Travel-Reality-Copilot-Universal-Prompt-v0.1.1.md) as one instruction document.

## Repository structure

```text
travel-copilot-kit-v0.1/
├── .codex-plugin/plugin.json
├── core/
│   ├── core-prompt-v0.1.md
│   ├── STATE.md
│   ├── trip-state.schema.json
│   └── trip-state-*.md / *.json
├── skills/
│   ├── travel-copilot-orchestrator/
│   └── travel-*/
├── evals/
│   ├── run-contract-checks.mjs
│   └── *-cases-v0.1.md
├── ARCHITECTURE.md
├── EXAMPLES.md
└── INSTALL.md
```

## Validation

Node.js 18 or newer is required for the repository-level contract test:

```bash
node evals/run-contract-checks.mjs .
```

Expected result:

```text
75 passed, 0 failed
```

## Privacy and cost

The package does not contain the author's model, map or hotel API keys and does not require the author's server. Available capabilities, Token consumption, search results and map experience depend on the Agent environment and account used by the traveler.

## License

Copyright © 2026 Weicheng Shi. This repository is source-available for personal, non-commercial evaluation only. Copying, redistribution, publication of modified versions, commercial use and incorporation into another product are prohibited without prior written permission. See [LICENSE](LICENSE).

## 中文简介

Travel Reality Copilot 是一套参与式、状态化的 AI 旅行规划能力包，不是一键生成行程的 Prompt。

它通过一个 Orchestrator 调度路线骨架、地点探索、住宿、餐饮、逐日安排和现实验证六个 Skills。Agent 可以整理、估算、比较和提示风险；涉及路线、个人偏好、酒店、预约、删除景点或接受风险时，必须停下来由旅行者决定。

当前为个人非商业评估版。可以下载并在自己的环境中试用，但未经书面许可不得复制传播、修改后发布、商用或集成到其他产品。
