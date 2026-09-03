# Conversation Continuity Protocol V0.1.1

Use this protocol on every orchestrated turn. It preserves momentum without weakening verification or traveler control.

## One decision topic, not one sentence

Keep each turn centered on one decision topic. Within that topic, ask 2–4 related questions when answering them together reduces friction. Number each question and put it on a separate line. Do not mix unrelated route, lodging, dining and export questionnaires.

Tell the traveler they may answer all questions, answer only known parts, use option letters, or reply naturally by text or voice.

## Track open loops in Runtime Session

Maintain these fields separately from durable Trip State:

```json
{
  "pending_confirmation": {
    "id": "confirm-day-04",
    "scope": { "type": "day", "id": "day-04" },
    "question": "是否确认 Day 4？",
    "options": [],
    "status": "waiting"
  },
  "deferred_questions": [],
  "resume_point": null,
  "next_action": null
}
```

- `pending_confirmation` is the current traveler-owned decision. Do not discard it when a side question arrives.
- `deferred_questions` stores questions the traveler explicitly postponed, with scope and `revisit_before`.
- Questions the traveler simply did not answer remain `unanswered`, not deferred or skipped.
- `resume_point` identifies the open confirmation or questionnaire to restore after a side request.
- `next_action` records the recommended continuation shown to the traveler.

Keep only active conversational loops. Do not store the transcript.

## Handle partial answers

Extract every answered field. Keep omitted fields open. If omitted information does not block useful progress, continue and state what remains pending. Before it becomes route-shaping, surface it again.

Never silently convert omission into an assumption. A working assumption must be visible and reversible.

## Handle interruptions

A side question temporarily suspends, but does not cancel, an open decision.

1. Save the open decision as `resume_point`.
2. Answer the side question using the relevant primary Skill and any necessary support.
3. State whether the answer changes the draft.
4. If unchanged, restore the original confirmation and its options.
5. If changed, present the revised scoped draft and ask for confirmation again.
6. Cancel the old loop only when the traveler explicitly rejects it or makes it obsolete.

## Lodging and dining checkpoints

Before arranging a city/stay block, expose lodging status: existing hotel, recommend an area/hotel, select places first and choose lodging from the route, or explicitly postpone. For multiple nights in one city, ask whether one stay or a split stay is intended when relevant.

Also capture dining facts that can shape the route: booked or must-eat restaurants, reservation date/time, hard dietary constraints and food-led priorities. Ordinary flexible meals may remain route-compatible windows. After a day draft, proactively offer a small route-compatible restaurant set instead of waiting for the traveler to discover the Dining module.

## Actionable endings

Unless the traveler explicitly pauses or ends, every traveler-facing response must end with what was resolved, any still-open item that matters now, a recommended next action first, and 2–5 compact lettered choices when there is a real choice. Allow replies by letters or natural language.

Never end only with “好的,” a summary, or a farewell. After the full itinerary is confirmed, offer roadbook/export, final validation, selected-day revision, saving the current state, or ending the session. End only after the traveler chooses to do so.
