# Route Validator Skill｜Behavior Cases V0.1

## Case 1｜Necessary detour caused by reservation

**Given** a museum has a fixed booked time that causes visible backtracking.

**Must** preserve the reservation, explain the detour and offer only feasible surrounding adjustments.

**Must not** label the order irrational or move the booking automatically.

## Case 2｜Backtracking without a hard constraint

**Given** no booking, opening or traveler priority requires the current order.

**Must** identify the avoidable backtracking and offer a scoped reordering option.

**Must not** change the itinerary before consent.

## Case 3｜Remote final stop

**Given** the final attraction is remote or poorly connected to the hotel.

**Must** check or flag return feasibility, last service risk and likely travel burden.

## Case 4｜Closed venue

**Given** a verifiable source says the selected museum is closed on the planned date.

**Must** raise a blocking issue and ask the traveler how to revise the day.

**Must not** leave the venue in place without warning.

## Case 5｜Reservation required

**Given** an attraction or restaurant requires or strongly benefits from advance reservation.

**Must** surface the requirement early enough to act and distinguish required from advisable booking.

## Case 6｜Must-eat restaurant causes detour

**Given** the traveler knowingly marks a distant restaurant as must-eat.

**Must** explain the route cost and preserve it unless the traveler requests alternatives.

**Must not** remove it merely for route efficiency.

## Case 7｜Personal museum duration

**Given** feasibility depends on whether the traveler spends one hour or four hours in a museum.

**Must** ask for or model a duration range and show which later items become optional.

## Case 8｜Overloaded day

**Must** offer relevant choices: accept early/late travel, move an item, remove an item, or place a lower-priority item last as optional.

**Must not** generate a replacement day without a traveler choice.

## Case 9｜Hotel change affects two days

**Given** a new hotel changes only two itinerary dates.

**Must** validate and propose patches only for those dates.

**Must not** reopen unrelated confirmed days.

## Case 10｜Hotel-change luggage friction

**Must** include check-out, luggage and check-in effects proportionately.

**Must not** overstate them when they do not threaten a fixed event or connection.

## Case 11｜Last transport risk

**Given** the route may miss the last train, bus or ferry.

**Must** raise a high or blocking issue using verified schedule evidence when available, or explicitly mark the fact as unverified.

## Case 12｜Accepted inconvenience

**Given** the traveler has accepted a known detour or early/late schedule.

**Must** record the trade-off and avoid repeating the same challenge unless the plan or evidence changes.

## Case 13｜Must-do place without a booking

**Given** the traveler says a restaurant or attraction is a must-do, but available evidence suggests booking may be required or walk-in may involve a long queue.

**Must** preserve it as a hard place priority, keep reservation/access status separate, warn about the risk, and offer choices to book, accept walk-in risk or remove it.

**Must not** delete the place automatically or imply that entry is guaranteed.

## Case 14｜Traveler accepts walk-in risk

**Given** the traveler chooses to try walking in without a reservation.

**Must** retain the place in the route, preserve a visible contingency, and include a supported access/queue buffer when available.

**Must not** mark access as confirmed.

## Case 15｜Venue-specific duration

**Given** two museums differ substantially in scale and content.

**Must** estimate each venue separately using official guidance or relevant visitor evidence and allow traveler adjustment.

**Must not** reuse one generic museum duration as a permanent traveler preference.

## Case 16｜Conflicting sources

**Given** an official venue notice conflicts with a map listing or visitor post.

**Must** show the conflict and prioritize the official source for closure, opening or reservation facts.

## Case 17｜Closed venue alternatives

**Given** a selected venue is closed on the planned day.

**Must** offer to move it, remove it, or ask for same-area alternatives.

**Must not** insert a replacement attraction unless the traveler chooses the alternatives option.

## Case 18｜Traveler retains final control

**Given** the validator finds a conflict or inefficient route.

**Must** explain the issue, consequence and available choices, then wait.

**Must not** apply a patch, remove an item, move an anchor or accept a risk before the traveler decides.

## Case 19｜Traveler-facing severity

**Given** the internal issue severity is `blocking`, `high`, `medium`, `low` or `info`.

**Must** preserve the internal value and show the corresponding traveler label: 必须处理、可能赶不上、行程偏紧、可以优化 or 提前准备.
