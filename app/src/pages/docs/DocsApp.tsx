import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SiteTopbar } from "../../chrome";
import { DOC_GROUPS, hasDoc, loadDocContent } from "./loader";
import { MarkdownRenderer } from "./MarkdownRenderer";

const DEFAULT_SLUG = "";

const SidebarLink = ({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "0.4rem 0.6rem",
      border: "2px solid transparent",
      background: active ? "var(--funky-ink)" : "transparent",
      color: active ? "var(--funky-ink-inverse)" : "rgba(0,0,0,0.7)",
      fontFamily: "var(--funky-font-family)",
      fontWeight: active ? 900 : 700,
      fontSize: "0.8125rem",
      cursor: "pointer",
    }}
  >
    {title}
  </button>
);

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
      <SiteTopbar />
      <div className="docs-layout">
        <aside className="docs-sidebar">
          {DOC_GROUPS.map((group) => (
            <div key={group.title || "intro"} style={{ marginBottom: "1.25rem" }}>
              {group.title && (
                <p style={{ margin: "0 0 0.5rem 0.6rem", fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(0,0,0,0.4)" }}>
                  {group.title}
                </p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                {group.docs.map((d) => (
                  <SidebarLink
                    key={d.slug}
                    title={d.title}
                    active={d.slug === activeSlug}
                    onClick={() => navigate(d.slug ? `/docs/${d.slug}` : "/docs")}
                  />
                ))}
              </div>
            </div>
          ))}
        </aside>

        <main className="docs-main">
          <div style={{ width: "100%", maxWidth: "44rem" }}>
            {loading ? (
              <p style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.3)" }}>Loading…</p>
            ) : content ? (
              <MarkdownRenderer content={content} currentSlug={activeSlug} />
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
