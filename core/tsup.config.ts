import { defineConfig } from "tsup";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

// funky-ui — library build.
// JS + types come from src/index.ts; the two stylesheets are static CSS
// (no compile step), so we just copy them into dist alongside the bundle.
export default defineConfig({
  // Two entries: the main bundle (react-only) and an optional markdown bundle
  // that carries the heavy react-markdown/katex deps. Consumers who only use
  // form/docs components never pull in the markdown deps.
  entry: ["src/index.ts", "src/markdown.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react-markdown",
    "remark-gfm",
    "remark-math",
    "rehype-slug",
    "rehype-katex",
    "katex",
    "github-slugger",
  ],
  onSuccess: async () => {
    const out = resolve(__dirname, "dist");
    for (const f of ["styles.css", "tokens.css", "markdown.css"]) {
      copyFileSync(resolve(__dirname, "src", f), resolve(out, f));
    }
  },
});
