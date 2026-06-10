import type { ReactNode } from "react";

export type ToolStage = "plain" | "checker" | "dots";

export interface ToolShellProps {
  /** top control bar — pass a <Toolbar> (it brings its own 3px bottom border) */
  toolbar?: ReactNode;
  /** bottom bar — editor / hint / status; separated by a 3px top border */
  footer?: ReactNode;
  /** stage background texture: cream `plain`, transparency `checker`, or canvas `dots` */
  stage?: ToolStage;
  /** the work surface (centered in the stage) */
  children?: ReactNode;
}

/**
 * ToolShell — the vertical-stack shell for tool apps: a fixed Toolbar on top,
 * a flexible Stage that fills the viewport, and an optional Footer. Regions
 * are split by thick 3px black borders (the toolbar/footer carry them), and
 * the stage can wear a checkerboard or dot-grid texture. This is the second
 * macro layout alongside AppShell (sidebar + content).
 */
export const ToolShell = ({
  toolbar,
  footer,
  stage = "plain",
  children,
}: ToolShellProps) => {
  return (
    <div className="funky-toolshell">
      {toolbar && <div className="funky-toolshell__bar">{toolbar}</div>}
      <div className={`funky-toolshell__stage funky-toolshell__stage--${stage}`}>
        {children}
      </div>
      {footer && <div className="funky-toolshell__foot">{footer}</div>}
    </div>
  );
};
