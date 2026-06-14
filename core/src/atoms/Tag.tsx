import type { HTMLAttributes, ReactNode } from "react";

export type TagColor =
  | "neutral"
  | "pink"
  | "purple"
  | "cyan"
  | "yellow"
  | "orange"
  | "sky"
  | "green"
  | "red";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: TagColor;
  children?: ReactNode;
}

/** Tag — small bordered chip with a soft hard-shadow. */
export const Tag = ({
  color = "neutral",
  className = "",
  children,
  ...rest
}: TagProps) => {
  const cls = [
    "funky-tag",
    color !== "neutral" ? `funky-tag--${color}` : "",
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
