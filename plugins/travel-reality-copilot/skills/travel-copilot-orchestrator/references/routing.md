# Orchestration Routing V0.1

Use this reference only when more than one domain appears in the same turn or the next owner is unclear.

## Primary-owner matrix

| Traveler outcome | Primary Skill | Supporting checks |
|---|---|---|
| Decide cities, order, roles, days or nights | Route Skeleton | Validator for difficult connections |
| Explore what is worth considering | Place Discovery | Validator only for time/date feasibility |
| Decide where to stay | Stay Strategy | Arranger for route impact; Validator for factual access |
| Decide what/where to eat | Dining Strategy | Arranger for meal placement; Validator for opening/access/route fit |
| Put selected content onto dates and in sequence | Itinerary Arranger | Validator after proposed day or anchor change |
| Determine whether a plan works | Route Validator | Discovery only if traveler asks for replacements/fill |
| Generate a final roadbook | Orchestrator | Validator summaries and unresolved verification queue |

## Tie-break rules

1. Respect an explicit traveler verb: “验证” normally means Validator; “推荐餐厅” means Dining; “排这一天” means Arranger.
2. Prefer the owner of the desired output, not the owner of every input mentioned.
3. If one domain supplies a hard anchor for another, the output owner remains primary and the anchor owner supplies context.
4. If a request requires a traveler choice before useful work can continue, ask that choice instead of invoking downstream Skills speculatively.
5. If a structural route change affects several modules, Route Skeleton leads the impact review; downstream Skills patch only after the structural decision.

## Common combined intents

### Restaurant plus route feasibility

Primary: Dining Strategy. Supporting: Route Validator. Return only candidates that fit the stated window, plus a visible uncertainty when travel/opening data is unverified.

### Hotel plus daily optimization

Primary: Stay Strategy when choosing the hotel; primary: Itinerary Arranger when the hotel is already chosen and the traveler asks to reorder days. Validator checks only affected dates.

### Add a newly discovered place

Primary: Place Discovery while comparing or selecting it. Once selected, Arrangement proposes placement. Validator checks the affected day. Do not treat discovery as automatic insertion.

### Too many places in a day

Primary: Route Validator when the traveler asks whether it fits. Primary: Itinerary Arranger when the traveler already accepts the risk and asks for the best sequence. Preserve must-do items and expose optional/conditional items.

### City-day compression

Route Skeleton leads. It identifies affected city blocks, reservations, lodging nights and connections. Itinerary Arranger produces the compressed distribution only after the traveler confirms the structural change.

## One visible question

Several Skills may identify missing information, but ask the traveler only the highest-impact question for the current objective. Defer lower-impact questions until their answers can change the next result.
