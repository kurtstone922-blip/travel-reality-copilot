---
name: travel-route-skeleton
description: Turn a traveler's entry/exit points, destination pool, fixed anchors and total duration into a confirmed city/region sequence and stay allocation. Use before daily itinerary arrangement or when city days/order change; do not use for detailed daily scheduling or broad destination discovery when no route direction exists.
---

# Travel Route Skeleton

Build the smallest route structure needed before lodging, dining and daily arrangement: where the traveler goes, in what direction, what role each stop plays, and how much time it receives.

## Preserve input without trusting its order

Treat traveler-mentioned destinations as retained by default, but do not assume spoken or written mention order is travel order. Preserve personal reasons, must-go status, bookings and entry/exit boundaries.

Normalize each item before planning. A name may represent an overnight base, day trip, short stop, transit point, region or attraction inside another stop. Do not count every name as a separate city or lodging segment.

If the traveler provides only a broad country/region with no destination pool, hand off to Place Discovery for 2–4 route directions. If they already provide a meaningful destination pool, do not restart generic destination recommendations.

## Choose the skeleton mode

- `user_defined_skeleton`: the traveler knows some or all sequence, stop purposes or durations. Preserve supplied structure and ask only about ambiguity that materially changes the route.
- `agent_recommended_skeleton`: the traveler wants all listed places but does not know order or allocation. Propose a sequence and duration based on entry/exit, geography, transfer structure, fixed anchors and desired experiences.

Do not force the traveler to label every stop abstractly. Infer a provisional role from arrival time, onward movement, must-go content, bookings and intended overnight location; ask only where alternatives remain meaningful.

## Establish direction before allocation

When sequence is unknown:

1. anchor the route at entry and exit;
2. retain the destination pool;
3. propose one geographically and operationally coherent route corridor;
4. explain significant backtracking or difficult connections;
5. let the traveler confirm or reorder it;
6. then determine stop roles and day/night allocation.

Do not decide that a route is overloaded solely from the number of place names. First determine whether stops are transit-only, short visits, day trips, shared bases or overnight stays, and what experiences the traveler actually wants.

## Determine stop roles from evidence

Use roles such as `entry_transit`, `overnight_base`, `short_stop`, `day_trip`, `shared_base_excursion`, `transfer_stop`, `exit_base` and `undecided`.

Arrival/departure time constrains the role but does not fully decide it. For example, an evening arrival may imply an overnight stay; ask whether the following day is for sightseeing or onward travel. A known must-go place prevents treating the stop as transit-only.

When the traveler knows desired experiences but not duration, use those experiences and transfer cost to recommend days/nights. When they know neither, provide representative experience context or hand the scoped question to Place Discovery before final allocation.

## Present a compact skeleton

For each stop show only:

- proposed days/nights or an explicit unknown;
- representative or traveler-selected experiences;
- role in the route;
- why it appears in this position;
- approximate burden to the next stop;
- assumptions and a meaningful trade-off.

Do not expand hotels, restaurants, local hour-by-hour schedules or final transit instructions at skeleton stage.

## Confirm before generation-mode choice

Confirm sequence and allocation before daily composition. Then always let the traveler choose:

- `day_by_day` / “逐步完成每天” first and marked recommended;
- `one_pass_baseline` / “一次性生成基础版”.

Never infer the generation mode from voice input, detail level or whether city days are known.

## Handle later global changes

When a confirmed city loses days, produce an impact-aware compression proposal.

- In Day by Day, preserve traveler-selected content, propose a compressed distribution, and mark preserved, high-intensity, conditional, at-risk, cannot-fit and date-unavailable items. Let the traveler confirm priorities and optional items.
- In one-pass mode, regenerate the affected baseline and visibly move, demote or remove only Agent-suggested unconfirmed filler. Preserve traveler selections, must-go items and locked anchors.

If an appointment lies on a removed date, the traveler may move it into the new itinerary immediately. Store the itinerary move separately from external reservation state. Mark `reschedule_intended` until the traveler confirms the external change; never claim it was changed or cancelled.

Only patch affected city blocks, connections, nights and dependent dates. Hand daily redistribution to Itinerary Arranger and reality checks to Route Validator.

Read `references/input-output-contract.md` for structured integration. Follow `../../core/trip-state-route-skeleton-v0.1.md` for domain semantics and `../../core/STATE.md` plus `../../core/trip-state.schema.json` for the canonical cross-skill state.

Read only the route, trip-boundary, traveler-constraint, locked-decision and capability fields needed for the active scope. Return a revision-checked scoped patch; do not rewrite the complete Trip State. Structural changes that alter stop order, days, nights, lodging or fixed reservations require traveler confirmation before application.
