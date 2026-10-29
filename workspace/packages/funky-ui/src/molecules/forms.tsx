/** 입력 몰레큘 둘 — SearchField(검색 칸) · FormField(이름표 + 칸 + 안내) */
import { Children, cloneElement, isValidElement, useId, type ChangeEvent, type ReactElement, type ReactNode } from "react";

import { cx } from "../internal/cx";
import { CloseGlyph, SearchGlyph } from "../internal/glyphs";
import { Input, type InputProps } from "../atoms/fields";
import { Label } from "../atoms/text-atoms";
import { Stack } from "../primitives/layout";
import { Text } from "../primitives/Text";
import { CONTROL } from "../tokens/shape";
import { fieldError, searchClear, searchIcon, searchInput, searchWrap } from "./forms.css";

export interface SearchFieldProps extends Omit<InputProps, "value" | "onChange" | "type"> {
  value: string;
  onValueChange: (value: string) => void;
  /** 지우기 버튼을 눌렀을 때 (기본: 빈 문자열로) */
  onClear?: () => void;
  clearLabel?: string;
}

/** 검색 칸 — 앞에 돋보기, 값이 있으면 뒤에 지우기. 한글 조합 중 Enter 는 부르는 쪽이 거릅니다 */
export function SearchField({ value, onValueChange, onClear, clearLabel = "지우기", size = "md", className, ...rest }: SearchFieldProps) {
  const icon = CONTROL.icon[size];
  return (
    <span className={cx(searchWrap, className)}>
      <SearchGlyph size={icon} strokeWidth={3} className={searchIcon[size]} />
      <Input
        type="search"
        size={size}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e.target.value)}
        className={searchInput[size]}
        {...rest}
      />
      {value && (
        <button type="button" aria-label={clearLabel} className={searchClear[size]} onClick={() => (onClear ? onClear() : onValueChange(""))}>
          <CloseGlyph size={icon} />
        </button>
      )}
    </span>
  );
}

export interface FormFieldProps {
  label: ReactNode;
  /** 칸 아래 안내 */
  hint?: ReactNode;
  /** 틀렸을 때의 안내 — 주면 칸이 빨갛게 바뀝니다 */
  error?: ReactNode;
  required?: boolean;
  /** 칸 하나 (Input · Textarea · Select). id 와 aria 속성은 FormField 가 붙입니다 */
  children: ReactElement<Record<string, unknown>>;
  className?: string;
}

/** 이름표 + 칸 + 안내를 한 묶음으로 — 이름표와 안내가 칸에 연결됩니다 */
export function FormField({ label, hint, error, required, children, className }: FormFieldProps) {
  const autoId = useId();
  const child = Children.only(children);
  const own = isValidElement(child) ? child.props : {};
  // 칸이 이미 가진 값은 덮지 않고 잇습니다 — id 는 칸의 것을 쓰고, 설명은 칸의 것 뒤에 붙입니다
  const id = typeof own.id === "string" ? own.id : autoId;
  const noteId = `${id}-note`;
  const describedBy = [own["aria-describedby"], hint || error ? noteId : undefined].filter(Boolean).join(" ") || undefined;
  return (
    <Stack gap="xs" className={className}>
      <Label htmlFor={id} required={required ?? Boolean(own.required)}>
        {label}
      </Label>
      {isValidElement(child)
        ? cloneElement(child, {
            id,
            "aria-describedby": describedBy,
            invalid: error ? true : own.invalid,
            required: required ?? own.required,
          })
        : child}
      {(error || hint) && (
        <Text id={noteId} variant="caption" tone={error ? undefined : "muted"} className={error ? fieldError : undefined}>
          {error ?? hint}
        </Text>
      )}
    </Stack>
  );
}
