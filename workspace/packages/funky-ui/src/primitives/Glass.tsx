import type { ElementType } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { boxClass, type BoxOwnProps } from "./Box";
import { glassBase, glassHoverable, glassSelected } from "./Glass.css";

export interface GlassOwnProps extends BoxOwnProps {
  /** 골라진 상태 — 더 짙은 유리와 글자색 테두리. aria 속성(pressed · current)은 쓰는 쪽이 붙입니다 */
  selected?: boolean;
  /** hover 때 유리가 짙어지고 테두리가 글자색이 됩니다 — Pressable 없이 혼자 동작합니다 */
  hoverable?: boolean;
}

export type GlassProps<E extends ElementType = "div"> = PolyProps<E, GlassOwnProps>;

/** Glass 의 prop 을 class 로 — Pressable 에 유리를 얹을 때 씁니다 (NavButton) */
export function glassClass({ selected = false, hoverable = false, ...box }: GlassOwnProps): string {
  return cx(glassBase, selected && glassSelected, hoverable && glassHoverable, boxClass(box));
}

/**
 * 바 위의 유리 — 2차 primitive (Box + 칠). 색 바(AppBar · BottomNav · solid Paint) 위에 놓이는 반투명 면입니다.
 * 바의 글자색(`currentColor`)을 묽혀 만들어서 보라 바 위에서는 흰 유리, 시안 · 노랑 바 위에서는 검은 유리가 되고,
 * accent 를 받지 않습니다 — 색은 놓인 바가 정합니다. 흰 면 · 크림 위의 요소는 `Paint`, 흑백 박스는 `Surface`.
 *
 * ```tsx
 * <Glass hoverable paddingX="md" paddingY="xs">2026-2</Glass>
 * <Pressable motion="tap" className={glassClass({ selected, hoverable: true })}>홈</Pressable>
 * ```
 */
export function Glass<E extends ElementType = "div">({ as, selected, hoverable, padding, paddingX, paddingY, className, ...rest }: GlassProps<E>) {
  const Comp: ElementType = as ?? "div";
  return <Comp className={glassClass({ selected, hoverable, padding, paddingX, paddingY, className })} {...rest} />;
}
