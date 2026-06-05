---
name: funky-ui
description: funky-ui 디자인 시스템 가이드. Neo-brutalist 정체성 (크림 위 네온 · 검정 테두리 · 하드 그림자 · press-into-shadow) · 4 레이어 · 3 핵심 규칙. funky-ui로 컴포넌트·화면 작성, prop 확인, 토큰 참조 시 호출.
---

# funky-ui — Design System Skill

`@studio-baeks/funky-ui` 로 UI를 만들 때 정확한 컴포넌트·prop·토큰 정보를 가져오는 skill. 모든 docs는 배포 사이트에서 raw markdown으로 노출되며 WebFetch로 접근한다.

## When to use

다음 작업에서 자동 발동:

- funky-ui 컴포넌트로 화면·UI 만들기 (React)
- **순수 HTML / 바닐라 JS로 funky-ui 쓰기** (React 없이)
- **비웹 환경(native·SwiftUI·Compose·Flutter·tkinter 등)에서 funky-ui 룩 재현**
- 컴포넌트 prop 시그니처 · default 값 확인
- 비슷한 컴포넌트 중 무엇을 골라야 할지 (예: `Tag` vs `Badge`, `Input` vs `SearchInput`, `Card` vs `StatTile`)
- 토큰 값 (색·그림자·간격·타입) 참조
- neo-brutalist / 크림+네온 스타일 UI 요청

호출 명령:
- `/funky-ui`
- "funky-ui로 [컴포넌트] 만들어줘"
- "[컴포넌트] prop 알려줘"

---

## System identity (요점)

**Neo-brutalist React design system** — Studio Baeks의 디자인 시스템. 크림 바탕 위 네온 면색, 두꺼운 검정 테두리, blur-0 하드 그림자, 누르면 그림자 속으로 가라앉는 인터랙션.

- **4 합성 레이어** — Token → Atom → Component → Template. 위 레이어는 자기보다 아래만 사용.
- **3 핵심 규칙** —
  1. **Loud by default** — 조용한 기본값 없음. 모든 컴포넌트가 설정 없이 가장 과감하게 (네온 면 · 2px 검정 테두리 · 하드 그림자). 절제는 `variant="neutral"`처럼 명시적으로.
  2. **Press into shadow** — interactive 요소는 하드 그림자 위에 떠 있다가 hover(절반)·active(완전) 시 가라앉음. `.funky-pressable` 클래스로 공유. 커스텀 transform으로 재구현 금지.
  3. **Fewer choices** — 옵션을 일부러 적게. variant/size/color prop으로만 의도 표현. 색·크기·시간·그림자는 `tokens.ts`에만 — raw hex나 inline 수치 직접 주입 금지.

- **zero runtime** — CSS-in-JS도 Tailwind도 안 씀. 전역 CSS 클래스 + `--funky-*` 변수만. 컴포넌트는 className 문자열만 조립.

---

## 먼저 타깃 환경부터 — 무엇을 fetch할지 결정

funky-ui는 zero-runtime이라 디자인이 전부 CSS 클래스+토큰에 있고 React는 얇은 래퍼다. 그래서 **어디에 쓰느냐로 참고 문서가 갈린다:**

- **React** → 아래 컴포넌트 layer 문서(`atoms.md` 등)를 fetch. npm 패키지 사용.
- **순수 HTML / 바닐라 JS** → `recipes/html.md` 하나면 끝. CDN `<link>` 한 줄 + class 이름을 손으로 조립. press 효과는 순수 CSS라 공짜, Modal·Tabs·Accordion만 작은 vanilla JS 필요.
- **비웹**(native·SwiftUI·Compose·Flutter·tkinter·슬라이드 등) → CSS를 못 쓰니 `design.md`를 fetch. 정체성 + 3규칙 + **전체 토큰 값(색·그림자·간격·타입)** 이 self-contained로 들어있다. 그 값을 해당 플랫폼 스타일 언어로 번역. 그림자·press가 안 되는 플랫폼은 충실도 노트의 우선순위(테두리+네온+각진 모서리+두꺼운 타입 먼저)를 따른다.

## Docs API — fetch로 모든 docs 접근

배포된 사이트가 모든 docs를 raw markdown으로 노출. URL 한 종류:

```
https://funky-ui.bsiku.dev/docs/api/{path}.md
```

studio-ui와 달리 컴포넌트당 분리가 없다 — 각 layer 파일이 그 레이어의 모든 컴포넌트를 inline으로 담고 있다. 한 파일 fetch로 레이어 전체 컨텍스트가 온다.

### 자주 쓰는 endpoint

```
# 전체 진입로
https://funky-ui.bsiku.dev/llms.txt

# 환경별 트랙
https://funky-ui.bsiku.dev/docs/api/recipes/html.md   # 순수 HTML/바닐라 JS — CDN + class 레시피 + compound JS
https://funky-ui.bsiku.dev/docs/api/design.md         # 비웹 — 정체성 + 전체 토큰 값 + 번역 지침 (self-contained)

# 시작 (설치 · 원칙)
https://funky-ui.bsiku.dev/docs/api/get-started/install.md
https://funky-ui.bsiku.dev/docs/api/get-started/principles.md

# foundations (아키텍처 · 토큰 정본)
https://funky-ui.bsiku.dev/docs/api/foundations/architecture.md
https://funky-ui.bsiku.dev/docs/api/foundations/tokens.md

# 컴포넌트 레이어 (각 파일에 전 컴포넌트 inline)
https://funky-ui.bsiku.dev/docs/api/components/atoms.md       # Button·Input·SearchInput·Tag·Badge·Text·Icon
https://funky-ui.bsiku.dev/docs/api/components/components.md   # Card·StatTile·Accordion·Tabs·Modal
https://funky-ui.bsiku.dev/docs/api/components/templates.md    # AppShell·StatusCard·NavItem
```

---

## 작업 시 워크플로

### Pattern 1 — 새 컴포넌트로 화면 만들기

1. 어느 레이어인지 모르면 `llms.txt` 먼저 fetch — 14개 컴포넌트가 레이어별로 정리돼 있음
2. 해당 layer 파일 fetch (atom 쓰면 `components/atoms.md`) — 그 레이어 전 컴포넌트가 prop 테이블·예시와 함께 한 번에 옴
3. 토큰 값이 필요하면 `foundations/tokens.md` fetch
4. 코드 작성 시 3 핵심 규칙 준수 (특히 raw hex · inline 수치 · 커스텀 press transform 금지)

### Pattern 2 — prop 시그니처만 확인

```
WebFetch https://funky-ui.bsiku.dev/docs/api/components/{atoms|components|templates}.md
```

각 컴포넌트는 lead → 코드 예시 → prop 테이블 구조.

### Pattern 3 — 토큰 값 참조

```
WebFetch https://funky-ui.bsiku.dev/docs/api/foundations/tokens.md
```

색(크림 surface + 네온 7색), 하드 그림자 3단, 타입 ladder, 간격 스케일의 정확한 값.

---

## Core API 한눈에

### 설치

```tsx
import "@studio-baeks/funky-ui/styles.css"; // 앱 진입점에서 1회
import { Button, StatTile } from "@studio-baeks/funky-ui";
```

토큰만: `import "@studio-baeks/funky-ui/tokens.css";` → `var(--funky-primary)`.
TS에서: `import { tokens, color, shadow } from "@studio-baeks/funky-ui";`.

### 컴포넌트 카탈로그 (14)

- **Atoms (7)** — `Button` (variant 8 × size 3) · `Input` · `SearchInput` · `Tag` · `Badge` · `Text` (heading·body·chrome) · `Icon`
- **Components (5)** — `Card` · `StatTile` · `Accordion` (compound) · `Tabs` (compound, 제어/비제어) · `Modal` (compound)
- **Templates (1)** — `AppShell` (보라 상단바 + 크림 사이드바 + 모바일 하단 nav) + `StatusCard` · `NavItem`

### Button variant 8 / size 3

variant: `primary · secondary · success · warning · danger · info · neutral · ink` (기본 `neutral`)
size: `sm · md · lg` (기본 `md`)

### 색

- **Surface** — `bg`(크림 #fff5d1) · `surface`(흰 #fff) · `sunken`(#fff0b8) · `ink`(#222)
- **Neon accent 7** — `pink · purple · cyan · yellow · orange · sky · green`
- **role alias** — `primary`=pink, `secondary`=purple …

### 그림자 (blur 0 하드 오프셋)

`sm` = `4px 4px 0 0 rgba(0,0,0,.2)` · `md` = `6px 6px` · `lg` = `8px 8px`

### Shape · Motion

radius = `0` 하나 (pill도 각짐). border = 2px / 3px, 항상 검정. motion = duration 100ms · ease-out · press-offset 4px (고정).

---

## 자주 헷갈리는 분기

- **Button vs Tag vs Badge** — 액션 버튼 vs 작은 라벨 칩 vs 카운트/상태 핀
- **Input vs SearchInput** — 일반 필드 vs 검색 아이콘이 이미 붙은 필드
- **Card vs StatTile** — 빈 액자(내용 자유) vs 네온 면 위 큰 숫자 통계 단위
- **Accordion vs Tabs** — 세로 펼침/접힘 vs 가로 탭 전환 (둘 다 compound)
- **Modal** — `open`/`onClose`를 쓰는 쪽이 소유하는 오버레이 (Esc·배경 클릭 닫기)
- **AppShell** — 앱 전체 셸이 필요할 때만. 단일 화면이면 Card 조합으로 충분

자세한 prop은 해당 layer `.md`의 컴포넌트 섹션 참조.

---

## 절대 안 하는 것

- `style={{ color: '#abc' }}` 또는 `style={{ background: 'var(--funky-...)' }}` — 토큰/variant로 표현. 색을 inline으로 박지 않음.
- 커스텀 `transform: translate(...)`로 press 효과 흉내 — `.funky-pressable`이 이미 함.
- variant/size 밖의 임의 스타일로 컴포넌트 변형 — "fewer choices" 위반. 필요하면 시스템(토큰/컴포넌트) 확장을 먼저 고려.
- Component·Template 안에서 raw `<div>`/`<button>` 직접 스타일링 — Atom 합성으로.

---

## 참고

- 패키지: `@studio-baeks/funky-ui` (npm)
- 사이트: [funky-ui.bsiku.dev](https://funky-ui.bsiku.dev)
- 진입로: [llms.txt](https://funky-ui.bsiku.dev/llms.txt)
