import type { ElementType, ReactNode } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { glassClass } from "../primitives/Glass";
import { Icon, type IconComponent } from "../primitives/Icon";
import { Pressable } from "../primitives/Pressable";
import { CONTROL } from "../tokens/shape";
import { buttonBase, buttonSize, squareSize } from "./Button.css";

export interface NavButtonOwnProps {
  icon?: IconComponent;
  iconEnd?: IconComponent;
  /** 아이콘만 있을 때 스크린 리더가 읽을 이름 */
  label?: string;
  selected?: boolean;
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export type NavButtonProps<E extends ElementType = "button"> = PolyProps<E, NavButtonOwnProps>;

const PressableRoot = Pressable as ElementType;

/**
 * 색 바 위의 버튼 — Pressable(tap)에 Glass(유리 칠)를 얹은 것: 반투명 유리 면 · 진한 글자 · 반투명 테두리, hover 때 테두리가 진해집니다.
 * 글자와 유리는 바의 글자색에서 나옵니다. 상단 바 · 하단 바 · 학기 선택에만 씁니다 — 흰 면 · 크림
 * 위에서는 Button.
 */
export function NavButton<E extends ElementType = "button">({
  as,
  icon,
  iconEnd,
  label,
  selected,
  size = "sm",
  disabled,
  className,
  children,
  ...rest
}: NavButtonProps<E>) {
  const iconOnly = !children && !!icon;
  return (
    <PressableRoot
      as={as}
      motion="tap"
      disabled={disabled}
      aria-label={iconOnly ? label : undefined}
      aria-pressed={selected === undefined ? undefined : selected}
      className={cx(buttonBase, buttonSize[size], iconOnly && squareSize[size], glassClass({ selected: Boolean(selected), hoverable: true }), className)}
      {...rest}
    >
      {icon && <Icon icon={icon} size={CONTROL.icon[size]} />}
      {children}
      {iconEnd && <Icon icon={iconEnd} size={CONTROL.icon[size]} />}
    </PressableRoot>
  );
}
