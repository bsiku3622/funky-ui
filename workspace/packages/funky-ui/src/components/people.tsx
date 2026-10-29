/**
 * 사람 — StudentBadge(학번 배지) · PersonCard(학생 · 교사 카드).
 * 색은 앱이 학번 · 학과로 정해 `color`(hex)로 넘깁니다 (`getStudentColor()`).
 */
import type { ReactNode } from "react";

import { cx } from "../internal/cx";
import { Pressable } from "../primitives/Pressable";
import { badge, badgeBuzz, badgeClickable, badgeSize, personBody, personCard, personHead, personId, personItem, personItems, personName, personTitle } from "./people.css";
import { toneStyle } from "./tone";

export interface StudentBadgeProps {
  /** 학번 앞 두 자리 (기수) */
  cohort: string;
  name: string;
  /** 기수 색 (hex) */
  color: string;
  size?: "xs" | "sm" | "md";
  /** 검색어와 맞는 사람만 잠깐 떱니다 — 나머지를 흐리게 지우지 않습니다 */
  buzz?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * 학번 배지 — `25 이름`. ⚠️ hover 효과를 두지 않습니다. 배지는 늘어놓고 읽는 물건이라 마우스가
 * 지나가는 자리마다 반응하면, 정작 움직여야 할 것(찾는 사람의 진동)이 묻힙니다.
 */
export function StudentBadge({ cohort, name, color, size = "xs", buzz = false, onClick, className }: StudentBadgeProps) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cx(badge, badgeSize[size], onClick && badgeClickable, buzz && badgeBuzz, className)}
      style={toneStyle(color)}
    >
      {cohort} {name}
    </Comp>
  );
}

export interface PersonCardProps {
  /** 학번 · 교번 */
  id: ReactNode;
  name: ReactNode;
  /** 사람의 색 (hex) — 왼쪽 칸의 면과 이름, 목록의 띠 */
  color: string;
  /** 오른쪽 칸 머리 (overline) — "Enrolled Classes" */
  title?: ReactNode;
  /** 오른쪽 칸의 목록 (과목명) */
  items?: readonly ReactNode[];
  onClick?: () => void;
  className?: string;
}

/** 사람 카드 — 왼쪽은 그 사람의 색, 오른쪽은 흰 면의 목록. 누르면 그림자 속으로 가라앉습니다 */
export function PersonCard({ id, name, color, title, items = [], onClick, className }: PersonCardProps) {
  const inner = (
    <>
      <div className={personHead}>
        <span className={personId}>{id}</span>
        <span className={personName}>{name}</span>
      </div>
      <div className={personBody}>
        {title && <p className={personTitle}>{title}</p>}
        <div className={personItems}>
          {items.map((item, i) => (
            <span key={i} className={personItem}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
  if (onClick) {
    return (
      <Pressable motion="press" onClick={onClick} className={cx(personCard, className)} style={toneStyle(color)}>
        {inner}
      </Pressable>
    );
  }
  return (
    <div className={cx(personCard, className)} style={toneStyle(color)}>
      {inner}
    </div>
  );
}
