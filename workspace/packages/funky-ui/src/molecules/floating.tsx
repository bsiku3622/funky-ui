/**
 * 떠 있는 판 둘 — Tooltip(설명) · Menu(고르는 목록).
 * 둘 다 `Floating` 위에 섭니다 — 문서 끝에 그려 카드의 overflow 에 잘리지 않고, 바깥 누름 · Esc 로 닫힙니다.
 */
import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type AriaRole, type ReactElement, type ReactNode } from "react";

import { cx } from "../internal/cx";
import { CheckGlyph } from "../internal/glyphs";
import type { AnchorAlign, Placement } from "../internal/useAnchor";
import { Floating } from "../primitives/Floating";
import { Icon, type IconComponent } from "../primitives/Icon";
import { usePressable } from "../primitives/Pressable";
import { useSelectable, useSelectableGroup } from "../primitives/Selectable";
import { surfaceClass } from "../primitives/Surface";
import { anchorWrap, menu, menuItem, menuItemCheck, tooltip } from "./floating.css";

export interface TooltipProps {
  content: ReactNode;
  /** 설명을 붙일 요소 하나 (버튼 · 배지) */
  children: ReactElement<Record<string, unknown>>;
  placement?: Placement;
  /** ms (기본 300) */
  delay?: number;
  /** 켜지 않을 때 — 예: ⌘ 를 누를 때만 보이는 설명 (`disabled={!modifierPressed}`) */
  disabled?: boolean;
}

/** 설명 풍선 — 검정 면 · 흰 글자. 마우스를 올리거나 키보드로 포커스하면 뜨고, Esc 로 닫힙니다 */
export function Tooltip({ content, children, placement = "top", delay = 300, disabled = false }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const anchor = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  const show = () => {
    if (disabled) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };

  return (
    <span ref={anchor} className={anchorWrap} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {isValidElement(children) ? cloneElement(children, { "aria-describedby": open ? id : undefined }) : children}
      {open && (
        <Floating
          anchor={anchor}
          placement={placement}
          align="center"
          layer="tooltip"
          onDismiss={hide}
          id={id}
          role="tooltip"
          className={cx(surfaceClass({ fill: "inverse", border: "line", shadow: "raised" }), tooltip)}
        >
          {content}
        </Floating>
      )}
    </span>
  );
}

export interface MenuItem<V extends string> {
  value: V;
  label: ReactNode;
  icon?: IconComponent;
  disabled?: boolean;
}

export interface MenuProps<V extends string> {
  /** 여는 버튼 하나 — 누름 · aria 속성은 Menu 가 붙입니다 */
  trigger: ReactElement<Record<string, unknown>>;
  items: readonly MenuItem<V>[];
  /** 골라진 값 — 있으면 체크와 검정 면으로 표시합니다 */
  value?: V;
  onSelect: (value: V) => void;
  /** 판을 버튼의 어느 쪽 끝에 맞출지 (기본 start) */
  align?: AnchorAlign;
  "aria-label"?: string;
}

/**
 * 고르는 목록 — 흰 판 · 2px 검정 · 4px 그림자. 바깥을 누르거나 Esc 로 닫히고, ↑↓ · Home · End 로 옮깁니다.
 * 옮기기는 고르는 무리(`useSelectableGroup`)가 맡고, 메뉴라서 옮겨도 고르지 않습니다 — Enter 나 누름으로 고릅니다.
 */
export function Menu<V extends string>({ trigger, items, value, onSelect, align = "start", "aria-label": ariaLabel }: MenuProps<V>) {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLSpanElement>(null);
  const id = useId();

  const close = () => {
    setOpen(false);
    anchor.current?.querySelector<HTMLElement>("button, a, [tabindex]")?.focus();
  };
  const { groupProps, itemProps } = useSelectableGroup({
    value,
    onChange: (v: V) => {
      onSelect(v);
      close();
    },
    selectOnFocus: false,
    orientation: "vertical",
  });

  return (
    <span ref={anchor} className={anchorWrap}>
      {cloneElement(trigger, {
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": open ? id : undefined,
        onClick: () => setOpen((v) => !v),
      })}
      {open && (
        <Floating
          anchor={anchor}
          align={align}
          // Esc 는 버튼으로 포커스를 돌려주고, 바깥 누름은 누른 자리에 포커스를 둡니다
          onDismiss={(reason) => (reason === "escape" ? close() : setOpen(false))}
          // 열리면 골라진 칸(없으면 첫 칸)으로 포커스를 옮깁니다
          initialFocus={(panel) => panel.querySelector<HTMLElement>('[aria-checked="true"]') ?? panel.querySelector<HTMLElement>('[role^="menuitem"]')}
          id={id}
          role="menu"
          aria-label={ariaLabel}
          className={cx(surfaceClass({ border: "line", shadow: "raised" }), menu)}
          onKeyDown={(e) => (e.key === "Tab" ? close() : groupProps.onKeyDown(e))}
        >
          {items.map((item) => (
            <MenuEntry key={item.value} item={item} role={value === undefined ? "menuitem" : "menuitemradio"} {...itemProps(item.value)} />
          ))}
        </Floating>
      )}
    </span>
  );
}

interface MenuEntryProps<V extends string> {
  item: MenuItem<V>;
  role: AriaRole;
  selected?: boolean;
  onClick: () => void;
}

/** 메뉴 칸 — 움직이지 않는 Pressable 에 골라짐(aria-checked)과 hover 층 · 골라진 검정 면(Surface)을 얹습니다 */
function MenuEntry<V extends string>({ item, role, selected, onClick, ...rest }: MenuEntryProps<V>) {
  const { Comp, pressProps } = usePressable({ disabled: item.disabled });
  const { selectProps } = useSelectable({ selected, role });
  return (
    <Comp
      {...pressProps}
      {...selectProps}
      {...rest}
      // 메뉴 안은 방향키로만 옮깁니다 — Tab 은 메뉴를 닫고 다음 요소로 갑니다
      tabIndex={-1}
      onClick={onClick}
      className={cx(pressProps.className, surfaceClass({ fill: selected ? "inverse" : "none", hoverable: true }), menuItem)}
    >
      {item.icon && <Icon icon={item.icon} size="sm" />}
      {item.label}
      {selected && <CheckGlyph size={14} strokeWidth={3} className={menuItemCheck} />}
    </Comp>
  );
}
