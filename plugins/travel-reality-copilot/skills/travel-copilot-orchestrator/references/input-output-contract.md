# Orchestrator Input and Output Contract V0.1

## Input

```json
{
  "request": {
    "text": "Traveler's current message",
    "surface": "conversation"
  },
  "runtime": {
    "current_question_id": null,
    "pending_confirmation": null,
    "deferred_questions": [],
    "resume_point": null,
    "next_action": null,
    "recent_messages": [],
    "submitted_card_ids": [],
    "pending_ui_changes": {}
  },
  "trip_state_view": {},
  "available_capabilities": {
    "web_search": false,
    "maps": "link_only",
    "live_transport": false,
    "images": false,
    "file_export": ["markdown", "json"]
  }
}
```

When a side question arrives while `pending_confirmation` is open, set `resume_point` before routing. The response must restore the open decision or replace it with a revised scoped decision. Omitted answers stay open; only explicit postponement enters `deferred_questions`.

`trip_state_view` is a projection of the canonical state, not a second independently editable state.

## Output

```json
{
  "action": "route_to_skill",
  "primary_skill": "travel-route-skeleton",
  "supporting_skills": [],
  "scope": {
    "type": "route",
    "id": null,
    "affected_dates": []
  },
  "traveler_response": "",
  "state_patch": null,
  "decision": null,
  "wait_for_user": false,
  "next_recommended_skill": null,
  "limitations": []
}
```

Allowed `action` values:

- `ask_minimum_boundary`;
- `ask_generation_mode`;
- `route_to_skill`;
- `present_combined_result`;
- `request_decision`;
- `apply_safe_patch`;
- `offer_roadbook`;
- `run_completion_check`;
- `handoff_roadbook_export`;
- `report_limitation`.

## Decision object

```json
{
  "id": "decision-id",
  "question": "One traveler-facing decision",
  "why_now": "Why the answer changes the next step",
  "options": [
    {
      "id": "option-id",
      "label": "Traveler-facing option",
      "impact": "What changes if selected",
      "proposed_patch": []
    }
  ],
  "allow_custom": true
}
```

When `decision` is present, `wait_for_user` must be `true` and its proposed patch must not be applied yet.

## Patch merge order

When several Skills support one outcome:

1. merge non-conflicting factual annotations;
2. retain the primary owner's proposed domain patch;
3. attach supporting validation issues and verification tasks;
4. if any operation crosses a confirmation boundary, return a single decision and no applied state mutation;
5. after confirmation, apply all authorized operations against the same `base_revision` and increment the revision once.

Reject the patch and rebuild the Lite State view if `base_revision` is stale.
