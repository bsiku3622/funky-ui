import type { CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Tag,
  Badge,
  StatTile,
  Accordion,
  Input,
  Text,
} from "@studio-baeks/funky-ui";
import { SitePage } from "../../chrome";

/* ── tiny local helpers (site-level layout only; visuals = funky tokens) ── */

const Kicker = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontFamily: "var(--funky-font-family)",
      fontWeight: 900,
      fontSize: "var(--funky-size-2xs)",
      textTransform: "uppercase",
      letterSpacing: "0.2em",
      color: "var(--funky-secondary)",
    }}
  >
    {children}
  </span>
);

const Section = ({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) => (
  <section className={className} style={{ padding: "5.5rem 0", ...style }}>
    <div className="site-wrap">{children}</div>
  </section>
);

const lead: CSSProperties = {
  fontFamily: "var(--funky-font-family)",
  fontSize: "1.125rem",
  lineHeight: 1.6,
  fontWeight: 500,
  maxWidth: "34rem",
};

/* ── Hero collage: a few tilted, real components ── */
const HeroCollage = () => (
  <div style={{ position: "relative", height: "26rem" }}>
    <div style={{ position: "absolute", top: "0.5rem", right: "1rem", transform: "rotate(3deg)", width: "13rem" }}>
      <StatTile color="cyan" label="Components" value="14" hint="atoms → templates" />
    </div>
    <div style={{ position: "absolute", top: "8.5rem", left: "0", transform: "rotate(-4deg)", width: "15rem" }}>
      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Text variant="chrome" muted>Press into shadow</Text>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Button variant="primary">Save</Button>
            <Button variant="ink">Ship</Button>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <Tag color="yellow">neon</Tag>
            <Tag color="green">sharp</Tag>
            <Tag color="sky">loud</Tag>
          </div>
        </div>
      </Card>
    </div>
    <div style={{ position: "absolute", bottom: "0.5rem", right: "0", transform: "rotate(2.5deg)", width: "12rem" }}>
      <StatTile color="pink" label="Absolute rules" value="0" hint="just press it" />
    </div>
    <div style={{ position: "absolute", top: "4.5rem", right: "5.5rem", transform: "rotate(-2deg)" }}>
      <Badge color="purple">NEW</Badge>
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <SitePage>
      {/* ── HERO ── */}
      <div className="site-grid-bg" style={{ borderBottom: "var(--funky-border)" }}>
        <div className="site-wrap" style={{ padding: "5rem var(--funky-space-xl)" }}>
          <div className="site-hero">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <Kicker>Studio Baeks Design System</Kicker>
              <h1 className="site-display site-display--xl">
                <span className="site-skew">Funky</span>
                <br />
                <span className="site-skew" style={{ color: "var(--funky-secondary)" }}>
                  UI<span style={{ color: "var(--funky-primary)" }}>.</span>
                </span>
              </h1>
              <p style={lead}>
                옵션은 적고, 목소리는 크게. 대신 BOLD, SHARP, COLORFUL and
                INTERACTIVE. 브루탈리즘과 레트로 사이를 넘나드는 통통 튀는 UI.
                목소리는 크게, 화면은 재밌게.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Button variant="primary" size="lg" onClick={() => navigate("/playground")}>
                  Open Playground
                </Button>
                <Button variant="neutral" size="lg" onClick={() => navigate("/docs")}>
                  Read the docs
                </Button>
              </div>
              <code
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: "0.8125rem",
                  background: "var(--funky-ink)",
                  color: "var(--funky-ink-inverse)",
                  padding: "0.5rem 0.75rem",
                  border: "var(--funky-border)",
                  boxShadow: "var(--funky-shadow-sm)",
                  width: "fit-content",
                }}
              >
                npm i @studio-baeks/funky-ui
              </code>
            </div>
            <div className="site-hero__collage">
              <HeroCollage />
            </div>
          </div>
        </div>
      </div>

      {/* ── PRINCIPLES (dark band) ── */}
      <section
        style={{
          background: "var(--funky-ink)",
          color: "var(--funky-ink-inverse)",
          padding: "5rem 0",
          borderBottom: "var(--funky-border)",
        }}
      >
        <div className="site-wrap">
          <span style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: "var(--funky-size-2xs)", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--funky-yellow)" }}>
            Three convictions
          </span>
          <div className="site-cols-3" style={{ marginTop: "2rem" }}>
            {[
              { n: "01", t: "Loud by default", d: "조용한 기본값은 없다. 모든 컴포넌트가 자기 자리에서 가장 과감한 모습으로 앉는다 — 네온 면, 검정 테두리, 하드 그림자." },
              { n: "02", t: "Press into shadow", d: "요소는 그림자 위에 떠 있다. hover 면 절반, active 면 그림자 속으로 완전히 가라앉는다. 클릭이 손끝에 만져진다." },
              { n: "03", t: "Fewer choices", d: "옵션을 일부러 적게 둔다. variant 5단·size 3단. 고를 게 줄면 양산 앱들이 저절로 같아진다." },
            ].map((p) => (
              <div key={p.n} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <span className="site-display site-display--lg" style={{ color: "var(--funky-cyan)" }}>{p.n}</span>
                <h3 style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: "1.375rem", textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0 }}>{p.t}</h3>
                <p style={{ fontFamily: "var(--funky-font-family)", fontSize: "0.9375rem", lineHeight: 1.6, color: "rgba(255,255,255,0.7)", margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPONENT SHOWCASE ── */}
      <Section style={{ borderBottom: "var(--funky-border)" }}>
        <Kicker>Batteries included</Kicker>
        <h2 className="site-display site-display--lg" style={{ marginTop: "0.75rem" }}>
          14 components,<br />zero ceremony.
        </h2>
        <div className="site-cols-2" style={{ marginTop: "2.5rem" }}>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Text variant="chrome" muted>Buttons · 5 variants</Text>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ink">Ink</Button>
                <Button variant="neutral">Neutral</Button>
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Text variant="chrome" muted>Tags & badges</Text>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <Tag color="pink">pink</Tag>
                <Tag color="cyan">cyan</Tag>
                <Tag color="yellow">yellow</Tag>
                <Tag color="green">green</Tag>
                <Badge color="purple">12</Badge>
                <Badge color="orange">NEW</Badge>
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Text variant="chrome" muted>Inputs</Text>
              <Input fullWidth placeholder="Search students…" />
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Text variant="chrome" muted>Stat tiles</Text>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <StatTile color="cyan" label="Subjects" value="97" />
                <StatTile color="yellow" label="Sections" value="247" />
              </div>
            </div>
          </Card>
          <div style={{ gridColumn: "1 / -1" }}>
            <Accordion>
              <Accordion.Item defaultOpen>
                <Accordion.Header>What is funky-ui?</Accordion.Header>
                <Accordion.Panel>
                  <Text variant="body">
                    A small, loud React design system — the visual DNA of the
                    Class Explorer app, codified into tokens, atoms, components
                    and templates.
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Compound components included</Accordion.Header>
                <Accordion.Panel>
                  <Text variant="body">
                    Accordion, Tabs, Modal, and the AppShell template ship with
                    state built in.
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </Section>

      {/* ── SPECIMEN: palette + shadow ── */}
      <Section style={{ background: "var(--site-raised)", borderBottom: "var(--funky-border)" }}>
        <Kicker>Specimen</Kicker>
        <h2 className="site-display site-display--lg" style={{ marginTop: "0.75rem" }}>Neon on cream.</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
          {[
            ["pink", "var(--funky-pink)"],
            ["purple", "var(--funky-purple)"],
            ["cyan", "var(--funky-cyan)"],
            ["yellow", "var(--funky-yellow)"],
            ["orange", "var(--funky-orange)"],
            ["sky", "var(--funky-sky)"],
            ["green", "var(--funky-green)"],
          ].map(([name, val]) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-start" }}>
              <div style={{ width: "5.5rem", height: "5.5rem", background: val, border: "var(--funky-border)", boxShadow: "var(--funky-shadow-sm)" }} />
              <span style={{ fontFamily: "var(--funky-font-family)", fontWeight: 900, fontSize: "var(--funky-size-2xs)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--funky-secondary)", color: "var(--funky-ink-inverse)", minHeight: "calc(88vh - 150px)", display: "flex", alignItems: "center", padding: "4rem 0" }}>
        <div className="site-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center" }}>
          <h2 className="site-display site-display--xl" style={{ color: "var(--funky-ink-inverse)" }}>
            Build something<br />
            <span style={{ color: "var(--funky-yellow)" }}>loud.</span>
          </h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Button variant="primary" size="lg" onClick={() => navigate("/playground")}>Explore components</Button>
            <Button variant="neutral" size="lg" onClick={() => navigate("/docs")}>Get started</Button>
          </div>
        </div>
      </section>
    </SitePage>
  );
};

export default HomePage;
