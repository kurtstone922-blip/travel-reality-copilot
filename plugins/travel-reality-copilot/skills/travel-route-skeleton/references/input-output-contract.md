# Travel Route Skeleton｜Input, Output and Patch Contract V0.1

Read this reference when integrating or testing structured route-skeleton behavior.

## Input

```json
{
  "request": {
    "text": "Traveler's current route request"
  },
  "context": {
    "trigger": "destination_pool_provided",
    "available_capabilities": {
      "web_search": false,
      "map_search": false,
      "intercity_route_search": false,
      "transport_schedule": false
    }
  },
  "trip_state": {
    "entry": null,
    "exit": null,
    "total_days": 10,
    "destination_pool": [],
    "selected_experiences": [],
    "fixed_anchors": [],
    "arrival_departure": {},
    "existing_skeleton": null,
    "generation_mode": "undecided"
  }
}
```

## Output envelope

```json
{
  "action": "present_corridor",
  "skeleton_status": "corridor_proposed",
  "summary": "What the traveler is deciding",
  "route_corridor": [],
  "stop_cards": [],
  "connections": [],
  "assumptions": [],
  "options": [],
  "state_patch": [],
  "handoff": null,
  "wait_for_user": true
}
```

Use one primary action:

- `handoff_route_direction_discovery`;
- `ask_material_stop_intent`;
- `present_corridor`;
- `revise_corridor`;
- `present_allocation`;
- `revise_allocation`;
- `request_skeleton_confirmation`;
- `ask_generation_mode`;
- `present_structural_impact`;
- `apply_structural_patch`;
- `handoff_place_discovery`;
- `handoff_itinerary_arranger`;
- `handoff_route_validation`;
- `report_limitation`.

## Stop card

```json
{
  "stop_id": "stop-tottori",
  "sequence": 2,
  "name": "Tottori",
  "role": "short_stop",
  "days": 1,
  "nights": 0,
  "representative_experiences": ["Traveler-selected or scoped examples"],
  "position_reason": "Why it appears here",
  "next_connection_burden": "Approximate transfer burden",
  "assumptions": [],
  "tradeoff": null,
  "verification_status": "partially_verified"
}
```

Keep cards at city/region level. Hotels, restaurants and hour-by-hour events do not belong here.

## Generation mode choice

```json
{
  "action": "ask_generation_mode",
  "options": [
    {
      "id": "day_by_day",
      "label": "逐步完成每天",
      "recommended": true
    },
    {
      "id": "one_pass_baseline",
      "label": "一次性生成基础版",
      "recommended": false
    }
  ]
}
```

Expose this only after skeleton confirmation. The traveler must select; no input modality or detail-level inference may set it.

## Compression result

```json
{
  "city_block_id": "tokyo-01",
  "days_before": 3,
  "days_after": 2,
  "proposed_distribution": [],
  "item_impacts": [
    {
      "item_id": "item-id",
      "status": "conditional",
      "reason": "Why its status changed",
      "traveler_decision_required": true
    }
  ],
  "reservation_actions": [],
  "affected_scope": {
    "city_block_ids": ["tokyo-01"],
    "connection_ids": [],
    "day_ids": []
  }
}
```

Allowed compression item states are `preserved`, `high_intensity`, `conditional`, `at_risk`, `cannot_fit` and `date_unavailable`.

## Patch boundary

- A proposed corridor/allocation does not confirm itself.
- Structural changes require traveler approval and list affected scope.
- Day by Day compression proposals do not silently discard traveler selections.
- One-pass regeneration may alter Agent-suggested unconfirmed filler with a visible change summary.
- An intended appointment move may patch the itinerary immediately, but external booking state remains pending until confirmed by the traveler or an authorized tool.
