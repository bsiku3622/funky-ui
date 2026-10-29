/** 사이트 크롬 — funky 변수로만 그립니다 */
import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@studio-baeks/funky-ui/tokens";

export const page = style({ minHeight: "100vh", display: "flex", flexDirection: "column" });

export const topLinks = style({ display: "flex", alignItems: "center", gap: 8 });

export const shell = style({
  flex: 1,
  display: "grid",
  gridTemplateColumns: "240px minmax(0, 1fr)",
  minHeight: 0,
  "@media": { "(max-width: 860px)": { gridTemplateColumns: "minmax(0, 1fr)" } },
});

export const sidebar = style({
  position: "sticky",
  top: 0,
  alignSelf: "start",
  height: "calc(100vh - 80px)",
  overflowY: "auto",
  padding: `${vars.space["3xl"]} ${vars.space.xl}`,
  borderRight: `${vars.stroke.base} solid ${vars.line.base}`,
  backgroundColor: vars.surface.canvas,
  "@media": { "(max-width: 860px)": { position: "static", height: "auto", borderRight: 0, borderBottom: `${vars.stroke.base} solid ${vars.line.base}` } },
});

export const navLayer = style({ marginBottom: vars.space["3xl"] });
export const navLayerTitle = style({
  margin: `0 0 ${vars.space.md}`,
  fontSize: "0.6875rem",
  fontWeight: 900,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: vars.ink.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
export const navGroupTitle = style({
  margin: `${vars.space.lg} 0 ${vars.space.xs}`,
  fontSize: "0.625rem",
  fontWeight: 900,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: vars.ink.muted,
});
export const navLink = style({
  display: "block",
  padding: `${vars.space.xs} ${vars.space.md}`,
  border: `${vars.stroke.base} solid transparent`,
  color: vars.ink.secondary,
  fontSize: "0.8125rem",
  fontWeight: 700,
  textDecoration: "none",
  selectors: {
    "&:hover": { backgroundColor: vars.overlay.hoverGray, color: vars.ink.primary },
    '&[aria-current="page"]': { backgroundColor: vars.surface.inverse, color: vars.ink.inverse, borderColor: vars.line.base },
  },
});

export const main = style({ minWidth: 0, padding: `${vars.space["4xl"]} ${vars.space["4xl"]} ${vars.space["6xl"]}`, "@media": { "(max-width: 860px)": { padding: vars.space.xl } } });

export const narrow = style({ maxWidth: 1080 });

/** 코드 블록 */
export const code = style({
  margin: 0,
  padding: vars.space.xl,
  overflowX: "auto",
  backgroundColor: vars.surface.inverse,
  color: "#f5f5f5",
  border: `${vars.stroke.base} solid ${vars.line.base}`,
  fontFamily: vars.font.mono,
  fontSize: "0.8125rem",
  lineHeight: 1.6,
  fontWeight: 500,
  whiteSpace: "pre",
});

globalStyle(`${code} *`, { fontFamily: "inherit" });

export const inlineCode = style({
  fontFamily: vars.font.mono,
  fontSize: "0.85em",
  fontWeight: 600,
  padding: "0.05em 0.35em",
  backgroundColor: vars.surface.well,
  border: `1px solid ${vars.line.subtle}`,
});
