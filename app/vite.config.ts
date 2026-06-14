import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const CORE_DIR = path.resolve(__dirname, "../core");
const DOCS_DIR = path.resolve(__dirname, "../docs");

/** Reload the page when markdown docs (outside the vite root) change. */
const watchDocs = () => ({
  name: "watch-docs",
  configureServer(server: any) {
    server.watcher.add(DOCS_DIR);
    const reload = (file: string) => {
      if (file.endsWith(".md")) server.ws.send({ type: "full-reload", path: "*" });
    };
    server.watcher.on("change", reload);
    server.watcher.on("add", reload);
    server.watcher.on("unlink", reload);
  },
});

export default defineConfig({
  plugins: [react(), watchDocs()],
  resolve: {
    alias: {
      "@studio-baeks/funky-ui/styles.css": path.resolve(CORE_DIR, "src/styles.css"),
      "@studio-baeks/funky-ui/markdown.css": path.resolve(CORE_DIR, "src/markdown.css"),
      "@studio-baeks/funky-ui/markdown": path.resolve(CORE_DIR, "src/markdown.ts"),
      "@studio-baeks/funky-ui": path.resolve(CORE_DIR, "src/index.ts"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react-router-dom",
      "react-markdown",
      "remark-gfm",
      "remark-math",
      "rehype-slug",
      "rehype-katex",
      "katex",
      "github-slugger",
    ],
  },
  server: {
    fs: { allow: [path.resolve(__dirname, ".."), CORE_DIR, DOCS_DIR] },
  },
});
