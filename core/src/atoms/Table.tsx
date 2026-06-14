import type { TableHTMLAttributes, ReactNode } from "react";
import type { AccentColor } from "../tokens";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * contextual accent — themes the header fill, the row-hover, and the striped
   * tint from one anchor. Omit for a neutral black header. e.g. `accent="cyan"`.
   */
  accent?: AccentColor;
  /** zebra stripe on even rows (a bright-pale tint of the accent) */
  striped?: boolean;
  children?: ReactNode;
}

/**
 * Table — full-grid data table (every cell bordered). Wraps itself in a
 * horizontal-scroll container. Use plain <thead>/<tbody>/<tr>/<th>/<td> inside.
 * `accent` themes the header + hover + stripe from one anchor (default black);
 * `striped` adds the zebra. The accent cascades via `.funky-accent--{accent}`.
 */
export const Table = ({ accent, striped, className = "", children, ...rest }: TableProps) => {
  const cls = [
    "funky-table",
    accent ? `funky-accent--${accent}` : "",
    striped ? "funky-table--striped" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="funky-table__scroll">
      <table className={cls} {...rest}>
        {children}
      </table>
    </div>
  );
};
Table.displayName = "Table";
