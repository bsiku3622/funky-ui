import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { Icon, type IconComponent } from "../primitives/Icon";
import { paintClass } from "../primitives/Paint";
import { Pressable } from "../primitives/Pressable";
import { CONTROL } from "../tokens/shape";
import type { Accent, ControlSize, Variant } from "../tokens/vocabulary";
import { buttonBase, buttonSize, squareSize } from "./Button.css";
import { pressOf } from "./Button";

export interface IconButtonOwnProps {
  icon: IconComponent;
  /** 스크린 리더가 읽을 이름 — 글자가 없는 버튼이라 반드시 줍니다 */
  label: string;
  accent?: Accent;
  /** 기본 `ghostMuted` — 닫기 · 새로고침처럼 옆 내용을 방해하지 않는 자리가 가장 많습니다 */
  variant?: Variant;
  size?: ControlSize;
  /** Button 과 같습니다 — `true` 면 sink, `"hover"` 면 raise */
  shadow?: boolean | "hover";
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

export type IconButtonProps<E extends ElementType = "button"> = PolyProps<E, IconButtonOwnProps>;

const PressableRoot = Pressable as ElementType;

/** 아이콘 하나짜리 정사각 버튼 — Button 과 같이 Pressable + Paint 입니다 */
export function IconButton<E extends ElementType = "button">({
  as,
  icon,
  label,
  accent,
  variant = "ghostMuted",
  size = "md",
  shadow = false,
  selected,
  disabled,
  className,
  ...rest
}: IconButtonProps<E>) {
  return (
    <PressableRoot
      as={as}
      {...pressOf(variant, shadow, selected)}
      disabled={disabled}
      aria-label={label}
      title={label}
      aria-pressed={selected === undefined ? undefined : selected}
      className={cx(paintClass({ accent, variant, selected, hoverable: true }), buttonBase, buttonSize[size], squareSize[size], className)}
      {...rest}
    >
      <Icon icon={icon} size={CONTROL.icon[size]} />
    </PressableRoot>
  );
}
