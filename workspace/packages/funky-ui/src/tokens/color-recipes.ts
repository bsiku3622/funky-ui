/**
 * Variant 레시피 — 11 variant 가 accent 사다리의 어느 칸을 글자 · 면 · 테두리에 쓰고,
 * hover 때 무엇이 바뀌는지. 숫자도 hex 도 없고 **칸 이름만** 있습니다.
 *
 * 그래서 accent 를 바꾸면 variant 규칙은 그대로 둔 채 색만 바뀝니다 (accent × variant).
 */
import type { Variant } from "./vocabulary";

/**
 * 칸 이름.
 * - accent 사다리: `ink` · `solidInk` · `solid` · `soft` · `softInk`
 * - accent 와 무관한 시스템 값: `black`(본문 잉크 #222) · `gray`(약한 글자) · `line`(2px 검정) · `none`(투명)
 */
export type Rung = "ink" | "solidInk" | "solid" | "soft" | "softInk" | "black" | "gray" | "line" | "none";

/** hover 때 면 위에 얹는 층 */
export type Layer = "white" | "gray" | "tint" | "none";

export interface VariantRecipe {
  fg: Rung;
  bg: Rung;
  border: Rung;
  /** hover — 적지 않은 칸은 쉬는 상태 그대로입니다 */
  hover: { layer?: Layer; fg?: Rung; border?: Rung };
}

/**
 * 표의 출처는 재원님의 Accent × Variant 스케치(2026-10-29)입니다. 한 군데만 해석을 더했습니다:
 *
 * - **Tonal 의 글자는 `ink`** 입니다. 표에는 Black 이라 적혀 있는데, 밝은 accent 에서는 ink 가
 *   곧 검정이라 같은 값이고, 보라처럼 ink 가 흰색인 accent 에서는 검정 글자가 2.2:1 로 읽히지
 *   않아 흰색으로 둡니다. 테두리 Ink 는 선이므로 `line`(#000)입니다.
 *   → Tonal = Solid 면 + 검정 테두리.
 */
export const VARIANT_RECIPES = {
  solid: { fg: "ink", bg: "solid", border: "solid", hover: { layer: "white" } },
  outline: { fg: "solidInk", bg: "none", border: "solid", hover: { layer: "tint" } },
  hairline: { fg: "solidInk", bg: "none", border: "soft", hover: { border: "solid" } },
  frameline: { fg: "black", bg: "none", border: "solid", hover: { layer: "tint" } },
  framelineMuted: { fg: "gray", bg: "none", border: "solid", hover: { layer: "tint" } },
  plain: { fg: "solidInk", bg: "soft", border: "solid", hover: { layer: "gray" } },
  tonal: { fg: "ink", bg: "solid", border: "line", hover: { layer: "white" } },
  tonalMuted: { fg: "black", bg: "soft", border: "line", hover: { layer: "gray" } },
  muted: { fg: "softInk", bg: "none", border: "soft", hover: { border: "solid", fg: "solidInk" } },
  ghost: { fg: "solidInk", bg: "none", border: "none", hover: { fg: "softInk" } },
  ghostMuted: { fg: "softInk", bg: "none", border: "none", hover: { fg: "solidInk" } },
} as const satisfies Record<Variant, VariantRecipe>;

/** 선택된 컨트롤은 같은 accent 의 이 variant 로 바뀝니다 — 색이 "골랐다" 를 말합니다 */
export const SELECTED_VARIANT: Variant = "solid";

/** 테두리가 없는 variant — 그림자를 받지 않습니다 (가라앉을 상자가 없습니다) */
export const BORDERLESS_VARIANTS: readonly Variant[] = ["ghost", "ghostMuted"];
