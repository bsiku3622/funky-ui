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
  red: "#ff3b3b", //       danger 네온 (8번째 accent 앵커)
  accentSoft: "#f0fdff", // 범용 옅은 hover 틴트 (per-color 아님 — 레거시 단일 토큰)
  surfaceHover: "#ededeb", // neutral 요소 hover (연한 회색, 불투명 — accent soft 와 같은 레이어)
  scrim: "rgba(0, 0, 0, 0.45)", //       overlay 배경 (Modal 등)
} as const;

export type AccentColor =
  | "pink"
  | "purple"
  | "cyan"
  | "yellow"
  | "orange"
  | "sky"
  | "green"
  | "red";

// role alias — 컴포넌트는 가능하면 role 로 참조.
export const role = {
  primary: color.pink,
  secondary: color.purple,
  success: color.green,
  warning: color.orange,
  danger: color.red,
  info: color.cyan,
} as const;

// ───── Accent 앵커 — 색당 6키 SSOT (3-layer 색 시스템의 Layer 1) ────────────
//
// variant(solid/soft/outline/ghost) × field(bg/bg-hover/fg/border) 펼치기와
// contrast 검증은 gen-tokens.ts 가 빌드타임에 정적 hex/var 로 박는다(런타임 색 계산 0).
//   · fill        solid 면색 (= color.* 네온, 값 동결 = 정체성 보존)
//   · fillHover   solid hover 면색 (약간 어둡게)
//   · soft        soft/outline/ghost 의 옅은 틴트 면색
//   · softHover   그 hover
//   · onFill      solid 면 위 글자색 토큰 키 — "ink"(#222 검정계) | "inkInverse"(#fff).
//                 *현재 렌더와 일치하도록 손으로 결정* (네온 위 글자색은 WCAG 휘도가 아니라
//                 brutalist 손맛 — pickFg 는 검증·경고용일 뿐 결정은 손으로).
//   · text        soft/outline/ghost 면 위 글자색 + outline border (진한 동색 잉크)
//
// fillHover/soft/softHover/text 는 아직 solid 만 소비하는 컴포넌트에선 안 쓰임(추정치 —
// 레퍼런스 앱 렌더에서 튜닝 예정). solid 의 fill/onFill 만 현행 무회귀에 직접 관여.
export type AccentOnFill = "ink" | "inkInverse";
export type AccentAnchor = {
  fill: string;
  fillHover: string;
  soft: string; //      옅은 동색 틴트 (밝음)
  softHover: string;
  muted: string; //     흰색에 가까운 아주 옅은 동색 틴트 (table zebra strip 등 — 밝고 깨끗)
  onFill: AccentOnFill;
  text: string;
};

export const accent: Record<AccentColor, AccentAnchor> = {
  pink:   { fill: color.pink,   fillHover: "#e63a9f", soft: "#ffe3f3", softHover: "#ffd0ea", muted: "#fff0f7", onFill: "inkInverse", text: "#a8004f" },
  purple: { fill: color.purple, fillHover: "#5f1ba0", soft: "#f0e3ff", softHover: "#e3ccff", muted: "#f6effd", onFill: "inkInverse", text: "#4a127a" },
  cyan:   { fill: color.cyan,   fillHover: "#1fcfe0", soft: "#e0fbff", softHover: "#c4f5fc", muted: "#f0fdff", onFill: "ink",        text: "#0a6b78" },
  yellow: { fill: color.yellow, fillHover: "#e6bf00", soft: "#fff7cc", softHover: "#ffefa3", muted: "#fffceb", onFill: "ink",        text: "#7a6500" },
  orange: { fill: color.orange, fillHover: "#e67e00", soft: "#ffe8cc", softHover: "#ffd6a3", muted: "#fff4e8", onFill: "ink",        text: "#8a4d00" },
  sky:    { fill: color.sky,    fillHover: "#00aee0", soft: "#d6f6ff", softHover: "#ade9ff", muted: "#ecf9ff", onFill: "ink",        text: "#005f78" },
  green:  { fill: color.green,  fillHover: "#00a323", soft: "#d6ffde", softHover: "#aaf5b8", muted: "#effdf3", onFill: "inkInverse", text: "#00661a" },
  red:    { fill: color.red,    fillHover: "#e62e2e", soft: "#ffe0e0", softHover: "#ffc7c7", muted: "#fff0f0", onFill: "inkInverse", text: "#a80000" },
};

export type AccentVariant = "solid" | "soft" | "outline" | "ghost";
export type ColorToken =
  | AccentColor
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

// role(의미 축) → accent(색 축) 매핑. gen-tokens.ts 가 var 재참조 alias 로 emit.
export const roleColor: Record<
  "primary" | "secondary" | "success" | "warning" | "danger" | "info",
  AccentColor
> = {
  primary: "pink",
  secondary: "purple",
  success: "green",
  warning: "orange",
  danger: "red",
  info: "cyan",
};

// 컴포넌트에서 accent var 이름을 조립하는 헬퍼 (값을 모르고 var 이름만 안다).
export const colorVar = (
  c: ColorToken,
  v: AccentVariant,
  f: "bg" | "bg-hover" | "fg" | "border",
): string => `var(--funky-accent-${c}-${v}-${f})`;

// ───── Shadow — 하드 오프셋 솔리드 (blur 0). 시그니처. ──────────────────────
// sm 은 press 가능 요소의 rest 깊이(= depth 4). md/lg 는 정적 elevation(Card/Modal).
export const shadow = {
  sm: "4px 4px 0 0 rgba(0, 0, 0, 0.2)",
  md: "6px 6px 0 0 rgba(0, 0, 0, 0.2)",
  lg: "8px 8px 0 0 rgba(0, 0, 0, 0.2)",
  none: "none",
} as const;

// press-into-shadow 파생 — depth 4 기준. rest(shadow.sm, 4px) → hover(2px) → active(소멸).
// 본체 이동량 + 그림자 잔량 = 항상 depth 로 고정되어 절대 위치가 안 흔들린다.
export const press = {
  hoverShadow: "2px 2px 0 0 rgba(0, 0, 0, 0.2)", // depth/2 잔존
  hoverShift: "2px", //                            depth/2 이동
  activeShift: "4px", //                           depth 전부 이동(그림자 0) — = motion.pressOffset
} as const;

// ───── Shape — 전부 샤프 + 두꺼운 검정 테두리 ──────────────────────────────
export const radius = { none: "0" } as const; // pill 도 샤프
export const border = {
  width: "2px", //         표준 테두리
  widthBold: "3px", //     강조
  color: color.line, //    항상 검정
} as const;

// ───── Space — 내부 padding/gap 스케일 ─────────────────────────────────────
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
  // code/터미널 — 영문 mono + 한글 Pretendard fallback(tofu 회피). self-host/CDN 없이 시스템 폰트로.
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, "Pretendard Variable", Pretendard, monospace',
  weight: {
    regular: 400, //       body 후보
    medium: 500,
    bold: 700,
    black: 900, //         brutalist chrome 기본 (uppercase 라벨)
  },
  // vff/original 의 Tailwind 스케일 그대로 (rem ladder · base 16px). 원자 escape hatch.
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
  // 원자 — role 합성 토큰이 키로 참조. 흩어진 raw line-height/letter-spacing 회수.
  lineHeight: {
    flat: "1", //      single-line 컨트롤
    tight: "1.1", //   heading/display
    snug: "1.4", //    title/toc
    normal: "1.5", //  body
    relaxed: "1.6", // table cell 등 읽기
  },
  tracking: {
    tighter: "-0.05em", // 워드마크/display
    tight: "-0.02em", //   heading
    normal: "0",
    chrome: "0.05em", //   chrome 라벨 기본
    wide: "0.08em", //     navlink
    wider: "0.18em", //    overline/toc 라벨
    widest: "0.2em", //    nav-label
  },
  // chrome 텍스트의 정체성 — uppercase + 넓은 자간 + black. (하위호환 유지)
  chrome: {
    transform: "uppercase",
    weight: 900,
    tracking: "0.05em",
  },
  // role 합성 토큰 — size/weight/lineHeight/tracking(원자 키 참조) 묶음.
  // gen-tokens.ts 가 .funky-text--{role} 정적 클래스로 구움(CSS 변수로 안 펼침 = 폭발 회피).
  // "구조 loud(display/heading/title/chrome/overline=black·uppercase·tight) · 내용 quiet(body/caption=medium)".
  // 기존 3종(heading/body/chrome)은 현행 렌더와 *값 동일*(자간 없는 heading/body 보존).
  role: {
    display:  { size: "4xl", weight: "black",  lineHeight: "tight",  tracking: "tighter" },
    heading:  { size: "xl",  weight: "black",  lineHeight: "tight" },
    title:    { size: "lg",  weight: "bold",   lineHeight: "snug" },
    body:     { size: "md",  weight: "medium", lineHeight: "normal" },
    caption:  { size: "sm",  weight: "medium", lineHeight: "normal" },
    chrome:   { size: "xs",  weight: "black",  tracking: "chrome", transform: "uppercase" },
    overline: { size: "2xs", weight: "black",  tracking: "wider",  transform: "uppercase" },
    code:     { size: "sm",  weight: "regular", lineHeight: "normal", family: "mono" },
  },
} as const;

// ───── Sizing — interactive 단위를 묶음으로 통일 (height + padX + fontSize) ──
//
// control = 인터랙티브 컨트롤(Button·Input·Select·Tab). 한 size 가 3 값을 동시 결정.
// label   = 라벨류(Badge·Tag·Chip) — control 에 안 욱여넣는다(height 성격이 다름).
export const control = {
  sm: { height: "1.75rem", padX: space.md, fontSize: font.size.xs }, // 28 · 12 · 12
  md: { height: "2.25rem", padX: space.lg, fontSize: font.size.sm }, // 36 · 16 · 14 ◀ 앵커
  lg: { height: "2.75rem", padX: space.xl, fontSize: font.size.md }, // 44 · 24 · 16 (touch)
} as const;

// 하위호환 — 기존 controlHeight import 를 깨지 않도록 alias 유지.
export const controlHeight = {
  sm: control.sm.height,
  md: control.md.height,
  lg: control.lg.height,
} as const;

export const label = {
  sm: { height: "1rem",    padX: space.xs, fontSize: font.size["2xs"] }, // 16 · 6 · 10
  md: { height: "1.25rem", padX: space.xs, fontSize: font.size.xs }, //     20 · 6 · 12 ◀ 현행 badge
  lg: { height: "1.5rem",  padX: space.sm, fontSize: font.size.sm }, //     24 · 8 · 14
} as const;

// atom intrinsic — control/label ladder 와 무관한 고정 치수(checkbox/radio/switch).
export const atom = {
  checkbox: "1.25rem",
  radio: "1.25rem",
  switchW: "2.375rem", //   track 38×22 (border-box → 내부 34×18) — 체크박스급 컴팩트
  switchH: "1.375rem",
  switchGap: "0.125rem", //  thumb 여백 2px
  switchThumb: "0.875rem", //14px 정사각 thumb (내부높이 18 − 여백 2×2)
  switchTravel: "1rem", //   16px = 내부폭(34) − 여백(2×2) − thumb(14)
} as const;

// ───── Motion — press-into-shadow 시그니처 + 시간 어휘 ──────────────────────
export const motion = {
  duration: "100ms", // 하위호환 별칭 (= durations.snap)
  easing: "ease-out",
  pressOffset: "4px", // active 시 x/y 이동(= depth) + shadow 제거. = press.activeShift
  // 시간 어휘(primitive) — 컴포넌트 transition(snap)·overlay 전환(base)·앱 entrance(slow)가
  // 공유하는 스케일. core 는 *값*만 제공한다 — entrance/scroll 오케스트레이션은 앱 몫.
  durations: {
    snap: "100ms", //  미세 피드백 (press/lift·hover tint) — 현행
    base: "180ms", //  상태 전환·overlay 열림
    slow: "300ms", //  reveal·entrance (앱 orchestration 용)
  },
  stagger: "60ms", //  순차 reveal 간격 (앱이 delay 계산에 사용)
} as const;

export const tokens = {
  color,
  role,
  accent,
  roleColor,
  shadow,
  press,
  radius,
  border,
  space,
  font,
  control,
  controlHeight,
  label,
  atom,
  motion,
} as const;

export type Tokens = typeof tokens;
