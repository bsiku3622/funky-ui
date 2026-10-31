/** Atoms 의 나머지 — IconButton · NavButton · Link · Code · Swatch · Wordmark · Marquee · Spinner · Divider · Input · Textarea · Select · Checkbox · Radio · Switch · Label */
import { useId, useState, type MouseEvent, type ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Paint,
  Button,
  Checkbox,
  Code,
  Divider,
  Grid,
  IconButton,
  Inline,
  Input,
  Label,
  Link,
  Marquee,
  NavButton,
  Radio,
  Select,
  Spinner,
  Stack,
  Surface,
  Swatch,
  Switch,
  Text,
  Textarea,
  Wordmark,
  type Accent,
  type ControlSize,
  type DividerProps,
  type NavButtonProps,
  type SpinnerProps,
  type Variant,
} from "@studio-baeks/funky-ui";
import {
  ACCENTS,
  ACCENT_ROLES,
  CONTROL_SIZES,
  ICON_MOTIONS,
  LINK_UNDERLINES,
  SWATCH_RUNGS,
  SWATCH_SHAPES,
  VARIANTS,
  WORDMARK_SIZES,
  type IconMotion,
  type LinkUnderline,
  type SwatchRung,
  type SwatchShape,
  type WordmarkSize,
} from "@studio-baeks/funky-ui/tokens";
import { CalendarDays, ChevronDown, Home, Pin, RefreshCw, Search, Sparkles, Trash2, X } from "lucide-react";

import { Stage } from "../../kit";
import { printJsx } from "../code";
import { icon } from "../icons";
import type { Section, Spec } from "../schema";

const ACCENT_OPTIONS = [...ACCENTS, ...Object.keys(ACCENT_ROLES)] as const;
// 아래 넷은 컴포넌트 자신의 prop 타입이 local union 입니다 (Spinner sm | md | lg, Divider tone · orientation, NavButton sm | md)
const SPINNER_SIZES = ["sm", "md", "lg"] as const;
const DIVIDER_TONES = ["subtle", "soft", "line"] as const;
const DIVIDER_ORIENTATIONS = ["horizontal", "vertical"] as const;
const NAV_SIZES = ["sm", "md"] as const;

const TERMS = ["2025-2", "2026-1", "2026-2"] as const;

/** 링크 표본이 판 밖으로 나가지 않게 */
const stay = (e: MouseEvent) => e.preventDefault();

/** 폭이 있어야 읽히는 표본(입력 칸 · 구분선)의 틀 — 판 폭을 따라가되 최대 폭만 잡습니다 */
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

/* ── IconButton ──────────────────────────────────────────────────────── */

/** 켜고 끄는 아이콘 버튼 — selected 는 커진 채로 남습니다 */
function PinToggle() {
  const [on, setOn] = useState(false);
  return <IconButton icon={Pin} label={on ? "고정 해제" : "고정"} variant="outline" shadow selected={on} onClick={() => setOn((p) => !p)} />;
}

const iconButton: Spec = {
  name: "IconButton",
  summary:
    "아이콘 하나짜리 정사각 버튼입니다. 글자가 없으니 label 이 필수이고, 스크린 리더 이름과 title 로 같이 쓰입니다. 기본 variant 는 옆 내용을 방해하지 않는 ghostMuted 입니다.",
  controls: {
    icon: { kind: "icon" },
    label: { kind: "text" },
    accent: { kind: "select", options: ACCENT_OPTIONS },
    variant: { kind: "select", options: VARIANTS },
    size: { kind: "select", options: CONTROL_SIZES },
    shadow: { kind: "boolean" },
    selected: { kind: "boolean" },
    iconSpin: { kind: "boolean" },
    iconMotion: { kind: "select", options: ["none", ...ICON_MOTIONS] },
    disabled: { kind: "boolean" },
  },
  // icon · label 을 맨 앞에 둬서 코드가 `icon={…} label="…"` 순서로 찍힙니다
  defaults: { icon: undefined, label: undefined, accent: "black", variant: "ghostMuted", size: "md", shadow: false, selected: false, iconSpin: false, disabled: false },
  initial: { icon: "RefreshCw", label: "새로고침", accent: "cyan", variant: "solid", shadow: true },
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
      <IconButton
        icon={glyph}
        label={String(v.label ?? "")}
        accent={v.accent as Accent}
        variant={v.variant as Variant}
        size={v.size as ControlSize}
        shadow={Boolean(v.shadow)}
        selected={v.selected ? true : undefined}
        iconSpin={Boolean(v.iconSpin)}
        iconMotion={v.iconMotion && v.iconMotion !== "none" ? (v.iconMotion as IconMotion) : undefined}
        disabled={Boolean(v.disabled)}
      />
    );
  },
  sections: [
    {
      title: "Variants",
      note: "Button 과 같은 열다섯 레시피입니다. 그림자는 테두리가 있는 variant 에만 붙고, 테두리가 없는 ghost 둘은 가라앉을 상자가 없어 받지 않습니다. 칸에 마우스를 올리면 label 이 title 로 뜹니다.",
      render: () => (
        <Stage bg="raised">
          {VARIANTS.map((variant) => (
            <Stack key={variant} gap="sm" align="center">
              <IconButton icon={RefreshCw} label={variant} variant={variant} accent="cyan" shadow />
              <Text variant="micro" tone="muted">
                {variant}
              </Text>
            </Stack>
          ))}
        </Stage>
      ),
    },
    {
      title: "Sizes",
      note: "높이와 폭이 같은 24 · 32 · 40 · 48 정사각입니다. 아이콘 크기는 버튼 크기가 정합니다.",
      render: () => (
        <Stage bg="raised">
          {CONTROL_SIZES.map((s) => (
            <Stack key={s} gap="sm" align="center">
              <IconButton icon={Search} label={s} size={s} variant="outline" shadow />
              <Text variant="micro" tone="muted">
                {s}
              </Text>
            </Stack>
          ))}
        </Stage>
      ),
    },
    {
      title: "Ask 단추 — shadow=\"shrink\"",
      note: "Ask 플로팅 버튼과 창 머리 단추만 쓰는 몸짓입니다. 그림자를 그대로 둔 채 hover 때 95%, 누르면 92% 로 작아집니다 — class-explorer 가이드가 사용자 요청의 예외로 적어 둔 자리라 다른 곳에 쓰지 않습니다.",
      render: () => (
        <Stage>
          <IconButton icon={Sparkles} label="Ask" accent="purple" variant="paper" size="lg" shadow="shrink" />
          <IconButton icon={X} label="닫기" variant="paper" size="sm" shadow="shrink" />
        </Stage>
      ),
    },
    {
      title: "자리들",
      note: "닫기 · 새로고침 · 삭제는 ghostMuted · muted · ghost 로 물러나 있고, 켜고 끄는 것(고정)은 selected 로 커진 채 남습니다(aria-pressed).",
      render: () => (
        <Stage bg="raised">
          <IconButton icon={X} label="닫기" size="sm" />
          <IconButton icon={RefreshCw} label="새로고침" size="sm" variant="muted" />
          <IconButton icon={Trash2} label="삭제" size="sm" accent="red" variant="ghost" />
          <PinToggle />
          <IconButton icon={Search} label="검색" variant="outline" disabled />
        </Stage>
      ),
    },
  ],
};

/* ── NavButton ───────────────────────────────────────────────────────── */

/** 상단 바(AppBar)와 같은 brand 면 — Overview 의 크림 바탕에서도 흰 글자가 읽히게 감쌉니다 */
function Bar({ children }: { children: ReactNode }) {
  return (
    <Surface fill="brand" padding="md">
      {children}
    </Surface>
  );
}

const NAV_ITEMS = [
  { key: "home", label: "홈", glyph: Home },
  { key: "search", label: "검색", glyph: Search },
  { key: "calendar", label: "달력", glyph: CalendarDays },
] as const;

/** 상단 바의 메뉴 — 지금 화면이 selected 입니다 */
function NavBarDemo() {
  const [tab, setTab] = useState<string>("home");
  return (
    <Inline gap="sm" wrap>
      {NAV_ITEMS.map((item) => (
        <NavButton key={item.key} icon={item.glyph} selected={tab === item.key} onClick={() => setTab(item.key)}>
          {item.label}
        </NavButton>
      ))}
      <NavButton iconEnd={ChevronDown}>2026-2</NavButton>
    </Inline>
  );
}

/** 눌러서 켜고 끄는 유리 버튼 — 켜면 유리가 짙어집니다 */
function NavToggle() {
  const [on, setOn] = useState(true);
  return (
    <NavButton selected={on} onClick={() => setOn((p) => !p)}>
      selected
    </NavButton>
  );
}

const navButton: Spec = {
  name: "NavButton",
  summary: "보라 바(Surface brand) 위의 버튼입니다. Pressable(tap) 위에 Glass(유리 칠)를 얹은 것이라 반투명 유리 면에 흰 글자이고, hover 때 테두리가 진해집니다. 상단 바 · 하단 바 · 학기 선택에만 쓰고, 밝은 면 위에서는 Button 을 씁니다.",
  stage: "brand",
  controls: {
    icon: { kind: "icon" },
    iconEnd: { kind: "icon" },
    children: { kind: "text" },
    label: { kind: "text" },
    selected: { kind: "boolean" },
    size: { kind: "select", options: NAV_SIZES },
    disabled: { kind: "boolean" },
  },
  initial: { iconEnd: "ChevronDown", children: "2026-2" },
  defaults: { size: "sm", selected: false, disabled: false },
  render: (v) => (
    <Bar>
      <NavButton
        icon={icon(v.icon)}
        iconEnd={icon(v.iconEnd)}
        label={v.label ? String(v.label) : undefined}
        selected={v.selected ? true : undefined}
        size={v.size as NavButtonProps["size"]}
        disabled={Boolean(v.disabled)}
      >
        {String(v.children ?? "")}
      </NavButton>
    </Bar>
  ),
  sections: [
    {
      title: "상단 바에서",
      note: "지금 화면이 selected(더 밝은 유리 면 + 흰 테두리)이고, 학기 선택처럼 목록을 여는 버튼은 뒤 아이콘을 답니다.",
      render: () => (
        <Stage bg="brand">
          <NavBarDemo />
        </Stage>
      ),
    },
    {
      title: "Sizes · States",
      note: "크기는 sm · md 둘이고, 글자 없이 아이콘만 있으면 정사각이 됩니다 (이때만 label 이 aria-label 로 붙습니다).",
      render: () => (
        <Stage bg="brand">
          <NavButton size="sm" icon={Home}>
            sm
          </NavButton>
          <NavButton size="md" icon={Home}>
            md
          </NavButton>
          <NavButton icon={Search} label="검색" />
          <NavButton size="md" icon={Search} label="검색" />
          <NavToggle />
          <NavButton disabled>disabled</NavButton>
        </Stage>
      ),
    },
  ],
};

/* ── Link ────────────────────────────────────────────────────────────── */

const link: Spec = {
  name: "Link",
  summary: "글 속 링크입니다. accent 의 진한 글자에 2px 밑줄이 붙고, hover 때 accent 면으로 뒤집힙니다. underline=hover 는 글자를 물려받고 hover 때만 밑줄이 생기는 조용한 링크입니다. 라우터 링크는 as 로 넘깁니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OPTIONS },
    underline: { kind: "select", options: LINK_UNDERLINES },
    href: { kind: "text" },
    children: { kind: "text" },
  },
  initial: { accent: "purple", href: "/trade", children: "Trade 열기" },
  defaults: { accent: "black", underline: "always" },
  render: (v) => (
    <Link accent={v.accent as Accent} underline={v.underline as LinkUnderline} href={String(v.href ?? "")} onClick={stay}>
      {String(v.children ?? "")}
    </Link>
  ),
  sections: [
    {
      title: "글 속에서",
      note: "문장 안에서는 줄 높이를 흔들지 않고 밑줄만 붙습니다. as={RouterLink} 처럼 다른 컴포넌트를 넘기면 그 컴포넌트의 prop(to)을 그대로 받습니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={440}>
            <Text as="p" style={{ margin: 0 }}>
              수강 변경은{" "}
              <Link href="#" accent="cyan" onClick={stay}>
                Trade
              </Link>{" "}
              에서 하고, 학기 데이터는{" "}
              <Link href="#" accent="purple" onClick={stay}>
                Admin
              </Link>{" "}
              에서 봅니다. 버튼의 모든 variant 는{" "}
              <Link as={RouterLink} to="/playground/atoms/button" accent="pink">
                Button
              </Link>{" "}
              페이지에 있습니다.
            </Text>
          </Frame>
        </Stage>
      ),
    },
    {
      title: "Accent",
      render: () => (
        <Stage bg="raised">
          {ACCENTS.map((a) => (
            <Link key={a} href="#" accent={a} onClick={stay}>
              {a}
            </Link>
          ))}
        </Stage>
      ),
    },
    {
      title: "조용한 링크 — underline=\"hover\"",
      note: "목록 줄의 과목명처럼 링크가 많은 자리에는 밑줄이 시끄럽습니다. 글자색 · 굵기를 바깥 Text 에서 물려받고 hover 때만 밑줄이 생깁니다. accent 를 주면 hover 때 그 색이 됩니다. 어두운 면 위에서는 Text 의 inverseMuted 안에 넣습니다. 버튼으로 그려도(as=button) 틀이 남지 않습니다.",
      render: () => (
        <Stage bg="raised">
          <Text variant="subheading">
            <Link href="#" underline="hover" onClick={stay}>
              일반물리학 II
            </Link>
          </Text>
          <Text variant="caption" tone="muted">
            <Link href="#" underline="hover" onClick={stay}>
              김예시
            </Link>
            {" · "}
            <Link href="#" underline="hover" onClick={stay}>
              302호
            </Link>
          </Text>
          <Text weight="black">
            <Link href="#" underline="hover" accent="pink" onClick={stay}>
              hover 때 핑크
            </Link>
          </Text>
          <Text weight="black">
            <Link as="button" underline="hover" accent="purple">
              버튼으로
            </Link>
          </Text>
          <Surface fill="inverse" paddingX="lg" paddingY="md">
            <Text variant="caption" tone="inverseMuted">
              <Link href="#" underline="hover" onClick={stay}>
                개인정보처리방침
              </Link>
            </Text>
          </Surface>
        </Stage>
      ),
    },
  ],
};

/* ── Code · Swatch · Wordmark ────────────────────────────────────────── */

const codeSpec: Spec = {
  name: "Code",
  summary: "문장 속 코드 칩입니다. 검정 면 · 흰 900 글자이고, 대소문자를 그대로 두며 줄이 바뀌면 칩도 같이 줄을 바꿉니다. 상태를 적는 라벨은 Badge 입니다.",
  controls: { children: { kind: "text" } },
  initial: { children: "student:25-001" },
  render: (v) => <Code>{String(v.children ?? "")}</Code>,
  sections: [
    {
      title: "글 속에서",
      note: "Badge 는 대문자 · 한 줄 고정이라 검색식이 STUDENT:25-001 로 보이고 좁은 폭에서 잘립니다. Code 는 글자를 그대로 두고, 줄이 바뀌면 줄마다 좌우 여백을 유지합니다.",
      render: () => (
        <Stage bg="raised">
          <Frame width={280}>
            <Text as="p" leading="relaxed" style={{ margin: 0 }}>
              학번으로 찾으려면 <Code>student:25-001</Code> 을, 과목으로 찾으려면 <Code>subject:미적분학 II 영어강의 전체 분반</Code> 을 검색창에 적습니다.
            </Text>
          </Frame>
        </Stage>
      ),
    },
  ],
};

/** class-explorer 의 달력 분류 여섯 — 색이 넷, 회색이 둘입니다 */
const CATEGORIES: { name: string; accent: Accent; rung?: SwatchRung }[] = [
  { name: "휴일", accent: "pink" },
  { name: "시험", accent: "purple" },
  { name: "학기", accent: "orange" },
  { name: "기숙사", accent: "sky" },
  { name: "학사", accent: "black", rung: "softInk" },
  { name: "행사", accent: "black", rung: "soft" },
];

const swatch: Spec = {
  name: "Swatch",
  summary: "색 하나로 묶음을 알리는 점과 띠입니다. dot 은 8px 네모 점(분류), round 는 8px 둥근 점(상태), rail 은 4px 왼쪽 띠입니다. 뜻은 옆 글자가 말하므로 스크린 리더에게 읽히지 않습니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OPTIONS },
    shape: { kind: "select", options: SWATCH_SHAPES },
    rung: { kind: "select", options: SWATCH_RUNGS },
    pulse: { kind: "boolean" },
  },
  initial: { accent: "pink" },
  defaults: { accent: "black", shape: "dot", rung: "solid", pulse: false },
  render: (v) => (
    <Inline gap="md">
      <Swatch accent={v.accent as Accent} shape={v.shape as SwatchShape} rung={v.rung as SwatchRung} pulse={Boolean(v.pulse)} />
      <Text weight="black">기말고사</Text>
    </Inline>
  ),
  sections: [
    {
      title: "분류 — 색 넷과 회색 둘",
      note: "회색 분류는 검정 사다리의 두 칸(softInk · soft)입니다. 흐린 회색도 옆 글자로 뜻이 전해지므로 대비를 따지지 않습니다.",
      render: () => (
        <Stage bg="raised">
          {CATEGORIES.map((c) => (
            <Inline key={c.name} gap="md">
              <Swatch accent={c.accent} rung={c.rung} />
              <Text variant="caption" weight="black">
                {c.name}
              </Text>
            </Inline>
          ))}
        </Stage>
      ),
    },
    {
      title: "pulse — 살아 있는 상태 점",
      note: "pulse 는 2초 주기로 깜빡입니다. 연결이 살아 있다는 표시처럼 지금 진행 중이라는 뜻을 점 하나로 전할 때 씁니다. 움직임을 줄인 사람에게는 한 번으로 끝납니다.",
      render: () => (
        <Stage bg="raised">
          <Inline gap="md">
            <Swatch accent="green" shape="round" pulse />
            <Text variant="caption" weight="black">
              연결됨
            </Text>
          </Inline>
          <Inline gap="md">
            <Swatch accent="pink" shape="round" pulse />
            <Text variant="caption" weight="black">
              수업 중
            </Text>
          </Inline>
        </Stage>
      ),
    },
    {
      title: "모양 셋",
      note: "rail 은 flex 줄 안에서 줄의 높이를 채웁니다. 일정 목록의 왼쪽 띠처럼 여러 줄짜리 내용 옆에 씁니다. round 는 연결 상태처럼 원이어야 뜻이 서는 자리에만 씁니다.",
      render: () => (
        <Stage bg="raised">
          <Inline gap="md">
            <Swatch accent="pink" />
            <Text variant="caption" weight="black">
              dot
            </Text>
          </Inline>
          <Inline gap="md">
            <Swatch accent="green" shape="round" />
            <Text variant="caption" weight="black">
              round
            </Text>
          </Inline>
          <Inline gap="md">
            <Swatch accent="purple" shape="rail" />
            <Stack gap="2xs">
              <Text variant="caption" weight="black">
                rail
              </Text>
              <Text variant="micro" tone="muted">
                줄의 높이를 채웁니다
              </Text>
            </Stack>
          </Inline>
        </Stage>
      ),
    },
  ],
};

const wordmark: Spec = {
  name: "Wordmark",
  summary: "로고 글자입니다. 기울어진 900 대문자이고, 색은 바깥 글자색을 물려받습니다. onClick 을 주면 버튼이 되어 hover 때 커지고 누르면 작아집니다. AppBar 의 로고가 이것입니다.",
  controls: {
    size: { kind: "select", options: WORDMARK_SIZES },
    pressable: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { children: "Class Explorer", pressable: true },
  defaults: { size: "md", pressable: false },
  render: (v) => (
    <Wordmark size={v.size as WordmarkSize} onClick={v.pressable ? stay : undefined}>
      {String(v.children ?? "")}
    </Wordmark>
  ),
  code: (v) => printJsx("Wordmark", { size: v.size, children: v.children }, wordmark.defaults).replace("<Wordmark", v.pressable ? "<Wordmark onClick={goHome}" : "<Wordmark"),
  sections: [
    {
      title: "크기 · 자리",
      note: "sm 은 작은 머리띠, md 는 상단 바, lg 는 로그인 화면의 제목입니다. 제목이면 as=h1 로 그립니다. 글자색을 물려받으므로 보라 바 위에서는 흰색, 크림 위에서는 검정입니다.",
      render: () => (
        <Stage>
          {WORDMARK_SIZES.map((s) => (
            <Wordmark key={s} size={s}>
              Class Explorer
            </Wordmark>
          ))}
          <Surface fill="brand" paddingX="xl" paddingY="lg">
            <Wordmark>Class Explorer</Wordmark>
          </Surface>
        </Stage>
      ),
    },
  ],
};

const marquee: Spec = {
  name: "Marquee",
  summary:
    "한 줄인데 자리가 모자랄 때 …로 자르는 대신 좌우로 훑고 돌아옵니다. 문장 전체가 곧 내용인 자리(배너)에 씁니다. 넘칠 때만 움직이고, 폭이 바뀌면 다시 재고, 움직임을 줄인 사람에게는 움직이지 않습니다. 폭은 바깥이 정합니다.",
  controls: {
    width: { kind: "number", min: 80, max: 480, step: 20 },
    children: { kind: "text" },
  },
  initial: { width: 200, children: "2026-2학기 수강 변경 신청이 10월 31일 18시에 마감됩니다" },
  render: (v) => (
    <Surface border="line" paddingX="md" paddingY="xs" style={{ width: Number(v.width) || 200 }}>
      <Text as="div" variant="caption" weight="black">
        <Marquee>{String(v.children ?? "")}</Marquee>
      </Text>
    </Surface>
  ),
  // width 는 바깥 틀의 폭이라 Marquee 의 prop 이 아닙니다
  code: (v) => `<Marquee>${String(v.children ?? "")}</Marquee>`,
  sections: [
    {
      title: "넘칠 때만 움직입니다",
      note: "왼쪽은 글자가 자리에 들어가서 가만히 있고, 가운데와 오른쪽은 넘쳐서 끝까지 훑은 뒤 돌아옵니다. 속도는 거리와 상관없이 일정하고(초당 45px), 양 끝에서 잠깐 멈춥니다.",
      render: () => (
        <Stage bg="raised">
          {[360, 200, 120].map((w) => (
            <Labeled key={w} name={`${w}px`}>
              <Surface border="line" paddingX="md" paddingY="xs" style={{ width: w }}>
                <Text as="div" variant="caption" weight="black">
                  <Marquee>수강 변경 신청이 곧 마감됩니다</Marquee>
                </Text>
              </Surface>
            </Labeled>
          ))}
        </Stage>
      ),
    },
    {
      title: "배너 안에서",
      note: "Notice 의 solid 띠처럼 한 줄 안내를 담는 자리에 놓았습니다.",
      render: () => (
        <Stage bg="raised">
          <Paint accent="yellow" variant="solid" shadow paddingX="lg" paddingY="sm" style={{ width: 260 }}>
            <Text as="div" variant="caption" weight="black" tone="inherit">
              <Marquee>학사 일정이 바뀌었으니 달력에서 다시 확인해 주세요</Marquee>
            </Text>
          </Paint>
        </Stage>
      ),
    },
  ],
};

/* ── Spinner · Divider ───────────────────────────────────────────────── */

const spinner: Spec = {
  name: "Spinner",
  summary: "도는 고리입니다. 옅은 링 위에 한 조각만 진해서 회전이 읽히고, 색은 글자색을 따릅니다. role=status 와 label 로 스크린 리더에 알립니다.",
  controls: {
    size: { kind: "select", options: SPINNER_SIZES },
    label: { kind: "text" },
  },
  initial: { size: "lg" },
  defaults: { size: "md", label: "불러오는 중" },
  render: (v) => <Spinner size={v.size as SpinnerProps["size"]} label={String(v.label ?? "")} />,
  sections: [
    {
      title: "Sizes",
      note: "14 · 18 · 24px 세 칸입니다.",
      render: () => (
        <Stage bg="raised">
          {SPINNER_SIZES.map((s) => (
            <Stack key={s} gap="sm" align="center">
              <Spinner size={s} />
              <Text variant="micro" tone="muted">
                {s}
              </Text>
            </Stack>
          ))}
        </Stage>
      ),
    },
    {
      title: "색은 글자색을 따릅니다",
      note: "Spinner 는 색을 받지 않고 currentColor 로 그립니다. 글자색을 정하는 쪽(여기서는 Paint 의 ghost 칠)이 색을 바꿉니다.",
      render: () => (
        <Stage bg="raised">
          {ACCENTS.map((a) => (
            <Stack key={a} gap="xs" align="center">
              <Paint accent={a} variant="ghost">
                <Spinner size="lg" />
              </Paint>
              <Text variant="micro" tone="muted">
                {a}
              </Text>
            </Stack>
          ))}
        </Stage>
      ),
    },
    {
      title: "Button 의 loading",
      note: "Button 의 loading 이 이 Spinner 를 씁니다 (lg 버튼은 md, 나머지는 sm). 글자 자리를 지킨 채 가운데에 놓여서 버튼 폭이 흔들리지 않습니다.",
      render: () => (
        <Stage bg="raised">
          <Button loading>저장</Button>
          <Button variant="filled" accent="green" loading>
            저장
          </Button>
          <Button variant="solid" accent="pink" size="lg" shadow loading>
            다시 시도
          </Button>
        </Stage>
      ),
    },
  ],
};

const divider: Spec = {
  name: "Divider",
  summary: "카드 안을 나누는 구분선입니다. 카드 안에 카드를 넣지 말고 이걸로 나눕니다. 기본 subtle 은 옅은 선이고, 구획이 분명해야 할 때 line(검정)을 씁니다.",
  controls: {
    tone: { kind: "select", options: DIVIDER_TONES },
    orientation: { kind: "select", options: DIVIDER_ORIENTATIONS },
  },
  initial: { tone: "line" },
  defaults: { tone: "subtle", orientation: "horizontal" },
  render: (v) => {
    const tone = v.tone as DividerProps["tone"];
    return (
      <Frame width={260}>
        <Surface border="line" padding="lg">
          {v.orientation === "vertical" ? (
            <Inline gap="xl" justify="center">
              <Stack align="center">
                <Text variant="title">12</Text>
                <Text variant="micro" tone="muted">
                  수강
                </Text>
              </Stack>
              <Divider tone={tone} orientation="vertical" />
              <Stack align="center">
                <Text variant="title">36</Text>
                <Text variant="micro" tone="muted">
                  학점
                </Text>
              </Stack>
            </Inline>
          ) : (
            <Stack gap="lg">
              <Text variant="caption" weight="black">
                오늘 수업
              </Text>
              <Divider tone={tone} />
              <Text variant="caption" weight="black">
                급식
              </Text>
            </Stack>
          )}
        </Surface>
      </Frame>
    );
  },
  sections: [
    {
      title: "Tone",
      note: "세 톤 모두 2px 이고 색만 다릅니다. subtle 은 검정 10%, soft 는 옅은 회색, line 은 검정입니다. 카드 안에서는 subtle 이 가장 조용합니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="xl" style={{ width: 240 }}>
            {DIVIDER_TONES.map((t) => (
              <Labeled key={t} name={t}>
                <Divider tone={t} />
              </Labeled>
            ))}
          </Stack>
        </Stage>
      ),
    },
  ],
};

/* ── Input · Textarea · Select ───────────────────────────────────────── */

const input: Spec = {
  name: "Input",
  summary:
    "한 줄 입력 칸입니다. 흰 면에 2px 검정이고, 값은 읽는 내용이라 900 이 아니라 700 입니다. 같은 size 의 Button 과 높이가 같고, native input 의 속성이 그대로 갑니다.",
  controls: {
    size: { kind: "select", options: CONTROL_SIZES },
    invalid: { kind: "boolean" },
    warning: { kind: "boolean" },
    quiet: { kind: "boolean" },
    bare: { kind: "boolean" },
    shadow: { kind: "boolean" },
    disabled: { kind: "boolean" },
    placeholder: { kind: "text" },
  },
  initial: { shadow: true, placeholder: "이름을 입력하세요" },
  defaults: { size: "md", invalid: false, warning: false, quiet: false, bare: false, shadow: false, disabled: false },
  render: (v) => (
    <Frame width={260}>
      <Input
        size={v.size as ControlSize}
        invalid={Boolean(v.invalid)}
        warning={Boolean(v.warning)}
        quiet={Boolean(v.quiet)}
        bare={Boolean(v.bare)}
        shadow={Boolean(v.shadow)}
        disabled={Boolean(v.disabled)}
        placeholder={String(v.placeholder ?? "")}
        aria-label="이름"
      />
    </Frame>
  ),
  sections: [
    {
      title: "Sizes",
      note: "높이 24 · 32 · 40 · 48. 같은 size 의 Button 과 높이가 같아서 한 줄에 나란히 놓아도 어긋나지 않습니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="lg">
            {CONTROL_SIZES.map((s) => (
              <Inline key={s} gap="md">
                <Input size={s} placeholder={s} aria-label={s} style={{ width: 180 }} />
                <Button size={s} variant="filled" icon={Search}>
                  검색
                </Button>
              </Inline>
            ))}
          </Stack>
        </Stage>
      ),
    },
    {
      title: "bare — 줄 안에서 치는 칸",
      note: "bare 는 면 · 테두리 · 높이를 모두 빼고 글자를 바깥 것으로 씁니다. 표 칸의 숫자나 글자를 그 자리에서 고칠 때 씁니다. 상태(warning · quiet · shadow)는 그리지 않고 invalid 의 aria 만 남습니다. 칸이 보이도록 아래는 점선 틀을 둘렀습니다.",
      render: () => (
        <Stage bg="raised">
          <Surface border="line" borderStyle="dashed" paddingX="md" paddingY="sm" style={{ width: 160 }}>
            <Text as="div" variant="caption" weight="black">
              <Input bare type="number" defaultValue={18} aria-label="학점" />
            </Text>
          </Surface>
        </Stage>
      ),
    },
    {
      title: "States",
      note: "invalid 는 빨간 테두리와 aria-invalid 를 같이 켭니다. warning 은 막지 않는 경고라 주황 테두리만 켜고(aria-invalid 는 없습니다), quiet 은 비어 있거나 해당 없는 칸을 옅은 테두리 · 약한 글자로 물리며 hover 때 테두리가 진해집니다. readOnly 와 disabled 는 오목한 면으로 내려앉고, shadow 는 폼의 주인공 칸을 4px 위에 띄웁니다.",
      render: () => (
        <Stage bg="raised">
          <Grid columns={2} gap="xl" style={{ width: "100%", maxWidth: 560 }}>
            <Labeled name="기본">
              <Input placeholder="이름" aria-label="이름" />
            </Labeled>
            <Labeled name="값이 있을 때">
              <Input defaultValue="김예시" aria-label="이름" />
            </Labeled>
            <Labeled name="invalid">
              <Input invalid defaultValue="김예" aria-label="이름" />
            </Labeled>
            <Labeled name="warning">
              <Input warning defaultValue="김예시1" aria-label="이름" />
            </Labeled>
            <Labeled name="quiet">
              <Input quiet placeholder="해당 없음" aria-label="이름" />
            </Labeled>
            <Labeled name="disabled">
              <Input disabled defaultValue="김예시" aria-label="이름" />
            </Labeled>
            <Labeled name="readOnly">
              <Input readOnly defaultValue="2026-2" aria-label="학기" />
            </Labeled>
            <Labeled name="shadow">
              <Input shadow placeholder="이름" aria-label="이름" />
            </Labeled>
          </Grid>
        </Stage>
      ),
    },
  ],
};

const textarea: Spec = {
  name: "Textarea",
  summary: "여러 줄 입력 칸입니다. Input 과 같은 면이고, 높이는 rows 가 정합니다 (기본 4). size 는 안쪽 여백과 글자 크기를 바꾸고, 사용자는 세로로만 늘일 수 있습니다.",
  controls: {
    size: { kind: "select", options: CONTROL_SIZES },
    invalid: { kind: "boolean" },
    shadow: { kind: "boolean" },
    disabled: { kind: "boolean" },
    rows: { kind: "number", min: 2, max: 8, step: 1 },
    placeholder: { kind: "text" },
  },
  initial: { rows: 3, shadow: true, placeholder: "한 줄 소개를 적어 주세요" },
  defaults: { size: "md", invalid: false, shadow: false, disabled: false, rows: 4 },
  render: (v) => (
    <Frame width={260}>
      <Textarea
        size={v.size as ControlSize}
        invalid={Boolean(v.invalid)}
        shadow={Boolean(v.shadow)}
        disabled={Boolean(v.disabled)}
        rows={Number(v.rows) || undefined}
        placeholder={String(v.placeholder ?? "")}
        aria-label="소개"
      />
    </Frame>
  ),
  sections: [
    {
      title: "Sizes",
      render: () => (
        <Stage bg="raised">
          <Stack gap="lg" style={{ width: "100%", maxWidth: 360 }}>
            {CONTROL_SIZES.map((s) => (
              <Labeled key={s} name={`size="${s}"`}>
                <Textarea size={s} rows={2} placeholder="한 줄 소개" aria-label={s} />
              </Labeled>
            ))}
          </Stack>
        </Stage>
      ),
    },
    {
      title: "States",
      render: () => (
        <Stage bg="raised">
          <Grid columns={2} gap="xl" style={{ width: "100%", maxWidth: 560 }}>
            <Labeled name="invalid">
              <Textarea invalid rows={2} defaultValue="너무 짧습니다" aria-label="소개" />
            </Labeled>
            <Labeled name="disabled">
              <Textarea disabled rows={2} defaultValue="수정할 수 없습니다" aria-label="소개" />
            </Labeled>
            <Labeled name="readOnly">
              <Textarea readOnly rows={2} defaultValue="읽기만 됩니다" aria-label="소개" />
            </Labeled>
            <Labeled name="shadow">
              <Textarea shadow rows={2} placeholder="소개" aria-label="소개" />
            </Labeled>
          </Grid>
        </Stage>
      ),
    },
  ],
};

/** 학기를 고르는 Select — 고른 값을 state 로 들고 있는 제어 컴포넌트입니다 */
function TermSelect({ size, invalid, shadow, disabled }: { size?: ControlSize; invalid?: boolean; shadow?: boolean; disabled?: boolean }) {
  const [term, setTerm] = useState<string>("2026-2");
  return (
    <Select size={size} invalid={invalid} shadow={shadow} disabled={disabled} aria-label="학기" value={term} onChange={(e) => setTerm(e.target.value)}>
      {TERMS.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </Select>
  );
}

const selectSpec: Spec = {
  name: "Select",
  summary: "native select 를 감싼 칸입니다. 목록은 운영체제가 그려서 폰에서 가장 잘 골라지고, 화살표는 장식이라 누름이 select 로 흘러갑니다.",
  controls: {
    size: { kind: "select", options: CONTROL_SIZES },
    invalid: { kind: "boolean" },
    shadow: { kind: "boolean" },
    disabled: { kind: "boolean" },
  },
  initial: { shadow: true },
  defaults: { size: "md", invalid: false, shadow: false, disabled: false },
  render: (v) => (
    <Frame width={200}>
      <TermSelect size={v.size as ControlSize} invalid={Boolean(v.invalid)} shadow={Boolean(v.shadow)} disabled={Boolean(v.disabled)} />
    </Frame>
  ),
  // 자식은 <option> 이라 컨트롤 하나로 못 찍습니다 — 여는 태그만 printJsx 로 찍고 option 을 붙입니다
  code: (v) => {
    const open = printJsx("Select", v, selectSpec.defaults, selectSpec.controls).replace(/ \/>$/, ">");
    return `${open}\n${TERMS.map((t) => `  <option>${t}</option>`).join("\n")}\n</Select>`;
  },
  sections: [
    {
      title: "Sizes",
      render: () => (
        <Stage bg="raised">
          <Stack gap="lg" style={{ width: 200 }}>
            {CONTROL_SIZES.map((s) => (
              <Labeled key={s} name={`size="${s}"`}>
                <TermSelect size={s} />
              </Labeled>
            ))}
          </Stack>
        </Stage>
      ),
    },
    {
      title: "States",
      render: () => (
        <Stage bg="raised">
          <Grid columns={3} gap="xl" style={{ width: "100%", maxWidth: 600 }}>
            <Labeled name="invalid">
              <TermSelect invalid />
            </Labeled>
            <Labeled name="disabled">
              <TermSelect disabled />
            </Labeled>
            <Labeled name="shadow">
              <TermSelect shadow />
            </Labeled>
          </Grid>
        </Stage>
      ),
    },
  ],
};

/* ── Checkbox · Radio · Switch ───────────────────────────────────────── */

type Toggle = typeof Checkbox;

/** 세 토글이 같이 쓰는 표본 — 켜진 색은 고르지 않고 바깥 Paint 를 따릅니다 */
function colorSection(Toggle: Toggle): Section {
  return {
    title: "켜진 색",
    note: "토글은 accent 를 고르지 않습니다. 켜진 색은 검정이고, 색이 있는 Paint 안에 놓이면 다른 요소처럼 그 색을 따릅니다.",
    render: () => (
      <Stage bg="raised">
        <Toggle defaultChecked>바깥에 Paint 없음</Toggle>
        <Paint accent="green" variant="plain" paddingX="md" paddingY="xs">
          <Toggle defaultChecked>초록 Paint 안</Toggle>
        </Paint>
        <Paint accent="pink" variant="plain" paddingX="md" paddingY="xs">
          <Toggle defaultChecked>분홍 Paint 안</Toggle>
        </Paint>
      </Stage>
    ),
  };
}

function statesSection(Toggle: Toggle): Section {
  return {
    title: "States",
    note: "누르는 자리가 글자까지 넓어서 글자를 눌러도 켜지고 꺼집니다. disabled 는 표식과 글자가 함께 흐려지고 눌리지 않습니다.",
    render: () => (
      <Stage bg="raised">
        <Toggle>꺼짐</Toggle>
        <Toggle defaultChecked>켜짐</Toggle>
        <Toggle disabled>disabled</Toggle>
        <Toggle disabled defaultChecked>
          disabled · 켜짐
        </Toggle>
      </Stage>
    ),
  };
}

const checkbox: Spec = {
  name: "Checkbox",
  summary: "여러 개 중 여럿을 고르는 표식입니다. 켜지면 검정으로 꽉 차고 체크가 섭니다(색이 있는 Paint 안에서는 그 색). 폼 · 키보드 · 스크린 리더는 native checkbox 가 맡고 생김새만 funky 입니다.",
  controls: {
    disabled: { kind: "boolean" },
    defaultChecked: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { defaultChecked: true, children: "공강인 친구만 보기" },
  defaults: { disabled: false, defaultChecked: false },
  // defaultChecked 가 바뀌면 다시 세워서 새 처음 값이 반영되게 합니다
  render: (v) => (
    <Checkbox key={String(v.defaultChecked)} disabled={Boolean(v.disabled)} defaultChecked={Boolean(v.defaultChecked)}>
      {String(v.children ?? "")}
    </Checkbox>
  ),
  sections: [colorSection(Checkbox), statesSection(Checkbox)],
};

const RADIO_OPTIONS = [
  ["keep", "유지"],
  ["move", "이동"],
  ["drop", "드랍"],
] as const;

/** 같은 name 으로 묶인 라디오 셋 — name 은 인스턴스마다 달라야 해서 useId 로 만듭니다 */
function RadioGroupDemo({ disabled }: { disabled: boolean }) {
  const name = useId();
  return (
    <Stack gap="md" align="start">
      {RADIO_OPTIONS.map(([value, text], i) => (
        <Radio key={value} name={name} value={value} disabled={disabled} defaultChecked={i === 0}>
          {text}
        </Radio>
      ))}
    </Stack>
  );
}

const radio: Spec = {
  name: "Radio",
  summary: "여럿 중 하나를 고르는 표식입니다. 모서리는 각진 채로, 켜지면 안에 검정 정사각형이 찍힙니다(색이 있는 Paint 안에서는 그 색). 같은 name 끼리 묶이고, 키보드는 native radio 그대로입니다.",
  controls: {
    disabled: { kind: "boolean" },
  },
  defaults: { disabled: false },
  render: (v) => <RadioGroupDemo disabled={Boolean(v.disabled)} />,
  // 하나만 찍으면 묶음이 안 보여서, 같은 name 의 셋을 찍습니다
  code: (v) =>
    RADIO_OPTIONS.map(([value, text], i) =>
      printJsx("Radio", { disabled: v.disabled, name: "action", value, ...(i === 0 ? { defaultChecked: true } : {}), children: text }, radio.defaults),
    ).join("\n"),
  sections: [colorSection(Radio), statesSection(Radio)],
};

const switchSpec: Spec = {
  name: "Switch",
  summary: "켜고 끄는 스위치입니다. 각진 트랙 위를 각진 손잡이가 건너가고, native checkbox 에 role=switch 를 붙였습니다. 켜진 트랙은 검정입니다(색이 있는 Paint 안에서는 그 색).",
  controls: {
    disabled: { kind: "boolean" },
    defaultChecked: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { defaultChecked: true, children: "급식 알림" },
  defaults: { disabled: false, defaultChecked: false },
  render: (v) => (
    <Switch key={String(v.defaultChecked)} disabled={Boolean(v.disabled)} defaultChecked={Boolean(v.defaultChecked)}>
      {String(v.children ?? "")}
    </Switch>
  ),
  sections: [colorSection(Switch), statesSection(Switch)],
};

/* ── Label ───────────────────────────────────────────────────────────── */

/** 이름표 + 입력 칸 한 쌍 — htmlFor 가 가리킬 id 는 인스턴스마다 달라야 해서 useId 로 만듭니다 */
function LabelDemo({ required, children }: { required: boolean; children: ReactNode }) {
  const id = useId();
  return (
    <Frame width={240}>
      <Stack gap="xs">
        <Label htmlFor={id} required={required}>
          {children}
        </Label>
        <Input id={id} placeholder="김예시" required={required} />
      </Stack>
    </Frame>
  );
}

/** 이름표 셋이 한 장에 — 칸 사이는 lg, 이름표와 칸 사이는 xs */
function FormSample() {
  const name = useId();
  const grade = useId();
  const memo = useId();
  return (
    <Stack gap="lg" style={{ width: "100%", maxWidth: 300 }}>
      <Stack gap="xs">
        <Label htmlFor={name} required>
          이름
        </Label>
        <Input id={name} placeholder="김예시" required />
      </Stack>
      <Stack gap="xs">
        <Label htmlFor={grade}>학년</Label>
        <Select id={grade} defaultValue="2">
          <option value="1">1학년</option>
          <option value="2">2학년</option>
          <option value="3">3학년</option>
        </Select>
      </Stack>
      <Stack gap="xs">
        <Label htmlFor={memo}>메모</Label>
        <Textarea id={memo} rows={3} placeholder="한 줄 소개" />
      </Stack>
    </Stack>
  );
}

const label: Spec = {
  name: "Label",
  summary:
    "폼 칸의 이름표입니다. overline 글자(10px · 900 · 대문자 · 약한 잉크)이고, required 를 주면 빨간 별표가 붙습니다. 별표는 스크린 리더에 숨겨지므로 입력 칸에도 required 를 줍니다.",
  controls: {
    required: { kind: "boolean" },
    children: { kind: "text" },
  },
  initial: { children: "이름" },
  defaults: { required: false },
  render: (v) => <LabelDemo required={Boolean(v.required)}>{String(v.children ?? "")}</LabelDemo>,
  code: (v) => {
    const required = v.required ? " required" : "";
    return `<Label htmlFor="name"${required}>${String(v.children ?? "")}</Label>\n<Input id="name"${required} />`;
  },
  sections: [
    {
      title: "폼 한 장",
      note: "이름표는 htmlFor 로 칸의 id 를 가리킵니다. 이름표와 칸 사이는 xs, 칸과 칸 사이는 lg 로 쌓았습니다.",
      render: () => (
        <Stage bg="raised">
          <FormSample />
        </Stage>
      ),
    },
  ],
};

export const ATOM_SPECS_MORE: Record<string, Spec> = {
  IconButton: iconButton,
  NavButton: navButton,
  Link: link,
  Code: codeSpec,
  Swatch: swatch,
  Wordmark: wordmark,
  Marquee: marquee,
  Spinner: spinner,
  Divider: divider,
  Input: input,
  Textarea: textarea,
  Select: selectSpec,
  Checkbox: checkbox,
  Radio: radio,
  Switch: switchSpec,
  Label: label,
};
