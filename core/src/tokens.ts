// funky-ui — Token SSOT (identity).
//
// 단일 모드(라이트 only) · brutalist. vff/original 의 시각 DNA 를 그대로 코드화한다.
// "voice 는 적고 과감하게" — 옵션을 일부러 적게 둬서 양산 앱들이 저절로 같아진다.
//
// 레이어: Token → Atom → Component(껍데기) → Template.
// 이 파일은 *voice*(색·그림자·타입 등 무엇으로 그리는가)만 정의한다.
// composition(어떻게 배치하는가)은 별도 문서가 소유한다 — docs/foundations/composition.md.
//
// 이 파일이 유일한 SSOT. src/tokens.css (CSS 변수 --funky-*) 는 여기서
// codegen 된 산출물이다 — 토큰을 바꾸면 `node scripts/gen-tokens.ts` 로 재생성.
// tokens.css 를 직접 수정하지 말 것.

// ───── Color — 고정 hex (perceptual 곡선·다크모드 없음) ─────────────────────
//
// surface 3단(페이지·카드·sunken) + ink 2단 + line(검정 테두리) + 네온 accent + status.
// accent 는 vibe 이름(pink/cyan...) — role alias(primary/secondary)는 아래.

export const color = {
  // surface
  bg: "#fff5d1", //        cream page 바탕
  surface: "#ffffff", //   카드 등 elevated
  sunken: "#fff0b8", //    recessed (sidebar · table head)
  // ink
  ink: "#222222", //       본문
  inkMuted: "#6f6a52", //  보조 텍스트
  inkInverse: "#ffffff", //검정/네온 면 위 글자
  // line
  line: "#000000", //      모든 테두리 = 검정 (brutalist 정체성)
  // accents — 네온 (vff/original)
  pink: "#ff4eba",
  purple: "#7828c8",
  cyan: "#3decfd",
  yellow: "#ffd500",
  orange: "#ff9100",
  sky: "#00c8ff",
  green: "#00c22a",
  accentSoft: "#f0fdff", // 아주 옅은 시안 틴트 (강조 배경)
} as const;

export type AccentColor = "pink" | "purple" | "cyan" | "yellow" | "orange" | "sky" | "green";

// role alias — 컴포넌트는 가능하면 role 로 참조.
export const role = {
  primary: color.pink,
  secondary: color.purple,
  success: color.green,
  warning: color.orange,
  danger: "#ff3b3b",
  info: color.cyan,
} as const;

// ───── Shadow — 하드 오프셋 솔리드 (blur 0). 시그니처. ──────────────────────
export const shadow = {
  sm: "4px 4px 0 0 rgba(0, 0, 0, 0.2)",
  md: "6px 6px 0 0 rgba(0, 0, 0, 0.2)",
  lg: "8px 8px 0 0 rgba(0, 0, 0, 0.2)",
  none: "none",
} as const;

// ───── Shape — 전부 샤프 + 두꺼운 검정 테두리 ──────────────────────────────
export const radius = { none: "0" } as const; // pill 도 샤프
export const border = {
  width: "2px", //         표준 테두리
  widthBold: "3px", //     강조
  color: color.line, //    항상 검정
} as const;

// ───── Space — 내부 padding/gap 스케일 (composition 은 앱이 자유, 이건 컴포넌트 내부용) ─
export const space = {
  xs: "0.375rem", //  6px
  sm: "0.5rem", //    8px
  md: "0.75rem", //  12px
  lg: "1rem", //     16px
  xl: "1.5rem", //   24px
  "2xl": "2rem", //  32px
} as const;

// ───── Type — Pretendard · 블랙체 + uppercase chrome ───────────────────────
export const font = {
  family:
    '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  weight: {
    medium: 500,
    bold: 700,
    black: 900, //         brutalist chrome 기본 (uppercase 라벨)
  },
  // vff/original 의 Tailwind 스케일 그대로 (rem ladder · base 16px).
  size: {
    "2xs": "0.625rem", // 10px — 초소형 chrome 라벨
    xs: "0.75rem", //    12px
    sm: "0.875rem", //   14px — chrome 라벨/본문
    md: "1rem", //       16px — 본문
    lg: "1.125rem", //   18px
    xl: "1.25rem", //    20px
    "2xl": "1.5rem", //  24px — 워드마크
    "3xl": "1.875rem", //30px
    "4xl": "2.25rem", // 36px — 큰 숫자
  },
  // chrome 텍스트의 정체성 — uppercase + 넓은 자간 + black.
  chrome: {
    transform: "uppercase",
    weight: 900,
    tracking: "0.05em",
  },
} as const;

// ───── 컨트롤 높이 — interactive 단위 (Button/Input/Chip) ───────────────────
export const controlHeight = {
  sm: "1.75rem", // 28px
  md: "2.25rem", // 36px
  lg: "2.75rem", // 44px
} as const;

// ───── Motion — press-into-shadow 시그니처 ─────────────────────────────────
// hover/active 시 그림자 속으로 눌리는 거동. 값(변위)만 정의 — 적용은 컴포넌트가.
export const motion = {
  duration: "100ms",
  easing: "ease-out",
  pressOffset: "4px", // active 시 x/y 로 이동(= shadow 크기) + shadow 제거
} as const;

export const tokens = {
  color,
  role,
  shadow,
  radius,
  border,
  space,
  font,
  controlHeight,
  motion,
} as const;

export type Tokens = typeof tokens;
