import type { HTMLAttributes, ReactNode } from "react";

export interface WindowProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** optional title shown in the titlebar next to the traffic-light dots */
  title?: ReactNode;
  /** when false, render children flush (no inner padding) — e.g. for code blocks */
  padded?: boolean;
  children?: ReactNode;
}

/**
 * Window — a macOS-style framed surface: a titlebar with three neon
 * traffic-light dots over a thick-bordered, hard-shadowed body. The
 * signature wrapper for code samples, previews, and exportable shots.
 */
export const Window = ({
  title,
  padded = true,
  className = "",
  children,
  ...rest
}: WindowProps) => {
  const cls = ["funky-window", className].filter(Boolean).join(" ");
  const bodyCls = padded ? "funky-window__body" : "funky-window__body funky-window__body--flush";
  return (
    <div className={cls} {...rest}>
      <div className="funky-window__bar">
        <span className="funky-window__dots" aria-hidden>
          <span className="funky-window__dot funky-window__dot--pink" />
          <span className="funky-window__dot funky-window__dot--yellow" />
          <span className="funky-window__dot funky-window__dot--green" />
        </span>
        {title != null && <span className="funky-window__title">{title}</span>}
      </div>
      <div className={bodyCls}>{children}</div>
    </div>
  );
};
