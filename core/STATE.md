# Unified Trip State V0.1

`trip-state.schema.json` is the canonical cross-skill contract for the capability pack. It consolidates the six earlier module drafts without replacing those design notes.

## Separation of concerns

### Canonical Trip State

Store only durable planning facts and traveler-owned decisions:

- trip boundaries and route skeleton;
- traveler constraints and active preferences;
- discovery candidates and selection state;
- lodging and dining anchors;
- arranged days and route legs;
- validation issues, accepted trade-offs and verification work;
- decisions, pending actions and source provenance.

Do not store the full conversation transcript in this object.

### Runtime Session

The host application may separately store:

```json
{
  "session_version": 1,
  "current_question_id": null,
  "pending_confirmation": null,
  "deferred_questions": [],
  "resume_point": null,
  "next_action": null,
  "recent_messages": [],
  "submitted_card_ids": [],
  "pending_ui_changes": {},
  "last_trip_state_revision": 0
}
```

Keep only the smallest recent conversation window needed to resolve references. Summarize durable facts into Trip State, then allow old messages to leave the active context.

`pending_confirmation` and `resume_point` preserve an unfinished decision when the traveler asks a side question. `deferred_questions` contains only explicitly postponed questions; an omitted answer remains unanswered. `next_action` stores the visible continuation offered in the latest response. Clear these fields only after the traveler resolves, cancels or explicitly postpones the related loop.

## Full state and skill view

The full state is the saved source of truth. A skill should normally receive a compact view containing:

1. identity: `state_id`, `revision`, `current_phase`;
2. `active_scope` and affected dates;
3. relevant trip boundaries, constraints and preferences;
4. only the module records required by that skill;
5. locked decisions and unresolved high-risk issues in scope;
6. available host capabilities.

`trip-state-lite.example.json` illustrates this transport shape. It is not a second source of truth and must not be edited independently.

## Patch protocol

Skills return a patch proposal instead of rewriting the whole state:

```json
{
  "skill": "travel-itinerary-arranger",
  "base_revision": 3,
  "scope": {
    "type": "day",
    "id": "day-02",
    "affected_dates": ["2026-10-02"]
  },
  "summary": "Arrange the traveler-selected Roppongi items",
  "operations": [
    {
      "op": "replace",
      "path": "/itinerary/days/0/items",
      "value": []
    }
  ],
  "requires_confirmation": true,
  "invalidates": [
    "/validation/issues"
  ],
  "next_recommended_skill": "travel-route-validator"
}
```

Rules:

- `base_revision` must equal the current state revision before application.
- A Skill may patch only the fields it owns or fields explicitly listed in a handoff contract.
- Preserve confirmed and locked records unless the traveler explicitly changes them.
- Do not apply a decision-point patch until the traveler confirms it.
- After a patch is applied, increment `revision` once and update `updated_at`.
- Invalidate only affected validation results and calculated fields.
- External reservation status never changes merely because an itinerary item moved or was removed.

## Ownership map

| State path | Primary owner | Other Skills may |
|---|---|---|
| `/route_skeleton` | `travel-route-skeleton` | read; propose impact review |
| `/place_discovery` | `travel-place-discovery` | read selected IDs |
| `/lodging` | `travel-stay-strategy` | read anchors; request scoped reflow |
| `/dining` | `travel-dining-strategy` | read anchors; request scoped reflow |
| `/itinerary` | `travel-itinerary-arranger` | validator may propose patches, not apply traveler choices |
| `/validation` | `travel-route-validator` | other Skills may invalidate affected entries |
| `/decisions` | orchestrator | Skills may propose a decision record |
| `/pending_actions` | orchestrator | Skills may add scoped actions |
| `/verification_queue` | validator or orchestrator | all Skills may add unverified facts |

## Confirmation invariant

The Agent may organize, estimate, warn and propose. The traveler decides:

- whether to add, remove or move a personal-priority item;
- whether to accept a tight day or known risk;
- whether to change route, lodging, meal or reservation anchors;
- whether an external booking was actually changed or cancelled.

## Compatibility with the Web Demo

The Web Demo already uses analogous concepts: `stage`, `answers`, `confirmed_day_constraints`, `generated_trip_state`, `lodging_stays`, `days`, `verification_queue`, snapshots and scoped itinerary patches. The capability-pack schema normalizes those ideas and separates durable travel state from browser/session state.

Recommended migration mapping:

| Web Demo | Capability pack |
|---|---|
| `stage` | `current_phase` |
| `answers` | `trip`, `traveler`, `preferences` |
| `confirmed_day_constraints` | `decisions` plus locked day items |
| `generated_trip_state.trip` | `trip` and `route_skeleton` |
| `generated_trip_state.lodging_stays` | `lodging.stays` |
| `generated_trip_state.days` | `itinerary.days` |
| `verification_queue` | `verification_queue` |
| `trip_state_snapshot` | versioned exported state, not an always-loaded transcript object |
| recent messages | Runtime Session only |
