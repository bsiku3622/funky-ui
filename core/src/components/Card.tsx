import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** when false, render children flush (no inner padding) */
  padded?: boolean;
  children?: ReactNode;
}

/**
 * Card — simple "껍데기" shell. Carries the brutalist frame
 * (2px black border, sharp corners, hard shadow); consumer fills children.
 */
export const Card = ({
  padded = true,
  className = "",
  children,
  ...rest
}: CardProps) => {
  return (
    <div className={["funky-card", className].filter(Boolean).join(" ")} {...rest}>
      {padded ? <div className="funky-card__body">{children}</div> : children}
    </div>
  );
};
