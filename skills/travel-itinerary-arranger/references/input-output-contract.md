# Travel Itinerary Arranger｜Input, Output and Patch Contract V0.1

Read this reference for structured integration and tests. Pass only the active city block and the cross-block connections needed to arrange it.

## Input

```json
{
  "request": {
    "text": "Traveler's current message"
  },
  "context": {
    "trigger": "discovery_selection_complete",
    "generation_mode": "day_by_day",
    "current_city_block_id": "tokyo-01",
    "current_day_id": null,
    "available_capabilities": {
      "map_search": false,
      "route_computation": false,
      "web_search": false,
      "transit_schedule": false,
      "native_map_display": false,
      "map_link_generation": true
    }
  },
  "trip_state": {
    "date_range": {},
    "usable_day_windows": [],
    "selected_items": [],
    "fixed_anchors": [],
    "lodging_segments": [],
    "meal_anchors": [],
    "working_lodging_area": null,
    "working_meal_windows": [],
    "arrival_departure": {},
    "traveler_pace": "balanced",
    "accepted_tradeoffs": [],
    "confirmed_days": []
  }
}
```

## Output envelope

```json
{
  "action": "present_city_block_distribution",
  "scope": {
    "city_block_id": "tokyo-01",
    "affected_day_ids": []
  },
  "arrangement_status": "provisional",
  "summary": "What has been arranged and what still shapes it",
  "assumptions": [],
  "city_block_distribution": [],
  "active_day": null,
  "unassigned_items": [],
  "options": [],
  "state_patch": [],
  "handoff": null,
  "wait_for_user": true
}
```

Use one primary action:

- `ask_route_shaping_input`;
- `offer_resolve_or_assume`;
- `ask_generation_mode`;
- `present_city_block_distribution`;
- `present_one_pass_baseline`;
- `revise_city_block_distribution`;
- `present_day_arrangement`;
- `revise_day_arrangement`;
- `handoff_place_discovery`;
- `handoff_stay_strategy`;
- `handoff_route_validation`;
- `offer_plan_b`;
- `present_plan_b_simulation`;
- `request_day_confirmation`;
- `request_block_confirmation`;
- `report_limitation`.

## City-block day distribution

```json
{
  "day_id": "tokyo-day-01",
  "date": "2026-11-11",
  "usable_window": {
    "start": "09:00",
    "end": "21:00",
    "verification_status": "partially_verified"
  },
  "theme_or_area_logic": "East Tokyo cluster around a fixed evening meal",
  "assigned_item_ids": [],
  "optional_item_ids": [],
  "start_anchor": null,
  "end_anchor": null,
  "assumptions": [],
  "status": "proposed"
}
```

The distribution communicates grouping and trade-offs before detailed timings. Do not imply that every assigned item fits until validation.

## Day arrangement

```json
{
  "day_id": "tokyo-day-01",
  "status": "draft",
  "start_anchor": null,
  "end_anchor": null,
  "items": [],
  "open_windows": [],
  "route_legs": [],
  "plan_b": {
    "status": "not_requested",
    "baseline_preserved": true,
    "trigger": null,
    "affected_item_ids": [],
    "first_conflict": null
  },
  "assumptions": [],
  "reflow_triggers": [],
  "validation_status": "not_requested",
  "confirmation_status": "unconfirmed"
}
```

## Route leg

```json
{
  "id": "tokyo-day-01-leg-02",
  "origin_item_id": "asakusa",
  "destination_item_id": "ueno-museum",
  "travel_mode": "transit",
  "planned_departure": null,
  "duration_range": null,
  "recommended_service": null,
  "next_service": null,
  "google_maps_url": null,
  "amap_url": null,
  "verification_status": "unverified"
}
```

Populate `recommended_service` or `next_service` only from a real timetable capability. A map link lets the traveler inspect a route; it does not verify a service. Provide a whole-day route reference when supported and split or fall back to per-leg links when waypoint/platform limits apply.

## Conditional optional item

```json
{
  "item_id": "optional-place-id",
  "anchor_level": "conditional_window",
  "preceding_item_id": "museum-a",
  "next_protected_anchor_id": "museum-b",
  "latest_departure_from_preceding": "12:10",
  "latest_departure_from_optional": "13:25",
  "threshold_verification_status": "estimated",
  "skip_instruction": "If the first threshold is missed, continue directly to museum-b"
}
```

## Mode rules

- Offer `day_by_day` first and mark it recommended, but require traveler selection.
- `day_by_day`: compose the current day in detail; automatically invoke Route Validator when the traveler confirms it. Plan B remains opt-in.
- `one_pass_baseline`: internally check reasonableness and avoid Agent-created overload before display. Later edits use scoped Day by Day behavior.
- Run the lodging/dining anchor check before either mode. Booked restaurants need name, date, time and address.
- When lodging/dining is postponed, expose the working area/window assumption but keep compatible concrete candidates collapsed.

## Arrival/departure defaults

- airport target: three hours before international/border-processing departures;
- airport target: two hours before domestic/simplified-regional departures;
- airport access travel time is additional;
- official carrier, airport or operator requirements override defaults;
- rail, special train and ferry reporting buffers remain separate from airport defaults.
- ordinary reserved intercity rail may use a 30-minute fallback; a complex station, luggage or unfamiliar transfer may use 45–60 minutes when no stronger rule is available;
- special trains, international rail and ferries follow verified operator reporting requirements when available.

## Statuses

- `draft`: structure is being assembled;
- `provisional`: a named missing input or unverified route-shaping assumption could materially change it;
- `ready_for_validation`: the traveler accepts the structure and it can be checked;
- `validated_with_warnings`: Validator found only accepted or non-blocking warnings;
- `confirmed`: validation requirements are satisfied and the traveler confirmed it;
- `reflow_required`: a later change invalidated the affected arrangement.

## Patch boundary

- A proposal may patch arrangement draft state, but not confirmation state.
- `must_do` and `locked` anchors cannot be removed or moved without an explicit traveler action.
- A hotel, restaurant, reservation or connection change must produce a scoped affected-day list.
- Preserve unrelated confirmed days and accepted trade-offs.
- Arrangement patches do not mark facts verified; only validation evidence can change verification state.
- Plan B simulations do not patch the baseline unless the traveler selects a proposed response.
