# Composition — 화면을 짜는 문법

토큰과 컴포넌트가 funky-ui의 **voice**(무엇으로 그리는가)라면, 이 문서는 **grammar**(어떻게 배치하는가)입니다. funky-ui로 만든 화면이 "그냥 일반 앱에 네온 페인트만 칠한 것"처럼 보일 때, 어긋난 곳은 거의 항상 컴포넌트가 아니라 composition입니다.

컴포넌트는 정체성을 보장하지 않습니다. 검정 테두리 버튼과 네온 StatTile을 써도, 영역을 1px 얇은 선으로 나누고 본문을 흰 여백으로 비워두면 결과물은 docs 사이트가 됩니다. 이 문서의 규칙은 그 드리프트를 막습니다.

---

## 0. Stance — 구조는 loud, 내용은 quiet

funky-ui의 한 줄 태도: **화면의 '뼈대'(구조)는 과감하게 드러내고, '살'(읽는 내용)은 차분하게 둔다.** 네온·검정 테두리·하드 그림자는 헤더·네비·섹션 경계·상태·지표 같은 *구조*에 몰아주고, 본문·데이터·입력값 같은 *내용*은 그 틀 안에 조용히 담는다. "Loud by default"는 "다 시끄럽게"가 아니라 "**구조가** 시끄럽게"라는 뜻이다.

> 이 stance의 *근거*(DNA·4분면 모델·무게중심)는 [identity.md](identity.md)가 정본으로 소유한다. 이 문서는 그것을 화면으로 옮기는 *문법*이다.

## 1. 화면 유형부터 고른다 — 상호작용이냐, 읽기냐

새 화면을 짤 때 가장 먼저 "이건 **조작하는** 화면인가, **읽는** 화면인가"를 정한다. 둘은 정반대 규칙을 따른다 — 같은 법칙을 양쪽에 들이대면 망한다.

- **상호작용 화면**(대시보드·도구·게임·관리도구) — **AppShell**(보라 상단바 + 크림 nav 사이드바 + 콘텐츠 + 모바일 하단 nav) 또는 **ToolShell**(Toolbar + Stage + Footer) 골격. 영역을 카드·네온으로 loud하게 끊는다. **§2~§7이 여기 적용된다.**
- **읽기 화면**(docs·리포트·아티클) — **SiteHeader**(보라 상단바) + **DocsSidebar**(크림 좌측 nav) + 본문 + 선택적 **Toc**(우측 "On this page"). 본문은 카드로 감싸지 않고 크림 위에 quiet하게 흐른다. 마크다운은 **MarkdownView**로 렌더. **이 부류는 §8을 따른다.**

(이 셸들은 funky-essets·class-explorer·funky-ui docs 등 레퍼런스 앱의 골격을 그대로 코드화한 것이다. 직접 셸을 짜더라도 이 골격을 벗어나지 않는다.)

---

## 2. 영역은 카드·테두리로 나눈다 — 얇은 선 금지

**funky-ui에서 가장 자주 깨지는 규칙입니다.** (이 절은 *상호작용 화면* 기준 — 읽기 화면은 §8.) 일반 웹/SaaS는 영역을 1px hairline divider로 나눕니다. funky-ui는 그러지 않습니다. 영역 분리는 셋 중 하나로만, 우선순위 순으로:

1. **하드 그림자로 떠 있는 면** — `Panel` · `Card` · `Window`. 콘텐츠 블록은 **우선 이 프레임에 담는다(1순위).** 크림 배경 위에 흰 카드가 gap을 두고 떠 있는 게 기본형.
2. **2px 검정 테두리** — 셸 영역(toolbar/sidebar/footer)을 끊을 때. 더 강조할 땐 3px(`border-bold`). (표준 테두리는 2px다 — `border.width`.)
3. **면색 전환** — 크림(`bg`) ↔ 흰(`surface`). *오브젝트* 강조는 옅은 틴트(sunken/accent-soft)가 아니라 **solid 네온**으로(§3). 옅은 틴트는 읽기 화면 본문에서만.

> ❌ `border-bottom: 1px solid #eee` · `<hr>` 얇은 구분선 · 옅은 회색 카드 경계 · 오브젝트에 크림류 남발
> ✅ `Panel`/`Card`로 프레이밍 · 2px 검정 테두리 · 흰/네온 면 · 영역별 네온 테마

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
| 1px 옅은 회색 divider · `<hr>` | `Panel`/`Card` 프레이밍 · 2px 검정 테두리 |
| 본문이 흰 여백으로 흐름 (void) | 콘텐츠를 `Panel`/`Window`에 담아 밀도 확보 |
| (상호작용 화면에서) 우측 "On this page" TOC 레일 | AppShell nav + chrome 라벨 — *단, 읽기 화면(docs)에선 우측 `Toc`가 정당(§8)* |
| 오브젝트에 크림류(sunken/accent-soft) 남발 | solid 네온으로 강조 (크림은 셸 배경에만) |
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
- [ ] 영역 분리가 **카드(하드 그림자 면) / 2px 검정 테두리 / 면색 전환**으로만 되어 있는가? (1px hairline·`<hr>`가 없는가)
- [ ] 네온이 **구조적 요소**(헤더·상태·지표·활성)에 solid fill로 쓰였는가? (장식 점에만 묻지 않았는가)
- [ ] 큰 빈 흰 void 없이 콘텐츠가 프레이밍되어 있는가?
- [ ] 섹션 라벨이 UPPERCASE chrome인가? 지표가 큰 black 숫자인가?
- [ ] 모서리 `radius 0`, 그림자 blur 0(하드 오프셋)인가? 둥근/블러가 없는가?
- [ ] 모든 색·간격·그림자·타입이 토큰에서 왔는가? (raw hex·임의 수치 없음)
- [ ] interactive 요소가 `.funky-pressable`(press-into-shadow)를 쓰는가?

---

## 8. 읽기 화면 — funky docs 패턴

docs·리포트·긴 아티클은 §2~§6의 "카드·네온" 법칙을 **그대로 쓰면 안 된다.** 본문을 카드로 감싸고 섹션마다 네온 칩을 붙이면 시끄러워서 못 읽는다. 읽기 화면은 funky-ui docs 사이트의 미니멀 패턴을 따른다 — 여기선 *절제가 정답*이다.

- **골격:** `SiteHeader`(보라 상단바) + `DocsSidebar`(크림 좌측, active만 검정) + 본문 + 선택 `Toc`(우측 "On this page").
- **본문은 카드 없이** 크림 위에 흐른다. 마크다운은 `MarkdownView`(헤딩 chrome · ink 코드블록 · `.funky-table` · `math`로 LaTeX). `@studio-baeks/funky-ui/markdown` 서브패스 + `markdown.css`.
- **옅은 면이 오히려 맞다:** 인라인 코드·인용은 sunken/accent-soft, 표 셀 구분선은 얇아도 자연스럽다. (상호작용 화면의 "크림류 금지"가 여기엔 적용 안 됨.)
- **구분선은 "별도 묶음" 경계에만:** 좌측 사이드바(문서 바깥 네비)는 border, 우측 `Toc`(현재 문서의 일부)는 구분선 없이.
- **상단 여백:** 네비(사이드바)는 위에서 시작, 콘텐츠(본문·Toc)만 상단 패딩.
- chrome(UPPERCASE·네온)은 헤더·사이드 라벨·active에만. 본문 타이포는 검정 + weight로 위계.

---

## 참고

- 셸·docs 템플릿: [Templates](https://funky-ui.bsiku.dev/docs/api/components/templates.md) (`AppShell` · `ToolShell` · `SiteHeader` · `DocsSidebar`)
- 프레이밍·form: [Components](https://funky-ui.bsiku.dev/docs/api/components/components.md) (`Panel` · `Window` · `Card` · `StatTile` · `Select`) · Atoms (`Checkbox` · `Radio` · `Switch` · `Table`)
- 읽기 렌더러: `MarkdownView` · `Toc` (`@studio-baeks/funky-ui/markdown`)
- 토큰 정본: [Tokens](https://funky-ui.bsiku.dev/docs/api/foundations/tokens.md)
- 정체성 근거: [identity.md](identity.md) · 운영 규칙: [CHARTER](../../core/CHARTER.md)
