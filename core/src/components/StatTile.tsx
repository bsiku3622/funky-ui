import type { HTMLAttributes, ReactNode } from "react";

export type StatTileColor =
  | "pink"
  | "purple"
  | "cyan"
  | "yellow"
  | "orange"
  | "sky"
  | "green";

export interface StatTileProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  /** optional small line below the number (e.g. "+12% this week") */
  hint?: ReactNode;
  color?: StatTileColor;
}

/**
 * StatTile — finished stat unit: solid neon fill + black border +
 * hard shadow + a big black number. Use as-is.
 */
export const StatTile = ({
  label,
  value,
  hint,
  color = "cyan",
  className = "",
  ...rest
}: StatTileProps) => {
  const cls = ["funky-stat-tile", `funky-stat-tile--${color}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...rest}>
      <span className="funky-stat-tile__label">{label}</span>
      <span className="funky-stat-tile__value">{value}</span>
      {hint != null && <span className="funky-stat-tile__hint">{hint}</span>}
    </div>
  );
};
