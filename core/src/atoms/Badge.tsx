import type { HTMLAttributes, ReactNode } from "react";
import type { TagColor } from "./Tag";

export type BadgeColor = Exclude<TagColor, "neutral"> | "neutral";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  children?: ReactNode;
}

/** Badge — compact count/status pill. Defaults to primary (pink) fill. */
export const Badge = ({
  color = "pink",
  className = "",
  children,
  ...rest
}: BadgeProps) => {
  const cls = [
    "funky-badge",
    color !== "neutral" ? `funky-badge--${color}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
};
