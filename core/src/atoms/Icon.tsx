import type { HTMLAttributes, ReactNode } from "react";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  /** square pixel size of the slot (default 20) */
  size?: number;
  children?: ReactNode;
}

/**
 * Icon — voice-neutral square slot for any SVG/glyph.
 * The system ships no icon set; pass your own (lucide, svg, emoji).
 */
export const Icon = ({
  size = 20,
  className = "",
  style,
  children,
  ...rest
}: IconProps) => {
  return (
    <span
      className={["funky-icon", className].filter(Boolean).join(" ")}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
};
