# Place Discovery Skill｜Behavior Cases V0.1

## Case 1｜Curiosity seed, little destination knowledge

**Given** the traveler is interested in Japan because of a show but has few specific places.

**Must** ask or infer the curiosity seed, use entry/exit points and days, offer 2–4 distinct directions/themes, and wait.

**Must not** immediately generate a full day-by-day itinerary.

## Case 2｜Existing items cover part of the trip

**Given** the traveler supplies several must-do places but still has meaningful gaps.

**Must** preserve them and recommend complementary candidates around their geographic, temporal or thematic gaps.

**Must not** restart discovery as if the traveler had supplied nothing.

## Case 3｜Complete user itinerary

**Given** the traveler already has a substantially complete plan.

**Must** route it to validation and avoid pushing more discovery.

## Case 4｜Nearby optional fill

**Given** Route Validator identifies a feasible free window and the traveler asks what fits nearby.

**Must** return optional, nearby, time-compatible items that can be skipped safely.

**Must not** overload the day or change confirmed anchors.

## Case 5｜Special train

**Given** a scenic or themed train is part of the travel motivation.

**Must** treat it as a discovery experience, retain date/booking/route constraints, and hand fixed details to validation.

**Must not** reduce it to ordinary transport.

## Case 6｜Experience-led hotel

**Given** the traveler wants a specific ryokan or onsen hotel as part of the trip.

**Must** treat it as a discovery item and potential hard anchor, then hand lodging effects to Stay Strategy.

## Case 7｜Restaurant as destination

**Given** a restaurant is a must-eat destination or affects route/time.

**Must** include it as a discovery item with reservation and route implications.

**Must not** treat it as an interchangeable nearby meal.

## Case 8｜User rejects one museum

**Must** mark that item not interested for this trip.

**Must not** infer that the traveler dislikes all museums unless explicitly stated.

## Case 9｜Time-sensitive festival

**Must** verify or qualify dates, location and access requirements and avoid inventing a current schedule.

## Case 10｜No external tools

**Must** provide inspiration with time-sensitive details marked unverified.

**Must not** invent current opening, ratings, event dates or availability.

## Case 11｜Macro route versus full itinerary

**Given** entry/exit points and trip length are known.

**Must** allow selectable macro route directions.

**Must not** interpret route direction selection as permission to schedule every day.

## Case 12｜Traveler ownership

**Given** the Agent recommends several candidates.

**Must** wait for save/interested/must-do/optional/reject actions before changing itinerary state.

**Must not** add recommendations directly to confirmed days.

## Case 13｜Three-day empty large-city block

**Given** the traveler wants to select experiences from zero and will spend three usable days in a large city.

**Must** build a sufficiently broad candidate pool, potentially roughly 10–20 relevant candidates, scaled to time, city size and traveler pace, then reveal it in manageable batches.

**Must not** convert the batch into a complete daily itinerary.

## Case 14｜Candidate count follows remaining capacity

**Given** the traveler already has one or two meaningful items but still has several largely empty city days.

**Must** provide enough complementary candidates for the remaining capacity rather than applying a fixed 2–4 limit.

**Must not** derive shelf size only from the count of existing items.

## Case 15｜Complete candidate information

**Given** verified name, type, experience, fit, area, address, duration, reservation/date constraints and official link are available.

**Must** expose those decision-relevant fields and preserve source/verification status.

**Must not** omit available facts merely to force an artificially minimal card.

## Case 16｜Optional image display

**Given** the host supports images and a usable sourced image is available.

**Must** include the image with its source metadata.

**Given** image display or a usable image is unavailable.

**Must** omit the image without blocking discovery or inventing one.

## Case 17｜Large-shelf ordering

**Must** place both traveler-interest matches and representative famous landmarks or defining local experiences in the first batch, followed by relevant popular experiences; later batches may broaden toward community-popular, special, seasonal, niche or route-convenient possibilities.

**Must not** sort solely by generic popularity, treat social buzz as proof of fit, or present 10–20 items as an undifferentiated wall.

## Case 18｜Selection-to-arrangement handoff

**Given** the traveler finishes selecting a one-day or multi-day city shelf.

**Must** hand the selected set to arrangement only after the traveler completes the selection round and include lodging, food, reservation and transport context.

**Must not** recompose the itinerary after every individual candidate click. If important lodging or food anchors are unresolved, the arrangement must remain provisional.

## Case 19｜Web Demo batch density

**Given** the discovery shelf is rendered in the Web Demo.

**Must** normally show 3–5 candidates at once, with 2–4 allowed for a compact or already constrained step, while retaining the larger candidate pool in state.

**Must not** force the entire pool into one screen.

## Case 20｜Conversational AI progressive disclosure

**Given** the capability pack is running in a conversational AI and the pool contains more than ten relevant candidates.

**Must** show roughly 7–10 candidates in the first batch, expose a shelf-level `load_more` choice, and avoid repeating shown or rejected candidates.

**Must not** make the traveler read the full pool before they can act.

## Case 21｜Load-more broadening

**Given** the traveler requests more after seeing the first batch.

**Must** broaden toward relevant community recommendations, online-popular discoveries, niche options, seasonal/special items or route-convenient possibilities while preserving personal fit and evidence boundaries.

**Must not** imply that an item is better merely because it is popular online.
