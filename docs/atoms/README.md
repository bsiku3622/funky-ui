# Atoms

Atoms는 한 가지 일을 하는 컨트롤과 표시입니다. Primitives와 토큰 · 스타일만 읽고, 어떤 앱에도 쓸 수 있는 범용 층이라 class-explorer를 모릅니다. 누르는 버튼, 읽는 라벨, 입력 칸, 켜고 끄는 표식이 여기 있습니다.

Button · IconButton은 [Pressable](../primitives/README.md#pressable)(몸짓)에 [Paint](../primitives/README.md#paint)(칠)를 얹은 것이고, Badge는 Paint 위에 섭니다. 칠(accent × variant · selected)은 Paint가, 그림자와 눌림은 Pressable이 맡고, 이 셋은 크기 · 글자 · 아이콘만 얹습니다. `accent`는 색 이름(아홉 가지와 역할 별칭 다섯)이고, `variant`는 같은 accent를 어디에 얼마나 진하게 칠할지 정하는 열한 가지 규칙입니다. 색을 이 두 축으로만 고르는 이유는 [원칙](../get-started/principles.md), 값과 규칙은 [Color](../foundations/color.md), 크기 사다리는 [Shape](../foundations/shape.md)에 있습니다. 요소를 그리는 컴포넌트가 `as`와 나머지 props를 다루는 방식은 [Primitives](../primitives/README.md)와 같고, Input · Textarea · Select · Checkbox · Radio · Switch는 native 요소를 감싸므로 `ref`와 폼 속성이 그대로 갑니다. 예시는 import를 생략하며, `on`이나 `studentId`처럼 앱이 가진 상태와 핸들러는 이미 있다고 봅니다.

| 묶음 | 컴포넌트 |
| --- | --- |
| action | Button · IconButton · NavButton · Link |
| display | Badge · Spinner · Divider |
| input | Input · Textarea · Select · Checkbox · Radio · Switch · Label |

## Button

accent(색) × variant(칠하는 방식) × size × shadow로 만드는 기본 버튼입니다. 아래는 윤곽선 버튼, 선택 상태를 가진 버튼, 링크로 렌더한 버튼을 한 줄씩 보여 줍니다.

```tsx
<Button accent="green" variant="outline">유지</Button>
<Button variant="muted" selected={on}>전체</Button>
<Button as="a" href="/trade" accent="cyan" variant="tonal" shadow iconEnd={ArrowRight}>Trade</Button>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"button"` | 렌더할 요소입니다. `<button>`이면 `type="button"`이 기본이라 폼 안에서도 제출하지 않고, 제출 버튼은 `type="submit"`을 줍니다. 그 밖의 요소면 `disabled` 대신 `aria-disabled`가 붙습니다. |
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`(시스템)입니다. |
| `variant` | `Variant` | `"outline"` | 칠하는 방식입니다. `solid` `outline` `hairline` `frameline` `framelineMuted` `plain` `tonal` `tonalMuted` `muted` `ghost` `ghostMuted` 열한 가지입니다. |
| `size` | `ControlSize` | `"md"` | 높이 사다리입니다. `xs` 24 · `sm` 32 · `md` 40 · `lg` 48px. |
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄웁니다. hover 때 그림자 속으로 가라앉습니다(몸짓 `press`). 끄면 누르는 순간만 작아집니다(`tap`). |
| `selected` | `boolean` | — | 골라진 상태입니다. 같은 accent의 `solid`로 바뀌고 `aria-pressed`가 붙습니다. |
| `loading` | `boolean` | `false` | 글자 자리를 지킨 채 가운데에 스피너를 둡니다. `aria-busy` · `aria-disabled`가 붙고 누름을 삼킵니다. |
| `icon` | `IconComponent` | — | 앞 아이콘입니다. 크기와 굵기는 버튼 크기가 정합니다. |
| `iconEnd` | `IconComponent` | — | 뒤 아이콘입니다. |
| `fullWidth` | `boolean` | `false` | 폭을 100%로 늘립니다. |
| `disabled` | `boolean` | `false` | hover와 눌림이 꺼지고 불투명도 0.4가 됩니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 버튼 글자입니다. |

- 테두리가 없는 `ghost`와 `ghostMuted`는 가라앉을 상자가 없어 `shadow`를 줘도 그림자가 붙지 않습니다. `selected`로 `solid`가 되면 받습니다.
- 선택은 variant가 아니라 상태입니다. `selected`를 주면 같은 accent의 `solid`로 칠하므로 `variant`에는 안 골랐을 때의 모양만 적습니다(`muted` 학기 버튼이 골라지면 검정 블록이 됩니다). 그림자를 켠 버튼은 골라지면 눌린 채로 있습니다. `selected`를 아예 주지 않으면 `aria-pressed`도 붙지 않고, `false`를 주면 `aria-pressed="false"`가 붙습니다.
- `loading`은 글자를 투명하게 두고 스피너를 겹쳐서 폭이 흔들리지 않습니다. 불러오는 동안은 마우스 · Enter · Space 어느 누름도 `onClick`에 닿지 않습니다. `disabled`를 쓰지 않는 이유는 꺼진 모양(불투명도 0.4)이 아니라 스피너를 보여야 해서입니다.

Button은 Pressable과 Paint를 이렇게 묶습니다 — `shadow`를 켜면 `press`, 끄면 `tap`이고, 그림자를 켠 버튼이 골라지면 눌린 채(`pressed`)로 둡니다. 크기 · 아이콘 없이 같은 칠과 몸짓만 필요한 자리(예: 줄 전체가 누르는 링크)는 이 조립을 직접 씁니다 — `<Pressable as="a" motion="press" className={paintClass({ accent: "cyan", variant: "tonal", interactive: true })}>`. 누르지 않는 요소의 칠은 [Paint](../primitives/README.md#paint)입니다.

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
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄웁니다. |
| `selected` | `boolean` | — | 골라진 상태입니다. Button과 같습니다. |
| `disabled` | `boolean` | `false` | hover와 눌림이 꺼지고 불투명도 0.4가 됩니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `label`은 반드시 줍니다. 글자가 없는 버튼이라 `label`이 이름의 전부입니다. `title`로도 붙어서 마우스를 올리면 native 툴팁이 뜹니다.
- 기본 variant가 `ghostMuted`인 이유는 닫기 · 새로고침처럼 옆 내용을 방해하지 않는 자리가 가장 많기 때문입니다. `ghost` 계열은 테두리가 없어 `shadow`를 받지 않으니, 그림자가 필요하면 `variant`를 바꿉니다.

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
| `iconEnd` | `IconComponent` | — | 뒤 아이콘입니다. |
| `label` | `string` | — | 아이콘만 있을 때 스크린 리더가 읽을 이름입니다. |
| `selected` | `boolean` | — | 더 짙은 유리 면과 진한 테두리로 바뀌고 `aria-pressed`가 붙습니다. |
| `size` | `"sm" \| "md"` | `"sm"` | 높이 32 · 40px입니다. |
| `disabled` | `boolean` | `false` | 불투명도 0.4가 되고 반응하지 않습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 버튼 글자입니다. |

- 반투명 유리 면 · 진한 글자 · 반투명 테두리이고, hover 때 테두리가 진해집니다. 글자와 유리는 바의 글자색(`currentColor`)에서 나오므로, 보라 바 위에서는 흰 유리, 시안 바 위에서는 검은 유리가 됩니다. 상단 바 · 하단 바 · 학기 선택에만 쓰고, 흰 면 · 크림 위에서는 Button을 씁니다.
- `accent`와 `variant`가 없습니다. 색은 놓인 바가 정합니다.
- 몸짓은 [Pressable](../primitives/README.md#pressable)의 `tap`입니다. 바 위에는 그림자를 두지 않으므로 누르는 순간만 작아집니다.
- `children` 없이 `icon`만 주면 정사각 아이콘 버튼이 되고, 이때만 `label`이 `aria-label`로 붙습니다.

## Link

글 속 링크입니다. accent의 진한 글자에 2px 밑줄이 있고, hover 때 accent 면으로 뒤집힙니다. 아래는 문장 안에 링크를 끼운 예입니다.

```tsx
<Text>
  수집 항목은 <Link href="/privacy" accent="pink">개인정보처리방침</Link>에서 확인합니다.
</Text>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"a"` | 렌더할 요소입니다. 라우터 링크는 `as={RouterLink}`로 넘깁니다. |
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 글 속에 끼우는 링크입니다. 버튼처럼 보여야 하는 링크는 `Button`의 `as`로 렌더합니다.

## Badge

상태 · 개수 · 분류를 적는 작은 라벨입니다. 아래는 아이콘이 있는 상태 배지와 작은 분류 배지입니다.

```tsx
<Badge accent="green" variant="tonal" icon={Check}>수강 중</Badge>
<Badge variant="muted" size="sm">영어 강의</Badge>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"span"` | 렌더할 요소입니다. |
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `variant` | `Variant` | `"outline"` | 칠하는 방식입니다. Button과 같은 열한 가지 규칙입니다. |
| `size` | `BadgeSize` | `"md"` | `sm` 18 · `md` 22 · `lg` 26px입니다. |
| `icon` | `IconComponent` | — | 앞 아이콘입니다. 크기는 배지 크기가 정합니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 배지 글자입니다. |

- 읽는 물건이라 hover와 눌림에 반응하지 않습니다. 누르는 라벨이 필요하면 `size="xs"`의 Button을 씁니다.
- 높이가 컨트롤보다 낮습니다. 같은 줄의 글자보다 커지지 않게 합니다.
- 한 줄로 그려지고, `max-width: 100%`를 넘으면 말줄임으로 자릅니다.

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
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄웁니다. 폼의 주인공 칸에만 줍니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| 그 밖 | `<input>`의 props (`size` 제외) | — | `value` · `onChange` · `placeholder` · `ref` 같은 native 속성이 그대로 갑니다. |

- 흰 면 · 2px 검정 테두리 · 700 글자입니다. 값은 읽는 내용이라 버튼처럼 900 대문자가 아니고, placeholder는 `faint` 잉크입니다. 포커스는 전역 핑크 링이 맡습니다.
- `readOnly`면 면이 `well`로 한 단 내려앉고, `disabled`면 불투명도 0.4가 됩니다. 이 규칙은 `:read-only`가 아니라 `[readonly]` 속성에 겁니다 — `<select>`는 명세상 늘 `:read-only`라 Select가 항상 회색이 되기 때문입니다.

## Textarea

여러 줄 입력 칸입니다. Input과 같은 면을 씁니다. 아래는 후기를 받는 여섯 줄 칸입니다.

```tsx
<Textarea rows={6} placeholder="수업 후기를 남겨주세요" />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `size` | `ControlSize` | `"md"` | 안쪽 여백과 글자 크기를 정합니다. 높이는 정하지 않습니다. |
| `invalid` | `boolean` | `false` | 틀린 값입니다. 빨간 테두리와 `aria-invalid`가 붙습니다. |
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄웁니다. |
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
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄웁니다. |
| `className` | `string` | — | 바깥 `<span>`에 붙습니다. `<select>`에는 붙지 않습니다. |
| `children` | `ReactNode` | — | `<option>` 목록입니다. |
| 그 밖 | `<select>`의 props (`size` 제외) | — | `value` · `defaultValue` · `onChange` · `ref` 같은 native 속성이 `<select>`로 갑니다. |

- 폰에서 가장 잘 고르는 방법이라 목록을 직접 그리지 않고 native를 씁니다. 목록 안의 모양은 바꿀 수 없습니다.
- 화살표는 장식이라 누름을 `<select>`로 흘려보냅니다.

## Checkbox

켜고 끄는 상자입니다. 아래는 동의 문구가 붙은 초록 체크박스입니다.

```tsx
<Checkbox accent="green" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}>
  개인정보 수집에 동의합니다
</Checkbox>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `accent` | `Accent` | — | 켜진 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `children` | `ReactNode` | — | 옆에 붙는 글자입니다. 누르는 자리가 글자까지 넓어집니다. |
| `className` | `string` | — | 바깥 `<label>`에 붙습니다. |
| 그 밖 | `<input>`의 props (`type` 제외) | — | `checked` · `defaultChecked` · `onChange` · `disabled` · `name` · `value` · `ref` 같은 native 속성이 `<input>`으로 갑니다. |

- native input을 투명하게 표식 위에 겹쳐 두고, 보이는 상자는 형제 `<span>`이 그립니다. 폼 · 키보드 · 스크린 리더는 native가 맡고 생김새만 funky입니다.
- 켜지면 accent의 solid로 꽉 차고, 그 위 체크는 accent의 ink입니다. `disabled`면 라벨 전체가 불투명도 0.4가 됩니다.

## Radio

여럿 중 하나를 고르는 상자입니다. 아래는 같은 `name`으로 묶은 두 개입니다.

```tsx
<Radio name="action" value="keep" defaultChecked>유지</Radio>
<Radio name="action" value="drop" accent="pink">드랍</Radio>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `accent` | `Accent` | — | 켜진 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `children` | `ReactNode` | — | 옆에 붙는 글자입니다. 누르는 자리가 글자까지 넓어집니다. |
| `className` | `string` | — | 바깥 `<label>`에 붙습니다. |
| 그 밖 | `<input>`의 props (`type` 제외) | — | `name` · `value` · `checked` · `defaultChecked` · `onChange` · `ref` 같은 native 속성이 `<input>`으로 갑니다. |

- 둥근 라디오 단추를 쓰지 않습니다. 상자는 각진 채로 두고 켜지면 안에 accent 정사각형이 찍혀서, 상자 전체가 차고 체크가 서는 Checkbox와 모양으로 갈립니다.
- 묶음은 native 규칙대로 같은 `name`이 정합니다.

## Switch

켜고 끄는 스위치입니다. 아래는 알림을 켜고 끄는 분홍 스위치입니다.

```tsx
<Switch accent="pink" checked={notify} onChange={(e) => setNotify(e.target.checked)}>
  알림 받기
</Switch>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `accent` | `Accent` | — | 켜진 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `children` | `ReactNode` | — | 옆에 붙는 글자입니다. 누르는 자리가 글자까지 넓어집니다. |
| `className` | `string` | — | 바깥 `<label>`에 붙습니다. |
| 그 밖 | `<input>`의 props (`type` 제외) | — | `checked` · `defaultChecked` · `onChange` · `disabled` · `ref` 같은 native 속성이 `<input>`으로 갑니다. |

- native checkbox에 `role="switch"`를 붙인 것입니다. 각진 트랙 위를 각진 손잡이가 건너가고, 켜지면 트랙이 accent의 solid로 바뀝니다.

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
