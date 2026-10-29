import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { BREAKPOINT, CONTAINER, SPACE, Z } from "../tokens/layout";
import { TEXT_ROLES, WEIGHT, em, px } from "../tokens/typography";
import { vars } from "../tokens/variables";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });
const md = `(min-width: ${BREAKPOINT.md}px)`;

/* ── AppBar ─────────────────────────────────────────────────────────── */

export const appBar = style(
  c({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: px(SPACE.xl),
    height: px(CONTAINER.shell.bar),
    paddingInline: px(SPACE["3xl"]),
    backgroundColor: vars.accent.solid,
    color: vars.accent.ink,
    borderBottom: `${vars.stroke.base} solid ${vars.line.base}`,
    boxShadow: `0 ${vars.press.sink} 0 0 ${vars.shadowColor}`,
  }),
);
export const appBarFixed = style(c({ position: "fixed", top: 0, left: 0, right: 0, zIndex: Z.sticky }));
/**
 * 오른쪽 끝 자리 — 폭이 모자라면 로고를 덮지 않고 이 자리만 가로로 스크롤됩니다. 바 쪽이 space-between
 * 으로 오른쪽에 밀어 두므로 안쪽은 start 정렬입니다 (end 정렬이면 넘친 앞부분에 닿을 수 없습니다).
 */
export const appBarActions = style(
  c({
    display: "flex",
    alignItems: "center",
    gap: px(SPACE.lg),
    minWidth: 0,
    overflowX: "auto",
    scrollbarWidth: "none",
    paddingBlock: px(SPACE.xs),
  }),
);

export const brand = style(
  c({
    display: "inline-block",
    flexShrink: 0,
    fontSize: px(TEXT_ROLES.title.size),
    lineHeight: 1,
    fontWeight: WEIGHT.black,
    letterSpacing: em(-0.05),
    textTransform: "uppercase",
    transform: "skewX(-6deg)",
    whiteSpace: "nowrap",
    color: "inherit",
  }),
);
export const brandButton = style(
  c({
    padding: 0,
    border: 0,
    background: "none",
    cursor: "pointer",
    transitionProperty: "transform",
    transitionDuration: vars.duration.fast,
    selectors: {
      "&:hover": { transform: `skewX(-6deg) scale(${vars.press.grow})` },
      "&:active": { transform: `skewX(-6deg) scale(${vars.press.scale})` },
    },
  }),
);

/* ── SideNav ────────────────────────────────────────────────────────── */

export const sideNav = style(
  c({
    display: "flex",
    flexDirection: "column",
    width: px(CONTAINER.shell.sidebar),
    backgroundColor: vars.surface.canvas,
    borderRight: `${vars.stroke.base} solid ${vars.line.base}`,
  }),
);
export const sideNavFixed = style(
  c({
    position: "fixed",
    top: px(CONTAINER.shell.bar),
    bottom: 0,
    left: 0,
    zIndex: Z.sticky - 1,
    display: "none",
    "@media": { [md]: { display: "flex" } },
  }),
);
export const sideNavBody = style(c({ flex: 1, minHeight: 0, overflowY: "auto", padding: px(SPACE["3xl"]) }));
export const sideNavFooter = style(c({ padding: px(SPACE["3xl"]), paddingTop: 0 }));
export const sideSection = style(c({ display: "flex", flexDirection: "column", gap: px(SPACE.md), marginBottom: px(SPACE["3xl"]) }));
export const sideSectionLabel = style(
  c({
    margin: 0,
    marginBottom: px(SPACE.xs),
    paddingInline: px(SPACE.xs),
    fontSize: px(TEXT_ROLES.overline.size),
    fontWeight: WEIGHT.black,
    letterSpacing: em(0.2),
    textTransform: "uppercase",
    color: vars.ink.muted,
  }),
);

export const sideItem = style(
  c({
    display: "flex",
    alignItems: "center",
    gap: px(SPACE.lg),
    width: "100%",
    paddingInline: px(SPACE.xl),
    paddingBlock: px(SPACE.lg),
    fontSize: px(TEXT_ROLES.body.size),
    fontWeight: WEIGHT.black,
    letterSpacing: em(-0.025),
    textTransform: "uppercase",
    textAlign: "start",
  }),
);
export const sideItemIdle = style(
  c({
    color: vars.ink.muted,
    backgroundColor: "transparent",
    border: `${vars.stroke.base} solid transparent`,
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: vars.duration.fast,
    selectors: {
      "&:hover": { backgroundColor: vars.overlay.hoverWhite, color: vars.ink.primary },
      "&:active": { transform: `scale(${vars.press.scale})` },
    },
  }),
);

/* ── BottomNav ──────────────────────────────────────────────────────── */

export const bottomNav = style(
  c({
    display: "flex",
    alignItems: "stretch",
    height: px(CONTAINER.shell.bottomBar),
    backgroundColor: vars.accent.solid,
    color: vars.accent.ink,
    borderTop: `${vars.stroke.base} solid ${vars.line.base}`,
    boxShadow: `0 calc(-1 * ${vars.press.sink}) 0 0 ${vars.shadowColor}`,
  }),
);
export const bottomNavFixed = style(
  c({ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: Z.sticky, "@media": { [md]: { display: "none" } } }),
);

export const bottomItem = style(
  c({
    flex: "1 1 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: px(SPACE.xs),
    padding: 0,
    border: 0,
    borderTop: `${vars.stroke.base} solid transparent`,
    background: "none",
    // 글자는 바(accent 의 ink)에서 물려받고, 안 골린 칸은 묽힙니다 — 어떤 accent 바 위에서도 읽힙니다
    color: "inherit",
    opacity: 0.6,
    cursor: "pointer",
    transitionProperty: "opacity, border-color",
    transitionDuration: vars.duration.fast,
    selectors: { "&:hover": { opacity: 0.85 } },
  }),
);
export const bottomItemActive = style(c({ opacity: 1, borderTopColor: "currentColor", selectors: { "&:hover": { opacity: 1 } } }));
export const bottomItemLabel = style(
  c({ fontSize: px(9), lineHeight: 1, fontWeight: WEIGHT.black, letterSpacing: em(-0.025), textTransform: "uppercase" }),
);
