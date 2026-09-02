# Travel Route Validator｜Input, Output and Patch Contract V0.1

Read this reference when integrating or testing structured route validation. Keep technical objects hidden from the traveler unless they help explain a decision.

## Input

```json
{
  "request": {
    "text": "Traveler's current message"
  },
  "context": {
    "trigger": "day_confirmation",
    "current_city_block_id": "tokyo-01",
    "current_day_id": "tokyo-day-02",
    "available_capabilities": {
      "map_search": false,
      "web_search": false,
      "route_computation": false,
      "transit_schedule": false,
      "official_site_access": false
    }
  },
  "trip_state": {
    "traveler_pace": "balanced",
    "lodging_segments": [],
    "affected_days": [],
    "anchors": [],
    "accepted_tradeoffs": []
  }
}
```

Pass only the affected scope plus the anchors and connections required to judge it.

## Output envelope

```json
{
  "action": "present_validation",
  "summary": "Concise validation summary",
  "issues": [],
  "decision_prompt": null,
  "proposed_patches": [],
  "handoff": null,
  "wait_for_user": true
}
```

Use one primary action:

- `ask_constraint`: a missing booking, priority or duration answer would change the judgment;
- `present_validation`: show validated issues and relevant options;
- `ask_issue_decision`: a route change or accepted risk needs traveler choice;
- `propose_patch`: the traveler chose an option and a scoped patch is ready for approval/application;
- `request_revalidation`: underlying state changed and affected facts must be checked again;
- `ready_for_day_confirmation`: no unresolved blocking/high issue prevents asking for day confirmation;
- `ready_for_block_confirmation`: cross-day checks are complete and final city/stay-block confirmation can be requested;
- `handoff_place_discovery`: the traveler explicitly asks for a replacement experience;
- `report_limitation`: material facts cannot be verified with available capabilities.

## Issue

```json
{
  "id": "route-issue-id",
  "date": "2026-11-11",
  "type": "venue_closed",
  "severity": "blocking",
  "user_label": "必须处理",
  "status": "open",
  "summary": "The venue is closed on the planned date",
  "cause": "Verified closure schedule",
  "affected_items": [],
  "evidence": [],
  "verification_status": "verified",
  "hard_anchor_related": true,
  "options": [
    {
      "id": "move_date",
      "label": "换到其他开放日期",
      "consequence": "Affected dates require limited revalidation"
    },
    {
      "id": "remove",
      "label": "从当天移除",
      "consequence": "The traveler gives up this place"
    },
    {
      "id": "find_same_area_alternative",
      "label": "寻找同区域替代体验",
      "consequence": "Hand off to place discovery after confirmation"
    }
  ],
  "traveler_decision_required": true
}
```

## Decision boundary

- An issue can contain recommendations, but not an implied choice.
- `proposed_patches` must remain empty until the traveler chooses an option.
- Choosing an option authorizes only the described affected scope.
- A place-discovery handoff is allowed only after the traveler requests alternatives.
- Accepting a risk records an accepted trade-off; it does not turn an uncertain fact into a verified one.

## Proposed patch

```json
{
  "issue_id": "route-issue-id",
  "scope": {
    "city_block_id": "tokyo-01",
    "affected_day_ids": ["tokyo-day-02"]
  },
  "operations": [],
  "impact_summary": "What changes and what remains untouched",
  "requires_confirmation": true
}
```

Never include unrelated dates, confirmed days or locked anchors in the patch scope.
