// Markdown docs live at funky-ui/docs/*.md (outside the app, shared content).
// Vite discovers them at build time; content loads lazily per slug.
const MD_GLOB = import.meta.glob<string>("../../../../docs/**/*.md", {
  query: "?raw",
  import: "default",
});

const pathToSlug = (filepath: string): string => {
  const m = filepath.match(/\/docs\/(.*)\.md$/);
  if (!m || !m[1]) return "";
  const raw = m[1];
  if (raw === "README") return "";
  if (raw.endsWith("/README")) return raw.slice(0, -"/README".length);
  return raw;
};

const slugToLoader = new Map<string, () => Promise<string>>();
for (const [path, loader] of Object.entries(MD_GLOB)) {
  slugToLoader.set(pathToSlug(path), loader as () => Promise<string>);
}

export interface DocMeta {
  slug: string;
  title: string;
}

const TITLES: Record<string, string> = {
  "": "Introduction",
  "get-started/install": "설치",
  "get-started/principles": "원칙",
  "foundations/architecture": "아키텍처",
  "foundations/tokens": "토큰",
  "foundations/composition": "Composition",
  "components/atoms": "Atoms",
  "components/components": "Components",
  "components/templates": "Templates",
};

const titleFor = (slug: string): string =>
  TITLES[slug] ?? slug.split("/").pop() ?? slug;

export const DOC_GROUPS: { title: string; docs: DocMeta[] }[] = [
  { title: "", slugs: [""] },
  { title: "Get Started", slugs: ["get-started/install", "get-started/principles"] },
  { title: "Foundations", slugs: ["foundations/architecture", "foundations/tokens", "foundations/composition"] },
  { title: "Components", slugs: ["components/atoms", "components/components", "components/templates"] },
].map((g) => ({
  title: g.title,
  docs: g.slugs
    .filter((s) => slugToLoader.has(s))
    .map((s) => ({ slug: s, title: titleFor(s) })),
}));

export const hasDoc = (slug: string) => slugToLoader.has(slug);

export const titleOf = (slug: string) => titleFor(slug);

export const loadDocContent = async (slug: string): Promise<string | undefined> => {
  const loader = slugToLoader.get(slug);
  return loader ? loader() : undefined;
};
