import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const PlaygroundPage = lazy(() => import("./pages/playground/PlaygroundPage"));
const DocsApp = lazy(() => import("./pages/docs/DocsApp"));

const Fallback = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--funky-font-family)",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.15em",
      color: "rgba(0,0,0,0.3)",
    }}
  >
    Loading…
  </div>
);

const App = () => (
  <Suspense fallback={<Fallback />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="/playground/:entry" element={<PlaygroundPage />} />
      <Route path="/docs/*" element={<DocsApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default App;
