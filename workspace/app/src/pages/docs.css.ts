/** 문서 글자 — funky 역할을 마크다운 태그에 겁니다 */
import { globalStyle, style } from "@vanilla-extract/css";
import { TEXT_ROLES, textRule, vars } from "@studio-baeks/funky-ui/tokens";

export const prose = style({ lineHeight: 1.7 });

globalStyle(`${prose} h1`, { ...textRule(TEXT_ROLES.display), margin: `0 0 ${vars.space["3xl"]}` });
globalStyle(`${prose} h2`, {
  ...textRule(TEXT_ROLES.title),
  margin: `${vars.space["5xl"]} 0 ${vars.space.xl}`,
  paddingBottom: vars.space.md,
  borderBottom: `${vars.stroke.base} solid ${vars.line.base}`,
});
globalStyle(`${prose} h3`, { ...textRule(TEXT_ROLES.heading), margin: `${vars.space["4xl"]} 0 ${vars.space.lg}` });
globalStyle(`${prose} h4`, { ...textRule(TEXT_ROLES.subtitle), margin: `${vars.space["3xl"]} 0 ${vars.space.md}` });
globalStyle(`${prose} p, ${prose} li`, { fontSize: "0.9375rem", lineHeight: 1.75, fontWeight: 500, color: vars.ink.primary });
globalStyle(`${prose} p`, { margin: `0 0 ${vars.space.xl}` });
globalStyle(`${prose} ul, ${prose} ol`, { margin: `0 0 ${vars.space.xl}`, paddingLeft: "1.4em" });
globalStyle(`${prose} strong`, { fontWeight: 900 });
globalStyle(`${prose} blockquote`, {
  margin: `0 0 ${vars.space.xl}`,
  padding: `${vars.space.lg} ${vars.space.xl}`,
  borderLeft: `${vars.stroke.rail} solid ${vars.accent.solid}`,
  backgroundColor: vars.surface.raised,
});
globalStyle(`${prose} pre`, { margin: `0 0 ${vars.space.xl}` });
globalStyle(`${prose} table`, { margin: `0 0 ${vars.space.xl}` });
globalStyle(`${prose} hr`, { border: 0, borderTop: `${vars.stroke.base} solid ${vars.line.subtle}`, margin: `${vars.space["4xl"]} 0` });
