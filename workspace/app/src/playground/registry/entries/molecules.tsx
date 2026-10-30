/** Molecules — Atom 을 묶은 범용 조합 스물. 겹치는 판(Modal · Drawer · Menu · Tooltip · Popover)은 닫힌 채로 트리거만 그립니다 */
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  Accordion,
  Badge,
  Busy,
  Button,
  Card,
  Drawer,
  EmptyState,
  FileDrop,
  FormField,
  Grid,
  IconButton,
  Inline,
  Input,
  Menu,
  Meter,
  Modal,
  Notice,
  PageHeader,
  Popover,
  SearchField,
  SectionTitle,
  SegmentedControl,
  Select,
  Stack,
  Stat,
  Surface,
  Table,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  type Accent,
  type ChoiceOption,
  type ControlSize,
  type IconComponent,
  type MenuItem,
  type MenuProps,
  type ModalProps,
  type SearchFieldProps,
  type SegmentedControlProps,
  type Space,
  type SurfaceFill,
  type TabsProps,
  type TooltipProps,
  type Variant,
} from "@studio-baeks/funky-ui";
import {
  ACCENTS,
  ACCENT_ROLES,
  ACCORDION_SIZES,
  ACCORDION_TITLES,
  CONTROL_SIZES,
  DRAWER_SIDES,
  MOTIONS,
  NOTICE_VARIANTS,
  POPOVER_TRIGGERS,
  SPACES,
  SURFACE_FILLS,
  TABLE_HEADS,
  VARIANTS,
  type AccordionSize,
  type AccordionTitle,
  type DrawerSide,
  type NoticeVariant,
  type PopoverTrigger,
  type PressMotion,
  type TableHead,
} from "@studio-baeks/funky-ui/tokens";
import {
  ArrowUpDown,
  BookOpen,
  CalendarDays,
  CircleCheck,
  Download,
  Ellipsis,
  Eye,
  FileText,
  GraduationCap,
  Info,
  MapPin,
  Plus,
  RefreshCw,
  Trash2,
  TriangleAlert,
  Upload,
  User,
  Utensils,
} from "lucide-react";

import { Stage } from "../../kit";
import { printJsx } from "../code";
import { icon } from "../icons";
import type { Spec, Values } from "../schema";

const ACCENT_OPTIONS = [...ACCENTS, ...Object.keys(ACCENT_ROLES)] as const;
/** 카드는 면이 있는 박스라 Surface 의 `none` 을 받지 않습니다 */
type CardFill = Exclude<SurfaceFill, "none" | "brand">;
const CARD_FILLS = SURFACE_FILLS.filter((f): f is CardFill => f !== "none" && f !== "brand");
const CARD_MOTION_NOTE = { sink: "사람 카드", raise: "평평한 카드", lift: "탐색 카드" } as const;
/** "none" 은 accent 를 주지 않은 상태입니다 — 바깥 accent 를 따르고, 바깥에도 없으면 검정 */
const ACCENT_OR_NONE = ["none", ...ACCENT_OPTIONS] as const;

// 아래는 컴포넌트 자신의 prop 이 지역 union 이라 어휘 배열이 없는 선택지입니다
const CARD_SHADOWS = ["raised", "none"] as const;
const MODAL_SIZES = ["sm", "md", "lg", "xl", "full"] as const;
const STAT_SIZES = ["sm", "lg"] as const;
const MENU_ALIGNS = ["start", "center", "end"] as const;
const TOOLTIP_PLACEMENTS = ["top", "bottom"] as const;
const NOTICE_ROLES = ["status", "alert"] as const;
const CARD_TITLE_STYLES = ["subtitle", "heading"] as const;
const CARD_STRIP_PLACEMENTS = ["bottom", "top"] as const;

/** select 의 "none" · 빈 값은 prop 을 주지 않은 것입니다 */
const opt = <T extends string>(x: unknown) => (x === undefined || x === "" || x === "none" ? undefined : (x as T));
/** text 컨트롤의 빈 칸은 prop 을 주지 않은 것입니다 */
const txt = (x: unknown) => (typeof x === "string" && x !== "" ? x : undefined);
const stop = (e: { preventDefault(): void }) => e.preventDefault();
const stopNav = () => undefined;
/** 누르는 Card 를 a 로 그릴 때 — Pressable 은 a 의 밑줄을 끄지 않아서 호출하는 쪽이 끕니다 */
const LINK_STYLE = { textDecoration: "none" } as const;
const LINK_ATTRS = ['as="a"', 'href="#"', 'style={{ textDecoration: "none" }}'];

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

function Labeled({ name, children }: { name: string; children: ReactNode }) {
  return (
    <Stack gap="xs" style={{ width: "100%", maxWidth: 420 }}>
      <Text variant="micro" tone="muted">
        {name}
      </Text>
      {children}
    </Stack>
  );
}

// ── 같이 쓰는 표본 자료 ─────────────────────────────────────────────

const ENROLLED = ["미적분학1", "일반물리학", "세계사의이해", "자료구조"] as const;
const MEAL = "현미밥 · 된장찌개 · 제육볶음 · 배추김치";

const TODAY = [
  { period: "1–2", name: "미적분학1", room: "형설202" },
  { period: "3", name: "일반물리학", room: "형설305" },
  { period: "5", name: "세계사의이해", room: "형설103" },
] as const;

function TodayRows() {
  return (
    <Stack gap="md">
      {TODAY.map((c) => (
        <Inline key={c.name} justify="between" gap="md">
          <Inline gap="md">
            <Text variant="caption" tone="muted" numeric>
              {c.period}교시
            </Text>
            <Text weight="black">{c.name}</Text>
          </Inline>
          <Text variant="caption" tone="muted">
            {c.room}
          </Text>
        </Inline>
      ))}
    </Stack>
  );
}

function EnrolledList() {
  return (
    <Stack gap="md">
      {ENROLLED.map((name) => (
        <Text key={name}>{name}</Text>
      ))}
    </Stack>
  );
}

const DAYS: ChoiceOption<string>[] = [
  { value: "mon", label: "월" },
  { value: "tue", label: "화" },
  { value: "wed", label: "수" },
  { value: "thu", label: "목" },
  { value: "fri", label: "금" },
];

// ── Card ────────────────────────────────────────────────────────────

function ClassSummary() {
  return (
    <Stack gap="xs">
      <Inline gap="md">
        <Text variant="heading">미적분학1</Text>
        <Badge size="sm" variant="solid">
          수학
        </Badge>
      </Inline>
      <Text variant="caption" tone="muted">
        형설202 · 월 3–4교시
      </Text>
    </Stack>
  );
}

const card: Spec = {
  name: "Card",
  summary:
    "흰 면 · 2px 검정 · 4px 그림자. 화면의 영역은 카드로 나눕니다. 카드는 흑백 박스라 accent 가 없습니다 — 안쪽 배지 · 버튼이 색을 각자 고릅니다. motion 을 주면 카드 전체가 누르는 물건이 됩니다.",
  controls: {
    fill: { kind: "select", options: CARD_FILLS },
    shadow: { kind: "select", options: CARD_SHADOWS },
    padding: { kind: "select", options: SPACES },
    motion: { kind: "select", options: MOTIONS },
  },
  defaults: { fill: "raised", shadow: "raised", padding: "3xl", motion: "none" },
  render: (v) => {
    const look = {
      fill: v.fill as CardFill,
      shadow: v.shadow as "raised" | "none",
      padding: v.padding as Space,
    };
    const motion = opt<PressMotion>(v.motion);
    return (
      <Frame width={320}>
        {motion ? (
          <Card as="a" href="#" style={LINK_STYLE} onClick={stop} motion={motion} {...look}>
            <ClassSummary />
          </Card>
        ) : (
          <Card {...look}>
            <ClassSummary />
          </Card>
        )}
      </Frame>
    );
  },
  code: (v) =>
    jsx("Card", [...(opt(v.motion) ? LINK_ATTRS : []), ...printed(card, v)], [
      jsx("Stack", ['gap="xs"'], [
        jsx("Inline", ['gap="md"'], ['<Text variant="heading">미적분학1</Text>', '<Badge size="sm" variant="solid">수학</Badge>']),
        '<Text variant="caption" tone="muted">형설202 · 월 3–4교시</Text>',
      ]),
    ]),
  sections: [
    {
      title: "Header · Section",
      note: "머리나 구분선이 필요하면 padding 을 0 으로 주고 Card.Header · Card.Section 으로 나눕니다. 카드 안에 카드를 넣지 않습니다.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <Card padding="0">
              <Card.Header title="Today" icon={CalendarDays} actions={<Badge size="sm" variant="filled">3</Badge>} />
              <Card.Section divided>
                <TodayRows />
              </Card.Section>
            </Card>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "Header bar",
      note: "tone=\"bar\" 는 머리를 Paint 의 filled 로 칠합니다 (모달 머리와 같은 모양). 막대 색은 Card.Header 의 accent 로 고르고, 카드 판은 흑백 그대로입니다. 막대 위의 filled 배지는 accent 를 따로 줍니다 — 안 주면 막대와 같은 색이 됩니다.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <Card padding="0">
              <Card.Header tone="bar" accent="purple" title="Meal" icon={Utensils} actions={<Badge size="sm" accent="black" variant="filled">점심</Badge>} />
              <Card.Section>
                <Text>{MEAL}</Text>
              </Card.Section>
              <Card.Section divided>
                <Text tone="muted">저녁 · 잡곡밥 · 미역국 · 닭볶음탕 · 깍두기</Text>
              </Card.Section>
            </Card>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "Header — eyebrow · description · titleStyle",
      note: "eyebrow 는 제목 위의 작은 이름표(overline), description 은 제목 아래 설명입니다. 둘 중 하나라도 주거나 titleStyle=\"heading\"(20px, 대소문자 그대로)을 주면 두 줄 머리가 되어 제목이 줄바꿈됩니다. 기본 subtitle 머리는 한 줄에서 자릅니다.",
      render: () => (
        <Stage>
          {CARD_TITLE_STYLES.map((ts) => (
            <Frame key={ts} width={320}>
              <Card padding="0">
                <Card.Header
                  eyebrow={ts === "heading" ? "Syllabus" : undefined}
                  title={ts === "heading" ? "미적분학 II 영어강의 전체 분반" : "Syllabus"}
                  description={ts === "heading" ? "2026-2 · 월 3–4교시" : undefined}
                  titleStyle={ts}
                  icon={BookOpen}
                />
                <Card.Section divided>
                  <Text variant="caption" tone="muted">
                    titleStyle={ts}
                  </Text>
                </Card.Section>
              </Card>
            </Frame>
          ))}
        </Stage>
      ),
    },
    {
      title: "Strip — 전폭 색 띠",
      note: "Card.Strip 은 카드 아래(기본) 또는 위 끝에 붙는 전폭 색 띠입니다. 상태 줄(노란 푸터 막대 · 거절 사유)에 쓰고, 테두리는 카드 쪽 한 줄만 남습니다. 카드는 padding=\"0\" 으로 둡니다. variant 는 기본 solid 입니다.",
      render: () => (
        <Stage>
          {CARD_STRIP_PLACEMENTS.map((pl) => (
            <Frame key={pl} width={320}>
              <Card padding="0">
                {pl === "top" && (
                  <Card.Strip accent="yellow" placement="top">
                    <Text variant="caption" weight="black" tone="inherit">
                      검토 대기 중
                    </Text>
                  </Card.Strip>
                )}
                <Card.Section>
                  <Text>교과 외 활동 증빙 자료</Text>
                </Card.Section>
                {pl === "bottom" && (
                  <Card.Strip accent="red" variant="plain">
                    <Text variant="caption" weight="black" tone="inherit">
                      거절 사유 · 파일을 열 수 없습니다
                    </Text>
                  </Card.Strip>
                )}
              </Card>
            </Frame>
          ))}
        </Stage>
      ),
    },
    {
      title: "Fill",
      note: "카드의 면은 Surface 의 흑백 면 다섯입니다. inverse 위에서는 글자색이 같이 바뀝니다. accent 로 칠한 박스가 필요하면 Card 가 아니라 Paint 입니다.",
      render: () => (
        <Stage>
          {CARD_FILLS.map((s) => (
            <Card key={s} fill={s} padding="xl">
              <Text variant="label">{s}</Text>
            </Card>
          ))}
        </Stage>
      ),
    },
    {
      title: "Motion — 누르는 카드",
      note: "sink 는 그림자 속으로 가라앉고(사람 카드), raise 는 평평하다가 그림자가 올라오고, lift 는 떠오릅니다(탐색 카드). motion 을 주면 그림자가 몸짓의 일부가 되어 shadow 는 무시됩니다. 링크면 as 로 a 나 라우터 Link 를 넘기고, a 의 밑줄은 style 로 끕니다.",
      render: () => (
        <Stage>
          {(["sink", "raise", "lift"] as const).map((m) => (
            <Frame key={m} width={200}>
              <Card as="a" href="#" style={LINK_STYLE} onClick={stop} motion={m} padding="xl">
                <Stack gap="2xs">
                  <Text variant="label">{m}</Text>
                  <Text variant="caption" tone="muted">
                    {CARD_MOTION_NOTE[m]}
                  </Text>
                </Stack>
              </Card>
            </Frame>
          ))}
        </Stage>
      ),
    },
  ],
};

// ── SectionTitle ────────────────────────────────────────────────────

const sectionTitle: Spec = {
  name: "SectionTitle",
  summary: "섹션 소제목. 14px · 대문자 · 넓은 자간 · 약한 잉크이고, 제목 줄은 영어로 씁니다. 오른쪽 끝에는 개수나 작은 버튼을 둡니다.",
  controls: {
    title: { kind: "text" },
    icon: { kind: "icon" },
  },
  initial: { title: "Timetable", icon: "CalendarDays" },
  defaults: { icon: "none" },
  render: (v) => (
    <Frame width={320}>
      <SectionTitle title={String(v.title ?? "")} icon={icon(v.icon)} />
    </Frame>
  ),
  code: (v) => jsx("SectionTitle", printed(sectionTitle, { title: v.title, icon: v.icon })),
  sections: [
    {
      title: "trailing",
      note: "오른쪽 끝에 개수나 작은 버튼을 둡니다.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <Stack gap="2xl">
              <SectionTitle title="Friends" icon={User} trailing={<Badge size="sm" variant="filled">12</Badge>} />
              <SectionTitle
                title="Today"
                icon={CalendarDays}
                trailing={
                  <Button size="xs" variant="muted" icon={Plus}>
                    Add
                  </Button>
                }
              />
            </Stack>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "Home 의 자리들",
      note: "카드 바깥, 영역 바로 위에 놓습니다. 카드 안의 머리는 Card.Header 가 맡습니다.",
      render: () => (
        <Stage>
          <Frame width={420}>
            <Stack gap="4xl">
              <Stack gap="lg">
                <SectionTitle title="Today" icon={CalendarDays} />
                <Card padding="xl">
                  <TodayRows />
                </Card>
              </Stack>
              <Stack gap="lg">
                <SectionTitle title="Meal" icon={Utensils} trailing={<Badge size="sm" variant="solid" accent="orange">점심</Badge>} />
                <Card padding="xl">
                  <Text>{MEAL}</Text>
                </Card>
              </Stack>
            </Stack>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── SearchField 와 PageHeader 가 같이 쓰는 상태 있는 표본 ───────────────

type Look = Pick<SegmentedControlProps<string>, "accent" | "variant" | "size" | "shadow" | "gap" | "fill" | "attached">;

/** SegmentedControl — 고른 값을 스스로 들고 있는 표본 */
function Segments({
  options = DAYS,
  initial = "wed",
  label = "요일",
  ...look
}: Look & { options?: readonly ChoiceOption<string>[]; initial?: string; label?: string }) {
  const [value, setValue] = useState(initial);
  const control = <SegmentedControl aria-label={label} options={options} value={value} onChange={setValue} {...look} />;
  return look.fill ? <Frame width={360}>{control}</Frame> : control;
}

/** SearchField — 입력값을 스스로 들고 있는 표본. 폭은 부르는 쪽이 정합니다 */
function SearchDemo(props: Omit<SearchFieldProps, "value" | "onValueChange">) {
  const [query, setQuery] = useState("");
  return <SearchField value={query} onValueChange={setQuery} {...props} />;
}

const RECENT_SEED = [{ value: "미적분학 II" }, { value: "일반물리학" }, { value: "student:25-001", label: "학번 25-001" }] as const;
const RECENT = RECENT_SEED;

/** 최근 검색어를 고르고 지우는 SearchField — 제안은 포커스가 있는 동안만 뜹니다 */
function RecentSearch() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<readonly { value: string; label?: string }[]>(RECENT_SEED);
  return (
    <SearchField
      value={query}
      onValueChange={setQuery}
      placeholder="과목 · 교사 · 학번 검색"
      suggestions={query === "" ? recent : []}
      suggestionsTitle="Recent"
      onSuggestionSelect={setQuery}
      onSuggestionRemove={(value) => setRecent((r) => r.filter((x) => x.value !== value))}
      onSuggestionsClear={() => setRecent([])}
    />
  );
}

// ── PageHeader ──────────────────────────────────────────────────────

const BROWSE_FILTERS: ChoiceOption<string>[] = [
  { value: "student", label: "학생" },
  { value: "teacher", label: "교사" },
];

const pageHeader: Spec = {
  name: "PageHeader",
  summary:
    "페이지 머리 카드. 검정 아이콘 칸 · 이름표(subtitle) · 큰 제목에, 오른쪽에는 페이지의 주 동작을 둡니다. children 은 같은 카드 안의 필터 줄입니다.",
  controls: {
    title: { kind: "text" },
    subtitle: { kind: "text" },
    icon: { kind: "icon" },
  },
  initial: { title: "Calendar", subtitle: "2026-2 학사일정", icon: "CalendarDays" },
  defaults: { icon: "none" },
  render: (v) => (
    <Frame width={640} top>
      <PageHeader title={String(v.title ?? "")} subtitle={txt(v.subtitle)} icon={icon(v.icon)} />
    </Frame>
  ),
  code: (v) => jsx("PageHeader", printed(pageHeader, { title: v.title, subtitle: v.subtitle, icon: v.icon })),
  sections: [
    {
      title: "action",
      note: "오른쪽에는 페이지의 주 동작 하나를 둡니다. 좁은 화면에서는 제목 아래로 내려갑니다.",
      render: () => (
        <Stage>
          <Frame width={720}>
            <PageHeader
              title="Calendar"
              subtitle="2026-2 학사일정"
              icon={CalendarDays}
              action={
                <Button variant="filled" shadow icon={Plus}>
                  일정 추가
                </Button>
              }
            />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "children — 필터 줄",
      note: "children 은 머리 아래, 같은 카드 안에 붙습니다. 카드 안에 카드를 따로 만들지 않습니다.",
      render: () => (
        <Stage>
          <Frame width={720}>
            <PageHeader title="Browse" subtitle="학생 · 교사" icon={GraduationCap}>
              <Inline gap="lg" wrap>
                <Segments options={BROWSE_FILTERS} initial="student" label="대상" />
                <Frame width={240}>
                  <SearchDemo size="sm" placeholder="이름 · 학번" />
                </Frame>
              </Inline>
            </PageHeader>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── Accordion ───────────────────────────────────────────────────────

function ControlledAccordion() {
  const [open, setOpen] = useState(true);
  return (
    <Stack gap="lg">
      <Inline gap="md">
        <Button size="sm" variant="muted" onClick={() => setOpen((o) => !o)}>
          {open ? "접기" : "펼치기"}
        </Button>
        <Text variant="caption" tone="muted">
          버튼과 머리가 같은 open 을 바꿉니다
        </Text>
      </Inline>
      <Accordion title="Prerequisites" icon={BookOpen} open={open} onOpenChange={setOpen}>
        <Inline gap="md" wrap>
          <Badge variant="solid" accent="purple">
            미적분학1
          </Badge>
          <Badge variant="solid" accent="purple">
            일반물리학
          </Badge>
        </Inline>
      </Accordion>
    </Stack>
  );
}

const accordion: Spec = {
  name: "Accordion",
  summary: "접히는 카드. 머리를 누르면 펼쳐지고, 내용은 카드 안 구분선 아래에 놓입니다. open 을 주면 제어형이고, 안 주면 스스로 상태를 가집니다. titleStyle=section 은 대문자 섹션 제목이고, size=sm 은 12px 제목의 촘촘한 줄입니다.",
  controls: {
    title: { kind: "text" },
    titleStyle: { kind: "select", options: ACCORDION_TITLES },
    size: { kind: "select", options: ACCORDION_SIZES },
    icon: { kind: "icon" },
    trailing: { kind: "boolean" },
    defaultOpen: { kind: "boolean" },
  },
  initial: { title: "Enrolled Classes", icon: "GraduationCap", trailing: true },
  defaults: { titleStyle: "heading", size: "md", icon: "none", trailing: false, defaultOpen: false },
  render: (v) => (
    <Frame width={320}>
      {/* defaultOpen 은 처음 한 번만 읽히므로, 바꾸면 key 로 다시 세웁니다 */}
      <Accordion
        key={String(v.defaultOpen)}
        title={String(v.title ?? "")}
        titleStyle={v.titleStyle as AccordionTitle}
        size={v.size as AccordionSize}
        icon={icon(v.icon)}
        trailing={
          v.trailing ? (
            <Badge size="sm" variant="filled">
              {ENROLLED.length}
            </Badge>
          ) : undefined
        }
        defaultOpen={Boolean(v.defaultOpen)}
      >
        <EnrolledList />
      </Accordion>
    </Frame>
  ),
  code: (v) =>
    jsx(
      "Accordion",
      [
        ...printed(accordion, { title: v.title, titleStyle: v.titleStyle, size: v.size, icon: v.icon, defaultOpen: v.defaultOpen }),
        v.trailing ? `trailing={<Badge size="sm" variant="filled">${ENROLLED.length}</Badge>}` : undefined,
      ],
      [jsx("Stack", ['gap="md"'], ENROLLED.map((name) => `<Text>${name}</Text>`))],
    ),
  sections: [
    {
      title: "펼친 상태",
      note: "defaultOpen 이면 펼친 채로 시작합니다. 아코디언은 흑백 카드라 accent 가 없습니다 — 안쪽 배지가 색을 각자 고릅니다.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <Accordion
              defaultOpen
              title="Prerequisites"
              icon={BookOpen}
              trailing={
                <Badge size="sm" variant="filled">
                  2
                </Badge>
              }
            >
              <Inline gap="md" wrap>
                <Badge accent="green" variant="solid">미적분학1</Badge>
                <Badge accent="green" variant="solid">일반물리학</Badge>
              </Inline>
            </Accordion>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "섹션 제목 — titleStyle=\"section\"",
      note: "화면을 섹션으로 나누는 카드는 대문자 제목입니다. 좁은 화면에서 14px, md 이상에서 20px 이라 긴 제목도 폰에서 한 줄에 들어갑니다. 창 폭을 줄여 보세요.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <Accordion title="Enrolled Classes" titleStyle="section" icon={BookOpen}>
              <EnrolledList />
            </Accordion>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "size=\"sm\" — 촘촘한 줄",
      note: "sm 은 12px 제목에 작은 쉐브론과 좁은 본문 여백입니다. 목록 안에 여러 개를 쌓을 때 씁니다. 이때 titleStyle 은 쓰지 않습니다.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <Stack gap="sm">
              <Accordion size="sm" title="Prerequisites" icon={BookOpen} defaultOpen>
                <EnrolledList />
              </Accordion>
              <Accordion size="sm" title="Corequisites" icon={BookOpen}>
                <EnrolledList />
              </Accordion>
            </Stack>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "제어형 — open · onOpenChange",
      note: "open 을 주면 상태를 밖에서 쥡니다. 머리를 눌러도 onOpenChange 만 불리고, 실제로 열고 닫는 건 부르는 쪽입니다.",
      render: () => (
        <Stage>
          <Frame width={360}>
            <ControlledAccordion />
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── SegmentedControl ────────────────────────────────────────────────

const VIEWS: ChoiceOption<string>[] = [
  { value: "week", label: "주간", icon: CalendarDays },
  { value: "list", label: "목록", icon: BookOpen },
  { value: "rooms", label: "교실", icon: MapPin, disabled: true },
];

const segmentedControl: Spec = {
  name: "SegmentedControl",
  summary:
    "여러 값 중 하나를 고르는 버튼 줄. 안 고른 칸은 variant(기본 muted), 고른 칸은 같은 accent 의 filled 입니다. 방향키로 옮기고, Tab 키는 고른 칸 하나에만 들어옵니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OR_NONE },
    variant: { kind: "select", options: VARIANTS },
    size: { kind: "select", options: CONTROL_SIZES },
    shadow: { kind: "boolean" },
    gap: { kind: "select", options: SPACES },
    fill: { kind: "boolean" },
    attached: { kind: "boolean" },
  },
  initial: { accent: "cyan" },
  defaults: { accent: "none", variant: "muted", size: "sm", shadow: false, gap: "sm", fill: false, attached: false },
  render: (v) => (
    <Segments
      accent={opt<Accent>(v.accent)}
      variant={v.variant as Variant}
      size={v.size as ControlSize}
      shadow={Boolean(v.shadow)}
      gap={v.gap as Space}
      fill={Boolean(v.fill)}
      attached={Boolean(v.attached)}
    />
  ),
  code: (v) => jsx("SegmentedControl", ['aria-label="요일"', "options={days}", "value={day}", "onChange={setDay}", ...printed(segmentedControl, v)]),
  sections: [
    {
      title: "Variant — 안 고른 칸",
      note: "고른 칸은 어느 variant 든 같은 accent 의 filled 입니다. 안 고른 칸만 variant 를 따릅니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="md">
            {VARIANTS.map((variant) => (
              <Inline key={variant} gap="xl">
                <Text variant="overline" style={{ width: 120 }}>
                  {variant}
                </Text>
                <Segments variant={variant} accent="cyan" />
              </Inline>
            ))}
          </Stack>
        </Stage>
      ),
    },
    {
      title: "Sizes",
      note: "높이 24 · 32 · 40 · 48. Button 과 같은 사다리입니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="lg" align="center">
            {CONTROL_SIZES.map((s) => (
              <Segments key={s} size={s} />
            ))}
          </Stack>
        </Stage>
      ),
    },
    {
      title: "attached — 이어 붙인 칸",
      note: "attached 는 칸 사이를 없애고 맞닿은 테두리를 하나로 겹칩니다. 데이터 범위처럼 한 덩어리로 읽히는 선택지에 씁니다. gap 은 쓰이지 않고 줄바꿈도 하지 않습니다.",
      render: () => (
        <Stage bg="raised">
          <Segments attached variant="outline" accent="cyan" />
        </Stage>
      ),
    },
    {
      title: "icon · disabled",
      note: "ChoiceOption 에 icon 과 disabled 를 줄 수 있습니다. 안 고른 칸을 outline + 그림자로 바꾸면 Tabs 와 같은 모양이 됩니다.",
      render: () => (
        <Stage bg="raised">
          <Segments options={VIEWS} initial="week" label="보기" variant="outline" shadow />
        </Stage>
      ),
    },
  ],
};

// ── Tabs ────────────────────────────────────────────────────────────

const BROWSE: { value: string; label: string; icon: IconComponent; note: string }[] = [
  { value: "students", label: "학생", icon: User, note: "학생 목록 · 23–26 기수" },
  { value: "teachers", label: "교사", icon: GraduationCap, note: "교사 목록" },
  { value: "curriculum", label: "교육과정", icon: BookOpen, note: "교육과정 · 선수관계 그래프" },
];

type TabsLook = Pick<TabsProps<string>, "accent" | "variant" | "size" | "shadow" | "gap" | "fill">;

/** Tabs — 고른 탭을 스스로 들고 있는 표본 */
function BrowseTabs({ icons = false, panels = true, ...look }: TabsLook & { icons?: boolean; panels?: boolean }) {
  const [tab, setTab] = useState("students");
  const body = (
    <Tabs value={tab} onChange={setTab} {...look}>
      <Stack gap="lg">
        <Tabs.List aria-label="Browse">
          {BROWSE.map((t) => (
            <Tabs.Tab key={t.value} value={t.value} icon={icons ? t.icon : undefined}>
              {t.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {panels &&
          BROWSE.map((t) => (
            <Tabs.Panel key={t.value} value={t.value}>
              <Text variant="caption" tone="muted">
                {t.note}
              </Text>
            </Tabs.Panel>
          ))}
      </Stack>
    </Tabs>
  );
  return look.fill ? <Frame width={420}>{body}</Frame> : body;
}

const tabs: Spec = {
  name: "Tabs",
  summary:
    "화면을 바꾸는 버튼 줄(Tabs.List · Tabs.Tab)과 그 아래 화면(Tabs.Panel). 생김새는 SegmentedControl 과 같고 뜻이 다릅니다(tablist). 기본은 outline + 그림자입니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OR_NONE },
    variant: { kind: "select", options: VARIANTS },
    size: { kind: "select", options: CONTROL_SIZES },
    shadow: { kind: "boolean" },
    gap: { kind: "select", options: SPACES },
    fill: { kind: "boolean" },
  },
  defaults: { accent: "none", variant: "outline", size: "sm", shadow: true, gap: "md", fill: false },
  render: (v) => (
    <BrowseTabs
      accent={opt<Accent>(v.accent)}
      variant={v.variant as Variant}
      size={v.size as ControlSize}
      shadow={Boolean(v.shadow)}
      gap={v.gap as Space}
      fill={Boolean(v.fill)}
    />
  ),
  code: (v) =>
    jsx("Tabs", ["value={tab}", "onChange={setTab}", ...printed(tabs, v)], [
      jsx("Tabs.List", ['aria-label="Browse"'], BROWSE.map((t) => `<Tabs.Tab value="${t.value}">${t.label}</Tabs.Tab>`)),
      ...BROWSE.map((t) => `<Tabs.Panel value="${t.value}">${t.note}</Tabs.Panel>`),
    ]),
  sections: [
    {
      title: "Variant · shadow",
      note: "안 고른 탭의 칠과 그림자를 바꿉니다. 고른 탭은 같은 accent 의 filled 입니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="xl" align="center">
            <BrowseTabs panels={false} />
            <BrowseTabs panels={false} variant="muted" shadow={false} />
            <BrowseTabs panels={false} variant="solid" accent="pink" />
          </Stack>
        </Stage>
      ),
    },
    {
      title: "icon · fill",
      note: "Tabs.Tab 에 icon 을 줄 수 있습니다. fill 은 줄을 꽉 채워 탭을 같은 폭으로 나눕니다 — 모바일 폭에서 씁니다.",
      render: () => (
        <Stage bg="raised">
          <BrowseTabs panels={false} icons fill />
        </Stage>
      ),
    },
  ],
};

// ── Menu ────────────────────────────────────────────────────────────

const SORTS: MenuItem<string>[] = [
  { value: "name", label: "과목명" },
  { value: "dept", label: "학과" },
  { value: "period", label: "교시" },
];

/** 정렬 기준 고르기 — 트리거가 좁아야 판의 정렬(align)이 보입니다 */
function SortMenu({ align }: { align?: MenuProps<string>["align"] }) {
  const [sort, setSort] = useState("name");
  return (
    <Menu
      aria-label="정렬"
      align={align}
      items={SORTS}
      value={sort}
      onSelect={setSort}
      trigger={<IconButton icon={ArrowUpDown} label="정렬" variant="outline" />}
    />
  );
}

const ACTIONS: MenuItem<string>[] = [
  { value: "preview", label: "미리보기", icon: Eye },
  { value: "download", label: "내려받기", icon: Download },
  { value: "delete", label: "삭제", icon: Trash2, disabled: true },
];

/** value 가 없는 액션 목록 — 고른 값을 들고 있지 않고 부르기만 합니다 */
function ActionMenu() {
  const [last, setLast] = useState("");
  return (
    <Inline gap="lg">
      <Menu aria-label="강의계획서" items={ACTIONS} onSelect={setLast} trigger={<IconButton icon={Ellipsis} label="더 보기" variant="outline" />} />
      <Text variant="caption" tone="muted">
        {last ? `선택: ${ACTIONS.find((a) => a.value === last)?.label}` : "항목을 고르면 여기에 나옵니다"}
      </Text>
    </Inline>
  );
}

const menu: Spec = {
  name: "Menu",
  summary: "고르는 목록. 트리거 버튼을 누르면 흰 판이 열리고, 바깥을 누르거나 Esc 로 닫습니다. value 를 주면 골라진 칸에 체크와 검정 면이 붙습니다.",
  controls: {
    align: { kind: "select", options: MENU_ALIGNS },
  },
  defaults: { align: "start" },
  render: (v) => <SortMenu align={v.align as MenuProps<string>["align"]} />,
  code: (v) =>
    jsx("Menu", [
      'aria-label="정렬"',
      ...printed(menu, v),
      "items={sorts}",
      "value={sort}",
      "onSelect={setSort}",
      'trigger={<IconButton icon={ArrowUpDown} label="정렬" variant="outline" />}',
    ]),
  sections: [
    {
      title: "액션 목록 — value 없음",
      note: "value 를 안 주면 role 이 menuitem 이고 체크가 없습니다. disabled 칸은 흐리게 나오고 고를 수 없습니다.",
      render: () => (
        <Stage bg="raised">
          <ActionMenu />
        </Stage>
      ),
    },
    {
      title: "align",
      note: "판의 최소 폭은 트리거 폭이고, align 은 판을 트리거의 어느 쪽 끝에 맞출지 정합니다. 화면 밖으로 나가면 안으로 밀립니다.",
      render: () => (
        <Stage bg="raised">
          {MENU_ALIGNS.map((a) => (
            <Stack key={a} gap="md" align="center">
              <SortMenu align={a} />
              <Text variant="overline">{a}</Text>
            </Stack>
          ))}
        </Stage>
      ),
    },
  ],
};

// ── Modal ───────────────────────────────────────────────────────────

/** 트리거 버튼 + 닫혀 있는 Modal — 열림 상태는 이 안에서 쥡니다. footer 는 닫는 함수를 받습니다 */
function ModalButton({
  label,
  footer,
  children,
  ...modal
}: { label: string; footer?: (close: () => void) => ReactNode; children?: ReactNode } & Omit<ModalProps, "open" | "onClose" | "footer" | "children">) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button size="sm" shadow onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Modal open={open} onClose={close} footer={footer?.(close)} {...modal}>
        {children}
      </Modal>
    </>
  );
}

const moveFooter = (close: () => void) => (
  <>
    <Button size="sm" variant="ghost" onClick={close}>
      취소
    </Button>
    <Button size="sm" variant="filled" accent="green" onClick={close}>
      이동
    </Button>
  </>
);

const MOVE_NOTE = "일반물리학을 B반에서 A반으로 옮깁니다. 시간표에 바로 반영됩니다.";

const modal: Spec = {
  name: "Modal",
  summary:
    "native dialog 위에 서는 모달. 머리 막대는 accent 면이고, Esc · 바깥 누름 · 닫기 버튼이 모두 onClose 를 부릅니다. 그림자는 시스템에서 유일한 6px 입니다.",
  controls: {
    title: { kind: "text" },
    subtitle: { kind: "text" },
    titleUppercase: { kind: "boolean" },
    actions: { kind: "boolean" },
    accent: { kind: "select", options: ACCENT_OPTIONS },
    size: { kind: "select", options: MODAL_SIZES },
    footer: { kind: "boolean" },
    footerAccent: { kind: "select", options: ACCENT_OR_NONE },
    dismissible: { kind: "boolean" },
    closable: { kind: "boolean" },
    flush: { kind: "boolean" },
    closeLabel: { kind: "text" },
  },
  initial: { title: "수강 변경", footer: true },
  defaults: { subtitle: "", titleUppercase: true, actions: false, accent: "purple", size: "md", footer: false, footerAccent: "none", dismissible: true, closable: true, flush: false, closeLabel: "닫기" },
  render: (v) => (
    <ModalButton
      label="모달 열기"
      title={txt(v.title)}
      subtitle={txt(v.subtitle)}
      titleUppercase={Boolean(v.titleUppercase)}
      actions={v.actions ? <IconButton icon={Eye} label="새 탭에서 열기" size="sm" variant="ghost" accent="purple" /> : undefined}
      accent={v.accent as Accent}
      size={v.size as ModalProps["size"]}
      footer={v.footer ? moveFooter : undefined}
      footerAccent={opt<Accent>(v.footerAccent)}
      dismissible={Boolean(v.dismissible)}
      closable={Boolean(v.closable)}
      flush={Boolean(v.flush)}
      closeLabel={txt(v.closeLabel)}
    >
      <Text>{MOVE_NOTE}</Text>
    </ModalButton>
  ),
  code: (v) =>
    [
      '<Button onClick={() => setOpen(true)}>모달 열기</Button>',
      jsx(
        "Modal",
        [
          "open={open}",
          "onClose={close}",
          ...printed(modal, {
            title: v.title,
            subtitle: v.subtitle,
            titleUppercase: v.titleUppercase,
            accent: v.accent,
            size: v.size,
            footerAccent: v.footerAccent,
            dismissible: v.dismissible,
            closable: v.closable,
            flush: v.flush,
            closeLabel: v.closeLabel,
          }),
          v.actions ? 'actions={<IconButton icon={Eye} label="새 탭에서 열기" size="sm" variant="ghost" accent="purple" />}' : undefined,
          v.footer
            ? [
                "footer={",
                ...[
                  "<>",
                  '  <Button variant="ghost" onClick={close}>취소</Button>',
                  '  <Button variant="filled" accent="green" onClick={close}>이동</Button>',
                  "</>",
                ].map(indent),
                "}",
              ].join("\n")
            : undefined,
        ],
        [MOVE_NOTE],
      ),
    ].join("\n"),
  sections: [
    {
      title: "Size",
      note: "폭은 400 · 512 · 768 · 1024px 에서 화면 폭보다 32px 좁게 줄어듭니다. 내용이 길면 모달 안에서 스크롤됩니다. full 은 1280px 폭에 96vh 높이이고, 머리가 고정된 채 본문이 남은 높이를 채웁니다 — 파일 미리보기처럼 화면을 거의 덮는 창입니다.",
      render: () => (
        <Stage bg="raised">
          {MODAL_SIZES.map((s) => (
            <ModalButton key={s} label={s} title={`size ${s}`} size={s}>
              <Text>{MOVE_NOTE}</Text>
            </ModalButton>
          ))}
        </Stage>
      ),
    },
    {
      title: "머리 · 본문 · 아래 줄",
      note: "subtitle 은 머리 막대의 두 번째 줄(두 줄에서 자릅니다)이고, actions 는 닫기 앞에 놓는 동작 버튼입니다. 파일명처럼 원문이 뜻인 제목은 titleUppercase 를 끄고, 미리보기처럼 본문이 가장자리까지 차야 하면 flush 로 안쪽 여백을 뺍니다. footerAccent 는 아래 동작 줄을 그 색의 띠로 칠하고, closable=false 는 닫기 버튼과 Esc · 막 누름을 모두 막아 다 끝내야 나가는 창을 만듭니다(아래 버튼으로만 닫힙니다).",
      render: () => (
        <Stage bg="raised">
          <ModalButton
            label="파일 미리보기"
            title="syllabus_calculus2.pdf"
            titleUppercase={false}
            subtitle="미적분학 II · 2026-2 · 1.2MB"
            actions={<IconButton icon={Eye} label="새 탭에서 열기" size="sm" variant="ghost" accent="purple" />}
            size="lg"
            flush
          >
            <Surface fill="well" padding="4xl">
              <Text variant="caption" tone="muted">
                본문이 가장자리까지 찹니다
              </Text>
            </Surface>
          </ModalButton>
          <ModalButton
            label="끝내야 나가는 창"
            title="학기 설정"
            size="sm"
            closable={false}
            footerAccent="yellow"
            footer={(close) => (
              <Button size="sm" variant="filled" onClick={close}>
                완료
              </Button>
            )}
          >
            <Text>학기를 고른 뒤 완료를 눌러야 닫힙니다.</Text>
          </ModalButton>
        </Stage>
      ),
    },
    {
      title: "Accent · dismissible",
      note: "머리 막대의 색으로 뜻을 알립니다. 입력 중인 폼은 dismissible 을 끄면 바깥을 눌러도 닫히지 않습니다 — 닫기 버튼 · Esc · 아래 버튼으로만 닫힙니다.",
      render: () => (
        <Stage bg="raised">
          <ModalButton
            label="삭제 확인"
            accent="red"
            title="삭제"
            size="sm"
            footer={(close) => (
              <>
                <Button size="sm" variant="ghost" onClick={close}>
                  취소
                </Button>
                <Button size="sm" variant="filled" accent="red" onClick={close}>
                  삭제
                </Button>
              </>
            )}
          >
            <Text>개인 일정 1건을 삭제합니다.</Text>
          </ModalButton>
          <ModalButton label="저장 완료" accent="green" title="저장했습니다" size="sm">
            <Text>개인 일정이 달력에 추가되었습니다.</Text>
          </ModalButton>
          <ModalButton
            label="입력 중"
            title="일정 제안"
            size="sm"
            dismissible={false}
            footer={(close) => (
              <Button size="sm" variant="filled" onClick={close}>
                제출
              </Button>
            )}
          >
            <FormField label="제목">
              <Input placeholder="중간고사 시간표" />
            </FormField>
          </ModalButton>
        </Stage>
      ),
    },
  ],
};


// ── Drawer ──────────────────────────────────────────────────────────

/** 서랍이 fixed 라 화면 전체를 쓰므로, 표본은 안쪽 틀(relative · overflow hidden)에 absolute 로 가둡니다 */
const DRAWER_FRAME: CSSProperties = { position: "relative", overflow: "hidden", width: "100%", height: 220 };

function drawerStyle(side: DrawerSide): CSSProperties {
  return side === "bottom" ? { position: "absolute", height: 120 } : { position: "absolute", width: 200 };
}

function DrawerDemo({ side = "right", withHandle = false }: { side?: DrawerSide; withHandle?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <Stack gap="md" style={{ width: "100%", maxWidth: 420 }}>
      <Inline gap="md">
        <Button size="sm" shadow onClick={() => setOpen((o) => !o)}>
          {open ? "서랍 닫기" : "서랍 열기"}
        </Button>
        <Text variant="caption" tone="muted">
          뒤 화면은 막히지 않습니다
        </Text>
      </Inline>
      <Surface fill="well" border="line" style={DRAWER_FRAME}>
        <Text as="div" variant="caption" tone="muted" style={{ padding: 12 }}>
          옆에 두고 함께 보는 화면
        </Text>
        <Drawer
          open={open}
          side={side}
          aria-label="미리보기"
          style={drawerStyle(side)}
          handle={
            withHandle ? (
              <Button size="xs" variant="paper" shadow onClick={() => setOpen((o) => !o)} aria-label="서랍 여닫기">
                {open ? "닫기" : "열기"}
              </Button>
            ) : undefined
          }
        >
          <Stack gap="sm" padding="lg">
            <Text variant="subheading">Ask</Text>
            <Text variant="caption" tone="muted">
              {side} 서랍
            </Text>
          </Stack>
        </Drawer>
      </Surface>
    </Stack>
  );
}

const drawer: Spec = {
  name: "Drawer",
  summary:
    "가장자리에서 밀려 나오는 판. 뒤 화면을 막지 않아서 옆에 두고 함께 보는 패널입니다 — 막아야 하면 Modal 입니다. 판이 붙은 가장자리 쪽에는 선을 긋지 않고, 닫혀 있는 동안 안쪽은 inert 라 Tab 이 들어가지 않습니다. 폭 · 높이는 style 로 줍니다. 아래 표본은 안쪽 틀에 가둬 두었고, 실제로는 화면(fixed)을 씁니다.",
  controls: {
    side: { kind: "select", options: DRAWER_SIDES },
  },
  defaults: { side: "right" },
  render: (v) => <DrawerDemo key={String(v.side)} side={v.side as DrawerSide} />,
  code: (v) =>
    jsx("Drawer", ["open={open}", ...printed(drawer, v), 'aria-label="미리보기"', "style={{ width: 360 }}"], [
      jsx("Stack", ['gap="sm"', 'padding="lg"'], ['<Text variant="subheading">Ask</Text>']),
    ]),
  sections: [
    {
      title: "세 가장자리",
      note: "right(기본) · left · bottom 입니다. 서랍이 열릴 때 가장자리에서 밀려 나옵니다.",
      render: () => (
        <Stage bg="raised">
          {DRAWER_SIDES.map((sd) => (
            <Labeled key={sd} name={sd}>
              <DrawerDemo side={sd} />
            </Labeled>
          ))}
        </Stage>
      ),
    },
    {
      title: "handle — 닫혀도 보이는 손잡이",
      note: "handle 은 판 바깥에 붙어서 닫혀 있어도 화면에 남습니다. 여닫는 버튼은 쓰는 쪽이 그립니다.",
      render: () => (
        <Stage bg="raised">
          <DrawerDemo withHandle />
        </Stage>
      ),
    },
  ],
};

// ── Tooltip ─────────────────────────────────────────────────────────

/** ⌘ (또는 Ctrl) 을 누르는 동안에만 켜집니다 — class-explorer 의 `disabled={!isModifierPressed}` */
function ModifierTooltip() {
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    const sync = (e: KeyboardEvent) => setPressed(e.metaKey || e.ctrlKey);
    const off = () => setPressed(false);
    window.addEventListener("keydown", sync);
    window.addEventListener("keyup", sync);
    window.addEventListener("blur", off);
    return () => {
      window.removeEventListener("keydown", sync);
      window.removeEventListener("keyup", sync);
      window.removeEventListener("blur", off);
    };
  }, []);
  return (
    <Stack gap="md" align="center">
      <Tooltip content="분반 명단을 봅니다" disabled={!pressed}>
        <Button size="sm" variant="muted">
          일반물리학 B반
        </Button>
      </Tooltip>
      <Text variant="caption" tone="muted">
        {pressed ? "⌘ 를 누르는 중 — 올려 보세요" : "⌘ (Ctrl) 을 누른 채 마우스를 올립니다"}
      </Text>
    </Stack>
  );
}

const tooltip: Spec = {
  name: "Tooltip",
  summary:
    "설명 풍선. 트리거에 마우스를 올리거나 포커스하면 delay(기본 300ms) 뒤에 뜹니다. body 끝(Portal)에 그려서 카드의 overflow 에 잘리지 않습니다.",
  controls: {
    content: { kind: "text" },
    placement: { kind: "select", options: TOOLTIP_PLACEMENTS },
    delay: { kind: "number", min: 0, max: 2000, step: 100 },
    disabled: { kind: "boolean" },
  },
  initial: { content: "강의계획서를 미리 봅니다" },
  defaults: { placement: "top", delay: 300, disabled: false },
  render: (v) => (
    <Tooltip
      content={String(v.content ?? "")}
      placement={v.placement as TooltipProps["placement"]}
      delay={Number(v.delay ?? 300)}
      disabled={Boolean(v.disabled)}
    >
      <Button size="sm" icon={Eye}>
        Preview
      </Button>
    </Tooltip>
  ),
  code: (v) => jsx("Tooltip", printed(tooltip, v), [jsx("Button", ['size="sm"', "icon={Eye}"], ["Preview"])]),
  sections: [
    {
      title: "Placement",
      note: "기본은 위(top)입니다. 자리가 모자라면 반대쪽으로 뒤집히고, 좌우는 화면 안에 묶입니다.",
      render: () => (
        <Stage bg="raised">
          {TOOLTIP_PLACEMENTS.map((p) => (
            <Tooltip key={p} content={`placement=${p}`} placement={p}>
              <Button size="sm" variant="muted">
                {p}
              </Button>
            </Tooltip>
          ))}
        </Stage>
      ),
    },
    {
      title: "⌘ 를 누를 때만",
      note: "disabled 에 !pressed 를 주면 ⌘ (Ctrl) 을 누른 채 올릴 때만 뜹니다. class-explorer 의 Tooltip 규칙입니다. 키보드로 열려면 트리거가 포커스를 받아야 하므로 Button · a 같은 요소를 씁니다.",
      render: () => (
        <Stage bg="raised">
          <ModifierTooltip />
        </Stage>
      ),
    },
  ],
};

// ── Popover ─────────────────────────────────────────────────────────

function PersonSummary() {
  return (
    <Stack gap="xs">
      <Text weight="black">김예시</Text>
      <Text variant="caption" tone="muted">
        25-001 · 수학
      </Text>
      <Inline gap="xs" wrap>
        <Badge size="sm" variant="solid" accent="purple">
          미적분학 II
        </Badge>
        <Badge size="sm" variant="solid" accent="cyan">
          일반물리학
        </Badge>
      </Inline>
    </Stack>
  );
}

/** manual — 밖에서 쥐는 열림. 여기서는 버튼이 쥡니다 */
function ManualPopover() {
  const [open, setOpen] = useState(false);
  return (
    <Popover trigger="manual" open={open} onOpenChange={setOpen} content={<PersonSummary />}>
      <Button size="sm" variant="muted" onClick={() => setOpen((o) => !o)}>
        {open ? "닫기" : "열기"}
      </Button>
    </Popover>
  );
}

const popover: Spec = {
  name: "Popover",
  summary:
    "내용을 담는 판. 흰 면 · 2px 검정 · 4px 그림자입니다. Tooltip 은 짧은 글자용(검정 면 · 누를 수 없음)이고, 카드나 요약은 이쪽입니다. 판 위로 마우스를 옮겨도 닫히지 않으며, 바깥을 누르거나 Esc 로 닫힙니다.",
  controls: {
    trigger: { kind: "select", options: POPOVER_TRIGGERS },
    placement: { kind: "select", options: TOOLTIP_PLACEMENTS },
    align: { kind: "select", options: MENU_ALIGNS },
    delay: { kind: "number", min: 0, max: 2000, step: 100 },
    padding: { kind: "select", options: SPACES },
    block: { kind: "boolean" },
  },
  defaults: { trigger: "hover", placement: "top", align: "center", delay: 300, padding: "lg", block: false },
  render: (v) => (
    <Frame width={320}>
      <Popover
        key={String(v.trigger)}
        content={<PersonSummary />}
        trigger={v.trigger as PopoverTrigger}
        placement={v.placement as "top" | "bottom"}
        align={v.align as "start" | "center" | "end"}
        delay={Number(v.delay ?? 300)}
        padding={v.padding as Space}
        block={Boolean(v.block)}
      >
        <Button size="sm" variant="muted" icon={User}>
          김예시
        </Button>
      </Popover>
    </Frame>
  ),
  code: (v) => jsx("Popover", ["content={<PersonSummary />}", ...printed(popover, v)], [jsx("Button", ['size="sm"', 'variant="muted"', "icon={User}"], ["김예시"])]),
  sections: [
    {
      title: "trigger",
      note: "hover(기본)는 마우스를 올리거나 포커스하면 delay 뒤에 열리고, 판으로 옮겨 가는 동안 닫히지 않게 100ms 기다립니다. click 은 눌러서 고정하고, manual 은 부르는 쪽이 open 으로만 엽니다 — ⌘ 를 누를 때만 뜨는 판처럼 조건이 따로 있을 때입니다.",
      render: () => (
        <Stage bg="raised">
          <Popover content={<PersonSummary />}>
            <Button size="sm" variant="muted">
              hover
            </Button>
          </Popover>
          <Popover trigger="click" content={<PersonSummary />}>
            <Button size="sm" variant="muted">
              click
            </Button>
          </Popover>
          <ManualPopover />
        </Stage>
      ),
    },
    {
      title: "block — 줄 전체에 붙이기",
      note: "기준 요소를 줄 전체로 두면 폭을 채우는 막대나 줄에 판을 붙일 수 있습니다. Meter 의 tooltip 이 이렇게 막대 위에 뜹니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={320}>
            <Popover block delay={100} padding="md" content={<Text variant="caption">12 / 15학점 이수</Text>}>
              <Meter label="수학" value={12} max={15} accent="purple" />
            </Popover>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── SearchField ─────────────────────────────────────────────────────

const searchField: Spec = {
  name: "SearchField",
  summary: "앞에 돋보기, 값이 있으면 뒤에 지우기가 붙는 검색 칸. 제어형(value · onValueChange)입니다. 한글 조합 중 Enter 는 부르는 쪽이 거릅니다.",
  controls: {
    size: { kind: "select", options: CONTROL_SIZES },
    placeholder: { kind: "text" },
    shadow: { kind: "boolean" },
    invalid: { kind: "boolean" },
    disabled: { kind: "boolean" },
    clearLabel: { kind: "text" },
    suggestions: { kind: "boolean" },
  },
  initial: { placeholder: "과목 · 교사 · 학번 검색" },
  defaults: { size: "md", shadow: false, invalid: false, disabled: false, clearLabel: "지우기", suggestions: false },
  render: (v) => (
    <Frame width={360}>
      <SearchDemo
        size={v.size as ControlSize}
        placeholder={txt(v.placeholder)}
        shadow={Boolean(v.shadow)}
        invalid={Boolean(v.invalid)}
        disabled={Boolean(v.disabled)}
        clearLabel={txt(v.clearLabel)}
        suggestions={v.suggestions ? RECENT : undefined}
        suggestionsTitle={v.suggestions ? "Recent" : undefined}
      />
    </Frame>
  ),
  code: (v) =>
    jsx("SearchField", [
      "value={query}",
      "onValueChange={setQuery}",
      ...printed(searchField, { ...v, suggestions: undefined }),
      v.suggestions ? "suggestions={recent}" : undefined,
      v.suggestions ? 'suggestionsTitle="Recent"' : undefined,
    ]),
  sections: [
    {
      title: "Sizes",
      note: "높이 24 · 32 · 40 · 48. Button · Input 과 같은 사다리라 한 줄에 나란히 놓아도 높이가 맞습니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={360}>
            <Stack gap="lg">
              {CONTROL_SIZES.map((s) => (
                <SearchDemo key={s} size={s} placeholder={`size ${s}`} />
              ))}
            </Stack>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "suggestions — 최근 검색어",
      note: "칸에 포커스가 있는 동안 아래에 제안이 붙습니다. 언제 비울지는 부르는 쪽이 정해서, 아래 표본은 입력이 비었을 때만 보입니다. 제안을 눌러도 포커스는 입력에 남습니다 — Menu 를 쓰면 열 때 포커스가 판으로 옮겨 가 입력 중에 쓸 수 없어서 따로 만들었습니다. onSuggestionRemove 를 주면 줄마다 지우기가, onSuggestionsClear 를 주면 머리에 전체 지우기가 붙습니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={360}>
            <RecentSearch />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "States",
      note: "shadow 는 화면의 주인공 칸에만 줍니다. invalid 는 빨간 테두리와 aria-invalid 를 붙입니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={360}>
            <Stack gap="lg">
              <SearchDemo shadow placeholder="shadow" />
              <SearchDemo invalid placeholder="invalid" />
              <SearchDemo disabled placeholder="disabled" />
            </Stack>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── FormField ───────────────────────────────────────────────────────

const TRACKS = ["수학", "정보과학", "물리학", "화학", "생물학", "지구과학"] as const;

const formField: Spec = {
  name: "FormField",
  summary: "이름표 + 칸 + 안내를 한 묶음으로. 이름표와 안내가 칸에 연결되고, error 를 주면 칸이 빨갛게, warning 을 주면 주황으로 바뀝니다. 안내는 error, warning, hint 순으로 하나만 보입니다.",
  controls: {
    label: { kind: "text" },
    hint: { kind: "text" },
    warning: { kind: "text" },
    error: { kind: "text" },
    required: { kind: "boolean" },
  },
  initial: { label: "학번", hint: "예: 25-001", warning: "", error: "", required: true },
  defaults: { required: false },
  render: (v) => (
    <Frame width={280}>
      <FormField label={String(v.label ?? "")} hint={txt(v.hint)} warning={txt(v.warning)} error={txt(v.error)} required={Boolean(v.required)}>
        <Input placeholder="25-001" />
      </FormField>
    </Frame>
  ),
  code: (v) =>
    jsx("FormField", printed(formField, { label: v.label, hint: v.hint, warning: v.warning, error: v.error, required: v.required }), ['<Input placeholder="25-001" />']),
  sections: [
    {
      title: "Select · Textarea",
      note: "칸은 Input · Textarea · Select 중 하나를 넣습니다. id 와 aria-describedby 는 FormField 가 붙입니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={320}>
            <Stack gap="xl">
              <FormField label="전공 트랙" hint="나중에 바꿀 수 있습니다">
                <Select>
                  {TRACKS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
              </FormField>
              <FormField label="메모" hint="200자까지">
                <Textarea rows={3} placeholder="일정에 붙일 메모" />
              </FormField>
            </Stack>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "warning",
      note: "warning 은 막지 않는 경고입니다. hint 대신 주황 글자로 나오고 칸은 주황 테두리가 됩니다(aria-invalid 는 없습니다). error 가 같이 있으면 error 가 앞섭니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={280}>
            <FormField label="학점" hint="한 학기 최대 24학점" warning="22학점을 넘으면 지도교사 확인이 필요합니다">
              <Input defaultValue="23" />
            </FormField>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "error",
      note: "error 를 주면 hint 대신 빨간 글자로 나오고, 칸은 invalid 가 됩니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={280}>
            <FormField label="학번" hint="예: 25-001" error="학번 형식이 맞지 않습니다" required>
              <Input defaultValue="2501" />
            </FormField>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── FileDrop ────────────────────────────────────────────────────────

function FileDropDemo({ multiple, disabled, accent, withIcon }: { multiple: boolean; disabled: boolean; accent: Accent; withIcon: boolean }) {
  const [names, setNames] = useState<string[]>([]);
  return (
    <Stack gap="md">
      <FileDrop
        multiple={multiple}
        disabled={disabled}
        accent={accent}
        icon={withIcon ? Upload : undefined}
        title="파일을 끌어다 놓거나 눌러서 고르세요"
        onFiles={(files) => setNames(files.map((f) => f.name))}
      >
        PDF · 10MB 이하
      </FileDrop>
      <Text variant="caption" tone="muted">
        {names.length ? `받은 파일 · ${names.join(", ")}` : "받은 파일이 없습니다"}
      </Text>
    </Stack>
  );
}

const fileDrop: Spec = {
  name: "FileDrop",
  summary:
    "파일 끌어놓기 칸. 점선 테두리이고, 눌러서 고를 수도 있습니다. 끄는 동안 칸이 accent 색으로 물듭니다. 안쪽은 native 파일 입력이라 키보드로도 엽니다. multiple 이 아니면 하나만 받습니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OPTIONS },
    multiple: { kind: "boolean" },
    disabled: { kind: "boolean" },
    icon: { kind: "icon" },
    title: { kind: "text" },
    children: { kind: "text" },
  },
  initial: { icon: "Upload", title: "파일을 끌어다 놓거나 눌러서 고르세요", children: "PDF · 10MB 이하" },
  defaults: { accent: "cyan", multiple: false, disabled: false, icon: "none" },
  render: (v) => (
    <Frame width={360}>
      <FileDrop
        accent={v.accent as Accent}
        multiple={Boolean(v.multiple)}
        disabled={Boolean(v.disabled)}
        icon={icon(v.icon)}
        title={txt(v.title)}
        onFiles={stopNav}
      >
        {txt(v.children)}
      </FileDrop>
    </Frame>
  ),
  code: (v) =>
    jsx("FileDrop", ["onFiles={upload}", ...printed(fileDrop, { accent: v.accent, multiple: v.multiple, disabled: v.disabled, icon: v.icon, title: v.title })], txt(v.children) ? [String(v.children)] : undefined),
  sections: [
    {
      title: "받은 파일 확인하기",
      note: "onFiles 는 고르거나 끌어다 놓으면 File 배열로 불립니다. 같은 파일을 다시 골라도 불리도록 입력을 비웁니다. 파일을 끌어 오면 칸이 물듭니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={360}>
            <FileDropDemo multiple accent="cyan" disabled={false} withIcon />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "accent · disabled",
      render: () => (
        <Stage bg="raised">
          <Frame width={240}>
            <FileDrop accent="pink" icon={FileText} title="증빙 자료" onFiles={stopNav}>
              이미지 · PDF
            </FileDrop>
          </Frame>
          <Frame width={240}>
            <FileDrop disabled icon={FileText} title="업로드 마감" onFiles={stopNav}>
              제출 기간이 끝났습니다
            </FileDrop>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── Stat ────────────────────────────────────────────────────────────

const stat: Spec = {
  name: "Stat",
  summary: "지표 하나. 이름표(overline)가 위, 큰 숫자가 아래입니다. accent 를 주면 숫자가 그 색의 진한 글자가 됩니다.",
  controls: {
    label: { kind: "text" },
    value: { kind: "text" },
    unit: { kind: "text" },
    size: { kind: "select", options: STAT_SIZES },
    accent: { kind: "select", options: ACCENT_OR_NONE },
  },
  initial: { label: "Credits", value: "72", unit: "학점", accent: "purple" },
  defaults: { size: "lg", accent: "none" },
  render: (v) => (
    <Stat
      label={String(v.label ?? "")}
      value={String(v.value ?? "")}
      unit={txt(v.unit)}
      size={v.size as "sm" | "lg"}
      accent={opt<Accent>(v.accent)}
    />
  ),
  code: (v) => jsx("Stat", printed(stat, { label: v.label, value: v.value, unit: v.unit, size: v.size, accent: v.accent })),
  sections: [
    {
      title: "Size",
      note: "lg 는 이름표가 subtitle · 숫자 48px, sm 은 이름표가 overline · 숫자 36px 입니다.",
      render: () => (
        <Stage bg="raised">
          <Stat label="Credits" value="72" unit="학점" />
          <Stat size="sm" label="Credits" value="72" unit="학점" />
        </Stage>
      ),
    },
    {
      title: "Accent",
      render: () => (
        <Stage bg="raised">
          <Stat size="sm" label="Students" value="128" unit="명" accent="purple" />
          <Stat size="sm" label="Classes" value="214" unit="개" accent="cyan" />
          <Stat size="sm" label="Rooms" value="38" unit="실" accent="green" />
          <Stat size="sm" label="Pending" value="7" unit="건" accent="orange" />
        </Stage>
      ),
    },
    {
      title: "지표 줄",
      note: "카드 안에 Grid 로 나란히 놓습니다.",
      render: () => (
        <Stage>
          <Frame width={560}>
            <Card padding="2xl">
              <Grid columns={4} gap="xl">
                <Stat size="sm" label="Students" value="128" unit="명" />
                <Stat size="sm" label="Classes" value="214" unit="개" />
                <Stat size="sm" label="Avg. Credits" value="21.4" unit="학점" />
                <Stat size="sm" label="Rooms" value="38" unit="실" />
              </Grid>
            </Card>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── Meter ───────────────────────────────────────────────────────────

const meter: Spec = {
  name: "Meter",
  summary: "막대 한 줄. 이름 · 막대 · 값을 한 줄에 놓고, 홈은 well, 채움은 accent solid 입니다. value 는 0 ~ max 사이로 잘립니다.",
  controls: {
    label: { kind: "text" },
    value: { kind: "number", min: 0, max: 200, step: 1 },
    max: { kind: "number", min: 1, max: 200, step: 1 },
    valueLabel: { kind: "text" },
    accent: { kind: "select", options: ACCENT_OR_NONE },
    onSelect: { kind: "boolean" },
    tooltip: { kind: "boolean" },
  },
  initial: { label: "수학 · 필수", value: 12, max: 15, accent: "purple" },
  defaults: { max: 100, valueLabel: "", accent: "none", onSelect: false, tooltip: false },
  render: (v) => (
    <Frame width={320}>
      <Meter
        label={String(v.label ?? "")}
        value={Number(v.value ?? 0)}
        max={Number(v.max ?? 100)}
        valueLabel={txt(v.valueLabel)}
        accent={opt<Accent>(v.accent)}
        onSelect={v.onSelect ? stopNav : undefined}
        tooltip={v.tooltip ? <Text variant="caption">12 / 15학점 이수</Text> : undefined}
      />
    </Frame>
  ),
  code: (v) =>
    jsx("Meter", [
      ...printed(meter, { label: v.label, value: v.value, max: v.max, valueLabel: v.valueLabel, accent: v.accent }),
      v.onSelect ? "onSelect={() => filterBy(subject)}" : undefined,
      v.tooltip ? 'tooltip={<Text variant="caption">12 / 15학점 이수</Text>}' : undefined,
    ]),
  sections: [
    {
      title: "Accent",
      note: "막대 색은 accent 로 고릅니다. 안 주면 바깥 accent 를, 바깥에도 없으면 검정을 씁니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={360}>
            <Stack gap="lg">
              <Meter label="수학" value={12} max={15} valueLabel="12 / 15학점" accent="purple" />
              <Meter label="정보과학" value={9} max={15} valueLabel="9 / 15학점" accent="sky" />
              <Meter label="생물학" value={6} max={12} valueLabel="6 / 12학점" accent="green" />
              <Meter label="화학" value={3} max={12} valueLabel="3 / 12학점" accent="orange" />
              <Meter label="국어" value={0} max={9} valueLabel="0 / 9학점" accent="red" />
            </Stack>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "onSelect · tooltip",
      note: "onSelect 를 주면 이름이 조용한 링크(hover 때 밑줄)가 되어, 막대를 눌러 그 항목으로 거르는 자리에 씁니다. tooltip 은 막대에 마우스를 올리면 그 위에 뜨는 판의 내용입니다 — 막대 위에 고정되고 마우스를 따라다니지 않습니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={360}>
            <Stack gap="lg">
              <Meter label="수학" value={12} max={15} valueLabel="12 / 15학점" accent="purple" onSelect={stopNav} />
              <Meter label="정보과학" value={9} max={15} valueLabel="9 / 15학점" accent="sky" tooltip={<Text variant="caption">남은 학점 6</Text>} />
              <Meter label="생물학" value={6} max={12} valueLabel="6 / 12학점" accent="green" onSelect={stopNav} tooltip={<Text variant="caption">남은 학점 6</Text>} />
            </Stack>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "범위 밖의 값",
      note: "value 가 max 보다 크거나 0 보다 작아도 막대는 홈 밖으로 나가지 않습니다. 오른쪽 글자는 valueLabel 이 없으면 value 그대로입니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={360}>
            <Stack gap="lg">
              <Meter label="value 110 / max 100" value={110} />
              <Meter label="value -10 / max 100" value={-10} />
            </Stack>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── Table ───────────────────────────────────────────────────────────

const CREDIT_ROWS = [
  { term: "2025-1", classes: "미적분학 I · 일반물리학 I", credits: 18 },
  { term: "2025-2", classes: "미적분학 II · 일반물리학 II", credits: 20 },
  { term: "2026-1", classes: "선형대수학 · 자료구조", credits: 19 },
] as const;

function CreditTable({ head, hoverable = false, divided = false }: { head?: TableHead; hoverable?: boolean; divided?: boolean }) {
  return (
    <Table aria-label="학기별 학점" head={head}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>학기</Table.HeadCell>
          <Table.HeadCell>과목</Table.HeadCell>
          <Table.HeadCell numeric divided={divided}>
            학점
          </Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {CREDIT_ROWS.map((r) => (
          <Table.Row key={r.term} hoverable={hoverable}>
            <Table.Cell header>{r.term}</Table.Cell>
            <Table.Cell>{r.classes}</Table.Cell>
            <Table.Cell numeric divided={divided}>
              {r.credits}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

const table: Spec = {
  name: "Table",
  summary:
    "데이터 표. 2px 검정 틀 안의 native <table> 이고, 폭이 모자라면 표만 가로로 스크롤합니다. 머리 줄은 head 로 검정(inverse)이나 well 로 칠합니다. 요일 × 교시 시간표는 TimetableGrid, 읽는 값의 표는 이것입니다. 조각은 Table.Head · Body · Row · HeadCell · Cell 입니다.",
  controls: {
    head: { kind: "select", options: TABLE_HEADS },
  },
  defaults: { head: "inverse" },
  render: (v) => (
    <Frame width={480}>
      <CreditTable head={v.head as TableHead} />
    </Frame>
  ),
  code: (v) =>
    jsx("Table", ['aria-label="학기별 학점"', ...printed(table, v)], [
      jsx("Table.Head", [], ["<Table.Row>…</Table.Row>"]),
      jsx("Table.Body", [], ["<Table.Row>…</Table.Row>"]),
    ]),
  sections: [
    {
      title: "머리 · 행 머리 · 숫자 칸",
      note: "HeadCell 은 scope=col, Cell 에 header 를 주면 scope=row 인 행 머리가 됩니다. numeric 은 오른쪽 정렬에 같은 폭의 숫자이고, 숫자 열은 머리 칸에도 같이 줍니다. divided 는 열 묶음의 왼쪽 선입니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={480}>
            <CreditTable divided />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "head=\"well\" · hoverable 행",
      note: "well 머리는 검정 대신 한 단 내려앉은 면이라 카드 안에서 조용합니다. Row 에 hoverable 을 주면 마우스를 올린 줄이 한 단 어두워져, 줄 전체를 누르거나 훑어 읽는 표에 맞습니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={480}>
            <CreditTable head="well" hoverable />
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── Notice ──────────────────────────────────────────────────────────

const notice: Spec = {
  name: "Notice",
  summary:
    "눈에 띄는 안내 상자. 기본은 plain(연한 면 · 진한 테두리 · 진한 글자)이고 기본 accent 는 error 입니다. 안내는 sky, 됐다는 알림은 success 를 씁니다. variant=solid 는 꽉 찬 색 띠입니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OPTIONS },
    variant: { kind: "select", options: NOTICE_VARIANTS },
    shadow: { kind: "boolean" },
    wrap: { kind: "boolean" },
    icon: { kind: "icon" },
    title: { kind: "text" },
    role: { kind: "select", options: NOTICE_ROLES },
    children: { kind: "text" },
  },
  initial: { accent: "sky", icon: "RefreshCw", title: "학기 데이터", children: "2026-2 학기 데이터가 갱신되었습니다." },
  defaults: { accent: "error", variant: "plain", shadow: false, wrap: false, icon: "none", role: "status" },
  render: (v) => (
    <Frame width={420}>
      <Notice
        accent={v.accent as Accent}
        variant={v.variant as NoticeVariant}
        shadow={Boolean(v.shadow)}
        wrap={Boolean(v.wrap)}
        icon={icon(v.icon)}
        title={txt(v.title)}
        role={v.role as "status" | "alert"}
      >
        {String(v.children ?? "")}
      </Notice>
    </Frame>
  ),
  code: (v) =>
    jsx("Notice", printed(notice, { accent: v.accent, variant: v.variant, shadow: v.shadow, wrap: v.wrap, icon: v.icon, title: v.title, role: v.role }), [String(v.children ?? "")]),
  sections: [
    {
      title: "variant=\"solid\" · shadow · wrap",
      note: "solid 는 꽉 찬 색 띠에 검정 테두리이고, shadow 는 4px 그림자로 화면의 주인공 알림을 띄웁니다. wrap 은 좁은 폭에서 action 이 글 아래로 내려가게 해서, 버튼이 여럿인 배너의 글이 짜부라지지 않습니다. 오른쪽 틀을 좁게 잡아 두었습니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={420}>
            <Notice accent="yellow" variant="solid" shadow icon={TriangleAlert} title="수강 변경 마감 임박">
              오늘 18시까지 신청할 수 있습니다.
            </Notice>
          </Frame>
          <Frame width={240}>
            <Notice
              accent="sky"
              variant="solid"
              wrap
              icon={Info}
              title="새 학기"
              action={
                <Button size="xs" variant="paper">
                  확인
                </Button>
              }
            >
              2026-2 학기 일정이 반영되었습니다.
            </Notice>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "Accent 별 쓰임",
      note: "곧바로 읽혀야 하는 오류는 role=\"alert\" 로 줍니다. action 의 버튼은 accent 를 따로 주지 않아도 상자의 색을 따릅니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={480}>
            <Stack gap="lg">
              <Notice
                accent="error"
                role="alert"
                icon={TriangleAlert}
                title="불러오지 못했습니다"
                action={
                  <Button size="xs" variant="outline" icon={RefreshCw}>
                    다시 시도
                  </Button>
                }
              >
                서버에 연결할 수 없습니다.
              </Notice>
              <Notice accent="sky" icon={Info} title="안내">
                학사일정이 새로 반영되었습니다.
              </Notice>
              <Notice accent="success" icon={CircleCheck} title="저장했습니다">
                개인 일정이 달력에 추가되었습니다.
              </Notice>
              <Notice accent="orange" icon={TriangleAlert} title="마감 임박">
                수강 변경 기간이 내일 끝납니다.
              </Notice>
            </Stack>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── Busy ────────────────────────────────────────────────────────────

function BusyDemo({ active, label }: { active: boolean; label?: string }) {
  return (
    <Busy active={active} label={label}>
      <Card padding="xl">
        <TodayRows />
      </Card>
    </Busy>
  );
}

const busy: Spec = {
  name: "Busy",
  summary:
    "영역을 덮는 불러오는 중. 내용을 지우지 않고 흐리게 두어 자리가 튀지 않고, 그동안 아래 내용은 눌리지 않습니다. 스피너와 글자가 가운데에 놓이고, 영역에 aria-busy 가 붙습니다.",
  controls: {
    active: { kind: "boolean" },
    label: { kind: "text" },
  },
  initial: { active: true },
  defaults: { active: false, label: "불러오는 중" },
  render: (v) => (
    <Frame width={360}>
      <BusyDemo active={Boolean(v.active)} label={txt(v.label)} />
    </Frame>
  ),
  code: (v) => jsx("Busy", printed(busy, v), [jsx("Card", ['padding="xl"'], ["<TodayRows />"])]),
  sections: [
    {
      title: "켠 것과 끈 것",
      note: "active 가 꺼지면 덮개가 사라지고 내용이 그대로 돌아옵니다. 영역의 높이는 변하지 않습니다. label 은 스피너 아래 글자이고 문자열이면 스크린 리더 이름으로도 쓰입니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={300}>
            <Labeled name="active=false">
              <BusyDemo active={false} />
            </Labeled>
          </Frame>
          <Frame width={300}>
            <Labeled name="active">
              <BusyDemo active label="시간표를 가져오는 중" />
            </Labeled>
          </Frame>
        </Stage>
      ),
    },
  ],
};

// ── EmptyState ──────────────────────────────────────────────────────

const emptyState: Spec = {
  name: "EmptyState",
  summary: "비어 있는 자리. 카드가 비었을 때 검은 줄 하나만 남기지 말고 한 줄로 이유를 적습니다. 할 수 있는 일은 action 에 버튼으로 둡니다.",
  controls: {
    icon: { kind: "icon" },
    title: { kind: "text" },
    framed: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { icon: "CalendarDays", title: "오늘은 정해진 일정이 없습니다", framed: true, children: "달력에서 개인 일정을 추가할 수 있습니다." },
  defaults: { icon: "none", framed: false },
  render: (v) => (
    <Frame width={420} top>
      <EmptyState icon={icon(v.icon)} title={txt(v.title)} framed={Boolean(v.framed)}>
        {txt(v.children)}
      </EmptyState>
    </Frame>
  ),
  code: (v) => jsx("EmptyState", printed(emptyState, { icon: v.icon, title: v.title, framed: v.framed }), txt(v.children) ? [String(v.children)] : undefined),
  sections: [
    {
      title: "framed",
      note: "framed 는 점선 테두리로 자리를 그립니다. 카드나 목록 칸 안에서는 framed 없이 씁니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={280}>
            <EmptyState icon={CalendarDays} title="일정이 없습니다" />
          </Frame>
          <Frame width={280}>
            <EmptyState icon={CalendarDays} title="일정이 없습니다" framed />
          </Frame>
        </Stage>
      ),
    },
    {
      title: "action",
      note: "할 수 있는 일을 버튼 하나로 둡니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={360}>
            <EmptyState
              icon={CalendarDays}
              title="개인 일정이 없습니다"
              framed
              action={
                <Button size="sm" variant="outline" shadow icon={Plus}>
                  일정 추가
                </Button>
              }
            >
              달력에서 날짜를 눌러 추가합니다.
            </EmptyState>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "Card 안에서",
      render: () => (
        <Stage>
          <Frame width={360}>
            <Card padding="0">
              <Card.Header title="Today" icon={CalendarDays} />
              <Card.Section divided padding="0">
                <EmptyState title="오늘은 정해진 일정이 없습니다" />
              </Card.Section>
            </Card>
          </Frame>
        </Stage>
      ),
    },
  ],
};

export const MOLECULE_SPECS: Record<string, Spec> = {
  Card: card,
  SectionTitle: sectionTitle,
  PageHeader: pageHeader,
  Accordion: accordion,
  SegmentedControl: segmentedControl,
  Tabs: tabs,
  Menu: menu,
  Modal: modal,
  Drawer: drawer,
  Tooltip: tooltip,
  Popover: popover,
  SearchField: searchField,
  FormField: formField,
  FileDrop: fileDrop,
  Stat: stat,
  Meter: meter,
  Table: table,
  Notice: notice,
  Busy: busy,
  EmptyState: emptyState,
};
