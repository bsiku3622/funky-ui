import type { ElementType, ReactNode, SyntheticEvent } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { Icon, type IconComponent } from "../primitives/Icon";
import { Paint } from "../primitives/Paint";
import { CONTROL } from "../tokens/shape";
import type { Accent, ControlSize, Variant } from "../tokens/vocabulary";
import { buttonBase, buttonSize, fullWidth as fullWidthClass, loading as loadingClass, loadingSpinner } from "./Button.css";
import { Spinner } from "./Spinner";

export interface ButtonOwnProps {
  /** 색 — 주지 않으면 바깥 accent 를 따르고, 바깥에도 없으면 검정(시스템)입니다 */
  accent?: Accent;
  /** 칠하는 방식 (기본 `outline`) — 11 가지 레시피는 docs/foundations/color.md */
  variant?: Variant;
  size?: ControlSize;
  /** 4px 그림자 위에 띄웁니다. hover 때 그림자 속으로 가라앉습니다 */
  shadow?: boolean;
  /** 골라진 상태 — 같은 accent 의 solid 로 바뀌고 `aria-pressed` 가 붙습니다 */
  selected?: boolean;
  loading?: boolean;
  /** 앞 아이콘 — 크기와 굵기는 버튼 크기가 정합니다 */
  icon?: IconComponent;
  /** 뒤 아이콘 */
  iconEnd?: IconComponent;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export type ButtonProps<E extends ElementType = "button"> = PolyProps<E, ButtonOwnProps>;

const swallow = (e: SyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

// Paint 는 polymorphic 이라, 위에서 받은 `as` 를 그대로 흘려보내려고 한 번 넓힙니다
const PaintRoot = Paint as ElementType;

/**
 * 버튼 — `Paint`(accent × variant · selected · 눌림) 위에 크기 · 아이콘 · 불러오기를 얹은 것입니다.
 *
 * ```tsx
 * <Button accent="green" variant="outline">유지</Button>
 * <Button variant="muted" selected={on}>전체</Button>
 * <Button as={Link} to="/trade" accent="cyan" variant="tonal" shadow iconEnd={ArrowRight}>Trade</Button>
 * ```
 */
export function Button<E extends ElementType = "button">({
  as,
  accent,
  variant = "outline",
  size = "md",
  shadow = false,
  selected,
  loading = false,
  icon,
  iconEnd,
  fullWidth = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps<E>) {
  const Comp: ElementType = as ?? "button";
  const isButton = Comp === "button";
  const iconSize = CONTROL.icon[size];
  return (
    <PaintRoot
      as={Comp}
      accent={accent}
      variant={variant}
      selected={selected}
      shadow={shadow}
      interactive
      type={isButton ? "button" : undefined}
      disabled={isButton ? disabled : undefined}
      aria-disabled={(!isButton && disabled) || loading ? true : undefined}
      aria-pressed={selected === undefined ? undefined : selected}
      aria-busy={loading || undefined}
      // 불러오는 동안은 누름을 삼킵니다 — 포인터만 막으면 Enter · Space 가 onClick 에 닿습니다.
      // disabled 를 쓰지 않는 이유는 꺼진 모양(opacity)이 아니라 스피너를 보여야 해서입니다.
      onClickCapture={loading ? swallow : undefined}
      className={cx(buttonBase, buttonSize[size], fullWidth && fullWidthClass, loading && loadingClass, className)}
      {...rest}
    >
      {icon && <Icon icon={icon} size={iconSize} />}
      {children}
      {iconEnd && <Icon icon={iconEnd} size={iconSize} />}
      {loading && (
        <span className={loadingSpinner}>
          <Spinner size={size === "lg" ? "md" : "sm"} label="불러오는 중" />
        </span>
      )}
    </PaintRoot>
  );
}
