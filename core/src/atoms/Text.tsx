import { createElement } from "react";
import type { HTMLAttributes, ReactNode, ElementType } from "react";

export type TextVariant =
  | "display"
  | "heading"
  | "title"
  | "body"
  | "caption"
  | "chrome"
  | "overline"
  | "code";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** visual + weight register (font.role) */
  variant?: TextVariant;
  /** semantic element to render (default depends on variant) */
  as?: ElementType;
  /** muted ink color */
  muted?: boolean;
  children?: ReactNode;
}

const defaultTag: Record<TextVariant, ElementType> = {
  display: "h1",
  heading: "h2",
  title: "h3",
  body: "p",
  caption: "p",
  chrome: "span",
  overline: "span",
  code: "code",
};

/**
 * Text — typographic atom (maps to font.role).
 * LOUD(구조): display · heading · title(black/bold·tight) · chrome · overline
 *   (uppercase·black·넓은 자간). QUIET(내용): body · caption(medium). code: mono.
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
