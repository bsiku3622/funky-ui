import type { ReactNode } from "react";

export interface SiteNavItem {
  key: string;
  label: ReactNode;
  /** if set, renders an <a>; otherwise a <button> calling onNavSelect */
  href?: string;
  active?: boolean;
}

export interface SiteHeaderProps {
  /** skewed wordmark / brand. */
  brand?: ReactNode;
  /** makes the brand clickable (e.g. go home). */
  onBrandClick?: () => void;
  navItems?: SiteNavItem[];
  /** called for nav items without href (button mode). */
  onNavSelect?: (key: string) => void;
  /** right-side extras (search, theme toggle…). */
  actions?: ReactNode;
  /** wrap a nav item yourself (e.g. a router <Link>) — gets (item, label, className). */
  renderNavItem?: (item: SiteNavItem, label: ReactNode, className: string) => ReactNode;
}

/**
 * SiteHeader — purple sticky topbar for docs/marketing screens (skew wordmark +
 * ghost nav). Router-free: pass href for links or onNavSelect for buttons, and
 * compute `active` yourself. The renderNavItem escape hatch lets you inject <Link>.
 */
export const SiteHeader = ({
  brand,
  onBrandClick,
  navItems = [],
  onNavSelect,
  actions,
  renderNavItem,
}: SiteHeaderProps) => (
  <header className="funky-site-header">
    {brand != null &&
      (onBrandClick ? (
        <button type="button" className="funky-site-header__brand" onClick={onBrandClick}>
          {brand}
        </button>
      ) : (
        <span className="funky-site-header__brand">{brand}</span>
      ))}
    <nav className="funky-site-header__nav">
      {navItems.map((item) => {
        const cls = "funky-site-navlink" + (item.active ? " funky-site-navlink--active" : "");
        if (renderNavItem) return <span key={item.key}>{renderNavItem(item, item.label, cls)}</span>;
        return item.href ? (
          <a key={item.key} href={item.href} className={cls}>
            {item.label}
          </a>
        ) : (
          <button key={item.key} type="button" className={cls} onClick={() => onNavSelect?.(item.key)}>
            {item.label}
          </button>
        );
      })}
    </nav>
    {actions != null && <div className="funky-site-header__actions">{actions}</div>}
  </header>
);
SiteHeader.displayName = "SiteHeader";
