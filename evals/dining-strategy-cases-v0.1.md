# Dining Strategy Skill｜Behavior Cases V0.1

## Case 1｜Existing booked restaurant

**Must** record name, date, reservation time and address as a locked dining anchor and mark its core experience covered.

**Must not** ask for unrelated booking details or recommend a duplicate core experience by default.

## Case 2｜Hard dietary constraint

**Given** a traveler cannot eat raw food or has an allergy/religious restriction.

**Must** filter incompatible candidates and keep the constraint distinct from a soft preference.

## Case 3｜No constraint answer

**Must** allow `none` or `decide_later` rather than blocking all dining planning.

## Case 4｜No nationality inference

**Must not** assume a Chinese traveler needs Chinese food or a foreign traveler in China wants Western food.

## Case 5｜Several days, no restaurant list

**Must** propose a modifiable food-experience mix before concrete restaurants and avoid filling every meal unless requested.

## Case 6｜Covered sukiyaki experience

**Must** avoid another default sukiyaki recommendation while still allowing other beef or hotpot experiences.

**Must** reopen repeat recommendations when the traveler asks.

## Case 7｜Everyday repetition

**Must** allow reasonable repetition of noodles, coffee, breakfast or another explicitly liked everyday category.

## Case 8｜Special-meal budget inference

**Must** keep a booked expensive meal as an observed special-meal range.

**Must not** infer that every meal may use that budget.

## Case 9｜Route-based assignment

**Must** assign accepted experiences to compatible days before showing normally 2–3 restaurant candidates for a focus meal.

## Case 10｜Separate rating sources

**Must** display map rating, credible local-platform rating and guide/award recognition separately with scope and date.

**Must not** calculate an AI composite score.

## Case 11｜Top-list claim

**Must** include exact list name, geographic/category scope, year or checked date and source.

**Must not** output an unsupported “country Top 10” label.

## Case 12｜Recommended dish evidence

**Must** distinguish official signature, guide recommendation, frequent visitor mention and Agent suggestion.

**Must not** call an unsupported dish “must-order.”

## Case 13｜Web Demo lacks paid data

**Must** omit unavailable ratings/reviews cleanly while preserving useful route-fit, price, reservation and map information.

**Must not** fabricate data or show broken empty modules.

## Case 14｜Selected but unbooked

**Must** allow provisional itinerary inclusion with clear reservation/Walk-in risk.

**Must not** mark it booked.

## Case 15｜Hard restaurant rules

**Must** display verified reservation, party, menu, child, timing, guarantee, cancellation, spend, payment or dress rules on the candidate when available.

**Must not** turn all possible rules into required intake questions.

## Case 16｜Local meal-slot structure

**Must** derive useful meal slots from local custom and itinerary context without forcing breakfast or three fixed meals.

**Must** prefer the traveler's known schedule when it differs from local convention.

## Case 17｜Compatible restaurant selection

**Must** perform only a local anchor check when the selected restaurant fits the working meal area/window.

## Case 18｜Distant or fixed-time restaurant

**Must** hand only affected dates to Itinerary Arranger and Route Validator.

**Must not** regenerate unrelated days.

## Case 19｜Walk-in risk accepted

**Must** preserve the restaurant and visible risk without converting uncertain access into a confirmed booking.

## Case 20｜Skip one restaurant

**Must not** infer dislike of the restaurant's entire cuisine unless the traveler explicitly states it.
