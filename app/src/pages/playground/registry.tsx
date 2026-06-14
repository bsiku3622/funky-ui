import type { ReactNode } from "react";
import {
  Button,
  Input,
  Tag,
  Badge,
  Text,
  Icon,
  Card,
  StatTile,
  Accordion,
  Tabs,
  Modal,
  Panel,
  Window,
  Toolbar,
  Toast,
  Checkbox,
  Radio,
  Switch,
  Select,
  Table,
} from "@studio-baeks/funky-ui";
import { MarkdownView } from "@studio-baeks/funky-ui/markdown";
import "@studio-baeks/funky-ui/markdown.css";
import { useState } from "react";

const MD_SAMPLE = `## 개요

**funky-ui** 마크다운 렌더러입니다. 인라인 \`code\` 와 [링크](#).

### 코드 블록

\`\`\`ts
const answer: number = 42;
\`\`\`

### 수식 (LaTeX)

인라인 $E = mc^2$ 과 블록 수식:

$$\\int \\sec x \\, dx = \\ln|\\sec x + \\tan x| + C$$

### 표

| 알고리즘 | 복잡도 |
|---|---|
| Merge sort | O(n log n) |
| Bubble sort | O(n²) |

> 인용구는 옅은 시안 면에 담깁니다.
`;

/* ── control + entry model ─────────────────────────────────────── */
export type Control =
  | { prop: string; type: "enum"; options: string[]; default: string }
  | { prop: string; type: "boolean"; default: boolean }
  | { prop: string; type: "text"; default: string };

export type Layer = "Atoms" | "Components" | "Foundations";

export interface Entry {
  id: string;
  name: string;
  layer: Layer;
  blurb: string;
  importName?: string;
  /** live render driven by current control props */
  render?: (props: Record<string, unknown>) => ReactNode;
  controls?: Control[];
  /** static showcases (variant matrices etc.) */
  gallery?: { title: string; node: ReactNode }[];
  /** code snippet for the current props */
  code?: (props: Record<string, unknown>) => string;
  /** compact preview for the index tile (falls back to render/gallery) */
  tile?: ReactNode;
}

const BUTTON_VARIANTS = ["primary", "secondary", "success", "warning", "danger", "info", "neutral", "ink"];
const ACCENTS = ["pink", "purple", "cyan", "yellow", "orange", "sky", "green", "red"];

const SelectDemo = () => {
  const [v, setV] = useState("ft3");
  return (
    <Select
      value={v}
      onChange={setV}
      options={[
        { value: "ft1", label: "FT-1 (단판)" },
        { value: "ft3", label: "FT-3" },
        { value: "ft5", label: "FT-5" },
        { value: "ft7", label: "FT-7" },
      ]}
    />
  );
};

/* ── components ─────────────────────────────────────────────────── */
const componentEntries: Entry[] = [
  {
    id: "button",
    name: "Button",
    layer: "Atoms",
    blurb: "단일 액션. 8 variant × 3 size. hover/active 시 그림자 속으로 눌린다.",
    importName: "Button",
    controls: [
      { prop: "variant", type: "enum", options: BUTTON_VARIANTS, default: "primary" },
      { prop: "size", type: "enum", options: ["sm", "md", "lg"], default: "md" },
      { prop: "children", type: "text", default: "Press me" },
    ],
    render: (p) => <Button variant={p.variant as never} size={p.size as never}>{p.children as string}</Button>,
    code: (p) => `<Button variant="${p.variant}" size="${p.size}">${p.children}</Button>`,
    gallery: [
      { title: "Variants", node: <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>{BUTTON_VARIANTS.map((v) => <Button key={v} variant={v as never}>{v}</Button>)}</div> },
      { title: "Sizes", node: <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Button size="sm">sm</Button><Button size="md">md</Button><Button size="lg">lg</Button></div> },
    ],
  },
  {
    id: "input",
    name: "Input",
    layer: "Atoms",
    blurb: "테두리 필드. 포커스 시 그림자가 솟는다(떠오름). leading/trailing 슬롯.",
    importName: "Input",
    controls: [
      { prop: "placeholder", type: "text", default: "Type here…" },
      { prop: "fullWidth", type: "boolean", default: false },
    ],
    render: (p) => <Input placeholder={p.placeholder as string} fullWidth={p.fullWidth as boolean} />,
    code: (p) => `<Input placeholder="${p.placeholder}"${p.fullWidth ? " fullWidth" : ""} />`,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    layer: "Atoms",
    blurb: "샤프한 박스 + 네온 체크. 그림자 없이 호버 시 옅은 틴트.",
    importName: "Checkbox",
    controls: [
      { prop: "label", type: "text", default: "I agree" },
      { prop: "defaultChecked", type: "boolean", default: true },
    ],
    render: (p) => <Checkbox label={p.label as string} defaultChecked={p.defaultChecked as boolean} />,
    code: (p) => `<Checkbox label="${p.label}"${p.defaultChecked ? " defaultChecked" : ""} />`,
    gallery: [{ title: "States", node: <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}><Checkbox label="off" /><Checkbox label="on" defaultChecked /><Checkbox label="disabled" disabled /></div> }],
  },
  {
    id: "radio",
    name: "Radio",
    layer: "Atoms",
    blurb: "샤프 사각 + 네온 채움(brutalist — 원형 아님). name 으로 그룹.",
    importName: "Radio",
    controls: [
      { prop: "label", type: "text", default: "option" },
      { prop: "defaultChecked", type: "boolean", default: false },
    ],
    render: (p) => <Radio name="demo" label={p.label as string} defaultChecked={p.defaultChecked as boolean} />,
    code: (p) => `<Radio name="group" label="${p.label}"${p.defaultChecked ? " defaultChecked" : ""} />`,
    gallery: [{ title: "Group", node: <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}><Radio name="g" label="one" defaultChecked /><Radio name="g" label="two" /><Radio name="g" label="three" /></div> }],
  },
  {
    id: "switch",
    name: "Switch",
    layer: "Atoms",
    blurb: "슬라이딩 토글. on 일 때 네온 그린. (Toggle alias 동일)",
    importName: "Switch",
    controls: [
      { prop: "label", type: "text", default: "Wi-Fi" },
      { prop: "defaultChecked", type: "boolean", default: true },
    ],
    render: (p) => <Switch label={p.label as string} defaultChecked={p.defaultChecked as boolean} />,
    code: (p) => `<Switch label="${p.label}"${p.defaultChecked ? " defaultChecked" : ""} />`,
    gallery: [{ title: "States", node: <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}><Switch label="off" /><Switch label="on" defaultChecked /><Switch label="disabled" disabled /></div> }],
  },
  {
    id: "table",
    name: "Table",
    layer: "Atoms",
    blurb: "테두리 데이터 표. sunken 헤더 + 3px 구분선 + zebra 행 + hover.",
    importName: "Table",
    gallery: [{ title: "Example", node: <Table><thead><tr><th>알고리즘</th><th>복잡도</th></tr></thead><tbody><tr><td>Merge sort</td><td>O(n log n)</td></tr><tr><td>Bubble sort</td><td>O(n²)</td></tr></tbody></Table> }],
  },
  {
    id: "select",
    name: "Select",
    layer: "Components",
    blurb: "커스텀 드롭다운. 외부클릭/Esc 닫기, ↑↓ 네비, Enter 선택.",
    importName: "Select",
    gallery: [{ title: "Demo", node: <SelectDemo /> }],
  },
  {
    id: "markdown",
    name: "MarkdownView",
    layer: "Components",
    blurb: "마크다운 + LaTeX 렌더러. @studio-baeks/funky-ui/markdown 서브패스(무거운 deps 분리).",
    importName: "MarkdownView",
    gallery: [{ title: "Demo (크림 위 — 실제 읽기 화면 맥락)", node: <div style={{ background: "var(--funky-bg)", padding: "1.75rem", border: "var(--funky-border)" }}><div style={{ maxWidth: "40rem" }}><MarkdownView math content={MD_SAMPLE} /></div></div> }],
  },
  {
    id: "tag",
    name: "Tag",
    layer: "Atoms",
    blurb: "작은 라벨 칩. neutral + 7 네온 색.",
    importName: "Tag",
    controls: [
      { prop: "color", type: "enum", options: ["neutral", ...ACCENTS], default: "cyan" },
      { prop: "children", type: "text", default: "tag" },
    ],
    render: (p) => <Tag color={p.color as never}>{p.children as string}</Tag>,
    code: (p) => `<Tag color="${p.color}">${p.children}</Tag>`,
    gallery: [{ title: "Colors", node: <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>{["neutral", ...ACCENTS].map((c) => <Tag key={c} color={c as never}>{c}</Tag>)}</div> }],
  },
  {
    id: "badge",
    name: "Badge",
    layer: "Atoms",
    blurb: "카운트/상태 핀. 기본 pink.",
    importName: "Badge",
    controls: [
      { prop: "color", type: "enum", options: ["neutral", ...ACCENTS], default: "pink" },
      { prop: "children", type: "text", default: "NEW" },
    ],
    render: (p) => <Badge color={p.color as never}>{p.children as string}</Badge>,
    code: (p) => `<Badge color="${p.color}">${p.children}</Badge>`,
    gallery: [{ title: "Colors", node: <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>{["neutral", ...ACCENTS].map((c) => <Badge key={c} color={c as never}>{c}</Badge>)}</div> }],
  },
  {
    id: "text",
    name: "Text",
    layer: "Atoms",
    blurb: "타이포 atom. heading · body · chrome 3 register.",
    importName: "Text",
    controls: [
      { prop: "variant", type: "enum", options: ["heading", "body", "chrome"], default: "heading" },
      { prop: "muted", type: "boolean", default: false },
      { prop: "children", type: "text", default: "The quick brown fox" },
    ],
    render: (p) => <Text variant={p.variant as never} muted={p.muted as boolean}>{p.children as string}</Text>,
    code: (p) => `<Text variant="${p.variant}"${p.muted ? " muted" : ""}>${p.children}</Text>`,
  },
  {
    id: "icon",
    name: "Icon",
    layer: "Atoms",
    blurb: "voice-neutral 정사각 슬롯. 아이콘 세트는 직접 주입.",
    importName: "Icon",
    gallery: [
      { title: "Sizes", node: <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>{[16, 24, 32].map((s) => <Icon key={s} size={s}>★</Icon>)}</div> },
    ],
  },
  {
    id: "card",
    name: "Card",
    layer: "Components",
    blurb: "껍데기 shell — 검정 테두리 + 하드 그림자 액자. 내용은 소비자가 채운다.",
    importName: "Card",
    gallery: [
      { title: "Padded", node: <div style={{ maxWidth: "20rem" }}><Card><Text variant="body">Cards carry the brutalist frame.</Text></Card></div> },
      { title: "Flush (padded={false}) — 테두리 없는 콘텐츠가 액자 끝까지", node: <div style={{ maxWidth: "20rem" }}><Card padded={false}><div style={{ background: "var(--funky-yellow)", padding: "var(--funky-space-xl)" }}><div className="funky-text funky-text--chrome">Flush</div><div style={{ fontWeight: 900, fontSize: "var(--funky-size-4xl)", lineHeight: 1, color: "var(--funky-ink)" }}>00</div></div></Card></div> },
    ],
  },
  {
    id: "stat-tile",
    name: "StatTile",
    layer: "Components",
    blurb: "완성형 통계 단위 — 네온 면 + 큰 검정 숫자.",
    importName: "StatTile",
    controls: [
      { prop: "color", type: "enum", options: ACCENTS, default: "cyan" },
      { prop: "label", type: "text", default: "Active students" },
      { prop: "value", type: "text", default: "357" },
      { prop: "hint", type: "text", default: "+12 this week" },
    ],
    render: (p) => <div style={{ maxWidth: "16rem" }}><StatTile color={p.color as never} label={p.label as string} value={p.value as string} hint={p.hint as string} /></div>,
    code: (p) => `<StatTile color="${p.color}" label="${p.label}" value="${p.value}" hint="${p.hint}" />`,
    gallery: [{ title: "Colors", node: <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))", gap: "0.75rem" }}>{ACCENTS.map((c) => <StatTile key={c} color={c as never} label={c} value="42" />)}</div> }],
  },
  {
    id: "accordion",
    name: "Accordion",
    layer: "Components",
    blurb: "compound — Accordion / .Item / .Header / .Panel.",
    importName: "Accordion",
    gallery: [
      {
        title: "Example",
        node: (
          <div style={{ maxWidth: "28rem" }}>
            <Accordion>
              <Accordion.Item defaultOpen>
                <Accordion.Header>Section one</Accordion.Header>
                <Accordion.Panel><Text variant="body">First panel content.</Text></Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Section two</Accordion.Header>
                <Accordion.Panel><Text variant="body">Second panel content.</Text></Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
        ),
      },
    ],
  },
  {
    id: "tabs",
    name: "Tabs",
    layer: "Components",
    blurb: "compound — Tabs / .List / .Trigger / .Panel. 제어/비제어.",
    importName: "Tabs",
    gallery: [
      {
        title: "Example",
        node: (
          <div style={{ maxWidth: "28rem" }}>
            <Tabs defaultValue="a">
              <Tabs.List>
                <Tabs.Trigger value="a">Overview</Tabs.Trigger>
                <Tabs.Trigger value="b">Detail</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Panel value="a"><Text variant="body">Overview panel.</Text></Tabs.Panel>
              <Tabs.Panel value="b"><Text variant="body">Detail panel.</Text></Tabs.Panel>
            </Tabs>
          </div>
        ),
      },
    ],
  },
  {
    id: "modal",
    name: "Modal",
    layer: "Components",
    blurb: "오버레이 — 트리거로 열고 닫는다.",
    importName: "Modal",
    gallery: [{ title: "Example", node: <ModalDemo /> }],
  },
  {
    id: "panel",
    name: "Panel",
    layer: "Components",
    blurb: "영역을 나누는 구조 프리미티브 — 3px 테두리 + 하드 그림자 + uppercase 헤더바. 얇은 선 대신 이걸로 끊는다.",
    importName: "Panel",
    controls: [
      { prop: "color", type: "enum", options: ["ink", "neutral", ...ACCENTS], default: "ink" },
      { prop: "title", type: "text", default: "Filters" },
      { prop: "children", type: "text", default: "패널 본문" },
    ],
    render: (p) => <div style={{ maxWidth: "22rem" }}><Panel color={p.color as never} title={p.title as string}>{p.children as string}</Panel></div>,
    code: (p) => `<Panel color="${p.color}" title="${p.title}">${p.children}</Panel>`,
    gallery: [{ title: "Header colors", node: <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))", gap: "0.75rem" }}>{["ink", "pink", "cyan", "yellow"].map((c) => <Panel key={c} color={c as never} title={c}><Text variant="body">본문</Text></Panel>)}</div> }],
  },
  {
    id: "window",
    name: "Window",
    layer: "Components",
    blurb: "신호등 dots 타이틀바가 달린 macOS풍 프레임. 코드·미리보기·export 샷 래퍼.",
    importName: "Window",
    controls: [
      { prop: "title", type: "text", default: "App.tsx" },
    ],
    render: (p) => <div style={{ maxWidth: "22rem" }}><Window title={p.title as string}><Text variant="body">window body</Text></Window></div>,
    code: (p) => `<Window title="${p.title}">…</Window>`,
    gallery: [{ title: "Example", node: <div style={{ maxWidth: "22rem" }}><Window title="App.tsx"><Text variant="body">신호등 dots + 3px 프레임 + lg 그림자.</Text></Window></div> }],
  },
  {
    id: "toolbar",
    name: "Toolbar",
    layer: "Components",
    blurb: "도구 화면 상단 가로 컨트롤 바. Group으로 묶고 Spacer로 우측 정렬. ToolShell의 toolbar 슬롯.",
    importName: "Toolbar",
    gallery: [
      {
        title: "Groups + Spacer",
        node: (
          <Toolbar>
            <Toolbar.Group>
              <Button size="sm">Open</Button>
              <Button size="sm">Save</Button>
            </Toolbar.Group>
            <Toolbar.Spacer />
            <Toolbar.Group><Button size="sm" variant="primary">Export</Button></Toolbar.Group>
          </Toolbar>
        ),
      },
    ],
  },
  {
    id: "toast",
    name: "Toast",
    layer: "Components",
    blurb: "검정 면 + 크림 글자(또는 네온) 알림 박스. 표시만 담당, 상태는 소비자가.",
    importName: "Toast",
    controls: [
      { prop: "color", type: "enum", options: ["ink", ...ACCENTS], default: "ink" },
      { prop: "children", type: "text", default: "Saved ✓" },
    ],
    render: (p) => <Toast color={p.color as never}>{p.children as string}</Toast>,
    code: (p) => `<Toast color="${p.color}">${p.children}</Toast>`,
    gallery: [{ title: "Colors", node: <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>{["ink", "green", "pink", "cyan"].map((c) => <Toast key={c} color={c as never}>{c}</Toast>)}</div> }],
  },
];

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="ink" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header onClose={() => setOpen(false)}>Hello</Modal.Header>
        <Modal.Body><Text variant="body">A loud little modal.</Text></Modal.Body>
        <Modal.Footer>
          <Button variant="neutral" onClick={() => setOpen(false)}>Close</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

/* ── foundations (token galleries) ─────────────────────────────── */
const Swatch = ({ name, varName }: { name: string; varName: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
    <div style={{ width: "100%", height: "4.5rem", background: `var(${varName})`, border: "var(--funky-border)", boxShadow: "var(--funky-shadow-sm)" }} />
    <span style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: "var(--funky-size-2xs)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{name}</span>
    <code style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6875rem", color: "var(--funky-ink-muted)" }}>{varName}</code>
  </div>
);

const foundationEntries: Entry[] = [
  {
    id: "color",
    name: "Color",
    layer: "Foundations",
    blurb: "surface(크림) · ink(검정) · 8 네온 accent. variant 4종(solid/soft/outline/ghost).",
    tile: (
      <div style={{ display: "flex", gap: "0.4rem" }}>
        {["pink", "cyan", "yellow", "purple", "green"].map((c) => (
          <div key={c} style={{ width: "2.2rem", height: "2.2rem", background: `var(--funky-${c})`, border: "var(--funky-border)", boxShadow: "var(--funky-shadow-sm)" }} />
        ))}
      </div>
    ),
    gallery: [
      { title: "Accents", node: <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>{ACCENTS.map((c) => <Swatch key={c} name={c} varName={`--funky-${c}`} />)}</div> },
      { title: "Surface & ink", node: <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>{[["bg", "--funky-bg"], ["surface", "--funky-surface"], ["sunken", "--funky-sunken"], ["ink", "--funky-ink"]].map(([n, v]) => <Swatch key={n} name={n} varName={v} />)}</div> },
    ],
  },
  {
    id: "shadow",
    name: "Shadow",
    layer: "Foundations",
    blurb: "하드 오프셋 솔리드 (blur 0). 시그니처.",
    tile: <div style={{ width: "4.5rem", height: "4.5rem", background: "var(--funky-surface)", border: "var(--funky-border)", boxShadow: "var(--funky-shadow-md)" }} />,
    gallery: [
      { title: "Ladder", node: <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>{["sm", "md", "lg"].map((s) => <div key={s} style={{ width: "6rem", height: "6rem", background: "var(--funky-surface)", border: "var(--funky-border)", boxShadow: `var(--funky-shadow-${s})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--funky-font-family)", fontWeight: 900, textTransform: "uppercase" }}>{s}</div>)}</div> },
    ],
  },
  {
    id: "typography",
    name: "Typography",
    layer: "Foundations",
    blurb: "Pretendard · weight 400/500/700/900 · rem ladder (2xs → 4xl) · role 합성.",
    tile: <span style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: "3.5rem", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1 }}>Aa</span>,
    gallery: [
      { title: "Scale", node: <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>{["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"].map((s) => <div key={s} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}><code style={{ width: "3rem", fontSize: "0.6875rem", color: "var(--funky-ink-muted)" }}>{s}</code><span style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: `var(--funky-size-${s})` }}>Funky</span></div>)}</div> },
      { title: "Roles", node: <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>{["display", "heading", "title", "body", "caption", "chrome", "overline", "code"].map((r) => <div key={r} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}><code style={{ width: "5rem", flex: "0 0 auto", fontSize: "0.6875rem", color: "var(--funky-ink-muted)" }}>{r}</code><span className={`funky-text funky-text--${r}`}>Funky UI</span></div>)}</div> },
    ],
  },
  {
    id: "space",
    name: "Space",
    layer: "Foundations",
    blurb: "내부 padding/gap 스케일 (xs → 2xl).",
    tile: (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", alignItems: "flex-start" }}>
        {["sm", "lg", "2xl"].map((s) => (
          <div key={s} style={{ height: "0.85rem", width: `calc(var(--funky-space-${s}) * 2)`, background: "var(--funky-primary)", border: "var(--funky-border)" }} />
        ))}
      </div>
    ),
    gallery: [
      { title: "Ladder", node: <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>{["xs", "sm", "md", "lg", "xl", "2xl"].map((s) => <div key={s} style={{ display: "flex", gap: "1rem", alignItems: "center" }}><code style={{ width: "3rem", fontSize: "0.6875rem", color: "var(--funky-ink-muted)" }}>{s}</code><div style={{ height: "1.25rem", width: `var(--funky-space-${s})`, background: "var(--funky-primary)", border: "var(--funky-border)" }} /></div>)}</div> },
    ],
  },
  {
    id: "motion",
    name: "Motion",
    layer: "Foundations",
    blurb: "duration 100ms · ease-out. 두 archetype — 눌림(press)과 떠오름(lift).",
    tile: (
      <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
        <div className="funky-pressable" style={{ width: "2.4rem", height: "2.4rem", background: "var(--funky-primary)", border: "var(--funky-border)", boxShadow: "var(--funky-shadow-sm)" }} />
        <div className="funky-liftable" style={{ width: "2.4rem", height: "2.4rem", background: "var(--funky-surface)", border: "var(--funky-border)" }} />
      </div>
    ),
    gallery: [
      { title: "눌림 (press) — rest 에 그림자, 누르면 그림자 속으로", node: <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}><Button variant="primary">Hover · Active</Button><Button>눌러보세요</Button></div> },
      { title: "떠오름 (lift) — rest 납작, focus 시 그림자 솟음", node: <div style={{ maxWidth: "22rem" }}><Input placeholder="포커스해보세요" fullWidth /></div> },
      { title: "시간 스케일 (duration · stagger)", node: <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>{[["snap", "100ms", "미세 피드백 (press/lift)"], ["base", "180ms", "상태 전환 · overlay"], ["slow", "300ms", "reveal · entrance"], ["stagger", "60ms", "순차 reveal 간격"]].map(([k, val, d]) => <div key={k} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}><code style={{ width: "4rem", flex: "0 0 auto", fontSize: "0.6875rem", color: "var(--funky-ink-muted)" }}>{k}</code><span style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, width: "4rem", flex: "0 0 auto" }}>{val}</span><span style={{ fontFamily: "var(--funky-font-family)", fontSize: "var(--funky-size-sm)", color: "var(--funky-ink-muted)" }}>{d}</span></div>)}</div> },
    ],
  },
];

export const ENTRIES: Entry[] = [...foundationEntries, ...componentEntries];

export const findEntry = (id: string) => ENTRIES.find((e) => e.id === id);

export const LAYER_ORDER: Layer[] = ["Foundations", "Atoms", "Components"];
