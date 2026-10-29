import type { AriaRole, ElementType, KeyboardEvent } from "react";

import { cx } from "../internal/cx";
import type { PolyProps } from "../internal/polymorphic";
import { boxClass, type BoxOwnProps } from "./Box";
import { grow as growClass } from "./Selectable.css";

/** 켜고 끄거나 하나를 고르는 role — 골라짐을 `aria-checked` 로 알립니다 */
const CHECKED_ROLES: ReadonlySet<string> = new Set(["radio", "checkbox", "switch", "menuitemradio", "menuitemcheckbox"]);
/** 목록 · 탭에서 고른 칸 — `aria-selected` 로 알립니다 */
const SELECTED_ROLES: ReadonlySet<string> = new Set(["tab", "option", "gridcell", "row", "treeitem"]);

/** '지금 여기' 의 종류 — `aria-current` 의 값입니다 */
export type SelectCurrent = "page" | "step" | "location" | "date" | "time" | true;

export interface SelectableOwnProps extends BoxOwnProps {
  /** 골라졌는가. 주지 않으면 고르는 물건이 아니라서 aria 도 붙지 않습니다 */
  selected?: boolean;
  /**
   * 요소의 role — 골라짐을 알리는 aria 가 이걸로 정해집니다. radio · checkbox · switch · menuitemradio 는
   * `aria-checked`, tab · option 은 `aria-selected`, 그 밖(그냥 버튼)은 `aria-pressed` 입니다
   */
  role?: AriaRole;
  /** 고른 것이 아니라 '지금 여기' 인 것 — 내비의 지금 화면은 `"page"`. 그러면 `aria-current` 하나로 알립니다 */
  current?: SelectCurrent;
  /**
   * 골라지면 105% 로 커져 이웃 위에 서고 4px 그림자를 그대로 둡니다. hover 때는 그림자만 숨기고, 누르면 100% 로
   * 돌아옵니다 — class-explorer 의 골라진 버튼. 그 자체로 몸짓이라 Pressable 의 `motion` 은 `none` 으로 둡니다
   */
  grow?: boolean;
}

export type SelectableProps<E extends ElementType = "div"> = PolyProps<E, SelectableOwnProps>;

function selectedAria(selected: boolean | undefined, role: AriaRole | undefined, current: SelectCurrent | undefined) {
  if (selected === undefined) return {};
  if (current !== undefined) return { "aria-current": selected ? current : undefined };
  if (role !== undefined && CHECKED_ROLES.has(role)) return { "aria-checked": selected };
  if (role !== undefined && SELECTED_ROLES.has(role)) return { "aria-selected": selected };
  return { "aria-pressed": selected };
}

/**
 * 골라짐의 속 — `<Selectable>` 과 Button · 메뉴 칸 · 내비 칸이 같이 씁니다. 골라짐을 쓰임에 맞는 aria **하나**로
 * 알리고(`role` · `current` 가 정합니다), `grow` 면 골라진 모양 class 를 붙입니다. 골라진 색은 칠의 `selected` 입니다.
 */
export function useSelectable({ selected, role, current, grow = false, ...box }: SelectableOwnProps) {
  return {
    selectProps: {
      role,
      ...selectedAria(selected, role, current),
      className: cx(grow && selected && growClass, boxClass(box)) || undefined,
    },
  };
}

/**
 * 골라지는 물건 — 2차 primitive (Box + 골라짐). '골라져 있다' 는 남아 있는 상태와 그 알림 · 모양을 맡습니다.
 * 누름(Pressable)은 순간의 반응이라 따로입니다 — 고르는 칸은 대개 둘을 같이 씁니다. 색은 하나도 없습니다:
 * 골라진 색은 칠(`Paint` · `Glass` · `Surface`)의 몫입니다.
 *
 * ```tsx
 * <Selectable as={Pressable} selected={on} grow className={paintClass({ selected: on, hoverable: true })}>A</Selectable>
 * ```
 */
export function Selectable<E extends ElementType = "div">({
  as,
  selected,
  role,
  current,
  grow,
  padding,
  paddingX,
  paddingY,
  className,
  ...rest
}: SelectableProps<E>) {
  const Comp: ElementType = as ?? "div";
  const { selectProps } = useSelectable({ selected, role, current, grow, padding, paddingX, paddingY, className });
  return <Comp {...selectProps} {...rest} />;
}

/** 무리 안의 칸을 찾는 표식 — 값을 그대로 담아, 방향키로 옮긴 칸의 값을 DOM 에서 바로 읽습니다 */
const ITEM_ATTR = "data-fk-value";
const ITEM_SELECTOR = `[${ITEM_ATTR}]:not(:disabled):not([aria-disabled='true'])`;

type Orientation = "horizontal" | "vertical" | "both";
const STEPS: Record<Orientation, Readonly<Record<string, number>>> = {
  horizontal: { ArrowRight: 1, ArrowLeft: -1 },
  vertical: { ArrowDown: 1, ArrowUp: -1 },
  both: { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 },
};

export interface UseSelectableGroupOptions<V extends string> {
  /** 골라진 값. 주지 않으면 고르는 무리가 아니라 동작 목록입니다 — 칸에 골라짐을 알리지 않고, Tab 순서도 건드리지 않습니다 */
  value?: V;
  /** 칸을 누르면 부릅니다. `selectOnFocus` 면 방향키로 옮길 때도 부릅니다 */
  onChange?: (value: V) => void;
  /** 방향키로 옮기면 바로 고릅니다 (기본 true — 라디오 · 탭). 메뉴처럼 포커스만 옮기려면 false */
  selectOnFocus?: boolean;
  /** 방향키의 축 (기본 `both`). 세로 목록(메뉴)은 `vertical` — ↑↓ 만 씁니다 */
  orientation?: Orientation;
}

/**
 * 고르는 무리 — 값 하나를 고르는 줄(SegmentedControl · Tabs)과 목록(Menu)이 같이 씁니다.
 * 무리 요소에 `groupProps`(방향키 · Home · End)를 펼치고, 칸마다 `itemProps(값)` 을 펼칩니다. 칸에는 `selected` ·
 * `onClick` 과 roving tabindex 가 실립니다 — Tab 키로는 골라진 칸 하나에만 들어오고, 무리 안은 방향키로 옮깁니다.
 * 골라짐의 aria 는 칸이 `useSelectable` 로 붙이므로(role 이 정합니다) 여기서 덮어쓰지 않습니다.
 *
 * ```tsx
 * const { groupProps, itemProps } = useSelectableGroup({ value, onChange });
 * <Inline role="radiogroup" {...groupProps}>
 *   {options.map((o) => <Button key={o.value} role="radio" {...itemProps(o.value)}>{o.label}</Button>)}
 * </Inline>
 * ```
 */
export function useSelectableGroup<V extends string>({ value, onChange, selectOnFocus = true, orientation = "both" }: UseSelectableGroupOptions<V>) {
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const step = e.key === "Home" || e.key === "End" ? 0 : STEPS[orientation][e.key];
    if (step === undefined) return;
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
    if (items.length === 0) return;
    const i = items.indexOf(document.activeElement as HTMLElement);
    const last = items.length - 1;
    let next: number;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else if (i < 0) next = step > 0 ? 0 : last;
    else next = (i + step + items.length) % items.length;
    const target = items[next];
    if (!target) return;
    e.preventDefault();
    target.focus();
    const picked = target.getAttribute(ITEM_ATTR);
    if (selectOnFocus && picked !== null) onChange?.(picked as V);
  };

  const itemProps = (itemValue: V) => ({
    [ITEM_ATTR]: itemValue,
    selected: value === undefined ? undefined : itemValue === value,
    tabIndex: value === undefined ? undefined : itemValue === value ? 0 : -1,
    onClick: () => onChange?.(itemValue),
  });

  return { groupProps: { onKeyDown }, itemProps };
}
