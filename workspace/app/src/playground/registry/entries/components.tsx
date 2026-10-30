/** Components — class-explorer 전용 열여섯. 앱 셸 · 사람 · 시간표 · 실행 중의 색. 셸 부품은 fixed 를 끄고 테두리 상자 안에 둡니다 */
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  AppBar,
  Badge,
  BottomNav,
  BreakBand,
  ClassTile,
  Grid,
  Inline,
  NavButton,
  PersonCard,
  SideNav,
  SlotCell,
  Stack,
  StudentBadge,
  Surface,
  TermSwitcher,
  Text,
  TimeCaret,
  TimetableGrid,
  ToneBox,
  ToneButton,
  ToneChip,
  ToneSwatch,
  ToneText,
  type ClassTileState,
  type ControlSize,
  type IconComponent,
  type SlotState,
  type TermOption,
} from "@studio-baeks/funky-ui";
import { CONTROL_SIZES, vars } from "@studio-baeks/funky-ui/tokens";
import { CalendarDays, GraduationCap, Home, LogOut, MapPin, RefreshCw, Search, Sparkles, User } from "lucide-react";

import { Stage } from "../../kit";
import { printJsx } from "../code";
import type { Spec, Values } from "../schema";


// 아래는 컴포넌트 자신의 prop 이 지역 union 이라 어휘 배열이 없는 선택지입니다
const STUDENT_BADGE_SIZES = ["xs", "sm", "md"] as const;
const TILE_STATES: ClassTileState[] = ["upcoming", "now", "past", "free", "focus", "dim"];
const SLOT_STATES: SlotState[] = ["free", "busy", "selected", "conflict", "common", "empty"];
const PERSON_COLUMNS = [1, 2] as const;
const PERSON_SIZES = ["md", "sm"] as const;
const PERSON_MOTIONS = ["sink", "lift"] as const;
const TONE_SWATCH_SHAPES = ["box", "rail"] as const;

/** text 컨트롤의 빈 칸은 prop 을 주지 않은 것입니다 */
const txt = (x: unknown) => (typeof x === "string" && x !== "" ? x : undefined);
const noop = () => {};

/** printJsx 와 같은 규칙(기본값 · 빈 값 생략)으로 prop 을 하나씩 찍습니다 */
function printed(spec: Spec, values: Values): string[] {
  return Object.entries(values).flatMap(([key, value]) => {
    const one = printJsx("_", { [key]: value }, spec.defaults, spec.controls).slice(2, -3).trim();
    return one ? [one] : [];
  });
}

const indent = (s: string) => s.replace(/^/gm, "  ");

/**
 * 코드 조각 — 여는 태그(한 줄이 80자를 넘으면 prop 마다 줄을 나눕니다) · 본문 · 닫는 태그.
 * body 가 없으면 self-closing 입니다. 본문 줄은 이미 만든 조각(여러 줄)이어도 됩니다.
 */
function jsx(name: string, attrs: (string | false | undefined)[], body?: string[]): string {
  const list = attrs.filter((a): a is string => Boolean(a));
  const flat = list.length ? ` ${list.join(" ")}` : "";
  const [only] = body ?? [];
  if (body?.length === 1 && only !== undefined && !only.includes("\n") && !only.startsWith("<")) {
    const inline = `<${name}${flat}>${only}</${name}>`;
    if (inline.length <= 80 && !flat.includes("\n")) return inline;
  }
  const head = `<${name}${flat}${body ? ">" : " />"}`;
  const open = head.length <= 80 && !head.includes("\n") ? head : [`<${name}`, ...list.map(indent), body ? ">" : "/>"].join("\n");
  return body ? [open, ...body.map(indent), `</${name}>`].join("\n") : open;
}

/** 폭이 있어야 뜻이 서는 표본의 틀 — Overview 의 좁은 썸네일에서는 줄어듭니다. top 은 키 큰 표본의 윗부분이 보이게 합니다 */
function Frame({ width = 320, top = false, children }: { width?: number; top?: boolean; children: ReactNode }) {
  return <div style={{ width: "100%", maxWidth: width, minWidth: 0, alignSelf: top ? "flex-start" : undefined }}>{children}</div>;
}

/** 화면을 흉내 내는 테두리 상자 — 셸 부품은 fixed 없이 이 안에 둡니다. 상자에 크기가 있어야 SideNav 가 높이를 채웁니다 */
function Screen({ style, children }: { style: CSSProperties; children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        backgroundColor: vars.surface.canvas,
        border: `${vars.stroke.base} solid ${vars.line.base}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── 표본 자료 — class-explorer 모양의 가상 자료 ─────────────────────────

/** 학과색 — class-explorer 가 학과로 정해 hex 로 넘기는 값 */
const DEPT_COLORS = {
  수학: "#7828c8",
  정보과학: "#2563eb",
  물리학: "#4f46e5",
  화학: "#ea580c",
  생물학: "#16a34a",
  지구과학: "#0d9488",
  국어: "#dc2626",
  사회: "#b45309",
  외국어: "#0891b2",
  예체능: "#ca8a04",
  융합: "#64748b",
} as const;
type Dept = keyof typeof DEPT_COLORS;

/** 학번 앞 두 자리(기수)의 색 — getStudentColor() 가 돌려주는 값 */
const COHORT_COLORS: Record<string, string> = { "23": "#7828C8", "24": "#FC8200", "25": "#00B327", "26": "#00B5E7" };

const cohortColor = (cohort: unknown) => COHORT_COLORS[String(cohort)] ?? DEPT_COLORS.융합;
/** id 의 앞 두 자리가 기수입니다 — 교번 같은 그 밖의 id 는 회색 */
const personColor = (id: unknown) => cohortColor(String(id).slice(0, 2));
const deptColor = (dept: unknown) => DEPT_COLORS[dept as Dept] ?? DEPT_COLORS.융합;

const ENROLLED = ["미적분학1", "일반물리학", "세계사의이해", "자료구조"] as const;

const TERMS: TermOption[] = [
  { value: "2025-2", label: "2025-2" },
  { value: "2026-1", label: "2026-1" },
  { value: "2026-2", label: "2026-2" },
];

// ── AppBar ──────────────────────────────────────────────────────────

/** 상단 바 오른쪽 끝 — 학기 선택 · 계정 · 로그아웃 */
function BarActions() {
  const [term, setTerm] = useState("2026-2");
  return (
    <>
      <TermSwitcher terms={TERMS} value={term} onChange={setTerm} />
      <NavButton icon={User} label="계정" />
      <NavButton icon={LogOut} label="로그아웃" />
    </>
  );
}

const APP_BAR_ACTIONS_CODE = [
  "actions={",
  ...[
    "<>",
    "  <TermSwitcher terms={terms} value={term} onChange={setTerm} />",
    '  <NavButton icon={User} label="계정" />',
    '  <NavButton icon={LogOut} label="로그아웃" />',
    "</>",
  ].map(indent),
  "}",
].join("\n");

const appBar: Spec = {
  name: "AppBar",
  summary:
    "상단 바. Surface 의 brand 면(보라 · 흰 글자) · 아래 2px 검정 · 아래로 4px 그림자이고 높이는 80px 입니다. 바는 색을 고르는 요소가 아니라 앱의 뼈대라 accent 가 없습니다. 로고(brand)는 기울어진 900 대문자이고, 오른쪽 끝(actions)에 학기 선택 · 계정 · 로그아웃을 둡니다.",
  controls: {
    brand: { kind: "text" },
    actions: { kind: "boolean" },
  },
  // actions 는 꺼 둡니다 — Overview 의 좁은 썸네일에서 오른쪽 끝 버튼이 brand 위로 겹쳐 올라옵니다 (켜면 아래 '오른쪽 끝까지' 절과 같습니다)
  initial: { brand: "Class Explorer" },
  defaults: { actions: false },
  render: (v) => (
    <Frame width={720}>
      <AppBar brand={String(v.brand ?? "")} onBrandClick={noop} actions={v.actions ? <BarActions /> : undefined} />
    </Frame>
  ),
  code: (v) =>
    jsx("AppBar", [
      ...printed(appBar, { brand: v.brand }),
      'onBrandClick={() => navigate("/")}',
      v.actions ? APP_BAR_ACTIONS_CODE : undefined,
    ]),
  sections: [
    {
      title: "오른쪽 끝까지",
      note: "brand 면은 글자를 흰색으로 바꾸고, 그 위의 버튼은 흰 유리(NavButton)라 로고 · 학기 · 계정이 한 색으로 읽힙니다. 학기 선택은 Menu 를 엽니다.",
      render: () => (
        <Stage>
          <Frame width={720}>
            <AppBar brand="Class Explorer" actions={<BarActions />} />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "Mobile 폭",
      note: "좁은 화면에서는 학기 선택을 빼고 아이콘 버튼만 남깁니다. 아이콘만 있는 NavButton 은 label 이 접근성 이름입니다.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <AppBar
              brand="Class Explorer"
              actions={
                <>
                  <NavButton icon={User} label="계정" />
                  <NavButton icon={LogOut} label="로그아웃" />
                </>
              }
            />
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── SideNav ─────────────────────────────────────────────────────────

interface NavEntry {
  key: string;
  label: string;
  icon: IconComponent;
}

const NAV_GROUPS: { label: string; items: NavEntry[] }[] = [
  {
    label: "Explore",
    items: [
      { key: "home", label: "Home", icon: Home },
      { key: "search", label: "Search", icon: Search },
      { key: "rooms", label: "Rooms", icon: MapPin },
      { key: "browse", label: "Browse", icon: GraduationCap },
    ],
  },
  {
    label: "Plan",
    items: [
      { key: "calendar", label: "Calendar", icon: CalendarDays },
      { key: "trade", label: "Trade", icon: RefreshCw },
      { key: "ask", label: "Ask", icon: Sparkles },
    ],
  },
];

/** 모바일 하단 바는 다섯 칸까지입니다 */
const BOTTOM_ITEMS: NavEntry[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "search", label: "Search", icon: Search },
  { key: "calendar", label: "Calendar", icon: CalendarDays },
  { key: "trade", label: "Trade", icon: RefreshCw },
  { key: "ask", label: "Ask", icon: Sparkles },
];

function SystemStatus() {
  return (
    <Stack gap="xs" align="start">
      <Text variant="overline">System Status</Text>
      <Badge size="sm" variant="solid" accent="green">
        API Online
      </Badge>
    </Stack>
  );
}

function SideNavDemo({ footer, height = 600 }: { footer: boolean; height?: number }) {
  const [active, setActive] = useState("home");
  return (
    // SideNav 가 오른쪽 선을 스스로 가지므로 상자의 오른쪽 선은 뺍니다 (겹치면 4px 이 됩니다)
    <Screen style={{ width: 258, height, alignSelf: "flex-start", borderRight: 0 }}>
      <SideNav footer={footer ? <SystemStatus /> : undefined}>
        {NAV_GROUPS.map((g) => (
          <SideNav.Section key={g.label} label={g.label}>
            {g.items.map((item) => (
              <SideNav.Item key={item.key} icon={item.icon} active={active === item.key} onClick={() => setActive(item.key)}>
                {item.label}
              </SideNav.Item>
            ))}
          </SideNav.Section>
        ))}
      </SideNav>
    </Screen>
  );
}

const sideNav: Spec = {
  name: "SideNav",
  summary:
    "데스크톱 왼쪽 메뉴. 폭 256px 이고 메뉴만 스크롤되며 footer 는 늘 보입니다. 지금 화면은 검정 filled 가 4px 위에 떠 있고, 나머지는 약한 잉크로 물러납니다.",
  controls: {
    footer: { kind: "boolean" },
  },
  initial: { footer: true },
  defaults: { footer: false },
  render: (v) => <SideNavDemo footer={Boolean(v.footer)} />,
  code: (v) =>
    jsx("SideNav", [v.footer ? "footer={<SystemStatus />}" : undefined], [
      jsx("SideNav.Section", ['label="Explore"'], [
        jsx("SideNav.Item", ["icon={Home}", "active", 'onClick={() => navigate("/")}'], ["Home"]),
        jsx("SideNav.Item", ["icon={Search}", 'onClick={() => navigate("/search")}'], ["Search"]),
        jsx("SideNav.Item", ["icon={MapPin}", 'onClick={() => navigate("/rooms")}'], ["Rooms"]),
      ]),
      jsx("SideNav.Section", ['label="Plan"'], [
        jsx("SideNav.Item", ["icon={CalendarDays}", 'onClick={() => navigate("/calendar")}'], ["Calendar"]),
        jsx("SideNav.Item", ["icon={RefreshCw}", 'onClick={() => navigate("/trade")}'], ["Trade"]),
      ]),
    ]),
  sections: [
    {
      title: "높이가 모자랄 때",
      note: "메뉴 영역만 스크롤되고 footer 는 아래에 붙어 있습니다. 실제 화면에서는 fixed 로 상단 바 아래 왼쪽에 고정하고, 넓은 화면(md 이상)에서만 보입니다.",
      render: () => (
        <Stage>
          <SideNavDemo footer height={280} />
        </Stage>
      ),
    },
  ],
};

// ── BottomNav ───────────────────────────────────────────────────────

function BottomNavDemo() {
  const [active, setActive] = useState("home");
  return (
    <Screen style={{ flexDirection: "column", justifyContent: "flex-end", width: "100%", maxWidth: 360, height: 104 }}>
      <BottomNav>
        {BOTTOM_ITEMS.map((item) => (
          <BottomNav.Item key={item.key} icon={item.icon} active={active === item.key} onClick={() => setActive(item.key)}>
            {item.label}
          </BottomNav.Item>
        ))}
      </BottomNav>
    </Screen>
  );
}

const bottomNav: Spec = {
  name: "BottomNav",
  summary: "모바일 하단 바. 상단 바와 같은 brand 면이고 높이 64px 에 다섯 칸까지입니다. fixed 로 쓰면 넓은 화면(md 이상)에서는 숨습니다. 메뉴 순서는 앱이 정하고 셸은 그리기만 합니다. 칸의 글자는 바의 흰 글자를 물려받아 안 고른 칸은 묽게, 지금 화면은 진하게 나오고 윗선이 붙으며 aria-current=\"page\" 로 알립니다. 내비라 Tab 키로 칸마다 들릅니다 — 방향키 무리로 묶지 않습니다.",
  render: () => <BottomNavDemo />,
  code: (v) =>
    jsx("BottomNav", printed(bottomNav, v), [
      jsx("BottomNav.Item", ["icon={Home}", "active", 'onClick={() => navigate("/")}'], ["Home"]),
      jsx("BottomNav.Item", ["icon={Search}", 'onClick={() => navigate("/search")}'], ["Search"]),
      jsx("BottomNav.Item", ["icon={CalendarDays}", 'onClick={() => navigate("/calendar")}'], ["Calendar"]),
    ]),
};

// ── TermSwitcher ────────────────────────────────────────────────────

/** TermSwitcher — 고른 학기를 스스로 들고 있는 표본 */
function TermDemo({ terms = TERMS }: { terms?: TermOption[] }) {
  const [term, setTerm] = useState("2026-2");
  return <TermSwitcher terms={terms} value={term} onChange={setTerm} />;
}

const termSwitcher: Spec = {
  name: "TermSwitcher",
  summary: "학기 선택. 상단 바 위의 유리 버튼이 Menu 를 엽니다. 학기가 둘 미만이면 아무것도 그리지 않습니다.",
  stage: "brand",
  render: () => (
    <Surface fill="brand" padding="lg">
      <TermDemo />
    </Surface>
  ),
  code: () =>
    [
      "const terms = [",
      ...TERMS.map((t) => `  { value: "${t.value}", label: "${t.label}" },`),
      "];",
      "",
      jsx("TermSwitcher", ["terms={terms}", "value={term}", "onChange={setTerm}"]),
    ].join("\n"),
  sections: [
    {
      title: "학기가 하나뿐일 때",
      note: "terms 가 둘 미만이면 null 을 돌려줍니다. 선택지가 없는 학기 버튼을 바에 남기지 않고, 오른쪽 끝이 비어도 바는 그대로입니다.",
      render: () => (
        <Stage>
          <Frame width={480}>
            <AppBar brand="Class Explorer" actions={<TermDemo terms={TERMS.slice(-1)} />} />
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── StudentBadge ────────────────────────────────────────────────────

const COHORT_SAMPLE = [
  { cohort: "23", name: "박테스트" },
  { cohort: "24", name: "이샘플" },
  { cohort: "25", name: "김예시" },
  { cohort: "26", name: "최더미" },
];

const ROSTER = [
  { cohort: "25", name: "김예시" },
  { cohort: "24", name: "이샘플" },
  { cohort: "25", name: "김가상" },
  { cohort: "23", name: "박테스트" },
  { cohort: "26", name: "최더미" },
];

const studentBadge: Spec = {
  name: "StudentBadge",
  summary:
    "학번 배지('25 이름'). 색은 앱이 기수로 정해 hex 로 넘기고, 여기서는 기수로 고릅니다. hover 효과가 없고, buzz 를 주면 검색어와 맞는 사람만 잠깐 떱니다.",
  controls: {
    cohort: { kind: "select", options: Object.keys(COHORT_COLORS) },
    name: { kind: "text" },
    size: { kind: "select", options: STUDENT_BADGE_SIZES },
    buzz: { kind: "boolean" },
    onClick: { kind: "boolean" },
  },
  initial: { cohort: "25", name: "김예시", size: "sm" },
  defaults: { size: "xs", buzz: false, onClick: false },
  render: (v) => (
    <StudentBadge
      cohort={String(v.cohort ?? "")}
      name={String(v.name ?? "")}
      color={cohortColor(v.cohort)}
      size={v.size as (typeof STUDENT_BADGE_SIZES)[number]}
      buzz={Boolean(v.buzz)}
      onClick={v.onClick ? noop : undefined}
    />
  ),
  code: (v) =>
    jsx("StudentBadge", [
      ...printed(studentBadge, { cohort: v.cohort, name: v.name, color: cohortColor(v.cohort), size: v.size, buzz: v.buzz }),
      v.onClick ? "onClick={() => openStudent(id)}" : undefined,
    ]),
  sections: [
    {
      title: "Sizes · 기수 색",
      note: "기수마다 색이 하나이고, 면은 그 색의 8% · 테두리와 글자는 그 색입니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="lg">
            {STUDENT_BADGE_SIZES.map((size) => (
              <Inline key={size} gap="md" wrap>
                <Text variant="overline" style={{ width: 24 }}>
                  {size}
                </Text>
                {COHORT_SAMPLE.map((s) => (
                  <StudentBadge key={s.cohort} cohort={s.cohort} name={s.name} color={cohortColor(s.cohort)} size={size} />
                ))}
              </Inline>
            ))}
          </Stack>
        </Stage>
      ),
    },
    {
      title: "buzz — 검색어와 맞는 사람",
      note: "검색어 '김' 에 맞는 두 사람만 잠깐 떱니다. 나머지를 흐리게 지우지 않습니다.",
      render: () => (
        <Stage bg="raised">
          <Inline gap="md" wrap>
            {ROSTER.map((s) => (
              <StudentBadge key={s.name} cohort={s.cohort} name={s.name} color={cohortColor(s.cohort)} size="sm" buzz={s.name.includes("김")} />
            ))}
          </Inline>
        </Stage>
      ),
    },
    {
      title: "onClick",
      note: "onClick 을 주면 button 이 됩니다. hover 에는 반응하지 않고 누르는 순간만 작아집니다.",
      render: () => (
        <Stage bg="raised">
          {COHORT_SAMPLE.map((s) => (
            <StudentBadge key={s.cohort} cohort={s.cohort} name={s.name} color={cohortColor(s.cohort)} size="sm" onClick={noop} />
          ))}
        </Stage>
      ),
    },
  ],
};

// ── PersonCard ──────────────────────────────────────────────────────

const personCard: Spec = {
  name: "PersonCard",
  summary:
    "학생 · 교사 카드. 왼쪽은 그 사람의 색 면(학번 · 이름), 오른쪽은 흰 면의 목록입니다. 색은 호출하는 쪽이 정하고, 여기서는 id 앞 두 자리로 기수 색을 고릅니다. onClick 을 주면 누르는 카드가 됩니다.",
  controls: {
    id: { kind: "text" },
    name: { kind: "text" },
    title: { kind: "text" },
    columns: { kind: "select", options: PERSON_COLUMNS.map(String) },
    size: { kind: "select", options: PERSON_SIZES },
    framed: { kind: "boolean" },
    motion: { kind: "select", options: PERSON_MOTIONS },
    footer: { kind: "text" },
    onClick: { kind: "boolean" },
  },
  initial: { id: "25-001", name: "김예시", title: "Enrolled Classes", onClick: true },
  defaults: { columns: "2", size: "md", framed: true, motion: "sink", footer: "", onClick: false },
  render: (v) => (
    <Frame width={480} top>
      <PersonCard
        id={String(v.id ?? "")}
        name={String(v.name ?? "")}
        color={personColor(v.id)}
        title={txt(v.title)}
        items={ENROLLED}
        columns={Number(v.columns) === 1 ? 1 : 2}
        size={v.size as "sm" | "md"}
        framed={Boolean(v.framed)}
        motion={v.motion as "sink" | "lift"}
        footer={txt(v.footer)}
        onClick={v.onClick ? noop : undefined}
      />
    </Frame>
  ),
  code: (v) =>
    jsx("PersonCard", [
      ...printed(personCard, { id: v.id, name: v.name, color: personColor(v.id), title: v.title }),
      `items={[${ENROLLED.map((n) => `"${n}"`).join(", ")}]}`,
      Number(v.columns) === 1 ? "columns={1}" : undefined,
      ...printed(personCard, { size: v.size, framed: v.framed, motion: v.onClick ? v.motion : undefined, footer: v.footer }),
      v.onClick ? `onClick={() => openStudent("${v.id}")}` : undefined,
    ]),
  sections: [
    {
      title: "기수 색",
      note: "왼쪽 칸의 면은 색의 15%, 이름은 색, 목록 항목의 왼쪽 띠도 같은 색입니다.",
      render: () => (
        <Stage>
          <Frame width={760}>
            <Grid columns={2} gap="xl">
              <PersonCard id="23-014" name="박테스트" color={cohortColor("23")} title="Enrolled Classes" items={["일반화학", "자료구조", "세계사의이해"]} onClick={noop} />
              <PersonCard id="24-007" name="이샘플" color={cohortColor("24")} title="Enrolled Classes" items={["미적분학1", "일반생물학", "자료구조"]} onClick={noop} />
              <PersonCard id="25-001" name="김예시" color={cohortColor("25")} title="Enrolled Classes" items={ENROLLED} onClick={noop} />
              <PersonCard id="26-022" name="최더미" color={cohortColor("26")} title="Enrolled Classes" items={["일반물리학", "세계사의이해"]} onClick={noop} />
            </Grid>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "교사 · 학과색",
      note: "color 는 hex 하나만 받습니다. 학생은 기수 색, 교사는 학과 색처럼 호출하는 쪽이 정합니다.",
      render: () => (
        <Stage>
          <Frame width={480}>
            <PersonCard id="T-012" name="정샘플" color={DEPT_COLORS.화학} title="Classes" items={["일반화학", "화학실험"]} onClick={noop} />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "columns · size · framed · footer",
      note: "columns 는 목록의 열 수(기본 2)이고 교사 카드는 1 입니다. size=sm 은 112px 높이의 작은 카드로, 교사 카드나 풍선 안에 씁니다(기본 md 는 176px). framed=false 는 테두리를 빼서 이미 틀이 있는 풍선 안에서 씁니다. footer 는 목록 아래 한 줄이고, 목록을 다 보여 주지 않을 때의 \"+ 3 MORE CLASSES\" 같은 글입니다. motion=lift 는 훑어보다 고르는 목록에서 카드를 떠오르게 합니다(기본 sink).",
      render: () => (
        <Stage>
          <Frame width={360}>
            <PersonCard id="T-012" name="정샘플" color={DEPT_COLORS.화학} title="Classes" items={["일반화학", "화학실험"]} columns={1} size="sm" onClick={noop} />
          </Frame>
          <Frame width={360}>
            <PersonCard id="25-001" name="김예시" color={cohortColor("25")} title="Enrolled Classes" items={ENROLLED.slice(0, 2)} footer="+ 2 MORE CLASSES" motion="lift" onClick={noop} />
          </Frame>
          <Frame width={360}>
            <Surface border="line" shadow="raised" padding="md">
              <PersonCard id="25-001" name="김예시" color={cohortColor("25")} items={["미적분학1", "일반물리학"]} size="sm" framed={false} />
            </Surface>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "onClick 유무",
      note: "onClick 이 없으면 div 이고 그림자가 없습니다. 있으면 button 이 되어 4px 그림자 위에 떠 있다가, hover 때 가라앉습니다.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <PersonCard id="25-001" name="김예시" color={cohortColor("25")} title="onClick 없음" items={["미적분학1", "일반물리학"]} />
          </Frame>
          <Frame width={360}>
            <PersonCard id="25-001" name="김예시" color={cohortColor("25")} title="onClick 있음" items={["미적분학1", "일반물리학"]} onClick={noop} />
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── ClassTile ───────────────────────────────────────────────────────

/** 시간표 한 칸 — ClassTile 은 칸의 높이를 채우므로 높이가 있는 틀에 넣습니다 */
function Cell({ width = 168, height = 64, children }: { width?: number; height?: number; children: ReactNode }) {
  return <div style={{ width, height }}>{children}</div>;
}

const SUBJECT_OF: Record<Dept, string> = {
  수학: "미적분학1",
  정보과학: "자료구조",
  물리학: "일반물리학",
  화학: "일반화학",
  생물학: "일반생물학",
  지구과학: "지구과학개론",
  국어: "문학과비평",
  사회: "세계사의이해",
  외국어: "영어회화",
  예체능: "음악과감상",
  융합: "융합과학탐구",
};

const classTile: Spec = {
  name: "ClassTile",
  summary:
    "수업 한 칸. 학과색 문법(면 12% · 테두리 · 글자)을 따르고, 지금(now)은 학과색 대신 핑크를 씁니다. past 는 40% 로 흐려지고 free 는 점선 공강입니다. focus 와 dim 은 밖에서 한 칸을 지목할 때 쓰는 짝입니다. onClick 을 주면 누르는 칸이 됩니다. color 는 hex 이고, 여기서는 학과 이름으로 고릅니다.",
  controls: {
    title: { kind: "text" },
    meta: { kind: "text" },
    dept: { kind: "select", options: Object.keys(DEPT_COLORS) },
    state: { kind: "select", options: TILE_STATES },
    titleLines: { kind: "select", options: ["1", "2"] },
    metaWrap: { kind: "boolean" },
    onClick: { kind: "boolean" },
  },
  initial: { title: "미적분학1", meta: "형설202", dept: "수학" },
  defaults: { state: "upcoming", titleLines: "1", metaWrap: false, onClick: false },
  render: (v) => (
    <Cell>
      <ClassTile
        title={txt(v.title)}
        meta={txt(v.meta)}
        color={deptColor(v.dept)}
        state={v.state as ClassTileState}
        titleLines={Number(v.titleLines) === 2 ? 2 : 1}
        metaWrap={Boolean(v.metaWrap)}
        onClick={v.onClick ? noop : undefined}
      />
    </Cell>
  ),
  code: (v) =>
    jsx("ClassTile", [
      ...printed(classTile, { title: v.title, meta: v.meta, color: deptColor(v.dept), state: v.state }),
      Number(v.titleLines) === 2 ? "titleLines={2}" : undefined,
      v.metaWrap ? "metaWrap" : undefined,
      v.onClick ? "onClick={() => openClass(id)}" : undefined,
    ]),
  sections: [
    {
      title: "States",
      note: "now 는 color 를 무시하고 핑크 문법을 씁니다 — 글자만 핑크의 진한 글자로 내려 대비를 지킵니다. 핑크로 꽉 채우지 않는 건 이 칸 하나가 화면에서 제일 센 물건이 되어 옆을 읽는 걸 방해하기 때문입니다. focus 는 밖에서 지목한 칸이라 면이 진해지고, dim 은 지목한 칸 말고 나머지라 20% 로 물러납니다 — 한 과목을 짚으면 같은 과목만 남기는 식입니다.",
      render: () => (
        <Stage bg="raised">
          {(
            [
              { state: "upcoming", title: "미적분학1", meta: "형설202", dept: "수학" },
              { state: "now", title: "일반물리학", meta: "형설305", dept: "물리학" },
              { state: "past", title: "세계사의이해", meta: "형설103", dept: "사회" },
              { state: "free", title: "공강", meta: undefined, dept: "융합" },
              { state: "focus", title: "자료구조", meta: "형설103", dept: "정보과학" },
              { state: "dim", title: "화학실험", meta: "형설401", dept: "화학" },
            ] as const
          ).map((s) => (
            <Stack key={s.state} gap="xs" align="center">
              <Cell>
                <ClassTile title={s.title} meta={s.meta} color={DEPT_COLORS[s.dept]} state={s.state} />
              </Cell>
              <Text variant="overline">{s.state}</Text>
            </Stack>
          ))}
        </Stage>
      ),
    },
    {
      title: "titleLines · metaWrap · onClick",
      note: "과목명은 기본 한 줄에서 자르고 titleLines={2} 면 두 줄까지 보입니다. 아래 줄 정보도 기본은 한 줄이고 metaWrap 이면 줄바꿈됩니다. onClick 을 주면 button 이 되어 누를 수 있고, 주지 않으면 div 입니다.",
      render: () => (
        <Stage bg="raised">
          <Cell height={84}>
            <ClassTile title="미적분학 II 영어강의 전체 분반" meta="형설202 · 김예시" color={DEPT_COLORS.수학} />
          </Cell>
          <Cell height={84}>
            <ClassTile title="미적분학 II 영어강의 전체 분반" meta="형설202 · 김예시" color={DEPT_COLORS.수학} titleLines={2} metaWrap />
          </Cell>
          <Cell>
            <ClassTile title="자료구조" meta="형설103" color={DEPT_COLORS.정보과학} onClick={noop} />
          </Cell>
        </Stage>
      ),
    },
    {
      title: "학과색",
      note: "열한 학과의 색입니다. meta 자리에 학과 이름을 적었습니다.",
      render: () => (
        <Stage bg="raised">
          {(Object.keys(DEPT_COLORS) as Dept[]).map((dept) => (
            <Cell key={dept} width={148}>
              <ClassTile title={SUBJECT_OF[dept]} meta={dept} color={DEPT_COLORS[dept]} />
            </Cell>
          ))}
        </Stage>
      ),
    },
  ],
};

// ── TimetableGrid ───────────────────────────────────────────────────

const WEEK = [
  { key: "mon", label: "월" },
  { key: "tue", label: "화" },
  { key: "wed", label: "수" },
  { key: "thu", label: "목" },
  { key: "fri", label: "금" },
];

interface Lesson {
  day: string;
  from: number;
  to: number;
  title: string;
  room: string;
  dept: Dept;
}

const LESSONS: Lesson[] = [
  { day: "mon", from: 1, to: 2, title: "미적분학1", room: "형설202", dept: "수학" },
  { day: "mon", from: 4, to: 5, title: "세계사의이해", room: "형설104", dept: "사회" },
  { day: "tue", from: 1, to: 2, title: "일반물리학", room: "형설305", dept: "물리학" },
  { day: "tue", from: 3, to: 4, title: "자료구조", room: "형설103", dept: "정보과학" },
  { day: "tue", from: 7, to: 8, title: "화학실험", room: "형설401", dept: "화학" },
  { day: "wed", from: 2, to: 3, title: "미적분학1", room: "형설202", dept: "수학" },
  { day: "wed", from: 5, to: 6, title: "일반화학", room: "형설207", dept: "화학" },
  { day: "thu", from: 1, to: 2, title: "자료구조", room: "형설103", dept: "정보과학" },
  { day: "thu", from: 4, to: 4, title: "세계사의이해", room: "형설104", dept: "사회" },
  { day: "thu", from: 8, to: 9, title: "정보과학탐구", room: "형설301", dept: "정보과학" },
  { day: "fri", from: 3, to: 4, title: "일반물리학", room: "형설305", dept: "물리학" },
  { day: "fri", from: 6, to: 6, title: "일반생물학", room: "형설210", dept: "생물학" },
];

/** 오늘 열에서 "지금" 으로 둘 교시 — 그보다 앞은 past, 뒤는 upcoming */
const NOW = 3;

function lessonCell(day: string, period: string, today?: string): ReactNode {
  const p = Number(period);
  const lesson = LESSONS.find((l) => l.day === day && p >= l.from && p <= l.to);
  if (!lesson) return null;
  const state: ClassTileState = day !== today ? "upcoming" : p < NOW ? "past" : p === NOW ? "now" : "upcoming";
  return <ClassTile title={lesson.title} meta={lesson.room} color={DEPT_COLORS[lesson.dept]} state={state} />;
}

function Week({ corner, today, count = 6, flush, bands }: { corner?: ReactNode; today?: string; count?: number; flush?: boolean; bands?: Record<number, string> }) {
  return (
    <TimetableGrid
      corner={corner}
      flush={flush}
      days={WEEK.map((d) => ({ ...d, today: d.key === today }))}
      periods={Array.from({ length: count }, (_, i) => ({ key: String(i + 1), label: String(i + 1), band: bands?.[i + 1] }))}
      renderCell={(day, period) => lessonCell(day, period, today)}
    />
  );
}

const timetableGrid: Spec = {
  name: "TimetableGrid",
  summary:
    "한 주 격자. 머리 줄은 검정, 교시 열은 well 이고, 오늘 요일 칸만 흰 칸으로 뒤집힙니다. 칸의 내용은 renderCell 이 정하고, periods 의 band 를 주면 그 교시는 칸 대신 요일 열 전체를 잇는 띠 행이 됩니다. flush 는 칸을 가장자리까지 채워 SlotCell 같은 상태 면 격자에 씁니다. today 는 days 한 칸의 today 를 고르는 표본용 컨트롤입니다.",
  controls: {
    corner: { kind: "text" },
    today: { kind: "select", options: ["none", ...WEEK.map((d) => d.label)] },
    flush: { kind: "boolean" },
  },
  initial: { today: "수" },
  defaults: { corner: "Pd", today: "none", flush: false },
  render: (v) => (
    <Frame width={640} top>
      <Week corner={String(v.corner ?? "")} today={WEEK.find((d) => d.label === v.today)?.key} flush={Boolean(v.flush)} />
    </Frame>
  ),
  code: (v) => {
    const today = WEEK.find((d) => d.label === v.today)?.key;
    return [
      "const days = [",
      ...WEEK.map((d) => `  { key: "${d.key}", label: "${d.label}"${d.key === today ? ", today: true" : ""} },`),
      "];",
      "const periods = [1, 2, 3, 4, 5, 6].map((n) => ({ key: String(n), label: String(n) }));",
      "",
      jsx("TimetableGrid", [
        "days={days}",
        "periods={periods}",
        ...printed(timetableGrid, { corner: v.corner, flush: v.flush }),
        [
          "renderCell={(day, period) => {",
          "  const c = lessonAt(day, period);",
          "  return c && <ClassTile title={c.title} meta={c.room} color={c.color} />;",
          "}}",
        ].join("\n"),
      ]),
    ].join("\n");
  },
  sections: [
    {
      title: "11교시 전체",
      note: "교시 수는 periods 가 정합니다. 수업이 없는 칸은 renderCell 이 null 을 돌려주면 빈 칸으로 남습니다.",
      render: () => (
        <Stage>
          <Frame width={640}>
            <Week today="wed" count={11} />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "band — 점심 · 저녁 띠",
      note: "periods 한 칸에 band 를 주면 그 줄은 요일 열을 모두 잇는 BreakBand 하나가 되고, renderCell 은 그 줄에서 불리지 않습니다. 교시 열의 이름은 그대로 남습니다.",
      render: () => (
        <Stage>
          <Frame width={640}>
            <Week today="wed" count={8} bands={{ 4: "점심" }} />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "flush — 상태 면 격자",
      note: "flush 는 칸의 안쪽 여백을 빼서 SlotCell 의 면이 칸 가장자리까지 찹니다. 시간을 고르는 격자(빈 강의실 · 분석 비교)에 씁니다.",
      render: () => (
        <Stage>
          <Frame width={480}>
            <SlotGrid />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "Mobile 폭",
      note: "열이 좁아지면 칸 안의 글자는 말줄임표로 잘립니다. 격자가 가로로 넘치지 않고 열 폭을 나눠 가집니다.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <Week today="wed" />
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── BreakBand · TimeCaret · SlotCell ───────────────────────────────

const breakBand: Spec = {
  name: "BreakBand",
  summary: "수업이 없는 시간. 빗금 면에 이름 라벨을 얹습니다. 시간표의 점심 · 저녁, 시간선의 쉬는 구간에 씁니다. 높이는 style 로 주면 분에 비례하는 띠가 됩니다. TimetableGrid 의 band 행이 이것을 그립니다.",
  controls: {
    label: { kind: "text" },
  },
  initial: { label: "점심" },
  render: (v) => (
    <Frame width={320}>
      <div style={{ height: 40 }}>
        <BreakBand label={txt(v.label)} style={{ height: "100%" }} />
      </div>
    </Frame>
  ),
  code: (v) => jsx("BreakBand", printed(breakBand, v)),
  sections: [
    {
      title: "분에 비례하는 띠",
      note: "시간선에서는 쉬는 구간의 길이만큼 높이를 줍니다. style 은 실행 중에 정해지는 값에만 씁니다.",
      render: () => (
        <Stage bg="raised">
          {[24, 48, 96].map((h) => (
            <Stack key={h} gap="xs" align="center" style={{ width: 120 }}>
              <BreakBand label="저녁" style={{ height: h, width: "100%" }} />
              <Text variant="micro" tone="muted">
                {h}px
              </Text>
            </Stack>
          ))}
        </Stage>
      ),
    },
  ],
};

/** TimeCaret 이 얹힐 축 — 부모가 relative 이고 높이가 있어야 합니다 */
function Axis({ children }: { children: ReactNode }) {
  return (
    <Surface fill="well" border="line" style={{ position: "relative", height: 40 }}>
      <BreakBand label="점심" style={{ position: "absolute", left: "45%", width: "20%", top: 0, bottom: 0 }} />
      {children}
    </Surface>
  );
}

const timeCaret: Spec = {
  name: "TimeCaret",
  summary:
    "지금을 짚는 선과 마름모. 시간 · 날짜 축 위에 얹습니다. 부모가 position: relative 이고, position(0~100, %)이 축 위의 자리입니다. 시간이 흐르면 천천히 옮겨 가고, label 을 주면 마름모 대신 꼬리표를 답니다. 스크린 리더에게는 읽히지 않습니다.",
  controls: {
    position: { kind: "number", min: 0, max: 100, step: 5 },
    label: { kind: "text" },
  },
  initial: { position: 40 },
  defaults: { label: "" },
  render: (v) => (
    <Frame width={420}>
      <Axis>
        <TimeCaret position={Number(v.position ?? 0)} label={txt(v.label)} />
      </Axis>
    </Frame>
  ),
  code: (v) => jsx("TimeCaret", printed(timeCaret, v)),
  sections: [
    {
      title: "마름모와 꼬리표",
      note: "label 이 없으면 마름모, 있으면 그 글자입니다. 날짜 축에서는 남은 날수(D-3)를 답니다. position 은 0 과 100 사이로 잘립니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={420}>
            <Stack gap="xl">
              <Axis>
                <TimeCaret position={30} />
              </Axis>
              <Axis>
                <TimeCaret position={70} label="D-3" />
              </Axis>
            </Stack>
          </Frame>
        </Stage>
      ),
    },
  ],
};

/** 상태 면 격자 — SlotCell 을 flush 격자에 둡니다. 눌러서 고른 칸은 selected 로 바뀝니다 */
function SlotGrid() {
  const [picked, setPicked] = useState<string[]>(["wed:3"]);
  const toggle = (id: string) => setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const state = (day: string, period: string): SlotState => {
    const id = `${day}:${period}`;
    if (picked.includes(id)) return "selected";
    return LESSONS.some((l) => l.day === day && Number(period) >= l.from && Number(period) <= l.to) ? "busy" : "free";
  };
  return (
    <TimetableGrid
      flush
      days={WEEK}
      periods={Array.from({ length: 6 }, (_, i) => ({ key: String(i + 1), label: String(i + 1) }))}
      renderCell={(day, period) => <SlotCell state={state(day, period)} label={`${day} ${period}교시`} onToggle={() => toggle(`${day}:${period}`)} />}
    />
  );
}

const slotCell: Spec = {
  name: "SlotCell",
  summary:
    "칸 전체를 상태 면으로 칠하는 격자 칸. TimetableGrid flush 안에 둡니다. free 는 비어 있음(초록), busy 는 점유(회색), selected 는 고름(검정), conflict 는 충돌(주황), common 은 공통(핑크), empty 는 면 없음입니다. onToggle 을 주면 눌러서 고르는 칸이 되고, 글자가 없는 칸이라 label 로 이름을 줍니다. 시간을 고르는 격자(빈 강의실 · 분석 비교)에 씁니다.",
  controls: {
    state: { kind: "select", options: SLOT_STATES },
    onToggle: { kind: "boolean" },
    disabled: { kind: "boolean" },
  },
  initial: { state: "free" },
  defaults: { onToggle: false, disabled: false },
  render: (v) => (
    <Cell width={96} height={48}>
      <SlotCell state={v.state as SlotState} onToggle={v.onToggle ? noop : undefined} disabled={Boolean(v.disabled)} label="월 3교시" />
    </Cell>
  ),
  code: (v) =>
    jsx("SlotCell", [
      ...printed(slotCell, { state: v.state, disabled: v.disabled }),
      v.onToggle ? "onToggle={() => toggle(id)}" : undefined,
      v.onToggle ? 'label="월 3교시"' : undefined,
    ]),
  sections: [
    {
      title: "여섯 상태",
      note: "뜻은 면의 색으로 말합니다. 글자를 넣을 때는 면 위에서 읽히는지 확인합니다.",
      render: () => (
        <Stage bg="raised">
          {SLOT_STATES.map((st) => (
            <Stack key={st} gap="xs" align="center">
              <Cell width={96} height={48}>
                <SlotCell state={st} />
              </Cell>
              <Text variant="overline">{st}</Text>
            </Stack>
          ))}
        </Stage>
      ),
    },
    {
      title: "고르는 격자",
      note: "onToggle 이 있는 칸은 button 이고 selected 일 때 aria-pressed 가 true 입니다. 회색은 수업이 있는 시간이고, 초록 칸을 눌러 고르면 검정으로 바뀝니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={480}>
            <SlotGrid />
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── Tone ────────────────────────────────────────────────────────────

const DEPTS = Object.keys(DEPT_COLORS) as Dept[];
const MEALS = [
  { name: "아침", tone: "#ffd500" },
  { name: "점심", tone: "#ff9100" },
  { name: "저녁", tone: "#7828c8" },
] as const;

/** 하나만 고르는 학과 — 골라진 칸만 색이 있습니다 */
function MajorChoice() {
  const [major, setMajor] = useState<Dept>("물리학");
  return (
    <Grid columns="repeat(2, minmax(0, 1fr))" gap="md">
      {DEPTS.slice(0, 6).map((dept) => (
        <ToneButton key={dept} tone={DEPT_COLORS[dept]} selected={major === dept} fullWidth onClick={() => setMajor(dept)}>
          {dept}
        </ToneButton>
      ))}
    </Grid>
  );
}

/** 나란히 붙은 끼니 — 색 버튼도 골라지면 커집니다 */
function MealChoice() {
  const [meal, setMeal] = useState("점심");
  return (
    <Inline gap="sm">
      {MEALS.map(({ name, tone }) => (
        <ToneButton key={name} tone={tone} size="sm" selected={meal === name} onClick={() => setMeal(name)}>
          {name}
        </ToneButton>
      ))}
    </Inline>
  );
}

/** 여러 개를 함께 켜는 기수 거르개 */
function CohortFilter() {
  const [on, setOn] = useState<string[]>(["23", "24", "25"]);
  const toggle = (cohort: string) => setOn((prev) => (prev.includes(cohort) ? prev.filter((c) => c !== cohort) : [...prev, cohort]));
  return (
    <Inline gap="lg" wrap>
      {Object.keys(COHORT_COLORS).map((cohort) => (
        <ToneChip key={cohort} tone={cohortColor(cohort)} selected={on.includes(cohort)} onClick={() => toggle(cohort)}>
          {cohort}학번
        </ToneChip>
      ))}
    </Inline>
  );
}

const toneButton: Spec = {
  name: "ToneButton",
  summary:
    "실행 중에 정해지는 색(학과 · 끼니)으로 칠하는 버튼입니다. 안 골린 칸은 흰 면(paper)이고, 골라지면 그 색의 면이 되며 Button 과 같이 105% 로 커집니다. 글자는 면 색에서 검정 · 흰색을 골라 AA 를 지킵니다. Paint 는 hex 를 받지 않으므로 이 길은 Components 에만 있습니다.",
  controls: {
    dept: { kind: "select", options: DEPTS },
    size: { kind: "select", options: CONTROL_SIZES },
    selected: { kind: "boolean" },
    disabled: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { dept: "물리학", selected: true, children: "물리학" },
  defaults: { size: "md", selected: false, disabled: false },
  render: (v) => (
    <ToneButton tone={deptColor(v.dept)} size={v.size as ControlSize} selected={Boolean(v.selected)} disabled={Boolean(v.disabled)}>
      {String(v.children ?? "")}
    </ToneButton>
  ),
  code: (v) => printJsx("ToneButton", { tone: deptColor(v.dept), size: v.size, selected: v.selected, disabled: v.disabled, children: v.children }, toneButton.defaults),
  sections: [
    {
      title: "학과 고르기",
      note: "셋을 다 칠하면 어느 것을 보고 있는지 색으로 가릴 수 없어서 안 골린 칸은 흰 면입니다. 눌러 보세요.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <MajorChoice />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "끼니 — 나란히 붙은 줄",
      note: "class-explorer 는 색 버튼을 키우지 않았지만, funky-ui 는 골라진 버튼을 색과 상관없이 키웁니다. 글자는 면에 따라 검정 · 흰색으로 갈립니다.",
      render: () => (
        <Stage>
          <MealChoice />
        </Stage>
      ),
    },
    {
      title: "학과색 열한 가지 — 글자 대비",
      note: "글자는 검정과 흰색의 대비가 같아지는 휘도(0.179)를 경계로 고릅니다. 그래서 어떤 색이든 4.58:1 이상입니다.",
      render: () => (
        <Stage>
          {DEPTS.map((dept) => (
            <ToneButton key={dept} tone={DEPT_COLORS[dept]} size="sm" selected>
              {dept}
            </ToneButton>
          ))}
        </Stage>
      ),
    },
  ],
};

const toneChip: Spec = {
  name: "ToneChip",
  summary:
    "여러 개를 함께 켜는 색 칩입니다. 켜면 tone 12% 면에 그림자 위에 서고(hover 때 가라앉음), 끄면 흐린 회색으로 물러나 있다가 hover 때 흐림이 걷힙니다. 기본으로 전부 켜 두는 줄이라 Button 과 달리 커지지 않습니다.",
  controls: {
    cohort: { kind: "select", options: Object.keys(COHORT_COLORS) },
    selected: { kind: "boolean" },
    disabled: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { cohort: "25", selected: true, children: "25학번" },
  defaults: { selected: false, disabled: false },
  render: (v) => (
    <ToneChip tone={cohortColor(v.cohort)} selected={Boolean(v.selected)} disabled={Boolean(v.disabled)}>
      {String(v.children ?? "")}
    </ToneChip>
  ),
  code: (v) => printJsx("ToneChip", { tone: cohortColor(v.cohort), selected: v.selected, disabled: v.disabled, children: v.children }, toneChip.defaults),
  sections: [
    {
      title: "기수 거르개",
      note: "눌러서 켜고 꺼 보세요. aria-pressed 로 켜짐을 알립니다.",
      render: () => (
        <Stage>
          <CohortFilter />
        </Stage>
      ),
    },
  ],
};

const toneBox: Spec = {
  name: "ToneBox",
  summary: "색을 깐 상자입니다. tone 8% 면과 그 색의 2px 테두리이고, 글자는 바깥 글자색 그대로라 칠하지 않습니다. 카드 안의 칸처럼 이미 틀이 있으면 framed 를 끕니다.",
  controls: {
    dept: { kind: "select", options: DEPTS },
    framed: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { dept: "수학", children: "수강 이력으로 보면 수학 트랙 같아요" },
  defaults: { framed: true },
  render: (v) => (
    <Frame width={320}>
      <ToneBox tone={deptColor(v.dept)} framed={v.framed !== false} paddingX="lg" paddingY="md">
        <Text weight="black">{String(v.children ?? "")}</Text>
      </ToneBox>
    </Frame>
  ),
  code: (v) =>
    printJsx("ToneBox", { tone: deptColor(v.dept), framed: v.framed, paddingX: "lg", paddingY: "md", children: `<Text weight="black">${String(v.children ?? "")}</Text>` }, toneBox.defaults, { framed: { kind: "boolean" } }),
};

const toneSwatch: Spec = {
  name: "ToneSwatch",
  summary:
    "범례 칸 · 왼쪽 띠입니다. box 는 16px 네모에 검정 테두리이고, rail 은 줄 높이를 채우는 4px 왼쪽 띠입니다. 뜻은 옆 글자가 말하므로 스크린 리더에게 읽히지 않습니다. tone 이 없으면 자리만 지킵니다. accent 로 칠하는 점 · 띠는 Swatch 입니다.",
  controls: {
    dept: { kind: "select", options: ["none", ...DEPTS] },
    shape: { kind: "select", options: TONE_SWATCH_SHAPES },
  },
  initial: { dept: "화학" },
  defaults: { shape: "box" },
  render: (v) => (
    <Inline gap="sm" align="stretch">
      <ToneSwatch tone={v.dept === "none" ? undefined : deptColor(v.dept)} shape={v.shape as "box" | "rail"} />
      <Text variant="caption" weight="black">
        {v.dept === "none" ? "색 없음" : String(v.dept ?? "")}
      </Text>
    </Inline>
  ),
  code: (v) => printJsx("ToneSwatch", { tone: v.dept === "none" ? undefined : deptColor(v.dept), shape: v.shape }, toneSwatch.defaults),
  sections: [
    {
      title: "rail — 줄 높이를 채우는 띠",
      note: "rail 은 flex 줄 안에서 줄 높이를 채웁니다. 수업이 있는 줄은 학과색 띠를, 수업이 없는 줄은 tone 없이 자리만 지키는 띠를 둬서 두 줄의 글자 시작점이 어긋나지 않습니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="md" style={{ width: 280 }}>
            <Inline gap="md" align="stretch">
              <ToneSwatch shape="rail" tone={DEPT_COLORS.수학} />
              <Stack gap="2xs">
                <Text variant="caption" weight="black">
                  미적분학1
                </Text>
                <Text variant="micro" tone="muted">
                  형설202 · 월 1–2교시
                </Text>
              </Stack>
            </Inline>
            <Inline gap="md" align="stretch">
              <ToneSwatch shape="rail" />
              <Stack gap="2xs">
                <Text variant="caption" weight="black">
                  공강
                </Text>
                <Text variant="micro" tone="muted">
                  수업이 없습니다
                </Text>
              </Stack>
            </Inline>
          </Stack>
        </Stage>
      ),
    },
    {
      title: "범례",
      render: () => (
        <Stage bg="raised">
          {DEPTS.map((dept) => (
            <Inline key={dept} gap="sm">
              <ToneSwatch tone={DEPT_COLORS[dept]} />
              <Text variant="caption" weight="black">
                {dept}
              </Text>
            </Inline>
          ))}
        </Stage>
      ),
    },
  ],
};

const toneText: Spec = {
  name: "ToneText",
  summary:
    "실행 중의 색으로 칠하는 글자. Text 의 글자 역할(variant · weight · truncate …)을 그대로 받고 글자색만 tone(hex)으로 바꿉니다. 흰 면 위의 대비는 그 색에 달려 있어서, 큰 글자나 이름에만 씁니다.",
  controls: {
    dept: { kind: "select", options: DEPTS },
    variant: { kind: "select", options: ["heading", "title", "subheading", "label", "caption"] },
    children: { kind: "text" },
  },
  initial: { dept: "수학", variant: "heading", children: "미적분학1" },
  defaults: { variant: "body" },
  render: (v) => (
    <ToneText tone={deptColor(v.dept)} variant={v.variant as "heading"}>
      {String(v.children ?? "")}
    </ToneText>
  ),
  code: (v) => printJsx("ToneText", { tone: deptColor(v.dept), variant: v.variant, children: v.children }, toneText.defaults),
  sections: [
    {
      title: "학과색 열한 가지",
      note: "⚠️ 글자색이라 면처럼 자동으로 검정 · 흰색을 고르지 않습니다. 노랑 · 연한 청록 계열은 흰 면 위에서 대비가 모자랄 수 있으니 이름 같은 큰 글자에만 씁니다.",
      render: () => (
        <Stage bg="raised">
          {DEPTS.map((dept) => (
            <ToneText key={dept} tone={DEPT_COLORS[dept]} variant="subheading">
              {dept}
            </ToneText>
          ))}
        </Stage>
      ),
    },
  ],
};

export const COMPONENT_SPECS: Record<string, Spec> = {
  AppBar: appBar,
  SideNav: sideNav,
  BottomNav: bottomNav,
  TermSwitcher: termSwitcher,
  StudentBadge: studentBadge,
  PersonCard: personCard,
  ClassTile: classTile,
  TimetableGrid: timetableGrid,
  BreakBand: breakBand,
  TimeCaret: timeCaret,
  SlotCell: slotCell,
  ToneButton: toneButton,
  ToneChip: toneChip,
  ToneBox: toneBox,
  ToneSwatch: toneSwatch,
  ToneText: toneText,
};
