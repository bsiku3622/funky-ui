import { style, styleVariants } from "@vanilla-extract/css";

import { ACCENT_COLORS } from "../tokens/color";
import { components } from "../tokens/layers.css";
import { vars } from "../tokens/variables";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const link = style(
  c({
    color: vars.accent.solidInk,
    fontWeight: 900,
    textDecoration: "none",
    borderBottom: `${vars.stroke.base} solid ${vars.accent.solid}`,
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: vars.duration.fast,
    selectors: {
      "&:hover": { backgroundColor: vars.accent.solid, color: vars.accent.ink },
    },
  }),
);

export const required = style(c({ marginLeft: "0.25em", color: ACCENT_COLORS.red.softInk }));

export const divider = styleVariants({
  horizontal: c({ width: "100%", height: 0, borderTopStyle: "solid", borderTopWidth: vars.stroke.base, flexShrink: 0 }),
  vertical: c({ alignSelf: "stretch", width: 0, borderLeftStyle: "solid", borderLeftWidth: vars.stroke.base, flexShrink: 0 }),
});

export const dividerTone = styleVariants({
  subtle: c({ borderColor: vars.line.subtle }),
  soft: c({ borderColor: vars.line.soft }),
  line: c({ borderColor: vars.line.base }),
});
