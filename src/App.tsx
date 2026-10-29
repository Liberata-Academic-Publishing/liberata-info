import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OverviewPage from './pages/OverviewPage';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import PlatformsPage from './pages/PlatformsPage';
import ProductsPage from './pages/ProductsPage';
import ScripturaPage from './pages/ScripturaPage';
import MensuraPage from './pages/MensuraPage';
import TexturaPage from './pages/TexturaPage';
import NormaPage from './pages/NormaPage';
import BetaSignupPage from './pages/BetaSignupPage';
import EarlyAccessPage from './pages/EarlyAccessPage';
import FaqsPage from './pages/FaqsPage';
import ConferencesPage from './pages/ConferencesPage';
// Temporarily hidden until content is curated — see the commented routes below.
// import ResearchPage from './pages/ResearchPage';
// import TeamPage from './pages/TeamPage';
// import NewsPage from './pages/NewsPage';
import ScrollToTop from './utils/ScrollToTop';

// Serve from a subpath when the build has one (e.g. the staging Pages site).
// Vite sets BASE_URL from the `base` option, so this is "/staging/" there and
// "/" for production.
const BASENAME = import.meta.env.BASE_URL;

function App() {
  return(
    <BrowserRouter basename={BASENAME}>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<OverviewPage/>}/>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/scriptura" element={<ScripturaPage />} />
        <Route path="/products/mensura" element={<MensuraPage />} />
        <Route path="/products/textura" element={<TexturaPage />} />
        <Route path="/products/norma" element={<NormaPage />} />
        {/* Temporarily hidden until content is curated:
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/news" element={<NewsPage />} /> */}
        <Route path="/faqs" element={<FaqsPage />} />
        {/* Conferences is meant to eventually live as a category inside News
            (see NewsPage, still hidden above) — it's standalone for now
            since conference content is all that exists to show yet. */}
        <Route path="/conferences" element={<ConferencesPage />} />
        <Route path="/platforms" element={<PlatformsPage />} />
        <Route path="/beta-signup" element={<BetaSignupPage/>}/>
        {/* QR-code sign-up pages for the 2026 Charleston Conference; not linked from the site nav. */}
        <Route
          path="/early-access/scriptura"
          element={
            <EarlyAccessPage
              product="Scriptura"
              description="Sign up for early access to Scriptura, Liberata's platform for open scholarly publishing, peer review, and research replication."
            />
          }
        />
        <Route
          path="/early-access/mensura"
          element={
            <EarlyAccessPage
              product="Mensura"
              description="Sign up for early access to Mensura, Liberata's scientometrics platform. Mensura helps institutions explore research activity, impact, expertise, and collaboration through transparent, open-data-driven analytics."
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>
      <BackToTop/>
    </BrowserRouter>
  );
}

export default App;