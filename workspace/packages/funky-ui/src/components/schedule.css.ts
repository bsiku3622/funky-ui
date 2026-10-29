import { style, styleVariants } from "@vanilla-extract/css";

import { ACCENT_COLORS } from "../tokens/color";
import { components } from "../tokens/layers.css";
import { SPACE } from "../tokens/layout";
import { TEXT_ROLES, WEIGHT, em, px } from "../tokens/typography";
import { vars } from "../tokens/variables";
import { TONE_VAR } from "./tone";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });
const tone = `var(${TONE_VAR}, ${vars.ink.primary})`;

export const tile = style(
  c({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: px(SPACE["2xs"]),
    minWidth: 0,
    height: "100%",
    paddingInline: px(SPACE.md),
    paddingBlock: px(SPACE.xs),
    border: `${vars.stroke.base} solid ${tone}`,
    backgroundColor: `color-mix(in srgb, ${tone} 12%, ${vars.surface.raised})`,
    color: tone,
    overflow: "hidden",
  }),
);

export const tileState = styleVariants({
  upcoming: c({}),
  /** 지금 — 핑크 사다리의 Plain 문법 (soft 면 · solid 테두리 · solidInk 글자) */
  now: c({ backgroundColor: ACCENT_COLORS.pink.soft, color: ACCENT_COLORS.pink.solidInk }),
  past: c({ opacity: 0.4 }),
  free: c({ borderStyle: "dashed", borderColor: vars.line.soft, backgroundColor: "transparent", color: vars.ink.faint }),
});

export const tileTitle = style(
  c({
    fontSize: px(TEXT_ROLES.caption.size),
    lineHeight: px(TEXT_ROLES.caption.leading),
    fontWeight: WEIGHT.black,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
);
export const tileMeta = style(
  c({
    fontSize: px(TEXT_ROLES.micro.size),
    lineHeight: px(TEXT_ROLES.micro.leading),
    fontWeight: WEIGHT.bold,
    color: vars.ink.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
);

/* ── TimetableGrid ──────────────────────────────────────────────────── */

const head = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBlock: px(SPACE.md),
  fontSize: px(TEXT_ROLES.micro.size),
  fontWeight: WEIGHT.black,
  letterSpacing: em(0.1),
  textTransform: "uppercase" as const,
};

export const grid = style(
  c({
    display: "grid",
    minWidth: 0,
    backgroundColor: vars.surface.raised,
    border: `${vars.stroke.base} solid ${vars.line.base}`,
  }),
);
export const gridCorner = style(c({ ...head, backgroundColor: vars.surface.inverse, color: vars.ink.inverseMuted }));
export const gridDay = style(
  c({ ...head, backgroundColor: vars.surface.inverse, color: vars.ink.inverse, borderLeft: `${vars.stroke.base} solid ${vars.line.inverse}` }),
);
export const gridDayToday = style(c({ backgroundColor: vars.surface.raised, color: vars.ink.primary }));
export const gridPeriod = style(
  c({ ...head, backgroundColor: vars.surface.well, color: vars.ink.primary, borderTop: `${vars.stroke.base} solid ${vars.line.subtle}` }),
);
export const gridCell = style(
  c({
    minWidth: 0,
    minHeight: px(48),
    padding: px(SPACE.xs),
    borderTop: `${vars.stroke.base} solid ${vars.line.subtle}`,
    borderLeft: `${vars.stroke.base} solid ${vars.line.subtle}`,
  }),
);
