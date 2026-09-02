---
name: travel-place-discovery
description: Help a traveler discover, understand and collect places or experiences when exploring a destination, completing an incomplete candidate set, or filling a validated nearby gap. Includes attractions, food, shops, hotels-as-experiences, special transport and events; do not use to silently generate or rewrite a full itinerary.
---

# Travel Place Discovery

Turn curiosity into a traveler-owned candidate shelf. “Place” includes any experience that can motivate, occupy or reshape a trip: attractions, food, shops, neighborhoods, nature, events, experience-led lodging and special transport.

Do not behave like a generic popularity ranking. Help the traveler understand what an item is, why it may matter to them, and what commitment or route effect it introduces. The traveler decides what enters the trip.

## Choose the discovery mode

- Use `open_discovery` when the traveler has a destination or curiosity seed but little route/place knowledge.
- Use `gap_completion` when existing desired items cover only part of the trip.
- Use `user_led_complete` when the traveler already has a substantially complete itinerary; route to validation instead of reopening discovery.
- Use `nearby_fill` only for a specific validated free window/area or when the traveler explicitly asks what else fits nearby.

## Start from curiosity and known facts

Read destination, entry/exit points, day count, existing items, fixed dates, traveler tempo and available capabilities from Trip State. Preserve supplied links, screenshots, posts and personal reasons when the host can understand them.

If the motivation is unclear, ask what sparked the trip: a place, show, food, event, hotel, train, image or broader curiosity. Do not assume that an unfamiliar city means the traveler has no existing interest.

Do not repeat intake questions whose answers already exist.

## Open discovery

When the traveler has little concept of the destination:

1. summarize the motivation and practical boundaries;
2. offer 2–4 distinct macro route directions or experience themes;
3. include a custom direction option;
4. wait for the traveler to choose or combine directions;
5. then reveal a manageable shelf of concrete candidates.

Macro route directions may account for entry/exit points, days and current weather/season evidence when available. They must remain selectable directions, not a complete scheduled itinerary.

## Complete an incomplete set

When the traveler already has some desired items:

- keep every supplied item and its personal reason;
- identify which dates, areas or experience dimensions remain uncovered;
- recommend complementary candidates around existing anchors;
- explain whether each candidate strengthens geographic continuity, thematic depth or a real free window;
- never replace existing choices simply because another item is more popular.

Do not claim an exact percentage of itinerary coverage without a defensible time/route basis. Use qualitative states such as sparse, partial, nearly complete or complete enough for validation.

Scale the total candidate pool using city/stay-block duration, usable time, city scale, traveler pace, fixed anchors and existing selections. A three-day stay in a large city may need roughly 10–20 candidates; a one-day stay or partly filled block usually needs fewer. Do not display the whole pool merely because it exists. When the plan is nearly complete, do not push a normal shelf; offer only a small nearby-fill set after validation and traveler request. Return fewer when relevance or evidence is weak rather than adding generic filler.

Adapt the visible batch to the host surface:

- in the Web Demo, normally reveal 3–5 candidates at once; a compact step may use 2–4;
- in conversational AI or capability-pack use, normally reveal 7–10 candidates first and offer `load_more` when the pool has more relevant items;
- never repeat candidates already shown or rejected in a later batch.

For a large pool, create visible priority layers rather than an undifferentiated ranking. The first batch must combine the strongest matches for the traveler's curiosity/preferences with representative famous landmarks or defining local experiences. Do not omit the city's essential orientation points merely because personalized matches exist, unless the traveler excluded or already handled them. Follow with relevant popular highlights. Later batches may broaden toward user/community recommendations, online-popular experiences, special, seasonal, niche or route-convenient possibilities. Popularity or social buzz is a discovery signal, not proof of quality or fit.

## Respect a complete user plan

If the itinerary is substantially complete, do not push more discovery. Hand off to route validation. When validation shows a feasible gap, offer the traveler the choice to leave it free or invoke `nearby_fill`.

Nearby-fill items must remain optional, fit the verified area/time window, and be safe to skip. Do not use a free window as permission to overload the day.

## Build useful candidate cards

For each candidate, provide:

- name and type;
- a short explanation of what it is;
- why it connects to this traveler's curiosity, existing anchors or preferences;
- location/area relationship;
- indicative duration range;
- relevant date, season, opening or reservation constraints when verifiable;
- likely route effect or commitment level;
- source and verification status when facts are time-sensitive.
- address and official website when available;
- useful map, booking or event links when available;
- an image when the host supports image display and a usable sourced image is available.

Candidate types may include attractions, museums, galleries, neighborhoods, markets, restaurants, cafes, shops, nature, seasonal landscapes, festivals, fireworks, performances, hotel/ryokan experiences, special trains, ferries, tours and workshops.

Ordinary lodging and transport stay in their logistics modules unless the hotel, train or route is itself part of the desired experience.

## Preserve traveler ownership

Offer actions such as:

- learn more;
- save for later;
- consider for this trip;
- mark as must-do;
- use only if time permits;
- not interested this trip;
- add a custom item.

Recommendations remain `suggested` until the traveler acts. Never add them directly to a confirmed itinerary. A `must_do` selection protects the item from automatic removal but does not guarantee access, opening or feasibility.

Do not infer a category-wide dislike from rejection of one item. Record a broader avoidance only when the traveler explicitly states it.

## Evidence and capability boundaries

Use available map, search, official-source, weather or image-understanding capabilities when relevant. Prefer official sources for dates, closures, reservations and special-event schedules. Keep verified facts, visitor reports and model inference separate.

With no external capability, provide responsibly framed inspiration and mark time-sensitive details unverified. Never invent current opening, event dates, availability, booking requirements, ratings or exact travel times.

Candidate information should be as complete as the available evidence permits. Do not hide decision-relevant information merely to keep cards minimal, but do not fabricate missing addresses, official links or images. Preserve image and factual sources when available.

## Stop and hand off

Stop and wait when the traveler must choose a direction, candidate or commitment level. After the traveler has enough candidates, offer to load more, start arrangement, or keep the remaining time intentionally open. Treat `load_more` as a shelf-level action, not an action on one candidate.

After the traveler finishes selecting the current shelf, hand the selected set to arrangement. For a one-day stay, arrangement may compose that day; for a multi-day city/stay block, arrangement distributes the selected set across its days. Arrangement must combine places with lodging, food anchors, reservations and transport. If important lodging or food anchors are missing, treat the first arrangement as provisional and revisit only the affected scope when they are added.

Hand fixed or risky items to route validation. Do not assign the entire city to specific dates or produce a final itinerary inside Discovery itself.

## Shared contract

When implementing or testing structured behavior, follow `../../core/trip-state-place-discovery-v0.1.md` and `references/input-output-contract.md`. Use `../../core/STATE.md` and `../../core/trip-state.schema.json` as the canonical cross-skill contract.

Read only the active destination or city block, curiosity seeds, relevant preferences, existing candidates, selected/rejected IDs, fixed anchors and host capabilities. Return a revision-checked patch scoped to `/place_discovery`; selected items may be handed to Arrangement by ID, but Discovery must not silently schedule or confirm them.
