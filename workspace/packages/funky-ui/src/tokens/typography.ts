/**
 * Typography — 서체 · 굵기 · 글자 역할 · 컨트롤 글자.
 *
 * 숫자는 여기에만 적습니다. 컴포넌트는 역할(`body` · `overline` …)이나 컨트롤 크기로 고릅니다.
 * class-explorer 계측: 본문조차 700, 구조 라벨은 900 이었습니다 — funky 의 글자는 두껍습니다.
 */
import type { ControlSize, TextVariant, Tone, Weight } from "./vocabulary";

export const FONT_FAMILY = {
  sans: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "D2Coding", monospace',
} as const;

/** Pretendard Variable 을 전제합니다 — 없으면 시스템 서체가 가까운 굵기로 접힙니다 */
export const FONT_STYLESHEET =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css";

export const WEIGHT = {
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
} as const satisfies Record<Weight, number>;

export interface TextRole {
  /** px */
  size: number;
  /** px — 줄 높이는 고정값입니다 */
  leading: number;
  weight: Weight;
  /** em */
  tracking: number;
  uppercase?: boolean;
  /** 역할이 정해 둔 글자색. 없으면 물려받습니다 */
  tone?: Tone;
}

/**
 * 글자 역할 열 개. 앞의 여덟은 크기 사다리이고, 뒤의 둘은 class-explorer 가 가장 많이
 * 반복한 **구조 라벨**입니다.
 *
 * - `overline` — 10px · 900 · 대문자 · 넓은 자간 · 약한 잉크. 카드 머리의 작은 이름표 (계측 35회)
 * - `subtitle` — 14px · 900 · 대문자 · 넓은 자간 · 약한 잉크. 섹션 소제목 (`RetroSubTitle`, 41회)
 */
export const TEXT_ROLES = {
  display: { size: 36, leading: 40, weight: "black", tracking: -0.05, uppercase: true },
  title: { size: 24, leading: 32, weight: "black", tracking: -0.025 },
  heading: { size: 20, leading: 28, weight: "black", tracking: -0.025 },
  subheading: { size: 16, leading: 24, weight: "black", tracking: 0 },
  body: { size: 14, leading: 20, weight: "bold", tracking: 0 },
  caption: { size: 12, leading: 16, weight: "bold", tracking: 0 },
  label: { size: 11, leading: 16, weight: "black", tracking: 0 },
  micro: { size: 10, leading: 14, weight: "black", tracking: 0 },
  overline: { size: 10, leading: 14, weight: "black", tracking: 0.1, uppercase: true, tone: "muted" },
  subtitle: { size: 14, leading: 20, weight: "black", tracking: 0.1, uppercase: true, tone: "muted" },
} as const satisfies Record<TextVariant, TextRole>;

/**
 * 컨트롤 글자 — Button · Badge · NavButton 의 글자. 크기마다 하나, 전부 900 대문자입니다.
 * 작을수록 자간을 넓혀 10px 에서도 낱자가 붙지 않게 합니다.
 */
export const CONTROL_TEXT = {
  xs: { size: 10, tracking: 0.08 },
  sm: { size: 12, tracking: 0.05 },
  md: { size: 14, tracking: 0.02 },
  lg: { size: 16, tracking: 0.02 },
} as const satisfies Record<ControlSize, { size: number; tracking: number }>;

/** 입력값 글자 — 값은 읽는 내용이라 900 이 아니라 700 입니다 */
export const INPUT_TEXT = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 16,
} as const satisfies Record<ControlSize, number>;

/** 큰 숫자 (Stat) — 역할 사다리 밖의 단 하나의 예외 */
export const NUMERAL = {
  sm: { size: 36, leading: 36, tracking: -0.05 },
  lg: { size: 48, leading: 48, tracking: -0.05 },
} as const;

export const px = (n: number) => `${n / 16}rem`;
export const em = (n: number) => (n === 0 ? "0" : `${n}em`);
