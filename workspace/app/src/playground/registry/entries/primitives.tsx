/** Primitives — 배치 · 칠(Surface · Paint) · 글자 · 아이콘 · 누름 · 접근성. 바탕이라 표본은 구조를 보여 줍니다 */
import { useId, useState, type MouseEvent, type ReactNode } from "react";
import {
  Badge,
  Box,
  Button,
  Grid,
  Icon,
  Inline,
  Input,
  Label,
  Paint,
  Portal,
  Pressable,
  Stack,
  Surface,
  Switch,
  Text,
  VisuallyHidden,
  paintClass,
  surfaceClass,
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
const TIMES = ["08:50", "11:11", "18:05"] as const;

/* ── Box ─────────────────────────────────────────────────────────────── */

/** Box 는 칠하지 않아 보이지 않습니다 — 점선으로 자리만 그립니다 */
const EXTENT = { outline: "2px dashed rgba(0, 0, 0, 0.25)", outlineOffset: 2 } as const;

/** Box 가 그릴 수 있는 태그 몇 개 — 화면은 같고, 코드의 태그만 바뀝니다 */
const BOX_TAGS = ["div", "section", "article"] as const;

const box: Spec = {
  name: "Box",
  summary:
    "요소 — 1차 primitive. 태그(as) · ref · 여백만 다루고, 칠하지 않으며 색도 모릅니다. 2차 primitive 는 모두 Box 위에 능력 하나를 얹습니다: 칠(Surface · Paint) · 몸짓(Pressable) · 배치(Stack · Inline · Grid). 점선은 Box 의 자리를 보이려고 그린 것입니다.",
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
            <Pressable motion="press" padding="lg" className={surfaceClass({ border: "line" })}>
              <Text variant="label">+ 몸짓</Text>
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
    "박스의 면 — 흑백 면(fill) · 테두리 · 그림자. 카드 · 패널 · 모달 · 판처럼 무언가를 담는 박스를 칠합니다. accent 로 칠하지 않습니다 — 색이 있는 요소는 Paint 입니다.",
  controls: {
    fill: { kind: "select", options: SURFACE_FILLS },
    border: { kind: "select", options: BORDERS },
    shadow: { kind: "select", options: SHADOWS },
    padding: { kind: "select", options: SPACES },
    children: { kind: "text" },
  },
  initial: { border: "line", shadow: "raised", padding: "xl", children: "오늘 수업" },
  defaults: { fill: "raised", border: "none", shadow: "none", padding: "0" },
  render: (v) => (
    <Surface fill={v.fill as SurfaceFill} border={v.border as Border} shadow={v.shadow as Shadow} padding={v.padding as Space}>
      {String(v.children ?? "")}
    </Surface>
  ),
  sections: [
    {
      title: "Fill — 흑백 면 다섯",
      note: "회색이 아니라 자리의 이름입니다. inverse 는 글자색도 같이 바꿔서 검정 위에 검정 글자가 생기지 않습니다. well 은 반투명이라 어느 면 위에서도 한 단 내려앉습니다.",
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
      title: "Border · Shadow",
      note: "테두리는 2px 한 굵기라 흑백 선의 색만 고릅니다. 그림자는 떠 있는 물건(raised, 4px)과 모달(floating, 8px) 두 단뿐입니다.",
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
                  면은 Surface, 몸짓은 Pressable
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
    "요소의 칠 — accent(색) × variant(칠하는 방식). accent 를 갖는 primitive 는 Paint 하나라, 안쪽 요소는 accent 를 따로 주지 않으면 가장 가까운 Paint 의 색을 따릅니다. Badge · Notice · 상단 바 · 머리 막대가 이 위에 서고, Button 은 Pressable(몸짓)에 이 칠을 얹은 것입니다. interactive 는 hover · press 때의 색만 바꿉니다 — 커서와 움직임은 Pressable 의 몫이라, 누르는 요소는 Pressable 에 paintClass() 로 칠을 얹습니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OPTIONS },
    variant: { kind: "select", options: VARIANTS },
    selected: { kind: "boolean" },
    interactive: { kind: "boolean" },
    padding: { kind: "select", options: SPACES },
    children: { kind: "text" },
  },
  initial: { accent: "green", variant: "plain", interactive: true, padding: "lg", children: "세계사의이해 · 3분반" },
  defaults: { accent: "black", variant: "outline", selected: false, interactive: false, padding: "0" },
  render: (v) => {
    const look = { accent: v.accent as Accent, variant: v.variant as Variant, selected: Boolean(v.selected), padding: v.padding as Space };
    const label = <Text variant="label">{String(v.children ?? "")}</Text>;
    // 누르는 요소는 몸짓(Pressable)에 칠을 얹습니다 — Paint 혼자서는 커서도 움직임도 없습니다
    return v.interactive ? (
      <Pressable motion="tap" className={paintClass({ ...look, interactive: true })}>
        {label}
      </Pressable>
    ) : (
      <Paint {...look}>{label}</Paint>
    );
  },
  code: (v) => {
    const text = String(v.children ?? "");
    const padding = v.padding !== "0" ? `padding="${String(v.padding)}"` : "";
    if (v.interactive) {
      const look = [
        v.accent !== "black" ? `accent: "${String(v.accent)}"` : "",
        v.variant !== "outline" ? `variant: "${String(v.variant)}"` : "",
        v.selected ? "selected: true" : "",
        "interactive: true",
      ].filter(Boolean);
      return `<Pressable motion="tap" ${padding ? `${padding} ` : ""}className={paintClass({ ${look.join(", ")} })}>\n  ${text}\n</Pressable>`;
    }
    const attrs = [
      v.accent !== "black" ? `accent="${String(v.accent)}"` : "",
      v.variant !== "outline" ? `variant="${String(v.variant)}"` : "",
      v.selected ? "selected" : "",
      padding,
    ].filter(Boolean);
    return `<Paint${attrs.length ? ` ${attrs.join(" ")}` : ""}>\n  ${text}\n</Paint>`;
  },
  sections: [
    {
      title: "Accent × Variant",
      note: "행 머리의 네 칸은 FG / BG / Border / Hover 입니다(재원님 스케치의 표기). Button · Badge 의 행렬과 같은 레시피입니다 — 그쪽은 이 칠에 크기 · 아이콘을 얹은 것입니다. 칸은 hover 를 보이려고 Pressable(tap)에 칠을 얹었습니다. 마우스를 올려 보세요.",
      render: () => (
        <AccentVariantMatrix
          cell={(accent, variant) => (
            <Pressable motion="tap" paddingX="md" paddingY="xs" className={paintClass({ accent, variant, interactive: true })}>
              <Text variant="label">{accent}</Text>
            </Pressable>
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
                  <Button size="sm" variant="tonal">
                    유지
                  </Button>
                  <Badge variant="solid">계획</Badge>
                  <Switch defaultChecked aria-label="알림" />
                </Inline>
              </Stack>
            </Paint>
          ))}
        </Stage>
      ),
    },
    {
      title: "selected · interactive — 몸짓은 Pressable",
      note: "selected 는 같은 accent 의 solid 입니다. interactive 는 hover · press 때의 색만 바꾸고, 커서와 움직임은 Pressable 이 맡습니다 — tap 은 누르는 순간만 작아지고, press 는 그림자 속으로 가라앉으며, pressed 는 눌린 채로 머뭅니다. Button 이 이 조립(Pressable + paintClass)입니다.",
      render: () => (
        <Stage bg="raised">
          <Paint accent="cyan" variant="muted" padding="md">
            <Text variant="label">읽는 요소</Text>
          </Paint>
          <Pressable motion="tap" padding="md" className={paintClass({ accent: "cyan", variant: "muted", interactive: true })}>
            <Text variant="label">tap</Text>
          </Pressable>
          <Pressable motion="press" padding="md" className={paintClass({ accent: "cyan", variant: "tonal", interactive: true })}>
            <Text variant="label">press</Text>
          </Pressable>
          <Pressable motion="press" pressed padding="md" className={paintClass({ accent: "cyan", variant: "muted", selected: true, interactive: true })}>
            <Text variant="label">selected · pressed</Text>
          </Pressable>
        </Stage>
      ),
    },
    {
      title: "버튼이 아닌 요소를 칠하기",
      note: "같은 레시피로 버튼 아닌 요소도 칠합니다 — Trade 의 과목 줄(plain), 시간표의 지금(plain pink), 상단 바(solid). 위 층 컴포넌트는 Paint 의 칠을 쓰면서 테두리 같은 형태만 자기 CSS 로 덮습니다.",
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
            <Paint accent="green" variant="tonalMuted" padding="lg">
              <Text variant="caption" weight="black">
                세계사의이해 · 유지
              </Text>
            </Paint>
            <Paint accent="purple" variant="solid" padding="lg">
              <Text variant="caption" weight="black" tone="inherit">
                CLASS EXPLORER — 상단 바의 칠
              </Text>
            </Paint>
          </Stack>
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
                  <Badge variant="solid" accent="cyan">
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
  press: "사람 카드 — 그림자 자리로 가라앉습니다",
  lift: "탐색 카드 — 위로 떠오릅니다",
  tap: "그림자를 끈 버튼 — 누르는 순간만 작아집니다",
};

const pressable: Spec = {
  name: "Pressable",
  summary:
    "누르는 몸짓 — 커서 · 꺼진 모양 · 움직임 · 버튼의 의미(type · disabled)를 맡습니다. press 는 4px 그림자 위에 떠 있다가 hover 때 가라앉고, lift 는 떠오르고, tap 은 그림자 없이 누르는 순간만 작아집니다. 칠은 하지 않습니다 — 흑백 면은 surfaceClass(), 색은 paintClass() 로 얹습니다. Button 이 Pressable + Paint 입니다.",
  controls: {
    motion: { kind: "select", options: MOTIONS },
    pressed: { kind: "boolean" },
    padding: { kind: "select", options: SPACES },
    disabled: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { padding: "xl", children: "수강 변경 탐색" },
  defaults: { motion: "press", pressed: false, padding: "0", disabled: false },
  render: (v) => (
    <Frame width={240}>
      <Pressable
        motion={v.motion as PressMotion}
        pressed={Boolean(v.pressed)}
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
      v.motion !== "press" ? `motion="${String(v.motion)}"` : "",
      v.pressed ? "pressed" : "",
      v.padding !== "0" ? `padding="${String(v.padding)}"` : "",
      v.disabled ? "disabled" : "",
    ].filter(Boolean);
    return `<Pressable ${attrs.join(" ")}${attrs.length ? " " : ""}className={surfaceClass({ border: "line" })}>\n  ${String(v.children ?? "")}\n</Pressable>`;
  },
  sections: [
    {
      title: "press · lift · tap",
      note: "마우스를 올려 보세요. press 는 사람 카드처럼 그림자 자리로 가라앉고, lift 는 탐색 카드처럼 4px 떠오르며 그림자가 길어지고, tap 은 그림자 없이 누르는 순간만 작아집니다. pressed 는 press 몸짓이 눌린 채로 머무는 것입니다(골라진 버튼).",
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
      note: "기본은 <button type=button> 이고, 링크면 as=a 를 줍니다. disabled 는 native 버튼에는 disabled 로, 링크에는 aria-disabled 로 붙고 몸짓이 멈춥니다. 색이 있는 면은 paintClass() 로 빌려 옵니다.",
      render: () => (
        <Stage>
          <Frame width={200}>
            <Pressable as="a" href="#" onClick={stay} padding="xl" className={surfaceClass({ border: "line" })}>
              as=&quot;a&quot; — 링크
            </Pressable>
          </Frame>
          <Frame width={200}>
            <Pressable padding="xl" disabled className={surfaceClass({ border: "line" })}>
              disabled
            </Pressable>
          </Frame>
          <Frame width={200}>
            <Pressable padding="xl" className={paintClass({ accent: "green", variant: "plain", interactive: true })}>
              paintClass · plain
            </Pressable>
          </Frame>
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
        <Badge variant="solid" accent="pink" size="lg">
          3
          <VisuallyHidden>{hidden}</VisuallyHidden>
        </Badge>
        <Text variant="caption" tone="muted">
          화면에는 &quot;3&quot; 만 보입니다. 스크린 리더는 &quot;3{hidden}&quot; 이라고 읽습니다.
        </Text>
      </Stack>
    );
  },
  code: (v) => `<Badge variant="solid">\n  3\n  <VisuallyHidden>${String(v.children ?? "")}</VisuallyHidden>\n</Badge>`,
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
    "자식을 body 끝에 그립니다. Tooltip · Menu 가 카드의 overflow 에 잘리지 않게 하는 바탕입니다. 마운트 뒤 effect 를 거치지 않고 곧바로 그려서, 여는 순간에도 위치를 잴 수 있습니다.",
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
  Text: text,
  Icon: iconSpec,
  Pressable: pressable,
  VisuallyHidden: visuallyHidden,
  Portal: portal,
};
