/** Playground 표본 도구의 스타일 */
import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@studio-baeks/funky-ui/tokens";

export const pageHead = style({ marginBottom: vars.space["4xl"], display: "flex", flexDirection: "column", gap: vars.space.md });

/** 표본을 올리는 판 — 바탕을 바꿔 크림 · 흰 면 · 어두운 바 위의 모습을 봅니다 */
export const stage = style({
  border: `${vars.stroke.base} solid ${vars.line.base}`,
  padding: vars.space["4xl"],
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xl,
  minHeight: 160,
  minWidth: 0,
  overflow: "auto",
});
export const stageBg = styleVariants({
  canvas: { backgroundColor: vars.surface.canvas },
  raised: { backgroundColor: vars.surface.raised },
  dark: { backgroundColor: "#7828c8", color: "#ffffff" },
});

export const detailGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 280px",
  gap: vars.space["3xl"],
  alignItems: "start",
  "@media": { "(max-width: 1100px)": { gridTemplateColumns: "minmax(0, 1fr)" } },
});

export const controlsPanel = style({ display: "flex", flexDirection: "column", gap: vars.space.xl });

export const section = style({ marginTop: vars.space["5xl"], display: "flex", flexDirection: "column", gap: vars.space.xl });

/** accent × variant 행렬 */
export const matrix = style({ display: "grid", gap: 0, overflowX: "auto", border: `${vars.stroke.base} solid ${vars.line.base}` });
export const matrixHead = style({
  padding: `${vars.space.md} ${vars.space.lg}`,
  fontSize: "0.625rem",
  fontWeight: 900,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  backgroundColor: vars.surface.inverse,
  color: vars.ink.inverse,
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
});
export const matrixRowHead = style({
  padding: `${vars.space.md} ${vars.space.lg}`,
  fontSize: "0.6875rem",
  fontWeight: 900,
  minWidth: 0,
  overflowWrap: "anywhere",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
  borderTop: `${vars.stroke.base} solid ${vars.line.subtle}`,
  backgroundColor: vars.surface.well,
});
export const matrixCell = style({
  padding: vars.space.lg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTop: `${vars.stroke.base} solid ${vars.line.subtle}`,
  borderLeft: `${vars.stroke.base} solid ${vars.line.subtle}`,
  minWidth: 0,
});

export const swatch = style({ width: "100%", height: 44, border: `${vars.stroke.base} solid ${vars.line.base}` });
export const mono = style({ fontFamily: vars.font.mono, fontSize: "0.6875rem", fontWeight: 600, letterSpacing: 0 });

export const table = style({ width: "100%", borderCollapse: "collapse", border: `${vars.stroke.base} solid ${vars.line.base}`, backgroundColor: vars.surface.raised });
export const th = style({
  textAlign: "left",
  padding: `${vars.space.md} ${vars.space.lg}`,
  backgroundColor: vars.surface.inverse,
  color: vars.ink.inverse,
  fontSize: "0.625rem",
  fontWeight: 900,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
});
export const td = style({ padding: `${vars.space.md} ${vars.space.lg}`, borderTop: `${vars.stroke.base} solid ${vars.line.subtle}`, fontSize: "0.8125rem", verticalAlign: "middle" });

export const overviewGrid = style({ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: vars.space["3xl"] });
export const overviewCard = style({ position: "relative", display: "block" });
/** 이름 링크가 카드 전체를 덮습니다 — 누르는 자리는 카드 전체, 포커스 링은 카드 테두리에 */
export const stretchedLink = style({
  color: "inherit",
  textDecoration: "none",
  outline: "none",
  "::after": { content: '""', position: "absolute", inset: 0 },
  selectors: {
    "&:focus-visible::after": { outline: `${vars.focusRing.width} solid ${vars.focus}`, outlineOffset: vars.focusRing.offset },
  },
});
export const overviewSample = style({
  height: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
  padding: vars.space.xl,
  backgroundColor: vars.surface.canvas,
  borderBottom: `${vars.stroke.base} solid ${vars.line.base}`,
  overflow: "hidden",
  pointerEvents: "none",
});
