import { defineConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

import pkg from "./package.json" with { type: "json" };

// 런타임 의존성은 번들 밖에 둡니다 — 목록은 package.json 하나입니다.
const external = Object.keys(pkg.peerDependencies);

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  build: {
    target: "es2022",
    lib: {
      // styles 는 전역 스타일시트(dist/funky-ui.css)를 싣는 entry 입니다. JS 는 내보내지 않습니다.
      entry: { styles: "src/styles/global.css.ts", index: "src/index.ts", tokens: "src/tokens/public.ts" },
      formats: ["es"],
      fileName: (_, name) => `${name}.js`,
      cssFileName: "funky-ui",
    },
    rollupOptions: {
      external: (id) => external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        banner: (chunk) => (chunk.isEntry && chunk.name === "index" ? '"use client";' : ""),
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
  },
});
