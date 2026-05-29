import { defineConfig } from "tsup";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

// funky-ui — library build.
// JS + types come from src/index.ts; the two stylesheets are static CSS
// (no compile step), so we just copy them into dist alongside the bundle.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  onSuccess: async () => {
    const out = resolve(__dirname, "dist");
    for (const f of ["styles.css", "tokens.css"]) {
      copyFileSync(resolve(__dirname, "src", f), resolve(out, f));
    }
  },
});
