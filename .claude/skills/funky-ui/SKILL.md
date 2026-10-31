---
name: funky-ui
description: funky-ui 디자인 시스템 가이드 (v1). 크림 위 네온 · 검정 2px 선 · blur 없는 하드 그림자 · 누르면 가라앉는 몸짓. funky-ui로 화면과 컴포넌트를 작성하거나, prop과 토큰을 확인하거나, class-explorer UI를 고칠 때 호출.
---

# funky-ui

`@studio-baeks/funky-ui`로 UI를 만들 때 정확한 부품 · prop · 토큰을 찾는 skill이다. 이 문서는 v1(`1.0.0-alpha.*`) 기준이다. 0.x(`.funky-*` 클래스, `--funky-*` 변수, `AppShell`, `Button variant="primary"`)와 호환되지 않으니 옛 코드를 보고 짐작하지 않는다.

## 문서 읽기

prop과 값은 추측하지 말고 문서를 가져와서 확인한다. 모든 문서는 사이트에서 원문 마크다운으로 받을 수 있다.

- 목차: `https://funky-ui.bsiku.dev/llms.txt`
- 문서: `https://funky-ui.bsiku.dev/docs/api/{경로}`

| 찾는 것 | 경로 |
| --- | --- |
| 설치 · Tailwind 레이어 순서 | `get-started/install.md` |
| 정체성과 원칙 | `get-started/principles.md` |
| 색 · accent 사다리 · 15 variant · 상태색 | `foundations/color.md` |
| 글자 역할 · 컨트롤 글자 | `foundations/typography.md` |
| 컨트롤 · 배지 크기 · 선 · 포커스 링 | `foundations/shape.md` |
| 간격 · 그림자 · breakpoint | `foundations/layout.md` |
| 몸짓 | `foundations/motion.md` |
| Box · Text · Surface · Paint · Pressable · Selectable 등 | `primitives/README.md` |
| Button · Badge · Input · Select 등 | `atoms/README.md` |
| Card · Modal · Table · Stat · Accordion 등 | `molecules/README.md` |
| AppBar · SideNav · 시간표 · Tone 부품 등 | `components/README.md` |

소스가 있는 기기라면 `Projects/Main Projects/design-systems/funky-ui/docs/`를 직접 읽어도 같다. 부품 목록의 정본은 패키지의 `src/inventory.ts`다.

## 설치

```bash
npm install @studio-baeks/funky-ui
```

```ts
import "@studio-baeks/funky-ui/styles.css"; // 앱 진입점에서 한 번
```

```tsx
import { Button, Card } from "@studio-baeks/funky-ui";
import { ACCENT_COLORS } from "@studio-baeks/funky-ui/tokens";
```

React 19와 Pretendard Variable이 필요하다. Tailwind와 같이 쓰면 앱 CSS 맨 위에 `@layer theme, base, fk, components, utilities;`를 두고, 그 CSS를 funky-ui 스타일시트보다 **먼저** 불러온다. `fk`가 `base` 앞에 서면 preflight가 funky의 여백과 테두리를 전부 지운다.

## 부품 지도

층은 아래로만 의존한다. Atoms와 Molecules는 범용이고 Components는 class-explorer 전용이다.

- **Primitives** — `Box` `Text` `Icon` `VisuallyHidden` `Portal` / `Surface` `Paint` `Glass` `Pressable` `Selectable` `Floating` `Stack` `Inline` `Grid`
- **Atoms** — `Button` `IconButton` `NavButton` `Link` / `Badge` `Code` `Swatch` `Wordmark` `Marquee` `Spinner` `Divider` / `Input` `Textarea` `Select` `Checkbox` `Radio` `Switch` `Label`
- **Molecules** — `Card` `SectionTitle` `PageHeader` `Accordion` / `SegmentedControl` `Tabs` `Menu` / `Modal` `Drawer` `Tooltip` `Popover` / `SearchField` `FormField` `FileDrop` / `Stat` `Meter` `Table` / `Notice` `Busy` `EmptyState`
- **Components** — `AppBar` `SideNav` `BottomNav` `TermSwitcher` / `StudentBadge` `PersonCard` / `ClassTile` `TimetableGrid` `BreakBand` `TimeCaret` `SlotCell` / `ToneButton` `ToneChip` `ToneBox` `ToneSwatch` `ToneText`

## 칠과 색

칠은 셋이 나눠 맡는다. 박스의 면은 `Surface`(`fill`: `canvas` `raised` `sunken` `well` `inverse` `brand` `none`), 요소의 색은 `Paint`(`accent` × `variant`), 색 바 위는 `Glass`다. accent는 `Paint`와 그것을 쓰는 부품만 갖는다. `Card`나 `Surface`에 accent를 주지 않는다.

- **accent 13** — `black`, 네온 `pink` `purple` `cyan` `yellow` `orange` `sky` `green` `red`, 상태색 `success` `error` `warning` `info`. 별칭은 `system` `primary` `secondary`.
- **상태색과 네온을 가른다** — 맞다 · 틀리다 · 조심 · 알림은 상태색이고, 네온은 면과 구조에 쓴다. `tone="red"`는 네온 빨강이고 오류 글자는 `tone="error"`다.
- **variant 15** — `filled` `outline` `hairline` `frameline` `framelineMuted` `plain` `solid` `solidMuted` `muted` `ghost` `ghostMuted` `paper` `tinted` `wash` `ghostTint`. Button 기본은 `outline`이다.
- **글자색 `tone`** — `primary` `secondary`(검정 60%) `muted`(40%) `faint`(25%) `inverse` `inverseMuted` `accent` `accentSoft` `inherit`, 색 이름과 상태색 이름. 색 이름은 원색이라 흰 면 위에서 AA에 못 미칠 수 있으니 짧은 라벨 · 수치에 쓴다. 진한 글자는 Paint 안에서 `tone="accent"`다.
- **실행 중에 정해지는 색**(학과 · 학번)은 Tone 부품으로 칠한다. Paint와 Button은 hex를 받지 않는다.

## 크기와 글자

- **컨트롤** — `xs` 28 · `sm` 32 · `md` 40 · `lg` 48 · `xl` 64px. Button 기본은 `md`이고, class-explorer의 기본 버튼은 `lg`다.
- **배지** — `sm` 18 · `md` 22 · `lg` 26 · `xl` 36px.
- **`Text variant`** — `hero` `display` `headline` `title` `heading` `subheading` `body` `small` `caption` `label` `micro` `overline` `eyebrow` `subtitle`. 태그는 `as`로 따로 고른다.
- **그림자** — 영역을 나누는 카드와 모달은 6px(`floating`, Card 기본), 그 안의 작은 카드와 컨트롤은 4px(`raised`), 배지는 3px. blur는 없다.
- **선** — 테두리는 2px, 표와 격자의 안쪽 선만 1px이다.

## 자주 틀리는 것

- **Tailwind 유틸리티는 funky를 이기지만** 같은 뜻의 prop이 있으면 prop을 쓴다(`Text uppercase`, `Stat labelTone`, `Paint shadow`).
- **`Card padding="0"`은 utilities 층이다.** 패키지 안에서 `fk.components`로 덮이지 않는다. 앱에서는 `padding="0"`에 Tailwind 여백을 준다.
- **골라진 Button은 105%로 커지고 그림자를 갖는다.** 칸이 맞닿은 줄, 그림자 없는 칩 줄, `fullWidth`는 커지지 않는다. 낱개 버튼에서 끄려면 `grow={false}`다.
- **포커스 링은 Tab으로 왔을 때만 보인다.** 직접 링을 그릴 때도 `vars.focusRing.width`를 읽는다.
- **면 위에 색을 inline으로 박지 않는다.** `style={{ color: "#abc" }}` 대신 tone과 accent로 고른다.
