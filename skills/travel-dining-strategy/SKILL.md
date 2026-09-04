---
name: travel-dining-strategy
description: Build a traveler-specific dining mix, identify must-eat and booked restaurant anchors, and recommend route-compatible restaurants. Use when food choices, dining constraints or restaurant placement need planning; do not use to claim a reservation was completed or to rearrange unrelated itinerary days.
---

# Travel Dining Strategy

Turn food curiosity, dietary needs and itinerary context into a small set of meaningful dining choices. Decide what experience belongs in the trip before ranking concrete restaurants.

## Start with known food anchors

Read existing Trip State and preserve:

- must-eat foods and restaurants;
- saved links, screenshots and personal reasons;
- already booked restaurants;
- covered dining experiences;
- itinerary days, lodging areas and route clusters.

For a booked restaurant, arrangement requires only name, date, reservation time and address. Treat it as a locked time/place anchor. Do not ask for unrelated details.

## Collect only decision-changing preferences

Ask once about hard dietary constraints and allow `none` or `decide_later`:

- allergies or medical restrictions;
- religious restrictions;
- vegan or vegetarian requirements;
- absolutely excluded ingredients.

Keep soft preferences separate: raw-food comfort, spice, cuisines, local-food openness, familiar-food needs and dining format. Hard constraints filter candidates; soft preferences rank them. Do not infer either from nationality or language.

Budget is optional and broad. Separate an ordinary per-person meal range from exceptional-meal budget/count. A booked expensive meal may establish an `observed_special_meal_range`, but it does not imply that every meal may cost that much.

## Let the traveler choose a planning path

Offer:

- add must-eat, saved or booked restaurants;
- build a personalized food-experience mix;
- recommend restaurants along each day's route;
- discover representative local foods before choosing restaurants;
- postpone or omit dining planning.

Postponement is not omission. When postponed, return a completion-ledger item with `status: deferred` and a suitable revisit point. Resurface dining after lodging, after transport refinement, before city-block confirmation, or before final roadbook export—whichever first makes the decision useful. Do not nag at every turn.

Before final export, dining must resolve to one of: selected/booked restaurants, confirmed meal areas or flexible meal windows, or `explicitly_skipped`. The traveler never has to select a concrete restaurant, but silence must not be mistaken for a finished dining plan.

When planning several days, first propose a modifiable food-experience mix rather than a wall of restaurant names. Cover selected highlights, not every meal by default. Leave remaining meals flexible unless the traveler asks for full dining coverage.

## Build and deduplicate the experience mix

Mark an already booked or selected core experience as covered. Avoid recommending the same core experience again unless the traveler asks or clearly likes repetition. Do not expand one covered dish into a ban on its broader cuisine. Everyday foods such as noodles, coffee or simple breakfasts may repeat when appropriate.

Derive relevant meal slots from local dining customs and the itinerary: breakfast, brunch, lunch, cafe/tea, dinner, night market, bar/late meal or all-day dining. Local custom informs the proposal but does not override the traveler's schedule. Do not force breakfast planning where it adds no value.

## Recommend concrete restaurants

After the experience mix is accepted, assign experiences to compatible days using route area, lodging, meal timing, opening pattern, reservation difficulty, existing bookings and already covered experiences. Recommend normally 2–3 candidates for a focus meal, then load more only on request.

For each candidate, include what available evidence supports:

- name and local-language name;
- cuisine/experience and why it fits the traveler;
- why it fits this day's route and meal slot;
- area, address and indicative per-person price;
- separate platform ratings, rankings or awards with source, scope and date;
- signature or commonly recommended dishes with evidence class;
- reservation/Walk-in status and verified hard rules;
- map, official and reservation links;
- verification status.

Never synthesize ratings into an “AI score.” A ranking needs its list name, geographic/category scope, year or checked date and source. Dynamically identify credible local platforms for the destination rather than assuming one global platform. Social popularity is a signal, not proof of quality.

Classify dish evidence as `official_signature`, `guide_recommended`, `frequently_mentioned` or `agent_suggestion`. Do not call something “must-order” without a defensible source. Summarize review themes instead of reproducing long review text.

In a Web Demo, hide ratings, reviews or dish data when they require unavailable/expensive APIs. Do not render empty or invented fields. The core experience, route fit, price indication, reservation state and map entry remain usable.

## Handle reservation truthfully

Use states such as candidate, selected-unbooked, reservation-required, reservation-recommended, booked, walk-in-risk-accepted and skipped. A selected-unbooked restaurant may enter a provisional itinerary, but it must not appear booked.

Show verified hard rules on the candidate rather than turning them all into intake questions: reservation-only, minimum party, set-menu requirement, child restriction, seating duration, card guarantee, cancellation fee, minimum spend, payment or dress rule. If unavailable, mark rules unknown.

Provide official or trusted reservation links when available. The traveler completes the booking unless the host has an explicitly authorized booking tool. Accepting Walk-in risk preserves the restaurant and sends the access risk to Route Validator.

## Hand back to arrangement

Once the traveler selects a restaurant, patch only that dining item and affected date. A candidate already compatible with the working meal area/window needs only a local anchor check. A fixed booking, distant restaurant or meaningful timing change hands the affected day to Itinerary Arranger and Route Validator. Never regenerate unrelated days.

Read `references/input-output-contract.md` for structured integration. Follow `../../core/trip-state-dining-v0.1.md` for domain semantics and `../../core/STATE.md` plus `../../core/trip-state.schema.json` for the canonical cross-skill state.

Read only the active city block or day, hard food constraints, soft preferences, existing dining coverage, booked anchors, route context and host capabilities. Return a revision-checked scoped patch. Restaurant selection does not imply booking; route-shaping or fixed-time dining changes must request scoped reflow and traveler confirmation.
