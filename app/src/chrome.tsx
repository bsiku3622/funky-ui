import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const SITE_NAV = [
  { to: "/", label: "Home" },
  { to: "/playground", label: "Playground" },
  { to: "/docs", label: "Docs" },
] as const;

const isActive = (pathname: string, to: string) =>
  to === "/" ? pathname === "/" : pathname.startsWith(to);

/** Marketing wordmark — FUNKY·UI with a neon period. */
export const SiteBrand = ({ onClick }: { onClick?: () => void }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="site-topbar__brand"
      onClick={onClick ?? (() => navigate("/"))}
    >
      funky ui
    </button>
  );
};

/** Sticky marketing topbar used on the landing page. */
export const SiteTopbar = () => {
  const { pathname } = useLocation();
  return (
    <header className="site-topbar">
      <SiteBrand />
      <nav className="site-topbar__nav">
        {SITE_NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={
              "site-navlink" +
              (isActive(pathname, item.to) && item.to !== "/"
                ? " site-navlink--active"
                : "")
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

/** Page wrapper for marketing routes: topbar + content. */
export const SitePage = ({ children }: { children: ReactNode }) => (
  <>
    <SiteTopbar />
    {children}
  </>
);
