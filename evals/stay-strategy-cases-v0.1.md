# Stay Strategy Skill｜Behavior Cases V0.1

These cases test decisions and state effects, not exact wording. A result passes when every required behavior is present and no prohibited behavior occurs.

## Case 1｜No lodging concept

**Given** the traveler will stay four nights in Tokyo, has selected itinerary points, and has no preferred area or hotel.

**When** the traveler asks for lodging help.

**Must** recommend 2–3 areas with itinerary/transport reasons and trade-offs, then stop for the traveler to choose.

**Must not** immediately generate five concrete hotels or the complete Tokyo itinerary.

## Case 2｜Area selected

**Given** the traveler chooses Ueno after area discovery.

**When** the Skill recommends hotels.

**Must** return up to three strongest matches and two nearby alternatives within the chosen Ueno area or its practical within-area station/itinerary catchment.

**Must not** recommend hotels in Shinjuku, Ginza or another unchosen area.

## Case 3｜Explicit free recommendation

**Given** no area has been selected.

**When** the traveler explicitly says, “You choose suitable hotels based on my itinerary; they do not have to be in one area.”

**Must** allow candidates across several convenient areas and explain how every area's location relates to itinerary points, transport and traveler preferences.

**Must not** present the geographic spread without trade-offs.

## Case 4｜Traveler already chose a hotel

**Given** the traveler says, “I want to stay at Hotel X.”

**When** the Skill processes the message.

**Must** record Hotel X as `selected`, use it as the working route anchor, and ask whether affected days should be optimized.

**Must not** restart area discovery, ask irrelevant preference questions or recommend replacement hotels.

## Case 5｜Hotel already booked

**Given** the traveler says, “I have already booked Hotel X for these dates.”

**When** the Skill processes the booking.

**Must** mark Hotel X as `locked` for the relevant lodging segment and protect it from automatic replacement.

**Must not** change it unless the traveler explicitly unlocks or replaces it.

## Case 6｜No external search or map capability

**Given** the host has no map or web-search capability.

**When** the traveler asks for concrete hotel recommendations.

**Must** provide only responsibly framed suggestions, label time-sensitive facts as unverified, omit definite live availability/current price/current rating claims, and provide search links when possible.

**Must not** invent a current Google Maps or Booking score.

## Case 7｜Rating sources differ

**Given** available search results show Google Maps 4.4/5 and Booking 8.7/10 for the same hotel.

**When** ratings are displayed.

**Must** retain both source platforms and scales separately.

**Must not** calculate an invented aggregate score.

## Case 8｜Hotel selected after itinerary draft

**Given** several Tokyo days already have a draft route and the traveler selects a hotel.

**When** the hotel becomes the working anchor.

**Must** ask whether to optimize affected days around the new anchor and show the affected scope.

**Must not** reorder the route before consent or reopen unrelated confirmed days.

## Case 9｜Split stay requested

**Given** the traveler stays five nights in Tokyo and says they want two hotels.

**When** the Skill handles the request.

**Must** collect or help assign the nights for each lodging segment, mention luggage/check-in friction, and keep each segment's affected dates explicit.

**Must not** apply both hotels to the same night or encourage extra moves without value.

## Case 10｜Progressive confirmation

**Given** the traveler confirms itinerary days one by one.

**When** all intended days in the Tokyo block are confirmed.

**Must** ask for one final Tokyo city/stay-block confirmation before moving to the next city.

**Must not** treat confirmation of one day as confirmation of all other days.

## Case 11｜Concrete comparison lacks occupancy

**Given** the traveler requests date-specific hotel prices but guest count, room count or basic bed preference is missing and would affect the result.

**When** the Skill prepares the comparison.

**Must** ask only for the missing high-impact occupancy information.

**Must not** restart the full trip intake or ask unrelated preference questions.

## Case 12｜Area-first bypass is not implicit

**Given** the traveler has no area concept and has not requested free recommendation.

**When** the Skill begins lodging planning.

**Must** follow area-first discovery.

**Must not** interpret “recommend somewhere convenient” as permission to scatter concrete hotel choices across the city before the traveler chooses an area.

## Case 13｜Loyalty preference with insufficient same-area options

**Given** the traveler selected one lodging area, values transport convenience, and has an explicit Marriott preference, but the chosen area lacks enough suitable Marriott options.

**When** the Skill prepares five hotel choices.

**Must** keep the three strongest choices focused on the selected area and itinerary convenience, allow up to two Marriott alternatives in nearby areas, label them as cross-area loyalty alternatives, and explain both loyalty value and additional travel burden.

**Must not** describe the cross-area hotels as if they were located in the selected area or let the loyalty exception displace all convenient choices unless Marriott is a hard constraint.
