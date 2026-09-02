# Trip State Contract V0.1｜Route Validation Draft

> Status: discussion draft. This file extends the existing Trip State without replacing the product definition, Runtime Prompt or lodging contract.

## 1. Purpose

Store route-validation evidence, traveler decisions and unresolved risks without rewriting the full itinerary. Validation is incremental and scoped to the dates affected by a new hotel, a day awaiting confirmation, or a city/stay block awaiting final confirmation.

## 2. Validation moments

### Lodging-anchor change

Check only dates whose start/end point or transfer burden changes. Do not run a full-trip validation.

### Day confirmation

Check the current day before confirmation: start/end anchor, sequence, duration, fixed times, opening status, required reservations, meal anchors and transport feasibility.

### City/stay-block confirmation

Check cross-day continuity, hotel segments, arrival/departure connections and unresolved risks. Do not repeat resolved warnings unless their evidence or affected plan changed.

## 3. Anchor facts required before route judgment

Before treating a detour or odd sequence as an error, determine whether it is caused by:

- a booked attraction, museum, restaurant or activity;
- a fixed admission or reservation time;
- a flight, train, bus, ferry or last service;
- an event available only on a specific date/time;
- a traveler-declared must-do or must-eat anchor;
- a locked hotel or luggage constraint.

If this information is missing and would change the recommendation, ask one focused question before proposing route changes.

A traveler-declared must-do place can be a hard place anchor even when it has no booking. Keep its access feasibility separate from its priority:

- `place_priority`: whether the traveler permits removal;
- `reservation_status`: unknown, not_required, required_unbooked, booked or unavailable;
- `walk_in_status`: unknown, allowed, queue_likely, high_risk or not_allowed;
- `risk_decision`: undecided, book_first, accept_walk_in_risk or remove.

If entry may require advance booking or a long queue, warn the traveler and let them choose. If they accept walk-in risk, keep the place in the itinerary, add a realistic queue/access buffer when evidence supports one, and retain a visible contingency warning. Do not guarantee entry.

## 4. Issue severity

- `blocking`: the plan cannot work as written, such as a missed fixed departure, closed venue, incompatible reservation times or impossible intercity connection.
- `high`: a serious risk of missing an important item, final service, check-in or timed entry.
- `medium`: substantial backtracking, excessive travel burden, remote location risk or an overloaded day that still may be possible.
- `low`: minor inefficiency, luggage/check-in friction or optional optimization that does not threaten the plan.
- `info`: a reservation requirement, verification gap or useful preparation note.

## 5. Required checks

- hotel to first stop and final stop back to hotel;
- remote or poorly connected itinerary points, including return feasibility;
- unnecessary backtracking versus necessary detours caused by hard anchors;
- total day duration and traveler-specific visit duration uncertainty;
- venue-specific duration ranges based on official guidance or relevant visitor evidence when available;
- opening day, opening hours, temporary closure or maintenance when verifiable;
- reservation requirements and fixed booking times;
- must-eat restaurants and their effect on the day's route;
- hotel-change day luggage, check-out and check-in friction, kept proportionate unless it threatens the plan;
- last service, intercity transport, train, ferry or flight feasibility;
- facts that could not be verified.

## 6. Traveler control

When a day is too full, offer relevant choices rather than silently rewriting it:

- keep everything and accept an early start or late return;
- keep priority items and move one lower-priority item to another date;
- remove one item that is unlikely to fit;
- place a lower-priority item last as optional, to be skipped if time runs out;
- preserve a necessary detour caused by a booking or must-do anchor.

Visit durations are personal. Use ranges or traveler-provided duration when available. Do not assume one museum duration fits every traveler.
Do not store one venue's duration as a universal category-level preference. Estimate each venue according to its scale, content and available evidence, then let the traveler adjust it.

For a venue closed on the planned date, offer to move it to another verified open date, remove it from the current day, or find alternatives in the same area. Only the alternatives choice may hand off to a place-discovery capability. Route validation must not insert a replacement attraction by itself.

The Agent may identify risk, conflict and inefficiency, but the traveler retains the final decision. Do not apply a route change, remove an item, change an anchor or accept a trade-off on the traveler's behalf.

## 7. Source priority

For opening, reservation and transport facts, prefer:

1. official venue or transport-operator sources;
2. official announcements or official social accounts;
3. relevant map or reservation platforms;
4. other travel sources and visitor reports.

Use visitor reports for practical signals such as typical queues or visit-duration ranges, not as stronger evidence than an official closure or schedule notice. When sources conflict, show the conflict and prefer the official source rather than silently selecting the more convenient claim.

## 8. User-facing severity labels

- `blocking` → 必须处理;
- `high` → 可能赶不上;
- `medium` → 行程偏紧;
- `low` → 可以优化;
- `info` → 提前准备.

## 9. Suggested state shape

```json
{
  "route_validation": {
    "traveler_pace": "balanced",
    "last_validated_at": null,
    "validation_scope": {
      "type": null,
      "city_block_id": null,
      "affected_dates": []
    },
    "issues": [],
    "unresolved_verification": [],
    "accepted_tradeoffs": [],
    "proposed_patches": []
  }
}
```

## 10. Route issue shape

```json
{
  "id": "route-issue-id",
  "date": null,
  "type": "backtracking",
  "severity": "medium",
  "status": "open",
  "summary": "What may not work",
  "cause": "Why the plan has this shape",
  "affected_items": [],
  "evidence": [],
  "verification_status": "unverified",
  "hard_anchor_related": false,
  "traveler_decision_required": true,
  "options": []
}
```

## 11. Access-risk shape

```json
{
  "place_id": "place-or-event-id",
  "place_priority": "must_do",
  "reservation_status": "required_unbooked",
  "walk_in_status": "queue_likely",
  "risk_decision": "undecided",
  "queue_time_range": null,
  "contingency_note": null,
  "verification_status": "partially_verified",
  "evidence": []
}
```

## 12. Resolution states

- `open`: not yet addressed;
- `accepted`: traveler understands and accepts the trade-off;
- `resolved`: plan or anchor changed and the issue no longer applies;
- `deferred`: traveler will decide later;
- `invalidated`: the underlying itinerary changed, so the old result must not be reused.

Accepted trade-offs should not be repeatedly challenged unless the underlying evidence or plan changes.
