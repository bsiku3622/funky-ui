/** 문서 — 마크다운을 funky 글자로 그립니다 */
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import { Link, Text } from "@studio-baeks/funky-ui";

import { code as codeClass, inlineCode, narrow } from "../site/site.css";
import * as k from "../playground/kit.css";
import { DOCS } from "./docs-content";
import { prose } from "./docs.css";

/** 문서 사이 상대 링크(`./color.md`, `../atoms/README.md#button`)를 사이트 주소로 */
function resolveHref(from: string, href: string): string {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [file = "", hash] = href.split("#");
  if (!file.endsWith(".md")) return href;
  const base = from.split("/").slice(0, -1);
  for (const part of file.split("/")) {
    if (part === "..") base.pop();
    else if (part !== ".") base.push(part);
  }
  return `/docs/${base.join("/").replace(/\.md$/, "")}${hash ? `#${hash}` : ""}`;
}

export function Docs() {
  const params = useParams();
  const path = params["*"] || "README";
  const doc = DOCS[path];
  if (!doc) return DOCS.README ? <Navigate to="/docs" replace /> : <Text>문서가 없습니다.</Text>;
  return (
    <article className={`${prose} ${narrow}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children }) => {
            const to = resolveHref(doc.path, href);
            return to.startsWith("/") ? (
              <Link as={RouterLink} to={to} accent="purple">
                {children as ReactNode}
              </Link>
            ) : (
              <Link href={to} accent="purple" target={to.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {children as ReactNode}
              </Link>
            );
          },
          code: ({ className, children }) =>
            className ? <code className={className}>{children}</code> : <code className={inlineCode}>{children}</code>,
          pre: ({ children }) => <pre className={codeClass}>{children}</pre>,
          table: ({ children }) => (
            <div style={{ overflowX: "auto" }}>
              <table className={k.table}>{children}</table>
            </div>
          ),
          th: ({ children }) => <th className={k.th}>{children}</th>,
          td: ({ children }) => <td className={k.td}>{children}</td>,
        }}
      >
        {doc.text}
      </ReactMarkdown>
    </article>
  );
}
