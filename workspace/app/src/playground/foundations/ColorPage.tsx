/** Foundations › Color — 면 · 잉크 · 선 → accent 사다리 → variant 레시피 → 오버레이 · 포커스 */
import { Badge, Button, Grid, Inline, Stack, Surface, Text } from "@studio-baeks/funky-ui";
import {
  ACCENTS,
  ACCENT_COLORS,
  ACCENT_ROLES,
  FOCUS,
  INK,
  LINE,
  NEUTRALS,
  OVERLAY,
  SURFACE,
  VARIANTS,
  VARIANT_RECIPES,
  type VariantRecipe,
} from "@studio-baeks/funky-ui/tokens";

import { AccentVariantMatrix, PageHead, Section, Stage } from "../kit";
import * as k from "../kit.css";
import { contrast, ratio } from "./contrast";

const CREAM = NEUTRALS.cream;

function Swatch({ name, value, note, ground = "#ffffff" }: { name: string; value: string; note?: string; ground?: string }) {
  return (
    <Stack gap="xs">
      <div className={k.swatch} style={{ background: `linear-gradient(${value}, ${value}), ${ground}` }} />
      <Text variant="caption" weight="black">
        {name}
      </Text>
      <span className={k.mono}>{value}</span>
      {note && (
        <Text variant="micro" tone="muted" weight="bold">
          {note}
        </Text>
      )}
    </Stack>
  );
}

const RUNGS = ["ink", "solidInk", "solid", "soft", "softInk"] as const;
const RUNG_NOTE: Record<(typeof RUNGS)[number], string> = {
  ink: "Solid 면 위 글자 — 검정/흰색 중 대비가 높은 쪽",
  solidInk: "진한 글자 — 크림 위 7:1 이상",
  solid: "진한 면 · 테두리 — 네온 원색",
  soft: "연한 면 · 테두리 — 흰 면 대비 1.35",
  softInk: "연한 글자 — 크림 위 AA(4.5:1)",
};

const ROLE_OF = Object.fromEntries(Object.entries(ACCENT_ROLES).map(([r, c]) => [c, r]));

export function ColorPage() {
  return (
    <div>
      <PageHead
        layer="foundations · 1"
        title="Color"
        summary="hex 는 palette.ts 한 파일에만 삽니다. 흐름은 palette → 역할(면 · 잉크 · 선 · accent 사다리) → variant 레시피 → class 입니다. 런타임에 색을 계산하지 않습니다."
      />

      <Section title="Surfaces" note="흑백 면에 자리의 이름을 붙였습니다 — 회색이 아니라 canvas · raised · sunken · well · inverse 입니다.">
        <Grid columns="repeat(auto-fill, minmax(140px, 1fr))" gap="xl">
          {Object.entries(SURFACE).map(([name, value]) => (
            <Swatch key={name} name={`surface.${name}`} value={value} ground={name === "well" ? "#ffffff" : undefined} />
          ))}
        </Grid>
      </Section>

      <Section title="Ink · Line" note="글자는 #222, 선은 #000 입니다. muted 는 AA 를 지키는 가장 옅은 회색이고, faint 는 장식 전용(AA 미달)입니다.">
        <Grid columns="repeat(auto-fill, minmax(140px, 1fr))" gap="xl">
          {Object.entries(INK).map(([name, value]) => (
            <Swatch key={name} name={`ink.${name}`} value={value} note={name.startsWith("inverse") ? "어두운 면 위" : `크림 위 ${ratio(contrast(value, CREAM))}`} ground={name.startsWith("inverse") ? "#000000" : CREAM} />
          ))}
          {Object.entries(LINE).map(([name, value]) => (
            <Swatch key={name} name={`line.${name}`} value={value} ground={name === "inverse" ? "#7828c8" : "#ffffff"} />
          ))}
        </Grid>
      </Section>

      <Section
        title="Accent 사다리"
        note="accent 하나가 다섯 칸을 갖습니다 — Ink · SolidInk · Solid · Soft · SoftInk. 괄호 안은 크림 위 대비입니다 (Ink 는 Solid 위 대비). 글자 칸은 hue 를 지킨 채 OKLCH 명도만 내려 목표 대비를 맞췄습니다."
      >
        <div style={{ overflowX: "auto" }}>
          <table className={k.table}>
            <thead>
              <tr>
                <th className={k.th}>accent</th>
                {RUNGS.map((r) => (
                  <th key={r} className={k.th} title={RUNG_NOTE[r]}>
                    {r}
                  </th>
                ))}
                <th className={k.th}>tint (hover)</th>
              </tr>
            </thead>
            <tbody>
              {ACCENTS.map((a) => {
                const c = ACCENT_COLORS[a];
                return (
                  <tr key={a}>
                    <td className={k.td}>
                      <Stack gap="2xs">
                        <Text variant="caption" weight="black">
                          {a}
                        </Text>
                        {ROLE_OF[a] && (
                          <Text variant="micro" tone="muted">
                            {ROLE_OF[a]}
                          </Text>
                        )}
                      </Stack>
                    </td>
                    {RUNGS.map((r) => {
                      const value = c[r];
                      const n = r === "ink" ? contrast(value, c.solid) : r === "solidInk" || r === "softInk" ? contrast(value, CREAM) : null;
                      const bg = r === "ink" ? c.solid : value;
                      return (
                        <td key={r} className={k.td}>
                          <Inline gap="md">
                            <span style={{ width: 28, height: 28, flexShrink: 0, border: "2px solid #000", background: bg, color: r === "ink" ? value : undefined, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>
                              {r === "ink" ? "가" : ""}
                            </span>
                            <Stack gap="2xs">
                              <span className={k.mono}>{value}</span>
                              {n !== null && (
                                <Badge size="sm" variant={n >= 4.5 ? "outline" : "filled"} accent={n >= 4.5 ? "black" : "red"}>
                                  {ratio(n)}
                                </Badge>
                              )}
                            </Stack>
                          </Inline>
                        </td>
                      );
                    })}
                    <td className={k.td}>
                      <span className={k.mono}>{c.tint}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        title="Variant 레시피"
        note="11 variant 가 사다리의 어느 칸을 글자 · 면 · 테두리에 쓰는지, hover 때 무엇이 바뀌는지. 숫자도 hex 도 없이 칸 이름만 있어서, accent 를 바꾸면 규칙은 그대로 둔 채 색만 바뀝니다. black · gray · line 은 accent 와 무관한 시스템 값입니다."
      >
        <div style={{ overflowX: "auto" }}>
          <table className={k.table}>
            <thead>
              <tr>
                {["#", "variant", "FG", "BG", "Border", "Hover", "black", "green", "purple"].map((h) => (
                  <th key={h} className={k.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VARIANTS.map((v, i) => {
                const r: VariantRecipe = VARIANT_RECIPES[v];
                const hover = [r.hover.layer && `${r.hover.layer} overlay`, r.hover.border && `border → ${r.hover.border}`, r.hover.fg && `fg → ${r.hover.fg}`]
                  .filter(Boolean)
                  .join(" · ");
                return (
                  <tr key={v}>
                    <td className={k.td}>{i + 1}</td>
                    <td className={k.td}>
                      <Text variant="caption" weight="black">
                        {v}
                      </Text>
                    </td>
                    <td className={k.td}>
                      <span className={k.mono}>{r.fg}</span>
                    </td>
                    <td className={k.td}>
                      <span className={k.mono}>{r.bg === "none" ? "—" : r.bg}</span>
                    </td>
                    <td className={k.td}>
                      <span className={k.mono}>{r.border === "none" ? "—" : r.border}</span>
                    </td>
                    <td className={k.td}>
                      <span className={k.mono}>{hover}</span>
                    </td>
                    {(["black", "green", "purple"] as const).map((a) => (
                      <td key={a} className={k.td}>
                        <Button size="xs" accent={a} variant={v}>
                          {v === "solid" || v === "filled" ? "선택" : "유지"}
                        </Button>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Text as="p" variant="caption" tone="muted" style={{ margin: 0, maxWidth: 760 }}>
          이름은 스케치와 다릅니다 — 스케치의 Solid(면과 같은 색 테두리)는 <b>filled</b>, Tonal(면 + 검정 테두리)은 <b>solid</b> 입니다.
          해석도 하나 더했습니다 — solid 의 글자를 표의 Black 대신 <b>ink</b> 로 둡니다. 밝은 accent 에서는 ink 가 곧 검정이라 같은 값이고,
          보라처럼 ink 가 흰색인 accent 에서는 검정 글자가 2.2:1 로 읽히지 않습니다. 그래서 solid = filled 면 + 검정 테두리입니다.
        </Text>
      </Section>

      <Section title="Accent × Variant" note="같은 표를 실제 Button 으로. 자세한 것은 Atoms › Button.">
        <AccentVariantMatrix
          cell={(accent, variant) => (
            <Button size="xs" accent={accent} variant={variant}>
              {accent}
            </Button>
          )}
        />
      </Section>

      <Section
        title="Interaction 오버레이"
        note="hover · press 는 면을 바꾸지 않고 위에 층을 얹습니다. 그래서 밑이 크림이든 흰색이든 색면이든 같은 규칙으로 한 단 바뀝니다. Filled · Solid 는 흰 층, Plain · SolidMuted 는 회색 층, Outline · Frameline 은 accent 층."
      >
        <Grid columns="repeat(auto-fill, minmax(200px, 1fr))" gap="xl">
          {(
            [
              ["hoverWhite", OVERLAY.hoverWhite, ACCENT_COLORS.green.solid],
              ["pressWhite", OVERLAY.pressWhite, ACCENT_COLORS.green.solid],
              ["hoverGray", OVERLAY.hoverGray, "#ffffff"],
              ["pressGray", OVERLAY.pressGray, "#ffffff"],
              ["accent tint (green)", ACCENT_COLORS.green.tint, "#ffffff"],
              ["scrim", OVERLAY.scrim, CREAM],
            ] as const
          ).map(([name, value, ground]) => (
            <Swatch key={name} name={name} value={value} ground={ground} />
          ))}
        </Grid>
      </Section>

      <Section title="Focus" note="포커스는 2px 를 2px 띄운 핑크 고리 하나입니다. 키보드(Tab)로 와 보세요.">
        <Stage bg="raised">
          <Button variant="outline">Tab 으로 포커스</Button>
          <Button accent="green" variant="filled">
            filled
          </Button>
          <Surface padding="md" border="line" style={{ outline: `2px solid ${FOCUS}`, outlineOffset: 2 }}>
            <Text variant="caption" weight="black">
              링 모양
            </Text>
          </Surface>
        </Stage>
      </Section>
    </div>
  );
}
