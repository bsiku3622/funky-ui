/** Foundations › Typography · Shape · Layout · Motion — 원본 숫자 → 역할 → 실제 표본 */
import { Badge, Box, Button, Card, Floating, Grid, Inline, Input, SegmentedControl, Stack, Surface, Swatch, Text, surfaceClass } from "@studio-baeks/funky-ui";
import {
  BADGE,
  BADGE_SIZES,
  BREAKPOINT,
  CONTAINER,
  CONTROL,
  CONTROL_SIZES,
  CONTROL_TEXT,
  DURATION,
  EASING,
  ELEVATION,
  ENTER,
  FOCUS_RING,
  FONT_FAMILY,
  ICON,
  ICON_MOTION,
  LIFT,
  PRESS,
  RADIUS,
  SPACE,
  STROKE,
  TEXT_ROLES,
  TEXT_VARIANTS,
  WEIGHT,
  Z,
  type EnterMotion,
} from "@studio-baeks/funky-ui/tokens";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

import { PageHead, Section, Stage } from "../kit";
import * as k from "../kit.css";

function Table({ head, rows }: { head: string[]; rows: (string | number | ReactNode)[][] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className={k.table}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className={k.th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={k.td}>
                  {typeof c === "string" || typeof c === "number" ? <span className={k.mono}>{c}</span> : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TypographyPage() {
  return (
    <div>
      <PageHead
        layer="foundations · 1"
        title="Typography"
        summary="Pretendard Variable 하나. 본문도 700, 구조 라벨은 900 — funky 의 글자는 두껍습니다. 크기 사다리 아홉에 class-explorer 가 가장 많이 반복한 구조 라벨 둘(overline · subtitle)을 더한 열한 역할입니다. 사다리의 맨 위 hero 만 폭에 따라 커집니다."
      />
      <Section title="글자 역할" note="태그(as)와 생김새(variant)는 따로 고릅니다. 줄 높이는 px 고정값입니다.">
        <Card padding="0">
          {TEXT_VARIANTS.map((v, i) => {
            const r = TEXT_ROLES[v];
            return (
              <Box key={v} paddingX="3xl" paddingY="xl" style={{ borderTop: i ? "2px solid rgba(0,0,0,0.1)" : undefined }}>
                <Grid columns="160px minmax(0, 1fr)" gap="xl" align="center">
                  <Stack gap="2xs">
                    <Text variant="caption" weight="black">
                      {v}
                    </Text>
                    <span className={k.mono}>
                      {r.size}/{r.leading} · {WEIGHT[r.weight]}
                      {r.tracking ? ` · ${r.tracking}em` : ""}
                      {"uppercase" in r && r.uppercase ? " · UPPER" : ""}
                      {"md" in r && r.md ? ` · md↑ ${r.md.size}/${r.md.leading}` : ""}
                    </span>
                  </Stack>
                  <Text variant={v} truncate>
                    {v === "overline" || v === "subtitle" ? "Curriculum Progress" : "오늘 수업 · Today's Classes 1234"}
                  </Text>
                </Grid>
              </Box>
            );
          })}
        </Card>
      </Section>
      <Section title="컨트롤 글자" note="Button · Badge 의 글자. 크기마다 하나, 전부 900 대문자이고 작을수록 자간이 넓습니다.">
        <Table
          head={["size", "font", "tracking", "sample"]}
          rows={CONTROL_SIZES.map((s) => [s, `${CONTROL_TEXT[s].size}px`, `${CONTROL_TEXT[s].tracking}em`, <Button size={s}>Refetch 다시</Button>])}
        />
      </Section>
      <Section title="서체">
        <Table head={["family", "stack"]} rows={Object.entries(FONT_FAMILY).map(([k2, v]) => [k2, v])} />
        <Table head={["weight", "value"]} rows={Object.entries(WEIGHT).map(([k2, v]) => [k2, v])} />
      </Section>
    </div>
  );
}

export function ShapePage() {
  return (
    <div>
      <PageHead layer="foundations · 2" title="Shape" summary="요소 하나의 형태 — 선 굵기 · 모서리 · 컨트롤 크기 · 안쪽 여백 · 포커스 링. 빈 캔버스에 그 요소 하나만 놓아도 남는 것이 Shape 입니다." />
      <Section title="선과 모서리" note="모든 면의 테두리는 2px 하나입니다. rail 4px 은 목록의 왼쪽 띠. 모서리는 0 — full 은 원이어야 뜻이 서는 스피너 · 점에만.">
        <Table head={["token", "value"]} rows={[["stroke.base", `${STROKE.base}px`], ["stroke.rail", `${STROKE.rail}px`], ["radius.none", RADIUS.none], ["radius.full", RADIUS.full], ["focus ring", `${FOCUS_RING.width}px · offset ${FOCUS_RING.offset}px`]]} />
      </Section>
      <Section title="컨트롤 사다리" note="높이가 원본이고, 좌우 여백 · 아이콘 · 간격은 그 높이에 맞춘 값입니다. 같은 크기의 Button · Input 은 같은 높이입니다.">
        <Table
          head={["size", "height", "inset", "gap", "icon", "Button", "Input"]}
          rows={CONTROL_SIZES.map((s) => [s, CONTROL.height[s], CONTROL.inset[s], CONTROL.gap[s], CONTROL.icon[s], <Button size={s} icon={Sparkles}>Ask</Button>, <Input size={s} placeholder="이름" style={{ width: 140 }} />])}
        />
      </Section>
      <Section title="배지 · 아이콘">
        <Table head={["badge", "height", "inset", "font", "sample"]} rows={BADGE_SIZES.map((s) => [s, BADGE.height[s], BADGE.inset[s], BADGE.font[s], <Badge size={s} variant="filled">이 기기</Badge>])} />
        <Table head={["icon", "px"]} rows={Object.entries(ICON).map(([n, v]) => [n, v])} />
      </Section>
    </div>
  );
}

export function LayoutPage() {
  return (
    <div>
      <PageHead layer="foundations · 3" title="Layout" summary="요소 사이의 관계 — 간격 · 깊이 · breakpoint · 폭. 안쪽 여백과 형제 사이가 같은 사다리를 씁니다." />
      <Section title="간격 사다리">
        <Card padding="xl">
          <Stack gap="md">
            {Object.entries(SPACE).map(([name, v]) => (
              <Inline key={name} gap="xl">
                <span className={k.mono} style={{ width: 60 }}>
                  {name}
                </span>
                <span className={k.mono} style={{ width: 40 }}>
                  {v}px
                </span>
                <span style={{ width: v, height: 14, background: "#000" }} />
              </Inline>
            ))}
          </Stack>
        </Card>
      </Section>
      <Section
        title="깊이 — 그림자는 두 단뿐"
        note="계측에서 서로 다른 그림자 값이 33개였습니다. 이제 떠 있는 물건은 4px, 모달만 6px 입니다. blur 는 언제나 0."
      >
        <Stage bg="canvas">
          {(["raised", "floating"] as const).map((e) => (
            <Surface key={e} border="line" shadow={e} padding="3xl" style={{ width: 200 }}>
              <Text variant="caption" weight="black">
                {e} · {ELEVATION[e].offset}px
              </Text>
            </Surface>
          ))}
        </Stage>
        <Table head={["layer", "z"]} rows={Object.entries(Z).map(([n, v]) => [n, v])} />
        <Text as="p" variant="caption" tone="muted" style={{ margin: 0 }}>
          모달은 native {"<dialog>"} 의 top layer 가 맡아서 z 값이 없습니다 — class-explorer 의 z-50 ~ z-1100 이 여기서 정리됩니다.
        </Text>
      </Section>
      <Section title="Breakpoint · 폭">
        <Table head={["breakpoint", "px"]} rows={Object.entries(BREAKPOINT).map(([n, v]) => [n, v])} />
        <Table
          head={["container", "px"]}
          rows={[["prose", CONTAINER.prose], ...Object.entries(CONTAINER.dialog).map(([n, v]) => [`dialog.${n}`, v]), ...Object.entries(CONTAINER.shell).map(([n, v]) => [`shell.${n}`, v])]}
        />
      </Section>
    </div>
  );
}

const GRADES = [
  { value: "1", label: "1학년" },
  { value: "2", label: "2학년" },
  { value: "3", label: "3학년" },
] as const;

/** 고르는 줄 둘 — 그림자 위에 뜬 칸(위)과 평평한 칩(아래). 골린 칸은 둘 다 커집니다 */
function GrowDemo() {
  const [a, setA] = useState<string>("2");
  const [b, setB] = useState<string>("2");
  return (
    <Stack gap="xl" align="center">
      <SegmentedControl aria-label="그림자 줄" options={GRADES} value={a} onChange={setA} variant="outline" shadow gap="md" />
      <SegmentedControl aria-label="평평한 줄" options={GRADES} value={b} onChange={setB} />
    </Stack>
  );
}

/** 등장 몸짓 — 누를 때마다 판이 새로 나타납니다. 닫을 때는 움직이지 않습니다 */
function EnterButton({ enter }: { enter: EnterMotion }) {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLSpanElement>(null);
  return (
    <span ref={anchor} style={{ display: "inline-flex" }}>
      <Button variant="outline" shadow selected={open} onClick={() => setOpen((o) => !o)}>
        {enter}
      </Button>
      {open && (
        <Floating anchor={anchor} enter={enter} onDismiss={() => setOpen(false)} padding="xl" className={surfaceClass({ border: "line", shadow: "raised" })}>
          <Text variant="label">{enter} 로 나타났습니다</Text>
        </Floating>
      )}
    </span>
  );
}

export function MotionPage() {
  return (
    <div>
      <PageHead
        layer="foundations · 4"
        title="Motion"
        summary="시그니처는 눌림입니다 — 떠 있는 물건이 hover 때 그림자 자리로 가라앉습니다. 가라앉는 거리는 그림자 거리와 같습니다(4px). 움직임을 줄인 사람에게는 이동을 멈추고 색과 포커스 링만 남깁니다."
      />
      <Section
        title="누르는 몸짓 — sink · raise · lift · tap · shrink · still"
        note="sink — 그림자를 켠 버튼 · 사람 카드. raise — 평평한 칩(hover 때 제자리에서 그림자가 올라옵니다). lift — 탐색 카드(위로 4px, 그림자는 화면에 그대로 남아 길어집니다). tap — 그림자를 끈 버튼. shrink — Ask 단추(그림자를 둔 채 hover 때 95%, 누르면 92%). still — 그림자를 둔 채 움직이지 않는 칸(밖에서 켠 상태 · 꺼진 칸, Button 의 shadow=static). 몸짓이 없는 누르는 물건(목록 줄)은 none 입니다."
      >
        <Stage bg="canvas">
          <Button shadow variant="solid" accent="cyan">
            sink
          </Button>
          <Button shadow="hover" variant="outline">
            raise
          </Button>
          <Button variant="outline">tap</Button>
          <Button shadow="shrink" variant="paper">
            shrink
          </Button>
          <Button shadow="static" variant="paper">
            still
          </Button>
          <Card motion="sink" padding="xl" style={{ width: 180 }}>
            <Text variant="caption" weight="black">
              sink card
            </Text>
          </Card>
          <Card motion="lift" padding="xl" style={{ width: 180 }}>
            <Text variant="caption" weight="black">
              lift card
            </Text>
          </Card>
        </Stage>
        <Table head={["token", "value"]} rows={[["press.sink", `${PRESS.sink}px`], ["press.activeScale", PRESS.activeScale], ["press.shrink", PRESS.shrink], ["press.shrinkActive", PRESS.shrinkActive], ["lift.rise", `${LIFT.rise}px`]]} />
      </Section>
      <Section
        title="커짐 — 골라진 칸"
        note="골라진 칸은 가라앉지 않고 105% 로 커져 이웃 위에 서고 4px 그림자 위에 섭니다 — 쉴 때 평평하던 칩도 같습니다. hover 때는 제자리에서 그림자만 숨고, 누르면 100% 로 돌아옵니다. Selectable 의 grow 이고, 함께 쓰는 몸짓을 덮습니다."
      >
        <Stage bg="canvas">
          <GrowDemo />
        </Stage>
        <Table head={["token", "value"]} rows={[["press.grow", PRESS.grow]]} />
      </Section>
      <Section
        title="등장 — rise · pop · fade · panel · sheet"
        note="새로 나타나는 판이 같이 씁니다. rise 는 메뉴 · 툴팁, pop 은 모달, fade 는 펼친 아코디언 본문입니다. panel 은 앱이 만든 작은 창(8px 아래에서 96% 로 시작하는 Ask 데스크탑 창)이고, sheet 는 화면을 덮는 판(24px 아래에서 올라오는 Ask 모바일 판)입니다. 앱이 직접 그리는 판에는 enterClass 를 빌려 씁니다. 눌러서 열어 보세요. 퇴장은 없습니다 — 닫는 모션을 보이려면 판을 그 시간만큼 더 들고 있어야 하는데, 그사이 한 번 더 누르면 판 뒤의 화면이 눌립니다."
      >
        <Stage bg="canvas">
          {(Object.keys(ENTER) as (keyof typeof ENTER)[]).map((name) => (
            <EnterButton key={name} enter={name} />
          ))}
        </Stage>
        <Table
          head={["enter", "거리", "시작 크기", "시간"]}
          rows={Object.entries(ENTER).map(([n, v]) => [n, `${v.distance}px`, "scale" in v ? v.scale : "—", `${v.duration} · ${DURATION[v.duration]}ms`])}
        />
      </Section>
      <Section
        title="깜빡임 · 아이콘 몸짓"
        note="pulse 는 불러오는 동안의 깜빡임입니다 — 2초 주기로 투명도가 100% 와 50% 사이를 오가고, Text 의 pulse 와 Swatch 의 pulse 가 같이 씁니다. 아이콘 몸짓은 바깥 버튼 · 링크에 마우스를 올릴 때 아이콘만 움직입니다 — turn 은 -45° 돌고 nudge 는 2px 밀립니다. 아이콘 spin 은 제자리에서 계속 돕니다. 모두 움직임을 줄인 사람에게는 멈춥니다."
      >
        <Stage bg="canvas">
          <Text pulse>Loading…</Text>
          <Swatch accent="green" shape="round" pulse />
          <Button variant="outline" shadow icon={Sparkles} iconMotion="turn">
            turn
          </Button>
          <Button variant="outline" shadow iconEnd={ArrowRight} iconMotion="nudge">
            nudge
          </Button>
          <Button variant="outline" shadow icon={RefreshCw} iconSpin>
            spin
          </Button>
        </Stage>
        <Table head={["token", "value"]} rows={[["duration.pulse", `${DURATION.pulse}ms`], ["iconMotion.turn", `${ICON_MOTION.turn}°`], ["iconMotion.nudge", `${ICON_MOTION.nudge}px`]]} />
      </Section>
      <Section title="시간 · 곡선" note="crawl 700ms 는 시간선 위 캐럿처럼 연속으로 움직이는 위치에만 씁니다.">
        <Table head={["duration", "ms"]} rows={Object.entries(DURATION).map(([n, v]) => [n, v])} />
        <Table head={["easing", "value"]} rows={Object.entries(EASING).map(([n, v]) => [n, v])} />
      </Section>
    </div>
  );
}
