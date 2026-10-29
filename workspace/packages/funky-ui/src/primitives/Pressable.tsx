import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import type { PressMotion } from "../tokens/vocabulary";
import { boxClass, type BoxOwnProps } from "./Box";
import { motionClass, pressBase, pressedClass } from "./Pressable.css";

export interface PressableOwnProps extends BoxOwnProps {
  /** 가라앉거나(press) · 떠오르거나(lift) · 누르는 순간만 작아집니다(tap). press · lift 는 그림자를 같이 가집니다 */
  motion?: PressMotion;
  /** press 몸짓이 눌린 채로 머뭅니다 — 모양만 바꾸고, aria 속성은 쓰는 쪽이 붙입니다 */
  pressed?: boolean;
  disabled?: boolean;
}

export type PressableProps<E extends ElementType = "button"> = PolyProps<E, PressableOwnProps>;

/** Pressable 의 prop 을 class 로 */
export function pressClass({ motion = "press", pressed = false, ...box }: Omit<PressableOwnProps, "disabled">): string {
  return cx(pressBase, motionClass[motion], motion === "press" && pressed && pressedClass, boxClass(box));
}

/**
 * 누르는 물건 — 2차 primitive (Box + 누름). '눌린다' 는 사실과 그 몸짓을 맡습니다: 버튼의 의미(`type` ·
 * `disabled` · `aria-disabled`) · 커서 · 꺼진 모양 · 움직임. 색은 하나도 없습니다 — hover 색까지 Paint 의
 * `hoverable` 이고, Pressable 이 그걸 켜 주지 않습니다. 색은 `paintClass()`, 흑백 면은 `surfaceClass()` 로
 * 얹습니다 — Button 은 Pressable + Paint, 누르는 카드는 Pressable + Surface 입니다.
 * 기본은 `<button type="button">`, 링크면 `as="a"` 나 라우터 링크.
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
