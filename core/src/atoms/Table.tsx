import type { TableHTMLAttributes, ReactNode } from "react";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
}

/**
 * Table — bordered data table (ink header row, hard-edged cells). Wraps itself
 * in a horizontal-scroll container. Use plain <thead>/<tbody>/<tr>/<th>/<td>
 * inside; the .funky-table class styles them.
 */
export const Table = ({ className = "", children, ...rest }: TableProps) => {
  const cls = ["funky-table", className].filter(Boolean).join(" ");
  return (
    <div className="funky-table__scroll">
      <table className={cls} {...rest}>
        {children}
      </table>
    </div>
  );
};
Table.displayName = "Table";
