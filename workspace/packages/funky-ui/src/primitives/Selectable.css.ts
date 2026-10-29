/**
 * 골라진 모양 (fk.primitives) — class-explorer 의 골라진 버튼입니다. 105% 로 커져 이웃 위에 서고(z) 4px 그림자를
 * 그대로 둡니다. hover 때는 제자리에서 그림자만 숨기고, 누르는 순간 100% 로 돌아옵니다.
 * 색은 여기 없습니다 — 골라진 색은 칠(Paint · Glass · Surface)의 몫입니다.
 *
 * 이 모양은 그 자체로 몸짓이라 커지는 칸에는 Pressable 의 `motion` 을 주지 않습니다(`none`). Pressable.css 를
 * 읽어 들이는 것은 값 때문만이 아닙니다 — 이 파일의 규칙이 몸짓 규칙 뒤에 오게 해서, 둘이 겹쳐도 골라진
 * 모양이 이깁니다.
 */
import { style } from "@vanilla-extract/css";

import { primitives } from "../tokens/layers.css";
import { Z } from "../tokens/layout";
import { STATE_TRANSITION } from "../tokens/motion";
import { vars } from "../tokens/variables";
import { FLAT_SHADOW } from "./Pressable.css";

const p = (rule: Record<string, unknown>) => ({ "@layer": { [primitives]: rule } });
const ENABLED = ":not(:disabled):not([aria-disabled='true'])";
const grown = `scale(${vars.press.grow})`;

export const grow = style(
  p({
    position: "relative",
    zIndex: Z.raised,
    transform: grown,
    boxShadow: vars.shadow.raised,
    transitionProperty: STATE_TRANSITION,
    transitionDuration: vars.duration.fast,
    transitionTimingFunction: vars.easing.standard,
    selectors: {
      [`&${ENABLED}:hover`]: { transform: grown, boxShadow: FLAT_SHADOW },
      [`&${ENABLED}:active`]: { transform: "scale(1)", boxShadow: FLAT_SHADOW },
    },
  }),
);
