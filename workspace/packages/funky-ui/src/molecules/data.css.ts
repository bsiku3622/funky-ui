import { style, styleVariants } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { NUMERAL, TEXT_ROLES, WEIGHT, em, px } from "../tokens/typography";
import { vars } from "../tokens/variables";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const statValue = styleVariants(NUMERAL, (n) =>
  c({ fontSize: px(n.size), lineHeight: px(n.leading), letterSpacing: em(n.tracking), fontWeight: WEIGHT.black, fontVariantNumeric: "tabular-nums" }),
);

export const statValueAccent = style(c({ color: vars.accent.solidInk }));

export const statUnit = styleVariants({ sm: TEXT_ROLES.micro, lg: TEXT_ROLES.caption }, (r) =>
  c({ fontSize: px(r.size), fontWeight: WEIGHT.black, textTransform: "uppercase", color: vars.ink.muted }),
);

export const meterTrack = style(
  c({
    position: "relative",
    height: px(16),
    overflow: "hidden",
  }),
);

export const meterFill = style(
  c({
    height: "100%",
    backgroundColor: vars.accent.solid,
    borderRight: `${vars.stroke.base} solid ${vars.line.base}`,
    transitionProperty: "width",
    transitionDuration: vars.duration.slow,
    transitionTimingFunction: vars.easing.standard,
  }),
);
