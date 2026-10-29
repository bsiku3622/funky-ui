import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { SPACE } from "../tokens/layout";
import { px } from "../tokens/typography";
import { vars } from "../tokens/variables";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const cardBase = style(c({ minWidth: 0, color: "inherit" }));

export const cardHeader = style(c({ minWidth: 0, paddingInline: px(SPACE["3xl"]), paddingBlock: px(SPACE.xl) }));
export const cardHeaderTitle = style(c({ minWidth: 0, flex: 1 }));
export const cardHeaderBar = style(
  c({
    backgroundColor: vars.accent.solid,
    color: vars.accent.ink,
    borderBottom: `${vars.stroke.base} solid ${vars.line.base}`,
    paddingBlock: px(SPACE.lg),
  }),
);

export const cardSection = style(c({ minWidth: 0 }));
export const cardSectionDivided = style(c({ borderTop: `${vars.stroke.base} solid ${vars.line.subtle}` }));
