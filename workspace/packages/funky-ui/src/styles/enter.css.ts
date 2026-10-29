/**
 * 등장 몸짓 (fk.primitives) — 새로 나타나는 판이 같이 씁니다: 메뉴 · 툴팁(`rise`), 모달(`pop`), 펼친 본문(`fade`).
 * 거리 · 시간은 `ENTER` 토큰이고, 움직임을 줄인 사람에게는 global.css 가 0.01ms 로 줄입니다.
 * 퇴장은 없습니다 — 이유는 `tokens/motion.ts` 의 `ENTER`.
 */
import { keyframes, styleVariants } from "@vanilla-extract/css";

import { primitives } from "../tokens/layers.css";
import { ENTER } from "../tokens/motion";
import { vars } from "../tokens/variables";
import type { EnterMotion } from "../tokens/vocabulary";

const p = (rule: Record<string, unknown>) => ({ "@layer": { [primitives]: rule } });
const riseFrom = (distance: number) => keyframes({ from: { opacity: 0, transform: `translateY(${distance}px)` }, to: { opacity: 1, transform: "none" } });

/** keyframes 이름 — 셀렉터 안에 걸어야 하는 쪽(모달의 `&[open]` · 뒤 막)이 씁니다 */
export const enterKeyframes = {
  rise: riseFrom(ENTER.rise.distance),
  pop: riseFrom(ENTER.pop.distance),
  // 제자리 — transform 을 건드리지 않아, 커져 있거나 옮겨진 요소에도 그대로 겁니다
  fade: keyframes({ from: { opacity: 0 }, to: { opacity: 1 } }),
};

/** `animation` 값 — 토큰의 시간과 곡선을 붙였습니다 */
export const ENTER_ANIMATION = {
  rise: `${enterKeyframes.rise} ${vars.duration[ENTER.rise.duration]} ${vars.easing.out}`,
  pop: `${enterKeyframes.pop} ${vars.duration[ENTER.pop.duration]} ${vars.easing.out}`,
  fade: `${enterKeyframes.fade} ${vars.duration[ENTER.fade.duration]} ${vars.easing.out}`,
};

export const enterClass = styleVariants({
  none: p({}),
  rise: p({ animation: ENTER_ANIMATION.rise }),
  pop: p({ animation: ENTER_ANIMATION.pop }),
  fade: p({ animation: ENTER_ANIMATION.fade }),
} satisfies Record<EnterMotion, object>);
