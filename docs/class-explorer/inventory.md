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

- **accent × variant** — 버튼 102종이 "어떤 색(accent 9)을 어떻게 칠하는가(variant 15)" 두 축 안으로 들어옵니다. 규칙은 [Color](../foundations/color.md)의 레시피 표입니다.
- **selected는 상태** — 41번 쓰인 `isSelected`는 variant가 아니라 "같은 accent의 filled로 바뀜"입니다. 골라지면 105%로 커지는 모양이 따라옵니다(class-explorer의 골린 버튼 · 칩과 같습니다).
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
| PrivacyPage의 밑줄 링크 · `hover:underline` 조용한 링크 | `Link` | 조용한 링크는 `underline="hover"` |
| SettingsPage의 코드 칩 | `Code` | |
| 달력 · 오늘 카드의 분류 점 · 띠 | `Swatch` | 점 · 둥근 점 · 띠 |
| `-skew-x-6` 로고 글자 | `Wordmark` | AppBar가 이걸 씁니다 |

### Molecules로

| class-explorer | funky-ui |
| --- | --- |
| `atoms/RetroCard` | `Card` (+ `Card.Header` · `Card.Section` · `Card.Strip`) — Surface 위. 머리는 `eyebrow` · `description`으로 두 줄이 되고, 카드 안 전폭 색 띠는 `Card.Strip`입니다. 색 면 카드(`StatsCards` · Trade)는 `Paint`의 `shadow`와 `Pressable`의 `lift`로 짭니다 |
| `atoms/RetroSubTitle` | `SectionTitle` |
| `molecules/PageHeader` | `PageHeader` |
| `molecules/AccordionSection` | `Accordion titleStyle="section"` · 촘촘한 접이식 줄은 `size="sm"` |
| `atoms/RetroStatItem` | `Stat` |
| `molecules/BarChartRow` | `Meter` — 이름을 누르면 거르는 쓰임은 `onSelect`, 막대 위 설명은 `tooltip`입니다. 마우스를 따라가는 풍선은 막대 위에 고정된 풍선으로 모았습니다 |
| `atoms/RetroTooltip` | 글자 설명은 `Tooltip`(`disabled`로 ⌘ 누를 때만). 사람 카드를 담는 풍선과 부모가 여닫는 쓰임은 `Popover`(`trigger="hover" · "click" · "manual"`)입니다 |
| `atoms/SearchInput` | `SearchField` — 최근 검색어 목록은 `suggestions` |
| `TermSwitcher`의 목록 | `Menu` |
| 모달 겹판 7개 | `Modal` (native `<dialog>`) — 안에서 여는 `Menu` · `Tooltip` · `Popover`도 그 안에 그려져 보입니다. 머리의 부제 · 동작 버튼 · 닫기 없는 창 · 본문이 꽉 차는 넓은 창도 `Modal`의 prop입니다 |
| 가장자리에서 밀려 나오는 서랍 · 시트 (`RequestSidebar`) | `Drawer` |
| 파일 끌어놓기 칸 (`UploadPage`) | `FileDrop` |
| 데이터 표 (`zamong/Roadmap`) | `Table` |
| 영역을 덮는 불러오는 중 (`SearchPage`) | `Busy` |
| 화면 전환 버튼 줄 (Browse의 Students · Teachers …) | `Tabs` |
| 값 고르는 버튼 줄 (Admin 학기 · 거르개 칩) | `SegmentedControl`(이어 붙인 칸은 `attached`). accent 가 줄 전체에 하나라, 칸마다 색이 다른 급식 끼니는 `ToneButton`을 나란히 놓습니다 |
| 오류 · 안내 상자 (`bg-retro-primary/10 border-retro-primary`) | `Notice` — Paint(plain) 위. 꽉 찬 색 띠에 그림자를 단 알림(Upload · Materials)은 `variant="solid" shadow`이고, 좁은 폭에서 버튼이 내려가는 배너는 `wrap`입니다 |
| 빈 카드 ("오늘은 정해진 일정이 없습니다") | `EmptyState` |
| 폼의 이름표 + 칸 + 안내 | `FormField` |

### Components로 (class-explorer 전용)

| class-explorer | funky-ui |
| --- | --- |
| `Navigation` | `AppBar` (보라는 Surface `brand`이고 `accent`를 받지 않음) |
| `Sidebar` | `SideNav` |
| `BottomNav` | `BottomNav` (보라는 Surface `brand`이고 `accent`를 받지 않음). More 칸은 `ref` · `aria-expanded`를 달고, 판은 앱이 `Floating scrim`으로 짭니다 |
| `TermSwitcher` | `TermSwitcher` |
| `atoms/StudentBadge` | `StudentBadge` (진동 `buzz` 포함) |
| `atoms/StudentCard` · `atoms/TeacherCard` | `PersonCard` — 학생은 2열(기본), 교사는 `columns={1}` · `size="sm"`, 풍선 안의 평면 변형은 `framed={false}`입니다. `EntityCard`의 떠오름과 `+ N MORE`는 `motion="lift"` · `footer`입니다 |
| 학과색 칸 (DayRuler · WeekTimetable) | `ClassTile` (`upcoming · now · past · free · focus · dim`, 두 줄 과목명은 `titleLines`, 누르는 칸은 `onClick`). `TodayTimeline`의 줄은 타일이 아니라 왼쪽 띠가 있는 줄이라 `ToneSwatch shape="rail"`로 짭니다 |
| `TimetableGrid` · `SectionsTimetable` | `TimetableGrid` (점심 · 저녁 빗금 행은 `periods`의 `band`) |
| `RoomsPage` · `AnalysisPage`의 시간 고르는 격자 | `TimetableGrid flush` 안의 `SlotCell` — 칸 전체를 상태 면으로 칠합니다 |
| 점심 · 저녁 빗금 띠 · 지금을 짚는 캐럿 (DayRuler · VacationBar) | `BreakBand` · `TimeCaret` |
| `RetroButton color` (학과 · 끼니) | `ToneButton` |
| 기수 거르개 (`FilterSection` · `BrowsePage`) | `ToneChip` |
| 색을 깐 안내 상자 · 프로필 칸 (`MajorPrompt` · `SearchResultDisplay`) | `ToneBox` |
| 학과 · 등급 범례 칸 (`ZamongPage`) | `ToneSwatch` (줄 왼쪽 띠는 `shape="rail"`) |
| 실행 중의 색 글자 (`TodayCardV3`) | `ToneText` |

### 앱에 남음 — funky 컴포넌트로 다시 짬

`EntityCard` · `SearchResultDisplay` · `SectionCard` · `SubjectAccordionItem` · `FilterSection` · `MealCard` · `MySubjects` · `TodayCardV1~V3` · `DayRuler` · `TodayTimeline` · `WeekTimetable` · `VacationBar` · `CalendarGrid` · `CourseGraph` · `DeviceSessions` · `FriendsManager` · `MajorPicker` · `MajorPrompt` · `MajorSettings` · `GoogleLinkModal` · `EventFormModal` · `MaterialPreviewModal` · `MaterialReviewPanel` · `RequestSidebar` · `StatsCards` · `SyllabusPanel` · `GoogleLoginButton` · `CopyButton` · `admin/*` · `agent/*` · `zamong/*` · `pages/*`

자몽(`zamong/*`)은 "워크북과 같은 경험"이 목적이라 원본 모양을 바꾸지 않는다는 규칙이 있어, 버튼 · 입력만 funky로 바꾸고 판의 모양은 그대로 둡니다.

## 시스템에 없는 것

class-explorer의 `components/` · `pages/` 파일 81개를 funky-ui와 하나씩 대조한 결과(2026-10-30)에서 빠진 조각은 모두 59종이 남아 있었습니다. 그 가운데 54종을 이후 시스템에 채웠거나 사다리의 가까운 값으로 모았고, 지금 남은 것은 앱에 남기기로 **정한** 것뿐입니다. 파일별 집계(빈 곳 없이 옮겨지는 파일, 일부가 빠지는 파일)는 이 갱신에서 다시 세지 않았습니다. `InventoryPage`는 실제 화면이 아니라 견본 페이지라 처음부터 뺐습니다.

채운 54종이 어느 부품으로 갔는지는 위 "층으로 나눈 것"의 표와 [이관표](migration.md)에 있습니다. 새 variant 셋(`tinted` · `wash` · `ghostTint`), 글자 역할 `hero`, 테두리의 변 · 선(`borderSide` · `borderStyle`), 움직임 `still` · `panel` · `sheet` · `pulse` · 아이콘 몸짓, `Floating`의 `scrim`이 Foundations · Primitives의 빈 곳을 메웠고, `Marquee` 하나가 Atoms에, 다섯 부품(`Table` · `Popover` · `Drawer` · `FileDrop` · `Busy`)이 Molecules에, 네 부품(`BreakBand` · `TimeCaret` · `SlotCell` · `ToneText`)이 Components에 더해졌습니다.

### 앱에 남기기로 정한 것

| 남는 것 | 대표 자리 | 앱에 남기는 까닭 |
| --- | --- | --- |
| `WeekTimetable` 전용 격자 — 열 폭 고정, 옅은 머리, 오늘 열 기둥, 연강 행 병합 | `home/WeekTimetable.tsx` | 주간 시간표 한 화면의 배치 규칙입니다. 범용 `TimetableGrid`(균등한 열, 검정 머리, 오늘 요일 칸 하나 뒤집기)에 prop으로 얹으면 이 화면 말고는 쓰지 않는 prop이 쌓입니다. 앱이 `Surface` · `ClassTile`로 직접 짭니다 |
| 교육과정 SVG 그래프, `CourseBoard`의 선 그래프 | `CourseGraph.tsx` · `CourseBoard` | 데이터에서 좌표를 계산해 그리는 SVG 그림이라 컴포넌트가 아니라 그 화면의 그래픽입니다. 색과 선 굵기만 시스템 토큰을 읽습니다 |
| 스크롤 가장자리 그림자 | 스크롤하는 틀 | 한 틀에 붙는 장식입니다. 시스템의 그림자는 `raised`(4px)와 `floating`(6px) 두 단이고 blur가 없어서, 가장자리가 번지는 그림자는 들어올 자리가 없습니다. 앱 CSS로 둡니다 |
| `CourseCard`의 파스텔 면 | `CourseCard` | `Surface`에 inline 색 하나를 주면 충분합니다. 이 면만을 위한 variant나 부품은 두지 않습니다 |

### 정규화한 것

- **마우스를 따라가는 풍선(`tooltip-cursor`)** — 막대 위에 고정된 풍선으로 모았습니다(`Meter`의 `tooltip`, [`Popover`](../molecules/README.md#popover)). 같은 정보를 전하면서 위치가 흔들리지 않고, 키보드 포커스로도 열려서 풍선이 `Popover` 하나로 모입니다.
- **끌기 커서(`cursor-grab`)** — Tailwind 유틸리티로 둡니다. 커서 모양 하나는 시스템이 따로 이름 붙일 값이 아니고, 끌어놓기의 강조(칸이 물드는 모양)는 `FileDrop`이 맡습니다.

### 정해 둔 것

- **크림 위의 흰 버튼** — `outline`은 스케치대로 면을 투명하게 두고, 흰 면 variant `paper`를 더했습니다. `outline`의 면을 흰색으로 바꾸면 흰 카드 안에서는 같아 보이지만 스케치의 정의를 어깁니다.
- **실행 중에 정해지는 색의 버튼** — `MajorPicker`는 학과색(hex 11가지)으로 고른 버튼을 칠합니다. 학과색은 네온 accent 아홉 밖의 색이라 `Button`으로는 칠할 수 없습니다. hex를 받는 탈출구를 Button(Paint)에 두지 않고, Components에 `ToneButton` · `ToneChip` · `ToneBox` · `ToneSwatch`를 두었습니다. 학과를 accent에 묶지 않았습니다 — 열한 색이 아홉으로 줄어 학과가 겹칩니다. 글자는 `toneInk`가 면 색에서 검정이나 흰색을 고르고, 이것이 실행 중에 색을 계산하지 않는다는 규칙의 유일한 예외입니다.
- **Ask 버튼의 몸짓** — class-explorer 가이드가 사용자 요청의 예외로 두고 되돌리지 말라고 적은 몸짓이라 `sink`로 합치지 않고 `shrink`를 더했습니다. Ask 단추 말고는 쓰지 않습니다.
- **색 버튼의 커지기** — class-explorer의 색 버튼은 나란히 붙으면 테두리가 굵어 보인다는 이유로 골라져도 커지지 않습니다. funky-ui는 골라진 Button을 색과 상관없이 키웁니다. 끼니 버튼을 옮기면 모양이 조금 달라지고, 어색하면 그때 끄는 길을 더합니다. 여러 개를 함께 켜는 `ToneChip`은 Button이 아니고 줄 전체가 커지면 뜻이 없어서 커지지 않습니다.
- **고른 카드** — EntityCard의 `isActive`(`scale-105 shadow-retro-lg`)는 가이드에만 있고 코드에는 없습니다. 쓰이는 곳이 없어 `Card`에 `selected`는 더하지 않았습니다.
