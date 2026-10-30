# AGENTS.md

## 이 레포지토리

funky-ui — class-explorer 를 위한 neo-brutalist React 디자인 시스템. 크림 위 네온 · 2px 검정 선 · 하드 그림자 · 그림자 속으로 가라앉는 눌림. 정체성의 근거는 [docs/get-started/principles.md](docs/get-started/principles.md) 입니다.

```
funky-ui/
├── docs/                       # get-started · foundations · primitives · atoms · molecules · components · class-explorer
└── workspace/                  # pnpm workspace
    ├── packages/funky-ui/      # @studio-baeks/funky-ui
    │   └── src/
    │       ├── index.ts        # entry `.` — 컴포넌트 ("use client")
    │       ├── inventory.ts    # 이름 · 층 · 순서의 정본 (import 없음)
    │       ├── tokens/         # 값의 유일한 정의 위치 — palette(hex) → color(역할) · color-recipes(12 variant)
    │       │                   #   · typography · shape · layout · motion · vocabulary(축) · variables(--fk-*) · layers
    │       ├── styles/         # 공유 class — accent · variant · slots(레시피 → 슬롯) · space · typography · enter(등장) · global
    │       ├── internal/       # cx · polymorphic · glyphs · useAnchor
    │       ├── primitives/     # 1차 Box · Text · Icon · VisuallyHidden · Portal → 2차 Surface · Paint · Glass · Pressable · Selectable · Floating · Stack · Inline · Grid
    │       ├── atoms/          # 범용 컨트롤
    │       ├── molecules/      # 범용 조합
    │       └── components/     # class-explorer 전용
    └── app/                    # 사이트 — Home · Playground · Docs (docs/ 를 "@docs" 로 곧바로 읽음)
```

pnpm 명령은 `workspace/` 에서 실행합니다. 작업 로그(`logs.md`)는 이 기계에만 둡니다 — `.gitignore` 에 있습니다.

## 층

```
Foundations (Color · Typography → Shape → Layout → Motion) → Primitives → Atoms → Molecules → Components
```

각 층은 자기보다 앞의 층만 import 합니다. Atoms · Molecules 는 범용이고 class-explorer 의 데이터나 뜻(학번 · 학과 · 교시)을 모릅니다. 그런 것은 Components 에만 둡니다.

Primitives 안은 두 단입니다(`PRIMITIVE_TIERS`). 1차(Box · Text · Icon · VisuallyHidden · Portal)는 서로 기대지 않고, 2차는 Box 위에 능력 하나 — 칠(Surface · Paint · Glass) · 누름(Pressable) · 골라짐(Selectable) · 띄우기(Floating) · 배치(Stack · Inline · Grid)입니다. 2차끼리는 서로 import 하지 않습니다(`Selectable.css` 가 `Pressable.css` 의 `FLAT_SHADOW` 값을 읽는 것 하나가 예외입니다. 골라진 모양은 class 를 두 번 겹친 선택자라 몸짓보다 특이도가 높아서, 실리는 순서와 상관없이 몸짓을 덮습니다). 둘 이상이 필요하면 Atom 부터 모양은 `surfaceClass()` · `paintClass()` · `glassClass()` · `pressClass()` 로, 의미는 `usePressable()` · `useSelectable()` · `useSelectableGroup()` 훅으로 빌려 묶습니다 — Button = usePressable + useSelectable + paintClass, 누르는 Card = Pressable + surfaceClass, NavButton = usePressable + useSelectable + glassClass, Menu = Floating + surfaceClass + useSelectableGroup. 골라짐의 aria 는 `useSelectable` 이 `role` · `current` 에 맞는 하나만 붙이므로, 위 층에서 `aria-pressed` · `aria-checked` 를 직접 달거나 지우지 않습니다. 인벤토리(`inventory.ts`)를 바꾸면 Playground 사이드바 · README 의 표 · docs 를 같이 고칩니다.

## 색

- hex 는 `tokens/palette.ts` 에만 씁니다. 다른 파일은 고르기만 합니다.
- accent 사다리 다섯 칸(ink · solidInk · solid · soft · softInk)의 규칙은 docs/foundations/color.md 에 있습니다. 값을 바꾸면 Playground › Color 의 대비 배지가 목표(글자 칸 AA)를 지키는지 확인합니다.
- variant 는 `tokens/color-recipes.ts` 의 칸 이름 표 하나가 정합니다. `styles/slots.ts` 가 그 이름을 변수로 옮기고, `Paint` 는 슬롯 일곱(`--fk-fg` · `--fk-bg` · `--fk-border` · hover 셋 · press 하나)만 읽습니다.
- **칠은 primitive 셋이 나눠 맡습니다.** 박스는 `Surface`(면 — 흑백 다섯과 뼈대의 보라 `brand` · 테두리 · 그림자 · hoverable 흑백 상태 층 — 면 위의 줄은 `fill="none"`), 요소는 `Paint`(accent × variant · selected · hoverable — 색의 모든 상태), 색 바 위는 `Glass`(흰 유리 · selected · hoverable — accent 없음). `Pressable` 은 누르는 물건(의미 · 커서 · 꺼짐 · 몸짓)이고 색이 없습니다 — hover 색도 칠(Paint · Surface · Glass)의 `hoverable` 이고, Pressable 이 켜 주지 않습니다. `Selectable` 은 골라짐(aria 하나 · 골라진 칸의 커지기)이고 역시 색이 없습니다 — 골라진 색은 칠의 `selected` 입니다. 위 층은 이 셋을 렌더하거나 `surfaceClass()` · `paintClass()` · `glassClass()` 로 class 만 빌려 옵니다 — 칠을 다시 조립하지 않습니다. `Box` 는 태그 · ref · 여백만 다루고 색을 모릅니다.
- **`brand` 는 바의 면입니다.** 상단 바 · 하단 바(AppBar · BottomNav)만 쓰는 구조 면이고, 색을 고르는 요소가 아니라서 accent 가 아니라 면의 이름입니다. 바는 Paint 가 아니라 Surface 라서 accent 를 흘리지 않고, 그 위의 컨트롤은 accent 가 없는 Glass 입니다. Card 의 `fill` 은 `brand` 를 받지 않습니다.
- ⚠️ variant 는 슬롯 일곱을 **전부** 씁니다. 변수는 상속되므로 하나라도 비우면 바깥 컨트롤의 값이 새어 들어옵니다.
- ⚠️ **accent 는 그 색으로 칠해지는 요소만 갖습니다.** primitive 에서는 Paint 하나이고, 위 층에서는 Paint 를 쓰는 컴포넌트와 Variant 없이 자기 색을 칠하는 컴포넌트(Link · Swatch · Stat · Meter — `useAccent()` 로 accent class 만 가져갑니다)입니다. Text 의 색 이름 tone(`pink` · `red` …)은 accent 가 아니라 글자색 값입니다 — 안쪽으로 흐르지 않고, 1차 primitive 인 Text 가 Paint 에 기대지 않습니다. `accentClass` 를 직접 읽는 곳은 Paint 모듈 하나입니다. CSS 변수라 아래로 흐르고 `:root` 는 검정(시스템)입니다. Box · Surface · 배치 · Card · Accordion · AppBar · BottomNav 에 accent prop 을 다시 달지 않습니다 — 칠하지 않는 박스가 안쪽 색을 바꾸면 색이 어디서 왔는지 화면에서 찾을 수 없습니다. `X as ElementType` 으로 넓힌 자리는 타입 검사가 못 잡으니, accent 가 Surface · Pressable 로 흘러 DOM 속성으로 새지 않는지 봅니다.
- 런타임에 색을 계산하지 않습니다. 실행 중에 정해지는 색(학과 · 학번)은 Components 에서 `--fk-tone` 하나로 받습니다. Paint · Button 은 hex 를 받지 않고, 색 버튼은 Components 의 `ToneButton` 이 슬롯을 덮어 칠합니다. 예외는 하나, 면을 tone 으로 꽉 채울 때 글자를 고르는 `toneInk` 입니다(재원님 결정, 2026-10-30).
- ⚠️ `toneInk` 의 경계는 0.179(WCAG 교차점)입니다. class-explorer `readableInk` 의 0.35 로 맞추면 휘도 0.18~0.35 인 면에서 흰 글자가 AA 에 못 미칩니다.

## 스타일

- 패키지 CSS 는 전부 `fk` 레이어 안에 듭니다(`fk.reset < theme < base < primitives < components < utilities`). 층 구조를 그대로 옮긴 순서라 위 층 CSS 는 Surface · Paint · Glass 의 칠을 언제나 덮습니다 — 모달 머리 막대가 Paint 의 filled 를 쓰고 테두리만 아래 한 줄로 덮는 식입니다. 소비 앱은 CSS 맨 위에 `@layer fk, theme, base, components, utilities;` 를 둡니다.
- vanilla-extract 의 `.css.ts` 는 함수를 export 할 수 없습니다. 규칙을 만드는 함수는 일반 모듈(`styles/slots.ts` · `tokens/typography-recipes.ts`)에 둡니다.
- `style()` 의 selector 는 자기 자신(`&`)을 겨눠야 합니다. 형제 · 자식을 꾸미는 규칙은 대상 쪽 style 에 `${other}:checked + &` 로 겁니다.
- 그림자는 `raised`(4px) · `floating`(6px, 모달 전용) 두 단뿐입니다. blur 는 0.
- 모서리는 0. `RADIUS.full` 은 스피너 · 점에만.
- `transition: all` 을 쓰지 않습니다 — 움직이는 속성을 적습니다.
- 판이 나타나는 몸짓은 `ENTER` 토큰과 `styles/enter.css.ts` 의 `enterClass` 를 같이 씁니다(Floating 의 `enter` · 모달 · 아코디언 본문). 판마다 keyframes 를 새로 쓰지 않고, 퇴장 모션은 두지 않습니다 — 닫는 모션을 보이려면 판을 더 들고 있어야 하는데 그사이 한 번 더 누르면 판 뒤의 화면이 눌립니다.
- inline style 은 실행 중에 정해지는 값(Grid 칸 폭 · Meter 길이 · `--fk-tone` · 떠 있는 판의 좌표)에만 씁니다.

## Playground

항목마다 `app/src/playground/registry/entries/<layer>.tsx` 의 `Spec` 하나가 컨트롤 · 처음 값 · 기본값 · 미리보기를 맡습니다. 코드 패널은 같은 값을 `printJsx` 로 찍은 것이라 미리보기와 어긋나지 않습니다. 선택지는 `/tokens` 의 어휘 배열에서 가져옵니다. `defaults` 는 컴포넌트의 실제 기본값과 같아야 합니다. 처음 값은 Overview 썸네일로도 그려지므로 떠 있는 판을 열어 두지 않습니다.

## 작업 완료 전 체크

- [ ] `pnpm typecheck` 와 `pnpm build` 가 통과했는가
- [ ] 화면을 직접 봤는가 (Playground 에서 바꾼 컴포넌트 · Foundations 페이지)
- [ ] 컴포넌트를 더하거나 API 를 바꿨다면 — inventory · Playground 항목 · docs 를 같이 고쳤는가
- [ ] 새 축(닫힌 값 집합)은 `tokens/vocabulary.ts` 에 상수 · 타입 짝으로 두었는가
- [ ] hex · 숫자를 컴포넌트에 직접 적지 않았는가
