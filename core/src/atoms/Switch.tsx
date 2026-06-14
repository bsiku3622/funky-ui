import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** label rendered after the track */
  label?: ReactNode;
}

/**
 * Switch — sliding toggle. Off = sunken track, on = neon-green track with the
 * knob slid right. The underlying checkbox input is visually hidden.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className = "", ...rest }, ref) => {
    const wrap = ["funky-switch", className].filter(Boolean).join(" ");
    return (
      <label className={wrap}>
        <input ref={ref} type="checkbox" className="funky-switch__input" {...rest} />
        <span className="funky-switch__track">
          <span className="funky-switch__knob" />
        </span>
        {label != null && <span className="funky-switch__label">{label}</span>}
      </label>
    );
  }
);
Switch.displayName = "Switch";
