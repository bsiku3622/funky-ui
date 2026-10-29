import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { accentClass } from "../styles/accent.css";
import { variantClass } from "../styles/variant.css";
import { SELECTED_VARIANT } from "../tokens/color-recipes";
import { resolveAccent, type Accent, type Variant } from "../tokens/vocabulary";
import { boxClass, type BoxOwnProps } from "./Box";
import { interactive as interactiveClass, paintBase } from "./Paint.css";

export interface PaintOwnProps extends BoxOwnProps {
  /**
   * 색 — primitive 중 accent 를 갖는 것은 Paint 뿐입니다. 이 요소에 칠해지고, 안쪽 요소가 accent 를 따로 주지 않으면
   * 그 색으로 흐릅니다. 주지 않으면 바깥 Paint 의 색, 바깥에도 없으면 검정(시스템)입니다.
   */
  accent?: Accent;
  /** 칠하는 방식 (기본 `outline`) — 11 가지 레시피는 docs/foundations/color.md */
  variant?: Variant;
  /** 골라진 상태 — 같은 accent 의 solid 로 칠합니다. aria 속성(pressed · checked · selected)은 쓰는 쪽이 붙입니다 */
  selected?: boolean;
  /** 누르는 요소 — variant 표의 Hover 칸대로 hover · press 때 색이 바뀝니다. 몸짓은 Pressable 이 더합니다 */
  interactive?: boolean;
}

export type PaintProps<E extends ElementType = "div"> = PolyProps<E, PaintOwnProps>;

/** Paint 의 prop 을 class 로 — 다른 primitive(Pressable)에 색을 얹을 때 씁니다 */
export function paintClass({ accent, variant = "outline", selected = false, interactive = false, ...box }: PaintOwnProps): string {
  const painted: Variant = selected ? SELECTED_VARIANT : variant;
  return cx(accent && accentClass[resolveAccent(accent)], variantClass[painted], paintBase, interactive && interactiveClass, boxClass(box));
}

/**
 * 요소의 칠 — 2차 primitive (Box + 칠). accent(색) × variant(칠하는 방식)으로 글자 · 면 · 테두리를
 * 칠합니다. Variant 시스템을 그대로 쓰는 primitive 라 Badge · Notice · 바(AppBar · 머리 막대)가 이 위에
 * 서고, Button 은 Pressable(몸짓)에 이 칠을 얹은 것입니다. 흑백 박스는 `Surface`.
 *
 * ```tsx
 * <Paint accent="green" variant="plain" padding="md">유지 중인 과목</Paint>
 * <Pressable motion="press" className={paintClass({ accent: "cyan", variant: "tonal", interactive: true })}>Preview</Pressable>
 * ```
 */
export function Paint<E extends ElementType = "div">({
  as,
  accent,
  variant,
  selected,
  interactive,
  padding,
  paddingX,
  paddingY,
  className,
  ...rest
}: PaintProps<E>) {
  const Comp: ElementType = as ?? "div";
  return <Comp className={paintClass({ accent, variant, selected, interactive, padding, paddingX, paddingY, className })} {...rest} />;
}
