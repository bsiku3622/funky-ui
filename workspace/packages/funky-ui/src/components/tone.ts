/**
 * 실행 중에 정해지는 색(학과 · 학번) — hex 하나를 `--fk-tone` 변수로 넘깁니다.
 *
 * 칠하는 문법은 자리마다 같습니다: **면 = tone 8~15%, 테두리 = tone, 글자 = tone.**
 * 이 문법을 지키면 새 자리를 만들어도 색이 따로 놀지 않습니다 (class-explorer design-guide).
 */
import type { CSSProperties } from "react";

export const TONE_VAR = "--fk-tone";

export function toneStyle(color: string | undefined, style?: CSSProperties): CSSProperties | undefined {
  if (!color) return style;
  return { [TONE_VAR]: color, ...style } as CSSProperties;
}
