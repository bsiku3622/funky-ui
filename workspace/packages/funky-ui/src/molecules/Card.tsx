import type { ElementType, ReactNode } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { Box } from "../primitives/Box";
import { Icon, type IconComponent } from "../primitives/Icon";
import { Inline } from "../primitives/layout";
import { Paint } from "../primitives/Paint";
import { Pressable } from "../primitives/Pressable";
import { Surface, surfaceClass } from "../primitives/Surface";
import { Text } from "../primitives/Text";
import type { Accent, PressMotion, Space, SurfaceFill } from "../tokens/vocabulary";
import { cardBase, cardHeader, cardHeaderBar, cardHeaderTitle, cardSection, cardSectionDivided } from "./Card.css";

export interface CardOwnProps {
  /** 카드 안에 흐를 accent — 면은 흑백 그대로이고, 안쪽 버튼 · 배지가 이 색을 따릅니다 */
  accent?: Accent;
  /** 흑백 면 (기본 `raised` — 흰 면) */
  fill?: SurfaceFill;
  /** 기본 `raised`(4px). 모달이 아니면 `floating` 을 쓰지 않습니다. `motion` 을 주면 몸짓이 그림자를 가집니다 */
  shadow?: "raised" | "none";
  /** 기본 `3xl`(24px). 머리 막대를 붙이려면 `0` 을 주고 `Card.Header` · `Card.Section` 으로 나눕니다 */
  padding?: Space;
  /** 카드 전체가 누르는 물건이면 — 가라앉거나(press) 떠오릅니다(lift) */
  motion?: PressMotion;
  className?: string;
  children?: ReactNode;
}

export type CardProps<E extends ElementType = "div"> = PolyProps<E, CardOwnProps>;

const SurfaceRoot = Surface as ElementType;
const PressableRoot = Pressable as ElementType;

/** 카드 — `Surface`(흰 면 · 2px 검정 · 4px 그림자) 위에 섭니다. 화면의 영역은 카드로 나눕니다 */
export function Card<E extends ElementType = "div">({
  as,
  accent,
  fill = "raised",
  shadow = "raised",
  padding = "3xl",
  motion,
  className,
  ...rest
}: CardProps<E>) {
  if (motion) {
    // 누르는 카드 — 몸짓(Pressable)이 그림자를 갖고, 면과 테두리만 Surface 에서 빌려 옵니다
    return (
      <PressableRoot as={as} motion={motion} accent={accent} padding={padding} className={cx(surfaceClass({ fill, border: "line" }), cardBase, className)} {...rest} />
    );
  }
  return <SurfaceRoot as={as} fill={fill} border="line" shadow={shadow} accent={accent} padding={padding} className={cx(cardBase, className)} {...rest} />;
}

export interface CardHeaderProps {
  title: ReactNode;
  icon?: IconComponent;
  /** 오른쪽 끝 — 개수 · 버튼 */
  actions?: ReactNode;
  /** `bar` 는 카드의 accent 를 Paint 의 solid 로 칠한 머리 막대 (모달 머리와 같은 모양) */
  tone?: "plain" | "bar";
  className?: string;
}

const PaintRoot = Paint as ElementType;

/** 카드 머리 — 섹션 소제목 글자 + 오른쪽 끝 자리 */
function CardHeader({ title, icon, actions, tone = "plain", className }: CardHeaderProps) {
  const bar = tone === "bar";
  const content = (
    <>
      <Inline gap="md" className={cardHeaderTitle}>
        {icon && <Icon icon={icon} size={18} tone={bar ? "inherit" : "muted"} />}
        <Text variant="subtitle" tone={bar ? "inherit" : undefined} truncate>
          {title}
        </Text>
      </Inline>
      {actions && <Inline gap="sm">{actions}</Inline>}
    </>
  );
  return bar ? (
    <PaintRoot as={Inline} variant="solid" justify="between" gap="md" className={cx(cardHeader, cardHeaderBar, className)}>
      {content}
    </PaintRoot>
  ) : (
    <Inline justify="between" gap="md" className={cx(cardHeader, className)}>
      {content}
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
