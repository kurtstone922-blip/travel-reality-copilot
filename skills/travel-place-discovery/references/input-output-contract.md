# Travel Place Discovery｜Input, Output and Patch Contract V0.1

Read this reference when integrating or testing structured discovery. The host decides whether to render choices as conversational lists, cards or another supported interface.

## Input

```json
{
  "request": {
    "text": "Traveler's current message",
    "links": [],
    "attachments": []
  },
  "context": {
    "current_city_block_id": "tokyo-01",
    "active_scope": "city_block",
    "surface": "conversational_ai",
    "available_capabilities": {
      "web_search": false,
      "map_search": false,
      "image_understanding": false,
      "image_display": false,
      "official_site_access": false
    }
  },
  "trip_state": {
    "destination": {},
    "entry_exit": {},
    "available_days": null,
    "curiosity_seeds": [],
    "existing_items": [],
    "fixed_anchors": [],
    "preferences": [],
    "rejected_items": []
  }
}
```

## Output envelope

```json
{
  "action": "present_candidates",
  "discovery_mode": "gap_completion",
  "coverage_status": "partial",
  "summary": "What the current shelf is helping the traveler decide",
  "directions": [],
  "candidates": [],
  "pagination": {
    "page_size": 8,
    "shown_item_ids": [],
    "has_more": true,
    "next_batch_focus": "community_popular_and_niche"
  },
  "available_shelf_actions": [
    "load_more",
    "finish_selection",
    "add_custom_item"
  ],
  "state_patch": [],
  "handoff": null,
  "wait_for_user": true
}
```

Use one primary action:

- `ask_curiosity_seed`;
- `present_directions`;
- `present_candidates`;
- `expand_candidate`;
- `record_candidate_action`;
- `offer_more_or_arrange`;
- `handoff_arrangement`;
- `handoff_route_validation`;
- `handoff_stay_strategy`;
- `report_limitation`.

## Batch sizing

- derive `suggested_candidate_range` from city/stay-block days, usable time, city scale, traveler pace, fixed anchors and existing selections;
- a three-day stay in a large city may reasonably produce roughly 10–20 candidates;
- a one-day stay or partly filled block usually produces fewer;
- treat that range as the candidate pool, not the visible batch size;
- for `web_demo`, normally return 3–5 visible candidates, or 2–4 for a compact/constrained step;
- for `conversational_ai` or capability-pack use, normally return 7–10 candidates in the first batch and expose `load_more` when more relevant items remain;
- do not repeat items in `shown_item_ids` or rejected items in later batches;
- `nearly_complete`: no ordinary shelf; only a small requested nearby-fill set after validation;
- `complete_enough_for_validation`: hand off rather than expanding.

Return fewer when relevance or evidence is weak.

For the first batch, include both `traveler_match` and `representative_highlight` candidates, including famous landmarks or defining local experiences unless excluded or already handled. Then use `relevant_popular`. Later batches may broaden toward community/online-popular, special, seasonal, niche or route-convenient discoveries. These are presentation layers, not mandatory quotas, and social popularity is not treated as proof of fit.

## Candidate

```json
{
  "id": "discovery-item-id",
  "name": "Experience name",
  "local_name": null,
  "type": "seasonal_event",
  "status": "suggested",
  "priority_layer": "traveler_match",
  "anchor_level": "soft",
  "experience_summary": "What the traveler can do, see or gain",
  "why_consider": "Why it may fit this traveler or existing route",
  "area": null,
  "address": null,
  "area_relationship": null,
  "duration_range": {
    "min_minutes": null,
    "max_minutes": null,
    "basis": null
  },
  "constraints": {
    "dates": [],
    "time_windows": [],
    "season": null,
    "reservation_status": "unknown",
    "opening_status": "unknown"
  },
  "route_effect": "unknown",
  "official_url": null,
  "external_links": [],
  "media": [],
  "evidence": [],
  "verification_status": "unverified",
  "available_actions": [
    "learn_more",
    "save",
    "interested",
    "must_do",
    "optional_fill",
    "not_interested_this_trip"
  ]
}
```

When media is available, each item should retain `type`, `url`, `source_url` and `attribution` when applicable. Omit unavailable images rather than returning empty placeholders. Do not label a third-party page as an official website.

## State Patch boundary

Recommendations alone do not produce itinerary patches. A state patch is allowed only after a traveler action, and it may update candidate status, personal reason, priority or rejection state. Assignment to a date belongs to arrangement; feasibility confirmation belongs to route validation.

Do not hand off after every individual click. Accumulate candidate actions until the traveler indicates the current shelf selection is complete. Then hand the selected set to arrangement. Mark the resulting arrangement provisional when lodging or food anchors that could change the route remain unresolved.
