# Trip State Contract V0.1｜Dining Strategy Draft

> Status: discussion draft. This extends Place Discovery, Itinerary Arrangement and Route Validation without replacing earlier product documents.

## 1. Purpose and boundary

Dining Strategy owns food preferences, food-experience coverage, restaurant candidates and reservation state. Place Discovery may introduce a restaurant as a trip-motivating place. Itinerary Arrangement assigns selected restaurants to a day and sequence. Route Validator checks access, opening and route risk. Dining Strategy does not claim a booking or rewrite unrelated itinerary dates.

## 2. Preference model

Separate:

- `hard_constraints`: allergies, medical/religious limits, vegan/vegetarian requirements and absolute exclusions;
- `soft_preferences`: raw-food comfort, spice, cuisines, local-food openness, familiar-food needs and dining formats;
- `ordinary_budget`: broad per-person range and flexibility;
- `special_meals`: desired count and separate range;
- `observed_special_meal_range`: evidence from a selected/booked special meal, not a global budget.

## 3. Experience coverage

Use these statuses:

- `suggested`: proposed food experience;
- `interested`: traveler wants concrete options;
- `must_eat`: must be preserved;
- `covered`: already represented by a selected/booked restaurant;
- `repeat_allowed`: traveler welcomes another similar experience;
- `not_interested_this_trip`: do not repeat this trip.

Deduplicate the core dish/experience, not its entire cuisine. Everyday categories may repeat when useful.

## 4. Restaurant and reservation states

- `candidate`;
- `selected_unbooked`;
- `reservation_required`;
- `reservation_recommended`;
- `booked`;
- `walk_in_risk_accepted`;
- `skipped`.

Booked restaurant arrangement fields are limited to name, date, reservation time and address. Supporting evidence and links may be added without becoming new required intake fields.

## 5. Evidence rules

Display international map ratings, credible local-platform ratings and guides/awards separately. Do not calculate a composite score. Each value retains platform, scale, list/scope, checked date and URL when available.

Dish evidence uses:

- `official_signature`;
- `guide_recommended`;
- `frequently_mentioned`;
- `agent_suggestion`.

Current ratings, rankings, price, opening, reservation and hard rules remain unverified without a current source.

## 6. Suggested state shape

```json
{
  "dining": {
    "planning_mode": "undecided",
    "hard_constraints": [],
    "soft_preferences": [],
    "budget": {
      "ordinary_per_person": null,
      "special_per_person": null,
      "special_meal_count": null,
      "currency": null,
      "flexibility": "unknown",
      "observed_special_meal_range": null
    },
    "local_meal_slots": [],
    "experience_mix": [],
    "restaurants": [],
    "booked_anchors": [],
    "working_meal_windows": [],
    "reflow_required_dates": []
  }
}
```

## 7. Restaurant shape

```json
{
  "id": "restaurant-id",
  "name": "Restaurant name",
  "local_name": null,
  "status": "candidate",
  "experience_type": null,
  "meal_slot": null,
  "date": null,
  "reservation_time": null,
  "address": null,
  "route_fit": null,
  "why_consider": null,
  "price": {
    "range": null,
    "currency": null,
    "basis": "per_person",
    "verification_status": "unverified",
    "source": null
  },
  "ratings_and_recognition": [],
  "recommended_dishes": [],
  "reservation": {
    "requirement": "unknown",
    "walk_in_status": "unknown",
    "hard_rules": [],
    "booking_url": null,
    "verification_status": "unverified"
  },
  "external_links": {
    "official": null,
    "google_maps": null,
    "amap": null
  },
  "evidence": [],
  "verification_status": "unverified"
}
```

## 8. State update rules

- A recommendation remains a candidate until the traveler acts.
- Selecting a restaurant may patch its intended date/meal slot but never marks it booked.
- Only traveler confirmation or authorized booking evidence changes reservation state to `booked`.
- A route-compatible selection causes a local anchor check; an off-route or fixed-time choice marks only affected dates for reflow/validation.
- Accepted Walk-in risk remains visible and does not become verified access.
- Skipping one restaurant does not imply dislike of its cuisine.
