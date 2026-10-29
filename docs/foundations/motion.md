# Motion

funky-ui의 움직임 — 시간, 곡선, 누름의 거리 — 을 정리한 문서입니다. 숫자의 정본은 `tokens/motion.ts`입니다.

## 눌림

시그니처는 눌림입니다. 떠 있는 물건이 hover 때 그림자 자리로 가라앉습니다 — 본체가 오른쪽 아래로 4px 움직이고 그림자는 0이 됩니다. 누르는 순간에는 한 번 더 작아집니다 — 컨트롤 · 배지는 0.96, 카드 같은 큰 면은 0.98입니다(0.96이면 400px 카드가 16px이나 줄어듭니다). 이 크기는 변수 `--fk-press-scale` 하나이고, 큰 면은 자기 class에서 덮습니다.

가라앉는 거리는 그림자 거리와 같아야 합니다. 다르면 그림자가 본체 뒤로 비져 나오므로, 거리는 `PRESS.sink = ELEVATION.raised.offset`으로 묶여 있습니다. Motion이 Layout을 읽는 유일한 자리입니다.

그림자를 켜지 않은 컨트롤은 가라앉지 않고 층(색)만 바뀌며, 누르는 순간만 작아집니다(`tap`). 테두리가 없는 Ghost는 가라앉을 상자가 없어서 그림자를 받지 않고 언제나 `tap`입니다.

선택된 컨트롤은 **눌린 채로** 있습니다(`pressed`). 그림자를 켠 버튼이 골리면 가라앉은 자리에 그대로 머물러, 무엇이 골라져 있는지를 모양으로도 말합니다.

몸짓은 [Pressable](../primitives/README.md#pressable) 하나가 맡습니다 — `press`(가라앉음) · `lift`(떠오름) · `tap`(작아짐만) 셋과, `press`가 눌린 채 머무는 `pressed`입니다. hover 때 바뀌는 층(색)은 칠([Paint](../primitives/README.md#paint)의 `hoverable`)이라 몸짓과 따로 섭니다. Button은 `shadow`로 몸짓을 고릅니다 — 켜면 `press`, 끄면 `tap`입니다.

## 떠오름

탐색 카드처럼 큰 면은 가라앉는 대신 떠오를 수 있습니다(`motion="lift"`). hover 때 4px 위로 뜨고, 그림자는 화면에 그대로 남아 길어집니다. 사람 카드처럼 눌러서 들어가는 면은 `press`, 훑어보다 고르는 면은 `lift`입니다.

```tsx
<Card motion="lift" as={Link} to="/trade">…</Card>
```

## 시간 · 곡선

| 이름 | 값 | 쓰는 곳 |
| --- | --- | --- |
| `fast` | 100ms | 눌림 · 색 바뀜 (class-explorer의 duration-100) |
| `base` | 200ms | 펼침 · 나타남 |
| `slow` | 300ms | 막대 길이 |
| `crawl` | 700ms | 시간선 위 캐럿처럼 연속으로 움직이는 위치 전용 |
| `standard` | `cubic-bezier(0.2, 0, 0, 1)` | 기본 곡선 |
| `out` | `cubic-bezier(0, 0, 0.2, 1)` | 나타남 |

`transition: all`은 쓰지 않습니다. 폭이 바뀌는 컨트롤에서 글자가 상자 밖으로 비져 나오는 원인이라, 컴포넌트마다 움직이는 속성을 적습니다.

## 움직임을 줄인 사람에게

`prefers-reduced-motion: reduce`에서는 이동과 애니메이션을 멈추고, 색 바뀜과 포커스 링만 남깁니다.
