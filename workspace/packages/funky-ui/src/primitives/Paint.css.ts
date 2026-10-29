/**
 * Paint 의 칠과 몸짓 — 슬롯을 글자 · 면 · 테두리로 칠하고, 누를 수 있으면 hover · press · disabled 를
 * 붙입니다 (fk.primitives). 슬롯 값은 variant class 가(`styles/variant.css.ts`), 색은 accent class 가 줍니다.
 *
 * **눌림 (shadow + interactive)** — 쉬는 동안 4px 그림자 위에 떠 있다가, hover 때 그림자 자리로 가라앉고
 * (translate 4px · 그림자 0), 누르는 순간 한 번 더 작아집니다. 골라진 것은 **눌린 채로** 있습니다.
 * **눌림 (interactive 만)** — 움직이지 않고 층만 바뀌며, 누르는 순간만 작아집니다.
 */
import { style } from "@vanilla-extract/css";

import { primitives } from "../tokens/layers.css";
import { vars } from "../tokens/variables";
import { slot } from "../styles/slots";

const p = (rule: Record<string, unknown>) => ({ "@layer": { [primitives]: rule } });
const ENABLED = ":not(:disabled):not([aria-disabled='true'])";
const sunkShadow = `0 0 0 0 ${vars.shadowColor}`;
const sinkTo = `translate(${vars.press.sink}, ${vars.press.sink})`;

/** 슬롯으로 칠하기만 합니다 */
export const paintBase = style(
  p({
    color: slot.fg,
    backgroundColor: slot.bg,
    borderColor: slot.border,
    borderStyle: "solid",
    borderWidth: vars.stroke.base,
  }),
);

/** 누를 수 있는 요소 — hover 층 · press 층 · disabled */
export const interactive = style(
  p({
    cursor: "pointer",
    transitionProperty: "color, background-color, border-color, box-shadow, transform",
    transitionDuration: vars.duration.fast,
    transitionTimingFunction: vars.easing.standard,
    selectors: {
      [`&${ENABLED}:hover`]: {
        backgroundImage: `linear-gradient(${slot.hoverLayer}, ${slot.hoverLayer})`,
        color: slot.hoverFg,
        borderColor: slot.hoverBorder,
      },
      [`&${ENABLED}:active`]: {
        backgroundImage: `linear-gradient(${slot.pressLayer}, ${slot.pressLayer})`,
        transform: `scale(${vars.press.scale})`,
      },
      "&:disabled, &[aria-disabled='true']": { opacity: 0.4, cursor: "not-allowed" },
    },
  }),
);

/** 그림자만 — 누르지 않는 요소 */
export const raisedStatic = style(p({ boxShadow: vars.shadow.raised }));

/** 그림자 위에 떠 있는 누르는 요소 — hover 때 그림자 속으로 가라앉습니다 */
export const raised = style(
  p({
    boxShadow: vars.shadow.raised,
    selectors: {
      [`&${ENABLED}:hover`]: { transform: sinkTo, boxShadow: sunkShadow },
      [`&${ENABLED}:active`]: { transform: `${sinkTo} scale(${vars.press.scale})`, boxShadow: sunkShadow },
    },
  }),
);

/** 골라진 누르는 요소 — 눌린 채로 있습니다 */
export const sunk = style(
  p({
    transform: sinkTo,
    boxShadow: sunkShadow,
    selectors: { [`&${ENABLED}:hover`]: { transform: sinkTo, boxShadow: sunkShadow } },
  }),
);
