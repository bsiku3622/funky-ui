# Molecules

Molecules는 Atoms와 Primitives를 묶은 범용 조합입니다. 카드 · 선택 줄 · 떠 있는 판 · 폼 칸 · 숫자 · 알림처럼 한 번 만들어 두면 어느 앱에서나 쓰는 덩어리이고, class-explorer를 모르므로 학과나 학번 같은 앱 지식은 여기 없습니다. 같은 층 안에서는 `Card`만 다시 씁니다(PageHeader와 Accordion이 Card 위에 섭니다).

`SegmentedControl`과 `Tabs`는 같은 버튼 무리이고 뜻만 다릅니다(값 고르기와 화면 바꾸기). 둘 다 방향키와 Tab 순서를 [`useSelectableGroup`](../primitives/README.md#useselectablegroup) 하나로 받고, `Menu`도 같은 훅 위에 섭니다. `Tooltip` · `Popover` · `Menu`는 [Floating](../primitives/README.md#floating) 위에 서서 body 끝(Portal)에 그려지므로 카드의 `overflow`에 잘리지 않고, `Modal` 안에서 열면 그 `<dialog>` 안에 그려집니다. `Modal`은 native `<dialog>`의 top layer에 올라 z-index를 고르지 않습니다. `accent` · `variant` · `size` · `shadow`는 [Atoms](../atoms/README.md)와 같은 뜻입니다. 예시는 import를 생략하며, `term`이나 `setTerm`처럼 앱이 가진 상태와 핸들러는 이미 있다고 봅니다.

새로 나타나는 판은 등장 몸짓을 하나씩 가집니다 — 메뉴 · 툴팁 · 팝오버는 4px 아래에서 올라오고(`rise`, 100ms), 모달은 8px 아래에서 올라오며(`pop`, 200ms), 펼친 아코디언 본문은 제자리에서 나타납니다(`fade`, 300ms). 앱이 만든 작은 창과 화면을 덮는 판에는 `panel` · `sheet`가 따로 있습니다([Floating](../primitives/README.md#floating)의 `enter`). 퇴장 모션은 없습니다. 닫는 모션을 보이려면 판을 그만큼 더 들고 있어야 하는데, 그사이 한 번 더 누르면 판 뒤의 화면이 눌리기 때문입니다. 거리와 시간은 `ENTER` 토큰이 정하고([Motion](../foundations/motion.md#등장)), 움직임을 줄인 사람에게는 이동 없이 곧바로 나타납니다.

| 묶음 | 컴포넌트 |
| --- | --- |
| surface | Card · SectionTitle · PageHeader · Accordion |
| choice | SegmentedControl · Tabs · Menu |
| overlay | Modal · Drawer · Tooltip · Popover |
| form | SearchField · FormField · FileDrop |
| data | Stat · Meter · Table |
| feedback | Notice · Busy · EmptyState |

## Card

화면의 영역을 나누는 카드입니다. [Surface](../primitives/README.md#surface)(흰 면 · 2px 검정 테두리 · 4px 그림자) 위에 서고, 테두리는 항상 `line`이라 prop이 없습니다. 아래는 글자만 담은 카드와, 머리 막대와 구분선으로 나눈 카드입니다.

```tsx
<Card>
  <Text variant="heading">이번 주 시간표</Text>
</Card>
<Card padding="0">
  <Card.Header title="Enrolled Classes" icon={BookOpen} tone="bar" accent="purple" actions={<Badge variant="solid" size="sm">6</Badge>} />
  <Card.Section>일반물리학 II · 미적분학 II</Card.Section>
  <Card.Section divided>알고리즘 · 전공 연구</Card.Section>
</Card>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. `motion`을 주면 기본이 `"button"`입니다. |
| `fill` | `SurfaceFill`(`none` · `brand` 제외) | `"raised"` | 흑백 면입니다. 기본은 흰 면이고, 카드는 면이 있는 박스라 `none`은 받지 않습니다. 앱의 뼈대인 보라 `brand`(상단 바 · 하단 바의 면)도 받지 않습니다. accent로 칠한 박스가 필요하면 Card가 아니라 [Paint](../primitives/README.md#paint)입니다. |
| `shadow` | `"raised" \| "none"` | `"raised"` | 그림자입니다. 모달이 아니면 `floating`을 쓰지 않으므로 선택지가 둘뿐입니다. `motion`을 주면 무시됩니다. |
| `padding` | `Space` | `"3xl"` | 안쪽 여백입니다(24px). 머리 막대를 붙이려면 `0`을 줍니다. |
| `motion` | `PressMotion` | — | 카드 전체가 누르는 물건이면 `sink`(가라앉음) · `lift`(떠오름) · `raise`(그림자가 올라옴)를 줍니다. `none`은 누르지만 움직이지 않습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 카드 내용입니다. |

- 화면의 영역은 카드로 나눕니다. 카드 안을 나눌 때는 카드를 또 넣지 말고 `Card.Section`의 `divided`나 [Divider](../atoms/README.md#divider)를 씁니다.
- Card에는 `accent`가 없습니다. 흑백 박스라 색을 모르고, 바깥 Paint의 색도 끊지 않고 그대로 흘려보냅니다. 안쪽 버튼 · 배지가 같은 색을 따라야 하면 컨트롤마다 `accent`를 주고, 색이 있는 박스가 맞는 자리라면 Card 대신 [Paint](../primitives/README.md#paint)로 칠합니다.
- `motion`을 주면 [Pressable](../primitives/README.md#pressable)로 그려져 기본 요소가 `<button>`이 되고(링크 카드는 `as="a"`) 그림자는 몸짓이 가집니다. 면과 테두리는 `surfaceClass()`로 Surface에서 빌려 오고, 카드는 블록 · 폭 100%로 서며 큰 면이라 누르는 순간 0.98로만 작아집니다. 통째로 누르는 요소라 안에 다른 button이나 링크를 넣지 않습니다.

### Card.Header

카드 머리입니다. 섹션 소제목 글자(`subtitle`)와 오른쪽 끝 자리를 가집니다. 아래는 이름표와 설명이 붙은 두 줄 머리입니다.

```tsx
<Card padding="0">
  <Card.Header eyebrow="Syllabus" title="미적분학 II 영어강의" description="2026-2 · 월 3–4교시" titleStyle="heading" />
  <Card.Section divided>…</Card.Section>
</Card>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | 필수 | 제목 글자입니다. |
| `eyebrow` | `ReactNode` | — | 제목 위의 작은 이름표(`overline`)입니다. 주면 두 줄 머리가 되어 제목이 줄바꿈됩니다. |
| `description` | `ReactNode` | — | 제목 아래 설명(`caption`)입니다. 주면 두 줄 머리가 되어 제목이 줄바꿈됩니다. |
| `titleStyle` | `"subtitle" \| "heading"` | `"subtitle"` | 제목의 글자입니다. `subtitle`은 대문자 14px 한 줄이고, `heading`은 대소문자를 그대로 둔 20px이며 줄바꿈됩니다. |
| `icon` | `IconComponent` | — | 제목 앞 아이콘입니다. |
| `actions` | `ReactNode` | — | 오른쪽 끝입니다. 개수나 버튼을 둡니다. |
| `tone` | `"plain" \| "bar"` | `"plain"` | `bar`는 Paint의 `filled`로 칠한 머리 막대입니다(모달 머리와 같은 모양). |
| `accent` | `Accent` | — | 머리 막대의 색입니다(`tone="bar"`일 때). 주지 않으면 바깥 Paint의 색, 바깥에도 없으면 검정입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `eyebrow` · `description` · `titleStyle="heading"` 중 하나라도 있으면 제목이 `truncate` 없이 줄바꿈되는 쌓인 머리가 됩니다. 아무것도 없는 기본 머리는 한 줄에서 자릅니다. `tone="bar"`에서는 세 줄 모두 막대의 글자색을 물려받습니다.
- `bar`는 [Paint](../primitives/README.md#paint)의 `filled`(accent 면 · `ink` 글자)이고, 테두리만 아래 2px 검정 한 줄로 덮습니다. 막대가 카드 가장자리까지 닿도록 `Card`에 `padding="0"`을 주고 나머지는 `Card.Section`으로 나눕니다. 막대 위의 filled 배지는 accent를 따로 줍니다 — 안 주면 막대와 같은 색이 됩니다.

### Card.Section

카드 안의 한 구역입니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `divided` | `boolean` | `false` | 위에 카드 안 구분선(`subtle`)을 긋습니다. |
| `padding` | `Space` | `"3xl"` | 안쪽 여백입니다(24px). |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 구역 내용입니다. |

### Card.Strip

카드 아래 또는 위 끝에 붙는 전폭 색 띠입니다. 상태를 한 줄로 알릴 때 씁니다. 아래는 거절 사유를 카드 바닥에 붙인 예입니다.

```tsx
<Card padding="0">
  <Card.Section>교과 외 활동 증빙 자료</Card.Section>
  <Card.Strip accent="red" variant="plain">거절 사유 · 파일을 열 수 없습니다</Card.Strip>
</Card>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `accent` | `Accent` | — | 띠의 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `variant` | `Variant` | `"solid"` | 띠의 칠입니다. |
| `placement` | `"top" \| "bottom"` | `"bottom"` | 카드의 어느 끝에 붙는지 정합니다. 테두리는 카드 쪽의 한 줄만 남습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 띠 안의 글자입니다. |

- 띠가 카드 가장자리까지 닿도록 `Card`에 `padding="0"`을 주고 나머지는 `Card.Section`으로 나눕니다.

## SectionTitle

섹션 소제목입니다. 14px · 대문자 · 넓은 자간 · 약한 잉크로 그립니다. 아래는 아이콘과 개수 배지가 붙은 소제목입니다.

```tsx
<SectionTitle title="Timetable" icon={CalendarDays} trailing={<Badge size="sm">12</Badge>} />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | 필수 | 제목 글자입니다. |
| `icon` | `IconComponent` | — | 제목 앞 아이콘입니다. 약한 잉크로 그립니다. |
| `trailing` | `ReactNode` | — | 오른쪽 끝입니다. 개수나 작은 버튼을 둡니다. |
| `as` | `ElementType` | `"h2"` | 제목 태그입니다. 생김새는 바뀌지 않습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 제목 줄은 영어로 씁니다(`Today` · `Timetable` · `Meal`). 이유는 [Typography](../foundations/typography.md)에 있습니다.
- 문서 구조에 맞춰 태그를 `h3` 같은 것으로 내려도 크기는 같습니다.

## PageHeader

페이지 머리입니다. 검정 아이콘 칸 + 이름표 + 큰 제목을 카드 하나에 담습니다. 아래는 오른쪽에 주 동작을 두고 머리 아래에 보기 전환 줄을 붙인 예입니다.

```tsx
<PageHeader
  icon={CalendarDays}
  subtitle="2026학년도 2학기"
  title="Calendar"
  action={<Button size="sm" icon={Plus}>일정 제안</Button>}
>
  <SegmentedControl
    aria-label="보기"
    options={[
      { value: "month", label: "월" },
      { value: "week", label: "주" },
    ]}
    value={view}
    onChange={setView}
  />
</PageHeader>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | 필수 | 큰 제목입니다. |
| `subtitle` | `ReactNode` | — | 제목 위 작은 이름표(`overline`)입니다. |
| `icon` | `IconComponent` | — | 왼쪽 검정 칸 안의 아이콘입니다. |
| `action` | `ReactNode` | — | 오른쪽에 두는 페이지의 주 동작입니다. |
| `children` | `ReactNode` | — | 머리 아래, 같은 카드 안에 붙는 내용입니다(필터 줄 등). |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `<header>` 안의 `<h1>`으로 그리므로 페이지마다 하나만 씁니다. 제목은 대문자로 그려지니 영어로 씁니다.
- `action`은 640px(`sm`) 미만에서 제목 아래로 내려갑니다.

## Accordion

접히는 카드입니다. 머리를 누르면 펼쳐지고, 내용은 카드 안 구분선 아래에 제자리에서 나타납니다. 아래는 처음부터 펼쳐 둔 졸업 요건 카드입니다.

```tsx
<Accordion title="졸업 요건" icon={GraduationCap} trailing={<Badge size="sm">3/5</Badge>} defaultOpen>
  <Meter label="졸업 학점" value={96} max={132} />
</Accordion>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | 필수 | 머리 글자입니다. |
| `titleStyle` | `AccordionTitle` | `"heading"` | 제목의 글자입니다. `heading`은 20px 문장이고, `section`은 대문자 섹션 제목으로 좁은 화면에서 14px, `md` 이상에서 20px입니다. |
| `size` | `AccordionSize` | `"md"` | `sm`은 12px 제목의 촘촘한 줄입니다. 쉐브론이 작아지고 본문 여백이 좁아지며, 이때 `titleStyle`은 쓰지 않습니다. |
| `icon` | `IconComponent` | — | 제목 앞 아이콘입니다. |
| `trailing` | `ReactNode` | — | 제목 옆입니다. 개수 배지 같은 것을 둡니다. |
| `open` | `boolean` | — | 펼침 상태입니다. 주면 제어 모드가 됩니다. |
| `defaultOpen` | `boolean` | `false` | 제어하지 않을 때 처음 펼침 상태입니다. |
| `onOpenChange` | `(open: boolean) => void` | — | 머리를 눌렀을 때 새 상태와 함께 불립니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 펼쳤을 때 보이는 내용입니다. |

- `open`을 주면 상태는 부르는 쪽이 쥡니다. `onOpenChange`로 받은 값을 `open`에 되돌려 줘야 접히고 펼쳐집니다. 주지 않으면 내부 상태가 관리하고, 어느 쪽이든 `onOpenChange`는 불립니다.
- 접혀 있는 동안 `children`은 렌더되지 않습니다. 머리는 `aria-expanded`가 붙은 button이고 내용은 `role="region"`입니다.
- 펼칠 때 내용은 300ms 동안 제자리에서 서서히 나타납니다(`fade`, class-explorer의 `fade-in duration-300`과 같습니다). 접을 때는 모션 없이 곧바로 사라집니다.
- 머리 전체가 하나의 button이므로 `trailing`에는 개수 배지처럼 누르지 않는 것만 둡니다.
- 흑백 카드라 `accent`가 없습니다. 안쪽 배지 · 버튼이 색을 각자 고릅니다.

## SegmentedControl

값을 하나 고르는 버튼 줄입니다. `radiogroup`으로 읽히고, 칸은 `radio`입니다. 아래는 학기를 고르는 줄입니다.

```tsx
<SegmentedControl
  aria-label="학기"
  options={[
    { value: "1", label: "1학기" },
    { value: "2", label: "2학기" },
  ]}
  value={term}
  onChange={setTerm}
/>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `options` | `readonly ChoiceOption<V>[]` | 필수 | 고를 칸 목록입니다. `V`는 `value`의 문자열 타입이고, 칸은 `value` · `label`(`ReactNode`) · `icon`(`IconComponent`) · `disabled`를 가집니다. |
| `value` | `V` | 필수 | 골라진 값입니다. |
| `onChange` | `(value: V) => void` | 필수 | 다른 칸을 골랐을 때 새 값과 함께 불립니다. |
| `aria-label` | `string` | 필수 | 줄의 이름입니다. |
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `variant` | `Variant` | `"muted"` | 안 골린 칸의 칠입니다. 골린 칸은 같은 accent의 `filled`입니다. |
| `size` | `ControlSize` | `"sm"` | 칸의 크기입니다. |
| `shadow` | `boolean` | `false` | 안 골린 칸을 4px 그림자 위에 띄웁니다(hover 때 가라앉음). 골린 칸은 이 값과 상관없이 105%로 커져 그림자 위에 섭니다. |
| `gap` | `Space` | `"sm"` | 칸 사이 간격입니다(6px). |
| `fill` | `boolean` | `false` | 줄을 꽉 채워 칸을 같은 폭으로 나눕니다. 줄바꿈은 꺼집니다. |
| `attached` | `boolean` | `false` | 칸을 이어 붙입니다. 사이가 없고 맞닿은 테두리가 하나로 겹칩니다. `gap`은 쓰이지 않고 줄바꿈도 꺼집니다. |
| `className` | `string` | — | 줄에 붙는 class입니다. |

- 값을 고르는 줄입니다. 화면을 바꾸는 줄은 [Tabs](#tabs)입니다. 둘의 생김새는 같고 뜻만 다릅니다(`radiogroup`과 `tablist`).
- 방향키(← → ↑ ↓)와 Home · End로 칸을 옮기고, 끝에서는 반대편으로 돌아 나옵니다. 옮기면 값도 바로 바뀌고(라디오와 같습니다), 꺼진 칸은 건너뜁니다. Tab 키로는 골린 칸 하나에만 들어옵니다(roving tabindex).
- 이 키보드 규칙은 Button이 아니라 [`useSelectableGroup`](../primitives/README.md#useselectablegroup)이 붙입니다. 칸의 골라짐은 `radio` 역할의 `aria-checked` 하나로 알립니다. `value`가 어느 칸과도 맞지 않으면 Tab으로 들어올 칸이 없으므로, `value`는 늘 `options` 중 하나여야 합니다.
- 골린 칸은 filled로 바뀌므로 안 골린 칸의 `variant`로 `filled`를 주면 둘이 같아져 고른 것이 보이지 않습니다. 안 골린 칸은 `muted` · `outline` · `hairline` 처럼 면이 비는 variant 로 둡니다.

## Tabs

화면을 바꾸는 버튼 줄(`Tabs.List` · `Tabs.Tab`)과 그 아래 화면(`Tabs.Panel`)입니다. 아래는 시간표를 주간과 목록으로 바꿔 보는 탭입니다.

```tsx
<Tabs value={tab} onChange={setTab}>
  <Tabs.List aria-label="시간표 보기">
    <Tabs.Tab value="week" icon={CalendarDays}>주간</Tabs.Tab>
    <Tabs.Tab value="list">목록</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="week">주간 시간표</Tabs.Panel>
  <Tabs.Panel value="list">과목 목록</Tabs.Panel>
</Tabs>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `value` | `V` | 필수 | 골라진 탭의 값입니다. `V`는 문자열 타입입니다. |
| `onChange` | `(value: V) => void` | 필수 | 탭을 골랐을 때 새 값과 함께 불립니다. |
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `variant` | `Variant` | `"outline"` | 안 골린 탭의 칠입니다. 골린 탭은 같은 accent의 `filled`입니다. |
| `size` | `ControlSize` | `"sm"` | 탭의 크기입니다. |
| `shadow` | `boolean` | `true` | 안 골린 탭을 4px 그림자 위에 띄웁니다(hover 때 가라앉음). 골린 탭은 이 값과 상관없이 105%로 커져 그림자 위에 섭니다. |
| `gap` | `Space` | `"md"` | 탭 사이 간격입니다(8px). `Tabs.List`가 읽습니다. |
| `fill` | `boolean` | `false` | 줄을 꽉 채워 탭을 같은 폭으로 나눕니다. |
| `children` | `ReactNode` | — | `Tabs.List`와 `Tabs.Panel`입니다. |

- 기본 생김새는 class-explorer의 화면 전환 버튼과 같은 `outline` + 그림자입니다. SegmentedControl의 기본(`muted`, 그림자 없음, `gap` `sm`)과 다릅니다.
- 골라진 패널만 렌더하고 나머지는 지웁니다. `Tabs.*`를 `<Tabs>` 밖에서 쓰면 오류를 던집니다.
- 키보드는 SegmentedControl과 같습니다. 방향키와 Home · End로 옮기면 탭이 바로 바뀌고, Tab 키로는 골린 탭 하나에만 들어옵니다. 탭의 골라짐은 `tab` 역할의 `aria-selected` 하나로 알립니다.

### Tabs.List

탭 버튼 줄입니다. `role="tablist"`입니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `aria-label` | `string` | 필수 | 탭 줄의 이름입니다. |
| `className` | `string` | — | 줄에 붙는 class입니다. |
| `children` | `ReactNode` | — | `Tabs.Tab`들입니다. |

### Tabs.Tab

탭 버튼 하나입니다. 같은 `value`의 `Tabs.Panel`과 `aria-controls`로 연결됩니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `value` | `string` | 필수 | 이 탭의 값입니다. |
| `icon` | `IconComponent` | — | 앞 아이콘입니다. |
| `disabled` | `boolean` | `false` | 고를 수 없게 합니다. 방향키 순회에서도 건너뜁니다. |
| `children` | `ReactNode` | — | 탭 글자입니다. |

### Tabs.Panel

탭 아래 화면입니다. `role="tabpanel"`입니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `value` | `string` | 필수 | 이 패널의 값입니다. 같은 값의 탭이 골라졌을 때만 렌더합니다. |
| `className` | `string` | — | 패널에 붙는 class입니다. |
| `children` | `ReactNode` | — | 패널 내용입니다. |

## Menu

버튼을 누르면 뜨는, 하나를 고르는 목록입니다. 아래는 정렬 기준을 고르는 메뉴입니다.

```tsx
<Menu
  aria-label="정렬"
  trigger={<Button size="sm" variant="outline" iconEnd={ChevronDown}>정렬</Button>}
  items={[
    { value: "name", label: "이름순" },
    { value: "id", label: "학번순" },
  ]}
  value={sort}
  onSelect={setSort}
  align="end"
/>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `trigger` | `ReactElement` | 필수 | 여는 버튼 하나입니다. |
| `items` | `readonly MenuItem<V>[]` | 필수 | 목록입니다. `V`는 `value`의 문자열 타입이고, 항목은 `value` · `label`(`ReactNode`) · `icon`(`IconComponent`) · `disabled`를 가집니다. |
| `value` | `V` | — | 골라진 값입니다. 있으면 체크와 검정 면으로 표시합니다. |
| `onSelect` | `(value: V) => void` | 필수 | 항목을 골랐을 때 값과 함께 불립니다. 부른 뒤 메뉴가 닫힙니다. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | 판을 버튼의 어느 쪽 끝에 맞출지 정합니다. |
| `aria-label` | `string` | — | 목록의 이름입니다. |

- 누름과 `aria-haspopup` · `aria-expanded` · `aria-controls`는 Menu가 trigger에 붙입니다. trigger에 직접 준 `onClick`은 덮어쓰이므로 주지 않습니다.
- `value`를 주면 항목이 `menuitemradio`(고르는 목록)가 되고, 주지 않으면 `menuitem`(동작 목록)입니다. 열리면 골라진 항목(없으면 첫 항목)에 포커스가 갑니다.
- ↑ ↓ · Home · End는 포커스만 옮깁니다. 옮긴다고 고르지는 않고, Enter나 누름으로 골라야 `onSelect`가 불립니다. SegmentedControl은 옮기면 바로 고르지만, 메뉴는 동작 목록일 수도 있어서 방향키로 훑는 동안 동작이 실행되면 안 됩니다. 같은 `useSelectableGroup`을 `selectOnFocus: false`로 쓴 것이고, 항목은 Tab 순서에 들어오지 않습니다.
- 항목을 고르거나 Esc를 누르면 닫히며 포커스가 trigger로 돌아옵니다. 바깥을 누르면 닫히되 포커스는 옮기지 않습니다 — 누른 자리가 포커스를 가져가야 하기 때문입니다. Tab을 누르면 메뉴를 닫고 다음 요소로 넘어갑니다.
- [Floating](../primitives/README.md#floating) 위에 서서 body 끝에 그려지므로 카드의 `overflow`에 잘리지 않습니다. 판은 버튼 아래가 기본이고 화면 밖으로 나가면 위로 뒤집힙니다. `center`가 아니면 판의 폭이 버튼 폭 이상입니다.
- `Modal` 안에서도 씁니다. 안에서 열면 판이 열린 `<dialog>` 안에 그려져서 보이고 눌립니다. 모달이 열리면 브라우저가 나머지 문서를 비활성으로 만들고 top layer를 차지하는데, body 끝에 그린 판은 그 바깥이라 가려지고 눌리지도 않기 때문입니다. 이때 첫 Esc는 메뉴만 닫고, 다음 Esc가 모달을 닫습니다.

## Modal

native `<dialog>` 위에 서는 모달입니다. 아래는 수강 변경을 확인하는 모달입니다.

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="수강 변경 확인"
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>취소</Button>
      <Button accent="green" variant="solid" shadow onClick={save}>확인</Button>
    </>
  }
>
  <Text>김예시 학생의 수강 신청을 변경합니다.</Text>
</Modal>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `open` | `boolean` | 필수 | 열림 상태입니다. |
| `onClose` | `() => void` | 필수 | Esc · 바깥 누름 · 닫기 버튼이 모두 이걸 부릅니다. `open`을 `false`로 바꾸는 일은 부르는 쪽이 합니다. |
| `title` | `ReactNode` | — | 머리 막대의 제목입니다. |
| `subtitle` | `ReactNode` | — | 머리 막대의 두 번째 줄입니다. 파일 설명 같은 것을 적고 두 줄에서 자릅니다. `title`이 있을 때만 그려집니다. |
| `titleUppercase` | `boolean` | `true` | 제목을 대문자로 그립니다. 파일명처럼 원문이 뜻인 제목이면 끕니다. |
| `actions` | `ReactNode` | — | 머리 막대 오른쪽, 닫기 앞에 놓는 동작 버튼입니다(새 탭에서 열기). `title`이 있을 때만 그려집니다. |
| `accent` | `Accent` | `"purple"` | 머리 막대의 색입니다. 판 · 본문 · 푸터로는 흐르지 않으므로 푸터 버튼은 색을 각자 고릅니다. |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | 최대 폭입니다. 400 · 512 · 768 · 1024 · 1280px. `full`은 높이도 96vh로 잡고 머리를 고정한 채 본문이 남은 높이를 채웁니다. |
| `footer` | `ReactNode` | — | 아래 동작 줄입니다. 오른쪽 정렬입니다. |
| `footerAccent` | `Accent` | — | 주면 아래 동작 줄을 그 색의 띠(`solid`)로 칠합니다. `footer`가 있을 때만 쓰입니다. |
| `dismissible` | `boolean` | `true` | 바깥(막)을 눌러 닫을지 정합니다. 입력 중인 폼이면 `false`를 줍니다. |
| `closable` | `boolean` | `true` | 닫을 수 있는 창인지 정합니다. `false`면 닫기 버튼이 없고 Esc · 바깥 누름도 닫지 않습니다. 다 끝내야 나가는 창에 씁니다. |
| `flush` | `boolean` | `false` | 본문의 안쪽 여백을 뺍니다. 파일 미리보기처럼 본문이 가장자리까지 차는 창에 씁니다. |
| `closeLabel` | `string` | `"닫기"` | 닫기 버튼(머리 막대 · 오른쪽 위)의 이름입니다. |
| `className` | `string` | — | `<dialog>`에 붙는 class입니다. |
| `children` | `ReactNode` | — | 본문입니다. |

- 포커스 가두기 · Esc · 뒤 화면 비활성 · 가장 위 층은 브라우저(`showModal()`)가 맡으므로 z-index를 고르지 않습니다. 그림자는 시스템에서 유일한 6px이고, 열려 있는 동안 뒤 화면은 스크롤되지 않습니다.
- 열릴 때 판은 8px 아래에서 올라오고(`pop`, 200ms) 뒤 막은 같은 시간에 제자리에서 나타납니다(`fade`). 닫힐 때의 모션은 없습니다.
- 안에서 여는 [Menu](#menu) · [Tooltip](#tooltip)은 열린 `<dialog>` 안에 그려집니다. body 끝에 그리면 모달 바깥이라 뒤 화면처럼 비활성이 되어 보이지도 눌리지도 않기 때문입니다. 그런 판이 떠 있는 동안의 첫 Esc는 판만 닫고, 다음 Esc가 모달을 닫습니다.
- `dismissible={false}`는 바깥 누름만 막고 Esc는 막지 않습니다. Esc까지 막으려면 `closable={false}`를 주고, 닫는 길을 `footer`의 버튼으로 둡니다. 닫는 길이 하나도 없으면 사용자가 갇히니 `onClose`를 부르는 버튼은 반드시 둡니다. 닫혀 있는 동안에는 `children`을 렌더하지 않으므로 안의 폼 상태는 다시 열 때 초기화됩니다.
- `title`을 주지 않으면 머리 막대 없이 흰 면 오른쪽 위에 닫기 버튼만 앉습니다(`closable={false}`면 그마저 없습니다). `subtitle` · `actions`는 머리 막대 안의 것이라 이때 그려지지 않습니다. `title`이 있으면 `aria-labelledby`로 `<dialog>`의 이름에 연결됩니다.

## Drawer

가장자리에서 밀려 나오는 판입니다. 뒤 화면을 막지 않아서, 옆에 두고 함께 보는 패널에 씁니다. 화면을 막아야 하면 [Modal](#modal)입니다. 아래는 오른쪽에 붙는 안내 패널과, 닫혀 있어도 보이는 손잡이입니다.

```tsx
<Drawer open={open} aria-label="Ask" style={{ width: 360 }} handle={<IconButton icon={Sparkles} label="Ask 열기" onClick={toggle} />}>
  <Stack gap="sm" padding="lg">
    <Text variant="subheading">Ask</Text>
  </Stack>
</Drawer>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `open` | `boolean` | 필수 | 열림 상태입니다. 닫히면 판이 가장자리 밖으로 나갑니다. |
| `side` | `DrawerSide` | `"right"` | 붙는 가장자리입니다. `right` · `left` · `bottom`. |
| `handle` | `ReactNode` | — | 판 바깥에 붙어서 닫혀 있어도 화면에 남는 손잡이입니다. 여닫는 버튼은 쓰는 쪽이 그립니다. |
| `aria-label` | `string` | — | 판의 이름입니다. `<aside>`로 읽힙니다. |
| `style` | `CSSProperties` | — | 판의 폭 · 높이, 상단 바를 비키는 `top`처럼 실행 중에 정해지는 값입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 판 안의 내용입니다. 넘치면 안에서 스크롤됩니다. |

- 화면에 고정(`position: fixed`)되고 붙은 가장자리를 채웁니다. 폭(`right` · `left`)이나 높이(`bottom`)는 `style`로 줍니다.
- 붙은 가장자리 쪽에는 선을 긋지 않고 세 변만 남깁니다. 열려 있는 동안만 4px 그림자를 가집니다.
- 닫혀 있는 동안 안쪽은 `inert`라 Tab이 들어가지 않고 스크린 리더도 읽지 않습니다. 손잡이는 `inert` 바깥이라 닫혀 있어도 누를 수 있습니다.
- 열 때의 모션은 판이 밀려 나오는 이동뿐이고, 포커스를 옮기지도 가두지도 않습니다. Esc · 바깥 누름으로 닫는 규칙도 없으니 필요하면 부르는 쪽이 붙입니다.

## Tooltip

설명 풍선입니다. 마우스를 올리거나 키보드로 포커스하면 뜹니다. 아래는 버튼에 설명을 붙이고, ⌘를 누를 때만 보이게 한 예입니다.

```tsx
<Tooltip content="⌘를 누르면 새 탭에서 열립니다" disabled={!modifierPressed}>
  <Button size="sm" variant="outline">열기</Button>
</Tooltip>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `content` | `ReactNode` | 필수 | 풍선 안의 내용입니다. |
| `children` | `ReactElement` | 필수 | 설명을 붙일 요소 하나입니다(버튼 · 배지). |
| `placement` | `"top" \| "bottom"` | `"top"` | 풍선이 뜨는 쪽입니다. 화면 밖으로 나가면 반대쪽으로 뒤집힙니다. |
| `delay` | `number` | `300` | 뜨기까지 기다리는 시간(ms)입니다. |
| `disabled` | `boolean` | `false` | 켜지 않을 때 줍니다. 예를 들어 ⌘를 누를 때만 보이는 설명입니다. |

- 검정 면 · 흰 글자 · 최대 폭 260px입니다. [Floating](../primitives/README.md#floating) 위에 서서 body 끝에 그려지므로 카드의 `overflow`에 잘리지 않고, 좌우는 화면 안에 묶입니다.
- 뜨는 동안 children에 `aria-describedby`가 붙습니다. 풍선은 포인터를 받지 않으므로(`pointer-events: none`) 누르거나 선택할 내용은 넣지 않습니다.
- 키보드로도 보이려면 children이 포커스를 받는 요소(버튼 · 링크 · 입력)여야 합니다.
- Esc를 누르거나 바깥을 누르면 닫힙니다. `Modal` 안에서는 풍선이 열린 `<dialog>` 안에 그려지고, 풍선이 떠 있는 동안의 첫 Esc는 풍선만 닫습니다.

## Popover

내용을 담는 판입니다. 흰 면 · 2px 검정 · 4px 그림자 위에 사람 카드나 요약을 올립니다. 짧은 글자는 Tooltip, 누를 수 있는 내용이나 카드는 Popover입니다. 아래는 이름에 마우스를 올리면 사람 요약이 뜨는 예입니다.

```tsx
<Popover content={<PersonCard id="25-001" name="김예시" color={color} items={["미적분학 II"]} />}>
  <Button size="sm" variant="muted">김예시</Button>
</Popover>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `content` | `ReactNode` | 필수 | 판 안의 내용입니다. |
| `children` | `ReactNode` | 필수 | 판을 붙일 요소입니다. |
| `trigger` | `PopoverTrigger` | `"hover"` | 여는 법입니다. `hover`는 마우스를 올리거나 포커스하면, `click`은 누르면, `manual`은 부르는 쪽이 `open`으로만 엽니다. |
| `open` | `boolean` | — | 주면 열림을 밖에서 쥡니다. |
| `onOpenChange` | `(open: boolean) => void` | — | 열림이 바뀔 때 새 값과 함께 불립니다. |
| `placement` | `"top" \| "bottom"` | `"top"` | 판이 뜨는 쪽입니다. 화면 밖으로 나가면 반대쪽으로 뒤집힙니다. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | 판을 기준 요소의 어느 쪽 끝에 맞출지 정합니다. |
| `delay` | `number` | `300` | `hover`로 열기까지 기다리는 시간(ms)입니다. |
| `padding` | `Space` | `"lg"` | 판의 안쪽 여백입니다. |
| `block` | `boolean` | `false` | 기준 요소를 줄 전체로 둡니다. 폭을 채우는 막대 · 줄에 붙일 때 씁니다. |
| `className` | `string` | — | 판에 붙는 class입니다. |

- [Floating](../primitives/README.md#floating) 위에 서서 body 끝에 그려지므로 카드의 `overflow`에 잘리지 않고, `Modal` 안에서는 열린 `<dialog>` 안에 그려집니다. 바깥을 누르거나 Esc를 누르면 닫힙니다.
- Tooltip과 달리 판이 포인터를 받습니다. `hover`에서 기준 요소에서 판으로 마우스를 옮기는 동안 100ms를 기다려 닫히지 않고, 판 위에 있는 동안은 열려 있습니다. 판을 누른 클릭은 기준 요소로 번지지 않습니다.
- `manual`은 마우스나 눌림이 아닌 조건으로 열 때 씁니다. ⌘를 누를 때만 뜨는 판처럼, `open`과 `onOpenChange`를 함께 줍니다.
- 폭은 `min(32rem, 화면 폭 − 여백)`까지 늘어납니다. [Meter](#meter)의 `tooltip`이 이 판을 `block`으로 씁니다.

## SearchField

검색 칸입니다. 앞에 돋보기가 있고, 값이 있으면 뒤에 지우기 버튼이 붙습니다. 아래는 과목 · 교사 · 학번을 한 칸에서 찾는 검색 칸입니다.

```tsx
<SearchField
  value={q}
  onValueChange={setQ}
  placeholder="과목 · 교사 · 학번 검색"
  aria-label="검색"
/>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `value` | `string` | 필수 | 입력값입니다. 부르는 쪽이 쥐는 제어 입력입니다. |
| `onValueChange` | `(value: string) => void` | 필수 | 값이 바뀔 때 새 문자열과 함께 불립니다. `onChange` 대신 이걸 씁니다. |
| `onClear` | `() => void` | — | 지우기 버튼을 눌렀을 때 불립니다. 주지 않으면 `onValueChange("")`를 부릅니다. |
| `clearLabel` | `string` | `"지우기"` | 지우기 버튼의 이름입니다. |
| `size` | `ControlSize` | `"md"` | 높이 사다리입니다. 같은 크기의 Button과 같은 높이입니다. |
| `invalid` | `boolean` | `false` | 틀린 값입니다. 빨간 테두리와 `aria-invalid`가 붙습니다. |
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄우고, 포커스를 받으면 거둡니다. [Input](../atoms/README.md#input)과 같습니다. |
| `suggestions` | `readonly SearchSuggestion[]` | `[]` | 칸에 포커스가 있는 동안 아래에 붙는 제안입니다. 항목은 `value`와 보이는 글자 `label`(기본 `value`)입니다. 언제 비울지는 부르는 쪽이 정합니다(예: 입력이 비었을 때만). |
| `suggestionsTitle` | `ReactNode` | — | 제안 목록 머리의 글자입니다. |
| `onSuggestionSelect` | `(value: string) => void` | — | 제안을 눌렀을 때 그 `value`와 함께 불립니다. |
| `onSuggestionRemove` | `(value: string) => void` | — | 주면 줄마다 지우기 버튼이 붙습니다. |
| `onSuggestionsClear` | `() => void` | — | 주면 머리에 전체 지우기(`Clear all`)가 붙습니다. |
| `className` | `string` | — | 바깥 `<span>`에 붙습니다. |
| 그 밖 | `<input>`의 props (`value` · `onChange` · `type` 제외) | — | `placeholder` · `aria-label` · `onKeyDown` · `ref` 같은 native 속성이 `<input>`으로 갑니다. |

- 입력은 `type="search"`로 고정이고, 브라우저가 그리는 기본 지우기 버튼은 숨깁니다.
- 한글 조합 중 Enter는 부르는 쪽이 거릅니다. `onKeyDown`에서 `e.nativeEvent.isComposing`을 확인합니다.
- 눈에 보이는 이름표가 없는 칸이므로 `aria-label`을 줍니다.
- 제안은 [Menu](#menu)가 아닙니다. Menu는 열 때 포커스를 판 안으로 옮겨서 입력 중에 쓸 수 없습니다. 제안 판은 눌러도 포커스가 입력에 남고, 바깥을 누르거나 Esc를 누르면 닫힙니다. 제안을 골라 값을 채우는 일은 `onSuggestionSelect`에서 부르는 쪽이 합니다.

## FormField

이름표 + 칸 + 안내를 한 묶음으로 만들고, 이름표와 안내를 칸에 연결합니다. 아래는 필수 입력 칸에 안내와 오류를 붙인 예입니다.

```tsx
<FormField label="학번" hint="숫자 6자리" error={error} required>
  <Input inputMode="numeric" />
</FormField>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | 필수 | 이름표입니다. |
| `hint` | `ReactNode` | — | 칸 아래 안내입니다. |
| `warning` | `ReactNode` | — | 막지 않는 경고입니다. 주면 칸이 주황으로 바뀌고, 안내 자리에 `hint` 대신 주황 글자로 나옵니다. |
| `error` | `ReactNode` | — | 틀렸을 때의 안내입니다. 주면 칸이 빨갛게 바뀌고, 안내 자리에 `hint` 대신 빨간 글자로 나옵니다. `warning`보다 앞섭니다. |
| `required` | `boolean` | — | 이름표에 별표를 붙이고 칸에도 `required`를 겁니다. |
| `children` | `ReactElement` | 필수 | 칸 하나입니다(Input · Textarea · Select). |
| `className` | `string` | — | 묶음 전체에 붙는 class입니다. |

- 이름표는 `htmlFor`로, 안내는 `aria-describedby`로 칸에 연결됩니다. 칸이 이미 가진 값은 덮지 않습니다 — `id`는 칸의 것을 쓰고, 칸의 `aria-describedby` 뒤에 안내를 잇고, `required`는 FormField에 주지 않으면 칸의 것을 따릅니다.
- `invalid`는 `error`가 있으면 켜지고, 없으면 칸에 준 값을 그대로 둡니다. `warning`도 같아서 `error`가 없을 때만 켜집니다.
- 안내 자리에는 `error`, `warning`, `hint` 중 앞선 하나만 나옵니다. `aria-describedby`도 그 하나에 연결됩니다.

## FileDrop

파일 끌어놓기 칸입니다. 점선 테두리 안에 안내를 두고, 눌러서 고를 수도 있습니다. 아래는 PDF 한 개를 받는 칸입니다.

```tsx
<FileDrop accept="application/pdf" icon={Upload} title="강의계획서를 끌어다 놓거나 눌러서 고르세요" onFiles={([file]) => upload(file)}>
  PDF · 10MB 이하
</FileDrop>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `onFiles` | `(files: File[]) => void` | 필수 | 파일을 고르거나 끌어다 놓으면 불립니다. |
| `accept` | `string` | — | `<input type="file">`의 `accept`입니다. |
| `multiple` | `boolean` | `false` | 여러 개를 받습니다. 아니면 첫 파일 하나만 `onFiles`로 넘깁니다. |
| `disabled` | `boolean` | `false` | 받지 않습니다. 칸이 옅어집니다. |
| `icon` | `IconComponent` | — | 위 아이콘입니다. |
| `accent` | `Accent` | `"cyan"` | 끄는 동안 칸을 칠하는 색입니다. |
| `title` | `ReactNode` | — | 제목 글자입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 제목 아래 안내입니다. 형식 · 크기 제한을 적습니다. |

- 칸 전체가 `<label>`이고 안쪽이 native 파일 입력이라, 키보드로도 열리고 스크린 리더가 파일 입력으로 읽습니다.
- 평소에는 점선 테두리의 `frameline`이고, 파일을 끄는 동안 `tinted`(연한 면 + 색 테두리)로 바뀝니다.
- 같은 파일을 다시 골라도 `onFiles`가 불리도록 고른 뒤 입력을 비웁니다. 파일 형식과 크기는 확인하지 않으니 `accept`와 `onFiles` 안에서 검사합니다.

## Stat

지표입니다. 이름표(overline) 위, 큰 숫자 아래입니다. 아래는 accent를 준 큰 지표와 작은 지표입니다.

```tsx
<Stat label="Enrolled" value={357} unit="명" accent="cyan" />
<Stat label="Credits" value="18" unit="학점" size="sm" />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | 필수 | 이름표입니다. |
| `value` | `ReactNode` | 필수 | 큰 숫자입니다. |
| `unit` | `ReactNode` | — | 숫자 뒤 단위입니다. |
| `size` | `"sm" \| "lg"` | `"lg"` | 숫자 크기입니다. 36 · 48px. |
| `accent` | `Accent` | — | 주면 숫자를 accent의 진한 글자로 칠합니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 큰 숫자(36 · 48px)는 글자 역할 사다리 밖의 유일한 예외 크기이고, `tabular-nums`로 자리만 맞춥니다. 자세한 값은 [Typography](../foundations/typography.md)에 있습니다.
- 이름표 글자는 `lg`면 `subtitle`(14px), `sm`이면 `overline`(10px)입니다.

## Meter

막대 한 줄입니다. 이름 · 막대 · 값이 한 묶음입니다. 아래는 졸업 학점 진척도입니다.

```tsx
<Meter label="졸업 학점" value={96} max={132} valueLabel="96 / 132" accent="green" />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | 필수 | 막대 위 왼쪽 이름입니다. |
| `value` | `number` | 필수 | 지금 값입니다. |
| `max` | `number` | `100` | 가득 찼을 때의 값입니다. |
| `valueLabel` | `ReactNode` | — | 막대 위 오른쪽에 적을 글자입니다. 주지 않으면 `value`를 적습니다. |
| `accent` | `Accent` | — | 채움 색입니다. 주지 않으면 바깥 Paint의 색을 따르고, 바깥에도 없으면 `black`입니다. |
| `onSelect` | `() => void` | — | 이름을 누르면 불립니다. 이름이 조용한 링크(hover 때 밑줄)가 됩니다. 막대를 눌러 그 항목으로 거를 때 씁니다. |
| `tooltip` | `ReactNode` | — | 막대에 마우스를 올리면 그 위에 뜨는 판의 내용입니다. |
| `layout` | `"stack" \| "row"` | `"stack"` | `stack`은 이름 · 값 줄 아래 막대이고, `row`는 넓은 화면에서 이름 · 막대 · 값을 한 줄로 둡니다. 좁으면 쌓입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 막대 홈은 `well`이고 채움은 accent의 solid입니다. 채움 폭은 0~100%로 잘려서 `value`가 `max`를 넘어도 넘치지 않고, 값이 바뀌면 300ms 동안 움직입니다.
- `tooltip`은 [Popover](#popover)를 막대에 `block`으로 붙인 것입니다. 판은 막대 위에 고정되고 마우스를 따라다니지 않습니다.
- `onSelect`가 있으면 이름은 `<button>`입니다. 링크 색은 `accent`를 따르고, 주지 않으면 `pink`입니다.
- `role="meter"`에 `aria-valuemin` · `aria-valuemax` · `aria-valuenow`가 붙습니다.

## Table

데이터 표입니다. 2px 검정 틀 안의 native `<table>`이고, 폭이 모자라면 표만 가로로 스크롤합니다. 요일 × 교시 시간표는 `TimetableGrid`이고, 읽는 값의 표는 이것입니다. 아래는 학기별 학점 표입니다.

```tsx
<Table aria-label="학기별 학점">
  <Table.Head>
    <Table.Row>
      <Table.HeadCell>학기</Table.HeadCell>
      <Table.HeadCell numeric>학점</Table.HeadCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row hoverable>
      <Table.Cell header>2026-1</Table.Cell>
      <Table.Cell numeric>19</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `head` | `TableHead` | `"inverse"` | 머리 줄의 칠입니다. `inverse`는 검정, `well`은 한 단 내려앉은 면입니다. |
| `frameClassName` | `string` | — | 바깥 틀에 붙는 class입니다. |
| `className` | `string` | — | `<table>`에 붙는 class입니다. |
| 그 밖 | `<table>`의 props | — | `aria-label` 같은 native 속성이 `<table>`로 갑니다. |

조각은 다섯입니다. `Table.Head`(`<thead>`)와 `Table.Body`(`<tbody>`)는 native 속성만 받고, 나머지는 아래와 같습니다.

| 조각 | prop | 설명 |
| --- | --- | --- |
| `Table.Row` | `hoverable` | 마우스를 올린 줄이 한 단 어두워집니다. 줄 전체를 누르거나 훑어 읽는 표에 씁니다. |
| `Table.HeadCell` | `numeric` · `divided` | `<th scope="col">`입니다. `numeric`은 숫자 열이라 오른쪽 정렬이고, `divided`는 열 묶음의 왼쪽 선입니다. |
| `Table.Cell` | `header` · `numeric` · `divided` | `header`를 주면 `<th scope="row">`인 행 머리가 됩니다. `numeric`은 오른쪽 정렬에 같은 폭의 숫자입니다. |

- 숫자 열은 머리 칸과 본문 칸 양쪽에 `numeric`을 줍니다. 한쪽만 주면 정렬이 어긋납니다.
- 표에 이름이 필요하면 `aria-label`을 주고, 화면에 보이는 제목이 있으면 `aria-labelledby`로 연결합니다.

## Notice

눈에 띄는 안내 상자입니다. 기본은 Plain variant(연한 면 · 진한 테두리 · 진한 글자)이고, `variant="solid"`는 꽉 찬 색 띠입니다. 아래는 다시 시도 버튼이 붙은 오류, 가벼운 안내, 그림자를 켠 띠입니다.

```tsx
<Notice
  icon={TriangleAlert}
  title="시간표를 불러오지 못했습니다"
  role="alert"
  action={<Button size="xs" variant="outline">다시 시도</Button>}
>
  네트워크 연결을 확인해주세요.
</Notice>
<Notice accent="sky" icon={Info}>수강 변경은 10월 31일까지 가능합니다.</Notice>
<Notice accent="yellow" variant="solid" shadow wrap title="마감 임박" action={<Button size="xs" variant="paper">확인</Button>}>
  오늘 18시까지 신청할 수 있습니다.
</Notice>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `accent` | `Accent` | `"error"` | 색입니다. 안내면 `sky`, 됐다는 알림이면 `success`를 줍니다. |
| `variant` | `NoticeVariant` | `"plain"` | `plain`은 연한 면이고, `solid`는 꽉 찬 색 띠에 검정 테두리입니다. |
| `shadow` | `boolean` | `false` | 4px 그림자입니다. 화면의 주인공 알림에 줍니다. |
| `wrap` | `boolean` | `false` | 좁은 폭에서 `action`이 글 아래로 내려갑니다. 버튼이 여럿인 배너의 글이 짜부라지지 않습니다. |
| `icon` | `IconComponent` | — | 앞 아이콘입니다. |
| `title` | `ReactNode` | — | 굵은 제목 줄입니다. |
| `action` | `ReactNode` | — | 오른쪽 끝입니다. 다시 시도 같은 버튼을 둡니다. |
| `role` | `"status" \| "alert"` | `"status"` | 곧바로 읽혀야 하는 오류면 `alert`을 줍니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 본문입니다. |

- [Paint](../primitives/README.md#paint)의 `plain`(연한 면 · 진한 테두리 · 진한 글자) 또는 `solid`로 칠하고, `shadow`는 Paint의 `shadow`입니다. 움직이지 않는 면이라 hover에 반응하지 않습니다.
- 한 줄 안내가 자리에 안 들어가면 `children`을 [Marquee](../atoms/README.md#marquee)로 감쌉니다.
- 기본 accent가 `error`(빨강)라서 오류가 아닌 안내에는 accent를 바꿔 줍니다. `role`은 기본이 `status`이고, 스크린 리더가 곧바로 읽어야 하는 오류만 `alert`으로 올립니다.

## Busy

영역을 덮는 불러오는 중 표시입니다. 내용을 지우지 않고 흐리게 두어서 자리가 튀지 않습니다. 아래는 시간표 카드를 불러오는 동안 덮는 예입니다.

```tsx
<Busy active={loading} label="시간표를 가져오는 중">
  <Card>…</Card>
</Busy>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `active` | `boolean` | 필수 | 불러오는 중입니다. `false`면 덮개 없이 내용만 그려집니다. |
| `label` | `ReactNode` | `"불러오는 중"` | 스피너 아래 글자입니다. 문자열이면 스크린 리더가 읽는 스피너 이름으로도 씁니다. |
| `className` | `string` | — | 바깥 상자에 붙는 class입니다. |
| `children` | `ReactNode` | — | 덮을 내용입니다. |

- 켜져 있는 동안 내용은 40%로 흐려지고 누를 수 없습니다(`pointer-events: none`). 덮개는 영역 위에 `absolute`로 얹히므로 영역의 높이는 그대로입니다.
- 영역에 `aria-busy`가 붙습니다. 포커스를 받는 요소는 흐려졌어도 Tab으로 들어올 수 있으니, 불러오는 동안 막아야 하는 입력은 따로 `disabled`로 둡니다.
- 버튼 하나의 불러오는 중은 Busy가 아니라 Button의 `loading`입니다. 글자 자리를 불러오는 중인 Text는 `pulse`입니다.

## EmptyState

비어 있는 자리에 놓는 한 줄입니다. 아래는 일정이 없는 날의 빈 자리입니다.

```tsx
<EmptyState icon={CalendarOff} title="오늘은 정해진 일정이 없습니다" framed>
  새 일정을 제안해보세요.
</EmptyState>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `icon` | `IconComponent` | — | 위 아이콘입니다. 옅은 잉크(`faint`)로 그립니다. |
| `title` | `ReactNode` | — | 한 줄 제목입니다. |
| `action` | `ReactNode` | — | 할 수 있는 것입니다. 첫 자료 올리기 같은 버튼을 둡니다. |
| `framed` | `boolean` | `false` | 점선 테두리로 자리를 그립니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 제목 아래 보조 설명입니다. |

- 카드가 비었을 때 검은 줄 하나만 남기지 말고 이걸 넣습니다. "오늘은 정해진 일정이 없습니다" 같은 한 줄이면 충분합니다.
