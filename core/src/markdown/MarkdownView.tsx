import type { MouseEvent, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";

const isExternal = (href: string) => /^https?:\/\//.test(href) || href.startsWith("mailto:");

export interface MarkdownViewProps {
  content: string;
  /** enable LaTeX (remark-math + rehype-katex). import "@studio-baeks/funky-ui/markdown.css" for KaTeX styles. */
  math?: boolean;
  /** intercept internal link clicks — raw href + event (modifier-clicks & external/anchor links pass through). */
  onLinkClick?: (href: string, e: MouseEvent<HTMLAnchorElement>) => void;
  /** transform a raw href before render (e.g. resolve relative .md links to routes). */
  resolveHref?: (href: string) => string;
  /** override / extend the element mapping. */
  components?: Partial<Components>;
}

/**
 * MarkdownView — funky-ui markdown renderer (heading scale, ink code blocks,
 * .funky-table tables, optional KaTeX). Router-free: pass onLinkClick to handle
 * internal navigation. Lives on the "@studio-baeks/funky-ui/markdown" subpath
 * because it carries the heavy react-markdown/katex deps.
 */
export function MarkdownView({
  content,
  math = false,
  onLinkClick,
  resolveHref,
  components: override,
}: MarkdownViewProps) {
  const remarkPlugins = math ? [remarkGfm, remarkMath] : [remarkGfm];
  const rehypePlugins = math ? [rehypeSlug, rehypeKatex] : [rehypeSlug];

  const components: Components = {
    h1: ({ children, id }) => <h1 id={id} className="funky-md__h1">{children}</h1>,
    h2: ({ children, id }) => <h2 id={id} className="funky-md__h2">{children}</h2>,
    h3: ({ children, id }) => <h3 id={id} className="funky-md__h3">{children}</h3>,
    h4: ({ children, id }) => <h4 id={id} className="funky-md__h4">{children}</h4>,
    p: ({ children }) => <p className="funky-md__p">{children}</p>,
    a: ({ href, children }) => {
      const raw = href ?? "#";
      const target = resolveHref ? resolveHref(raw) : raw;
      const ext = isExternal(raw);
      return (
        <a
          className="funky-md__a"
          href={target}
          {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
          onClick={(e) => {
            if (ext || raw.startsWith("#") || !onLinkClick) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            onLinkClick(raw, e);
          }}
        >
          {children}
        </a>
      );
    },
    ul: ({ children }) => <ul className="funky-md__ul">{children}</ul>,
    ol: ({ children }) => <ol className="funky-md__ol">{children}</ol>,
    li: ({ children }) => <li className="funky-md__li">{children}</li>,
    strong: ({ children }) => <strong className="funky-md__strong">{children}</strong>,
    hr: () => <hr className="funky-md__hr" />,
    blockquote: ({ children }) => <blockquote className="funky-md__blockquote">{children}</blockquote>,
    code: ({ className, children }) => {
      const text = String(children).replace(/\n$/, "");
      const isBlock = /language-/.test(className ?? "") || text.includes("\n");
      if (isBlock) {
        return (
          <pre className="funky-md__pre">
            <code>{text}</code>
          </pre>
        );
      }
      return <code className="funky-md__code">{children}</code>;
    },
    pre: ({ children }) => <>{children}</>,
    table: ({ children }) => (
      <div className="funky-table__scroll">
        <table className="funky-table">{children as ReactNode}</table>
      </div>
    ),
    ...override,
  };

  return (
    <div className="funky-md">
      <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
