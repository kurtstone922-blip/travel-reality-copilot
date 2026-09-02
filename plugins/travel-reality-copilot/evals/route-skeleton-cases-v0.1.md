# Route Skeleton Skill｜Behavior Cases V0.1

## Case 1｜Broad country only

**Given** the traveler says only “Japan for ten days.”

**Must** hand off to route-direction discovery.

**Must not** fabricate a confirmed city skeleton.

## Case 2｜Destination pool provided out of order

**Must** preserve every destination and propose a coherent entry-to-exit corridor.

**Must not** treat mention order as confirmed travel order.

## Case 3｜Known destination pool

**Must not** restart generic country-route recommendations when the traveler already provides meaningful desired stops.

## Case 4｜Attraction mistaken for city

**Must** normalize whether a place is a base, excursion, stop, region or attraction before counting route stops.

## Case 5｜Evening entry arrival

**Must** use the arrival to propose an overnight role while asking whether the following day is sightseeing or onward travel.

## Case 6｜Entry city as transfer only

**Given** the traveler confirms immediate onward movement and no visit intent.

**Must** retain it as an entry/transfer boundary rather than assign sightseeing days.

## Case 7｜User-defined skeleton

**Must** preserve supplied sequence, stop purpose and durations and ask only about material ambiguity.

## Case 8｜Agent-recommended skeleton

**Must** recommend corridor and allocation using entry/exit, total days, transfers, anchors and desired experiences.

## Case 9｜No abstract role questionnaire

**Must** infer provisional roles from known facts and ask only ambiguous route-changing questions.

## Case 10｜City count is not capacity

**Must** determine stop roles, nesting and desired experiences before declaring the trip overloaded.

## Case 11｜Experience knowledge needed for duration

**Must** use known desired experiences or hand the scoped gap to Place Discovery before final allocation.

## Case 12｜Compact stop card

**Must** show days/nights, representative experiences, role, position reason, next-transfer burden, assumptions and trade-off.

**Must not** expand hotels, restaurants or hour-level schedules.

## Case 13｜Skeleton confirmation boundary

**Must** confirm corridor and allocation before asking for downstream generation mode.

## Case 14｜Generation mode ownership

**Must** put Day by Day first and mark it recommended while also offering one-pass baseline.

**Must not** infer the mode from voice input, detail level or known city days.

## Case 15｜Day by Day city compression

**Must** propose a compressed distribution preserving traveler-selected content and mark high-intensity, conditional, at-risk, cannot-fit or date-unavailable impacts for traveler decision.

## Case 16｜One-pass city compression

**Must** regenerate the affected baseline and visibly adjust only Agent-suggested unconfirmed filler while protecting traveler selections and locked anchors.

## Case 17｜Appointment on removed date

**Must** allow the traveler to move it into the itinerary immediately while marking external rescheduling pending.

**Must not** claim the external booking has been changed or cancelled.

## Case 18｜Affected-scope patch

**Must** list affected city blocks, connections, lodging nights and dependent daily arrangements.

**Must not** rewrite unrelated confirmed blocks.

## Case 19｜Insufficient transport capability

**Must** qualify connection burden and schedule claims as estimates/unverified.

**Must not** invent an exact intercity service.

## Case 20｜User confirms recommended allocation

**Must** write the confirmed skeleton to shared state and then ask the traveler to choose Day by Day or one-pass baseline.
