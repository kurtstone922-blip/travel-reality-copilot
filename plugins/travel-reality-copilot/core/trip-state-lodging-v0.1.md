# Trip State Contract V0.1｜Lodging Draft

> Status: discussion draft. This file does not replace the existing product definition or Runtime Prompt.

## 1. Scope

This contract stores the minimum lodging state needed by the first `travel-stay-strategy` skill. Lodging is attached to a city/stay block and can become the start/end anchor for affected itinerary days.

## 2. Lodging decision flow

```text
undecided
→ ask whether the traveler wants to decide now
→ default to one lodging for the city/stay block and ask whether a split stay is needed
→ collect only relevant preferences
→ recommend 2–3 areas when the traveler has no lodging concept
→ traveler chooses an area
→ recommend about 5 hotels in the chosen area
→ user selects one hotel
→ use it as the working route anchor
→ ask whether to optimize affected days around the new lodging anchor
→ compose or revise affected days only with traveler consent
→ confirm the complete city/stay block
→ confirm the hotel together with attractions, meals and activities
```

If the traveler does not want to decide now, continue with a clearly labeled temporary lodging anchor and record which days require recalculation later.

When the traveler stays in one city for several days, default to one hotel or lodging area. Ask once whether they need to change hotels within the city. If they do, split the city into explicit lodging segments and record which nights belong to each segment. Do not proactively encourage a split stay without a clear traveler need or meaningful route benefit because moving luggage adds friction.

When the traveler already provides a chosen hotel, record that hotel and the useful information they supplied. Do not restart area discovery, recommend alternative hotels, or ask preference questions that no longer affect the decision. Use the chosen hotel as the working route anchor. If the traveler explicitly says it is booked or asks to lock it, mark it `locked`; otherwise mark it `selected`.

## 3. Confirmation levels

### `candidate`

A recommended or user-provided hotel that has not been chosen. It must not affect the route.

### `selected`

The traveler has chosen the hotel as the current working option. It immediately becomes the route start/end anchor for simulation and daily planning, but the traveler may still replace it before confirming the city/stay block.

### `confirmed`

The traveler has confirmed the complete city/stay block. The selected hotel, attractions, meals and activities are confirmed together. Later changes must be explicit and should only recalculate affected dates.

### `locked`

The hotel is already booked or the traveler explicitly asks to lock it. Other skills must not replace, move or delete it unless the traveler explicitly unlocks it.

## 4. Lodging decision modes

- `lodging_first`: the traveler already has a hotel, area, brand, membership preference or hotel-led reason for the trip.
- `route_first`: the traveler selects attractions, restaurants and activities before deciding where to stay.
- `ai_assisted`: the traveler has no clear preference and wants recommendations based on the current route and preferences.
- `temporary_anchor`: the traveler postpones the decision and accepts a visible provisional area assumption.

## 5. Preference model

Ask only for preferences that can change the recommendation:

- nightly or total budget, currency and whether the budget is hard or flexible;
- number of guests, rooms and basic bed preference when concrete hotels or prices are requested;
- hotel loyalty programs, membership tier and preferred brands;
- transport convenience and acceptable walking/transfer burden;
- preferred area or a previously liked hotel/area;
- hotel style or must-have facilities when the traveler cares about them;
- whether the hotel itself is a reason for visiting the city.

Do not ask every field by default. Use already known Trip State values and ask only for missing high-impact information.

When the traveler gives no ranking preference, use this default order:

1. convenience relative to the selected itinerary and transport network;
2. budget fit;
3. other personal convenience and stated preferences;
4. loyalty or brand relevance;
5. verified rating and hotel style.

## 6. Recommendation result

When the traveler has no lodging concept, recommend areas first. After the traveler chooses an area, return about five hotel candidates: three strongest matches for the itinerary and stated preferences, plus two nearby alternatives within the same chosen area that provide useful comparison. Do not normally move the alternatives into an area the traveler did not choose. Each candidate must include:

- hotel name;
- area;
- a concise reason tied to the traveler's priorities;
- relevant trade-offs;
- price or price tier only when a source or clearly labeled estimate is available;
- loyalty/brand relevance when applicable;
- transport or route relevance;
- verification status for location, rating, price and availability;
- available Google Maps, Amap or Booking search/detail links.

Candidates should offer meaningful differences rather than five near-identical options.
If fewer than five candidates can be supported responsibly, return fewer rather than inventing hotels or facts.

If the traveler has not chosen an area and explicitly asks the Agent to recommend hotels freely, candidates may be distributed across several convenient areas. In that case, derive the areas from the traveler's itinerary points, transport needs and preferences, and explain the area rationale for every candidate. This is an explicit bypass of the normal area-first flow, not the default behavior.

### Loyalty exception to the selected-area boundary

When the traveler explicitly values both route/transport convenience and a hotel loyalty program, but the chosen area lacks enough relevant loyalty hotels:

- keep the three strongest recommendations focused on the chosen area and itinerary convenience;
- allow up to two loyalty-relevant alternatives in nearby areas;
- label them as cross-area loyalty alternatives rather than ordinary nearby choices;
- explain the loyalty benefit, additional travel burden and why the expansion may be worthwhile;
- do not imply that these alternatives are inside the chosen area.

Treat loyalty as a preference by default. If the traveler says the loyalty brand is mandatory, treat it as a hard constraint and explain when satisfying it requires a wider geographic search.

## 7. Capability-aware data policy

### Maps/search capability available

Use the host environment's available map or search capability to verify location, rating and route relationship. Choose Google Maps for international destinations and Amap for mainland China when that better matches the user's context.

### No map tool, but web/search capability available

Use search to find plausible hotels and supporting information. Keep availability, current price and rating explicitly unverified unless the source supports the claim.

### No external capability available

The model may suggest plausible areas and hotel candidates from its own knowledge, but must label time-sensitive facts as unverified. Provide search links so the traveler can verify the hotel externally.

The skill must never claim live availability, exact current price or current rating solely from model memory.
Every displayed rating must retain its source platform. Do not merge ratings from different scales into one synthetic score.

## 8. Suggested state shape

```json
{
  "current_city_block": "tokyo-01",
  "city_blocks": [
    {
      "id": "tokyo-01",
      "city": "Tokyo",
      "date_range": {
        "start": null,
        "end": null
      },
      "status": "draft",
        "lodging": {
          "decision_timing": "undecided",
          "strategy": "undecided",
          "status": "unstarted",
          "route_optimization": {
            "preference": "undecided",
            "affected_dates": [],
            "status": "not_requested"
          },
          "split_stay": {
            "preference": "undecided",
            "segments": []
          },
        "preferences": {
          "budget": {
            "currency": null,
            "nightly_min": null,
            "nightly_max": null,
            "constraint": "unknown"
          },
          "loyalty_programs": [],
          "loyalty_constraint": "none",
          "preferred_brands": [],
          "transport_priority": null,
          "preferred_areas": [],
          "hotel_style": [],
          "must_have_facilities": []
        },
        "occupancy": {
          "guests": null,
          "rooms": null,
          "room_split": null,
          "bed_preference": null
        },
        "candidate_areas": [],
        "candidate_hotels": [],
        "selected_hotel": null,
        "temporary_anchor": null,
        "affected_dates": [],
        "recalculation_required": false
      }
    }
  ]
}
```

## 9. Candidate hotel shape

```json
{
  "id": "hotel-candidate-id",
  "name": "Hotel name",
  "area": "Area name",
  "status": "candidate",
  "recommendation_reason": "Why this option matches the traveler",
  "tradeoffs": [],
  "loyalty_relevance": null,
  "route_relevance": null,
  "price": {
    "value": null,
    "currency": null,
    "basis": "per_room_per_night",
    "verification_status": "unverified",
    "source": null
  },
  "availability": {
    "status": "unknown",
    "verification_status": "unverified",
    "source": null
  },
  "rating": {
    "value": null,
    "scale": null,
    "verification_status": "unverified",
    "source": null
  },
  "location": {
    "address": null,
    "latitude": null,
    "longitude": null,
    "verification_status": "unverified"
  },
  "external_links": {
    "google_maps": null,
    "amap": null,
    "booking": null
  }
}
```

## 10. State update rules

- Recommending a hotel creates or updates a `candidate`; it does not change the route.
- Choosing a hotel changes it to `selected` and makes it the working start/end anchor for affected days.
- After a hotel becomes `selected`, ask whether the traveler wants affected itinerary days optimized around the new anchor. Do not reorder them before consent.
- If optimization is declined or postponed, preserve the current itinerary and record the unresolved route impact.
- Confirming the complete city/stay block changes the selected hotel to `confirmed` with the block.
- An already booked or explicitly locked hotel is `locked` immediately.
- Replacing a selected hotel requires recalculating only the affected dates.
- Replacing a confirmed hotel requires an explicit traveler request and a visible impact summary.
- A locked hotel cannot be replaced without explicit unlock confirmation.
- A temporary anchor must remain visibly provisional and record affected dates.
- A city/stay block defaults to one lodging segment unless the traveler requests a split stay.
- Each itinerary day can be confirmed independently. Confirming a day protects that day's hotel anchor, attractions, meals and activities from unrelated regeneration.
- After all intended days in a city/stay block are confirmed, ask for one final block-level confirmation before moving to the next city.
- A later change to one confirmed day must not reopen unrelated confirmed days.
