import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** label rendered after the dot */
  label?: ReactNode;
}

/** Radio — bordered square with a neon fill when selected (sharp, not round — brutalist). */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = "", ...rest }, ref) => {
    const wrap = ["funky-radio", className].filter(Boolean).join(" ");
    return (
      <label className={wrap}>
        <input ref={ref} type="radio" className="funky-radio__dot" {...rest} />
        {label != null && <span className="funky-radio__label">{label}</span>}
      </label>
    );
  }
);
Radio.displayName = "Radio";
