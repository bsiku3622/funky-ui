import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { alignClass, familyClass, numericClass, textRoleClass, toneClass, truncateClass, weightClass } from "../styles/typography.css";
import type { Family, TextVariant, Tone, Weight } from "../tokens/vocabulary";

export interface TextOwnProps {
  /** 글자 역할 — 크기 · 줄 높이 · 굵기 · 자간 · 대소문자를 한 번에 고릅니다 */
  variant?: TextVariant;
  /** 역할의 기본 굵기를 바꿀 때만 */
  weight?: Weight;
  /** 글자색 — `accent` 는 지금 accent 의 진한 글자, `accentSoft` 는 연한 글자 */
  tone?: Tone;
  family?: Family;
  align?: "start" | "center" | "end";
  /** 한 줄에서 자르고 … 을 붙입니다 */
  truncate?: boolean;
  /** 숫자 글리프만 같은 폭으로 (표 · 시각) */
  numeric?: boolean;
  className?: string;
}

export type TextProps<E extends ElementType = "span"> = PolyProps<E, TextOwnProps>;

/** 글자 — 태그(`as`)와 생김새(`variant`)는 따로 고릅니다 */
export function Text<E extends ElementType = "span">({
  as,
  variant = "body",
  weight,
  tone,
  family,
  align,
  truncate,
  numeric,
  className,
  ...rest
}: TextProps<E>) {
  const Comp: ElementType = as ?? "span";
  return (
    <Comp
      className={cx(
        textRoleClass[variant],
        weight && weightClass[weight],
        tone && toneClass[tone],
        family && familyClass[family],
        align && alignClass[align],
        truncate && truncateClass,
        numeric && numericClass,
        className,
      )}
      {...rest}
    />
  );
}
