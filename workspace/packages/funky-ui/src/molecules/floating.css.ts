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
    backgroundColor: vars.surface.inverse,
    color: vars.ink.inverse,
    border: `${vars.stroke.base} solid ${vars.line.base}`,
    boxShadow: vars.shadow.raised,
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
    backgroundColor: vars.surface.raised,
    border: `${vars.stroke.base} solid ${vars.line.base}`,
    boxShadow: vars.shadow.raised,
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
    background: "transparent",
    color: vars.ink.primary,
    textAlign: "start",
    whiteSpace: "nowrap",
    fontSize: px(CONTROL_TEXT.sm.size),
    letterSpacing: em(0.1),
    fontWeight: WEIGHT.black,
    textTransform: "uppercase",
    cursor: "pointer",
    selectors: {
      "&:hover:not(:disabled), &:focus-visible": { backgroundColor: vars.overlay.hoverGray, outlineOffset: "-4px" },
      "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
    },
  }),
);

export const menuItemSelected = style(
  c({
    backgroundColor: vars.surface.inverse,
    color: vars.ink.inverse,
    selectors: { "&:hover:not(:disabled), &:focus-visible": { backgroundColor: vars.surface.inverse } },
  }),
);

export const menuItemCheck = style(c({ marginLeft: "auto" }));
