# 토큰

색·그림자·타입·간격·크기 같은 모든 값은 `src/tokens.ts` 한 곳에서 정의합니다. 이 파일이 정본(SSOT)이고, CSS 변수 시트인 `src/tokens.css`는 여기서 codegen됩니다. accent variant·contrast·font role 같은 파생은 `scripts/gen-tokens.ts`가 **빌드타임에 정적 CSS로** 펼칩니다 — 런타임 색 계산은 없습니다.

> 토큰을 바꾸면 `npm run gen:tokens`로 `tokens.css`를 다시 생성하세요. `tokens.css`는 직접 수정하지 않습니다.

## 색

크림 surface와 검정 ink, 그리고 8개의 네온 accent로 이뤄집니다.

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `bg` | `#fff5d1` | 페이지 바탕 (크림) |
| `surface` | `#ffffff` | 카드 등 떠 있는 면 |
| `sunken` | `#fff0b8` | 눌려 들어간 면 |
| `ink` / `ink-inverse` | `#222222` / `#fff` | 본문 / 네온·검정 면 위 글자 |
| `pink` `purple` `cyan` `yellow` | 네온 | accent · 면색 |
| `orange` `sky` `green` `red` | 네온 | accent · 면색 (`red`=danger) |

의미를 드러내려면 `role` 별칭(`primary`=pink · `secondary`=purple · `success`=green · `warning`=orange · `danger`=red · `info`=cyan)으로 참조합니다.

### Accent 시스템 — 3-layer

각 색은 **앵커**(`accent.pink` 등 색당 7키: `fill`·`fillHover`·`soft`·`softHover`·`muted`·`onFill`·`text`) 하나에서 출발합니다. codegen이 이 앵커를 **4 variant × 4 field**로 정적으로 펼칩니다. `muted`(거의 흰색에 가까운 옅은 동색)는 variant 밖의 별도 토큰으로, table zebra strip처럼 아주 옅은 틴트 자리에 씁니다.

```
--funky-accent-{color}-{variant}-{field}
  color   = pink…red + primary…info (role alias)
  variant = solid | soft | outline | ghost
  field   = bg | bg-hover | fg | border
```

| variant | 면 | 글자 | 테두리 |
| --- | --- | --- | --- |
| `solid` | 네온 fill | onFill(검정/흰 자동) | 검정 |
| `soft` | 옅은 동색 틴트 | 진한 동색 잉크 | 검정 |
| `outline` | 흰 면 | 진한 동색 | 네온 |
| `ghost` | 투명 | 진한 동색 | 없음 |

- **`fill`은 `color.*` 네온과 같은 값**으로 동결됩니다(정체성 보존).
- **onColor(네온 위 검정/흰 글자)는 앵커의 `onFill`이 단일 출처**입니다 — 컴포넌트마다 복붙하지 않습니다. 네온 위 글자색은 WCAG 휘도가 아니라 brutalist 손맛이라 손으로 결정하고, codegen의 `pickFg`는 빌드타임 *경고*만 냅니다(대비 < 4.5면 콘솔에 표시, 빌드는 통과).

```tsx
import { colorVar } from "@studio-baeks/funky-ui";
colorVar("primary", "solid", "bg"); // "var(--funky-accent-primary-solid-bg)"
```

### contextual accent — 계층 전파

위 variant 토큰이 *요소 단위*라면, **contextual accent**는 *컨테이너가 한 번 선언하면 하위가 따라가는* 계층입니다. 컨테이너에 `.funky-accent--{color}`(또는 role) 클래스를 붙이면, codegen이 그 클래스에서 `--funky-ac-*` 캐스케이드 변수를 그 색의 앵커로 덮어씁니다. 하위 요소의 hover·strip·fill은 이 변수만 읽으므로 자동으로 그 색을 따라갑니다.

```
:root            --funky-ac-{bg,fg,hover,strip,text} = neutral (검정·회색·크림)
.funky-accent--cyan  →  같은 변수를 cyan 앵커(solid-bg·muted…)로 덮음
   └─ 하위 th·td·행 hover·input hover·strip 이 var(--funky-ac-*) 를 소비 → cyan
```

| 변수 | neutral 기본 | accent 선언 시 |
| --- | --- | --- |
| `--funky-ac-bg` / `-fg` | 검정 / 흰 | 네온 solid 면 / 그 위 글자 |
| `--funky-ac-hover` | 회색 `#ededeb` | 거의 흰 동색(muted) — 아주 옅은 틴트 |
| `--funky-ac-strip` | 크림 sunken | 거의 흰 동색(muted) |
| `--funky-ac-text` | 검정 | 진한 동색 |

`Table accent="cyan"`, `Input accent="cyan"`이 이 계층을 노출하는 atom입니다. neutral 요소(accent 미선언)는 회색 hover가 기본이라, "구조 loud / 내용 quiet"에서 조용한 쪽이 시끄러워지지 않습니다.

## 그림자 · press

blur가 0인 하드 오프셋 솔리드입니다. 시스템의 시그니처입니다.

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `shadow.sm` | `4px 4px 0 0 rgba(0,0,0,.2)` | press 가능 요소의 rest(depth 4) |
| `shadow.md` | `6px 6px 0 0 rgba(0,0,0,.2)` | 정적 elevation (Card·Panel) |
| `shadow.lg` | `8px 8px 0 0 rgba(0,0,0,.2)` | 정적 (Modal·Window) |

**press-into-shadow**는 depth 4에서 파생됩니다(`press.hoverShadow`=2px 잔존, `hoverShift`=2px 이동, `activeShift`=4px). 본체 이동량 + 그림자 잔량이 항상 depth로 고정돼 누르는 동안 절대 위치가 안 흔들립니다. press는 `shadow.sm` rest 요소에만 붙입니다 — md/lg 그림자(Card/Modal)는 정적입니다.

## 타입

Pretendard에 weight 400·500·700·900, base 16px의 rem ladder(`2xs`~`4xl`)를 씁니다. code용 `mono` 스택(JetBrains Mono → 시스템 mono → Pretendard 한글 fallback)이 별도로 있습니다.

원자 ladder 위에 **role 합성 토큰**을 둡니다. `font.role`의 각 항목은 size·weight·lineHeight·tracking(+transform/family)을 묶고, codegen이 `.funky-text--{role}` 정적 클래스로 굽습니다(CSS 변수로 펼치지 않아 폭발이 없습니다).

| role | 성격 |
| --- | --- |
| `display` `heading` `title` | 구조 loud — black/bold·tight |
| `chrome` `overline` | uppercase 라벨 — black·넓은 자간 |
| `body` `caption` | 내용 quiet — medium·자간 0 |
| `code` | mono |

```tsx
<span className="funky-text funky-text--chrome">SECTION</span>
```

chrome 텍스트는 uppercase에 0.05em 자간, weight 900이 기본 정체성입니다(`chrome` preset 유지).

## 간격

컴포넌트 안쪽의 padding과 gap에 쓰는 스케일입니다.

| 토큰 | 값 | | 토큰 | 값 |
| --- | --- | --- | --- | --- |
| `xs` | 0.375rem | | `lg` | 1rem |
| `sm` | 0.5rem | | `xl` | 1.5rem |
| `md` | 0.75rem | | `2xl` | 2rem |

## 크기 — control · label

인터랙티브 요소의 크기를 두 ladder로 통일합니다. 한 size가 height·padX·fontSize를 동시에 결정합니다.

| ladder | 대상 | sm / md / lg (height) |
| --- | --- | --- |
| `control` | Button · Input · Select · Tab | 28 / **36** / 44px |
| `label` | Badge · Tag · Chip | 16 / **20** / 24px |

md가 앵커입니다. 데스크톱 brutalist 툴 정체성이라 44px(터치 최소)는 lg에 두고, 터치 컨텍스트만 lg를 권합니다. checkbox·radio·switch는 ladder와 무관한 고유 치수라 `atom` 토큰으로 따로 둡니다.

## Shape

radius는 `0` 하나뿐이라 pill조차 각이 살아 있습니다. border는 2px(`border`)와 3px(`border-bold`) 두 단계이고 색은 항상 검정입니다.

## Motion — 두 archetype

motion은 duration `100ms`, easing `ease-out`로 고정입니다. 하드 그림자를 이용한 인터랙션 안무는 정반대인 **두 가지**로 정리됩니다.

| archetype | 클래스 | rest | 인터랙션 |
| --- | --- | --- | --- |
| **눌림 (press)** | `.funky-pressable` | 그림자 있음(`shadow.sm`) | 누르면 그림자 *속으로* — hover 절반(2px)·active 완전(그림자 0) |
| **떠오름 (lift)** | `.funky-liftable` | 납작(그림자 없음) | focus 시 그림자가 *솟음*(`shadow.sm`) |

눌림은 Button·trigger류, 떠오름은 Input류가 씁니다. 둘 다 transition 번들 토큰으로 안무 시간을 공유합니다 — 컴포넌트마다 `transition:`을 손으로 재나열하지 않습니다.

| 번들 | 트랜지션 대상 |
| --- | --- |
| `--funky-transition-press` | box-shadow · transform · background-color |
| `--funky-transition-lift` | box-shadow |
| `--funky-transition-tint` | background-color · color (hover 면색 변화) |

### 시간 어휘 (duration scale)

컴포넌트 transition·overlay 전환·앱 entrance가 공유하는 속도 스케일입니다. core는 *값*만 제공합니다 — entrance·scroll reveal의 **오케스트레이션(언제 무엇을 어떤 순서로)은 앱의 몫**이고, core가 IntersectionObserver나 stagger 기계를 내장하지 않습니다.

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `duration.snap` | `100ms` | 미세 피드백 (press/lift · hover 틴트) — 컴포넌트 기본 |
| `duration.base` | `180ms` | 상태 전환 · overlay 열림 |
| `duration.slow` | `300ms` | reveal · entrance (앱 orchestration) |
| `stagger` | `60ms` | 순차 reveal 간격 (앱이 delay 계산에 사용) |

> entrance는 funky답게 가려면 fade가 아니라 하드한 "snap/pop"(blur 0)이어야 합니다. 그 거동은 실제 화면이 요구할 때 ref 앱에서 증명한 뒤 토큰화합니다 — 미사용 keyframe을 선반영하지 않습니다.

## TS에서 직접 쓰기

값을 코드에서 바로 다뤄야 하면 토큰 객체를 import합니다.

```tsx
import { tokens, color, accent, colorVar } from "@studio-baeks/funky-ui";

const fill = color.cyan;                       // "#3decfd"
const onCyan = accent.cyan.onFill;             // "ink" (네온 위 검정 글자)
const v = colorVar("danger", "soft", "bg");    // soft danger 면색 var
```
