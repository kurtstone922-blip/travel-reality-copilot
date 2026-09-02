# Trip State Contract V0.1｜Place Discovery Draft

> Status: discussion draft. “Place” means any discoverable travel experience, not only a geographic POI. This contract extends the existing Trip State without replacing earlier product documents.

## 1. Discovery item scope

A discovery item may be:

- attraction, museum, gallery, neighborhood, market or viewpoint;
- restaurant, cafe, shop or food experience;
- nature, seasonal landscape, festival, fireworks or limited-date event;
- hotel or ryokan that is itself part of the experience;
- scenic/special train, ferry, route or transport experience;
- performance, workshop, tour or other special activity.

Ordinary transport and an ordinary hotel remain logistics. They become discovery items only when their experience value or constraints can motivate or reshape the trip.

## 2. Discovery modes

### `open_discovery`

The traveler has a destination or initial motivation but little route/place knowledge. Ask for the seed of curiosity, known entry/exit points, available days and any existing must-do item. Offer a small number of macro directions or experience themes before concrete candidates.

### `gap_completion`

The traveler already has some desired items, but they cover only part of the trip. Preserve those items, identify geographic/temporal gaps, and offer candidates that complement rather than replace them.

### `user_led_complete`

The traveler already has a substantially complete plan. Do not reopen broad discovery by default. Hand the plan to route validation; only offer nearby optional additions when a validated time/route gap exists and the traveler wants suggestions.

### `nearby_fill`

A scoped discovery requested for a specific verified free window or area. Return optional items that fit the route and can be skipped without damaging the day.

## 3. Starting context

Use what the traveler already supplied:

- destination, entry/exit points and day count;
- the show, post, image, event, food, train, hotel or place that sparked interest;
- saved places, links, screenshots and personal reasons;
- fixed dates, reservations and must-do anchors;
- preferred tempo, themes and exclusions;
- available search, map, weather and image-understanding capabilities.

Do not treat “I do not know the city” as “I have no motivation.” Ask what made the traveler curious when it is not already clear.

## 4. Discovery depth

For open discovery:

1. synthesize the traveler’s motivation and constraints;
2. offer 2–4 meaningfully different macro directions or experience themes;
3. wait for selection or custom input;
4. then show a manageable shelf of concrete items.

A macro direction may connect cities or areas according to entry/exit points and available days, but it must remain a selectable route direction rather than a fully scheduled day-by-day itinerary.

For gap completion, begin from existing anchors and show what kinds of gaps remain. Do not restart destination discovery.

Scale the total candidate pool to the city/stay-block duration, usable time, city scale, traveler pace, fixed anchors and existing selections. Do not confuse the pool size with how many items should be visible at once.

For example, a three-day stay in a large city may reasonably need roughly 10–20 candidates so the traveler can compare and build several days. A one-day stay or a partially filled block usually needs fewer. When the plan is nearly complete, do not push a normal shelf; after validation, show only a small number of optional nearby-fill items when requested.

These ranges are decision aids, not quotas. Return fewer when evidence or relevance is weak rather than filling the shelf with generic options. Reveal a large pool progressively so the traveler is not presented with an undifferentiated wall.

Presentation depends on the host surface:

- Web Demo: normally show 3–5 candidates at once; 2–4 is acceptable in a compact or already constrained step.
- Conversational AI or capability-pack use: normally show 7–10 candidates in the first batch, then offer `load_more` when more relevant candidates remain.
- Later batches must not repeat items already shown or rejected. They may broaden toward user/community recommendations, currently discussed or online-popular experiences, niche options, seasonal/special items and route-convenient possibilities.

The first batch must include both the strongest traveler-interest matches and representative famous landmarks or defining local experiences, unless the traveler explicitly excludes them or has already dealt with them. A famous landmark is orientation context and a choice, not an automatic itinerary inclusion.

Suggested pool and batch ordering:

1. strongest matches for the traveler's stated curiosity and preferences;
2. representative local experiences, famous landmarks and widely valued highlights;
3. popular or frequently sought experiences relevant to this trip;
4. special, seasonal, niche or route-convenient possibilities.

## 5. Candidate state

- `suggested`: proposed by the Agent but not acted on;
- `saved`: traveler wants to keep it available;
- `interested`: traveler wants it considered in arrangement;
- `must_do`: traveler does not permit automatic removal;
- `optional_fill`: use only if the validated route/time window permits;
- `not_interested_this_trip`: do not recommend again during this trip;
- `rejected`: explicitly excluded from the current plan.

Rejecting one item does not imply a global dislike of its whole category. Record a broader avoidance only when the traveler explicitly states it.

## 6. Suggested state shape

```json
{
  "place_discovery": {
    "mode": "undecided",
    "curiosity_seeds": [],
    "selected_directions": [],
    "coverage_assessment": {
      "status": "unknown",
      "known_anchors": [],
      "gaps": [],
      "city_block_days": null,
      "estimated_usable_time": null,
      "suggested_candidate_range": null
    },
    "candidate_items": [],
    "rejected_items": [],
    "trip_level_avoidances": [],
    "active_discovery_scope": null,
    "pagination": {
      "surface": null,
      "page_size": null,
      "shown_item_ids": [],
      "has_more": false,
      "next_batch_focus": null
    }
  }
}
```

## 7. Discovery item shape

```json
{
  "id": "discovery-item-id",
  "name": "Experience name",
  "type": "special_train",
  "status": "suggested",
  "anchor_level": "soft",
  "personal_reason": "Why it relates to this traveler",
  "experience_summary": "What it is",
  "why_consider": "Why it may deserve trip time",
  "location": null,
  "area_relationship": null,
  "date_constraints": [],
  "time_windows": [],
  "duration_range": null,
  "reservation": {
    "status": "unknown",
    "urgency": null
  },
  "route_effect": "unknown",
  "address": null,
  "official_url": null,
  "external_links": [],
  "media": [],
  "source_context": [],
  "verification_status": "unverified"
}
```

## 8. Candidate information policy

Show as much decision-relevant information as the current host can obtain responsibly:

- name and type;
- concise explanation of what the traveler can do, see or gain from it;
- why it may fit this traveler;
- area and address when available;
- indicative duration;
- reservation, opening, date or seasonal constraints;
- official website and useful external links;
- image when the host supports image display and a usable source is available;
- source and verification status for time-sensitive claims.

Do not omit useful information merely to create an artificially minimal card. Do not invent missing addresses, official links, images or current facts.

## 9. Handoffs

- Selected discovery items go to arrangement; Discovery does not assign every item to a date by itself.
- Fixed-date or fixed-time items become anchors for arrangement and route validation.
- A complete user-authored itinerary goes to Route Validator rather than broad discovery.
- Nearby fill may be invoked after Route Validator identifies a feasible gap and the traveler asks for suggestions.
- After the traveler finishes selecting a shelf, hand the selected set to arrangement. For a one-day stay, arrangement may compose that day; for a multi-day city/stay block, arrangement distributes the selected set across the block.
- Arrangement must account for lodging, food anchors, fixed reservations and transport. When important lodging or food anchors are still missing, any initial arrangement remains provisional and must be revisited after those anchors are added.
