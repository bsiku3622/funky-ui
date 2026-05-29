import type { ReactNode } from "react";

export interface NavItem {
  /** stable key + the value reported on click */
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  /** optional anchor href; if omitted a <button> is rendered */
  href?: string;
}

export interface AppShellProps {
  /** wordmark / brand area (top-left, skewed) */
  brand?: ReactNode;
  /** account / actions (top-right of navbar) */
  account?: ReactNode;
  /** sidebar heading (defaults to brand) */
  sidebarTitle?: ReactNode;
  /** label above the nav list (e.g. "Main Navigation") */
  navLabel?: ReactNode;
  /** sidebar + bottom-nav items */
  navItems: NavItem[];
  /** key of the active nav item */
  activeKey?: string;
  /** click handler (for button-mode nav) */
  onNavSelect?: (key: string) => void;
  /** pinned card at the sidebar bottom (e.g. system status) */
  sidebarFooter?: ReactNode;
  /** main content */
  children?: ReactNode;
}

const renderNav = (
  item: NavItem,
  activeKey: string | undefined,
  onNavSelect: ((key: string) => void) | undefined,
  itemClass: string,
  activeClass: string
) => {
  const cls = [itemClass, item.key === activeKey ? activeClass : ""]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      {item.icon}
      <span>{item.label}</span>
    </>
  );
  if (item.href) {
    return (
      <a key={item.key} href={item.href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button
      key={item.key}
      type="button"
      className={cls}
      onClick={() => onNavSelect?.(item.key)}
    >
      {inner}
    </button>
  );
};

/**
 * AppShell — the biggest shell (Template).
 * Purple top navbar (skewed brand + account) · cream left sidebar
 * (nav items + "MAIN NAVIGATION" label + pinned footer card) ·
 * content slot · mobile bottom nav. Reproduces the original app shell.
 */
export const AppShell = ({
  brand,
  account,
  sidebarTitle,
  navLabel = "Main Navigation",
  navItems,
  activeKey,
  onNavSelect,
  sidebarFooter,
  children,
}: AppShellProps) => {
  return (
    <div className="funky-appshell">
      {/* top navbar */}
      <header className="funky-appshell__navbar">
        <span className="funky-appshell__brand">{brand}</span>
        {account && <div className="funky-appshell__account">{account}</div>}
      </header>

      <div className="funky-appshell__body">
        {/* sidebar */}
        <aside className="funky-appshell__sidebar">
          {sidebarTitle && (
            <div className="funky-appshell__sidebar-head">{sidebarTitle}</div>
          )}
          <nav className="funky-appshell__nav">
            {navLabel && (
              <p className="funky-appshell__nav-label">{navLabel}</p>
            )}
            {navItems.map((item) =>
              renderNav(
                item,
                activeKey,
                onNavSelect,
                "funky-nav-item",
                "funky-nav-item--active"
              )
            )}
          </nav>
          {sidebarFooter && (
            <div className="funky-appshell__sidebar-foot">{sidebarFooter}</div>
          )}
        </aside>

        {/* content */}
        <main className="funky-appshell__content">{children}</main>
      </div>

      {/* mobile bottom nav */}
      <nav className="funky-appshell__bottom-nav">
        {navItems.map((item) =>
          renderNav(
            item,
            activeKey,
            onNavSelect,
            "funky-bottom-nav-item",
            "funky-bottom-nav-item--active"
          )
        )}
      </nav>
    </div>
  );
};

/**
 * StatusCard — convenience for AppShell.sidebarFooter
 * (the cyan "SYSTEM STATUS / All Systems Go" card from the original).
 */
export interface StatusCardProps {
  title: ReactNode;
  children?: ReactNode;
}
export const StatusCard = ({ title, children }: StatusCardProps) => (
  <div className="funky-appshell__status-card">
    <p className="funky-appshell__status-card-title">{title}</p>
    {children != null && (
      <p className="funky-appshell__status-card-text">{children}</p>
    )}
  </div>
);
