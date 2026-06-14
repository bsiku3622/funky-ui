---
name: funky-ui
description: funky-ui 디자인 시스템 가이드. Neo-brutalist 정체성 (크림 위 네온 · 검정 2px 테두리 · 하드 그림자 · 눌림/떠오름 모션) · "구조 loud, 내용 quiet" · 4 레이어. funky-ui로 컴포넌트·화면 작성, prop 확인, 토큰 참조 시 호출.
---

# funky-ui — Design System Skill

`@studio-baeks/funky-ui` 로 UI를 만들 때 정확한 컴포넌트·prop·토큰 정보를 가져오는 skill. 모든 docs는 배포 사이트에서 raw markdown으로 노출되며 WebFetch로 접근한다.

## When to use

다음 작업에서 자동 발동:

- funky-ui 컴포넌트로 화면·UI 만들기 (React)
- **순수 HTML / 바닐라 JS로 funky-ui 쓰기** (React 없이)
- **비웹 환경(native·SwiftUI·Compose·Flutter·tkinter 등)에서 funky-ui 룩 재현**
- 컴포넌트 prop 시그니처 · default 값 확인
- 비슷한 컴포넌트 중 무엇을 골라야 할지 (예: `Tag` vs `Badge`, `Input` vs `SearchInput`, `Card` vs `StatTile` vs `Panel`)
- 토큰 값 (색·accent variant·그림자·크기·타입·모션) 참조
- neo-brutalist / 크림+네온 스타일 UI 요청

호출 명령:
- `/funky-ui`
- "funky-ui로 [컴포넌트] 만들어줘"
- "[컴포넌트] prop 알려줘"

---

## System identity (요점)

**Neo-brutalist React design system** — Studio Baeks의 디자인 시스템. 크림 바탕 위 네온 면색, 검정 2px 테두리, blur-0 하드 그림자, 누르면 그림자 속으로 가라앉는(혹은 focus 시 솟는) 인터랙션.

- **4 합성 레이어** — Token → Atom → Component → Template. 위 레이어는 자기보다 아래만 사용.
- **3 핵심 규칙** —
  1. **구조는 loud, 내용은 quiet** — 네온 solid·하드 그림자·UPPERCASE black은 *구조*(헤더·상태·지표·네비·활성)에 몰아준다. 읽는 *내용*(본문·데이터·입력값)은 크림/흰 위 검정 타이포로 물러난다. "Loud by default"는 "다 시끄럽게"가 아니라 "**구조가** 시끄럽게".
  2. **두 모션 archetype** — 정반대 둘이 시그니처. *눌림*(`.funky-pressable`): 하드 그림자 위에 떠 있다가 hover(절반)·active(완전) 시 그림자 속으로 가라앉음(Button·trigger류). *떠오름*(`.funky-liftable`): 납작하다가 focus 시 그림자가 솟음(Input류). 커스텀 transform 재구현 금지.
  3. **Fewer choices** — 옵션을 일부러 적게. variant/size/color prop으로만 의도 표현. 색·크기·시간·그림자는 `tokens.ts`에만 — raw hex나 inline 수치 직접 주입 금지.

- **zero runtime** — CSS-in-JS도 Tailwind도 안 씀. 전역 CSS 클래스 + `--funky-*` 변수만. 토큰은 빌드타임에 정적 CSS로 codegen(런타임 색 계산 0). 컴포넌트는 className 문자열만 조립.
- **운영 규칙** — 불가침 규칙·금지목록은 `core/CHARTER.md`(헌장), 정체성 근거는 `docs/foundations/identity.md`가 소유.

---

## 먼저 타깃 환경부터 — 무엇을 fetch할지 결정

funky-ui는 zero-runtime이라 디자인이 전부 CSS 클래스+토큰에 있고 React는 얇은 래퍼다. 그래서 **어디에 쓰느냐로 참고 문서가 갈린다:**

- **React** → 아래 컴포넌트 layer 문서(`atoms.md` 등)를 fetch. npm 패키지 사용.
- **순수 HTML / 바닐라 JS** → `recipes/html.md` 하나면 끝. CDN `<link>` 한 줄 + class 이름을 손으로 조립. press/lift는 순수 CSS라 공짜, Modal·Tabs·Accordion·Select만 작은 vanilla JS 필요.
- **비웹**(native·SwiftUI·Compose·Flutter·tkinter·슬라이드 등) → CSS를 못 쓰니 `design.md`를 fetch. 정체성 + 규칙 + **전체 토큰 값(색·그림자·간격·타입)** 이 self-contained로 들어있다. 그 값을 해당 플랫폼 스타일 언어로 번역. 그림자·press가 안 되는 플랫폼은 충실도 노트의 우선순위(테두리+네온+각진 모서리+두꺼운 타입 먼저)를 따른다.

## Docs API — fetch로 모든 docs 접근

배포된 사이트가 모든 docs를 raw markdown으로 노출. URL 한 종류:

```
https://funky-ui.bsiku.dev/docs/api/{path}.md
```

각 layer 파일이 그 레이어의 모든 컴포넌트를 inline으로 담고 있다 — 한 파일 fetch로 레이어 전체 컨텍스트가 온다.

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

# foundations (정체성 · 아키텍처 · 토큰 정본 · composition 문법)
https://funky-ui.bsiku.dev/docs/api/foundations/identity.md     # 왜 이렇게 그리는가 — DNA·stance·4분면 (정체성 근거)
https://funky-ui.bsiku.dev/docs/api/foundations/architecture.md
https://funky-ui.bsiku.dev/docs/api/foundations/tokens.md       # 색·accent variant·font role·sizing·motion 정본
https://funky-ui.bsiku.dev/docs/api/foundations/composition.md  # 화면 통째로 짤 때 — shell·영역분리·loudness·anti-pattern·self-check

# 컴포넌트 레이어 (각 파일에 전 컴포넌트 inline)
https://funky-ui.bsiku.dev/docs/api/components/atoms.md       # Button·Input·SearchInput·Checkbox·Radio·Switch·Tag·Badge·Table·Text·Icon
https://funky-ui.bsiku.dev/docs/api/components/components.md   # Card·StatTile·Accordion·Tabs·Modal·Panel·Window·Toolbar·Toast·Select·Toc·MarkdownView
https://funky-ui.bsiku.dev/docs/api/components/templates.md    # AppShell·ToolShell·SiteHeader·DocsSidebar·StatusCard·NavItem
```

> `MarkdownView`는 **서브패스**로 import: `import { MarkdownView } from "@studio-baeks/funky-ui/markdown"` + `import "@studio-baeks/funky-ui/markdown.css"`. 무거운 deps(katex·react-markdown)를 메인 번들에서 분리.

---

## 작업 시 워크플로

### Pattern 1 — 화면·앱 통째로 만들기 (가장 흔한 drift 지점)

컴포넌트만 맞아도 화면은 generic해진다. 정체성이 깨지는 곳은 거의 항상 **composition**(매크로 배치)이다. 그래서 단일 컴포넌트가 아니라 화면/앱을 만들 땐:

1. 어느 레이어인지 모르면 `llms.txt` 먼저 fetch — 컴포넌트가 레이어별로 정리돼 있음
2. **화면 통째로 만들면 `foundations/composition.md`를 반드시 fetch** — 화면유형 분류(상호작용/읽기), shell 선택, 영역 분리 규칙, loudness 예산, anti-pattern, self-check. (아래 §정체성 체크에 요점이 인라인으로도 있음)
3. 해당 layer 파일 fetch (atom 쓰면 `components/atoms.md`) — 그 레이어 전 컴포넌트가 prop 테이블·예시와 함께 한 번에 옴
4. 토큰 값이 필요하면 `foundations/tokens.md` fetch
5. 코드 작성 시 3 핵심 규칙 + composition 규칙 준수 (raw hex · inline 수치 · 커스텀 press transform 금지)
6. **끝내기 전 아래 정체성 self-check를 통과시킨다** — 하나라도 어긋나면 고친다

### Pattern 2 — prop 시그니처만 확인

```
WebFetch https://funky-ui.bsiku.dev/docs/api/components/{atoms|components|templates}.md
```

각 컴포넌트는 lead → 코드 예시 → prop 테이블 구조.

### Pattern 3 — 토큰 값 참조

```
WebFetch https://funky-ui.bsiku.dev/docs/api/foundations/tokens.md
```

색(크림 surface + 네온 8색 + accent variant), 하드 그림자, font role, sizing ladder, 모션의 정확한 값.

---

## Core API 한눈에

### 설치

```tsx
import "@studio-baeks/funky-ui/styles.css"; // 앱 진입점에서 1회
import { Button, StatTile } from "@studio-baeks/funky-ui";
```

토큰만: `import "@studio-baeks/funky-ui/tokens.css";` → `var(--funky-primary)`.
TS에서: `import { tokens, color, accent, colorVar, shadow } from "@studio-baeks/funky-ui";`.
마크다운: `import { MarkdownView } from "@studio-baeks/funky-ui/markdown";` (+ `markdown.css`).

### 컴포넌트 카탈로그 (23)

- **Atoms (11)** — `Button` (variant 9 × size 3) · `Input`(accent) · `SearchInput` · `Checkbox` · `Radio` · `Switch`(=`Toggle`) · `Tag` · `Badge` · `Table`(accent·striped) · `Text` (display·heading·title·body·caption·chrome·overline·code) · `Icon`
- **Components (11)** — `Card` · `StatTile` · `Accordion`(compound) · `Tabs`(compound, 제어/비제어) · `Modal`(compound) · `Panel`(영역 분리 프리미티브: 2px 테두리 + 헤더바) · `Window`(신호등 dots 프레임) · `Toolbar`(투명 컨트롤 바 + `.Group`/`.Spacer`) · `Toast`(다크 알림) · `Select`(커스텀 드롭다운) · `Toc`(읽기 화면 목차 레일)
- **Templates (4)** — `AppShell`(보라 상단바 + 크림 사이드바 + 모바일 하단 nav; 멀티뷰 앱) · `ToolShell`(Toolbar + Stage + Footer 세로 스택; 단일 도구) · `SiteHeader`(docs 풍 보라 상단바) · `DocsSidebar`(읽기 화면 좌측 nav) + `StatusCard` · `NavItem`
- **Markdown 서브패스** — `MarkdownView`(LaTeX 포함 마크다운 렌더러, `@studio-baeks/funky-ui/markdown`)

### Button variant 9 / size 3

variant(색 한 축): `primary · secondary · success · warning · danger · info · white · black · ink` (기본 `white`). 6 role 네온 + 중립 3종 — `white`(흰 면) · `black`(#000 순검정) · `ink`(#222 잉크).
size: `sm · md · lg` (기본 `md`)

### 색 + accent variant

- **Surface** — `bg`(크림 #fff5d1) · `surface`(흰 #fff) · `sunken`(#fff0b8) · `ink`(#222) · `ink-inverse`(#fff)
- **Neon accent 8** — `pink · purple · cyan · yellow · orange · sky · green · red`
- **role alias** — `primary`=pink · `secondary`=purple · `success`=green · `warning`=orange · `danger`=red · `info`=cyan
- **variant 4** — `solid`(네온 면) · `soft`(옅은 동색 틴트) · `outline`(흰 면 + 네온 테두리) · `ghost`(투명). CSS 변수 `--funky-accent-{color|role}-{variant}-{bg|bg-hover|fg|border}`로 노출. 네온 위 글자색(onColor)은 토큰이 단일 출처로 결정.
- **contextual accent (계층 전파)** — 컨테이너에 `.funky-accent--{color|role}` 클래스를 선언하면 하위/상태가 `--funky-ac-*`(bg·fg·hover·strip·text) 캐스케이드 변수로 그 색을 따라간다. 미선언(neutral)이면 회색 hover가 기본. atom 중 `Table`·`Input`이 `accent` prop으로 이 계층을 노출 — `<Table accent="cyan" striped>`면 헤더·행 hover·zebra strip이 한 앵커에서 함께 파생된다. hover 틴트는 muted(거의 흰색)라 은은하게 깔린다.

### 그림자 (blur 0 하드 오프셋) · 모션

- `sm` = `4px 4px 0 0 rgba(0,0,0,.2)` · `md` = `6px 6px` · `lg` = `8px 8px`. **오브젝트(카드·패널·테이블·모달 등)는 전부 `sm`** 으로 통일.
- 모션: duration `100ms`(snap) / `180ms`(base) / `300ms`(slow) + stagger 60ms · ease-out. 눌림/떠오름 archetype은 위 §System identity.

### Shape

radius = `0` 하나 (pill도 각짐). **테두리는 2px(표준) — 오브젝트는 전부 2px**. 3px(`border-bold`)는 진짜 강조에만(거의 안 씀). 색은 항상 검정.

---

## 자주 헷갈리는 분기

- **Button vs Tag vs Badge** — 액션 버튼 vs 작은 라벨 칩 vs 카운트/상태 핀
- **Input vs SearchInput** — 일반 필드 vs 검색 아이콘이 이미 붙은 필드
- **Checkbox vs Radio vs Switch** — 다중 선택 vs 단일 선택 vs on/off 토글(ON 시 트랙이 핑크 — 체크박스 checked와 동일 어휘)
- **Card vs StatTile vs Panel** — 빈 액자(내용 자유) vs 네온 면 위 큰 숫자 vs 헤더바 달린 영역 분리 프리미티브. 화면을 구역으로 나눌 땐 Panel.
- **Accordion vs Tabs** — 세로 펼침/접힘 vs 가로 탭 전환 (둘 다 compound)
- **AppShell/ToolShell vs SiteHeader/DocsSidebar** — *상호작용 화면*(대시보드·도구; loud) vs *읽기 화면*(docs·리포트; quiet, 본문 카드 없이 크림 위에 흐름 + `MarkdownView`).
- **Modal** — `open`/`onClose`를 쓰는 쪽이 소유하는 오버레이 (Esc·배경 클릭 닫기)

자세한 prop은 해당 layer `.md`의 컴포넌트 섹션 참조.

---

## 정체성 체크 — 화면을 만들 때 (fetch 없이도 적용)

`composition.md`의 요점. 컴포넌트가 맞아도 이 grammar가 어긋나면 "네온 칠한 일반 앱"이 된다. **먼저 화면유형부터: 상호작용(도구·대시보드)이냐, 읽기(docs·리포트)냐.** 둘은 정반대 규칙을 따른다.

**상호작용 화면 — 핵심 4규칙**

1. **매크로 골격은 둘 중 하나** — AppShell(멀티뷰) 또는 ToolShell(단일 도구). 직접 짜도 이 골격.
2. **영역은 테두리·그림자로 나눈다 — 얇은 선 금지** ⚠️ 가장 자주 깨짐. 분리는 ① 하드 그림자 면(Panel/Card/Window) ② 2px 검정 테두리 ③ 면색 전환(크림↔흰↔sunken)으로만. 1px hairline·옅은 회색선·`<hr>` 금지.
3. **네온은 구조에 쓴다** — 크림/흰 60–70% · 네온 10–20%(헤더·상태·지표·활성에 solid fill) · 검정 20–30%. 네온을 작은 장식 점으로만 쓰면 정체성이 죽는다. 큰 빈 흰 void 금지 — Panel/Card로 프레이밍.
4. **타이포로 구조** — 섹션 라벨 = UPPERCASE chrome(black), 지표 = 큰 black 숫자(StatTile). 얇은 밑줄 + 일반 제목은 docs 냄새.

**읽기 화면(docs·리포트)은 예외** — 위 카드·네온 법칙을 그대로 쓰면 망한다. `SiteHeader` + `DocsSidebar` + 본문(`MarkdownView`) + 선택 `Toc`. 본문은 카드 없이 크림 위에 quiet하게 흐르고, 인용·인라인코드는 옅은 면(sunken/accent-soft)이 오히려 맞다.

**generic → funky-ui 교정표**

| ❌ 새어나감 | ✅ funky-ui |
| --- | --- |
| 1px 회색 divider·`<hr>` | 2px 검정 테두리 · Panel/Card |
| 본문이 흰 여백으로 흐름(void) | Panel/Window로 프레이밍 |
| 네온을 작은 하이라이트로만 | 네온 solid fill을 구조에 |
| 둥근 모서리·블러 그림자 | radius 0 · 하드 오프셋(blur 0) |
| 통계를 본문 텍스트로 | StatTile |

**self-check (끝내기 전)** — 화면유형을 정했는가 · 골격이 AppShell/ToolShell(상호작용) 또는 SiteHeader+DocsSidebar(읽기)인가 · 영역이 2px·그림자·면색으로만 나뉘는가(hairline 없음) · 네온이 구조에 solid fill인가 · 빈 흰 void 없는가 · UPPERCASE chrome 라벨 + 큰 black 지표인가 · radius 0 / blur 0인가 · 모든 값이 토큰인가 · interactive가 `.funky-pressable`/`.funky-liftable`인가.

---

## 절대 안 하는 것

- `style={{ color: '#abc' }}` 또는 `style={{ background: 'var(--funky-...)' }}` — 토큰/variant로 표현. 색을 inline으로 박지 않음.
- 커스텀 `transform: translate(...)`로 press/lift 효과 흉내 — `.funky-pressable`/`.funky-liftable`이 이미 함.
- variant/size 밖의 임의 스타일로 컴포넌트 변형 — "fewer choices" 위반. 필요하면 시스템(토큰/컴포넌트) 확장을 먼저 고려.
- Component·Template 안에서 raw `<div>`/`<button>` 직접 스타일링 — Atom 합성으로.
- **영역을 1px 얇은 선·옅은 회색선·`<hr>`로 분리 — 금지.** 2px 검정 테두리 / 하드 그림자 면(Panel·Card·Window) / 면색 전환으로만 나눈다. (composition 최대 drift 지점)
- **오브젝트에 크림류(bg/sunken/accent-soft) 면 채우기** — 크림은 셸 배경에만. 오브젝트 강조는 solid 네온.
- **큰 빈 흰 void에 콘텐츠 흘려보내기** — Panel/Card/Window로 프레이밍해 밀도를 만든다.

---

## 참고

- 패키지: `@studio-baeks/funky-ui` (npm)
- 사이트: [funky-ui.bsiku.dev](https://funky-ui.bsiku.dev)
- 진입로: [llms.txt](https://funky-ui.bsiku.dev/llms.txt)
- 헌장: `core/CHARTER.md` · 정체성: `docs/foundations/identity.md`
