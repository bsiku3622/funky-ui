import { keyframes, style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { SPACE, Z } from "../tokens/layout";
import { CONTROL_TEXT, TEXT_ROLES, WEIGHT, em, px } from "../tokens/typography";
import { vars } from "../tokens/variables";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

const appear = keyframes({ from: { opacity: 0, transform: "translateY(4px)" }, to: { opacity: 1, transform: "none" } });

export const anchorWrap = style(c({ display: "inline-flex", maxWidth: "100%" }));

export const tooltip = style(
  c({
    zIndex: Z.tooltip,
    maxWidth: px(260),
    paddingInline: px(SPACE.md),
    paddingBlock: px(SPACE.xs),
    color: vars.ink.inverse,
    fontSize: px(TEXT_ROLES.label.size),
    lineHeight: px(TEXT_ROLES.label.leading),
    fontWeight: WEIGHT.black,
    pointerEvents: "none",
    animation: `${appear} ${vars.duration.fast} ${vars.easing.out}`,
  }),
);

export const menu = style(
  c({
    zIndex: Z.dropdown,
    display: "flex",
    flexDirection: "column",
    paddingBlock: 0,
    animation: `${appear} ${vars.duration.fast} ${vars.easing.out}`,
  }),
);

export const menuItem = style(
  c({
    display: "flex",
    alignItems: "center",
    gap: px(SPACE.md),
    width: "100%",
    paddingInline: px(SPACE.xl),
    paddingBlock: px(10),
    border: 0,
    textAlign: "start",
    whiteSpace: "nowrap",
    fontSize: px(CONTROL_TEXT.sm.size),
    letterSpacing: em(0.1),
    fontWeight: WEIGHT.black,
    textTransform: "uppercase",
    selectors: {
      // hover 층 · 골라진 칸의 검정 면은 Surface, 커서 · 꺼진 모양은 Pressable 이 맡습니다. 방향키로 온 칸도 hover 와 같은 층으로 보입니다
      "&:focus-visible": { backgroundImage: `linear-gradient(${vars.state.hover}, ${vars.state.hover})`, outlineOffset: "-4px" },
    },
  }),
);

export const menuItemCheck = style(c({ marginLeft: "auto" }));
