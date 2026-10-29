import { style, styleVariants } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { BADGE } from "../tokens/shape";
import { WEIGHT, em, px } from "../tokens/typography";
import type { BadgeSize } from "../tokens/vocabulary";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const badgeBase = style(
  c({
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    gap: px(4),
    maxWidth: "100%",
    fontWeight: WEIGHT.black,
    textTransform: "uppercase",
    letterSpacing: em(0.06),
    lineHeight: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    verticalAlign: "middle",
  }),
);

export const badgeSize = styleVariants(BADGE.height, (h, size) =>
  c({ height: px(h), paddingInline: px(BADGE.inset[size as BadgeSize]), fontSize: px(BADGE.font[size as BadgeSize]) }),
);
