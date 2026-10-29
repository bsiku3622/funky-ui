/**
 * 늘어놓는 primitive 셋 — Stack(세로) · Inline(가로) · Grid(격자).
 * Box 의 prop 을 그대로 받고, 자식 사이의 간격과 정렬을 더합니다.
 */
import type { CSSProperties, ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { columnGapClass, gapClass, rowGapClass } from "../styles/space.css";
import type { Align, Justify, Space } from "../tokens/vocabulary";
import { boxClass, type BoxOwnProps } from "./Box";
import { alignClass, grid, inline, justifyClass, justifyItemsClass, stack, wrapClass } from "./flex.css";

interface FlexOwnProps extends BoxOwnProps {
  gap?: Space;
  align?: Align;
  justify?: Justify;
}

export type StackProps<E extends ElementType = "div"> = PolyProps<E, FlexOwnProps>;

/** 세로로 쌓습니다 */
export function Stack<E extends ElementType = "div">({ as, gap, align, justify, className, ...rest }: StackProps<E>) {
  const Comp: ElementType = as ?? "div";
  const { accent, surface, border, shadow, padding, paddingX, paddingY, ...props } = rest as BoxOwnProps & Record<string, unknown>;
  return (
    <Comp
      className={cx(
        stack,
        boxClass({ accent, surface, border, shadow, padding, paddingX, paddingY }),
        gap && gapClass[gap],
        align && alignClass[align],
        justify && justifyClass[justify],
        className,
      )}
      {...props}
    />
  );
}

export type InlineProps<E extends ElementType = "div"> = PolyProps<E, FlexOwnProps & { wrap?: boolean }>;

/** 가로로 늘어놓습니다 — 기본은 세로 가운데 정렬 */
export function Inline<E extends ElementType = "div">({ as, gap, align, justify, wrap, className, ...rest }: InlineProps<E>) {
  const Comp: ElementType = as ?? "div";
  const { accent, surface, border, shadow, padding, paddingX, paddingY, ...props } = rest as BoxOwnProps & Record<string, unknown>;
  return (
    <Comp
      className={cx(
        inline,
        boxClass({ accent, surface, border, shadow, padding, paddingX, paddingY }),
        gap && gapClass[gap],
        align && alignClass[align],
        justify && justifyClass[justify],
        wrap && wrapClass,
        className,
      )}
      {...props}
    />
  );
}

interface GridOwnProps extends BoxOwnProps {
  /** 숫자면 같은 폭 n 칸, 문자열이면 grid-template-columns 그대로 */
  columns?: number | string;
  gap?: Space;
  rowGap?: Space;
  columnGap?: Space;
  align?: Align;
  justifyItems?: Align;
  style?: CSSProperties;
}

export type GridProps<E extends ElementType = "div"> = PolyProps<E, GridOwnProps>;

/** 격자 — 칸 폭은 실행 중에 정해지는 값이라 inline style 로 넣습니다 */
export function Grid<E extends ElementType = "div">({ as, columns, gap, rowGap, columnGap, align, justifyItems, style, className, ...rest }: GridProps<E>) {
  const Comp: ElementType = as ?? "div";
  const { accent, surface, border, shadow, padding, paddingX, paddingY, ...props } = rest as BoxOwnProps & Record<string, unknown>;
  const template = typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns;
  return (
    <Comp
      className={cx(
        grid,
        boxClass({ accent, surface, border, shadow, padding, paddingX, paddingY }),
        gap && gapClass[gap],
        rowGap && rowGapClass[rowGap],
        columnGap && columnGapClass[columnGap],
        align && alignClass[align],
        justifyItems && justifyItemsClass[justifyItems],
        className,
      )}
      style={template ? { gridTemplateColumns: template, ...style } : style}
      {...props}
    />
  );
}
