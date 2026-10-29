import type { ElementType, ReactNode } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { Box } from "../primitives/Box";
import { Icon, type IconComponent } from "../primitives/Icon";
import { Inline } from "../primitives/layout";
import { Pressable } from "../primitives/Pressable";
import { Text } from "../primitives/Text";
import type { Accent, PressMotion, Space, Surface } from "../tokens/vocabulary";
import { cardBase, cardHeader, cardHeaderBar, cardHeaderTitle, cardSection, cardSectionDivided } from "./Card.css";

export interface CardOwnProps {
  accent?: Accent;
  /** 기본 `raised`(흰 면) */
  surface?: Surface;
  /** 기본 `raised`(4px). 모달이 아니면 `floating` 을 쓰지 않습니다 */
  shadow?: "raised" | "none";
  /** 기본 `3xl`(24px). 머리 막대를 붙이려면 `0` 을 주고 `Card.Section` 으로 나눕니다 */
  padding?: Space;
  /** 카드 전체가 누르는 물건이면 — 가라앉거나(press) 떠오릅니다(lift) */
  motion?: PressMotion;
  className?: string;
  children?: ReactNode;
}

export type CardProps<E extends ElementType = "div"> = PolyProps<E, CardOwnProps>;

/** 카드 — 흰 면 · 2px 검정 · 4px 그림자. 화면의 영역은 카드로 나눕니다 */
export function Card<E extends ElementType = "div">({
  as,
  accent,
  surface = "raised",
  shadow = "raised",
  padding = "3xl",
  motion,
  className,
  ...rest
}: CardProps<E>) {
  // 누르는 카드는 Pressable 이 그림자와 몸짓을 같이 가집니다
  const Root: ElementType = motion ? Pressable : Box;
  const own = motion ? { motion } : { shadow };
  return (
    <Root as={as} accent={accent} surface={surface} border="line" padding={padding} className={cx(cardBase, className)} {...own} {...rest} />
  );
}

export interface CardHeaderProps {
  title: ReactNode;
  icon?: IconComponent;
  /** 오른쪽 끝 — 개수 · 버튼 */
  actions?: ReactNode;
  /** `bar` 는 accent 면으로 칠한 머리 막대 (모달 머리와 같은 모양) */
  tone?: "plain" | "bar";
  className?: string;
}

/** 카드 머리 — 섹션 소제목 글자 + 오른쪽 끝 자리 */
function CardHeader({ title, icon, actions, tone = "plain", className }: CardHeaderProps) {
  return (
    <Inline justify="between" gap="md" className={cx(cardHeader, tone === "bar" && cardHeaderBar, className)}>
      <Inline gap="md" className={cardHeaderTitle}>
        {icon && <Icon icon={icon} size={18} tone={tone === "bar" ? "inherit" : "muted"} />}
        <Text variant="subtitle" tone={tone === "bar" ? "inherit" : undefined} truncate>
          {title}
        </Text>
      </Inline>
      {actions && <Inline gap="sm">{actions}</Inline>}
    </Inline>
  );
}

export interface CardSectionProps {
  /** 위에 카드 안 구분선 — 카드 안에 카드를 넣지 말고 이걸로 나눕니다 */
  divided?: boolean;
  padding?: Space;
  className?: string;
  children?: ReactNode;
}

function CardSection({ divided, padding = "3xl", className, children }: CardSectionProps) {
  return (
    <Box padding={padding} className={cx(cardSection, divided && cardSectionDivided, className)}>
      {children}
    </Box>
  );
}

Card.Header = CardHeader;
Card.Section = CardSection;
