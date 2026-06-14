// Codegen: src/tokens.ts (SSOT) → src/tokens.css (generated artifact).
//
//   node scripts/gen-tokens.ts      (Node ≥23.6 strips TS types natively — no deps)
//
// tokens.ts holds the *values* (typed, JS-importable); this script mirrors them
// into CSS custom properties so styles.css can `var(--funky-…)` them at runtime.
// Never hand-edit tokens.css — edit tokens.ts and re-run.
//
// accent variant×field, font role 합성, sizing 묶음은 여기서 빌드타임에 정적으로 펼친다
// (런타임 JS 색 계산 0 — retro 가 SSR 로 좌초한 길을 구조적으로 피한 지점).

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  color,
  role,
  accent,
  roleColor,
  shadow,
  press,
  radius,
  border,
  space,
  font,
  control,
  label,
  atom,
  motion,
} from "../src/tokens.ts";

const PREFIX = "--funky-";

const decls: string[] = [];
const v = (name: string, value: string | number) =>
  decls.push(`  ${PREFIX}${name}: ${value};`);
const blank = () => decls.push("");
const note = (text: string) => decls.push(`  /* ${text} */`);

// ───── WCAG 대비 — 검증·경고 전용 (결정은 손으로, 알고리즘 위임 X) ──────────
const hexToLin = (c8: number): number => {
  const c = c8 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const relLum = (hex: string): number => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * hexToLin(r) + 0.7152 * hexToLin(g) + 0.0722 * hexToLin(b);
};
const contrast = (a: string, b: string): number => {
  const l1 = relLum(a);
  const l2 = relLum(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
};
const pickFg = (bg: string): string =>
  contrast(bg, "#ffffff") >= contrast(bg, "#000000") ? "#ffffff" : "#000000";

// ───── :root 변수 선언 ──────────────────────────────────────────────────────
note("Color: surface");
v("bg", color.bg);
v("surface", color.surface);
v("sunken", color.sunken);
note("Color: ink");
v("ink", color.ink);
v("ink-muted", color.inkMuted);
v("ink-inverse", color.inkInverse);
note("Color: line");
v("line", color.line);
note("Color: accents (neon — vibe 이름, 값 동결)");
v("pink", color.pink);
v("purple", color.purple);
v("cyan", color.cyan);
v("yellow", color.yellow);
v("orange", color.orange);
v("sky", color.sky);
v("green", color.green);
v("red", color.red);
v("accent-soft", color.accentSoft);
note("Role aliases (의미 축 — accent 색의 별칭)");
v("primary", role.primary);
v("secondary", role.secondary);
v("success", role.success);
v("warning", role.warning);
v("danger", role.danger);
v("info", role.info);
blank();

// ── Accent 3-layer 펼치기 — color × variant × field (정적, 런타임 0) ────────
note("Accent variants — {color}-{variant}-{field}  (variant: solid/soft/outline/ghost)");
// variant → field 매핑 (색 무관, 1회 정의). field 이름은 CSS var suffix 그대로.
const VARIANTS: Record<string, Record<string, string>> = {
  solid: { bg: "fill", "bg-hover": "fillHover", fg: "onFill", border: "line" },
  soft: { bg: "soft", "bg-hover": "softHover", fg: "text", border: "line" },
  outline: { bg: "surface", "bg-hover": "soft", fg: "text", border: "fill" },
  ghost: { bg: "transparent", "bg-hover": "soft", fg: "text", border: "transparent" },
};
const FIELDS = ["bg", "bg-hover", "fg", "border"];
const tokenVar = (name: string): string => `var(${PREFIX}${name})`;
const resolveField = (a: typeof accent.pink, key: string): string => {
  if (key === "onFill") return tokenVar(a.onFill === "ink" ? "ink" : "ink-inverse");
  if (key === "line") return tokenVar("line");
  if (key === "surface") return tokenVar("surface");
  if (key === "transparent") return "transparent";
  return (a as Record<string, string>)[key]; // fill/fillHover/soft/softHover/text
};

for (const [c, a] of Object.entries(accent)) {
  // 대비 검증 — 경고만(brutalist 는 의도적으로 네온 위 검정을 쓰기도 하므로 빌드 실패 X)
  const onFillHex = a.onFill === "ink" ? color.ink : color.inkInverse;
  const cr = contrast(a.fill, onFillHex);
  if (cr < 4.5) {
    const auto = pickFg(a.fill);
    console.warn(
      `⚠ accent-${c}-solid: contrast ${cr.toFixed(2)} < 4.5 (onFill=${a.onFill}; pickFg→${auto})`,
    );
  }
  for (const [vName, map] of Object.entries(VARIANTS))
    for (const f of FIELDS) v(`accent-${c}-${vName}-${f}`, resolveField(a, map[f]));
}
blank();
note("Accent role aliases — {role}-{variant}-{field} = var(color)  (의미→색 재참조)");
for (const [r, c] of Object.entries(roleColor))
  for (const vName of Object.keys(VARIANTS))
    for (const f of FIELDS)
      v(`accent-${r}-${vName}-${f}`, `var(${PREFIX}accent-${c}-${vName}-${f})`);
blank();

note("Shadow: hard offset solid (blur 0)");
v("shadow-sm", shadow.sm);
v("shadow-md", shadow.md);
v("shadow-lg", shadow.lg);
note("Press-into-shadow (depth 4 파생)");
v("shadow-hover", press.hoverShadow);
v("press-hover", press.hoverShift);
blank();

note("Shape");
v("radius", radius.none);
v("border-width", border.width);
v("border-width-bold", border.widthBold);
v("border-color", border.color);
v("border", `${border.width} solid ${border.color}`);
v("border-bold", `${border.widthBold} solid ${border.color}`);
blank();

note("Space");
v("space-xs", space.xs);
v("space-sm", space.sm);
v("space-md", space.md);
v("space-lg", space.lg);
v("space-xl", space.xl);
v("space-2xl", space["2xl"]);
blank();

note("Type: family · weight");
v("font-family", font.family);
v("font-mono", font.mono);
v("weight-regular", font.weight.regular);
v("weight-medium", font.weight.medium);
v("weight-bold", font.weight.bold);
v("weight-black", font.weight.black);
note("Type: size ladder");
v("size-2xs", font.size["2xs"]);
v("size-xs", font.size.xs);
v("size-sm", font.size.sm);
v("size-md", font.size.md);
v("size-lg", font.size.lg);
v("size-xl", font.size.xl);
v("size-2xl", font.size["2xl"]);
v("size-3xl", font.size["3xl"]);
v("size-4xl", font.size["4xl"]);
note("Type: line-height · tracking 원자");
for (const [k, val] of Object.entries(font.lineHeight)) v(`leading-${k}`, val);
for (const [k, val] of Object.entries(font.tracking)) v(`tracking-${k}`, val);
note("Type: chrome preset (하위호환)");
v("chrome-transform", font.chrome.transform);
v("chrome-tracking", font.chrome.tracking);
blank();

note("Control sizing — height · padX · fontSize (Button·Input·Select·Tab)");
for (const s of ["sm", "md", "lg"] as const) {
  v(`control-${s}`, control[s].height); // = height (기존 control-md 호환)
  v(`control-padx-${s}`, control[s].padX);
  v(`control-fs-${s}`, control[s].fontSize);
}
note("Label sizing — Badge · Tag · Chip");
for (const s of ["sm", "md", "lg"] as const) {
  v(`label-h-${s}`, label[s].height);
  v(`label-padx-${s}`, label[s].padX);
  v(`label-fs-${s}`, label[s].fontSize);
}
note("Atom intrinsic sizing");
v("checkbox-size", atom.checkbox);
v("radio-size", atom.radio);
v("switch-w", atom.switchW);
v("switch-h", atom.switchH);
v("switch-gap", atom.switchGap);
v("switch-thumb", atom.switchThumb);
v("switch-travel", atom.switchTravel);
blank();

note("Motion: timing");
v("motion-duration", motion.duration); // 하위호환 (= duration-snap)
v("motion-easing", motion.easing);
v("press-offset", motion.pressOffset);
note("Motion: duration scale (snap 미세피드백 · base 전환 · slow reveal) + stagger");
v("duration-snap", motion.durations.snap);
v("duration-base", motion.durations.base);
v("duration-slow", motion.durations.slow);
v("stagger", motion.stagger);
note("Motion: transition bundles (흔한 조합 — 손 재나열 대체)");
// press(눌림): 그림자+본체 이동+면색. lift(떠오름): 그림자만. tint: 면색·글자색만.
const _t = (props: string[]) => props.map((p) => `${p} ${motion.duration} ${motion.easing}`).join(", ");
v("transition-press", _t(["box-shadow", "transform", "background-color"]));
v("transition-lift", _t(["box-shadow"]));
v("transition-tint", _t(["background-color", "color"]));

// ───── font role 합성 → 정적 클래스 (CSS 변수로 안 펼침 = 폭발 회피) ────────
const roleBlocks = Object.entries(font.role)
  .map(([name, r]) => {
    const rr = r as Record<string, string>;
    const lines = [
      `  font-size: var(${PREFIX}size-${rr.size});`,
      `  font-weight: var(${PREFIX}weight-${rr.weight});`,
    ];
    if ("lineHeight" in rr) lines.push(`  line-height: var(${PREFIX}leading-${rr.lineHeight});`);
    if ("tracking" in rr) lines.push(`  letter-spacing: var(${PREFIX}tracking-${rr.tracking});`);
    if ("transform" in rr) lines.push(`  text-transform: ${rr.transform};`);
    if ("family" in rr) lines.push(`  font-family: var(${PREFIX}font-${rr.family});`);
    return `.funky-text--${name} {\n${lines.join("\n")}\n}`;
  })
  .join("\n\n");

const css = `/* AUTO-GENERATED by scripts/gen-tokens.ts — do not edit.
   Source of truth is src/tokens.ts. Re-run: node scripts/gen-tokens.ts */

@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");

:root {
${decls.join("\n")}
}

/* ── Base reset ── */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(${PREFIX}bg);
  color: var(${PREFIX}ink);
  font-family: var(${PREFIX}font-family);
  font-size: var(${PREFIX}size-md);
  -webkit-font-smoothing: antialiased;
}

/* ── Helper utility classes (optional reuse) ── */
.funky-shadow-sm { box-shadow: var(${PREFIX}shadow-sm); }
.funky-shadow-md { box-shadow: var(${PREFIX}shadow-md); }
.funky-shadow-lg { box-shadow: var(${PREFIX}shadow-lg); }
.funky-border { border: var(${PREFIX}border); }
.funky-chrome {
  text-transform: var(${PREFIX}chrome-transform);
  font-weight: var(${PREFIX}weight-black);
  letter-spacing: var(${PREFIX}chrome-tracking);
}

/* ── Type roles (font.role 합성 — .funky-text base 와 합성) ── */
${roleBlocks}
`;

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, "../src/tokens.css");
writeFileSync(out, css);
console.log(`✓ wrote ${out} (${decls.filter((l) => l.includes(":")).length} tokens)`);
