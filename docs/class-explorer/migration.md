# 이관표

class-explorer의 지금 클래스 문자열을 funky-ui의 무엇으로 바꾸는지 정리한 표입니다. 왼쪽은 [전수조사](inventory.md)에서 실제로 센 모양이고, 괄호 안 숫자는 그 모양이 나온 횟수입니다.

## 버튼

같은 뜻이던 버튼이 한 줄로 모입니다. 그림자가 있던 자리에는 `shadow`를 붙입니다.

| 지금 | funky-ui | 예 |
| --- | --- | --- |
| `RetroButton` (기본 흰색) | `<Button shadow>` — ⚠️ `outline`은 면이 투명해서 크림 위에서는 흰 버튼이 크림으로 보입니다. 흰 면을 지키는 길은 아직 없습니다 | 대부분의 RetroButton |
| `RetroButton variant="black"` | `<Button variant="filled" shadow>` | 로그인 · 저장 |
| `RetroButton variant="primary"` | `<Button accent="pink" variant="solid" shadow>` | |
| `RetroButton isSelected` | `<Button shadow selected>` — 105%로 커지고 그림자를 그대로 둡니다 | 학과 · 화면 전환 |
| `bg-white border-2 border-black` (12) | `<Button>` · 아이콘만이면 `<IconButton variant="outline">` — 흰 면이 사라지는 것은 위와 같습니다 | MealCard 날짜 화살표 · 업로드 동작 |
| `bg-black text-white border-black` (8) | `<Button variant="filled">` | RequestSidebar "허용" · Admin "확인" |
| 안 골림 `border-black/30 text-black/40` → 골림 `bg-black text-white` (11 + 7) | `<Button variant="muted" selected={…}>` · 줄이면 `SegmentedControl` | EventFormModal 칩 · Admin 학기 |
| `bg-retro-accent1 border-black shadow-3px` (4) | `<Button accent="cyan" variant="solid" shadow>` | SyllabusPanel · MaterialsPage "Preview" |
| `bg-white border-black shadow-3px` (6) | `<Button variant="outline" shadow>` | "Download" · "다시 시도" |
| `bg-white border-black/30 text-black/50` "Refetch" (8) | `<Button size="xs" variant="muted" icon={RefreshCw}>` | Admin · FactsPanel |
| `text-black/40 hover:text-black` 아이콘 (4 + 4) | `<IconButton variant="ghostMuted">` | 닫기 · 새로고침 |
| `text-red-500 hover:text-red-700` 휴지통 (2) | `<IconButton accent="red" variant="ghostMuted">` — 옅다가 hover 때 진해지는 쪽입니다(`ghost`는 반대) | Admin |
| `border-black/30 hover:border-black` 모달 취소 | `<Button variant="hairline">` | Admin 모달 |
| `text-xs font-black hover:text-retro-primary` 글자 버튼 | `<Button size="xs" variant="ghost">` | FilterSection "Refresh" · "Reset" |
| `bg-white/10 border-white/30 text-white` (3) | `<NavButton>` | 로그아웃 · 학기 선택 |
| `bg-retro-green border-black` "Approve" | `<Button accent="green" variant="solid" shadow>` | MaterialReviewPanel |
| `bg-retro-primary border-black` "Reject" · "Withdraw" | `<Button accent="pink" variant="solid">` | MaterialReviewPanel · UploadPage |
| `border-retro-primary text-retro-primary` "거절" | `<Button accent="pink" variant="outline">` | RequestSidebar |
| `bg-retro-accent2 border-black shadow-4px` 링크 | 한 줄이면 `<Button as={Link} accent="yellow" variant="solid" shadow>`. 홈 배너는 두 줄 왼쪽 정렬에 오른쪽 화살표라 Button으로 못 옮기고 `<Pressable as={Link} motion="sink" className={paintClass({ accent: "yellow", variant: "solid", hoverable: true })}>`로 조립합니다 | 홈 배너 |

### Trade의 줄

Trade 화면은 색이 뜻을 짊어지는 대표 자리라 따로 적습니다.

| 지금 | funky-ui |
| --- | --- |
| 유지 · 골림 `bg-black text-white` | `<Button size="xs" variant="muted" selected>` (검정) |
| 이동 · 골림 `bg-retro-accent5 border-retro-accent5` | `<Button size="xs" accent="sky" variant="muted" selected>` |
| 드랍 · 골림 `bg-retro-primary text-white` | `<Button size="xs" accent="pink" variant="muted" selected>` — 글자는 검정이 됩니다 (WCAG) |
| 분반 · 안 골림 `bg-white/50 border-retro-green text-retro-green` | `<Button size="xs" accent="green" variant="outline">` |
| 분반 · 골림 `bg-retro-green border-retro-green` | 같은 버튼 + `selected` |
| 충돌 분반 `bg-retro-accent4/25 border-retro-accent4 text-retro-accent4` | `<Button size="xs" accent="orange" variant="plain">` |
| 이동 중인 카드의 버튼 `bg-white/60 border-retro-accent5 text-black/50` | `<Button size="xs" accent="sky" variant="framelineMuted">` |
| 드랍한 카드 (`bg-retro-primary/10 border-retro-primary`) | `<Paint accent="pink" variant="plain">` — 색이 있는 박스는 Paint입니다 |
| 드랍한 카드 안 버튼 (카드 색을 따름) | 그 Paint 안의 `<Button variant="outline">` — accent가 아래로 흐릅니다 |
| 추가 · 이동 카드 (`bg-retro-green` · 하늘, 그림자 · 떠오름 · 검정 글자) | 아직 없습니다 — Paint에는 그림자 · 몸짓이 없고, `plain`은 글자가 accent 색입니다 |
| 흰 카드 안 안 골린 유지 · 이동 · 드랍 (`bg-white border-black text-black/40`) | `<Button size="xs" variant="framelineMuted">` |

## 그림자

| 지금 | funky-ui |
| --- | --- |
| `4px 4px` (투명도 .1 · .12 · .15 · .16 · .18 · .2 · .25) | `raised` |
| `6px 6px` 카드 | `raised` (카드도 4px입니다) |
| `2px` · `3px` 작은 칩 | 없앰 — 작은 칩은 그림자를 받지 않거나 `raised` |
| `8px 8px` | `floating`(6px) — 모달 전용 |
| `0 4px 0 0` 상단 바 · `0 -4px` 하단 바 | `AppBar` · `BottomNav`가 가짐 |
| `0 0 15px` (blur) | 없앰 — blur는 쓰지 않습니다. 누르는 칸이면 `motion="sink"` |
| 색 그림자 `rgba(255,165,0,.4)` · `var(--color-retro-*)` | 없앰 |

## 모션

class-explorer의 모션 전부를 몸짓 · 상태 모션 · 입력칸으로 나눠 대응시켰습니다(2026-10-29 검사, 셈은 요소 수). "없음"은 funky-ui에 아직 대응물이 없는 것입니다.

| 지금 | funky-ui | 자리 |
| --- | --- | --- |
| `hover:translate-x/y-[3~4px] hover:shadow-none` — 가라앉음 (29) | `sink` — Button `shadow` · Card `motion="sink"` | 그림자 있는 버튼 대부분 · 사람 카드 |
| 골린 버튼 `scale-105 z-10` — 그림자는 그대로, hover 때 그림자만 숨김(제자리) · 누르면 100%. 색 버튼은 커지지 않음 (RetroButton `isSelected` · Rooms · SectionCard) | Selectable의 `grow` — Button `selected`(그림자와 상관없음). 105%로 커져 이웃 위에 서고 4px 그림자 위에 서며, hover 때 그림자만 숨고 누르면 100%로 돌아옵니다. 쉴 때 평평한 칩(분반 카드의 교사 · 교실)도 같습니다. 색 버튼의 '안 커짐' 예외는 두지 않았습니다 | Browse 보기 탭 · 학과 · Admin 필터 · 강의실 · 급식 끼니(색) |
| 골린 카드 `scale-105 shadow-retro-lg` (EntityCard `isActive`) | 없음 — 가이드에만 있고 코드에는 없는 prop이라 옮길 것이 없습니다. Card에 `selected`는 없습니다 | |
| `hover:shadow-[2px…]` — 평평하다가 그림자가 생김 (4) | `raise` — Button `shadow="hover"` (그림자는 4px로) | 복사 버튼 · Trade 과목 추가 칩 |
| `hover:-translate-y-1(.5)` + 그림자 6px — 떠오름 (3) | `lift` — Card `motion="lift"` (4px로 통일). EntityCard는 색 면 패널이 있는 `PersonCard` 구조인데 PersonCard는 `sink` 고정이라 아직 못 옮깁니다 | EntityCard · Trade 카드 |
| `active:scale-95` — 누르는 순간 작아짐 (15) | `tap` · sink의 누르는 순간 | 그림자 없는 버튼 |
| `active:translate-0.5 active:shadow-none`, hover는 색만 (2) | `sink`로 통일 | Show More |
| `hover:scale-95 active:scale-[0.92]` (2) | 없음 — class-explorer 가이드가 사용자 요청의 예외로 두고 되돌리지 말라고 적은 몸짓입니다. `sink`로 합칠지 정해야 합니다 | Ask 플로팅 버튼 · Ask 판 아이콘 버튼 |
| `hover:scale-105 active:scale-95` (2) | 로고는 AppBar가 가짐. Trade 칩은 학번색이라 `StudentBadge onClick`으로 가고, 거기엔 누르는 순간 작아지는 몸짓만 있습니다 | 로고 · Trade 칩 |
| 목록 줄의 hover 회색 층 | Pressable `none` + Surface `fill="none" hoverable` | 검색 추천 · 메뉴 항목 · 아코디언 머리 |
| `group-hover:rotate-[-45deg]` · `group-hover:translate-x-0.5` · `group-hover:scale-105` | 없음 | 초기화 아이콘 · 링크 화살표 · 카드 안 이름 |
| 입력칸 `shadow-[4px…] focus:shadow-none` — 평소 있고 포커스에 거둠 | Input · Textarea · Select `shadow` — 쉴 때 4px, 포커스에 거두고 그 자리를 핑크 링이 채웁니다 | 로그인 · 업로드 · Admin · Materials |
| 입력칸 평소 평평하고 `focus:shadow-[4px…]` — 포커스에 생김 | 없앰 — 위 규칙 하나로 모읍니다. 평평하게 두면 포커스는 링만 받고, 폼의 주인공 칸이면 `shadow`를 줍니다 | Trade 검색칸 둘 (Select Student · Add Subjects) |
| `rotate-180` · `rotate-90` 펼침 화살표 | Accordion에만 있음 — TermSwitcher의 ▾는 돌지 않고, Agent의 단계 줄은 Accordion으로 못 옮깁니다 | Accordion · Trade · TermSwitcher · Agent |
| `animate-in fade-in duration-300` 펼친 내용 | Accordion 본문의 `fade` (300ms, 제자리) | AccordionSection |
| `animate-pulse` 로딩 글자 · 상태 점 (7) | 없음 | Loading… · API 상태 점 |
| `animate-spin` | Spinner. 불러오는 동안 아이콘이 제자리에서 도는 모양(3곳)은 아직 없습니다 | Admin Refetch · 조사 Fetch |
| `badge-buzz` | StudentBadge `buzz` | |
| `marquee-swing` | 없음 — MarqueeText 미결 | 넘치는 한 줄 |
| `ask-pop` · `ask-rise` · view-transition · `slide-in-from-right` | 등장 몸짓 `pop` · `rise`는 있지만 Floating 안에서만 걸립니다 — 앱이 만든 창에 거는 길과 96% 크기 · 기준점 · 24px 단은 없습니다. Window · Sheet 미결 | Ask 창 · Zamong 학기 판 |
| DayRuler 캐럿 `transition-[left] duration-700` | `crawl` 토큰 (컴포넌트는 미이관) | 오늘 시간선 · 방학 막대 |
| `duration-150` · `75` · `500` | `fast`(100) · `base`(200) · `slow`(300)로 통일 | |

## 글자

| 지금 | funky-ui |
| --- | --- |
| `text-[10px] font-black uppercase tracking-widest text-black/40` (35) | `<Text variant="overline">` |
| `RetroSubTitle` (41) | `<SectionTitle>` |
| `text-4xl font-black tracking-tighter uppercase` | `<Text variant="display">` |
| `text-2xl md:text-3xl font-black tracking-tight` | `<Text variant="title">` |
| `text-xl font-black tracking-tight` | `<Text variant="heading">` |
| `text-base font-black` | `<Text variant="subheading">` |
| `text-sm font-bold` | `<Text>` (body) |
| `text-sm font-black` (31) | `<Text weight="black">` |
| `text-xs font-bold` | `<Text variant="caption">` |
| `text-[11px] font-black` | `<Text variant="label">` |
| `text-[10px] font-black` · `text-[9px]` | `<Text variant="micro">` (9px는 10px으로 모읍니다) |
| `text-black/40` · `/45` · `/50` 약한 글자 | `tone="muted"` (AA) |
| `text-black/55` · `/60` · `/70` | `tone="secondary"` |
| `text-black/20` · `/25` · `/30` | `tone="faint"` — 장식 · 꺼진 자리에만 |

## 색 이름

| 지금 | funky-ui |
| --- | --- |
| `retro-primary` · `retro-accent3` (같은 값) | `pink` |
| `retro-secondary` | `purple` |
| 상단 바 · 하단 바의 `bg-retro-secondary` | 없앰 — `AppBar` · `BottomNav`가 Surface `brand`(보라)로 칠하고 `accent`를 받지 않습니다. 바는 앱의 뼈대라 색을 고르는 자리가 아닙니다. 머리띠(Landing · Privacy)도 `Surface fill="brand"`이고, 랜딩의 CTA 띠는 바가 아니라 `Paint accent="purple" variant="filled"`입니다 |
| `retro-accent1` | `cyan` |
| `retro-accent2` | `yellow` |
| `retro-accent4` | `orange` |
| `retro-accent5` | `sky` |
| `retro-green` | `green` |
| Tailwind `red-500` · `red-600` | `red` |
| `retro-bg` | `surface.canvas` |
| `retro-fg` | `ink.primary` |
| `retro-accent-light` (#f0fdff hover 면) | 없앰 — 흑백 면 위의 줄이면 Surface `hoverable`(글자색 7% 층), 색 요소면 Paint `hoverable`. 늘 깔린 배경(Zamong · Landing)은 `Paint accent="cyan" variant="solidMuted"`, 달력의 골린 날은 Surface `fill="well"`입니다 |
| `bg-black/5` · `bg-black/[0.03]` | `surface.well` |
| `border-black/10` | `line.subtle` (`Divider`) |
| `border-black/20` · `/30` | `line.soft` |

## 모달

손으로 짠 겹판 일곱(`fixed inset-0 z-[50~1100] bg-black/40~70`)은 `<Modal>` 하나로 갑니다. native `<dialog>`라 z-index를 고르지 않고, 막은 `rgba(0,0,0,.5)` 하나, 그림자는 6px입니다. 머리 막대는 기본 보라(`accent`)이고, Esc · 막 누름 · 닫기 버튼이 모두 `onClose`를 부릅니다. 입력 중인 폼이면 `dismissible={false}`로 막 누름을 끕니다.

모달 안에서 여는 `Menu` · `Tooltip`은 z-index를 올릴 필요가 없습니다. 판이 열린 `<dialog>` 안에 그려지기 때문에 보이고 눌립니다(body 끝에 그리면 모달 바깥이라 뒤 화면과 함께 비활성이 됩니다). 그 판이 떠 있는 동안의 첫 Esc는 판만 닫고, 다음 Esc가 모달을 닫습니다.

## class-explorer에 붙이는 순서

검수 뒤 6단계에서 이 순서로 붙입니다. 각 단계가 끝날 때마다 `npm run build`와 `npm run lint`가 통과해야 합니다.

1. funky-ui 소스를 `frontend/vendor/funky-ui`로 vendor 하고, Vite에 vanilla-extract 플러그인을 더합니다 ([설치](../get-started/install.md)).
2. `index.css` 맨 위에 `@layer fk, theme, base, components, utilities;`를 선언해 Tailwind 유틸리티가 funky를 이기게 합니다.
3. `RetroButton` · `RetroCard` · `RetroSubTitle` · `RetroChip` · `RetroSpinner`를 funky 컴포넌트로 바꿉니다. atom 이름이 그대로 남아 있는 자리부터라 범위가 분명합니다.
4. raw `<button>`을 위 표대로 바꿉니다. 화면 단위로 나눠 갑니다.
5. 모달 일곱을 `<Modal>`로, 셸(`Navigation` · `Sidebar` · `BottomNav`)을 Components로 바꿉니다.
6. `index.css`의 `@theme` 색과 `.shadow-retro*` · `.student-badge`를 걷어냅니다. 남은 `retro-*` 사용처가 0이 되면 끝입니다.
