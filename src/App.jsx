import { Route, Routes } from "react-router";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SiteBackground from "./components/effects/SiteBackground";
import ScrollToTop from "./components/effects/ScrollToTop";
import SkipLink from "./components/ui/SkipLink";
import Home from "./pages/Home";
import HomeV2 from "./pages/HomeV2";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-50">
      <SiteBackground />
      <ScrollToTop />
      <SkipLink />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview-v2" element={<HomeV2 />} />
        <Route
          path="/projects/:projectId"
          element={<ProjectCaseStudy />}
        />
      </Routes>

      <Footer />
    </div>
  );
}