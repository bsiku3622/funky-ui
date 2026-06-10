import type { HTMLAttributes, ReactNode } from "react";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ToolbarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Toolbar — horizontal control bar that tops a tool screen. Cream fill,
 * a 3px black bottom border, wraps its controls. Sits as the `toolbar`
 * slot of ToolShell, or stands alone above any panel.
 *
 * Compose controls into clusters with `Toolbar.Group`, and push a cluster
 * to the right edge with `Toolbar.Spacer`.
 */
const ToolbarRoot = ({ className = "", children, ...rest }: ToolbarProps) => (
  <div className={["funky-toolbar", className].filter(Boolean).join(" ")} {...rest}>
    {children}
  </div>
);

const ToolbarGroup = ({ className = "", children, ...rest }: ToolbarGroupProps) => (
  <div className={["funky-toolbar__group", className].filter(Boolean).join(" ")} {...rest}>
    {children}
  </div>
);

const ToolbarSpacer = () => <div className="funky-toolbar__spacer" aria-hidden />;

export const Toolbar = Object.assign(ToolbarRoot, {
  Group: ToolbarGroup,
  Spacer: ToolbarSpacer,
});
