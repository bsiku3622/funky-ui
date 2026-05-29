import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** content rendered before the field (e.g. an icon) */
  leading?: ReactNode;
  /** content rendered after the field */
  trailing?: ReactNode;
  /** stretch to full width of the parent */
  fullWidth?: boolean;
}

/** Input — bordered field with hard shadow that presses on focus. */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leading, trailing, fullWidth, className = "", ...rest }, ref) => {
    const wrap = [
      "funky-input",
      fullWidth ? "funky-input--full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <div className={wrap}>
        {leading && <span className="funky-input__icon">{leading}</span>}
        <input ref={ref} className="funky-input__field" {...rest} />
        {trailing && <span className="funky-input__icon">{trailing}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
