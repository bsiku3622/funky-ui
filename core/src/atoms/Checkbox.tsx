import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** label rendered after the box */
  label?: ReactNode;
}

/** Checkbox — bordered box with a neon check, presses on hover. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", ...rest }, ref) => {
    const wrap = ["funky-checkbox", className].filter(Boolean).join(" ");
    return (
      <label className={wrap}>
        <input ref={ref} type="checkbox" className="funky-checkbox__box" {...rest} />
        {label != null && <span className="funky-checkbox__label">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
