# Travel Dining Strategy｜Input, Output and Patch Contract V0.1

Read this reference for structured integration. Pass only food preferences, active itinerary scope and anchors needed for the current decision.

## Input

```json
{
  "request": {
    "text": "Traveler's current dining request",
    "links": [],
    "attachments": []
  },
  "context": {
    "current_city_block_id": "tokyo-01",
    "current_day_id": null,
    "surface": "conversational_ai",
    "available_capabilities": {
      "web_search": false,
      "map_search": false,
      "official_site_access": false,
      "reservation_platform_access": false,
      "image_understanding": false
    }
  },
  "trip_state": {
    "itinerary_days": [],
    "lodging_segments": [],
    "working_meal_windows": [],
    "must_eat_items": [],
    "booked_restaurants": [],
    "covered_experiences": [],
    "hard_constraints": [],
    "soft_preferences": [],
    "budget": {}
  }
}
```

## Output envelope

```json
{
  "action": "present_experience_mix",
  "summary": "What the traveler is deciding",
  "experience_mix": [],
  "restaurant_candidates": [],
  "assumptions": [],
  "state_patch": [],
  "handoff": null,
  "wait_for_user": true
}
```

Use one primary action:

- `ask_dining_constraints`;
- `ask_planning_mode`;
- `record_existing_anchor`;
- `present_local_food_overview`;
- `present_experience_mix`;
- `present_restaurant_candidates`;
- `expand_restaurant_candidates`;
- `record_restaurant_action`;
- `handoff_itinerary_arranger`;
- `handoff_route_validation`;
- `report_limitation`.

## Experience item

```json
{
  "id": "experience-sukiyaki",
  "name": "Sukiyaki",
  "status": "suggested",
  "why_consider": null,
  "meal_slot_fit": ["dinner"],
  "price_tier": null,
  "reservation_likelihood": "unknown",
  "constraint_fit": "compatible",
  "coverage_source_restaurant_id": null
}
```

## Rating or recognition

```json
{
  "kind": "platform_rating",
  "source_name": "Tabelog",
  "value": 3.72,
  "scale": 5,
  "list_name": null,
  "scope": "Tokyo / cuisine category",
  "year": null,
  "checked_at": "2026-09-02",
  "source_url": null,
  "verification_status": "verified"
}
```

Do not combine this object with Google Maps or guide recognition into a synthetic score. A “Top 10” statement requires the exact list, scope and year/checked date.

## Recommended dish

```json
{
  "name": "Dish name",
  "evidence_class": "frequently_mentioned",
  "reason": "Why it is relevant",
  "source_url": null,
  "verification_status": "partially_verified"
}
```

## Restaurant action

```json
{
  "restaurant_id": "restaurant-id",
  "action": "selected_unbooked",
  "intended_date": "2026-11-11",
  "meal_slot": "dinner",
  "risk_decision": "undecided"
}
```

## Patch boundary

- Recommendations alone do not patch the itinerary.
- Selection patches only the restaurant, intended meal/date and affected-day handoff.
- `booked` requires traveler confirmation or authorized booking evidence.
- A compatible working-window selection does not authorize whole-day reordering.
- Off-route or fixed-time selections hand only affected dates to Arrange/Validator.
- Ratings, prices, rankings and rules retain their own verification state and source.
