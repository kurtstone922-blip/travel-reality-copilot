# Trip State Contract V0.1｜Itinerary Arrangement Draft

> Status: discussion draft. This contract extends the existing Place Discovery, Lodging and Route Validation state without replacing earlier product documents.

## 1. Purpose

Arrangement turns traveler-selected places, lodging anchors, meals, reservations and transport boundaries into a traveler-reviewable itinerary structure. It does not discover a whole trip on the traveler's behalf and does not claim that the proposed route has already been verified.

The unit of work is normally one city/stay block. The traveler chooses between recommended Day by Day co-creation and a conservative one-pass baseline. Both use the same Trip State.

## 2. Responsibility boundary

- Place Discovery owns candidate discovery and the traveler's selection state.
- Stay Strategy owns lodging choice, lodging segments and hotel confirmation state.
- Itinerary Arrangement owns assignment to dates, geographic grouping, sequence and provisional time blocks.
- Route Validator owns evidence-backed feasibility, opening/closure, reservation, last-service and route-risk judgments.

Arrangement may identify an obvious missing input or suspected conflict, but must hand factual validation to Route Validator.

## 3. Arrangement readiness

Before arranging, obtain or explicitly mark assumptions for:

- city/stay-block dates and usable arrival/departure windows;
- traveler-selected `interested` and `must_do` items;
- fixed dates, booked times and other hard anchors;
- lodging anchor for each affected night, or a visible temporary area anchor;
- must-eat or fixed meal anchors;
- traveler pace and any known visit-duration adjustments;
- transfer days, luggage constraints and intercity connections.

Do not block all progress merely because lodging or flexible meals are undecided. Offer the traveler a choice to decide them now or continue with a visible working-area/window assumption. Keep route-compatible concrete candidates collapsed until requested. Record which days require re-arrangement only when a later choice departs materially from the working assumption.

Run this lodging/dining anchor check before both generation modes. An already booked restaurant requires only name, date, reservation time and address for arrangement.

## 4. Anchor hierarchy

Arrange in this order:

1. `locked`: booked transport, hotel, timed admission, fixed restaurant or event;
2. `must_do`: traveler-owned priorities that must remain unless they explicitly change them;
3. `route_shaping`: selected lodging, special transport, destination restaurant or remote place that materially changes the day;
4. `flexible`: selected items that may move between compatible days;
5. `conditional_window`: attempted only when the traveler can leave the preceding item by a stated threshold without threatening the next anchor;
6. `end_of_day_optional`: placed last and safe to skip;
7. `removed_by_user`: excluded only by an explicit traveler action.

Priority does not prove feasibility. A must-do item may remain in the draft while carrying a visible access or route risk for validation.

## 5. City-block arrangement flow

1. Preserve all locked, must-do and traveler-supplied items.
2. Place date-specific and time-specific anchors on eligible days.
3. Group remaining items by geographic relationship, compatible opening pattern and thematic logic.
4. Compare those groups with arrival/departure windows, lodging segments, traveler pace and meal anchors.
5. Propose one recommended cross-day distribution for the city block and explain the logic briefly. Do not manufacture alternate distributions once places and lodging are selected.
6. In Day by Day, ask the traveler to accept the distribution, move items, leave time open or return to Discovery.
7. Directly create an editable draft for the active day without asking the traveler to reselect assigned places.
8. On day confirmation, automatically hand the refined day to Route Validator.
9. After all intended days are confirmed, request city/stay-block confirmation before moving on.

In `one_pass_baseline`, generate the requested scope in one pass using mature route patterns and conservative density. The Agent must run reasonableness checks before display and must not knowingly create an overloaded route from its own suggestions. Later edits enter scoped Day by Day-style reflow and validation.

In Day by Day, do not expand a selected city-block shelf directly into a polished full-trip answer. In one-pass mode, the full baseline is allowed but remains lighter than the final roadbook.

## 6. Daily arrangement rules

For each day:

- begin from the applicable hotel, arrival point or previous-city connection;
- honor fixed-time anchors first;
- group flexible places to reduce avoidable backtracking;
- integrate must-eat restaurants as route anchors when the traveler treats them as destinations;
- use flexible meals as windows or areas rather than inventing a specific restaurant;
- include realistic transition, queue, rest and meal buffers when evidence or traveler pace supports them;
- end at the applicable hotel, departure point or next fixed connection;
- place optional items last or inside genuinely flexible windows;
- preserve intentionally open time when the traveler prefers it.

When a real conflict creates materially different resolutions, show a small number of local options and let the traveler choose. Do not silently optimize only for shortest travel time; the traveler may value a view, event, meal, tempo or narrative sequence more.

If Day by Day selections exceed likely capacity, preserve them and offer high-intensity early/late travel, main-plus-optional, moving dates, adding a day or traveler-selected removal. A `conditional_window` must state the latest suggested departure from the preceding place and the threshold required to protect the next anchor.

## 7. Arrival, departure and transport boundaries

- An afternoon arrival requires a traveler choice about same-day sightseeing; a late arrival defaults to no attraction plan unless requested.
- Calculate a departure day backward from the booked service.
- Default to arrival at the airport three hours before international/border-processing flights and two hours before domestic/simplified-regional flights. Airport travel time is additional; official requirements override defaults.
- Ordinary intercity rail, complex stations, special trains and ferries use separate operator-aware report/buffer rules. Urban transit does not inherit airport or intercity buffers.
- Store every A-to-B route leg and a whole-day route reference when possible. Native maps, Google Maps, Amap and link-only rendering are presentation capabilities, not evidence of timetable verification.
- A specific recommended or next departure may be shown only when a real timetable source is available.

## 8. Plan B

Plan B is available only in Day by Day and is off by default. The Agent may offer it for a tight day or feasibility question, but generates it only after traveler request. The default simulation starts from the first itinerary item; the traveler may choose another node or time. Preserve the baseline, propagate the delay only through the remaining day, and show the first conflict without making the resolution decision.

## 9. Provisional assumptions

An arrangement is `provisional` when a missing choice could materially change the route, including:

- undecided lodging or use of a temporary lodging area;
- unknown fixed reservation time;
- unresolved arrival/departure connection;
- undecided must-eat restaurant with route impact;
- unverified access or opening constraint;
- an unresolved blocking/high issue from Route Validator.

Show the assumption next to the affected day and record `reflow_triggers`. When the missing input arrives, revise only affected days.

## 10. Change and confirmation policy

- A proposed arrangement does not confirm any item or date.
- The traveler may move, remove, reprioritize or add custom items before validation.
- Never remove a `must_do`, change a locked anchor or accept a conflict without explicit traveler choice.
- When a hotel, meal anchor, reservation or transport boundary changes, calculate the affected scope and preserve unrelated confirmed days.
- A validated day may become `confirmed` only after the traveler confirms it.
- Reopening one confirmed day does not reopen the entire city block unless cross-day distribution must change.
- Accepting a route-compatible hidden hotel/restaurant candidate requires at most a local anchor check. Choosing outside the working assumption or adding a fixed booking triggers scoped reflow and validation.

## 11. Suggested state shape

```json
{
  "itinerary_arrangement": {
    "active_city_block_id": null,
    "status": "not_started",
    "generation_mode": "undecided",
    "arrangement_unit": "city_block_then_day",
    "pre_arrangement_anchor_check": {
      "status": "not_started",
      "lodging": null,
      "dining": null
    },
    "assumptions": [],
    "reflow_triggers": [],
    "unassigned_selected_items": [],
    "city_block_distribution": [],
    "days": []
  }
}
```

## 12. Arranged day shape

```json
{
  "id": "tokyo-day-01",
  "date": null,
  "status": "draft",
  "start_anchor": null,
  "end_anchor": null,
  "theme_or_area_logic": null,
  "items": [],
  "open_windows": [],
  "route_legs": [],
  "plan_b": {
    "status": "not_requested",
    "baseline_preserved": true,
    "trigger": null
  },
  "assumptions": [],
  "reflow_triggers": [],
  "validation_status": "not_requested",
  "confirmation_status": "unconfirmed"
}
```

## 13. Arranged item shape

```json
{
  "item_id": "discovery-item-id",
  "kind": "place",
  "anchor_level": "flexible",
  "sequence": 2,
  "time_block": {
    "start": null,
    "end": null,
    "precision": "window"
  },
  "duration_range": null,
  "route_role": "area_cluster",
  "status": "proposed",
  "notes": [],
  "verification_status": "unverified"
}
```

Time blocks are planning hypotheses until validated. Avoid false precision when exact travel, opening or visit-time evidence is unavailable.
