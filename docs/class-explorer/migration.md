# 이관표

class-explorer의 지금 클래스 문자열을 funky-ui의 무엇으로 바꾸는지 정리한 표입니다. 왼쪽은 [전수조사](inventory.md)에서 실제로 센 모양이고, 괄호 안 숫자는 그 모양이 나온 횟수입니다.

## 버튼

같은 뜻이던 버튼이 한 줄로 모입니다. 그림자가 있던 자리에는 `shadow`를 붙입니다.

| 지금 | funky-ui | 예 |
| --- | --- | --- |
| `RetroButton` (기본 흰색) | `<Button shadow>` | 대부분의 RetroButton |
| `RetroButton variant="black"` | `<Button variant="solid" shadow>` | 로그인 · 저장 |
| `RetroButton variant="primary"` | `<Button accent="pink" variant="tonal" shadow>` | |
| `RetroButton isSelected` | `<Button selected>` | 학과 · 화면 전환 |
| `bg-white border-2 border-black` (12) | `<Button>` · 아이콘만이면 `<IconButton variant="outline">` | MealCard 날짜 화살표 · 업로드 동작 |
| `bg-black text-white border-black` (8) | `<Button variant="solid">` | RequestSidebar "허용" · Admin "확인" |
| 안 골림 `border-black/30 text-black/40` → 골림 `bg-black text-white` (11 + 7) | `<Button variant="muted" selected={…}>` · 줄이면 `SegmentedControl` | EventFormModal 칩 · Admin 학기 |
| `bg-retro-accent1 border-black shadow-3px` (4) | `<Button accent="cyan" variant="tonal" shadow>` | SyllabusPanel · MaterialsPage "Preview" |
| `bg-white border-black shadow-3px` (6) | `<Button variant="outline" shadow>` | "Download" · "다시 시도" |
| `bg-white border-black/30 text-black/50` "Refetch" (8) | `<Button size="xs" variant="muted" icon={RefreshCw}>` | Admin · FactsPanel |
| `text-black/40 hover:text-black` 아이콘 (4 + 4) | `<IconButton variant="ghostMuted">` | 닫기 · 새로고침 |
| `text-red-500 hover:text-red-700` 휴지통 (2) | `<IconButton accent="red" variant="ghost">` | Admin |
| `text-xs font-black hover:text-retro-primary` 글자 버튼 | `<Button size="xs" variant="ghost">` | FilterSection "Refresh" · "Reset" |
| `bg-white/10 border-white/30 text-white` (3) | `<NavButton>` | 로그아웃 · 학기 선택 |
| `bg-retro-green border-black` "Approve" | `<Button accent="green" variant="tonal" shadow>` | MaterialReviewPanel |
| `bg-retro-primary border-black` "Reject" · "Withdraw" | `<Button accent="pink" variant="tonal">` | MaterialReviewPanel · UploadPage |
| `border-retro-primary text-retro-primary` "거절" | `<Button accent="pink" variant="outline">` | RequestSidebar |
| `bg-retro-accent2 border-black shadow-4px` 링크 | `<Button as={Link} accent="yellow" variant="tonal" shadow>` | 홈 배너 |

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

## 그림자

| 지금 | funky-ui |
| --- | --- |
| `4px 4px` (투명도 .1 · .12 · .15 · .16 · .18 · .2 · .25) | `raised` |
| `6px 6px` 카드 | `raised` (카드도 4px입니다) |
| `2px` · `3px` 작은 칩 | 없앰 — 작은 칩은 그림자를 받지 않거나 `raised` |
| `8px 8px` | `floating` — 모달 전용 |
| `0 4px 0 0` 상단 바 · `0 -4px` 하단 바 | `AppBar` · `BottomNav`가 가짐 |
| `0 0 15px` (blur) | 없앰 — blur는 쓰지 않습니다. 누르는 칸이면 `motion="press"` |
| 색 그림자 `rgba(255,165,0,.4)` · `var(--color-retro-*)` | 없앰 |

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
| `retro-accent1` | `cyan` |
| `retro-accent2` | `yellow` |
| `retro-accent4` | `orange` |
| `retro-accent5` | `sky` |
| `retro-green` | `green` |
| Tailwind `red-500` · `red-600` | `red` |
| `retro-bg` | `surface.canvas` |
| `retro-fg` | `ink.primary` |
| `retro-accent-light` (#f0fdff hover 면) | 없앰 — hover는 회색 층(`overlay.hoverGray`) |
| `bg-black/5` · `bg-black/[0.03]` | `surface.well` |
| `border-black/10` | `line.subtle` (`Divider`) |
| `border-black/20` · `/30` | `line.soft` |

## 모달

손으로 짠 겹판 일곱(`fixed inset-0 z-[50~1100] bg-black/40~70`)은 `<Modal>` 하나로 갑니다. native `<dialog>`라 z-index를 고르지 않고, 막은 `rgba(0,0,0,.5)` 하나, 그림자는 8px입니다. 머리 막대는 기본 보라(`accent`)이고, Esc · 막 누름 · 닫기 버튼이 모두 `onClose`를 부릅니다. 입력 중인 폼이면 `dismissible={false}`로 막 누름을 끕니다.

## class-explorer에 붙이는 순서

검수 뒤 6단계에서 이 순서로 붙입니다. 각 단계가 끝날 때마다 `npm run build`와 `npm run lint`가 통과해야 합니다.

1. funky-ui 소스를 `frontend/vendor/funky-ui`로 vendor 하고, Vite에 vanilla-extract 플러그인을 더합니다 ([설치](../get-started/install.md)).
2. `index.css` 맨 위에 `@layer fk, theme, base, components, utilities;`를 선언해 Tailwind 유틸리티가 funky를 이기게 합니다.
3. `RetroButton` · `RetroCard` · `RetroSubTitle` · `RetroChip` · `RetroSpinner`를 funky 컴포넌트로 바꿉니다. atom 이름이 그대로 남아 있는 자리부터라 범위가 분명합니다.
4. raw `<button>`을 위 표대로 바꿉니다. 화면 단위로 나눠 갑니다.
5. 모달 일곱을 `<Modal>`로, 셸(`Navigation` · `Sidebar` · `BottomNav`)을 Components로 바꿉니다.
6. `index.css`의 `@theme` 색과 `.shadow-retro*` · `.student-badge`를 걷어냅니다. 남은 `retro-*` 사용처가 0이 되면 끝입니다.
