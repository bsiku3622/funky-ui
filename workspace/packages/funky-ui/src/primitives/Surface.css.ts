/**
 * Surface 의 칠 — 흑백 면 · 테두리 · 그림자 (fk.primitives).
 *
 * 면은 글자색도 정합니다: 흰 · 크림 면은 바깥 글자색을 그대로 물려받고(`<a>` 로 그려도 파란 링크색이
 * 남지 않습니다), 어두운 면(`inverse`)은 흰 글자로 바꿔 검정 위 검정 글자가 생기지 않습니다.
 */
import { styleVariants } from "@vanilla-extract/css";

import { primitives } from "../tokens/layers.css";
import { vars } from "../tokens/variables";
import type { Border, Shadow, SurfaceFill } from "../tokens/vocabulary";

const p = (rule: Record<string, unknown>) => ({ "@layer": { [primitives]: rule } });

export const fillClass = styleVariants({
  canvas: p({ backgroundColor: vars.surface.canvas, color: "inherit" }),
  raised: p({ backgroundColor: vars.surface.raised, color: "inherit" }),
  sunken: p({ backgroundColor: vars.surface.sunken, color: "inherit" }),
  well: p({ backgroundColor: vars.surface.well, color: "inherit" }),
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
