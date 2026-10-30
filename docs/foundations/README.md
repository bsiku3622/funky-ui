# Foundations

Foundations는 funky-ui의 숫자와 색이 사는 다섯 시스템입니다. 컴포넌트는 여기서 이름으로 고르기만 하고, 숫자나 hex를 직접 적지 않습니다.

```
Color · Typography  →  Shape  →  Layout  →  Motion  →  Primitives  →  Atoms  →  Molecules  →  Components
```

각 시스템은 자기보다 앞의 시스템만 읽습니다. Motion이 Layout의 그림자 거리를 읽어 "가라앉는 거리 = 그림자 거리"를 보장하는 것이 그 예입니다. 반대 방향(Shape가 Motion을 읽는 식)은 없습니다.

| 시스템 | 정본 | 하는 일 |
| --- | --- | --- |
| [Color](color.md) | `tokens/palette.ts` · `color.ts` · `color-recipes.ts` | 면 · 잉크 · 선, accent 사다리, 15 variant 레시피, 오버레이 · 포커스 |
| [Typography](typography.md) | `tokens/typography.ts` | 서체, 글자 역할 열한 개, 줄 높이, 로고 글자, 컨트롤 글자 |
| [Shape](shape.md) | `tokens/shape.ts` | 선 굵기 · 모서리 · 컨트롤 크기 · 포커스 링 |
| [Layout](layout.md) | `tokens/layout.ts` | 간격 · 그림자 두 단 · z · breakpoint · 폭 |
| [Motion](motion.md) | `tokens/motion.ts` | 시간 · 곡선 · 눌림 · 떠오름 · 커짐 · 등장 |

값은 `tokens/variables.ts`가 `--fk-*` CSS 변수로 굽습니다. 이름이 해시가 아니라 고정이라 앱의 CSS도 같은 변수를 읽을 수 있습니다.

```css
.my-rule {
  border: var(--fk-stroke-base) solid var(--fk-line-base);
  box-shadow: var(--fk-shadow-raised);
}
```

TypeScript에서는 `/tokens`의 `vars`가 같은 참조를 줍니다(`vars.shadow.raised` → `"var(--fk-shadow-raised)"`). 원본 숫자(`SPACE` · `CONTROL` …)는 Playground의 표처럼 값을 보여 줄 때만 읽습니다.
