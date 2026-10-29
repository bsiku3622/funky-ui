# Color

funky-ui의 색이 어디서 나와서 어떤 규칙으로 화면에 닿는지 정리한 문서입니다. 값의 정본은 `tokens/palette.ts` 한 파일이고, 나머지는 거기서 고르기만 합니다.

```
palette.ts (hex)  →  color.ts (역할)  →  color-recipes.ts (variant 규칙)  →  styles/*.css.ts (class)
```

런타임에 색을 계산하지 않습니다. 사다리의 글자 칸은 OKLCH 명도를 내려 대비 목표를 맞추는 규칙으로 뽑았지만, 그 계산은 빌드 전에 끝냈고 결과 hex를 그대로 적었습니다. 그래서 값을 손으로 고쳐도 되고, 고친 뒤에는 Playground › Foundations › Color의 대비 배지가 목표를 지키는지 확인합니다.

## 면 · 잉크 · 선

흑백 면에는 "회색" 대신 자리의 이름을 붙였습니다. 같은 회색이라도 어디에 깔리느냐에 따라 뜻이 다르기 때문입니다.

| 역할 | 값 | 쓰는 곳 |
| --- | --- | --- |
| `surface.canvas` | `#fff5d1` | 페이지 바탕 (크림) |
| `surface.raised` | `#ffffff` | 카드 · 컨트롤 · 입력 칸 |
| `surface.sunken` | `#fff0b8` | 크림 위의 오목한 자리 |
| `surface.well` | `rgba(0,0,0,.05)` | 흰 면 안의 오목한 자리 — 표 머리 · 막대 홈 |
| `surface.inverse` | `#000000` | 반전 면 — 선택 · 시간표 머리 |

글자는 `#222`, 선은 `#000`입니다. 굵은 선은 완전한 검정일 때만 제대로 섭니다.

| 역할 | 값 | 크림 위 대비 | 쓰는 곳 |
| --- | --- | --- | --- |
| `ink.primary` | `#222222` | 14.6 | 본문 |
| `ink.secondary` | `#4d4d4d` | 8.3 | 보조 글 |
| `ink.muted` | `#6f6f6f` | 4.6 | 약한 글자 — AA를 지키는 가장 옅은 회색 |
| `ink.faint` | `rgba(0,0,0,.3)` | 미달 | placeholder · 장식 전용. 필수 정보에 쓰지 않습니다 |
| `line.base` | `#000000` | | 모든 카드 · 버튼의 2px |
| `line.soft` | `#cccccc` | | Muted · Hairline의 쉬는 테두리 |
| `line.subtle` | `rgba(0,0,0,.1)` | | 카드 안 구분선 |

class-explorer는 약한 글자를 `text-black/40`(흰 면 위 2.85:1)로 써 왔습니다. 이제 그 자리는 `ink.muted`이고 한 단 진해집니다.

## Accent

accent는 아홉입니다. 검정이 시스템 기본이고, 다섯에는 역할 별칭이 붙어 있습니다. 별칭은 같은 색을 뜻으로 부르는 이름일 뿐이라 `accent="primary"`와 `accent="pink"`는 같은 결과입니다.

| accent | 별칭 | solid |
| --- | --- | --- |
| `black` | `system` | `#000000` |
| `pink` | `primary` | `#ff4eba` |
| `purple` | `secondary` | `#7828c8` |
| `cyan` | | `#3decfd` |
| `yellow` | | `#ffd500` |
| `orange` | | `#ff9100` |
| `sky` | | `#00c8ff` |
| `green` | `success` | `#00c22a` |
| `red` | `error` | `#ff3b3b` |

### 사다리

accent 하나는 다섯 칸을 갖습니다. 칸마다 하는 일과 값을 고른 규칙이 정해져 있습니다.

| 칸 | 하는 일 | 규칙 |
| --- | --- | --- |
| `ink` | Solid 면 위 글자 | 검정(#222)과 흰색 중 대비가 높은 쪽 (WCAG) |
| `solidInk` | 진한 글자 | 크림 위 7:1 이상, 그리고 `softInk` 대비의 1.5배 이상 |
| `solid` | 진한 면 · 테두리 | 네온 원색 그대로 |
| `soft` | 연한 면 · 테두리 | 흰 면 대비 1.35가 되도록 원색을 흰색에 섞음 |
| `softInk` | 연한 글자 | 크림 위 AA(4.5:1)를 넘는 가장 밝은 단계 |

`ink`를 WCAG로 고르면 흰 글자를 받는 accent는 보라와 검정뿐입니다. 핑크와 빨강은 흰 글자가 각각 2.98:1, 3.53:1이라 검정 글자를 받습니다. class-explorer의 "드랍" 버튼처럼 핑크 위 흰 글자였던 자리는 검정 글자로 바뀝니다.

`soft`를 일정 비율로 섞지 않은 이유는 밝은 네온 때문입니다. 시안과 노랑을 30%로 섞으면 흰 면과의 대비가 1.05라 테두리로 쓰면 보이지 않습니다. 그래서 흰 면 대비가 같아지는 비율로 섞어, 어떤 accent의 Hairline이든 같은 무게로 보이게 했습니다.

보라는 원색 자체가 크림 위 6.55:1이라 `softInk`가 원색과 같습니다. `solidInk`를 같은 7:1 규칙으로 고르면 둘이 거의 같아져 Ghost의 hover(진한 글자 → 연한 글자)가 보이지 않습니다. "`softInk` 대비의 1.5배 이상" 이라는 두 번째 조건은 그래서 붙었고, 보라의 `solidInk`는 9.89:1의 `#5b009f`입니다.

전체 값과 대비는 Playground › Foundations › Color의 사다리 표에 있습니다.

## Variant

variant는 같은 accent를 어디에, 얼마나 진하게 칠하는지를 정합니다. 열한 개이고, 규칙은 `tokens/color-recipes.ts`에 사다리 칸 이름으로만 적혀 있습니다. 숫자도 hex도 없어서 accent를 바꾸면 규칙은 그대로 둔 채 색만 바뀝니다.

| # | variant | FG | BG | Border | Hover |
| --- | --- | --- | --- | --- | --- |
| 1 | `filled` | ink | solid | solid | 흰 층 |
| 2 | `outline` | solidInk | — | solid | accent 층 |
| 3 | `hairline` | solidInk | — | soft | 테두리 → solid |
| 4 | `frameline` | black | — | solid | accent 층 |
| 5 | `framelineMuted` | gray | — | solid | accent 층 |
| 6 | `plain` | solidInk | soft | solid | 회색 층 |
| 7 | `solid` | ink | solid | line | 흰 층 |
| 8 | `solidMuted` | black | soft | line | 회색 층 |
| 9 | `muted` | softInk | — | soft | 테두리 → solid, 글자 → solidInk |
| 10 | `ghost` | solidInk | — | — | 글자 → softInk |
| 11 | `ghostMuted` | softInk | — | — | 글자 → solidInk |

`black` · `gray` · `line`은 accent와 무관한 시스템 값입니다(본문 잉크 #222, 약한 글자 #6f6f6f, 2px 검정 선). `—`는 투명입니다. 면이 투명한 variant는 바탕이 비치므로, 흰 카드 위에서는 흰색으로, 크림 페이지 위에서는 크림으로 보입니다.

표의 출처는 재원님의 Accent × Variant 스케치이고, 이름 둘을 바꾸고 두 군데에 해석을 더했습니다.

- **이름** — 스케치의 Solid(면과 같은 색 테두리)는 `filled`, Tonal(면 + 검정 테두리)은 `solid`, TonalMuted는 `solidMuted`라 부릅니다. 면을 채우기만 한 것이 filled이고, 거기에 검정 테두리를 두른 것이 이 시스템의 기본 solid 버튼입니다.

- **filled의 테두리 `-`는 "면과 같은 색"** 으로 읽었습니다. class-explorer의 선택된 "유지" 버튼이 `bg-retro-green border-retro-green` 이었고, 그래서 filled는 검정 테두리 없는 색 블록입니다.
- **solid의 글자는 `ink`** 입니다. 표에는 Black이라 적혀 있는데, 밝은 accent에서는 ink가 곧 검정이라 결과가 같습니다. 보라처럼 ink가 흰색인 accent에서는 검정 글자가 2.2:1로 읽히지 않아 흰색으로 둡니다. 테두리의 Ink는 선이므로 `line`(#000)입니다. 결과적으로 solid = filled 면 + 검정 테두리이고, class-explorer에서 가장 흔한 "네온 면 + 검정 테두리 + 검정 글자" 버튼이 여기에 들어옵니다.

### Paint — 레시피를 쓰는 primitive

이 표는 [Paint](../primitives/README.md#paint) primitive가 그대로 씁니다. `<Paint accent variant>`가 레시피를 글자 · 면 · 테두리로 칠하고, `hoverable`을 주면 표의 Hover 칸대로 hover · 누르는 중에 색이 바뀝니다 — Pressable 없이도 동작합니다. 그림자 속으로 가라앉는 몸짓은 색이 아니라 누름([Pressable](../primitives/README.md#pressable))의 몫이라, Button은 Pressable에 이 칠을 얹은 것입니다. Badge · Notice · 바(상단 바 · 머리 막대)도 전부 Paint 위에 섭니다. 흑백 박스(카드 · 패널 · 모달 판)는 [Surface](../primitives/README.md#surface)가 칠하고, 거기에는 accent가 없습니다 — 박스는 흑백, 색은 요소입니다.

### 선택

선택은 따로 된 variant가 아니라 상태입니다. `selected`를 주면 같은 accent의 `filled`로 칠해지고 `aria-pressed`가 붙습니다. 그래서 안 골린 칸은 `muted`, 골린 칸은 검정 블록이 되는 class-explorer의 학기 고르기도, 초록 Outline이 초록 블록이 되는 Trade의 "유지"도 같은 규칙입니다. 그림자를 켠 버튼은 골리면 눌린 채로 있습니다 ([Motion](motion.md)).

### accent는 Paint에서 흐릅니다

accent는 CSS 변수라 아래로 흐르고, 그 변수를 정하는 것은 그 색으로 칠해지는 요소뿐입니다 — primitive에서는 Paint 하나, 위 층에서는 Paint를 쓰는 컴포넌트(Button · Badge · Notice · 바)와 Variant 없이 자기 색을 칠하는 컴포넌트(Link · Stat · Meter)입니다. 컨트롤에 accent를 주지 않으면 가장 가까운 바깥 Paint의 accent를 쓰고, 바깥에도 없으면 검정입니다. Box · Surface · Card · Stack처럼 색을 모르는 박스는 이 흐름을 끊지도 바꾸지도 않습니다.

드랍한 과목 줄 안의 버튼이 줄의 색을 따르는 식입니다.

```tsx
<Paint accent="pink" variant="plain" padding="lg">
  <Button variant="outline">유지</Button>
  <Button variant="outline">이동</Button>
</Paint>
```

흑백 카드 안의 컨트롤에 색을 주려면 컨트롤마다 `accent`를 줍니다. 카드 같은 칠하지 않는 박스가 accent를 갖지 않는 이유는, 보이지 않는 박스가 안쪽 색을 바꾸면 색이 어디서 왔는지 화면에서 찾을 수 없기 때문입니다. 색은 칠한 요소에서만 생깁니다.

## Interaction

hover와 press는 면을 바꾸지 않고 위에 층을 얹습니다(Paint의 `hoverable`). 밑이 크림이든 흰색이든 색면이든 같은 규칙으로 한 단 바뀝니다.

| 층 | hover | press | 쓰는 variant |
| --- | --- | --- | --- |
| 흰 층 | `rgba(255,255,255,.3)` | `.45` | Filled · Solid |
| 회색 층 | `rgba(0,0,0,.07)` | `.12` | Plain · SolidMuted |
| accent 층 | solid의 15% | 26% | Outline · Frameline · FramelineMuted |

검정 accent의 accent 층은 회색 층과 같은 값입니다(검정 15%는 지나치게 어둡습니다). hover 층이 없는 Hairline · Muted도 누르는 순간에는 accent 층을 얹어 눌렸다는 것을 보입니다.

흑백 면(Surface)의 `hoverable`은 이 표 대신 글자색에서 층을 만듭니다. 글자색의 7%(hover) · 12%(누르는 중)라 흰 면 위에서는 회색 층과 같은 세기이고, 검정 면 위에서는 흰 층이 됩니다. 면 위의 목록 줄은 면 없이(`fill="none"`) 이 층만 얹습니다.

## Focus

포커스는 2px를 2px 띄운 핑크 고리 하나입니다. `:focus-visible`에만 그려서 마우스로 누를 때는 보이지 않고, 키보드로 왔을 때만 보입니다. 전역 스타일시트가 모든 요소에 같은 고리를 겁니다.

## 밝은 네온의 약한 칸

노랑과 시안은 원색 자체가 밝아서 Hairline · Muted처럼 연한 테두리를 쓰는 variant가 약하게 보입니다. 규칙을 고르게 적용한 결과이고, 그 색을 굳이 약하게 써야 하는 자리가 아니면 노랑 · 시안은 Filled · Solid · SolidMuted로 씁니다.
