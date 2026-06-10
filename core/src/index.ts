// funky-ui — public entry.
// Consumers also import the stylesheet once:  import "@studio-baeks/funky-ui/styles.css";

/* ── Tokens (SSOT) ── */
export {
  tokens,
  color,
  role,
  shadow,
  radius,
  border,
  space,
  font,
  controlHeight,
  motion,
} from "./tokens";
export type { Tokens, AccentColor } from "./tokens";

/* ── Atoms ── */
export { Button } from "./atoms/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./atoms/Button";
export { Input } from "./atoms/Input";
export type { InputProps } from "./atoms/Input";
export { SearchInput } from "./atoms/SearchInput";
export type { SearchInputProps } from "./atoms/SearchInput";
export { Tag } from "./atoms/Tag";
export type { TagProps, TagColor } from "./atoms/Tag";
export { Badge } from "./atoms/Badge";
export type { BadgeProps, BadgeColor } from "./atoms/Badge";
export { Icon } from "./atoms/Icon";
export type { IconProps } from "./atoms/Icon";
export { Text } from "./atoms/Text";
export type { TextProps, TextVariant } from "./atoms/Text";

/* ── Components (shells) ── */
export { Card } from "./components/Card";
export type { CardProps } from "./components/Card";
export { StatTile } from "./components/StatTile";
export type { StatTileProps, StatTileColor } from "./components/StatTile";
export { Accordion } from "./components/Accordion";
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionPanelProps,
} from "./components/Accordion";
export { Tabs } from "./components/Tabs";
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsPanelProps,
} from "./components/Tabs";
export { Modal } from "./components/Modal";
export type {
  ModalProps,
  ModalHeaderProps,
  ModalSlotProps,
} from "./components/Modal";
export { Toolbar } from "./components/Toolbar";
export type { ToolbarProps, ToolbarGroupProps } from "./components/Toolbar";
export { Panel } from "./components/Panel";
export type { PanelProps, PanelColor } from "./components/Panel";
export { Window } from "./components/Window";
export type { WindowProps } from "./components/Window";
export { Toast } from "./components/Toast";
export type { ToastProps, ToastColor } from "./components/Toast";

/* ── Templates ── */
export { AppShell, StatusCard } from "./templates/AppShell";
export type {
  AppShellProps,
  NavItem,
  StatusCardProps,
} from "./templates/AppShell";
export { ToolShell } from "./templates/ToolShell";
export type { ToolShellProps, ToolStage } from "./templates/ToolShell";
