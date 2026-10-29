import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { vars } from "../tokens/variables";

const ENABLED = ":not(:disabled):not([aria-disabled='true'])";

/**
 * 유리 — 글자색은 바에서 물려받습니다. 바가 accent 의 ink 를 주므로 어떤 accent 바 위에서도 읽힙니다.
 * 커서 · 꺼진 모양 · 누르는 순간의 몸짓은 Pressable(tap)이 맡습니다.
 */
export const glass = style({
  "@layer": {
    [components]: {
      color: "inherit",
      backgroundColor: vars.glass.bg,
      border: `${vars.stroke.base} solid ${vars.glass.border}`,
      selectors: {
        [`&${ENABLED}:hover`]: { backgroundColor: vars.glass.bgHover, borderColor: vars.glass.borderHover },
      },
    },
  },
});

export const glassSelected = style({
  "@layer": { [components]: { backgroundColor: vars.glass.bgSelected, borderColor: vars.glass.borderHover } },
});
