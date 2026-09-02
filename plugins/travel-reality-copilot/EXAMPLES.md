# Example conversations

These examples show interaction shape, not guaranteed wording.

## 1｜Known cities, uncertain route

**Traveler**

> 日本 10 天，大阪进、福冈出。想去鸟取、出云、广岛和宫岛，但不知道怎么排序。

**Expected Agent behavior**

- retain every named place;
- do not assume mention order;
- propose one coherent entry-to-exit corridor;
- explain meaningful transfer trade-offs;
- stop for route confirmation before allocating detailed days.

## 2｜Choose the generation mode

After route corridor and day allocation are confirmed:

**Agent**

> 接下来你想怎样完成每天的安排？
>
> 1. 逐日完成（推荐）：每次确认一个城市段或一天，可以逐步加入住宿、餐饮和交通。
> 2. 一次性生成基础版：先看完整但较轻的版本，之后再修改某一天。

The Agent must not select a mode from “继续吧”.

## 3｜Discover a city without an option wall

**Traveler**

> 东京三天，我只知道想去美术馆，也想看看这个城市还有什么值得做。

**Expected Agent behavior**

- ask what sparked the interest when still unclear;
- begin with approximately 7–10 conversational candidates, not 20 at once;
- include interest matches and representative city landmarks;
- offer “继续加载” for the next non-repeating batch;
- do not schedule candidates before the traveler selects them.

## 4｜Hotel before itinerary

**Traveler**

> 东京已经订了酒店，就住在新宿。按照这里作为每天起点帮我排。

**Expected Agent behavior**

- record the hotel as a locked lodging anchor if the traveler confirms it is booked;
- skip area and alternative-hotel recommendations;
- arrange affected Tokyo days from and back to that anchor;
- keep rating, price and availability separate from the traveler's booking statement.

## 5｜Hotel after itinerary

**Traveler**

> 酒店还没选，先看行程，之后住哪里方便就推荐哪里。

**Expected Agent behavior**

- use a visible temporary area assumption;
- arrange provisionally;
- later recommend route-compatible areas/hotels;
- avoid full reflow when the selected hotel fits the working assumption;
- request confirmation before meaningful affected-day reflow.

## 6｜Dining plus route feasibility

**Traveler**

> 今天晚上想在附近吃饭，但不知道吃什么。如果行程来不及就不安排。

**Expected Agent behavior**

- Dining Strategy is primary;
- Route Validator checks the remaining window;
- return a small number of route-compatible options;
- if the window is not feasible, explain why and preserve “不安排” as a valid choice;
- do not run two separate questionnaires.

## 7｜Overloaded day without silent deletion

**Traveler**

> 这五个地方我都想去，最后一个来得及就去，来不及就算了。

**Expected Agent behavior**

- preserve all five places;
- mark the last one `conditional_window` or `end_of_day_optional`;
- show the latest useful departure threshold when data supports it;
- warn about uncertainty;
- never silently delete a must-do item.

## 8｜Plan B from a chosen point

**Traveler**

> 如果上午的博物馆逛久了，后面怎么办？从这个博物馆开始给我 Plan B。

**Expected Agent behavior**

- preserve the baseline itinerary;
- propagate the delay from the specified node only;
- show the first downstream conflict;
- explain which later item becomes compressed, optional or impossible;
- leave the final trade-off to the traveler.

## 9｜External reservation separation

**Traveler**

> 把第三天预约的餐厅挪到第二天。

**Expected Agent behavior**

- update intended itinerary placement only after confirmation;
- mark the reservation change as intended or externally unresolved;
- remind the traveler to change the actual booking;
- never claim the restaurant accepted the new date.
