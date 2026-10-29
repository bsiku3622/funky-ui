import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { SPACE } from "../tokens/layout";
import { px } from "../tokens/typography";
import { vars } from "../tokens/variables";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const notice = style(
  c({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: px(SPACE.lg),
    paddingInline: px(SPACE.xl),
    paddingBlock: px(SPACE.lg),
  }),
);

export const emptyState = style(c({ paddingBlock: px(SPACE["4xl"]), paddingInline: px(SPACE.xl), textAlign: "center" }));
export const emptyStateFramed = style(c({ border: `${vars.stroke.base} dashed ${vars.line.soft}` }));
