import { useId, useState, type ReactNode } from "react";

import { cx } from "../internal/cx";
import { ChevronDownGlyph } from "../internal/glyphs";
import { Icon, type IconComponent } from "../primitives/Icon";
import { Pressable } from "../primitives/Pressable";
import { surfaceClass } from "../primitives/Surface";
import { Text } from "../primitives/Text";
import { enterClass } from "../styles/enter.css";
import { truncateClass } from "../styles/typography.css";
import type { AccordionTitle } from "../tokens/vocabulary";
import { Card } from "./Card";
import { accordionBody, accordionChevron, accordionChevronOpen, accordionHeader, accordionTitleSection } from "./Accordion.css";

export interface AccordionProps {
  title: ReactNode;
  /** 제목의 글자 (기본 `heading` — 20px). `section` 은 대문자 섹션 제목입니다 — 좁은 화면 14px, 넓은 화면 20px */
  titleStyle?: AccordionTitle;
  icon?: IconComponent;
  /** 제목 옆 — 개수 배지 같은 것 */
  trailing?: ReactNode;
  /** 제어할 때 */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children?: ReactNode;
}

/**
 * 접히는 카드 — 머리를 누르면 펼쳐지고, 내용은 카드 안 구분선 아래에 제자리에서 나타납니다(fade). 머리는 움직이지 않는
 * Pressable 위의 hover 층(Surface)입니다
 */
export function Accordion({ title, titleStyle = "heading", icon, trailing, open, defaultOpen = false, onOpenChange, className, children }: AccordionProps) {
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const id = useId();
  const headerId = `${id}-header`;
  const toggle = () => {
    if (open === undefined) setInner(!isOpen);
    onOpenChange?.(!isOpen);
  };
  return (
    <Card padding="0" className={className}>
      <Pressable id={headerId} className={cx(surfaceClass({ fill: "none", hoverable: true }), accordionHeader)} aria-expanded={isOpen} aria-controls={isOpen ? id : undefined} onClick={toggle}>
        {icon && <Icon icon={icon} size="lg" strokeWidth={3} />}
        {titleStyle === "section" ? (
          <span className={cx(accordionTitleSection, truncateClass)}>{title}</span>
        ) : (
          <Text variant="heading" truncate>
            {title}
          </Text>
        )}
        {trailing}
        <ChevronDownGlyph size={22} strokeWidth={3} className={cx(accordionChevron, isOpen && accordionChevronOpen)} />
      </Pressable>
      {isOpen && (
        <div id={id} role="region" aria-labelledby={headerId} className={cx(accordionBody, enterClass.fade)}>
          {children}
        </div>
      )}
    </Card>
  );
}
