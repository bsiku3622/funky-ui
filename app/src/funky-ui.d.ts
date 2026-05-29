// @studio-baeks/funky-ui is consumed as raw TS source via a Vite alias
// (see vite.config.ts). Its own deps aren't installed in this app, so we
// declare a pragmatic public surface here for the app's typecheck.
// Runtime resolution + real behavior come from the alias to ../core/src.
declare module "@studio-baeks/funky-ui" {
  import type {
    ComponentType,
    ReactNode,
    HTMLAttributes,
    ButtonHTMLAttributes,
    InputHTMLAttributes,
    ElementType,
  } from "react";

  export interface NavItem {
    key: string;
    label: ReactNode;
    icon?: ReactNode;
    href?: string;
  }
  export interface AppShellProps {
    brand?: ReactNode;
    account?: ReactNode;
    sidebarTitle?: ReactNode;
    navLabel?: ReactNode;
    navItems: NavItem[];
    activeKey?: string;
    onNavSelect?: (key: string) => void;
    sidebarFooter?: ReactNode;
    children?: ReactNode;
  }
  export const AppShell: ComponentType<AppShellProps>;
  export const StatusCard: ComponentType<{ title: ReactNode; children?: ReactNode }>;

  export const Button: ComponentType<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: string;
      size?: string;
      leadingIcon?: ReactNode;
      trailingIcon?: ReactNode;
    }
  >;
  export const Input: ComponentType<
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
      leading?: ReactNode;
      trailing?: ReactNode;
      fullWidth?: boolean;
    }
  >;
  export const SearchInput: ComponentType<Record<string, unknown>>;
  export const Tag: ComponentType<HTMLAttributes<HTMLSpanElement> & { color?: string }>;
  export const Badge: ComponentType<HTMLAttributes<HTMLSpanElement> & { color?: string }>;
  export const Icon: ComponentType<HTMLAttributes<HTMLSpanElement> & { size?: number }>;
  export const Text: ComponentType<
    HTMLAttributes<HTMLElement> & { variant?: string; as?: ElementType; muted?: boolean }
  >;
  export const Card: ComponentType<HTMLAttributes<HTMLDivElement> & { padded?: boolean }>;
  export const StatTile: ComponentType<
    HTMLAttributes<HTMLDivElement> & {
      label: ReactNode;
      value: ReactNode;
      hint?: ReactNode;
      color?: string;
    }
  >;

  type Compound<P, S> = ComponentType<P> & S;
  export const Accordion: Compound<
    HTMLAttributes<HTMLDivElement>,
    {
      Item: ComponentType<HTMLAttributes<HTMLDivElement> & { defaultOpen?: boolean }>;
      Header: ComponentType<HTMLAttributes<HTMLButtonElement>>;
      Panel: ComponentType<HTMLAttributes<HTMLDivElement>>;
    }
  >;
  export const Tabs: Compound<
    HTMLAttributes<HTMLDivElement> & {
      defaultValue?: string;
      value?: string;
      onValueChange?: (v: string) => void;
    },
    {
      List: ComponentType<HTMLAttributes<HTMLDivElement>>;
      Trigger: ComponentType<ButtonHTMLAttributes<HTMLButtonElement> & { value: string }>;
      Panel: ComponentType<HTMLAttributes<HTMLDivElement> & { value: string }>;
    }
  >;
  export const Modal: Compound<
    { open: boolean; onClose: () => void; closeOnOverlay?: boolean; children?: ReactNode },
    {
      Header: ComponentType<HTMLAttributes<HTMLDivElement> & { onClose?: () => void; hideClose?: boolean }>;
      Body: ComponentType<HTMLAttributes<HTMLDivElement>>;
      Footer: ComponentType<HTMLAttributes<HTMLDivElement>>;
    }
  >;

  export const tokens: Record<string, unknown>;
  export const color: Record<string, string>;
  export const role: Record<string, string>;
  export const shadow: Record<string, string>;
  export const radius: Record<string, string>;
  export const border: Record<string, string>;
  export const space: Record<string, string>;
  export const font: Record<string, unknown>;
  export const controlHeight: Record<string, string>;
  export const motion: Record<string, string>;
}

declare module "@studio-baeks/funky-ui/styles.css";
