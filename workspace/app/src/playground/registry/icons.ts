/** Playground 컨트롤에서 고를 수 있는 아이콘 — 이름이 코드에 그대로 찍힙니다 */
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CircleAlert,
  CircleCheck,
  Check,
  ChevronDown,
  Download,
  Eye,
  GraduationCap,
  Home,
  Info,
  LogOut,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  TriangleAlert,
  User,
  X,
} from "lucide-react";
import type { IconComponent } from "@studio-baeks/funky-ui";

export const ICONS: Record<string, IconComponent> = {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CircleAlert,
  CircleCheck,
  Check,
  ChevronDown,
  Download,
  Eye,
  GraduationCap,
  Home,
  Info,
  LogOut,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  TriangleAlert,
  User,
  X,
};

export const ICON_NAMES = ["none", ...Object.keys(ICONS)] as const;

/** 컨트롤 값(이름) → 컴포넌트. "none" 이나 빈 값이면 undefined */
export function icon(name: unknown): IconComponent | undefined {
  return typeof name === "string" && name !== "none" ? ICONS[name] : undefined;
}
