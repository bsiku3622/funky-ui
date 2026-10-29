/**
 * Cascade layer — 패키지 CSS 는 전부 `fk` 레이어 안에 듭니다.
 *
 *   fk.reset < fk.theme < fk.base < fk.components < fk.utilities
 *
 * 뒤의 레이어가 특정도와 무관하게 이깁니다. 앱 CSS 는 레이어 밖(또는 `fk` 뒤의 레이어)에 두면
 * 로드 순서와 무관하게 패키지를 이깁니다. Tailwind v4 와 함께 쓸 때는 앱 CSS 맨 위에
 * `@layer fk, theme, base, components, utilities;` 를 먼저 선언합니다 (docs/get-started/install.md).
 */
import { globalLayer } from "@vanilla-extract/css";

export const fk = globalLayer("fk");
export const reset = globalLayer({ parent: fk }, "reset");
export const theme = globalLayer({ parent: fk }, "theme");
export const base = globalLayer({ parent: fk }, "base");
export const components = globalLayer({ parent: fk }, "components");
export const utilities = globalLayer({ parent: fk }, "utilities");
