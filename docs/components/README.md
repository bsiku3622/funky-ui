# Components

Components는 class-explorer 전용 컴포넌트입니다. 앱 셸(상단 바 · 사이드바 · 하단 바 · 학기 선택), 사람(학번 배지 · 학생 카드), 시간표(수업 칸 · 한 주 격자)가 여기 있고, 아래 층(Primitives · Atoms · Molecules)을 모두 쓸 수 있습니다. 범용이 아니므로 다른 앱은 이 층을 쓰지 않고 Atoms와 Molecules로 직접 짭니다. 기존 class-explorer 컴포넌트에서 옮기는 방법은 [이관표](../class-explorer/migration.md)에 있습니다.

색은 앱이 학번이나 학과로 정해 `color`(hex)로 넘기고, 이 층이 `toneStyle`로 `--fk-tone` 변수에 실어 칠합니다. 셸의 치수는 class-explorer의 셸에 맞춘 `CONTAINER.shell`(상단 바 80 · 사이드바 256 · 하단 바 64px)을 따르고, 화면에 고정할지는 `fixed`로 고릅니다. 메뉴의 순서와 내용은 앱이 정하며 셸은 그리기만 합니다. 이 층은 컴포넌트 여덟 개와 함수 `toneStyle` 하나를 내보냅니다. 예시는 import를 생략하며, `navigate`나 `terms`처럼 앱이 가진 값은 이미 있다고 봅니다.

| 묶음 | 컴포넌트 |
| --- | --- |
| shell | AppBar · SideNav · BottomNav · TermSwitcher |
| people | StudentBadge · PersonCard |
| schedule | ClassTile · TimetableGrid |

## AppBar

상단 바입니다. accent 면 · 아래 2px 검정 선 · 아래로 4px 그림자이고 높이는 80px입니다. 아래는 로고를 누르면 홈으로 가고, 오른쪽에 학기 선택을 둔 화면 고정 바입니다.

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
| `brand` | `ReactNode` | 필수 | 로고 글자입니다. 기울어진(−6°) 900 대문자로 그립니다. |
| `onBrandClick` | `() => void` | — | 주면 로고가 button이 되고, 주지 않으면 글자(`<span>`)로 그립니다. |
| `actions` | `ReactNode` | — | 오른쪽 끝입니다. 학기 선택 · 계정 · 로그아웃을 둡니다. |
| `accent` | `Accent` | `"purple"` | 바의 색입니다. |
| `fixed` | `boolean` | `false` | 화면 위에 고정합니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |

- `fixed`면 문서 흐름에서 빠지므로(`position: fixed`, `z-index` 100) 본문 위쪽에 바 높이(80px)만큼 여백을 둡니다. `SideNav`의 `fixed`는 이 바 아래(80px)에서 시작합니다.
- 바의 글자색은 accent의 `ink`이고, `actions`의 NavButton은 그 글자색에서 유리를 만듭니다. 그래서 보라(기본) · 검정 바에서는 흰 유리, 시안 · 노랑처럼 밝은 바에서는 검은 유리가 되어 어느 accent에서도 대비가 맞습니다.

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

- 폭은 256px입니다. `fixed`면 상단 바(80px) 아래 왼쪽에 붙고 md(768px) 미만에서는 숨습니다. BottomNav의 `fixed`는 반대로 md 이상에서 숨습니다.
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

- 지금 화면은 검정 solid가 4px 위에 떠 있고, 나머지는 약한 잉크로 물러납니다.
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
| `accent` | `Accent` | `"purple"` | 바의 색입니다. |
| `fixed` | `boolean` | `false` | 화면 아래에 고정합니다. 넓은 화면(md 이상)에서는 숨습니다. |
| `className` | `string` | — | 마지막에 덧붙는 class입니다. |
| `children` | `ReactNode` | — | `BottomNav.Item`들입니다. |

- 다섯 칸까지만 넣습니다. 칸이 폭을 똑같이 나누므로 칸이 늘면 라벨과 누르는 자리가 함께 좁아집니다.
- 칸 글자는 바의 글자색(accent의 `ink`)을 물려받아 어느 accent 바에서도 읽힙니다. 쉬는 칸은 60% 로 묽어집니다.

### BottomNav.Item

SideNav.Item과 같은 prop입니다.

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `icon` | `IconComponent` | 필수 | 위 아이콘입니다. |
| `active` | `boolean` | `false` | 지금 화면입니다. `aria-current="page"`가 붙고, 글자와 윗선이 바의 글자색으로 또렷해집니다. 쉬는 칸은 60% 로 묽습니다. |
| `onClick` | `() => void` | — | 눌렀을 때 부릅니다. |
| `children` | `ReactNode` | — | 칸 이름입니다. 9px 대문자로 그립니다. |

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

- `onClick`이 있으면 `Pressable`(`motion="press"`)로 그려져, 4px 그림자 위에 떠 있다가 누르면 그림자 속으로 가라앉습니다. 없으면 그림자 없는 정적 `<div>`입니다.
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

- 칠하는 문법은 자리마다 같습니다. 면 = tone 8~15%, 테두리 = tone, 글자 = tone입니다. 이 문법을 지키면 새 자리를 만들어도 색이 따로 놀지 않습니다. StudentBadge가 8%, ClassTile이 12%, PersonCard의 왼쪽 칸이 15%입니다.
- StudentBadge · PersonCard · ClassTile이 이 변수를 읽습니다. 앱 CSS도 `var(--fk-tone)`으로 읽을 수 있고, 변수가 없을 때를 대비해 폴백을 줍니다(컴포넌트는 본문 잉크색 `var(--fk-ink-primary)`를 씁니다).
