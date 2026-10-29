import { style } from "@vanilla-extract/css";

import { components } from "../tokens/layers.css";

/** 글자 줄에 끼어도 줄 높이를 흔들지 않게 블록으로 두고, 좁아져도 찌그러지지 않습니다 */
export const iconBase = style({ "@layer": { [components]: { display: "block", flexShrink: 0 } } });
