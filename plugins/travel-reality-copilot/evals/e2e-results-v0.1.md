# Cross-Skill End-to-End Review V0.1

Date: 2026-09-03

## Test level

This review combines contract-level checks with a black-box run of the locally installed Plugin in a fresh Codex task. It validates plugin discovery, state ownership, routing, confirmation boundaries and cross-skill handoffs. It is not a claim that every host model will produce identical wording or reasoning.

## Automated contract check

Run:

```bash
node evals/run-contract-checks.mjs .
```

The check covers:

- plugin manifest identity and interface metadata;
- discovery of the Orchestrator and six business Skills;
- Skill frontmatter and local reference paths;
- JSON parsing, schema reference integrity and example compatibility;
- full-state versus Lite-State separation;
- core behavioral invariants;
- evaluation-case coverage for every Skill.

Latest result: **75 passed, 0 failed**.

## Installed-plugin black-box run

Environment: Codex desktop, locally installed personal Plugin `travel-copilot-kit-v0-1@personal`, version `0.1.0`.

Fresh-task result: **5 passed, 0 failed**.

| Input case | Observed behavior | Result |
|---|---|---|
| “I want to travel in Japan for ten days.” | Invoked the Orchestrator, offered route directions, and stopped for the traveler’s route/interest decision instead of producing a complete itinerary. | Pass |
| Known Japanese cities supplied in uncertain order | Proposed a coherent Osaka–Tottori–Izumo–Hiroshima/Miyajima–Fukuoka corridor and stopped for corridor confirmation. | Pass |
| Confirmed route followed by “continue” | Explicitly asked the traveler to choose Day by Day or one-pass baseline; it did not infer the mode. | Pass |
| Tokyo hotel changed to Shinjuku | Requested the exact hotel or station, limited the impact analysis to Tokyo, and preserved Kyoto and Osaka. | Pass |
| Five selected places with the last one optional | Preserved all four priorities and represented the fifth as optional; it did not silently delete a place. | Pass |

These runs verify the most important Alpha claim: the package can alter model behavior through routed Skills and explicit decision boundaries, not merely store design documentation.

## Cross-skill walkthroughs

| Scenario | Primary owner | Supporting owner | Expected stop point | Contract result |
|---|---|---|---|---|
| Japan, 10 days, known cities but uncertain order | Route Skeleton | Validator for difficult transfers | Confirm route corridor | Pass |
| Confirmed skeleton, traveler says “continue” | Orchestrator | — | Choose Day by Day or one-pass | Pass |
| Long voice-style input with places and one booked meal | Orchestrator | Route/Stay/Dining as needed | Highest-impact missing decision | Pass |
| Recommend dinner only if tonight's route allows | Dining Strategy | Route Validator | Choose among route-compatible candidates | Pass |
| Change a selected Tokyo hotel and review impact | Stay Strategy | Arranger + Validator | Approve affected-day reflow | Pass |
| Five desired places, last one may be skipped | Itinerary Arranger | Route Validator | Accept optional/conditional placement | Pass |
| Ask whether an overloaded day is possible | Route Validator | Arranger for a chosen resolution | Traveler selects risk trade-off | Pass |
| Request Plan B after possible first-stop delay | Itinerary Arranger | Route Validator | Accept Plan B consequence | Pass |
| Compress three Tokyo days into two | Route Skeleton | Arranger + Validator | Confirm structural compression | Pass |
| Move a booked restaurant to another day | Dining/Arranger | Validator | Confirm itinerary move and external follow-up | Pass |

## Failure-mode review

### One-click regression

Result: protected at the contract level.

The Core Prompt forbids selecting a generation mode for the traveler. Route Skeleton must confirm corridor and allocation first. Day by Day is presented first and recommended. One-pass is permitted only after explicit traveler choice and must remain a conservative baseline rather than a polished final roadbook.

### Multiple Skills interrogating the traveler

Result: protected at the routing level.

The Orchestrator selects one primary output owner. Supporting Skills provide checks without opening separate questionnaires. Only the highest-impact visible decision is presented.

### Silent deletion or optimization

Result: protected at state and Skill levels.

Traveler-selected, must-do, confirmed and locked records are preserved. Overload is represented through risks, conditional windows, optional placement or traveler-facing choices. A Skill returns a proposal; it does not silently delete personal priorities.

### Whole-trip rewrite after a local change

Result: protected by active scope, `base_revision` and patch ownership.

Hotel, dining or day changes identify affected dates. Unrelated confirmed days remain unchanged. Stale patches must be rebuilt rather than applied.

### False external booking state

Result: protected.

Itinerary intent and external reservation state are separate. Moving or removing a booked item can create an external traveler action but cannot claim that the booking was changed or cancelled.

### False transport precision

Result: protected when the host follows the contract.

Specific services and next departures require a real timetable capability. Otherwise the state remains `estimated_unverified`, provides map/search links where possible and adds a verification task.

## Remaining runtime risks

1. A host model may ignore progressive disclosure and load more references than necessary.
2. A weaker model may produce a full itinerary despite the generation-mode boundary.
3. Natural-language patches may drift from the JSON Patch-like contract unless structured output is enforced by the host.
4. Different hosts expose different map, web, image and file capabilities; capability detection must be tested per host.
5. Very long user input may require deterministic state extraction to avoid missing a fixed anchor.

These risks do not block the Alpha source package. Broader scenario coverage and cross-host testing remain necessary before calling the release stable.

## Current verdict

Technically ready for an Alpha repository release. Local installation and the first model-level black-box suite pass. Not yet labeled stable.
