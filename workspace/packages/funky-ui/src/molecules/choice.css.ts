import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const choiceFill = style(c({ width: "100%", flexWrap: "nowrap" }));
export const choiceItemFill = style(c({ flex: "1 1 0", minWidth: 0 }));
export const tabPanel = style(c({ minWidth: 0 }));
