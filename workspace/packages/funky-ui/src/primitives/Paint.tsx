import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { accentClass } from "../styles/accent.css";
import { variantClass } from "../styles/variant.css";
import { BORDERLESS_VARIANTS, SELECTED_VARIANT } from "../tokens/color-recipes";
import { resolveAccent, type Accent, type Variant } from "../tokens/vocabulary";
import { boxClass, type BoxOwnProps } from "./Box";
import { interactive as interactiveClass, paintBase, raised, raisedStatic, sunk } from "./Paint.css";

export interface PaintOwnProps extends BoxOwnProps {
  /** 색 — 주지 않으면 바깥 accent 를 따르고, 바깥에도 없으면 검정(시스템)입니다 */
  accent?: Accent;
  /** 칠하는 방식 (기본 `outline`) — 11 가지 레시피는 docs/foundations/color.md */
  variant?: Variant;
  /** 골라진 상태 — 같은 accent 의 solid 로 칠합니다. aria 속성(pressed · checked · selected)은 쓰는 쪽이 붙입니다 */
  selected?: boolean;
  /** 누를 수 있는 요소 — hover · press 층, disabled 모양, 손가락 커서 */
  interactive?: boolean;
  /** 4px 그림자. `interactive` 면 hover 때 그림자 속으로 가라앉고, 골라지면 눌린 채로 있습니다 */
  shadow?: boolean;
}

export type PaintProps<E extends ElementType = "div"> = PolyProps<E, PaintOwnProps>;

/** Paint 의 prop 을 class 로 — 같은 조립을 다른 요소에 얹을 때 씁니다 */
export function paintClass({
  accent,
  variant = "outline",
  selected = false,
  interactive = false,
  shadow = false,
  padding,
  paddingX,
  paddingY,
  className,
}: PaintOwnProps): string {
  const painted: Variant = selected ? SELECTED_VARIANT : variant;
  // 테두리가 없는 variant(ghost)는 가라앉을 상자가 없어 그림자를 받지 않습니다
  const lifted = shadow && !BORDERLESS_VARIANTS.includes(painted);
  return cx(
    accent && accentClass[resolveAccent(accent)],
    variantClass[painted],
    paintBase,
    interactive && interactiveClass,
    lifted && (interactive ? raised : raisedStatic),
    lifted && interactive && selected && sunk,
    boxClass({ padding, paddingX, paddingY, className }),
  );
}

/**
 * 요소의 칠 — accent(색) × variant(칠하는 방식). Variant 시스템을 그대로 쓰는 primitive 입니다.
 * Button · IconButton · Badge · Notice · 바(AppBar · 머리 막대)가 이 위에 섭니다. 흑백 박스는 `Surface`.
 *
 * ```tsx
 * <Paint accent="green" variant="plain" padding="md">유지 중인 과목</Paint>
 * <Paint as="button" accent="cyan" variant="tonal" interactive shadow>Preview</Paint>
 * ```
 */
export function Paint<E extends ElementType = "div">({
  as,
  accent,
  variant,
  selected,
  interactive,
  shadow,
  padding,
  paddingX,
  paddingY,
  className,
  ...rest
}: PaintProps<E>) {
  const Comp: ElementType = as ?? "div";
  return (
    <Comp
      className={paintClass({ accent, variant, selected, interactive, shadow, padding, paddingX, paddingY, className })}
      {...rest}
    />
  );
}
