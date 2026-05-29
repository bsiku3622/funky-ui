import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Text } from "@studio-baeks/funky-ui";
import { SiteTopbar } from "../../chrome";
import { ENTRIES, LAYER_ORDER, findEntry } from "./registry";
import type { Control, Entry } from "./registry";

/* ── sidebar (matches the docs sidebar) ─────────────────────────── */
const SidebarLink = ({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "0.4rem 0.6rem",
      border: "2px solid transparent",
      background: active ? "var(--funky-ink)" : "transparent",
      color: active ? "var(--funky-ink-inverse)" : "rgba(0,0,0,0.7)",
      fontFamily: "var(--funky-font-family)",
      fontWeight: active ? 900 : 700,
      fontSize: "0.8125rem",
      cursor: "pointer",
    }}
  >
    {title}
  </button>
);

const Sidebar = ({ activeId }: { activeId: string }) => {
  const navigate = useNavigate();
  return (
    <aside className="docs-sidebar">
      <div style={{ marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
        <SidebarLink title="All" active={activeId === ""} onClick={() => navigate("/playground")} />
      </div>
      {LAYER_ORDER.map((layer) => (
        <div key={layer} style={{ marginBottom: "1.25rem" }}>
          <p style={{ margin: "0 0 0.5rem 0.6rem", fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(0,0,0,0.4)" }}>
            {layer}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
            {ENTRIES.filter((e) => e.layer === layer).map((e) => (
              <SidebarLink
                key={e.id}
                title={e.name}
                active={e.id === activeId}
                onClick={() => navigate(`/playground/${e.id}`)}
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};

const Stage = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "10rem",
      padding: "2rem",
      background: "var(--funky-surface)",
      border: "var(--funky-border)",
      boxShadow: "var(--funky-shadow-sm)",
    }}
  >
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <Text variant="chrome" muted style={{ display: "block", marginBottom: "0.75rem" }}>{children}</Text>
);

/* ── index: tile grid ──────────────────────────────────────────── */
const previewOf = (e: Entry): ReactNode => {
  if (e.tile) return e.tile;
  if (e.render && e.controls) {
    const defaults = Object.fromEntries(e.controls.map((c) => [c.prop, c.default]));
    return e.render(defaults);
  }
  return e.gallery?.[0]?.node ?? <Text variant="chrome" muted>{e.name}</Text>;
};

const Index = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <h1 className="site-display site-display--lg">Playground</h1>
        <Text variant="body" muted>14 components · 4 token foundations. 클릭해서 살펴보세요.</Text>
      </div>
      {LAYER_ORDER.map((layer) => (
        <div key={layer}>
          <SectionTitle>{layer}</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))", gap: "1rem" }}>
            {ENTRIES.filter((e) => e.layer === layer).map((e) => (
              <div
                key={e.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/playground/${e.id}`)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    navigate(`/playground/${e.id}`);
                  }
                }}
                style={{
                  textAlign: "left",
                  background: "var(--funky-surface)",
                  border: "var(--funky-border)",
                  boxShadow: "var(--funky-shadow-sm)",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              >
                <div style={{ height: "9rem", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderBottom: "var(--funky-border)" }}>
                  <div style={{ transform: "scale(0.9)" }}>{previewOf(e)}</div>
                </div>
                <div style={{ padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Text variant="body" style={{ fontWeight: 700 }}>{e.name}</Text>
                  <code style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6875rem", color: "var(--funky-ink-muted)" }}>{e.id}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── detail: controls + live + code + gallery ──────────────────── */
const ControlField = ({ control, value, onChange }: { control: Control; value: unknown; onChange: (v: unknown) => void }) => {
  if (control.type === "enum") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <Text variant="chrome" muted>{control.prop}</Text>
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          {control.options.map((opt) => (
            <Button key={opt} size="sm" variant={value === opt ? "ink" : "neutral"} onClick={() => onChange(opt)}>{opt}</Button>
          ))}
        </div>
      </div>
    );
  }
  if (control.type === "boolean") {
    return (
      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--funky-font-family)", fontWeight: 700, fontSize: "0.8125rem" }}>
        <input type="checkbox" checked={value as boolean} onChange={(e) => onChange(e.target.checked)} style={{ width: "1.1rem", height: "1.1rem" }} />
        {control.prop}
      </label>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <Text variant="chrome" muted>{control.prop}</Text>
      <Input fullWidth value={value as string} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

const Detail = ({ entry }: { entry: Entry }) => {
  const navigate = useNavigate();
  const [props, setProps] = useState<Record<string, unknown>>(() =>
    Object.fromEntries((entry.controls ?? []).map((c) => [c.prop, c.default])),
  );
  const code = entry.code?.(props);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <Button size="sm" variant="neutral" onClick={() => navigate("/playground")}>← All</Button>
        <h1 className="site-display site-display--lg" style={{ marginTop: "1rem" }}>{entry.name}</h1>
        <Text variant="body" muted>{entry.blurb}</Text>
        {entry.importName && (
          <code style={{ display: "block", marginTop: "0.75rem", fontFamily: "ui-monospace, monospace", fontSize: "0.8125rem", background: "var(--funky-ink)", color: "var(--funky-ink-inverse)", padding: "0.5rem 0.75rem", border: "var(--funky-border)", width: "fit-content" }}>
            {`import { ${entry.importName} } from "@studio-baeks/funky-ui";`}
          </code>
        )}
      </div>

      {entry.render && entry.controls && (
        <div>
          <SectionTitle>Playground</SectionTitle>
          <div className="pg-split">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.25rem", background: "var(--site-raised)", border: "var(--funky-border)" }}>
              {entry.controls.map((c) => (
                <ControlField key={c.prop} control={c} value={props[c.prop]} onChange={(v) => setProps((p) => ({ ...p, [c.prop]: v }))} />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Stage>{entry.render(props)}</Stage>
              {code && (
                <pre style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: "0.8125rem", background: "var(--funky-ink)", color: "var(--funky-ink-inverse)", padding: "0.85rem 1rem", border: "var(--funky-border)", overflowX: "auto", whiteSpace: "pre-wrap" }}>{code}</pre>
              )}
            </div>
          </div>
        </div>
      )}

      {entry.gallery && entry.gallery.map((g) => (
        <div key={g.title}>
          <SectionTitle>{g.title}</SectionTitle>
          <Stage>{g.node}</Stage>
        </div>
      ))}
    </div>
  );
};

/* ── page ───────────────────────────────────────────────────────── */
const PlaygroundPage = () => {
  const { entry: entryId } = useParams();
  const entry = useMemo(() => (entryId ? findEntry(entryId) : undefined), [entryId]);

  return (
    <>
      <SiteTopbar />
      <div className="docs-layout">
        <Sidebar activeId={entryId ?? ""} />
        <main className="docs-main">
          <div style={{ width: "100%", maxWidth: "60rem" }}>
            {entryId ? (
              entry ? <Detail entry={entry} /> : <Text variant="heading">Not found</Text>
            ) : (
              <Index />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default PlaygroundPage;
