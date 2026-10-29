# Primitives

Primitives는 모양이 없는 바탕입니다. 면 · 배치 · 글자 · 아이콘 · 누르는 면 · 접근성 도구 아홉 개가 여기 있고, 토큰과 스타일(`tokens/` · `styles/`)만 읽습니다. 다른 컴포넌트에 기대지 않으며, Atoms부터 Components까지 모든 층이 이 아홉 개 위에 섭니다.

요소를 그리는 컴포넌트는 `as`로 렌더할 태그를 바꾸고, 나머지 props는 그 태그로 그대로 넘깁니다. 같은 이름의 HTML 속성이 있으면 컴포넌트의 prop이 우선하고, React 19라 `ref`도 일반 prop입니다. `accent` · `surface` · `border` · `shadow` · `Space` 같은 값 어휘는 닫힌 집합이며 [Box](#box)에 한 번에 정리했습니다. 예시는 import를 생략합니다. 컴포넌트는 `@studio-baeks/funky-ui`에서, 아이콘은 `lucide-react`에서 가져온 것이고, `navigate`나 `subjects`처럼 앱이 가진 값은 이미 있다고 봅니다.

| 묶음 | 컴포넌트 |
| --- | --- |
| layout | Box · Stack · Inline · Grid |
| content | Text · Icon |
| interaction | Pressable |
| a11y | VisuallyHidden · Portal |

## Box

면 · 테두리 · 그림자 · 여백 · accent를 prop으로 고르는 모든 면의 바탕입니다. 아래는 흰 카드 면과 accent로 칠한 연한 알림 면을 나란히 놓은 예입니다.

```tsx
<Box surface="raised" border="line" shadow="raised" padding="xl">
  이번 학기 시간표를 불러왔습니다
</Box>
<Box accent="pink" surface="soft" border="accent" paddingX="lg" paddingY="md">
  수강 변경 기간이 내일 끝납니다
</Box>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `accent` | `Accent` | — | 이 요소와 그 안으로 흐르는 accent입니다. 안쪽 컨트롤이 accent를 따로 받지 않으면 이 색을 씁니다. |
| `surface` | `Surface` | — | 면입니다. `solid` · `soft`는 지금 accent로 칠합니다. |
| `border` | `Border` | — | 2px 테두리의 색입니다. |
| `shadow` | `Shadow` | — | 하드 그림자입니다. |
| `padding` | `Space` | — | 사방 안쪽 여백입니다. |
| `paddingX` | `Space` | — | 좌우 안쪽 여백입니다. |
| `paddingY` | `Space` | — | 위아래 안쪽 여백입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

prop이 받는 값은 모두 닫힌 집합입니다.

| 어휘 | 값 |
| --- | --- |
| `Accent` | `black` `pink` `purple` `cyan` `yellow` `orange` `sky` `green` `red`, 역할 별칭 `system`(black) · `primary`(pink) · `secondary`(purple) · `success`(green) · `error`(red). 색 규칙은 [Color](../foundations/color.md) |
| `Surface` | `canvas`(크림 바탕) · `raised`(흰 면) · `sunken`(크림 위 오목한 자리) · `well`(흰 면 안의 오목한 자리, 반투명) · `inverse`(검정) · `solid`(accent의 진한 면) · `soft`(accent의 연한 면) |
| `Border` | `none` · `line`(검정) · `soft`(연한 회색) · `subtle`(카드 안 구분선 색) · `accent`(accent의 진한 색) |
| `Shadow` | `none` · `raised`(4px) · `floating`(8px) |
| `Space` | `0` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl` `5xl` `6xl` — 0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64px. 안쪽 여백과 형제 사이 간격이 같은 사다리를 씁니다. [Layout](../foundations/layout.md) |

- `inverse`와 `solid`는 글자색도 함께 정합니다. `inverse`는 흰 글자, `solid`는 그 accent의 `ink`(검정 또는 흰색)라서 검정 면 위에 검정 글자가 생기지 않습니다.
- 테두리는 2px 한 굵기라 굵기를 고르지 않고 색만 고릅니다. `floating`(8px)은 모달 전용이고, 떠 있는 나머지는 `raised`(4px)입니다.
- `boxClass(props)`가 같은 prop을 class 문자열로 바꿔 돌려줍니다. Stack · Inline · Grid와 molecule이 같은 지도를 씁니다.

## Stack

자식을 세로로 쌓는 flex 열입니다. Box의 prop을 그대로 받고 간격과 정렬을 더합니다. 아래는 카드 면 안에 제목과 보조 글자를 쌓은 예입니다.

```tsx
<Stack gap="lg" padding="xl" surface="raised" border="line">
  <Text variant="heading">오늘의 수업</Text>
  <Text tone="muted">3교시 · 일반물리학 II · B201</Text>
</Stack>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `accent` `surface` `border` `shadow` `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `gap` | `Space` | — | 자식 사이 간격입니다. |
| `align` | `Align` | — | 가로 정렬(`align-items`)입니다. `start` `center` `end` `stretch` `baseline`. 주지 않으면 flex 기본값인 `stretch`입니다. |
| `justify` | `Justify` | — | 세로 배분(`justify-content`)입니다. `start` `center` `end` `between` `around`. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- Stack · Inline · Grid는 `min-width: 0`이라 flex나 grid 안에서도 긴 글자가 부모를 밀어내지 않습니다. 말줄임은 안쪽 `Text`의 `truncate`가 맡습니다.
- `gap`은 형제 사이, `padding`은 안쪽 여백이고 둘이 같은 사다리를 씁니다. 같은 이름이면 같은 길이입니다.

## Inline

자식을 가로로 늘어놓는 flex 행입니다. 기본은 세로 가운데 정렬입니다. 아래는 제목과 학기를 양 끝에 두고, 그 아래에서 과목 이름을 줄바꿈하며 늘어놓은 예입니다.

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
| `accent` `surface` `border` `shadow` `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
| `gap` | `Space` | — | 자식 사이 간격입니다. |
| `align` | `Align` | `"center"` | 세로 정렬(`align-items`)입니다. |
| `justify` | `Justify` | — | 가로 배분(`justify-content`)입니다. |
| `wrap` | `boolean` | `false` | 자식이 넘치면 다음 줄로 넘깁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 한 줄에 다 들어가지 않을 수 있는 묶음(배지 줄, 버튼 줄)에는 `wrap`을 줍니다. 주지 않으면 줄바꿈 없이 한 줄을 유지합니다.

## Grid

격자입니다. 칸 수나 `grid-template-columns`를 직접 정합니다. 아래는 같은 폭 세 칸과, 칸 폭을 문자열로 준 두 번째 격자를 보여 줍니다.

```tsx
<Grid columns={3} gap="md">
  <Box surface="raised" border="line" padding="lg">월</Box>
  <Box surface="raised" border="line" padding="lg">화</Box>
  <Box surface="raised" border="line" padding="lg">수</Box>
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
| `accent` `surface` `border` `shadow` `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. |
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
| `tone` | `Tone` | — | 글자색입니다. `primary` `secondary` `muted` `faint` `inverse` `accent` `accentSoft` `inherit`. `accent`는 지금 accent의 진한 글자, `accentSoft`는 연한 글자입니다. |
| `family` | `"sans" \| "mono"` | — | 서체입니다. 코드나 식별자 같은 기술적 자리에만 `mono`를 씁니다. |
| `align` | `"start" \| "center" \| "end"` | — | 글자 정렬입니다. |
| `truncate` | `boolean` | `false` | 한 줄에서 자르고 …을 붙입니다. |
| `numeric` | `boolean` | `false` | 숫자 글리프만 같은 폭으로 맞춥니다(`tabular-nums`). 표와 시각에 씁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `overline`과 `subtitle`은 기본 잉크가 `muted`입니다. 정의 순서가 역할 → 굵기 → 잉크라서 `tone`과 `weight`로 그 기본값을 바꿀 수 있습니다.
- `faint`는 장식 · placeholder · 꺼진 자리 전용입니다. 대비가 AA에 못 미치므로 필수 정보에 쓰지 않습니다.
- 문서 구조는 `as`가, 생김새는 `variant`가 맡습니다. 제목 태그의 크기를 바꾸고 싶으면 태그를 바꾸지 말고 `variant`를 바꿉니다.

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
| `tone` | `Tone` | — | 글자색 사다리와 같습니다. 주지 않으면 주변 글자색(`currentColor`)을 따릅니다. |
| `label` | `string` | — | 뜻이 있는 아이콘이면 이름을 줍니다. 없으면 장식으로 숨깁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `label`이 있으면 `role="img"`와 `aria-label`이 붙고, 없으면 `aria-hidden`입니다. 글자와 함께 놓는 아이콘은 장식이므로 이름을 주지 않습니다.
- 블록(`display: block`)이고 줄어들지 않습니다(`flex-shrink: 0`). 글자 줄에 끼어도 줄 높이가 흔들리지 않습니다.
- 버튼 안의 아이콘은 `Button`의 `icon` · `iconEnd`로 넘깁니다. 크기와 굵기를 버튼 크기가 정하므로 호출부에서 `size`나 `strokeWidth`를 적지 않습니다.

## Pressable

버튼이 아닌 큰 면에 눌림이나 떠오름을 주는 누르는 면입니다. 아래는 과목 카드를 `lift`로 눌러서 상세로 가게 한 예입니다.

```tsx
<Pressable motion="lift" surface="raised" border="line" padding="xl" onClick={() => navigate("/courses/phys2")}>
  <Text variant="heading">일반물리학 II</Text>
  <Text variant="caption" tone="muted">김예시 선생님 · B201</Text>
</Pressable>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"button"` | 렌더할 요소입니다. 링크면 `"a"`를 줍니다. |
| `motion` | `PressMotion` | `"press"` | `press`는 가라앉고, `lift`는 떠오릅니다. |
| `disabled` | `boolean` | `false` | `button`이면 `disabled` 속성이, 그 밖의 요소면 `aria-disabled`가 붙습니다. 불투명도 0.4에 `not-allowed` 커서입니다. |
| `accent` `surface` `border` `padding` `paddingX` `paddingY` | [Box](#box)와 같음 | — | Box와 같은 prop입니다. `shadow`는 없습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `press`는 4px 그림자 위에 떠 있다가 hover 때 그림자 자리로 가라앉습니다(사람 카드). `lift`는 hover 때 4px 떠오르고 그림자는 화면에 그대로 남아 길어집니다(탐색 카드). 거리와 시간은 [Motion](../foundations/motion.md)에 있습니다.
- 그림자는 이 몸짓의 일부라 `shadow` prop이 없습니다.
- 폭 100%의 블록이고 기본이 `<button type="button">`입니다. 안에 다른 button이나 링크를 넣지 않습니다.

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
