import type { ElementType, ReactNode, SyntheticEvent } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { Icon, type IconComponent } from "../primitives/Icon";
import { paintClass } from "../primitives/Paint";
import { Pressable } from "../primitives/Pressable";
import { BORDERLESS_VARIANTS, SELECTED_VARIANT } from "../tokens/color-recipes";
import { CONTROL } from "../tokens/shape";
import type { Accent, ControlSize, PressMotion, Variant } from "../tokens/vocabulary";
import { buttonBase, buttonSize, fullWidth as fullWidthClass, loading as loadingClass, loadingSpinner } from "./Button.css";
import { Spinner } from "./Spinner";

export interface ButtonOwnProps {
  /** 색 — 주지 않으면 바깥 Paint 의 색을 따르고, 바깥에도 없으면 검정(시스템)입니다 */
  accent?: Accent;
  /** 칠하는 방식 (기본 `outline`) — 11 가지 레시피는 docs/foundations/color.md */
  variant?: Variant;
  size?: ControlSize;
  /**
   * 4px 그림자. `true` 면 그림자 위에 떠 있다가 hover 때 가라앉고(sink), `"hover"` 면 평평하다가 hover 때
   * 그림자가 올라옵니다(raise). 테두리가 없는 variant(ghost)는 그림자를 받지 않습니다
   */
  shadow?: boolean | "hover";
  /** 골라진 상태 — 같은 accent 의 solid 로 바뀌고 `aria-pressed` 가 붙습니다. 그림자를 켰으면 눌린 채로 있습니다 */
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

// Pressable 은 polymorphic 이라, 위에서 받은 `as` 를 그대로 흘려보내려고 한 번 넓힙니다
const PressableRoot = Pressable as ElementType;

/**
 * 그림자 · 골라짐에서 몸짓을 고릅니다 — 그림자를 켜면 sink(가라앉음), `"hover"` 면 raise(올라옴), 끄면 tap.
 * 테두리가 없는 variant(ghost)는 가라앉을 상자가 없어 그림자를 받지 않습니다. IconButton · SideNav.Item 이 같은 규칙을 씁니다.
 */
export function pressOf(variant: Variant, shadow: boolean | "hover", selected: boolean | undefined): { motion: PressMotion; pressed: boolean } {
  const painted: Variant = selected ? SELECTED_VARIANT : variant;
  if (!shadow || BORDERLESS_VARIANTS.includes(painted)) return { motion: "tap", pressed: false };
  if (shadow === "hover") return { motion: "raise", pressed: false };
  return { motion: "sink", pressed: Boolean(selected) };
}

/**
 * 버튼 — Pressable(누름) + Paint(칠)에 크기 · 아이콘 · 불러오기를 얹은 것입니다.
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
  const iconSize = CONTROL.icon[size];
  return (
    <PressableRoot
      as={as}
      {...pressOf(variant, shadow, selected)}
      disabled={disabled}
      aria-disabled={loading ? true : undefined}
      aria-pressed={selected === undefined ? undefined : selected}
      aria-busy={loading || undefined}
      // 불러오는 동안은 누름을 삼킵니다 — 포인터만 막으면 Enter · Space 가 onClick 에 닿습니다.
      // disabled 를 쓰지 않는 이유는 꺼진 모양(opacity)이 아니라 스피너를 보여야 해서입니다.
      onClickCapture={loading ? swallow : undefined}
      className={cx(
        paintClass({ accent, variant, selected, hoverable: true }),
        buttonBase,
        buttonSize[size],
        fullWidth && fullWidthClass,
        loading && loadingClass,
        className,
      )}
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
    </PressableRoot>
  );
}
