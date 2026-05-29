import {
  createContext,
  useContext,
  useState,
  useId,
} from "react";
import type { HTMLAttributes, ReactNode } from "react";

/* ── Item context: shares open state between Header and Panel ── */
interface ItemCtx {
  open: boolean;
  toggle: () => void;
  panelId: string;
  headerId: string;
}
const ItemContext = createContext<ItemCtx | null>(null);
const useItem = () => {
  const ctx = useContext(ItemContext);
  if (!ctx)
    throw new Error("Accordion.Header/Panel must be inside Accordion.Item");
  return ctx;
};

/* ── Root ── */
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
const AccordionRoot = ({ className = "", children, ...rest }: AccordionProps) => (
  <div
    className={["funky-accordion", className].filter(Boolean).join(" ")}
    {...rest}
  >
    {children}
  </div>
);

/* ── Item ── */
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  children?: ReactNode;
}
const AccordionItem = ({
  defaultOpen = false,
  className = "",
  children,
  ...rest
}: AccordionItemProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  const ctx: ItemCtx = {
    open,
    toggle: () => setOpen((o) => !o),
    panelId: `${base}-panel`,
    headerId: `${base}-header`,
  };
  return (
    <ItemContext.Provider value={ctx}>
      <div
        className={["funky-accordion__item", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
};

/* ── Header (button) ── */
export interface AccordionHeaderProps
  extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
const Chevron = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const AccordionHeader = ({
  className = "",
  children,
  ...rest
}: AccordionHeaderProps) => {
  const { open, toggle, panelId, headerId } = useItem();
  return (
    <button
      type="button"
      id={headerId}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={toggle}
      className={["funky-accordion__header", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <span>{children}</span>
      <span
        className={[
          "funky-accordion__chevron",
          open ? "funky-accordion__chevron--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Chevron />
      </span>
    </button>
  );
};

/* ── Panel ── */
export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
const AccordionPanel = ({
  className = "",
  children,
  ...rest
}: AccordionPanelProps) => {
  const { open, panelId, headerId } = useItem();
  if (!open) return null;
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={headerId}
      className={["funky-accordion__panel", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
};

/** Accordion — compound shell: Accordion / .Item / .Header / .Panel */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Panel: AccordionPanel,
});
