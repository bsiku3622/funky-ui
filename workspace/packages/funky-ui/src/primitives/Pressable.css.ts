/**
 * 누르는 몸짓 (fk.primitives) — 색은 모릅니다(그건 Paint). 커서 · 꺼진 모양 · 움직임만 다룹니다.
 *
 * - `press` — 4px 그림자 위에 떠 있다가 hover 때 그림자 자리로 가라앉고, 누르는 순간 한 번 더 작아집니다.
 *   가라앉는 거리 = 그림자 거리(`PRESS.sink`)라 그림자가 본체 뒤로 비져 나오지 않습니다.
 * - `lift`  — hover 때 4px 떠오르고, 그림자는 화면에 그대로 남아 길어집니다 (탐색 카드).
 * - `tap`   — 그림자 없이 누르는 순간만 작아집니다 (그림자를 끈 버튼).
 * - `pressed` — press 몸짓이 눌린 채로 머뭅니다 (골라진 버튼).
 *
 * 누르는 순간의 크기는 `--fk-press-scale`(기본 0.96)입니다. 큰 면은 자기 class 에서 0.98 로 덮습니다.
 */
import { style, styleVariants } from "@vanilla-extract/css";

import { primitives } from "../tokens/layers.css";
import { LIFT, PRESS_TRANSITION } from "../tokens/motion";
import { vars } from "../tokens/variables";
import type { PressMotion } from "../tokens/vocabulary";

const p = (rule: Record<string, unknown>) => ({ "@layer": { [primitives]: rule } });
const ENABLED = ":not(:disabled):not([aria-disabled='true'])";
const sink = `translate(${vars.press.sink}, ${vars.press.sink})`;
const sunkShadow = `0 0 0 0 ${vars.shadowColor}`;

export const pressBase = style(
  p({
    cursor: "pointer",
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
    transitionProperty: PRESS_TRANSITION,
    transitionDuration: vars.duration.fast,
    transitionTimingFunction: vars.easing.standard,
    selectors: {
      "&:disabled, &[aria-disabled='true']": { opacity: 0.4, cursor: "not-allowed" },
    },
  }),
);

export const motionClass = styleVariants({
  press: p({
    boxShadow: vars.shadow.raised,
    selectors: {
      [`&${ENABLED}:hover`]: { transform: sink, boxShadow: sunkShadow },
      [`&${ENABLED}:active`]: { transform: `${sink} scale(${vars.press.scale})`, boxShadow: sunkShadow },
    },
  }),
  lift: p({
    boxShadow: vars.shadow.raised,
    selectors: {
      [`&${ENABLED}:hover`]: {
        transform: `translateY(-${LIFT.rise}px)`,
        boxShadow: `${vars.press.sink} calc(${vars.press.sink} + ${LIFT.rise}px) 0 0 ${vars.shadowColor}`,
      },
      [`&${ENABLED}:active`]: { transform: "translateY(0)", boxShadow: vars.shadow.raised },
    },
  }),
  tap: p({
    selectors: { [`&${ENABLED}:active`]: { transform: `scale(${vars.press.scale})` } },
  }),
} satisfies Record<PressMotion, object>);

/** press 몸짓이 눌린 채로 — hover 해도 그 자리에 있습니다 */
export const pressedClass = style(
  p({
    transform: sink,
    boxShadow: sunkShadow,
    selectors: { [`&${ENABLED}:hover`]: { transform: sink, boxShadow: sunkShadow } },
  }),
);
