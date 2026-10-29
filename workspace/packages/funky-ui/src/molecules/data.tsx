/** 숫자 몰레큘 둘 — Stat(큰 숫자 하나) · Meter(막대 한 줄) */
import { useId, type ReactNode } from "react";

import { cx } from "../internal/cx";
import { Inline, Stack } from "../primitives/layout";
import { surfaceClass } from "../primitives/Surface";
import { Text } from "../primitives/Text";
import { accentClass } from "../styles/accent.css";
import { resolveAccent, type Accent } from "../tokens/vocabulary";
import { meterFill, meterTrack, statUnit, statValue, statValueAccent } from "./data.css";

export interface StatProps {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  size?: "sm" | "lg";
  /** 숫자를 accent 의 진한 글자로 */
  accent?: Accent;
  className?: string;
}

/** 지표 — 이름표(overline) 위, 큰 숫자 아래 */
export function Stat({ label, value, unit, size = "lg", accent, className }: StatProps) {
  return (
    <Stack gap="xs" className={cx(accent && accentClass[resolveAccent(accent)], className)}>
      <Text variant={size === "lg" ? "subtitle" : "overline"}>{label}</Text>
      <Inline gap="sm" align="baseline">
        <span className={cx(statValue[size], accent && statValueAccent)}>{value}</span>
        {unit && <span className={statUnit[size]}>{unit}</span>}
      </Inline>
    </Stack>
  );
}

export interface MeterProps {
  label: ReactNode;
  value: number;
  max?: number;
  /** 막대 오른쪽에 적을 글자 (기본: 값) */
  valueLabel?: ReactNode;
  /** 막대 색 (기본: 바깥 accent, 없으면 검정) */
  accent?: Accent;
  className?: string;
}

/** 막대 한 줄 — 이름 · 막대 · 값. 홈은 well, 채움은 accent solid */
export function Meter({ label, value, max = 100, valueLabel, accent, className }: MeterProps) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const labelId = useId();
  return (
    <Stack gap="xs" className={cx(accent && accentClass[resolveAccent(accent)], className)}>
      <Inline justify="between" gap="md">
        <Text id={labelId} variant="caption" weight="black" truncate>
          {label}
        </Text>
        <Text variant="caption" weight="black" numeric>
          {valueLabel ?? value}
        </Text>
      </Inline>
      <div className={cx(surfaceClass({ fill: "well", border: "line" }), meterTrack)} role="meter" aria-labelledby={labelId} aria-valuemin={0} aria-valuemax={max} aria-valuenow={Math.min(max, Math.max(0, value))}>
        <div className={meterFill} style={{ width: `${ratio * 100}%` }} />
      </div>
    </Stack>
  );
}
