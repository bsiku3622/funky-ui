/**
 * Surface 의 칠 — 흑백 면 · 테두리 · 그림자 (fk.primitives).
 *
 * 어두운 면(`inverse`)은 글자색도 같이 바꿉니다 — 면을 고르면 그 위 잉크가 따라와야 검정 위 검정
 * 글자가 생기지 않습니다.
 */
import { styleVariants } from "@vanilla-extract/css";

import { primitives } from "../tokens/layers.css";
import { vars } from "../tokens/variables";
import type { Border, Shadow, SurfaceFill } from "../tokens/vocabulary";

const p = (rule: Record<string, unknown>) => ({ "@layer": { [primitives]: rule } });

export const fillClass = styleVariants({
  canvas: p({ backgroundColor: vars.surface.canvas }),
  raised: p({ backgroundColor: vars.surface.raised }),
  sunken: p({ backgroundColor: vars.surface.sunken }),
  well: p({ backgroundColor: vars.surface.well }),
  inverse: p({ backgroundColor: vars.surface.inverse, color: vars.ink.inverse }),
} satisfies Record<SurfaceFill, object>);

export const borderClass = styleVariants({
  none: p({}),
  line: p({ border: `${vars.stroke.base} solid ${vars.line.base}` }),
  soft: p({ border: `${vars.stroke.base} solid ${vars.line.soft}` }),
  subtle: p({ border: `${vars.stroke.base} solid ${vars.line.subtle}` }),
} satisfies Record<Border, object>);

export const shadowClass = styleVariants({
  none: p({}),
  raised: p({ boxShadow: vars.shadow.raised }),
  floating: p({ boxShadow: vars.shadow.floating }),
} satisfies Record<Shadow, object>);
