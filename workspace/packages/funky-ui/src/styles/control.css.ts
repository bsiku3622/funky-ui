/**
 * Control — 슬롯을 실제 글자 · 면 · 테두리로 칠하고, hover · press · disabled 를 붙입니다.
 *
 * Button · IconButton · SideNav.Item 이 `controlClass`(atoms/Button.tsx)로 씁니다. SegmentedControl ·
 * Tabs 는 Button 을 그대로 쓰고, NavButton 은 유리 면이라 따로 그립니다. Badge · Notice 는 `paint` 만
 * 씁니다 (읽는 물건이라 반응하지 않습니다).
 *
 * **눌림 (shadow on)** — 쉬는 동안 4px 그림자 위에 떠 있다가, hover 때 그림자 자리로 가라앉고
 * (translate 4px · 그림자 0), 누르는 순간 한 번 더 작아집니다. 선택된 것은 **눌린 채로** 있습니다.
 * **눌림 (shadow off)** — 움직이지 않고 층만 바뀌며, 누르는 순간만 작아집니다.
 */
import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { vars } from "../tokens/variables";
import { slot } from "./slots";

const ENABLED = ":not(:disabled):not([aria-disabled='true'])";

/** 슬롯으로 칠하기만 합니다 (반응 없음) */
export const paint = style({
  "@layer": {
    [components]: {
      color: slot.fg,
      backgroundColor: slot.bg,
      borderColor: slot.border,
      borderStyle: "solid",
      borderWidth: vars.stroke.base,
    },
  },
});

/** 누를 수 있는 컨트롤 — hover 층 · press 층 · disabled */
export const interactive = style({
  "@layer": {
    [components]: {
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
        "&:disabled, &[aria-disabled='true']": {
          opacity: 0.4,
          cursor: "not-allowed",
        },
      },
    },
  },
});

const sunkShadow = `0 0 0 0 ${vars.shadowColor}`;
const sinkTo = `translate(${vars.press.sink}, ${vars.press.sink})`;

/** 그림자 위에 떠 있는 컨트롤 — hover 때 그림자 속으로 가라앉습니다 */
export const raised = style({
  "@layer": {
    [components]: {
      boxShadow: vars.shadow.raised,
      selectors: {
        [`&${ENABLED}:hover`]: { transform: sinkTo, boxShadow: sunkShadow },
        [`&${ENABLED}:active`]: { transform: `${sinkTo} scale(${vars.press.scale})`, boxShadow: sunkShadow },
      },
    },
  },
});

/** 선택된 raised 컨트롤 — 눌린 채로 있습니다 */
export const sunk = style({
  "@layer": {
    [components]: {
      transform: sinkTo,
      boxShadow: sunkShadow,
      selectors: {
        [`&${ENABLED}:hover`]: { transform: sinkTo, boxShadow: sunkShadow },
      },
    },
  },
});
