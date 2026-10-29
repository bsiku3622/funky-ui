import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { accentClass } from "../styles/accent.css";
import { paddingClass, paddingXClass, paddingYClass } from "../styles/space.css";
import { borderClass, shadowClass, surfaceClass } from "../styles/surface.css";
import { resolveAccent, type Accent, type Border, type Shadow, type Space, type Surface } from "../tokens/vocabulary";

export interface BoxOwnProps {
  /** 이 요소와 그 안에 흐를 accent. 안쪽 컨트롤이 accent 를 따로 주지 않으면 이 색을 씁니다 */
  accent?: Accent;
  /** 면 — `solid` · `soft` 는 지금 accent 로 칠합니다 */
  surface?: Surface;
  /** 2px 테두리의 색 */
  border?: Border;
  shadow?: Shadow;
  padding?: Space;
  paddingX?: Space;
  paddingY?: Space;
  className?: string;
}

export type BoxProps<E extends ElementType = "div"> = PolyProps<E, BoxOwnProps>;

/** Box 의 prop 을 class 로 — Stack · Inline · Grid 와 molecule 이 같은 지도를 씁니다 */
export function boxClass({ accent, surface, border, shadow, padding, paddingX, paddingY, className }: BoxOwnProps): string {
  return cx(
    accent && accentClass[resolveAccent(accent)],
    surface && surfaceClass[surface],
    border && borderClass[border],
    shadow && shadowClass[shadow],
    padding && paddingClass[padding],
    paddingX && paddingXClass[paddingX],
    paddingY && paddingYClass[paddingY],
    className,
  );
}

/** 모든 면의 바탕 — 면 · 테두리 · 그림자 · 여백 · accent 를 prop 으로 고릅니다 */
export function Box<E extends ElementType = "div">({
  as,
  accent,
  surface,
  border,
  shadow,
  padding,
  paddingX,
  paddingY,
  className,
  ...rest
}: BoxProps<E>) {
  const Comp: ElementType = as ?? "div";
  return <Comp className={boxClass({ accent, surface, border, shadow, padding, paddingX, paddingY, className }) || undefined} {...rest} />;
}
