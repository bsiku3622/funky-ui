import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { SPACE } from "../tokens/layout";
import { px } from "../tokens/typography";
import { vars } from "../tokens/variables";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const cardBase = style(c({ minWidth: 0 }));

export const cardHeader = style(c({ minWidth: 0, paddingInline: px(SPACE["3xl"]), paddingBlock: px(SPACE.xl) }));
export const cardHeaderTitle = style(c({ minWidth: 0, flex: 1 }));

/** 머리 막대 — 칠은 Paint(solid)가 하고, 여기서는 테두리를 아래 한 줄만 남깁니다 */
export const cardHeaderBar = style(
  c({
    borderWidth: `0 0 ${vars.stroke.base}`,
    borderColor: vars.line.base,
    paddingBlock: px(SPACE.lg),
  }),
);

export const cardSection = style(c({ minWidth: 0 }));
export const cardSectionDivided = style(c({ borderTop: `${vars.stroke.base} solid ${vars.line.subtle}` }));
