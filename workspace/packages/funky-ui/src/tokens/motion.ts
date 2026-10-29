/**
 * Motion — 시간 · 곡선 · 누름의 거리.
 *
 * 시그니처는 **눌림**입니다: 떠 있는 물건이 hover 때 그림자 자리로 가라앉습니다. 가라앉는
 * 거리는 그림자 거리와 같아야 합니다 — 다르면 그림자가 본체 뒤로 비져 나옵니다.
 */
import { ELEVATION } from "./layout";

export const DURATION = {
  /** 눌림 · 색 바뀜 — class-explorer 의 duration-100 */
  fast: 100,
  /** 펼침 · 나타남 */
  base: 200,
  slow: 300,
  /** 시간선 위 캐럿처럼 연속으로 움직이는 위치 전용 */
  crawl: 700,
} as const;

export const EASING = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  linear: "linear",
} as const;

export const PRESS = {
  /** hover 때 가라앉는 거리 = raised 그림자 거리 */
  sink: ELEVATION.raised.offset,
  /** 누르는 순간 한 번 더 작아집니다 — 컨트롤 · 배지 */
  activeScale: 0.96,
  /** 큰 면(카드)은 덜 작아집니다 — 0.96 이면 400px 카드가 16px 나 줄어듭니다 */
  surfaceScale: 0.98,
  /** 로고처럼 hover 때 커지는 것 */
  grow: 1.05,
} as const;

export const LIFT = {
  /** 떠오르는 카드의 높이 */
  rise: 4,
} as const;

export const ms = (n: number) => `${n}ms`;
