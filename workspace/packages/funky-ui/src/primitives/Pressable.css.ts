/**
 * 누르는 면 — 버튼이 아닌 큰 면(카드)에 같은 몸짓을 줍니다.
 *
 * - `press` — 4px 그림자 위에 떠 있다가 hover 때 그림자 자리로 가라앉습니다 (사람 카드).
 * - `lift`  — hover 때 4px 떠오르고, 그림자는 화면에 그대로 남아 길어집니다 (탐색 카드).
 */
import { style, styleVariants } from "@vanilla-extract/css";

import { primitives } from "../tokens/layers.css";
import { LIFT } from "../tokens/motion";
import { vars } from "../tokens/variables";

const ENABLED = ":not(:disabled):not([aria-disabled='true'])";
const sink = `translate(${vars.press.sink}, ${vars.press.sink})`;

export const pressableBase = style({
  "@layer": {
    [primitives]: {
      display: "block",
      width: "100%",
      textAlign: "inherit",
      // 링크(as="a" · 라우터 링크)로 그려도 브라우저의 파란 밑줄이 남지 않습니다
      color: "inherit",
      textDecoration: "none",
      cursor: "pointer",
      boxShadow: vars.shadow.raised,
      transitionProperty: "box-shadow, transform, background-color, border-color",
      transitionDuration: vars.duration.fast,
      transitionTimingFunction: vars.easing.standard,
      selectors: {
        "&:disabled, &[aria-disabled='true']": { cursor: "not-allowed", opacity: 0.4 },
      },
    },
  },
});

export const motionClass = styleVariants({
  press: {
    "@layer": {
      [primitives]: {
        selectors: {
          [`&${ENABLED}:hover`]: { transform: sink, boxShadow: `0 0 0 0 ${vars.shadowColor}` },
          [`&${ENABLED}:active`]: { transform: `${sink} scale(${vars.press.surfaceScale})`, boxShadow: `0 0 0 0 ${vars.shadowColor}` },
        },
      },
    },
  },
  lift: {
    "@layer": {
      [primitives]: {
        selectors: {
          [`&${ENABLED}:hover`]: {
            transform: `translateY(-${LIFT.rise}px)`,
            boxShadow: `${vars.press.sink} calc(${vars.press.sink} + ${LIFT.rise}px) 0 0 ${vars.shadowColor}`,
          },
          [`&${ENABLED}:active`]: { transform: "translateY(0)", boxShadow: vars.shadow.raised },
        },
      },
    },
  },
});
