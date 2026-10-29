/**
 * 면 · 테두리 · 그림자 지도 — Box 가 prop 으로 고르는 class 입니다 (fk.utilities).
 *
 * 어두운 면(`inverse` · 검정/보라의 `solid`)은 글자색도 같이 바꿉니다 — 면을 고르면 그 위
 * 잉크가 따라와야 검정 위 검정 글자가 생기지 않습니다.
 */
import { styleVariants } from "@vanilla-extract/css";

import { utilities } from "../tokens/layers.css";
import { vars } from "../tokens/variables";
import type { Border, Shadow, Surface } from "../tokens/vocabulary";

const u = (rule: Record<string, unknown>) => ({ "@layer": { [utilities]: rule } });

export const surfaceClass = styleVariants({
  canvas: u({ backgroundColor: vars.surface.canvas }),
  raised: u({ backgroundColor: vars.surface.raised }),
  sunken: u({ backgroundColor: vars.surface.sunken }),
  well: u({ backgroundColor: vars.surface.well }),
  inverse: u({ backgroundColor: vars.surface.inverse, color: vars.ink.inverse }),
  solid: u({ backgroundColor: vars.accent.solid, color: vars.accent.ink }),
  soft: u({ backgroundColor: vars.accent.soft }),
} satisfies Record<Surface, object>);

export const borderClass = styleVariants({
  none: u({}),
  line: u({ border: `${vars.stroke.base} solid ${vars.line.base}` }),
  soft: u({ border: `${vars.stroke.base} solid ${vars.line.soft}` }),
  subtle: u({ border: `${vars.stroke.base} solid ${vars.line.subtle}` }),
  accent: u({ border: `${vars.stroke.base} solid ${vars.accent.solid}` }),
} satisfies Record<Border, object>);

export const shadowClass = styleVariants({
  none: u({}),
  raised: u({ boxShadow: vars.shadow.raised }),
  floating: u({ boxShadow: vars.shadow.floating }),
} satisfies Record<Shadow, object>);
