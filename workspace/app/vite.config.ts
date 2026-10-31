import { fileURLToPath } from "node:url";
import { defaultClientConditions, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const workspace = fileURLToPath(new URL("..", import.meta.url));
const docs = fileURLToPath(new URL("../../docs", import.meta.url));

// workspace 의 @studio-baeks/funky-ui 를 dist 가 아니라 *소스* 로 풉니다 — package.json exports 의
// "funky-ui-source" 조건(tsconfig customConditions 와 같은 이름)을 먼저 봅니다. 그래서 vanilla-extract
// plugin 이 패키지의 .css.ts 를 직접 컴파일하고, 토큰을 고치면 곧바로 화면에 반영됩니다.
// 문서는 레포 루트의 docs/ 를 "@docs" 로 곧바로 읽습니다 — 복사본이 없습니다.
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: { "@docs": docs },
    conditions: ["funky-ui-source", ...defaultClientConditions],
  },
  server: { port: 5190, fs: { allow: [workspace, docs] } },
});
