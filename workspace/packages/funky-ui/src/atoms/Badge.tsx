import type { ElementType, ReactNode } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { Icon, type IconComponent } from "../primitives/Icon";
import { accentClass } from "../styles/accent.css";
import { paint } from "../styles/control.css";
import { variantClass } from "../styles/variant.css";
import { BADGE } from "../tokens/shape";
import { resolveAccent, type Accent, type BadgeSize, type Variant } from "../tokens/vocabulary";
import { badgeBase, badgeSize } from "./Badge.css";

export interface BadgeOwnProps {
  accent?: Accent;
  /** 기본 `outline`. Button 과 같은 11 가지 규칙이고, 읽는 물건이라 hover 에 반응하지 않습니다 */
  variant?: Variant;
  size?: BadgeSize;
  icon?: IconComponent;
  className?: string;
  children?: ReactNode;
}

export type BadgeProps<E extends ElementType = "span"> = PolyProps<E, BadgeOwnProps>;

/** 상태 · 개수 · 분류를 적는 작은 라벨 */
export function Badge<E extends ElementType = "span">({
  as,
  accent,
  variant = "outline",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: BadgeProps<E>) {
  const Comp: ElementType = as ?? "span";
  return (
    <Comp
      className={cx(badgeBase, badgeSize[size], accent && accentClass[resolveAccent(accent)], variantClass[variant], paint, className)}
      {...rest}
    >
      {icon && <Icon icon={icon} size={BADGE.icon[size]} />}
      {children}
    </Comp>
  );
}
