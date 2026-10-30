# Components

Components는 class-explorer 전용 컴포넌트입니다. 앱 셸(상단 바 · 사이드바 · 하단 바 · 학기 선택), 사람(학번 배지 · 학생 카드), 시간표(수업 칸 · 한 주 격자), 실행 중의 색(버튼 · 칩 · 상자 · 범례 칸)이 여기 있고, 아래 층(Primitives · Atoms · Molecules)을 모두 쓸 수 있습니다. 범용이 아니므로 다른 앱은 이 층을 쓰지 않고 Atoms와 Molecules로 직접 짭니다. 기존 class-explorer 컴포넌트에서 옮기는 방법은 [이관표](../class-explorer/migration.md)에 있습니다.

색은 앱이 학번이나 학과로 정해 hex로 넘기고(사람 · 시간표 부품은 `color`, Tone 부품은 `tone`), 이 층이 `toneStyle`로 `--fk-tone` 변수에 실어 칠합니다. Button과 Paint는 hex를 받지 않으므로 실행 중의 색은 이 층에만 있습니다. 셸의 치수는 class-explorer의 셸에 맞춘 `CONTAINER.shell`(상단 바 80 · 사이드바 256 · 하단 바 64px)을 따르고, 화면에 고정할지는 `fixed`로 고릅니다. 메뉴의 순서와 내용은 앱이 정하며 셸은 그리기만 합니다. 이 층은 컴포넌트 열두 개와 함수 `toneStyle` · `toneInk` 둘을 내보냅니다. 예시는 import를 생략하며, `navigate`나 `terms`처럼 앱이 가진 값은 이미 있다고 봅니다.

| 묶음 | 컴포넌트 |
| --- | --- |
| shell | AppBar · SideNav · BottomNav · TermSwitcher |
| people | StudentBadge · PersonCard |
| schedule | ClassTile · TimetableGrid |
| tone | ToneButton · ToneChip · ToneBox · ToneSwatch |

## AppBar

상단 바입니다. 보라(`brand`) 면 · 아래 2px 검정 선 · 아래로 4px 그림자이고 높이는 80px입니다. 아래는 로고를 누르면 홈으로 가고, 오른쪽에 학기 선택을 둔 화면 고정 바입니다.

```tsx
<AppBar
  brand="Class Explorer"
  onBrandClick={() => navigate("/")}
  actions={<TermSwitcher terms={terms} value={term} onChange={setTerm} />}
  fixed
/>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `brand` | `ReactNode` | 필수 | 로고 글자입니다. [Wordmark](../atoms/README.md#wordmark)(기울어진 900 대문자)로 그립니다. |
| `onBrandClick` | `() => void` | — | 주면 로고가 button이 되고, 주지 않으면 글자(`<span>`)로 그립니다. |
| `actions` | `ReactNode` | — | 오른쪽 끝입니다. 학기 선택 · 계정 · 로그아웃을 둡니다. |
| `fixed` | `boolean` | `false` | 화면 위에 고정합니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `fixed`면 문서 흐름에서 빠지므로(`position: fixed`, `z-index` 100) 본문 위쪽에 바 높이(80px)만큼 여백을 둡니다. `SideNav`의 `fixed`는 이 바 아래(80px)에서 시작합니다.
- 바는 [Surface](../primitives/README.md#surface)의 `brand`(보라 면 · 흰 글자, 대비 7.15:1)로 칠합니다. 아래 2px 검정 선과 아래로만 내려가는 4px 그림자는 셸 CSS가 그립니다.
- `accent`가 없습니다. 바는 앱의 뼈대이지 버튼처럼 색을 고르는 요소가 아니고, class-explorer의 바도 보라 하나뿐이기 때문입니다. accent는 그 색으로 칠해지는 요소(Paint 위에 선 것)만 받는다는 [Primitives](../primitives/README.md)의 규칙과도 맞습니다.
- 바가 Paint가 아니라 Surface라서 `actions` 안의 요소는 보라 accent를 물려받지 않습니다. accent를 주지 않은 Button · Badge는 검정(시스템)이 되고, 바 위에는 NavButton을 둡니다. NavButton은 accent를 쓰지 않으므로 영향이 없고, 흰 유리 위에 바의 흰 글자를 물려받습니다.

## SideNav

데스크톱 왼쪽 메뉴입니다. 메뉴 영역만 스크롤되고 `footer`는 늘 보입니다. 아래는 메뉴를 두 묶음으로 나누고 아래에 상태 자리를 둔 예입니다.

```tsx
<SideNav fixed footer={<Text variant="caption" tone="muted">System Status · 정상</Text>}>
  <SideNav.Section label="Explore">
    <SideNav.Item icon={Home} active>Home</SideNav.Item>
    <SideNav.Item icon={Search} onClick={() => navigate("/search")}>Search</SideNav.Item>
  </SideNav.Section>
  <SideNav.Section label="Tools">
    <SideNav.Item icon={CalendarDays} onClick={() => navigate("/calendar")}>Calendar</SideNav.Item>
  </SideNav.Section>
</SideNav>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `footer` | `ReactNode` | — | 맨 아래에 붙는 자리입니다(System Status). 메뉴만 스크롤되고 이건 늘 보입니다. |
| `fixed` | `boolean` | `false` | 상단 바 아래 왼쪽에 고정합니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | `SideNav.Section`들입니다. |

- 면은 [Surface](../primitives/README.md#surface)의 `canvas`(크림)이고 오른쪽에 2px 검정 선이 붙습니다. 폭은 256px입니다. `fixed`면 상단 바(80px) 아래 왼쪽에 붙고 md(768px) 미만에서는 숨습니다. BottomNav의 `fixed`는 반대로 md 이상에서 숨습니다.
- 메뉴의 순서와 내용은 앱이 정합니다. 셸은 그리기만 합니다.

### SideNav.Section

메뉴 묶음입니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | 묶음 이름입니다. 작은 대문자 약한 잉크로 그립니다. |
| `children` | `ReactNode` | — | `SideNav.Item`들입니다. |

### SideNav.Item

메뉴 한 칸입니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `icon` | `IconComponent` | 필수 | 앞 아이콘입니다. |
| `active` | `boolean` | `false` | 지금 화면입니다. `aria-current="page"`가 붙습니다. |
| `onClick` | `() => void` | — | 눌렀을 때 부릅니다. |
| `children` | `ReactNode` | — | 메뉴 이름입니다. |

- [Pressable](../primitives/README.md#pressable)(누름)과 [Selectable](../primitives/README.md#selectable)(골라짐)에 [Paint](../primitives/README.md#paint)(칠)를 얹은 버튼입니다. 지금 화면은 검정 `filled`가 4px 그림자 위에 떠 있고(`sink` — hover 때 가라앉음), 나머지는 `ghostMuted`로 물러나 hover 때 글자만 진해집니다(`tap`). 골라진 버튼(`selected` + `shadow`)처럼 커지지 않고 variant만 바꿉니다 — class-explorer의 사이드바가 그렇습니다.
- 지금 화면은 `aria-current="page"` 하나로 알립니다. 눌러서 켠 버튼(`aria-pressed`)이나 고른 값(`aria-checked`)이 아니라 '지금 여기'이기 때문입니다.
- 방향키 무리로 묶지 않습니다(`useSelectableGroup`을 쓰지 않습니다). 내비는 Tab 키로 칸마다 들르는 것이 맞아서입니다. 묶으면 roving tabindex 때문에 Tab이 지금 화면 한 칸에만 들어오고, 나머지 메뉴에는 방향키를 아는 사람만 닿습니다.
- 링크가 아니라 `<button>`입니다. 화면 이동은 `onClick`에서 합니다.

## BottomNav

모바일 하단 바입니다. 높이는 64px이고 칸이 폭을 똑같이 나눕니다. 아래는 세 칸짜리 고정 바입니다.

```tsx
<BottomNav fixed>
  <BottomNav.Item icon={Home} active>Home</BottomNav.Item>
  <BottomNav.Item icon={Search} onClick={() => navigate("/search")}>Search</BottomNav.Item>
  <BottomNav.Item icon={CalendarDays} onClick={() => navigate("/calendar")}>Calendar</BottomNav.Item>
</BottomNav>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `fixed` | `boolean` | `false` | 화면 아래에 고정합니다. 넓은 화면(md 이상)에서는 숨습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | `BottomNav.Item`들입니다. |

- 바는 AppBar와 같이 Surface의 `brand`이고, 검정 선(위 2px)과 4px 그림자는 위쪽으로만 둡니다. `accent`가 없는 이유도 AppBar와 같습니다.
- 다섯 칸까지만 넣습니다. 칸이 폭을 똑같이 나누므로 칸이 늘면 라벨과 누르는 자리가 함께 좁아집니다.
- 칸 글자는 바의 흰 글자를 물려받습니다. 쉬는 칸은 60% 로 묽어집니다.

### BottomNav.Item

SideNav.Item과 같은 prop입니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `icon` | `IconComponent` | 필수 | 위 아이콘입니다. |
| `active` | `boolean` | `false` | 지금 화면입니다. `aria-current="page"`가 붙고, 글자와 윗선이 바의 글자색으로 또렷해집니다. 쉬는 칸은 60% 로 묽습니다. |
| `onClick` | `() => void` | — | 눌렀을 때 부릅니다. |
| `children` | `ReactNode` | — | 칸 이름입니다. 9px 대문자로 그립니다. |

- 몸짓은 [Pressable](../primitives/README.md#pressable)의 `tap`입니다. 바 위라 그림자 없이 누르는 순간만 작아집니다.
- 키보드와 aria 규칙은 SideNav.Item과 같습니다. Tab으로 칸마다 들르고, 지금 화면은 `aria-current="page"` 하나로 알립니다. 방향키 무리로 묶지 않는 이유도 [SideNav.Item](#sidenavitem)에 있습니다.

## TermSwitcher

학기 선택입니다. 상단 바 위의 유리 버튼이 목록을 엽니다. 학기가 쌓여도 바를 잡아먹지 않습니다. 아래는 학기 두 개를 고르는 예입니다.

```tsx
<TermSwitcher
  terms={[
    { value: "2026-1", label: "2026-1" },
    { value: "2026-2", label: "2026-2" },
  ]}
  value={term}
  onChange={setTerm}
/>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `terms` | `readonly TermOption[]` | 필수 | 고를 학기 목록입니다. 항목은 `value`와 `label`(둘 다 `string`)을 가집니다. |
| `value` | `string` | 필수 | 골라진 학기의 `value`입니다. |
| `onChange` | `(value: string) => void` | 필수 | 학기를 골랐을 때 새 `value`와 함께 불립니다. |

- 학기가 둘 미만이면 아무것도 그리지 않습니다(`null`). `value`와 맞는 항목이 없으면 버튼에 `TERM`을 적습니다.
- 안쪽은 `Menu`(`align="end"`, `aria-label="학기"`)와 NavButton입니다. 어두운 바 위에서 쓰도록 만든 것이라 밝은 면 위에는 두지 않습니다.
- 목록은 [Menu](../molecules/README.md#menu)가 그립니다. `value`가 있어서 항목은 `menuitemradio`이고, 열면 지금 학기에 포커스가 가며 지금 학기는 체크와 검정 면으로 보입니다. ↑ ↓ · Home · End는 포커스만 옮기고 Enter나 누름으로 골라야 `onChange`가 불립니다 — 방향키로 훑는 동안 학기가 바뀌지 않습니다. Esc나 선택으로 닫히면 포커스가 버튼으로 돌아오고, 바깥을 누르면 포커스를 옮기지 않고 닫힙니다.

## StudentBadge

학번 배지입니다. `25 김예시`처럼 기수와 이름을 적고 기수 색으로 칠합니다. 아래는 기본 배지, 눌리는 작은 배지, 검색에 맞아 떠는 배지입니다.

```tsx
<StudentBadge cohort="25" name="김예시" color="#00c22a" />
<StudentBadge cohort="24" name="이샘플" color="#ff9100" size="sm" onClick={() => select("240117")} />
<StudentBadge cohort="26" name="박견본" color="#3decfd" buzz />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `cohort` | `string` | 필수 | 학번 앞 두 자리(기수)입니다. |
| `name` | `string` | 필수 | 이름입니다. |
| `color` | `string` | 필수 | 기수 색(hex)입니다. 앱이 학번으로 정해 넘깁니다. |
| `size` | `"xs" \| "sm" \| "md"` | `"xs"` | 글자 10 · 12 · 14px입니다. |
| `buzz` | `boolean` | `false` | 떱니다. 검색어와 맞는 사람에게 줍니다. |
| `onClick` | `() => void` | — | 주면 `<button>`이 되고, 주지 않으면 `<span>`입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- hover 효과를 두지 않습니다. 배지는 늘어놓고 읽는 물건이라 마우스가 지나가는 자리마다 반응하면, 정작 움직여야 할 것(찾는 사람의 진동)이 묻힙니다. `onClick`이 있어도 반응은 누르는 순간 `PRESS.activeScale`(0.96)로 작아지는 것뿐입니다.
- `buzz`는 검색어와 맞는 사람만 잠깐 떨게 하는 표시입니다. 나머지를 흐리게 지우지 않습니다. 1.8초 주기에서 앞 20%만 떨고 쉽니다.
- 칠은 면 = `color` 8% · 테두리 = `color` · 글자 = `color`이고([toneStyle](#tonestyle)), 글자는 900 이탤릭입니다.

## PersonCard

학생 · 교사 카드입니다. 왼쪽은 그 사람의 색, 오른쪽은 흰 면의 목록입니다. 아래는 수강 과목을 보여 주는 학생 카드입니다.

```tsx
<PersonCard
  id="250123"
  name="김예시"
  color="#00c22a"
  title="Enrolled Classes"
  items={["일반물리학 II", "미적분학 II", "알고리즘", "전공 연구"]}
  onClick={() => select("250123")}
/>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `id` | `ReactNode` | 필수 | 학번 또는 교번입니다. |
| `name` | `ReactNode` | 필수 | 이름입니다. 사람의 색으로 칠합니다. |
| `color` | `string` | 필수 | 사람의 색(hex)입니다. 왼쪽 칸의 면과 이름, 목록의 띠에 씁니다. |
| `title` | `ReactNode` | — | 오른쪽 칸 머리(overline)입니다. 예: Enrolled Classes. |
| `items` | `readonly ReactNode[]` | `[]` | 오른쪽 칸의 목록(과목명)입니다. 두 열로 놓고, 긴 이름은 말줄임합니다. |
| `onClick` | `() => void` | — | 주면 누르는 카드가 됩니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `onClick`이 있으면 `Pressable`(`motion="sink"`)로 그려져, 4px 그림자 위에 떠 있다가 누르면 그림자 속으로 가라앉습니다. 큰 면이라 누르는 순간 0.98로만 작아집니다. 없으면 그림자 없는 정적 `<div>`입니다.
- 왼쪽 칸의 면은 `color` 15%이고 이름은 `color`이며, 목록 항목 왼쪽에 `color` 띠가 붙습니다. 높이는 최소 176px입니다.

## ClassTile

수업 한 칸입니다. 과목명과 아래 줄 정보를 학과색 문법으로 칠합니다. 아래는 앞으로 올 수업, 지금 수업, 공강 칸입니다.

```tsx
<ClassTile title="일반물리학 II" meta="B201 · 김예시" color="#00c22a" />
<ClassTile title="미적분학 II" meta="3교시 · 지금" state="now" />
<ClassTile state="free" />
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | — | 과목명입니다. 한 줄에서 말줄임합니다. |
| `meta` | `ReactNode` | — | 아래 줄입니다. 교실 · 교사 · 시각을 적고, 한 줄에서 말줄임합니다. |
| `color` | `string` | — | 학과색(hex)입니다. `now`는 이 색을 무시하고 핑크를 씁니다. |
| `state` | `ClassTileState` | `"upcoming"` | `upcoming` 학과색 · `now` 핑크(지금) · `past` 같은 색을 40%로 · `free` 공강(점선, 면 없음)입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `style` | `CSSProperties` | — | 칸에 붙는 style입니다. `color`로 만든 변수 뒤에 합쳐집니다. |
| `children` | `ReactNode` | — | 아래 줄 뒤에 붙는 내용입니다. |

- "지금"(`now`)을 핑크로 꽉 채우지 않습니다. 연한 핑크 면(`soft`)에 핑크 테두리를 두르고 글자만 진한 핑크(`solidInk`)로 내립니다. 그 칸 하나가 화면에서 제일 센 물건이 되면 옆을 읽는 걸 방해하기 때문입니다.
- 학과색 문법은 면 = `color` 12% · 테두리 = `color` · 글자 = `color`입니다. `color`를 주지 않으면 본문 잉크색 계열로 그립니다.
- 칸은 셀을 채웁니다(`height: 100%`).

## TimetableGrid

한 주 격자입니다. 머리 줄은 검정, 교시 열은 `well`, 칸 사이는 카드 안 구분선입니다. 아래는 월요일부터 금요일까지 두 교시를 그리고 오늘 열을 표시한 예입니다.

```tsx
<TimetableGrid
  days={[
    { key: "mon", label: "월" },
    { key: "tue", label: "화", today: true },
    { key: "wed", label: "수" },
    { key: "thu", label: "목" },
    { key: "fri", label: "금" },
  ]}
  periods={[
    { key: "1", label: "1" },
    { key: "2", label: "2" },
  ]}
  renderCell={(day, period) => {
    const lesson = lessons[`${day}-${period}`];
    return lesson ? <ClassTile title={lesson.title} meta={lesson.room} color={lesson.color} /> : null;
  }}
/>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `days` | `readonly TimetableDay[]` | 필수 | 열 목록입니다. 항목은 `key` · `label`(`ReactNode`) · `today`(`boolean`)를 가집니다. |
| `periods` | `readonly TimetablePeriod[]` | 필수 | 행 목록입니다. 항목은 `key` · `label`(`ReactNode`)을 가집니다. |
| `renderCell` | `(day: string, period: string) => ReactNode` | 필수 | 칸 하나를 그립니다. 요일의 `key`와 교시의 `key`를 받습니다. |
| `corner` | `ReactNode` | `"Pd"` | 왼쪽 위 칸의 글자입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `today`인 요일은 검은 머리 줄에서 그 칸만 흰 칸으로 뒤집힙니다.
- 첫 열(교시)은 2.5rem 고정이고 요일 열은 같은 폭입니다. 칸은 최소 높이 48px에 안쪽 여백 4px이라 `ClassTile`을 그대로 넣으면 칸을 채웁니다.
- `role="table"`에 행 · 열 머리 · 칸의 역할이 붙어 표로 읽힙니다.

## ToneButton

실행 중에 정해지는 색(학과 · 끼니)으로 칠하는 버튼입니다. 안 골린 칸은 흰 면이고, 골라지면 그 색의 면이 됩니다. 아래는 학과를 고르는 줄입니다.

```tsx
{majors.map((m) => (
  <ToneButton key={m.name} tone={m.color} selected={major === m.name} onClick={() => setMajor(m.name)}>
    {m.name}
  </ToneButton>
))}
```

`accent`와 `variant`를 뺀 [Button](../atoms/README.md#button)의 prop을 그대로 받습니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `tone` | `string` | 필수 | 칠할 색(hex)입니다. 골라졌을 때 면이 됩니다. |
| `selected` | `boolean` | — | 골라진 상태입니다. Button과 같이 105%로 커져 그림자 위에 섭니다. |
| `shadow` | `ButtonShadow` | `true` | Button과 같습니다. 기본이 켜져 있습니다. |

- 셋을 다 칠하면 어느 것을 보고 있는지 색으로 가릴 수 없어서 안 골린 칸은 `paper`입니다.
- 글자는 [`toneInk`](#toneink)가 면 색에서 검정이나 흰색을 고르므로 어떤 색이든 4.58:1 이상입니다.
- class-explorer의 색 버튼은 골라져도 커지지 않았지만, funky-ui는 골라진 버튼을 색과 상관없이 키웁니다(재원님 결정). 나란히 붙은 끼니 버튼의 모양이 조금 달라집니다.

## ToneChip

여러 개를 함께 켜는 색 칩입니다. 아래는 기수를 거르는 줄입니다.

```tsx
{cohorts.map((c) => (
  <ToneChip key={c.year} tone={c.color} selected={on.includes(c.year)} onClick={() => toggle(c.year)}>
    {c.year}학번
  </ToneChip>
))}
```

`<button>`이고 나머지 props는 그대로 갑니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `tone` | `string` | 필수 | 칠할 색(hex)입니다. |
| `selected` | `boolean` | `false` | 켜짐입니다. `aria-pressed`로 알립니다. |
| `disabled` | `boolean` | `false` | 눌림이 꺼지고 불투명도 0.4가 됩니다. |

- 켜면 tone 12% 면에 그림자 위에 서고 hover 때 가라앉습니다. 끄면 흐린 회색으로 물러나 있다가 hover 때 흐림이 걷힙니다. 안쪽 칸은 켜야 칠해집니다.
- Button과 달리 골라져도 커지지 않습니다. 기본으로 전부 켜 두는 줄이라 다 같이 커지면 뜻이 없습니다.
- 글자 크기는 좁은 화면 12px, `md` 이상 14px입니다.

## ToneBox

색을 깐 상자입니다. tone 8% 면과 그 색의 2px 테두리이고, 글자는 칠하지 않습니다. 아래는 수강 이력으로 짐작한 전공을 알리는 상자입니다.

```tsx
<ToneBox tone={major.color} paddingX="lg" paddingY="md">
  <Text weight="black">수강 이력으로 보면 {major.name} 트랙 같아요</Text>
</ToneBox>
```

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"div"` | 렌더할 요소입니다. |
| `tone` | `string` | 필수 | 칠할 색(hex)입니다. |
| `framed` | `boolean` | `true` | 그 색의 테두리입니다. 카드 안의 칸처럼 이미 틀이 있으면 끕니다. |
| `padding` `paddingX` `paddingY` | [Box](../primitives/README.md#box)와 같음 | — | 안쪽 여백입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

## ToneSwatch

범례 칸입니다. 16px 네모에 검정 테두리입니다. 아래는 학과색 범례 한 칸입니다.

```tsx
<Inline gap="sm">
  <ToneSwatch tone={dept.color} />
  <Text variant="caption" weight="black">{dept.name}</Text>
</Inline>
```

`<span>`이고 나머지 props는 그대로 갑니다. `aria-hidden`이 붙어 스크린 리더에게 읽히지 않습니다. accent로 칠하는 점 · 띠는 [Swatch](../atoms/README.md#swatch)입니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `tone` | `string` | 필수 | 칠할 색(hex)입니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

## toneInk

hex 면 위에서 읽히는 글자색을 고르는 함수입니다. 검정이나 흰색의 CSS 변수 참조를 돌려줍니다. 아래는 앱이 만든 면에 같은 글자를 쓰는 예입니다.

```tsx
<div style={{ backgroundColor: dept.color, color: toneInk(dept.color) }}>{dept.name}</div>
```

- 시스템에서 실행 중에 색을 계산하는 유일한 자리입니다(재원님 결정).
- 경계는 검정과 흰색의 대비가 같아지는 휘도 0.179라서 어떤 색이든 4.58:1 이상입니다. class-explorer의 `readableInk`는 경계가 0.35라서 휘도 0.18~0.35인 면에 흰 글자를 올리고, 그 범위에서 AA에 못 미칩니다. 학과색 열한 가지 중 다섯(화학 · 생물학 · 지구과학 · 외국어 · 예체능)의 글자가 이 차이로 흰색에서 검정이 됩니다.

## toneStyle

실행 중에 정해지는 색(학과 · 학번)을 `--fk-tone` 변수로 넘기는 함수입니다. 아래는 학과색을 요소에 실어 주는 예입니다.

```tsx
<div className={deptChip} style={toneStyle(dept.color)}>{dept.name}</div>
<div className={deptChip} style={toneStyle(dept.color, { width: 120 })}>{dept.name}</div>
```

반환은 `CSSProperties | undefined`입니다.

| 인자 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `color` | `string \| undefined` | 필수 | 칠할 색(hex)입니다. 비어 있으면 변수를 만들지 않고 `style`을 그대로 돌려줍니다. |
| `style` | `CSSProperties` | — | 함께 줄 style입니다. `--fk-tone` 뒤에 합쳐지므로 같은 변수를 직접 주면 그쪽이 이깁니다. |

- 칠하는 문법은 자리마다 같습니다. 면 = tone 8~15%, 테두리 = tone, 글자 = tone입니다. 이 문법을 지키면 새 자리를 만들어도 색이 따로 놀지 않습니다. StudentBadge · ToneBox가 8%, ClassTile · ToneChip이 12%, PersonCard의 왼쪽 칸이 15%입니다. 면을 tone으로 꽉 채우는 ToneButton과 ToneSwatch만 이 문법 밖입니다.
- StudentBadge · PersonCard · ClassTile · Tone 부품이 이 변수를 읽습니다. 앱 CSS도 `var(--fk-tone)`으로 읽을 수 있고, 변수가 없을 때를 대비해 폴백을 줍니다(컴포넌트는 본문 잉크색 `var(--fk-ink-primary)`를 씁니다).
