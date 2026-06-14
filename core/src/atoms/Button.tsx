import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "white"
  | "black"
  | "ink";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** color/role — primary…info, or the neutrals white/black/ink */
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
}

/** Button — finished interactive atom. Press-into-shadow on hover/active. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "white",
      size = "md",
      leadingIcon,
      trailingIcon,
      className = "",
      children,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const cls = [
      "funky-button",
      "funky-pressable",
      `funky-button--${variant}`,
      size !== "md" ? `funky-button--${size}` : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <button ref={ref} type={type} className={cls} {...rest}>
        {leadingIcon}
        {children}
        {trailingIcon}
      </button>
    );
  }
);
Button.displayName = "Button";
