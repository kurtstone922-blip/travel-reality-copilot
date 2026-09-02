# Trip State Contract V0.1｜Route Skeleton Draft

> Status: discussion draft. This extends existing discovery, lodging, dining, arrangement and validation state without replacing earlier product documents.

## 1. Purpose

Route Skeleton stores the confirmed route corridor, stop roles and day/night allocation that daily modules consume. It does not own detailed daily schedules.

## 2. Readiness states

- `destination_direction_missing`: only a broad country/region is known; route direction discovery is required.
- `destination_pool_known`: meaningful stops are known but order/roles may be unresolved.
- `corridor_proposed`: entry-to-exit order has been proposed.
- `corridor_confirmed`: stop order is traveler-approved.
- `allocation_proposed`: stop roles and days/nights are proposed.
- `skeleton_confirmed`: corridor and allocation are approved; generation mode may be chosen.
- `impact_review`: a later structural change is awaiting traveler decisions.

## 3. Stop roles

- `entry_transit`;
- `overnight_base`;
- `short_stop`;
- `day_trip`;
- `shared_base_excursion`;
- `transfer_stop`;
- `exit_base`;
- `undecided`.

A stop can be nested under a base rather than becoming a separate lodging segment. Mention order is never treated as confirmed route order.

## 4. Skeleton modes

- `user_defined_skeleton`: preserve known sequence, purpose and allocation; resolve only material gaps.
- `agent_recommended_skeleton`: recommend corridor and allocation from known boundaries and experiences.

The selected downstream generation mode is a separate state and is always traveler-chosen.

## 5. Suggested state shape

```json
{
  "route_skeleton": {
    "status": "destination_pool_known",
    "mode": "undecided",
    "entry": null,
    "exit": null,
    "total_days": null,
    "destination_pool": [],
    "route_corridor": [],
    "stops": [],
    "connections": [],
    "unallocated_days": null,
    "assumptions": [],
    "generation_mode": "undecided",
    "pending_impacts": []
  }
}
```

## 6. Route stop shape

```json
{
  "id": "stop-tottori",
  "name": "Tottori",
  "type": "city",
  "sequence": 2,
  "role": "short_stop",
  "parent_base_id": null,
  "status": "proposed",
  "days": null,
  "nights": null,
  "arrival_window": null,
  "departure_window": null,
  "selected_experience_ids": [],
  "fixed_anchor_ids": [],
  "personal_reason": null,
  "position_reason": null,
  "next_connection_id": null,
  "assumptions": []
}
```

## 7. Connection shape

```json
{
  "id": "connection-tottori-izumo",
  "origin_stop_id": "stop-tottori",
  "destination_stop_id": "stop-izumo",
  "mode": "rail",
  "burden": "long_half_day_risk",
  "duration_range": null,
  "service_constraint": null,
  "verification_status": "unverified",
  "evidence": []
}
```

## 8. Structural change impact

```json
{
  "id": "impact-tokyo-3-to-2",
  "change": {
    "city_block_id": "tokyo-01",
    "days_before": 3,
    "days_after": 2
  },
  "affected_items": [],
  "affected_connections": [],
  "affected_lodging_nights": [],
  "compression_proposal": null,
  "external_reservation_actions": [],
  "status": "awaiting_decision"
}
```

## 9. Reservation separation

Moving an itinerary item to a surviving day may update the intended itinerary immediately after traveler choice. External state remains separate:

- `reschedule_intended`;
- `rescheduled_confirmed`;
- `cancellation_intended`;
- `cancelled_confirmed`;
- `removed_from_itinerary_external_status_unknown`.

## 10. Patch rules

- Destination-pool capture does not confirm sequence.
- Corridor confirmation does not confirm days/nights.
- Skeleton confirmation does not select Day by Day or one-pass mode.
- Do not remove traveler destinations without explicit choice.
- Do not rewrite unaffected confirmed city blocks.
- A structural patch lists dependent connections, lodging nights, appointment dates and daily arrangements requiring recalculation.
