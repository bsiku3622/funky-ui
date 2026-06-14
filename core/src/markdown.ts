// funky-ui — markdown subpath entry.
// Carries the heavy react-markdown/katex deps so the main bundle stays react-only.
//   import { MarkdownView, extractToc } from "@studio-baeks/funky-ui/markdown";
//   import "@studio-baeks/funky-ui/markdown.css";   // (+ KaTeX styles, when math is on)

export { MarkdownView } from "./markdown/MarkdownView";
export type { MarkdownViewProps } from "./markdown/MarkdownView";
export { extractToc } from "./markdown/toc";

/* Toc is pure-react (also on the main entry) — re-exported here for convenience
   so a docs consumer can grab the renderer, the extractor, and the rail together. */
export { Toc } from "./components/Toc";
export type { TocItem, TocProps } from "./components/Toc";
