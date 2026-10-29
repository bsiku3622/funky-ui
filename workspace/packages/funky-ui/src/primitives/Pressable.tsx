import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import type { PressMotion } from "../tokens/vocabulary";
import { boxClass, type BoxOwnProps } from "./Box";
import { motionClass, pressableBase } from "./Pressable.css";

export interface PressableOwnProps extends BoxOwnProps {
  /** 가라앉거나(press) 떠오릅니다(lift). 그림자는 이 몸짓의 일부라 따로 고르지 않습니다 */
  motion?: PressMotion;
  disabled?: boolean;
}

export type PressableProps<E extends ElementType = "button"> = PolyProps<E, PressableOwnProps>;

/**
 * 누르는 면 — 큰 면(카드)에 눌림 · 떠오름 몸짓을 줍니다. 칠은 하지 않습니다: 면과 테두리는
 * `surfaceClass()` 로 빌려 옵니다 (`Card motion` 이 그렇게 조립합니다). 기본은 `<button type="button">`,
 * 링크면 `as="a"` 나 라우터 링크.
 */
export function Pressable<E extends ElementType = "button">({
  as,
  motion = "press",
  disabled,
  accent,
  padding,
  paddingX,
  paddingY,
  className,
  ...rest
}: PressableProps<E>) {
  const Comp: ElementType = as ?? "button";
  const isButton = Comp === "button";
  return (
    <Comp
      type={isButton ? "button" : undefined}
      disabled={isButton ? disabled : undefined}
      aria-disabled={!isButton && disabled ? true : undefined}
      className={cx(pressableBase, motionClass[motion], boxClass({ accent, padding, paddingX, paddingY, className }))}
      {...rest}
    />
  );
}
