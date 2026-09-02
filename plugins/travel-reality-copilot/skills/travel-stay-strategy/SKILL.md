---
name: travel-stay-strategy
description: Plan lodging collaboratively when a traveler needs to choose an area or hotel, provide an existing booking, split a stay, or evaluate how lodging affects itinerary routes. Do not use for booking transactions or itinerary export.
---

# Travel Stay Strategy

Help the traveler choose lodging without turning the experience into one-click itinerary generation. Treat lodging as a route anchor whose role depends on the current city/stay block, existing decisions and traveler preferences.

## Before acting

Read the lodging portion of the current Trip State. Follow `../../core/trip-state-lodging-v0.1.md` for domain semantics and `../../core/STATE.md` plus `../../core/trip-state.schema.json` for the canonical cross-skill state.

Read only the active city block, affected dates, route anchors, traveler lodging preferences, current stays and relevant locked decisions. Return a revision-checked scoped patch. A selected hotel may become a working itinerary anchor, but confirmation, locking, replacement and any affected-day reflow remain explicit traveler decisions.

Determine:

- the current city/stay block and affected dates;
- whether the traveler wants to decide lodging now;
- whether a hotel, area or booking already exists;
- whether the city/stay block already has selected or confirmed places and fixed events;
- whether the stay should remain in one hotel or be split;
- which map, search or external data capabilities are actually available.

Do not ask again for information already present in Trip State.

If the traveler already provides a chosen hotel, accept the decision. Record the hotel name and useful supplied information, set it as the working route anchor, and skip area discovery, alternative recommendations and preference questions that no longer affect the decision. Treat it as `locked` only when the traveler says it is booked or explicitly locks it; otherwise treat it as `selected`.

## Select the lodging strategy

- Use `lodging_first` when the traveler already has a hotel or area, has a strong brand/loyalty preference, or the hotel itself motivates the trip.
- Use `route_first` when the traveler wants to select attractions, restaurants and activities before deciding where to stay.
- Use `ai_assisted` when the traveler has no clear lodging preference and wants recommendations based on the current route.
- Use `temporary_anchor` when the traveler postpones lodging but wants to continue planning.

Explain the selected strategy briefly when it changes what happens next. Do not expose internal routing terminology unless it helps the traveler choose.

## Decide whether to split the stay

For several nights in one city, default to one hotel. Ask once whether the traveler needs or wants to change hotels. If yes, collect the intended split or help assign nights to explicit lodging segments. Consider luggage transfer and check-in/check-out friction. Do not recommend moving hotels merely to create variety.

## Collect preferences progressively

Ask only for missing preferences that materially change the recommendation. Relevant fields include:

- itinerary and transport convenience;
- nightly or total budget and currency;
- guests, rooms and basic bed preference when concrete hotel selection or price is involved;
- loyalty programs, tier and preferred brands;
- preferred or avoided areas;
- hotel style and must-have facilities;
- any hotel that is itself a must-have experience.

When the traveler provides no ranking, prioritize itinerary/transport convenience, then budget fit, other stated convenience and preferences, loyalty relevance, and verified rating/style.

## Recommend in two layers

When the traveler has no lodging concept:

1. Recommend 2–3 meaningfully different areas and explain the route advantage and trade-off of each.
2. Wait for the traveler to choose an area.
3. Recommend about five hotels in the chosen area: three strongest matches for the itinerary and stated preferences, plus two nearby alternatives within that same area that offer useful comparison.

For each hotel, provide its name, area, reference price when responsibly available, verified rating with source, transport/itinerary fit, preference and loyalty fit, a concise traveler-specific reason, key trade-offs, and available Booking, Google Maps or Amap links. Avoid five near-identical options. If reliable candidates are limited, return fewer than five rather than inventing hotels or facts.

Once the traveler chooses an area, normally keep both the strongest matches and nearby alternatives within that area. Treat "nearby" as nearby within the chosen area's practical station or itinerary catchment, not as general permission to expand to adjacent neighborhoods.

Apply a narrow loyalty exception when the traveler explicitly values both itinerary/transport convenience and a hotel loyalty program, but the chosen area lacks enough relevant loyalty hotels. Keep the top three focused on the chosen area and route convenience; allow up to two loyalty-relevant alternatives in nearby areas. Label these as cross-area loyalty alternatives and explain the loyalty value, added travel burden and reason for expanding the search. Never present them as if they were in the selected area.

Treat loyalty as a preference by default. If the traveler says the loyalty brand is mandatory, treat it as a hard constraint, allow a wider search when needed, and make the resulting location trade-off explicit.

If the traveler has not selected an area and explicitly asks for free hotel recommendations, allow candidates across several suitable areas. Base the spread on the traveler's itinerary points, transport convenience and preferences, and explain why each hotel's area is relevant. Do not take this bypass unless the traveler asks for it.

Do not silently convert a recommendation into a traveler decision.
Do not recommend alternatives when the traveler has already chosen a specific hotel unless they explicitly ask to compare or reconsider.

## Grounding and verification

Use available host capabilities rather than assuming a specific provider:

- With map/search tools, verify place identity, location, rating and route relationship where supported.
- For mainland China, prefer Amap links when appropriate; for international destinations, prefer Google Maps links when appropriate.
- With web search but no map tool, find plausible hotels and supporting sources while keeping time-sensitive fields explicitly qualified.
- With no external capability, provide strategy-level guidance and plausible candidates, mark time-sensitive facts as unverified, and provide search links when possible.

Never claim live availability, exact current price or current rating solely from model memory. A hotel page or search result is not proof of availability for the traveler's dates.
Keep the rating source and scale visible. Do not combine Google Maps, Booking or other platform ratings into an invented aggregate score.

If the host model can read a supplied map/booking link or screenshot, extract the hotel identity and useful verified details. If it cannot, fall back to asking for the hotel name. Links and screenshot extraction are optional capabilities, not prerequisites for this skill.

## Apply traveler decisions

- A recommendation is `candidate` and does not affect the route.
- A hotel chosen by the traveler becomes `selected` and immediately serves as the working start/end anchor for affected days.
- After selecting the hotel, ask whether the traveler wants the affected itinerary optimized around this new anchor.
- Reorder or recalculate affected days only after the traveler agrees. If they decline or postpone, keep the itinerary unchanged and record that route impact remains unresolved.
- An already booked hotel, or one explicitly locked by the traveler, becomes `locked` immediately.
- Confirm itinerary days individually. A confirmed day protects its hotel anchor and other itinerary items from unrelated regeneration.
- After all intended days in the city/stay block are confirmed, ask for one final city/stay-block confirmation before moving to the next place.
- A selected hotel becomes `confirmed` with the complete city/stay block unless it is already locked.

When lodging changes, return only the affected state patch and impact summary. Recalculate only affected dates. Never overwrite unrelated confirmed days, locked anchors or rejected candidates.

## Stop conditions

Stop and wait for the traveler when:

- they must choose whether to decide lodging now;
- they must choose a lodging area or concrete hotel;
- a requested split stay needs dates assigned;
- required occupancy or budget information is missing for concrete comparison;
- a time-sensitive fact cannot be verified and affects the decision;
- a change would modify a confirmed or locked decision;
- a day or city/stay block is ready for confirmation.

Do not continue into unrelated city planning or generate the complete trip unless the traveler explicitly chooses that mode.

## Structured contract

When the host supports structured output, follow `references/input-output-contract.md`. Keep the user-facing response conversational; the structured state patch is for the host application or shared Trip State.
