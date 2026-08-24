import {
  useState,
} from "react";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

import Header from "./components/layout/Header";
import SiteBackground from "./components/effects/SiteBackground";
import ScrollToTop from "./components/effects/ScrollToTop";
import SkipLink from "./components/ui/SkipLink";

import PortfolioLoader from "./components/v2/loading/PortfolioLoader";

import HomeV2 from "./pages/HomeV2";
import TalkReadyCaseStudyV2 from "./pages/TalkReadyCaseStudyV2";
import InternshipSystemsCaseStudyV2 from "./pages/InternshipSystemsCaseStudyV2";

import SocialPreview from "./pages/SocialPreview";

export default function App() {
  const { pathname } = useLocation();

  const [
    showPortfolioLoader,
    setShowPortfolioLoader,
  ] = useState(true);

  const isRebuiltCaseStudy =
    pathname === "/projects/talkready" ||
    pathname === "/projects/internship-systems";

  const isSocialPreview =
    pathname === "/social-preview";

  /*
   * Rebuilt case-study pages provide their own
   * header, skip link, main landmark, and footer
   * through CaseStudyLayout.
   */
  const showGlobalHeader =
    !isRebuiltCaseStudy &&
    !isSocialPreview;

  const showGlobalSkipLink =
    !isRebuiltCaseStudy &&
    !isSocialPreview;

  const handlePortfolioLoaderComplete =
    () => {
      setShowPortfolioLoader(false);
    };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      {/*
       * The application itself renders immediately
       * underneath the loader.
       *
       * While the loader is active, `inert` prevents
       * mouse, touch, and keyboard interaction with
       * everything behind it.
       */}
      <div
        inert={showPortfolioLoader}
        aria-hidden={
          showPortfolioLoader
            ? "true"
            : undefined
        }
      >
        <SiteBackground />

        <ScrollToTop />

        {showGlobalSkipLink ? (
          <SkipLink />
        ) : null}

        {showGlobalHeader ? (
          <Header />
        ) : null}

        <Routes>
          <Route
            path="/"
            element={<HomeV2 />}
          />

          <Route
            path="/social-preview"
            element={
              <SocialPreview />
            }
          />

          <Route
            path="/projects/talkready"
            element={
              <TalkReadyCaseStudyV2 />
            }
          />

          <Route
            path="/projects/internship-systems"
            element={
              <InternshipSystemsCaseStudyV2 />
            }
          />

          <Route
            path="/preview-v2"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

          <Route
            path="/talkready-v2"
            element={
              <Navigate
                to="/projects/talkready"
                replace
              />
            }
          />

          <Route
            path="/projects"
            element={
              <Navigate
                to="/#projects"
                replace
              />
            }
          />

          <Route
            path="/projects/:projectId"
            element={
              <Navigate
                to="/#projects"
                replace
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </div>

      {showPortfolioLoader ? (
        <PortfolioLoader
          onComplete={
            handlePortfolioLoaderComplete
          }
        />
      ) : null}
    </div>
  );
}