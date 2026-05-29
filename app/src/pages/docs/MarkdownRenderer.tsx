import type { CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

/* ── relative .md link → docs slug ──────────────────────────────── */
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

const isExternal = (href: string) => /^https?:\/\//.test(href) || href.startsWith("mailto:");

const codeFont = "ui-monospace, SFMono-Regular, Menlo, monospace";

const h: (size: string, top: string) => CSSProperties = (size, top) => ({
  fontFamily: "var(--funky-font-family)",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "-0.01em",
  lineHeight: 1.15,
  margin: `${top} 0 0.6rem`,
  scrollMarginTop: "5.5rem",
  fontSize: size,
});

export const MarkdownRenderer = ({
  content,
  currentSlug,
}: {
  content: string;
  currentSlug: string;
}) => {
  const navigate = useNavigate();

  const components: Components = {
    h1: ({ children, id }) => <h1 id={id} style={h("2.25rem", "0")}>{children}</h1>,
    h2: ({ children, id }) => <h2 id={id} style={{ ...h("1.5rem", "2.5rem"), borderTop: "var(--funky-border)", paddingTop: "1.5rem" }}>{children}</h2>,
    h3: ({ children, id }) => <h3 id={id} style={h("1.125rem", "1.75rem")}>{children}</h3>,
    p: ({ children }) => <p style={{ margin: "0 0 1rem", lineHeight: 1.7 }}>{children}</p>,
    a: ({ href, children }) => {
      const raw = href ?? "#";
      if (isExternal(raw) || raw.startsWith("#")) {
        return <a href={raw} style={{ color: "var(--funky-secondary)", fontWeight: 700 }}>{children}</a>;
      }
      const target = raw.startsWith("/") ? raw : `/docs/${resolveSlug(currentSlug, raw)}`;
      return (
        <a
          href={target}
          style={{ color: "var(--funky-secondary)", fontWeight: 700 }}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            navigate(target);
          }}
        >
          {children}
        </a>
      );
    },
    ul: ({ children }) => <ul style={{ margin: "0 0 1rem", paddingLeft: "1.4rem", lineHeight: 1.7 }}>{children}</ul>,
    ol: ({ children }) => <ol style={{ margin: "0 0 1rem", paddingLeft: "1.4rem", lineHeight: 1.7 }}>{children}</ol>,
    li: ({ children }) => <li style={{ marginBottom: "0.3rem" }}>{children}</li>,
    strong: ({ children }) => <strong style={{ fontWeight: 900 }}>{children}</strong>,
    hr: () => <hr style={{ border: "none", borderTop: "var(--funky-border)", margin: "2rem 0" }} />,
    blockquote: ({ children }) => (
      <div style={{ margin: "0 0 1rem", padding: "0.85rem 1rem", background: "var(--funky-accent-soft)", border: "var(--funky-border)", boxShadow: "var(--funky-shadow-sm)" }}>{children}</div>
    ),
    code: ({ className, children }) => {
      const text = String(children).replace(/\n$/, "");
      const isBlock = /language-/.test(className ?? "") || text.includes("\n");
      if (isBlock) {
        return (
          <pre style={{ margin: "0 0 1rem", padding: "0.9rem 1.1rem", background: "var(--funky-ink)", color: "var(--funky-ink-inverse)", border: "var(--funky-border)", boxShadow: "var(--funky-shadow-sm)", overflowX: "auto", fontFamily: codeFont, fontSize: "0.8125rem", lineHeight: 1.55 }}>
            <code>{text}</code>
          </pre>
        );
      }
      return <code style={{ fontFamily: codeFont, fontSize: "0.85em", background: "var(--site-raised)", border: "1px solid rgba(0,0,0,0.15)", padding: "0.1em 0.35em" }}>{children}</code>;
    },
    pre: ({ children }) => <>{children}</>,
    table: ({ children }) => (
      <div style={{ overflowX: "auto", margin: "0 0 1rem" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", border: "var(--funky-border)", fontSize: "0.8125rem" }}>{children as ReactNode}</table>
      </div>
    ),
    th: ({ children }) => <th style={{ textAlign: "left", padding: "0.5rem 0.7rem", borderBottom: "var(--funky-border)", borderRight: "1px solid rgba(0,0,0,0.15)", background: "var(--site-raised)", fontFamily: "var(--funky-font-family)", fontWeight: 900, textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.04em" }}>{children}</th>,
    td: ({ children }) => <td style={{ padding: "0.5rem 0.7rem", borderBottom: "1px solid rgba(0,0,0,0.12)", borderRight: "1px solid rgba(0,0,0,0.12)", verticalAlign: "top", lineHeight: 2 }}>{children}</td>,
  };

  return (
    <div style={{ fontFamily: "var(--funky-font-family)", fontSize: "0.9375rem", color: "var(--funky-ink)" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
