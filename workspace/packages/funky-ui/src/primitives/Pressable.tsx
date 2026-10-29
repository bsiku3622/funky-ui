import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import type { PressMotion } from "../tokens/vocabulary";
import { boxClass, type BoxOwnProps } from "./Box";
import { motionClass, pressableBase } from "./Pressable.css";

export interface PressableOwnProps extends Omit<BoxOwnProps, "shadow"> {
  /** 가라앉거나(press) 떠오릅니다(lift). 그림자는 이 몸짓의 일부라 따로 고르지 않습니다 */
  motion?: PressMotion;
  disabled?: boolean;
}

export type PressableProps<E extends ElementType = "button"> = PolyProps<E, PressableOwnProps>;

/** 누르는 면 — 기본은 `<button type="button">` 입니다. 링크면 `as="a"` */
export function Pressable<E extends ElementType = "button">({
  as,
  motion = "press",
  disabled,
  className,
  accent,
  surface,
  border,
  padding,
  paddingX,
  paddingY,
  ...rest
}: PressableProps<E>) {
  const Comp: ElementType = as ?? "button";
  const isButton = Comp === "button";
  return (
    <Comp
      type={isButton ? "button" : undefined}
      disabled={isButton ? disabled : undefined}
      aria-disabled={!isButton && disabled ? true : undefined}
      className={cx(pressableBase, motionClass[motion], boxClass({ accent, surface, border, padding, paddingX, paddingY }), className)}
      {...rest}
    />
  );
}
