# Primitives

Primitives는 모양이 없는 바탕입니다. 요소 · 글자 · 아이콘 · 접근성 도구 · 칠 · 몸짓 · 배치 열한 개가 여기 있고, 토큰과 스타일(`tokens/` · `styles/`)만 읽습니다. Atoms부터 Components까지 모든 층이 이 열한 개 위에 섭니다.

열한 개는 두 단으로 나뉩니다.

| 단 | 묶음 | 컴포넌트 | 맡는 일 |
| --- | --- | --- | --- |
| 1차 — 바탕 | element | Box | 태그 · ref · 여백 |
| 1차 — 바탕 | content | Text · Icon | 글자 · 아이콘 |
| 1차 — 바탕 | a11y | VisuallyHidden · Portal | 귀로 듣는 이름 · 그리는 자리 |
| 2차 — Box + 능력 하나 | paint | Surface · Paint | 칠 — 박스는 흑백 면, 요소는 accent × variant |
| 2차 — Box + 능력 하나 | interaction | Pressable | 몸짓 — 커서 · 꺼진 모양 · 움직임 · 버튼의 의미 |
| 2차 — Box + 능력 하나 | layout | Stack · Inline · Grid | 배치 |

1차는 서로 기대지 않습니다. 2차는 모두 [Box](#box)의 prop(태그 · 여백)을 그대로 받고 능력을 하나만 더하며, 2차끼리도 서로 기대지 않습니다. 둘 이상이 필요하면 위 층이 class로 묶습니다 — Button은 Pressable(몸짓)에 Paint(칠)를 얹은 것이고, 누르는 Card는 Pressable에 Surface(면)를 얹은 것입니다. 이렇게 묶으라고 2차 primitive는 prop을 class 문자열로 바꾸는 함수(`surfaceClass` · `paintClass` · `pressClass`)를 같이 내놓습니다.

**primitive 중 accent를 갖는 것은 Paint뿐입니다.** Paint에 준 accent는 그 요소를 칠하고, 안쪽 요소가 accent를 따로 주지 않으면 그 색으로 흐릅니다. Box · Surface · 배치 primitive는 색을 모르므로 이 흐름을 끊지도 바꾸지도 않습니다. 바깥에 Paint가 없으면 검정(시스템)입니다. 위 층에서도 accent는 그 색으로 칠해지는 컴포넌트(Button · Badge · Link · 토글 …)만 받고, Card처럼 칠하지 않는 박스는 받지 않습니다.

요소를 그리는 컴포넌트는 `as`로 렌더할 태그를 바꾸고, 나머지 props는 그 태그로 그대로 넘깁니다. 같은 이름의 HTML 속성이 있으면 컴포넌트의 prop이 우선하고, React 19라 `ref`도 일반 prop입니다. 예시는 import를 생략합니다. 컴포넌트는 `@studio-baeks/funky-ui`에서, 아이콘은 `lucide-react`에서 가져온 것이고, `navigate`나 `subjects`처럼 앱이 가진 값은 이미 있다고 봅니다.

패키지 CSS의 레이어도 이 층을 따릅니다(`fk.base < fk.primitives < fk.components < fk.utilities`). 그래서 위 층 컴포넌트의 CSS는 Surface · Paint의 칠을 언제나 덮을 수 있습니다 — 모달 머리 막대가 Paint의 solid를 쓰면서 테두리는 아래 한 줄만 남기는 식입니다.

## 어휘

primitive가 받는 값은 모두 닫힌 집합입니다.

| 어휘 | 값 |
| --- | --- |
| `Accent` | `black` `pink` `purple` `cyan` `yellow` `orange` `sky` `green` `red`, 역할 별칭 `system`(black) · `primary`(pink) · `secondary`(purple) · `success`(green) · `error`(red). 색 규칙은 [Color](../foundations/color.md) |
| `Variant` | `solid` `outline` `hairline` `frameline` `framelineMuted` `plain` `tonal` `tonalMuted` `muted` `ghost` `ghostMuted` — 레시피는 [Color](../foundations/color.md#variant) |
| `SurfaceFill` | `canvas`(크림 바탕) · `raised`(흰 면) · `sunken`(크림 위 오목한 자리) · `well`(흰 면 안의 오목한 자리, 반투명) · `inverse`(검정) |
| `Border` | `none` · `line`(검정) · `soft`(연한 회색) · `subtle`(카드 안 구분선 색) |
| `Shadow` | `none` · `raised`(4px) · `floating`(6px) |
| `PressMotion` | `press`(그림자 위에서 가라앉음) · `lift`(떠오름) · `tap`(그림자 없이 누르는 순간만 작아짐). 거리와 시간은 [Motion](../foundations/motion.md) |
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
| `tone` | `Tone` | — | 글자색입니다. `primary` `secondary` `muted` `faint` `inverse` `accent` `accentSoft` `inherit`. `accent`는 가장 가까운 Paint의 진한 글자, `accentSoft`는 연한 글자이고, 바깥에 Paint가 없으면 검정(시스템)의 사다리입니다. |
| `family` | `"sans" \| "mono"` | — | 서체입니다. 코드나 식별자 같은 기술적 자리에만 `mono`를 씁니다. |
| `align` | `"start" \| "center" \| "end"` | — | 글자 정렬입니다. |
| `truncate` | `boolean` | `false` | 한 줄에서 자르고 …을 붙입니다. |
| `numeric` | `boolean` | `false` | 숫자 글리프만 같은 폭으로 맞춥니다(`tabular-nums`). 표와 시각에 씁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `overline`과 `subtitle`은 기본 잉크가 `muted`입니다. 정의 순서가 역할 → 굵기 → 잉크라서 `tone`과 `weight`로 그 기본값을 바꿀 수 있습니다.
- `faint`는 장식 · placeholder · 꺼진 자리 전용입니다. 대비가 AA에 못 미치므로 필수 정보에 쓰지 않습니다.
- 문서 구조는 `as`가, 생김새는 `variant`가 맡습니다. 제목 태그의 크기를 바꾸고 싶으면 태그를 바꾸지 말고 `variant`를 바꿉니다.
- Text는 accent를 읽기만 하고 정하지 않습니다. 색을 정하는 것은 Paint입니다.

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

자식을 `document.body` 끝에 그립니다. 아래는 화면 구석에 놓을 알림을 body로 옮기는 예입니다.

```tsx
<Portal>
  <div role="status">시간표를 저장했습니다</div>
</Portal>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | 필수 | body 끝에 그릴 내용입니다. |

- Tooltip · Menu가 카드의 `overflow`에 잘리지 않도록 쓰는 도구입니다. 모달은 native `<dialog>`의 top layer가 맡아서 Portal이 필요 없습니다.
- 마운트 뒤 effect에서 그리지 않고 곧바로 그립니다. 판이 뜨는 순간의 layout effect가 판을 찾아 위치를 재야 하기 때문입니다. 이 패키지는 브라우저 전용이며, `document`가 없으면 `null`을 돌려줍니다.

## Surface

2차 primitive, 박스의 면입니다(Box + 흑백 면). 흑백 면(`fill`) · 테두리 · 그림자를 고르고, 카드 · 패널 · 모달 · 판처럼 무언가를 담는 박스를 칠합니다. accent가 없습니다 — 색이 있는 요소는 [Paint](#paint)입니다. 아래는 흰 카드 면과, 흰 면 안의 오목한 자리를 나란히 놓은 예입니다.

```tsx
<Surface border="line" shadow="raised" padding="xl">
  이번 학기 시간표를 불러왔습니다
</Surface>
<Surface fill="well" padding="lg">
  7교시 이후 공강
</Surface>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. 모달은 `"dialog"`입니다. |
| `fill` | `SurfaceFill` | `"raised"` | 흑백 면입니다. |
| `border` | `Border` | `"none"` | 2px 테두리의 색입니다. |
| `shadow` | `Shadow` | `"none"` | 깊이입니다. 떠 있는 물건은 `raised`(4px), 모달만 `floating`(6px)입니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 글자색은 부모를 따르고(`color: inherit`), `inverse`만 흰 글자로 바꿉니다. 검정 면 위에 검정 글자가 생기지 않고, 링크나 버튼으로 그려도 브라우저의 파란 글자가 남지 않습니다.
- 테두리는 2px 한 굵기라 굵기를 고르지 않고 색만 고릅니다.
- `surfaceClass(props)`가 같은 prop을 class 문자열로 돌려줍니다. 누르는 카드는 [Pressable](#pressable)에 이 class로 면만 빌려 줍니다(`Card motion`이 그렇게 조립됩니다). 칠한 판 위에 늘어놓으려면 Surface 안에 Stack · Inline · Grid를 넣습니다.

## Paint

2차 primitive, 요소의 칠입니다(Box + 색). accent(색) × variant(칠하는 방식) 두 축으로 글자 · 면 · 테두리를 칠합니다. accent를 갖는 primitive는 Paint 하나라, 안쪽 요소는 accent를 따로 주지 않으면 가장 가까운 Paint의 색을 씁니다. Badge · Notice · 상단 바 · 머리 막대가 이 위에 서고, Button은 Pressable(몸짓)에 이 칠을 얹은 것입니다. 아래는 드랍한 과목 줄을 plain으로 칠한 예입니다. 안쪽 버튼은 accent를 받지 않아 줄의 분홍을 따릅니다.

```tsx
<Paint accent="pink" variant="plain" padding="lg">
  <Text weight="black">일반물리학 · 드랍</Text>
  <Button size="sm">되돌리기</Button>
</Paint>
```

누르는 요소는 몸짓을 맡는 Pressable에 칠을 class로 얹습니다. 아래는 그림자 위에 떠 있다가 hover 때 가라앉는 버튼을 Button 없이 조립한 예입니다.

```tsx
<Pressable motion="press" paddingX="md" paddingY="xs" className={paintClass({ accent: "cyan", variant: "tonal", interactive: true })}>
  Preview
</Pressable>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `accent` | `Accent` | — | 색입니다. 이 요소를 칠하고 안쪽으로 흐릅니다. 주지 않으면 바깥 Paint의 색, 바깥에도 없으면 검정(시스템)입니다. |
| `variant` | `Variant` | `"outline"` | 칠하는 방식입니다. 11가지 레시피는 [Color](../foundations/color.md#variant)에 있습니다. |
| `selected` | `boolean` | `false` | 골라진 상태입니다. 같은 accent의 `solid`로 칠합니다. `aria-pressed` 같은 속성은 쓰는 쪽이 붙입니다. |
| `interactive` | `boolean` | `false` | 누르는 요소입니다. variant 표의 Hover 칸대로 hover · press 때 **색**(층 · 글자 · 테두리)만 바뀝니다. 커서 · 꺼진 모양 · 움직임은 [Pressable](#pressable)의 몫입니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 그림자와 가라앉는 몸짓은 Paint가 하지 않습니다. 그림자 위에 떠 있다가 가라앉는 버튼은 `Pressable motion="press"` + `paintClass()`이고, Button의 `shadow`가 이 조립을 대신 고릅니다.
- 테두리가 없는 variant(`ghost` · `ghostMuted`)는 가라앉을 상자가 없어서 그림자를 받지 않습니다. Button은 이 둘에 `shadow`를 줘도 `tap`으로 그립니다.
- 크기 · 글자 · 아이콘은 Paint가 정하지 않습니다. 그건 Button · Badge처럼 Paint 위에 선 컴포넌트의 몫입니다.
- `paintClass(props)`가 같은 prop을 class 문자열로 돌려줍니다. Pressable처럼 다른 2차 primitive에 칠을 얹을 때 씁니다.
- 위 층 컴포넌트는 Paint의 칠을 쓰면서 형태만 자기 CSS로 덮습니다. 상단 바 · 모달 머리 막대는 solid를 쓰고 테두리를 한쪽만 남깁니다.

## Pressable

2차 primitive, 누르는 몸짓입니다(Box + 몸짓). 커서 · 꺼진 모양 · 움직임 · 버튼의 의미(`type` · `disabled` · `aria-disabled`)를 맡고, 칠은 하지 않습니다. 흑백 면은 `surfaceClass()`, 색은 `paintClass()`로 얹습니다 — Button이 Pressable + Paint, 누르는 Card가 Pressable + Surface입니다. 아래는 과목 카드를 `lift`로 눌러 상세로 가게 한 예입니다.

```tsx
<Pressable motion="lift" padding="xl" className={surfaceClass({ border: "line" })} onClick={() => navigate("/courses/phys2")}>
  <Stack as="span" gap="xs">
    <Text variant="heading">일반물리학 II</Text>
    <Text variant="caption" tone="muted">김예시 선생님 · B201</Text>
  </Stack>
</Pressable>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"button"` | 렌더할 요소입니다. 링크면 `"a"`나 라우터 링크를 줍니다. |
| `motion` | `PressMotion` | `"press"` | `press`는 4px 그림자 위에서 가라앉고, `lift`는 떠오르고, `tap`은 그림자 없이 누르는 순간만 작아집니다. |
| `pressed` | `boolean` | `false` | `press` 몸짓이 눌린 채로 머뭅니다(골라진 버튼). 모양만 바꾸고, `aria-pressed` 같은 속성은 쓰는 쪽이 붙입니다. |
| `disabled` | `boolean` | `false` | `button`이면 `disabled` 속성이, 그 밖의 요소면 `aria-disabled`가 붙습니다. 불투명도 0.4에 `not-allowed` 커서이고 몸짓이 멈춥니다. |
| `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. 면은 여기로 얹습니다. |

- `press`는 hover 때 그림자 자리로 가라앉고(사람 카드 · 그림자를 켠 버튼) 누르는 순간 한 번 더 작아집니다. `lift`는 hover 때 4px 떠오르고 그림자가 화면에 남아 길어집니다(탐색 카드). `tap`은 그림자가 없는 버튼의 몸짓입니다. 거리와 시간은 [Motion](../foundations/motion.md)에 있습니다.
- 그림자는 몸짓의 일부라 `shadow` prop이 없습니다. `press` · `lift`가 그림자를 갖고, `tap`은 갖지 않습니다.
- 누르는 순간의 크기는 `--fk-press-scale`(기본 0.96)입니다. 큰 면은 자기 class에서 0.98로 덮습니다 — 400px 카드가 0.96이면 16px나 줄어들기 때문입니다. Card · PersonCard가 그렇게 합니다.
- 칠하지 않으므로 혼자 쓰면 브라우저 기본 버튼 모양(회색 면 · 테두리)이 남습니다. 면은 언제나 `surfaceClass()`나 `paintClass()`로 얹습니다.
- display와 폭은 태그 그대로입니다(`<button>`은 inline-block). 카드처럼 폭을 채우는 것은 쓰는 쪽이 정합니다 — [Card](../molecules/README.md#card)의 `motion`이 블록 · 폭 100% · 글자 정렬을 줍니다.
- 기본이 `<button type="button">`이라 안에는 글자 요소만 넣습니다(배치가 필요하면 `Stack as="span"`). 다른 button이나 링크를 넣지 않습니다.
- `pressClass(props)`가 `disabled`를 뺀 같은 prop을 class 문자열로 돌려줍니다.

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
