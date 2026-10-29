import { useId, useState, type ReactNode } from "react";

import { cx } from "../internal/cx";
import { ChevronDownGlyph } from "../internal/glyphs";
import { Icon, type IconComponent } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { Card } from "./Card";
import { accordionBody, accordionChevron, accordionChevronOpen, accordionHeader } from "./Accordion.css";

export interface AccordionProps {
  title: ReactNode;
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

/** 접히는 카드 — 머리를 누르면 펼쳐지고, 내용은 카드 안 구분선 아래에 놓입니다 */
export function Accordion({ title, icon, trailing, open, defaultOpen = false, onOpenChange, className, children }: AccordionProps) {
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
      <button type="button" id={headerId} className={accordionHeader} aria-expanded={isOpen} aria-controls={isOpen ? id : undefined} onClick={toggle}>
        {icon && <Icon icon={icon} size="lg" strokeWidth={3} />}
        <Text variant="heading" truncate>
          {title}
        </Text>
        {trailing}
        <ChevronDownGlyph size={22} strokeWidth={3} className={cx(accordionChevron, isOpen && accordionChevronOpen)} />
      </button>
      {isOpen && (
        <div id={id} role="region" aria-labelledby={headerId} className={accordionBody}>
          {children}
        </div>
      )}
    </Card>
  );
}
