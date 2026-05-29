import { createContext, useContext, useState } from "react";
import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface TabsCtx {
  value: string;
  setValue: (v: string) => void;
}
const TabsContext = createContext<TabsCtx | null>(null);
const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* must be used inside <Tabs>");
  return ctx;
};

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** uncontrolled initial tab */
  defaultValue?: string;
  /** controlled active tab */
  value?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}

/** Tabs root — controlled or uncontrolled. */
const TabsRoot = ({
  defaultValue = "",
  value: controlled,
  onValueChange,
  className = "",
  children,
  ...rest
}: TabsProps) => {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const setValue = (v: string) => {
    if (controlled === undefined) setInternal(v);
    onValueChange?.(v);
  };
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={["funky-tabs", className].filter(Boolean).join(" ")} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
const TabsList = ({ className = "", children, ...rest }: TabsListProps) => (
  <div
    role="tablist"
    className={["funky-tabs__list", className].filter(Boolean).join(" ")}
    {...rest}
  >
    {children}
  </div>
);

export interface TabsTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children?: ReactNode;
}
const TabsTrigger = ({
  value,
  className = "",
  children,
  ...rest
}: TabsTriggerProps) => {
  const { value: active, setValue } = useTabs();
  const isActive = active === value;
  const cls = [
    "funky-tabs__trigger",
    isActive ? "funky-tabs__trigger--active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cls}
      onClick={() => setValue(value)}
      {...rest}
    >
      {children}
    </button>
  );
};

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}
const TabsPanel = ({
  value,
  className = "",
  children,
  ...rest
}: TabsPanelProps) => {
  const { value: active } = useTabs();
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      className={["funky-tabs__panel", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
};

/** Tabs — compound: Tabs / .List / .Trigger / .Panel */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
});
