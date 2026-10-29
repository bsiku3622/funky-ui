/** Primitives — 면 · 배치 · 글자 · 아이콘 · 누름 · 접근성. 모양이 없는 바탕이라 표본은 구조를 보여 줍니다 */
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
  Portal,
  Pressable,
  Stack,
  Switch,
  Text,
  VisuallyHidden,
  type Accent,
  type Border,
  type Shadow,
  type Space,
  type Surface,
  type TextVariant,
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
  SURFACES,
  TEXT_VARIANTS,
  TONES,
  WEIGHTS,
  Z,
  type Align,
  type Family,
  type IconSize,
  type Justify,
  type PressMotion,
} from "@studio-baeks/funky-ui/tokens";
import { Search, Sparkles } from "lucide-react";

import { Stage } from "../../kit";
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
    <Box surface="raised" border="line" paddingX="md" paddingY="2xs">
      <Text as="div" variant={variant}>
        {children}
      </Text>
    </Box>
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

const box: Spec = {
  name: "Box",
  summary: "면 · 테두리 · 그림자 · 여백 · accent 를 prop 으로 고르는 바탕 상자입니다. 값은 모두 시스템 사다리에서 고르고, as 로 태그를 바꿉니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OPTIONS },
    surface: { kind: "select", options: SURFACES },
    border: { kind: "select", options: BORDERS },
    shadow: { kind: "select", options: SHADOWS },
    padding: { kind: "select", options: SPACES },
    children: { kind: "text" },
  },
  // 면은 기본이 없어(투명) 고른 면으로 시작합니다. 나머지 기본값은 "안 준 것과 같은 값"이고,
  // surface: undefined 는 코드에 찍히는 prop 순서를 잡는 자리입니다
  initial: { surface: "raised", border: "line", shadow: "raised", padding: "xl", children: "Box" },
  defaults: { accent: "black", surface: undefined, border: "none", shadow: "none", padding: "0" },
  render: (v) => (
    <Box accent={v.accent as Accent} surface={v.surface as Surface} border={v.border as Border} shadow={v.shadow as Shadow} padding={v.padding as Space}>
      {String(v.children ?? "")}
    </Box>
  ),
  sections: [
    {
      title: "Surface",
      note: "흑백 면 다섯과, 지금 accent 로 칠하는 solid · soft 입니다 (여기서는 pink). inverse 와 solid 는 글자색도 같이 바뀌어서 어두운 면 위에 어두운 글자가 생기지 않습니다.",
      render: () => (
        <Stage>
          {SURFACES.map((s) => (
            <Box key={s} surface={s} accent={s === "solid" || s === "soft" ? "pink" : undefined} border="line" padding="lg">
              {s}
            </Box>
          ))}
        </Stage>
      ),
    },
    {
      title: "Accent 는 안쪽으로 흐릅니다",
      note: "Box 에 준 accent 는 안쪽 컨트롤이 따로 주지 않으면 그대로 쓰입니다. 카드 하나만 칠하면 안의 버튼 · 배지 · 스위치가 같이 따라옵니다.",
      render: () => (
        <Stage bg="raised">
          {(["pink", "green", "orange", "purple"] as const).map((a) => (
            <Box key={a} accent={a} surface="soft" border="accent" padding="xl">
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
            </Box>
          ))}
        </Stage>
      ),
    },
    {
      title: "Border · Shadow",
      note: "테두리는 2px 한 굵기라 색만 고릅니다(accent 는 지금 accent). 그림자는 떠 있는 물건(raised, 4px)과 모달(floating, 8px) 두 단뿐입니다. padding · paddingX · paddingY 는 Layout 의 간격 사다리를 씁니다.",
      render: () => (
        <>
          <Stage>
            {BORDERS.map((b) => (
              <Box key={b} surface="raised" border={b} accent="pink" padding="lg">
                {b}
              </Box>
            ))}
          </Stage>
          <Stage>
            {SHADOWS.map((s) => (
              <Box key={s} surface="raised" border="line" shadow={s} padding="lg">
                {s}
              </Box>
            ))}
          </Stage>
        </>
      ),
    },
  ],
};

/* ── Stack · Inline · Grid ───────────────────────────────────────────── */

const stack: Spec = {
  name: "Stack",
  summary: "자식을 세로로 쌓습니다. 간격(gap)과 가로 정렬(align)을 고르고, Box 의 prop 도 그대로 받습니다.",
  controls: {
    gap: { kind: "select", options: SPACES },
    align: { kind: "select", options: ALIGNS },
  },
  // children 은 코드 표기용입니다 (화면의 자식은 render 가 정합니다). 기본값은 "안 준 것과 같은 값"입니다
  initial: { gap: "xs", surface: "sunken", padding: "xs", children: "…" },
  defaults: { gap: "0", align: "stretch" },
  render: (v) => (
    <Frame width={220}>
      <Stack gap={v.gap as Space} align={v.align as Align} surface={v.surface as Surface} padding={v.padding as Space}>
        {STACK_ITEMS.map((t) => (
          <Tile key={t}>{t}</Tile>
        ))}
      </Stack>
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
              <Stack justify={j} gap="xs" surface="sunken" padding="sm" style={{ height: 150, width: 112 }}>
                <Tile>수학</Tile>
                <Tile>공강</Tile>
              </Stack>
            </Labeled>
          ))}
        </Stage>
      ),
    },
    {
      title: "Box 이기도 합니다",
      note: "면 · 테두리 · 그림자 · 여백을 그대로 받아서, 카드 안을 세로로 나눌 때 한 번에 씁니다.",
      render: () => (
        <Stage>
          <Stack surface="raised" border="line" shadow="raised" padding="xl" gap="md" style={{ width: 240 }}>
            <Text variant="subheading">오늘 수업</Text>
            <Text variant="caption" tone="muted">
              3교시 · 물리학 실험
            </Text>
          </Stack>
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
                <Inline align={a} gap="md" surface="sunken" padding="sm" style={{ width: 280 }}>
                  {INLINE_ITEMS.slice(0, 3).map(([variant, text]) => (
                    <Tile key={text} variant={variant}>
                      {text}
                    </Tile>
                  ))}
                </Inline>
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
                <Inline justify={j} gap="md" surface="sunken" padding="sm" style={{ width: 280 }}>
                  <Tile>수학</Tile>
                  <Tile>공강</Tile>
                </Inline>
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
      note: "흑백 잉크 다섯, 지금 accent 의 진한 글자 · 연한 글자(accent · accentSoft, 여기서는 purple), 부모를 따르는 inherit 입니다. faint 는 장식 전용이라 필수 정보에 쓰지 않습니다.",
      render: () => (
        <Stage bg="raised">
          <Inline gap="xl" wrap accent="purple">
            {TONES.map((t) => (
              <Box key={t} surface={t === "inverse" ? "inverse" : undefined} paddingX="md" paddingY="xs">
                <Text variant="subheading" tone={t}>
                  {t}
                </Text>
              </Box>
            ))}
          </Inline>
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
      note: "accent · accentSoft 는 지금 accent(여기서는 pink)의 진한 글자 · 연한 글자색을 따라갑니다. inverse 는 어두운 면 위에서 씁니다.",
      render: () => (
        <Stage bg="raised">
          <Inline gap="xl" wrap accent="pink">
            {TONES.map((t) => (
              <Stack key={t} gap="xs" align="center">
                <Box surface={t === "inverse" ? "inverse" : "raised"} border="line" padding="md">
                  <Icon icon={Sparkles} size="lg" tone={t} />
                </Box>
                <Text variant="micro" tone="muted">
                  {t}
                </Text>
              </Stack>
            ))}
          </Inline>
        </Stage>
      ),
    },
  ],
};

/* ── Pressable ───────────────────────────────────────────────────────── */

const pressable: Spec = {
  name: "Pressable",
  summary:
    "버튼이 아닌 큰 면(카드)에 같은 몸짓을 줍니다. press 는 4px 그림자 위에 떠 있다가 hover 때 가라앉고, lift 는 hover 때 위로 떠오릅니다. 그림자는 몸짓의 일부라 따로 고르지 않고, 면 · 테두리는 Box 처럼 직접 고릅니다.",
  controls: {
    motion: { kind: "select", options: MOTIONS },
    accent: { kind: "select", options: ACCENT_OPTIONS },
    surface: { kind: "select", options: SURFACES },
    border: { kind: "select", options: BORDERS },
    padding: { kind: "select", options: SPACES },
    disabled: { kind: "boolean" },
    children: { kind: "text" },
  },
  // 면과 테두리는 기본이 없어서(native 버튼 모양이 그대로 나옵니다) 고른 값으로 시작합니다
  initial: { surface: "raised", border: "line", padding: "xl", children: "수강 변경 탐색" },
  defaults: { motion: "press", accent: "black", surface: undefined, border: "none", padding: "0", disabled: false },
  render: (v) => (
    <Frame width={240}>
      <Pressable
        motion={v.motion as PressMotion}
        accent={v.accent as Accent}
        surface={v.surface as Surface}
        border={v.border as Border}
        padding={v.padding as Space}
        disabled={Boolean(v.disabled)}
      >
        {String(v.children ?? "")}
      </Pressable>
    </Frame>
  ),
  sections: [
    {
      title: "press · lift",
      note: "마우스를 올려 보세요. press 는 사람 카드처럼 그림자 자리로 가라앉고, lift 는 탐색 카드처럼 4px 떠오르며 그림자가 길어집니다.",
      render: () => (
        <Stage>
          {MOTIONS.map((m) => (
            <Frame key={m} width={240}>
              <Pressable motion={m} surface="raised" border="line" padding="xl">
                <Stack as="span" gap="xs">
                  <Text variant="subheading">{m}</Text>
                  <Text variant="caption" tone="muted">
                    {m === "press" ? "사람 카드 — 그림자 자리로 가라앉습니다" : "탐색 카드 — 위로 떠오릅니다"}
                  </Text>
                </Stack>
              </Pressable>
            </Frame>
          ))}
        </Stage>
      ),
    },
    {
      title: "링크 · disabled · accent",
      note: "기본은 <button type=button> 이고, 링크면 as=a 를 줍니다. disabled 는 native 버튼에는 disabled 로, 링크에는 aria-disabled 로 붙고 몸짓이 멈춥니다.",
      render: () => (
        <Stage>
          <Frame width={200}>
            <Pressable as="a" href="#" onClick={stay} surface="raised" border="line" padding="xl" style={{ color: "inherit", textDecoration: "none" }}>
              as=&quot;a&quot; — 링크
            </Pressable>
          </Frame>
          <Frame width={200}>
            <Pressable surface="raised" border="line" padding="xl" disabled>
              disabled
            </Pressable>
          </Frame>
          <Frame width={200}>
            <Pressable accent="green" surface="soft" border="accent" padding="xl">
              accent · soft
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
          <Box surface="raised" border="line" shadow="raised" padding="xl" style={{ position: "fixed", right: 32, bottom: 32, zIndex: Z.overlay }}>
            {message}
          </Box>
        </Portal>
      )}
    </>
  );
}

/** Portal 없이 카드 안에서 그린 팝오버 — overflow 에 잘립니다 */
function ClippedPopover() {
  return (
    <Box border="line" padding="md" style={{ position: "relative", overflow: "hidden", width: 200, height: 44 }}>
      <Text variant="caption">overflow: hidden 카드</Text>
      <Box surface="raised" border="line" shadow="raised" padding="md" style={{ position: "absolute", left: 12, top: 28, whiteSpace: "nowrap" }}>
        카드 안에서 그리면 잘립니다
      </Box>
    </Box>
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
    `<Portal>\n  <Box surface="raised" border="line" shadow="raised" padding="xl" style={{ position: "fixed", right: 32, bottom: 32 }}>\n    ${String(v.children ?? "")}\n  </Box>\n</Portal>`,
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
  Text: text,
  Icon: iconSpec,
  Pressable: pressable,
  VisuallyHidden: visuallyHidden,
  Portal: portal,
};
