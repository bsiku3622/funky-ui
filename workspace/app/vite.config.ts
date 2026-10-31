import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultClientConditions, defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const workspace = fileURLToPath(new URL("..", import.meta.url));
const docs = fileURLToPath(new URL("../../docs", import.meta.url));

const SITE = "https://funky-ui.bsiku.dev";

/**
 * docs/ 를 `/docs/api/` 아래 원문 마크다운으로도 내보냅니다. `llms.txt` 는 그 목차입니다.
 * ⚠️ AI 도구(`funky-ui` 스킬)가 이 주소를 읽습니다. 지우면 SPA 로 떨어져 200 + HTML 이 돌아와서 오류로 보이지도 않습니다.
 */
function rawDocs(): Plugin {
  return {
    name: "funky-raw-docs",
    apply: "build",
    generateBundle() {
      const files = readdirSync(docs, { recursive: true, encoding: "utf8" })
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replaceAll("\\", "/"))
        .sort();
      const lines = files.map((file) => {
        const source = readFileSync(join(docs, file), "utf8");
        this.emitFile({ type: "asset", fileName: `docs/api/${file}`, source });
        const title = source.match(/^# (.+)$/m)?.[1] ?? file;
        return `- [${title}](${SITE}/docs/api/${file})`;
      });
      this.emitFile({
        type: "asset",
        fileName: "llms.txt",
        source: `# funky-ui\n\n> Neo-brutalist React design system for Class Explorer. npm: @studio-baeks/funky-ui\n\n## Docs\n\n${lines.join("\n")}\n`,
      });
    },
  };
}

// workspace 의 @studio-baeks/funky-ui 를 dist 가 아니라 *소스* 로 풉니다 — package.json exports 의
// "funky-ui-source" 조건(tsconfig customConditions 와 같은 이름)을 먼저 봅니다. 그래서 vanilla-extract
// plugin 이 패키지의 .css.ts 를 직접 컴파일하고, 토큰을 고치면 곧바로 화면에 반영됩니다.
// 문서는 레포 루트의 docs/ 를 "@docs" 로 곧바로 읽습니다 — 복사본이 없습니다.
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), rawDocs()],
  resolve: {
    alias: { "@docs": docs },
    conditions: ["funky-ui-source", ...defaultClientConditions],
  },
  server: { port: 5190, fs: { allow: [workspace, docs] } },
});
