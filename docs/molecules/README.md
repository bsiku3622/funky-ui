# Molecules

Molecules는 Atoms와 Primitives를 묶은 범용 조합입니다. 카드 · 선택 줄 · 떠 있는 판 · 폼 칸 · 숫자 · 알림처럼 한 번 만들어 두면 어느 앱에서나 쓰는 덩어리이고, class-explorer를 모르므로 학과나 학번 같은 앱 지식은 여기 없습니다. 같은 층 안에서는 `Card`만 다시 씁니다(PageHeader와 Accordion이 Card 위에 섭니다).

`SegmentedControl`과 `Tabs`는 같은 버튼 무리이고 뜻만 다릅니다(값 고르기와 화면 바꾸기). `Tooltip`과 `Menu`는 body 끝(Portal)에 그려서 카드의 `overflow`에 잘리지 않고, `Modal`은 native `<dialog>`의 top layer에 올라 z-index를 고르지 않습니다. `accent` · `variant` · `size` · `shadow`는 [Atoms](../atoms/README.md)와 같은 뜻입니다. 예시는 import를 생략하며, `term`이나 `setTerm`처럼 앱이 가진 상태와 핸들러는 이미 있다고 봅니다.

| 묶음 | 컴포넌트 |
| --- | --- |
| surface | Card · SectionTitle · PageHeader · Accordion |
| choice | SegmentedControl · Tabs · Menu |
| overlay | Modal · Tooltip |
| form | SearchField · FormField |
| data | Stat · Meter |
| feedback | Notice · EmptyState |

## Card

화면의 영역을 나누는 카드입니다. 흰 면 · 2px 검정 테두리 · 4px 그림자이고, 테두리는 항상 `line`이라 prop이 없습니다. 아래는 글자만 담은 카드와, 머리 막대와 구분선으로 나눈 카드입니다.

```tsx
<Card>
  <Text variant="heading">이번 주 시간표</Text>
</Card>
<Card padding="0" accent="purple">
  <Card.Header title="Enrolled Classes" icon={BookOpen} tone="bar" actions={<Badge variant="tonal" size="sm">6</Badge>} />
  <Card.Section>일반물리학 II · 미적분학 II</Card.Section>
  <Card.Section divided>알고리즘 · 전공 연구</Card.Section>
</Card>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. `motion`을 주면 기본이 `"button"`입니다. |
| `accent` | `Accent` | — | 카드 안으로 흐르는 accent입니다. 안쪽 컨트롤이 따로 받지 않으면 이 색을 씁니다. |
| `surface` | `Surface` | `"raised"` | 면입니다. 기본은 흰 면입니다. |
| `shadow` | `"raised" \| "none"` | `"raised"` | 그림자입니다. 모달이 아니면 `floating`을 쓰지 않으므로 선택지가 둘뿐입니다. `motion`을 주면 무시됩니다. |
| `padding` | `Space` | `"3xl"` | 안쪽 여백입니다(24px). 머리 막대를 붙이려면 `0`을 줍니다. |
| `motion` | `PressMotion` | — | 카드 전체가 누르는 물건이면 `press`(가라앉음) 또는 `lift`(떠오름)를 줍니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 카드 내용입니다. |

- 화면의 영역은 카드로 나눕니다. 카드 안을 나눌 때는 카드를 또 넣지 말고 `Card.Section`의 `divided`나 [Divider](../atoms/README.md#divider)를 씁니다.
- 카드에 준 accent는 안쪽으로 흐릅니다. `<Card accent="green">` 안의 Button은 accent를 따로 주지 않아도 초록입니다.
- `motion`을 주면 [Pressable](../primitives/README.md#pressable)로 그려져 기본 요소가 `<button>`이 되고(링크 카드는 `as="a"`) 그림자는 몸짓이 가집니다. 통째로 누르는 요소라 안에 다른 button이나 링크를 넣지 않습니다.

### Card.Header

카드 머리입니다. 섹션 소제목 글자(`subtitle`)와 오른쪽 끝 자리를 가집니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | 필수 | 제목 글자입니다. |
| `icon` | `IconComponent` | — | 제목 앞 아이콘입니다. |
| `actions` | `ReactNode` | — | 오른쪽 끝입니다. 개수나 버튼을 둡니다. |
| `tone` | `"plain" \| "bar"` | `"plain"` | `bar`는 accent 면으로 칠한 머리 막대입니다(모달 머리와 같은 모양). |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `bar`는 accent의 solid 면에 accent의 `ink` 글자이고 아래에 2px 검정 선이 붙습니다. 막대가 카드 가장자리까지 닿도록 `Card`에 `padding="0"`을 주고 나머지는 `Card.Section`으로 나눕니다.

### Card.Section

카드 안의 한 구역입니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `divided` | `boolean` | `false` | 위에 카드 안 구분선(`subtle`)을 긋습니다. |
| `padding` | `Space` | `"3xl"` | 안쪽 여백입니다(24px). |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 구역 내용입니다. |

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

접히는 카드입니다. 머리를 누르면 펼쳐지고, 내용은 카드 안 구분선 아래에 놓입니다. 아래는 처음부터 펼쳐 둔 졸업 요건 카드입니다.

```tsx
<Accordion title="졸업 요건" icon={GraduationCap} trailing={<Badge size="sm">3/5</Badge>} defaultOpen>
  <Meter label="졸업 학점" value={96} max={132} />
</Accordion>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | 필수 | 머리 글자입니다(`heading` 역할). |
| `icon` | `IconComponent` | — | 제목 앞 아이콘입니다. |
| `trailing` | `ReactNode` | — | 제목 옆입니다. 개수 배지 같은 것을 둡니다. |
| `open` | `boolean` | — | 펼침 상태입니다. 주면 제어 모드가 됩니다. |
| `defaultOpen` | `boolean` | `false` | 제어하지 않을 때 처음 펼침 상태입니다. |
| `onOpenChange` | `(open: boolean) => void` | — | 머리를 눌렀을 때 새 상태와 함께 불립니다. |
| `accent` | `Accent` | — | 카드 안으로 흐르는 accent입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 펼쳤을 때 보이는 내용입니다. |

- `open`을 주면 상태는 부르는 쪽이 쥡니다. `onOpenChange`로 받은 값을 `open`에 되돌려 줘야 접히고 펼쳐집니다. 주지 않으면 내부 상태가 관리하고, 어느 쪽이든 `onOpenChange`는 불립니다.
- 접혀 있는 동안 `children`은 렌더되지 않습니다. 머리는 `aria-expanded`가 붙은 button이고 내용은 `role="region"`입니다.
- 머리 전체가 하나의 button이므로 `trailing`에는 개수 배지처럼 누르지 않는 것만 둡니다.

## SegmentedControl

값을 하나 고르는 버튼 줄입니다. `radiogroup`으로 읽힙니다. 아래는 학기를 고르는 줄입니다.

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
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 accent를 따르고, 바깥에도 없으면 `black`입니다. |
| `variant` | `Variant` | `"muted"` | 안 골린 칸의 칠입니다. 골린 칸은 같은 accent의 `solid`입니다. |
| `size` | `ControlSize` | `"sm"` | 칸의 크기입니다. |
| `shadow` | `boolean` | `false` | 칸을 4px 그림자 위에 띄웁니다. 골린 칸은 눌린 채로 있습니다. |
| `gap` | `Space` | `"sm"` | 칸 사이 간격입니다(6px). |
| `fill` | `boolean` | `false` | 줄을 꽉 채워 칸을 같은 폭으로 나눕니다. 줄바꿈은 꺼집니다. |
| `className` | `string` | — | 줄에 붙는 class입니다. |

- 값을 고르는 줄입니다. 화면을 바꾸는 줄은 [Tabs](#tabs)입니다. 둘의 생김새는 같고 뜻만 다릅니다(`radiogroup`과 `tablist`).
- 방향키(← → ↑ ↓)와 Home · End로 칸을 옮기고, 옮기면 값도 바로 바뀝니다. Tab 키로는 골린 칸 하나에만 들어옵니다.
- 골린 칸은 solid 로 바뀌므로 안 골린 칸의 `variant`로 `solid`를 주면 둘이 같아져 고른 것이 보이지 않습니다. 안 골린 칸은 `muted` · `outline` · `hairline` 처럼 면이 비는 variant 로 둡니다.

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
| `accent` | `Accent` | — | 색입니다. 주지 않으면 바깥 accent를 따르고, 바깥에도 없으면 `black`입니다. |
| `variant` | `Variant` | `"outline"` | 안 골린 탭의 칠입니다. 골린 탭은 같은 accent의 `solid`입니다. |
| `size` | `ControlSize` | `"sm"` | 탭의 크기입니다. |
| `shadow` | `boolean` | `true` | 탭을 4px 그림자 위에 띄웁니다. |
| `gap` | `Space` | `"md"` | 탭 사이 간격입니다(8px). `Tabs.List`가 읽습니다. |
| `fill` | `boolean` | `false` | 줄을 꽉 채워 탭을 같은 폭으로 나눕니다. |
| `children` | `ReactNode` | — | `Tabs.List`와 `Tabs.Panel`입니다. |

- 기본 생김새는 class-explorer의 화면 전환 버튼과 같은 `outline` + 그림자입니다. SegmentedControl의 기본(`muted`, 그림자 없음, `gap` `sm`)과 다릅니다.
- 골라진 패널만 렌더하고 나머지는 지웁니다. `Tabs.*`를 `<Tabs>` 밖에서 쓰면 오류를 던집니다.
- 키보드는 SegmentedControl과 같습니다. 방향키와 Home · End로 옮기면 탭이 바로 바뀌고, Tab 키로는 골린 탭 하나에만 들어옵니다.

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
- `value`를 주면 항목이 `menuitemradio`(고르는 목록)가 되고, 주지 않으면 `menuitem`(동작 목록)입니다. 열리면 골라진 항목(없으면 첫 항목)에 포커스가 가고 ↑ ↓로 옮깁니다. 항목을 고르거나 Esc를 누르면 닫히며 포커스가 trigger로 돌아오고, 바깥을 누르거나 Tab을 눌러도 닫힙니다.
- body 끝에 그려서 카드의 `overflow`에 잘리지 않습니다. 판은 버튼 아래가 기본이고 화면 밖으로 나가면 위로 뒤집힙니다. `center`가 아니면 판의 폭이 버튼 폭 이상입니다.

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
      <Button accent="green" variant="tonal" shadow onClick={save}>확인</Button>
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
| `accent` | `Accent` | `"purple"` | 머리 막대의 색입니다. |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | 최대 폭입니다. 400 · 512 · 768 · 1024px. |
| `footer` | `ReactNode` | — | 아래 동작 줄입니다. 오른쪽 정렬입니다. |
| `dismissible` | `boolean` | `true` | 바깥(막)을 눌러 닫을지 정합니다. 입력 중인 폼이면 `false`를 줍니다. |
| `closeLabel` | `string` | `"닫기"` | 닫기 버튼(머리 막대 · 오른쪽 위)의 이름입니다. |
| `className` | `string` | — | `<dialog>`에 붙는 class입니다. |
| `children` | `ReactNode` | — | 본문입니다. |

- 포커스 가두기 · Esc · 뒤 화면 비활성 · 가장 위 층은 브라우저(`showModal()`)가 맡으므로 z-index를 고르지 않습니다. 그림자는 시스템에서 유일한 8px이고, 열려 있는 동안 뒤 화면은 스크롤되지 않습니다.
- `dismissible={false}`는 바깥 누름만 막고 Esc는 막지 않습니다. 닫혀 있는 동안에는 `children`을 렌더하지 않으므로 안의 폼 상태는 다시 열 때 초기화됩니다.
- `title`을 주지 않으면 머리 막대 없이 흰 면 오른쪽 위에 닫기 버튼만 앉습니다. `title`이 있으면 `aria-labelledby`로 `<dialog>`의 이름에 연결됩니다.

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

- 검정 면 · 흰 글자 · 최대 폭 260px입니다. body 끝에 그려서 카드의 `overflow`에 잘리지 않고, 좌우는 화면 안에 묶입니다.
- 뜨는 동안 children에 `aria-describedby`가 붙습니다. 풍선은 포인터를 받지 않으므로(`pointer-events: none`) 누르거나 선택할 내용은 넣지 않습니다.
- 키보드로도 보이려면 children이 포커스를 받는 요소(버튼 · 링크 · 입력)여야 합니다.

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
| `shadow` | `boolean` | `false` | 4px 그림자 위에 띄웁니다. |
| `className` | `string` | — | 바깥 `<span>`에 붙습니다. |
| 그 밖 | `<input>`의 props (`value` · `onChange` · `type` 제외) | — | `placeholder` · `aria-label` · `onKeyDown` · `ref` 같은 native 속성이 `<input>`으로 갑니다. |

- 입력은 `type="search"`로 고정이고, 브라우저가 그리는 기본 지우기 버튼은 숨깁니다.
- 한글 조합 중 Enter는 부르는 쪽이 거릅니다. `onKeyDown`에서 `e.nativeEvent.isComposing`을 확인합니다.
- 눈에 보이는 이름표가 없는 칸이므로 `aria-label`을 줍니다.

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
| `error` | `ReactNode` | — | 틀렸을 때의 안내입니다. 주면 칸이 빨갛게 바뀌고, 안내 자리에 `hint` 대신 빨간 글자로 나옵니다. |
| `required` | `boolean` | — | 이름표에 별표를 붙이고 칸에도 `required`를 겁니다. |
| `children` | `ReactElement` | 필수 | 칸 하나입니다(Input · Textarea · Select). |
| `className` | `string` | — | 묶음 전체에 붙는 class입니다. |

- 이름표는 `htmlFor`로, 안내는 `aria-describedby`로 칸에 연결됩니다. 칸이 이미 가진 값은 덮지 않습니다 — `id`는 칸의 것을 쓰고, 칸의 `aria-describedby` 뒤에 안내를 잇고, `required`는 FormField에 주지 않으면 칸의 것을 따릅니다.
- `invalid`는 `error`가 있으면 켜지고, 없으면 칸에 준 값을 그대로 둡니다.

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
| `accent` | `Accent` | — | 채움 색입니다. 주지 않으면 바깥 accent를 따르고, 바깥에도 없으면 `black`입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- 막대 홈은 `well`이고 채움은 accent의 solid입니다. 채움 폭은 0~100%로 잘려서 `value`가 `max`를 넘어도 넘치지 않고, 값이 바뀌면 300ms 동안 움직입니다.
- `role="meter"`에 `aria-valuemin` · `aria-valuemax` · `aria-valuenow`가 붙습니다.

## Notice

눈에 띄는 안내 상자입니다. Plain variant(연한 면 · 진한 테두리 · 진한 글자)로 그립니다. 아래는 다시 시도 버튼이 붙은 오류와, 가벼운 안내입니다.

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
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `accent` | `Accent` | `"error"` | 색입니다. 안내면 `sky`, 됐다는 알림이면 `success`를 줍니다. |
| `icon` | `IconComponent` | — | 앞 아이콘입니다. |
| `title` | `ReactNode` | — | 굵은 제목 줄입니다. |
| `action` | `ReactNode` | — | 오른쪽 끝입니다. 다시 시도 같은 버튼을 둡니다. |
| `role` | `"status" \| "alert"` | `"status"` | 곧바로 읽혀야 하는 오류면 `alert`을 줍니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | 본문입니다. |

- 기본 accent가 `error`(빨강)라서 오류가 아닌 안내에는 accent를 바꿔 줍니다. `role`은 기본이 `status`이고, 스크린 리더가 곧바로 읽어야 하는 오류만 `alert`으로 올립니다.

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
