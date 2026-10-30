# Atoms

Atoms는 한 가지 일을 하는 컨트롤과 표시입니다. Primitives와 토큰 · 스타일만 읽고, 어떤 앱에도 쓸 수 있는 범용 층이라 class-explorer를 모릅니다. 누르는 버튼, 읽는 라벨, 입력 칸, 켜고 끄는 표식이 여기 있습니다.

Button · IconButton은 [Pressable](../primitives/README.md#pressable)(누름)과 [Selectable](../primitives/README.md#selectable)(골라짐)에 [Paint](../primitives/README.md#paint)(칠)를 얹은 것이고, Badge는 Paint 위에 섭니다(NavButton은 Pressable과 Selectable에 [Glass](../primitives/README.md#glass)의 유리 칠을 얹은 것입니다). 색(accent × variant · selected · hover 색)은 Paint가, 누름(버튼의 의미 · 커서 · 그림자와 눌림)은 Pressable이, 골라짐(aria 하나와 커지기)은 Selectable이 맡고, Button · IconButton · Badge는 크기 · 글자 · 아이콘만 얹습니다. `accent`는 색 이름(아홉 가지와 역할 별칭 다섯)이고, `variant`는 같은 accent를 어디에 얼마나 진하게 칠할지 정하는 열다섯 가지 규칙입니다. 색을 이 두 축으로만 고르는 이유는 [원칙](../get-started/principles.md), 값과 규칙은 [Color](../foundations/color.md), 크기 사다리는 [Shape](../foundations/shape.md)에 있습니다. 요소를 그리는 컴포넌트가 `as`와 나머지 props를 다루는 방식은 [Primitives](../primitives/README.md)와 같고, Input · Textarea · Select · Checkbox · Radio · Switch는 native 요소를 감싸므로 `ref`와 폼 속성이 그대로 갑니다. 그중 Input · Textarea · Select는 면과 테두리를 [Surface](../primitives/README.md#surface)에서 빌리고, 틀림 · 경고 · 물러남 · 꺼짐 · 읽기 전용 · 그림자의 규칙을 `useField` 하나로 받습니다. 예시는 import를 생략하며, `on`이나 `studentId`처럼 앱이 가진 상태와 핸들러는 이미 있다고 봅니다.

| 묶음 | 컴포넌트 |
| --- | --- |
| action | Button · IconButton · NavButton · Link |
| display | Badge · Code · Swatch · Wordmark · Marquee · Spinner · Divider |
| input | Input · Textarea · Select · Checkbox · Radio · Switch · Label |

## Button

accent(색) × variant(칠하는 방식) × size × shadow로 만드는 기본 버튼입니다. 아래는 윤곽선 버튼, 선택 상태를 가진 버튼, 링크로 렌더한 버튼을 한 줄씩 보여 줍니다.

```tsx
<Button accent="green" variant="outline">유지</Button>
<Button variant="muted" selected={on}>전체</Button>
<Button as="a" href="/trade" accent="cyan" variant="solid" shadow iconEnd={ArrowRight}>Trade</Button>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"button"` | 렌더할 요소입니다. `<button>`이면 `type="button"`이 기본이라 폼 안에서도 제출하지 않고, 제출 버튼은 `type="submit"`을 줍니다. 그 밖의 요소면 `disabled` 대신 `aria-disabled`가 붙습니다. |
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`(시스템)입니다. |
| `variant` | `Variant` | `"outline"` | 칠하는 방식입니다. `filled` `outline` `hairline` `frameline` `framelineMuted` `plain` `solid` `solidMuted` `muted` `ghost` `ghostMuted` `paper` `tinted` `wash` `ghostTint` 열다섯 가지입니다. 크림 페이지 위에서 흰 면을 지켜야 하면 `paper`입니다. |
| `size` | `ControlSize` | `"md"` | 높이 사다리입니다. `xs` 24 · `sm` 32 · `md` 40 · `lg` 48px. |
| `shadow` | `boolean \| "hover" \| "shrink" \| "static"` | `false` | 4px 그림자입니다. `true`면 그림자 위에 떠 있다가 hover 때 가라앉고(`sink`), `"hover"`면 평평하다가 hover 때 제자리에서 그림자가 올라오고(`raise` — 복사 버튼 · 과목 추가 칩), `"shrink"`면 그림자를 둔 채 hover 때 95%, 누르면 92%로 작아집니다(`shrink` — Ask 단추 전용), `"static"`이면 그림자를 둔 채 움직이지 않습니다(`still` — 밖에서 이미 켜진 상태나 꺼진 칸). 끄면 누르는 순간만 작아집니다(`tap`). |
| `selected` | `boolean` | — | 골라진 상태입니다. 같은 accent의 `filled`로 칠하고, 그 사실을 aria 하나로 알립니다(어느 aria인지는 `role`이 정합니다). 골라지면 105%로 커져 그림자 위에 섭니다(`shadow`와 상관없습니다). |
| `role` | `AriaRole` | — | 요소의 `role`입니다. `selected`를 알리는 aria가 이걸로 정해집니다. 고르는 무리의 칸이면 `radio` · `tab`을 줍니다. |
| `loading` | `boolean` | `false` | 글자 자리를 지킨 채 가운데에 스피너를 둡니다. `aria-busy` · `aria-disabled`가 붙고 누름을 삼킵니다. |
| `icon` | `IconComponent` | — | 앞 아이콘입니다. 크기와 굵기는 버튼 크기가 정합니다. |
| `iconEnd` | `IconComponent` | — | 뒤 아이콘입니다. 버튼이 판을 열어 둔 동안(`aria-expanded="true"`) 180도 뒤집힙니다. |
| `iconSpin` | `boolean` | `false` | 앞 아이콘이 제자리에서 돕니다. 글자가 그대로 남는 새로고침에 씁니다. |
| `iconMotion` | `IconMotion` | — | 마우스를 올리면 아이콘만 움직입니다. `turn`은 -45도 돌고 `nudge`는 2px 밀립니다. 앞 아이콘에 걸리고, 앞 아이콘이 없으면 뒤 아이콘에 걸립니다. |
| `uppercase` | `boolean` | `true` | 라벨을 대문자로 그립니다. 소문자가 뜻인 라벨(이메일 도메인 · 브랜드 이름)이면 끄고, 이때 자간도 풀립니다. |
| `wrap` | `boolean` | `false` | 긴 문장 라벨을 줄바꿈합니다. 높이가 글자를 따라 늘어나고 글자는 가운데 정렬됩니다. |
| `fullWidth` | `boolean` | `false` | 폭을 100%로 늘립니다. |
| `disabled` | `boolean` | `false` | hover와 눌림이 꺼지고 불투명도 0.4가 됩니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 버튼 글자입니다. |

- 테두리가 없는 `ghost` · `ghostMuted` · `wash` · `ghostTint`는 가라앉을 상자가 없어 `shadow`를 줘도 그림자가 붙지 않습니다. `selected`로 `filled`가 되면 받습니다.
- 선택은 variant가 아니라 상태입니다. `selected`를 주면 같은 accent의 `filled`로 칠하므로 `variant`에는 안 골랐을 때의 모양만 적습니다(`muted` 학기 버튼이 골라지면 검정 블록이 됩니다).
- 골라진 버튼은 105%로 커져 이웃 위에 서고 4px 그림자 위에 섭니다. 쉴 때 그림자가 없던 버튼(`muted` 칩 · `shadow="hover"`)도 같습니다. hover 때는 그림자만 숨고(크기는 그대로) 누르면 100%로 돌아옵니다 — class-explorer의 골린 버튼 · 칩이 이렇게 움직입니다([Motion](../foundations/motion.md#커짐)). class-explorer의 색 버튼(급식 끼니 · 학과색)은 커지지 않았지만, funky에는 그런 런타임 색 버튼이 없어 이 예외를 두지 않았습니다.
- 골라짐은 aria 하나로 알리고, 어느 aria인지는 `role`이 정합니다. `role`이 없는 그냥 버튼은 `aria-pressed`(눌러서 켜는 토글), `radio` · `checkbox` · `switch`는 `aria-checked`, `tab` · `option`은 `aria-selected`입니다. 역할에 맞지 않는 aria를 겹쳐 붙이지 않으려는 것입니다. `selected`를 아예 주지 않으면 aria도 붙지 않고, `false`를 주면 `false`로 붙습니다.
- `role`을 준다고 방향키가 생기지는 않습니다. 줄 안에서 방향키로 옮기고 Tab에는 골라진 칸 하나만 들어오게 하는 일(roving tabindex)은 [SegmentedControl](../molecules/README.md#segmentedcontrol) · [Tabs](../molecules/README.md#tabs)가 [`useSelectableGroup`](../primitives/README.md#useselectablegroup)으로 붙입니다.
- `iconSpin`은 `loading`과 다릅니다. `loading`은 글자를 지우고 스피너를 얹지만, `iconSpin`은 글자와 앞 아이콘이 그대로 있고 아이콘만 돕니다. 누름은 막히지 않습니다.
- `loading`은 글자를 투명하게 두고 스피너를 겹쳐서 폭이 흔들리지 않습니다. 불러오는 동안은 마우스 · Enter · Space 어느 누름도 `onClick`에 닿지 않습니다. `disabled`를 쓰지 않는 이유는 꺼진 모양(불투명도 0.4)이 아니라 스피너를 보여야 해서입니다.

Button은 Pressable과 Selectable, Paint를 이렇게 묶습니다 — `shadow`를 켜면 `sink`, `"hover"`면 `raise`, `"shrink"`면 `shrink`, `"static"`이면 `still`, 끄면 `tap`이고, 골라진 버튼에는 Selectable의 `grow`를 얹습니다. `grow`가 몸짓을 덮으므로(특이도가 한 단 높습니다) 몸짓은 쉴 때의 것을 그대로 둡니다. 크기 · 아이콘 없이 같은 칠과 몸짓만 필요한 자리(예: 줄 전체가 누르는 링크)는 이 조립을 직접 씁니다 — `<Paint as={Pressable} motion="sink" accent="cyan" variant="solid" hoverable>`(링크면 Paint의 `as`가 이미 Pressable이라 `as="a"`를 줄 수 없으므로, Pressable 쪽에 칠을 class로 얹습니다 — `<Pressable as="a" motion="sink" className={paintClass({ … hoverable: true })}>`). 누르지 않는 요소의 칠은 [Paint](../primitives/README.md#paint)입니다.

## IconButton

아이콘 하나짜리 정사각 버튼입니다. 아래는 기본 모양의 새로고침 버튼과 작은 닫기 버튼입니다.

```tsx
<IconButton icon={RefreshCw} label="새로고침" />
<IconButton icon={X} label="닫기" size="sm" />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"button"` | 렌더할 요소입니다. Button과 같은 규칙입니다. |
| `icon` | `IconComponent` | 필수 | 그릴 아이콘입니다. |
| `label` | `string` | 필수 | 스크린 리더가 읽을 이름입니다. `aria-label`과 `title`로 붙습니다. |
| `accent` | `Accent` | — | 색입니다. Button과 같습니다. |
| `variant` | `Variant` | `"ghostMuted"` | 칠하는 방식입니다. |
| `size` | `ControlSize` | `"md"` | 정사각형이고, 한 변은 같은 `size`인 Button의 높이와 같습니다. |
| `shadow` | `boolean \| "hover" \| "shrink" \| "static"` | `false` | 4px 그림자입니다. Button과 같습니다 — `true`는 가라앉음, `"hover"`는 올라옴, `"shrink"`는 그림자를 둔 채 작아짐, `"static"`은 그림자를 둔 채 움직이지 않음입니다. |
| `selected` | `boolean` | — | 골라진 상태입니다. Button과 같습니다 — 같은 accent의 `filled` · aria 하나 · 골라지면 커집니다. |
| `role` | `AriaRole` | — | 요소의 `role`입니다. Button과 같습니다. |
| `iconSpin` | `boolean` | `false` | 아이콘이 제자리에서 돕니다. 불러오는 동안의 새로고침에 씁니다. |
| `iconMotion` | `IconMotion` | — | 마우스를 올리면 아이콘만 움직입니다. Button과 같습니다. |
| `disabled` | `boolean` | `false` | hover와 눌림이 꺼지고 불투명도 0.4가 됩니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `label`은 반드시 줍니다. 글자가 없는 버튼이라 `label`이 이름의 전부입니다. `title`로도 붙어서 마우스를 올리면 native 툴팁이 뜹니다.
- 기본 variant가 `ghostMuted`인 이유는 닫기 · 새로고침처럼 옆 내용을 방해하지 않는 자리가 가장 많기 때문입니다. `ghost` 계열은 테두리가 없어(`wash` · `ghostTint`도 같습니다) `shadow`를 받지 않으니, 그림자가 필요하면 `variant`를 바꿉니다.

## NavButton

어두운 바 위에서 쓰는 반투명 유리 버튼입니다. 아래는 아이콘만 있는 메뉴 버튼과, 글자 뒤에 아이콘이 붙은 학기 버튼입니다.

```tsx
<NavButton icon={MenuIcon} label="메뉴 열기" />
<NavButton iconEnd={ChevronDown}>2026-2</NavButton>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"button"` | 렌더할 요소입니다. |
| `icon` | `IconComponent` | — | 앞 아이콘입니다. |
| `iconEnd` | `IconComponent` | — | 뒤 아이콘입니다. 판을 열어 둔 동안(`aria-expanded="true"`) 180도 뒤집힙니다. |
| `label` | `string` | — | 아이콘만 있을 때 스크린 리더가 읽을 이름입니다. |
| `selected` | `boolean` | — | 더 짙은 유리 면과 진한 테두리로 바뀌고, 그 사실을 aria 하나로 알립니다(Button과 같이 `role`이 정합니다). |
| `role` | `AriaRole` | — | 요소의 `role`입니다. `selected`를 알리는 aria가 이걸로 정해집니다. |
| `size` | `"sm" \| "md"` | `"sm"` | 높이 32 · 40px입니다. |
| `disabled` | `boolean` | `false` | 불투명도 0.4가 되고 반응하지 않습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 버튼 글자입니다. |

- 반투명 흰 유리 면 · 진한 글자 · 반투명 흰 테두리이고, hover 때 테두리가 흰색으로 진해집니다. 유리는 어느 바 위에서도 흰색이고, 글자는 바의 글자색을 물려받습니다(AppBar · BottomNav의 보라 바 위에서는 흰 글자). 상단 바 · 하단 바 · 학기 선택에만 쓰고, 흰 면 · 크림 위에서는 Button을 씁니다.
- `accent`와 `variant`가 없습니다. 색은 놓인 바가 정합니다.
- [Pressable](../primitives/README.md#pressable)의 `tap`과 [Selectable](../primitives/README.md#selectable)의 골라짐에 [Glass](../primitives/README.md#glass)의 유리 칠(`hoverable`)을 얹은 버튼입니다. 바 위에는 그림자를 두지 않으므로 누르는 순간만 작아지고, 골라져도 커지지 않습니다 — 골라진 모양은 더 짙은 유리뿐입니다. 버튼이 아닌 자리에 같은 유리가 필요하면 Glass를 직접 씁니다.
- `children` 없이 `icon`만 주면 정사각 아이콘 버튼이 되고, 이때만 `label`이 `aria-label`로 붙습니다.

## Link

글 속 링크입니다. accent의 진한 글자에 2px 밑줄이 있고, hover 때 accent 면으로 뒤집힙니다. 아래는 문장 안에 링크를 끼운 예와, 목록 줄의 과목명을 조용한 링크로 그린 예입니다.

```tsx
<Text>
  수집 항목은 <Link href="/privacy" accent="pink">개인정보처리방침</Link>에서 확인합니다.
</Text>
<Text variant="subheading">
  <Link as={RouterLink} to="/subjects/phys2" underline="hover">일반물리학 II</Link>
</Text>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"a"` | 렌더할 요소입니다. 라우터 링크는 `as={RouterLink}`로 넘깁니다. |
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `underline` | `LinkUnderline` | `"always"` | `always`는 글 속 링크입니다. `hover`는 조용한 링크로, 글자색 · 굵기를 바깥에서 물려받고 hover 때만 밑줄이 생깁니다. `accent`를 주면 hover 때 그 색이 됩니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 글 속에 끼우는 링크입니다. 버튼처럼 보여야 하는 링크는 `Button`의 `as`로 렌더합니다.
- 어두운 면 위의 바닥글 링크는 `<Text tone="inverseMuted">` 안의 `underline="hover"`입니다.
- `underline="hover"`는 `as="button"`으로 그려도 버튼의 틀이 남지 않습니다. 이름을 누르면 거르는 자리에 씁니다.

## Badge

상태 · 개수 · 분류를 적는 작은 라벨입니다. 아래는 아이콘이 있는 상태 배지와 작은 분류 배지입니다.

```tsx
<Badge accent="green" variant="solid" icon={Check}>수강 중</Badge>
<Badge variant="muted" size="sm">영어 강의</Badge>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"span"` | 렌더할 요소입니다. |
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `variant` | `Variant` | `"outline"` | 칠하는 방식입니다. Button과 같은 열다섯 가지 규칙입니다. 색 머리줄 위의 흰 배지는 `paper`입니다. |
| `size` | `BadgeSize` | `"md"` | `sm` 18 · `md` 22 · `lg` 26px입니다. |
| `icon` | `IconComponent` | — | 앞 아이콘입니다. 크기는 배지 크기가 정합니다. |
| `wrap` | `boolean` | `false` | 줄바꿈을 허용합니다. 길이가 정해지지 않은 글자(거절 사유)는 잘리는 대신 줄바꿈되고, 높이가 글자를 따라 늘어납니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 배지 글자입니다. |

- 읽는 물건이라 hover와 눌림에 반응하지 않습니다. 누르는 라벨이 필요하면 `size="xs"`의 Button을 씁니다.
- 높이가 컨트롤보다 낮습니다. 같은 줄의 글자보다 커지지 않게 합니다.
- 기본은 한 줄로 그려지고, `max-width: 100%`를 넘으면 말줄임으로 자릅니다. 글자 길이를 모르는 자리에는 `wrap`을 줍니다.

## Code

문장 속 코드 칩입니다. 검정 면에 흰 900 글자이고, 대소문자를 그대로 둡니다. 아래는 검색식을 안내 문장에 끼운 예입니다.

```tsx
<Text as="p" leading="relaxed">
  학번으로 찾으려면 <Code>student:25-001</Code>을 검색창에 적습니다.
</Text>
```

`<code>` 요소이고 나머지 props는 그대로 갑니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 칩 글자입니다. |

- 줄이 바뀌면 칩도 같이 줄을 바꾸고, 줄마다 좌우 여백을 유지합니다.
- 상태를 적는 라벨은 Badge입니다. Badge는 대문자 · 한 줄 고정이라 `student:25-001`이 `STUDENT:25-001`로 보이고 좁은 폭에서 잘립니다.
- 서체는 mono가 아니라 본문 서체입니다. class-explorer의 칩이 그렇습니다.

## Swatch

색 하나로 묶음을 알리는 점과 띠입니다. 아래는 달력 분류의 점과, 일정 목록의 왼쪽 띠입니다.

```tsx
<Inline gap="md">
  <Swatch accent="pink" />
  <Text variant="caption" weight="black">휴일</Text>
</Inline>
<Inline gap="md">
  <Swatch accent="purple" shape="rail" />
  <Stack gap="2xs">
    <Text weight="black">기말고사</Text>
    <Text variant="caption" tone="muted">12월 9일 ~ 12월 13일</Text>
  </Stack>
</Inline>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `shape` | `SwatchShape` | `"dot"` | `dot`은 8px 네모 점(분류), `round`는 8px 둥근 점(상태), `rail`은 4px 왼쪽 띠입니다. |
| `rung` | `SwatchRung` | `"solid"` | accent 사다리의 어느 칸으로 칠할지 고릅니다. `solid` `softInk` `soft`. |
| `pulse` | `boolean` | `false` | 2초 주기로 깜빡입니다. 연결이 살아 있다는 표시처럼 지금 진행 중인 상태 점에 씁니다. 움직임을 줄인 사람에게는 한 번으로 끝납니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 회색 분류는 검정 사다리의 두 칸입니다 — `accent="black" rung="softInk"`(class-explorer의 `bg-black/50`), `rung="soft"`(`bg-black/25`).
- `rail`은 flex 줄 안에서 줄의 높이를 채웁니다. flex 밖에서는 높이가 없어 보이지 않습니다.
- `aria-hidden`이 붙어 스크린 리더에게 읽히지 않습니다. 뜻은 옆 글자가 말해야 합니다.
- 실행 중에 정해지는 색의 범례는 [ToneSwatch](../components/README.md#toneswatch)입니다.

## Wordmark

로고 글자입니다. 기울어진 900 대문자이고, 색은 바깥 글자색을 물려받습니다. 아래는 로그인 화면의 제목과, 누르면 홈으로 가는 로고입니다.

```tsx
<Wordmark as="h1" size="lg">Class Explorer</Wordmark>
<Wordmark onClick={() => navigate("/")}>Class Explorer</Wordmark>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"span"` | 렌더할 요소입니다. 주지 않고 `onClick`만 주면 `<button>`입니다. |
| `size` | `WordmarkSize` | `"md"` | `sm` 20 · `md` 24 · `lg` 36px입니다. |
| `onClick` | `MouseEventHandler` | — | 주면 hover 때 105%로 커지고 누르면 작아집니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- [AppBar](../components/README.md#appbar)의 로고가 이것입니다. 랜딩의 큰 제목은 로고가 아니라 [Text](../primitives/README.md#text)의 `hero` 역할입니다.

## Marquee

한 줄이 자리에 안 들어갈 때 `…`로 자르는 대신 좌우로 훑고 돌아오는 글자 상자입니다. 문장 전체가 곧 내용인 배너에 씁니다. 아래는 폭이 정해진 알림 띠 안에 긴 안내를 넣은 예입니다.

```tsx
<Notice accent="yellow" variant="solid">
  <Marquee>2026-2학기 수강 변경 신청이 10월 31일 18시에 마감됩니다</Marquee>
</Notice>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `className` | `string` | — | 바깥 상자에 붙는 class입니다. |
| `children` | `ReactNode` | — | 한 줄로 그릴 내용입니다. |

- 폭은 바깥이 정합니다. 상자는 `overflow: hidden`이고 줄바꿈하지 않으며, 안쪽 내용이 상자보다 4px를 넘게 넘칠 때만 움직입니다. 그보다 작은 차이는 반올림 오차로 보고 가만히 둡니다.
- 속도는 초당 45px로 거리와 상관없이 일정하고, 왕복 시간의 30%는 양 끝에서 멈춰 읽을 틈이 됩니다. 아주 조금 넘칠 때도 한 왕복이 6초보다 짧아지지 않습니다.
- 폭이 바뀌면 다시 재고, 움직임을 줄인 사람(`prefers-reduced-motion`)에게는 넘쳐도 움직이지 않습니다.
- 줄바꿈이 맞는 글자는 Marquee가 아니라 `wrap`을 받는 [Badge](#badge) · [Button](#button)이나 Notice의 `wrap`을 씁니다.

## Spinner

도는 고리입니다. 아래는 기본 스피너와, 이름을 상황에 맞게 바꾼 큰 스피너입니다.

```tsx
<Spinner />
<Spinner size="lg" label="시간표를 불러오는 중" />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 14 · 18 · 24px입니다. |
| `label` | `string` | `"불러오는 중"` | 스크린 리더가 읽을 이름입니다. `role="status"`로 읽힙니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 옅은 링 위에 한 조각만 진해서 회전이 읽힙니다. 색은 글자색(`currentColor`)을 따릅니다.
- 직각이 기본인 시스템에서 원이어야 뜻이 서는 몇 안 되는 자리라 모서리를 `full`로 둡니다. 회전 애니메이션 이름(`fk-spin`)이 고정이라 앱도 같은 회전을 쓸 수 있습니다.
- Button의 `loading`이 이 스피너를 씁니다(`lg` 버튼은 `md`, 나머지는 `sm`).

## Divider

구분선입니다. 아래는 카드 안을 나누는 가로선과, 한 줄 안의 세로선입니다.

```tsx
<Divider />
<Inline gap="md">
  <Text>월</Text>
  <Divider orientation="vertical" tone="line" />
  <Text>화</Text>
</Inline>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `tone` | `"subtle" \| "soft" \| "line"` | `"subtle"` | 선 색입니다. `subtle`은 카드 안 구분선, `soft`는 연한 회색, `line`은 2px 검정입니다. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | 방향입니다. `role="separator"`와 `aria-orientation`이 붙습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 카드 안에 카드를 넣지 말고 이걸로 나눕니다.
- 세로선은 `align-self: stretch`라 flex 행 안에서 줄 높이만큼 늘어납니다. 부모가 `Inline` 같은 가로 flex여야 보입니다.

## Input

한 줄 입력 칸입니다. native `<input>`에 ref와 폼 속성이 그대로 갑니다. 아래는 기본 칸과, 값이 틀렸을 때의 그림자 칸입니다.

```tsx
<Input placeholder="학번을 입력하세요" />
<Input value={studentId} onChange={(e) => setStudentId(e.target.value)} invalid shadow />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `size` | `ControlSize` | `"md"` | 높이 사다리입니다. 같은 크기의 Button과 같은 높이입니다. |
| `invalid` | `boolean` | `false` | 틀린 값입니다. 빨간 테두리와 `aria-invalid`가 붙습니다. |
| `warning` | `boolean` | `false` | 막지 않는 경고입니다. 주황 테두리만 켜고 `aria-invalid`는 붙이지 않습니다. 값은 받되 한 번 더 보라는 뜻입니다. |
| `quiet` | `boolean` | `false` | 비어 있거나 해당 없는 칸입니다. 옅은 테두리 · 약한 글자로 물러나 있다가 hover 때 테두리가 진해집니다. |
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄웁니다. 폼의 주인공 칸에만 줍니다. 포커스를 받으면 그림자를 거둡니다. |
| `bare` | `boolean` | `false` | 줄 안에서 치는 칸입니다. 면 · 테두리 · 높이를 모두 빼고 글자를 바깥 것으로 씁니다. 표 칸의 숫자 · 글자 입력에 씁니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| 그 밖 | `<input>`의 props (`size` 제외) | — | `value` · `onChange` · `placeholder` · `ref` 같은 native 속성이 그대로 갑니다. |

- 면과 테두리(흰 면 · 2px 검정)는 [Surface](../primitives/README.md#surface)에서 빌립니다. 글자는 700이고 늘 본문 잉크입니다 — 면이 늘 흰색이라, 보라 바나 검정 면 안에 놓여도 바깥 글자색을 물려받지 않습니다. 값은 읽는 내용이라 버튼처럼 900 대문자가 아니고, placeholder는 `faint` 잉크입니다. 포커스는 전역 핑크 링이 맡습니다.
- `readOnly`면 면이 `well`로 한 단 내려앉고, `disabled`면 불투명도 0.4가 됩니다. 이 규칙은 `:read-only`가 아니라 `[readonly]` 속성에 겁니다 — `<select>`는 명세상 늘 `:read-only`라 Select가 항상 회색이 되기 때문입니다.
- `shadow`의 규칙은 하나입니다. 쉴 때는 4px 그림자 위에 떠 있고, 포커스를 받으면 그림자를 거두고, Tab으로 왔으면 그 자리를 핑크 링이 채웁니다. 그림자를 거두는 선택자는 `:focus-visible`입니다. 글자 칸은 마우스로 눌러도 이 선택자에 걸려서 링 없이 내려앉고, 마우스로 연 select는 그대로 떠 있습니다. 반대 규칙(평평하다가 포커스에 그림자가 생김)은 두지 않습니다. class-explorer에는 두 규칙이 섞여 있었고, 그 앱 스스로 '포커스 규칙이 서로 반대'를 시스템의 빈칸으로 짚었습니다. 거두는 쪽이 다수여서 이쪽으로 모았습니다. 어느 화면이 어느 쪽이었는지는 [이관표](../class-explorer/migration.md)에 있습니다.
- `warning`과 `invalid`는 같이 주지 않습니다. 같은 칸에 둘 다 있으면 테두리는 나중에 선언된 주황이 이기지만 `aria-invalid`는 그대로 남습니다. [FormField](../molecules/README.md#formfield)는 `error`가 있으면 `warning`을 끄고 `error`를 앞세워 이 충돌을 피합니다.
- `bare`는 `invalid`의 `aria-invalid`만 남깁니다. `warning` · `quiet` · `shadow`는 그리지 않고, 숫자 칸의 위아래 단추도 숨깁니다. 칸의 모양은 둘러싼 표 칸이 정합니다.
- Input · Textarea · Select의 속은 `useField({ invalid, warning, quiet, shadow })` 하나입니다. 돌려주는 `fieldProps`(`aria-invalid` · `data-warning` · `data-quiet`와 `className`)를 입력 요소에 펼치면 같은 면과 상태가 붙고, 칸의 크기(높이 · 안쪽 여백)는 쓰는 쪽이 붙입니다. 틀림 · 경고 · 물러남 · 꺼짐 · 읽기 전용 · 그림자의 규칙이 한 곳에 있어서 세 칸이 같이 움직입니다. 입력 타입은 `FieldStateProps`(`invalid` · `warning` · `quiet` · `shadow`)입니다.

## Textarea

여러 줄 입력 칸입니다. Input과 같은 면을 씁니다. 아래는 후기를 받는 여섯 줄 칸입니다.

```tsx
<Textarea rows={6} placeholder="수업 후기를 남겨주세요" />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `size` | `ControlSize` | `"md"` | 안쪽 여백과 글자 크기를 정합니다. 높이는 정하지 않습니다. |
| `invalid` | `boolean` | `false` | 틀린 값입니다. 빨간 테두리와 `aria-invalid`가 붙습니다. |
| `warning` | `boolean` | `false` | 막지 않는 경고입니다. 주황 테두리입니다. Input과 같습니다. |
| `quiet` | `boolean` | `false` | 비어 있거나 해당 없는 칸입니다. 옅은 테두리 · 약한 글자입니다. Input과 같습니다. |
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄우고, 포커스를 받으면 거둡니다. Input과 같습니다. |
| `rows` | `number` | `4` | 처음 보이는 줄 수입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| 그 밖 | `<textarea>`의 props | — | `value` · `onChange` · `placeholder` · `ref` 같은 native 속성이 그대로 갑니다. |

- 세로로만 늘어납니다(`resize: vertical`). 높이는 `size`가 아니라 `rows`가 정합니다.

## Select

native `<select>`를 감싼 선택 칸입니다. 목록은 운영체제가 그립니다. 아래는 학기를 고르는 칸입니다.

```tsx
<Select aria-label="학기" defaultValue="2026-2">
  <option value="2026-1">2026-1</option>
  <option value="2026-2">2026-2</option>
</Select>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `size` | `ControlSize` | `"md"` | 높이 사다리입니다. 같은 크기의 Button과 같은 높이입니다. |
| `invalid` | `boolean` | `false` | 틀린 값입니다. 빨간 테두리와 `aria-invalid`가 붙습니다. |
| `warning` | `boolean` | `false` | 막지 않는 경고입니다. 주황 테두리입니다. Input과 같습니다. |
| `quiet` | `boolean` | `false` | 비어 있거나 해당 없는 칸입니다. 옅은 테두리 · 약한 글자입니다. Input과 같습니다. |
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄우고, 포커스를 받으면 거둡니다. Input과 같습니다. |
| `className` | `string` | — | 바깥 `<span>`에 붙습니다. `<select>`에는 붙지 않습니다. |
| `children` | `ReactNode` | — | `<option>` 목록입니다. |
| 그 밖 | `<select>`의 props (`size` 제외) | — | `value` · `defaultValue` · `onChange` · `ref` 같은 native 속성이 `<select>`로 갑니다. |

- 폰에서 가장 잘 고르는 방법이라 목록을 직접 그리지 않고 native를 씁니다. 목록 안의 모양은 바꿀 수 없습니다.
- 화살표는 장식이라 누름을 `<select>`로 흘려보냅니다.

## Checkbox

켜고 끄는 상자입니다. 아래는 동의 문구가 붙은 체크박스입니다.

```tsx
<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)}>
  개인정보 수집에 동의합니다
</Checkbox>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | 옆에 붙는 글자입니다. 누르는 자리가 글자까지 넓어집니다. |
| `className` | `string` | — | 바깥 `<label>`에 붙습니다. |
| 그 밖 | `<input>`의 props (`type` 제외) | — | `checked` · `defaultChecked` · `onChange` · `disabled` · `name` · `value` · `ref` 같은 native 속성이 `<input>`으로 갑니다. |

- native input을 투명하게 표식 위에 겹쳐 두고, 보이는 상자는 형제 `<span>`이 그립니다. 폼 · 키보드 · 스크린 리더는 native가 맡고 생김새만 funky입니다.
- accent를 고르지 않습니다. 켜지면 검정으로 꽉 차고 그 위 체크는 흰색이며, 색이 있는 Paint 안에서는 다른 요소처럼 그 색을 따릅니다. `disabled`면 라벨 전체가 불투명도 0.4가 됩니다.

## Radio

여럿 중 하나를 고르는 상자입니다. 아래는 같은 `name`으로 묶은 두 개입니다.

```tsx
<Radio name="action" value="keep" defaultChecked>유지</Radio>
<Radio name="action" value="drop">드랍</Radio>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | 옆에 붙는 글자입니다. 누르는 자리가 글자까지 넓어집니다. |
| `className` | `string` | — | 바깥 `<label>`에 붙습니다. |
| 그 밖 | `<input>`의 props (`type` 제외) | — | `name` · `value` · `checked` · `defaultChecked` · `onChange` · `ref` 같은 native 속성이 `<input>`으로 갑니다. |

- 둥근 라디오 단추를 쓰지 않습니다. 상자는 각진 채로 두고 켜지면 안에 정사각형이 찍혀서, 상자 전체가 차고 체크가 서는 Checkbox와 모양으로 갈립니다.
- 묶음은 native 규칙대로 같은 `name`이 정합니다.

## Switch

켜고 끄는 스위치입니다. 아래는 알림을 켜고 끄는 스위치입니다.

```tsx
<Switch checked={notify} onChange={(e) => setNotify(e.target.checked)}>
  알림 받기
</Switch>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | 옆에 붙는 글자입니다. 누르는 자리가 글자까지 넓어집니다. |
| `className` | `string` | — | 바깥 `<label>`에 붙습니다. |
| 그 밖 | `<input>`의 props (`type` 제외) | — | `checked` · `defaultChecked` · `onChange` · `disabled` · `ref` 같은 native 속성이 `<input>`으로 갑니다. |

- native checkbox에 `role="switch"`를 붙인 것입니다. 각진 트랙 위를 각진 손잡이가 건너가고, 켜지면 트랙이 검정(색이 있는 Paint 안에서는 그 색)으로 바뀝니다.

## Label

폼 칸의 이름표입니다. overline 글자(10px · 900 · 대문자 · 약한 잉크)로 그립니다. 아래는 필수 칸의 이름표를 입력 칸에 연결한 예입니다.

```tsx
<Label htmlFor="student-id" required>학번</Label>
<Input id="student-id" required />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `required` | `boolean` | `false` | 이름 뒤에 빨간 `*`를 붙입니다. |
| 그 밖 | `<label>`의 props | — | `htmlFor` · `className` · `children` · `ref` 같은 native 속성이 그대로 갑니다. |

- `required`는 별표만 그리며 스크린 리더에는 숨겨집니다. 입력 칸의 `required`는 따로 줍니다. [FormField](../molecules/README.md#formfield)는 별표와 입력의 `required`를 함께 붙입니다.
