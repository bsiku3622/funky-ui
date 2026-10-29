import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import type { Border, Shadow, SurfaceFill } from "../tokens/vocabulary";
import { boxClass, type BoxOwnProps } from "./Box";
import { borderClass, fillClass, shadowClass } from "./Surface.css";

export interface SurfaceOwnProps extends BoxOwnProps {
  /** 흑백 면 (기본 `raised` — 흰 면) */
  fill?: SurfaceFill;
  /** 2px 테두리의 색 (기본 없음) */
  border?: Border;
  /** 깊이 — 떠 있는 물건은 `raised`(4px), 모달만 `floating`(8px) */
  shadow?: Shadow;
}

export type SurfaceProps<E extends ElementType = "div"> = PolyProps<E, SurfaceOwnProps>;

/** Surface 의 prop 을 class 로 — 누르는 카드처럼 다른 primitive 위에 면만 빌려 올 때 씁니다 */
export function surfaceClass({ fill = "raised", border = "none", shadow = "none", ...box }: SurfaceOwnProps): string {
  return cx(fillClass[fill], border !== "none" && borderClass[border], shadow !== "none" && shadowClass[shadow], boxClass(box));
}

/**
 * 박스의 면 — 2차 primitive (Box + 칠). 흑백 면 · 테두리 · 그림자를 고르고, 카드 · 패널 · 모달 · 판처럼
 * **무언가를 담는 박스**에 씁니다. 흑백만 칠하고 accent 를 모릅니다 — 색이 있는 것은 `Paint` 입니다.
 *
 * ```tsx
 * <Surface border="line" shadow="raised" padding="3xl">…</Surface>
 * <Surface fill="well" padding="lg">…</Surface>
 * ```
 */
export function Surface<E extends ElementType = "div">({ as, fill, border, shadow, padding, paddingX, paddingY, className, ...rest }: SurfaceProps<E>) {
  const Comp: ElementType = as ?? "div";
  return <Comp className={surfaceClass({ fill, border, shadow, padding, paddingX, paddingY, className })} {...rest} />;
}
