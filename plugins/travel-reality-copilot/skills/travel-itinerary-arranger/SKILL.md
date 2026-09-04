---
name: travel-itinerary-arranger
description: Arrange traveler-selected places, lodging, meals, reservations and transport boundaries across a city block and its days. Use after meaningful selections exist or when a traveler asks to organize them; do not use for broad place discovery or to claim route feasibility without validation.
---

# Travel Itinerary Arranger

Turn a traveler-owned set of choices into a clear, revisable itinerary. Preserve participation in guided planning while also supporting a conservative one-pass baseline.

## Establish the working scope

Arrange one city/stay block at a time unless the traveler chooses a whole-trip baseline or asks for a smaller affected scope. Do not create alternate arrangements after hotels and places are already selected merely to provide variety. Produce one recommended arrangement; offer local alternatives only when a real conflict or material trade-off exists.

Read selected places, statuses, personal reasons, fixed anchors, lodging segments, meal anchors, arrival/departure windows, traveler pace and accepted trade-offs from Trip State. Do not ask again for facts already present.

If too few items exist to form the requested scope, offer to leave time open or hand back to Place Discovery. Do not fill the gap automatically.

## Separate arrangement from validation

You own date assignment, clustering, sequence and provisional time blocks. Route Validator owns current opening, closure, exact transit feasibility, last service, reservation/access risk and final route judgment.

You may flag suspected constraints, but label them for validation. Never describe an unvalidated draft as feasible, optimized or confirmed.

## Run the pre-arrangement anchor check

Before either generation mode, read or ask about booked/selected lodging, split-stay nights, must-eat or booked restaurants, fixed booking times, arrival/departure connections and luggage transfers. Group 2–4 closely related anchor questions when useful. A booked restaurant needs only its name, date, reservation time and address for arrangement. If the traveler answers only part of the anchor check, preserve the rest as unanswered; do not treat silence as postponement.

If lodging or ordinary dining is postponed, continue using a visible working assumption rather than acting as though it has no route effect. Keep concrete candidates collapsed: show the assumed lodging area and meal area/window, while retaining route-compatible hotel and restaurant candidates for later reveal. Accepting a compatible candidate should require at most a local anchor check, not whole-trip reflow. A traveler-provided off-route hotel, distant restaurant or fixed reservation may require scoped re-arrangement and validation.

Flexible meals do not require restaurant selection. Reserve a sensible meal window/area without fabricating a restaurant. Treat a must-eat restaurant like a place anchor.

## Let the traveler choose the generation mode

Offer both modes after the anchor check. Put `day_by_day` first and label it recommended, but never enter it without traveler choice.

- `day_by_day`: create an actionable draft for the active day, let the traveler edit it, validate on confirmation, then continue. Allow switching dates, batch-generating remaining dates, pausing or switching modes.
- `one_pass_baseline`: generate a conservative baseline for the requested city blocks or trip. Use mature route patterns, known preferences, route-compatible working lodging/meal assumptions and internal reasonableness checks. Do not deliberately overload a day. Keep detail lighter than Day by Day and invite the traveler to edit or deepen selected dates afterward.

A date edited after one-pass generation enters the same local editing and confirmation behavior as Day by Day.

## Offer a custom arrangement path

When presenting meaningful Day by Day route variants, always include a traveler-defined option after the Agent proposals. Use a compact structure such as A recommended, B alternative, C lighter or higher-intensity when genuinely distinct, and D custom arrangement. Do not manufacture three variants when only one route is sensible; still offer `D. 自定义安排` so the traveler can specify order, timing, priorities or free windows in natural language.

## Separate transport-detail mode from itinerary generation

After lodging and the itinerary structure are settled, let the traveler choose how to refine transport:

- `transport_day_by_day` — recommended for complex, tight or reservation-heavy trips; refine one day, surface risks and confirm before continuing;
- `transport_batch` — fill route legs across all requested dates, then summarize clear days and group only exceptions that need decisions;
- `transport_risk_scan` — inspect major connections and risks without filling every leg;
- `transport_deferred` — postpone while keeping the completion item open.

Batch refinement is not one-click itinerary generation: traveler-selected places and dates remain unchanged. Populate ordinary no-conflict legs without interruption, preserve evidence status, then present blocking/high issues first and lower-confidence verification items separately. Never invent exact services when no timetable capability exists.

## Build the arrangement

1. Place locked and fixed-date/time anchors first.
2. Preserve every `must_do` item.
3. Cluster flexible selections by geography, compatible time pattern and experience logic.
4. Fit clusters to usable day windows, lodging segments, transfer days and traveler pace.
5. Keep conditional and end-of-day optional items visibly optional and safe to skip.
6. Explain the proposed distribution in concise, decision-relevant language.
7. In Day by Day, wait for the traveler to accept, move items, leave time open or request more discovery before refining the active day.
8. In one-pass mode, run reasonableness checks before presenting the baseline and automatically remove or demote only Agent-suggested, unconfirmed filler when necessary. Show the resulting baseline rather than an intentionally overloaded draft.

Do not treat generic popularity as an arrangement priority. Preserve why the traveler selected each item.

## Compose a day progressively

In Day by Day, after the cross-day distribution is accepted, directly compose an editable active-day draft from its hotel/arrival anchor to its hotel/departure anchor. Do not ask the traveler to reselect already assigned places. Place timed anchors first, then arrange flexible items around them. Include the planned departure time, visit ranges, every inter-place transport leg, meal windows, daily load, unresolved risks and remaining open time.

Avoid false minute-level precision. Use approximate windows when travel times, queues, opening details or personal visit durations are not verified.

If a real conflict creates materially different resolutions, present a small number of local options and let the traveler choose. Do not generate two or three whole-city variants after the traveler has already selected their places and hotel.

When selected places exceed likely capacity in Day by Day, keep them visible and let the traveler choose high-intensity early/late travel, main-plus-optional, moving dates, adding a day or removing items. You may recommend a classification but must not silently delete traveler-selected content. Agent-suggested, unconfirmed items in a one-pass baseline may be proposed for movement, optional status or removal, but every change must be visible.

Use `conditional_window` for an optional place between important anchors. State the latest suggested departure from the preceding place and the latest departure from the optional place needed to protect the next anchor. If route evidence is unavailable, use durations and mark the clock threshold unverified rather than inventing precision.

When later revealing route-compatible lodging, show one suggested plan hotel first in the Web Demo and allow expansion; conversational AI may show two or three with one marked recommended. For route-compatible ordinary dining, show only a small set, normally two or three, and load more only on request. These candidates remain unconfirmed until the traveler acts.

## Handle arrival and departure days

Use actual arrival/departure boundaries when booked; otherwise use explicit approximate windows and mark reflow after booking. Ask whether the traveler wants sightseeing after an afternoon arrival. A late arrival defaults to no attraction plan but may include a traveler-requested meal, walk or night view.

For departure, calculate backward from the booked service. Default airport-arrival targets are three hours before international/border-processing flights and two hours before domestic/simplified-regional flights; travel to the airport is additional. Official carrier/airport requirements override defaults. For ordinary reserved intercity rail, use roughly 30 minutes before departure as a fallback; allow 45–60 minutes for a complex station, luggage or unfamiliar transfer. Special trains, international rail and ferries follow operator reporting rules. Do not apply airport or intercity buffers to urban transit.

## Provide route links without overstating tools

Represent every A-to-B leg structurally. Prefer a native map when supported; otherwise provide Google Maps for international destinations or Amap for mainland China. Provide a whole-day route link when supported, and fall back to split or per-leg links when waypoint or platform limits apply. Link availability does not verify schedules.

Distinguish `transit_schedule`, `route_duration` and `map_link_only` capabilities. Only show a specific recommended/next departure when a real timetable source is available. Map limitations must not add, remove or reorder itinerary items.

## Generate Plan B only on request

Plan B belongs to Day by Day and is off by default. Offer, but do not generate, it when a day is visibly tight or the traveler asks whether the day is feasible. Generate it when the traveler explicitly asks about delay, a missed service or another scenario.

By default simulate from the day's first itinerary item; let the traveler override the trigger node or time. Preserve the baseline and propagate the scenario only through the remaining day. Show the first resulting conflict and possible responses; do not apply a response for the traveler or recursively create Plan C/D.

## Preserve traveler control

- Never silently delete or move a `must_do` item.
- Never alter a booked/locked hotel, restaurant, admission or transport anchor.
- Never accept an overloaded day or access risk for the traveler.
- Offer changes as scoped proposals and wait for approval.
- Keep deliberately free time free.
- Recalculate only days affected by a later hotel, meal, reservation or transport change.

## Hand off and confirm

In Day by Day, clicking or expressing “confirm this day” automatically sends the refined day to Route Validator. Do not require a separate validation opt-in. During editing, use only lightweight reflow. If validation returns choices, preserve the current draft until the traveler selects a resolution. Apply only the approved scoped patch and revalidate affected content.

In one-pass mode, integrate conservative reasonableness checking before display. Do not make the traveler trigger validation for a route created by the Agent. Facts unsupported by current tools remain labeled estimated/unverified. Later user changes trigger scoped validation for affected dates.

When no unresolved blocking/high issue remains, ask the traveler to confirm the day. After all intended days in the city block are confirmed, request one block-level confirmation before proceeding to the next city.

Read `references/input-output-contract.md` when producing or consuming structured arrangement data. Follow `../../core/trip-state-itinerary-arrangement-v0.1.md` for domain semantics and `../../core/STATE.md` plus `../../core/trip-state.schema.json` for the canonical cross-skill state.

Read only the active city block or day, applicable route skeleton, selected place IDs, lodging and dining anchors, locked decisions, unresolved high-risk issues and host capabilities. Return a revision-checked patch scoped to affected days. Do not rewrite unrelated confirmed days. A proposed distribution, removal, anchor change or overload trade-off waits for traveler confirmation; after an accepted day patch, hand the affected scope to Route Validator.
