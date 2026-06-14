import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { AccentColor } from "../tokens";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** content rendered before the field (e.g. an icon) */
  leading?: ReactNode;
  /** content rendered after the field */
  trailing?: ReactNode;
  /** stretch to full width of the parent */
  fullWidth?: boolean;
  /**
   * contextual accent — tints the resting hover. Omit for a neutral gray hover,
   * the default for a quiet input. e.g. `accent="cyan"` for a subtle cyan hover.
   */
  accent?: AccentColor;
}

/** Input — bordered field, flat at rest; the hard shadow lifts on focus (떠오름). */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leading, trailing, fullWidth, accent, className = "", ...rest }, ref) => {
    const wrap = [
      "funky-input",
      "funky-liftable",
      fullWidth ? "funky-input--full" : "",
      accent ? `funky-accent--${accent}` : "",
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
