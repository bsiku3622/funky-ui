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

- **accent × variant** — 버튼 102종이 "어떤 색(accent 9)을 어떻게 칠하는가(variant 12)" 두 축 안으로 들어옵니다. 규칙은 [Color](../foundations/color.md)의 레시피 표입니다.
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
| `atoms/RetroCard` | `Card` (+ `Card.Header` · `Card.Section`) — Surface 위. 색 면 카드(`StatsCards`)는 아직 없습니다 |
| `atoms/RetroSubTitle` | `SectionTitle` |
| `molecules/PageHeader` | `PageHeader` |
| `molecules/AccordionSection` | `Accordion titleStyle="section"` |
| `atoms/RetroStatItem` | `Stat` |
| `molecules/BarChartRow` | `Meter` — 읽기 전용입니다. 이름 · 막대를 누르는 쓰임과 마우스를 따라가는 풍선은 아직 없습니다 |
| `atoms/RetroTooltip` | 글자 설명은 `Tooltip`(`disabled`로 ⌘ 누를 때만). 호출 5곳 중 3곳이 쓰는 사람 카드 풍선과 부모가 여닫는 쓰임은 아직 없습니다 |
| `atoms/SearchInput` | `SearchField` — 최근 검색어 목록은 아직 없습니다 |
| `TermSwitcher`의 목록 | `Menu` |
| 모달 겹판 7개 | `Modal` (native `<dialog>`) — 안에서 여는 `Menu` · `Tooltip`도 그 안에 그려져 보입니다 |
| 화면 전환 버튼 줄 (Browse의 Students · Teachers …) | `Tabs` |
| 값 고르는 버튼 줄 (Admin 학기 · 거르개 칩) | `SegmentedControl`. accent 가 줄 전체에 하나라, 칸마다 색이 다른 급식 끼니는 `ToneButton`을 나란히 놓습니다 |
| 오류 · 안내 상자 (`bg-retro-primary/10 border-retro-primary`) | `Notice` — Paint(plain) 위. 꽉 찬 색 띠에 그림자를 단 알림(Upload · Materials)은 아직 없습니다 |
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
| `atoms/StudentCard` · `atoms/TeacherCard` | `PersonCard` — 2열 · 그림자 카드까지입니다. 교사 카드의 1열, 풍선 안의 평면 변형은 아직 없습니다 |
| 학과색 칸 (DayRuler · WeekTimetable) | `ClassTile` (`upcoming · now · past · free`). `TodayTimeline`의 줄은 타일이 아니라 왼쪽 띠가 있는 줄이라 여기 들지 않습니다 |
| `TimetableGrid` · `SectionsTimetable` | `TimetableGrid` |
| `RoomsPage` · `AnalysisPage`의 시간 고르는 격자 | 아직 없습니다 — 칸 전체를 상태 면으로 칠하는 격자라 `ClassTile` 격자와 다릅니다 |
| `RetroButton color` (학과 · 끼니) | `ToneButton` |
| 기수 거르개 (`FilterSection` · `BrowsePage`) | `ToneChip` |
| 색을 깐 안내 상자 · 프로필 칸 (`MajorPrompt` · `SearchResultDisplay`) | `ToneBox` |
| 학과 · 등급 범례 칸 (`ZamongPage`) | `ToneSwatch` |

### 앱에 남음 — funky 컴포넌트로 다시 짬

`EntityCard` · `SearchResultDisplay` · `SectionCard` · `SubjectAccordionItem` · `FilterSection` · `MealCard` · `MySubjects` · `TodayCardV1~V3` · `DayRuler` · `TodayTimeline` · `WeekTimetable` · `VacationBar` · `CalendarGrid` · `CourseGraph` · `DeviceSessions` · `FriendsManager` · `MajorPicker` · `MajorPrompt` · `MajorSettings` · `GoogleLinkModal` · `EventFormModal` · `MaterialPreviewModal` · `MaterialReviewPanel` · `RequestSidebar` · `StatsCards` · `SyllabusPanel` · `GoogleLoginButton` · `CopyButton` · `admin/*` · `agent/*` · `zamong/*` · `pages/*`

자몽(`zamong/*`)은 "워크북과 같은 경험"이 목적이라 원본 모양을 바꾸지 않는다는 규칙이 있어, 버튼 · 입력만 funky로 바꾸고 판의 모양은 그대로 둡니다.

## 아직 시스템에 없는 것

class-explorer의 `components/` · `pages/` 파일 81개를 funky-ui와 하나씩 대조한 결과입니다(2026-10-30). `InventoryPage`는 실제 화면이 아니라 견본 페이지라 뺐습니다. 크기나 색이 사다리의 가까운 값으로 모이는 정규화는 빈 곳으로 세지 않았습니다.

처음 대조했을 때는 80개 가운데 빈 곳 없이 옮겨지는 파일이 14개, 일부가 빠지는 파일이 48개, 재현할 수 없는 조각이 있는 파일이 18개였고, 빠진 조각은 72종(센 쓰임 385회)이었습니다. 그 뒤 13종(224회)을 채워 지금은 빈 곳 없는 파일이 27개, 일부가 빠지는 파일이 39개, 재현할 수 없는 조각이 있는 파일이 14개입니다. 아래 표에는 남은 59종만 둡니다.

횟수는 검사에서 센 쓰임새입니다. 같은 모양을 파일마다 세었으니 정확한 개수가 아니라 규모를 가늠하는 값입니다.

### Foundations · Primitives — 글자 · 선 · 몸짓

| 빠진 것 | 횟수 | 대표 자리 |
| --- | --- | --- |
| 연한 면 + accent 테두리 + 검정 글자 레시피 | 6 | `CourseGraph.tsx:23-24` |
| 실행 중 hex로 칠하는 글자 | 6 | `home/TodayCardV3.tsx:388-399` |
| 한쪽만 긋는 테두리 | 5 | `RequestSidebar.tsx:91` |
| 로딩 글자 · 상태 점의 깜빡임(`animate-pulse`) | 5 | `Sidebar.tsx:98` |
| 48~72px 큰 제목 — `display`(36px) 위의 한 단 (랜딩 · 검색 프로필) | 5 | `SearchResultDisplay.tsx:243` |
| 점선 테두리 — EmptyState · ClassTile 안에만 있습니다 | 4 | `CourseGraph.tsx:25-28` |
| hover와 무관하게 남는 그림자, 그림자를 둔 채 꺼진 칸 | 4 | `CourseGraph.tsx:247-255` |
| 넘칠 때만 좌우로 훑는 한 줄 (`MarqueeText`) | 2 | `atoms/MarqueeText.tsx:27` |
| 앱이 만든 창에 등장 몸짓을 거는 길, 96% 크기 · 24px 단 | 2 | `agent/AgentPanel.tsx:81` |
| hover 때 아이콘만 도는 몸짓 | 2 | `FilterSection.tsx:43` |
| 끌기 커서 · 드롭 대상 강조 | 2 | `zamong/Roadmap.tsx:487-489` |
| 부모 hover 때 안쪽 화살표가 밀리는 몸짓 | 1 | `HomePage.tsx:448` |
| 면만 칠하고 테두리 없는 연한 칩 (달력 분류) | 1 | `CalendarGrid.tsx:119` |
| 취소선 글자 | 1 | `TradePage.tsx:962` |
| 떠 있는 판 뒤의 어두운 막 (하단 바 More 판) | 1 | `BottomNav.tsx:106` |

### Atoms

| 빠진 것 | 횟수 | 대표 자리 |
| --- | --- | --- |
| 면 · 테두리 없이 줄 안에서 치는 입력 | 6 | `zamong/Roadmap.tsx:262-284` |
| 줄바꿈되는 배지 (거절 사유 같은 긴 글자) | 5 | `RequestSidebar.tsx:114-128` |
| 무테 버튼 · 줄이 accent 면으로 반응하는 hover | 5 | `zamong/Roadmap.tsx:518-534` |
| 불러오는 동안 제자리에서 도는 아이콘 | 3 | `admin/FactsPanel.tsx:446` |
| 막지 않는 경고 상태의 입력칸 (주황) | 3 | `AdminPage.tsx:780` |
| 대소문자를 유지하는 버튼 글자 | 2 | `GoogleLoginButton.tsx:48-59` |
| 두 줄 · 56~64px 타일형 버튼 (빈 강의실) | 1 | `RoomsPage.tsx:187-206` |
| 줄바꿈되는 긴 문장 버튼 | 1 | `ZamongPage.tsx:593` |
| 무테 하이라이트 마커 | 1 | `zamong/Roadmap.tsx:456-469` |

### Molecules

| 빠진 것 | 횟수 | 대표 자리 |
| --- | --- | --- |
| 범용 데이터 표 — 머리 · 행 머리 · 숫자 칸 · 가로 스크롤 | 6 | `zamong/Roadmap.tsx:151-218` |
| 칸이 이어 붙은 세그먼트 | 5 | `AdminPage.tsx:746` |
| 두 줄 카드 머리 | 5 | `ExamsPage.tsx:54` |
| 꽉 찬 색 띠 + 그림자 알림 | 5 | `UploadPage.tsx:337` |
| 눌러 고정하거나 ⌘로 뜨는 흰 면 판 (사람 카드 · 요약) | 5 | `SectionCard.tsx:78` |
| 누르는 막대 · 막대 위 설명 | 5 | `AnalysisPage.tsx:674-687` |
| 색 면 + 그림자 + 떠오름 카드 (StatsCards · Trade) | 4 | `StatsCards.tsx:20` |
| 실행 중 색의 왼쪽 띠가 있는 줄 (오늘 목록 · 홈) | 4 | `home/TodayCardV3.tsx:295-302` |
| 카드 · 모달 안의 전폭 색 띠 | 3 | `UploadPage.tsx:324` |
| 입력에 붙는 제안 · 최근 검색어 목록 | 3 | `atoms/SearchInput.tsx:123` |
| 촘촘한 접이식 줄 | 3 | `AdminPage.tsx:1091` |
| 파일 끌어놓기 칸 | 2 | `UploadPage.tsx:283` |
| 닫기 버튼 없는 모달 | 2 | `GoogleLinkModal.tsx:72-80` |
| 머리 막대의 동작 버튼 · 두 줄 제목 | 2 | `MaterialPreviewModal.tsx:78-86` |
| 본문이 남은 높이를 채우는 넓은 모달 (자료 미리보기) | 2 | `MaterialPreviewModal.tsx:72-77` |
| 좁은 폭에서 버튼이 아래로 내려가는 Notice | 2 | `ZamongPage.tsx:467` |
| 가장자리에서 밀려 나오는 서랍 · 시트 | 1 | `RequestSidebar.tsx:31-35` |
| 카드를 담는 흰 풍선 | 1 | `atoms/RetroTooltip.tsx:88` |
| 마우스를 따라가는 풍선 | 1 | `molecules/BarChartRow.tsx:45` |
| 영역을 덮는 불러오는 중 | 1 | `SearchPage.tsx:126-136` |

### Components (class-explorer 전용)

| 빠진 것 | 횟수 | 대표 자리 |
| --- | --- | --- |
| 시간표의 점심 · 저녁 빗금 행 | 4 | `home/WeekTimetable.tsx:515-550` |
| 열릴 때 도는 ▾ (TermSwitcher) | 3 | `TermSwitcher.tsx:59` |
| 칸 전체를 상태 면으로 칠하는 격자 (빈 강의실 · 분석 비교) | 2 | `RoomsPage.tsx:142-155` |
| 두 줄 과목명 · 여러 줄 메타의 타일 | 2 | `home/WeekTimetable.tsx:649-695` |
| 지목한 칸 강조 · 나머지 흐림 (Trade) | 2 | `TimetableGrid.tsx:105` |
| 지금을 짚는 선 + 마름모 캐럿 (DayRuler · VacationBar) | 2 | `DayRuler.tsx:229` |
| 풍선 안의 평면 사람 카드 | 2 | `atoms/StudentCard.tsx:56` |
| 1열 교사 카드 | 1 | `atoms/TeacherCard.tsx:22` |
| 사람 카드의 떠오름 · + N MORE | 1 | `EntityCard.tsx:20` |
| 움직임을 줄인 사람에게도 보이는 일치 표시 | 1 | `SectionCard.tsx:241` |
| 교시 열 · 요일 머리 고정과 스크롤 | 1 | `home/WeekTimetable.tsx:422-425` |
| 옅은 머리 + 오늘 칸 색 | 1 | `home/WeekTimetable.tsx:460-484` |
| 오늘 열 기둥 | 1 | `home/WeekTimetable.tsx:499-507` |
| 연강 행 병합 | 1 | `home/WeekTimetable.tsx:601-648` |
| 교육과정 SVG 그래프 — 앱에 남깁니다 | 1 | `CourseGraph.tsx:151-209` |

### 정해 둔 것

- **크림 위의 흰 버튼** — `outline`은 스케치대로 면을 투명하게 두고, 흰 면 variant `paper`를 더했습니다. `outline`의 면을 흰색으로 바꾸면 흰 카드 안에서는 같아 보이지만 스케치의 정의를 어깁니다.
- **실행 중에 정해지는 색의 버튼** — `MajorPicker`는 학과색(hex 11가지)으로 고른 버튼을 칠합니다. 학과색은 네온 accent 아홉 밖의 색이라 `Button`으로는 칠할 수 없습니다. hex를 받는 탈출구를 Button(Paint)에 두지 않고, Components에 `ToneButton` · `ToneChip` · `ToneBox` · `ToneSwatch`를 두었습니다. 학과를 accent에 묶지 않았습니다 — 열한 색이 아홉으로 줄어 학과가 겹칩니다. 글자는 `toneInk`가 면 색에서 검정이나 흰색을 고르고, 이것이 실행 중에 색을 계산하지 않는다는 규칙의 유일한 예외입니다.
- **Ask 버튼의 몸짓** — class-explorer 가이드가 사용자 요청의 예외로 두고 되돌리지 말라고 적은 몸짓이라 `sink`로 합치지 않고 `shrink`를 더했습니다. Ask 단추 말고는 쓰지 않습니다.
- **색 버튼의 커지기** — class-explorer의 색 버튼은 나란히 붙으면 테두리가 굵어 보인다는 이유로 골라져도 커지지 않습니다. funky-ui는 골라진 Button을 색과 상관없이 키웁니다. 끼니 버튼을 옮기면 모양이 조금 달라지고, 어색하면 그때 끄는 길을 더합니다. 여러 개를 함께 켜는 `ToneChip`은 Button이 아니고 줄 전체가 커지면 뜻이 없어서 커지지 않습니다.
- **고른 카드** — EntityCard의 `isActive`(`scale-105 shadow-retro-lg`)는 가이드에만 있고 코드에는 없습니다. 쓰이는 곳이 없어 `Card`에 `selected`는 더하지 않았습니다.
