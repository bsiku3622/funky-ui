import type { ReactNode } from "react";

export interface TocItem {
  id: string;
  text: ReactNode;
  /** heading depth: 2 = h2, 3 = h3, 4 = h4 */
  depth: number;
}

export interface TocProps {
  items: TocItem[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
  /** heading label (default "On this page") */
  label?: ReactNode;
}

/**
 * Toc — "On this page" outline rail. Pure react (no markdown deps); pair with
 * extractToc from "@studio-baeks/funky-ui/markdown" to build the items. Layout
 * (where the rail sits) is the consumer's call — this only renders the list.
 */
export function Toc({ items, activeId, onSelect, label = "On this page" }: TocProps) {
  if (items.length === 0) return null;
  return (
    <nav className="funky-toc">
      <div className="funky-toc__head">{label}</div>
      <ul className="funky-toc__list">
        {items.map((it) => (
          <li
            key={it.id}
            className={[
              "funky-toc__row",
              `funky-toc__row--d${it.depth}`,
              it.id === activeId ? "funky-toc__row--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <button type="button" className="funky-toc__link" onClick={() => onSelect?.(it.id)}>
              {it.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
Toc.displayName = "Toc";
