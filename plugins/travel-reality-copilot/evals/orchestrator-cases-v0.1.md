# Travel Copilot Orchestrator Evaluation Cases V0.1

## 1. Sparse request returns to minimum boundary

Input: “我想去日本。”

Expected:

- does not generate a complete itinerary;
- captures Japan as destination intent;
- asks one compact boundary question or a small grouped set needed to begin;
- routes to Place Discovery or Route Skeleton only after sufficient context.

## 2. Known destination pool preserves user input

Input: “日本 10 天，大阪进福冈出，想去鸟取、出云、广岛和宫岛，不知道顺序。”

Expected:

- primary Skill is Route Skeleton;
- does not treat mention order as confirmed order;
- preserves every named destination;
- proposes a corridor before detailed days;
- waits for route confirmation.

## 3. Generation mode is never inferred

Given a confirmed route skeleton, input: “可以，继续吧。”

Expected:

- asks the traveler to choose Day by Day or one-pass baseline;
- presents Day by Day first and recommended;
- does not generate either mode before the choice.

## 4. Long voice-style input is summarized, not expanded

Input contains dates, cities, two museums, one booked restaurant and an uncertain hotel.

Expected:

- summarizes extracted facts and missing route-shaping information;
- records the booked restaurant separately from inferred dining preferences;
- does not use input length as permission for full-trip generation;
- asks the single highest-impact next question.

## 5. Multi-intent dining and feasibility

Input: “今晚想在这附近吃饭，不知道吃什么；如果行程来不及就不吃。”

Expected:

- primary Skill is Dining Strategy;
- Route Validator acts only as support;
- returns route-compatible options or explains the infeasible window;
- does not expose two separate module questionnaires.

## 6. Selected hotel triggers scoped impact only

Input: “东京改住这家酒店，帮我看看要不要调整行程。”

Expected:

- Stay Strategy owns hotel selection state;
- Itinerary Arranger/Validator inspect only affected Tokyo dates;
- asks before applying a meaningful reflow;
- unrelated confirmed city blocks remain untouched.

## 7. Traveler overload remains traveler-owned

Input: “这五个地方我都想去，来得及就去，来不及最后一个跳过。”

Expected:

- preserves all five items;
- records the final item as optional or conditional rather than deleting it;
- provides a latest-departure threshold when possible;
- warns about unverified timing without making the decision.

## 8. One-pass baseline remains conservative

Input after mode choice: “一次性生成基础版。”

Expected:

- creates one conservative baseline using mature route patterns;
- internally checks reasonableness before display;
- does not intentionally overload the day;
- keeps detailed Plan B off;
- offers scoped day edits afterward.

## 9. Plan B remains opt-in

Input: “如果第一站逛久了，后面怎么办？”

Expected:

- routes to Itinerary Arranger supported by Validator;
- offers or generates Plan B because the traveler requested it;
- starts at the first item by default but allows another starting node;
- preserves the baseline and identifies the first downstream conflict.

## 10. External reservation state is not fabricated

Input: “把第三天已预约的餐厅移到第二天。”

Expected:

- can patch intended itinerary placement after confirmation;
- marks external status as `reschedule_intended` or unknown;
- tells the traveler they must change the external reservation;
- never claims the restaurant booking was changed.

## 11. Side question resumes day confirmation

Given Day 4 is waiting for confirmation, input: “晚餐时间如果不确定怎么办？”

Expected:

- answers the dining-time question first;
- states whether the answer changes Day 4;
- preserves or revises the pending Day 4 confirmation;
- ends by restoring the Day 4 action choices.

## 12. Partial answer does not skip lodging

The Agent asks about flight, luggage, lodging and dining; the traveler answers only flight and luggage.

Expected:

- records the answered fields;
- keeps lodging and dining visibly unanswered;
- may continue only with a reversible stated assumption;
- resurfaces lodging before the city block becomes route-shaped.

## 13. One decision topic may contain related questions

Input begins lodging preparation for a five-night Tokyo block.

Expected:

- may ask 2–4 numbered lodging questions in one turn;
- does not mix unrelated Plan B or export questions;
- explains that partial, lettered or natural-language answers are accepted.

## 14. Completed itinerary does not silently terminate

Given every day is confirmed, input: “了解。”

Expected:

- does not end with a farewell alone;
- offers roadbook/export, final validation, scoped revision, save/pause or explicit finish;
- ends only after the traveler selects an ending action.
