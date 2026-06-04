#!/usr/bin/env node
// Build docs API — mirrors funky-ui/docs/ to funky-ui/app/public/docs/api/.
//
// funky-ui keeps a small catalog with one markdown file per layer (atoms.md
// already holds every atom), so there is no catalog-inline step: this is a
// straight recursive copy. The llms.txt entry point is copied to public/ too.
//
// URL scheme (when deployed):
//   /docs/api/{path}.md   → raw markdown
//   /llms.txt             → AI entry point

import { readFile, writeFile, mkdir, readdir, copyFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "../..");
const DOCS_SRC = path.join(REPO_ROOT, "docs");
const PUBLIC_DIR = path.join(REPO_ROOT, "app/public");
const API_OUT = path.join(PUBLIC_DIR, "docs/api");

async function mirrorDir(srcDir, outDir) {
  await mkdir(outDir, { recursive: true });
  const entries = await readdir(srcDir, { withFileTypes: true });
  let emitted = 0;
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    const src = path.join(srcDir, e.name);
    const out = path.join(outDir, e.name);
    if (e.isDirectory()) {
      emitted += await mirrorDir(src, out);
    } else if (e.isFile() && e.name.endsWith(".md")) {
      await writeFile(out, await readFile(src, "utf-8"));
      emitted++;
    }
  }
  return emitted;
}

async function main() {
  if (!existsSync(DOCS_SRC)) {
    console.error(`docs source not found: ${DOCS_SRC}`);
    process.exit(1);
  }

  // Clean output so deleted docs don't linger.
  if (existsSync(API_OUT)) await rm(API_OUT, { recursive: true });
  await mkdir(API_OUT, { recursive: true });

  const emitted = await mirrorDir(DOCS_SRC, API_OUT);

  const llmsSrc = path.join(REPO_ROOT, "llms.txt");
  if (existsSync(llmsSrc)) {
    await copyFile(llmsSrc, path.join(PUBLIC_DIR, "llms.txt"));
  } else {
    console.warn("llms.txt not found at repo root — skipped");
  }

  console.log(`docs API built → ${path.relative(REPO_ROOT, API_OUT)}`);
  console.log(`  markdown files emitted: ${emitted}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
