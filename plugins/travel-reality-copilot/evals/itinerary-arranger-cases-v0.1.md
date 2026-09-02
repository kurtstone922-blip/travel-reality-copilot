# Itinerary Arranger Skill｜Behavior Cases V0.1

## Case 1｜Multi-day city selection completed

**Given** the traveler finishes selecting places for three days in one city.

**Must** first propose a cross-day distribution based on anchors, geography, usable windows and pace, then wait for review.

**Must not** immediately publish a polished three-day final itinerary.

**Given** the traveler instead selects one-pass baseline mode.

**Must** generate the requested scope with conservative density and internal reasonableness checks before display.

## Case 2｜One-day city block

**Must** arrange the selected set into a proposed day sequence from the applicable start anchor to end anchor and then hand it to validation.

## Case 3｜Hotel not decided

**Must** ask whether to decide lodging now or continue with a visible temporary area assumption. If the traveler postpones, mark affected days provisional and record a reflow trigger.

**Must not** invent or silently select a hotel.

## Case 4｜Hotel already selected

**Must** use it as the working start/end anchor for affected days.

**Must not** reopen hotel recommendations unless requested.

## Case 5｜Must-eat restaurant

**Must** treat it as a route-shaping or fixed anchor according to its reservation status and arrange other items around it.

**Must not** treat it as an interchangeable meal stop.

## Case 6｜Food undecided

**Must** preserve a flexible meal window or useful area when needed.

**Must not** force restaurant discovery before all arrangement can proceed.

## Case 7｜Fixed reservation creates backtracking

**Must** preserve the fixed anchor, show the resulting trade-off and send the route for validation.

**Must not** silently reorder or remove the reservation to create a cleaner route.

## Case 8｜More selected items than likely capacity

**Must** preserve all selections in the proposal context, distinguish priorities and offer traveler-controlled options such as moving, making optional or leaving the dense structure for validation.

**Must not** silently discard lower-priority items.

## Case 9｜Optional-fill item

**Must** place it last or in a genuinely flexible window and mark it safe to skip.

## Case 10｜No route tool

**Must** use approximate geographic reasoning, disclose the limitation and avoid exact timing claims.

**Must not** call the draft optimized or feasible.

## Case 11｜No manufactured alternatives

**Given** the traveler has already selected the hotel and places.

**Must** provide one recommended arrangement and show alternatives only for a real local conflict or material trade-off.

**Must not** manufacture two or three whole-city arrangements merely to provide variety.

## Case 12｜Day-by-day participation

**Must** refine and confirm one day at a time after the city-block distribution is accepted.

**Must not** require the traveler to review every detailed day in one response.

## Case 13｜Validation handoff

**Must** send the accepted daily draft to Route Validator before asking for final day confirmation.

**Must not** self-certify current opening, last service or route feasibility.

## Case 14｜Traveler rejects validator's optimization

**Must** preserve the current arrangement and record the accepted trade-off or unresolved issue according to the traveler's decision.

## Case 15｜Hotel changes after two days are confirmed

**Must** identify only days affected by the changed lodging anchor, mark them for reflow and preserve unrelated confirmed days.

## Case 16｜Return to discovery

**Given** the traveler decides the city block lacks enough desired items.

**Must** hand the open scope back to Place Discovery without losing existing selections or assignments.

## Case 17｜Intentionally open time

**Must** retain an open window when the traveler wants flexibility.

**Must not** interpret empty time as permission to add attractions.

## Case 18｜Block confirmation

**Must** request final city/stay-block confirmation after all intended days have individually passed validation and traveler confirmation.

**Must not** move to the next city merely because a draft exists.

## Case 19｜Generation-mode choice

**Must** show `day_by_day` first with a recommended label and also offer `one_pass_baseline`.

**Must not** enter either mode without traveler choice.

## Case 20｜Pre-arrangement anchor check

**Must** check booked/selected hotels, split-stay nights, must-eat/booked restaurants and fixed transport before either generation mode.

**Must not** ask for restaurant details beyond name, date, reservation time and address when those are sufficient for arrangement.

## Case 21｜Postponed lodging and dining

**Must** keep route-compatible candidates collapsed while visibly stating the working lodging area and meal area/window assumptions.

**Given** the traveler later accepts a compatible candidate, **must** avoid whole-trip reflow and perform only the necessary local anchor check.

## Case 22｜One-pass baseline responsibility

**Must** control Agent-suggested density and avoid knowingly presenting an overloaded itinerary.

**Given** the traveler later adds a conflicting activity, **must** show a scoped revision and validate only affected dates.

## Case 23｜User-selected overload

**Must** preserve all selected items and offer high-intensity, main-plus-optional, move-date, add-day or traveler-selected removal choices.

**Must not** silently delete traveler-selected content.

## Case 24｜Conditional window

**Must** show the latest suggested departure from the preceding place and the threshold needed to protect the next anchor.

**Must** mark the threshold estimated/unverified when route evidence is unavailable.

## Case 25｜Plan B remains opt-in

**Given** a Day by Day itinerary is tight, **must** offer Plan B without generating it automatically.

**Given** the traveler requests Plan B, **must** preserve the baseline, default to simulation from the first item, allow a custom trigger node/time and propagate only through the remaining day.

**Must not** recursively generate Plan C or apply a resolution without traveler choice.

## Case 26｜One-pass does not expand Plan B

**Must** omit Plan B from the initial one-pass baseline while allowing later affected dates to enter Day by Day editing.

## Case 27｜Route links and timetable truth

**Must** provide native map, whole-day link, split link or per-leg Google Maps/Amap fallback according to host capability.

**Must not** populate a recommended or next departure without a real timetable source, or treat a map link as schedule verification.

## Case 28｜Afternoon arrival

**Must** ask whether the traveler wants same-day sightseeing and derive usable time from arrival processing and onward travel.

**Must not** automatically consume the arrival date as a full sightseeing day.

## Case 29｜Flight departure buffer

**Must** calculate airport access separately from the default airport-arrival target: three hours for international/border-processing flights and two hours for domestic/simplified-regional flights, unless official guidance overrides it.

## Case 30｜Rail and ferry boundary

**Must** use operator-aware reporting and station/terminal buffers for intercity rail, special trains and ferries.

**Must not** apply airport buffer rules to urban transit.

## Case 31｜Automatic validation on day confirmation

**Given** the traveler confirms a Day by Day draft, **must** invoke Route Validator automatically before final day confirmation.

**Must not** require a second validation opt-in.
