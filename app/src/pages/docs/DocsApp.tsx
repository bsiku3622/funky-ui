import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { SiteHeader, DocsSidebar } from "@studio-baeks/funky-ui";
import { MarkdownView } from "@studio-baeks/funky-ui/markdown";
import "@studio-baeks/funky-ui/markdown.css";
import { SITE_NAV } from "../../chrome";
import { DOC_GROUPS, hasDoc, loadDocContent } from "./loader";

const DEFAULT_SLUG = "";

/* relative .md link (from the current doc) → docs slug */
const resolveSlug = (current: string, href: string): string => {
  const [pathPart, hash] = href.split("#");
  const baseSegs = current.split("/").slice(0, -1);
  const segs = pathPart.replace(/\.md$/, "").split("/");
  const out = [...baseSegs];
  for (const s of segs) {
    if (s === "." || s === "") continue;
    if (s === "..") out.pop();
    else out.push(s);
  }
  let slug = out.join("/");
  if (slug === "README") slug = "";
  if (slug.endsWith("/README")) slug = slug.slice(0, -"/README".length);
  return slug + (hash ? `#${hash}` : "");
};

const DocsApp = () => {
  const params = useParams();
  const navigate = useNavigate();
  const splat = params["*"] ?? "";
  const activeSlug = hasDoc(splat) ? splat : DEFAULT_SLUG;

  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancelled = false;
    loadDocContent(activeSlug).then((c) => {
      if (cancelled) return;
      setContent(c ?? null);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [activeSlug]);

  return (
    <>
      <SiteHeader
        brand="funky ui"
        onBrandClick={() => navigate("/")}
        navItems={SITE_NAV.map((n) => ({ key: n.to, label: n.label, active: n.to === "/docs" }))}
        renderNavItem={(item, label, cls) => (
          <Link to={item.key} className={cls}>
            {label}
          </Link>
        )}
      />
      <div className="docs-layout">
        <DocsSidebar
          groups={DOC_GROUPS.map((g) => ({
            title: g.title,
            items: g.docs.map((d) => ({ key: d.slug, label: d.title, active: d.slug === activeSlug })),
          }))}
          renderItem={(item, label, cls) => (
            <button
              type="button"
              className={cls}
              onClick={() => navigate(item.key ? `/docs/${item.key}` : "/docs")}
            >
              {label}
            </button>
          )}
        />

        <main className="docs-main">
          <div style={{ width: "100%", maxWidth: "44rem" }}>
            {loading ? (
              <p style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.3)" }}>Loading…</p>
            ) : content ? (
              <MarkdownView
                content={content}
                onLinkClick={(href) => navigate(`/docs/${resolveSlug(activeSlug, href)}`)}
              />
            ) : (
              <p style={{ fontFamily: "var(--funky-font-family)" }}>문서를 찾을 수 없습니다.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default DocsApp;
