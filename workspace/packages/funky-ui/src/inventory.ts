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
    // 1차 — 서로 기대지 않는 바탕
    element: ["Box"],
    content: ["Text", "Icon"],
    a11y: ["VisuallyHidden", "Portal"],
    // 2차 — Box 위에 능력 하나
    /** 칠하는 셋 — 박스는 Surface(흑백 면), 요소는 Paint(accent × variant), 색 바 위는 Glass(유리). accent 는 Paint 만 갖습니다 */
    paint: ["Surface", "Paint", "Glass"],
    press: ["Pressable"],
    layout: ["Stack", "Inline", "Grid"],
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

type PrimitiveGroup = keyof (typeof INVENTORY)["primitives"];

/**
 * Primitive 의 두 단. 1차는 서로 기대지 않는 바탕(요소 · 글자 · 아이콘 · 접근성)이고, 2차는 Box 위에
 * 능력 하나를 얹은 것(칠 · 누름 · 배치)입니다. 2차끼리도 서로 기대지 않습니다 — 둘 이상이 필요하면
 * 위 층(Atom 부터)이 class 로 묶습니다. Button = Pressable + Paint, 누르는 Card = Pressable + Surface.
 */
export const PRIMITIVE_TIERS = {
  first: ["element", "content", "a11y"],
  second: ["paint", "press", "layout"],
} as const satisfies Record<"first" | "second", readonly PrimitiveGroup[]>;
