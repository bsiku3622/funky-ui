# 전수조사와 분류

class-explorer `frontend/src`의 모든 컴포넌트를 세고, funky-ui의 층(Primitives · Atoms · Molecules · Components)으로 나눈 결과입니다. 조사 시점은 2026-10-29, 브랜치 `feat/backend-overhaul`입니다.

## 어떻게 셌는가

손으로 읽지 않고 TypeScript 파서로 셌습니다. 123개 `.tsx` 파일의 JSX 요소 2,993개를 모두 뽑아 태그 · `className` · `file:line`을 남기고, 같은 파일 안의 클래스 상수와 클래스를 돌려주는 헬퍼 함수(`pill(selected)` 같은)까지 따라가 실제 문자열을 복원했습니다. 개발 전용 표본집인 `InventoryPage.tsx`는 다른 파일의 코드를 옮겨 놓은 것이라 중복을 피하려고 셈에서 뺐습니다.

버튼류는 배경 · 테두리 · 글자색 · 그림자 네 축이 같으면 같은 아키타입으로 묶었습니다. 크기와 여백은 축에서 뺐습니다 — 크기가 다른 같은 버튼을 두 종류로 세지 않기 위해서입니다.

## 무엇이 나왔는가

| 항목 | 요소 수 | 서로 다른 모양 |
| --- | --- | --- |
| 버튼 · 누르는 요소 (raw) | 201 | 102 |
| `RetroButton` | 63 | prop 조합 33 |
| 카드 · 면 | 202 | 80 |
| 배지 · 칩 | 73 | 43 |
| 입력 (`input` · `select` · `textarea`) | 54 | 22 |
| 제목 · 라벨 글자 (대문자 · 900 · 자간) | 317 | 121 |
| 그림자 값 | — | 33 |
| 손으로 짠 모달 겹판 | 7 | z-index 7가지 (50 ~ 1100), 막 3가지 |

가장 큰 문제는 버튼이었습니다. `RetroButton`이 있는데도 raw `<button>`이 세 배 넘게 많았고, 같은 뜻의 버튼이 자리마다 다르게 칠해져 있었습니다. 예를 들어 "안 골린 토글 칩" 하나가 `border-black/30 text-black/40`(EventFormModal) · `border-black/30 text-black/50`(Admin) · `bg-white/60 border-retro-accent5 text-black/50`(Trade)처럼 적어도 네 가지로 적혀 있었습니다. RetroButton의 variant 축이 `primary · secondary · white · black` 넷뿐이라 그 밖의 모양은 전부 raw로 새어 나간 것입니다.

글자는 `text-[10px] font-black uppercase tracking-widest text-black/40`(35회)와 `RetroSubTitle`(41회) 두 구조 라벨이 압도적이었고, 약한 글자는 대부분 `text-black/40`(흰 면 위 2.85:1)로 AA에 못 미쳤습니다.

그림자는 `4px 4px 0 0 rgba(0,0,0,.2)`(43회)가 기본이었지만, 같은 4px에 투명도만 다른 값이 다섯(.1 · .12 · .15 · .18 · .25), 2px · 3px · 6px · 8px와 blur 15px 짜리까지 섞여 있었습니다.

## 축으로 정리한 것

계측이 요구한 축은 셋이었고, funky-ui는 그 셋을 그대로 만들었습니다.

- **accent × variant** — 버튼 102종이 "어떤 색(accent 9)을 어떻게 칠하는가(variant 11)" 두 축 안으로 들어옵니다. 규칙은 [Color](../foundations/color.md)의 레시피 표입니다.
- **selected는 상태** — 41번 쓰인 `isSelected`는 variant가 아니라 "같은 accent의 filled로 바뀜"입니다. 그림자를 켠 버튼이면 거기에 105%로 커지는 모양이 따라옵니다(class-explorer의 골린 버튼과 같습니다).
- **그림자 두 단** — 33개 값이 `raised`(4px)와 `floating`(6px, 모달 전용)으로 모입니다.

자세한 대응은 [이관표](migration.md)에 있습니다.

## 층으로 나눈 것

class-explorer의 컴포넌트를 funky-ui의 층에 놓으면 이렇습니다. "앱에 남음"은 데이터를 받거나 화면 하나에만 있는 조합이라 시스템으로 옮기지 않고, 앱이 funky 컴포넌트로 다시 짜는 것들입니다.

### Atoms로

| class-explorer | funky-ui | 비고 |
| --- | --- | --- |
| `atoms/RetroButton` · raw `<button>` 102종 | `Button` · `IconButton` | accent × variant × size × shadow |
| `atoms/RetroChip` · 배지 43종 | `Badge` | 같은 레시피, hover 없음 |
| `atoms/RetroSpinner` | `Spinner` | 모양 그대로 (paper-ui에서 옮긴 고리) |
| 상단 바 · 학기 선택의 유리 버튼 | `NavButton` (Pressable + Selectable + `Glass`) | 재원님 스케치의 Glass variant를 따로 뺐고, 유리 칠은 `Glass` primitive입니다 |
| 폼 입력 · select · textarea | `Input` · `Select` · `Textarea` | 그림자는 `shadow` prop이고 포커스에 거둡니다 — 반대 규칙(Trade 검색칸)은 두지 않았습니다. 면은 `Surface`에서 빌립니다 |
| 체크박스 (native 그대로였음) | `Checkbox` · `Radio` · `Switch` | |
| 폼 이름표 (`labelClass`) | `Label` | overline 글자 |
| 카드 안 구분선 (`border-black/10`) | `Divider` | |
| PrivacyPage의 밑줄 링크 | `Link` | |

### Molecules로

| class-explorer | funky-ui |
| --- | --- |
| `atoms/RetroCard` | `Card` (+ `Card.Header` · `Card.Section`) — Surface 위 |
| `atoms/RetroSubTitle` | `SectionTitle` |
| `molecules/PageHeader` | `PageHeader` |
| `molecules/AccordionSection` | `Accordion` |
| `atoms/RetroStatItem` | `Stat` |
| `molecules/BarChartRow` | `Meter` |
| `atoms/RetroTooltip` | `Tooltip` (`disabled`로 ⌘ 누를 때만) |
| `atoms/SearchInput` | `SearchField` |
| `TermSwitcher`의 목록 | `Menu` |
| 모달 겹판 7개 | `Modal` (native `<dialog>`) — 안에서 여는 `Menu` · `Tooltip`도 그 안에 그려져 보입니다 |
| 화면 전환 버튼 줄 (Browse의 Students · Teachers …) | `Tabs` |
| 값 고르는 버튼 줄 (급식 끼니 · 필터 · 학기) | `SegmentedControl` |
| 오류 · 안내 상자 (`bg-retro-primary/10 border-retro-primary`) | `Notice` — Paint(plain) 위 |
| 빈 카드 ("오늘은 정해진 일정이 없습니다") | `EmptyState` |
| 폼의 이름표 + 칸 + 안내 | `FormField` |

### Components로 (class-explorer 전용)

| class-explorer | funky-ui |
| --- | --- |
| `Navigation` | `AppBar` (보라는 Surface `brand`이고 `accent`를 받지 않음) |
| `Sidebar` | `SideNav` |
| `BottomNav` | `BottomNav` (보라는 Surface `brand`이고 `accent`를 받지 않음, 펼친 More 판은 앱에 남음) |
| `TermSwitcher` | `TermSwitcher` |
| `atoms/StudentBadge` | `StudentBadge` (진동 `buzz` 포함) |
| `atoms/StudentCard` · `atoms/TeacherCard` | `PersonCard` |
| 학과색 칸 (DayRuler · TodayTimeline · WeekTimetable) | `ClassTile` (`upcoming · now · past · free`) |
| `TimetableGrid` · `SectionsTimetable` · `RoomsPage`의 격자 | `TimetableGrid` |

### 앱에 남음 — funky 컴포넌트로 다시 짬

`EntityCard` · `SearchResultDisplay` · `SectionCard` · `SubjectAccordionItem` · `FilterSection` · `MealCard` · `MySubjects` · `TodayCardV1~V3` · `DayRuler` · `TodayTimeline` · `WeekTimetable` · `VacationBar` · `CalendarGrid` · `CourseGraph` · `DeviceSessions` · `FriendsManager` · `MajorPicker` · `MajorPrompt` · `MajorSettings` · `GoogleLinkModal` · `EventFormModal` · `MaterialPreviewModal` · `MaterialReviewPanel` · `RequestSidebar` · `StatsCards` · `SyllabusPanel` · `GoogleLoginButton` · `CopyButton` · `admin/*` · `agent/*` · `zamong/*` · `pages/*`

자몽(`zamong/*`)은 "워크북과 같은 경험"이 목적이라 원본 모양을 바꾸지 않는다는 규칙이 있어, 버튼 · 입력만 funky로 바꾸고 판의 모양은 그대로 둡니다.

## 아직 시스템에 없는 것

검수에서 정할 것들입니다.

- **실행 중에 정해지는 색의 버튼** — `MajorPicker`는 학과색(hex 11가지)으로 고른 버튼을 칠합니다. 학과색은 네온 accent 아홉 밖의 색이라 `Button`으로는 칠할 수 없습니다. hex를 받는 탈출구를 Button(Paint)에 두지는 않기로 했습니다 — 실행 중에 색을 계산하지 않는다는 규칙을 깨고, 임의의 색에서는 글자 대비(WCAG)도 보장할 수 없기 때문입니다. 지금 실행 중의 색은 Components가 `--fk-tone`(`toneStyle`)으로만 칠합니다(`ClassTile` · `StudentBadge`). 남은 것은 학과를 accent에 묶을지, 학과색 버튼도 그 길(Components)에 올릴지입니다.
- **고른 카드** — EntityCard의 `isActive`(`scale-105 shadow-retro-lg`)는 가이드에만 있고 코드에는 없습니다. 쓰이는 곳이 없어 `Card`에 `selected`는 더하지 않았습니다.
- **떠 있는 창 · 아래에서 올라오는 판** — Ask의 데스크탑 미니 창(`Window`)과 모바일 전체 화면 판(`Sheet`). 지금은 `agent/AgentPanel` 안에 있습니다.
- **좌우로 훑는 글자** (`MarqueeText`) — 범용 primitive 후보입니다.
- **어두운 면 위의 글자 링크** — 랜딩 · 개인정보 화면의 바닥글(`text-white/40 hover:text-white`).
