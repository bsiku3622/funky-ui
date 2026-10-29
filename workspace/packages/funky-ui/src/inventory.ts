/**
 * 인벤토리 — 이름 · 층 · 순서의 정본입니다. import 가 없습니다.
 *
 * Playground 사이드바와 문서 목차가 여기서 파생합니다. 컴포넌트를 더하거나 빼면 여기를 같이
 * 고칩니다. 층은 아래로만 의존합니다:
 *
 *   Foundations(Color · Typography → Shape → Layout → Motion) → Primitives → Atoms → Molecules → Components
 *
 * Atoms · Molecules 까지는 어떤 앱에도 쓸 수 있는 범용 층이고, Components 는 class-explorer 전용입니다.
 */
export const LAYERS = ["foundations", "primitives", "atoms", "molecules", "components"] as const;
export type Layer = (typeof LAYERS)[number];

export const FOUNDATIONS = ["color", "typography", "shape", "layout", "motion"] as const;

export const INVENTORY = {
  primitives: {
    layout: ["Box", "Stack", "Inline", "Grid"],
    /** 칠하는 둘 — 박스는 Surface(흑백 면), 요소는 Paint(accent × variant) */
    paint: ["Surface", "Paint"],
    content: ["Text", "Icon"],
    interaction: ["Pressable"],
    a11y: ["VisuallyHidden", "Portal"],
  },
  atoms: {
    action: ["Button", "IconButton", "NavButton", "Link"],
    display: ["Badge", "Spinner", "Divider"],
    input: ["Input", "Textarea", "Select", "Checkbox", "Radio", "Switch", "Label"],
  },
  molecules: {
    surface: ["Card", "SectionTitle", "PageHeader", "Accordion"],
    choice: ["SegmentedControl", "Tabs", "Menu"],
    overlay: ["Modal", "Tooltip"],
    form: ["SearchField", "FormField"],
    data: ["Stat", "Meter"],
    feedback: ["Notice", "EmptyState"],
  },
  components: {
    shell: ["AppBar", "SideNav", "BottomNav", "TermSwitcher"],
    people: ["StudentBadge", "PersonCard"],
    schedule: ["ClassTile", "TimetableGrid"],
  },
} as const;
