import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";
import { BREAKPOINT, SPACE } from "../tokens/layout";
import { TEXT_ROLES, WEIGHT, em, px } from "../tokens/typography";
import { vars } from "../tokens/variables";

const c = (rule: Record<string, unknown>) => ({ "@layer": { [components]: rule } });

export const accordionHeader = style(
  c({
    display: "flex",
    alignItems: "center",
    gap: px(SPACE.lg),
    width: "100%",
    padding: px(SPACE["2xl"]),
    border: 0,
    textAlign: "start",
  }),
);

/**
 * 대문자 섹션 제목 — class-explorer 의 AccordionSection 입니다. Text 역할은 fk.utilities 라 이 층에서 덮을 수 없어서
 * Text 를 쓰지 않고 직접 그립니다 (역할은 크기가 하나뿐이고, 이 제목은 폭에 따라 크기가 바뀝니다).
 */
export const accordionTitleSection = style(
  c({
    fontSize: px(TEXT_ROLES.body.size),
    lineHeight: px(TEXT_ROLES.body.leading),
    fontWeight: WEIGHT.black,
    letterSpacing: em(TEXT_ROLES.display.tracking),
    textTransform: "uppercase",
    "@media": {
      [`(min-width: ${BREAKPOINT.md}px)`]: { fontSize: px(TEXT_ROLES.heading.size), lineHeight: px(TEXT_ROLES.heading.leading) },
    },
  }),
);

/** 촘촘한 줄 — 12px 제목에 여백을 줄입니다 (Admin 의 접는 목록 · Ask 의 단계 줄) */
export const accordionHeaderSm = style(c({ gap: px(SPACE.md), padding: px(SPACE.lg) }));
export const accordionBodySm = style(c({ padding: px(SPACE.lg) }));

export const accordionChevron = style(
  c({ marginLeft: "auto", flexShrink: 0, transitionProperty: "transform", transitionDuration: vars.duration.base }),
);
export const accordionChevronOpen = style(c({ transform: "rotate(180deg)" }));

export const accordionBody = style(
  c({ padding: px(SPACE["2xl"]), borderTop: `${vars.stroke.base} solid ${vars.line.subtle}` }),
);
