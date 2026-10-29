import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import type { PressMotion } from "../tokens/vocabulary";
import { boxClass, type BoxOwnProps } from "./Box";
import { motionClass, pressBase, pressedClass } from "./Pressable.css";

export interface PressableOwnProps extends BoxOwnProps {
  /**
   * 몸짓 (기본 `none` — 누르지만 움직이지 않음). `sink` 는 그림자 위에서 가라앉고, `raise` 는 평평하다가 hover 때
   * 그림자가 올라오고, `lift` 는 떠오르고, `tap` 은 누르는 순간만 작아집니다. sink · raise · lift 는 그림자를 같이 가집니다
   */
  motion?: PressMotion;
  /** sink 몸짓이 눌린 채로 머뭅니다 — 모양만 바꾸고, aria 속성은 쓰는 쪽이 붙입니다 */
  pressed?: boolean;
  disabled?: boolean;
}

export type PressableProps<E extends ElementType = "button"> = PolyProps<E, PressableOwnProps>;

/** Pressable 의 prop 을 class 로 */
export function pressClass({ motion = "none", pressed = false, ...box }: Omit<PressableOwnProps, "disabled">): string {
  return cx(pressBase, motionClass[motion], motion === "sink" && pressed && pressedClass, boxClass(box));
}

/**
 * 누르는 물건 — 2차 primitive (Box + 누름). '눌린다' 는 사실과 그 몸짓을 맡습니다: 버튼의 의미(`type` ·
 * `disabled` · `aria-disabled`) · 커서 · 꺼진 모양 · 움직임. 색은 하나도 없습니다 — hover 색까지 칠의
 * `hoverable` 이고, Pressable 이 그걸 켜 주지 않습니다. 칠은 `paintClass()` · `surfaceClass()` · `glassClass()` 로
 * 얹거나, 칠에 `as={Pressable}` 을 줍니다 — Button 은 Pressable + Paint, 누르는 카드는 Pressable + Surface 입니다.
 * 기본은 `<button type="button">`, 링크면 `as="a"` 나 라우터 링크.
 *
 * ```tsx
 * <Paint as={Pressable} motion="sink" accent="cyan" variant="tonal" hoverable>Preview</Paint>
 * ```
 */
export function Pressable<E extends ElementType = "button">({
  as,
  motion,
  pressed,
  disabled,
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
      className={pressClass({ motion, pressed, padding, paddingX, paddingY, className })}
      {...rest}
    />
  );
}
