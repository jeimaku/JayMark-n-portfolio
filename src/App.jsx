import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SiteBackground from "./components/effects/SiteBackground";
import ScrollToTop from "./components/effects/ScrollToTop";
import SkipLink from "./components/ui/SkipLink";

import Home from "./pages/Home";
import HomeV2 from "./pages/HomeV2";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import TalkReadyCaseStudyV2 from "./pages/TalkReadyCaseStudyV2";

export default function App() {
  const { pathname } = useLocation();

  /*
   * HomeV2 already renders its own Version 2 footer.
   * TalkReadyCaseStudyV2 uses CaseStudyLayout, which provides
   * its own header, skip link, main landmark, and footer.
   */
  const isHomeV2 = pathname === "/preview-v2";

  const isTalkReadyCaseStudyV2 =
    pathname === "/projects/talkready";

  const showGlobalHeader =
    !isTalkReadyCaseStudyV2;

  const showGlobalFooter =
    !isHomeV2 &&
    !isTalkReadyCaseStudyV2;

  const showGlobalSkipLink =
    !isTalkReadyCaseStudyV2;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-50">
      <SiteBackground />
      <ScrollToTop />

      {showGlobalSkipLink ? <SkipLink /> : null}

      {showGlobalHeader ? <Header /> : null}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/preview-v2"
          element={<HomeV2 />}
        />

        {/*
         * The specific TalkReady route must use the rebuilt page.
         * Keep this route above the generic project route for clarity.
         */}
        <Route
          path="/projects/talkready"
          element={<TalkReadyCaseStudyV2 />}
        />

        {/*
         * Keep the generic route for the remaining legacy
         * project case studies.
         */}
        <Route
          path="/projects/:projectId"
          element={<ProjectCaseStudy />}
        />

        {/*
         * Temporary development URL now redirects to the
         * production TalkReady route.
         */}
        <Route
          path="/talkready-v2"
          element={
            <Navigate
              to="/projects/talkready"
              replace
            />
          }
        />
      </Routes>

      {showGlobalFooter ? <Footer /> : null}
    </div>
  );
}