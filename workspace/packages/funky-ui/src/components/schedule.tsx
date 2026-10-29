/**
 * 시간표 — ClassTile(수업 한 칸) · TimetableGrid(한 주 격자).
 *
 * 수업 칸은 학과색 문법(면 12% · 테두리 · 글자)을 따릅니다. "지금" 은 학과색 대신 핑크 사다리의
 * Plain 문법(soft 면 · solid 테두리 · solidInk 글자)이라, 글자는 AA 를 지키고 면은 옅게 남습니다.
 * ⚠️ "지금" 을 핑크로 꽉 채우지 않습니다 — 그 칸 하나가 화면에서 제일 센 물건이 되어 옆을 읽는 걸
 * 방해합니다.
 */
import type { CSSProperties, ReactNode } from "react";

import { cx } from "../internal/cx";
import { surfaceClass } from "../primitives/Surface";
import { NEONS } from "../tokens/palette";
import { tile, tileMeta, tileState, tileTitle, grid, gridCorner, gridCell, gridDay, gridDayToday, gridPeriod } from "./schedule.css";
import { toneStyle } from "./tone";

export type ClassTileState = "upcoming" | "now" | "past" | "free";

export interface ClassTileProps {
  /** 과목명 */
  title?: ReactNode;
  /** 아래 줄 — 교실 · 교사 · 시각 */
  meta?: ReactNode;
  /** 학과색 (hex). `now` 는 이 색을 무시하고 핑크를 씁니다 */
  color?: string;
  /**
   * - `upcoming` 학과색 · `now` 핑크(지금) · `past` 같은 색을 40% 로 · `free` 공강(점선, 면 없음)
   */
  state?: ClassTileState;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function ClassTile({ title, meta, color, state = "upcoming", className, style, children }: ClassTileProps) {
  const tone = state === "now" ? NEONS.pink : color;
  return (
    <div className={cx(tile, tileState[state], className)} style={toneStyle(tone, style)}>
      {title && <span className={tileTitle}>{title}</span>}
      {meta && <span className={tileMeta}>{meta}</span>}
      {children}
    </div>
  );
}

export interface TimetableDay {
  key: string;
  label: ReactNode;
  /** 오늘 — 검은 머리 줄에서 이 칸만 흰 칸으로 뒤집힙니다 */
  today?: boolean;
}

export interface TimetablePeriod {
  key: string;
  label: ReactNode;
}

export interface TimetableGridProps {
  days: readonly TimetableDay[];
  periods: readonly TimetablePeriod[];
  renderCell: (day: string, period: string) => ReactNode;
  /** 왼쪽 위 칸 (기본 "Pd") */
  corner?: ReactNode;
  className?: string;
}

/** 한 주 격자 — 머리 줄은 검정, 교시 열은 well, 칸 사이는 카드 안 구분선입니다 */
export function TimetableGrid({ days, periods, renderCell, corner = "Pd", className }: TimetableGridProps) {
  return (
    <div role="table" className={cx(surfaceClass({ border: "line" }), grid, className)} style={{ gridTemplateColumns: `2.5rem repeat(${days.length}, minmax(0, 1fr))` }}>
      <div role="row" style={{ display: "contents" }}>
        <div role="columnheader" className={gridCorner}>
          {corner}
        </div>
        {days.map((d) => (
          <div key={d.key} role="columnheader" className={cx(gridDay, d.today && gridDayToday)}>
            {d.label}
          </div>
        ))}
      </div>
      {periods.map((p) => (
        <div key={p.key} role="row" style={{ display: "contents" }}>
          <div role="rowheader" className={gridPeriod}>
            {p.label}
          </div>
          {days.map((d) => (
            <div key={d.key} role="cell" className={gridCell}>
              {renderCell(d.key, p.key)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
