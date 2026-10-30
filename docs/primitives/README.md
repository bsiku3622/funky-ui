# Primitives

Primitives는 모양이 없는 바탕입니다. 요소 · 글자 · 아이콘 · 접근성 도구 · 칠 · 누름 · 골라짐 · 띄우기 · 배치 열네 개가 여기 있고, 토큰과 스타일(`tokens/` · `styles/`)만 읽습니다. Atoms부터 Components까지 모든 층이 이 열네 개 위에 섭니다.

열네 개는 두 단으로 나뉩니다.

| 단 | 묶음 | 컴포넌트 | 맡는 일 |
| --- | --- | --- | --- |
| 1차 — 바탕 | element | Box | 태그 · ref · 여백 |
| 1차 — 바탕 | content | Text · Icon | 글자 · 아이콘 |
| 1차 — 바탕 | a11y | VisuallyHidden · Portal | 귀로 듣는 이름 · 그리는 자리 |
| 2차 — Box + 능력 하나 | paint | Surface · Paint · Glass | 칠 — 박스는 자리의 면(흑백과 뼈대의 보라), 요소는 accent × variant, 색 바 위는 유리(모두 hover 색까지) |
| 2차 — Box + 능력 하나 | press | Pressable | 누름 — 버튼의 의미 · 커서 · 꺼진 모양 · 몸짓(색은 없음) |
| 2차 — Box + 능력 하나 | select | Selectable | 골라짐 — 골라졌다는 알림(aria 하나) · 골라진 칸의 모양(색은 없음) |
| 2차 — Box + 능력 하나 | float | Floating | 띄우기 — 기준 요소 옆에 붙이기 · 층 · 닫자고 알리기 · 포커스 · 등장 |
| 2차 — Box + 능력 하나 | layout | Stack · Inline · Grid | 배치 |

1차는 서로 기대지 않습니다. 2차는 모두 [Box](#box)의 prop(태그 · 여백)을 그대로 받고 능력을 하나만 더하며, 2차끼리도 서로 기대지 않습니다. 둘 이상이 필요하면 위 층이 묶습니다 — Button은 Pressable(누름) · Selectable(골라짐)에 Paint(칠)를, 누르는 Card는 Pressable에 Surface(면)를, NavButton은 Pressable · Selectable에 Glass(유리)를, Menu는 Floating(띄우기)에 Surface와 고르는 무리(`useSelectableGroup`)를 얹은 것입니다.

묶을 때 모양은 class로, 의미는 훅으로 가져갑니다. class 문자열에는 `type`이나 `aria-checked` 같은 속성이 실리지 않기 때문입니다. 그래서 2차 primitive는 prop을 class 문자열로 바꾸는 함수(`surfaceClass` · `paintClass` · `glassClass` · `pressClass`)와, 의미를 props로 돌려주는 훅(`usePressable` · `useSelectable` · `useSelectableGroup`)을 같이 내놓습니다.

**primitive 중 accent를 갖는 것은 Paint뿐입니다.** Paint에 준 accent는 그 요소를 칠하고, 안쪽 요소가 accent를 따로 주지 않으면 그 색으로 흐릅니다. Box · Surface · 배치 primitive는 색을 모르므로 이 흐름을 끊지도 바꾸지도 않습니다. 바깥에 Paint가 없으면 검정(시스템)입니다. 위 층에서도 accent는 그 색으로 칠해지는 컴포넌트(Button · Badge · Link · Stat …)만 받고, Card처럼 칠하지 않는 박스는 받지 않습니다.

요소를 그리는 컴포넌트는 `as`로 렌더할 태그를 바꾸고, 나머지 props는 그 태그로 그대로 넘깁니다. 같은 이름의 HTML 속성이 있으면 컴포넌트의 prop이 우선하고, React 19라 `ref`도 일반 prop입니다. 예시는 import를 생략합니다. 컴포넌트는 `@studio-baeks/funky-ui`에서, 아이콘은 `lucide-react`에서 가져온 것이고, `navigate`나 `subjects`처럼 앱이 가진 값은 이미 있다고 봅니다.

패키지 CSS의 레이어도 이 층을 따릅니다(`fk.base < fk.primitives < fk.components < fk.utilities`). 그래서 위 층 컴포넌트의 CSS는 Surface · Paint · Glass의 칠을 언제나 덮을 수 있습니다 — 모달 머리 막대가 Paint의 filled를 쓰면서 테두리는 아래 한 줄만 남기고, 상단 바가 Surface의 `brand` 면에 아래쪽 테두리와 그림자만 더하는 식입니다.

## 어휘

primitive가 받는 값은 모두 닫힌 집합입니다.

| 어휘 | 값 |
| --- | --- |
| `Accent` | `black` `pink` `purple` `cyan` `yellow` `orange` `sky` `green` `red`, 역할 별칭 `system`(black) · `primary`(pink) · `secondary`(purple) · `success`(green) · `error`(red). 색 규칙은 [Color](../foundations/color.md) |
| `Variant` | `filled` `outline` `hairline` `frameline` `framelineMuted` `plain` `solid` `solidMuted` `muted` `ghost` `ghostMuted` `paper` — 레시피는 [Color](../foundations/color.md#variant) |
| `SurfaceFill` | `none`(면 없음 — 바깥 면이 그대로 보임) · `canvas`(크림 바탕) · `raised`(흰 면) · `sunken`(크림 위 오목한 자리) · `well`(흰 면 안의 오목한 자리, 반투명) · `inverse`(검정) · `brand`(앱 뼈대의 보라 — 상단 바 · 하단 바에만) |
| `Border` | `none` · `line`(검정) · `soft`(연한 회색) · `subtle`(카드 안 구분선 색) |
| `Shadow` | `none` · `raised`(4px) · `floating`(6px) |
| `PressMotion` | `none`(움직이지 않음, 기본) · `sink`(그림자 위에서 가라앉음) · `raise`(평평하다가 그림자가 올라옴) · `lift`(떠오름) · `tap`(그림자 없이 누르는 순간만 작아짐) · `shrink`(그림자를 둔 채 hover 때부터 작아짐 — Ask 단추 전용). 거리와 시간은 [Motion](../foundations/motion.md) |
| `EnterMotion` | `none`(그냥 나타남) · `rise`(아래에서 4px 떠오름 — 메뉴 · 툴팁) · `pop`(8px — 모달) · `fade`(제자리에서 나타남 — 펼친 본문). 거리와 시간은 [Motion](../foundations/motion.md#등장) |
| `Space` | `0` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl` `5xl` `6xl` — 0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64px. 안쪽 여백과 형제 사이 간격이 같은 사다리를 씁니다. [Layout](../foundations/layout.md) |

## Box

1차 primitive, 요소입니다. 태그(`as`) · ref · 안쪽 여백만 다루고, 칠하지 않으며 색도 모릅니다. 여백만 필요한 자리에 그대로 쓰고, 대개는 Box 위에 능력을 하나 얹은 2차 primitive를 씁니다. 아래는 카드 면 안을 여백만 다른 두 칸으로 나눈 예입니다.

```tsx
<Surface border="line">
  <Box padding="xl">이번 학기 시간표를 불러왔습니다</Box>
  <Box paddingX="xl" paddingY="md">7교시 이후 공강</Box>
</Surface>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `padding` | `Space` | — | 사방 안쪽 여백입니다. |
| `paddingX` | `Space` | — | 좌우 안쪽 여백입니다. `padding`의 좌우를 덮어씁니다. |
| `paddingY` | `Space` | — | 위아래 안쪽 여백입니다. `padding`의 위아래를 덮어씁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- Box에는 `accent`가 없습니다. 안쪽 컨트롤이 같은 색을 따라야 하면 바깥 요소를 [Paint](#paint)로 칠하거나, 컨트롤마다 `accent`를 줍니다. 면 없이 글자색만 칠하는 variant는 `ghost`입니다.
- `boxClass(props)`가 같은 prop을 class 문자열로 돌려줍니다. 2차 primitive가 모두 이 지도를 씁니다.

## Text

글자입니다. 태그(`as`)와 생김새(`variant`)를 따로 고릅니다. 아래는 제목 태그에 `heading` 역할을, 보조 줄에 약한 잉크를, 긴 과목명에 말줄임을 준 예입니다.

```tsx
<Text as="h2" variant="heading">시간표</Text>
<Text variant="caption" tone="muted">2026학년도 2학기 · 6과목</Text>
<Text weight="black" truncate>일반물리학 II (영어 강의)</Text>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"span"` | 렌더할 요소입니다. |
| `variant` | `TextVariant` | `"body"` | 글자 역할입니다. 크기 · 줄 높이 · 굵기 · 자간 · 대소문자를 한 번에 고릅니다. `display` `title` `heading` `subheading` `body` `caption` `label` `micro` `overline` `subtitle` 열 개이고, 숫자는 [Typography](../foundations/typography.md)에 있습니다. |
| `weight` | `Weight` | — | `regular` `medium` `bold` `black`. 역할의 기본 굵기를 바꿀 때만 줍니다. |
| `leading` | `Leading` | `"fixed"` | 줄 높이입니다. `fixed`는 역할이 정한 px이고, `relaxed`는 글자 크기의 1.625배입니다. 여러 줄을 읽는 문단에 줍니다. |
| `tone` | `Tone` | — | 글자색입니다. `primary` `secondary` `muted` `faint` `inverse` `inverseMuted` `accent` `accentSoft` `inherit`와 색 이름 `pink` `purple` `cyan` `yellow` `orange` `sky` `green` `red`. `accent`는 가장 가까운 Paint의 진한 글자, `accentSoft`는 연한 글자이고, 바깥에 Paint가 없으면 검정(시스템)의 사다리입니다. 색 이름은 그 색의 진한 글자입니다. |
| `family` | `"sans" \| "mono"` | — | 서체입니다. 코드나 식별자 같은 기술적 자리에만 `mono`를 씁니다. |
| `align` | `"start" \| "center" \| "end"` | — | 글자 정렬입니다. |
| `truncate` | `boolean` | `false` | 한 줄에서 자르고 …을 붙입니다. |
| `numeric` | `boolean` | `false` | 숫자 글리프만 같은 폭으로 맞춥니다(`tabular-nums`). 표와 시각에 씁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `overline`과 `subtitle`은 기본 잉크가 `muted`입니다. 정의 순서가 역할 → 굵기 → 잉크라서 `tone`과 `weight`로 그 기본값을 바꿀 수 있습니다.
- `faint`는 장식 · placeholder · 꺼진 자리 전용입니다. 대비가 AA에 못 미치므로 필수 정보에 쓰지 않습니다.
- 문서 구조는 `as`가, 생김새는 `variant`가 맡습니다. 제목 태그의 크기를 바꾸고 싶으면 태그를 바꾸지 말고 `variant`를 바꿉니다.
- Text는 accent를 읽기만 하고 정하지 않습니다. 안쪽으로 흐르는 색을 정하는 것은 Paint입니다. `tone`의 색 이름은 이 글자 하나의 색이라, 안에 든 요소의 accent를 바꾸지 않습니다. 그래서 `tone="red"`는 목록을 돌며 그리는 콜백 안에서도 씁니다(`useAccent`는 훅이라 그 자리에서 부를 수 없습니다).

## Icon

아이콘 컴포넌트에 크기와 선 굵기를 시스템 사다리로 입히는 래퍼입니다. 아래는 장식 아이콘과, 이름을 붙인 뜻이 있는 아이콘입니다.

```tsx
<Icon icon={CalendarDays} size="lg" tone="muted" />
<Icon icon={TriangleAlert} label="경고" />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `icon` | `IconComponent` | 필수 | lucide-react와 같은 모양의 컴포넌트입니다(`size` · `strokeWidth` · `className` · aria 속성을 받는 것). |
| `size` | `IconSize \| number` | `"md"` | `xs` 12 · `sm` 14 · `md` 16 · `lg` 20 · `xl` 24px입니다. 숫자를 주면 그 px입니다. |
| `strokeWidth` | `number` | `2.5` | 선 굵기입니다. class-explorer의 굵은 선을 그대로 씁니다. |
| `tone` | `Tone` | — | 글자색 사다리와 같습니다(`accent`는 가장 가까운 Paint의 색). 주지 않으면 주변 글자색(`currentColor`)을 따릅니다. |
| `label` | `string` | — | 뜻이 있는 아이콘이면 이름을 줍니다. 없으면 장식으로 숨깁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `label`이 있으면 `role="img"`와 `aria-label`이 붙고, 없으면 `aria-hidden`입니다. 글자와 함께 놓는 아이콘은 장식이므로 이름을 주지 않습니다.
- 블록(`display: block`)이고 줄어들지 않습니다(`flex-shrink: 0`). 글자 줄에 끼어도 줄 높이가 흔들리지 않습니다.
- 버튼 안의 아이콘은 `Button`의 `icon` · `iconEnd`로 넘깁니다. 크기와 굵기를 버튼 크기가 정하므로 호출부에서 `size`나 `strokeWidth`를 적지 않습니다.

## VisuallyHidden

화면에는 없고 스크린 리더만 읽는 글자입니다. 아래는 아이콘만 보이는 버튼에 읽을 이름을 붙인 예입니다.

```tsx
<button type="button">
  <Icon icon={Trash2} />
  <VisuallyHidden>수업 삭제</VisuallyHidden>
</button>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"span"` | 렌더할 요소입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 1px 크기로 접어 `clip`으로 가리므로 레이아웃에서 자리를 차지하지 않습니다. `display: none`이 아니라서 스크린 리더가 읽습니다.
- 아이콘만 있는 버튼은 [IconButton](../atoms/README.md#iconbutton)의 `label`이 같은 일을 하므로 그쪽을 먼저 씁니다.

## Portal

자식을 `document.body` 끝에 그립니다. `container`를 주면 body 대신 그 요소 안에 그립니다. 아래는 화면 구석에 놓을 알림을 body로 옮기는 예입니다.

```tsx
<Portal>
  <div role="status">시간표를 저장했습니다</div>
</Portal>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | 필수 | 그릴 내용입니다. |
| `container` | `Element \| null` | `document.body` | 그릴 요소입니다. 주지 않거나 `null`이면 body 끝입니다. |

- [Floating](#floating)이 이 위에 서서 Tooltip · Menu가 카드의 `overflow`에 잘리지 않게 합니다. 모달은 native `<dialog>`의 top layer가 맡아서 모달 자체에는 Portal이 필요 없습니다.
- 모달 안에서 여는 판은 `container`로 열린 `<dialog>`를 줍니다. 모달이 열려 있는 동안 `<dialog>` 바깥은 눌리지 않고 top layer 아래에 깔리므로, body 끝에 그린 판은 보이지도 눌리지도 않습니다. Floating이 이 일을 대신 합니다.
- 마운트 뒤 effect에서 그리지 않고 곧바로 그립니다. 판이 뜨는 순간의 layout effect가 판을 찾아 위치를 재야 하기 때문입니다. 이 패키지는 브라우저 전용이며, `document`가 없으면 `null`을 돌려줍니다.

## Surface

2차 primitive, 박스의 면입니다(Box + 면). 면(`fill`) · 테두리 · 그림자를 고르고, 카드 · 패널 · 모달 · 판 · 바처럼 무언가를 담는 박스를 칠합니다. 면은 흑백 다섯에, 앱의 뼈대가 쓰는 보라(`brand`) 하나가 더해집니다. `hoverable`이면 hover · 누르는 중의 흑백 상태 층도 칠합니다. accent가 없습니다 — 색을 고르는 요소는 [Paint](#paint)입니다. 아래는 흰 카드 면과, 흰 면 안의 오목한 자리를 나란히 놓은 예입니다.

```tsx
<Surface border="line" shadow="raised" padding="xl">
  이번 학기 시간표를 불러왔습니다
</Surface>
<Surface fill="well" padding="lg">
  7교시 이후 공강
</Surface>
```

면 위의 목록 줄은 면을 따로 칠하지 않습니다(`fill="none"`). 바깥 면을 그대로 보이다가 hover 때 층을 얹습니다. 아래는 흰 면 위의 검색 추천 줄입니다.

```tsx
<Surface border="line">
  {subjects.map((s) => (
    <Surface key={s} fill="none" hoverable paddingX="xl" paddingY="md">
      {s}
    </Surface>
  ))}
</Surface>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. 모달은 `"dialog"`입니다. |
| `fill` | `SurfaceFill` | `"raised"` | 면입니다. `none`은 면 없이 바깥 면을 그대로 보입니다 — 목록 줄 · 아코디언 머리처럼 면 위의 한 칸에 씁니다. `brand`는 앱의 뼈대(상단 바 · 하단 바)에만 쓰는 보라 면입니다. |
| `border` | `Border` | `"none"` | 2px 테두리의 색입니다. |
| `shadow` | `Shadow` | `"none"` | 깊이입니다. 떠 있는 물건은 `raised`(4px), 모달만 `floating`(6px)입니다. |
| `hoverable` | `boolean` | `false` | hover · 누르는 중에 흑백 상태 층(글자색의 7% · 12%)을 면 위에 덮습니다. 면 · 글자 · 테두리는 그대로이고, Pressable 없이 혼자 동작합니다. 꺼진 요소에는 걸지 않습니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 글자색은 부모를 따르고(`color: inherit`), `inverse`와 `brand`만 흰 글자로 바꿉니다. 어두운 면 위에 검정 글자가 생기지 않고, 링크나 버튼으로 그려도 브라우저의 파란 글자가 남지 않습니다.
- 상태 층은 글자색을 묽혀 만들어서 흰 면 위에서는 회색, 어두운 면(검정 · 보라) 위에서는 흰 층이 됩니다. 색 요소의 hover는 [Paint](#paint)의 `hoverable`이고, 상태마다 누가 무엇을 맡는지는 [아래 표](#칠--누름--골라짐)에 있습니다.
- `brand`는 accent가 아니라 자리의 이름입니다. 상단 바 · 하단 바는 색을 고르는 요소가 아니라 앱의 뼈대라서 Paint가 아니라 Surface가 칠합니다. 값은 보라 네온(`#7828c8`)이고 흰 글자가 7.15:1입니다. 바는 Paint가 아니므로 accent를 흘리지 않습니다 — 바 안의 Button 같은 컨트롤은 보라를 물려받지 않고, 바 위에는 accent가 없는 [Glass](#glass)를 얹습니다. 테두리와 그림자는 면이 아니라 바의 CSS가 한쪽에만 겁니다. [Card](../molecules/README.md#card)의 `fill`은 `brand`를 받지 않습니다 — 카드는 흑백 박스입니다.
- 테두리는 2px 한 굵기라 굵기를 고르지 않고 색만 고릅니다.
- `surfaceClass(props)`가 같은 prop을 class 문자열로 돌려줍니다. 누르는 카드는 [Pressable](#pressable)에 이 class로 면만 빌려 줍니다(`Card motion`이 그렇게 조립됩니다). 칠한 판 위에 늘어놓으려면 Surface 안에 Stack · Inline · Grid를 넣습니다.

## Paint

2차 primitive, 요소의 칠입니다(Box + 색). 색의 모든 상태를 맡습니다 — accent(색) × variant(칠하는 방식) 두 축으로 쉬는 글자 · 면 · 테두리를, `selected`로 골라진 색을, `hoverable`로 hover · 누르는 중의 색을 칠합니다. accent를 갖는 primitive는 Paint 하나라, 안쪽 요소는 accent를 따로 주지 않으면 가장 가까운 Paint의 색을 씁니다. Badge · Notice · 머리 막대(모달 · `Card.Header`)가 이 위에 서고, Button은 Pressable(누름) · Selectable(골라짐)에 이 칠을 얹은 것입니다. 상단 바 · 하단 바는 색을 고르는 요소가 아니라 앱의 뼈대라서 Paint가 아니라 [Surface](#surface)의 `brand`입니다. 아래는 드랍한 과목 줄을 plain으로 칠한 예입니다. 안쪽 버튼은 accent를 받지 않아 줄의 분홍을 따릅니다.

```tsx
<Paint accent="pink" variant="plain" padding="lg">
  <Text weight="black">일반물리학 · 드랍</Text>
  <Button size="sm">되돌리기</Button>
</Paint>
```

hover 색은 Pressable 없이도 켜집니다. 누르는 물건으로 만들려면 Pressable에 이 칠을 class로 얹습니다 — 색은 그대로 Paint가, 의미 · 커서 · 몸짓은 Pressable이 맡습니다. 아래는 그림자 위에 떠 있다가 hover 때 가라앉는 버튼을 Button 없이 조립한 예입니다.

```tsx
<Pressable motion="sink" paddingX="md" paddingY="xs" className={paintClass({ accent: "cyan", variant: "solid", hoverable: true })}>
  Preview
</Pressable>
```

칠에 `as={Pressable}`을 줘도 같습니다 — `<Paint as={Pressable} motion="sink" accent="cyan" variant="solid" hoverable>`. Paint는 색만 칠하고, `motion` · `disabled`는 Pressable로 넘어갑니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `accent` | `Accent` | — | 색입니다. 이 요소를 칠하고 안쪽으로 흐릅니다. 주지 않으면 바깥 Paint의 색, 바깥에도 없으면 검정(시스템)입니다. |
| `variant` | `Variant` | `"outline"` | 칠하는 방식입니다. 12가지 레시피는 [Color](../foundations/color.md#variant)에 있습니다. |
| `selected` | `boolean` | `false` | 골라진 상태입니다. 같은 accent의 `filled`로 칠합니다. 알리는 aria와 골라진 모양(커지기)은 [Selectable](#selectable)입니다. |
| `hoverable` | `boolean` | `false` | hover · 누르는 중에 색이 반응합니다. variant 표의 Hover 칸(층 · 글자 · 테두리)대로 바뀌고, 누르는 동안 한 단 더 짙어집니다. Pressable 없이 혼자 동작하므로 툴팁을 띄우는 배지처럼 누르지 않는 요소에도 씁니다. 꺼진 요소(`disabled` · `aria-disabled`)에는 걸지 않습니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 그림자와 가라앉는 몸짓은 Paint가 하지 않습니다. 그림자 위에 떠 있다가 가라앉는 버튼은 `Pressable motion="sink"` + `paintClass()`이고, Button의 `shadow`가 이 조립을 대신 고릅니다.
- 테두리가 없는 variant(`ghost` · `ghostMuted`)는 가라앉을 상자가 없어서 그림자를 받지 않습니다. Button은 이 둘에 `shadow`를 줘도 `tap`으로 그립니다. 골라지면 `filled`로 칠해져 테두리가 생기므로, 그때는 `shadow`대로 그림자와 커짐을 받습니다.
- 크기 · 글자 · 아이콘은 Paint가 정하지 않습니다. 그건 Button · Badge처럼 Paint 위에 선 컴포넌트의 몫입니다.
- `paintClass(props)`가 같은 prop을 class 문자열로 돌려줍니다. Pressable처럼 다른 2차 primitive에 칠을 얹을 때 씁니다.
- 위 층 컴포넌트는 Paint의 칠을 쓰면서 형태만 자기 CSS로 덮습니다. 모달 머리 막대와 `Card.Header`의 막대는 filled를 쓰고 테두리를 아래 한 줄만 남깁니다.
- 색 없이 accent만 필요한 위 층은 `useAccent(accent)`를 씁니다. accent를 주면 그 색의 사다리 일곱 칸을 변수로 다시 쓰는 class 하나를 돌려주고, 주지 않으면 `undefined`라서 바깥 색을 그대로 따릅니다. variant 없이 자기 색을 칠하는 Link · Stat · Meter가 쓰고, accent class를 직접 읽는 곳은 이 Paint 모듈 하나입니다.
- 상태마다 칠 · Pressable · Selectable이 무엇을 맡는지는 [아래 표](#칠--누름--골라짐)에 있습니다.

## Glass

2차 primitive, 색 바 위의 유리입니다(Box + 유리 칠). 상단 바 · 하단 바(Surface의 `brand`)나 accent로 칠한 바(Paint의 filled) 위에 놓이는 반투명 흰 면이고, 어느 바 위에서도 흰색입니다(흰색 10% 면 · 30% 테두리). accent를 받지 않고, 글자는 바의 글자색을 물려받습니다 — 보라 바 위에서는 흰 글자, 노랑 바 위에서는 검정 글자입니다. 아래는 brand 바 위에 학기 표시와, 지금 화면을 고른 유리를 놓은 예입니다.

```tsx
<Surface fill="brand" padding="md">
  <Glass paddingX="md" paddingY="xs">2026-2</Glass>
  <Glass selected paddingX="md" paddingY="xs">홈</Glass>
</Surface>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `selected` | `boolean` | `false` | 골라진 상태입니다. 더 짙은 유리와 흰 테두리로 칠합니다. 알리는 aria는 [Selectable](#selectable)(`useSelectable`)이 붙입니다. |
| `hoverable` | `boolean` | `false` | hover 때 유리가 짙어지고 테두리가 흰색이 됩니다. Pressable 없이 혼자 동작하고, 꺼진 요소에는 걸지 않습니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 흰 유리라 흰 면 · 크림 위에서는 보이지 않습니다. 그 자리는 [Paint](#paint)의 몫입니다.
- 누르는 동안의 색은 없고 몸짓만 있습니다. 누르는 물건이면 [Pressable](#pressable)(`tap`)에 `glassClass()`로 얹고, 골라지는 물건이면 Selectable을 더합니다 — [NavButton](../atoms/README.md#navbutton)이 그렇게 조립됩니다.
- `glassClass(props)`가 같은 prop을 class 문자열로 돌려줍니다.

## Pressable

2차 primitive, 누르는 물건입니다(Box + 누름). '눌린다'는 사실과 그 몸짓을 맡습니다 — 버튼의 의미(`type` · `disabled` · `aria-disabled`) · 커서 · 꺼진 모양 · 움직임. 색은 하나도 없습니다. hover 색까지 칠의 `hoverable`이고, Pressable이 그걸 켜 주지 않습니다. 골라진 상태도 없습니다. 눌림은 순간의 반응이고 골라짐은 남아 있는 상태라서 [Selectable](#selectable)이 따로 맡습니다. 칠은 `surfaceClass()` · `paintClass()` · `glassClass()`로 얹거나, 칠에 `as={Pressable}`을 줍니다 — 누르는 Card가 Pressable + Surface이고, Button은 여기에 Selectable과 Paint를 더한 것입니다. 아래는 과목 카드를 `lift`로 눌러 상세로 가게 한 예입니다.

```tsx
<Pressable motion="lift" padding="xl" className={surfaceClass({ border: "line" })} onClick={() => navigate("/courses/phys2")}>
  <Stack as="span" gap="xs">
    <Text variant="heading">일반물리학 II</Text>
    <Text variant="caption" tone="muted">김예시 선생님 · B201</Text>
  </Stack>
</Pressable>
```

버튼 모양 없이 칠과 누름만 묶을 때는 칠에 `as={Pressable}`을 주면 한 줄입니다. 칠은 색만 칠하고 `motion` · `disabled`는 Pressable로 넘어갑니다.

```tsx
<Surface as={Pressable} motion="lift" border="line" padding="xl">탐색 카드</Surface>
<Glass as={Pressable} motion="tap" hoverable paddingX="md" paddingY="xs">2026-2</Glass>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"button"` | 렌더할 요소입니다. 링크면 `"a"`나 라우터 링크를 줍니다. |
| `motion` | `PressMotion` | `"none"` | 몸짓입니다. `none`은 움직이지 않고, `sink`는 4px 그림자 위에서 가라앉고, `raise`는 평평하다가 hover 때 제자리에서 그림자가 올라오고, `lift`는 떠오르고, `tap`은 그림자 없이 누르는 순간만 작아지고, `shrink`는 그림자를 둔 채 hover 때 95%, 누르면 92%로 작아집니다(Ask 단추 전용). |
| `disabled` | `boolean` | `false` | `button`이면 `disabled` 속성이, 그 밖의 요소면 `aria-disabled`가 붙습니다. 불투명도 0.4에 `not-allowed` 커서이고 몸짓이 멈춥니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. 면은 여기로 얹습니다. |

- `none`은 누르는 물건의 의미 · 커서 · 꺼진 모양만 남기고 움직이지 않습니다(목록 줄 · 아코디언 머리 · 메뉴 항목). `sink`는 hover 때 그림자 자리로 가라앉고(사람 카드 · 그림자를 켠 버튼) 누르는 순간 한 번 더 작아집니다. `raise`는 그 반대로, 평평하다가 hover 때 제자리에서 4px 그림자가 올라오고 누르는 순간 다시 내려앉습니다(평평한 칩). `lift`는 hover 때 4px 떠오르고 그림자가 화면에 남아 길어집니다(탐색 카드). `tap`은 그림자가 없는 버튼의 몸짓입니다. 거리와 시간은 [Motion](../foundations/motion.md)에 있습니다.
- 그림자는 몸짓의 일부라 `shadow` prop이 없습니다. `sink` · `raise` · `lift`가 그림자를 갖고, `none` · `tap`은 갖지 않습니다.
- 누르는 순간의 크기는 `--fk-press-scale`(기본 0.96)입니다. 큰 면은 자기 class에서 0.98로 덮습니다 — 400px 카드가 0.96이면 16px나 줄어들기 때문입니다. Card · PersonCard가 그렇게 합니다.
- 칠하지 않으므로 혼자 쓰면 브라우저 기본 버튼 모양(회색 면 · 테두리)이 남습니다. 면은 언제나 칠(`surfaceClass()` · `paintClass()` · `glassClass()` 또는 `as={Pressable}`)로 얹습니다.
- display와 폭은 태그 그대로입니다(`<button>`은 inline-block). 카드처럼 폭을 채우는 것은 쓰는 쪽이 정합니다 — [Card](../molecules/README.md#card)의 `motion`이 블록 · 폭 100% · 글자 정렬을 줍니다.
- 기본이 `<button type="button">`이라 안에는 글자 요소만 넣습니다(배치가 필요하면 `Stack as="span"`). 다른 button이나 링크를 넣지 않습니다.
- `pressClass(props)`가 `disabled`를 뺀 같은 prop을 class 문자열로 돌려줍니다. 몸짓 · 커서 · 꺼진 모양만 실리고 `type` · `disabled` 같은 의미는 빠지므로, 누르는 물건을 직접 그릴 때는 아래 `usePressable`을 씁니다.

### usePressable

`<Pressable>`을 거치지 않고 누르는 물건을 직접 그릴 때 쓰는 훅입니다. 그릴 요소(`Comp`)와, 그 위에 펼칠 props(`pressProps`)를 돌려줍니다. `<Pressable>` 자신도 이 훅 위에 서고, Button · IconButton · NavButton · 메뉴 칸 · 내비 칸이 같은 훅으로 자기 요소를 그립니다. 한 요소에 누름 · 골라짐 · 칠을 함께 얹을 때 컴포넌트를 `as`로 겹치지 않고 props만 펼쳐 쓰는 길입니다. 아래는 링크로도 쓰는 목록 줄입니다. 면은 Surface의 hover 층이 맡고, 몸짓은 없습니다.

```tsx
function Row({ as, children, ...rest }) {
  const { Comp, pressProps } = usePressable({
    as,
    paddingX: "xl",
    paddingY: "md",
    className: surfaceClass({ fill: "none", hoverable: true }),
  });
  return (
    <Comp {...pressProps} {...rest}>
      {children}
    </Comp>
  );
}
```

받는 옵션은 `<Pressable>`의 props(`motion` · `disabled` · 여백 · `className`)와 같고, 그릴 요소를 고르는 `as`가 더해집니다.

| 돌려주는 값 | 설명 |
| --- | --- |
| `Comp` | 그릴 요소입니다. `as`를 주지 않으면 `"button"`입니다. |
| `pressProps` | 요소에 펼칠 props입니다. `<button>`이면 `type="button"`과 native `disabled`, 그 밖의 요소면 `aria-disabled`가 들어 있고, `className`에는 몸짓 · 여백 · 받은 `className`이 합쳐져 있습니다. |

- `pressProps.className`은 받은 `className`까지 합친 값입니다. 펼친 뒤에 `className`을 다시 주면 덮어쓰므로, 다른 class는 옵션의 `className`으로 넘기거나 `pressProps.className`과 합쳐서 줍니다.
- `<button>`으로 치는 것은 `as`가 문자열 `"button"`일 때뿐입니다. 라우터 링크 같은 컴포넌트는 링크로 보고 `aria-disabled`를 붙입니다. 꺼진 모양은 둘 다 같은 class가 그립니다.

## Selectable

2차 primitive, 골라지는 물건입니다(Box + 골라짐). '골라져 있다'는 남아 있는 상태를 맡습니다 — 그 사실을 알리는 aria 하나와, 골라진 칸의 모양(커지기). 눌림은 순간의 반응이고 골라짐은 남아 있는 상태라서 [Pressable](#pressable)과 따로 서고, 고르는 칸은 대개 둘을 같이 씁니다. 색은 하나도 없습니다 — 골라진 색은 칠의 몫이라 Paint · Glass의 `selected`를 주거나 Surface의 `fill`을 바꿉니다. 아래는 학년 버튼 한 줄입니다. 안 골린 칸은 `sink`로 그림자 위에 떠 있고, 골린 칸은 `grow`로 커집니다. `grow`가 `sink`를 덮으므로 몸짓은 골라짐에 따라 바꾸지 않습니다.

```tsx
<Inline gap="md">
  {grades.map((g) => {
    const picked = grade === g;
    return (
      <Selectable
        key={g}
        as={Pressable}
        motion="sink"
        selected={picked}
        grow
        paddingX="lg"
        paddingY="sm"
        className={paintClass({ variant: "outline", selected: picked, hoverable: true })}
        onClick={() => setGrade(g)}
      >
        {g}학년
      </Selectable>
    );
  })}
</Inline>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. 누르는 칸이면 `as={Pressable}`을 주고 칠은 `className`으로 얹습니다. |
| `selected` | `boolean` | — | 골라졌는지입니다(쓰는 쪽이 들고 있는 값). `selected`도 `defaultSelected`도 없으면 고르는 물건이 아니라서 aria가 붙지 않습니다. |
| `defaultSelected` | `boolean` | — | 처음 골라짐입니다. 주면 누를 때마다 스스로 켜지고 꺼지는 토글이 됩니다. |
| `onSelectedChange` | `(selected: boolean) => void` | — | 눌러서 골라짐이 바뀔 때 부릅니다. `selected`와 같이 주면 쓰는 쪽이 값을 들고 있는 토글입니다. |
| `role` | `AriaRole` | — | 요소의 role입니다. 골라짐을 알리는 aria가 이걸로 정해집니다. 고르는 무리의 칸이면 `radio` · `tab`을 줍니다. |
| `current` | `"page" \| "step" \| "location" \| "date" \| "time" \| true` | — | 고른 것이 아니라 '지금 여기'인 것입니다. 내비의 지금 화면은 `"page"`입니다. `aria-current` 하나로 알립니다. |
| `grow` | `boolean` | `false` | 골라지면 105%로 커져 이웃 위에 서고 4px 그림자 위에 섭니다(쉴 때 평평하던 칩도). hover 때는 그림자만 숨기고, 누르면 100%로 돌아옵니다. 골라졌을 때만 걸리고, 함께 쓰는 Pressable의 몸짓을 덮습니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `className` | `string \| ({ selected }) => string` | — | 마지막에 덧붙는 class입니다. 칠은 여기로 얹습니다. 골라짐에 따라 칠이 바뀌면 함수로 줍니다 — 스스로 켜고 끄는 토글은 값을 안에 들고 있어서 이 길로만 칠에 넘깁니다. |
| `onClick` | `(event) => void` | — | 누름입니다. 토글이면 이걸 먼저 부르고, 여기서 `preventDefault()`하지 않았으면 골라짐을 뒤집습니다. |

골라짐을 알리는 aria는 `selected`가 있을 때 하나만 붙습니다. 어느 속성인지는 아래 순서로 정합니다.

| 위에서부터 | 붙는 속성 |
| --- | --- |
| `selected`를 주지 않음 | 없음 |
| `current`를 줌 | `aria-current` — 골라졌으면 `current` 값을 싣고, 아니면 속성을 붙이지 않습니다 |
| `role`이 `radio` · `checkbox` · `switch` · `menuitemradio` · `menuitemcheckbox` | `aria-checked` |
| `role`이 `tab` · `option` · `gridcell` · `row` · `treeitem` | `aria-selected` |
| 그 밖(role이 없는 그냥 버튼 포함) | `aria-pressed` |

- 칸이 자기 `role`을 넘기면 맞는 속성 하나만 붙으므로, SegmentedControl · Tabs 같은 위 층이 Button의 `aria-pressed`를 지우고 다른 속성으로 바꿔 달 필요가 없습니다. `selected={false}`는 `aria-pressed="false"`처럼 '골라지지 않음'을 알립니다. 고르는 물건이 아니면 `selected`를 아예 주지 않습니다.
- 기본 요소가 `div`라서, `role`도 `current`도 없이 쓰면 `aria-pressed`가 button이 아닌 요소에 붙습니다. 고르는 칸은 `as={Pressable}`로 button을 그리거나 `role`을 줍니다.
- `current`는 내비 칸이 씁니다. SideNav · BottomNav의 칸이 `current="page"`로 지금 화면을 알립니다. 내비는 Tab 키로 칸마다 들르는 것이 맞아서 아래 `useSelectableGroup`으로 묶지 않습니다.
- `grow`는 이웃 위에 서려고 `position: relative`와 `z-index: 1`을 걸고, 4px 그림자를 둔 채 105%(`PRESS.grow`)로 커집니다. hover 때는 가라앉지 않고 제자리에서 그림자만 숨습니다. 이미 고른 칸을 다시 '눌러 들어가게' 하지 않으려는 것이고, class-explorer의 골라진 버튼(`scale-105 z-10`)이 이렇게 움직입니다. 꺼진 요소에는 hover · 누르는 중 규칙을 걸지 않습니다.
- `grow`는 그 자체로 몸짓이라 함께 쓰는 Pressable의 몸짓(`sink` · `raise` · `lift` · `tap` · `shrink`)을 덮습니다. class를 두 번 겹친 선택자(`.grow.grow`)로 특이도를 한 단 올려서, 쓰는 쪽이 골라질 때마다 `motion`을 바꿀 필요가 없고 CSS가 실리는 순서에도 기대지 않습니다. Selectable의 CSS가 Pressable의 CSS에서 `FLAT_SHADOW` 값을 읽는 것이 2차 primitive 사이의 유일한 import입니다.
- 쉴 때 평평한 칩도 골라지면 커지며 그림자가 생깁니다 — class-explorer 분반 카드의 교사 · 교실 칩이 그렇습니다. `grow`는 주는 쪽이 정하고, Button은 골라진 버튼에 늘 줍니다.
- 누르면 골라지는 토글은 둘입니다. `defaultSelected`를 주면 누를 때마다 스스로 켜지고 꺼지며, 칠은 `className`을 함수(`({ selected }) => paintClass({ selected })`)로 줘서 그 값을 받습니다. `selected` + `onSelectedChange`면 쓰는 쪽이 값을 들고 있는 토글입니다. 무리의 칸(라디오 · 탭)은 무리가 값을 들고 있으므로 둘 다 주지 않습니다 — 이미 고른 라디오를 다시 눌러도 꺼지지 않아야 합니다.

### useSelectable

골라짐의 속입니다. `<Selectable>`과 Button · IconButton · NavButton · 메뉴 칸 · 내비 칸이 같은 훅을 씁니다. 받는 옵션은 `<Selectable>`에서 `as`를 뺀 props와 같고(`className`은 문자열만 받습니다 — 함수는 `<Selectable>`이 풉니다), 요소에 펼칠 `selectProps`를 돌려줍니다 — `role`, 골라짐을 알리는 aria 하나, 골라진 모양과 여백의 `className`입니다. 지금 값 `selected`도 같이 돌려주고, 토글이면(`defaultSelected` · `onSelectedChange`) 뒤집는 `toggle`도 돌려줍니다 — 누름에 이어 부릅니다. 아래는 지금 화면을 알리는 하단 바의 칸입니다. `usePressable`의 `className`과 하나로 합치려고 `selectProps.className`을 그쪽에 넘겼습니다.

```tsx
function NavItem({ active, children, ...rest }) {
  const { selectProps } = useSelectable({ selected: active, current: "page" });
  const { Comp, pressProps } = usePressable({ as: "a", motion: "tap", className: selectProps.className });
  return (
    <Comp {...selectProps} {...pressProps} {...rest}>
      {children}
    </Comp>
  );
}
```

두 훅이 각자 `className`을 돌려주므로 나중에 펼친 쪽이 앞의 것을 덮습니다. 위 예에서 `pressProps`가 뒤에 오는 것은 그 안에 `selectProps.className`이 이미 합쳐져 있기 때문입니다.

### useSelectableGroup

고르는 무리의 속입니다. 값 하나를 고르는 줄(SegmentedControl · Tabs)과 동작 목록(Menu)이 같이 씁니다. 무리 요소에 `groupProps`를, 칸마다 `itemProps(값)`을 펼칩니다. 무리의 값 · 누르기 · 방향키 · Home · End · roving tabindex를 맡고, 골라짐의 aria는 칸이 `useSelectable`로 붙이므로(role이 정합니다) 여기서 덮어쓰지 않습니다. 아래는 SegmentedControl이 하는 일을 직접 짠 보기 고르기 줄입니다.

```tsx
function ViewPicker() {
  const { groupProps, itemProps } = useSelectableGroup({ value: view, onChange: setView });
  return (
    <Inline role="radiogroup" aria-label="보기" gap="sm" {...groupProps}>
      {views.map((v) => (
        <Button key={v} role="radio" variant="muted" {...itemProps(v)}>
          {v}
        </Button>
      ))}
    </Inline>
  );
}
```

| 옵션 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `value` | `string` | — | 골라진 값입니다. 주지 않으면 고르는 무리가 아니라 동작 목록이라, 칸에 골라짐을 알리지 않고 Tab 순서도 건드리지 않습니다. |
| `onChange` | `(value) => void` | — | 칸을 누르면 부릅니다. `selectOnFocus`면 방향키로 옮길 때도 부릅니다. |
| `selectOnFocus` | `boolean` | `true` | 방향키로 옮기면 바로 고릅니다(라디오 · 탭). 메뉴처럼 포커스만 옮기려면 `false`를 줍니다. |
| `orientation` | `"horizontal" \| "vertical" \| "both"` | `"both"` | 방향키의 축입니다. `horizontal`은 ← →, `vertical`은 ↑ ↓, `both`는 넷 다 씁니다. 세로 목록은 `vertical`입니다. |

돌려주는 값은 무리 요소에 펼칠 `groupProps`(`onKeyDown`)와, 칸마다 부르는 `itemProps(값)`입니다. `itemProps`는 `data-fk-value` · `selected` · `tabIndex` · `onClick`을 줍니다.

- 방향키는 다음(이전) 칸으로 포커스를 옮기고, 끝에서는 처음으로 돌아옵니다. Home · End는 처음 · 끝 칸으로 갑니다. 꺼진 칸(`disabled` · `aria-disabled`)은 건너뜁니다.
- 골라진 칸만 `tabIndex={0}`이고 나머지는 `-1`입니다(roving tabindex). Tab 키로는 무리에 한 번만 들어오고, 무리 안은 방향키로 옮깁니다. 그래서 `value`는 늘 칸 중 하나여야 합니다 — 어느 칸과도 맞지 않으면 Tab으로 들어올 칸이 없습니다.
- 무리는 `data-fk-value`로 칸을 찾습니다. `itemProps`를 펼치지 않은 칸은 방향키가 지나칩니다.
- SegmentedControl과 Tabs는 기본 설정으로, Menu는 `selectOnFocus: false` · `orientation: "vertical"`로 이 위에 섭니다. Menu는 메뉴라서 옮겨도 고르지 않고, Enter나 누름으로 고릅니다.

## 칠 · 누름 · 골라짐

색은 칠(Paint · Surface · Glass), 누름은 Pressable, 골라짐은 Selectable입니다. 같은 상태에 각자의 축으로 반응하고, 서로를 켜거나 끄지 않습니다.

| 상태 | 색 — Paint | 색 — Surface | 색 — Glass | 누름 — Pressable | 골라짐 — Selectable |
| --- | --- | --- | --- | --- | --- |
| 쉼 | variant의 FG · BG · Border | 면 · 테두리 · 그림자 | 흰색 10% 면 · 30% 테두리 | `sink` · `lift`면 4px 그림자 위에 떠 있습니다(`raise`는 평평) | `grow`면 골라진 칸이 105%로 커져 이웃 위에 서고 4px 그림자를 둡니다 |
| hover | `hoverable`이면 variant의 Hover 칸(층 · 글자 · 테두리) | `hoverable`이면 글자색 7% 층 | `hoverable`이면 흰색 20% 면 · 흰 테두리 | `sink`는 가라앉고, `raise`는 그림자가 올라오고, `lift`는 떠오릅니다. 손가락 커서 | 커진 채 제자리에서 그림자만 숨깁니다 |
| 누르는 중 | `hoverable`이면 press 층으로 한 단 더 짙어집니다 | `hoverable`이면 글자색 12% 층 | — | 한 번 더 작아집니다(`--fk-press-scale`) | 100%로 돌아옵니다 |
| 골라짐 | `selected` — 같은 accent의 filled | — | `selected` — 흰색 25% 면 · 흰 테두리 | — | aria 하나(`aria-pressed` · `aria-checked` · `aria-selected` · `aria-current`) |
| 꺼짐 | 상태 색을 걸지 않습니다 | 상태 층을 걸지 않습니다 | 상태 색을 걸지 않습니다 | 몸짓을 멈추고 0.4로 흐려지며 `not-allowed` 커서. `disabled` · `aria-disabled`를 붙입니다 | hover · 누르는 중 규칙을 걸지 않습니다 |

- hover 색은 브라우저의 `:hover` · `:active`가 켭니다. 그래서 칠은 Pressable 없이도 hover 색을 내고(툴팁을 띄우는 배지, 면 위의 목록 줄), Pressable은 칠 없이도 가라앉습니다(흑백 면을 빌린 카드). 포커스 고리는 어느 쪽도 아니고 전역 스타일시트가 겁니다.
- 골라짐은 눌림과 달리 남아 있는 상태입니다. 색은 칠의 `selected`가, 알림과 커지기는 Selectable이 맡으므로 서로 없이도 쓸 수 있습니다 — 칠 없이 Selectable만 써도 aria가 붙고, Selectable 없이 칠의 `selected`만 줘도 색은 바뀝니다.
- 여러 축에 걸치는 것은 꺼짐뿐입니다. Pressable이 `disabled` · `aria-disabled`를 붙이고, 나머지 primitive가 그 HTML 상태를 읽어 각자의 축에서 멈춥니다.
- `transition-property`는 한 속성이라 자기 속성만 적으면 한 요소 위에서 서로를 덮습니다. 그래서 칠 · Pressable · Selectable 모두 색과 몸짓을 합친 한 목록(`STATE_TRANSITION`)을 씁니다.
- Button이 셋을 묶는 자리입니다. `selected`를 Paint의 `selected`(색)와 Selectable의 `selected`(알림)로 나눠 주고, `shadow`로 몸짓을 고릅니다 — 켜면 `sink`, `"hover"`면 `raise`, `"shrink"`면 `shrink`, 끄면 `tap`입니다. 골라진 버튼에는 그림자와 상관없이 `grow`를 주고, `grow`가 몸짓을 덮으므로 `motion`은 쉴 때의 것 그대로 둡니다.

## Floating

2차 primitive, 떠 있는 판입니다(Box + 띄우기). 판이 **어디에 · 언제** 있는지를 맡습니다 — 기준 요소 옆에 붙이기(화면 밖으로 나가면 뒤집기) · 문서 끝에 그리기([Portal](#portal)) · 쌓는 층 · 바깥 누름과 Esc로 닫자고 알리기 · 열릴 때의 포커스 · 등장 몸짓. 면은 칠하지 않습니다 — `surfaceClass()`로 얹습니다. `open` prop이 없고, 그려져 있는 동안이 열려 있는 동안입니다. 아래는 버튼 옆에 붙는 메뉴 판입니다.

```tsx
<span ref={anchor}>
  <Button onClick={() => setOpen(!open)}>학기</Button>
  {open && (
    <Floating
      anchor={anchor}
      role="menu"
      onDismiss={() => setOpen(false)}
      className={surfaceClass({ border: "line", shadow: "raised" })}
    >
      …
    </Floating>
  )}
</span>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. `role` · `id` · `aria-label` · `onKeyDown` 같은 나머지 props는 이 요소로 그대로 넘어갑니다. |
| `anchor` | `RefObject<HTMLElement \| null>` | 필수 | 기준 요소입니다. 판이 이 요소 옆에 붙고, 이 요소를 누르는 것은 '바깥'이 아닙니다. |
| `placement` | `"top" \| "bottom"` | `"bottom"` | 기준 요소의 위 · 아래입니다. 화면 밖으로 나가면 반대쪽으로 뒤집습니다. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | 판을 기준 요소의 어느 끝에 맞출지 정합니다. `center`가 아니면 판이 기준 요소보다 좁아지지 않습니다. |
| `layer` | `"dropdown" \| "tooltip"` | `"dropdown"` | 쌓는 층입니다. `dropdown`은 z 200이고, 설명 풍선은 `tooltip`으로 z 500입니다. |
| `enter` | `EnterMotion` | `"rise"` | 등장 몸짓입니다. `none` `rise` `pop` `fade` 중에서 고릅니다. |
| `onDismiss` | `(reason: "outside" \| "escape") => void` | — | 판 바깥을 누르거나 Esc를 누르면 부릅니다. 주지 않으면 스스로 닫자고 하지 않는 판이라 여는 쪽이 닫습니다. |
| `initialFocus` | `(panel: HTMLElement) => HTMLElement \| null \| undefined` | — | 열릴 때 포커스를 줄 요소를 판 안에서 고릅니다. 판이 그려진 직후 한 번만 부릅니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `style` | `CSSProperties` | — | 위치(`position` · `top` · `left`, `align`이 `center`가 아니면 `minWidth`까지)는 Floating이 정하므로 같은 속성을 주면 위치가 이깁니다. `center`일 때는 폭을 건드리지 않아 준 `minWidth`가 그대로 남습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. 면은 여기로 얹습니다. |

- 기준 요소 안을 누르는 것은 바깥이 아니라서 `onDismiss`가 불리지 않습니다. 여는 버튼을 다시 누르면 버튼의 `onClick`이 판을 닫습니다. 기준 요소를 바깥으로 치면 pointerdown에 닫히고 같은 누름의 click에 다시 열릴 수 있기 때문입니다.
- 기준 요소가 열린 모달(`<dialog>`) 안에 있으면 판을 body가 아니라 그 `<dialog>` 안에 그립니다([Portal](#portal)의 `container`). 모달은 top layer에 올라 바깥을 누를 수 없게 만들고 z-index로는 그 층을 넘을 수 없어서, body 끝에 그린 판은 모달 뒤에 깔려 보이지도 눌리지도 않습니다.
- Esc는 판에서 멈춥니다. 판이 Esc의 기본 동작(`preventDefault`)을 막아서, 모달 안의 판이면 첫 Esc는 판만 닫고 다음 Esc가 모달을 닫습니다. `onDismiss`를 주지 않은 판은 Esc도 바깥 누름도 듣지 않으므로 Esc가 그대로 모달로 갑니다.
- 열릴 때의 포커스는 `initialFocus`가 고른 요소로 갑니다(Menu는 골라진 칸, 없으면 첫 칸). 닫힐 때 포커스를 돌려주는 일은 여는 쪽이 정합니다 — Menu는 Esc로 닫으면 여는 버튼으로 돌려주고, 바깥을 눌러 닫으면 누른 자리에 둡니다.
- 위치는 `position: fixed` 좌표입니다. 기준 요소와 8px 띄워 붙고, 스크롤과 창 크기가 바뀔 때마다 다시 재서 기준 요소를 따라갑니다. 좌우는 화면 가장자리 8px 안에 묶습니다.
- 등장은 기본 `rise`입니다. 퇴장은 없습니다. 이유는 [Motion](../foundations/motion.md#등장)에 있습니다.
- [Tooltip](../molecules/README.md#tooltip)은 `layer="tooltip"` · `align="center"`로, [Menu](../molecules/README.md#menu)는 `initialFocus` · `onDismiss`로 이 위에 섭니다.

## Stack

2차 primitive, 세로 배치입니다(Box + 배치). 자식을 세로로 쌓는 flex 열이고, Box의 prop에 간격과 정렬을 더합니다. 칠은 하지 않으므로, 아래처럼 Surface 안에 넣어 카드 면 위에 제목과 보조 글자를 쌓습니다.

```tsx
<Surface border="line" padding="xl">
  <Stack gap="lg">
    <Text variant="heading">오늘의 수업</Text>
    <Text tone="muted">3교시 · 일반물리학 II · B201</Text>
  </Stack>
</Surface>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. 칠은 하지 않습니다. |
| `gap` | `Space` | — | 자식 사이 간격입니다. |
| `align` | `Align` | — | 가로 정렬(`align-items`)입니다. `start` `center` `end` `stretch` `baseline`. 주지 않으면 flex 기본값인 `stretch`입니다. |
| `justify` | `Justify` | — | 세로 배분(`justify-content`)입니다. `start` `center` `end` `between` `around`. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- Stack · Inline · Grid는 `min-width: 0`이라 flex나 grid 안에서도 긴 글자가 부모를 밀어내지 않습니다. 말줄임은 안쪽 `Text`의 `truncate`가 맡습니다.
- `gap`은 형제 사이, `padding`은 안쪽 여백이고 둘이 같은 사다리를 씁니다. 같은 이름이면 같은 길이입니다.

## Inline

2차 primitive, 가로 배치입니다(Box + 배치). 자식을 가로로 늘어놓는 flex 행이고, 기본은 세로 가운데 정렬입니다. 아래는 제목과 학기를 양 끝에 두고, 그 아래에서 과목 이름을 줄바꿈하며 늘어놓은 예입니다.

```tsx
<Inline justify="between" gap="md">
  <Text variant="subheading">이번 주</Text>
  <Text variant="caption" tone="muted">2026학년도 2학기</Text>
</Inline>
<Inline gap="sm" wrap>
  {subjects.map((s) => (
    <Text key={s} variant="label">{s}</Text>
  ))}
</Inline>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. 칠은 하지 않습니다. |
| `gap` | `Space` | — | 자식 사이 간격입니다. |
| `align` | `Align` | `"center"` | 세로 정렬(`align-items`)입니다. |
| `justify` | `Justify` | — | 가로 배분(`justify-content`)입니다. |
| `wrap` | `boolean` | `false` | 자식이 넘치면 다음 줄로 넘깁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 한 줄에 다 들어가지 않을 수 있는 묶음(배지 줄, 버튼 줄)에는 `wrap`을 줍니다. 주지 않으면 줄바꿈 없이 한 줄을 유지합니다.

## Grid

2차 primitive, 격자입니다(Box + 배치). 칸 수나 `grid-template-columns`를 직접 정합니다. 아래는 같은 폭 세 칸과, 칸 폭을 문자열로 준 두 번째 격자를 보여 줍니다.

```tsx
<Grid columns={3} gap="md">
  <Surface border="line" padding="lg">월</Surface>
  <Surface border="line" padding="lg">화</Surface>
  <Surface border="line" padding="lg">수</Surface>
</Grid>
<Grid columns="4rem 1fr auto" columnGap="lg" rowGap="sm" align="center">
  <Text variant="label">3교시</Text>
  <Text>일반물리학 II</Text>
  <Text variant="caption" tone="muted">B201</Text>
</Grid>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. 칠은 하지 않습니다. |
| `columns` | `number \| string` | — | 숫자면 같은 폭 n 칸(`repeat(n, minmax(0, 1fr))`), 문자열이면 `grid-template-columns` 값 그대로입니다. |
| `gap` | `Space` | — | 행과 열 사이 간격입니다. |
| `rowGap` | `Space` | — | 행 사이 간격입니다. |
| `columnGap` | `Space` | — | 열 사이 간격입니다. |
| `align` | `Align` | — | 칸 안 세로 정렬(`align-items`)입니다. |
| `justifyItems` | `Align` | — | 칸 안 가로 정렬(`justify-items`)입니다. |
| `style` | `CSSProperties` | — | `columns`가 만든 `gridTemplateColumns` 뒤에 합쳐집니다. 같은 속성을 직접 주면 그쪽이 이깁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 칸 폭은 실행 중에 정해지는 값이라 class가 아니라 inline `style`로 넣습니다.
- Grid에는 `justify`가 없습니다. 칸 안 가로 정렬은 `justifyItems`로 고릅니다. Stack · Inline의 `justify`는 `justify-content`입니다.
