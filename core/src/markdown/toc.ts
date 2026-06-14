import GithubSlugger from "github-slugger";
import type { TocItem } from "../components/Toc";

/** strip the common inline markdown so the TOC label reads as plain text */
function stripInline(s: string): string {
  return s
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
}

/**
 * extractToc — pull h2~h4 headings out of a markdown string into TocItem[].
 * IDs are github-slugger slugs, matching rehype-slug output so on-page jumps
 * line up with MarkdownView. (h1 is treated as the document title and skipped.)
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{1,4})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const depth = m[1].length;
    if (depth < 2) continue;
    const text = stripInline(m[2]);
    items.push({ id: slugger.slug(text), text, depth });
  }
  return items;
}
