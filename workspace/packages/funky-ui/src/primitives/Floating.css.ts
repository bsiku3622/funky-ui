/** 떠 있는 판의 층 (fk.primitives) — 쌓는 순서만 정합니다. 면 · 테두리 · 그림자는 Surface, 등장은 styles/enter */
import { styleVariants } from "@vanilla-extract/css";

import { primitives } from "../tokens/layers.css";
import { Z } from "../tokens/layout";

const p = (rule: Record<string, unknown>) => ({ "@layer": { [primitives]: rule } });

export const floatingLayer = styleVariants({
  dropdown: p({ zIndex: Z.dropdown }),
  tooltip: p({ zIndex: Z.tooltip }),
});
