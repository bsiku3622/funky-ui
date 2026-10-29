/** 글자 아톰 셋 — Link · Label · Divider */
import type { ComponentPropsWithRef, ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { accentClass } from "../styles/accent.css";
import { textRoleClass } from "../styles/typography.css";
import { resolveAccent, type Accent } from "../tokens/vocabulary";
import { divider, dividerTone, link, required } from "./text-atoms.css";

export type LinkProps<E extends ElementType = "a"> = PolyProps<E, { accent?: Accent; className?: string }>;

/**
 * 글 속 링크 — accent 의 진한 글자에 2px 밑줄, hover 때 accent 면으로 뒤집힙니다.
 * 라우터 링크는 `as={RouterLink}` 로 넘깁니다.
 */
export function Link<E extends ElementType = "a">({ as, accent, className, ...rest }: LinkProps<E>) {
  const Comp: ElementType = as ?? "a";
  return <Comp className={cx(link, accent && accentClass[resolveAccent(accent)], className)} {...rest} />;
}

export type LabelProps = ComponentPropsWithRef<"label"> & { required?: boolean };

/** 폼 칸의 이름표 — overline 글자 (10px · 900 · 대문자 · 약한 잉크) */
export function Label({ required: isRequired, className, children, ...rest }: LabelProps) {
  return (
    <label className={cx(textRoleClass.overline, className)} {...rest}>
      {children}
      {isRequired && (
        <span className={required} aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export interface DividerProps {
  /** 선의 색 (굵기는 셋 다 2px) — 기본 `subtle` 은 카드 안의 구분선, `line` 은 검정 */
  tone?: "subtle" | "soft" | "line";
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/** 구분선 — 카드 안을 나눌 때. 카드 안에 카드를 넣지 말고 이걸로 나눕니다 */
export function Divider({ tone = "subtle", orientation = "horizontal", className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cx(divider[orientation], dividerTone[tone], className)}
    />
  );
}
