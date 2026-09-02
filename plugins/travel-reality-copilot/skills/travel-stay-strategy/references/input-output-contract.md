# Travel Stay Strategy｜Input, Output and Patch Contract V0.1

Read this reference when implementing, integrating or testing structured Stay Skill calls. Ordinary conversational use does not need to expose these objects to the traveler.

## Input

```json
{
  "request": {
    "text": "Traveler's current message",
    "attachments": [],
    "links": []
  },
  "context": {
    "current_city_block_id": "tokyo-01",
    "current_day_id": null,
    "planning_mode": "progressive",
    "available_capabilities": {
      "map_search": false,
      "web_search": false,
      "image_understanding": false,
      "booking_link_resolution": false,
      "route_computation": false
    }
  },
  "trip_state": {
    "city_block": {},
    "selected_places": [],
    "fixed_events": [],
    "trip_party": {},
    "lodging": {}
  }
}
```

Only fields relevant to the current city/stay block should be provided. Do not load unrelated city blocks when they cannot affect this decision.

## Output actions

Return one primary action:

- `ask_decision_timing`: ask whether lodging should be decided now;
- `ask_split_stay`: ask whether the city stay needs more than one hotel;
- `ask_high_impact_preference`: ask only for missing information that changes recommendations;
- `recommend_areas`: return 2–3 lodging areas;
- `recommend_hotels`: after an area is chosen, normally return three strongest matches plus two nearby alternatives within that same area; allow up to two cross-area loyalty alternatives when explicit loyalty preferences and insufficient same-area inventory justify the exception;
- `accept_existing_hotel`: record a traveler-provided hotel without recommending replacements;
- `ask_route_optimization`: ask whether affected itinerary days should be optimized around the selected hotel;
- `return_route_impact`: describe affected dates and proposed adjustments;
- `ask_day_confirmation`: request confirmation for the current itinerary day;
- `ask_block_confirmation`: request final confirmation for the complete city/stay block;
- `report_limitation`: explain a missing capability or unverifiable fact and offer a usable fallback.

## Output envelope

```json
{
  "action": "recommend_hotels",
  "user_message": "Conversational response shown to the traveler",
  "choices": [],
  "facts": {
    "verified": [],
    "unverified": []
  },
  "impact": {
    "affected_dates": [],
    "requires_route_recalculation": false
  },
  "state_patch": [],
  "wait_for_user": true
}
```

`wait_for_user` must be `true` whenever the traveler must choose, confirm, unlock or provide missing high-impact information.

## Area choice

```json
{
  "id": "area-ueno",
  "name": "Ueno",
  "recommendation_reason": "Why it fits this itinerary and traveler",
  "transport_fit": "Concise route relationship",
  "preference_fit": [],
  "tradeoffs": [],
  "verification_status": "partially_verified"
}
```

## Hotel choice

```json
{
  "id": "hotel-candidate-id",
  "rank_group": "strongest_match",
  "name": "Hotel name",
  "area": "Area name",
  "recommendation_reason": "Why this option fits this traveler",
  "transport_fit": "How it relates to the selected itinerary",
  "preference_fit": [],
  "loyalty_relevance": null,
  "area_boundary_exception": {
    "applied": false,
    "reason": null,
    "additional_travel_burden": null
  },
  "tradeoffs": [],
  "reference_price": {
    "value": null,
    "currency": null,
    "basis": "per_room_per_night",
    "source": null,
    "checked_at": null,
    "verification_status": "unverified"
  },
  "rating": {
    "value": null,
    "scale": null,
    "source_platform": null,
    "source_url": null,
    "checked_at": null,
    "verification_status": "unverified"
  },
  "availability": {
    "status": "unknown",
    "source": null,
    "checked_at": null,
    "verification_status": "unverified"
  },
  "external_links": {
    "booking": null,
    "google_maps": null,
    "amap": null
  }
}
```

Use `rank_group = strongest_match` for the top three, `rank_group = nearby_alternative` for ordinary same-area alternatives, and `rank_group = cross_area_loyalty_alternative` for the narrow loyalty exception. When an area has been selected, hotels must normally remain within that area or its practical within-area station catchment. A cross-area loyalty alternative must set `area_boundary_exception.applied = true` and explain both benefit and burden. Preserve each rating's source and scale. Do not create an aggregate rating.

## State Patch

Use explicit patch operations so the host can validate changes before applying them:

```json
[
  {
    "op": "replace",
    "path": "/city_blocks/tokyo-01/lodging/selected_hotel",
    "value": {}
  },
  {
    "op": "replace",
    "path": "/city_blocks/tokyo-01/lodging/status",
    "value": "selected"
  },
  {
    "op": "replace",
    "path": "/city_blocks/tokyo-01/lodging/route_optimization/preference",
    "value": "undecided"
  }
]
```

The Skill proposes a patch; the host application applies it only after validating permissions and traveler confirmation. Never patch unrelated city blocks, confirmed days or locked anchors.

## Link and screenshot fallback

- If the host can resolve a supplied link, extract the hotel identity and retain the source URL.
- If the host can understand a screenshot, extract only visible information and mark uncertain fields.
- If either capability is unavailable, ask for the hotel name rather than blocking the entire lodging flow.
- Missing Booking, Google Maps or Amap links must not invalidate an otherwise useful recommendation.
