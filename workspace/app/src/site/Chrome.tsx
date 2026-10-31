/** 사이트 크롬 — 상단 바(funky AppBar) + Playground · Docs 의 왼쪽 목차 */
import type { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Badge, LAYERS, NavButton } from "@studio-baeks/funky-ui";
import { BookOpen, LayoutGrid } from "lucide-react";

import { DOC_GROUPS } from "../pages/docs-content";
import { LAYER_COUNT, LAYER_LABEL, NAV, TIER_LABEL } from "./nav";
import * as s from "./site.css";

const BY_LAYER = LAYERS.map((layer) => ({ layer, groups: NAV.filter((g) => g.layer === layer) }));

export function Chrome({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className={s.page}>
      <AppBar
        brand="funky-ui"
        className={s.header}
        onBrandClick={() => navigate("/")}
        actions={
          <div className={s.topLinks}>
            <NavButton icon={LayoutGrid} selected={pathname.startsWith("/playground")} onClick={() => navigate("/playground")}>
              Playground
            </NavButton>
            <NavButton icon={BookOpen} selected={pathname.startsWith("/docs")} onClick={() => navigate("/docs")}>
              Docs
            </NavButton>
          </div>
        }
      />
      {children}
    </div>
  );
}

export function PlaygroundShell({ children }: { children: ReactNode }) {
  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        <div className={s.navLayer}>
          <NavLink to="/playground" end className={s.navLink}>
            Overview
          </NavLink>
        </div>
        {BY_LAYER.map(({ layer, groups }) => (
          <div key={layer} className={s.navLayer}>
            <p className={s.navLayerTitle}>
              {LAYER_LABEL[layer]}
              <Badge size="sm" variant={layer === "components" ? "solid" : "outline"} accent={layer === "components" ? "purple" : undefined}>
                {LAYER_COUNT[layer]}
              </Badge>
            </p>
            {groups.map((g, i) => (
              <div key={g.group}>
                {g.tier && g.tier !== groups[i - 1]?.tier && <p className={s.navTierTitle}>{TIER_LABEL[g.tier].long}</p>}
                {layer !== "foundations" && <p className={s.navGroupTitle}>{g.group}</p>}
                {g.items.map((item) => (
                  <NavLink key={item.path} to={item.path} className={s.navLink}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        ))}
      </aside>
      <main className={s.main}>{children}</main>
    </div>
  );
}

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        {DOC_GROUPS.map((g) => (
          <div key={g.title} className={s.navLayer}>
            <p className={s.navLayerTitle}>{g.title}</p>
            {g.docs.map((d) => (
              <NavLink key={d.path} to={`/docs/${d.path}`} end className={s.navLink}>
                {d.title}
              </NavLink>
            ))}
          </div>
        ))}
      </aside>
      <main className={s.main}>{children}</main>
    </div>
  );
}
