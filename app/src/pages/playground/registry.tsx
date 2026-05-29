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
} from "@studio-baeks/funky-ui";
import { useState } from "react";

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
const ACCENTS = ["pink", "purple", "cyan", "yellow", "orange", "sky", "green"];

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
    blurb: "테두리 필드. 포커스 시 그림자 속으로 눌린다. leading/trailing 슬롯.",
    importName: "Input",
    controls: [
      { prop: "placeholder", type: "text", default: "Type here…" },
      { prop: "fullWidth", type: "boolean", default: false },
    ],
    render: (p) => <Input placeholder={p.placeholder as string} fullWidth={p.fullWidth as boolean} />,
    code: (p) => `<Input placeholder="${p.placeholder}"${p.fullWidth ? " fullWidth" : ""} />`,
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
      { title: "Flush (padded={false})", node: <div style={{ maxWidth: "20rem" }}><Card padded={false}><StatTile color="yellow" label="Flush" value="00" /></Card></div> },
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
    blurb: "surface(크림) · ink(검정) · 7 네온 accent.",
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
    id: "type",
    name: "Type",
    layer: "Foundations",
    blurb: "Pretendard · weight 500/700/900 · rem ladder (2xs → 4xl).",
    tile: <span style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: "3.5rem", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1 }}>Aa</span>,
    gallery: [
      { title: "Scale", node: <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>{["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"].map((s) => <div key={s} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}><code style={{ width: "3rem", fontSize: "0.6875rem", color: "var(--funky-ink-muted)" }}>{s}</code><span style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: `var(--funky-size-${s})` }}>Funky</span></div>)}</div> },
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
];

export const ENTRIES: Entry[] = [...foundationEntries, ...componentEntries];

export const findEntry = (id: string) => ENTRIES.find((e) => e.id === id);

export const LAYER_ORDER: Layer[] = ["Foundations", "Atoms", "Components"];
