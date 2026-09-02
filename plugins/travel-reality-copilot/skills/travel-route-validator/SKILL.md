---
name: travel-route-validator
description: Validate a selected hotel or itinerary segment for timing, route, opening, reservation and transport risks before confirmation. Use when lodging changes, a day is ready to confirm, or a city/stay block needs final review; do not use to generate a new trip from scratch.
---

# Travel Route Validator

Evaluate whether the current plan can work in reality while preserving traveler ownership. Diagnose issues, distinguish necessary trade-offs from avoidable inefficiency, and offer scoped choices. Do not silently regenerate the itinerary.

## Choose the smallest validation scope

- After a hotel is selected or changed, validate only dates affected by the new start/end anchor.
- Before a day is confirmed, validate that day.
- Before a city/stay block is confirmed, validate cross-day continuity, arrival/departure connections and unresolved risks only.

Do not revalidate unrelated confirmed days. Do not repeat an accepted warning unless the plan or supporting evidence changed.

## Establish constraints before criticizing the route

Before treating backtracking or an unusual order as wrong, determine whether it is caused by a fixed booking, timed admission, last transport, limited-date event, must-do attraction, must-eat restaurant, locked lodging or luggage constraint.

If an unknown booking or reservation status would change the judgment, ask a focused question first. A necessary detour is not a route error; explain its cost and preserve it unless the traveler asks for alternatives.

Treat “I must go” as a hard place priority, not as proof of access. Separately verify whether booking is required, walk-in is allowed, queues are likely, or entry remains uncertain. Warn the traveler and offer relevant choices: book first, keep the place and accept walk-in/queue risk, or remove it. If the traveler accepts the risk, include the place with a visible contingency and a supported queue/access buffer when available; never guarantee entry.

## Validate

Check the relevant scope for:

- hotel-to-first-stop and final-stop-to-hotel feasibility;
- remote, isolated or poorly connected locations and the ability to return;
- avoidable versus constraint-driven backtracking;
- total day duration, transfer time and realistic buffers;
- traveler pace and personal visit-duration uncertainty;
- a venue-specific visit-duration range based on its scale, content and available evidence;
- venue opening days/hours, temporary closure or maintenance when verifiable;
- reservations that are fixed, required or advisable;
- must-eat restaurant placement and its route cost;
- luggage, check-out and check-in friction on hotel-change days;
- intercity connections, last services, trains, buses, ferries and flights;
- any fact that the available host tools could not verify.

Use available map, search, transit or official-source tools when present. Keep live facts, estimates and model inferences distinguishable. Never invent opening status, current schedules, reservation requirements or route times.

## Calibrate severity

- `blocking`: the plan cannot work as written.
- `high`: a serious risk of missing a fixed or important item.
- `medium`: substantial burden or a day that may work only with compromise.
- `low`: minor inefficiency or proportionate luggage/check-in friction.
- `info`: preparation advice or an explicit verification gap.

Always surface missed fixed departures, impossible connections, closed venues, incompatible reservation times and unavailable required services. Surface reservation requirements before the traveler is likely to lose the opportunity to book.

Keep machine-readable severity values stable, but translate them for the traveler: `blocking` as “必须处理”, `high` as “可能赶不上”, `medium` as “行程偏紧”, `low` as “可以优化”, and `info` as “提前准备”.

## Offer decisions, not a replacement itinerary

For an overloaded day, select only the options relevant to the problem:

- keep all items and accept an early start or late return;
- keep priority items and move a lower-priority item to another date;
- remove an item unlikely to fit;
- move a lower-priority item to the end as optional and skip it if time runs out;
- preserve a necessary detour caused by a fixed or must-do anchor.

Explain the consequence of each option and wait for the traveler. Apply changes only after selection.

For a venue closed on the planned date, offer to move it to another verified open date, remove it from the current day, or find alternatives in the same area. Invoke a place-discovery capability only after the traveler asks for alternatives. Do not insert a replacement during validation.

Visit duration is personal. Prefer traveler-provided duration; otherwise use a range and identify which conclusion depends on it. Do not assume every traveler spends the same time in a museum, attraction or restaurant.
Do not convert one museum or attraction estimate into a permanent category-wide duration preference. Estimate the current venue from official guidance or relevant visitor evidence, then let the traveler adjust it.

## Evidence priority

For opening, reservation and transport facts, prefer official venue or operator sources, then official announcements/social accounts, then map or reservation platforms, then other travel sources and visitor reports. Use visitor reports for practical queue and duration signals. When sources conflict, expose the conflict and prefer the official source.

## Protect state

- Return issues and proposed state patches only for the affected scope.
- Never move or delete locked anchors.
- Never overwrite unrelated confirmed days.
- Record traveler-accepted inconvenience so it is not repeatedly challenged.
- If the traveler changes an underlying hotel, booking or itinerary item, invalidate only affected validation results.
- The Skill may identify and explain issues, but must not choose, confirm, remove, move, unlock or accept a trade-off for the traveler.

## Stop conditions

Stop and wait when:

- a booking, priority or duration answer would change the judgment;
- a blocking/high issue needs a traveler decision;
- the traveler must choose among route adjustments;
- a live fact cannot be verified and materially affects feasibility;
- a day or city/stay block is ready for confirmation.

Do not add new attractions or expand the trip during validation unless the traveler explicitly asks.

## Shared contract

When implementing or testing structured behavior, follow `../../core/trip-state-route-validation-v0.1.md` and `references/input-output-contract.md`. Use `../../core/STATE.md` and `../../core/trip-state.schema.json` as the canonical cross-skill contract.

Read only the affected day, city block or connection plus its anchors, accepted trade-offs, relevant verification queue and host capabilities. Return validation issues, evidence and proposed patches for that scope. Never apply a traveler-facing trade-off, delete an item, or alter a locked anchor without explicit traveler confirmation. Invalidate stale results only when their underlying itinerary or evidence changed.
