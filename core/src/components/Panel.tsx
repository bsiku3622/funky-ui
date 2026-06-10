import type { HTMLAttributes, ReactNode } from "react";

export type PanelColor =
  | "ink"
  | "neutral"
  | "pink"
  | "purple"
  | "cyan"
  | "yellow"
  | "orange"
  | "sky"
  | "green";

export interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** uppercase heading bar; omit for a plain framed container */
  title?: ReactNode;
  /** right side of the heading bar (buttons, tags…) */
  actions?: ReactNode;
  /** heading bar fill — defaults to ink (black). Reach for a neon to go louder. */
  color?: PanelColor;
  /** when false, render children flush (no inner padding) */
  padded?: boolean;
  children?: ReactNode;
}

/**
 * Panel — the loud sectioning primitive. A 3px-bordered, hard-shadowed box
 * with an optional uppercase heading bar. This is how funky-ui carves a
 * screen into regions — never a thin 1px divider. Default heading is a solid
 * black bar; pass `color="pink"` etc. for a neon header.
 */
export const Panel = ({
  title,
  actions,
  color = "ink",
  padded = true,
  className = "",
  children,
  ...rest
}: PanelProps) => {
  const cls = ["funky-panel", className].filter(Boolean).join(" ");
  const bodyCls = padded ? "funky-panel__body" : "funky-panel__body funky-panel__body--flush";
  return (
    <section className={cls} {...rest}>
      {title != null && (
        <header className={`funky-panel__head funky-panel__head--${color}`}>
          <span className="funky-panel__title">{title}</span>
          {actions != null && <div className="funky-panel__actions">{actions}</div>}
        </header>
      )}
      <div className={bodyCls}>{children}</div>
    </section>
  );
};
