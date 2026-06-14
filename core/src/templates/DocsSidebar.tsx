import type { ReactNode } from "react";

export interface DocsNavItem {
  key: string;
  label: ReactNode;
  href?: string;
  active?: boolean;
}

export interface DocsNavGroup {
  /** uppercase chrome group label (e.g. "Get Started") */
  title?: ReactNode;
  items: DocsNavItem[];
}

export interface DocsSidebarProps {
  groups: DocsNavGroup[];
  /** called for items without href (button mode). */
  onSelect?: (key: string) => void;
  /** wrap an item yourself (e.g. a router <Link>). */
  renderItem?: (item: DocsNavItem, label: ReactNode, className: string) => ReactNode;
  /** extra content pinned below the nav (e.g. a <Toc /> on the same rail). */
  children?: ReactNode;
}

/**
 * DocsSidebar — sticky left rail for reading screens (cream, black right border,
 * transparent links with the active one filled black). Router-free; group your
 * docs into {title, items}. The reading-screen counterpart to AppShell's sidebar.
 */
export const DocsSidebar = ({ groups, onSelect, renderItem, children }: DocsSidebarProps) => (
  <aside className="funky-docs-sidebar">
    {groups.map((g, gi) => (
      <div className="funky-docs-sidebar__group" key={gi}>
        {g.title != null && <p className="funky-docs-sidebar__label">{g.title}</p>}
        {g.items.map((item) => {
          const cls =
            "funky-docs-sidebar__link" + (item.active ? " funky-docs-sidebar__link--active" : "");
          if (renderItem) return <span key={item.key}>{renderItem(item, item.label, cls)}</span>;
          return item.href ? (
            <a key={item.key} href={item.href} className={cls}>
              {item.label}
            </a>
          ) : (
            <button key={item.key} type="button" className={cls} onClick={() => onSelect?.(item.key)}>
              {item.label}
            </button>
          );
        })}
      </div>
    ))}
    {children}
  </aside>
);
DocsSidebar.displayName = "DocsSidebar";
