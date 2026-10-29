/** 입력 아톰 셋 — Input · Textarea · Select. native 요소에 ref 와 폼 속성이 그대로 갑니다 */
import type { ComponentPropsWithRef, ReactNode } from "react";

import { cx } from "../internal/cx";
import { ChevronDownGlyph } from "../internal/glyphs";
import { CONTROL } from "../tokens/shape";
import type { ControlSize } from "../tokens/vocabulary";
import { field, fieldShadow, fieldSize, select, selectArrow, selectArrowPos, selectPad, selectWrap, textarea, textareaSize } from "./field.css";

interface FieldOwnProps {
  /** 높이 사다리 — Button 과 같은 크기면 같은 높이입니다 (기본 `md`) */
  size?: ControlSize;
  /** 틀린 값 — 빨간 테두리 + `aria-invalid` */
  invalid?: boolean;
  /** 4px 그림자 위에 띄웁니다 (폼의 주인공 칸) */
  shadow?: boolean;
}

export type InputProps = Omit<ComponentPropsWithRef<"input">, "size"> & FieldOwnProps;

export function Input({ size = "md", invalid, shadow, className, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cx(field, fieldSize[size], shadow && fieldShadow, className)}
      {...rest}
    />
  );
}

export type TextareaProps = ComponentPropsWithRef<"textarea"> & FieldOwnProps;

export function Textarea({ size = "md", invalid, shadow, className, rows = 4, ...rest }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cx(field, textarea, textareaSize[size], shadow && fieldShadow, className)}
      {...rest}
    />
  );
}

export type SelectProps = Omit<ComponentPropsWithRef<"select">, "size"> & FieldOwnProps & { children?: ReactNode };

/** native select — 목록은 운영체제가 그립니다 (폰에서 가장 잘 고르는 방법입니다) */
export function Select({ size = "md", invalid, shadow, className, children, ...rest }: SelectProps) {
  return (
    <span className={cx(selectWrap, className)}>
      <select
        aria-invalid={invalid || undefined}
        className={cx(field, fieldSize[size], select, selectPad[size], shadow && fieldShadow)}
        {...rest}
      >
        {children}
      </select>
      <ChevronDownGlyph size={CONTROL.icon[size]} strokeWidth={3} className={cx(selectArrow, selectArrowPos[size])} />
    </span>
  );
}
