/**
 * Playground 항목 하나의 모양 — 컨트롤 · 처음 값 · 컴포넌트 기본값 · 그리는 법.
 *
 * 코드 패널은 손으로 쓴 문자열이 아니라 같은 props 를 `printJsx` 로 찍은 것이라, 미리보기와
 * 어긋날 수 없습니다. 선택지는 `/tokens` 의 어휘 배열에서 가져옵니다 (손으로 쓴 목록 금지).
 */
import type { ReactNode } from "react";
import type { Layer } from "@studio-baeks/funky-ui";

export type Control =
  | { kind: "select"; options: readonly string[] }
  | { kind: "boolean" }
  | { kind: "text" }
  | { kind: "number"; min?: number; max?: number; step?: number }
  /** 아이콘 이름 — `ICONS` 지도에서 컴포넌트로 바뀝니다 */
  | { kind: "icon" };

export type Values = Record<string, unknown>;

export interface Section {
  title: string;
  note?: string;
  render: () => ReactNode;
}

export interface Spec {
  /** 컴포넌트 이름 — 인벤토리와 같아야 합니다 */
  name: string;
  /** 한 줄 설명 */
  summary: string;
  /** 만질 수 있는 prop */
  controls?: Record<string, Control>;
  /** 처음 화면의 값 */
  initial?: Values;
  /** 컴포넌트 자신의 기본값 — 코드에서 이 값과 같은 prop 은 생략합니다 */
  defaults?: Values;
  /** 미리보기 */
  render: (values: Values) => ReactNode;
  /** 코드 — 없으면 `printJsx(name, values, defaults)` */
  code?: (values: Values) => string;
  /** 미리보기 판의 바탕 (기본 canvas) */
  stage?: "canvas" | "raised" | "dark";
  /** 아래에 붙는 표본 절 — 행렬 · 크기 · 상태 */
  sections?: Section[];
}

export interface Entry extends Spec {
  layer: Exclude<Layer, "foundations">;
  group: string;
  slug: string;
}
