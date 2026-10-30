/** Primitives — 배치 · 칠(Surface · Paint · Glass) · 글자 · 아이콘 · 누름 · 골라짐 · 띄우기 · 접근성. 바탕이라 표본은 구조를 보여 줍니다 */
import { useId, useRef, useState, type AriaRole, type MouseEvent, type ReactNode } from "react";
import {
  Badge,
  Box,
  Button,
  Floating,
  Glass,
  Grid,
  Icon,
  Inline,
  Input,
  Label,
  Menu,
  Modal,
  Paint,
  Portal,
  Pressable,
  Selectable,
  Stack,
  Surface,
  Switch,
  Text,
  VisuallyHidden,
  glassClass,
  paintClass,
  surfaceClass,
  useSelectableGroup,
  type Accent,
  type Border,
  type Shadow,
  type Space,
  type SurfaceFill,
  type TextVariant,
  type Variant,
  type Tone,
  type Weight,
} from "@studio-baeks/funky-ui";
import {
  ACCENTS,
  ACCENT_ROLES,
  ALIGNS,
  BORDERS,
  ENTER_MOTIONS,
  FAMILIES,
  ICON,
  ICON_SIZES,
  ICON_STROKE,
  JUSTIFIES,
  MOTIONS,
  SHADOWS,
  SPACES,
  SURFACE_FILLS,
  TEXT_VARIANTS,
  TONES,
  VARIANTS,
  WEIGHTS,
  Z,
  type Align,
  type EnterMotion,
  type Family,
  type IconSize,
  type Justify,
  type PressMotion,
} from "@studio-baeks/funky-ui/tokens";
import { Search, Sparkles } from "lucide-react";

import { AccentVariantMatrix, Stage } from "../../kit";
import { icon } from "../icons";
import type { Spec } from "../schema";

const ACCENT_OPTIONS = [...ACCENTS, ...Object.keys(ACCENT_ROLES)] as const;
// Text 의 align 은 자기 prop 타입(start | center | end)을 씁니다
const TEXT_ALIGNS = ["start", "center", "end"] as const;
type TextAlign = (typeof TEXT_ALIGNS)[number];

/** 기본값이 없는 축의 "안 줌" 칸 — 고르면 prop 을 주지 않고, 코드에서도 빠집니다 */
const withNone = (options: readonly string[]) => ["none", ...options] as const;
const given = <T extends string>(value: unknown) => (typeof value === "string" && value !== "none" && value !== "" ? (value as T) : undefined);

/** 링크 표본이 판 밖으로 나가지 않게 */
const stay = (e: MouseEvent) => e.preventDefault();

/** 폭이 있어야 읽히는 표본(정렬 · 줄임)의 틀 — 판 폭을 따라가되 최대 폭만 잡습니다 */
function Frame({ width, children }: { width: number; children: ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: width }}>{children}</div>;
}

function Labeled({ name, children }: { name: string; children: ReactNode }) {
  return (
    <Stack gap="xs">
      <Text variant="micro" tone="muted">
        {name}
      </Text>
      {children}
    </Stack>
  );
}

/** 배치 표본의 자식 — 글자 크기를 달리하면 높이가 달라져서 align 이 보입니다 */
function Tile({ variant = "label", children }: { variant?: TextVariant; children: ReactNode }) {
  return (
    <Surface border="line" paddingX="md" paddingY="2xs">
      <Text as="div" variant={variant}>
        {children}
      </Text>
    </Surface>
  );
}

const STACK_ITEMS = ["수학", "미적분학 II", "공강"] as const;
const INLINE_ITEMS: [TextVariant, string][] = [
  ["heading", "3교시"],
  ["caption", "공강"],
  ["body", "급식"],
  ["micro", "Trade"],
  ["subheading", "달력"],
];
const GRID_ITEMS: [TextVariant, string][] = [
  ["heading", "수학"],
  ["label", "물리"],
  ["body", "공강"],
  ["label", "한국사"],
  ["subheading", "체육"],
  ["label", "자습"],
];
const NUMBERS = ["1", "2", "3", "4", "5", "6"] as const;
/** Surface hoverable 표본의 목록 줄 — 검색 추천 줄 모양 */
const HOVER_ROWS = ["미적분학 II", "일반물리학 I", "세계사의이해"] as const;
const TIMES = ["08:50", "11:11", "18:05"] as const;

/* ── Box ─────────────────────────────────────────────────────────────── */

/** Box 는 칠하지 않아 보이지 않습니다 — 점선으로 자리만 그립니다 */
const EXTENT = { outline: "2px dashed rgba(0, 0, 0, 0.25)", outlineOffset: 2 } as const;

/** Box 가 그릴 수 있는 태그 몇 개 — 화면은 같고, 코드의 태그만 바뀝니다 */
const BOX_TAGS = ["div", "section", "article"] as const;

const box: Spec = {
  name: "Box",
  summary:
    "요소 — 1차 primitive. 태그(as) · ref · 여백만 다루고, 칠하지 않으며 색도 모릅니다. 2차 primitive 는 모두 Box 위에 능력 하나를 얹습니다: 칠(Surface · Paint · Glass) · 누름(Pressable) · 골라짐(Selectable) · 띄우기(Floating) · 배치(Stack · Inline · Grid). 점선은 Box 의 자리를 보이려고 그린 것입니다.",
  controls: {
    as: { kind: "select", options: BOX_TAGS },
    padding: { kind: "select", options: SPACES },
    paddingX: { kind: "select", options: withNone(SPACES) },
    paddingY: { kind: "select", options: withNone(SPACES) },
    children: { kind: "text" },
  },
  initial: { padding: "xl", children: "오늘 수업" },
  defaults: { as: "div", padding: "0", paddingX: "none", paddingY: "none" },
  render: (v) => (
    <Box
      as={v.as as (typeof BOX_TAGS)[number]}
      padding={v.padding as Space}
      paddingX={given<Space>(v.paddingX)}
      paddingY={given<Space>(v.paddingY)}
      style={EXTENT}
    >
      <Text>{String(v.children ?? "")}</Text>
    </Box>
  ),
  sections: [
    {
      title: "padding · paddingX · paddingY",
      note: "여백은 간격 사다리에서 고릅니다. paddingX · paddingY 는 한 방향만 덮어써서, padding 을 준 뒤 한쪽만 바꿀 수 있습니다.",
      render: () => (
        <Stage bg="raised">
          <Labeled name={`padding="xl"`}>
            <Box padding="xl" style={EXTENT}>
              <Text variant="label">오늘 수업</Text>
            </Box>
          </Labeled>
          <Labeled name={`padding="xl" paddingX="4xl"`}>
            <Box padding="xl" paddingX="4xl" style={EXTENT}>
              <Text variant="label">오늘 수업</Text>
            </Box>
          </Labeled>
          <Labeled name={`paddingY="2xs" paddingX="md"`}>
            <Box paddingY="2xs" paddingX="md" style={EXTENT}>
              <Text variant="label">오늘 수업</Text>
            </Box>
          </Labeled>
        </Stage>
      ),
    },
    {
      title: "2차 primitive 는 Box 위에 섭니다",
      note: "다섯 모두 padding=\"lg\" 입니다. 2차 primitive 는 Box 의 prop(태그 · 여백)을 그대로 받고 능력 하나를 더합니다. Box 에는 accent 가 없습니다 — primitive 중에서는 Paint 만 색을 갖고, 안쪽 요소는 가장 가까운 Paint 의 색을 따릅니다.",
      render: () => (
        <Stage bg="raised">
          <Labeled name="Box">
            <Box padding="lg" style={EXTENT}>
              <Text variant="label">여백만</Text>
            </Box>
          </Labeled>
          <Labeled name="Surface">
            <Surface border="line" padding="lg">
              <Text variant="label">+ 흑백 면</Text>
            </Surface>
          </Labeled>
          <Labeled name="Paint">
            <Paint accent="green" variant="plain" padding="lg">
              <Text variant="label">+ 색</Text>
            </Paint>
          </Labeled>
          <Labeled name="Pressable">
            <Pressable motion="sink" padding="lg" className={surfaceClass({ border: "line" })}>
              <Text variant="label">+ 누름</Text>
            </Pressable>
          </Labeled>
          <Labeled name="Inline">
            <Inline gap="sm" padding="lg" style={EXTENT}>
              <Text variant="label">+</Text>
              <Text variant="label">배치</Text>
            </Inline>
          </Labeled>
        </Stage>
      ),
    },
  ],
};

/* ── Surface · Paint ─────────────────────────────────────────────────── */

const surface: Spec = {
  name: "Surface",
  summary:
    "박스의 면 — 면(fill: 흑백 다섯과 뼈대의 보라 brand) · 테두리 · 그림자, 그리고 hoverable 이면 hover · 누르는 중의 흑백 상태 층. 카드 · 패널 · 모달 · 판 · 바처럼 무언가를 담는 박스와, 그 면 위의 목록 줄(fill=\"none\")을 칠합니다. accent 로 칠하지 않습니다 — 색이 있는 요소는 Paint 입니다.",
  controls: {
    fill: { kind: "select", options: SURFACE_FILLS },
    border: { kind: "select", options: BORDERS },
    shadow: { kind: "select", options: SHADOWS },
    hoverable: { kind: "boolean" },
    padding: { kind: "select", options: SPACES },
    children: { kind: "text" },
  },
  initial: { border: "line", shadow: "raised", padding: "xl", children: "오늘 수업" },
  defaults: { fill: "raised", border: "none", shadow: "none", hoverable: false, padding: "0" },
  render: (v) => (
    <Surface
      fill={v.fill as SurfaceFill}
      border={v.border as Border}
      shadow={v.shadow as Shadow}
      hoverable={Boolean(v.hoverable)}
      padding={v.padding as Space}
    >
      {String(v.children ?? "")}
    </Surface>
  ),
  sections: [
    {
      title: "Fill — 흑백 면 다섯 · 뼈대의 보라 · 면 없음",
      note: "회색이 아니라 자리의 이름입니다. inverse 는 글자색도 같이 바꿔서 검정 위에 검정 글자가 생기지 않습니다. well 은 반투명이라 어느 면 위에서도 한 단 내려앉습니다. brand 는 상단 바 · 하단 바의 보라로, inverse 처럼 글자를 흰색으로 바꿉니다 — 색을 고르는 요소가 아니라 앱의 뼈대라서 accent 가 아니라 자리 이름입니다. none 은 면 없이 바깥 면을 그대로 보입니다 — 목록 줄처럼 면 위의 한 칸에 씁니다.",
      render: () => (
        <Stage>
          {SURFACE_FILLS.map((f) => (
            <Surface key={f} fill={f} border="line" padding="lg">
              {f}
            </Surface>
          ))}
        </Stage>
      ),
    },
    {
      title: "hoverable — 흑백 상태 층",
      note: "hover 때 글자색 7% 층, 누르는 동안 12% 층을 면 위에 덮습니다. 면 · 글자 · 테두리는 그대로입니다. 층을 글자색에서 만들어서 흰 면 위의 줄은 회색, 검정 면 위의 줄은 흰 층이 됩니다. 목록 줄은 fill=\"none\" 이라 바깥 면이 그대로 보입니다. 색 요소의 hover 는 Paint 의 hoverable 이고, 누르는 물건(커서 · 몸짓)은 Pressable 입니다.",
      render: () => (
        <Stage>
          {(["raised", "inverse"] as const).map((f) => (
            <Surface key={f} fill={f} border="line" style={{ width: 220 }}>
              {HOVER_ROWS.map((row) => (
                <Surface key={row} fill="none" hoverable paddingX="xl" paddingY="md">
                  <Text variant="label">{row}</Text>
                </Surface>
              ))}
            </Surface>
          ))}
          <Surface border="line" shadow="raised" hoverable padding="xl">
            <Text variant="label">면 전체 · hoverable</Text>
          </Surface>
        </Stage>
      ),
    },
    {
      title: "Border · Shadow",
      note: "테두리는 2px 한 굵기라 흑백 선의 색만 고릅니다. 그림자는 떠 있는 물건(raised, 4px)과 모달(floating, 6px) 두 단뿐입니다.",
      render: () => (
        <>
          <Stage>
            {BORDERS.map((b) => (
              <Surface key={b} border={b} padding="lg">
                {b}
              </Surface>
            ))}
          </Stage>
          <Stage>
            {SHADOWS.map((sh) => (
              <Surface key={sh} border="line" shadow={sh} padding="lg">
                {sh}
              </Surface>
            ))}
          </Stage>
        </>
      ),
    },
    {
      title: "다른 primitive 와 묶기",
      note: "칠한 판 위에 늘어놓으려면 Surface 안에 Stack 을 넣습니다. 누르는 카드는 surfaceClass() 로 Pressable 에 면만 빌려 줍니다 — Card motion 이 그렇게 조립됩니다.",
      render: () => (
        <Stage>
          <Surface border="line" shadow="raised" padding="xl" style={{ width: 240 }}>
            <Stack gap="md">
              <Text variant="subheading">오늘 수업</Text>
              <Text variant="caption" tone="muted">
                3교시 · 물리학 실험
              </Text>
            </Stack>
          </Surface>
          <Frame width={240}>
            <Pressable motion="lift" className={surfaceClass({ border: "line" })} padding="xl">
              <Stack as="span" gap="xs">
                <Text variant="subheading">Pressable + surfaceClass</Text>
                <Text variant="caption" tone="muted">
                  면은 Surface, 누름은 Pressable
                </Text>
              </Stack>
            </Pressable>
          </Frame>
        </Stage>
      ),
    },
  ],
};

const paint: Spec = {
  name: "Paint",
  summary:
    "요소의 칠 — 색의 모든 상태를 맡습니다. accent(색) × variant(칠하는 방식)가 쉬는 색을, selected 가 골라진 색을, hoverable 이 hover · 누르는 중의 색을 정합니다. hoverable 은 Pressable 없이 혼자 동작합니다 — 누르는 물건으로 만드는 것(의미 · 커서 · 몸짓)은 Pressable 이고, Pressable 은 색을 하나도 갖지 않습니다. primitive 중 accent 를 갖는 것은 Paint 하나라 안쪽 요소는 가장 가까운 Paint 의 색을 따릅니다. Badge · Notice · 바가 이 위에 서고, Button 은 Pressable 에 이 칠을 얹은 것입니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OPTIONS },
    variant: { kind: "select", options: VARIANTS },
    selected: { kind: "boolean" },
    hoverable: { kind: "boolean" },
    padding: { kind: "select", options: SPACES },
    children: { kind: "text" },
  },
  initial: { accent: "green", variant: "plain", hoverable: true, padding: "lg", children: "세계사의이해 · 3분반" },
  defaults: { accent: "black", variant: "outline", selected: false, hoverable: false, padding: "0" },
  // hoverable 이어도 Paint 하나입니다 — hover 색은 Pressable 없이 켜지고, 커서는 화살표 그대로입니다
  render: (v) => (
    <Paint
      accent={v.accent as Accent}
      variant={v.variant as Variant}
      selected={Boolean(v.selected)}
      hoverable={Boolean(v.hoverable)}
      padding={v.padding as Space}
    >
      <Text variant="label">{String(v.children ?? "")}</Text>
    </Paint>
  ),
  code: (v) => {
    const attrs = [
      v.accent !== "black" ? `accent="${String(v.accent)}"` : "",
      v.variant !== "outline" ? `variant="${String(v.variant)}"` : "",
      v.selected ? "selected" : "",
      v.hoverable ? "hoverable" : "",
      v.padding !== "0" ? `padding="${String(v.padding)}"` : "",
    ].filter(Boolean);
    return `<Paint${attrs.length ? ` ${attrs.join(" ")}` : ""}>\n  ${String(v.children ?? "")}\n</Paint>`;
  },
  sections: [
    {
      title: "Accent × Variant",
      note: "행 머리의 네 칸은 FG / BG / Border / Hover 입니다(재원님 스케치의 표기). Button · Badge 의 행렬과 같은 레시피입니다 — 그쪽은 이 칠에 크기 · 아이콘을 얹은 것입니다. 칸은 hoverable 이라 마우스를 올리면 Hover 칸대로 바뀝니다 — Pressable 없이 Paint 혼자입니다.",
      render: () => (
        <AccentVariantMatrix
          cell={(accent, variant) => (
            <Paint accent={accent} variant={variant} hoverable paddingX="md" paddingY="xs">
              <Text variant="label">{accent}</Text>
            </Paint>
          )}
        />
      ),
    },
    {
      title: "Accent 는 안쪽으로 흐릅니다",
      note: "primitive 중 accent 를 갖는 것은 Paint 뿐입니다. 안쪽 버튼 · 배지 · 스위치 · tone=accent 글자가 accent 를 따로 주지 않으면 가장 가까운 Paint 의 색을 씁니다 — Trade 에서 드랍한 과목 줄 안의 버튼이 줄의 색을 따르는 식입니다. Box · Stack · Card 는 색을 모르므로 이 흐름을 끊지도 바꾸지도 않습니다.",
      render: () => (
        <Stage bg="raised">
          {(["pink", "green", "orange", "purple"] as const).map((a) => (
            <Paint key={a} accent={a} variant="plain" padding="xl">
              <Stack gap="md" align="start">
                <Text variant="overline" tone="accent">
                  {a}
                </Text>
                <Inline gap="md">
                  <Button size="sm" variant="solid">
                    유지
                  </Button>
                  <Badge variant="filled">계획</Badge>
                  <Switch defaultChecked aria-label="알림" />
                </Inline>
              </Stack>
            </Paint>
          ))}
        </Stage>
      ),
    },
    {
      title: "색 · 누름 · 골라짐은 따로 섭니다",
      note: "Paint 는 색, Pressable 은 누름, Selectable 은 골라짐이고 서로를 켜지 않습니다. hoverable 은 Pressable 없이 hover 색을 내고(둘째 — 커서는 화살표 그대로), Pressable 은 칠 없이 가라앉습니다(셋째). Button 은 셋을 묶은 것이고(넷째), 골라지면 Paint 의 selected(색)와 Selectable 의 grow(커지기)를 같이 줍니다(다섯째) — grow 가 함께 쓰는 Pressable 의 몸짓을 덮어서 motion 은 쉴 때의 것 그대로 둡니다.",
      render: () => (
        <Stage bg="raised">
          <Paint accent="cyan" variant="muted" padding="md">
            <Text variant="label">쉼</Text>
          </Paint>
          <Paint accent="cyan" variant="muted" hoverable padding="md">
            <Text variant="label">색만 · hoverable</Text>
          </Paint>
          <Pressable motion="sink" padding="md" className={surfaceClass({ border: "line" })}>
            <Text variant="label">누름만 · Pressable</Text>
          </Pressable>
          <Pressable motion="sink" padding="md" className={paintClass({ accent: "cyan", variant: "solid", hoverable: true })}>
            <Text variant="label">둘 다 · Button</Text>
          </Pressable>
          <Selectable
            as={Pressable}
            defaultSelected
            grow
            padding="md"
            className={({ selected }) => paintClass({ accent: "cyan", variant: "muted", selected, hoverable: true })}
          >
            <Text variant="label" tone="inherit">
              selected · grow
            </Text>
          </Selectable>
        </Stage>
      ),
    },
    {
      title: "버튼이 아닌 요소를 칠하기",
      note: "같은 레시피로 버튼 아닌 요소도 칠합니다 — Trade 의 과목 줄(plain), 시간표의 지금(plain pink), 모달 머리 막대(filled). 위 층 컴포넌트는 Paint 의 칠을 쓰면서 테두리 같은 형태만 자기 CSS 로 덮습니다. 상단 바 · 하단 바는 고르는 색이 아니라 뼈대라 Paint 가 아니라 Surface 의 brand 입니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="md" style={{ width: 300 }}>
            <Paint accent="pink" variant="plain" padding="lg">
              <Stack gap="2xs">
                <Text variant="caption" weight="black" tone="inherit">
                  일반물리학 · 드랍
                </Text>
                <Text variant="micro" tone="inherit">
                  2분반 · 김예시T · 월 3-4교시
                </Text>
              </Stack>
            </Paint>
            <Paint accent="green" variant="solidMuted" padding="lg">
              <Text variant="caption" weight="black">
                세계사의이해 · 유지
              </Text>
            </Paint>
            <Paint accent="purple" variant="filled" padding="lg">
              <Text variant="caption" weight="black" tone="inherit">
                ADD EVENT — 모달 머리 막대의 칠
              </Text>
            </Paint>
          </Stack>
        </Stage>
      ),
    },
  ],
};

/* ── Glass ───────────────────────────────────────────────────────────── */

/** 유리가 놓일 바 — accent filled 바. 유리는 흰색이고, 글자는 바의 ink 를 물려받습니다 */
const GLASS_BARS = ["purple", "black", "pink", "cyan", "yellow", "green"] as const;

function GlassBar({ accent, children }: { accent: Accent; children: ReactNode }) {
  return (
    <Paint accent={accent} variant="filled" padding="md">
      <Inline gap="sm">{children}</Inline>
    </Paint>
  );
}

const glass: Spec = {
  name: "Glass",
  summary:
    "바 위의 유리 — 색 바(상단 · 하단 바) 위에 놓이는 반투명 흰 면입니다. 어느 바 위에서도 흰 유리이고(흰색 10% 면 · 30% 테두리), 글자는 바의 글자색을 물려받으며, accent 를 받지 않습니다. hoverable 이면 hover 때 유리가 짙어지고 테두리가 흰색이 되며, selected 는 더 짙은 유리입니다. NavButton 이 Pressable(tap) 위에 이 유리를 얹은 것입니다.",
  controls: {
    bar: { kind: "select", options: GLASS_BARS },
    selected: { kind: "boolean" },
    hoverable: { kind: "boolean" },
    padding: { kind: "select", options: SPACES },
    children: { kind: "text" },
  },
  initial: { hoverable: true, padding: "md", children: "2026-2" },
  defaults: { bar: "purple", selected: false, hoverable: false, padding: "0" },
  render: (v) => (
    <GlassBar accent={v.bar as Accent}>
      <Glass selected={Boolean(v.selected)} hoverable={Boolean(v.hoverable)} padding={v.padding as Space}>
        <Text variant="label">{String(v.children ?? "")}</Text>
      </Glass>
    </GlassBar>
  ),
  code: (v) => {
    const attrs = [v.selected ? "selected" : "", v.hoverable ? "hoverable" : "", v.padding !== "0" ? `padding="${String(v.padding)}"` : ""].filter(Boolean);
    return `<Paint accent="${String(v.bar)}" variant="filled" padding="md">\n  <Glass${attrs.length ? ` ${attrs.join(" ")}` : ""}>${String(v.children ?? "")}</Glass>\n</Paint>`;
  },
  sections: [
    {
      title: "어느 바 위에서도 흰 유리",
      note: "Glass 는 accent 를 받지 않고, 어느 바 위에서도 흰 유리입니다. 글자는 바의 글자색(accent 의 ink)을 물려받아 보라 · 검정 바 위에서는 흰 글자, 분홍 · 시안 · 노랑 · 초록 바 위에서는 검정 글자가 됩니다. 흰 유리라 흰 면 · 크림 위에서는 보이지 않습니다 — 그 자리는 Paint 입니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="md">
            {GLASS_BARS.map((a) => (
              <GlassBar key={a} accent={a}>
                <Glass hoverable paddingX="md" paddingY="xs">
                  <Text variant="label">{a}</Text>
                </Glass>
                <Glass hoverable selected paddingX="md" paddingY="xs">
                  <Text variant="label">selected</Text>
                </Glass>
              </GlassBar>
            ))}
          </Stack>
        </Stage>
      ),
    },
    {
      title: "색과 누름 — NavButton 의 조립",
      note: "Glass 도 칠이라 hover 색은 hoverable 이 혼자 냅니다(둘째 — 커서는 화살표 그대로). 누르는 물건으로 만드는 것은 Pressable 이고, NavButton 이 Pressable(tap) 위에 glassClass() 를 얹은 것입니다(셋째).",
      render: () => (
        <Stage bg="raised">
          <GlassBar accent="purple">
            <Glass paddingX="md" paddingY="xs">
              <Text variant="label">쉼</Text>
            </Glass>
            <Glass hoverable paddingX="md" paddingY="xs">
              <Text variant="label">색만 · hoverable</Text>
            </Glass>
            <Pressable motion="tap" paddingX="md" paddingY="xs" className={glassClass({ hoverable: true })}>
              <Text variant="label">둘 다 · NavButton</Text>
            </Pressable>
          </GlassBar>
        </Stage>
      ),
    },
  ],
};

/* ── Stack · Inline · Grid ───────────────────────────────────────────── */

const stack: Spec = {
  name: "Stack",
  summary: "자식을 세로로 쌓습니다. 간격(gap)과 가로 정렬(align)을 고르고, Box 의 prop(태그 · 여백)을 받습니다. 칠은 하지 않아 표본은 sunken 판 위에 놓았습니다.",
  controls: {
    gap: { kind: "select", options: SPACES },
    align: { kind: "select", options: ALIGNS },
  },
  // children 은 코드 표기용입니다 (화면의 자식은 render 가 정합니다). 기본값은 "안 준 것과 같은 값"입니다
  initial: { gap: "xs", padding: "xs", children: "…" },
  defaults: { gap: "0", align: "stretch", padding: "0" },
  render: (v) => (
    <Frame width={220}>
      <Surface fill="sunken">
        <Stack gap={v.gap as Space} align={v.align as Align} padding={v.padding as Space}>
          {STACK_ITEMS.map((t) => (
            <Tile key={t}>{t}</Tile>
          ))}
        </Stack>
      </Surface>
    </Frame>
  ),
  sections: [
    {
      title: "justify — 높이가 정해진 칸에서",
      note: "Stack 의 justify 는 세로 방향 분배라, 칸에 남는 높이가 있을 때만 보입니다. 아래는 높이를 150px 로 고정한 칸입니다.",
      render: () => (
        <Stage bg="raised">
          {JUSTIFIES.map((j) => (
            <Labeled key={j} name={`justify="${j}"`}>
              <Surface fill="sunken" style={{ height: 150, width: 112 }}>
                <Stack justify={j} gap="xs" padding="sm" style={{ height: "100%" }}>
                  <Tile>수학</Tile>
                  <Tile>공강</Tile>
                </Stack>
              </Surface>
            </Labeled>
          ))}
        </Stage>
      ),
    },
  ],
};

const inline: Spec = {
  name: "Inline",
  summary: "자식을 가로로 늘어놓습니다. 기본은 세로 가운데 정렬이고, 좁아지면 wrap 으로 다음 줄에 내립니다. Box 의 prop 도 그대로 받습니다.",
  controls: {
    gap: { kind: "select", options: SPACES },
    align: { kind: "select", options: ALIGNS },
    justify: { kind: "select", options: JUSTIFIES },
    wrap: { kind: "boolean" },
  },
  // children 은 코드 표기용입니다. 기본값은 "안 준 것과 같은 값"이고, align 의 기본은 CSS 가 정한 center 입니다
  initial: { gap: "md", wrap: true, children: "…" },
  defaults: { gap: "0", align: "center", justify: "start", wrap: false },
  render: (v) => (
    <Frame width={260}>
      <Inline gap={v.gap as Space} align={v.align as Align} justify={v.justify as Justify} wrap={Boolean(v.wrap)}>
        {INLINE_ITEMS.map(([variant, text]) => (
          <Tile key={text} variant={variant}>
            {text}
          </Tile>
        ))}
      </Inline>
    </Frame>
  ),
  sections: [
    {
      title: "align — 세로 정렬",
      note: "높이가 다른 자식 셋(heading · caption · body)을 놓았습니다. baseline 은 글자의 기준선을 맞추고, stretch 는 가장 큰 자식의 높이로 늘립니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="lg">
            {ALIGNS.map((a) => (
              <Labeled key={a} name={`align="${a}"`}>
                <Surface fill="sunken" style={{ width: 280 }}>
                  <Inline align={a} gap="md" padding="sm">
                    {INLINE_ITEMS.slice(0, 3).map(([variant, text]) => (
                      <Tile key={text} variant={variant}>
                        {text}
                      </Tile>
                    ))}
                  </Inline>
                </Surface>
              </Labeled>
            ))}
          </Stack>
        </Stage>
      ),
    },
    {
      title: "justify — 가로 분배",
      render: () => (
        <Stage bg="raised">
          <Stack gap="lg">
            {JUSTIFIES.map((j) => (
              <Labeled key={j} name={`justify="${j}"`}>
                <Surface fill="sunken" style={{ width: 280 }}>
                  <Inline justify={j} gap="md" padding="sm">
                    <Tile>수학</Tile>
                    <Tile>공강</Tile>
                  </Inline>
                </Surface>
              </Labeled>
            ))}
          </Stack>
        </Stage>
      ),
    },
  ],
};

const grid: Spec = {
  name: "Grid",
  summary:
    "격자입니다. columns 가 숫자면 같은 폭 n 칸이고, 문자열이면 grid-template-columns 값 그대로입니다. 칸 폭은 실행 중에 정해지는 값이라 inline style 로 넣습니다.",
  controls: {
    columns: { kind: "number", min: 1, max: 6, step: 1 },
    gap: { kind: "select", options: SPACES },
    align: { kind: "select", options: ALIGNS },
    justifyItems: { kind: "select", options: ALIGNS },
  },
  // 키 순서가 코드의 prop 순서입니다 — columns 를 맨 앞에 둡니다. children 은 코드 표기용입니다
  defaults: { columns: undefined, gap: "0", align: "stretch", justifyItems: "stretch" },
  initial: { columns: 3, gap: "sm", children: "…" },
  render: (v) => (
    <Frame width={300}>
      <Grid columns={Number(v.columns) || 1} gap={v.gap as Space} align={v.align as Align} justifyItems={v.justifyItems as Align}>
        {GRID_ITEMS.map(([variant, text]) => (
          <Tile key={text} variant={variant}>
            {text}
          </Tile>
        ))}
      </Grid>
    </Frame>
  ),
  sections: [
    {
      title: "columns — 숫자와 문자열",
      note: "숫자는 같은 폭 n 칸(minmax(0, 1fr))입니다. 문자열은 grid-template-columns 그대로 들어가서, 왼쪽만 고정 폭인 목록이나 폭을 따라 칸 수가 바뀌는 격자가 됩니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="xl" style={{ width: "100%", maxWidth: 420 }}>
            <Labeled name="columns={2}">
              <Grid columns={2} gap="sm">
                {NUMBERS.slice(0, 4).map((n) => (
                  <Tile key={n}>{n}</Tile>
                ))}
              </Grid>
            </Labeled>
            <Labeled name={`columns="64px minmax(0, 1fr)"`}>
              <Grid columns="64px minmax(0, 1fr)" gap="md" align="baseline">
                <Text variant="overline">이름</Text>
                <Text>김예시</Text>
                <Text variant="overline">학기</Text>
                <Text>2026-2</Text>
                <Text variant="overline">전공</Text>
                <Text>물리</Text>
              </Grid>
            </Labeled>
            <Labeled name={`columns="repeat(auto-fill, minmax(72px, 1fr))"`}>
              <Grid columns="repeat(auto-fill, minmax(72px, 1fr))" gap="sm">
                {NUMBERS.map((n) => (
                  <Tile key={n}>{n}</Tile>
                ))}
              </Grid>
            </Labeled>
          </Stack>
        </Stage>
      ),
    },
    {
      title: "gap · rowGap · columnGap",
      note: "gap 은 두 방향을 같이, rowGap · columnGap 은 방향마다 따로 줍니다. 모두 간격 사다리에서 고릅니다.",
      render: () => (
        <Stage bg="raised">
          <Labeled name={`gap="lg"`}>
            <Grid columns={3} gap="lg" style={{ width: 220 }}>
              {NUMBERS.map((n) => (
                <Tile key={n}>{n}</Tile>
              ))}
            </Grid>
          </Labeled>
          <Labeled name={`rowGap="2xs" columnGap="3xl"`}>
            <Grid columns={3} rowGap="2xs" columnGap="3xl" style={{ width: 220 }}>
              {NUMBERS.map((n) => (
                <Tile key={n}>{n}</Tile>
              ))}
            </Grid>
          </Labeled>
        </Stage>
      ),
    },
  ],
};

/* ── Text · Icon ─────────────────────────────────────────────────────── */

const text: Spec = {
  name: "Text",
  summary:
    "글자입니다. 태그(as)와 생김새(variant)는 따로 고릅니다. variant 하나가 크기 · 줄 높이 · 굵기 · 자간 · 대소문자를 한 번에 정하고, weight · tone 은 그 위에서 바꿀 때만 씁니다.",
  controls: {
    variant: { kind: "select", options: TEXT_VARIANTS },
    weight: { kind: "select", options: withNone(WEIGHTS) },
    tone: { kind: "select", options: withNone(TONES) },
    family: { kind: "select", options: FAMILIES },
    align: { kind: "select", options: TEXT_ALIGNS },
    truncate: { kind: "boolean" },
    numeric: { kind: "boolean" },
    children: { kind: "text" },
  },
  // weight · tone 의 "none" 은 역할이 정한 값을 그대로 쓴다는 뜻입니다 (overline 은 약한 잉크가 기본)
  initial: { variant: "heading", weight: "none", tone: "none", children: "오늘 수업 · Today's Classes 1234" },
  defaults: { variant: "body", family: "sans", align: "start", truncate: false, numeric: false },
  render: (v) => (
    <Frame width={320}>
      <Text
        variant={v.variant as TextVariant}
        weight={given<Weight>(v.weight)}
        tone={given<Tone>(v.tone)}
        family={v.family as Family}
        align={v.align as TextAlign}
        truncate={Boolean(v.truncate)}
        numeric={Boolean(v.numeric)}
      >
        {String(v.children ?? "")}
      </Text>
    </Frame>
  ),
  sections: [
    {
      title: "Variant — 열 가지 역할",
      note: "overline 과 subtitle 은 약한 잉크가 역할에 들어 있어서 tone 을 주지 않아도 흐립니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="lg" style={{ width: "100%" }}>
            {TEXT_VARIANTS.map((v) => (
              <Grid key={v} columns="96px minmax(0, 1fr)" gap="xl" align="baseline">
                <Text variant="micro" tone="muted">
                  {v}
                </Text>
                <Text variant={v} truncate>
                  오늘 수업 · Today's Classes 1234
                </Text>
              </Grid>
            ))}
          </Stack>
        </Stage>
      ),
    },
    {
      title: "Tone",
      note: "흑백 잉크 다섯, 가장 가까운 Paint 의 진한 글자 · 연한 글자(accent · accentSoft — 여기서는 purple ghost Paint 로 감쌌습니다), 부모 글자색을 따르는 inherit 입니다. faint 는 장식 전용이라 필수 정보에 쓰지 않습니다.",
      render: () => (
        <Stage bg="raised">
          <Paint accent="purple" variant="ghost">
            <Inline gap="xl" wrap>
              {TONES.map((t) => (
                <Surface key={t} fill={t === "inverse" ? "inverse" : "raised"} paddingX="md" paddingY="xs">
                  <Text variant="subheading" tone={t}>
                    {t}
                  </Text>
                </Surface>
              ))}
            </Inline>
          </Paint>
        </Stage>
      ),
    },
    {
      title: "Weight · Family · numeric",
      note: "weight 는 역할의 기본 굵기를 바꿀 때만 씁니다. numeric 은 숫자 글리프를 같은 폭으로 맞춰서, 시각 · 표에서 자릿수가 어긋나지 않게 합니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="xl">
            <Inline gap="xl" wrap>
              {WEIGHTS.map((w) => (
                <Text key={w} weight={w}>
                  {w} · 오늘 수업
                </Text>
              ))}
            </Inline>
            <Inline gap="xl" wrap>
              {FAMILIES.map((f) => (
                <Text key={f} family={f}>
                  {f} · 2026-2 1234
                </Text>
              ))}
            </Inline>
            <Inline gap="3xl" align="start">
              <Labeled name="기본">
                <Stack align="end">
                  {TIMES.map((t) => (
                    <Text key={t}>{t}</Text>
                  ))}
                </Stack>
              </Labeled>
              <Labeled name="numeric">
                <Stack align="end">
                  {TIMES.map((t) => (
                    <Text key={t} numeric>
                      {t}
                    </Text>
                  ))}
                </Stack>
              </Labeled>
            </Inline>
          </Stack>
        </Stage>
      ),
    },
    {
      title: "truncate",
      note: "줄임표는 블록에서만 듣습니다. 기본 태그(span)는 인라인이라 그냥 두면 줄어들지 않으니, as=div 처럼 블록으로 그리거나 flex · grid 안에 둡니다. Inline 안의 Text 는 옆 자식에게 자리를 내주며 줄어듭니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={260}>
            <Stack gap="xl">
              <Labeled name={`<Text as="div" truncate>`}>
                <Text as="div" truncate>
                  미적분학 II · 영어강의 · 김예시 선생님 · 월 3-4교시
                </Text>
              </Labeled>
              <Labeled name="Inline 안의 Text">
                <Inline gap="md">
                  <Text truncate>미적분학 II · 영어강의 · 김예시 선생님 · 월 3-4교시</Text>
                  <Badge variant="filled" accent="cyan">
                    4
                  </Badge>
                </Inline>
              </Labeled>
            </Stack>
          </Frame>
        </Stage>
      ),
    },
  ],
};

const iconSpec: Spec = {
  name: "Icon",
  summary: "아이콘 하나입니다. 크기와 선 굵기를 시스템 사다리에서 고릅니다. label 을 주면 이름이 있는 이미지로, 안 주면 장식으로 숨깁니다.",
  controls: {
    icon: { kind: "icon" },
    size: { kind: "select", options: ICON_SIZES },
    strokeWidth: { kind: "number", min: 1, max: 4, step: 0.5 },
    tone: { kind: "select", options: TONES },
    label: { kind: "text" },
  },
  // icon 을 맨 앞에 둬서 코드가 `icon={…} size="xl"` 순서로 찍힙니다. tone 의 기본 inherit 은 안 준 것과 같습니다
  defaults: { icon: undefined, size: "md", strokeWidth: ICON_STROKE, tone: "inherit" },
  initial: { icon: "GraduationCap", size: "xl" },
  render: (v) => {
    const glyph = icon(v.icon);
    if (!glyph) {
      return (
        <Text variant="caption" tone="muted">
          아이콘을 고르세요
        </Text>
      );
    }
    return (
      <Icon
        icon={glyph}
        size={v.size as IconSize}
        strokeWidth={Number(v.strokeWidth) || ICON_STROKE}
        tone={v.tone as Tone}
        label={v.label ? String(v.label) : undefined}
      />
    );
  },
  sections: [
    {
      title: "Sizes",
      note: "다섯 칸의 사다리입니다. 글자 줄 안에서는 줄 높이를 흔들지 않도록 블록으로 놓이고, 좁아져도 찌그러지지 않습니다.",
      render: () => (
        <Stage bg="raised">
          {ICON_SIZES.map((s) => (
            <Stack key={s} gap="sm" align="center">
              <Icon icon={Search} size={s} />
              <Text variant="micro" tone="muted">
                {s} · {ICON[s]}px
              </Text>
            </Stack>
          ))}
        </Stage>
      ),
    },
    {
      title: "Tone",
      note: "accent · accentSoft 는 가장 가까운 Paint 의 accent(여기서는 pink ghost Paint)의 진한 글자 · 연한 글자색을 따라갑니다. inverse 는 어두운 면 위에서 씁니다.",
      render: () => (
        <Stage bg="raised">
          <Paint accent="pink" variant="ghost">
            <Inline gap="xl" wrap>
              {TONES.map((t) => (
                <Stack key={t} gap="xs" align="center">
                  <Surface fill={t === "inverse" ? "inverse" : "raised"} border="line" padding="md">
                    <Icon icon={Sparkles} size="lg" tone={t} />
                  </Surface>
                  <Text variant="micro" tone="muted">
                    {t}
                  </Text>
                </Stack>
              ))}
            </Inline>
          </Paint>
        </Stage>
      ),
    },
  ],
};

/* ── Pressable ───────────────────────────────────────────────────────── */

const MOTION_NOTE: Record<PressMotion, string> = {
  none: "목록 줄 — 누르지만 움직이지 않습니다",
  sink: "사람 카드 — 그림자 자리로 가라앉습니다",
  raise: "평평한 칩 — hover 때 그림자가 올라옵니다",
  lift: "탐색 카드 — 위로 떠오릅니다",
  tap: "그림자를 끈 버튼 — 누르는 순간만 작아집니다",
};

const pressable: Spec = {
  name: "Pressable",
  summary:
    "누르는 물건 — 버튼의 의미(type · disabled) · 커서 · 꺼진 모양 · 몸짓을 맡습니다. 몸짓은 기본 none(움직이지 않음)이고, sink 는 4px 그림자 위에 떠 있다가 hover 때 가라앉고, raise 는 평평하다가 hover 때 그림자가 올라오고, lift 는 떠오르고, tap 은 그림자 없이 누르는 순간만 작아집니다. 색은 하나도 없습니다 — hover 색까지 Paint 의 hoverable 이고, Pressable 이 그걸 켜 주지 않습니다. 흑백 면은 surfaceClass(), 색은 paintClass() 로 얹습니다. 골라진 상태는 Pressable 이 아니라 Selectable 입니다 — Button 이 Pressable + Selectable + Paint 입니다.",
  controls: {
    motion: { kind: "select", options: MOTIONS },
    padding: { kind: "select", options: SPACES },
    disabled: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { motion: "sink", padding: "xl", children: "수강 변경 탐색" },
  defaults: { motion: "none", padding: "0", disabled: false },
  render: (v) => (
    <Frame width={240}>
      <Pressable
        motion={v.motion as PressMotion}
        padding={v.padding as Space}
        disabled={Boolean(v.disabled)}
        className={surfaceClass({ border: "line" })}
      >
        {String(v.children ?? "")}
      </Pressable>
    </Frame>
  ),
  code: (v) => {
    const attrs = [
      v.motion !== "none" ? `motion="${String(v.motion)}"` : "",
      v.padding !== "0" ? `padding="${String(v.padding)}"` : "",
      v.disabled ? "disabled" : "",
    ].filter(Boolean);
    return `<Pressable ${attrs.join(" ")}${attrs.length ? " " : ""}className={surfaceClass({ border: "line" })}>\n  ${String(v.children ?? "")}\n</Pressable>`;
  },
  sections: [
    {
      title: "몸짓 다섯 — none · sink · raise · lift · tap",
      note: "마우스를 올려 보세요. none 은 움직이지 않고(목록 줄), sink 는 사람 카드처럼 그림자 자리로 가라앉고, raise 는 평평하다가 제자리에서 그림자가 올라오고(sink 를 거꾸로 돌린 몸짓), lift 는 탐색 카드처럼 4px 떠오르며 그림자가 길어지고, tap 은 그림자 없이 누르는 순간만 작아집니다. 골라진 칸의 모양(커지기)은 여기 없습니다 — 남아 있는 상태라 Selectable 의 grow 입니다.",
      render: () => (
        <Stage>
          {MOTIONS.map((m) => (
            <Frame key={m} width={240}>
              <Pressable motion={m} padding="xl" className={surfaceClass({ border: "line" })}>
                <Stack as="span" gap="xs">
                  <Text variant="subheading">{m}</Text>
                  <Text variant="caption" tone="muted">
                    {MOTION_NOTE[m]}
                  </Text>
                </Stack>
              </Pressable>
            </Frame>
          ))}
        </Stage>
      ),
    },
    {
      title: "링크 · disabled · Paint 면",
      note: "기본은 <button type=button> 이고, 링크면 as=a 를 줍니다. disabled 는 native 버튼에는 disabled 로, 링크에는 aria-disabled 로 붙고 몸짓이 멈춥니다. 색이 있는 면은 paintClass() 로 빌려 오고, hover 색이 필요하면 hoverable 을 같이 줍니다 — hover 색은 Pressable 이 아니라 Paint 의 것입니다.",
      render: () => (
        <Stage>
          <Frame width={200}>
            <Pressable as="a" href="#" onClick={stay} motion="sink" padding="xl" className={surfaceClass({ border: "line" })}>
              as=&quot;a&quot; — 링크
            </Pressable>
          </Frame>
          <Frame width={200}>
            <Pressable motion="sink" padding="xl" disabled className={surfaceClass({ border: "line" })}>
              disabled
            </Pressable>
          </Frame>
          <Frame width={200}>
            <Pressable motion="sink" padding="xl" className={paintClass({ accent: "green", variant: "plain", hoverable: true })}>
              paintClass · plain
            </Pressable>
          </Frame>
        </Stage>
      ),
    },
  ],
};

/* ── Selectable ──────────────────────────────────────────────────────── */

const SELECT_ROLES = ["button", "radio", "tab", "option", "current"] as const;
type SelectRole = (typeof SELECT_ROLES)[number];

/** role(또는 current)이 정하는 aria — 표본 이름표에 적습니다 */
const ARIA_OF: Record<SelectRole, string> = {
  button: "aria-pressed",
  radio: "aria-checked",
  tab: "aria-selected",
  option: "aria-selected",
  current: 'aria-current="page"',
};

const roleOf = (r: SelectRole): AriaRole | undefined => (r === "button" || r === "current" ? undefined : r);

/** 미리보기 — 누를 때마다 스스로 켜지고 꺼지는 토글입니다. 패널의 selected 는 처음 값이라, 바꾸면 처음부터 다시 그립니다 */
function ToggleDemo({ initial, grow, role, label }: { initial: boolean; grow: boolean; role: SelectRole; label: string }) {
  return (
    <Selectable
      as={Pressable}
      motion="sink"
      defaultSelected={initial}
      grow={grow}
      role={roleOf(role)}
      current={role === "current" ? "page" : undefined}
      paddingX="xl"
      paddingY="md"
      className={({ selected }) => paintClass({ variant: "outline", selected, hoverable: true })}
    >
      <Text variant="label" tone="inherit">
        {label}
      </Text>
    </Selectable>
  );
}

/** 고르는 줄 — 안 골린 칸은 쉴 때의 몸짓(그림자 줄은 sink, 평평한 줄은 tap), 골린 칸은 두 줄 모두 grow (Button 과 같은 조합) */
function GrowRow({ shadow }: { shadow: boolean }) {
  const [on, setOn] = useState("전체");
  return (
    <Inline gap="md">
      {["전체", "1학년", "2학년", "3학년"].map((label) => {
        const picked = on === label;
        return (
          <Selectable
            key={label}
            as={Pressable}
            motion={shadow ? "sink" : "tap"}
            selected={picked}
            grow
            paddingX="lg"
            paddingY="sm"
            className={paintClass({ variant: shadow ? "outline" : "muted", selected: picked, hoverable: true })}
            onClick={() => setOn(label)}
          >
            <Text variant="label" tone="inherit">
              {label}
            </Text>
          </Selectable>
        );
      })}
    </Inline>
  );
}

/** primitive 만으로 세운 고르는 줄 — SegmentedControl 이 이 조립입니다 */
function GroupDemo() {
  const [value, setValue] = useState("week");
  const { groupProps, itemProps } = useSelectableGroup({ value, onChange: setValue });
  return (
    <Inline role="radiogroup" aria-label="보기" gap="sm" {...groupProps}>
      {(["day", "week", "term"] as const).map((v) => (
        <Selectable
          key={v}
          as={Pressable}
          role="radio"
          {...itemProps(v)}
          grow
          paddingX="lg"
          paddingY="sm"
          className={paintClass({ accent: "purple", variant: "muted", selected: value === v, hoverable: true })}
        >
          <Text variant="label" tone="inherit">
            {v}
          </Text>
        </Selectable>
      ))}
    </Inline>
  );
}

const selectable: Spec = {
  name: "Selectable",
  summary:
    "골라지는 물건 — '골라져 있다' 는 남아 있는 상태를 맡습니다. 그 사실을 쓰임에 맞는 aria 하나로 알리고(role 이 정합니다 — 그냥 버튼은 aria-pressed, radio 는 aria-checked, tab · option 은 aria-selected, 내비의 지금 화면은 current 로 aria-current), grow 면 골라진 모양을 그립니다: 105% 로 커져 이웃 위에 서고 4px 그림자를 그대로 두며, hover 때 그림자만 숨고 누르면 100% 로 돌아옵니다. 색은 없습니다 — 골라진 색은 칠(Paint · Glass · Surface)의 selected 이고, 스스로 켜고 끄는 토글이면 className 을 함수({ selected }) => …로 줘서 칠이 그 값을 받습니다. defaultSelected 를 주면 누를 때마다 켜지고 꺼지고(미리보기를 눌러 보세요), selected + onSelectedChange 면 쓰는 쪽이 값을 듭니다. 누름(Pressable)은 순간의 반응이라 따로이고, 고르는 칸은 둘을 같이 씁니다. 무리의 값 · 방향키는 useSelectableGroup 입니다.",
  controls: {
    selected: { kind: "boolean" },
    grow: { kind: "boolean" },
    role: { kind: "select", options: SELECT_ROLES },
    children: { kind: "text" },
  },
  initial: { selected: true, grow: true, children: "전체" },
  defaults: { selected: false, grow: false, role: "button" },
  render: (v) => (
    <ToggleDemo
      key={`${String(v.selected)}-${String(v.role)}`}
      initial={Boolean(v.selected)}
      grow={Boolean(v.grow)}
      role={v.role as SelectRole}
      label={String(v.children ?? "")}
    />
  ),
  code: (v) => {
    const r = v.role as SelectRole;
    const attrs = [
      'motion="sink"',
      v.selected ? "defaultSelected" : "defaultSelected={false}",
      v.grow ? "grow" : "",
      roleOf(r) ? `role="${r}"` : "",
      r === "current" ? 'current="page"' : "",
    ].filter(Boolean);
    return `<Selectable as={Pressable} ${attrs.join(" ")} className={({ selected }) => paintClass({ selected, hoverable: true })}>\n  ${String(v.children ?? "")}\n</Selectable>\n// 누를 때마다 켜지고 꺼집니다 → ${ARIA_OF[r]}`;
  },
  sections: [
    {
      title: "aria 하나 — role 이 정합니다",
      note: "골라짐을 알리는 aria 는 하나뿐입니다. 예전에는 Button 이 aria-pressed 를 붙이면 SegmentedControl · Tabs 가 그걸 지우고 aria-checked · aria-selected 를 다시 붙였습니다. 지금은 칸이 자기 role 을 Selectable 에 넘기고, Selectable 이 맞는 것 하나만 붙입니다. 주지 않으면(selected 가 없으면) 고르는 물건이 아니라서 아무것도 붙지 않습니다. 칸을 누르면 켜지고 꺼지면서 그 aria 값도 같이 바뀝니다.",
      render: () => (
        <Stage>
          {SELECT_ROLES.map((r) => (
            <Labeled key={r} name={r === "current" ? 'current="page"' : `role="${r}"`}>
              <Selectable
                as={Pressable}
                defaultSelected
                grow
                role={roleOf(r)}
                current={r === "current" ? "page" : undefined}
                paddingX="lg"
                paddingY="sm"
                className={({ selected }) => paintClass({ variant: "outline", selected, hoverable: true })}
              >
                <Text variant="micro" tone="inherit">
                  {ARIA_OF[r]}
                </Text>
              </Selectable>
            </Labeled>
          ))}
        </Stage>
      ),
    },
    {
      title: "grow — 골라진 칸이 커집니다",
      note: "class-explorer 의 골라진 버튼 · 칩입니다(RetroButton isSelected · 빈 강의실 · 분반 칩). 골린 칸은 105% 로 커져 이웃 위에 서고 4px 그림자 위에 섭니다 — 쉴 때 그림자 위에 떠 있던 줄(위)도, 평평한 muted 칩 줄(아래)도 같습니다(분반 카드의 교사 · 교실 칩이 평평하다가 골라지면 그림자가 생깁니다). hover 때 가라앉지 않고 제자리에서 그림자만 숨깁니다 — 이미 고른 칸이라 '눌러 들어가는' 몸짓을 하지 않습니다. 커지는 모양이 함께 쓰는 Pressable 의 몸짓을 덮으므로 motion 은 쉴 때의 것 그대로 둡니다.",
      render: () => (
        <Stage>
          <Stack gap="3xl">
            <GrowRow shadow />
            <GrowRow shadow={false} />
          </Stack>
        </Stage>
      ),
    },
    {
      title: "고르는 무리 — useSelectableGroup",
      note: "무리의 값 · 누르기 · 방향키(←→↑↓ · Home · End)와 roving tabindex 를 맡습니다. Tab 키로는 골린 칸 하나에만 들어오고, 무리 안은 방향키로 옮기며 바로 고릅니다(selectOnFocus). 메뉴처럼 포커스만 옮기려면 selectOnFocus: false 를 줍니다. SegmentedControl · Tabs · Menu 가 이 위에 서고, 이 표본은 primitive 만으로 같은 줄을 세운 것입니다. 내비(SideNav · BottomNav)는 Tab 키로 칸마다 들르는 것이 맞아서 무리로 묶지 않고 current 만 씁니다.",
      render: () => (
        <Stage>
          <GroupDemo />
        </Stage>
      ),
    },
  ],
};

/* ── Floating ────────────────────────────────────────────────────────── */

const PLACEMENTS = ["bottom", "top"] as const;
const ALIGN_EDGES = ["start", "center", "end"] as const;
const LAYERS = ["dropdown", "tooltip"] as const;

/** 기준 요소 옆에 판을 여닫는 표본 */
function FloatingDemo({
  placement = "bottom",
  align = "start",
  layer = "dropdown",
  enter = "rise",
  dismissible = true,
}: {
  placement?: (typeof PLACEMENTS)[number];
  align?: (typeof ALIGN_EDGES)[number];
  layer?: (typeof LAYERS)[number];
  enter?: EnterMotion;
  dismissible?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLSpanElement>(null);
  return (
    <span ref={anchor} style={{ display: "inline-flex" }}>
      <Button size="sm" variant="outline" shadow selected={open} onClick={() => setOpen((o) => !o)}>
        {open ? "닫기" : "판 열기"}
      </Button>
      {open && (
        <Floating
          anchor={anchor}
          placement={placement}
          align={align}
          layer={layer}
          enter={enter}
          onDismiss={dismissible ? () => setOpen(false) : undefined}
          padding="xl"
          className={surfaceClass({ border: "line", shadow: "raised" })}
        >
          <Text variant="label">기준 요소 옆에 붙었습니다</Text>
        </Floating>
      )}
    </span>
  );
}

const TERM_ITEMS = [
  { value: "2026-1", label: "2026-1" },
  { value: "2026-2", label: "2026-2" },
] as const;

/** 모달 안에서 여는 메뉴 — 판이 모달(<dialog>) 안에 그려져야 보이고 눌립니다 */
function MenuInModal() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState<string>("2026-2");
  return (
    <>
      <Button size="sm" variant="outline" shadow onClick={() => setOpen(true)}>
        모달 열기
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="학기 고르기" size="sm">
        <Stack gap="lg">
          <Text variant="caption" tone="muted">
            버튼을 눌러 메뉴를 엽니다. 첫 Esc 는 메뉴만, 다음 Esc 가 모달을 닫습니다.
          </Text>
          <Menu
            aria-label="학기"
            value={term}
            items={TERM_ITEMS}
            onSelect={setTerm}
            trigger={
              <Button size="sm" variant="outline">
                {term}
              </Button>
            }
          />
        </Stack>
      </Modal>
    </>
  );
}

const floating: Spec = {
  name: "Floating",
  summary:
    "떠 있는 판 — 판이 어디에 · 언제 있는지를 맡습니다. 문서 끝에 그려(Portal) 카드의 overflow 에 잘리지 않고, 기준 요소 옆에 붙어 화면 밖으로 나가면 뒤집히며, 쌓는 층(dropdown · tooltip)을 고르고, 바깥을 누르거나 Esc 를 누르면 onDismiss 로 닫자고 알리고, 열릴 때 포커스를 옮기고(initialFocus), 등장 몸짓(rise · pop · fade)으로 나타납니다. 그려져 있는 동안이 열려 있는 동안입니다 — {open && <Floating …>}. 면은 surfaceClass() 로 얹습니다. Tooltip · Menu 가 이 위에 섭니다.",
  controls: {
    placement: { kind: "select", options: PLACEMENTS },
    align: { kind: "select", options: ALIGN_EDGES },
    layer: { kind: "select", options: LAYERS },
    enter: { kind: "select", options: ENTER_MOTIONS },
    dismissible: { kind: "boolean" },
  },
  defaults: { placement: "bottom", align: "start", layer: "dropdown", enter: "rise", dismissible: true },
  render: (v) => (
    <FloatingDemo
      placement={v.placement as (typeof PLACEMENTS)[number]}
      align={v.align as (typeof ALIGN_EDGES)[number]}
      layer={v.layer as (typeof LAYERS)[number]}
      enter={v.enter as EnterMotion}
      dismissible={Boolean(v.dismissible)}
    />
  ),
  code: (v) => {
    const attrs = [
      "anchor={anchorRef}",
      v.placement !== "bottom" ? `placement="${String(v.placement)}"` : "",
      v.align !== "start" ? `align="${String(v.align)}"` : "",
      v.layer !== "dropdown" ? `layer="${String(v.layer)}"` : "",
      v.enter !== "rise" ? `enter="${String(v.enter)}"` : "",
      v.dismissible ? "onDismiss={() => setOpen(false)}" : "",
    ].filter(Boolean);
    return `{open && (\n  <Floating ${attrs.join(" ")} padding="xl" className={surfaceClass({ border: "line", shadow: "raised" })}>\n    기준 요소 옆에 붙었습니다\n  </Floating>\n)}`;
  },
  sections: [
    {
      title: "모달 안에서",
      note: "모달(<dialog>)은 브라우저의 가장 위 층에 뜨고, 열려 있는 동안 바깥 요소를 누를 수 없게 만듭니다. 그래서 판을 body 끝에 그리면 모달 뒤에 깔려 보이지도 눌리지도 않습니다 — z-index 로는 그 층을 못 넘습니다. Floating 은 기준 요소가 열린 모달 안에 있으면 그 안에 그립니다. Esc 도 판에서 멈춰서, 첫 Esc 는 판만 닫고 다음 Esc 가 모달을 닫습니다.",
      render: () => (
        <Stage>
          <MenuInModal />
        </Stage>
      ),
    },
    {
      title: "닫히는 판 · 닫히지 않는 판",
      note: "onDismiss 를 주면 바깥 누름과 Esc 가 닫자고 알립니다(왼쪽). 기준 요소를 누르는 것은 바깥이 아니라서, 여는 버튼을 다시 누르면 버튼이 닫습니다. 주지 않으면 여는 쪽만 닫습니다(오른쪽) — 마우스가 떠나면 사라지는 툴팁처럼 스스로 닫히는 판이 아닐 때입니다.",
      render: () => (
        <Stage>
          <Labeled name="onDismiss">
            <FloatingDemo />
          </Labeled>
          <Labeled name="여는 쪽만">
            <FloatingDemo dismissible={false} />
          </Labeled>
        </Stage>
      ),
    },
  ],
};

/* ── VisuallyHidden · Portal ─────────────────────────────────────────── */

/** 이름표가 화면에서는 안 보이는 입력 칸 */
function HiddenLabelField() {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>
        <VisuallyHidden>학생 검색</VisuallyHidden>
      </Label>
      <Input id={id} size="sm" placeholder="학생 검색" />
    </>
  );
}

const visuallyHidden: Spec = {
  name: "VisuallyHidden",
  summary: "화면에는 없고 스크린 리더만 읽는 글자입니다. 눈으로 볼 때는 필요 없지만 귀로 들을 때는 필요한 말에 씁니다.",
  controls: { children: { kind: "text" } },
  initial: { children: "개의 새 알림" },
  render: (v) => {
    const hidden = String(v.children ?? "");
    return (
      <Stack gap="md" align="center">
        <Badge variant="filled" accent="pink" size="lg">
          3
          <VisuallyHidden>{hidden}</VisuallyHidden>
        </Badge>
        <Text variant="caption" tone="muted">
          화면에는 &quot;3&quot; 만 보입니다. 스크린 리더는 &quot;3{hidden}&quot; 이라고 읽습니다.
        </Text>
      </Stack>
    );
  },
  code: (v) => `<Badge variant="filled">\n  3\n  <VisuallyHidden>${String(v.children ?? "")}</VisuallyHidden>\n</Badge>`,
  sections: [
    {
      title: "쓰는 자리",
      note: "글자 없는 컨트롤에 이름을 붙이는 자리입니다. 버튼 하나가 아이콘뿐이면 IconButton 의 label 이 같은 일을 대신 맡습니다.",
      render: () => (
        <Stage bg="raised">
          <Labeled name="아이콘만 있는 버튼">
            <Button icon={Search} variant="outline" shadow>
              <VisuallyHidden>검색</VisuallyHidden>
            </Button>
          </Labeled>
          <Labeled name="이름표가 안 보이는 입력 칸">
            <HiddenLabelField />
          </Labeled>
        </Stage>
      ),
    },
  ],
};

/** body 끝에 그리는 상자를 여닫는 표본 — 닫혀 있으면 아무것도 그리지 않습니다 */
function PortalDemo({ message }: { message: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" shadow selected={open} onClick={() => setOpen((o) => !o)}>
        {open ? "닫기" : "Portal 열기"}
      </Button>
      {open && (
        <Portal>
          <Surface border="line" shadow="raised" padding="xl" style={{ position: "fixed", right: 32, bottom: 32, zIndex: Z.overlay }}>
            {message}
          </Surface>
        </Portal>
      )}
    </>
  );
}

/** Portal 없이 카드 안에서 그린 팝오버 — overflow 에 잘립니다 */
function ClippedPopover() {
  return (
    <Surface border="line" padding="md" style={{ position: "relative", overflow: "hidden", width: 200, height: 44 }}>
      <Text variant="caption">overflow: hidden 카드</Text>
      <Surface border="line" shadow="raised" padding="md" style={{ position: "absolute", left: 12, top: 28, whiteSpace: "nowrap" }}>
        카드 안에서 그리면 잘립니다
      </Surface>
    </Surface>
  );
}

const portal: Spec = {
  name: "Portal",
  summary:
    "자식을 body 끝(또는 container)에 그립니다. 떠 있는 판(Floating)이 카드의 overflow 에 잘리지 않게 하는 바탕입니다. 마운트 뒤 effect 를 거치지 않고 곧바로 그려서, 여는 순간에도 위치를 잴 수 있습니다.",
  controls: { children: { kind: "text" } },
  initial: { children: "body 끝에 그려졌습니다" },
  render: (v) => <PortalDemo message={String(v.children ?? "")} />,
  code: (v) =>
    `<Portal>\n  <Surface border="line" shadow="raised" padding="xl" style={{ position: "fixed", right: 32, bottom: 32 }}>\n    ${String(v.children ?? "")}\n  </Surface>\n</Portal>`,
  sections: [
    {
      title: "overflow 에 잘리는 자리",
      note: "왼쪽은 overflow: hidden 카드 안에서 그린 팝오버라 잘립니다. 오른쪽 버튼을 누르면 같은 상자가 body 끝에 그려져서, 이 판이 overflow: auto 인데도 화면 오른쪽 아래에 온전히 뜹니다.",
      render: () => (
        <Stage>
          <Labeled name="안에서 그리면">
            <ClippedPopover />
          </Labeled>
          <Labeled name="Portal 로 그리면">
            <PortalDemo message="카드 밖에 그려졌습니다" />
          </Labeled>
        </Stage>
      ),
    },
  ],
};

export const PRIMITIVE_SPECS: Record<string, Spec> = {
  Box: box,
  Stack: stack,
  Inline: inline,
  Grid: grid,
  Surface: surface,
  Paint: paint,
  Glass: glass,
  Text: text,
  Icon: iconSpec,
  Pressable: pressable,
  Selectable: selectable,
  Floating: floating,
  VisuallyHidden: visuallyHidden,
  Portal: portal,
};
