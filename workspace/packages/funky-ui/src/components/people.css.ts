import { keyframes, style, styleVariants } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { SPACE } from "../tokens/layout";
import { TEXT_ROLES, WEIGHT, em, px } from "../tokens/typography";
import { vars } from "../tokens/variables";
import { TONE_VAR } from "./tone";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });
const tone = `var(${TONE_VAR}, ${vars.ink.primary})`;
const tint = (pct: number) => `color-mix(in srgb, ${tone} ${pct}%, ${vars.surface.raised})`;

/**
 * 떨림 + 쉼이 한 주기입니다 (앞 20% 만 떱니다). 좌우로 흔들리면서 같이 기울어집니다.
 * ⚠️ `transform` 이 아니라 `translate` · `rotate` 개별 속성 — 누를 때의 `scale` 과 서로 지우지 않게.
 */
const buzz = keyframes({
  "0%, 20%, 100%": { translate: "0 0", rotate: "0deg" },
  "2.5%": { translate: "-1.5px 0", rotate: "-1deg" },
  "5%": { translate: "1.5px 0", rotate: "1deg" },
  "7.5%": { translate: "-1.3px 0", rotate: "-0.8deg" },
  "10%": { translate: "1.3px 0", rotate: "0.8deg" },
  "12.5%": { translate: "-1px 0", rotate: "-0.5deg" },
  "15%": { translate: "1px 0", rotate: "0.5deg" },
  "17.5%": { translate: "-0.6px 0", rotate: "-0.3deg" },
});

export const badge = style(
  c({
    display: "inline-flex",
    alignItems: "center",
    margin: 0,
    fontWeight: WEIGHT.black,
    fontStyle: "italic",
    whiteSpace: "nowrap",
    color: tone,
    backgroundColor: tint(8),
    border: `${vars.stroke.base} solid ${tone}`,
    cursor: "default",
  }),
);

export const badgeSize = styleVariants({
  xs: c({ paddingInline: px(SPACE.md), paddingBlock: px(SPACE.xs), fontSize: px(10), lineHeight: px(14) }),
  sm: c({ paddingInline: px(SPACE.md), paddingBlock: px(SPACE.xs), fontSize: px(12), lineHeight: px(16) }),
  md: c({ paddingInline: px(SPACE.lg), paddingBlock: px(SPACE.md), fontSize: px(14), lineHeight: px(20) }),
});

export const badgeClickable = style(
  c({
    cursor: "pointer",
    transitionProperty: "scale",
    transitionDuration: vars.duration.fast,
    selectors: { "&:active": { scale: vars.press.scale } },
  }),
);

export const badgeBuzz = style(c({ animation: `${buzz} 1.8s linear infinite` }));

export const personCard = style(
  c({
    display: "flex",
    width: "100%",
    minHeight: px(176),
    padding: 0,
    overflow: "hidden",
    textAlign: "start",
    color: vars.ink.primary,
    backgroundColor: vars.surface.raised,
    border: `${vars.stroke.base} solid ${vars.line.base}`,
  }),
);

export const personHead = style(
  c({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: px(SPACE.lg),
    minWidth: px(120),
    padding: px(SPACE.xl),
    backgroundColor: tint(15),
    borderRight: `${vars.stroke.base} solid ${vars.line.base}`,
  }),
);
export const personId = style(c({ fontSize: px(TEXT_ROLES.caption.size), lineHeight: 1, fontWeight: WEIGHT.black }));
export const personName = style(
  c({ fontSize: px(TEXT_ROLES.heading.size), lineHeight: px(TEXT_ROLES.heading.leading), fontWeight: WEIGHT.black, letterSpacing: em(-0.025), color: tone }),
);

export const personBody = style(c({ flex: 1, minWidth: 0, padding: px(SPACE.xl) }));
export const personTitle = style(
  c({
    margin: 0,
    marginBottom: px(SPACE.lg),
    fontSize: px(TEXT_ROLES.overline.size),
    fontWeight: WEIGHT.black,
    letterSpacing: em(0.1),
    textTransform: "uppercase",
    color: vars.ink.muted,
  }),
);
export const personItems = style(c({ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: px(SPACE.xl), rowGap: px(SPACE.sm) }));
export const personItem = style(
  c({
    minWidth: 0,
    paddingLeft: px(SPACE.sm),
    borderLeft: `${vars.stroke.base} solid ${tone}`,
    fontSize: px(TEXT_ROLES.micro.size),
    fontWeight: WEIGHT.bold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
);
