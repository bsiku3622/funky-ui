import { useState, useRef, useEffect, useCallback } from "react";
import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: ReactNode;
  disabled?: boolean;
}

const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/**
 * Select — custom brutalist dropdown. Trigger + hard-shadowed popup menu.
 * Closes on outside click / Esc; ↑↓ to move, Enter to choose.
 */
export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select…",
  disabled = false,
  className = "",
  ...rest
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const choose = useCallback(
    (v: string) => {
      onChange?.(v);
      setOpen(false);
    },
    [onChange]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (active >= 0 && !options[active]?.disabled) choose(options[active].value);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const dir = e.key === "ArrowDown" ? 1 : -1;
      let i = active;
      for (let n = 0; n < options.length; n++) {
        i = (i + dir + options.length) % options.length;
        if (!options[i].disabled) break;
      }
      setActive(i);
    }
  };

  const cls = [
    "funky-select",
    disabled ? "funky-select--disabled" : "",
    open ? "funky-select--open" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={cls} {...rest}>
      <button
        type="button"
        className="funky-select__trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className="funky-select__value">
          {selected ? (
            selected.label
          ) : (
            <span className="funky-select__placeholder">{placeholder}</span>
          )}
        </span>
        <span className={"funky-select__chevron" + (open ? " funky-select__chevron--open" : "")}>
          <Chevron />
        </span>
      </button>
      {open && (
        <ul className="funky-select__menu" role="listbox">
          {options.map((o, i) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                type="button"
                disabled={o.disabled}
                className={[
                  "funky-select__option",
                  o.value === value ? "funky-select__option--selected" : "",
                  i === active ? "funky-select__option--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => choose(o.value)}
                onMouseEnter={() => setActive(i)}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
Select.displayName = "Select";
