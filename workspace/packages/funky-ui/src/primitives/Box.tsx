import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { accentClass } from "../styles/accent.css";
import { paddingClass, paddingXClass, paddingYClass } from "../styles/space.css";
import { resolveAccent, type Accent, type Space } from "../tokens/vocabulary";

export interface BoxOwnProps {
  /** 이 요소 안에 흐를 accent — 칠하지 않고 문맥만 정합니다. 안쪽 요소가 accent 를 따로 주지 않으면 이 색입니다 */
  accent?: Accent;
  padding?: Space;
  paddingX?: Space;
  paddingY?: Space;
  className?: string;
}

export type BoxProps<E extends ElementType = "div"> = PolyProps<E, BoxOwnProps>;

/** Box 의 prop 을 class 로 — 다른 primitive 가 같은 지도를 씁니다 */
export function boxClass({ accent, padding, paddingX, paddingY, className }: BoxOwnProps): string {
  return cx(
    accent && accentClass[resolveAccent(accent)],
    padding && paddingClass[padding],
    paddingX && paddingXClass[paddingX],
    paddingY && paddingYClass[paddingY],
    className,
  );
}

/**
 * 배치의 바탕 — 태그(`as`) · 여백 · accent 문맥만 다룹니다. 칠하지 않습니다.
 * 흑백 박스를 칠하려면 `Surface`, accent 로 요소를 칠하려면 `Paint`.
 */
export function Box<E extends ElementType = "div">({ as, accent, padding, paddingX, paddingY, className, ...rest }: BoxProps<E>) {
  const Comp: ElementType = as ?? "div";
  return <Comp className={boxClass({ accent, padding, paddingX, paddingY, className }) || undefined} {...rest} />;
}
