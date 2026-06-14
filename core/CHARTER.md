# funky-ui CHARTER

이 한 장이 funky-ui를 운영하는 규칙의 입구입니다. 정본은 아래 **canonical 문서**들이 소유하고, 이 헌장은 *우선순위·불가침 규칙·종료 체크리스트*만 못박습니다. 규칙을 늘리는 곳이 아니라 줄이는 곳입니다 — 계보(11개 자매 시스템 전부 폐기)가 남긴 최대 교훈은 **명세 밀도와 완주율이 음의 상관**이라는 것입니다.

## Canonical 문서 (충돌 시 위가 이긴다)

1. **[identity.md](../docs/foundations/identity.md)** — 정체성·왜 이렇게 그리는가 (stance, 4분면, 법칙의 근거)
2. **[architecture.md](../docs/foundations/architecture.md)** — 레이어·폴더·스타일링 메커니즘
3. **[tokens.md](../docs/foundations/tokens.md)** — 토큰 네이밍·SSOT·accent/font/sizing 시스템
4. **[composition.md](../docs/foundations/composition.md)** — 화면 짜는 문법 (어떻게 배치하는가)
5. **[components/](../docs/components/)** — 레이어별 컴포넌트 API

> 하위 문서가 상위 문서와 어긋나면, **고쳐야 할 것은 하위 문서**입니다.

## 불가침 규칙 5 (위반 = 거름)

1. **토큰에서만.** 색·간격·그림자·타입·모션·크기는 토큰 또는 토큰 파생(`var(--funky-*)`)에서만. 컴포넌트 CSS·style에 raw hex·임의 px·임의 색 리터럴 금지.
2. **radius 0 · 그림자 blur 0.** 모서리는 `radius.none`만, 그림자는 하드 오프셋(blur 0)만. 둥근 모서리·소프트 드롭섀도 전면 금지.
3. **raw HTML은 Atom만.** `atoms/`만 raw 태그를 렌더한다. `components/`·`templates/`는 atom 합성으로만(SVG Icon은 예외).
4. **구조는 loud, 내용은 quiet.** 네온 solid fill은 구조(헤더·상태·지표·활성)에만. 영역 분리는 카드(하드섀도우 면)·2px 검정 테두리·면색 전환으로만 — 1px hairline·`<hr>`·옅은 회색 경계 금지.
5. **확장하되 우회하지 않는다.** 컴포넌트가 정당한 요구를 표현 못 하면 토큰/API가 불완전한 것. 로컬 핵 대신 시스템을 확장한다.

## 메커니즘 (사람 약속이 아니라 강제)

- **`tokens.css`는 codegen 산출물.** 직접 수정 금지. `node scripts/gen-tokens.ts` 재생성 후 `git diff src/tokens.css == 0`이어야 한다.
- **정적 배포 불변식.** 토큰은 빌드타임에 정적 CSS 변수로 굳힌다. **런타임 JS 색 주입·WCAG 런타임 계산 금지**(retro가 SSR로 좌초한 길). accent contrast 검증(`pickFg`)은 빌드타임 경고일 뿐, 결정은 손으로.
- **점진 이행.** 토큰 개편은 *항상 빌드 가능한 단계*로 쪼갠다. 신 토큰 도입 시 구 토큰을 같은 단계에서 제거하거나 같은 값을 가리키는 alias로만 둔다 — **두 토큰 우주 공존 금지**(paper·design-system-v1이 좌초한 길).

## 금지 목록 (계보 함정 — 도입 시 즉시 탈락)

새 medium 추상화(core/web 분리) · 런타임 색 주입(Provider/useLayoutEffect) · OKLCH/soft-shadow 정체성 피벗 · 색 변환 라이브러리 deps · 수동 exports 수백 줄 나열 · `tokens.ts` from-scratch 재작성(clean restart) · 다크모드 빈 자리 선반영.

## 작업 종료 체크리스트

- [ ] `core: npm run build` 통과 (codegen + tsup + dts)
- [ ] `node scripts/gen-tokens.ts` 후 `tokens.css` diff 0
- [ ] app dev 렌더로 시각 회귀 없음 확인 (추측 금지 — 직접 본다)
- [ ] 새 토큰은 additive, 기존 공개 export 미제거
- [ ] 불가침 규칙 5 위반 없음 · deps 0 유지
