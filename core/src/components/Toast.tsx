import type { HTMLAttributes, ReactNode } from "react";

export type ToastColor =
  | "ink"
  | "pink"
  | "purple"
  | "cyan"
  | "yellow"
  | "orange"
  | "sky"
  | "green";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** fill — defaults to ink (dark box, cream text), the canonical funky toast */
  color?: ToastColor;
  /** pin to bottom-center of the viewport (fixed). Off by default (inline). */
  fixed?: boolean;
  children?: ReactNode;
}

/**
 * Toast — a transient message box. Visual only: it carries the look (dark ink
 * box with cream text, or a neon fill) and an optional fixed bottom-center
 * placement. Show/hide and timers stay with the consumer.
 */
export const Toast = ({
  color = "ink",
  fixed = false,
  className = "",
  children,
  ...rest
}: ToastProps) => {
  const cls = [
    "funky-toast",
    `funky-toast--${color}`,
    fixed ? "funky-toast--fixed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} role="status" {...rest}>
      {children}
    </div>
  );
};
