/**
 * 입력 칸 — Input · Textarea · Select 가 같은 면을 씁니다.
 *
 * 흰 면 · 2px 검정 · 700 글자. 값은 읽는 내용이라 버튼처럼 900 대문자가 아닙니다. Select 만 900 입니다 —
 * 고른 값이 곧 컨트롤의 이름이라 버튼처럼 읽힙니다.
 * 포커스는 전역 핑크 링이 맡고, 틀린 값은 빨간 테두리로 표시합니다.
 */
import { style, styleVariants } from "@vanilla-extract/css";

import { ACCENT_COLORS } from "../tokens/color";
import { components } from "../tokens/layers.css";
import { CONTROL } from "../tokens/shape";
import { INPUT_TEXT, WEIGHT, px } from "../tokens/typography";
import { vars } from "../tokens/variables";
import type { ControlSize } from "../tokens/vocabulary";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const field = style(
  c({
    display: "block",
    width: "100%",
    minWidth: 0,
    margin: 0,
    backgroundColor: vars.surface.raised,
    color: vars.ink.primary,
    border: `${vars.stroke.base} solid ${vars.line.base}`,
    borderRadius: 0,
    fontFamily: vars.font.sans,
    fontWeight: WEIGHT.bold,
    transitionProperty: "border-color, box-shadow",
    transitionDuration: vars.duration.fast,
    "::placeholder": { color: vars.ink.faint, opacity: 1 },
    selectors: {
      "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
      "&[aria-invalid='true']": { borderColor: ACCENT_COLORS.red.solid },
      // ⚠️ `:read-only` 가 아니라 속성으로 겁니다 — `<select>` 는 명세상 늘 `:read-only` 라 항상 회색이 됩니다
      "&[readonly]": { backgroundColor: vars.surface.well },
    },
  }),
);

export const fieldSize = styleVariants(CONTROL.height, (h, size) =>
  c({ height: px(h), paddingInline: px(CONTROL.inset[size as ControlSize] - 2), fontSize: px(INPUT_TEXT[size as ControlSize]) }),
);

export const fieldShadow = style(c({ boxShadow: vars.shadow.raised }));

export const textarea = style(c({ height: "auto", resize: "vertical", lineHeight: px(20) }));
export const textareaSize = styleVariants(CONTROL.height, (_, size) =>
  c({ paddingBlock: px(CONTROL.gap[size as ControlSize]), paddingInline: px(CONTROL.inset[size as ControlSize] - 2), fontSize: px(INPUT_TEXT[size as ControlSize]) }),
);

/** Select — native select 를 감싼 상자. 화살표는 장식이라 누름을 select 로 흘려보냅니다 */
export const selectWrap = style(c({ position: "relative", display: "block", width: "100%", minWidth: 0 }));
export const select = style(c({ appearance: "none", cursor: "pointer", fontWeight: WEIGHT.black }));
export const selectPad = styleVariants(CONTROL.height, (_, size) => c({ paddingRight: px(CONTROL.inset[size as ControlSize] + CONTROL.icon[size as ControlSize]) }));
export const selectArrow = style(
  c({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: vars.ink.primary,
  }),
);
export const selectArrowPos = styleVariants(CONTROL.height, (_, size) => c({ right: px(CONTROL.inset[size as ControlSize] - 4) }));
