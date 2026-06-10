# Composition — 화면을 짜는 문법

토큰과 컴포넌트가 funky-ui의 **voice**(무엇으로 그리는가)라면, 이 문서는 **grammar**(어떻게 배치하는가)입니다. funky-ui로 만든 화면이 "그냥 일반 앱에 네온 페인트만 칠한 것"처럼 보일 때, 어긋난 곳은 거의 항상 컴포넌트가 아니라 composition입니다.

컴포넌트는 정체성을 보장하지 않습니다. 검정 테두리 버튼과 네온 StatTile을 써도, 영역을 1px 얇은 선으로 나누고 본문을 흰 여백으로 비워두면 결과물은 docs 사이트가 됩니다. 이 문서의 규칙은 그 드리프트를 막습니다.

---

## 1. Shell — 매크로 레이아웃은 둘 중 하나

화면 전체 골격은 두 가지뿐입니다. 새 앱을 짤 때 먼저 이 중 하나를 고릅니다.

- **AppShell** — 보라 상단바 + 크림 사이드바(nav) + 콘텐츠 + 모바일 하단 nav. 여러 뷰를 오가는 **멀티뷰 앱**(대시보드, 탐색기, 관리도구)에.
- **ToolShell** — Toolbar(상단) + Stage(가변) + Footer(선택). 하나의 작업 표면에 집중하는 **단일 도구**(에디터, 캔버스, 뷰어, 제너레이터)에.

직접 셸을 짜더라도 이 둘의 골격을 벗어나지 않습니다. 영역 사이는 **3px 검정 테두리**로 끊습니다. (참고: 이 두 셸은 funky-essets·class-explorer 등 레퍼런스 앱이 실제로 쓰는 골격을 그대로 코드화한 것입니다.)

---

## 2. 영역은 테두리·그림자로 나눈다 — 얇은 선 금지

**funky-ui에서 가장 자주 깨지는 규칙입니다.** 일반 웹/SaaS는 영역을 1px hairline divider(옅은 회색 줄)로 나눕니다. funky-ui는 그러지 않습니다. 영역 분리는 셋 중 하나로만 합니다:

1. **3px 검정 테두리** — 셸 영역(toolbar/sidebar/footer)을 끊을 때.
2. **하드 그림자로 떠 있는 면** — `Panel` · `Card` · `Window`. 콘텐츠 블록은 이 프레임 안에 담습니다.
3. **면색 전환** — 크림(`bg`) ↔ 흰(`surface`) ↔ sunken(`#fff0b8`). 배경이 바뀌면 경계가 생깁니다.

> ❌ `border-bottom: 1px solid #eee` · `<hr>` 얇은 구분선 · 옅은 회색 카드 경계
> ✅ 3px 검정 테두리 · `Panel`/`Card`로 프레이밍 · 크림/흰/sunken 면 전환

본문을 제목 + 얇은 가로줄 + 흰 여백으로 흘려보내면 docs 리더가 됩니다. 같은 콘텐츠를 `Panel`(검정/네온 헤더바 + 3px 테두리 + 하드 그림자)에 담으면 funky-ui가 됩니다.

---

## 3. Loudness 예산 — 네온은 "구조"에 쓴다

"Loud by default"는 컴포넌트만의 규칙이 아니라 화면 전체의 규칙입니다. 대략의 면적 비율:

- **크림/흰 면 60–70%** — 페이지(크림)와 콘텐츠 면(흰).
- **네온 10–20%** — 단, **solid fill로 구조적 요소에**: Panel 헤더바, 선택/활성 상태, StatTile, 활성 탭·nav, 주요 CTA.
- **검정 20–30%** — 테두리·텍스트·하드 그림자.

핵심은 **네온을 장식 액세서리로 쓰지 않는 것**입니다. 작은 코드 하이라이트나 점 하나에만 네온을 묻히면, 화면의 95%가 무채색이 되어 정체성이 죽습니다. 네온은 **눈에 보이는 구조**(헤더, 상태, 지표)를 칠해야 합니다.

또한 **큰 빈 흰 영역(void)을 두지 않습니다.** 콘텐츠가 적으면 면을 키우지 말고 `Panel`/`Card`/`Window`로 프레이밍해 밀도를 만듭니다.

---

## 4. 타이포로 구조를 만든다

- **섹션 라벨은 chrome 스타일** — UPPERCASE + `tracking 0.05em`(또는 더 넓게) + black(900). `<Text variant="chrome">` 또는 Panel 헤더. ❌ 일반 제목 + 얇은 밑줄(`<hr>`)은 docs 냄새입니다.
- **지표·숫자는 거대 black** — 통계는 `StatTile`(네온 면 + `4xl` 검정 숫자)로. 본문 폰트로 흘리지 않습니다.
- **헤딩은 면 위에** — 중요한 제목은 검정 또는 네온 면 위에 inverse 텍스트로 얹으면(Panel 헤더) 구조가 또렷해집니다.
- **워드마크는 skew** — 브랜드/사이드바 제목은 `skewX(-6deg)` 기울임이 시그니처입니다(AppShell이 이미 적용).

---

## 5. 시그니처 무브 — "확실히 funky-ui"로 만드는 디테일

레퍼런스 앱들이 공유하는 디테일. 맥락에 맞으면 적극적으로 씁니다.

- **Stage 텍스처** — 작업 캔버스/미리보기 영역은 체커보드(투명도 표시) 또는 도트 그리드. `ToolShell stage="checker"|"dots"`.
- **Window dots** — 코드·미리보기·export 샷은 `Window`(신호등 dots 타이틀바 + 3px 프레임 + lg 그림자)로 감쌉니다.
- **다크 Toast** — 알림은 검정 면 + 크림 글자(`Toast`). 화면 하단 중앙.
- **스티커 태그** — 카드 모서리에 검정 면 + 흰 uppercase 라벨을 붙여 "도장" 느낌을 줍니다.
- **컬러 코딩** — 카테고리(연도·타입 등)에 네온 7색을 1:1 매핑해 한눈에 구분.

---

## 6. Anti-patterns — generic화 체크리스트

왼쪽(❌)이 보이면 오른쪽(✅)으로 교정합니다. 대부분의 "정체성에 안 맞는 funky-ui 앱"은 이 표의 왼쪽으로 가득 차 있습니다.

| ❌ generic (이렇게 새어나간다) | ✅ funky-ui |
| --- | --- |
| 1px 옅은 회색 divider · `<hr>` | 3px 검정 테두리 · `Panel`/`Card` 프레이밍 |
| 본문이 흰 여백으로 흐름 (void) | 콘텐츠를 `Panel`/`Window`에 담아 밀도 확보 |
| 우측 "On this page" TOC 레일 + 얇은 제목 | AppShell nav + chrome(UPPERCASE) 라벨 |
| 네온을 작은 하이라이트로만 사용 | 네온 solid fill을 헤더·상태·지표 등 구조에 |
| 둥근 모서리 · 블러 드롭섀도 | `radius 0` · 하드 오프셋 그림자(blur 0) |
| 옅은 회색 텍스트로 위계 | 검정 + weight(500/700/900)로 위계 |
| UI 라이브러리 기본 룩(둥근 인풋/카드) | funky-ui 컴포넌트·클래스로 교체 |
| 통계를 본문 텍스트로 | `StatTile` (네온 면 + 큰 검정 숫자) |
| 영역마다 다른 회색 톤 | 크림 / 흰 / sunken 3면 + 검정 테두리 |

---

## 7. 정체성 self-check — 화면을 내보내기 전에

funky-ui로 화면을 만들었으면, 마무리 전에 이 체크리스트를 통과시킵니다. 하나라도 "아니오"면 §2–6으로 돌아가 고칩니다.

- [ ] 매크로 골격이 AppShell 또는 ToolShell(혹은 그 골격)인가?
- [ ] 영역 분리가 **3px 검정 테두리 / 하드 그림자 면 / 면색 전환**으로만 되어 있는가? (1px hairline·`<hr>`가 없는가)
- [ ] 네온이 **구조적 요소**(헤더·상태·지표·활성)에 solid fill로 쓰였는가? (장식 점에만 묻지 않았는가)
- [ ] 큰 빈 흰 void 없이 콘텐츠가 프레이밍되어 있는가?
- [ ] 섹션 라벨이 UPPERCASE chrome인가? 지표가 큰 black 숫자인가?
- [ ] 모서리 `radius 0`, 그림자 blur 0(하드 오프셋)인가? 둥근/블러가 없는가?
- [ ] 모든 색·간격·그림자·타입이 토큰에서 왔는가? (raw hex·임의 수치 없음)
- [ ] interactive 요소가 `.funky-pressable`(press-into-shadow)를 쓰는가?

---

## 참고

- 셸 컴포넌트 prop: [Templates](https://funky-ui.bsiku.dev/docs/api/components/templates.md) (`AppShell` · `ToolShell`)
- 프레이밍 컴포넌트: [Components](https://funky-ui.bsiku.dev/docs/api/components/components.md) (`Panel` · `Window` · `Toolbar` · `Toast` · `Card` · `StatTile`)
- 토큰 정본: [Tokens](https://funky-ui.bsiku.dev/docs/api/foundations/tokens.md)
