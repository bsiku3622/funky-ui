import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { SPACE } from "../tokens/layout";
import { px } from "../tokens/typography";
import { vars } from "../tokens/variables";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const accordionHeader = style(
  c({
    display: "flex",
    alignItems: "center",
    gap: px(SPACE.lg),
    width: "100%",
    padding: px(SPACE["2xl"]),
    border: 0,
    textAlign: "start",
  }),
);

export const accordionChevron = style(
  c({ marginLeft: "auto", flexShrink: 0, transitionProperty: "transform", transitionDuration: vars.duration.base }),
);
export const accordionChevronOpen = style(c({ transform: "rotate(180deg)" }));

export const accordionBody = style(
  c({ padding: px(SPACE["2xl"]), borderTop: `${vars.stroke.base} solid ${vars.line.subtle}` }),
);
