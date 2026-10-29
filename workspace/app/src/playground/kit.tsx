/** Playground 표본 도구 — 판(Stage) · accent × variant 행렬 · 페이지 머리 */
import type { ReactNode } from "react";
import { Badge, Stack, Text, type AccentName, type Variant } from "@studio-baeks/funky-ui";
import { ACCENTS, ACCENT_ROLES, VARIANTS, VARIANT_RECIPES, type VariantRecipe } from "@studio-baeks/funky-ui/tokens";

import * as k from "./kit.css";

export function PageHead({ layer, title, summary, children }: { layer: string; title: string; summary?: ReactNode; children?: ReactNode }) {
  return (
    <header className={k.pageHead}>
      <Text variant="overline">{layer}</Text>
      <Text as="h1" variant="display">
        {title}
      </Text>
      {summary && (
        <Text as="p" tone="secondary" style={{ maxWidth: 720, margin: 0 }}>
          {summary}
        </Text>
      )}
      {children}
    </header>
  );
}

export function Stage({ bg = "canvas", children }: { bg?: "canvas" | "raised" | "brand"; children: ReactNode }) {
  return <div className={`${k.stage} ${k.stageBg[bg]}`}>{children}</div>;
}

export function Section({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section className={k.section}>
      <Stack gap="xs">
        <Text as="h2" variant="subtitle">
          {title}
        </Text>
        {note && (
          <Text as="p" variant="caption" tone="muted" style={{ margin: 0, maxWidth: 760 }}>
            {note}
          </Text>
        )}
      </Stack>
      {children}
    </section>
  );
}

const ROLE_OF = Object.fromEntries(Object.entries(ACCENT_ROLES).map(([role, color]) => [color, role])) as Partial<Record<AccentName, string>>;

/** 레시피를 한 줄로 — 재원님 스케치의 FG / BG / Border / Hover 표기 */
export function recipeLine(r: VariantRecipe): string {
  const name = (s: string) => (s === "none" ? "—" : s);
  const hover = [
    r.hover.layer && `${r.hover.layer} overlay`,
    r.hover.border && `border → ${r.hover.border}`,
    r.hover.fg && `fg → ${r.hover.fg}`,
  ]
    .filter(Boolean)
    .join(", ");
  return `${name(r.fg)} / ${name(r.bg)} / ${name(r.border)} / ${hover}`;
}

/** 행은 variant 11, 열은 accent 9 — 칸마다 `cell(accent, variant)` 을 그립니다 */
export function AccentVariantMatrix({ cell, bg = "raised" }: { cell: (accent: AccentName, variant: Variant) => ReactNode; bg?: "canvas" | "raised" }) {
  return (
    <div className={`${k.matrix} ${k.stageBg[bg]}`} style={{ gridTemplateColumns: `190px repeat(${ACCENTS.length}, minmax(96px, 1fr))` }}>
      <div className={k.matrixHead}>variant \ accent</div>
      {ACCENTS.map((a) => (
        <div key={a} className={k.matrixHead} style={{ borderLeft: "2px solid rgba(255,255,255,0.3)", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
          {a}
          {ROLE_OF[a] && <span style={{ opacity: 0.6, letterSpacing: "0.05em" }}>{ROLE_OF[a]}</span>}
        </div>
      ))}
      {VARIANTS.map((v) => (
        <MatrixRow key={v} variant={v} cell={cell} />
      ))}
    </div>
  );
}

function MatrixRow({ variant, cell }: { variant: Variant; cell: (accent: AccentName, variant: Variant) => ReactNode }) {
  return (
    <>
      <div className={k.matrixRowHead}>
        <span>{variant}</span>
        <span className={k.mono} style={{ color: "#6f6f6f", fontSize: "0.625rem" }}>
          {recipeLine(VARIANT_RECIPES[variant])}
        </span>
      </div>
      {ACCENTS.map((a) => (
        <div key={a} className={k.matrixCell}>
          {cell(a, variant)}
        </div>
      ))}
    </>
  );
}

export function LayerBadge({ layer }: { layer: string }) {
  return (
    <Badge variant={layer === "components" ? "solid" : "outline"} accent={layer === "components" ? "purple" : undefined} size="sm">
      {layer}
    </Badge>
  );
}
