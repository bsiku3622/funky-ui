/**
 * 문서 목록 — 레포 루트 docs/ 를 복사 없이 그대로 읽습니다. 순서와 묶음은 여기 DOC_GROUPS 가 정하고,
 * 제목은 각 문서의 첫 줄(`# 제목`)입니다.
 */
// ⚠️ alias("@docs/**") 로 쓴 glob 이 빈 객체로 풀렸습니다(앱 root 밖의 폴더) — 파일 기준 상대 경로로 씁니다
const RAW = import.meta.glob("../../../../docs/**/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export interface Doc {
  path: string;
  title: string;
  text: string;
}

const pathOf = (key: string) => key.slice(key.lastIndexOf("/docs/") + "/docs/".length).replace(/\.md$/, "");

export const DOCS: Record<string, Doc> = Object.fromEntries(
  Object.entries(RAW).map(([key, text]) => {
    const path = pathOf(key);
    return [path, { path, text, title: text.match(/^# (.+)$/m)?.[1]?.trim() ?? path }];
  }),
);

const ORDER: { title: string; paths: string[] }[] = [
  { title: "Get started", paths: ["README", "get-started/install", "get-started/principles"] },
  { title: "Foundations", paths: ["foundations/README", "foundations/color", "foundations/typography", "foundations/shape", "foundations/layout", "foundations/motion"] },
  { title: "Layers", paths: ["primitives/README", "atoms/README", "molecules/README", "components/README"] },
  { title: "class-explorer", paths: ["class-explorer/inventory", "class-explorer/migration"] },
];

export const DOC_GROUPS = ORDER.map((g) => ({
  title: g.title,
  docs: g.paths.filter((p) => DOCS[p]).map((p) => DOCS[p]!),
}));
