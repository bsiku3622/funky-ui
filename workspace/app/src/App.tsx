import type { ReactNode } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";

import { Docs } from "./pages/Docs";
import { Home } from "./pages/Home";
import { Detail } from "./playground/Detail";
import { Overview } from "./playground/Overview";
import { ColorPage } from "./playground/foundations/ColorPage";
import { LayoutPage, MotionPage, ShapePage, TypographyPage } from "./playground/foundations/SystemPages";
import { Chrome, DocsShell, PlaygroundShell } from "./site/Chrome";

const FOUNDATION_PAGES: Record<string, () => ReactNode> = {
  color: ColorPage,
  typography: TypographyPage,
  shape: ShapePage,
  layout: LayoutPage,
  motion: MotionPage,
};

function Foundation() {
  const { slug = "" } = useParams();
  const Page = FOUNDATION_PAGES[slug];
  return Page ? <Page key={slug} /> : <Navigate to="/playground" replace />;
}

export function App() {
  return (
    <Chrome>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<PlaygroundShell><Overview /></PlaygroundShell>} />
        <Route path="/playground/foundations/:slug" element={<PlaygroundShell><Foundation /></PlaygroundShell>} />
        <Route path="/playground/:layer/:slug" element={<PlaygroundShell><Detail /></PlaygroundShell>} />
        <Route path="/docs/*" element={<DocsShell><Docs /></DocsShell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Chrome>
  );
}
