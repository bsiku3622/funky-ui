/**
 * 떠 있는 판 둘 — Tooltip(설명) · Menu(고르는 목록).
 * body 끝(Portal)에 그려서 카드의 overflow 에 잘리지 않습니다.
 */
import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";

import { cx } from "../internal/cx";
import { CheckGlyph } from "../internal/glyphs";
import { useAnchor, type AnchorAlign, type Placement } from "../internal/useAnchor";
import { Portal } from "../primitives/a11y";
import { Icon, type IconComponent } from "../primitives/Icon";
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

/** 설명 풍선 — 검정 면 · 흰 글자. 마우스를 올리거나 키보드로 포커스하면 뜹니다 */
export function Tooltip({ content, children, placement = "top", delay = 300, disabled = false }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const anchor = useRef<HTMLSpanElement>(null);
  const floating = useRef<HTMLDivElement>(null);
  const id = useId();
  const style = useAnchor(open, anchor, floating, placement, "center");

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
        <Portal>
          <div ref={floating} id={id} role="tooltip" className={cx(surfaceClass({ fill: "inverse", border: "line", shadow: "raised" }), tooltip)} style={style}>
            {content}
          </div>
        </Portal>
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
 * 고르는 목록 — 흰 판 · 2px 검정 · 4px 그림자. 바깥을 누르거나 Esc 로 닫히고, 방향키로 옮깁니다.
 */
export function Menu<V extends string>({ trigger, items, value, onSelect, align = "start", "aria-label": ariaLabel }: MenuProps<V>) {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLSpanElement>(null);
  const floating = useRef<HTMLDivElement>(null);
  const id = useId();
  const style = useAnchor(open, anchor, floating, "bottom", align);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!anchor.current?.contains(t) && !floating.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    // 열리면 골라진 칸(없으면 첫 칸)으로 포커스를 옮깁니다
    const first = floating.current?.querySelector<HTMLElement>('[aria-checked="true"]') ?? floating.current?.querySelector<HTMLElement>('[role^="menuitem"]');
    first?.focus();
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    anchor.current?.querySelector<HTMLElement>("button, a, [tabindex]")?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" || e.key === "Tab") return close();
    const list = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role^="menuitem"]:not(:disabled)'));
    const i = list.indexOf(document.activeElement as HTMLElement);
    const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (step) {
      e.preventDefault();
      list[(i + step + list.length) % list.length]?.focus();
    }
  };

  return (
    <span ref={anchor} className={anchorWrap}>
      {cloneElement(trigger, {
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": open ? id : undefined,
        onClick: () => setOpen((v) => !v),
      })}
      {open && (
        <Portal>
          <div
            ref={floating}
            id={id}
            role="menu"
            aria-label={ariaLabel}
            className={cx(surfaceClass({ border: "line", shadow: "raised" }), menu)}
            style={style}
            onKeyDown={onKeyDown}
          >
            {items.map((item) => {
              const selected = value !== undefined && item.value === value;
              return (
                <button
                  key={item.value}
                  type="button"
                  role={value === undefined ? "menuitem" : "menuitemradio"}
                  aria-checked={value === undefined ? undefined : selected}
                  disabled={item.disabled}
                  tabIndex={-1}
                  className={cx(surfaceClass({ fill: selected ? "inverse" : "none", hoverable: true }), menuItem)}
                  onClick={() => {
                    onSelect(item.value);
                    close();
                  }}
                >
                  {item.icon && <Icon icon={item.icon} size="sm" />}
                  {item.label}
                  {selected && <CheckGlyph size={14} strokeWidth={3} className={menuItemCheck} />}
                </button>
              );
            })}
          </div>
        </Portal>
      )}
    </span>
  );
}
