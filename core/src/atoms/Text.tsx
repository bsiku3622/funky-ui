import { createElement } from "react";
import type { HTMLAttributes, ReactNode, ElementType } from "react";

export type TextVariant = "heading" | "body" | "chrome";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** visual + weight register */
  variant?: TextVariant;
  /** semantic element to render (default depends on variant) */
  as?: ElementType;
  /** muted ink color */
  muted?: boolean;
  children?: ReactNode;
}

const defaultTag: Record<TextVariant, ElementType> = {
  heading: "h2",
  body: "p",
  chrome: "span",
};

/**
 * Text — typographic atom.
 * - heading: black-weight display
 * - body: readable medium-weight prose
 * - chrome: uppercase, tracked, black — for labels/nav/eyebrows
 */
export const Text = ({
  variant = "body",
  as,
  muted,
  className = "",
  children,
  ...rest
}: TextProps) => {
  const cls = [
    "funky-text",
    `funky-text--${variant}`,
    muted ? "funky-text--muted" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const tag = as ?? defaultTag[variant];
  return createElement(tag, { className: cls, ...rest }, children);
};
